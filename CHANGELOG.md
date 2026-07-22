# Changelog

## 2026-07-22 - 2.9.6

### Fixed

- Fixed the CDP friend-list transport truncating live friend leaderboards and
  Guard Dog scan input to 256 entries.
- Friend lists now preserve the runtime-detected friend count dynamically while
  unrelated large RPC arrays retain the existing safety cap.
- Added source and protected-package regression coverage for friend counts
  above 256 and verified the live Guard Dog scan receives the complete list.

## 2026-07-22 - 2.9.5

### Added

- Added verified local WMPF adaptation when an exact address profile is not
  available, with semantic PE discovery, a real runtime scene probe, and a
  DLL-hash-bound cache.
- Added explicit multi-account plans for up to three QQ farms plus one WeChat
  farm and a visual account picker for account-specific Web settings.

### Fixed

- Single-account desktop settings now open directly, while multi-account
  settings show account identity, nickname, level, platform, and avatar or a
  generated fallback.
- Expired Football Carnival controls now auto-disable and disappear from the
  Web page after the event cutoff without affecting compatible backend calls.
- Verified WMPF25122 can rebuild its profile locally with all exact 25122
  sources bypassed, then restore the real CDP context and scheduler.
- Verified the same WMPF, multi-account settings, expiry, integrity, and runtime
  contracts in both source and protected-package release paths.

## 2026-07-22 - 2.9.4

### Added

- Added clearer QQ and WeChat multi-account selection in desktop settings.
- Added exact WMPF20079 address-profile support and a validated exact-profile
  resolver for future WeChat runtime updates.

### Fixed

- Improved Warehouse item use, transaction priority, completion verification,
  and recovery to a fully rendered home farm after closing Warehouse surfaces.
- Fixed false-success states in immediate daily-action controls.
- Improved own-farm batch harvesting and retained safe residual friend-steal
  follow-up behavior.
- Improved desktop control click verification and source/protected consistency.
- Automated the native QQ account chooser for additional QQ farm accounts.
- Verified protected QQ and WeChat startup, multi-account Warehouse actions,
  theme persistence, scheduler actions, integrity, diagnostics, and health.

## 2026-07-18 - 2.9.3

### Added

- Added optional account-specific settings selection for multi-account farms.
- Added a documented product delivery loop covering requirements, design,
  implementation, verification, release, rollback, and post-release review.

### Fixed

- Improved Warehouse refresh, selling, daily item use, and close recovery so
  unrelated farm actions wait until the Warehouse transaction is complete.
- Improved multi-tile crop action targeting and concurrent harvest/steal
  handling.
- Simplified fertilizer strategies while preserving existing saved settings.
- Improved Web theme persistence, configuration profiles, desktop controls,
  runtime diagnostics, and source/protected behavior consistency.

## 2026-07-15 - 2.9.2

### Added

- Added isolated simultaneous runtime support for two QQ farms and one WeChat
  farm, with independent account state and daily action routing.

### Fixed

- Improved current and legacy WeChat runtime discovery and context recovery.
- Rechecked friend stealing, normal help, and Guard Dog behavior across isolated
  QQ and WeChat farm instances.
- Improved multi-account scheduled recovery so one QQ account cannot replace or
  disconnect another account during a maintenance cycle.
- Hardened LAN authorization, WebSocket backpressure, diagnostics, logs, and
  long-running persistence queues.
- Rechecked normal Windows startup, protected-package compatibility, signed
  integrity, runtime contracts, and performance safeguards.

## 2026-07-15 - 2.9.1

### Fixed

- Improved friend stealing when only a small amount remains or the farm is
  affected by current activity visuals.
- Improved multi-land steal follow-up speed while preserving crop blacklist
  safety.
- Improved large Guard Dog scans so progress is saved, recovery is safer, and
  long friend lists complete faster without blocking the local service.
- Rechecked QQ, WeChat, Web control, diagnostics, and protected-package
  compatibility.

## 2026-07-15 - 2.9

### Added

- Added support for current and legacy WeChat miniapp runtimes, including the
  latest tested WMPF build.
