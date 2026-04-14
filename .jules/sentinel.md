## 2026-04-14 - Prevent Reverse Tabnabbing
**Vulnerability:** External links using `target="_blank"` without `rel="noopener noreferrer"` can expose the original window's `window.opener` object to the new tab, allowing potential reverse tabnabbing attacks.
**Learning:** This is a common frontend vulnerability that can be easily overlooked in single-page applications where external links are frequently used for navigation menus, project portfolios, or social links.
**Prevention:** Always add `rel="noopener noreferrer"` to any `<a>` tag that has `target="_blank"`.
