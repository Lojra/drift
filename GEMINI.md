# DRIFT: Architectural & Design Guidelines

This project implements "DRIFT", a minimalist, pitch-black music discovery and rating web application designed to navigate unexpected genres through lateral recommendations.

---

## 1. Strict Visual Design System

### 1.1 Zero Emoji Invariant
- **CRITICAL**: Absolutely NO emojis anywhere in the UI, button labels, notifications, badges, empty states, or user-facing messages.
- Always use subtle, thin-stroke SVG icons from `lucide-react` (stroke width `1.5` or `1.75`).

### 1.2 Pitch-Black Palette (Super Dark Mode)
- **App Background**: `#050507` (Pitch black)
- **Elevated Cards / Sidebar / Panels**: `#0C0C10` with subtle `1px solid rgba(255, 255, 255, 0.06)` borders
- **Card Hover State**: `#13131A` with subtle border transition
- **Primary Accent**: `#3B82F6` (Electric Blue - primary action buttons, active navigation indicators, links)
- **Secondary Accent**: `#C084FC` (Soft Light Purple - rating badges, genre-drift connectors, taste vector highlights)
- **Text Primary**: `#F4F4F6` (Headings, primary album titles, key values)
- **Text Muted**: `#8E8E9E` (Subtitles, labels, secondary metadata)

### 1.3 Typography
- **Primary Font**: `Plus Jakarta Sans` (weights 400, 500, 600) for clean, understated UI typography, navigation, and body copy.
- **Monospace Font**: `JetBrains Mono` (weights 400, 500) for numerical ratings (e.g. `8.5 / 10`), release years, track durations, BPM, and genre-bridge vectors.

---

## 2. Layout & Experience Architecture

### 2.1 Spotify-Inspired Desktop Layout
- **Left Sidebar (Fixed)**: App wordmark, navigation tabs (`Current Crate (10)`, `Rated Archive`, `Taste Vector`), current taste telemetry, and JSON export/import.
- **Main Center View**:
  - Top status bar: Dynamic "Drift Vector" breadcrumb indicator (e.g., `Current Drift: Post-Punk -> Dub Reggae / Krautrock`).
  - 10-Album Crate: Responsive 5x2 album grid displaying crisp square album art, artist, title, release year, rating badge, and 1-line lateral drift reason.
- **Right Inspector Drawer**:
  - Triggered by clicking any album.
  - Displays high-resolution cover art, title, artist, release year, label, country, genre tags.
  - Full tracklist with interactive 30-second audio previews if available.
  - Direct external action links:
    - Spotify Search / Direct: `https://open.spotify.com/search/[Artist]%20[Album]`
    - YouTube Search / Direct: `https://www.youtube.com/results?search_query=[Artist]+[Album]+full+album`
    - YouTube Music Search / Direct: `https://music.youtube.com/search?q=[Artist]+[Album]`
  - Numerical rating widget (1.0 to 10.0 in 0.5 increments) with optional sonic reaction tags.

---

## 3. Lateral Drift Recommendation Rules

### 3.1 Core Algorithm Behavior
- **Rating $\ge$ 7.0**: The engine locks onto the album's underlying sonic attributes (mood, pacing, instrumentation, production texture) and **intentionally pivots to a DIFFERENT genre/subgenre** for future recommendations (lateral exploration).
- **Rating < 5.0**: The engine downweights and shifts away from both that genre and its specific sonic traits.
- **Drift Reasons**: Every recommended album must include a concise, evocative 1-line reason explaining the bridge (e.g., *"Shares the hypnotic bass-driven pulse of your 8.5/10 rating, translated into 1970s Jamaican Dub"*).

### 3.2 Data Services & API Standards
- **Zero API Key Requirement**: Default data queries must work out-of-the-box using:
  - MusicBrainz API (`https://musicbrainz.org/ws/2/`) with mandatory custom `User-Agent` (`DRIFT/1.0.0 ( contact@drift-music.app )`).
  - Cover Art Archive (`https://coverartarchive.org/release-group/[mbid]`).
  - iTunes Search API (`https://itunes.apple.com/search`) for instant artwork hydration and 30-second audio preview snippets.
- **Optional API Hooks**:
  - `VITE_GEMINI_API_KEY`: Passes user rating history and taste vectors to `@google/genai` (Gemini Flash) for dynamic lateral bridge curation, subsequently hydrated with music metadata.
- **Local Persistence**: All state (`crate`, `ratings`, `tasteProfile`) must persist across reloads in `localStorage`, backed up via JSON export and import.
