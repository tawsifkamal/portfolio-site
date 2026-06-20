## 2026-03-18 - Add missing security headers to Express server
**Vulnerability:** The Express server lacked basic security headers (Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection) and exposed the x-powered-by header, leaving the application vulnerable to basic web attacks like clickjacking and MIME-sniffing.
**Learning:** Even simple SSR Angular applications served by Express need manual configuration for standard security headers if security middlewares like helmet are not used. The x-powered-by header in Express defaults to on and should always be disabled.
**Prevention:** Always add a baseline set of security headers to any Express server serving web content, or implement a standard security middleware to handle this automatically.
