# QQ Farm CDP Manager - Bernadette Edition

QQ Farm CDP Manager is a protected desktop and web control tool for personal study, research, and public-benefit sharing.

This project is permanently free for public-benefit use. Reselling paid copies or paid repackaged versions is not allowed.

Current version: `v1.9.5`

## What Is New

- Added a unified friend-help executor that tries the new One-Click Farming entry first and falls back to legacy water, weed, and pest actions.
- Friend patrol now checks for One-Click Farming prompts after entering a friend farm, including steal-follow and guard-dog reward flows.
- QQ startup now uses limited launch/reload attempts, degraded waiting, and desktop diagnostic logs instead of aggressive small-window relaunch loops.
- Backpack-first planting now falls back to buying the highest-level available shop seed when the backpack has no usable seed.
- Purple land is recognized by the runtime, dashboard, and auto-fertilizer land-type filter.

## Main Features

- Own-farm automation for planting, harvesting, watering, weeding, pest removal, and related routine tasks.
- Friend-farm patrol for stealing, helping, guard-dog reward handling, and safer fallback behavior.
- Runtime support for QQ/Lite and WeChat/CDP modes.
- Desktop shell, web dashboard, local logs, and runtime health checks.
- Protected public release package with signed manifest, public verification files, and tamper checks.

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