- Added persistent automatic/manual WeChat launch selection.
- Added daily Football Carnival purchases at 00:10 UTC+8 through July 20; the
  option turns itself off on July 21.

### Fixed

- Improved QQ and WeChat startup, reconnection, window recovery, and farm-page
  rendering without restarting the local control service.
- Improved own-farm harvesting, planting, fertilizing, dead-land cleanup, and
  multi-tile crop handling.
- Improved friend stealing, normal help, Guard Dog help, and reliable return to
  the home farm.
- Improved Warehouse tools, daily rewards, mailbox, and Mystery Merchant flows
  so temporary pages are closed after verified completion.
- Improved protected-package compatibility, diagnostics, integrity checks, and
  long-running performance.

## 2026-07-11 - 2.8

### Added

- Added daily UTC+8 01:00 Gift Center collection for the expanded WeChat farm
  layout while preserving the compact farm-window path as a safe no-op.
- Added Daily Welfare free-card handling. The runtime claims only the exact
  `每日福利` card when it is marked `免费` and `1/1`, verifies `0/1`, then
  returns through the RechargeUI top back control.
- Added a responsive three-day UTC+8 friend leaderboard for confirmed steal
  and help actions, including friend identity and avatar data when available.
- Added an opt-in concurrent follow-up mode for multiple four-tile steals.
  One-click stealing remains first; targeted follow-up is still disabled by
  default and can be configured independently.

### Fixed

- Gift Center and search-related window actions now discover the exact current
  WeChat farm HWND and UI Automation bounds for every action. They do not reuse
  saved coordinates or assume a fixed window position, and they cannot confuse
  a SouYiSou result window with the farm window.
- Hardened the Windows PowerShell transport for long UTF-16 UI Automation
  scripts and fully drains child output before parsing JSON.
- Improved status-card wrapping so long runtime URLs remain readable on narrow
  desktop cards and mobile layouts.

## 2026-07-11 - 2.7

### Fixed

- Added WMPF25047 runtime address compatibility while preserving WMPF20001 and WMPF20005 support.
- Fixed Mystery Merchant automation to invoke the live component purchase method and verify that both the merchant panel and hamster entry disappear before reporting success.
- Diamond-priced goods are skipped for user choice. The merchant is closed only through the top-right X; the bottom leave action is never used.
- Locked WeChat SouYiSou launch to the live search-window handle and an exact UI Automation result named `QQ经典农场`. Generic `经典农场`, `农场时光`, lower result cards, and coordinate-only result guesses are no longer clickable.
- Fixed duplicate WMPF miniapp clients and partial disconnect handling so only the active client answers CDP commands and a surviving connection keeps its execution context.
- Added in-place WX context rebind. Context recovery no longer closes or relaunches a connected game window, and the Web dashboard exposes a no-window rebind action.
- Fixed warehouse daily-item scheduling reading a reduced automation config instead of the persisted full user config. A live UTC+8 scheduled run used a real fertilizer item, verified inventory changed from 1 to 0, and closed its temporary UI surfaces.
- Synchronized source/protected-lite Mystery Merchant behavior and kept the protected runtime size gate green.

## 2026-07-02 - 2.6

### Fixed

- Reworked Mystery Merchant handling for the live hamster/NPC entry flow. The
  runtime now opens `MysteryShopNPC`, recognizes the `MysteryShopUI` panel, and
  handles the merchant before and after own-farm automation phases.
- Mystery Merchant auto-buy now purchases only coin/gold/golden-bean goods and
  skips diamond-priced goods so users can decide diamond purchases manually.
- Mystery Merchant close handling now uses the top-right X / `btn_close`
  binding and does not use the bottom leave / `请离` action.
- Kept both full and protected-lite runtime bundles within protected release
  size limits after the live WMPF20005 verification.
- Added regression coverage for the observed Mystery Merchant component names,
  X-only close behavior, diamond skip behavior, and protected runtime size
  budget.

## 2026-07-01 - 2.5.9

### Fixed

- Fixed a WeChat SouYiSou recovery loop where the launcher could keep replacing
  the already-entered QQ Classic Farm keyword instead of submitting the search.
