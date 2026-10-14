# DRIFT — Lateral Music Discovery & Rating

> **Obsidian Minimalist & Editorial White Mode** music discovery web application designed to navigate unexpected genres through lateral recommendations.

[![Live Web Application](https://img.shields.io/badge/Live_App-drift--ochre--mu.vercel.app-3B82F6?style=for-the-badge&logo=vercel&logoColor=white)](https://drift-ochre-mu.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Lojra%2Fdrift-black?style=for-the-badge&logo=github)](https://github.com/Lojra/drift)
[![License: MIT](https://img.shields.io/badge/License-MIT-C084FC?style=for-the-badge)](LICENSE)
[![Zero Emojis](https://img.shields.io/badge/Style-Zero_Emoji_Strict-050507?style=for-the-badge)](GEMINI.md)

---

## Live Access

Launch the live application directly in any browser:

**[https://drift-ochre-mu.vercel.app](https://drift-ochre-mu.vercel.app)**

---

## Overview

DRIFT breaks listeners out of algorithmic filter bubbles. Conventional recommendation engines suggest tracks similar to what you already know, boxing you into repetitive loops. DRIFT operates differently: it identifies the **underlying sonic DNA** of music you love (hypnotic motorik pulses, cavernous spatial reverb, tape saturation, polyrhythmic percussion, raw abrasive fuzz) and **deliberately pivots laterally** to different styles, eras, and subcultures.

- Rate an album **7.0 or higher**: DRIFT locks onto its textural characteristics and intentionally ventures into an adjacent genre (e.g., *Post-Punk* &rarr; *Dub Reggae / 1970s Krautrock*; *Cool Jazz* &rarr; *Trip-Hop / Minimal Wave*).
- Rate an album **below 5.0**: The engine downweights both the genre and its specific acoustic attributes.

---

## Core Features

### 1. iOS Liquid Glass Mobile Navigation Dock
- **Floating Capsule Dock**: Centered pill dock floating 16px above the mobile screen bottom with high-translucency glass optics (`backdrop-blur-2xl`).
- **Specular Lighting Physics**: Crafted with multi-layer specular light reflection borders, an upper gloss gradient line, and dual inner rim glow.
- **Illuminated Active Pills**: Dynamic glowing pill states (`CRATE` in Electric Blue, `ARCHIVE` in Soft Light Purple, `VECTOR` in Telemetry Blue).
- **Accessibility**: Full WCAG-compliant touch targets (&ge; 48px) with generous bottom content clearance.

### 2. 100% Accountless Private Local Vault
- **Zero Friction**: No sign-up forms, passwords, account walls, or telemetry trackers.
- **Local Persistence**: All crate history, ratings, and taste vector coordinates stay securely stored inside your browser (`localStorage`).
- **One-Click Backup & Restore**: Instantly export your entire library to a clean JSON file and restore it on any device at any time.

### 3. 100% Guaranteed Cover Art Presence
- **High-Res CDN Hydration**: Album artwork is sourced directly from Apple's verified 1000x1000 iTunes CDN.
- **Procedural Vector Vinyl Sleeve Fallback**: If an external image is blocked, delayed, or offline, DRIFT renders an algorithmic client-side SVG graphic vinyl sleeve inspired by Peter Saville (Factory Records) and Warp Records.
- **Zero Broken Image Glyphs**: Every album in both the active crate and rated archive is always accompanied by high-quality visual identity.

### 4. Editorial Dual-Theming (Obsidian & Alabaster)
- **Obsidian Dark Mode**: Pitch-black canvas (`#050507`), elevated obsidian panels (`#0C0C10`), electric blue (`#3B82F6`), and soft purple (`#C084FC`).
- **Editorial White Mode**: Pure white cards (`#FFFFFF`), crisp alabaster canvas (`#F8F9FA`), razor-thin borders, and deep obsidian ink typography (`#0A0A0E`).
- **Zero-Emoji Switcher**: Toggle themes instantly using thin-stroke geometric `Sun` and `Moon` icons from `lucide-react`.

### 5. Interactive Inspector & Streaming Deep Links
- **Audio Previews**: Interactive 30-second audio snippets with track progress visualization.
- **Direct Deep Links**: One-click direct searches into **Spotify**, **YouTube**, and **YouTube Music**.
- **Numerical Rating Widget**: Precise 1.0 to 10.0 rating slider with evocative sonic reaction tags.

---

## Design System Invariants

DRIFT adheres to strict aesthetic guidelines documented in [GEMINI.md](GEMINI.md):

- **Strict Zero-Emoji Invariant**: Strictly zero emojis anywhere in the UI, button labels, notifications, or user-facing copy. Only thin-stroke geometric SVG icons (`lucide-react`) are permitted.
- **Typography**: `Plus Jakarta Sans` for clean, understated UI navigation and body copy; `JetBrains Mono` for numerical ratings, release years, BPM, and taste telemetry vectors.
- **Desktop Viewport Fitting**: The 10-album crate fits cleanly in a 5x2 responsive grid within standard desktop viewports without unnecessary vertical scrollbars.

---

## How to Use DRIFT Daily Without Long Links

### Install as a Standalone App (PWA)

DRIFT is a Progressive Web App that runs natively on your phone or desktop with no browser address bar clutter:

1. **iPhone / iPad (Safari)**:
   - Open [https://drift-ochre-mu.vercel.app](https://drift-ochre-mu.vercel.app) in Safari.
   - Tap the **Share** button (box with an arrow pointing up).
   - Tap **Add to Home Screen**.
   - DRIFT now opens as a borderless full-screen app right from your home screen.

2. **Android (Chrome)**:
   - Open [https://drift-ochre-mu.vercel.app](https://drift-ochre-mu.vercel.app) in Chrome.
   - Tap the three-dot menu in the top-right corner.
   - Tap **Install App** or **Add to Home Screen**.

3. **Desktop (macOS / Windows / Linux)**:
   - In Chrome, Brave, or Edge, click the **Install** icon on the right side of the URL bar (or open Settings &rarr; **Install DRIFT**).
   - DRIFT will launch in its own dedicated, distraction-free desktop window.

---

## Privacy & Security

- **No User Tracking**: DRIFT contains no marketing trackers, cookies, or third-party user monitoring.
- **No Required API Keys**: Works 100% out of the box using public open music metadata endpoints (MusicBrainz and iTunes).
- **Optional Gemini AI Lateral Engine**: If you want dynamic AI-assisted lateral bridges, you can configure `VITE_GEMINI_API_KEY` in your environment. API keys are never exposed or hardcoded.
- **Defensive Protocol Validation**: All URLs from imported JSON backups are strictly validated to prevent `javascript:` or data-URI injections.

---

## Local Development & Testing

```bash
# 1. Clone the repository
git clone https://github.com/Lojra/drift.git
cd drift

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run automated test suite (16 tests verifying security, glass dock, themes, and refresh engine)
npm test

# 5. Build for production
npm run build

# 6. Preview production build locally
npm run preview
```

---

## Project Structure

```
├── .agents/skills/ui-and-recommender/   # Antigravity skill enforcing design invariants
├── public/
│   ├── manifest.json                   # PWA application manifest
│   ├── drift-icon.svg                  # Vector obsidian app icon
│   └── sw.js                           # Offline caching service worker
├── src/
│   ├── components/
│   │   ├── archive/                    # Rated discovery archive with fallback covers
│   │   ├── crate/                      # 10-album grid, cards & generative vinyl sleeve
│   │   ├── header/                     # Mobile header with glassmorphism & drift trajectory
│   │   ├── inspector/                  # Tracklist, audio preview, ratings, deep links
│   │   ├── layout/                     # Desktop header & sidebar with Local Vault status
│   │   ├── navigation/                 # Floating iOS Liquid Glass capsule mobile dock
│   │   ├── onboarding/                 # Taste calibration modal
│   │   └── taste/                      # Taste vector telemetry & dimension weights
│   ├── contexts/
│   │   └── ThemeContext.tsx            # Dual-theme provider (Obsidian / Alabaster)
│   ├── hooks/
│   │   ├── useAudioPreview.ts          # HTML5 Audio playback manager with safe detaching
│   │   └── useDriftEngine.ts           # Crate state, ratings, and lateral drift engine
│   ├── services/
│   │   ├── curatedCatalog.ts           # Curated seed albums with Apple CDN artwork
│   │   ├── geminiRecommender.ts        # Optional AI lateral recommender
│   │   ├── musicApi.ts                 # Multi-source MusicBrainz & iTunes service
│   │   ├── sonicBridge.ts              # Acoustic categories & lateral bridge graph
│   │   └── storage.ts                  # Local Vault persistence & JSON export/import
│   ├── types/music.ts                  # TypeScript definitions for crate & ratings
│   └── utils/sanitizeUrl.ts            # URL sanitization against dangerous protocols
├── tests/
│   ├── libraryAndRefresh.test.mjs      # Catalog sizing & zero-overlap refresh tests
│   ├── mobileGlassDock.test.mjs        # iOS Liquid Glass dock & accessibility tests
│   ├── securityRemediation.test.mjs    # Input sanitization & cache bounding tests
│   └── themeAndArtwork.test.mjs        # Dual-theming & zero-emoji invariant tests
├── DESIGN.md                           # Extracted design tokens
├── GEMINI.md                           # Master visual & algorithmic guidelines
└── vercel.json                         # Vercel deployment rewrites & security headers
```

---

## License

Released under the [MIT License](LICENSE).
