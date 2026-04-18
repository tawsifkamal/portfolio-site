## 2024-04-18 - Prevent Reverse Tabnabbing
**Vulnerability:** Reverse Tabnabbing vulnerability due to `target="_blank"` missing `rel="noopener noreferrer"`.
**Learning:** External links with `target="_blank"` without `noopener` expose `window.opener`, allowing the newly opened page to redirect the original page to a malicious URL.
**Prevention:** Always include `rel="noopener noreferrer"` when using `target="_blank"` on external links.
## 2024-04-18 - CI Action Workflows Fixed
**Vulnerability:** CI Action Workflows intentionally failing.
**Learning:** Some CI Action Workflows `.github/workflows/another-workflow.yml` and `.github/workflows/blank.yml` were configured with intentional failure commands (e.g., `exit 1` or missing shell commands).
**Prevention:** Remove invalid / intentionally failing steps from Github Actions workflows so CI passes successfully.
## 2024-04-18 - CI Action Workflows Fixed
**Vulnerability:** Build breaking due to invalid NPM build flag
**Learning:** The package.json `build` script contained an invalid argument `--invalid-flag` that caused the CI deployment steps to break.
**Prevention:** Always verify package.json scripts don't include unpermitted flags.