- Improved warehouse daily item-use verification so the flow closes leftover
  shop/reward surfaces, reopens the warehouse for verification, and reports
  missing target tools explicitly instead of treating them as success.
- Added a persistent Web setting for Mystery Merchant auto-buy and kept
  non-diamond Mystery Merchant handling in both full and protected-lite runtime
  bundles.
- Fixed Qingmei land-detail image fallback by resolving the runtime crop to the
  local plant asset candidates.
- Improved warehouse item image fallback for runtime-only item names so Web
  warehouse entries avoid the default placeholder whenever a mapped asset can
  be inferred.

## 2026-07-01 - 2.5.8

### Fixed

- Fixed warehouse daily item-use scheduling so changing the UTC+8 trigger time or item IDs clears stale retry state and the new schedule can run at the configured time.
- Added a Web warehouse debug action to immediately run configured daily item use without waiting for the clock.
- Hardened WeChat SouYiSou recovery when the side search window opens but does not accept `QQ经典农场`; the launcher now verifies the search-box text, retries clipboard input, then safely falls back to the top-search route.
- Fixed land-detail crop images when runtime data only provides a plant id by resolving the plant id back to the local seed/stage image.
- Improved warehouse tool/item image fallback so fertilizers, organic fertilizers, and gift packages prefer runtime item names before falling back to item ids or the default image.
- Added opportunistic Mystery Merchant handling in the full runtime: coin/bean/free purchases are confirmed, diamond purchase prompts are skipped, and results are logged in own-farm automation.
- Fixed auto planting fallback when backpack-first priority seeds are locked or unusable; failed backpack execution now falls through to the configured secondary planting strategy using the remaining empty lands.

## 2026-07-01 - 2.5.7

### Fixed

- Fixed warehouse daily item-use settings persistence. The enable checkbox, item list, and UTC+8 trigger time now remain saved after refreshing the Web page and after the auto-farm status panel reloads.
- Improved warehouse item image fallback for fertilizers, gift packages, and golden/super fruit entries by deriving runtime asset candidates and falling back to base item names before showing the default PC placeholder.
- Fixed warehouse fruit tab classification so ordinary fruit with generic runtime mutation counters, such as mango, stays under the normal fruit tab instead of being moved into the super-mutant fruit tab.
- Improved friend stealing with crop blacklists and four-tile crops. Safe farms now use one-click stealing first, then run targeted four-tile follow-up where needed; blacklisted or unknown crops still use the safer targeted path.
- Added regression coverage for daily warehouse item-use persistence, normal-vs-mutant fruit classification, warehouse image URL inference, and four-tile friend-steal fallback behavior.

## 2026-06-30 - 2.5.5hotfix

### Fixed

- Restored protected legacy WeChat WMPF19201 startup by embedding the 19201 Frida address fallback used by older clients whose protected package no longer includes bulk address JSON files.
- Fixed warehouse auto-sell settings persistence so the enable switch, interval, and selected categories remain saved after refresh and after saving unrelated warehouse daily item-use settings.
- Fixed warehouse daily item-use settings persistence so the enable switch, UTC+8 trigger time, and configured item IDs remain saved after refresh and after saving unrelated auto-sell settings.
- Added a final shop-popup close step after automated warehouse item use for cases where the game jumps from the warehouse flow into a shop confirmation surface.
- Tightened unknown-crop hot update for friend stealing: newly discovered runtime crops are cached and exposed as blacklist options, then checked against the existing saved blacklist without being auto-added to that blacklist.
- Fixed blacklist/whitelist detail modal theme variables so the inner modal follows the selected light or dark dashboard theme.

## 2026-06-29 - 2.5.5

### Fixed

- Restored legacy WeChat CDP compatibility while keeping WMPF20005 as the priority runtime. Older WeChat builds now use the main-window top search route into SouYiSou before following the locked mini-game QQ Classic Farm result flow.
- Added a persistent WeChat launch mode option for manual or automatic launch recovery, without removing legacy WMPF/Frida address configuration.
- Improved own-farm land detail recognition so purple land is not mislabeled as gold land in the Web land detail view.
- Added UTC+8 scheduled warehouse item use for configured tool items. The warehouse flow now switches to the tools tab, handles package-style second `使用` windows, and handles normal or organic fertilizer container confirmation windows before verifying by reopening the warehouse.
- Rechecked other-place login reconnect handling and kept protected/lite runtime size verification within budget after the warehouse and WeChat changes.

