# Encoding Scan Report

Date: 2026-06-18

## Scope

- Command used for public docs gate: `node scripts/scan-mojibake.cjs --docs-only --fail`
- Public docs checked: `README.md`, `CHANGELOG.md`, `AGENTS.md`, `AI_AGENT_POLICY.md`, `docs/`
- Runtime/source scan command: `node scripts/scan-mojibake.cjs`

## Result

- Public documentation gate: PASS.
- `AI_AGENT_POLICY.md` was rewritten as clean English UTF-8.
- `AGENTS.md` now requires clean UTF-8 public documentation and English fallback when Chinese text cannot be verified.
- A reusable mojibake scanner was added at `scripts/scan-mojibake.cjs`.

## Remaining Legacy Findings

The broader source scan still reports legacy mojibake in runtime UI/log strings,
mainly in:

- `public/index.html`
- `src/auto-farm-manager.js`

These files contain many existing user-facing Chinese strings that were already
corrupted before this task. Public README/changelog/policy files are clean, but
a complete source UI string migration should be handled as a dedicated follow-up
because broad mechanical replacement in these large files can break JavaScript
syntax and release behavior.

## Rule Going Forward

- Public GitHub documentation must be English or verified-readable UTF-8 Chinese.
- New diagnostics should prefer ASCII status codes and reasons.
- Do not publish public-facing mojibake text in README, CHANGELOG, release notes,
  policy files, or release package metadata.
