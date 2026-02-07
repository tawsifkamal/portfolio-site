## 2026-02-07 - [Insecure External Links]
**Vulnerability:** Found widespread use of `target="_blank"` without `rel="noopener noreferrer"`.
**Learning:** Angular templates do not automatically sanitize or enforce security attributes on standard `<a>` tags.
**Prevention:** Enforce `rel="noopener noreferrer"` for external links using linter rules or a custom directive.
