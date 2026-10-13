import { Album, AlbumRating, TasteProfile } from '../types/music';

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

export function importBackupData(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') return false;

    if (Array.isArray(parsed.crate)) {
      saveStoredCrate(parsed.crate);
    }
    if (Array.isArray(parsed.ratings)) {
      saveStoredRatings(parsed.ratings);
    }
    if (parsed.tasteProfile && typeof parsed.tasteProfile === 'object') {
      saveStoredTasteProfile(parsed.tasteProfile);
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