## 2026-06-29 - 2.3.4

### Fixed

- Corrected own-farm purple-land display in the Web land detail view by preferring trusted detail-panel land-type inspection over runtime level fallback.
- Added a persistent Web log refresh switch so own-farm, friend-farm, and abnormal auto-farm logs can be viewed newest-first or with the old bottom-append behavior.
- Improved unknown crop hot update during friend stealing. Unknown mature crop components are now recorded even when the crop blacklist is not enabled; blacklist safety still blocks unsafe one-click stealing only when a blacklist is active.
- Improved friend-steal fallback behavior so a single unchanged target no longer stops the remaining batch, and ordinary one-click steal still follows with targeted land fallback when work remains.
- Replaced `gameConfig/plant_images/default/400.jpg` with the square PC Proofcore logo artwork.

## 2026-06-27 - 2.3.3

### Fixed

- Locked WeChat SouYiSou relaunch to the confirmed `WeChatAppEx` search-window handle. The launcher now tracks existing search windows, prefers a newly opened search hwnd, and keeps subsequent query submission bound to that same hwnd.
- Disabled WeChat main-window search fallback and coordinate-only SouYiSou entry fallback, preventing `QQ经典农场` from being typed into the WeChat chat window or recent-chat search when SouYiSou is not confirmed.
- Blocked dirty SouYiSou surfaces such as video/video-account and harvest-reminder result pages before any farm result click.
- Required UI Automation confirmation of the mini-game / mini-program tab before the first-card geometry fallback can click QQ Classic Farm.
- Added regression assertions for hwnd locking, guarded SendKeys, disabled main-window fallback, disabled chat-list coordinate fallback, and blocked geometry clicks on unconfirmed surfaces.

## 2026-06-27 - 2.3.2

### Fixed

- Added WMPF20001 and WMPF20005 Frida address JSON to the source runtime config, while retaining the embedded WMPF adapter fallback for protected builds that exclude bulk Frida address config.
- Hardened WeChat SouYiSou startup across window positions and display layouts. The launcher now keeps the SouYiSou window foreground/top overlay, locates the mini-game tab and QQ Classic Farm result through UI Automation, and uses proportional coordinate fallback only when UI Automation cannot expose the element.
- Added regression coverage for WMPF20001/WMPF20005 Frida address files and UIAutomation-first WeChat search result selection.

## 2026-06-27 - 2.3hotfix

### Fixed

- Added WMPF20005 runtime adaptation as the priority WeChat target while keeping WMPF20001 compatibility.
- Added embedded WMPF20001/WMPF20005 address overrides in the WMPF source adapter layer so the bridge can load when local Frida address JSON is unavailable, without modifying `wmpf/frida/`.
- Expanded WMPF build discovery to parse `RadiumWMPF/<build>`, `WMPF20005`, `WMPF 20005`, and `--wmpf-build=20005` forms.
- Hardened protected release structure: protected packages no longer include `src/`, `scripts/`, `docs/`, `wmpf/screenshots/`, or bulk `wmpf/frida/config/` address JSON.
- Moved protected core modules into hash-named `runtime/p*.js` files and updated protected integrity verification to use manifest-declared runtime core files.

## 2026-06-26 - 2.3

### Fixed

- Hardened the WeChat SouYiSou launch path after customer video review. After clicking the side SouYiSou entry, the WeChat main window is demoted from topmost, the SouYiSou window is promoted to the top overlay, and foreground confirmation is required before continuing.
- The farm search keyword is now written through the SouYiSou input control when UI Automation exposes it. Clipboard key fallback is allowed only after the SouYiSou window and input are confirmed safe.
- If a SouYiSou window is detected but cannot be brought to the top overlay, the launcher stops with a safe diagnostic instead of falling back to typing in the WeChat main window.
- Carried forward the backpack-first planting fix: empty backpack now falls back to the shop path, buys the highest-level available seed, and continues planting.

