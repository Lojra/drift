import React from 'react';
import { X, RefreshCw, Radio, FileText, Sliders, Cpu, Zap, ArrowRight } from 'lucide-react';
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
    { label: 'SUB-BASS PRESSURE', value: (traits.percussive ?? 0.88) * 100, db: '+3.2 dB', color: 'text-[#F5F4F0]', barColor: 'bg-[#D97706]' },
    { label: 'ORGANIC SATURATION', value: (traits.distortion ?? 0.82) * 100, db: '12AX7 TUBE', color: 'text-[#D97706]', barColor: 'bg-[#D97706]' },
    { label: 'DYNAMIC TRANSIENTS', value: (traits.energy ?? 0.85) * 100, db: 'DR-14 dB', color: 'text-[#F5F4F0]', barColor: 'bg-white/40' },
    { label: 'STEREO DIFFUSION', value: (traits.atmospheric ?? 0.76) * 100, db: 'BLUMLEIN', color: 'text-[#9C9A94]', barColor: 'bg-[#9C9A94]' },
    { label: 'HYPNOTIC PACING', value: (traits.hypnotic ?? 0.70) * 100, db: '120 BPM', color: 'text-[#D97706]', barColor: 'bg-[#D97706]/70' },
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

      <aside className="fixed bottom-0 inset-x-0 max-h-[92vh] rounded-t-[28px] border-t border-[rgba(245,244,240,0.12)] bg-[#0C0C10] z-50 overflow-y-auto select-none shadow-[0_-16px_50px_rgba(0,0,0,0.9)] md:relative md:inset-x-auto md:bottom-auto md:w-[390px] xl:w-[420px] md:rounded-none md:border-t-0 md:border-l md:border-[rgba(245,244,240,0.08)] md:max-h-none md:h-screen md:z-20 flex flex-col flex-shrink-0 animate-slide-up md:animate-none relative">
        {/* Mobile Swipe/Drag Handle Pill */}
        <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mt-3 mb-1 md:hidden flex-shrink-0 shadow-sm" />

        {/* Top Inspector Header */}
        <div className="px-5 py-3 border-b border-[rgba(245,244,240,0.08)] flex items-center justify-between bg-[#111114] sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D97706] shadow-[0_0_8px_#D97706] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#F5F4F0] font-bold">
              {tableMode === 'info' ? 'GATEFOLD INSPECTOR' : 'PHONO TEST TABLE'}
            </span>
            <span className="font-mono text-[9px] text-[#9C9A94] bg-[#16161C] px-1.5 py-0.5 rounded border border-white/5">
              #{catalogId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#D97706] font-semibold hidden sm:inline">
              180g VIRGIN WAX
            </span>
            <button
              onClick={() => {
                stop();
                onClose();
              }}
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-[#16161C] text-[#9C9A94] hover:text-[#F5F4F0] ml-1.5 transition-colors border border-white/5"
              title="Close inspector drawer"
              aria-label="Close inspector drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dual Table Switcher Bar */}
        <div className="px-5 py-2.5 bg-[#111114]/95 border-b border-[rgba(245,244,240,0.08)] sticky top-[53px] z-20 backdrop-blur-md">
          <div className="flex items-center gap-1.5 p-1 bg-[#09090B] border border-white/10 rounded-lg">
            <button
              onClick={() => onSwitchTable?.('info')}
              className={`flex-1 py-1.5 px-2.5 rounded-md font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                tableMode === 'info'
                  ? 'bg-[#18181D] text-[#F5F4F0] shadow-md border border-white/20'
                  : 'text-[#9C9A94] hover:text-[#F5F4F0]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>MUSIC INFO TABLE</span>
            </button>
            <button
              onClick={() => onSwitchTable?.('test')}
              className={`flex-1 py-1.5 px-2.5 rounded-md font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                tableMode === 'test'
                  ? 'bg-[#18181D] text-[#D97706] shadow-md border border-[#D97706]/40'
                  : 'text-[#9C9A94] hover:text-[#F5F4F0]'
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
                  <div className="w-16 h-16 rounded-full bg-[#E5E3DC] border-2 border-neutral-900 flex flex-col items-center justify-center p-1 text-center shadow-inner text-black">
                    <span className="font-mono text-[7px] font-extrabold uppercase leading-none">
                      DRIFT
                    </span>
                    <span className="font-mono text-[6px] text-black/80 font-bold leading-tight mt-0.5">
                      SIDE A // 33 RPM
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#D97706] mt-1" />
                  </div>
                </div>

                {/* Pulsing loading skeleton */}
                {!imgLoaded && !imgError && album.coverArtUrl && (
                  <div className="absolute inset-0 bg-[#16161C] animate-pulse flex items-center justify-center z-10">
                    <div className="w-8 h-8 rounded-full border border-white/20 border-t-[#D97706] animate-spin" />
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
                    <span className="font-mono text-[10px] text-[#F5F4F0] bg-black/90 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                      {matrixCode}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#D97706] bg-black/90 backdrop-blur-md px-2 py-0.5 rounded border border-[#D97706]/40">
                      SCORE: {scoreDisplay}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Audiophile Pressing Specifications Bar */}
              <div className="grid grid-cols-3 gap-1.5 p-2 rounded-lg bg-[#111114] border border-[rgba(245,244,240,0.08)] font-mono text-[9px] text-center">
                <div className="p-1 rounded bg-[#16161C]">
                  <span className="text-[#9C9A94] block">WEIGHT</span>
                  <span className="text-[#D97706] font-bold block">180g VIRGIN</span>
                </div>
                <div className="p-1 rounded bg-[#16161C]">
                  <span className="text-[#9C9A94] block">MASTERING</span>
                  <span className="text-[#F5F4F0] font-bold block">HALF-SPEED</span>
                </div>
                <div className="p-1 rounded bg-[#16161C]">
                  <span className="text-[#9C9A94] block">DYNAMIC RANGE</span>
                  <span className="text-[#F5F4F0] font-bold block">DR-14 dB</span>
                </div>
              </div>

              {/* 3. Title, Artist, Release Year, Record Label */}
              <div className="space-y-1.5">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-[#F5F4F0] leading-tight font-sans">
                    {album.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 text-sm text-[#9C9A94] font-sans flex-wrap">
                    <span className="text-[#F5F4F0] font-medium">{album.artist}</span>
                    <span>&middot;</span>
                    <span className="font-mono text-xs">{album.releaseYear}</span>
                    {album.label && (
                      <>
                        <span>&middot;</span>
                        <span className="font-mono text-xs text-[#575550] truncate max-w-[140px]">
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
                          ? 'bg-[#D97706]/10 border border-[#D97706]/30 text-[#D97706]'
                          : 'bg-[#16161C] border border-white/5 text-[#F5F4F0]'
                      }`}
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. Lateral Drift Reason Quote Callout */}
              <div className="p-3.5 rounded-lg bg-[#111114] border border-[rgba(245,244,240,0.08)] space-y-1 relative">
                <div className="flex items-center gap-1.5 text-[#D97706] font-mono text-[10px] font-bold uppercase tracking-wider">
                  <Radio className="w-3 h-3" />
                  <span>LATERAL DRIFT TRAJECTORY</span>
                </div>
                <p className="text-xs text-[#F5F4F0]/90 leading-relaxed italic font-sans pt-0.5">
                  &ldquo;{album.driftReason}&rdquo;
                </p>
              </div>

              {/* 5. External Listening Action Row */}
              <ExternalLinks album={album} />

              {/* Single Replacement Action */}
              <button
                onClick={() => onReplaceAlbum(album.id)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#111114] hover:bg-[#16161C] text-[#9C9A94] hover:text-[#F5F4F0] text-xs font-mono border border-white/5 hover:border-white/15 transition-all shadow-sm active:scale-98"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#D97706]" />
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
                className="w-full py-2.5 px-3 rounded-lg bg-[#16161C] border border-[#D97706]/40 hover:border-[#D97706] text-[#D97706] font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-sm group"
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
              <div className="p-3.5 rounded-xl bg-[#111114] border border-[rgba(245,244,240,0.08)] flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-neutral-950 relative">
                    {album.coverArtUrl ? (
                      <img src={album.coverArtUrl} alt={album.title} className="w-full h-full object-cover" />
                    ) : (
                      <GenerativeVinylCover album={album} className="w-full h-full" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[9px] text-[#D97706] uppercase tracking-wider block font-bold">
                      TEST SPECIMEN
                    </span>
                    <h3 className="font-sans font-bold text-sm text-[#F5F4F0] truncate">
                      {album.title}
                    </h3>
                    <p className="font-sans text-xs text-[#9C9A94] truncate">
                      {album.artist} &middot; <span className="font-mono text-[10px]">{album.releaseYear}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="font-mono text-[9px] text-[#575550] block">BENCH SCORE</span>
                  <span className="font-mono text-sm font-bold text-[#D97706]">
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
              <div className="p-3.5 rounded-xl bg-[#111114] border border-[rgba(245,244,240,0.08)] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#D97706]" />
                    <span className="font-mono text-[10px] font-bold text-[#F5F4F0] uppercase tracking-wider">
                      ACOUSTIC TELEMETRY GAUGES
                    </span>
                  </div>
                  <span className="font-mono text-[8px] text-[#575550]">CALIBRATED RIAA</span>
                </div>

                <div className="space-y-2 pt-1 font-mono text-[10px]">
                  {acousticMeters.map((meter) => (
                    <div key={meter.label} className="space-y-1">
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="text-[#9C9A94]">{meter.label}</span>
                        <span className={`${meter.color} font-bold`}>{meter.db}</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-[rgba(245,244,240,0.08)]">
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
              <div className="p-3.5 rounded-xl bg-[#111114] border border-[rgba(245,244,240,0.08)] space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#D97706] font-bold uppercase tracking-wider text-[10px]">
                    <Zap className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>DRIFT VECTOR SHIFT RULES</span>
                  </div>
                  <span className="text-[#D97706] font-bold text-[9px]">+4.2σ BIAS</span>
                </div>

                <div className="space-y-1.5 text-[10px] text-[#9C9A94] font-sans leading-relaxed pt-1">
                  <div className="p-2 rounded bg-[#16161C] border border-white/5">
                    <span className="font-mono text-[#D97706] font-bold block">SCORE &ge; 7.0 (LATERAL EXPLORATION)</span>
                    <span className="text-[#F5F4F0]/90 text-[10px]">
                      Engine locks onto texture, pacing, and mood, intentionally pivoting to an unexpected genre.
                    </span>
                  </div>
                  <div className="p-2 rounded bg-[#16161C] border border-white/5">
                    <span className="font-mono text-[#9C9A94] font-bold block">SCORE &lt; 5.0 (VECTOR DIVERGENCE)</span>
                    <span className="text-[#F5F4F0]/90 text-[10px]">
                      Engine downweights both this genre and its acoustic signature, shifting discovery away.
                    </span>
                  </div>
                </div>
              </div>

              {/* Jump to Info Table Button */}
              <button
                onClick={() => onSwitchTable?.('info')}
                className="w-full py-2.5 px-3 rounded-lg bg-[#16161C] border border-white/10 hover:border-white/20 text-[#F5F4F0] font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-sm group"
              >
                <FileText className="w-3.5 h-3.5 group-hover:scale-110 transition-transform text-[#D97706]" />
                <span>VIEW GATEFOLD JACKET &amp; MASTER TRACKLIST</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
};
