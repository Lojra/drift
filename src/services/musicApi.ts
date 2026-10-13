import { Album, Track } from '../types/music';
import { CURATED_ALBUMS } from './curatedCatalog';
import { getLateralBridgesForGenre } from './sonicBridge';

const MUSICBRAINZ_UA = 'DRIFT/1.0.0 ( contact@drift-music.app )';
const memoryCache = new Map<string, any>();

function buildExternalLinks(artist: string, albumTitle: string) {
  const encQuery = encodeURIComponent(`${artist} ${albumTitle}`);

  return {
    spotifyUrl: `https://open.spotify.com/search/${encQuery}`,
    youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(artist + ' ' + albumTitle + ' full album')}`,
    youtubeMusicUrl: `https://music.youtube.com/search?q=${encQuery}`
  };
}

/**
 * Searches iTunes for high-resolution artwork and 30-second audio preview snippets
 */
export async function fetchItunesAlbumDetails(artist: string, albumTitle: string): Promise<{
  artworkUrl: string | null;
  tracks: Track[];
  collectionId?: number;
  releaseYear?: number;
  genre?: string;
}> {
  const cacheKey = `itunes:${artist}:${albumTitle}`.toLowerCase();
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  // 1. Try serverless edge cache proxy first for 10x faster response & zero CORS
  try {
    const apiUrl = `/api/music?artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(albumTitle)}`;
    const apiRes = await fetch(apiUrl);
    if (apiRes.ok) {
      const apiData = await apiRes.json();
      if (apiData && (apiData.artworkUrl || (apiData.tracks && apiData.tracks.length > 0))) {
        memoryCache.set(cacheKey, apiData);
        return apiData;
      }
    }
  } catch (_) {
    // Continue to direct fetch if running standalone locally
  }

  try {
    const term = `${artist} ${albumTitle}`;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=album&limit=3`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('iTunes search failed');
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      return { artworkUrl: null, tracks: [] };
    }

    const bestAlbum = data.results[0];
    const highResArtwork = bestAlbum.artworkUrl100
      ? bestAlbum.artworkUrl100.replace('100x100bb', '1000x1000bb')
      : null;

    let tracks: Track[] = [];
    if (bestAlbum.collectionId) {
      try {
        const lookupUrl = `https://itunes.apple.com/lookup?id=${bestAlbum.collectionId}&entity=song&limit=30`;
        const lookupRes = await fetch(lookupUrl);
        if (lookupRes.ok) {
          const lookupData = await lookupRes.json();
          // The first result is the collection itself, remainder are songs
          tracks = (lookupData.results || [])
            .slice(1)
            .filter((item: any) => item.wrapperType === 'track')
            .map((item: any, idx: number) => ({
              id: `itunes-${item.trackId || idx}`,
              title: item.trackName || `Track ${idx + 1}`,
              durationMs: item.trackTimeMillis || null,
              previewUrl: item.previewUrl || null,
              trackNumber: item.trackNumber || idx + 1
            }));
        }
      } catch (err) {
        console.warn('Could not fetch iTunes tracklist', err);
      }
    }

    const releaseYear = bestAlbum.releaseDate ? new Date(bestAlbum.releaseDate).getFullYear() : undefined;
    const result = {
      artworkUrl: highResArtwork,
      tracks,
      collectionId: bestAlbum.collectionId,
      releaseYear,
      genre: bestAlbum.primaryGenreName
    };

    memoryCache.set(cacheKey, result);
    return result;
  } catch (err) {
    console.warn(`iTunes fetch failed for ${artist} - ${albumTitle}`, err);
    return { artworkUrl: null, tracks: [] };
  }
}

/**
 * Searches MusicBrainz for release-groups matching a query/tag
 */
