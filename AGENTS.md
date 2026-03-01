# Repository Guidelines

## Project Structure & Module Organization

Application code lives in `src/` and is organized by feature:

- `src/modules/<feature>/` contains domain code (for example `todos/`).
- `src/common/` contains shared utilities like env parsing and logging.
- `src/plugins/` contains global Fastify plugins (route loader, docs).
- `src/main.ts`, `src/server.ts`, `src/bootstrap.ts`, and `src/init.ts` handle startup and wiring.

Static assets are in `public/`. Build output goes to `build/` and test coverage to `coverage/` (both generated artifacts).

## Build, Test, and Development Commands

- `yarn run start:dev`: run locally with `tsx watch` and inspector.
- `yarn run build`: compile TypeScript to `build/` and resolve path aliases.
- `yarn run start`: run compiled app from `build/main.js`.
- `yarn run test`: run Jest tests.
- `yarn run test --coverage`: run tests with coverage report (used in CI).
- `yarn run lint`: run ESLint checks.
- `yarn run format`: apply Prettier to `src/**/*.{ts,js}`.

## Coding Style & Naming Conventions

Use TypeScript with 2-space indentation, single quotes, trailing commas, and LF line endings (see `.prettierrc`).
ESLint uses `typescript-eslint` recommended rules; run lint before opening a PR.

Naming conventions are file-driven:

- Routes: `*.route.ts`
- Schemas: `*.schema.ts`
- Services: `*.service.ts`
- Tests: `*.spec.ts` (or `*.test.ts`)

Prefer the `@/` import alias (configured in `tsconfig.json`) for code under `src/`.

## Testing Guidelines

Tests are colocated with source files (for example `src/modules/todos/todos.route.spec.ts`) and run on Jest + `@swc/jest`.
Cover route behavior, schema validation, and service logic. Keep tests deterministic and independent.

## Commit & Pull Request Guidelines

Use Conventional Commit style seen in history: `feat: ...`, `fix: ...`, `deps: ...`, `chore: ...`.
Keep subject lines imperative and concise.

For PRs, include:

- What changed and why.
- Linked issue (if applicable).
- Test evidence (`yarn run lint`, `yarn run test --coverage`, `yarn run build`).
- API examples when request/response behavior changes.

CI validates lint, tests with coverage, build, and Docker image checks; ensure all pass before merge.
