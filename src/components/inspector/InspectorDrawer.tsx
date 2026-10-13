import React from 'react';
import { X, RefreshCw } from 'lucide-react';
import { Album, AlbumRating, SonicTag } from '../../types/music';
import { RatingWidget } from './RatingWidget';
import { ExternalLinks } from './ExternalLinks';
import { Tracklist } from './Tracklist';
import { useAudioPreview } from '../../hooks/useAudioPreview';

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

  React.useEffect(() => {
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
  const scoreDisplay = currentRating ? currentRating.score.toFixed(1) : 'UNRATED';

  return (
    <aside className="w-[380px] flex-shrink-0 bg-panel-obsidian border-l border-border-subtle flex flex-col h-screen z-20 overflow-y-auto select-none">
      {/* Top Inspector Header */}
      <div className="px-5 py-3.5 border-b border-border-subtle flex items-center justify-between bg-panel-obsidian sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim">
            Album Inspector
          </span>
          <span className="font-mono text-[10px] text-text-muted bg-panel-elevated px-1.5 py-0.5 rounded border border-border-subtle">
            ID #{album.id.slice(-5)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-electric-blue"></span>
          <span className="font-mono text-[11px] text-electric-blue font-semibold">
            Active Selection
          </span>
          <button
            onClick={() => {
              stop();
              onClose();
            }}
            className="p-1 rounded hover:bg-panel-elevated text-text-dim hover:text-text-offwhite ml-1.5 transition-colors"
            title="Close inspector drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* 1. Large Square Album Cover Art with Gradient & Monospace Badges */}
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-panel-elevated border border-border-light shadow-2xl group">
          <img
            src={album.coverArtUrl}
            alt={`${album.title} by ${album.artist}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel-obsidian/85 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="font-mono text-[11px] text-text-offwhite/90 bg-panel-obsidian/80 backdrop-blur-md px-2 py-1 rounded border border-border-subtle">
              Cat: {catalogId}
            </span>
            <span className="font-mono text-[11px] font-bold text-purple-soft bg-panel-obsidian/80 backdrop-blur-md px-2 py-1 rounded border border-purple-soft/30">
              Score: {scoreDisplay}
            </span>
          </div>
        </div>

        {/* 2. Album Title, Artist, Release Year, Record Label */}
        <div className="space-y-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-text-offwhite leading-tight">
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

          {/* Horizontal Genre / Style Pill Tags in Monospace */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 font-mono text-[11px]">
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

        {/* 3. Lateral Drift Reason Quote Callout */}
        <div className="p-3.5 rounded-lg bg-panel-elevated border border-border-subtle space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-purple-soft font-semibold">
            Drift Trajectory
          </span>
          <p className="text-xs text-text-offwhite/90 leading-relaxed italic">
            "{album.driftReason}"
          </p>
        </div>

        {/* 4. External Listening Action Row */}
        <ExternalLinks album={album} />

        {/* 5. Rating Control Box: RATE TO SHIFT ALGORITHM */}
        <RatingWidget
          albumTitle={album.title}
          currentRating={currentRating}
          onRate={(score, tag) => onRateAlbum(album.id, score, tag)}
        />

        {/* Single Replacement Action */}
        <button
          onClick={() => onReplaceAlbum(album.id)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-panel-obsidian hover:bg-panel-elevated text-text-muted hover:text-text-offwhite text-xs font-mono border border-border-subtle hover:border-border-light transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-electric-blue" />
          <span>Replace This Album in Crate</span>
        </button>

        {/* Audio Error Banner if any */}
        {error && (
          <p className="text-[11px] font-mono text-red-400 bg-red-950/20 p-2.5 rounded border border-red-900/30">
            {error}
          </p>
        )}

        {/* 6. Tracklist Section with 30-Second Previews */}
        <Tracklist
          tracks={tracks}
          currentTrackId={currentTrackId}
          isPlaying={isPlaying}
          progress={progress}
          onPlayTrack={playTrack}
        />
      </div>
    </aside>
  );
};
