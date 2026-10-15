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
      <div className="py-4 text-center text-xs font-mono text-[#575550]">
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
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#9C9A94]">
          Tracklist Composition
        </span>
        <span className="font-mono text-[10px] text-[#575550]">
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
                  ? 'bg-[#181822] border-[#D97706]/40 text-[#D97706]'
                  : isThisTrack
                  ? 'bg-[#16161C] border-white/10 text-[#D97706]'
                  : 'hover:bg-[#16161C] border-transparent hover:border-white/5 text-[#F5F4F0]'
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
                        <Pause className="w-3.5 h-3.5 text-[#D97706] fill-current" />
                      ) : (
                        <span className="text-[#575550] group-hover:text-[#D97706] transition-colors">
                          {trackNumStr}
                        </span>
                      )}
                    </button>
                  ) : (
                    <span className="text-[#575550]">{trackNumStr}</span>
                  )}
                </div>

                {/* Title */}
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={`font-sans text-xs truncate ${
                      isTrackPlaying
                        ? 'text-[#D97706] font-semibold'
                        : isThisTrack
                        ? 'text-[#D97706] font-medium'
                        : 'text-[#F5F4F0] group-hover:text-[#D97706] transition-colors font-medium'
                    }`}
                  >
                    {track.title}
                  </span>
                  {isTrackPlaying && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-ping flex-shrink-0" />
                  )}
                </div>
              </div>

              {/* Duration & 30s pill */}
              <div className="flex items-center gap-2 flex-shrink-0 font-mono text-[11px] text-[#575550]">
                {hasPreview && (
                  <span className="text-[9px] text-[#D97706] px-1 py-0.2 rounded bg-[#D97706]/10 border border-[#D97706]/20">
                    30s
                  </span>
                )}
                <span className={isTrackPlaying ? 'text-[#D97706] font-semibold' : ''}>
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
