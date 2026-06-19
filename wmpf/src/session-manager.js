"use strict";

const RECOVERABLE_PATTERNS = [
  /execution context was destroyed/i,
  /cannot find context with specified id/i,
  /target closed/i,
  /inspected target navigated or closed/i,
  /cdp.*closed/i,
  /miniapp.*disconnected/i,
];

class SessionManager {
  constructor(options) {
    this.createSession = options.createSession;
    this.probe = options.probe;
    this.reloadProjectScript = options.reloadProjectScript;
    this.logger = options.logger || null;
    this.maxRebindAttempts = Math.max(1, Number(options.maxRebindAttempts) || 3);
    this.rebindDelayMs = Math.max(0, Number(options.rebindDelayMs) || 250);
    this.session = options.session || null;
    this.targetFingerprint = options.targetFingerprint || null;
    this._rebindPromise = null;
    this._closed = false;
  }

  isRecoverable(error) {
    const message = String(error instanceof Error ? error.message : error);
    return RECOVERABLE_PATTERNS.some((pattern) => pattern.test(message));
  }

  async rebindIfNeeded(reason = "manual", force = false) {
    if (this._closed) throw new Error("WMPF session manager is closed");
    if (!force && this.session && reason === "manual") return false;
    if (this._rebindPromise) return await this._rebindPromise;

    this._rebindPromise = this._runRebind(reason);
    try {
      return await this._rebindPromise;
    } finally {
      this._rebindPromise = null;
    }
  }

  async _runRebind(reason) {
    let lastError = null;
    if (this.logger) this.logger.info("session_rebind_started", { reason });
    for (let attempt = 1; attempt <= this.maxRebindAttempts; attempt += 1) {
      try {
        if (this.session && typeof this.session.close === "function") this.session.close();
        this.session = await this.createSession({ attempt, reason });
        const probeResult = await this.probe(this.session);
        if (typeof this.reloadProjectScript === "function") {
          await this.reloadProjectScript(this.session, probeResult);
        }
        if (this.logger) this.logger.info("session_rebind_success", { reason, attempt });
        return true;
      } catch (error) {
        lastError = error;
        if (attempt < this.maxRebindAttempts && this.rebindDelayMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, this.rebindDelayMs * attempt));
        }
      }
    }
    const message = String(lastError instanceof Error ? lastError.message : lastError);
    if (this.logger) {
      this.logger.error("session_rebind_failed", {
        reason,
        attempts: this.maxRebindAttempts,
        message,
      });
    }
    throw lastError instanceof Error ? lastError : new Error(message);
  }

  async run(operation, reason = "operation") {
    try {
      return await operation(this.session);
    } catch (error) {
      if (!this.isRecoverable(error)) throw error;
      await this.rebindIfNeeded(reason, true);
      return await operation(this.session);
    }
  }

  close() {
    this._closed = true;
    if (this.session && typeof this.session.close === "function") this.session.close();
    this.session = null;
  }
}

module.exports = { RECOVERABLE_PATTERNS, SessionManager };
