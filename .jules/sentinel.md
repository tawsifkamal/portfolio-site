## 2026-02-19 - Testing Angular SSR Entry Points
**Vulnerability:** N/A (Testing Challenge)
**Learning:** Testing `server.ts` directly with Jest/ts-jest fails due to `import.meta.url` (ESM) usage when Jest runs in CJS mode. `jest-preset-angular` enforces CJS transforms.
**Prevention:** Verify SSR server changes by building the application (`ng build`) and testing the generated artifact (`dist/.../server.mjs`) using a Node script, rather than unit testing the source file directly.