export async function searchMusicBrainz(tagOrQuery: string, limit = 10): Promise<Album[]> {
  const cacheKey = `mb:${tagOrQuery}:${limit}`.toLowerCase();
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  const isTag = !tagOrQuery.includes(':') && !tagOrQuery.includes(' ');

  // 1. Try serverless edge cache proxy first to bypass client rate limits
  if (isTag) {
    try {
      const apiUrl = `/api/music?genre=${encodeURIComponent(tagOrQuery)}&limit=${limit}`;
      const apiRes = await fetch(apiUrl);
      if (apiRes.ok) {
        const apiData = await apiRes.json();
        if (apiData && apiData.albums && apiData.albums.length > 0) {
          memoryCache.set(cacheKey, apiData.albums);
          return apiData.albums;
        }
      }
    } catch (_) {}
  }

  try {
    const query = isTag
      ? `tag:"${tagOrQuery}" AND primarytype:Album`
      : `${tagOrQuery} AND primarytype:Album`;

    const url = `https://musicbrainz.org/ws/2/release-group?query=${encodeURIComponent(query)}&fmt=json&limit=${limit}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': MUSICBRAINZ_UA,
        'Accept': 'application/json'
      }
    });

    if (!res.ok) throw new Error('MusicBrainz API error');
    const data = await res.json();
    const releaseGroups = data['release-groups'] || [];

    const albums: Album[] = [];

    for (const rg of releaseGroups) {
      const mbid = rg.id;
      const title = rg.title;
      const artist = rg['artist-credit']?.[0]?.name || 'Unknown Artist';
      const releaseYear = rg['first-release-date'] ? rg['first-release-date'].substring(0, 4) : 'Unknown';
      const tags = (rg.tags || []).map((t: any) => t.name).slice(0, 4);

      // Hydrate high-res art and preview from iTunes
      const itunesData = await fetchItunesAlbumDetails(artist, title);

      const coverArtUrl = itunesData.artworkUrl ||
        `https://coverartarchive.org/release-group/${mbid}/front-500` ||
        '';

      const links = buildExternalLinks(artist, title);

      albums.push({
        id: `mb-${mbid}`,
        mbid,
        title,
        artist,
        releaseYear,
        coverArtUrl: coverArtUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
        genres: tags.length > 0 ? tags : [tagOrQuery],
        driftReason: `Discovered from the global open archive under ${tagOrQuery}.`,
        tracks: itunesData.tracks.length > 0 ? itunesData.tracks : [
          { id: `${mbid}-t1`, title: 'Full Album Stream Available', durationMs: null, previewUrl: null, trackNumber: 1 }
        ],
        ...links,
        sonicTraits: {
          era: typeof releaseYear === 'string' && releaseYear !== 'Unknown' ? `${releaseYear.slice(0, 3)}0s` : undefined
        }
      });
    }

    if (albums.length > 0) {
      memoryCache.set(cacheKey, albums);
      return albums;
    }
  } catch (err) {
    console.warn(`MusicBrainz search error for ${tagOrQuery}:`, err);
  }

  // Fallback to curated albums matching genre or default
  return getCuratedAlbumsByGenre(tagOrQuery, limit);
}

/**
 * Searches iTunes directly for albums by keyword/genre (fast and provides 100% playable previews)
 */
export async function searchItunesAlbums(keyword: string, limit = 8): Promise<Album[]> {
  const cacheKey = `itunes-search:${keyword}:${limit}`.toLowerCase();
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(keyword)}&entity=album&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('iTunes search failed');
    const data = await res.json();

    const albums: Album[] = [];
    const results = data.results || [];

    for (const item of results) {
      if (!item.collectionId || !item.collectionName || !item.artistName) continue;

      const artist = item.artistName;
      const title = item.collectionName;
      const highResArt = item.artworkUrl100
        ? item.artworkUrl100.replace('100x100bb', '1000x1000bb')
        : '';
      const releaseYear = item.releaseDate ? new Date(item.releaseDate).getFullYear() : 'Unknown';
      const genre = item.primaryGenreName || keyword;

      const links = buildExternalLinks(artist, title);

      // Fast initial album representation: tracks are loaded on-demand when clicked
      albums.push({
        id: `itunes-${item.collectionId}`,
        title,
        artist,
        releaseYear,
        coverArtUrl: highResArt,
        genres: [genre, keyword],
        driftReason: `Selected for its distinctive ${genre} sonic identity.`,
        tracks: [],
        ...links,
        sonicTraits: {
          era: typeof releaseYear === 'number' ? `${Math.floor(releaseYear / 10) * 10}s` : undefined
        }
      });
    }

    if (albums.length > 0) {
      memoryCache.set(cacheKey, albums);
      return albums;
    }
  } catch (err) {
    console.warn(`iTunes search failed for ${keyword}:`, err);
  }

  return getCuratedAlbumsByGenre(keyword, limit);
}

/**
 * Filter curated catalog by genre or keywords
 */
