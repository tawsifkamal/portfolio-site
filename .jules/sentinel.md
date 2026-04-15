## 2026-04-15 - [Security Enhancement] Prevent Reverse Tabnabbing
**Vulnerability:** External links opening in new tabs (`target="_blank"`) without `rel="noopener noreferrer"` can be vulnerable to reverse tabnabbing attacks, where the newly opened page can maliciously manipulate the `window.opener` object of the original page.
**Learning:** It's important to proactively add `rel="noopener noreferrer"` to all `target="_blank"` links to mitigate this risk, even if not immediately exploitable.
**Prevention:** Always include `rel="noopener noreferrer"` when using `target="_blank"` in HTML templates.
