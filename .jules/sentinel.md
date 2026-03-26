## 2024-05-15 - [Security Enhancement] Add security headers to server.ts
**Vulnerability:** Missing common HTTP security headers in the Express application (`server.ts`).
**Learning:** The Express application lacked basic security headers like `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, and `X-XSS-Protection`, which are essential for defense in depth.
**Prevention:** Always implement a custom middleware to set these headers or use a library like `helmet` in Express applications to mitigate common web vulnerabilities such as clickjacking and MIME-type sniffing.