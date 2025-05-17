---
id: rule-file-access-core
pattern: ^core/.*\.md$
type: FileAccess
enforcement: Deny
description: Prevent direct modification of core memory bank files.
---

---
id: rule-command-init
pattern: ^init$
type: Command
enforcement: Allow
description: Allow the 'init' command for initialisation.
---

---
id: rule-consent-current
pattern: ^progress/current\.md$
type: Consent
enforcement: Prompt
description: Always prompt before modifying progress/current.md.
---
