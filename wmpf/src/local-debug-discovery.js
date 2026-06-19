"use strict";

const net = require("node:net");

function checkPort(host, port, timeoutMs = 350) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port });
    let settled = false;
    const finish = (available) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve({ host, port, available });
    };
    socket.setTimeout(timeoutMs);
    socket.once("connect", () => finish(true));
    socket.once("timeout", () => finish(false));
    socket.once("error", () => finish(false));
  });
}

async function discoverLocalDebugSessions(options = {}) {
  const logger = options.logger || null;
  const transport = options.transport || null;
  const ports = Array.isArray(options.ports) && options.ports.length
    ? options.ports
    : [9421, 62000];
  const checks = await Promise.all(ports.map((port) => checkPort("127.0.0.1", port)));
  const state = transport && transport.transportState && typeof transport.transportState === "object"
    ? { ...transport.transportState }
    : null;
  const sessions = checks.filter((item) => item.available).map((item) => ({
    kind: item.port === 62000 ? "cdp_proxy" : "wmpf_remote_debug",
    endpoint: `127.0.0.1:${item.port}`,
    available: true,
  }));
  if (state && (state.miniappConnected || state.miniappClientCount > 0)) {
    sessions.push({
      kind: "embedded_wmpf_bridge",
      endpoint: "event-emitter",
      available: true,
      state,
    });
  }

  if (logger) {
    logger.info(sessions.length ? "local_debug_session_found" : "local_debug_session_missing", {
      sessions,
      checks,
    });
  }
  return { sessions, checks, transportState: state };
}

module.exports = { checkPort, discoverLocalDebugSessions };
