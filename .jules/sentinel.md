## 2026-04-16 - Prevent Reverse Tabnabbing
**Vulnerability:** Multiple external links using target="_blank" without rel="noopener noreferrer" attribute.
**Learning:** Missing rel="noopener noreferrer" can lead to reverse tabnabbing attacks, allowing newly opened tabs to access the original window's location via window.opener.
**Prevention:** Always add rel="noopener noreferrer" when using target="_blank" to prevent malicious exploitation.
