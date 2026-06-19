"use strict";

const PROBE_EXPRESSION = `(() => {
  const G = globalThis;
  const gameGlobal = G.GameGlobal && typeof G.GameGlobal === "object" ? G.GameGlobal : null;
  const cc = G.cc || (gameGlobal && gameGlobal.cc) || null;
  let scene = null;
  try {
    scene = cc && cc.director && typeof cc.director.getScene === "function"
      ? cc.director.getScene()
      : null;
  } catch (_) {}
  const wxConfig = G.__wxConfig && typeof G.__wxConfig === "object" ? G.__wxConfig : null;
  const accountInfo = G.__wxAppData && typeof G.__wxAppData === "object" ? G.__wxAppData : null;
  const appId = (wxConfig && (wxConfig.appId || wxConfig.appid))
    || (gameGlobal && (gameGlobal.appId || gameGlobal.appid))
    || (accountInfo && (accountInfo.appId || accountInfo.appid))
    || null;
  const originalId = (wxConfig && (wxConfig.originalId || wxConfig.userName))
    || (gameGlobal && (gameGlobal.originalId || gameGlobal.userName))
    || null;
  const sceneName = scene && typeof scene.name === "string" ? scene.name : null;
  const farmHints = [
    !!G.gameCtl,
    !!(gameGlobal && gameGlobal.gameCtl),
    !!(sceneName && /farm|nongchang|qqfarm/i.test(sceneName)),
    !!(cc && cc.director && scene)
  ];
  return {
    evaluateAvailable: true,
    hasExecutionContext: true,
    isMiniProgram: !!(G.wx || gameGlobal || wxConfig || /servicewechat/i.test(String(G.location && G.location.href || ""))),
    appId: appId == null ? null : String(appId),
    originalId: originalId == null ? null : String(originalId),
    hasCocos: !!cc,
    hasFarmRuntime: farmHints.some(Boolean),
    hasSceneRoot: !!scene,
    sceneName,
    href: G.location && typeof G.location.href === "string" ? G.location.href : null,
    title: G.document && typeof G.document.title === "string" ? G.document.title : null
  };
})()`;

function probeError(code, message, cause) {
  const error = new Error(message);
  error.code = code;
  if (cause) error.cause = cause;
  return error;
}

async function probeRuntime(session, options = {}, logger = null) {
  if (!session || typeof session.evaluate !== "function") {
    throw probeError("local_debug_evaluate_failed", "Runtime.evaluate is unavailable");
  }
  let result;
  try {
    result = await session.evaluate(PROBE_EXPRESSION, {
      timeoutMs: options.timeoutMs,
      executionContextId: options.executionContextId,
    });
  } catch (error) {
    const message = String(error instanceof Error ? error.message : error);
    const code = /execution context|context.*destroyed|specified id/i.test(message)
      ? "execution_context_missing"
      : "local_debug_evaluate_failed";
    if (logger) logger.error("runtime_probe_failed", { code, message });
    throw probeError(code, message, error);
  }

  const probe = result && typeof result === "object" ? result : {};
  if (!probe.isMiniProgram) {
    if (logger) logger.error("runtime_probe_failed", { code: "target_not_miniprogram", probe });
    throw probeError("target_not_miniprogram", "Selected target is not a WeChat mini program");
  }
  if (options.requireFarmRuntime !== false && !probe.hasFarmRuntime) {
    if (logger) logger.error("runtime_probe_failed", { code: "farm_runtime_missing", probe });
    throw probeError("farm_runtime_missing", "QQ Farm runtime features were not found");
  }

  const expectedAppId = String(options.appId || "").trim();
  const expectedOriginalId = String(options.originalId || "").trim();
  if (expectedAppId) {
    if (!probe.appId || String(probe.appId) !== expectedAppId) {
      if (logger) logger.error("appid_mismatch", { expected: expectedAppId, actual: probe.appId || null });
      throw probeError("appid_mismatch", "Runtime appId does not match the configured appId");
    }
    if (logger) logger.info("appid_verified", { appId: expectedAppId });
  }
  if (expectedOriginalId) {
    if (!probe.originalId || String(probe.originalId) !== expectedOriginalId) {
      if (logger) {
        logger.error("original_id_mismatch", {
          expected: expectedOriginalId,
          actual: probe.originalId || null,
        });
      }
      throw probeError("original_id_mismatch", "Runtime originalId does not match the configured originalId");
    }
    if (logger) logger.info("original_id_verified", { originalId: expectedOriginalId });
  }
  if (logger) logger.info("runtime_probe_ok", probe);
  return probe;
}

module.exports = { PROBE_EXPRESSION, probeRuntime };
