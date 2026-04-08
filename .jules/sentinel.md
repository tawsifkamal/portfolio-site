## 2024-11-20 - [Missing Security Headers in Express SSR]
**Vulnerability:** The Angular Universal/SSR Express server (`server.ts`) lacked basic security headers (HSTS, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection), leaving the application exposed to clickjacking, MIME-sniffing, and potential XSS/downgrade attacks.
**Learning:** Even simple single-page portfolio applications utilizing Server-Side Rendering (SSR) via Express need fundamental security middleware. It's not just for complex backends.
**Prevention:** Always implement standard security headers via a middleware (like `helmet` or manually) during the initial setup of an Express server, including Angular SSR engines.

## 2024-11-20 - [Reverse Tabnabbing Vulnerability in Portfolio Links]
**Vulnerability:** External anchor links in the portfolio components used `target="_blank"` without `rel="noopener noreferrer"`.
**Learning:** This exposes users to reverse tabnabbing, where the newly opened external page gains access to the original page's `window.opener` object and could potentially redirect the original tab to a phishing site.
**Prevention:** Enforce a linting rule or develop a strict habit of appending `rel="noopener noreferrer"` to *every* `target="_blank"` link pointing to untrusted or external domains.