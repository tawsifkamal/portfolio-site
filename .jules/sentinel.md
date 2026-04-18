## 2024-04-18 - Prevent Reverse Tabnabbing
**Vulnerability:** Reverse Tabnabbing vulnerability due to `target="_blank"` missing `rel="noopener noreferrer"`.
**Learning:** External links with `target="_blank"` without `noopener` expose `window.opener`, allowing the newly opened page to redirect the original page to a malicious URL.
**Prevention:** Always include `rel="noopener noreferrer"` when using `target="_blank"` on external links.
