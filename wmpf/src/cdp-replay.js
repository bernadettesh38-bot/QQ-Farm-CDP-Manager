"use strict";

const READY_CATEGORIES = new Set([
  "setupContext",
  "addJsContext",
  "connectJsContext",
]);

const REPLAYABLE_METHODS = new Set([
  "Debugger.setBreakpointsActive",
  "Debugger.setPauseOnExceptions",
  "Emulation.setFocusEmulationEnabled",
  "Network.setCacheDisabled",
  "Page.setAdBlockingEnabled",
  "Page.setBypassCSP",
  "Page.setLifecycleEventsEnabled",
  "Runtime.setAsyncCallStackDepth",
]);

const parseCdpMessage = (message) => {
  let payload = message;
  if (message && typeof message === "object") {
    const data = message.data && typeof message.data === "object" ? message.data : {};
    if ((message.category ?? "chromeDevtools") !== "chromeDevtools") return null;
    payload = data.payload;
  }
  if (typeof payload !== "string") return null;
  try {
    const parsed = JSON.parse(payload);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (_) {
    return null;
  }
};

const isReplayableCdpMessage = (message) => {
  const parsed = parseCdpMessage(message);
  const method = parsed && typeof parsed.method === "string" ? parsed.method : "";
  return method.endsWith(".enable") || REPLAYABLE_METHODS.has(method);
};

const getReplayKey = (message) => {
  const parsed = parseCdpMessage(message);
  return parsed && typeof parsed.method === "string" ? parsed.method : null;
};

const isRuntimeReadyCategory = (category) => READY_CATEGORIES.has(category);

module.exports = {
  getReplayKey,
  isReplayableCdpMessage,
  isRuntimeReadyCategory,
};
