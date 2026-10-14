import React from 'react';
import { X, RefreshCw, Radio } from 'lucide-react';
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
}

export const InspectorDrawer: React.FC<InspectorDrawerProps> = ({
  album,
  currentRating,
  onClose,
  onRateAlbum,
  onReplaceAlbum
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
    fetchTracksForAlbum(album).then(loadedTracks => {
      if (isCurrent) {
        setTracks(loadedTracks);
      }
    });
    return () => { isCurrent = false; };
  }, [album?.id]);

  if (!album) return null;

  const catalogId = (album.mbid ? album.mbid.slice(0, 8) : album.id.slice(0, 8)).toUpperCase();
  const matrixCode = `DRIFT-LP-${catalogId}-DR14`;
  const scoreDisplay = currentRating ? currentRating.score.toFixed(1) : 'UNRATED';

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
        <div className="px-5 py-3.5 border-b border-border-subtle flex items-center justify-between bg-panel-obsidian sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#F59E0B] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-offwhite font-bold">
              GATEFOLD INSPECTOR
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

        <div className="p-5 space-y-5">
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

          {/* 6. Rating Control Box: RATE TO SHIFT ALGORITHM */}
          <RatingWidget
            albumTitle={album.title}
            currentRating={currentRating}
            onRate={(score, tag) => onRateAlbum(album.id, score, tag)}
          />

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

          {/* 7. Master Tape Tracklist Cue Sheet */}
          <Tracklist
            tracks={tracks}
            currentTrackId={currentTrackId}
            isPlaying={isPlaying}
            progress={progress}
            onPlayTrack={playTrack}
          />
        </div>
      </aside>
    </>
  );
};
