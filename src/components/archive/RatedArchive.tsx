import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ChevronRight, Disc, Filter } from 'lucide-react';
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
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
      <div className="h-96 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border-subtle rounded-2xl bg-panel-obsidian/60 select-none relative overflow-hidden">
        {/* Hex Bolts */}
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900" />
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900" />
        <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900" />
        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900" />

        <div className="w-16 h-16 rounded-full bg-panel-elevated border border-border-light flex items-center justify-center mb-4 shadow-inner">
          <Disc className="w-8 h-8 text-amber-500/60" strokeWidth={1.5} />
        </div>
        <h3 className="text-base font-bold font-mono text-text-offwhite tracking-wider">
          VINYL VAULT ARCHIVE IS EMPTY
        </h3>
        <p className="text-xs text-text-muted mt-2 max-w-md leading-relaxed font-sans">
          No records have been stamped into your permanent collection yet. Rate releases on the Hi-Fi Turntable Deck (1.0 to 10.0) to engrave them into this physical master library.
        </p>
      </div>
    );
  }

  // Calculate audiophile statistics
  const averageRating = (ratings.reduce((acc, r) => acc + r.score, 0) / (ratings.length || 1)).toFixed(2);
  const masterCount = ratings.filter(r => r.score >= 9.0).length;

  return (
    <div className="space-y-6 select-none pb-12">
      {/* Vault Cabinet Top Faceplate */}
      <div className="p-4 rounded-xl audiophile-chassis border border-border-subtle shadow-xl space-y-4 relative">
        {/* Top Decorative Hardware Screws */}
        <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900" />
        <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900" />

        {/* Master Vault Readout Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-soft shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
            <div>
              <h3 className="text-sm font-bold font-mono text-text-offwhite tracking-wider">
                AUDIOPHILE VINYL VAULT // 12-INCH MASTER REPOSITORY
              </h3>
              <p className="text-[11px] font-mono text-text-muted">
                PERMANENT LOGGED WAX CUTS &middot; INDEPENDENT PRESSING EVALUATIONS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-2.5 py-1 rounded bg-panel-obsidian border border-border-subtle">
              <span className="text-text-dim text-[10px] block">TOTAL CUTS:</span>
              <span className="text-text-offwhite font-bold">{ratings.length} LPs</span>
            </div>
            <div className="px-2.5 py-1 rounded bg-panel-obsidian border border-border-subtle">
              <span className="text-text-dim text-[10px] block">AVG GRADE:</span>
              <span className="text-amber-400 font-bold">{averageRating} / 10.0</span>
            </div>
            <div className="px-2.5 py-1 rounded bg-panel-obsidian border border-border-subtle">
              <span className="text-text-dim text-[10px] block">MASTER TIER:</span>
              <span className="text-purple-soft font-bold">{masterCount} CUTS</span>
            </div>
          </div>
        </div>

        {/* Filter, Search & Rotary Sort Console */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-text-dim absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.8} />
            <input
              type="text"
              placeholder="Search by catalog title, artist, or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-panel-obsidian border border-border-subtle focus:border-purple-soft rounded-lg pl-9 pr-3 py-2 text-xs text-text-offwhite placeholder:text-text-dim outline-none transition-all shadow-inner font-mono"
            />
          </div>

          {/* Sort & Category Selectors */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-panel-obsidian border border-border-subtle rounded-lg px-2.5 py-2">
              <ArrowUpDown className="w-3 h-3 text-text-dim" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortField)}
                className="bg-transparent text-xs text-text-offwhite outline-none font-mono cursor-pointer"
              >
                <option value="score-desc" className="bg-panel-obsidian">RATING: HIGHEST (10.0 TO 1.0)</option>
                <option value="score-asc" className="bg-panel-obsidian">RATING: LOWEST (1.0 TO 10.0)</option>
                <option value="date-desc" className="bg-panel-obsidian">INGESTION: MOST RECENT</option>
                <option value="date-oldest" className="bg-panel-obsidian">INGESTION: OLDEST</option>
                <option value="title" className="bg-panel-obsidian">CATALOG TITLE (A-Z)</option>
              </select>
            </div>

            {allGenres.length > 0 && (
              <div className="flex items-center gap-1.5 bg-panel-obsidian border border-border-subtle rounded-lg px-2.5 py-2">
                <Filter className="w-3 h-3 text-text-dim" />
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="bg-transparent text-xs text-text-offwhite outline-none font-mono cursor-pointer max-w-[150px] truncate"
                >
                  <option value="all" className="bg-panel-obsidian">ALL GENRES ({ratings.length})</option>
                  {allGenres.map(g => (
                    <option key={g} value={g} className="bg-panel-obsidian">{g.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Physical Vinyl Collection Filing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {filteredAndSorted.map((item) => {
          const score = item.score;
          // Determine audiophile certification tier
          let tierLabel = 'STANDARD 180G';
          let tierStyle = 'border-border-light text-text-muted bg-panel-elevated';
          if (score >= 9.0) {
            tierLabel = 'MASTER PRESSING';
            tierStyle = 'border-amber-500/50 text-amber-300 bg-amber-500/10 shadow-[0_0_12px_rgba(245,158,11,0.2)] font-bold';
          } else if (score >= 7.5) {
            tierLabel = 'AUDIOPHILE CUT';
            tierStyle = 'border-purple-soft/50 text-purple-soft bg-purple-soft/10 font-bold';
          } else if (score < 5.0) {
            tierLabel = 'MONO FIELD TEST';
            tierStyle = 'border-neutral-700 text-neutral-400 bg-neutral-900';
          }

          const catalogSerial = `DRIFT-LP-${item.albumId.slice(0, 6).toUpperCase()}`;

          return (
            <div
              key={item.albumId}
              onClick={() => onSelectRatedAlbum(item)}
              className="group p-3.5 rounded-xl bg-panel-obsidian border border-border-subtle hover:border-purple-soft/50 hover:bg-panel-elevated transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 relative overflow-hidden shadow-lg active:scale-[0.99]"
            >
              {/* Left: 12" Gatefold Vinyl Jacket with Outer Mylar Glare & Slip-out Vinyl Disc */}
              <div className="relative flex items-center flex-shrink-0">
                {/* Physical Vinyl Record Disc Slipping Out Behind Jacket */}
                <div
                  className="w-14 h-14 rounded-full vinyl-grooves border border-neutral-700/80 shadow-lg absolute -right-2 top-1/2 -translate-y-1/2 flex items-center justify-center group-hover:translate-x-3 transition-transform duration-300 pointer-events-none z-0"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-600/60 border border-neutral-900 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-black" />
                  </div>
                </div>

                {/* Cardboard Outer Sleeve */}
                <div className="w-16 h-16 rounded-md overflow-hidden bg-neutral-950 flex-shrink-0 border-2 border-neutral-800 shadow-xl relative z-10">
                  <ArchiveCover item={item} />
                  {/* Glossy Mylar Poly-Sleeve Light Reflection */}
                  <div className="absolute inset-0 vinyl-sleeve-gloss pointer-events-none" />
                </div>
              </div>

              {/* Center: Metadata, Catalog ID, and Sonic Stamp */}
              <div className="truncate flex-1 space-y-1 z-10">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-text-dim px-1.5 py-0.2 rounded bg-canvas-black border border-border-subtle">
                    {catalogSerial}
                  </span>
                  <span className={`font-mono text-[9px] px-1.5 py-0.2 rounded border uppercase ${tierStyle}`}>
                    {tierLabel}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-text-offwhite truncate group-hover:text-purple-soft transition-colors leading-snug">
                  {item.albumTitle}
                </h4>

                <p className="text-xs text-text-muted truncate">
                  {item.artist}
                </p>

                <div className="flex items-center gap-2 pt-0.5">
                  {item.sonicTag && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-soft/10 text-purple-soft border border-purple-soft/20">
                      {item.sonicTag}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-text-dim">
                    {new Date(item.ratedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Right: Master Grade Score & Cue Button */}
              <div className="flex items-center gap-3 flex-shrink-0 z-10 pl-1">
                <div className="text-right">
                  <span className="font-mono text-base font-bold text-amber-400 block leading-tight">
                    {item.score.toFixed(1)}
                  </span>
                  <span className="text-[9px] font-mono text-text-dim block">
                    GRADE
                  </span>
                </div>

                <button
                  type="button"
                  title="Mount record onto turntable deck"
                  className="w-8 h-8 rounded-lg bg-panel-elevated group-hover:bg-purple-soft group-hover:text-black text-text-muted border border-border-subtle group-hover:border-purple-soft flex items-center justify-center transition-all shadow-sm"
                >
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
