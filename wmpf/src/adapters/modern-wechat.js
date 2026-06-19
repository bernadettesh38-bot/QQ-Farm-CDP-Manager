"use strict";

const { createWechatAdapter } = require("./base-wechat");

module.exports = createWechatAdapter({
  id: "modern-wechat",
  priority: 200,
  description: "Modern WeChat 3.x and early 4.x WMPF runtime",
  matches(environment) {
    const build = Number(environment && environment.wmpfBuild);
    const version = String(environment && environment.wechatVersion || "");
    return (Number.isFinite(build) && build >= 19000 && build < 19900)
      || /^4\.(0|1)\.[0-8]\./.test(version);
  },
});
