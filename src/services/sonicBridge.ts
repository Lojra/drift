import { SonicStartingPoint } from '../types/music';

export const SONIC_STARTING_POINTS: SonicStartingPoint[] = [
  {
    id: 'hypnotic',
    title: 'Hypnotic & Repetitive',
    subtitle: 'Motorik pulses, dub echoes, locked grooves & cyclical trance states',
    genres: ['Krautrock', 'Dub', 'Minimal Techno', 'Afrobeat'],
    traits: { hypnotic: 0.9, percussive: 0.7, atmospheric: 0.6 }
  },
  {
    id: 'distorted',
    title: 'Raw & Distorted',
    subtitle: 'Overdriven amplifiers, angular bass, abrasive textures & urgent grit',
    genres: ['Post-Punk', 'Noise Rock', 'Industrial', 'Shoegaze'],
    traits: { distortion: 0.9, experimental: 0.7, percussive: 0.6 }
  },
  {
    id: 'warm',
    title: 'Warm & Analog',
    subtitle: 'Nylon strings, tape saturation, vintage Rhodes & intimate acoustics',
    genres: ['Bossa Nova', 'Desert Blues', 'Spiritual Jazz', 'Tropicália'],
    traits: { atmospheric: 0.7, melancholic: 0.5, hypnotic: 0.5 }
  },
  {
    id: 'melancholic',
    title: 'Melancholic & Spacious',
    subtitle: 'Cavernous reverb, nocturnal pacing, fragile dynamics & quiet longing',
    genres: ['Ambient', 'Cool Jazz', 'Slowcore', 'Post-Rock'],
    traits: { atmospheric: 0.9, melancholic: 0.9, hypnotic: 0.6 }
  },
  {
    id: 'percussive',
    title: 'Rhythmic & Percussive',
    subtitle: 'Complex syncopation, interlocking polyrhythms, funk pockets & kinetic drive',
    genres: ['Afrobeat', 'Ethio-Jazz', 'Math Rock', 'Batucada'],
    traits: { percussive: 0.95, hypnotic: 0.7 }
  },
  {
    id: 'experimental',
    title: 'Experimental & Dense',
    subtitle: 'Micro-sound design, avant-garde harmonics, tape loops & radical textures',
    genres: ['Fourth World', 'IDM', 'Drone', 'Deconstructed Club'],
    traits: { experimental: 0.95, atmospheric: 0.8, distortion: 0.5 }
  },
  {
    id: 'nocturnal',
    title: 'Nocturnal & Cinematic',
    subtitle: 'Smoky Rhodes, muted brass, vinyl crackle, downtempo breaks & film noir tension',
    genres: ['Trip-Hop', 'Dark Jazz', 'Bristol Sound', 'Downtempo'],
    traits: { atmospheric: 0.85, melancholic: 0.8, percussive: 0.6 }
  },
  {
    id: 'ethereal',
    title: 'Celestial & Dreamlike',
    subtitle: 'Shimmering chorused guitars, vocal washes, floating analog synths & dreamlike haze',
    genres: ['Dream Pop', 'Ethereal Wave', 'Shoegaze', 'Ambient Pop'],
    traits: { atmospheric: 0.95, melancholic: 0.7, hypnotic: 0.6 }
  },
  {
    id: 'heavy',
    title: 'Heavy & Cathartic',
    subtitle: 'Tremolo walls of sound, crushing bass weight & soaring emotional intensity',
    genres: ['Blackgaze', 'Post-Metal', 'Doom', 'Atmospheric Sludge'],
    traits: { distortion: 0.95, experimental: 0.75, atmospheric: 0.7 }
  },
  {
    id: 'funky',
    title: 'Funky & Organic',
    subtitle: 'Syncopated clavinet, brass stabs, rare groove pockets & warm tape funk',
    genres: ['City Pop', 'Highlife', 'Rare Groove', 'Zamrock', 'Neo-Soul'],
    traits: { percussive: 0.9, hypnotic: 0.65, atmospheric: 0.5 }
  },
  {
    id: 'electronic',
    title: 'Electronic & Kinetic',
    subtitle: 'Glitch breakbeats, subterranean sub-bass, 909 warehouse drive & modular synthesis',
    genres: ['Jungle', 'Detroit Techno', 'Breakbeat', 'Microhouse'],
    traits: { percussive: 0.95, hypnotic: 0.85, experimental: 0.7 }
  },
  {
    id: 'meditative',
    title: 'Architectural & Meditative',
    subtitle: 'Acoustic clarity, delicate wooden mallets, quiet spaces & environmental tranquility',
    genres: ['Japanese Environmental Music', 'Modern Classical', 'Minimalism', 'ECM Jazz'],
    traits: { atmospheric: 0.95, melancholic: 0.6, hypnotic: 0.8 }
  }
];

