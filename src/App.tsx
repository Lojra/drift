import React, { useState, useMemo, useEffect } from 'react';
import { useDriftEngine } from './hooks/useDriftEngine';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileHeader } from './components/header/MobileHeader';
import { MobileTabBar } from './components/navigation/MobileTabBar';
import { CrateGrid } from './components/crate/CrateGrid';
import { HiFiStudioDeck } from './components/studio/HiFiStudioDeck';
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
  const [viewMode, setViewMode] = useState<'grid' | 'studio'>('studio');
  const [drawerTable, setDrawerTable] = useState<'none' | 'info' | 'test'>('none');

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
    const activeAlb = selectedAlbum || displayedCrate[0] || null;
    return ratings.find(r => r.albumId === activeAlb?.id);
  }, [ratings, selectedAlbum, displayedCrate]);

  // Keyboard shortcut: ESC closes Inspector Drawer if no modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (selectedAlbum || drawerTable !== 'none') && !showCalibrationModal) {
        setSelectedAlbum(null);
        setDrawerTable('none');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAlbum, drawerTable, showCalibrationModal, setSelectedAlbum]);

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
    setDrawerTable('info');
  };

  const handleToggleDrawerTable = (table: 'info' | 'test') => {
    if (drawerTable === table) {
      setDrawerTable('none');
    } else {
      if (!selectedAlbum && displayedCrate.length > 0) {
        setSelectedAlbum(displayedCrate[0]);
      }
      setDrawerTable(table);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas-black text-text-offwhite font-sans antialiased select-none">
      {/* 1. Left Fixed Sidebar (Desktop only) with 10-LP Vinyl Shelf */}
      <div className="hidden md:flex flex-shrink-0 h-full overflow-visible z-30">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tasteProfile={tasteProfile}
          ratings={ratings}
          onRecalibrate={() => setShowCalibrationModal(true)}
          onExportBackup={handleExportBackup}
          onImportBackup={handleImportBackup}
          onToggleDivergence={toggleVectorDivergence}
          crate={displayedCrate}
          selectedAlbum={selectedAlbum}
          onSelectAlbum={(album) => {
            setSelectedAlbum(album);
            setActiveTab('crate');
          }}
        />
      </div>

      {/* 2. Fluid Center Main Canvas */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-canvas-black overflow-hidden relative">
        {/* Mobile Header (Hidden on Desktop) */}
        <MobileHeader
          driftPath={tasteProfile.currentDriftPath}
          onRefreshCrate={refreshCrate}
          isLoading={isLoading}
          onCalibrate={() => setShowCalibrationModal(true)}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
          activeDrawerTable={drawerTable}
          onToggleDrawerTable={handleToggleDrawerTable}
        />

        {/* Desktop Header (Hidden on Mobile) with Dual Shelf Tables */}
        <div className="hidden md:block">
          <Header
            tasteProfile={tasteProfile}
            ratedInCrateCount={ratedInCrateCount}
            onRefreshCrate={refreshCrate}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onToggleViewMode={setViewMode}
            activeDrawerTable={drawerTable}
            onToggleDrawerTable={handleToggleDrawerTable}
          />
        </div>

        {/* Main View: Fits viewport completely for crate batch on desktop, scrollable on mobile */}
        <main
          className={`flex-1 min-h-0 ${
            activeTab === 'crate'
              ? 'p-2 sm:p-3 xl:p-4 flex flex-col overflow-y-auto lg:overflow-hidden pb-28 lg:pb-3'
              : 'overflow-y-auto p-4 sm:p-6 lg:p-8 pb-28 md:pb-8'
          }`}
        >
          <div className={`${activeTab === 'crate' ? 'h-full flex flex-col flex-1 min-h-0' : 'max-w-7xl mx-auto space-y-6'}`}>
            {activeTab === 'crate' && (
              viewMode === 'studio' ? (
                <HiFiStudioDeck
                  albums={displayedCrate}
                  ratings={ratings}
                  selectedAlbum={selectedAlbum}
                  onSelectAlbum={setSelectedAlbum}
                  onRateAlbum={(albumId, score, tag) => rateAlbum(albumId, score, tag)}
                  onReplaceAlbum={(albumId) => replaceCrateAlbum(albumId)}
                  onOpenInspector={(album) => {
                    setSelectedAlbum(album);
                    setDrawerTable('info');
                  }}
                  isLoading={isLoading}
                />
              ) : (
                <CrateGrid
                  albums={displayedCrate}
                  ratings={ratings}
                  selectedAlbum={selectedAlbum}
                  onSelectAlbum={(album) => {
                    setSelectedAlbum(album);
                    setDrawerTable('info');
                  }}
                  isLoading={isLoading}
                />
              )
            )}

            {activeTab === 'archive' && (
              <div className="space-y-4">
                <div className="pb-1">
                  <h2 className="text-sm font-bold tracking-wider font-mono text-text-offwhite uppercase">
                    AUDIOPHILE VINYL VAULT // 12-INCH MASTER ARCHIVE
                  </h2>
                  <p className="text-xs text-text-muted mt-0.5 font-sans">
                    Your complete physical pressing registry, master grade certifications, and acoustic reaction stamps.
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
                  <h2 className="text-sm font-bold tracking-wider font-mono text-text-offwhite uppercase">
                    STUDIO ACOUSTIC ANALYZER // 6-BAND PARAMETRIC CONSOLE
                  </h2>
                  <p className="text-xs text-text-muted mt-0.5 font-sans">
                    Real-time polar acoustic radar scope, RIAA calibrated parametric faders, and magnetic tape bias anchors.
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

      {/* 3. Dual Table Album Inspector (Responsive: Slide-In Drawer on Desktop, Slide-Up Bottom Sheet on Mobile) */}
      {(selectedAlbum || drawerTable !== 'none') && (
        <InspectorDrawer
          album={selectedAlbum || displayedCrate[0] || null}
          currentRating={currentAlbumRating}
          tableMode={drawerTable === 'none' ? 'info' : drawerTable}
          onSwitchTable={(mode) => setDrawerTable(mode)}
          onClose={() => {
            setSelectedAlbum(null);
            setDrawerTable('none');
          }}
          onRateAlbum={(albumId, score, tag) => rateAlbum(albumId, score, tag)}
          onReplaceAlbum={(albumId) => replaceCrateAlbum(albumId)}
        />
      )}

      {/* 4. Mobile Fixed Bottom Navigation Tab Bar (Hidden on Desktop) */}
      <MobileTabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        crateCount={crate.length}
        ratedCount={ratings.length}
      />

      {/* 5. Centered Modal Overlay: Taste Recalibration // Step 01 */}
      <CalibrationModal
        isOpen={showCalibrationModal}
        onCalibrate={calibrateTaste}
        onClose={tasteProfile.calibrated ? () => setShowCalibrationModal(false) : undefined}
      />
    </div>
  );
};

export default App;
