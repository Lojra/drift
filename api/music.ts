const MUSICBRAINZ_UA = 'DRIFT/1.0.0 ( contact@drift-music.app )';

function cleanQueryString(val: unknown, maxLen = 100): string {
  if (typeof val !== 'string') return '';
  // Strip control characters, null bytes, and excessive whitespace
  return val.replace(/[\x00-\x1F\x7F]/g, '').trim().slice(0, maxLen);
}

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  // Edge cache headers: Cache for 24h on CDN, serve stale up to 7 days
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');

  const cleanArtist = cleanQueryString(req.query?.artist);
  const cleanAlbum = cleanQueryString(req.query?.album);
  const cleanGenre = cleanQueryString(req.query?.genre);

  const rawLimit = parseInt(String(req.query?.limit || '10'), 10);
  const safeLimit = isNaN(rawLimit) ? 10 : Math.min(Math.max(1, rawLimit), 30);

  try {
    // 1. iTunes Tracklist & Artwork Lookup
    if (cleanArtist && cleanAlbum) {
      const term = `${cleanArtist} ${cleanAlbum}`;
      const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=album&limit=3`;
      const searchRes = await fetch(itunesUrl);

      if (!searchRes.ok) {
        return res.status(200).json({ artworkUrl: null, tracks: [] });
      }

      const searchData: any = await searchRes.json();
      if (!searchData.results || searchData.results.length === 0) {
        return res.status(200).json({ artworkUrl: null, tracks: [] });
      }

      const best = searchData.results[0];
      const artworkUrl = best.artworkUrl100 ? best.artworkUrl100.replace('100x100bb', '1000x1000bb') : null;
      let tracks: any[] = [];

      if (best.collectionId) {
        try {
          const lookupUrl = `https://itunes.apple.com/lookup?id=${best.collectionId}&entity=song&limit=30`;
          const lookupRes = await fetch(lookupUrl);
          if (lookupRes.ok) {
            const lookupData: any = await lookupRes.json();
            tracks = (lookupData.results || [])
              .slice(1)
              .filter((item: any) => item.wrapperType === 'track')
              .map((item: any, idx: number) => ({
                id: `itunes-${item.trackId || idx}`,
                title: cleanQueryString(item.trackName || `Track ${idx + 1}`, 150),
                durationMs: typeof item.trackTimeMillis === 'number' ? item.trackTimeMillis : null,
                previewUrl: typeof item.previewUrl === 'string' ? item.previewUrl : null,
                trackNumber: item.trackNumber || idx + 1
              }));
          }
        } catch (_) {}
      }

      return res.status(200).json({
        artworkUrl,
        tracks,
        releaseYear: best.releaseDate ? new Date(best.releaseDate).getFullYear() : undefined,
        genre: best.primaryGenreName
      });
    }

    // 2. MusicBrainz Tag/Genre Search
    if (cleanGenre) {
      // Strip Lucene syntax quotes and slashes to prevent query manipulation
      const sanitizedTag = cleanGenre.replace(/["\\]/g, '');
      const query = `tag:"${sanitizedTag}" AND primarytype:Album AND status:official`;
      const mbUrl = `https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(query)}&limit=${safeLimit}&fmt=json`;

      const mbRes = await fetch(mbUrl, {
        headers: { 'User-Agent': MUSICBRAINZ_UA }
      });

      if (!mbRes.ok) {
        return res.status(200).json({ albums: [] });
      }

      const data: any = await mbRes.json();
      const releaseGroups = data['release-groups'] || [];

      const albums = releaseGroups.slice(0, safeLimit).map((rg: any) => {
        const artistName = cleanQueryString(rg['artist-credit']?.[0]?.artist?.name || rg['artist-credit']?.[0]?.name || 'Unknown Artist', 120);
        const title = cleanQueryString(rg.title || 'Untitled', 150);
        const year = rg['first-release-date'] ? rg['first-release-date'].substring(0, 4) : 'Unknown Year';
        const enc = encodeURIComponent(`${artistName} ${title}`);

        return {
          id: `mb-${rg.id}`,
          mbid: rg.id,
          title,
          artist: artistName,
          releaseYear: year,
          coverArtUrl: `https://coverartarchive.org/release-group/${rg.id}/front-500`,
          genres: [cleanGenre],
          driftReason: `Discovered through acoustic affinity with ${cleanGenre}.`,
          tracks: [],
          spotifyUrl: `https://open.spotify.com/search/${enc}`,
          youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(artistName + ' ' + title + ' full album')}`,
          youtubeMusicUrl: `https://music.youtube.com/search?q=${enc}`
        };
      });

      return res.status(200).json({ albums });
    }

    return res.status(400).json({ error: 'Please specify genre or artist & album query parameters.' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Serverless music proxy error' });
  }
}
