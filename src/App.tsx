import React, { useState, useMemo, useEffect } from 'react';
import { useDriftEngine } from './hooks/useDriftEngine';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CrateGrid } from './components/crate/CrateGrid';
import { InspectorDrawer } from './components/inspector/InspectorDrawer';
import { CalibrationModal } from './components/onboarding/CalibrationModal';
import { RatedArchive } from './components/archive/RatedArchive';
import { TasteVectorView } from './components/taste/TasteVectorView';
import { AlbumRating } from './types/music';

export const App: React.FC = () => {
  const {
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
  } = useDriftEngine();

  const [searchQuery, setSearchQuery] = useState<string>('');

  // Count of rated albums inside the current 10-album crate
  const ratedInCrateCount = useMemo(() => {
    const ratedSet = new Set(ratings.map(r => r.albumId));
    return crate.filter(a => ratedSet.has(a.id)).length;
  }, [crate, ratings]);

  // Filter crate by search query
  const displayedCrate = useMemo(() => {
    if (!searchQuery.trim()) return crate;
    const q = searchQuery.toLowerCase().trim();
    return crate.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.artist.toLowerCase().includes(q) ||
      (a.genres && a.genres.some(g => g.toLowerCase().includes(q))) ||
      (a.driftReason && a.driftReason.toLowerCase().includes(q))
    );
  }, [crate, searchQuery]);

  // Active rating for currently inspected album
  const currentAlbumRating = useMemo(() => {
    return ratings.find(r => r.albumId === selectedAlbum?.id);
  }, [ratings, selectedAlbum]);

  // Keyboard shortcut: ESC closes Inspector Drawer if no modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedAlbum && !showCalibrationModal) {
        setSelectedAlbum(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAlbum, showCalibrationModal, setSelectedAlbum]);

  const handleSelectRatedArchiveAlbum = (rated: AlbumRating) => {
    const albumMatch = crate.find(a => a.id === rated.albumId);
    if (albumMatch) {
      setSelectedAlbum(albumMatch);
    } else {
      setSelectedAlbum({
        id: rated.albumId,
        title: rated.albumTitle,
        artist: rated.artist,
        releaseYear: 'Archived',
        coverArtUrl: rated.coverArtUrl,
        genres: rated.genres,
        driftReason: rated.driftOriginReason || 'Archived discovery entry.',
        tracks: [],
        spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(rated.artist + ' ' + rated.albumTitle)}`,
        youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(rated.artist + ' ' + rated.albumTitle + ' full album')}`,
        youtubeMusicUrl: `https://music.youtube.com/search?q=${encodeURIComponent(rated.artist + ' ' + rated.albumTitle)}`,
        sonicTraits: {}
      });
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas-black text-text-offwhite font-sans antialiased select-none">
      {/* 1. Left Fixed Sidebar (240px) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tasteProfile={tasteProfile}
        ratings={ratings}
        onRecalibrate={() => setShowCalibrationModal(true)}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
        onToggleDivergence={toggleVectorDivergence}
      />

      {/* 2. Fluid Center Main Canvas */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-canvas-black overflow-hidden relative">
        <Header
          tasteProfile={tasteProfile}
          ratedInCrateCount={ratedInCrateCount}
          onRefreshCrate={refreshCrate}
          isLoading={isLoading}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main View: Fits viewport completely for crate batch, scrollable for archive/taste */}
        <main
          className={`flex-1 min-h-0 ${
            activeTab === 'crate'
              ? 'p-3 xl:p-4 flex flex-col overflow-hidden'
              : 'overflow-y-auto p-6 lg:p-8'
          }`}
        >
          <div className={`${activeTab === 'crate' ? 'h-full flex flex-col flex-1 min-h-0' : 'max-w-7xl mx-auto space-y-6'}`}>
            {activeTab === 'crate' && (
              <CrateGrid
                albums={displayedCrate}
                ratings={ratings}
                selectedAlbum={selectedAlbum}
                onSelectAlbum={setSelectedAlbum}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'archive' && (
              <div className="space-y-4">
                <div className="pb-1">
                  <h2 className="text-base font-bold tracking-tight text-text-offwhite">
                    Rated Discovery Archive
                  </h2>
                  <p className="text-xs text-text-muted mt-0.5">
                    Your complete rating log, sonic reaction chips, and discovered lateral lineages.
                  </p>
                </div>

                <RatedArchive
                  ratings={ratings}
                  onSelectRatedAlbum={handleSelectRatedArchiveAlbum}
                />
              </div>
            )}

            {activeTab === 'taste' && (
              <div className="space-y-4">
                <div className="pb-1">
                  <h2 className="text-base font-bold tracking-tight text-text-offwhite">
                    Taste Vector Telemetry
                  </h2>
                  <p className="text-xs text-text-muted mt-0.5">
                    Real-time visualization of your acoustic dimensions, liked lateral genres, and suppression boundaries.
                  </p>
                </div>

                <TasteVectorView
                  tasteProfile={tasteProfile}
                  ratings={ratings}
                  onRecalibrate={() => setShowCalibrationModal(true)}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 3. Right Fixed Album Inspector Drawer (380px) */}
      {selectedAlbum && (
        <InspectorDrawer
          album={selectedAlbum}
          currentRating={currentAlbumRating}
          onClose={() => setSelectedAlbum(null)}
          onRateAlbum={(albumId, score, tag) => rateAlbum(albumId, score, tag)}
          onReplaceAlbum={(albumId) => replaceCrateAlbum(albumId)}
        />
      )}

      {/* 4. Centered Modal Overlay: Taste Recalibration // Step 01 */}
      <CalibrationModal
        isOpen={showCalibrationModal}
        onCalibrate={calibrateTaste}
        onClose={tasteProfile.calibrated ? () => setShowCalibrationModal(false) : undefined}
      />
    </div>
  );
};

export default App;
