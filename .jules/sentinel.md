## 2024-05-22 - [Fix] Reverse Tabnabbing
**Vulnerability:** Multiple `target="_blank"` links without `rel="noopener noreferrer"`.
**Learning:** Common pattern in `app.component.html` and `project-card.component.html` in this codebase.
**Prevention:** Ensure all new external links include `rel="noopener noreferrer"`.
