## 2024-04-21 - [Prevent Reverse Tabnabbing]
**Vulnerability:** Reverse tabnabbing via `target="_blank"` links without `rel="noopener noreferrer"`.
**Learning:** Found multiple external links opening in new tabs missing the required protection, which could allow malicious sites to gain access to the original page's `window.opener` object and redirect it to a phishing site.
**Prevention:** Always include `rel="noopener noreferrer"` when using `target="_blank"` on anchor tags.
