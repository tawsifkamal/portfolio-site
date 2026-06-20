## 2024-05-16 - Prevent Reverse Tabnabbing Vulnerability
**Vulnerability:** External links using `target="_blank"` without `rel="noopener noreferrer"` can allow the newly opened page to gain partial access to the original page via the `window.opener` object, leading to potential phishing attacks (reverse tabnabbing).
**Learning:** Found multiple instances of `target="_blank"` without proper `rel` attributes across the application components (e.g., `app.component.html`, `project-card.component.html`), indicating a systemic omission in template creation.
**Prevention:** Always include `rel="noopener noreferrer"` when using `target="_blank"` on `<a>` tags. Enforce this via linting rules (e.g., eslint-plugin-angular) or security code review checklists.