export interface LateralBridge {
  targetGenre: string;
  relationDescription: string;
  reasonTemplate: (originGenre: string, originAlbum?: string) => string;
  sharedTraits: string[];
  searchKeywords: string[];
}

export const LATERAL_GENRE_BRIDGES: Record<string, LateralBridge[]> = {
  'Post-Punk': [
    {
      targetGenre: 'Dub Reggae',
      relationDescription: 'Shared spacious cavernous basslines and tape delay echo',
      reasonTemplate: (_g, album) => `Channels the dark, dub-heavy bass foundations ${album ? `of ${album}` : 'of post-punk'} into 1970s Kingston sound-system alchemy.`,
      sharedTraits: ['heavy bass', 'spatial echo', 'drum-and-bass prominence'],
      searchKeywords: ['Dub', 'King Tubby', 'Augustus Pablo', 'Scientists Dub']
    },
    {
      targetGenre: 'Krautrock',
      relationDescription: 'Motorik relentless 4/4 momentum and icy hypnotic rhythm',
      reasonTemplate: (_g, album) => `Takes the austere driving pulse ${album ? `from ${album}` : ''} and transposes it into German Kosmische motorik hypnosis.`,
      sharedTraits: ['motorik beat', 'hypnotic repetition', 'minimalist texture'],
      searchKeywords: ['Neu!', 'Can', 'Harmonia', 'Faust']
    },
    {
      targetGenre: 'Minimal Wave',
      relationDescription: 'Angular drum machines and austere synthesizer hooks',
      reasonTemplate: (_g) => `Preserves the stark nervous energy while pivoting to vintage analog synthesizers and primitive rhythm boxes.`,
      sharedTraits: ['analog synth', 'monochrome mood', 'staccato bass'],
      searchKeywords: ['Minimal Synth', 'Coldwave', 'Oppenheimer Analysis']
    }
  ],
  'Cool Jazz': [
    {
      targetGenre: 'Trip-Hop',
      relationDescription: 'Nocturnal cinematic melancholy, muted brass and downtempo breaks',
      reasonTemplate: (_g, album) => `Carries the smoky nocturnal horn voicings ${album ? `of ${album}` : ''} into 1990s Bristol tape-sampled downtempo.`,
      sharedTraits: ['smoky atmosphere', 'muted brass', 'nocturnal tempo'],
      searchKeywords: ['Portishead', 'Massive Attack', 'Tricky', 'DJ Shadow']
    },
    {
      targetGenre: 'Ambient Electronic',
      relationDescription: 'Spacious reverb, contemplative chords and quiet stillness',
      reasonTemplate: (_g) => `Extracts the quiet modal space and dissolves it into lush, tape-decayed electronic soundscapes.`,
      sharedTraits: ['spacious reverb', 'harmonic warmth', 'meditative pacing'],
      searchKeywords: ['Boards of Canada', 'Brian Eno', 'Stars of the Lid']
    },
    {
      targetGenre: 'Bossa Nova',
      relationDescription: 'Complex modal harmony, gentle whisper delivery and syncopated cadence',
      reasonTemplate: (_g) => `Translates the sophisticated harmonic changes into gentle nylon-string syncopation and ocean breeze melancholy.`,
      sharedTraits: ['modal voicings', 'delicate dynamic', 'warm acoustics'],
      searchKeywords: ['Stan Getz', 'Joao Gilberto', 'Antonio Carlos Jobim']
    }
  ],
  'Trip-Hop': [
    {
      targetGenre: 'Dark Jazz',
      relationDescription: 'Nocturnal slow-tempo Rhodes, saxophone vibrato, and rain-slicked atmosphere',
      reasonTemplate: (_g, album) => `Deepens the brooding cinematic atmosphere ${album ? `of ${album}` : ''} into acoustic slowcore jazz and ambient twilight.`,
      sharedTraits: ['smoky noir', 'slow tempo', 'sub-bass tension'],
      searchKeywords: ['Bohren & der Club of Gore', 'The Kilimanjaro Darkjazz Ensemble', 'Dale Cooper Quartet']
    },
    {
      targetGenre: 'Dub Reggae',
      relationDescription: 'Cavernous bass resonance and subterranean spring reverb',
      reasonTemplate: (_g) => `Connects Bristol sound-system sample culture directly to 1970s Kingston tape manipulation.`,
      sharedTraits: ['sub-bass', 'tape echo', 'space'],
      searchKeywords: ['King Tubby', 'Lee Scratch Perry', 'Scientists']
    },
    {
      targetGenre: 'Cool Jazz',
      relationDescription: 'Muted trumpet melancholy and intimate modal chords',
      reasonTemplate: (_g) => `Traces the sampled horn DNA back to late-night 1950s acoustic jazz clubs.`,
      sharedTraits: ['muted brass', 'modal harmony', 'nocturnal'],
      searchKeywords: ['Miles Davis', 'Chet Baker', 'Bill Evans']
    }
  ],
  'Dream Pop': [
    {
      targetGenre: 'Shoegaze',
      relationDescription: 'Tremolo-drenched guitar walls with ethereal melodic undercurrents',
      reasonTemplate: (_g, album) => `Amplifies the floating melodies ${album ? `of ${album}` : ''} through sweeping walls of chorus, delay, and fuzz.`,
      sharedTraits: ['reverb wash', 'submerged vocals', 'melodic beauty'],
      searchKeywords: ['Slowdive', 'Cocteau Twins', 'Lush', 'Galaxie 500']
    },
    {
      targetGenre: 'Japanese Environmental Music',
      relationDescription: 'Quiet spatial restraint and crystalline acoustic reflections',
      reasonTemplate: (_g) => `Distills the gossamer atmospheric textures into meditative 1980s Japanese minimalism.`,
      sharedTraits: ['spacious calm', 'delicate tone', 'stillness'],
      searchKeywords: ['Hiroshi Yoshimura', 'Midori Takada', 'Satoshi Ashikawa']
    },
    {
      targetGenre: 'City Pop',
      relationDescription: 'Lush shimmering analog arrangements and sophisticated Tokyo chord progressions',
      reasonTemplate: (_g) => `Translates the shimmering melodic euphoria into breezy 1980s Japanese studio funk.`,
      sharedTraits: ['shimmering production', 'melodic warmth', 'sophisticated harmony'],
      searchKeywords: ['Tatsuro Yamashita', 'Taeko Onuki', 'Miki Matsubara']
    }
  ],
  'City Pop': [
    {
      targetGenre: 'Bossa Nova',
      relationDescription: 'Nylon guitar counterpoint, gentle syncopation, and breezy jazz harmonies',
      reasonTemplate: (_g, album) => `Traces the elegant harmonic progressions ${album ? `from ${album}` : ''} back to Rio de Janeiro beachfront intimacy.`,
      sharedTraits: ['breezy harmony', 'nylon guitar', 'syncopated groove'],
      searchKeywords: ['Joao Gilberto', 'Astrud Gilberto', 'Antonio Carlos Jobim']
    },
    {
      targetGenre: 'Rare Groove',
      relationDescription: 'Crisp syncopated drums, slap bass, and vintage analog keyboards',
      reasonTemplate: (_g) => `Pivots toward underground 1970s crate-digger funk and soulful instrumental breaks.`,
      sharedTraits: ['tight groove', 'slap bass', 'analog keys'],
      searchKeywords: ['Roy Ayers', 'Bobbi Humphrey', 'Donald Byrd']
    },
    {
      targetGenre: 'Yacht Rock & West Coast AOR',
      relationDescription: 'Pristine studio mixing, lush vocal harmonies, and warm Fender Rhodes',
      reasonTemplate: (_g) => `Crosses the Pacific to late-70s California studio perfectionism and breezy sunset grooves.`,
      sharedTraits: ['pristine production', 'Fender Rhodes', 'smooth melody'],
      searchKeywords: ['Steely Dan', 'Michael Franks', 'Ned Doheny']
    }
  ],
  'Shoegaze': [
    {
      targetGenre: 'Ambient Drone',
      relationDescription: 'Endless sustained guitar wash and dissolving melodic textures',
      reasonTemplate: (_g, album) => `Distills the colossal wall of reverb ${album ? `heard on ${album}` : ''} into pure meditative modern classical drone.`,
      sharedTraits: ['infinite decay', 'submerged melody', 'wall of sound'],
      searchKeywords: ['Stars of the Lid', 'Tim Hecker', 'Fennesz', 'Grouper']
    },
    {
      targetGenre: 'Blackgaze',
      relationDescription: 'Tremolo-picked catharsis, ethereal chord progressions and soaring intensity',
      reasonTemplate: (_g) => `Elevates the soaring guitar textures into breathtaking tremolo cascades and cathartic dynamic peaks.`,
      sharedTraits: ['tremolo guitar', 'cathartic swell', 'emotional depth'],
      searchKeywords: ['Alcest', 'Deafheaven', 'Sadness', 'Holy Fawn']
    },
    {
      targetGenre: 'IDM',
      relationDescription: 'Ethereal washed chords overlaid onto intricate glitch micro-percussion',
      reasonTemplate: (_g) => `Bridges dreamlike harmonic haze with surgically fractured micro-beats and digital tape flutter.`,
      sharedTraits: ['dreamlike haze', 'intricate textures', 'submerged vocals'],
      searchKeywords: ['Sweet Trip', 'Tycho', 'Ulrich Schnauss', 'Arovane']
    }
  ],
  'Blackgaze': [
    {
      targetGenre: 'Post-Rock',
      relationDescription: 'Slow-burn dynamic build-ups, shimmering delays, and cinematic crescendos',
      reasonTemplate: (_g, album) => `Translates the expansive emotional weight ${album ? `from ${album}` : ''} into widescreen instrumental architecture.`,
      sharedTraits: ['crescendo', 'dynamic contrast', 'cinematic grandeur'],
      searchKeywords: ['Godspeed You! Black Emperor', 'Mogwai', 'Explosions in the Sky', 'Mono']
    },
    {
      targetGenre: 'Shoegaze',
      relationDescription: 'Overdriven reverb textures and buried fragile melodies',
      reasonTemplate: (_g) => `Pivots toward the delicate dream-pop foundations underneath the ferocious distortion.`,
      sharedTraits: ['reverb sheets', 'fragile melody', 'fuzz'],
      searchKeywords: ['Slowdive', 'My Bloody Valentine', 'Ride']
    },
    {
      targetGenre: 'Dark Ambient Drone',
      relationDescription: 'Subterranean resonance, tape saturation, and boundless spatial decay',
      reasonTemplate: (_g) => `Strips away the blast beats to reveal the cavernous, desolate drone foundation.`,
      sharedTraits: ['sub-bass drone', 'spatial isolation', 'textured feedback'],
      searchKeywords: ['Sunn O)))', 'Earth', 'Tim Hecker', 'Lustmord']
    }
  ],
  'Krautrock': [
    {
      targetGenre: 'Berlin School Ambient',
      relationDescription: 'Analog step-sequencers and cosmic spatial synthesizers',
      reasonTemplate: (_g) => `Shifts the motorik propulsion into sweeping modular synthesizer voyages and celestial analog sequences.`,
      sharedTraits: ['analog sequencer', 'cosmic soundstage', 'modular synthesis'],
      searchKeywords: ['Tangerine Dream', 'Klaus Schulze', 'Manuel Gottsching']
    },
    {
      targetGenre: 'Detroit Techno',
      relationDescription: 'Machine precision, perpetual hypnotic drive and soulful futuristic optimism',
      reasonTemplate: (_g) => `Reframes the hypnotic repetitive momentum as futuristic Detroit machine-soul and rolling 909 percussion.`,
      sharedTraits: ['hypnotic repetition', 'machine groove', 'futurism'],
      searchKeywords: ['Derrick May', 'Juan Atkins', 'Basic Channel', 'Model 500']
    },
    {
      targetGenre: 'Post-Rock',
      relationDescription: 'Gradual slow-burn dynamic crescendo and interlocking instrumental patterns',
      reasonTemplate: (_g, album) => `Evolves the trance-like endurance ${album ? `from ${album}` : ''} into widescreen instrumental architecture and polyrhythmic vibraphones.`,
      sharedTraits: ['gradual build', 'instrumental focus', 'mesmerizing groove'],
      searchKeywords: ['Stereolab', 'Tortoise', 'Neu!', 'Trans Am']
    }
  ],
  'Detroit Techno': [
    {
      targetGenre: 'Minimal Techno',
      relationDescription: 'Surgically stripped percussive loops, sub-aquatic dub chords, and endless momentum',
      reasonTemplate: (_g, album) => `Strips the futuristic drive ${album ? `of ${album}` : ''} down to pure skeletal rhythm and subterranean dub techno pulses.`,
      sharedTraits: ['hypnotic pulse', 'dub chord', 'skeletal groove'],
      searchKeywords: ['Basic Channel', 'Deepchord', 'Gas', 'Ritchie Hawtin']
    },
    {
      targetGenre: 'Krautrock',
      relationDescription: 'Relentless motorik rhythm and analog synthesis',
      reasonTemplate: (_g) => `Traces the electronic drum machine pulse back to 1970s German motorik pioneers.`,
      sharedTraits: ['motorik momentum', 'analog pulse', 'trance'],
      searchKeywords: ['Kraftwerk', 'Can', 'Neu!']
    },
    {
      targetGenre: 'Jungle & Drum & Bass',
      relationDescription: 'High-speed syncopated breaks and heavyweight sub-bass pressure',
      reasonTemplate: (_g) => `Pivots from 4/4 mechanical grooves into rapid polyrhythmic breakbeat science.`,
      sharedTraits: ['futuristic synths', 'sub-bass', 'kinetic drive'],
      searchKeywords: ['Goldie', 'LTJ Bukem', 'Photek', 'Roni Size']
    }
  ],
  'Dub': [
    {
      targetGenre: 'Dubstep & UK Bass',
      relationDescription: 'Subterranean sub-bass pressure, half-time pacing and cavernous delay',
      reasonTemplate: (_g) => `Fast-forwards the cavernous tape echo and heavyweight basslines into South London sound-system pressure.`,
      sharedTraits: ['sub-bass', 'half-time tempo', 'spring reverb space'],
      searchKeywords: ['Burial', 'Mala', 'Digital Mystikz', 'Kromestar']
    },
    {
      targetGenre: 'Ethio-Jazz',
      relationDescription: 'Hypnotic modal brass melodies, minor key melancholy and deep swinging pocket',
      reasonTemplate: (_g) => `Connects deep swinging syncopation with haunting East African minor scales and vintage organ hum.`,
      sharedTraits: ['swinging groove', 'haunting brass', 'warm vintage tape'],
      searchKeywords: ['Mulatu Astatke', 'Getatchew Mekurya', 'Hailu Mergia']
    },
    {
      targetGenre: 'Dark Ambient',
      relationDescription: 'Vast reverberant isolation, tape hiss and low-frequency resonance',
      reasonTemplate: (_g) => `Strikes the drums away, leaving only the cavernous ghostly resonance and subterranean room reflections.`,
      sharedTraits: ['ghostly space', 'sub-bass hum', 'tape hiss'],
      searchKeywords: ['Thomas Koner', 'Lustmord', 'Biosphere']
    }
  ],
  'Ethio-Jazz': [
    {
      targetGenre: 'Spiritual Jazz',
      relationDescription: 'Meditative modal exploration, expressive saxophones, and cosmic resonance',
      reasonTemplate: (_g, album) => `Channels the modal saxophone mysticism ${album ? `of ${album}` : ''} into cosmic spiritual jazz voyages.`,
      sharedTraits: ['modal brass', 'spiritual depth', 'organic percussion'],
      searchKeywords: ['Pharoah Sanders', 'Alice Coltrane', 'Sun Ra', 'Don Cherry']
    },
    {
      targetGenre: 'Dub Reggae',
      relationDescription: 'Deep hypnotic basslines, organ vamps, and cavernous studio acoustics',
      reasonTemplate: (_g) => `Shifts the modal East African pocket into Jamaican tape-echoed bass alchemy.`,
      sharedTraits: ['warm vintage tape', 'hypnotic pocket', 'cavernous delay'],
      searchKeywords: ['Augustus Pablo', 'King Tubby', 'Jackie Mittoo']
    },
    {
      targetGenre: 'Desert Blues',
      relationDescription: 'Mesmerizing cyclical guitar trance loops and ancient modal scales',
      reasonTemplate: (_g) => `Crosses the Sahel into Saharan guitar trance loops and nomadic vocal counterpoint.`,
      sharedTraits: ['cyclical trance', 'modal scales', 'hypnotic drive'],
      searchKeywords: ['Tinariwen', 'Ali Farka Toure', 'Mdou Moctar']
    }
  ],
  'Desert Blues': [
    {
      targetGenre: 'Mississippi Delta Blues',
      relationDescription: 'Raw acoustic slide guitar, hypnotic foot stomps, and ancestral vocal ache',
      reasonTemplate: (_g, album) => `Traces the cyclical guitar trance ${album ? `from ${album}` : ''} back to raw, single-microphone Mississippi Delta blues.`,
      sharedTraits: ['slide guitar', 'raw acoustic', 'ancestral yearning'],
      searchKeywords: ['Junior Kimbrough', 'R.L. Burnside', 'Skip James', 'Blind Willie Johnson']
    },
    {
      targetGenre: 'Psychedelic Rock',
      relationDescription: 'Overdriven pentatonic fuzz, expansive jamming, and desert hallucinatory vibes',
      reasonTemplate: (_g) => `Transposes Saharan guitar trance into expansive, heavy psychedelic guitar workouts.`,
      sharedTraits: ['fuzzy guitar', 'endless jam', 'hypnotic momentum'],
      searchKeywords: ['Mdou Moctar', 'Kikagaku Moyo', 'Earthless', 'Tinariwen']
    },
    {
      targetGenre: 'Spiritual Jazz',
      relationDescription: 'Meditative contemplation, organic hand percussion, and cosmic yearning',
      reasonTemplate: (_g) => `Deepens the contemplative solitude with cosmic modal brass and harp flourishes.`,
      sharedTraits: ['spiritual depth', 'organic acoustic', 'open space'],
      searchKeywords: ['Pharoah Sanders', 'Alice Coltrane', 'Don Cherry']
    }
  ],
  'Ambient': [
    {
      targetGenre: 'Japanese Environmental Music',
      relationDescription: 'Spatial restraint, delicate mallet percussion and architectural acoustic calm',
      reasonTemplate: (_g, album) => `Refines the serene spatial atmosphere ${album ? `of ${album}` : ''} into Japanese 1980s architectural minimalism and acoustic clarity.`,
      sharedTraits: ['spatial restraint', 'organic acoustic', 'delicate touch'],
      searchKeywords: ['Hiroshi Yoshimura', 'Midori Takada', 'Satoshi Ashikawa', 'Eitetsu Hayashi']
    },
    {
      targetGenre: 'Modern Classical',
      relationDescription: 'Felted upright piano, string quartet harmonics and intimate tape decay',
      reasonTemplate: (_g) => `Grounds the drifting textures in acoustic piano hammer mechanics and aching cello vibrato.`,
      sharedTraits: ['felted piano', 'intimacy', 'acoustic warmth'],
      searchKeywords: ['Harold Budd', 'Max Richter', 'Nils Frahm', 'Goldmund']
    },
    {
      targetGenre: 'Fourth World',
      relationDescription: 'Organic hand percussion blended with futuristic micro-tonal synthesis',
      reasonTemplate: (_g) => `Merges environmental quietude with indigenous percussion and mutated dream-state brass.`,
      sharedTraits: ['field recordings', 'micro-tonal brass', 'exotic texture'],
      searchKeywords: ['Jon Hassell', 'Don Cherry', 'Visible Cloaks']
    }
  ],
  'Modern Classical': [
    {
      targetGenre: 'Japanese Environmental Music',
      relationDescription: 'Delicate mallet percussion, spatial pause, and quiet contemplation',
      reasonTemplate: (_g, album) => `Transitions the intimate felted piano ${album ? `from ${album}` : ''} into architectural Japanese environmental tranquility.`,
      sharedTraits: ['delicate touch', 'spatial pause', 'organic clarity'],
      searchKeywords: ['Hiroshi Yoshimura', 'Satoshi Ashikawa', 'Ryuichi Sakamoto']
    },
    {
      targetGenre: 'Ambient Drone',
      relationDescription: 'Sustained orchestral strings dissolving into pure sonic space',
      reasonTemplate: (_g) => `Dissolves the acoustic chamber instruments into infinite reverberant drone horizons.`,
      sharedTraits: ['infinite decay', 'emotional ache', 'orchestral wash'],
      searchKeywords: ['Stars of the Lid', 'A Winged Victory for the Sullen', 'Johann Johannsson']
    },
    {
      targetGenre: 'ECM Chamber Jazz',
      relationDescription: 'Pristine acoustic recording, spatial room resonance, and Nordic contemplation',
      reasonTemplate: (_g) => `Pivots toward the quiet, crystalline acoustics of Scandinavian ECM records.`,
      sharedTraits: ['pristine acoustic', 'room resonance', 'sparse melody'],
      searchKeywords: ['Keith Jarrett', 'Jan Garbarek', 'Arvo Part']
    }
  ],
  'Industrial': [
    {
      targetGenre: 'EBM & Dark Techno',
      relationDescription: 'Pounding 4/4 mechanical drums, distorted bass synths and dystopian tension',
      reasonTemplate: (_g, album) => `Channels the abrasive mechanical force ${album ? `of ${album}` : ''} onto a relentless warehouse techno floor.`,
      sharedTraits: ['distorted kicks', 'metallic percussion', 'dystopian energy'],
      searchKeywords: ['Gesaffelstein', 'Ancient Methods', 'Front 242', 'Nitzer Ebb']
    },
    {
      targetGenre: 'No Wave',
      relationDescription: 'Abrasive micro-dissonance, jagged funk rhythms and visceral rawness',
      reasonTemplate: (_g) => `Strips the electronic machinery down to jagged, piercing guitars and unhinged NYC downtown funk.`,
      sharedTraits: ['piercing dissonance', 'danceable grit', 'unhinged drive'],
      searchKeywords: ['Liquid Liquid', 'James Chance', 'DNA', 'Bush Tetras']
    }
  ],
  'Bossa Nova': [
    {
      targetGenre: 'Tropicália',
      relationDescription: 'Lush psychedelic orchestral arrangements, nylon strings and poetic experimentation',
      reasonTemplate: (_g) => `Injects the delicate nylon chords with psychedelic electric guitars and avant-garde Brazilian brass.`,
      sharedTraits: ['nylon guitar', 'poetic lyricism', 'harmonic subtlety'],
      searchKeywords: ['Caetano Veloso', 'Gal Costa', 'Gilberto Gil', 'Os Mutantes']
    },
    {
      targetGenre: 'Desert Blues',
      relationDescription: 'Hypnotic cyclical guitar fingerpicking, handclaps and soulful desert yearning',
      reasonTemplate: (_g) => `Transfers the warm intimate strumming across the Atlantic into mesmerizing Saharan guitar trance loops.`,
      sharedTraits: ['cyclical picking', 'warm acoustic', 'soulful yearning'],
      searchKeywords: ['Tinariwen', 'Ali Farka Toure', 'Bombino', 'Mdou Moctar']
    }
  ],
  'Afrobeat': [
    {
      targetGenre: 'Math Rock',
      relationDescription: 'Intricate interlocking counterpoint, clean angular guitar patterns and metric interplay',
      reasonTemplate: (_g) => `Translates the dizzying polyrhythmic horns and rhythm section into intricate, clean guitar mathematics.`,
      sharedTraits: ['interlocking rhythm', 'clean guitar tone', 'metric complexity'],
      searchKeywords: ['Toe', 'Battles', 'American Football', 'Elephant Gym']
    },
    {
      targetGenre: 'Ethio-Jazz',
      relationDescription: 'Haunting modal scales, vintage vibraphones and serpentine horn counter-melodies',
      reasonTemplate: (_g) => `Slows the relentless groove into a mysterious, smoky Addis Ababa night club session.`,
      sharedTraits: ['modal brass', 'hypnotic pocket', 'vintage warmth'],
      searchKeywords: ['Mulatu Astatke', 'Getatchew Mekurya', 'Alemayehu Eshete']
    }
  ],
  'Rock': [
    {
      targetGenre: 'Krautrock',
      relationDescription: 'Motorik 4/4 drive, hypnotic repetition, and experimental analog synthesizers',
      reasonTemplate: (_g, album) => `Expands the traditional rock structure ${album ? `from ${album}` : ''} into German motorik cosmic voyages.`,
      sharedTraits: ['motorik pulse', 'hypnotic progression', 'analog texture'],
      searchKeywords: ['Can', 'Neu!', 'Harmonia']
    },
    {
      targetGenre: 'Japanese Ambient',
      relationDescription: 'Delicate spatial acoustic balance and contemplative stillness',
      reasonTemplate: (_g) => `Trades guitar grit for pristine 1980s Japanese environmental tranquility and acoustic space.`,
      sharedTraits: ['spatial calm', 'delicate tone', 'minimalism'],
      searchKeywords: ['Hiroshi Yoshimura', 'Midori Takada', 'Green']
    },
    {
      targetGenre: 'Desert Blues',
      relationDescription: 'Raw cyclical guitar riffs and hypnotic communal rhythm',
      reasonTemplate: (_g) => `Connects rock guitar energy directly to North African Tuareg desert trance grooves.`,
      sharedTraits: ['cyclical guitar', 'raw energy', 'hypnotic rhythm'],
      searchKeywords: ['Tinariwen', 'Mdou Moctar', 'Bombino']
    }
  ]
};

