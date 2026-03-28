## YYYY-MM-DD - [CRITICAL] Remove hardcoded GCP project ID
**Vulnerability:** Hardcoded GCP project IDs were found in `server/genAi.js` and `server/test.js`.
**Learning:** Hardcoding project IDs can expose internal cloud infrastructure identifiers, which is a security risk.
**Prevention:** Use environment variables (e.g., `process.env.GOOGLE_CLOUD_PROJECT`) to inject project IDs and other sensitive configuration.