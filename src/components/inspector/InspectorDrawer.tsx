import React from 'react';
import { X, RefreshCw, Radio, BookOpen, Sliders, Cpu, Zap, ArrowRight } from 'lucide-react';
import { Album, AlbumRating, SonicTag } from '../../types/music';
import { RatingWidget } from './RatingWidget';
import { ExternalLinks } from './ExternalLinks';
import { Tracklist } from './Tracklist';
import { useAudioPreview } from '../../hooks/useAudioPreview';
import { GenerativeVinylCover } from '../crate/GenerativeVinylCover';
import { fetchTracksForAlbum } from '../../services/musicApi';

interface InspectorDrawerProps {
  album: Album | null;
  currentRating?: AlbumRating;
  onClose: () => void;
  onRateAlbum: (albumId: string, score: number, tag?: SonicTag) => void;
  onReplaceAlbum: (albumId: string) => void;
  tableMode?: 'info' | 'test';
  onSwitchTable?: (mode: 'info' | 'test') => void;
}

export const InspectorDrawer: React.FC<InspectorDrawerProps> = ({
  album,
  currentRating,
  onClose,
  onRateAlbum,
  onReplaceAlbum,
  tableMode = 'info',
  onSwitchTable
}) => {
  const { currentTrackId, isPlaying, progress, error, playTrack, stop } = useAudioPreview();
  const [tracks, setTracks] = React.useState(album?.tracks || []);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
    if (!album) return;
    if (album.tracks && album.tracks.length > 0) {
      setTracks(album.tracks);
      return;
    }
    let isCurrent = true;
    fetchTracksForAlbum(album).then((loadedTracks) => {
      if (isCurrent) {
        setTracks(loadedTracks);
      }
    });
    return () => {
      isCurrent = false;
    };
  }, [album?.id]);

  if (!album) return null;

  const catalogId = (album.mbid ? album.mbid.slice(0, 8) : album.id.slice(0, 8)).toUpperCase();
  const matrixCode = `DRIFT-LP-${catalogId}-DR14`;
  const scoreDisplay = currentRating ? currentRating.score.toFixed(1) : 'UNRATED';

  // Computed acoustic telemetry traits for the Test Table
  const traits = album.sonicTraits || {};
  const acousticMeters = [
    { label: 'SUB-BASS PRESSURE', value: (traits.percussive ?? 0.88) * 100, db: '+3.2 dB', color: 'text-purple-soft', barColor: 'bg-purple-soft' },
    { label: 'ORGANIC SATURATION', value: (traits.distortion ?? 0.82) * 100, db: '12AX7 TUBE', color: 'text-amber-400', barColor: 'bg-amber-500' },
    { label: 'DYNAMIC TRANSIENTS', value: (traits.energy ?? 0.85) * 100, db: 'DR-14 dB', color: 'text-electric-blue', barColor: 'bg-electric-blue' },
    { label: 'STEREO DIFFUSION', value: (traits.atmospheric ?? 0.76) * 100, db: 'BLUMLEIN', color: 'text-emerald-400', barColor: 'bg-emerald-500' },
    { label: 'HYPNOTIC PACING', value: (traits.hypnotic ?? 0.70) * 100, db: '120 BPM', color: 'text-amber-300', barColor: 'bg-amber-400' },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden animate-fade-in"
        onClick={() => {
          stop();
          onClose();
        }}
      />

      <aside className="fixed bottom-0 inset-x-0 max-h-[92vh] rounded-t-[28px] border-t border-border-light audiophile-chassis z-50 overflow-y-auto select-none shadow-[0_-16px_50px_rgba(0,0,0,0.9)] md:relative md:inset-x-auto md:bottom-auto md:w-[390px] xl:w-[420px] md:rounded-none md:border-t-0 md:border-l md:border-border-subtle md:max-h-none md:h-screen md:z-20 flex flex-col flex-shrink-0 animate-slide-up md:animate-none relative">
        {/* Mobile Swipe/Drag Handle Pill */}
        <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mt-3 mb-1 md:hidden flex-shrink-0 shadow-sm" />

        {/* Top Inspector Header */}
        <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between bg-panel-obsidian sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${tableMode === 'info' ? 'bg-electric-blue shadow-[0_0_8px_#3B82F6]' : 'bg-amber-500 shadow-[0_0_8px_#F59E0B]'} animate-pulse`} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-offwhite font-bold">
              {tableMode === 'info' ? 'GATEFOLD INSPECTOR' : 'PHONO TEST TABLE'}
            </span>
            <span className="font-mono text-[9px] text-text-dim bg-panel-elevated px-1.5 py-0.5 rounded border border-border-subtle">
              #{catalogId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-amber-400 font-semibold hidden sm:inline">
              180g VIRGIN WAX
            </span>
            <button
              onClick={() => {
                stop();
                onClose();
              }}
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-panel-elevated text-text-dim hover:text-text-offwhite ml-1.5 transition-colors border border-border-subtle"
              title="Close inspector drawer"
              aria-label="Close inspector drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dual Table Switcher Bar */}
        <div className="px-5 py-2.5 bg-panel-obsidian/95 border-b border-border-subtle sticky top-[53px] z-20 backdrop-blur-md">
          <div className="flex items-center gap-1.5 p-1 bg-panel-elevated border border-border-subtle rounded-lg">
            <button
              onClick={() => onSwitchTable?.('info')}
              className={`flex-1 py-1.5 px-2.5 rounded-md font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                tableMode === 'info'
                  ? 'bg-panel-obsidian text-electric-blue shadow-md border border-electric-blue/40'
                  : 'text-text-muted hover:text-text-offwhite'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>MUSIC INFO TABLE</span>
            </button>
            <button
              onClick={() => onSwitchTable?.('test')}
              className={`flex-1 py-1.5 px-2.5 rounded-md font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                tableMode === 'test'
                  ? 'bg-panel-obsidian text-amber-400 shadow-md border border-amber-500/40'
                  : 'text-text-muted hover:text-text-offwhite'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>MUSIC TEST TABLE</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5 flex-1 overflow-y-auto">
          {/* ================================================================ */}
          {/* VIEW 1: MUSIC INFO TABLE (Cover Art, Tracks, Pressing Specs, Links) */}
          {/* ================================================================ */}
          {tableMode === 'info' && (
            <>
              {/* 1. Physical 12" Gatefold Jacket with Outer Sleeve Mylar & Slip-Out Vinyl Disc */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-950 border-2 border-neutral-800 shadow-[0_20px_45px_rgba(0,0,0,0.9)] group flex items-center justify-center">
                {/* Spinning/Grooved Vinyl Disc Slipping Out */}
                <div
                  className={`absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 rounded-full vinyl-grooves border-2 border-neutral-700 shadow-2xl flex items-center justify-center z-0 transition-transform duration-500 group-hover:translate-x-6 ${
                    isPlaying ? 'animate-spin-slow' : ''
                  }`}
                >
                  {/* Center Vinyl Label */}
                  <div className="w-16 h-16 rounded-full bg-amber-600/70 border-2 border-neutral-900 flex flex-col items-center justify-center p-1 text-center shadow-inner">
                    <span className="font-mono text-[7px] text-black font-extrabold uppercase leading-none">
                      DRIFT
                    </span>
                    <span className="font-mono text-[6px] text-black/80 font-bold leading-tight mt-0.5">
                      SIDE A // 33 RPM
                    </span>
                    <div className="w-2 h-2 rounded-full bg-black mt-1" />
                  </div>
                </div>

                {/* Pulsing loading skeleton */}
                {!imgLoaded && !imgError && album.coverArtUrl && (
                  <div className="absolute inset-0 bg-panel-elevated animate-pulse flex items-center justify-center z-10">
                    <div className="w-8 h-8 rounded-full border border-border-light/40 border-t-electric-blue animate-spin" />
                  </div>
                )}

                {/* Album Cover Art Front Plate */}
                <div className="relative w-full h-full z-10 overflow-hidden rounded-lg">
                  {!imgError && album.coverArtUrl ? (
                    <img
                      src={album.coverArtUrl}
                      alt={`${album.title} by ${album.artist}`}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setImgLoaded(true)}
                      onError={() => {
                        setImgError(true);
                        setImgLoaded(true);
                      }}
                    />
                  ) : (
                    <GenerativeVinylCover album={album} className="w-full h-full" />
                  )}

                  {/* Mylar Poly-Sleeve Gloss Highlight */}
                  <div className="absolute inset-0 vinyl-sleeve-gloss pointer-events-none" />

                  {/* Bottom Catalog Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                    <span className="font-mono text-[10px] text-text-offwhite bg-panel-obsidian/90 backdrop-blur-md px-2 py-0.5 rounded border border-border-subtle">
                      {matrixCode}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-amber-400 bg-panel-obsidian/90 backdrop-blur-md px-2 py-0.5 rounded border border-amber-500/40">
                      SCORE: {scoreDisplay}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Audiophile Pressing Specifications Bar */}
              <div className="grid grid-cols-3 gap-1.5 p-2 rounded-lg bg-panel-obsidian border border-border-subtle font-mono text-[9px] text-center">
                <div className="p-1 rounded bg-panel-elevated">
                  <span className="text-text-dim block">WEIGHT</span>
                  <span className="text-amber-400 font-bold block">180g VIRGIN</span>
                </div>
                <div className="p-1 rounded bg-panel-elevated">
                  <span className="text-text-dim block">MASTERING</span>
                  <span className="text-purple-soft font-bold block">HALF-SPEED</span>
                </div>
                <div className="p-1 rounded bg-panel-elevated">
                  <span className="text-text-dim block">DYNAMIC RANGE</span>
                  <span className="text-electric-blue font-bold block">DR-14 dB</span>
                </div>
              </div>

              {/* 3. Title, Artist, Release Year, Record Label */}
              <div className="space-y-1.5">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-text-offwhite leading-tight font-sans">
                    {album.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 text-sm text-text-muted font-sans flex-wrap">
                    <span className="text-text-offwhite font-medium">{album.artist}</span>
                    <span>&middot;</span>
                    <span className="font-mono text-xs">{album.releaseYear}</span>
                    {album.label && (
                      <>
                        <span>&middot;</span>
                        <span className="font-mono text-xs text-text-dim truncate max-w-[140px]">
                          {album.label}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Genre Pill Tags */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 font-mono text-[11px]">
                  {album.genres.map((genre, idx) => (
                    <span
                      key={genre}
                      className={`px-2 py-0.5 rounded-full flex-shrink-0 ${
                        idx === 0
                          ? 'bg-purple-soft/10 border border-purple-soft/30 text-purple-soft'
                          : 'bg-panel-elevated border border-border-light text-text-offwhite'
                      }`}
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. Lateral Drift Reason Quote Callout */}
              <div className="p-3.5 rounded-lg bg-panel-obsidian border border-border-subtle space-y-1 relative">
                <div className="flex items-center gap-1.5 text-amber-500 font-mono text-[10px] font-bold uppercase tracking-wider">
                  <Radio className="w-3 h-3" />
                  <span>LATERAL DRIFT TRAJECTORY</span>
                </div>
                <p className="text-xs text-text-offwhite/90 leading-relaxed italic font-sans pt-0.5">
                  &ldquo;{album.driftReason}&rdquo;
                </p>
              </div>

              {/* 5. External Listening Action Row */}
              <ExternalLinks album={album} />

              {/* Single Replacement Action */}
              <button
                onClick={() => onReplaceAlbum(album.id)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-panel-obsidian hover:bg-panel-elevated text-text-muted hover:text-text-offwhite text-xs font-mono border border-border-subtle hover:border-border-light transition-all shadow-sm active:scale-98"
              >
                <RefreshCw className="w-3.5 h-3.5 text-electric-blue" />
                <span>EJECT &amp; REPLACE IN CRATE (10)</span>
              </button>

              {/* Audio Error Banner if any */}
              {error && (
                <p className="text-[11px] font-mono text-red-400 bg-red-950/20 p-2.5 rounded border border-red-900/30">
                  {error}
                </p>
              )}

              {/* 6. Master Tape Tracklist Cue Sheet */}
              <Tracklist
                tracks={tracks}
                currentTrackId={currentTrackId}
                isPlaying={isPlaying}
                progress={progress}
                onPlayTrack={playTrack}
              />

              {/* Jump to Test Table Button */}
              <button
                onClick={() => onSwitchTable?.('test')}
                className="w-full py-2.5 px-3 rounded-lg bg-panel-elevated border border-amber-500/40 hover:border-amber-500 text-amber-400 font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-sm group"
              >
                <Sliders className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                <span>OPEN IN MUSIC TEST TABLE // EVALUATE &amp; RATE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {/* ================================================================ */}
          {/* VIEW 2: MUSIC TEST TABLE (Phono Attenuator, Sonic Tags, Telemetry) */}
          {/* ================================================================ */}
          {tableMode === 'test' && (
            <>
              {/* Test Bench Header & Mini Album Pill */}
              <div className="p-3.5 rounded-xl bg-panel-obsidian border border-border-subtle flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-border-light flex-shrink-0 bg-neutral-950 relative">
                    {album.coverArtUrl ? (
                      <img src={album.coverArtUrl} alt={album.title} className="w-full h-full object-cover" />
                    ) : (
                      <GenerativeVinylCover album={album} className="w-full h-full" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[9px] text-amber-500 uppercase tracking-wider block font-bold">
                      TEST SPECIMEN
                    </span>
                    <h3 className="font-sans font-bold text-sm text-text-offwhite truncate">
                      {album.title}
                    </h3>
                    <p className="font-sans text-xs text-text-muted truncate">
                      {album.artist} &middot; <span className="font-mono text-[10px]">{album.releaseYear}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="font-mono text-[9px] text-text-dim block">BENCH SCORE</span>
                  <span className="font-mono text-sm font-bold text-amber-400">
                    {scoreDisplay}
                  </span>
                </div>
              </div>

              {/* 1. Rating Control Box: RATE TO SHIFT ALGORITHM */}
              <RatingWidget
                albumTitle={album.title}
                currentRating={currentRating}
                onRate={(score, tag) => onRateAlbum(album.id, score, tag)}
              />

              {/* 2. Real-Time Acoustic Telemetry Gauges */}
              <div className="p-3.5 rounded-xl bg-panel-obsidian border border-border-subtle space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-amber-500" />
                    <span className="font-mono text-[10px] font-bold text-text-offwhite uppercase tracking-wider">
                      ACOUSTIC TELEMETRY GAUGES
                    </span>
                  </div>
                  <span className="font-mono text-[8px] text-text-dim">CALIBRATED RIAA</span>
                </div>

                <div className="space-y-2 pt-1 font-mono text-[10px]">
                  {acousticMeters.map((meter) => (
                    <div key={meter.label} className="space-y-1">
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="text-text-muted">{meter.label}</span>
                        <span className={`${meter.color} font-bold`}>{meter.db}</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-border-subtle">
                        <div
                          className={`h-full ${meter.barColor} transition-all duration-500 rounded-full`}
                          style={{ width: `${meter.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Lateral Drift Recommendation Trajectory Rules */}
              <div className="p-3.5 rounded-xl bg-panel-obsidian border border-border-subtle space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-purple-soft font-bold uppercase tracking-wider text-[10px]">
                    <Zap className="w-3.5 h-3.5 text-purple-soft" />
                    <span>DRIFT VECTOR SHIFT RULES</span>
                  </div>
                  <span className="text-amber-400 font-bold text-[9px]">+4.2σ BIAS</span>
                </div>

                <div className="space-y-1.5 text-[10px] text-text-muted font-sans leading-relaxed pt-1">
                  <div className="p-2 rounded bg-panel-elevated border border-border-subtle">
                    <span className="font-mono text-purple-soft font-bold block">SCORE &ge; 7.0 (LATERAL EXPLORATION)</span>
                    <span className="text-text-offwhite/90 text-[10px]">
                      Engine locks onto texture, pacing, and mood, intentionally pivoting to an unexpected genre.
                    </span>
                  </div>
                  <div className="p-2 rounded bg-panel-elevated border border-border-subtle">
                    <span className="font-mono text-amber-500 font-bold block">SCORE &lt; 5.0 (VECTOR DIVERGENCE)</span>
                    <span className="text-text-offwhite/90 text-[10px]">
                      Engine downweights both this genre and its acoustic signature, shifting discovery away.
                    </span>
                  </div>
                </div>
              </div>

              {/* Jump to Info Table Button */}
              <button
                onClick={() => onSwitchTable?.('info')}
                className="w-full py-2.5 px-3 rounded-lg bg-panel-elevated border border-electric-blue/40 hover:border-electric-blue text-electric-blue font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-sm group"
              >
                <BookOpen className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>VIEW GATEFOLD JACKET &amp; MASTER TRACKLIST</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

