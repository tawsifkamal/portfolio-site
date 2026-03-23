## 2026-03-23 - [Missing Security Headers]
**Vulnerability:** The Express server in `server.ts` lacked standard security headers (Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection) and leaked information via `X-Powered-By`.
**Learning:** In minimal Express setups (like Angular Universal), security headers are not provided by default and must be explicitly configured to prevent information leakage and attacks.
**Prevention:** Always include a middleware to set essential security headers or use a library like `helmet` in Express servers.
