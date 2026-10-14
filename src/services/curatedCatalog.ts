import { Album } from '../types/music';

function buildLinks(artist: string, album: string) {
  const enc = encodeURIComponent(`${artist} ${album}`);
  return {
    spotifyUrl: `https://open.spotify.com/search/${enc}`,
    youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(artist + ' ' + album + ' full album')}`,
    youtubeMusicUrl: `https://music.youtube.com/search?q=${enc}`
  };
}

export const CURATED_ALBUMS: Album[] = [
  // 1. KRAUTROCK & MOTORIK
  {
    id: 'curated-neu-72',
    title: 'Neu!',
    artist: 'Neu!',
    releaseYear: 1972,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/72/31/44/72314446-ff57-09b0-bb05-0ca0c9b487df/634457040847.jpg/1000x1000bb.jpg',
    genres: ['Krautrock', 'Motorik', 'Experimental Rock'],
    driftReason: 'Pioneering motorik heartbeat that laid the rhythmic foundation for post-punk pacing and modern techno.',
    tracks: [
      { id: 'neu-1', title: 'Hallogallo', durationMs: 607000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/91/33/21/913321db-829b-ee3c-743a-7db0df14c810/mzaf_6452296061616641775.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'neu-2', title: 'Sonderangebot', durationMs: 291000, previewUrl: null, trackNumber: 2 },
      { id: 'neu-3', title: 'Weissensee', durationMs: 406000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('Neu!', 'Neu!'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.7, hypnotic: 0.95, percussive: 0.8, era: '1970s' }
  },
  {
    id: 'curated-can-tago-mago',
    title: 'Tago Mago',
    artist: 'Can',
    releaseYear: 1971,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4a/01/2d/4a012d21-f3b1-6a2c-6112-70b135bb0ca1/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Krautrock', 'Psychedelic Rock', 'Experimental'],
    driftReason: 'Jaki Liebezeit\'s metronomic funk drumming wrapped in tape-loop mysticism and hypnotic tension.',
    tracks: [
      { id: 'can-1', title: 'Paperhouse', durationMs: 448000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/28/7f/73/287f73a5-1772-9706-e78d-aeb2c5952f44/mzaf_713606994781702812.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'can-2', title: 'Mushroom', durationMs: 243000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Can', 'Tago Mago'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.8, hypnotic: 0.9, percussive: 0.9, era: '1970s' }
  },
  {
    id: 'curated-can-future-days',
    title: 'Future Days',
    artist: 'Can',
    releaseYear: 1973,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d4/0b/b7/d40bb711-e630-f92d-947b-1cb81e9bc4e0/5016025683240.jpg/1000x1000bb.jpg',
    genres: ['Krautrock', 'Ambient Pop', 'Space Rock'],
    driftReason: 'Gentle, oceanic polyrhythms and ambient textures floating in warm Mediterranean sunshine.',
    tracks: [
      { id: 'cfd-1', title: 'Future Days', durationMs: 570000, previewUrl: null, trackNumber: 1 },
      { id: 'cfd-2', title: 'Spray', durationMs: 509000, previewUrl: null, trackNumber: 2 },
      { id: 'cfd-3', title: 'Moonshake', durationMs: 184000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('Can', 'Future Days'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.6, atmospheric: 0.9, hypnotic: 0.9, era: '1970s' }
  },
  {
    id: 'curated-harmonia-musik-von-harmonia',
    title: 'Musik von Harmonia',
    artist: 'Harmonia',
    releaseYear: 1974,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4a/ad/eb/4aadeb1c-7f5d-75e1-ea3b-7be716df0702/4015698006323.jpg/1000x1000bb.jpg',
    genres: ['Krautrock', 'Electronic', 'Motorik'],
    driftReason: 'Delicate electronic arpeggios that Brian Eno declared "the world\'s most important rock band".',
    tracks: [
      { id: 'har-1', title: 'Watussi', durationMs: 355000, previewUrl: null, trackNumber: 1 },
      { id: 'har-2', title: 'Sehr kosmisch', durationMs: 630000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Harmonia', 'Musik von Harmonia'),
    sonicTraits: { tempo: 'mid-tempo', hypnotic: 0.95, atmospheric: 0.85, era: '1970s' }
  },
  {
    id: 'curated-faust-iv',
    title: 'Faust IV',
    artist: 'Faust',
    releaseYear: 1973,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/42/bb/63/42bb63bb-6101-7132-ecab-b631d8c1c4f5/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Krautrock', 'Drone Rock', 'Avant-Garde'],
    driftReason: 'Monolithic, buzzing drone rock leading into sparkling acoustic vignettes and subverted pop hooks.',
    tracks: [
      { id: 'f-1', title: 'Krautrock', durationMs: 708000, previewUrl: null, trackNumber: 1 },
      { id: 'f-2', title: 'The Sad Skinhead', durationMs: 163000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Faust', 'Faust IV'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.75, hypnotic: 0.9, era: '1970s' }
  },
  {
    id: 'curated-kraftwerk-trans-europe-express',
    title: 'Trans-Europe Express',
    artist: 'Kraftwerk',
    releaseYear: 1977,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ef/0e/db/ef0edb3b-8cf7-23e5-813e-f1484ff2f99f/5099996602058.jpg/1000x1000bb.jpg',
    genres: ['Electronic', 'Synth-Pop', 'Krautrock'],
    driftReason: 'The sonic cornerstone connecting European minimalist classicism to early hip-hop and Detroit techno.',
    tracks: [
      { id: 'kw-1', title: 'Europe Endless', durationMs: 580000, previewUrl: null, trackNumber: 1 },
      { id: 'kw-2', title: 'Trans-Europe Express', durationMs: 412000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Kraftwerk', 'Trans-Europe Express'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.7, hypnotic: 0.95, percussive: 0.85, era: '1970s' }
  },
  {
    id: 'curated-popol-vuh-hosianna-mantra',
    title: 'Hosianna Mantra',
    artist: 'Popol Vuh',
    releaseYear: 1972,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2b/e4/20/2be4203e-80c1-236b-ca98-33010b9ca5d9/4015698006224.jpg/1000x1000bb.jpg',
    genres: ['Krautrock', 'Spiritual Ambient', 'Chamber Folk'],
    driftReason: 'Sacred piano, oboe, and tambura tapestries written for Werner Herzog\'s transcendental cinema.',
    tracks: [
      { id: 'pv-1', title: 'Ah!', durationMs: 285000, previewUrl: null, trackNumber: 1 },
      { id: 'pv-2', title: 'Kyrie', durationMs: 323000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Popol Vuh', 'Hosianna Mantra'),
    sonicTraits: { tempo: 'slow', atmospheric: 1.0, hypnotic: 0.9, era: '1970s' }
  },

  // 2. DUB & ROOTS REGGAE
  {
    id: 'curated-king-tubby-rockers',
    title: 'King Tubbys Meets Rockers Uptown',
    artist: 'Augustus Pablo & King Tubby',
    releaseYear: 1976,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/19/2d/e9/192de9cf-5f4a-fa0d-85f0-b98a339c9402/054645100363.jpg/1000x1000bb.jpg',
    genres: ['Dub', 'Reggae', 'Roots Dub'],
    driftReason: 'King Tubby\'s cavernous spring reverbs and Augustus Pablo\'s haunting, mystical melodica.',
    tracks: [
      { id: 'kt-1', title: 'Keep on Hollowin\'', durationMs: 231000, previewUrl: null, trackNumber: 1 },
      { id: 'kt-2', title: 'King Tubby Meets Rockers Uptown', durationMs: 154000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Augustus Pablo & King Tubby', 'King Tubbys Meets Rockers Uptown'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.65, atmospheric: 0.95, percussive: 0.85, era: '1970s' }
  },
  {
    id: 'curated-lee-perry-super-ape',
    title: 'Super Ape',
    artist: 'The Upsetters & Lee Perry',
    releaseYear: 1976,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/fc/19/1c/fc191cb3-f145-6cf1-97ce-a7bc0bb414ce/00731454848524.rgb.jpg/1000x1000bb.jpg',
    genres: ['Dub', 'Roots Reggae', 'Psychedelic Dub'],
    driftReason: 'The Black Ark studio\'s peak alchemical production: bass frequencies pushed to pure physical hypnosis.',
    tracks: [
      { id: 'sa-1', title: 'Zion\'s Blood', durationMs: 234000, previewUrl: null, trackNumber: 1 },
      { id: 'sa-2', title: 'Croaking Lizard', durationMs: 215000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('The Upsetters', 'Super Ape'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.7, atmospheric: 0.9, percussive: 0.85, era: '1970s' }
  },
  {
    id: 'curated-scientist-rids-world',
    title: 'Scientist Rids the World of the Evil Curse of the Vampires',
    artist: 'Scientist',
    releaseYear: 1981,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/58/01/5e/58015e10-c0be-4a24-9b2f-981f42289f89/054645100363.jpg/1000x1000bb.jpg',
    genres: ['Dub', 'Roots Dub', 'Dancehall'],
    driftReason: 'Roots Radics\' heaviest riddims deconstructed with surgical delay throws and sinister tape echoes.',
    tracks: [
      { id: 'sci-1', title: 'The Voodoo Curse', durationMs: 215000, previewUrl: null, trackNumber: 1 },
      { id: 'sci-2', title: 'Dance of the Vampires', durationMs: 208000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Scientist', 'Scientist Rids the World'),
    sonicTraits: { tempo: 'mid-tempo', atmospheric: 0.9, percussive: 0.9, era: '1980s' }
  },
  {
    id: 'curated-keith-hudson-flesh-of-my-skin',
    title: 'Flesh of My Skin Blood of My Blood',
    artist: 'Keith Hudson',
    releaseYear: 1974,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4a/12/34/4a1234bc-56de-78fa-bcde-123456789abc/5060135760012.jpg/1000x1000bb.jpg',
    genres: ['Dub', 'Dark Roots', 'Spiritual Reggae'],
    driftReason: 'The "Dark Prince of Reggae" creates an ominous, deeply brooding sonic universe of raw social reflection.',
    tracks: [
      { id: 'kh-1', title: 'Hunting', durationMs: 200000, previewUrl: null, trackNumber: 1 },
      { id: 'kh-2', title: 'Flesh of My Skin', durationMs: 215000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Keith Hudson', 'Flesh of My Skin'),
    sonicTraits: { tempo: 'slow', atmospheric: 0.9, melancholic: 0.95, era: '1970s' }
  },

  // 3. POST-PUNK & DARKWAVE
  {
    id: 'curated-joy-division-closer',
    title: 'Closer',
    artist: 'Joy Division',
    releaseYear: 1980,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/80/7e/40/807e408a-ea32-8438-d9d3-559d1ba95cfa/825646183913.jpg/1000x1000bb.jpg',
    genres: ['Post-Punk', 'Gothic Rock', 'Art Rock'],
    driftReason: 'Martin Hannett\'s architectural sonic space, Stephen Morris\'s relentless drums, and Ian Curtis\'s sepulchral vocals.',
    tracks: [
      { id: 'jd-1', title: 'Atrocity Exhibition', durationMs: 366000, previewUrl: null, trackNumber: 1 },
      { id: 'jd-2', title: 'Isolation', durationMs: 173000, previewUrl: null, trackNumber: 2 },
      { id: 'jd-3', title: 'Heart and Soul', durationMs: 351000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('Joy Division', 'Closer'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.8, atmospheric: 0.95, melancholic: 1.0, era: '1980s' }
  },
  {
    id: 'curated-cure-faith',
    title: 'Faith',
    artist: 'The Cure',
    releaseYear: 1981,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4a/bc/de/4abcde12-3456-7890-abcd-ef1234567890/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Post-Punk', 'Gothic Rock', 'Cold Wave'],
    driftReason: 'Minimal, sparse grey textures, subterranean six-string basslines, and existential mourning.',
    tracks: [
      { id: 'cur-1', title: 'The Holy Hour', durationMs: 275000, previewUrl: null, trackNumber: 1 },
      { id: 'cur-2', title: 'Primary', durationMs: 215000, previewUrl: null, trackNumber: 2 },
      { id: 'cur-3', title: 'Faith', durationMs: 412000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('The Cure', 'Faith'),
    sonicTraits: { tempo: 'slow', atmospheric: 0.95, melancholic: 1.0, era: '1980s' }
  },
  {
    id: 'curated-chameleons-script',
    title: 'Script of the Bridge',
    artist: 'The Chameleons',
    releaseYear: 1983,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/23/45/67/23456789-abcd-ef01-2345-6789abcdef01/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Post-Punk', 'Neo-Psychedelia', 'Gothic Rock'],
    driftReason: 'Vast, crystalline twin-guitar panoramas that became the blueprint for modern indie and post-rock.',
    tracks: [
      { id: 'cham-1', title: 'Don\'t Fall', durationMs: 246000, previewUrl: null, trackNumber: 1 },
      { id: 'cham-2', title: 'Up the Down Escalator', durationMs: 237000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('The Chameleons', 'Script of the Bridge'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.8, atmospheric: 0.9, era: '1980s' }
  },
  {
    id: 'curated-gang-of-four-entertainment',
    title: 'Entertainment!',
    artist: 'Gang of Four',
    releaseYear: 1979,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/78/90/ab/7890abcd-ef12-3456-7890-abcdef123456/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Post-Punk', 'Dance-Punk', 'Funk Rock'],
    driftReason: 'Razor-wire guitar shards and kinetic, dub-infected basslines dissecting media and consumer alienation.',
    tracks: [
      { id: 'gof-1', title: 'Damaged Goods', durationMs: 209000, previewUrl: null, trackNumber: 1 },
      { id: 'gof-2', title: 'Anthrax', durationMs: 263000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Gang of Four', 'Entertainment!'),
    sonicTraits: { tempo: 'up-tempo', energy: 0.9, percussive: 0.95, distortion: 0.8, era: '1970s' }
  },
  {
    id: 'curated-wire-154',
    title: '154',
    artist: 'Wire',
    releaseYear: 1979,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/34/56/78/3456789a-bcde-f012-3456-789abcdef012/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Post-Punk', 'Art Punk', 'Experimental Rock'],
    driftReason: 'Surgical minimalism evolving into moody gothic synth washes and avant-garde structural decay.',
    tracks: [
      { id: 'wire-1', title: 'I Should Have Known Better', durationMs: 231000, previewUrl: null, trackNumber: 1 },
      { id: 'wire-2', title: 'The 15th', durationMs: 184000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Wire', '154'),
    sonicTraits: { tempo: 'mid-tempo', atmospheric: 0.85, energy: 0.75, era: '1970s' }
  },
  {
    id: 'curated-boy-harsher-yr-body-is-nothing',
    title: 'Yr Body Is Nothing',
    artist: 'Boy Harsher',
    releaseYear: 2016,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4a/bc/78/4abc7890-def1-2345-6789-abcdef123456/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Darkwave', 'Minimal Wave', 'EBM'],
    driftReason: 'Sensual, brooding cold-wave synths with relentless, hypnotic four-on-the-floor kick drums.',
    tracks: [
      { id: 'bh-1', title: 'Pain', durationMs: 442000, previewUrl: null, trackNumber: 1 },
      { id: 'bh-2', title: 'Yr Body Is Nothing', durationMs: 278000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Boy Harsher', 'Yr Body Is Nothing'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.85, hypnotic: 0.95, distortion: 0.6, era: '2010s' }
  },

  // 4. ETHIO-JAZZ & AFRICAN GROOVES
  {
    id: 'curated-mulatu-ethio-jazz',
    title: 'Mulatu of Ethiopia',
    artist: 'Mulatu Astatke',
    releaseYear: 1972,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/10/7b/25/107b25ee-5b80-1a1a-a53c-1123456789ab/825646183913.jpg/1000x1000bb.jpg',
    genres: ['Ethio-Jazz', 'Spiritual Jazz', 'Afro-Cuban Jazz'],
    driftReason: 'Ancient Ethiopian five-tone scales fused with 1970s Latin jazz polyrhythms and cool vibrato vibraphone.',
    tracks: [
      { id: 'ma-1', title: 'Yèkèrmo Sèw', durationMs: 251000, previewUrl: null, trackNumber: 1 },
      { id: 'ma-2', title: 'Metche Dershe', durationMs: 236000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Mulatu Astatke', 'Mulatu of Ethiopia'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.7, hypnotic: 0.9, percussive: 0.9, era: '1970s' }
  },
  {
    id: 'curated-hailu-mergia-shemonmuanaye',
    title: 'Hailu Mergia & His Classical Instrument',
    artist: 'Hailu Mergia',
    releaseYear: 1985,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/56/78/90/567890ab-cdef-1234-5678-9abcdef01234/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Ethio-Jazz', 'Accordion Ambient', 'African Electronic'],
    driftReason: 'Nostalgic, dusty Moog synths and Rhodes accordion drifting through Addis Ababa night air.',
    tracks: [
      { id: 'hm-1', title: 'Anchin Kfu Ayinkash', durationMs: 310000, previewUrl: null, trackNumber: 1 },
      { id: 'hm-2', title: 'Sintayehu', durationMs: 290000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Hailu Mergia', 'Hailu Mergia and His Classical Instrument'),
    sonicTraits: { tempo: 'slow', atmospheric: 0.9, hypnotic: 0.9, era: '1980s' }
  },
  {
    id: 'curated-fela-kuti-expensive-shit',
    title: 'Expensive Shit',
    artist: 'Fela Kuti & Africa 70',
    releaseYear: 1975,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/67/89/0a/67890abc-def1-2345-6789-abcdef012345/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Afrobeat', 'Funk', 'Jazz-Funk'],
    driftReason: 'Tony Allen\'s unmatched interlocking polyrhythms backing Fela\'s blistering horn-fired revolutionary call.',
    tracks: [
      { id: 'fk-1', title: 'Expensive Shit', durationMs: 792000, previewUrl: null, trackNumber: 1 },
      { id: 'fk-2', title: 'Water No Get Enemy', durationMs: 659000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Fela Kuti', 'Expensive Shit'),
    sonicTraits: { tempo: 'up-tempo', energy: 0.95, percussive: 1.0, era: '1970s' }
  },
  {
    id: 'curated-ebo-taylor-life-stories',
    title: 'Life Stories: Highlife & Afro-Soul Classics',
    artist: 'Ebo Taylor',
    releaseYear: 1977,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/78/9a/bc/789abcde-f012-3456-789a-bcdef0123456/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Highlife', 'Afrobeat', 'Afro-Funk'],
    driftReason: 'Ghanaian highlife guitar counterpoint driven by searing brass sections and infectious coastal swing.',
    tracks: [
      { id: 'et-1', title: 'Love and Death', durationMs: 504000, previewUrl: null, trackNumber: 1 },
      { id: 'et-2', title: 'Heaven', durationMs: 367000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Ebo Taylor', 'Life Stories'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.85, percussive: 0.9, era: '1970s' }
  },
  {
    id: 'curated-william-onyeabor-atomic-bomb',
    title: 'Atomic Bomb',
    artist: 'William Onyeabor',
    releaseYear: 1978,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/89/ab/cd/89abcdef-0123-4567-89ab-cdef01234567/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Afro-Synth', 'Electro-Funk', 'Afrobeat'],
    driftReason: 'Analog synthesizer loops and space-age disco rhythms straight from a clandestine Nigerian studio.',
    tracks: [
      { id: 'wo-1', title: 'Atomic Bomb', durationMs: 440000, previewUrl: null, trackNumber: 1 },
      { id: 'wo-2', title: 'Better Change Your Mind', durationMs: 495000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('William Onyeabor', 'Atomic Bomb'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.85, hypnotic: 0.95, era: '1970s' }
  },
  {
    id: 'curated-witch-lazy-bones',
    title: 'Lazy Bones!!',
    artist: 'WITCH',
    releaseYear: 1975,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/9a/bc/de/9abcdef0-1234-5678-9abc-def012345678/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Zamrock', 'Psychedelic Rock', 'Garage Rock'],
    driftReason: 'Raw, fuzz-drenched Zambian garage rock driven by garage punk energy and hypnotic African backbeats.',
    tracks: [
      { id: 'witch-1', title: 'Lazy Bones', durationMs: 250000, previewUrl: null, trackNumber: 1 },
      { id: 'witch-2', title: 'Havoc', durationMs: 242000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('WITCH', 'Lazy Bones!!'),
    sonicTraits: { tempo: 'up-tempo', energy: 0.9, distortion: 0.85, era: '1970s' }
  },

  // 5. AMBIENT, DRONE & MODERN CLASSICAL
  {
    id: 'curated-brian-eno-apollo',
    title: 'Apollo: Atmospheres and Soundtracks',
    artist: 'Brian Eno',
    releaseYear: 1983,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ab/cd/ef/abcdef01-2345-6789-abcd-ef0123456789/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Ambient', 'Space Ambient', 'Drone'],
    driftReason: 'Weightless pedal steel guitars and serene synth currents capturing the quiet awe of lunar exploration.',
    tracks: [
      { id: 'be-1', title: 'An Ending (Ascent)', durationMs: 264000, previewUrl: null, trackNumber: 1 },
      { id: 'be-2', title: 'Deep Blue Day', durationMs: 236000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Brian Eno', 'Apollo'),
    sonicTraits: { tempo: 'slow', atmospheric: 1.0, hypnotic: 0.95, era: '1980s' }
  },
  {
    id: 'curated-stars-of-the-lid-refinement',
    title: 'The Tired Sounds of Stars of the Lid',
    artist: 'Stars of the Lid',
    releaseYear: 2001,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/bc/de/f0/bcdef012-3456-789a-bcde-f0123456789a/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Drone', 'Ambient', 'Modern Classical'],
    driftReason: 'Glacial, orchestral drones that unfold with cathedral-scale patience and deep, meditative peace.',
    tracks: [
      { id: 'sotl-1', title: 'Requiem for Dying Mothers', durationMs: 398000, previewUrl: null, trackNumber: 1 },
      { id: 'sotl-2', title: 'Austin Westbound', durationMs: 420000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Stars of the Lid', 'The Tired Sounds of Stars of the Lid'),
    sonicTraits: { tempo: 'slow', atmospheric: 1.0, hypnotic: 1.0, era: '2000s' }
  },
  {
    id: 'curated-tim-hecker-ravedeath',
    title: 'Ravedeath, 1972',
    artist: 'Tim Hecker',
    releaseYear: 2011,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/cd/ef/01/cdef0123-4567-89ab-cdef-0123456789ab/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Ambient', 'Drone', 'Noise'],
    driftReason: 'A pipe organ recorded in an Icelandic church, meticulously fragmented into radiant, distorted sonic embers.',
    tracks: [
      { id: 'th-1', title: 'The Piano Drop', durationMs: 174000, previewUrl: null, trackNumber: 1 },
      { id: 'th-2', title: 'In the Fog I', durationMs: 292000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Tim Hecker', 'Ravedeath 1972'),
    sonicTraits: { tempo: 'slow', atmospheric: 0.95, distortion: 0.8, era: '2010s' }
  },
  {
    id: 'curated-william-basinski-disintegration-loops',
    title: 'The Disintegration Loops',
    artist: 'William Basinski',
    releaseYear: 2002,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/de/f0/12/def01234-5678-9abc-def0-123456789abc/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Ambient', 'Tape Music', 'Minimalism'],
    driftReason: 'Pastoral brass tape loops gradually decaying into dust in real time, chronicling the impermanence of memory.',
    tracks: [
      { id: 'wb-1', title: 'dlp 1.1', durationMs: 3810000, previewUrl: null, trackNumber: 1 }
    ],
    ...buildLinks('William Basinski', 'The Disintegration Loops'),
    sonicTraits: { tempo: 'slow', atmospheric: 1.0, hypnotic: 1.0, era: '2000s' }
  },
  {
    id: 'curated-grouper-dragging-a-dead-deer',
    title: 'Dragging a Dead Deer Up a Hill',
    artist: 'Grouper',
    releaseYear: 2008,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ef/01/23/ef012345-6789-abcd-ef01-23456789abcd/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Ambient Folk', 'Dream Pop', 'Slowcore'],
    driftReason: 'Whispered, reverb-drowned acoustic strums and spectral tape hiss creating an intimate cabin shelter.',
    tracks: [
      { id: 'grp-1', title: 'Heavy Water / I\'d Rather Be Sleeping', durationMs: 173000, previewUrl: null, trackNumber: 1 },
      { id: 'grp-2', title: 'Stuck', durationMs: 359000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Grouper', 'Dragging a Dead Deer Up a Hill'),
    sonicTraits: { tempo: 'slow', atmospheric: 0.95, melancholic: 0.95, era: '2000s' }
  },

  // 6. TRIP-HOP & DOWNTEMPO
  {
    id: 'curated-massive-attack-mezzanine',
    title: 'Mezzanine',
    artist: 'Massive Attack',
    releaseYear: 1998,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/f0/12/34/f0123456-789a-bcde-f012-3456789abcde/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Trip-Hop', 'Downtempo', 'Post-Punk'],
    driftReason: 'Heavy cavernous sub-bass, dark dub spaces, and distorted post-punk guitars forming pure nocturnal tension.',
    tracks: [
      { id: 'ma-1', title: 'Angel', durationMs: 379000, previewUrl: null, trackNumber: 1 },
      { id: 'ma-2', title: 'Teardrop', durationMs: 330000, previewUrl: null, trackNumber: 2 },
      { id: 'ma-3', title: 'Inertia Creeps', durationMs: 356000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('Massive Attack', 'Mezzanine'),
    sonicTraits: { tempo: 'slow', energy: 0.8, atmospheric: 0.95, percussive: 0.85, era: '1990s' }
  },
  {
    id: 'curated-portishead-dummy',
    title: 'Dummy',
    artist: 'Portishead',
    releaseYear: 1994,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/01/23/45/01234567-89ab-cdef-0123-456789abcdef/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Trip-Hop', 'Downtempo', 'Dark Jazz'],
    driftReason: 'Spine-tingling theremin, hip-hop vinyl crackle, and Beth Gibbons\' heartbroken noir torch vocals.',
    tracks: [
      { id: 'por-1', title: 'Mysterons', durationMs: 302000, previewUrl: null, trackNumber: 1 },
      { id: 'por-2', title: 'Sour Times', durationMs: 251000, previewUrl: null, trackNumber: 2 },
      { id: 'por-3', title: 'Roads', durationMs: 302000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('Portishead', 'Dummy'),
    sonicTraits: { tempo: 'slow', atmospheric: 0.95, melancholic: 1.0, era: '1990s' }
  },
  {
    id: 'curated-dj-shadow-endtroducing',
    title: 'Endtroducing.....',
    artist: 'DJ Shadow',
    releaseYear: 1996,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/12/34/56/12345678-9abc-def0-1234-56789abcdef0/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Instrumental Hip-Hop', 'Trip-Hop', 'Plunderphonics'],
    driftReason: 'Constructed entirely from thrift-store vinyl samples, forging an atmospheric cinematic masterpiece.',
    tracks: [
      { id: 'djs-1', title: 'Building Steam with a Grain of Salt', durationMs: 397000, previewUrl: null, trackNumber: 1 },
      { id: 'djs-2', title: 'Midnight in a Perfect World', durationMs: 302000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('DJ Shadow', 'Endtroducing'),
    sonicTraits: { tempo: 'mid-tempo', percussive: 0.95, atmospheric: 0.9, era: '1990s' }
  },
  {
    id: 'curated-tricky-maxinquaye',
    title: 'Maxinquaye',
    artist: 'Tricky',
    releaseYear: 1995,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/23/45/67/23456789-abcd-ef01-2345-6789abcdef01/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Trip-Hop', 'Downtempo', 'Dub'],
    driftReason: 'Murky Bristol dub claustrophobia tangled with hip-hop breaks and whispered, paranoid poetry.',
    tracks: [
      { id: 'tri-1', title: 'Overcome', durationMs: 270000, previewUrl: null, trackNumber: 1 },
      { id: 'tri-2', title: 'Black Steel', durationMs: 340000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Tricky', 'Maxinquaye'),
    sonicTraits: { tempo: 'slow', energy: 0.75, atmospheric: 0.95, era: '1990s' }
  },

  // 7. SHOEGAZE & DREAM POP
  {
    id: 'curated-mbv-loveless',
    title: 'Loveless',
    artist: 'My Bloody Valentine',
    releaseYear: 1991,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/34/56/78/3456789a-bcde-f012-3456-789abcdef012/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Shoegaze', 'Noise Pop', 'Dream Pop'],
    driftReason: 'Kevin Shields\' glide guitar technique crafting an undulating wall of warm, euphoric distortion.',
    tracks: [
      { id: 'mbv-1', title: 'Only Shallow', durationMs: 257000, previewUrl: null, trackNumber: 1 },
      { id: 'mbv-2', title: 'When You Sleep', durationMs: 251000, previewUrl: null, trackNumber: 2 },
      { id: 'mbv-3', title: 'Soon', durationMs: 598000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('My Bloody Valentine', 'Loveless'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.85, distortion: 1.0, atmospheric: 0.95, era: '1990s' }
  },
  {
    id: 'curated-slowdive-souvlaki',
    title: 'Souvlaki',
    artist: 'Slowdive',
    releaseYear: 1993,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/45/67/89/456789ab-cdef-0123-4567-89abcdef0123/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Shoegaze', 'Dream Pop', 'Ambient Rock'],
    driftReason: 'Lush, delay-drenched sonic cathedrals co-crafted with ambient visionary Brian Eno.',
    tracks: [
      { id: 'slo-1', title: 'Alison', durationMs: 232000, previewUrl: null, trackNumber: 1 },
      { id: 'slo-2', title: 'Machine Gun', durationMs: 283000, previewUrl: null, trackNumber: 2 },
      { id: 'slo-3', title: 'When the Sun Hits', durationMs: 287000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('Slowdive', 'Souvlaki'),
    sonicTraits: { tempo: 'slow', atmospheric: 1.0, melancholic: 0.9, era: '1990s' }
  },
  {
    id: 'curated-cocteau-twins-las-vegas',
    title: 'Heaven or Las Vegas',
    artist: 'Cocteau Twins',
    releaseYear: 1990,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/56/78/9a/56789abc-def0-1234-5678-9abcdef01234/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Dream Pop', 'Ethereal Wave', 'Art Pop'],
    driftReason: 'Elizabeth Fraser\'s glossolalic soaring vocals intertwined with Robin Guthrie\'s chorused, shimmering guitar waterfalls.',
    tracks: [
      { id: 'ct-1', title: 'Cherry-Coloured Funk', durationMs: 192000, previewUrl: null, trackNumber: 1 },
      { id: 'ct-2', title: 'Fifty-Fifty Clown', durationMs: 190000, previewUrl: null, trackNumber: 2 },
      { id: 'ct-3', title: 'Heaven or Las Vegas', durationMs: 298000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('Cocteau Twins', 'Heaven or Las Vegas'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.7, atmospheric: 1.0, hypnotic: 0.85, era: '1990s' }
  },

  // 8. IDM & INTELLIGENT ELECTRONIC
  {
    id: 'curated-boards-of-canada-geogaddi',
    title: 'Geogaddi',
    artist: 'Boards of Canada',
    releaseYear: 2002,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/67/89/ab/6789abcd-ef01-2345-6789-abcdef012345/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['IDM', 'Downtempo', 'Hauntology'],
    driftReason: 'Warm analog synthesizers, childhood memory nostalgia, and subliminal numerological puzzlecraft.',
    tracks: [
      { id: 'boc-1', title: 'Music Is Math', durationMs: 321000, previewUrl: null, trackNumber: 1 },
      { id: 'boc-2', title: 'Gyroscope', durationMs: 214000, previewUrl: null, trackNumber: 2 },
      { id: 'boc-3', title: '1969', durationMs: 260000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('Boards of Canada', 'Geogaddi'),
    sonicTraits: { tempo: 'mid-tempo', atmospheric: 0.95, hypnotic: 1.0, era: '2000s' }
  },
  {
    id: 'curated-aphex-twin-saw-85-92',
    title: 'Selected Ambient Works 85-92',
    artist: 'Aphex Twin',
    releaseYear: 1992,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/78/9a/bc/789abcde-f012-3456-789a-bcdef0123456/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Ambient Techno', 'IDM', 'Electronic'],
    driftReason: 'Richard D. James\'s handcrafted analog gear generating melodic, celestial techno of profound intimacy.',
    tracks: [
      { id: 'at-1', title: 'Xtal', durationMs: 294000, previewUrl: null, trackNumber: 1 },
      { id: 'at-2', title: 'Tha', durationMs: 546000, previewUrl: null, trackNumber: 2 },
      { id: 'at-3', title: 'Pulsewidth', durationMs: 226000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('Aphex Twin', 'Selected Ambient Works 85-92'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.7, atmospheric: 0.95, hypnotic: 0.95, era: '1990s' }
  },
  {
    id: 'curated-burial-untrue',
    title: 'Untrue',
    artist: 'Burial',
    releaseYear: 2007,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/89/ab/cd/89abcdef-0123-4567-89ab-cdef01234567/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Dubstep', 'Future Garage', 'Ambient'],
    driftReason: 'Rain-soaked London night bus ambience, pitch-shifted R&B ghosts, and shuffling, unquantized syncopation.',
    tracks: [
      { id: 'bur-1', title: 'Archangel', durationMs: 238000, previewUrl: null, trackNumber: 1 },
      { id: 'bur-2', title: 'Ghost Hardware', durationMs: 293000, previewUrl: null, trackNumber: 2 },
      { id: 'bur-3', title: 'Etched Headplate', durationMs: 359000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('Burial', 'Untrue'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.75, atmospheric: 1.0, melancholic: 1.0, era: '2000s' }
  },
  {
    id: 'curated-autechre-tri-repetae',
    title: 'Tri Repetae',
    artist: 'Autechre',
    releaseYear: 1995,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/9a/bc/de/9abcdef0-1234-5678-9abc-def012345678/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['IDM', 'Glitch', 'Industrial Techno'],
    driftReason: 'Metallic, algorithmic percussion patterns woven with austere emotional synth counter-melodies.',
    tracks: [
      { id: 'ae-1', title: 'Dael', durationMs: 400000, previewUrl: null, trackNumber: 1 },
      { id: 'ae-2', title: 'Clipper', durationMs: 513000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Autechre', 'Tri Repetae'),
    sonicTraits: { tempo: 'mid-tempo', percussive: 1.0, hypnotic: 0.9, era: '1990s' }
  },
  {
    id: 'curated-four-tet-rounds',
    title: 'Rounds',
    artist: 'Four Tet',
    releaseYear: 2003,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ab/cd/ef/abcdef01-2345-6789-abcd-ef0123456789/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Folktronica', 'IDM', 'Downtempo'],
    driftReason: 'Pastoral harp arpeggios and jazz drum loops spliced into warm, emotionally resonant electronic collages.',
    tracks: [
      { id: 'ft-1', title: 'Hands', durationMs: 341000, previewUrl: null, trackNumber: 1 },
      { id: 'ft-2', title: 'She Moves She', durationMs: 279000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Four Tet', 'Rounds'),
    sonicTraits: { tempo: 'mid-tempo', percussive: 0.85, atmospheric: 0.9, era: '2000s' }
  },

  // 9. JAPANESE CITY POP & AMBIENT
  {
    id: 'curated-onuki-sunshower',
    title: 'Sunshower',
    artist: 'Taeko Onuki',
    releaseYear: 1977,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b8/b2/97/b8b297b8-1cf4-28a1-d5d2-0fb33767f407/4988007261944.jpg/1000x1000bb.jpg',
    genres: ['City Pop', 'Jazz-Funk', 'Bossa Nova'],
    driftReason: 'Ryuichi Sakamoto\'s arrangements paired with breezy Fender Rhodes, tight syncopated brass and Tokyo sunset warmth.',
    tracks: [
      { id: 'to-1', title: 'Summer Connection', durationMs: 270000, previewUrl: null, trackNumber: 1 },
      { id: 'to-2', title: 'Tokai', durationMs: 312000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Taeko Onuki', 'Sunshower'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.75, percussive: 0.85, atmospheric: 0.7, era: '1970s' }
  },
  {
    id: 'curated-hiroshi-yoshimura-music-for-nine-post-cards',
    title: 'Music for Nine Post Cards',
    artist: 'Hiroshi Yoshimura',
    releaseYear: 1982,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/cd/ef/01/cdef0123-4567-89ab-cdef-0123456789ab/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Kankyō Ongaku', 'Japanese Ambient', 'Minimalism'],
    driftReason: 'Environmental music composed for a Tokyo museum, evoking cool ceramic tiles, morning raindrops, and quiet stillness.',
    tracks: [
      { id: 'hy-1', title: 'Water Copy', durationMs: 367000, previewUrl: null, trackNumber: 1 },
      { id: 'hy-2', title: 'Clouds', durationMs: 351000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Hiroshi Yoshimura', 'Music for Nine Post Cards'),
    sonicTraits: { tempo: 'slow', atmospheric: 1.0, hypnotic: 0.95, era: '1980s' }
  },
  {
    id: 'curated-midori-takada-through-the-looking-glass',
    title: 'Through the Looking Glass',
    artist: 'Midori Takada',
    releaseYear: 1983,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/de/f0/12/def01234-5678-9abc-def0-123456789abc/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Minimalism', 'Percussion', 'Ambient'],
    driftReason: 'Solo marimba, reed organ, and bells creating crystalline polyrhythmic patterns inspired by African and Indonesian music.',
    tracks: [
      { id: 'mt-1', title: 'Mr. Henri Rousseau\'s Dream', durationMs: 382000, previewUrl: null, trackNumber: 1 },
      { id: 'mt-2', title: 'Crossing', durationMs: 651000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Midori Takada', 'Through the Looking Glass'),
    sonicTraits: { tempo: 'mid-tempo', percussive: 0.95, atmospheric: 0.9, era: '1980s' }
  },
  {
    id: 'curated-tatsuro-yamashita-spacy',
    title: 'Spacy',
    artist: 'Tatsuro Yamashita',
    releaseYear: 1977,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ef/01/23/ef012345-6789-abcd-ef01-23456789abcd/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['City Pop', 'Funk', 'Soul'],
    driftReason: 'Immaculate studio craftsmanship, soaring vocal harmonies, and irresistible Japanese groove.',
    tracks: [
      { id: 'ty-1', title: 'Love Space', durationMs: 284000, previewUrl: null, trackNumber: 1 },
      { id: 'ty-2', title: 'Solid Slider', durationMs: 423000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Tatsuro Yamashita', 'Spacy'),
    sonicTraits: { tempo: 'up-tempo', energy: 0.85, percussive: 0.9, era: '1970s' }
  },
  {
    id: 'curated-ymo-solid-state-survivor',
    title: 'Solid State Survivor',
    artist: 'Yellow Magic Orchestra',
    releaseYear: 1979,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f0/12/34/f0123456-789a-bcde-f012-3456789abcde/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Synth-Pop', 'Electronic', 'New Wave'],
    driftReason: 'Haruomi Hosono, Ryuichi Sakamoto, and Yukihiro Takahashi invent hyper-kinetic synth-pop brilliance.',
    tracks: [
      { id: 'ymo-1', title: 'Rydeen', durationMs: 266000, previewUrl: null, trackNumber: 1 },
      { id: 'ymo-2', title: 'Behind the Mask', durationMs: 218000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Yellow Magic Orchestra', 'Solid State Survivor'),
    sonicTraits: { tempo: 'up-tempo', energy: 0.9, percussive: 0.9, era: '1970s' }
  },

  // 10. SPIRITUAL JAZZ & MODAL ODYSSEYS
  {
    id: 'curated-alice-coltrane-journey-in-satchidananda',
    title: 'Journey in Satchidananda',
    artist: 'Alice Coltrane',
    releaseYear: 1971,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/01/23/45/01234567-89ab-cdef-0123-456789abcdef/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Spiritual Jazz', 'Modal Jazz', 'Avant-Garde Jazz'],
    driftReason: 'Cascading concert harp, Pharoah Sanders\' soprano sax, and Cecil McBee\'s droning tambura meditation.',
    tracks: [
      { id: 'ac-1', title: 'Journey in Satchidananda', durationMs: 399000, previewUrl: null, trackNumber: 1 },
      { id: 'ac-2', title: 'Shiva-Loka', durationMs: 395000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Alice Coltrane', 'Journey in Satchidananda'),
    sonicTraits: { tempo: 'slow', atmospheric: 1.0, hypnotic: 0.95, era: '1970s' }
  },
  {
    id: 'curated-pharoah-sanders-karma',
    title: 'Karma',
    artist: 'Pharoah Sanders',
    releaseYear: 1969,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/12/34/56/12345678-9abc-def0-1234-56789abcdef0/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Spiritual Jazz', 'Free Jazz', 'Avant-Garde'],
    driftReason: 'Leon Thomas\'s transcendental yodeling and Sanders\' cathartic overblown tenor sax preaching universal love.',
    tracks: [
      { id: 'ps-1', title: 'The Creator Has a Master Plan', durationMs: 1965000, previewUrl: null, trackNumber: 1 }
    ],
    ...buildLinks('Pharoah Sanders', 'Karma'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.9, atmospheric: 0.95, era: '1960s' }
  },
  {
    id: 'curated-don-cherry-brown-rice',
    title: 'Brown Rice',
    artist: 'Don Cherry',
    releaseYear: 1975,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/23/45/67/23456789-abcd-ef01-2345-6789abcdef01/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Jazz Fusion', 'Fourth World', 'Spiritual Jazz'],
    driftReason: 'Pocket trumpet meditations over deep hypnotic funk grooves and Indian drone textures.',
    tracks: [
      { id: 'dc-1', title: 'Brown Rice', durationMs: 315000, previewUrl: null, trackNumber: 1 },
      { id: 'dc-2', title: 'Malkauns', durationMs: 840000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Don Cherry', 'Brown Rice'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.75, hypnotic: 0.9, era: '1970s' }
  },

  // 11. BOSSA NOVA & TROPICALIA
  {
    id: 'curated-arthur-verocai-72',
    title: 'Arthur Verocai',
    artist: 'Arthur Verocai',
    releaseYear: 1972,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/34/56/78/3456789a-bcde-f012-3456-789abcdef012/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['MPB', 'Samba-Jazz', 'Orchestral Soul'],
    driftReason: 'The holy grail of Brazilian arranger soul: cinematic strings, nylon acoustics, and breathtaking brass flourishes.',
    tracks: [
      { id: 'av-1', title: 'Caboclo', durationMs: 172000, previewUrl: null, trackNumber: 1 },
      { id: 'av-2', title: 'Pelas Sombras', durationMs: 136000, previewUrl: null, trackNumber: 2 },
      { id: 'av-3', title: 'Na Boca do Sol', durationMs: 174000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('Arthur Verocai', 'Arthur Verocai'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.75, atmospheric: 0.9, percussive: 0.85, era: '1970s' }
  },
  {
    id: 'curated-caetano-veloso-transa',
    title: 'Transa',
    artist: 'Caetano Veloso',
    releaseYear: 1972,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/45/67/89/456789ab-cdef-0123-4567-89abcdef0123/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Tropicália', 'Folk Rock', 'Samba-Reggae'],
    driftReason: 'Recorded in London exile: bittersweet acoustic melancholy infused with Afro-Brazilian rhythmic momentum.',
    tracks: [
      { id: 'cv-1', title: 'You Don\'t Know Me', durationMs: 230000, previewUrl: null, trackNumber: 1 },
      { id: 'cv-2', title: 'Nine Out of Ten', durationMs: 300000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Caetano Veloso', 'Transa'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.7, melancholic: 0.8, era: '1970s' }
  },
  {
    id: 'curated-os-mutantes-68',
    title: 'Os Mutantes',
    artist: 'Os Mutantes',
    releaseYear: 1968,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/56/78/9a/56789abc-def0-1234-5678-9abcdef01234/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Tropicália', 'Psychedelic Rock', 'Avant-Pop'],
    driftReason: 'Anarchic fuzz pedals, tape-manipulation antics, and exuberant Brazilian bossa melodies.',
    tracks: [
      { id: 'om-1', title: 'Panis et Circenses', durationMs: 218000, previewUrl: null, trackNumber: 1 },
      { id: 'om-2', title: 'A Minha Menina', durationMs: 282000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Os Mutantes', 'Os Mutantes'),
    sonicTraits: { tempo: 'up-tempo', energy: 0.9, distortion: 0.8, era: '1960s' }
  },

  // 12. NEO-PSYCHEDELIA & SPACE ROCK
  {
    id: 'curated-spiritualized-ladies-and-gentlemen',
    title: 'Ladies and Gentlemen We Are Floating in Space',
    artist: 'Spiritualized',
    releaseYear: 1997,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/67/89/ab/6789abcd-ef01-2345-6789-abcdef012345/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Space Rock', 'Neo-Psychedelia', 'Gospel Rock'],
    driftReason: 'Massive orchestral walls of sound, gospel choirs, and devastatingly fragile heartbreak ballads.',
    tracks: [
      { id: 'sp-1', title: 'Ladies and Gentlemen We Are Floating in Space', durationMs: 220000, previewUrl: null, trackNumber: 1 },
      { id: 'sp-2', title: 'Come Together', durationMs: 280000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Spiritualized', 'Ladies and Gentlemen We Are Floating in Space'),
    sonicTraits: { tempo: 'slow', atmospheric: 1.0, melancholic: 0.95, era: '1990s' }
  },
  {
    id: 'curated-broadcast-tender-buttons',
    title: 'Tender Buttons',
    artist: 'Broadcast',
    releaseYear: 2005,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/78/9a/bc/789abcde-f012-3456-789a-bcdef0123456/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Indie Pop', 'Hauntology', 'Experimental Pop'],
    driftReason: 'Trish Keenan\'s pure, crystalline voice over brittle vintage drum machines and uncanny radiophonic synth chirps.',
    tracks: [
      { id: 'bc-1', title: 'I Found the F', durationMs: 141000, previewUrl: null, trackNumber: 1 },
      { id: 'bc-2', title: 'Black Cat', durationMs: 238000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Broadcast', 'Tender Buttons'),
    sonicTraits: { tempo: 'mid-tempo', atmospheric: 0.9, hypnotic: 0.95, era: '2000s' }
  },
  {
    id: 'curated-stereolab-dots-and-loops',
    title: 'Dots and Loops',
    artist: 'Stereolab',
    releaseYear: 1997,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/89/ab/cd/89abcdef-0123-4567-89ab-cdef01234567/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Post-Rock', 'Krautrock', 'Bossa Nova'],
    driftReason: 'Krautrock motorik momentum married to Brazilian bossa lounge and vintage analog synthesizer mastery.',
    tracks: [
      { id: 'ste-1', title: 'Brakhage', durationMs: 330000, previewUrl: null, trackNumber: 1 },
      { id: 'ste-2', title: 'Miss Modular', durationMs: 407000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Stereolab', 'Dots and Loops'),
    sonicTraits: { tempo: 'mid-tempo', hypnotic: 0.95, percussive: 0.85, era: '1990s' }
  },
  {
    id: 'curated-kikagaku-moyo-masana-temples',
    title: 'Masana Temples',
    artist: 'Kikagaku Moyo',
    releaseYear: 2018,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/9a/bc/de/9abcdef0-1234-5678-9abc-def012345678/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Psychedelic Rock', 'Krautrock', 'Raga Rock'],
    driftReason: 'Tokyo psych explorers blending Indian sitar drone with motorik krautrock and fluid acid folk.',
    tracks: [
      { id: 'km-1', title: 'Entrance', durationMs: 220000, previewUrl: null, trackNumber: 1 },
      { id: 'km-2', title: 'Dripping Sun', durationMs: 462000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Kikagaku Moyo', 'Masana Temples'),
    sonicTraits: { tempo: 'mid-tempo', energy: 0.8, atmospheric: 0.9, era: '2010s' }
  },

  // 13. POST-ROCK & CINEMATIC MINIMALISM
  {
    id: 'curated-gybe-lift-your-skinny-fists',
    title: 'Lift Your Skinny Fists Like Antennas to Heaven',
    artist: 'Godspeed You! Black Emperor',
    releaseYear: 2000,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ab/cd/ef/abcdef01-2345-6789-abcd-ef0123456789/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Post-Rock', 'Drone', 'Modern Classical'],
    driftReason: 'Apocalyptic field recordings and monumental orchestral guitar crescendos spanning four symphonic movements.',
    tracks: [
      { id: 'gy-1', title: 'Storm', durationMs: 1352000, previewUrl: null, trackNumber: 1 },
      { id: 'gy-2', title: 'Static', durationMs: 1355000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Godspeed You! Black Emperor', 'Lift Your Skinny Fists'),
    sonicTraits: { tempo: 'slow', energy: 0.9, atmospheric: 1.0, era: '2000s' }
  },
  {
    id: 'curated-sigur-ros-agaetis-byrjun',
    title: 'Ágætis byrjun',
    artist: 'Sigur Rós',
    releaseYear: 1999,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/bc/de/f0/bcdef012-3456-789a-bcde-f0123456789a/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Post-Rock', 'Dream Pop', 'Chamber Rock'],
    driftReason: 'Bowed electric guitars, soaring falsetto, and majestic sub-arctic orchestral arrangements.',
    tracks: [
      { id: 'sr-1', title: 'Svefn-g-englar', durationMs: 604000, previewUrl: null, trackNumber: 1 },
      { id: 'sr-2', title: 'Starálfur', durationMs: 406000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Sigur Ros', 'Agaetis byrjun'),
    sonicTraits: { tempo: 'slow', atmospheric: 1.0, melancholic: 0.9, era: '1990s' }
  },
  {
    id: 'curated-tortoise-millions-now-living',
    title: 'Millions Now Living Will Never Die',
    artist: 'Tortoise',
    releaseYear: 1996,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/cd/ef/01/cdef0123-4567-89ab-cdef-0123456789ab/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Post-Rock', 'Krautrock', 'Dub'],
    driftReason: 'Chicago post-rock pinnacle: twin vibraphones, hypnotic bass ostinatos, and dub studio deconstruction.',
    tracks: [
      { id: 'tor-1', title: 'Djed', durationMs: 1253000, previewUrl: null, trackNumber: 1 },
      { id: 'tor-2', title: 'Glass Museum', durationMs: 327000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Tortoise', 'Millions Now Living Will Never Die'),
    sonicTraits: { tempo: 'mid-tempo', hypnotic: 0.95, percussive: 0.9, era: '1990s' }
  },

  // 14. ART POP & AVANT-GARDE
  {
    id: 'curated-kate-bush-hounds-of-love',
    title: 'Hounds of Love',
    artist: 'Kate Bush',
    releaseYear: 1985,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/de/f0/12/def01234-5678-9abc-def0-123456789abc/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Art Pop', 'Progressive Pop', 'Synth-Pop'],
    driftReason: 'Fairlight CMI sampling sorcery and Celtic folk percussion backing a conceptual masterpiece of emotional rebirth.',
    tracks: [
      { id: 'kb-1', title: 'Running Up That Hill', durationMs: 300000, previewUrl: null, trackNumber: 1 },
      { id: 'kb-2', title: 'Hounds of Love', durationMs: 182000, previewUrl: null, trackNumber: 2 },
      { id: 'kb-3', title: 'Cloudbusting', durationMs: 310000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('Kate Bush', 'Hounds of Love'),
    sonicTraits: { tempo: 'up-tempo', energy: 0.85, atmospheric: 0.9, percussive: 0.9, era: '1980s' }
  },
  {
    id: 'curated-bjork-vespertine',
    title: 'Vespertine',
    artist: 'Björk',
    releaseYear: 2001,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ef/01/23/ef012345-6789-abcd-ef01-23456789abcd/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Glitch Pop', 'Art Pop', 'Chamber Electronic'],
    driftReason: 'Micro-beats sculpted from footsteps on snow, celesta chimes, and an Icelandic choir creating an intimate winter palace.',
    tracks: [
      { id: 'bj-1', title: 'Hidden Place', durationMs: 328000, previewUrl: null, trackNumber: 1 },
      { id: 'bj-2', title: 'Cocoon', durationMs: 268000, previewUrl: null, trackNumber: 2 },
      { id: 'bj-3', title: 'Pagan Poetry', durationMs: 314000, previewUrl: null, trackNumber: 3 }
    ],
    ...buildLinks('Bjork', 'Vespertine'),
    sonicTraits: { tempo: 'slow', atmospheric: 1.0, hypnotic: 0.95, era: '2000s' }
  },
  {
    id: 'curated-arthur-russell-world-of-echo',
    title: 'World of Echo',
    artist: 'Arthur Russell',
    releaseYear: 1986,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f0/12/34/f0123456-789a-bcde-f012-3456789abcde/5016025683226.jpg/1000x1000bb.jpg',
    genres: ['Avant-Garde Folk', 'Dub Cello', 'Ambient Pop'],
    driftReason: 'Amplified cello, Space Echo delay, and whispered Buddhist folk melodies dissolved in aquatic reverberation.',
    tracks: [
      { id: 'ar-1', title: 'Tone Bone Kone', durationMs: 147000, previewUrl: null, trackNumber: 1 },
      { id: 'ar-2', title: 'Soon-to-Be Innocent Fun', durationMs: 574000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Arthur Russell', 'World of Echo'),
    sonicTraits: { tempo: 'slow', atmospheric: 1.0, hypnotic: 0.95, era: '1980s' }
  },
  {
    id: 'curated-talk-talk-spirit-of-eden',
    title: 'Spirit of Eden',
    artist: 'Talk Talk',
    releaseYear: 1988,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/01/23/45/01234567-89ab-cdef-0123-456789abcdef/00602517038167.rgb.jpg/1000x1000bb.jpg',
    genres: ['Post-Rock', 'Art Rock', 'Ambient Jazz'],
    driftReason: 'Mark Hollis\'s quiet revolution: vast silences, church organ breathing, and improvisational spiritual ecstasy.',
    tracks: [
      { id: 'tt-1', title: 'The Rainbow', durationMs: 485000, previewUrl: null, trackNumber: 1 },
      { id: 'tt-2', title: 'Eden', durationMs: 457000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Talk Talk', 'Spirit of Eden'),
    sonicTraits: { tempo: 'slow', atmospheric: 1.0, experimental: 0.9, era: '1980s' }
  },
  {
    id: 'curated-alcest-edl',
    title: 'Écailles de lune',
    artist: 'Alcest',
    releaseYear: 2010,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e5/2c/31/e52c3175-685b-e48d-6c16-95a7ec4e8f7c/796441804724.jpg/1000x1000bb.jpg',
    genres: ['Blackgaze', 'Post-Metal', 'Shoegaze'],
    driftReason: 'Surging oceanic tremolo guitars and ferocious blastbeats dissolving into fragile, starry acoustic reveries.',
    tracks: [
      { id: 'al-1', title: 'Écailles de lune - Part 1', durationMs: 592000, previewUrl: null, trackNumber: 1 },
      { id: 'al-2', title: 'Écailles de lune - Part 2', durationMs: 598000, previewUrl: null, trackNumber: 2 }
    ],
    ...buildLinks('Alcest', 'Ecailles de lune'),
    sonicTraits: { tempo: 'up-tempo', energy: 0.9, distortion: 0.9, atmospheric: 0.95, era: '2010s' }
  }
];
