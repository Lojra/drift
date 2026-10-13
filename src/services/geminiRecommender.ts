import { GoogleGenAI } from '@google/genai';
import { Album, AlbumRating } from '../types/music';
import { fetchItunesAlbumDetails } from './musicApi';

export async function getGeminiLateralRecommendations(
  ratings: AlbumRating[],
  existingAlbumIds: Set<string>
): Promise<Album[] | null> {
  const highRatings = ratings.filter(r => r.score >= 7.0);
  if (highRatings.length === 0) {
    return null;
  }

  // 1. Try serverless backend endpoint first (protects API keys on server)
  try {
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ratings,
        existingIds: Array.from(existingAlbumIds)
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.available && Array.isArray(data.albums) && data.albums.length > 0) {
        return data.albums.filter((a: Album) => !existingAlbumIds.has(a.id));
      }
    }
  } catch (_) {
    // Continue to client-side fallback if backend is unavailable
  }

  // 2. Client-side fallback if VITE_GEMINI_API_KEY is defined in client environment
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const ratedSummary = highRatings.slice(-5).map(r =>
      `"${r.albumTitle}" by ${r.artist} (${r.genres.join(', ')}) rated ${r.score}/10${r.sonicTag ? ` - Tag: "${r.sonicTag}"` : ''}`
    ).join('\n');

    const prompt = `You are DRIFT, an adventurous, minimalist music exploration engine.
The user has highly rated these albums:
${ratedSummary}

Your mission is LATERAL DRIFT: Break them out of narrow filter bubbles!
Do NOT recommend albums from the exact same genres or artists.
Instead, identify surprising, unexpected "lateral bridges"—music from completely different genres, eras, or geographic scenes that share underlying sonic DNA (e.g. hypnotic motorik pulse, spacious spring reverb, abrasive tension, warm nylon acoustic textures, complex polyrhythms).

Recommend 4 specific, critically respected albums.
Format your response as a strict JSON array of objects with keys:
"artist": artist name
"title": album title
"genre": lateral target genre
"driftReason": a concise, evocative 1-line reason explaining the bridge from their taste (NO emojis!)

Example format:
[
  {
    "artist": "King Tubby",
    "title": "King Tubbys Meets Rockers Uptown",
    "genre": "Dub Reggae",
    "driftReason": "Channels the dark, cavernous bass foundations of your post-punk ratings into 1970s Kingston sound-system delay."
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text?.trim() || '';
    if (!responseText) return null;

    const parsed = JSON.parse(responseText);
    if (!Array.isArray(parsed)) return null;

    const resultAlbums: Album[] = [];

    for (const item of parsed) {
      if (!item.artist || !item.title) continue;

      const details = await fetchItunesAlbumDetails(item.artist, item.title);
      const encQuery = encodeURIComponent(`${item.artist} ${item.title}`);

      resultAlbums.push({
        id: `gemini-${item.artist}-${item.title}`.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        title: item.title,
        artist: item.artist,
        releaseYear: details.releaseYear || 'Lateral Classic',
        coverArtUrl: details.artworkUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
        genres: [item.genre || 'Lateral Discovery'],
        driftReason: item.driftReason || `AI lateral drift bridge from your taste profile.`,
        tracks: details.tracks.length > 0 ? details.tracks : [
          { id: `t1-${item.title}`, title: 'Complete Album Audio Available Externally', durationMs: null, previewUrl: null, trackNumber: 1 }
        ],
        spotifyUrl: `https://open.spotify.com/search/${encQuery}`,
        youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(item.artist + ' ' + item.title + ' full album')}`,
        youtubeMusicUrl: `https://music.youtube.com/search?q=${encQuery}`,
        sonicTraits: {}
      });
    }

    return resultAlbums.filter(a => !existingAlbumIds.has(a.id));
  } catch (err) {
    console.warn('Gemini lateral recommender error:', err);
    return null;
  }
}
