## 2025-01-20 - [Reverse Tabnabbing]
**Vulnerability:** Found multiple `<a>` tags with `target="_blank"` missing the `rel="noopener noreferrer"` attribute in HTML components.
**Learning:** External links missing `rel="noopener"` allow the opened page to access the original page via `window.opener`, enabling malicious scripts to redirect the original page to a phishing site (reverse tabnabbing).
**Prevention:** Always add `rel="noopener noreferrer"` when using `target="_blank"` on external links to maintain security and prevent referrer leakage.