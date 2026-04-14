## 2026-04-14 - Reverse Tabnabbing and Hardcoded Project ID
**Vulnerability:** Anchor tags using `target="_blank"` without `rel="noopener noreferrer"` were found in multiple templates, exposing the site to reverse tabnabbing attacks. Additionally, a hardcoded Google Cloud Project ID (`adept-bison-407117`) was found in server-side scripts.
**Learning:** External links opened in a new tab can gain partial access to the source tab via `window.opener`. Hardcoding project IDs limits portability and can expose infrastructure details.
**Prevention:** Always append `rel="noopener noreferrer"` to external links with `target="_blank"`. Use environment variables (e.g., `process.env["GOOGLE_CLOUD_PROJECT"]`) for project-specific configurations.
