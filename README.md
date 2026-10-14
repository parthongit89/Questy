# Questy — Elite R&D Intelligence for AI Developer Agents

![Questy Banner](assets/svg/bg-hero-glow.svg)

> **Questy** transforms your coding assistant into a rigorous research partner by embedding institutional-grade R&D protocols directly into its reasoning loop, eliminating hallucinations and ensuring total evidentiary rigor.

🌐 **Live Deployment:** [**https://questy-antimatr.web.app**](https://questy-antimatr.web.app) (Firebase Edge CDN)

---

## 🌟 Features & Design Implementation

This frontend website is built directly from the official Figma specification:
- **Figma Design Node ID:** [`89:11`](https://www.figma.com/design/QVJqkXUcwzJC97Nyvctt1S/Aws-builder-Project?node-id=89-11&m=dev)
- **Deep Space Obsidian Aesthetic:** Dark mode first theme (`#050404`), glowing ambient nebula gradients, and high contrast typography complying with WCAG AA/AAA guidelines.
- **Local Typography Integration:** Google Font **Prompt** integrated directly via `@font-face` from `./font/Prompt/` across all weights (Thin through Black), with Google Sans and Plus Jakarta Sans fallbacks.
- **Vector Fidelity:** All vector badges, glowing concentric rings, and custom icons (`Unbiased Thinking`, `Step-by-Step System`, `Real Proofs`) extracted and served as clean, resolution-independent SVGs.
- **Interactive Micro-Interactions & Modals:**
  - Dynamic Constellation / Ambient Starfield Canvas that reacts softly to mouse proximity.
  - Interactive Core Pillars with inspection dialogs.
  - Interactive "Plugins & Skills" drawer displaying all 7 Questy protocols.
  - "Download" and Quickstart modal with one-click terminal command copying.
  - Interactive Privacy Policy and Terms of Service dialogs.
  - Fully mobile-responsive navigation drawer.

---

## 🏛️ Core Pillars

1. **⚖️ Unbiased Thinking**
   - Counter-evidence exploration, dual-hypothesis testing, and strict separation between verified facts and speculative assumptions.
   - Powered by `/Ques-guidelines`.

2. **🪜 Step-by-Step System**
   - Phased execution gates (Scoping → Discovery → Synthesis → Audit → Deliverable) with verifiable audit trails.
   - Powered by `/Ques-struct` and `/Ques-framework`.

3. **📜 Real Proofs**
   - Zero hallucination tolerance. Every technical claim, library recommendation, and architecture decision is linked to authenticated primary sources.
   - Powered by `/Ques-source` and `/Ques-research`.

---

## 📁 Repository Structure

```
Questy_web/
├── assets/
│   ├── css/
│   │   └── style.css            # Custom keyframes, ambient glow, local @font-face
│   ├── js/
│   │   └── main.js              # Canvas particle engine, modals, copy hooks
│   └── svg/
│       ├── bg-hero-glow.svg     # Top ambient radiant glow
│       ├── bg-footer-glow.svg   # Bottom ambient radiant glow
│       ├── pillar-circle-1.svg  # Unbiased Thinking ring
│       ├── pillar-circle-2.svg  # Step-by-Step System ring
│       ├── pillar-circle-3.svg  # Real Proofs ring
│       ├── icon-unbiased-thinking.svg
│       ├── icon-step-by-step.svg
│       └── icon-real-proofs.svg
├── font/
│   └── Prompt/                  # Local TTF fonts (Prompt Thin -> Black)
├── index.html                   # Semantic HTML5 + Tailwind CSS landing page
├── LICENSE                      # Project License
└── README.md                    # Project Documentation
```

---

## 🚀 Quickstart & Local Preview

Because Questy is a zero-build, frontend-only static site, you can view it immediately using any local web server or by opening `index.html` in your browser.

### Using Python:
```bash
python -m http.server 3000
```
Open `http://localhost:3000` in your browser.

### Using Node.js (npx serve):
```bash
npx serve .
```

---

## 🌐 Deployment

- **Vercel:** Run `vercel deploy` or connect your GitHub repository for automated edge CDN deployment.
- **Firebase Hosting:** Run `firebase deploy --only hosting`.
- **GitHub Pages:** Go to Settings -> Pages -> Deploy from branch `main` / root.

---

© 2026 Questy. All rights reserved.