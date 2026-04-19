## 2024-04-19 - Reverse Tabnabbing Vulnerability
**Vulnerability:** External links (`<a href="..." target="_blank">`) without `rel="noopener noreferrer"` can expose the application to reverse tabnabbing, allowing the opened page to potentially access and manipulate the `window.opener` object, redirecting the original page to a malicious site.
**Learning:** Always include `rel="noopener noreferrer"` on anchor tags that open external links in a new tab (`target="_blank"`) to securely sever the connection between the opening and opened pages.
**Prevention:** Incorporate linting rules (e.g., in ESLint or Angular's template linter) that enforce the presence of `rel="noopener noreferrer"` on all `<a target="_blank">` elements to automatically catch these issues during development.
