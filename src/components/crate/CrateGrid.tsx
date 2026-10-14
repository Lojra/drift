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
            <h1 className="text-sm font-semibold tracking-tight text-text-offwhite font-mono">
              CURATED PHYSICAL CRATE BATCH
            </h1>
            <span className="font-mono text-xs text-text-dim">/ 10 LPs</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-panel-obsidian border border-border-subtle rounded-xl p-3 animate-pulse space-y-3"
            >
              <div className="aspect-square w-full bg-panel-elevated rounded-lg" />
              <div className="h-3.5 bg-panel-elevated rounded w-3/4" />
              <div className="h-3 bg-panel-elevated/70 rounded w-1/2" />
              <div className="h-4 bg-panel-elevated/40 rounded w-full mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="h-80 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border-subtle rounded-2xl bg-panel-obsidian/40 select-none">
        <Disc3 className="w-10 h-10 text-amber-500/70 mb-3 animate-spin-slow" strokeWidth={1.5} />
        <h3 className="text-sm font-bold font-mono text-text-offwhite tracking-wider">
          CRATE COMPARTMENT EMPTY
        </h3>
        <p className="text-xs text-text-muted mt-1.5 max-w-sm font-sans leading-relaxed">
          Clear your search query or press "Refresh Crate" to dig 10 fresh lateral vinyl releases.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full lg:h-full lg:flex-1 lg:min-h-0 flex flex-col justify-between">
      {/* Crate Header Bar with Audiophile Detailing */}
      <div className="flex items-center justify-between flex-shrink-0 mb-2 px-1">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-electric-blue shadow-[0_0_8px_#3B82F6]" />
          <h1 className="text-xs xl:text-sm font-bold tracking-wider font-mono text-text-offwhite">
            VINYL RECORD CRATE // 10-DISC ROTATION
          </h1>
          <span className="font-mono text-[10px] xl:text-xs text-text-dim">
            &middot; ACOUSTIC AFFINITY SELECTION
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] xl:text-[11px] text-amber-400">
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
