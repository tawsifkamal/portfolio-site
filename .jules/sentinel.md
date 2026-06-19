## 2024-05-07 - [Preventing Reverse Tabnabbing Vulnerability in External Links]
**Vulnerability:** External links (`<a href="..." target="_blank">`) were missing `rel="noopener noreferrer"`, exposing the application to reverse tabnabbing. This allows the newly opened tab to potentially manipulate the `window.opener` object and redirect the original page to a malicious site.
**Learning:** This is a common oversight in frontend development, particularly in Angular templates containing lists of external project/article links.
**Prevention:** Always append `rel="noopener noreferrer"` to anchor tags when using `target="_blank"`. Consider setting up linting rules (e.g., `eslint-plugin-angular` or standard HTML linters) to enforce this pattern automatically across all template files.
