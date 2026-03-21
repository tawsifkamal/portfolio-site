## 2024-05-18 - [Add basic security headers]
**Vulnerability:** Express default configurations expose the `X-Powered-By` header and lack basic security headers (HSTS, Content-Type-Options, Frame-Options, XSS-Protection), which can leak information and allow various web vulnerabilities.
**Learning:** Adding helmet or manually configuring these basic headers is essential in any Node/Express app to provide a basic layer of defense in depth.
**Prevention:** Include these headers in the Express bootstrap by default.

## 2024-05-18 - [Remove hardcoded Google Cloud Project ID]
**Vulnerability:** Hardcoded Google Cloud Project ID in code (`server/genAi.js` and `server/test.js`).
**Learning:** Hardcoding project IDs can lead to unauthorized access and resource manipulation if the code is exposed or leaked.
**Prevention:** Use environment variables (e.g., `GOOGLE_CLOUD_PROJECT`) to inject sensitive configuration values at runtime.
