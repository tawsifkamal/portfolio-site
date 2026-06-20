## 2026-03-31 - [Google Cloud Project ID Hardcoding]
**Vulnerability:** Google Cloud Project ID ('adept-bison-407117') was hardcoded in server/genAi.js and server/test.js.
**Learning:** Hardcoding project IDs can expose internal project structures and lead to accidental operations on production environments if the code is run elsewhere. It also violates the 12-factor app principle of storing configuration in the environment.
**Prevention:** Always use environment variables (e.g., process.env.GOOGLE_CLOUD_PROJECT) to configure Google Cloud SDKs, which is also the default behavior for Application Default Credentials (ADC).
