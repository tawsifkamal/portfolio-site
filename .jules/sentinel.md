## 2024-05-20 - Hardcoded Secrets in Config
**Vulnerability:** Found a hardcoded GCP project ID (`adept-bison-407117`) in `server/genAi.js` and `server/test.js`.
**Learning:** Hardcoding project IDs or any cloud platform configuration into version control can be an information disclosure that enables targeted attacks.
**Prevention:** Use environment variables like `process.env.GOOGLE_CLOUD_PROJECT` to load configuration at runtime instead of hardcoding it in the source files.
