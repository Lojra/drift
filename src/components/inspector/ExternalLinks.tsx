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
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-[#16161C] hover:bg-[#1E1E24] border border-white/10 hover:border-white/20 text-xs font-medium text-[#F5F4F0] transition-all group"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#9C9A94] group-hover:text-[#F5F4F0] transition-colors" strokeWidth={1.8} />
          <span className="truncate">Listen on Spotify</span>
        </a>

        {/* Listen on YouTube */}
        <a
          href={safeYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-[#16161C] hover:bg-[#1E1E24] border border-white/10 hover:border-white/20 text-xs font-medium text-[#F5F4F0] transition-all group"
        >
          <Play className="w-3.5 h-3.5 text-[#9C9A94] group-hover:text-[#F5F4F0] transition-colors fill-current" strokeWidth={1.5} />
          <span className="truncate">Listen on YouTube</span>
        </a>
      </div>

      {/* Optional YouTube Music Link */}
      {safeYoutubeMusic && safeYoutubeMusic !== '#' && (
        <a
          href={safeYoutubeMusic}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-md bg-[#111114] hover:bg-[#16161C] border border-white/5 hover:border-white/15 text-[11px] font-mono text-[#9C9A94] hover:text-[#F5F4F0] transition-all"
        >
          <Disc className="w-3 h-3 text-[#D97706]" />
          <span>Open in YouTube Music</span>
        </a>
      )}
    </div>
  );
};
