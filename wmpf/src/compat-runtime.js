"use strict";

const path = require("node:path");
const { WmpfCdpSession } = require(path.join(__dirname, "..", "..", "src", "cdp-wmpf-session.js"));
const { selectAdapter } = require("./adapter-registry");
const { createCompatLogger } = require("./compat-logger");
const { discoverWechatEnvironment } = require("./process-discovery");
const { discoverLocalDebugSessions } = require("./local-debug-discovery");
const { selectTarget } = require("./target-discovery");
const { probeRuntime } = require("./runtime-probe");
const { SessionManager } = require("./session-manager");
const { capturePreviewFrame } = require("./preview-adapter");

function normalizeOptions(raw = {}) {
  return {
    appId: String(raw.appId || "").trim(),
    originalId: String(raw.originalId || "").trim(),
    displayName: String(raw.displayName || "QQ农场").trim(),
    mode: String(raw.mode || "auto").trim().toLowerCase(),
    timeoutMs: Math.max(1000, Number(raw.timeoutMs) || 15000),
    verifyRuntimeAppId: raw.verifyRuntimeAppId !== false,
    fallbackToTitleMatch: raw.fallbackToTitleMatch !== false,
    requireFarmRuntime: raw.requireFarmRuntime !== false,
    contextName: String(raw.contextName || "gameContext"),
    maxRebindAttempts: Math.max(1, Number(raw.maxRebindAttempts) || 3),
    adapterId: raw.adapterId || null,
    previewEnabled: raw.previewEnabled === true,
  };
}

async function createDefaultSession(options, transport) {
  if (!transport) {
    const error = new Error("The embedded WMPF debug transport is unavailable");
    error.code = "local_debug_session_missing";
    throw error;
  }
  const session = new WmpfCdpSession({
    cdpTimeoutMs: options.timeoutMs,
    gatewayContextName: options.contextName,
    executionContextId: undefined,
  }, transport);
  await session.connect();
  await session.awaitReady();
  return session;
}

class CompatRuntime {
  constructor(options, dependencies) {
    this.options = normalizeOptions(options);
    this.transport = dependencies.transport || null;
    this.baseLogger = dependencies.logger || null;
    this.log = createCompatLogger(this.baseLogger, dependencies.events);
    this.createSession = dependencies.createSession
      || (() => createDefaultSession(this.options, this.transport));
    this.environment = null;
    this.localDebug = null;
    this.adapter = null;
    this.target = null;
    this.probeResult = null;
    this.projectScript = null;
    this.closed = false;
    this.sessionManager = null;
  }

  async initialize() {
    this.environment = await discoverWechatEnvironment({ logger: this.log });
    this.localDebug = await discoverLocalDebugSessions({
      logger: this.log,
      transport: this.transport,
    });
    this.adapter = selectAdapter(this.environment, {
      adapterId: this.options.adapterId,
    }, this.log);
    const session = await this.createSession();
    this.sessionManager = new SessionManager({
      session,
      logger: this.log,
      maxRebindAttempts: this.options.maxRebindAttempts,
      createSession: async () => await this.createSession(),
      probe: async (nextSession) => await this._bindAndProbe(nextSession),
      reloadProjectScript: async (nextSession) => {
        if (this.projectScript) await this._loadScript(nextSession, this.projectScript);
      },
    });
    await this._bindTarget(session);
    return this;
  }

  async _discoverTargets(session) {
    const targets = await this.adapter.discoverTargets({
      session,
      environment: this.environment,
      options: this.options,
    });
    const enriched = [];
    for (const target of targets) {
      let runtime = target.runtime || {};
      try {
        runtime = await probeRuntime(session, {
          timeoutMs: Math.min(this.options.timeoutMs, 5000),
          executionContextId: target.executionContextId,
          requireFarmRuntime: false,
        });
      } catch (error) {
        runtime = {
          ...runtime,
          evaluateAvailable: error && error.code !== "local_debug_evaluate_failed",
          probeError: error && error.code || "runtime_probe_failed",
        };
      }
      enriched.push({
        ...target,
        appId: runtime.appId || target.appId || null,
        originalId: runtime.originalId || target.originalId || null,
        title: runtime.title || target.title || "",
        url: runtime.href || target.url || "",
        runtime,
      });
    }
    if (this.log) this.log.info(enriched.length ? "target_found" : "target_filtered", {
      count: enriched.length,
    });
    return enriched;
  }