// Fallback curated lateral bridges for generic styles
export const DEFAULT_LATERAL_BRIDGES: LateralBridge[] = [
  {
    targetGenre: 'Japanese Ambient',
    relationDescription: 'Delicate spatial awareness and meditative tranquility',
    reasonTemplate: () => 'Pivots toward serene 1980s Japanese environmental music, trading friction for pure spatial stillness.',
    sharedTraits: ['spatial calm', 'delicate percussion', 'organic analog'],
    searchKeywords: ['Hiroshi Yoshimura', 'Midori Takada', 'Green']
  },
  {
    targetGenre: 'Krautrock',
    relationDescription: 'Hypnotic motorik pulse and analog exploration',
    reasonTemplate: () => 'Translates the rhythmic momentum into hypnotic 1970s German motorik cycles.',
    sharedTraits: ['motorik beat', 'hypnotic repetition'],
    searchKeywords: ['Can', 'Neu!', 'Harmonia']
  },
  {
    targetGenre: 'Dub Reggae',
    relationDescription: 'Cavernous basslines and spring reverb space',
    reasonTemplate: () => 'Deepens the sonic space with cavernous spring reverb and heavyweight low-end architecture.',
    sharedTraits: ['sub bass', 'spring reverb'],
    searchKeywords: ['King Tubby', 'Augustus Pablo', 'Lee Scratch Perry']
  },
  {
    targetGenre: 'Trip-Hop',
    relationDescription: 'Nocturnal downtempo breaks and cinematic jazz chords',
    reasonTemplate: () => 'Carries the moody atmospheric resonance into smoky Bristol downtempo breakbeats.',
    sharedTraits: ['downtempo beat', 'cinematic melancholy'],
    searchKeywords: ['Portishead', 'Massive Attack', 'Tricky']
  }
];

export function getLateralBridgesForGenre(genre: string): LateralBridge[] {
  // Normalize lookup
  const clean = Object.keys(LATERAL_GENRE_BRIDGES).find(
    g => g.toLowerCase() === genre.toLowerCase() || genre.toLowerCase().includes(g.toLowerCase()) || g.toLowerCase().includes(genre.toLowerCase())
  );
  if (clean && LATERAL_GENRE_BRIDGES[clean]) {
    return LATERAL_GENRE_BRIDGES[clean];
  }
  return DEFAULT_LATERAL_BRIDGES;
}
