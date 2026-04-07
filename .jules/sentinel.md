## 2024-04-07 - Missing rel="noopener noreferrer" on external links
**Vulnerability:** External links with target="_blank" missing rel="noopener noreferrer" attribute, causing reverse tabnabbing vulnerability.
**Learning:** Always include rel="noopener noreferrer" when opening external links in a new tab to prevent the opened page from accessing the window.opener object, which could be used for malicious redirects.
**Prevention:** Use a linter rule to enforce the presence of rel="noopener noreferrer" on target="_blank" links.
