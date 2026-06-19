"use strict";

const { createWechatAdapter } = require("./base-wechat");

module.exports = createWechatAdapter({
  id: "legacy-wechat",
  priority: 100,
  description: "Existing WeChatAppEx and Frida address-table path",
  matches(environment) {
    const build = Number(environment && environment.wmpfBuild);
    const version = String(environment && environment.wechatVersion || "");
    return (Number.isFinite(build) && build > 0 && build < 19000)
      || /^(2|3)\./.test(version);
  },
});