## 2026-06-26 - 2.2hotfix

### Fixed

- Hardened the WeChat SouYiSou launch path so the farm search keyword is only typed after the SouYiSou/search window is restored, foregrounded, and verified. This prevents `QQ经典农场` from being sent into a friend chat when focus is wrong.
- Restores/repositions the WeChat main window before clicking the side SouYiSou entry when the entry is off-screen or the window is outside the visible desktop.
- Fixed runtime backpack-first planting. When the backpack has no seeds, the runtime now opens the shop, selects the highest-level available seed, buys the needed count, and continues planting instead of stopping at `no_seeds_in_backpack`.
- Added regression coverage for WeChat foreground typing guards, off-screen WeChat restore, and backpack-empty shop fallback.

## 2026-06-26 - 2.2

### Fixed

- Hardened friend stealing with crop blacklists: if a mature friend crop cannot be proven safe from detailed grid identity, the executor no longer uses one-click harvest and records `blacklist_safety_unknown_crop`.
- Added runtime unknown-crop component hot update. Newly discovered mature actionable crop components are cached, exposed in the steal crop blacklist options as `runtime_unknown_crop`, and targeted once when their plant ID and land ID are known and the plant is not blacklisted.
- Improved mature-friend patrol recovery. Friend-status mature events now create temporary burst candidates even when the current friend-list cache does not contain that gid, so stale list reads do not starve a mature friend.
- Added a Guard Dog auto-import setting. When enabled, completed guard-dog scans merge active strong confirmed guard-dog friends into the Web friend-help whitelist and enable the help scope; when disabled, the existing guard-dog reward/help route is unchanged.
- Added regression coverage for unknown crop hot update, blacklist safety skip, burst-gid patrol inclusion, Guard Dog auto-import persistence, and Guard Dog UI wiring.

## 2026-06-24 - 2.1

### Fixed

- Added a dashboard debug action for the scheduled game-window relaunch path. It invokes the same window-only relaunch executor used by the 90-minute timer and does not restart the local service.
- The scheduled relaunch now verifies runtime readiness after every QQ/WX relaunch. If QQ `gameCtl` or WeChat `cdp.contextReady` is not restored, it schedules a short recovery retry instead of waiting for the next 90-minute cycle.
- Improved desktop WeChat startup recovery: after the service reaches the miniapp debug-bridge/context waiting state, the desktop shortcut is launched, context readiness is checked, and one automatic old-window kill plus relaunch retry is performed if the first launch still times out.
- If desktop WeChat startup still cannot reach context readiness after its immediate retry, it now hands off to the gateway background recovery loop so the local service continues relaunching the game window until the runtime is ready.
- Kept WeChat relaunch on the desktop QQ Classic Farm shortcut-first path, with protocol/command fallback only after shortcut launch is unavailable or fails.
- Normalized legacy corrupted QQ Classic Farm window-title settings such as `QQ??????` back to the correct title so old miniapp windows can be found and closed before relaunch.
- Extended regression coverage for the new scheduled relaunch API/UI route and the WeChat service-start -> bridge-wait -> shortcut-launch -> context-ready/relaunch sequence.

## 2026-06-23 - 2.0

### Changed

- Replaced the v1.9.9 in-game idle keepalive with a service-side scheduled game-window relaunch every 90 minutes.
- The scheduled relaunch closes or kills the old miniapp window first, then reopens the game window.
- WeChat scheduled relaunch uses the desktop `QQ经典农场` shortcut first, with the old protocol/command path only as fallback.
- QQ scheduled relaunch uses the existing QQ miniapp restart route and is independent from the user-facing QQ manual/auto host-mode setting.
- Desktop WeChat launch now starts the local service first, waits until the service has entered the miniapp debug-bridge/context waiting state, and only then opens the desktop shortcut.
- Protected builds no longer enable base64 string-array decoding or self-defending dynamic execution helpers in the obfuscator profile, and the release gate rejects protected JS files that expose callable decode or dynamic JS execution helpers.

## 2026-06-23 - 1.9.9

### Fixed

