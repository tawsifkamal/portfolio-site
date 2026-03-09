## 2024-03-09 - [Express Server Missing Security Headers]
**Vulnerability:** The Express server implementation for Angular SSR in `server.ts` was missing basic security headers (Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options) and exposed the `X-Powered-By` header, which could leak server framework details.
**Learning:** Even default server-side rendering configurations in frameworks like Angular Universal/SSR need manual hardening to protect against basic web vulnerabilities (like clickjacking or MIME-sniffing) and info disclosure.
**Prevention:** Always implement basic security headers (e.g., using Helmet or manually) and disable `x-powered-by` when exposing an Express app, even if it merely serves an Angular SSR application.
