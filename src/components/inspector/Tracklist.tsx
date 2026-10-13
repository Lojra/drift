import React from 'react';
import { Pause } from 'lucide-react';
import { Track } from '../../types/music';

interface TracklistProps {
  tracks: Track[];
  currentTrackId: string | null;
  isPlaying: boolean;
  progress: number;
  onPlayTrack: (trackId: string, previewUrl: string | null) => void;
}

function formatDuration(ms: number | null): string {
  if (!ms) return '--:--';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export const Tracklist: React.FC<TracklistProps> = ({
  tracks,
  currentTrackId,
  isPlaying,
  progress: _progress,
  onPlayTrack
}) => {
  if (tracks.length === 0) {
    return (
      <div className="py-4 text-center text-xs font-mono text-text-dim">
        Tracklist unavailable for this catalog entry
      </div>
    );
  }

  // Calculate total duration in mm:ss
  const totalMs = tracks.reduce((acc, t) => acc + (t.durationMs || 0), 0);
  const totalDurationStr = totalMs > 0 ? formatDuration(totalMs) : `${tracks.length} tracks`;

  return (
    <div className="space-y-2.5 pt-1 pb-6 select-none">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim">
          Tracklist Composition
        </span>
        <span className="font-mono text-[10px] text-text-dim">
          {tracks.length} TRACKS &middot; {totalDurationStr}
        </span>
      </div>

      <div className="space-y-1 font-mono text-xs">
        {tracks.map((track, idx) => {
          const isThisTrack = currentTrackId === track.id;
          const isTrackPlaying = isThisTrack && isPlaying;
          const hasPreview = !!track.previewUrl;
          const trackNumStr = String(track.trackNumber || idx + 1).padStart(2, '0');

          return (
            <div
              key={track.id || idx}
              onClick={() => {
                if (hasPreview) {
                  onPlayTrack(track.id, track.previewUrl);
                }
              }}
              className={`flex items-center justify-between p-2 rounded transition-colors border ${
                isTrackPlaying
                  ? 'bg-panel-elevated/80 border-border-light text-electric-blue'
                  : isThisTrack
                  ? 'bg-panel-elevated border-border-subtle text-electric-blue'
                  : 'hover:bg-panel-elevated border-transparent hover:border-border-subtle text-text-offwhite'
              } ${hasPreview ? 'cursor-pointer group' : 'opacity-70'}`}
            >
              <div className="flex items-center gap-3 truncate mr-2">
                {/* Number / Play Indicator */}
                <div className="w-5 flex-shrink-0 text-center font-mono text-[11px]">
                  {hasPreview ? (
                    <button
                      type="button"
                      className="flex items-center justify-center w-full"
                    >
                      {isTrackPlaying ? (
                        <Pause className="w-3.5 h-3.5 text-electric-blue fill-current" />
                      ) : (
                        <span className="text-text-dim group-hover:text-purple-soft transition-colors">
                          {trackNumStr}
                        </span>
                      )}
                    </button>
                  ) : (
                    <span className="text-text-dim">{trackNumStr}</span>
                  )}
                </div>

                {/* Title */}
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={`font-sans text-xs truncate ${
                      isTrackPlaying
                        ? 'text-electric-blue font-semibold'
                        : isThisTrack
                        ? 'text-electric-blue font-medium'
                        : 'text-text-offwhite group-hover:text-electric-blue transition-colors font-medium'
                    }`}
                  >
                    {track.title}
                  </span>
                  {isTrackPlaying && (
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-ping flex-shrink-0" />
                  )}
                </div>
              </div>

              {/* Duration & 30s pill */}
              <div className="flex items-center gap-2 flex-shrink-0 font-mono text-[11px] text-text-dim">
                {hasPreview && (
                  <span className="text-[9px] text-purple-soft/80 px-1 py-0.2 rounded bg-purple-soft/10 border border-purple-soft/20">
                    30s
                  </span>
                )}
                <span className={isTrackPlaying ? 'text-electric-blue font-semibold' : ''}>
                  {formatDuration(track.durationMs)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
