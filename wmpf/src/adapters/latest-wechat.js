"use strict";

const { createWechatAdapter } = require("./base-wechat");

module.exports = createWechatAdapter({
  id: "latest-wechat",
  priority: 300,
  description: "Current Weixin 4.x and recent RadiumWMPF runtime",
  matches(environment) {
    const build = Number(environment && environment.wmpfBuild);
    const version = String(environment && environment.wechatVersion || "");
    if (Number.isFinite(build) && build > 0) return build >= 19900;
    return /^4\.(?:[2-9]|\d{2,})\./.test(version);
  },
});
