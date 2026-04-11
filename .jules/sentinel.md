## 2026-04-11 - Add Security Headers to Express Server
**Vulnerability:** The Express server lacked basic security headers (HSTS, nosniff, X-Frame-Options, X-XSS-Protection) and exposed the `x-powered-by` header.
**Learning:** Even server-side rendering (SSR) web servers need foundational security headers to protect against clickjacking, MIME-sniffing, and cross-site scripting (XSS), as well as to minimize information leakage.
**Prevention:** Always configure `helmet` or custom middleware to enforce security headers and disable `x-powered-by` on Express applications.
