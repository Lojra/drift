import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Archive, ChevronRight } from 'lucide-react';
import { Album, AlbumRating } from '../../types/music';
import { GenerativeVinylCover } from '../crate/GenerativeVinylCover';

const ArchiveCover: React.FC<{ item: AlbumRating }> = ({ item }) => {
  const [imgError, setImgError] = useState(false);
  const fallbackAlbum: Album = useMemo(() => ({
    id: item.albumId,
    title: item.albumTitle,
    artist: item.artist,
    releaseYear: 'Archived',
    coverArtUrl: item.coverArtUrl,
    genres: item.genres,
    driftReason: 'Archived discovery entry.',
    tracks: [],
    spotifyUrl: '',
    youtubeUrl: '',
    youtubeMusicUrl: '',
    sonicTraits: {}
  }), [item]);

  if (!imgError && item.coverArtUrl) {
    return (
      <img
        src={item.coverArtUrl}
        alt={item.albumTitle}
        onError={() => setImgError(true)}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
      />
    );
  }

  return <GenerativeVinylCover album={fallbackAlbum} className="w-full h-full" />;
};

interface RatedArchiveProps {
  ratings: AlbumRating[];
  onSelectRatedAlbum: (rating: AlbumRating) => void;
}

type SortField = 'score-desc' | 'score-asc' | 'date-desc' | 'date-oldest' | 'title';

export const RatedArchive: React.FC<RatedArchiveProps> = ({
  ratings,
  onSelectRatedAlbum
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortField>('score-desc');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const allGenres = useMemo(() => {
    const set = new Set<string>();
    ratings.forEach(r => r.genres.forEach(g => set.add(g)));
    return Array.from(set).sort();
  }, [ratings]);

  const filteredAndSorted = useMemo(() => {
    return ratings
      .filter(r => {
        const matchesSearch =
          r.albumTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesGenre =
          selectedGenre === 'all' || r.genres.includes(selectedGenre);

        return matchesSearch && matchesGenre;
      })
      .sort((a, b) => {
        if (sortOption === 'score-desc') return b.score - a.score;
        if (sortOption === 'score-asc') return a.score - b.score;
        if (sortOption === 'date-desc') return new Date(b.ratedAt).getTime() - new Date(a.ratedAt).getTime();
        if (sortOption === 'date-oldest') return new Date(a.ratedAt).getTime() - new Date(b.ratedAt).getTime();
        if (sortOption === 'title') return a.albumTitle.localeCompare(b.albumTitle);
        return 0;
      });
  }, [ratings, searchQuery, sortOption, selectedGenre]);

  if (ratings.length === 0) {
    return (
      <div className="h-80 flex flex-col items-center justify-center text-center p-8 border border-dashed border-border-subtle rounded-xl bg-panel-obsidian/40 select-none">
        <Archive className="w-10 h-10 text-text-dim mb-3" strokeWidth={1.5} />
        <h3 className="text-sm font-semibold text-text-offwhite">No Rated Albums Yet</h3>
        <p className="text-xs text-text-muted mt-1 max-w-sm">
          Rate albums in your current 10-album crate (1.0 to 10.0) to build your archive and train lateral exploration bridges.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none pb-8">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-4 border-b border-border-subtle">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-text-dim absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.8} />
          <input
            type="text"
            placeholder="Search by album, artist, or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-panel-obsidian border border-border-subtle focus:border-electric-blue rounded-md pl-9 pr-3 py-2 text-xs text-text-offwhite placeholder:text-text-dim outline-none transition-all"
          />
        </div>

        {/* Sort & Genre Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-panel-obsidian border border-border-subtle rounded-md px-2.5 py-1.5">
            <ArrowUpDown className="w-3 h-3 text-text-dim" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortField)}
              className="bg-transparent text-xs text-text-offwhite outline-none font-mono cursor-pointer"
            >
              <option value="score-desc" className="bg-panel-obsidian">Rating: Highest (10 &rarr; 1)</option>
              <option value="score-asc" className="bg-panel-obsidian">Rating: Lowest (1 &rarr; 10)</option>
              <option value="date-desc" className="bg-panel-obsidian">Date: Most Recent</option>
              <option value="date-oldest" className="bg-panel-obsidian">Date: Oldest</option>
              <option value="title" className="bg-panel-obsidian">Title (A-Z)</option>
            </select>
          </div>

          {allGenres.length > 0 && (
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-panel-obsidian border border-border-subtle rounded-md px-2.5 py-1.5 text-xs text-text-offwhite outline-none font-mono cursor-pointer max-w-[150px] truncate"
            >
              <option value="all" className="bg-panel-obsidian">All Genres ({ratings.length})</option>
              {allGenres.map(g => (
                <option key={g} value={g} className="bg-panel-obsidian">{g}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Ratings Count & Metrics Readout */}
      <div className="flex items-center justify-between text-xs font-mono text-text-muted">
        <span>Showing {filteredAndSorted.length} of {ratings.length} rated releases</span>
        <span>
          Average: {(ratings.reduce((acc, r) => acc + r.score, 0) / (ratings.length || 1)).toFixed(2)} / 10
        </span>
      </div>

      {/* Archive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredAndSorted.map((item) => (
          <div
            key={item.albumId}
            onClick={() => onSelectRatedAlbum(item)}
            className="group p-3 rounded-lg bg-panel-obsidian border border-border-subtle hover:border-border-light hover:bg-panel-elevated transition-all cursor-pointer flex items-center justify-between space-x-3"
          >
            <div className="flex items-center space-x-3 truncate">
              {/* Cover Art */}
              <div className="w-14 h-14 rounded overflow-hidden bg-panel-elevated flex-shrink-0 border border-border-subtle">
                <ArchiveCover item={item} />
              </div>

              {/* Text Metadata */}
              <div className="truncate space-y-1">
                <h4 className="text-xs font-semibold text-text-offwhite truncate group-hover:text-electric-blue transition-colors">
                  {item.albumTitle}
                </h4>
                <p className="text-[11px] text-text-muted truncate">
                  {item.artist}
                </p>

                <div className="flex items-center gap-2 pt-0.5">
                  {item.sonicTag && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-soft/10 text-purple-soft border border-purple-soft/20">
                      {item.sonicTag}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-text-dim">
                    {new Date(item.ratedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Score Metric */}
            <div className="flex items-center space-x-3 flex-shrink-0 pl-2">
              <div className="text-right">
                <span className="font-mono text-sm font-bold text-purple-soft block">
                  {item.score.toFixed(1)}
                </span>
                <span className="text-[10px] font-mono text-text-dim">
                  / 10.0
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-text-dim group-hover:text-electric-blue group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