  async _bindTarget(session) {
    const targets = await this._discoverTargets(session);
    const selected = selectTarget(targets, this.options, this.log);
    const previousId = this.target && this.target.id;
    this.target = selected.target;
    if (previousId != null && previousId !== this.target.id) {
      this.log.info("target_replaced", { previousId, targetId: this.target.id });
    }
    if (this.target.executionContextId != null) {
      session.executionContextId = this.target.executionContextId;
    }
    return this.target;
  }

  async _bindAndProbe(session) {
    await this._bindTarget(session);
    this.probeResult = await probeRuntime(session, {
      appId: this.options.verifyRuntimeAppId ? this.options.appId : "",
      originalId: this.options.originalId,
      timeoutMs: this.options.timeoutMs,
      executionContextId: this.target && this.target.executionContextId,
      requireFarmRuntime: this.options.requireFarmRuntime,
    }, this.log);
    return this.probeResult;
  }

  async probe() {
    if (this.closed) throw new Error("WMPF runtime is closed");
    return await this.sessionManager.run(
      async (session) => await this._bindAndProbe(session),
      "runtime probe",
    );
  }

  async _loadScript(session, script) {
    if (!this.probeResult) await this._bindAndProbe(session);
    try {
      const expression = `${String(script)}\n//# sourceURL=wmpf-project-script.js`;
      const result = await session.evaluate(expression, {
        timeoutMs: this.options.timeoutMs,
        executionContextId: this.target && this.target.executionContextId,
      });
      this.log.info("project_script_load_ok", {
        bytes: Buffer.byteLength(String(script), "utf8"),
      });
      return result;
    } catch (error) {
      this.log.error("project_script_load_failed", {
        message: String(error instanceof Error ? error.message : error),
      });
      throw error;
    }
  }

  async loadProjectScript(script) {
    if (typeof script !== "string" || !script.trim()) {
      throw new TypeError("Project script must be a non-empty string");
    }
    this.projectScript = script;
    return await this.sessionManager.run(
      async (session) => await this._loadScript(session, script),
      "project script load",
    );
  }

  async evaluate(expression) {
    if (typeof expression !== "string" || !expression.trim()) {
      throw new TypeError("Expression must be a non-empty string");
    }
    return await this.sessionManager.run(
      async (session) => await session.evaluate(expression, {
        timeoutMs: this.options.timeoutMs,
        executionContextId: this.target && this.target.executionContextId,
      }),
      "evaluate",
    );
  }

  async rebindIfNeeded(force = false) {
    return await this.sessionManager.rebindIfNeeded(force ? "forced" : "manual", force);
  }

  async capturePreviewFrame(options = {}) {
    if (!this.options.previewEnabled && options.enabled !== true) {
      const error = new Error("Preview is disabled; pass { enabled: true } to capture one frame");
      error.code = "preview_disabled";
      throw error;
    }
    return await this.sessionManager.run(
      async (session) => await capturePreviewFrame(this.adapter, {
        session,
        target: this.target,
        environment: this.environment,
      }, { ...options, timeoutMs: this.options.timeoutMs }, this.log),
      "preview capture",
    );
  }

  getDiagnostics() {
    return {
      environment: this.environment,
      localDebug: this.localDebug,
      adapter: this.adapter && this.adapter.id || null,
      target: this.target,
      probe: this.probeResult,
      events: this.log.events,
    };
  }

  async close() {
    this.closed = true;
    if (this.sessionManager) this.sessionManager.close();
  }
}

async function connect(options = {}, dependencies = {}) {
  const runtime = new CompatRuntime(options, dependencies);
  return await runtime.initialize();
}

module.exports = { CompatRuntime, connect, createDefaultSession, normalizeOptions };
