import React, { useState } from 'react';
import { Album, AlbumRating } from '../../types/music';
import { GenerativeVinylCover } from './GenerativeVinylCover';

interface AlbumCardProps {
  album: Album;
  rating?: AlbumRating;
  isSelected: boolean;
  onSelect: (album: Album) => void;
  index?: number;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({
  album,
  rating,
  isSelected,
  onSelect,
  index = 0
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const primaryGenre = album.genres && album.genres.length > 0 ? album.genres.slice(0, 2).join(' / ') : 'Lateral Audio';

  return (
    <div
      onClick={() => onSelect(album)}
      style={{ animationDelay: `${index * 45}ms` }}
      className={`album-card group relative p-2.5 xl:p-3 rounded-lg cursor-pointer transition-all duration-300 select-none flex flex-col justify-between h-auto lg:h-full min-h-0 overflow-visible active:scale-[0.98] animate-crate-entrance hover:-translate-y-1 ${
        isSelected
          ? 'bg-panel-elevated border-2 border-electric-blue shadow-[0_0_24px_rgba(59,130,246,0.22)]'
          : 'bg-panel-obsidian border border-border-subtle hover:border-electric-blue/40 hover:bg-panel-elevated hover:shadow-xl'
      }`}
    >
      {/* Top Half: Cover Image + Metadata */}
      <div className="lg:flex-1 lg:min-h-0 flex flex-col relative">
        {/* Cover Art Wrapper: Square on mobile, flexible on desktop */}
        <div className="relative w-full aspect-square lg:aspect-auto lg:flex-1 lg:min-h-0 rounded-[6px] overflow-hidden bg-panel-elevated mb-2 flex items-center justify-center z-10 shadow-md">
          {/* Pulsing loading skeleton */}
          {!imgLoaded && !imgError && album.coverArtUrl && (
            <div className="absolute inset-0 bg-panel-elevated animate-pulse flex items-center justify-center z-10">
              <div className="w-6 h-6 rounded-full border border-border-light/40 border-t-electric-blue animate-spin" />
            </div>
          )}

          {/* 100% Guaranteed Cover Art: Real Image or Procedural SVG Graphic Vinyl Sleeve */}
          {!imgError && album.coverArtUrl ? (
            <img
              src={album.coverArtUrl}
              alt={`${album.title} by ${album.artist}`}
              loading="lazy"
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => {
                setImgError(true);
                setImgLoaded(true);
              }}
            />
          ) : (
            <GenerativeVinylCover album={album} className="w-full h-full" />
          )}

          {/* Top-Right Score Badge: Purple if rated, Muted UNRATED if unrated */}
          {rating ? (
            <div className="absolute top-1.5 right-1.5 font-mono text-[10px] xl:text-[11px] font-bold px-1.5 py-0.5 rounded bg-panel-obsidian/90 border border-purple-soft/40 text-purple-soft shadow-sm z-20">
              {rating.score.toFixed(1)}
            </div>
          ) : (
            <div className="absolute top-1.5 right-1.5 font-mono text-[9px] xl:text-[10px] font-medium px-1.5 py-0.5 rounded bg-panel-obsidian/90 border border-border-light text-text-muted z-20">
              UNRATED
            </div>
          )}

          {/* Bottom-Left ACTIVE Badge if currently selected */}
          {isSelected && (
            <div className="absolute bottom-1.5 left-1.5 font-mono text-[9px] xl:text-[10px] px-1.5 py-0.5 rounded bg-electric-blue text-white font-bold tracking-wider shadow-sm z-20">
              ACTIVE
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="space-y-0.5 flex-shrink-0 z-10">
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
      <div className="pt-1.5 mt-1.5 border-t border-border-subtle/40 flex-shrink-0 z-10">
        <p
          className="text-[9px] xl:text-[10px] italic text-text-dim leading-tight truncate group-hover:text-text-muted transition-colors"
          title={album.driftReason}
        >
          &ldquo;{album.driftReason}&rdquo;
        </p>
      </div>
    </div>
  );
};
