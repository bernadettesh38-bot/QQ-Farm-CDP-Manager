"use strict";

const latestWechat = require("./adapters/latest-wechat");
const modernWechat = require("./adapters/modern-wechat");
const legacyWechat = require("./adapters/legacy-wechat");
const genericLocalDebug = require("./adapters/generic-local-debug");

const DEFAULT_ADAPTERS = [
  latestWechat,
  modernWechat,
  legacyWechat,
  genericLocalDebug,
];

function selectAdapter(environment, options = {}, logger = null) {
  const adapters = Array.isArray(options.adapters) && options.adapters.length
    ? options.adapters
    : DEFAULT_ADAPTERS;
  const explicit = options.adapterId
    ? adapters.find((adapter) => adapter.id === options.adapterId)
    : null;
  const matched = explicit || adapters.find((adapter) => {
    try {
      return adapter.id !== "generic-local-debug" && adapter.matches(environment, options);
    } catch (_) {
      return false;
    }
  });
  const selected = matched || adapters.find((adapter) => adapter.id === "generic-local-debug");
  if (!selected) throw new Error("No WMPF compatibility adapter is registered");

  if (logger) {
    logger.info(matched ? "wmpf_adapter_selected" : "wmpf_adapter_fallback", {
      adapter: selected.id,
      wechatVersion: environment && environment.wechatVersion || null,
      wmpfBuild: environment && environment.wmpfBuild || null,
    });
  }
  return selected;
}

module.exports = { DEFAULT_ADAPTERS, selectAdapter };
