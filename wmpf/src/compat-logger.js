"use strict";

function createCompatLogger(baseLogger, sink) {
  const events = Array.isArray(sink) ? sink : [];

  function emit(event, details = {}, level = "info") {
    const record = {
      ts: new Date().toISOString(),
      event,
      level,
      details: details && typeof details === "object" ? details : { value: details },
    };
    events.push(record);
    const writer = baseLogger && typeof baseLogger[level] === "function"
      ? baseLogger[level].bind(baseLogger)
      : null;
    if (writer) writer(`[wmpf-compat] ${event}`, record.details);
    return record;
  }

  return {
    events,
    info(event, details) {
      return emit(event, details, "info");
    },
    warn(event, details) {
      return emit(event, details, "warn");
    },
    error(event, details) {
      return emit(event, details, "error");
    },
  };
}

module.exports = { createCompatLogger };
