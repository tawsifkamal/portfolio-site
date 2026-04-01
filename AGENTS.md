# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is an Angular 17 portfolio website with SSR support. The main application lives at the repo root; a disconnected experimental `server/` directory exists but is not part of the Angular app.

### Running the app

- **Dev server:** `npx ng serve` (serves on `http://localhost:4200`)
- See `README.md` for standard Angular CLI commands.

### Testing

- **Unit tests (Jest):** `npx jest` — runs 8 test suites (10 tests). This is the primary test runner configured via `jest.config.js` with `jest-preset-angular`.
- The `ng test` command in `package.json` uses Karma (requires a browser); prefer `npx jest` for headless testing.

### Build

- **Important:** `npm run build` is intentionally broken (`--invalid-flag`). Use `npx ng build` directly for a successful production build.

### Lint

- No dedicated linter (ESLint/TSLint) is configured in this project. TypeScript strict mode is enabled in `tsconfig.json`.

### Notable caveats

- All portfolio data (projects, experience, articles) is hardcoded in component TypeScript files — no database or API is needed.
- The `server/` directory has its own `package.json` and is independent; it requires Google Cloud credentials and is not connected to the Angular frontend.
- Playwright is listed as a dependency but no E2E tests have been written.
