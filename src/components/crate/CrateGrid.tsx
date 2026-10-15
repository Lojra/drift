import React from 'react';
import { Album, AlbumRating } from '../../types/music';
import { AlbumCard } from './AlbumCard';
import { Disc, Disc3 } from 'lucide-react';

interface CrateGridProps {
  albums: Album[];
  ratings: AlbumRating[];
  selectedAlbum: Album | null;
  onSelectAlbum: (album: Album) => void;
  isLoading: boolean;
}

export const CrateGrid: React.FC<CrateGridProps> = ({
  albums,
  ratings,
  selectedAlbum,
  onSelectAlbum,
  isLoading
}) => {
  const ratingMap = new Map(ratings.map(r => [r.albumId, r]));

  if (isLoading && albums.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold tracking-tight text-[#F5F4F0] font-mono">
              CURATED PHYSICAL CRATE BATCH
            </h1>
            <span className="font-mono text-xs text-[#9C9A94]">/ 10 LPs</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#111114] border border-[rgba(245,244,240,0.08)] rounded-xl p-3 animate-pulse space-y-3"
            >
              <div className="aspect-square w-full bg-[#16161C] rounded-lg" />
              <div className="h-3.5 bg-[#16161C] rounded w-3/4" />
              <div className="h-3 bg-[#16161C]/70 rounded w-1/2" />
              <div className="h-4 bg-[#16161C]/40 rounded w-full mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="h-80 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-[rgba(245,244,240,0.08)] rounded-2xl bg-[#111114]/40 select-none">
        <Disc3 className="w-10 h-10 text-[#D97706]/70 mb-3 animate-spin-slow" strokeWidth={1.5} />
        <h3 className="text-sm font-bold font-mono text-[#F5F4F0] tracking-wider">
          CRATE COMPARTMENT EMPTY
        </h3>
        <p className="text-xs text-[#9C9A94] mt-1.5 max-w-sm font-sans leading-relaxed">
          Clear your search query or press &quot;CYCLE 10 LPs&quot; to dig 10 fresh lateral vinyl releases.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full lg:h-full lg:flex-1 lg:min-h-0 flex flex-col justify-between">
      {/* Crate Header Bar with Bauhaus Detailing */}
      <div className="flex items-center justify-between flex-shrink-0 mb-2 px-1">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#D97706] shadow-[0_0_8px_#D97706]" />
          <h1 className="text-xs xl:text-sm font-bold tracking-wider font-mono text-[#F5F4F0]">
            VINYL RECORD CRATE // 10-DISC ROTATION
          </h1>
          <span className="font-mono text-[10px] xl:text-xs text-[#9C9A94]">
            &middot; ACOUSTIC AFFINITY SELECTION
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] xl:text-[11px] text-[#D97706]">
          <Disc className="w-3.5 h-3.5" />
          <span>TAP LP TO INSPECT &amp; CUE ON TURNTABLE</span>
        </div>
      </div>

      {/* 5-Column Responsive Album Grid (scrollable on mobile, 2 rows on desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:grid-rows-2 gap-2.5 xl:gap-3 lg:flex-1 lg:min-h-0 lg:h-full lg:auto-rows-fr" id="albumGrid">
        {albums.map((album, idx) => (
          <AlbumCard
            key={album.id}
            album={album}
            index={idx}
            rating={ratingMap.get(album.id)}
            isSelected={selectedAlbum?.id === album.id}
            onSelect={onSelectAlbum}
          />
        ))}
      </div>
    </div>
  );
};
