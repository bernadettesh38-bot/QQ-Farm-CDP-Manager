"use strict";

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function scoreTarget(target, options = {}) {
  const appId = normalize(options.appId);
  const originalId = normalize(options.originalId);
  const displayName = normalize(options.displayName);
  const title = normalize(target.title || target.name);
  const url = normalize(target.url || target.origin);
  const runtime = target.runtime && typeof target.runtime === "object" ? target.runtime : {};
  let score = 0;
  const reasons = [];

  if (appId && normalize(target.appId) === appId) {
    score += 1000;
    reasons.push("appId");
  } else if (appId && normalize(target.appId)) {
    score -= 2000;
    reasons.push("appId_mismatch");
  }
  if (originalId && normalize(target.originalId) === originalId) {
    score += 900;
    reasons.push("originalId");
  } else if (originalId && normalize(target.originalId)) {
    score -= 1800;
    reasons.push("originalId_mismatch");
  }
  if (runtime.isMiniProgram) {
    score += 300;
    reasons.push("miniprogram_runtime");
  }
  if (runtime.hasFarmRuntime) {
    score += 280;
    reasons.push("farm_runtime");
  }
  if (runtime.hasCocos) {
    score += 120;
    reasons.push("cocos");
  }
  if (displayName && (title.includes(displayName) || url.includes(displayName))) {
    score += 60;
    reasons.push("title");
  }
  if (/servicewechat|weixin|wechat|gamecontext|miniprogram/i.test(`${title} ${url}`)) {
    score += 40;
    reasons.push("wechat_hint");
  }
  if (runtime.evaluateAvailable === false) {
    score -= 1000;
    reasons.push("evaluate_unavailable");
  }

  return { score, reasons };
}

function selectTarget(targets, options = {}, logger = null) {
  const ranked = (Array.isArray(targets) ? targets : []).map((target) => ({
    target,
    ...scoreTarget(target, options),
  })).sort((a, b) => b.score - a.score);

  const candidate = ranked.find((item) => item.score >= 100);
  if (!candidate) {
    const error = new Error("No verified mini program target was found");
    error.code = "target_not_miniprogram";
    error.rankedTargets = ranked;
    throw error;
  }

  const usedTitleFallback = !options.appId
    && !options.originalId
    && candidate.reasons.includes("title");
  if (usedTitleFallback && options.fallbackToTitleMatch !== false && logger) {
    logger.warn("fallback_title_match_used", {
      targetId: candidate.target.id,
      title: candidate.target.title || candidate.target.name || "",
    });
  }
  if (logger) {
    for (const item of ranked) {
      logger.info(item === candidate ? "target_bound" : "target_filtered", {
        targetId: item.target.id,
        title: item.target.title || item.target.name || "",
        url: item.target.url || item.target.origin || "",
        score: item.score,
        reasons: item.reasons,
      });
    }
  }
  return { ...candidate, usedTitleFallback, ranked };
}

module.exports = { scoreTarget, selectTarget };
