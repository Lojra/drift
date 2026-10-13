# DRIFT Design System: Obsidian Minimalist Editorial

Extracted directly from Google Stitch project **"DRIFT Music Discovery Platform"** (`projects/12588231006930404500`).

---

## 1. Color Palette Tokens

| Token Name | Hex / RGBA Value | Role / Usage |
| :--- | :--- | :--- |
| `canvas-black` | `#050507` | Deepest pitch-black root background |
| `panel-obsidian`| `#0C0C10` | Sidebar, Right Inspector Drawer, Card background |
| `panel-elevated`| `#13131A` | Selected cards, inner widgets, active items |
| `panel-hover`   | `#181822` | Card hover state, interactive surface highlight |
| `border-subtle` | `rgba(255, 255, 255, 0.06)` | Structural dividing lines, subtle borders |
| `border-light`  | `rgba(255, 255, 255, 0.12)` | Focused boundaries, secondary container edges |
| `electric-blue` | `#3B82F6` | Primary brand accent: CTA buttons, active state dots, active track indicators |
| `purple-soft`   | `#C084FC` | Secondary lateral accent: rating badges, drift vector labels, active pills |
| `text-offwhite` | `#F4F4F6` | Primary headings, album titles, prominent values |
| `text-muted`    | `#8E8E9E` | Secondary body text, subtitles, inactive icons |
| `text-dim`      | `#575766` | Micro captions, track durations, disabled metadata |

---

## 2. Typography Hierarchy

### Font Families
- **Primary Body & Headings**: `Plus Jakarta Sans` (weights: `400`, `500`, `600`, `700`, `800`)
- **Monospace Technical & Metrics**: `JetBrains Mono` (weights: `400`, `500`, `600`, `700`)

### Type Scale & Tokens
- **`display-xl`**: `Plus Jakarta Sans`, 56px / line-height 64px, weight 700, letter-spacing `-0.03em`
- **`headline-lg`**: `Plus Jakarta Sans`, 32px / line-height 40px, weight 600, letter-spacing `-0.02em`
- **`headline-md`**: `Plus Jakarta Sans`, 24px / line-height 32px, weight 600, letter-spacing `-0.015em`
- **`headline-sm`**: `Plus Jakarta Sans`, 18px / line-height 26px, weight 500, letter-spacing `-0.01em`
- **`body-lg`**: `Plus Jakarta Sans`, 16px / line-height 26px, weight 400, letter-spacing `-0.005em`
- **`body-md`**: `Plus Jakarta Sans`, 14px / line-height 22px, weight 400, letter-spacing `0em`
- **`body-sm`**: `Plus Jakarta Sans`, 12px / line-height 18px, weight 400, letter-spacing `0em`
- **`technical-code`**: `JetBrains Mono`, 13px / line-height 18px, weight 500, letter-spacing `-0.01em`
- **`technical-metadata`**: `JetBrains Mono`, 11px / line-height 16px, weight 400, letter-spacing `0.04em`
- **`technical-tag`**: `JetBrains Mono`, 10px / line-height 14px, weight 600, letter-spacing `0.08em`

---

## 3. Layout Architecture (3-Column Desktop)

```
+----------------------------------------------------------------------------------------------------+
| 1. LEFT SIDEBAR (240px) | 2. CENTER MAIN CANVAS (Fluid)                      | 3. INSPECTOR (380px)|
|                         | - Header: Drift Vector, Search, Crate Status, CTA  | - Large Album Art   |
| - DRIFT wordmark + v2.4 | - Curated Dynamic Batch Counter                    | - Cat / Score Pill  |
| - Navigation (3 tabs)   | - 5x2 Responsive Album Grid (10 Albums)            | - Spotify / YouTube |
| - Discovery Filters     |                                                    | - Rate Algorithm    |
| - Active Sonic Baseline |                                                    | - 4 Sonic Chips     |
| - Recalibrate Taste CTA |                                                    | - Tracklist (mm:ss) |
+----------------------------------------------------------------------------------------------------+
| OVERLAY MODAL: Taste Recalibration // Step 01 (Max width 560px, centered backdrop blur)           |
+----------------------------------------------------------------------------------------------------+
```

