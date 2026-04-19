## 2024-05-18 - [Security Enhancement: Reverse Tabnabbing Prevention]
**Vulnerability:** External links opening in a new tab (`target="_blank"`) without `rel="noopener noreferrer"` could allow the destination page to gain partial control of the referring page via the `window.opener` object, potentially leading to phishing attacks (reverse tabnabbing).
**Learning:** This is a common pattern in single-page applications or portfolios that link to numerous external sites (e.g., social media, project links).
**Prevention:** Always include `rel="noopener noreferrer"` when using `target="_blank"` on anchor tags pointing to external domains.
