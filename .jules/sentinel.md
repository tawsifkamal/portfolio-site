## 2026-02-08 - Reverse Tabnabbing Vulnerability
**Vulnerability:** Found multiple instances of `target="_blank"` without `rel="noopener noreferrer"` in `src/app/app.component.html` and `src/app/project-section/project-card/project-card.component.html`. This exposes users to Reverse Tabnabbing attacks where the newly opened page can manipulate the original page via `window.opener`.
**Learning:** Even in modern frameworks like Angular, manual HTML attributes for external links must be carefully reviewed. Angular's router handles internal links safely, but external links are raw HTML.
**Prevention:** Always add `rel="noopener noreferrer"` to any `<a>` tag with `target="_blank"`. Use a linter or a custom directive to enforce this.