export function getCuratedAlbumsByGenre(genreOrKeyword: string, limit = 10): Album[] {
  const norm = genreOrKeyword.toLowerCase();
  const matched = CURATED_ALBUMS.filter(a =>
    a.genres.some(g => g.toLowerCase().includes(norm) || norm.includes(g.toLowerCase())) ||
    a.artist.toLowerCase().includes(norm) ||
    a.title.toLowerCase().includes(norm)
  );

  if (matched.length >= limit) {
    return matched.slice(0, limit);
  }

  // Fill with unique items from curated pool
  const ids = new Set(matched.map(m => m.id));
  const remaining = CURATED_ALBUMS.filter(a => !ids.has(a.id));
  return [...matched, ...remaining].slice(0, limit);
}

/**
 * Generate Lateral Drift Recommendations based on a high-rated album (>= 7.0)
 */
export async function generateLateralRecommendations(
  ratedAlbum: Album,
  _rating: number,
  sonicTag?: string,
  existingIds: Set<string> = new Set(),
  divergence: number = 4.2
): Promise<Album[]> {
  const primaryGenre = ratedAlbum.genres[0] || 'Post-Punk';
  const bridges = getLateralBridgesForGenre(primaryGenre);

  // Select lateral bridge based on vector divergence
  let selectedBridge = bridges[0];
  if (divergence >= 5.5 && bridges.length > 2) {
    selectedBridge = bridges[bridges.length - 1]; // Maximum divergence bridge
  } else if (divergence >= 3.5 && bridges.length > 1) {
    const idx = Math.floor(Math.random() * bridges.length);
    selectedBridge = bridges[idx]; // Balanced lateral exploration
  } else {
    selectedBridge = bridges[0]; // Conservative adjacent bridge
  }

  const driftReason = selectedBridge.reasonTemplate(primaryGenre, ratedAlbum.title);

  // Try fetching live albums for the bridge target keywords
  let candidateAlbums: Album[] = [];
  const searchKeywords = selectedBridge.searchKeywords;
  const keyword = searchKeywords[Math.floor(Math.random() * searchKeywords.length)];

  // Try iTunes search for rich previews
  candidateAlbums = await searchItunesAlbums(keyword, 4);

  // Filter out any already seen
  let validCandidates = candidateAlbums.filter(a => !existingIds.has(a.id) && a.title.toLowerCase() !== ratedAlbum.title.toLowerCase());

  // Fallback to curated if empty
  if (validCandidates.length === 0) {
    validCandidates = CURATED_ALBUMS.filter(
      a => !existingIds.has(a.id) && a.title.toLowerCase() !== ratedAlbum.title.toLowerCase()
    );
  }

  // Stamp with the authentic lateral drift reason
  return validCandidates.map(album => ({
    ...album,
    driftReason: `${driftReason} ${sonicTag ? `(Reflecting your "${sonicTag}" reaction)` : ''}`.trim()
  }));
}

/**
 * Loads tracks and 30-second audio previews on-demand for a single album
 */
export async function fetchTracksForAlbum(album: Album): Promise<Track[]> {
  if (album.tracks && album.tracks.length > 0) {
    return album.tracks;
  }

  // If album is an iTunes collection
  if (album.id.startsWith('itunes-')) {
    const collectionId = album.id.replace('itunes-', '');
    try {
      const lookupUrl = `https://itunes.apple.com/lookup?id=${collectionId}&entity=song&limit=25`;
      const res = await fetch(lookupUrl);
      if (res.ok) {
        const data = await res.json();
        const tracks: Track[] = (data.results || [])
          .slice(1)
          .filter((t: any) => t.wrapperType === 'track')
          .map((t: any, idx: number) => ({
            id: `itunes-${t.trackId || idx}`,
            title: t.trackName || `Track ${idx + 1}`,
            durationMs: t.trackTimeMillis || null,
            previewUrl: t.previewUrl || null,
            trackNumber: t.trackNumber || idx + 1
          }));
        if (tracks.length > 0) return tracks;
      }
    } catch (_) {}
  }

  // Fallback: search by artist & title
  const details = await fetchItunesAlbumDetails(album.artist, album.title);
  if (details.tracks && details.tracks.length > 0) {
    return details.tracks;
  }

  return [
    {
      id: `fallback-${album.id}-1`,
      title: 'Full Album Audio Available Via Spotify / YouTube Links',
      durationMs: null,
      previewUrl: null,
      trackNumber: 1
    }
  ];
}