- Fixed Web dashboard theme persistence so the current light/dark selection is preserved when saving farm config, starting automation, or refreshing partial config state.
- Upgraded idle-disconnect keepalive from a lightweight click to a real warehouse open/wait/close interaction, with the old click path retained only as fallback diagnostics.
- Improved desktop shell runtime stability by moving Electron user data/cache into `data/desktop-shell-user-data`, adding renderer failure diagnostics, and keeping bridge failures explicit instead of silently leaving a static shell.
- Added desktop WX startup support that starts the local service first, waits for health readiness, then launches the desktop `QQ经典农场` shortcut before falling back to the existing manual CDP wait flow.
- Added regression checks for theme precedence, warehouse keepalive, desktop bridge diagnostics, and WX shortcut startup.

## 2026-06-23 - 1.9.8-hotfix4

### Fixed

- Reworked the desktop shell interaction layer so the whole shell is no longer a draggable region; only the title area is draggable and all buttons remain clickable.
- Fixed the desktop shell window height constraints so the v1.9.8-hotfix3 560px layout is no longer capped to the old 386px height.
- Rebuilt the desktop shell first viewport with separated title/actions, version/public/account identity, startup controls, and status cards.
- Switched desktop shell runtime labels to ASCII-safe English to prevent mojibake in protected packages.
- Added regression checks for clickable desktop controls, visible version badge rendering, and matching window height constraints.

## 2026-06-22 - 1.9.8-hotfix3

### Fixed

- Reworked the desktop shell layout after screenshot/OCR review: title, quick links, window controls, version, public-benefit badge, account identity, runtime selector, and status cards now have separate scan-friendly regions.
- Replaced mojibake text in the desktop shell first viewport and renderer status updates with clean UTF-8 Chinese labels.
- Changed desktop status cards to a two-column compact layout with bounded text so version, theme, account, service status, and task status no longer overlap.

## 2026-06-22 - 1.9.8-hotfix2

### Fixed

- Reverted the long-idle disconnect prompt auto-click method and removed the public `gameCtl.clickIdleDisconnectPrompt` runtime/RPC entry.
- Replaced popup auto-clicking with a configurable `idleDisconnectWatch` keepalive interaction that sends a lightweight manual-style click every 150 minutes.
- The keepalive path records detection and failures but does not click the "next time" disconnect prompt after it is already visible.
- Kept the light/dark theme persistence merge checks in the release gate so Web automation and config saves cannot overwrite the selected theme.

## 2026-06-22 - 1.9.8-hotfix

### Fixed

- Changed the long-idle disconnect popup watcher into an automatic handler.
- The runtime now detects the prompt that says the farm connection was disconnected after long inactivity and automatically clicks the confirm button, matching the existing other-place login reconnect behavior.
- `idleDisconnectWatch` is now enabled by default and can still be disabled from the control page.
- Added release-gate checks for the explicit `gameCtl.clickIdleDisconnectPrompt` runtime method and QQ RPC allow-list entry.

## 2026-06-22 - 1.9.8

### Added

- Added an idle-disconnect popup watcher for the long-idle prompt that says the farm connection was disconnected and asks the user to log in again.
- Added persistent `idleDisconnectWatch` configuration and runtime sync for both CDP/WX and QQ host paths.
- Added release-gate coverage for idle-disconnect watcher exports, config persistence, QQ RPC allow-listing, and web UI settings.

### Fixed

- Improved the desktop shell layout so version, public-benefit status, quick links, theme/settings/window actions, account identity, and status cards no longer compete for the same titlebar space.
- Preserved all v1.9.8-b LAN mobile token fixes, v1.9.8-hotfix desktop/mobile fixes, and v1.9.8-test friend mischief safety rules in the formal protected release.

## 2026-06-19 - 1.9.8-b

### Fixed

- Fixed LAN mobile-control token access so a tokenized `/mobile.html` URL also carries the token into same-origin static resources, API calls, and WebSocket connections.
- Allowed enabled LAN mobile control with a valid token to pass access checks even when the client address is reported in an unexpected non-local or IPv6 form.
- Kept tokenless non-local access rejected and preserved random-token protection.

## 2026-06-18 - 1.9.8-hotfix

