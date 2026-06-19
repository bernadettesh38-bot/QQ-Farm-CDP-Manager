"use strict";

function contextToTarget(context) {
  return {
    id: context.id,
    title: context.name || "",
    url: context.origin || "",
    origin: context.origin || "",
    executionContextId: context.id,
    runtime: {
      evaluateAvailable: true,
      isMiniProgram: /game|miniprogram|servicewechat/i.test(
        `${context.name || ""} ${context.origin || ""}`,
      ),
    },
  };
}

function createWechatAdapter(definition) {
  return {
    id: definition.id,
    priority: definition.priority,
    description: definition.description,
    matches: definition.matches,
    async discoverTargets(context) {
      const session = context.session;
      const client = session && session.client;
      const contexts = client && typeof client.getContexts === "function"
        ? client.getContexts()
        : [];
      return contexts.map(contextToTarget);
    },
    async capturePreviewFrame(context, options = {}) {
      const session = context.session;
      if (!session || typeof session.sendCommand !== "function") {
        const error = new Error("The selected adapter does not have a CDP session");
        error.code = "preview_unsupported";
        throw error;
      }
      await session.sendCommand("Page.enable", {}, options.timeoutMs);
      const format = String(options.format || "jpeg").toLowerCase() === "png" ? "png" : "jpeg";
      const params = { format };
      if (format === "jpeg") params.quality = Math.max(1, Math.min(100, Number(options.quality) || 60));
      const response = await session.sendCommand("Page.captureScreenshot", params, options.timeoutMs);
      const data = response && typeof response.data === "string" ? response.data : "";
      if (!data) {
        const error = new Error("CDP did not return screenshot data");
        error.code = "preview_capture_empty";
        throw error;
      }
      return {
        ts: new Date().toISOString(),
        mediaType: format === "png" ? "image/png" : "image/jpeg",
        data,
        adapter: definition.id,
      };
    },
  };
}

module.exports = { contextToTarget, createWechatAdapter };
