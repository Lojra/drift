import React from 'react';
import { ExternalLink, Play, Disc } from 'lucide-react';
import { Album } from '../../types/music';
import { sanitizeExternalUrl } from '../../utils/sanitizeUrl';

interface ExternalLinksProps {
  album: Album;
}

export const ExternalLinks: React.FC<ExternalLinksProps> = ({ album }) => {
  const safeSpotify = sanitizeExternalUrl(album.spotifyUrl);
  const safeYoutube = sanitizeExternalUrl(album.youtubeUrl);
  const safeYoutubeMusic = album.youtubeMusicUrl ? sanitizeExternalUrl(album.youtubeMusicUrl) : null;

  return (
    <div className="space-y-2 select-none">
      <div className="grid grid-cols-2 gap-2.5">
        {/* Listen on Spotify */}
        <a
          href={safeSpotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-panel-elevated hover:bg-panel-hover border border-border-light hover:border-text-muted text-xs font-medium text-text-offwhite transition-all group"
        >
          <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-text-offwhite transition-colors" strokeWidth={1.8} />
          <span className="truncate">Listen on Spotify</span>
        </a>

        {/* Listen on YouTube */}
        <a
          href={safeYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-panel-elevated hover:bg-panel-hover border border-border-light hover:border-text-muted text-xs font-medium text-text-offwhite transition-all group"
        >
          <Play className="w-3.5 h-3.5 text-text-muted group-hover:text-text-offwhite transition-colors fill-current" strokeWidth={1.5} />
          <span className="truncate">Listen on YouTube</span>
        </a>
      </div>

      {/* Optional YouTube Music Link */}
      {safeYoutubeMusic && safeYoutubeMusic !== '#' && (
        <a
          href={safeYoutubeMusic}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-md bg-panel-obsidian hover:bg-panel-elevated border border-border-subtle hover:border-border-light text-[11px] font-mono text-text-muted hover:text-text-offwhite transition-all"
        >
          <Disc className="w-3 h-3 text-purple-soft" />
          <span>Open in YouTube Music</span>
        </a>
      )}
    </div>
  );
};
