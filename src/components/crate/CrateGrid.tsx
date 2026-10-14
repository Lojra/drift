import React from 'react';
import { Album, AlbumRating } from '../../types/music';
import { AlbumCard } from './AlbumCard';
import { Disc3 } from 'lucide-react';

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
            <h1 className="text-sm font-semibold tracking-tight text-text-offwhite">Curated Dynamic Batch</h1>
            <span className="font-mono text-xs text-text-dim">/ 10 selected via acoustic affinity</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-panel-obsidian border border-border-subtle rounded-lg p-3 animate-pulse space-y-3"
            >
              <div className="aspect-square w-full bg-panel-elevated rounded-[6px]" />
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
      <div className="h-80 flex flex-col items-center justify-center text-center p-8 border border-dashed border-border-subtle rounded-xl bg-panel-obsidian/40">
        <Disc3 className="w-10 h-10 text-text-muted mb-3 animate-spin" strokeWidth={1.5} />
        <h3 className="text-sm font-semibold text-text-offwhite">No Albums In Current Crate</h3>
        <p className="text-xs text-text-muted mt-1 max-w-sm">
          Try clearing your search query or click "Refresh Crate (10)" to populate new lateral discoveries.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full lg:h-full lg:flex-1 lg:min-h-0 flex flex-col justify-between">
      {/* Stitch Batch Header Bar */}
      <div className="flex items-center justify-between flex-shrink-0 mb-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xs xl:text-sm font-semibold tracking-tight text-text-offwhite">
            Curated Dynamic Batch
          </h1>
          <span className="font-mono text-[10px] xl:text-xs text-text-dim">
            / 10 selected via acoustic affinity
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] xl:text-[11px] text-text-muted">
          <span className="inline-block w-2 h-2 rounded-full bg-electric-blue"></span>
          <span>Tap to inspect & rate</span>
        </div>
      </div>

      {/* 5-Column Responsive Album Grid (scrollable on mobile, 2 rows on desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:grid-rows-2 gap-2.5 xl:gap-3 lg:flex-1 lg:min-h-0 lg:h-full lg:auto-rows-fr" id="albumGrid">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            rating={ratingMap.get(album.id)}
            isSelected={selectedAlbum?.id === album.id}
            onSelect={onSelectAlbum}
          />
        ))}
      </div>
    </div>
  );
};
