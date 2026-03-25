## 2024-05-18 - Fix Reverse Tabnabbing Vulnerability
**Vulnerability:** External links (`<a href="..." target="_blank">`) lacked `rel="noopener noreferrer"`, exposing the application to reverse tabnabbing attacks where a newly opened page could access `window.opener` and navigate the original tab.
**Learning:** Even static portfolio sites are susceptible to tabnabbing. This pattern was found across multiple angular component templates (`app.component.html`, `project-card.component.html`).
**Prevention:** Always include `rel="noopener noreferrer"` when using `target="_blank"` on external links.
