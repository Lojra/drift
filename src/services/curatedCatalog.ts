import { Album } from '../types/music';

export const CURATED_ALBUMS: Album[] = [
  // 1. Krautrock / Motorik
  {
    id: 'curated-neu-72',
    title: 'Neu!',
    artist: 'Neu!',
    releaseYear: 1972,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/72/31/44/72314446-ff57-09b0-bb05-0ca0c9b487df/634457040847.jpg/1000x1000bb.jpg',
    label: 'Brain / Grönland Records',
    country: 'DE',
    genres: ['Krautrock', 'Motorik', 'Experimental Rock'],
    driftReason: 'Pioneering motorik heartbeat that laid the foundation for post-punk pacing and modern techno.',
    tracks: [
      { id: 'neu-1', title: 'Hallogallo', durationMs: 607000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/91/33/21/913321db-829b-ee3c-743a-7db0df14c810/mzaf_6452296061616641775.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'neu-2', title: 'Sonderangebot', durationMs: 291000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5a/23/26/5a2326b4-2da8-e8cb-d183-b78f44ff531e/mzaf_10925766213190825310.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'neu-3', title: 'Weissensee', durationMs: 406000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ce/68/76/ce6876c4-fb80-0447-0e06-53860bb4a6bf/mzaf_10672166649725838045.plus.aac.p.m4a', trackNumber: 3 },
      { id: 'neu-4', title: 'Im Glück', durationMs: 391000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/78/3a/cb783a31-64e0-3168-b7d6-3e05a8f7d983/mzaf_15758253733221980860.plus.aac.p.m4a', trackNumber: 4 },
      { id: 'neu-5', title: 'Negativland', durationMs: 587000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/0f/59/82/0f598288-6c84-17c3-3896-189dbba397ba/mzaf_18210332822479636294.plus.aac.p.m4a', trackNumber: 5 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Neu!%20Neu!',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Neu!+Neu!+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Neu!+Neu!',
    sonicTraits: { tempo: 'mid-tempo', energy: 0.7, hypnotic: 0.95, percussive: 0.8, era: '1970s' }
  },

  // 2. Can - Tago Mago (Krautrock / Funk / Avant-garde)
  {
    id: 'curated-can-tago-mago',
    title: 'Tago Mago',
    artist: 'Can',
    releaseYear: 1971,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4a/01/2d/4a012d21-f3b1-6a2c-6112-70b135bb0ca1/5016025683226.jpg/1000x1000bb.jpg',
    label: 'United Artists / Spoon',
    country: 'DE',
    genres: ['Krautrock', 'Psychedelic Rock', 'Experimental'],
    driftReason: 'Jaki Liebezeit\'s metronomic funk drumming wrapped in tape-loop mysticism and hypnotic tension.',
    tracks: [
      { id: 'can-1', title: 'Paperhouse', durationMs: 448000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/28/7f/73/287f73a5-1772-9706-e78d-aeb2c5952f44/mzaf_713606994781702812.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'can-2', title: 'Mushroom', durationMs: 243000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/05/1e/8a/051e8ad4-b4cf-c546-857e-66170d103328/mzaf_4725333552093850785.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'can-3', title: 'Oh Yeah', durationMs: 443000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/21/53/b7/2153b7db-075f-2287-ba50-bbd9315eb009/mzaf_10330069359397669837.plus.aac.p.m4a', trackNumber: 3 },
      { id: 'can-4', title: 'Halleluwah', durationMs: 1112000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/28/51/cb2851cf-41cb-63df-0e06-96a603b5f7e6/mzaf_5819777978250266014.plus.aac.p.m4a', trackNumber: 4 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Can%20Tago%20Mago',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Can+Tago+Mago+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Can+Tago+Mago',
    sonicTraits: { tempo: 'mid-tempo', energy: 0.8, hypnotic: 0.9, percussive: 0.9, era: '1970s' }
  },

  // 3. King Tubby - Meets Rockers Uptown (Dub / Reggae)
  {
    id: 'curated-king-tubby-rockers',
    title: 'King Tubbys Meets Rockers Uptown',
    artist: 'Augustus Pablo & King Tubby',
    releaseYear: 1976,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/19/2d/e9/192de9cf-5f4a-fa0d-85f0-b98a339c9402/054645100363.jpg/1000x1000bb.jpg',
    label: 'Clocktower Records',
    country: 'JM',
    genres: ['Dub', 'Reggae', 'Roots Dub'],
    driftReason: 'Cavernous spring reverb chambers and heavyweight baseline architecture stripping reggae down to pure atmosphere.',
    tracks: [
      { id: 'tubby-1', title: 'Keep on Hollow Ground', durationMs: 153000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/16/be/e0/16bee05a-50d4-d53c-a96c-a81d4e76cb86/mzaf_12687126131464309395.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'tubby-2', title: 'King Tubby Meets Rockers Uptown', durationMs: 151000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e5/a0/01/e5a0018a-f5bb-3c35-ae23-d67b2d56c07a/mzaf_17730997232230713917.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'tubby-3', title: 'Corner Crew Dub', durationMs: 167000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/21/df/f2/21dff2c4-cf2a-9e12-32b0-8e11a37c9869/mzaf_16374026884617196024.plus.aac.p.m4a', trackNumber: 3 },
      { id: 'tubby-4', title: 'Skaking Dub', durationMs: 147000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/91/9f/62/919f6264-e402-4b2a-fcb2-7bb7974e4db5/mzaf_8422791480138902511.plus.aac.p.m4a', trackNumber: 4 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/King%20Tubby%20Meets%20Rockers%20Uptown',
    youtubeUrl: 'https://www.youtube.com/results?search_query=King+Tubby+Meets+Rockers+Uptown+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=King+Tubby+Meets+Rockers+Uptown',
    sonicTraits: { tempo: 'slow', energy: 0.6, hypnotic: 0.9, percussive: 0.85, atmospheric: 0.85, era: '1970s' }
  },

  // 4. Joy Division - Unknown Pleasures (Post-Punk)
  {
    id: 'curated-joy-division-up',
    title: 'Unknown Pleasures',
    artist: 'Joy Division',
    releaseYear: 1979,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/80/7e/c5/807ec5f2-959c-dc27-2c5e-85bb244795b8/0825646183907.jpg/1000x1000bb.jpg',
    label: 'Factory Records',
    country: 'GB',
    genres: ['Post-Punk', 'Gothic Rock', 'Art Punk'],
    driftReason: 'Martin Hannett\'s production treated drums like architectural echo chambers, forging cold angular intensity.',
    tracks: [
      { id: 'jd-1', title: 'Disorder', durationMs: 212000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5a/a5/cb/5aa5cb56-3aa9-5dbf-9b2f-981f42289f89/mzaf_13508127393444452187.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'jd-2', title: 'Day of the Lords', durationMs: 289000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/05/cf/4b/05cf4b5f-55ae-b6e9-b5f7-d2c69d4ad1df/mzaf_6705574340578665809.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'jd-3', title: 'Candidate', durationMs: 185000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/84/36/45/843645b2-29ee-93e1-5e5d-c692ff839d42/mzaf_10484501257134375051.plus.aac.p.m4a', trackNumber: 3 },
      { id: 'jd-4', title: 'Insight', durationMs: 269000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/5a/80/54/5a805494-0cfb-1eb3-b265-dbd896172605/mzaf_11306161427011400844.plus.aac.p.m4a', trackNumber: 4 },
      { id: 'jd-5', title: 'New Dawn Fades', durationMs: 287000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bb/63/05/bb6305a4-9bdf-db33-3174-fe45691d09df/mzaf_14073359628037340078.plus.aac.p.m4a', trackNumber: 5 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Joy%20Division%20Unknown%20Pleasures',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Joy+Division+Unknown+Pleasures+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Joy+Division+Unknown+Pleasures',
    sonicTraits: { tempo: 'mid-tempo', energy: 0.8, distortion: 0.7, atmospheric: 0.8, melancholic: 0.9, era: '1970s' }
  },

  // 5. Brian Eno - Ambient 1: Music for Airports (Ambient)
  {
    id: 'curated-eno-airports',
    title: 'Ambient 1: Music for Airports',
    artist: 'Brian Eno',
    releaseYear: 1978,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8d/ae/16/8dae16ee-c39c-c9d3-579c-0d3ee772183c/00724357833454.rgb.jpg/1000x1000bb.jpg',
    label: 'Polydor / EG',
    country: 'GB',
    genres: ['Ambient', 'Minimalism', 'Tape Loops'],
    driftReason: 'Pioneered ambient spatial design using out-of-phase tape loops of acoustic piano and vocal harmonics.',
    tracks: [
      { id: 'eno-1', title: '1/1', durationMs: 1018000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/80/7e/c3/807ec354-159d-472d-ba32-e0ba22818625/mzaf_17730997232230713917.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'eno-2', title: '2/1', durationMs: 500000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4b/32/79/4b3279c5-8591-ba4a-0a75-236bcaee6e61/mzaf_14073359628037340078.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'eno-3', title: '1/2', durationMs: 730000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5a/a5/cb/5aa5cb56-3aa9-5dbf-9b2f-981f42289f89/mzaf_13508127393444452187.plus.aac.p.m4a', trackNumber: 3 },
      { id: 'eno-4', title: '2/2', durationMs: 360000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/05/cf/4b/05cf4b5f-55ae-b6e9-b5f7-d2c69d4ad1df/mzaf_6705574340578665809.plus.aac.p.m4a', trackNumber: 4 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Brian%20Eno%20Music%20for%20Airports',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Brian+Eno+Ambient+1+Music+for+Airports+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Brian+Eno+Ambient+1+Music+for+Airports',
    sonicTraits: { tempo: 'slow', energy: 0.1, atmospheric: 1.0, hypnotic: 0.9, melancholic: 0.7, era: '1970s' }
  },

  // 6. Hiroshi Yoshimura - Green (Japanese Environmental Ambient)
  {
    id: 'curated-yoshimura-green',
    title: 'Green',
    artist: 'Hiroshi Yoshimura',
    releaseYear: 1986,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f5/88/5d/f5885d56-74ea-626a-939e-e3e9d8856237/cover.jpg/1000x1000bb.jpg',
    label: 'AIR Records / Light In The Attic',
    country: 'JP',
    genres: ['Japanese Ambient', 'Kankyō Ongaku', 'Minimalism'],
    driftReason: 'Crystalline Yamaha DX7 FM synthesis sculpted into pristine spatial environmental calm.',
    tracks: [
      { id: 'green-1', title: 'CREEK', durationMs: 350000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/b8/b2/97/b8b297b8-1cf4-28a1-d5d2-0fb33767f407/mzaf_713606994781702812.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'green-2', title: 'FEEL', durationMs: 289000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/71/6a/03/716a033f-f9ee-cba2-0ef3-5ce252a11bdf/mzaf_4725333552093850785.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'green-3', title: 'SHEEP', durationMs: 326000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4a/01/2d/4a012d21-f3b1-6a2c-6112-70b135bb0ca1/mzaf_10330069359397669837.plus.aac.p.m4a', trackNumber: 3 },
      { id: 'green-4', title: 'SLEEPING BAG', durationMs: 377000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/78/3a/cb783a31-64e0-3168-b7d6-3e05a8f7d983/mzaf_5819777978250266014.plus.aac.p.m4a', trackNumber: 4 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Hiroshi%20Yoshimura%20Green',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Hiroshi+Yoshimura+Green+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Hiroshi+Yoshimura+Green',
    sonicTraits: { tempo: 'slow', energy: 0.2, atmospheric: 0.95, hypnotic: 0.8, era: '1980s' }
  },

  // 7. Portishead - Dummy (Trip-Hop)
  {
    id: 'curated-portishead-dummy',
    title: 'Dummy',
    artist: 'Portishead',
    releaseYear: 1994,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/91/96/6d/91966d9c-df7c-f1d1-c247-f6424e832d20/00731452331326.rgb.jpg/1000x1000bb.jpg',
    label: 'Go! Beat Records',
    country: 'GB',
    genres: ['Trip-Hop', 'Downtempo', 'Nocturnal Jazz'],
    driftReason: 'Transferred 1960s espionage soundtracks and vinyl crackle onto heavy hip-hop breakbeats and soaring theremins.',
    tracks: [
      { id: 'dummy-1', title: 'Mysterons', durationMs: 302000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/64/0e/e6/640ee693-02f5-b208-d3ea-b5658e370a59/mzaf_10925766213190825310.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'dummy-2', title: 'Sour Times', durationMs: 254000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5a/23/26/5a2326b4-2da8-e8cb-d183-b78f44ff531e/mzaf_6452296061616641775.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'dummy-3', title: 'Strangers', durationMs: 235000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ce/68/76/ce6876c4-fb80-0447-0e06-53860bb4a6bf/mzaf_10672166649725838045.plus.aac.p.m4a', trackNumber: 3 },
      { id: 'dummy-4', title: 'It Could Be Sweet', durationMs: 256000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/0f/59/82/0f598288-6c84-17c3-3896-189dbba397ba/mzaf_18210332822479636294.plus.aac.p.m4a', trackNumber: 4 },
      { id: 'dummy-5', title: 'Glory Box', durationMs: 308000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/19/2d/e9/192de9cf-5f4a-fa0d-85f0-b98a339c9402/mzaf_12687126131464309395.plus.aac.p.m4a', trackNumber: 5 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Portishead%20Dummy',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Portishead+Dummy+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Portishead+Dummy',
    sonicTraits: { tempo: 'slow', energy: 0.5, atmospheric: 0.9, percussive: 0.7, melancholic: 0.95, era: '1990s' }
  },

  // 8. Fela Kuti - Zombie (Afrobeat)
  {
    id: 'curated-fela-zombie',
    title: 'Zombie',
    artist: 'Fela Kuti & Africa 70',
    releaseYear: 1976,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4b/f9/57/4bf95746-fc72-9721-a477-8c4d29388151/00731454702827.rgb.jpg/1000x1000bb.jpg',
    label: 'Coconut Records / Barclay',
    country: 'NG',
    genres: ['Afrobeat', 'Funk', 'Polyrhythmic Jazz'],
    driftReason: 'Relentless 12-minute polyrhythmic horn crescendos propelled by Tony Allen\'s peerless four-limb syncopation.',
    tracks: [
      { id: 'fela-1', title: 'Zombie', durationMs: 745000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/16/be/e0/16bee05a-50d4-d53c-a96c-a81d4e76cb86/mzaf_12687126131464309395.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'fela-2', title: 'Monkey Banana', durationMs: 700000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e5/a0/01/e5a0018a-f5bb-3c35-ae23-d67b2d56c07a/mzaf_17730997232230713917.plus.aac.p.m4a', trackNumber: 2 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Fela%20Kuti%20Zombie',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Fela+Kuti+Zombie+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Fela+Kuti+Zombie',
    sonicTraits: { tempo: 'up-tempo', energy: 0.95, percussive: 1.0, hypnotic: 0.85, era: '1970s' }
  },

  // 9. My Bloody Valentine - Loveless (Shoegaze)
  {
    id: 'curated-mbv-loveless',
    title: 'Loveless',
    artist: 'My Bloody Valentine',
    releaseYear: 1991,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/91/98/95/91989506-c852-c2e3-2b36-ef31c4fba8c1/887830015967.rgb.jpg/1000x1000bb.jpg',
    label: 'Creation Records / Domino',
    country: 'IE',
    genres: ['Shoegaze', 'Dream Pop', 'Noise Pop'],
    driftReason: 'Kevin Shields bent Jazzmaster tremolo arms into an unrepeatable, swirling vortex of sonic decay.',
    tracks: [
      { id: 'mbv-1', title: 'Only Shallow', durationMs: 257000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4b/32/79/4b3279c5-8591-ba4a-0a75-236bcaee6e61/mzaf_14073359628037340078.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'mbv-2', title: 'To Here Knows When', durationMs: 331000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5a/a5/cb/5aa5cb56-3aa9-5dbf-9b2f-981f42289f89/mzaf_13508127393444452187.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'mbv-3', title: 'When You Sleep', durationMs: 251000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/05/cf/4b/05cf4b5f-55ae-b6e9-b5f7-d2c69d4ad1df/mzaf_6705574340578665809.plus.aac.p.m4a', trackNumber: 3 },
      { id: 'mbv-4', title: 'Soon', durationMs: 598000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/80/7e/c3/807ec354-159d-472d-ba32-e0ba22818625/mzaf_17730997232230713917.plus.aac.p.m4a', trackNumber: 4 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/My%20Bloody%20Valentine%20Loveless',
    youtubeUrl: 'https://www.youtube.com/results?search_query=My+Bloody+Valentine+Loveless+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=My+Bloody+Valentine+Loveless',
    sonicTraits: { tempo: 'mid-tempo', energy: 0.8, distortion: 0.95, atmospheric: 0.9, era: '1990s' }
  },

  // 10. Mulatu Astatke - Éthiopiques, Vol. 4 (Ethio-Jazz)
  {
    id: 'curated-mulatu-ethio-jazz',
    title: 'Éthiopiques, Vol. 4: Ethio Jazz & Musique Instrumentale',
    artist: 'Mulatu Astatke',
    releaseYear: 1998,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/74/d3/18/74d318e8-6923-d6d7-83eb-275d2753bc63/3307517980424.jpg/1000x1000bb.jpg',
    label: 'Buda Musique',
    country: 'ET',
    genres: ['Ethio-Jazz', 'Modal Jazz', 'Afro-Latin Jazz'],
    driftReason: 'Haunting 1970s Addis Ababa modal scales intertwined with swinging Latin vibraphones and smoky organs.',
    tracks: [
      { id: 'mulatu-1', title: 'Yèkèrmo Sèw', durationMs: 254000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/05/1e/8a/051e8ad4-b4cf-c546-857e-66170d103328/mzaf_4725333552093850785.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'mulatu-2', title: 'Mètché Dershé', durationMs: 236000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/21/53/b7/2153b7db-075f-2287-ba50-bbd9315eb009/mzaf_10330069359397669837.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'mulatu-3', title: 'Kàsèkèz Muleqèt', durationMs: 247000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/28/7f/73/287f73a5-1772-9706-e78d-aeb2c5952f44/mzaf_713606994781702812.plus.aac.p.m4a', trackNumber: 3 },
      { id: 'mulatu-4', title: 'Tezeta', durationMs: 375000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/28/51/cb2851cf-41cb-63df-0e06-96a603b5f7e6/mzaf_5819777978250266014.plus.aac.p.m4a', trackNumber: 4 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Mulatu%20Astatke%20Ethiopiques%204',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Mulatu+Astatke+Ethiopiques+4+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Mulatu+Astatke+Ethiopiques+4',
    sonicTraits: { tempo: 'slow', energy: 0.6, atmospheric: 0.85, percussive: 0.8, hypnotic: 0.9, era: '1970s' }
  },

  // 11. Boards of Canada - Music Has the Right to Children (IDM / Downtempo)
  {
    id: 'curated-boc-mhtrtc',
    title: 'Music Has the Right to Children',
    artist: 'Boards of Canada',
    releaseYear: 1998,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/2b/96/63/2b966395-81a1-9bb4-b778-b5e0ee9c4708/0801061007038.png/1000x1000bb.jpg',
    label: 'Warp Records / Skam',
    country: 'GB',
    genres: ['IDM', 'Downtempo', 'Hauntology'],
    driftReason: 'Analog synth degradation, tape wow-and-flutter, and childhood nostalgia mapped to crisp hip-hop drums.',
    tracks: [
      { id: 'boc-1', title: 'Wildlife Analysis', durationMs: 77000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/b8/b2/97/b8b297b8-1cf4-28a1-d5d2-0fb33767f407/mzaf_713606994781702812.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'boc-2', title: 'An Eagle in Your Mind', durationMs: 383000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/71/6a/03/716a033f-f9ee-cba2-0ef3-5ce252a11bdf/mzaf_4725333552093850785.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'boc-3', title: 'Telephasic Workshop', durationMs: 395000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4a/01/2d/4a012d21-f3b1-6a2c-6112-70b135bb0ca1/mzaf_10330069359397669837.plus.aac.p.m4a', trackNumber: 3 },
      { id: 'boc-4', title: 'Roygbiv', durationMs: 151000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/78/3a/cb783a31-64e0-3168-b7d6-3e05a8f7d983/mzaf_5819777978250266014.plus.aac.p.m4a', trackNumber: 4 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Boards%20of%20Canada%20Music%20Has%20the%20Right%20to%20Children',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Boards+of+Canada+Music+Has+the+Right+to+Children+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Boards+of+Canada+Music+Has+the+Right+to+Children',
    sonicTraits: { tempo: 'mid-tempo', energy: 0.6, atmospheric: 0.95, hypnotic: 0.85, era: '1990s' }
  },

  // 12. Stan Getz & João Gilberto - Getz/Gilberto (Bossa Nova / Cool Jazz)
  {
    id: 'curated-getz-gilberto',
    title: 'Getz/Gilberto',
    artist: 'Stan Getz & João Gilberto',
    releaseYear: 1964,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5a/2f/18/5a2f183c-f4b6-48aa-b772-520a320392f5/00602537877209.rgb.jpg/1000x1000bb.jpg',
    label: 'Verve Records',
    country: 'US',
    genres: ['Bossa Nova', 'Cool Jazz', 'Latin Jazz'],
    driftReason: 'Whispered vocal delivery and syncopated acoustic guitar cushioned by Stan Getz\'s breathy tenor saxophone.',
    tracks: [
      { id: 'gg-1', title: 'The Girl From Ipanema', durationMs: 324000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bb/63/05/bb6305a4-9bdf-db33-3174-fe45691d09df/mzaf_14073359628037340078.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'gg-2', title: 'Doralice', durationMs: 165000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/5a/80/54/5a805494-0cfb-1eb3-b265-dbd896172605/mzaf_11306161427011400844.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'gg-3', title: 'Para Machucar Meu Coração', durationMs: 305000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/84/36/45/843645b2-29ee-93e1-5e5d-c692ff839d42/mzaf_10484501257134375051.plus.aac.p.m4a', trackNumber: 3 },
      { id: 'gg-4', title: 'Desafinado', durationMs: 253000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/05/cf/4b/05cf4b5f-55ae-b6e9-b5f7-d2c69d4ad1df/mzaf_6705574340578665809.plus.aac.p.m4a', trackNumber: 4 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Stan%20Getz%20Joao%20Gilberto',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Stan+Getz+Joao+Gilberto+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Stan+Getz+Joao+Gilberto',
    sonicTraits: { tempo: 'slow', energy: 0.4, atmospheric: 0.8, melancholic: 0.6, era: '1960s' }
  },

  // 13. Stars of the Lid - The Tired Sounds of Stars of the Lid (Ambient Drone)
  {
    id: 'curated-sotl-tired',
    title: 'The Tired Sounds of Stars of the Lid',
    artist: 'Stars of the Lid',
    releaseYear: 2001,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e5/2c/31/e52c3175-685b-e48d-6c16-95a7ec4e8f7c/796441804724.jpg/1000x1000bb.jpg',
    label: 'Kranky',
    country: 'US',
    genres: ['Ambient Drone', 'Modern Classical', 'Minimalism'],
    driftReason: 'Orchestral strings and treated electric guitars dissolved into oceanic, slow-motion harmonic weightlessness.',
    tracks: [
      { id: 'sotl-1', title: 'Requiem for Dying Mothers, Pt. 1', durationMs: 277000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5a/23/26/5a2326b4-2da8-e8cb-d183-b78f44ff531e/mzaf_10925766213190825310.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'sotl-2', title: 'Requiem for Dying Mothers, Pt. 2', durationMs: 457000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ce/68/76/ce6876c4-fb80-0447-0e06-53860bb4a6bf/mzaf_10672166649725838045.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'sotl-3', title: 'Down 3', durationMs: 334000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/78/3a/cb783a31-64e0-3168-b7d6-3e05a8f7d983/mzaf_15758253733221980860.plus.aac.p.m4a', trackNumber: 3 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Stars%20of%20the%20Lid%20The%20Tired%20Sounds',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Stars+of+the+Lid+The+Tired+Sounds+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Stars+of+the+Lid+The+Tired+Sounds',
    sonicTraits: { tempo: 'slow', energy: 0.1, atmospheric: 1.0, hypnotic: 0.95, melancholic: 0.9, era: '2000s' }
  },

  // 14. Tinariwen - Amassakoul (Desert Blues)
  {
    id: 'curated-tinariwen-amassakoul',
    title: 'Amassakoul',
    artist: 'Tinariwen',
    releaseYear: 2004,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/6b/a5/aa/6ba5aa68-dc80-aa16-24bb-fa6fce7c0934/8714092040428.jpg/1000x1000bb.jpg',
    label: 'Triban Union / World Village',
    country: 'ML',
    genres: ['Desert Blues', 'Tuareg Guitar', 'Tishoumaren'],
    driftReason: 'Sahara desert guitar loops, hypnotic call-and-response chants and cyclical handclaps born of nomad exile.',
    tracks: [
      { id: 'tin-1', title: 'Amassakoul \'N\' Ténéré', durationMs: 202000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/91/33/21/913321db-829b-ee3c-743a-7db0df14c810/mzaf_6452296061616641775.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'tin-2', title: 'Oualahila Ar Tesninam', durationMs: 270000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/0f/59/82/0f598288-6c84-17c3-3896-189dbba397ba/mzaf_18210332822479636294.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'tin-3', title: 'Chatma', durationMs: 338000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/28/7f/73/287f73a5-1772-9706-e78d-aeb2c5952f44/mzaf_713606994781702812.plus.aac.p.m4a', trackNumber: 3 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Tinariwen%20Amassakoul',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Tinariwen+Amassakoul+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Tinariwen+Amassakoul',
    sonicTraits: { tempo: 'mid-tempo', energy: 0.7, hypnotic: 0.9, percussive: 0.8, era: '2000s' }
  },

  // 15. Talk Talk - Laughing Stock (Post-Rock / Art Rock)
  {
    id: 'curated-talk-talk-ls',
    title: 'Laughing Stock',
    artist: 'Talk Talk',
    releaseYear: 1991,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e5/2c/31/e52c3175-685b-e48d-6c16-95a7ec4e8f7c/796441804724.jpg/1000x1000bb.jpg',
    label: 'Verve Records / Polydor',
    country: 'GB',
    genres: ['Post-Rock', 'Art Rock', 'Ambient Jazz'],
    driftReason: 'Recorded in near total darkness: acoustic room silence punctuated by searing feedback and sparse organ drops.',
    tracks: [
      { id: 'tt-1', title: 'Myrrhman', durationMs: 337000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4b/32/79/4b3279c5-8591-ba4a-0a75-236bcaee6e61/mzaf_14073359628037340078.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'tt-2', title: 'Ascension Day', durationMs: 360000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5a/a5/cb/5aa5cb56-3aa9-5dbf-9b2f-981f42289f89/mzaf_13508127393444452187.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'tt-3', title: 'After the Flood', durationMs: 579000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/05/cf/4b/05cf4b5f-55ae-b6e9-b5f7-d2c69d4ad1df/mzaf_6705574340578665809.plus.aac.p.m4a', trackNumber: 3 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Talk%20Talk%20Laughing%20Stock',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Talk+Talk+Laughing+Stock+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Talk+Talk+Laughing+Stock',
    sonicTraits: { tempo: 'slow', energy: 0.5, atmospheric: 0.95, distortion: 0.4, melancholic: 0.9, era: '1990s' }
  },

  // 16. Portishead - Dummy (Trip-Hop / Nocturnal)
  {
    id: 'curated-portishead-dummy',
    title: 'Dummy',
    artist: 'Portishead',
    releaseYear: 1994,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/71/6a/03/716a033f-f9ee-cba2-0ef3-5ce252a11bdf/00042282855329.rgb.jpg/1000x1000bb.jpg',
    label: 'Go! Beat Records',
    country: 'GB',
    genres: ['Trip-Hop', 'Dark Jazz', 'Bristol Sound'],
    driftReason: 'Haunting spy-soundtrack samples, vinyl scratching, and Beth Gibbons\' raw emotional delivery drenched in tape delay.',
    tracks: [
      { id: 'ph-1', title: 'Mysterons', durationMs: 302000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/b8/b2/97/b8b297b8-1cf4-28a1-d5d2-0fb33767f407/mzaf_713606994781702812.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'ph-2', title: 'Sour Times', durationMs: 251000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/71/6a/03/716a033f-f9ee-cba2-0ef3-5ce252a11bdf/mzaf_4725333552093850785.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'ph-3', title: 'Roads', durationMs: 304000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4a/01/2d/4a012d21-f3b1-6a2c-6112-70b135bb0ca1/mzaf_10330069359397669837.plus.aac.p.m4a', trackNumber: 3 },
      { id: 'ph-4', title: 'Glory Box', durationMs: 308000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/78/3a/cb783a31-64e0-3168-b7d6-3e05a8f7d983/mzaf_5819777978250266014.plus.aac.p.m4a', trackNumber: 4 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Portishead%20Dummy',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Portishead+Dummy+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Portishead+Dummy',
    sonicTraits: { tempo: 'slow', energy: 0.6, atmospheric: 0.95, melancholic: 0.95, era: '1990s' }
  },

  // 17. Cocteau Twins - Heaven or Las Vegas (Dream Pop / Ethereal)
  {
    id: 'curated-cocteau-twins-holv',
    title: 'Heaven or Las Vegas',
    artist: 'Cocteau Twins',
    releaseYear: 1990,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f4/bf/cb/f4bfcb09-3221-d119-e58f-bdfa67b20468/652637270960.jpg/1000x1000bb.jpg',
    label: '4AD',
    country: 'GB',
    genres: ['Dream Pop', 'Ethereal Wave', 'Shoegaze'],
    driftReason: 'Elizabeth Fraser\'s glossolalic soaring vocals intertwined with Robin Guthrie\'s chorused, shimmering guitar waterfalls.',
    tracks: [
      { id: 'ct-1', title: 'Cherry-Coloured Funk', durationMs: 192000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/bb/63/05/bb6305a4-9bdf-db33-3174-fe45691d09df/mzaf_14073359628037340078.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'ct-2', title: 'Fifty-Fifty Clown', durationMs: 190000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/5a/80/54/5a805494-0cfb-1eb3-b265-dbd896172605/mzaf_11306161427011400844.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'ct-3', title: 'Heaven or Las Vegas', durationMs: 298000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/84/36/45/843645b2-29ee-93e1-5e5d-c692ff839d42/mzaf_10484501257134375051.plus.aac.p.m4a', trackNumber: 3 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Cocteau%20Twins%20Heaven%20or%20Las%20Vegas',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Cocteau+Twins+Heaven+or+Las+Vegas+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Cocteau+Twins+Heaven+or+Las+Vegas',
    sonicTraits: { tempo: 'mid-tempo', energy: 0.7, atmospheric: 1.0, hypnotic: 0.85, era: '1990s' }
  },

  // 18. Taeko Onuki - Sunshower (City Pop / Warm Funk)
  {
    id: 'curated-onuki-sunshower',
    title: 'Sunshower',
    artist: 'Taeko Onuki',
    releaseYear: 1977,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b8/b2/97/b8b297b8-1cf4-28a1-d5d2-0fb33767f407/4988007261944.jpg/1000x1000bb.jpg',
    label: 'Panam / Crown',
    country: 'JP',
    genres: ['City Pop', 'Jazz-Funk', 'Bossa Nova'],
    driftReason: 'Ryuichi Sakamoto\'s arrangements paired with breezy Fender Rhodes, tight syncopated brass and Tokyo sunset warmth.',
    tracks: [
      { id: 'to-1', title: 'Summer Connection', durationMs: 270000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/91/33/21/913321db-829b-ee3c-743a-7db0df14c810/mzaf_6452296061616641775.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'to-2', title: 'Kusuri o Takusan', durationMs: 247000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/0f/59/82/0f598288-6c84-17c3-3896-189dbba397ba/mzaf_18210332822479636294.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'to-3', title: 'Tokai', durationMs: 312000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/28/7f/73/287f73a5-1772-9706-e78d-aeb2c5952f44/mzaf_713606994781702812.plus.aac.p.m4a', trackNumber: 3 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Taeko%20Onuki%20Sunshower',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Taeko+Onuki+Sunshower+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Taeko+Onuki+Sunshower',
    sonicTraits: { tempo: 'mid-tempo', energy: 0.75, percussive: 0.85, atmospheric: 0.7, era: '1970s' }
  },

  // 19. Alcest - Écailles de lune (Blackgaze / Cathartic)
  {
    id: 'curated-alcest-edl',
    title: 'Écailles de lune',
    artist: 'Alcest',
    releaseYear: 2010,
    coverArtUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e5/2c/31/e52c3175-685b-e48d-6c16-95a7ec4e8f7c/796441804724.jpg/1000x1000bb.jpg',
    label: 'Prophecy Productions',
    country: 'FR',
    genres: ['Blackgaze', 'Post-Metal', 'Shoegaze'],
    driftReason: 'Surging oceanic tremolo guitars and ferocious blastbeats dissolving into fragile, starry acoustic reveries.',
    tracks: [
      { id: 'al-1', title: 'Écailles de lune - Part 1', durationMs: 592000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4b/32/79/4b3279c5-8591-ba4a-0a75-236bcaee6e61/mzaf_14073359628037340078.plus.aac.p.m4a', trackNumber: 1 },
      { id: 'al-2', title: 'Écailles de lune - Part 2', durationMs: 598000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5a/a5/cb/5aa5cb56-3aa9-5dbf-9b2f-981f42289f89/mzaf_13508127393444452187.plus.aac.p.m4a', trackNumber: 2 },
      { id: 'al-3', title: 'Percées de lumière', durationMs: 397000, previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/05/cf/4b/05cf4b5f-55ae-b6e9-b5f7-d2c69d4ad1df/mzaf_6705574340578665809.plus.aac.p.m4a', trackNumber: 3 }
    ],
    spotifyUrl: 'https://open.spotify.com/search/Alcest%20Ecailles%20de%20lune',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Alcest+Ecailles+de+lune+full+album',
    youtubeMusicUrl: 'https://music.youtube.com/search?q=Alcest+Ecailles+de+lune',
    sonicTraits: { tempo: 'up-tempo', energy: 0.9, distortion: 0.9, atmospheric: 0.95, era: '2010s' }
  }
];
