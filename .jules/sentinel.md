## 2024-05-18 - [Remove hardcoded GCP project ID]
**Vulnerability:** Hardcoded GCP Project ID "adept-bison-407117" was found in `server/genAi.js` and `server/test.js`.
**Learning:** Hardcoding project IDs can expose specific infrastructure targets to potential attackers if the source code is leaked. It also limits the application's ability to be deployed across multiple environments seamlessly.
**Prevention:** Always use environment variables (e.g., `process.env.GOOGLE_CLOUD_PROJECT`) to manage infrastructure identifiers and configuration secrets. Ensure robust configuration loading processes and missing variable warnings during initialization.
