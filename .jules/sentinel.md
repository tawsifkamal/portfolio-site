## 2024-05-14 - Fix Hardcoded Google Cloud Project ID
**Vulnerability:** Google Cloud Project IDs were hardcoded in `server/genAi.js` and `server/test.js`. While a Project ID alone isn't highly sensitive, it provides attackers with the target for potential resource exhaustion or discovery if combined with other vulnerabilities or misconfigurations. More critically, hardcoding environment-specific configurations like Project IDs breaks the ability to easily rotate keys/projects or deploy to different environments securely.
**Learning:** Configurations for cloud services must be dynamic and driven by environment variables to ensure flexibility and security.
**Prevention:** Always use environment variables (e.g., `process.env.GOOGLE_CLOUD_PROJECT`) for cloud configurations instead of hardcoding them in the source code. Ensure the application fails safely if critical configurations are missing.

## 2024-05-14 - Add Standard Security Headers
**Vulnerability:** The Express server in `server.ts` was missing standard security headers (Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection) and was exposing the `x-powered-by` header. This could lead to information leakage (revealing the tech stack) and exposes the application to common web vulnerabilities like Clickjacking, MIME-sniffing, and Cross-Site Scripting (XSS).
**Learning:** Default configurations of web servers like Express do not include necessary security headers. They must be explicitly configured to provide a baseline level of defense in depth against common web attacks.
**Prevention:** Always configure web servers to disable information-leaking headers (like `x-powered-by`) and include standard security headers via middleware or configuration settings.
