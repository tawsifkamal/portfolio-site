## 2025-03-22 - Fix hardcoded Google Cloud Project ID
**Vulnerability:** The Google Cloud Project ID (`adept-bison-407117`) was hardcoded in `server/genAi.js` and `server/test.js`.
**Learning:** Hardcoding project IDs can inadvertently expose cloud project information and makes it difficult to switch environments (e.g., from dev to prod) or deploy the application to a different project without code changes.
**Prevention:** Use environment variables (like `process.env.GOOGLE_CLOUD_PROJECT`) to configure project-specific settings so the code remains environment-agnostic.
