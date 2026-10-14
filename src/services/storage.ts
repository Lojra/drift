import { Album, AlbumRating, TasteProfile } from '../types/music';
import { sanitizeExternalUrl } from '../utils/sanitizeUrl';

const STORAGE_KEYS = {
  CRATE: 'drift_crate_v1',
  RATINGS: 'drift_ratings_v1',
  TASTE: 'drift_taste_profile_v1'
};

export const DEFAULT_TASTE_PROFILE: TasteProfile = {
  calibrated: false,
  selectedStartingPoints: [],
  baselineInputs: [],
  likedGenres: {},
  dislikedGenres: [],
  traits: {
    atmospheric: 0.5,
    hypnotic: 0.5,
    distortion: 0.5,
    percussive: 0.5,
    experimental: 0.5,
    melancholic: 0.5
  },
  currentDriftPath: 'Calibrating Initial Taste Vector',
  vectorDivergence: 4.2
};

export function loadStoredCrate(): Album[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CRATE);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error loading crate from localStorage', e);
    return [];
  }
}

export function saveStoredCrate(crate: Album[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CRATE, JSON.stringify(crate));
  } catch (e) {
    console.error('Error saving crate to localStorage', e);
  }
}

export function loadStoredRatings(): AlbumRating[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RATINGS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error loading ratings from localStorage', e);
    return [];
  }
}

export function saveStoredRatings(ratings: AlbumRating[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
  } catch (e) {
    console.error('Error saving ratings to localStorage', e);
  }
}

export function loadStoredTasteProfile(): TasteProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TASTE);
    return raw ? { ...DEFAULT_TASTE_PROFILE, ...JSON.parse(raw) } : DEFAULT_TASTE_PROFILE;
  } catch (e) {
    console.error('Error loading taste profile from localStorage', e);
    return DEFAULT_TASTE_PROFILE;
  }
}

export function saveStoredTasteProfile(profile: TasteProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TASTE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving taste profile to localStorage', e);
  }
}

export function exportBackupData(): string {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    crate: loadStoredCrate(),
    ratings: loadStoredRatings(),
    tasteProfile: loadStoredTasteProfile()
  };
  return JSON.stringify(data, null, 2);
}

