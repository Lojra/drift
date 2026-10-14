import { useState, useEffect, useCallback, useRef } from 'react';
import { Album, AlbumRating, TasteProfile } from '../types/music';
import {
  loadStoredCrate,
  saveStoredCrate,
  loadStoredRatings,
  saveStoredRatings,
  loadStoredTasteProfile,
  saveStoredTasteProfile,
  exportBackupData,
  importBackupData
} from '../services/storage';
import { SONIC_STARTING_POINTS, getLateralBridgesForGenre } from '../services/sonicBridge';
import {
  searchItunesAlbums,
  generateLateralRecommendations
} from '../services/musicApi';
import { getGeminiLateralRecommendations } from '../services/geminiRecommender';
import { CURATED_ALBUMS } from '../services/curatedCatalog';

export function useDriftEngine() {
  const [crate, setCrate] = useState<Album[]>([]);
  const [ratings, setRatings] = useState<AlbumRating[]>([]);
  const [tasteProfile, setTasteProfile] = useState<TasteProfile>(loadStoredTasteProfile);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'crate' | 'archive' | 'taste'>('crate');
  const [showCalibrationModal, setShowCalibrationModal] = useState<boolean>(false);
  const seenAlbumIdsRef = useRef<Set<string>>(new Set());

  // Initialize from storage or request calibration
  useEffect(() => {
    const storedCrate = loadStoredCrate();
    const storedRatings = loadStoredRatings();
    const storedTaste = loadStoredTasteProfile();

    setRatings(storedRatings);
    setTasteProfile(storedTaste);

    if (storedCrate.length === 10) {
      setCrate(storedCrate);
    } else if (!storedTaste.calibrated) {
      setShowCalibrationModal(true);
    } else {
      // Re-hydrate crate for calibrated profile
      hydrateInitialCrate(storedTaste);
    }
  }, []);

  // Sync crate to localStorage whenever it changes
  useEffect(() => {
    if (crate.length > 0) {
      saveStoredCrate(crate);
    }
  }, [crate]);

  // Sync ratings to localStorage
  useEffect(() => {
    saveStoredRatings(ratings);
  }, [ratings]);

  // Sync taste profile
  useEffect(() => {
    saveStoredTasteProfile(tasteProfile);
  }, [tasteProfile]);


  /**
   * Generates a 10-album crate based on starting points or taste profile
   */
  const hydrateInitialCrate = useCallback(async (profile: TasteProfile) => {
    setIsLoading(true);
    try {
      let candidatePool: Album[] = [];
      const genresToQuery: string[] = [];

      profile.selectedStartingPoints.forEach(spId => {
        const point = SONIC_STARTING_POINTS.find(p => p.id === spId);
        if (point) genresToQuery.push(...point.genres);
      });

      if (profile.baselineInputs.length > 0) {
        genresToQuery.push(...profile.baselineInputs);
      }

      if (genresToQuery.length === 0) {
        genresToQuery.push('Krautrock', 'Post-Punk', 'Ambient', 'Dub', 'Trip-Hop', 'Ethio-Jazz');
      }

      // Collect initial albums concurrently across target genres
      const targetGenres = genresToQuery.slice(0, 4);
      const queryPromises = targetGenres.map(g => searchItunesAlbums(g, 4));
      const queryResults = await Promise.all(queryPromises);
      for (const results of queryResults) {
        candidatePool.push(...results);
      }

      // Deduplicate
      const seen = new Set<string>();
      const deduped: Album[] = [];
      for (const a of candidatePool) {
        if (!seen.has(a.id) && !seen.has(a.title.toLowerCase())) {
          seen.add(a.id);
          seen.add(a.title.toLowerCase());
          deduped.push(a);
        }
      }

      // If we don't have 10, fill from curated catalog
      if (deduped.length < 10) {
        for (const curated of CURATED_ALBUMS) {
          if (!seen.has(curated.id) && !seen.has(curated.title.toLowerCase())) {
            seen.add(curated.id);
            seen.add(curated.title.toLowerCase());
            deduped.push(curated);
            if (deduped.length >= 10) break;
          }
        }
      }

      const final10 = deduped.slice(0, 10);
      setCrate(final10);
    } catch (e) {
      console.error('Error hydrating crate:', e);
      setCrate(CURATED_ALBUMS.slice(0, 10));
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * User taste calibration (Onboarding or recalibration)
   */
  const calibrateTaste = useCallback(async (startingPointIds: string[], customBaselines: string[]) => {
    setIsLoading(true);
    setShowCalibrationModal(false);

    const selectedPoints = SONIC_STARTING_POINTS.filter(p => startingPointIds.includes(p.id));
    const activeGenres = selectedPoints.flatMap(p => p.genres);
    const combinedGenres = [...activeGenres, ...customBaselines];

    const initialTraits = {
      atmospheric: 0.5,
      hypnotic: 0.5,
      distortion: 0.5,
      percussive: 0.5,
      experimental: 0.5,
      melancholic: 0.5
    };

    selectedPoints.forEach(p => {
      if (p.traits.atmospheric) initialTraits.atmospheric = Math.max(initialTraits.atmospheric, p.traits.atmospheric);
      if (p.traits.hypnotic) initialTraits.hypnotic = Math.max(initialTraits.hypnotic, p.traits.hypnotic);
      if (p.traits.distortion) initialTraits.distortion = Math.max(initialTraits.distortion, p.traits.distortion);
      if (p.traits.percussive) initialTraits.percussive = Math.max(initialTraits.percussive, p.traits.percussive);
      if (p.traits.experimental) initialTraits.experimental = Math.max(initialTraits.experimental, p.traits.experimental);
      if (p.traits.melancholic) initialTraits.melancholic = Math.max(initialTraits.melancholic, p.traits.melancholic);
    });

    const driftPath = selectedPoints.length > 0
      ? `${selectedPoints[0].title.split(' ')[0]} -> ${combinedGenres.slice(0, 2).join(' / ')}`
      : 'Initial Baseline Exploration';

    const newProfile: TasteProfile = {
      calibrated: true,
      selectedStartingPoints: startingPointIds,
      baselineInputs: customBaselines,
      likedGenres: {},
      dislikedGenres: [],
      traits: initialTraits,
      currentDriftPath: driftPath
    };

    setTasteProfile(newProfile);
    await hydrateInitialCrate(newProfile);
    setIsLoading(false);
  }, [hydrateInitialCrate]);

  /**
   * Rate an album (1.0 to 10.0 in 0.5 steps)
   */
  const rateAlbum = useCallback(async (
    albumId: string,
    score: number,
    sonicTag?: string
  ) => {
    const album = crate.find(a => a.id === albumId) ||
      CURATED_ALBUMS.find(a => a.id === albumId) ||
      (selectedAlbum?.id === albumId ? selectedAlbum : null);

    if (!album) return;

    const newRating: AlbumRating = {
      albumId: album.id,
      albumTitle: album.title,
      artist: album.artist,
      coverArtUrl: album.coverArtUrl,
      score,
      ratedAt: new Date().toISOString(),
      sonicTag,
      genres: album.genres,
      driftOriginReason: album.driftReason
    };

    setRatings(prev => {
      const filtered = prev.filter(r => r.albumId !== albumId);
      return [newRating, ...filtered];
    });

    // Update Taste Profile according to the lateral drift algorithm
    setTasteProfile(prev => {
      const updated = { ...prev };
      const primaryGenre = album.genres[0] || 'Unknown';

      if (score >= 7.0) {
        // High rating: Lock onto underlying sonic characteristics, but pivot LATERAL
        updated.likedGenres = {
          ...updated.likedGenres,
          [primaryGenre]: (updated.likedGenres[primaryGenre] || 0) + 1
        };

        const bridges = getLateralBridgesForGenre(primaryGenre);
        const divergence = updated.vectorDivergence || 4.2;
        const bridge = divergence >= 5.5 && bridges.length > 2
          ? bridges[bridges.length - 1]
          : bridges[0];
        updated.currentDriftPath = `${primaryGenre} -> ${bridge.targetGenre}`;

        // Reinforce sonic traits
        if (sonicTag === 'Loved the rhythm') {
          updated.traits.percussive = Math.min(1.0, updated.traits.percussive + 0.15);
        } else if (sonicTag === 'Loved the atmosphere') {
          updated.traits.atmospheric = Math.min(1.0, updated.traits.atmospheric + 0.15);
        }
      } else if (score < 5.0) {
        // Downweight and pivot away
        if (!updated.dislikedGenres.includes(primaryGenre)) {
          updated.dislikedGenres = [...updated.dislikedGenres, primaryGenre];
        }
        updated.currentDriftPath = `Pivoting away from ${primaryGenre}`;
      }

      return updated;
    });
  }, [crate, selectedAlbum]);

  /**
   * Cycle vector divergence between Conservative (2.1), Optimal Lateral (4.2), and Radical Leap (6.8)
   */
  const toggleVectorDivergence = useCallback(() => {
    setTasteProfile(prev => {
      const current = prev.vectorDivergence || 4.2;
      let next = 4.2;
      if (current < 3.0) next = 4.2;
      else if (current < 5.5) next = 6.8;
      else next = 2.1;
      return { ...prev, vectorDivergence: next };
    });
  }, []);

  /**
   * Replace a single album in the crate with a fresh lateral recommendation
   */
  const replaceCrateAlbum = useCallback(async (albumId: string) => {
    const albumIndex = crate.findIndex(a => a.id === albumId);
    if (albumIndex === -1) return;

    const currentAlbum = crate[albumIndex];
    const existingIds = new Set(crate.map(a => a.id));

    let replacement: Album | null = null;

    // Check if we have high-rated albums to pivot from
    const highRatings = ratings.filter(r => r.score >= 7.0);
    const sourceRating = highRatings.length > 0 ? highRatings[0] : null;

    if (sourceRating) {
      const sourceAlbum = CURATED_ALBUMS.find(a => a.id === sourceRating.albumId) || currentAlbum;
      const recs = await generateLateralRecommendations(
        sourceAlbum,
        sourceRating.score,
        sourceRating.sonicTag,
        existingIds,
        tasteProfile.vectorDivergence || 4.2
      );
      if (recs.length > 0) {
        replacement = recs[0];
      }
    }

    if (!replacement) {
      // Fallback: Pick an unvisited curated or itunes album
      const fallback = CURATED_ALBUMS.find(a => !existingIds.has(a.id));
      replacement = fallback || currentAlbum;
    }

    setCrate(prev => {
      const copy = [...prev];
      copy[albumIndex] = replacement!;
      return copy;
    });

    if (selectedAlbum?.id === albumId) {
      setSelectedAlbum(replacement);
    }
  }, [crate, ratings, selectedAlbum]);

  /**
   * Refresh entire 10-album crate: 100% fresh replacement from expanded library
   */
  const refreshCrate = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentCrateIds = new Set(crate.map(a => a.id));
      // Mark current crate as seen
      currentCrateIds.forEach(id => seenAlbumIdsRef.current.add(id));

      let newBatch: Album[] = [];

      // 1. If Gemini API key is available, attempt AI lateral curation first
      const existingIds = new Set([...ratings.map(r => r.albumId), ...seenAlbumIdsRef.current]);
      const geminiRecs = await getGeminiLateralRecommendations(ratings, existingIds);
      if (geminiRecs && geminiRecs.length >= 3) {
        for (const rec of geminiRecs) {
          if (!currentCrateIds.has(rec.id) && !newBatch.some(b => b.id === rec.id)) {
            newBatch.push(rec);
            seenAlbumIdsRef.current.add(rec.id);
            if (newBatch.length >= 4) break;
          }
        }
      }

      // 2. Lateral Bridge Generation based on top rated albums
      const topRatings = ratings.filter(r => r.score >= 7.0).slice(0, 3);
      for (const r of topRatings) {
        if (newBatch.length >= 10) break;
        const sourceAlbum = CURATED_ALBUMS.find(a => a.id === r.albumId) ||
          crate.find(a => a.id === r.albumId) || {
            id: r.albumId,
            title: r.albumTitle,
            artist: r.artist,
            genres: r.genres,
            coverArtUrl: r.coverArtUrl,
            releaseYear: '',
            driftReason: '',
            tracks: [],
            spotifyUrl: '',
            youtubeUrl: '',
            youtubeMusicUrl: '',
            sonicTraits: {}
          };

        const lateralRecs = await generateLateralRecommendations(
          sourceAlbum,
          r.score,
          r.sonicTag,
          new Set([...seenAlbumIdsRef.current, ...newBatch.map(b => b.id)]),
          tasteProfile.vectorDivergence || 4.2
        );

        for (const alb of lateralRecs) {
          if (!currentCrateIds.has(alb.id) && !newBatch.some(b => b.id === alb.id)) {
            newBatch.push(alb);
            seenAlbumIdsRef.current.add(alb.id);
            if (newBatch.length >= 6) break;
          }
        }
      }

      // 3. Find unseen albums from CURATED_ALBUMS
      let unseenCurated = CURATED_ALBUMS.filter(
        a => !seenAlbumIdsRef.current.has(a.id) && !currentCrateIds.has(a.id) && !newBatch.some(b => b.id === a.id)
      );

      // If unseen pool is running low, reset seen pool except for current crate and batch
      if (unseenCurated.length < (10 - newBatch.length)) {
        seenAlbumIdsRef.current = new Set([...currentCrateIds, ...newBatch.map(b => b.id)]);
        unseenCurated = CURATED_ALBUMS.filter(
          a => !currentCrateIds.has(a.id) && !newBatch.some(b => b.id === a.id)
        );
      }

      // Shuffle unseen curated albums to ensure diverse discovery
      const shuffled = [...unseenCurated].sort(() => Math.random() - 0.5);
      for (const alb of shuffled) {
        if (newBatch.length >= 10) break;
        newBatch.push(alb);
        seenAlbumIdsRef.current.add(alb.id);
      }

      // 4. Guaranteed fill if still under 10
      if (newBatch.length < 10) {
        for (const cur of CURATED_ALBUMS) {
          if (!newBatch.some(b => b.id === cur.id)) {
            newBatch.push(cur);
            if (newBatch.length >= 10) break;
          }
        }
      }

      const final10 = newBatch.slice(0, 10);
      setCrate(final10);
    } catch (e) {
      console.error('Error refreshing crate:', e);
    } finally {
      setIsLoading(false);
    }
  }, [crate, ratings, tasteProfile.vectorDivergence]);

  const handleExportBackup = useCallback(() => {
    const json = exportBackupData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `drift-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleImportBackup = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content && importBackupData(content)) {
        setCrate(loadStoredCrate());
        setRatings(loadStoredRatings());
        setTasteProfile(loadStoredTasteProfile());
      }
    };
    reader.readAsText(file);
  }, []);

  return {
    crate,
    ratings,
    tasteProfile,
    selectedAlbum,
    setSelectedAlbum,
    isLoading,
    activeTab,
    setActiveTab,
    showCalibrationModal,
    setShowCalibrationModal,
    calibrateTaste,
    rateAlbum,
    replaceCrateAlbum,
    refreshCrate,
    handleExportBackup,
    handleImportBackup,
    toggleVectorDivergence
  };
}
