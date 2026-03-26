## 2024-05-18 - Missing Security Headers
**Vulnerability:** The Express server was missing critical security headers, making the application vulnerable to common attacks like Clickjacking, XSS, and MIME-sniffing.
**Learning:** It is crucial to set security headers like Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, and X-XSS-Protection in Express responses to protect web applications.
**Prevention:** Implement custom middleware or use packages like helmet to automatically configure these headers on all routes.

## 2024-05-18 - Missing rel="noopener noreferrer"
**Vulnerability:** External links using target="_blank" without rel="noopener noreferrer" exposed the application to reverse tabnabbing vulnerabilities, allowing the opened page to access and manipulate the original page's window object.
**Learning:** Always include rel="noopener noreferrer" when opening untrusted or external links in a new tab.
**Prevention:** Enforce linking policies during code review and utilize linting rules (like eslint-plugin-react or angular-eslint) to automatically detect missing rel attributes.
