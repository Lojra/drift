export type SonicTag =
  | 'Loved the rhythm'
  | 'Loved the atmosphere'
  | 'Too repetitive'
  | 'Not my vibe';

export interface Track {
  id: string;
  title: string;
  durationMs: number | null;
  previewUrl: string | null;
  trackNumber: number;
}

export interface SonicTraits {
  mood?: string[];
  texture?: string;
  tempo?: 'slow' | 'mid-tempo' | 'up-tempo';
  energy?: number; // 0.0 - 1.0
  percussive?: number;
  atmospheric?: number;
  experimental?: number;
  distortion?: number;
  hypnotic?: number;
  melancholic?: number;
  era?: string;
}

export interface Album {
  id: string;
  mbid?: string;
  title: string;
  artist: string;
  releaseYear: number | string;
  coverArtUrl: string;
  label?: string;
  country?: string;
  genres: string[];
  driftReason: string;
  tracks: Track[];
  spotifyUrl: string;
  youtubeUrl: string;
  youtubeMusicUrl: string;
  sonicTraits: SonicTraits;
}

export interface AlbumRating {
  albumId: string;
  albumTitle: string;
  artist: string;
  coverArtUrl: string;
  score: number; // 1.0 to 10.0 in 0.5 increments
  ratedAt: string; // ISO 8601
  sonicTag?: SonicTag | string;
  genres: string[];
  driftOriginReason?: string;
}

export interface TasteTraits {
  atmospheric: number;
  hypnotic: number;
  distortion: number;
  percussive: number;
  experimental: number;
  melancholic: number;
}

export interface TasteProfile {
  calibrated: boolean;
  selectedStartingPoints: string[];
  baselineInputs: string[];
  likedGenres: Record<string, number>; // genre -> positive affinity count/weight
  dislikedGenres: string[];
  traits: TasteTraits;
  currentDriftPath: string;
  vectorDivergence?: number; // e.g. 2.1 (Conservative), 4.2 (Optimal Lateral), 6.8 (Radical Leap)
}

export interface SonicStartingPoint {
  id: string;
  title: string;
  subtitle: string;
  genres: string[];
  traits: Partial<TasteTraits>;
}
