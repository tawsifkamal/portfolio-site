## 2024-05-18 - Prevent Reverse Tabnabbing Vulnerabilities
**Vulnerability:** External links using `target="_blank"` without `rel="noopener noreferrer"` can expose the site to reverse tabnabbing attacks, allowing the newly opened page to redirect the original page to a malicious URL using the `window.opener` object.
**Learning:** This angular application used `target="_blank"` extensively in multiple components without the proper `rel` attribute, exposing users to a widespread, yet easily preventable, risk.
**Prevention:** Always include `rel="noopener noreferrer"` whenever using `target="_blank"` in HTML templates to isolate the newly opened browsing context.