function sanitizeImportedAlbum(raw: any): Album | null {
  if (!raw || typeof raw !== 'object') return null;
  const id = typeof raw.id === 'string' ? raw.id.slice(0, 100) : '';
  const title = typeof raw.title === 'string' ? raw.title.slice(0, 200) : '';
  const artist = typeof raw.artist === 'string' ? raw.artist.slice(0, 200) : '';
  if (!id || !title || !artist) return null;

  return {
    id,
    mbid: typeof raw.mbid === 'string' ? raw.mbid.slice(0, 64) : undefined,
    title,
    artist,
    releaseYear: typeof raw.releaseYear === 'number' || typeof raw.releaseYear === 'string' ? raw.releaseYear : 'Unknown',
    coverArtUrl: sanitizeExternalUrl(raw.coverArtUrl, 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80'),
    genres: Array.isArray(raw.genres) ? raw.genres.filter((g: any) => typeof g === 'string').slice(0, 8) : [],
    driftReason: typeof raw.driftReason === 'string' ? raw.driftReason.slice(0, 300) : '',
    tracks: Array.isArray(raw.tracks) ? raw.tracks.slice(0, 50).map((t: any, i: number) => ({
      id: typeof t?.id === 'string' ? t.id.slice(0, 100) : `track-${i}`,
      title: typeof t?.title === 'string' ? t.title.slice(0, 200) : `Track ${i + 1}`,
      durationMs: typeof t?.durationMs === 'number' ? t.durationMs : null,
      previewUrl: t?.previewUrl ? sanitizeExternalUrl(t.previewUrl, '') : null,
      trackNumber: typeof t?.trackNumber === 'number' ? t.trackNumber : i + 1
    })) : [],
    spotifyUrl: sanitizeExternalUrl(raw.spotifyUrl),
    youtubeUrl: sanitizeExternalUrl(raw.youtubeUrl),
    youtubeMusicUrl: sanitizeExternalUrl(raw.youtubeMusicUrl, ''),
    sonicTraits: raw.sonicTraits && typeof raw.sonicTraits === 'object' ? raw.sonicTraits : {}
  };
}

function sanitizeImportedRating(raw: any): AlbumRating | null {
  if (!raw || typeof raw !== 'object') return null;
  const albumId = typeof raw.albumId === 'string' ? raw.albumId.slice(0, 100) : '';
  const albumTitle = typeof raw.albumTitle === 'string' ? raw.albumTitle.slice(0, 200) : '';
  const artist = typeof raw.artist === 'string' ? raw.artist.slice(0, 200) : '';
  if (!albumId || !albumTitle || !artist) return null;

  const rawScore = Number(raw.score);
  const score = isNaN(rawScore) ? 7.0 : Math.min(10.0, Math.max(1.0, Math.round(rawScore * 2) / 2));

  return {
    albumId,
    albumTitle,
    artist,
    coverArtUrl: sanitizeExternalUrl(raw.coverArtUrl, 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80'),
    score,
    ratedAt: typeof raw.ratedAt === 'string' ? raw.ratedAt : new Date().toISOString(),
    sonicTag: typeof raw.sonicTag === 'string' ? raw.sonicTag.slice(0, 50) : undefined,
    genres: Array.isArray(raw.genres) ? raw.genres.filter((g: any) => typeof g === 'string').slice(0, 8) : [],
    driftOriginReason: typeof raw.driftOriginReason === 'string' ? raw.driftOriginReason.slice(0, 300) : undefined
  };
}

export function importBackupData(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') return false;

    if (Array.isArray(parsed.crate)) {
      const sanitizedCrate: Album[] = [];
      for (const item of parsed.crate) {
        const valid = sanitizeImportedAlbum(item);
        if (valid) sanitizedCrate.push(valid);
      }
      if (sanitizedCrate.length > 0) {
        saveStoredCrate(sanitizedCrate.slice(0, 10));
      }
    }

    if (Array.isArray(parsed.ratings)) {
      const sanitizedRatings: AlbumRating[] = [];
      for (const item of parsed.ratings) {
        const valid = sanitizeImportedRating(item);
        if (valid) sanitizedRatings.push(valid);
      }
      saveStoredRatings(sanitizedRatings.slice(0, 500));
    }

    if (parsed.tasteProfile && typeof parsed.tasteProfile === 'object') {
      const tp = parsed.tasteProfile;
      const sanitizedProfile: TasteProfile = {
        ...DEFAULT_TASTE_PROFILE,
        calibrated: Boolean(tp.calibrated),
        selectedStartingPoints: Array.isArray(tp.selectedStartingPoints)
          ? tp.selectedStartingPoints.filter((s: any) => typeof s === 'string').slice(0, 10)
          : [],
        baselineInputs: Array.isArray(tp.baselineInputs)
          ? tp.baselineInputs.filter((b: any) => typeof b === 'string').slice(0, 10)
          : [],
        likedGenres: tp.likedGenres && typeof tp.likedGenres === 'object' ? tp.likedGenres : {},
        dislikedGenres: Array.isArray(tp.dislikedGenres)
          ? tp.dislikedGenres.filter((d: any) => typeof d === 'string').slice(0, 50)
          : [],
        currentDriftPath: typeof tp.currentDriftPath === 'string' ? tp.currentDriftPath.slice(0, 150) : 'Calibrated Vector',
        vectorDivergence: typeof tp.vectorDivergence === 'number' ? Math.min(10, Math.max(1, tp.vectorDivergence)) : 4.2
      };
      saveStoredTasteProfile(sanitizedProfile);
    }
    return true;
  } catch (e) {
    console.error('Failed to parse backup JSON', e);
    return false;
  }
}

export function clearAllDriftData(): void {
  localStorage.removeItem(STORAGE_KEYS.CRATE);
  localStorage.removeItem(STORAGE_KEYS.RATINGS);
  localStorage.removeItem(STORAGE_KEYS.TASTE);
}
