## 2024-05-24 - [Remove Hardcoded Google Cloud Project ID]
**Vulnerability:** The Google Cloud Project ID (`adept-bison-407117`) was hardcoded in `server/genAi.js` and `server/test.js`.
**Learning:** Hardcoding cloud project IDs or any infrastructure identifiers in source code poses a risk of unintended disclosure and unauthorized usage if the source code is compromised or made public. It also makes the application inflexible across environments (dev, staging, prod).
**Prevention:** Always load configuration parameters like Project IDs and API endpoints from environment variables (e.g., `process.env.GOOGLE_CLOUD_PROJECT`) to keep them out of source control and allow easy configuration per environment.
