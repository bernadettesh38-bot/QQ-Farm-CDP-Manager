# QQ Farm CDP Manager - Bernadette Edition

QQ Farm CDP Manager is a protected desktop and web control tool for personal study, research, and public-benefit sharing.

This project is permanently free for public-benefit use. Reselling paid copies or paid repackaged versions is not allowed.

Current version: `v1.9.8-hotfix4`

## What Is New

- v1.9.8-hotfix4 fixes the desktop shell click regression by making only the title area draggable and keeping every button/control in a no-drag interaction layer.
- v1.9.8-hotfix4 fixes the shell height constraint mismatch that kept the window capped to the old compact height and caused crowding/scroll pressure.
- v1.9.8-hotfix4 keeps the desktop shell labels ASCII-safe in protected packages so version, status, theme, settings, and account text do not render as mojibake.
- v1.9.8-hotfix2 removes the long-idle disconnect prompt auto-click path and uses a low-frequency keepalive interaction instead.
- v1.9.8-hotfix3 cleans up the desktop shell after screenshot/OCR review: top controls, version, account, runtime selector, and status cards are separated and mojibake labels were replaced with readable UTF-8 text.
- The idle-disconnect keepalive is enabled by default through `idleDisconnectWatch`, runs every 150 minutes, and can still be disabled from the control page.
- v1.9.8 is the formal protected release that includes the v1.9.8-b LAN token fix, v1.9.8-hotfix desktop/mobile fixes, and v1.9.8-test friend mischief safety work.
- v1.9.8 adds an idle-disconnect popup watcher for the long-idle prompt that says the farm connection was disconnected and asks the user to log in again.
- v1.9.8-b fixes LAN mobile token access so the tokenized mobile URL keeps working for page resources, API calls, and WebSocket connections.
- v1.9.8-hotfix fixes the desktop shell Settings button when LAN mobile control is enabled.
- The desktop shell layout is less crowded, with secondary status details folded under "More status".
- The mobile LAN page now serves the full web settings page with mobile-adaptive styling and token-aware requests.
- Friend mischief now performs the required two-step action: click a friend land tile, then click the grass or bug component that appears.
- Light/dark theme persistence was rechecked with the user settings persistence test.
- v1.9.8-test adds a low-priority friend mischief task for grass and bug actions after entering a friend's farm.
- Friend mischief uses one shared daily limit for grass and bug actions, hard-capped at 100 per day.
- Friend mischief counters are stored in stable user data so QQ/WX switching, service restart, and package replacement do not reset the same-day count.
- The dashboard now includes friend mischief controls and LAN mobile-control settings.
- LAN mobile control is disabled by default. When enabled, non-local LAN access is protected by a random token and config updates reload the scheduler settings.
- v1.9.7-hotfix makes QQ manual-host mode a persistent user-facing setting in the desktop shell and control page.
- Users can switch between automatic QQ bootstrap and manual QQ host attach mode without PowerShell environment variables.
- Manual QQ host mode is saved and restored after restart; advanced environment variables still work as overrides.
- Light/dark theme mode now persists independently from Web automation and farm settings.
- Saving Web automation settings now merges user settings safely and does not overwrite the selected theme mode.
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