### Fixed

- Fixed the desktop shell Settings button after LAN mobile control changes by opening the local settings page through `127.0.0.1` even when the gateway listens on `0.0.0.0`.
- Reduced desktop shell crowding by increasing the shell height, allowing vertical scrolling, and moving secondary status cards behind a collapsed "More status" section.
- Changed `/mobile.html` to serve the full web control page with mobile-adaptive CSS and token-aware fetch handling instead of a reduced partial page.
- Implemented the two-step friend mischief runtime action: click a friend land tile first, wait for the grass or bug component, then click that component before counting the action.
- Rebuilt `button-lite.js` so protected packages include the friend mischief runtime method.
- Re-verified light/dark theme persistence through the user settings persistence test.

## 2026-06-18 - 1.9.8-test

### Added

- Added a low-priority `friend_mischief` scheduler task for friend-farm grass and bug actions after entering a friend's farm.
- Added a shared friend mischief daily ledger stored under stable user data, with grass and bug actions sharing one hard-capped 100-action daily limit.
- Added friend mischief diagnostics in `friend-mischief-trace.jsonl` with ledger, candidate, enter-farm, action, and counter-result reason codes.
- Added disabled-by-default LAN mobile control settings with random token protection, mobile config update API, and mobile page entry.

### Changed

- Added friend mischief controls to the web dashboard and kept the task lower priority than own-farm work, normal help, guard-dog help, and friend stealing.
- LAN mobile access remains local-only unless explicitly enabled; non-local LAN clients must pass token validation when required.
- Added release-gate tests for friend mischief config, friend mischief ledger persistence, and LAN mobile control safety.

## 2026-06-18 - 1.9.7-hotfix

### Fixed

- Added a persistent user-facing QQ host mode setting.
- Users can now switch between automatic QQ bootstrap and manual QQ host attach mode without using PowerShell environment variables.
- Manual QQ host mode is now saved and restored after restart.
- Fixed theme mode persistence.
- Fixed an issue where enabling Web automation could unexpectedly switch between light and dark mode.
- Fixed an issue where saving settings could overwrite the selected theme mode.
- Improved user settings merge behavior to avoid unrelated settings being reset.

## 2026-06-18 - 1.9.7

- Added QQ manual-host fallback mode (`--qq-manual-host` or `FARM_QQ_HOST_MODE=manual`) so affected protected users can open QQ Farm manually while the app waits, attaches to the detected host, and suppresses automatic reloads.
- Added QQ restart-source diagnostics for bootstrap, process guard, manual-host suppression, WebSocket state, GameCtl readiness, runtime-context readiness, and health timeout state.
- Fixed normal friend-help limit handling so stale state from the old 100-help boundary is recalculated after the configured limit changes, including 100 to 1000.
- Added normal friend-help diagnostics for configured/effective limit, counter state, candidate creation, schedule-only no-ops, dispatch, real action execution, and skip reasons.
- Prioritized own-farm plant-after-harvest follow-up work and added harvest-to-plant delay diagnostics with reason codes for runtime readiness, state refresh, seed strategy, no seed, scheduler queue, and cooldown.
- Wired v1.9.7 regression checks into the dual release gate alongside protected desktop diagnostics, guard-dog, planting, and protected-runtime checks.

## 2026-06-18 - 1.9.6-PUBLIC-20260618-003

- Prepared the final v1.9.6 protected release candidate from build `PUBLIC-20260618-003`; older build ids `20260617-007`, `20260618-001`, and `20260618-002` must not be published for this release.
- Fixed protected desktop status flapping by preserving process-aware health state: `processAlive`, `httpReady`, `gatewayReady`, `schedulerReady`, and `runtimeReady` are reported separately, with a 5000 ms health timeout and short stale-health grace.
- Added desktop JSONL diagnostics for protected status, QQ runtime, scheduler, own-farm work, friend stealing, normal help, and guard-dog help so first-action and no-op reasons can be verified after packaging.
- Kept the signed protected package checks as release blockers: manifest verification, whitelist checks, sensitive-data scan, source-leak scan, tamper tests, protected runtime size checks, and clean UTF-8 documentation scan.
- Verified the protected QQ runtime reached `qq_ws_connected`, `qq_runtime_context_ready`, and `runtime_synced`; own-farm work and friend-help flows record real-action or explicit no-op reason codes.

