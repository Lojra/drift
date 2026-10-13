import React, { useState } from 'react';
import { Album, AlbumRating } from '../../types/music';
import { Disc3 } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
  rating?: AlbumRating;
  isSelected: boolean;
  onSelect: (album: Album) => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({
  album,
  rating,
  isSelected,
  onSelect
}) => {
  const [imgError, setImgError] = useState(false);
  const primaryGenre = album.genres && album.genres.length > 0 ? album.genres.slice(0, 2).join(' / ') : 'Lateral Audio';

  return (
    <div
      onClick={() => onSelect(album)}
      className={`album-card group relative p-2.5 xl:p-3 rounded-lg cursor-pointer transition-all duration-200 select-none flex flex-col justify-between h-full min-h-0 overflow-hidden ${
        isSelected
          ? 'bg-panel-elevated border-2 border-electric-blue shadow-[0_0_20px_rgba(59,130,246,0.15)]'
          : 'bg-panel-obsidian border border-border-subtle hover:border-border-light hover:bg-panel-elevated'
      }`}
    >
      {/* Top Half: Cover Image + Metadata */}
      <div className="flex-1 min-h-0 flex flex-col">
        {/* Cover Art Wrapper with flex-1 min-h-0 so all 10 albums fit viewport without scrolling */}
        <div className="relative flex-1 min-h-0 w-full rounded-[6px] overflow-hidden bg-panel-elevated mb-2 flex items-center justify-center">
          {!imgError && album.coverArtUrl ? (
            <img
              src={album.coverArtUrl}
              alt={`${album.title} by ${album.artist}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-panel-elevated to-panel-obsidian text-text-muted/40">
              <Disc3 className="w-10 h-10 group-hover:text-electric-blue/60 transition-colors" strokeWidth={1.2} />
            </div>
          )}

          {/* Top-Right Score Badge: Purple if rated, Muted UNRATED if unrated */}
          {rating ? (
            <div className="absolute top-1.5 right-1.5 font-mono text-[10px] xl:text-[11px] font-bold px-1.5 py-0.5 rounded bg-panel-obsidian/90 border border-purple-soft/40 text-purple-soft shadow-sm">
              {rating.score.toFixed(1)}
            </div>
          ) : (
            <div className="absolute top-1.5 right-1.5 font-mono text-[9px] xl:text-[10px] font-medium px-1.5 py-0.5 rounded bg-panel-obsidian/90 border border-border-light text-text-muted">
              UNRATED
            </div>
          )}

          {/* Bottom-Left ACTIVE Badge if currently selected */}
          {isSelected && (
            <div className="absolute bottom-1.5 left-1.5 font-mono text-[9px] xl:text-[10px] px-1.5 py-0.5 rounded bg-electric-blue text-white font-bold tracking-wider shadow-sm">
              ACTIVE
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="space-y-0.5 flex-shrink-0">
          <h3
            className="font-semibold text-xs text-text-offwhite truncate leading-snug group-hover:text-electric-blue transition-colors"
            title={album.title}
          >
            {album.title}
          </h3>
          <p className="font-sans text-[10px] xl:text-[11px] text-text-muted truncate">
            {album.artist} &middot; <span className="font-mono">{album.releaseYear}</span>
          </p>
          <div className="pt-0.5">
            <span className="inline-block font-mono text-[9px] xl:text-[10px] text-text-muted border border-border-light px-1.5 py-0.2 rounded truncate max-w-full">
              {primaryGenre}
            </span>
          </div>
        </div>
      </div>

      {/* Lateral Drift Reason */}
      <div className="pt-1.5 mt-1.5 border-t border-border-subtle/40 flex-shrink-0">
        <p
          className="text-[9px] xl:text-[10px] italic text-text-dim leading-tight truncate group-hover:text-text-muted transition-colors"
          title={album.driftReason}
        >
          {album.driftReason}
        </p>
      </div>
    </div>
  );
};
