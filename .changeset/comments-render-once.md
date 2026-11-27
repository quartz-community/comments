---
"@quartz-community/comments": patch
---

Giscus is no longer loaded a second time when the page re-renders (for example after unlocking an encrypted page); a container that already has giscus is left alone.
