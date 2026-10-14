import React from 'react';
import { RotateCw, Search, X, Sun, Moon, LayoutGrid, Disc } from 'lucide-react';
import { TasteProfile } from '../../types/music';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  tasteProfile: TasteProfile;
  ratedInCrateCount: number;
  onRefreshCrate: () => void;
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode?: 'grid' | 'studio';
  onToggleViewMode?: (mode: 'grid' | 'studio') => void;
}

export const Header: React.FC<HeaderProps> = ({
  tasteProfile,
  ratedInCrateCount,
  onRefreshCrate,
  isLoading,
  searchQuery,
  onSearchChange,
  viewMode = 'studio',
  onToggleViewMode
}) => {
  const { theme, toggleTheme } = useTheme();
  const driftText = (tasteProfile.currentDriftPath || 'INITIAL EXPLORATION').toUpperCase();

  return (
    <header className="h-16 flex-shrink-0 audiophile-chassis border-b border-border-subtle px-4 lg:px-6 flex items-center justify-between gap-3 z-10 select-none min-w-0 relative">
      {/* Left: Master Clock & Drift Vector Readout */}
      <div className="flex items-center gap-3 min-w-0 max-w-[240px] sm:max-w-[340px] lg:max-w-[460px]">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-panel-obsidian border border-border-subtle min-w-0 shadow-inner">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse flex-shrink-0" />
          <div className="min-w-0 truncate">
            <span className="font-mono text-[8px] text-amber-500/90 tracking-widest block uppercase leading-none">
              MASTER CLOCK // 192kHz
            </span>
            <span
              className="font-mono text-xs font-bold tracking-tight text-text-offwhite truncate block leading-tight mt-0.5"
              title={`CURRENT DRIFT: ${driftText}`}
            >
              DRIFT: {driftText}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Search Console */}
      <div className="relative flex-1 max-w-[160px] sm:max-w-xs md:max-w-sm">
        <Search
          className="w-3.5 h-3.5 text-text-dim absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          strokeWidth={1.8}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search catalog or artist..."
          className="w-full bg-panel-obsidian border border-border-subtle focus:border-amber-500 rounded-lg py-1.5 pl-8 pr-7 font-mono text-xs text-text-offwhite placeholder:text-text-dim outline-none transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-dim hover:text-text-offwhite p-0.5 rounded transition-colors"
            title="Clear search"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Right Controls: View Switcher, Crate Status, Theme & Refresh */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* View Mode Toggle: Grid vs Hi-Fi Studio Deck */}
        {onToggleViewMode && (
          <div className="flex items-center bg-panel-obsidian border border-border-subtle p-0.5 rounded-lg shadow-inner">
            <button
              onClick={() => onToggleViewMode('grid')}
              className={`px-2.5 py-1.5 rounded-md flex items-center gap-1.5 font-mono text-[11px] transition-all ${
                viewMode === 'grid'
                  ? 'bg-panel-elevated text-electric-blue font-bold shadow-md border border-electric-blue/40'
                  : 'text-text-muted hover:text-text-offwhite'
              }`}
              title="Classic Crate Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">CRATE GRID</span>
            </button>
            <button
              onClick={() => onToggleViewMode('studio')}
              className={`px-2.5 py-1.5 rounded-md flex items-center gap-1.5 font-mono text-[11px] transition-all ${
                viewMode === 'studio'
                  ? 'bg-panel-elevated text-amber-400 font-bold shadow-md border border-amber-500/40'
                  : 'text-text-muted hover:text-text-offwhite'
              }`}
              title="Audiophile Hi-Fi Studio Deck"
            >
              <Disc className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">HI-FI DECK</span>
            </button>
          </div>
        )}

        {/* Backlit Crate Status Indicator */}
        <div className="font-mono text-xs px-2.5 py-1.5 rounded-lg bg-panel-obsidian border border-border-subtle hidden md:flex items-center gap-1.5 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-soft" />
          <span className="text-text-dim text-[10px]">ROTATION:</span>
          <span className="text-text-offwhite font-bold">{ratedInCrateCount}/10 RATED</span>
        </div>

        {/* White / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-panel-obsidian hover:bg-panel-elevated border border-border-subtle hover:border-border-light text-text-offwhite transition-all active:scale-95 shadow-sm"
          title={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Obsidian Dark Mode'}
          aria-label={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Obsidian Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-500" strokeWidth={1.75} />
          ) : (
            <Moon className="w-4 h-4 text-purple-soft" strokeWidth={1.75} />
          )}
        </button>

        {/* Refresh Crate Button */}
        <button
          onClick={onRefreshCrate}
          disabled={isLoading}
          className="flex items-center gap-2 bg-electric-blue hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_16px_rgba(59,130,246,0.4)] active:scale-95 disabled:opacity-50"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} strokeWidth={2.2} />
          <span className="hidden sm:inline">CYCLE 10 LPs</span>
          <span className="sm:hidden">CYCLE</span>
        </button>
      </div>
    </header>
  );
};
