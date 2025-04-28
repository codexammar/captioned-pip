# Captioned PiP (Archived)

**Status:** Archived  
**Reason:** Browser security restrictions limit access to embedded video streams and subtitles on most streaming sites (e.g., anime websites).

---

## 🧠 Overview

**Captioned PiP** was an experimental Firefox extension designed to bring website captions into Picture-in-Picture (PiP) mode.

The goal was to allow users to watch videos from sites like anime streaming platforms, with their subtitles visible inside the PiP window — overcoming limitations of native browser PiP, which only shows the video and not overlaid captions.

---

## 🚀 What Was Attempted

- **Detect** `<video>` elements dynamically on web pages.
- **Capture** both the video and visible subtitles into a custom `<canvas>`.
- **Send** the canvas into Picture-in-Picture mode for an enhanced experience.
- **Handle** fullscreen events to attempt grabbing iframe-embedded videos.
- **Explore** blob URLs, CORS restrictions, and iframe security behaviors.
- **Test** prompting users for direct video links as a fallback method.

---

## ❗ Why It Was Archived

After a deep technical investigation, it became clear:

| Challenge | Outcome |
|:---|:---|
| Native browser PiP windows are **sandboxed** | ❌ Cannot inject or modify PiP contents |
| Cross-origin iframe videos are protected by **CORS** | ❌ Cannot access videos embedded from other domains |
| Blob URLs (`blob:https://...`) are **temporary and session-specific** | ❌ Cannot reuse blob URLs outside their original page |
| Users on anime sites cannot obtain real `.mp4` links easily | ❌ Asking users for usable video links is impractical |
| Browser extensions must operate within **strict security sandboxes** | ✅ Correct and by design |

✅  
While general web videos hosted directly via public `.mp4` URLs could work with user-provided links,  
the original target audience (anime streaming sites) made the practical use case extremely limited.

---

## 📚 Lessons Learned

- **Browser extensions cannot modify native PiP behavior.**
- **Cross-origin iframe protection (CORS) is unbreakable** by design inside extensions.
- **Blob URLs are not real URLs** — they are memory pointers created temporarily inside the page.
- **Screen capturing or network sniffing requires elevated permissions** that are not feasible for standard extensions.
- **Sometimes pivoting or ending a project early after understanding the platform limitations is the right professional decision.**

---

## 📦 Project Outcome

Although this project was archived, it provided valuable insights into:

- Browser extension security models
- PiP implementation limits
- Cross-origin restrictions
- Media content protection strategies

✅  
This experience strengthens future extension development and browser-based project design.

---

## 📋 Closing Note

> **Captioned PiP** remains a valuable technical case study in realistic browser capabilities and limitations.

---