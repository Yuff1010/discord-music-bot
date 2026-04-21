# AGENTS.md

## Purpose

This repository builds a self-hostable Discord music bot with `discord.js` and `discord-player`.

Humans steer. Agents execute.

The repo is intentionally documented so future agents can work from repository context instead of hidden human memory.

## Start Here

Read these files in order before making non-trivial changes:

1. [README.md](README.md)
2. [docs/INDEX.md](docs/INDEX.md)
3. [docs/product-specs/PRD.md](docs/product-specs/PRD.md)
4. [docs/project/PROJECT.md](docs/project/PROJECT.md)
5. [docs/project/PROGRESS.md](docs/project/PROGRESS.md)
6. [docs/exec-plans/active/mvp-core-music-bot.md](docs/exec-plans/active/mvp-core-music-bot.md)
7. [docs/HARNESS.md](docs/HARNESS.md)

## Source Of Truth

- Product scope lives in `docs/product-specs/PRD.md`
- Architecture, milestones, and risk live in `docs/project/PROJECT.md`
- Current status lives in `docs/project/PROGRESS.md`
- Step-by-step delivery work lives in `docs/exec-plans/active/`
- Agent operating rules live in `docs/HARNESS.md`

If code behavior changes, update the matching document in the same task.

## Current Priorities

- Deliver the MVP music command set: `/play`, `/skip`, `/stop`, `/queue`
- Add player event feedback in `src/events/player/`
- Add tests around validation and queue-facing behavior
- Fix mojibake in current Chinese user-facing strings

## Working Rules

- Prefer small vertical slices over broad rewrites.
- Keep command modules self-contained and legible.
- Do not add a new environment variable without updating `.env.example` and docs.
- Do not leave active plans stale after meaningful progress.
- Treat `docs/` as the system of record, not external chat history.
- Finish work in small tested slices. After each slice, run verification, commit, and push so GitHub Actions can validate CI.

## Verification

Run the smallest relevant checks, then update docs:

- `npm run docs:check`
- `npm test`
- `npm run register` only when Discord credentials are available

For completed slices, local verification should happen before commit. GitHub remains the second gate, not the first one.

## Repo Map

- `src/client.js`: Discord client and player bootstrap
- `src/index.js`: process startup
- `src/commands/`: slash commands
- `src/events/`: Discord event handlers
- `src/events/player/`: planned player event handlers
- `src/handlers/`: dynamic loaders and command registration
- `src/utils/`: embeds, formatting, validation helpers
- `docs/`: product, project, progress, harness, execution plans

## Change Policy

For any meaningful feature or architecture change:

1. Confirm scope in the PRD and active plan.
2. Implement the smallest testable increment.
3. Run verification.
4. Update `docs/project/PROGRESS.md`.
5. If scope or approach changed, update the related spec or plan.
