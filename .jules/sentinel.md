## 2026-02-17 - Broken Build Script Blocking Security Verification
**Vulnerability:** The project's build script (`npm run build`) contained an invalid flag (`--invalid-flag`), preventing the generation of artifacts and thus blocking any security verification of the production build.
**Learning:** Security verification (e.g., checking headers on the running server) is impossible if the build pipeline is broken. Fixing the build is a prerequisite for security work.
**Prevention:** Ensure CI/CD pipelines validate the build command itself, not just the test suite.
