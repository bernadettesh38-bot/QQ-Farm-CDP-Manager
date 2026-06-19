"use strict";

const { createWechatAdapter } = require("./base-wechat");

module.exports = createWechatAdapter({
  id: "generic-local-debug",
  priority: 0,
  description: "Capability-based local debug fallback for unknown hosts",
  matches() {
    return false;
  },
});
