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
  const catalogShort = `LP-${album.id.slice(0, 5).toUpperCase()}`;

  return (
    <div
      onClick={() => onSelect(album)}
      style={{ animationDelay: `${index * 40}ms` }}
      className={`album-card group relative p-3 rounded-xl cursor-pointer transition-all duration-300 select-none flex flex-col justify-between h-auto lg:h-full min-h-0 overflow-visible active:scale-[0.98] animate-crate-entrance hover:-translate-y-1 shadow-lg ${
        isSelected
          ? 'bg-[#131317] border-2 border-[#D97706] shadow-[0_0_24px_rgba(217,119,6,0.25)]'
          : 'bg-[#111114] border border-[rgba(245,244,240,0.08)] hover:border-[#D97706]/50 hover:bg-[#16161C]'
      }`}
    >
      {/* Top Half: Physical 12" Gatefold Jacket with Slip-Out Vinyl Disc */}
      <div className="lg:flex-1 lg:min-h-0 flex flex-col relative">
        <div className="relative w-full aspect-square lg:aspect-auto lg:flex-1 lg:min-h-0 rounded-lg overflow-hidden bg-neutral-950 mb-2.5 flex items-center justify-center z-10 shadow-xl border border-neutral-800">
          {/* Subtle slipping vinyl disc visible behind or peeking on hover */}
          <div
            className="w-20 h-20 sm:w-28 sm:h-28 rounded-full vinyl-grooves border border-neutral-700 shadow-xl absolute -right-4 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-300 pointer-events-none z-0"
          >
            <div className="w-8 h-8 rounded-full bg-[#D97706]/80 border border-neutral-900 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>
          </div>

          {/* Pulsing loading skeleton */}
          {!imgLoaded && !imgError && album.coverArtUrl && (
            <div className="absolute inset-0 bg-[#16161C] animate-pulse flex items-center justify-center z-10">
              <div className="w-6 h-6 rounded-full border border-white/20 border-t-[#D97706] animate-spin" />
            </div>
          )}

          {/* Album Cover Art */}
          {!imgError && album.coverArtUrl ? (
            <img
              src={album.coverArtUrl}
              alt={`${album.title} by ${album.artist}`}
              loading="lazy"
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out relative z-10 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => {
                setImgError(true);
                setImgLoaded(true);
              }}
            />
          ) : (
            <div className="w-full h-full relative z-10">
              <GenerativeVinylCover album={album} className="w-full h-full" />
            </div>
          )}

          {/* Mylar Outer Sleeve Gloss Sheen */}
          <div className="absolute inset-0 vinyl-sleeve-gloss z-20 pointer-events-none" />

          {/* Top-Left Catalog Stamp */}
          <div className="absolute top-1.5 left-1.5 font-mono text-[9px] px-1.5 py-0.2 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[#9C9A94] z-30">
            {catalogShort}
          </div>

          {/* Top-Right Score Stamp */}
          {rating ? (
            <div className="absolute top-1.5 right-1.5 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#111114]/95 border border-[#D97706]/60 text-[#D97706] shadow-md z-30">
              {rating.score.toFixed(1)}
            </div>
          ) : (
            <div className="absolute top-1.5 right-1.5 font-mono text-[9px] font-semibold px-1.5 py-0.2 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[#9C9A94] z-30">
              UNRATED
            </div>
          )}

          {/* Bottom-Left ACTIVE TURNTABLE Badge if currently selected */}
          {isSelected && (
            <div className="absolute bottom-1.5 left-1.5 font-mono text-[9px] px-2 py-0.5 rounded-md bg-[#D97706] text-black font-bold tracking-wider shadow-md z-30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              <span>ON DECK</span>
            </div>
          )}
        </div>

        {/* Record Metadata */}
        <div className="space-y-0.5 flex-shrink-0 z-10">
          <h3
            className="font-bold text-xs text-[#F5F4F0] truncate leading-snug group-hover:text-[#D97706] transition-colors"
            title={album.title}
          >
            {album.title}
          </h3>
          <p className="font-sans text-[11px] text-[#9C9A94] truncate">
            {album.artist} &middot; <span className="font-mono text-[#575550]">{album.releaseYear}</span>
          </p>
          <div className="pt-0.5">
            <span className="inline-block font-mono text-[9px] text-[#9C9A94] bg-[#16161A] border border-white/5 px-1.5 py-0.2 rounded-full truncate max-w-full">
              {primaryGenre}
            </span>
          </div>
        </div>
      </div>

      {/* Lateral Drift Trajectory Snippet */}
      <div className="pt-2 mt-2 border-t border-[rgba(245,244,240,0.08)] flex-shrink-0 z-10">
        <p
          className="text-[9px] italic text-[#575550] leading-tight truncate group-hover:text-[#9C9A94] transition-colors font-sans"
          title={album.driftReason}
        >
          &ldquo;{album.driftReason}&rdquo;
        </p>
      </div>
    </div>
  );
};
