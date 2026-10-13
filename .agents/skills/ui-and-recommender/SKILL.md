---
name: ui-and-recommender
description: Enforces the strict visual design, pitch-black palette, zero-emoji policy, typography, and lateral drift recommendation engine rules for the DRIFT music discovery application.
---

# UI and Lateral Recommender Engine Skill for DRIFT

This skill defines the development and audit standards for DRIFT's user interface and lateral recommendation pipeline.

---

## 1. Visual & Interaction Invariants

### 1.1 Strict Zero-Emoji Rule
- Under NO circumstances should emojis be rendered in the DOM, code strings, button labels, toast notifications, empty states, or modal dialogues.
- Any iconography MUST be represented using SVG icons from `lucide-react`.

### 1.2 Color & Theme Token Invariants
Ensure Tailwind or CSS variables map precisely to:
- App Background: `#050507`
- Surface Elevated (Cards / Drawers / Sidebars): `#0C0C10`
- Surface Border: `rgba(255, 255, 255, 0.06)`
- Card Hover: `#13131A`
- Primary Accent: `#3B82F6` (Electric Blue)
- Secondary Accent: `#C084FC` (Soft Light Purple)
- Text Primary: `#F4F4F6`
- Text Muted: `#8E8E9E`

### 1.3 Typography
- General UI & Headings: `font-sans` -> `'Plus Jakarta Sans', sans-serif`
- Numerical Metrics, Ratings (`8.5 / 10`), Years (`1977`), Durations (`04:32`), Bridge Labels: `font-mono` -> `'JetBrains Mono', monospace`

---

## 2. Recommendation Engine Standards

### 2.1 Lateral Drift Algorithm Rules
1. **High Rating Pivot ($\ge 7.0$)**:
   - Extract sonic descriptors: mood, tempo, instrumentation, textures.
   - Do NOT simply suggest the same genre or artist discography.
   - Jump across the tag graph to a LATERAL genre sharing sonic DNA (e.g., Post-Punk -> Dub Reggae / Krautrock; Cool Jazz -> Trip-Hop / Ambient Electronic; Shoegaze -> Dream Pop / Ambient Drone).
   - Generate a concise 1-line reason indicating why the bridge exists.
2. **Negative Rating Suppression ($< 5.0$)**:
   - Suppress the genre and decrease affinity for the album's specific sonic characteristics.
3. **Crate Sizing & Replacements**:
   - Active crate always contains exactly 10 albums.
   - User can replace individual rated items or refresh the full 10-album crate.

### 2.2 API Layer Resilience
- Default discovery operates with zero required API keys using MusicBrainz v2 and iTunes Search API.
- MusicBrainz requests MUST include a compliant User-Agent header: `DRIFT/1.0.0 ( contact@drift-music.app )`.
- Artwork fallback pipeline: Cover Art Archive (release group) -> iTunes Search (1400x1400 artwork) -> placeholder SVG with minimalist typography.
- Preview audio: Render interactive audio controls for 30s clips from iTunes/Deezer when available.