### 3.1 Left Sidebar (240px Fixed)
- `bg-panel-obsidian` (`#0C0C10`), border-r `border-subtle`
- **Wordmark**: `DRIFT` with 3 colored status dots (Blue, Purple, Muted) and `v2.4` version badge
- **Navigation**:
  - `Current 10 Crate` (active electric blue dot indicator)
  - `Rated Archive` with count badge (e.g., `148`)
  - `Taste Vector` with percentage badge (e.g., `94%`)
- **Discovery Filters**:
  - `Vector Divergence`: `+4.2σ` (or dynamic divergence metric)
  - `Analog Saturation`: `High (88%)`
  - `Crate Cadence`: `10/batch`
- **Active Sonic Baseline Card**:
  - Purple pulsing node
  - 3 purple pills (`Hypnotic`, `Warm Analog`, `Spacious`)
  - Ghost button: `Recalibrate Taste`

### 3.2 Center Main Canvas (Fluid)
- `bg-canvas-black` (`#050507`), fluid width, overflow-y-auto
- **Top Header (h-16)**:
  - Current Drift status pill: `CURRENT DRIFT: [GENRE] -> [LATERAL TARGET]` in `purple-soft`
  - Minimal search bar for instant crate/artist filtering
  - `CRATE STATUS: X / 10 RATED` in monospace
  - `Refresh Crate (10)` button in solid `electric-blue`
- **Dynamic Batch Header**:
  - `Curated Dynamic Batch / 10 selected via acoustic affinity`
  - `Selected Album in Inspector` cyan dot
- **10-Album Grid (5 cols × 2 rows)**:
  - Square album cover with subtle zoom transition
  - Rating badge (top right) in purple font-mono (e.g. `8.5`) or `UNRATED` in muted font-mono
  - Title in `text-offwhite`, Artist & Year in `text-muted`
  - Monospace genre tag badge
  - Italic 1-line lateral drift reason

### 3.3 Right Album Inspector Drawer (380px Fixed)
- `bg-panel-obsidian` (`#0C0C10`), border-l `border-subtle`, overflow-y-auto
- Top header: `Album Inspector ID #01-74` with `Active Selection` cyan dot
- Large square album artwork with subtle bottom gradient, catalog number `Cat: NOM-DG67`, and `Score: 8.5` badge
- Title, Artist, Release Year, Record Label
- Monospace genre & mood pills (`Krautrock`, `Dub Techniques`, `Motorik Pulse`, etc.)
- Side-by-side dark listening buttons:
  - `Listen on Spotify`
  - `Listen on YouTube`
- **Rate to Shift Algorithm Box**:
  - Readout: Large `8.5 / 10.0` with resonance category (`HIGH RESONANCE`)
  - Step slider: `1.0 DISCORD`, `5.0 NEUTRAL`, `10.0 TRANSCENDENT`
  - Sonic rationale chips:
    - `Loved the rhythm`
    - `Great atmosphere`
    - `Too repetitive`
    - `Not my vibe`
  - Submit button: `Submit Rating & Drift ->` (Electric Blue)
- **Tracklist Composition**:
  - Total tracks & duration header (`5 TRACKS • 38:42`)
  - Monospace track items with 30s audio preview triggers and durations (`mm:ss`)

### 3.4 Taste Recalibration // Step 01 Modal
- `bg-canvas-black/80 backdrop-blur-md`
- Container: max-w `560px`, `bg-panel-obsidian`, top gradient strip `via-purple-soft/60`
- Monospace eyebrow: `* TASTE RECALIBRATION // STEP 01` with `ESC` button
- Heading: `SET YOUR STARTING DIRECTION`
- 6 texture cards (2 columns × 3 rows):
  - `Hypnotic & Repetitive`: Motorik beats, steady pulses, trance-inducing loops
  - `Raw & Distorted`: Tape saturation, fuzzy fuzz, grit and bite
  - `Warm & Analog`: Vintage consoles, organic decay, tube warmth
  - `Melancholic & Spacious`: Reverb-heavy, haunting minimalism, isolation
  - `Rhythmic & Percussive`: Polyrhythmic swing, syncopated breaks, groove-driven
  - `Experimental & Dense`: Complex arrangements, micro-textures, avant-garde
- Optional Anchor Reference input with `@` icon and `Active Anchor` chip
- Primary button: `Generate First 10 Albums ->` (Electric Blue)
- Monospace counter: `X OF 3 TEXTURES SELECTED • ALGORITHM CALIBRATION READY`
