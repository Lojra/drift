import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      available: false,
      message: 'GEMINI_API_KEY not configured in environment variables. Using client-side algorithmic engine.'
    });
  }

  try {
    const { ratings = [], existingIds = [] } = req.body || {};
    const existingSet = new Set(existingIds);

    const highRatings = ratings.filter((r: any) => r.score >= 7.0);
    if (highRatings.length === 0) {
      return res.status(200).json({ available: true, albums: [] });
    }

    const ai = new GoogleGenAI({ apiKey });

    const ratedSummary = highRatings.slice(-5).map((r: any) =>
      `"${r.albumTitle}" by ${r.artist} (${r.genres?.join(', ') || 'Unknown'}) rated ${r.score}/10${r.sonicTag ? ` - Tag: "${r.sonicTag}"` : ''}`
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
    "driftReason": "Channels the dark cavernous bass foundations of your post-punk ratings into 1970s Kingston sound-system delay."
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
    if (!responseText) {
      return res.status(200).json({ available: true, albums: [] });
    }

    const parsed = JSON.parse(responseText);
    if (!Array.isArray(parsed)) {
      return res.status(200).json({ available: true, albums: [] });
    }

    const albums: any[] = [];

    for (const item of parsed) {
      if (!item.artist || !item.title) continue;
      const id = `gemini-${item.artist}-${item.title}`.toLowerCase().replace(/[^a-z0-9]/g, '-');
      if (existingSet.has(id)) continue;

      // Hydrate via iTunes
      let artworkUrl: string | null = null;
      let tracks: any[] = [];
      let releaseYear: string | number = 'Lateral Classic';

      try {
        const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(item.artist + ' ' + item.title)}&entity=album&limit=1`;
        const itunesRes = await fetch(itunesUrl);
        if (itunesRes.ok) {
          const itunesData: any = await itunesRes.json();
          if (itunesData.results?.[0]) {
            const hit = itunesData.results[0];
            artworkUrl = hit.artworkUrl100 ? hit.artworkUrl100.replace('100x100bb', '1000x1000bb') : null;
            if (hit.releaseDate) releaseYear = new Date(hit.releaseDate).getFullYear();
            if (hit.collectionId) {
              const lookupRes = await fetch(`https://itunes.apple.com/lookup?id=${hit.collectionId}&entity=song&limit=25`);
              if (lookupRes.ok) {
                const lookupData: any = await lookupRes.json();
                tracks = (lookupData.results || [])
                  .slice(1)
                  .filter((t: any) => t.wrapperType === 'track')
                  .map((t: any, idx: number) => ({
                    id: `itunes-${t.trackId || idx}`,
                    title: t.trackName || `Track ${idx + 1}`,
                    durationMs: t.trackTimeMillis || null,
                    previewUrl: t.previewUrl || null,
                    trackNumber: t.trackNumber || idx + 1
                  }));
              }
            }
          }
        }
      } catch (_) {}

      const enc = encodeURIComponent(`${item.artist} ${item.title}`);

      albums.push({
        id,
        title: item.title,
        artist: item.artist,
        releaseYear,
        coverArtUrl: artworkUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
        genres: [item.genre || 'Lateral Discovery'],
        driftReason: item.driftReason || 'Discovered through AI lateral acoustic bridging.',
        tracks: tracks.length > 0 ? tracks : [
          { id: `t1-${id}`, title: 'Complete Album Audio Available Externally', durationMs: null, previewUrl: null, trackNumber: 1 }
        ],
        spotifyUrl: `https://open.spotify.com/search/${enc}`,
        youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(item.artist + ' ' + item.title + ' full album')}`,
        youtubeMusicUrl: `https://music.youtube.com/search?q=${enc}`
      });
    }

    return res.status(200).json({
      available: true,
      albums,
      source: 'gemini-2.5-flash'
    });
  } catch (error: any) {
    console.warn('Backend Gemini recommend error:', error);
    return res.status(500).json({ error: error.message || 'Server error generating recommendations' });
  }
}
