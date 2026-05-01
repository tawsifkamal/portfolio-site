## 2024-05-24 - [Fix Reverse Tabnabbing]
**Vulnerability:** External links with `target="_blank"` were missing `rel="noopener noreferrer"`.
**Learning:** This vulnerability could allow the opened external page to hijack the original tab via `window.opener`.
**Prevention:** Always include `rel="noopener noreferrer"` when using `target="_blank"` for external links.
