## 2024-05-18 - [Add basic security headers to Express server]
**Vulnerability:** The default Angular SSR Express boilerplate in `server.ts` does not implement basic security headers (like X-Content-Type-Options, X-Frame-Options), and exposes the Express technology stack via `X-Powered-By`.
**Learning:** Default boilerplate configurations for Node.js web frameworks like Express often lack essential security configurations out-of-the-box.
**Prevention:** Always implement basic security headers manually or via libraries like `helmet` when setting up Express servers.