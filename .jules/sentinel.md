## 2024-05-23 - Reverse Tabnabbing and Unused Sample Code
**Vulnerability:** Found multiple instances of `target="_blank"` without `rel="noopener noreferrer"` in Angular templates, exposing users to Reverse Tabnabbing. Also found unused `server/genAi.js` with hardcoded Google Cloud Project IDs.
**Learning:** Developers often forget `rel="noopener noreferrer"` when manually creating links, even in modern frameworks. Unused sample code from tutorials/docs often contains hardcoded secrets and is frequently committed by mistake.
**Prevention:** Use linting rules (like `angular-eslint`) to enforce `rel="noopener noreferrer"`. Audit and remove unused `server/` scripts before deployment.
