# QQ Farm CDP Manager - Bernadette Edition

QQ Farm CDP Manager is a protected desktop and web control tool for personal study, research, and public-benefit sharing.

This project is permanently free for public-benefit use. Reselling paid copies or paid repackaged versions is not allowed.

Current version: `v1.9.7`

## What Is New

- v1.9.7 adds QQ manual-host fallback mode for machines where automatic QQ bootstrap still causes protected restart loops.
- QQ restart diagnostics now record the restart source, runtime state before restart, and whether a recent live WebSocket or manual-host mode suppressed a reload.
- Normal friend help now clears stale daily-limit state after changing the configured limit, so a previous 100-help state does not block a later 1000-help setting.
- Normal help diagnostics now distinguish schedule updates, candidate creation, task dispatch, real actions, and explicit skip reasons.
- Own-farm planting now creates a prioritized plant-after-harvest follow-up and records delay reasons when dispatch takes longer than expected.
- Release candidate `v1.9.6-PUBLIC-20260618-003` was the protected package selected for the previous v1.9.6 verification.
- Protected desktop status now keeps layered readiness fields separate so a live local process is not reported as stopped just because one health probe is slow.
- Desktop diagnostics now write JSONL traces for protected status, QQ runtime, scheduler decisions, own-farm work, friend stealing, normal help, and guard-dog help.
- Fixed QQ one-click farming for the updated tool layout where weed and pest work share a visible work button instead of the old fixed indexes.
- Own-farm work now retries and verifies real progress before reporting success.
- Friend help now keeps One-Click Farming first and uses water, weed, and pest legacy actions as a fallback across normal, steal-follow, and guard-dog flows.
- QQ WebSocket reconnect grace now avoids repeated host reloads during short disconnect, just-ready, and reconnecting states.
- Friend steal now follows one-click harvest with four-tile targeted fallback when the runtime detects four-tile crops.

## Main Features

- Own-farm automation for planting, harvesting, watering, weeding, pest removal, and related routine tasks.
- Friend-farm patrol for stealing, helping, guard-dog reward handling, and safer fallback behavior.
- Runtime support for QQ/Lite and WeChat/CDP modes.
- Desktop shell, web dashboard, local logs, and runtime health checks.
- Protected public release package with signed manifest, public verification files, and tamper checks.
- ASCII-safe reason codes for protected runtime diagnostics and release verification.

## How To Use

1. Download the protected release ZIP from GitHub Releases.
2. Extract it to a short path that uses English characters where possible.
3. Run `Windows_start.bat`.
4. Choose QQ or WeChat mode according to your local runtime.
5. Open the matching QQ Farm page and wait for the dashboard to report a ready context.
6. Start auto farm or run individual tasks as needed.

WeChat mode currently expects the user to open the WeChat QQ Farm page manually. Automatic discovery and automatic opening of the WeChat host may be improved in later versions.

## Public Release Policy

- The public repository and public release packages contain only the protected distribution.
- Source artifacts stay in private storage and are not uploaded to the public repository.
- Public README, changelog, and release notes describe feature-level changes only.
- Do not publish personal account information, friend identifiers, test sample identifiers, or internal runtime IDs in public documentation.
- The project remains free for public-benefit use.

## Feedback

Please report feature requests, runtime issues, and game-update compatibility problems through the public project channels. Include the visible symptom, platform, runtime mode, and reproduction steps when possible. Do not publish personal account data or friend identifiers.