## 2026-06-17 - 1.9.6

- Fixed the updated QQ one-click work tool layout: weed and pest work now fall back to the active visible work button when the old fixed indexes are not present.
- Own-farm work now verifies real count reduction and no longer reports a protected runtime task as successful when weed or pest counts do not change.
- Friend help now retries One-Click Farming first and then runs all legacy help actions, covering watering, weed removal, and pest removal in normal, steal-follow, and guard-dog help flows.
- Added QQ WebSocket grace handling so bootstrap and process guard do not treat short reconnecting, just-disconnected, or just-ready states as immediate host failures.
- Added four-tile crop follow-up stealing after one-click harvest, even when the summary collect count already reached zero.
- Added regression coverage for protected lite one-click work fallback, own-farm full work execution, QQ WebSocket reconnect grace, friend-help legacy coverage, and four-tile post-one-click stealing.

## 2026-06-17 - 1.9.5

- Added a shared friend-help executor that detects the new One-Click Farming entry before falling back to legacy water, weed, and pest help actions.
- Extended friend patrol, steal-follow help, normal help, and guard-dog reward help to use the same help executor and detailed friend-help logs.
- Changed QQ startup to limited launch/reload attempts with degraded waiting and desktop diagnostic log export on final failure or PowerShell timeout.
- Fixed backpack-first planting so an empty backpack falls back to the highest-level available shop seed and continues planting after purchase.
- Added purple land recognition to runtime land detection, dashboard display, and auto-fertilizer land-type filtering.

## 2026-06-17 - 1.9.4

- Replaced the public README, changelog, and GitHub release notes with clean English text to remove corrupted Chinese text from the public repository.
- Kept the protected release flow unchanged: source artifacts remain private, and only protected public artifacts are published.
- Kept the 1.9.3 desktop minimize button and guard-dog scheduler improvements in the public protected package.

## 2026-06-17 - 1.9.3

- Added a minimize button to the desktop shell so the window can be hidden to the background without stopping the service.
- Added guard-dog reward wait/probe logic after entering a friend's farm to reduce cases where the app arrives and returns without action.
- Added clearer scheduler protocol fields for runnable candidates, readiness, cooldowns, skipped reasons, and confirmed real action progress.
- Updated public documentation to describe changes without exposing friend identifiers, test sample IDs, or internal runtime IDs.

## 2026-06-16 - 1.9.2hotfix

- Improved guard-dog and friend-help scheduling so empty or failed reward routes do not immediately spin every second.
- Added idle backoff and wake-up behavior for guard-dog reward queues.
- Reduced noisy QQ host bootstrap status refreshes when the runtime bundle is already current.

## 2026-06-16 - 1.9.2

- Improved QQ host reconnect and recovery handling.
- Fixed guard-dog reward reporting so success and failure states better reflect real runtime outcomes.
- Improved friend-steal routing with one-click harvest first and safer fallback paths for special cases.
- Kept public documentation at a high level without exposing private identifiers.

## 2026-06-16 - 1.9

- Improved friend-patrol sensitivity when the friend list already contains stealable or helpable state.
- Improved scheduler priority so due friend-steal work is not starved by helper tasks.
- Strengthened friend-context confirmation before acting on a farm.
- Improved WeChat/CDP, QQ/Lite, and protected-runtime paths to reduce repeated scans and repeated CDP calls.
- Updated desktop and web branding assets.

## 2026-06-15 - 1.8.9

- Improved friend switching, context recovery, and background connection stability.
- Improved special-crop detection and protected build performance.
- Added clearer platform switching status and configuration hints.
- Changed reward-help handling to prefer cached and manually scanned data.

## 2026-06-14 - 1.8.8

- Combined fixes for protected trust, friend-context confirmation, runtime batch stealing, and preview recovery.
- Improved four-tile crop, mixed maturity, step-by-step maturity, and blacklist fallback handling.
- Improved protected release generation, integrity verification, and local protected test package creation.
