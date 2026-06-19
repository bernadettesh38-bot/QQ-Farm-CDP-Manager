"use strict";

async function capturePreviewFrame(adapter, context, options = {}, logger = null) {
  try {
    const frame = await adapter.capturePreviewFrame(context, options);
    if (logger) {
      logger.info("preview_capture_ok", {
        adapter: adapter.id,
        mediaType: frame.mediaType,
        bytesBase64: frame.data.length,
      });
    }
    return frame;
  } catch (error) {
    const message = String(error instanceof Error ? error.message : error);
    if (logger) {
      logger.error("preview_capture_failed", {
        adapter: adapter && adapter.id || null,
        code: error && error.code || "preview_capture_failed",
        message,
      });
    }
    const wrapped = error instanceof Error ? error : new Error(message);
    if (!wrapped.code) wrapped.code = "preview_capture_failed";
    throw wrapped;
  }
}

module.exports = { capturePreviewFrame };
