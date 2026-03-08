## 2026-03-08 - Missing Express Security Headers
**Vulnerability:** Missing standard security headers (X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security) and exposed x-powered-by header in Express server.
**Learning:** Default Express installations don't include security headers and leak the framework used via x-powered-by. This project was missing basic Express security enhancements.
**Prevention:** Always disable x-powered-by and use a middleware to inject security headers (e.g. manual headers or helmet) when creating an Express app.
