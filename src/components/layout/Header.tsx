import React from 'react';
import { RotateCw, Search, X, Sun, Moon } from 'lucide-react';
import { TasteProfile } from '../../types/music';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  tasteProfile: TasteProfile;
  ratedInCrateCount: number;
  onRefreshCrate: () => void;
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  tasteProfile,
  ratedInCrateCount,
  onRefreshCrate,
  isLoading,
  searchQuery,
  onSearchChange
}) => {
  const { theme, toggleTheme } = useTheme();
  const driftText = (tasteProfile.currentDriftPath || 'INITIAL EXPLORATION').toUpperCase();

  return (
    <header className="h-16 flex-shrink-0 border-b border-border-subtle px-4 lg:px-6 flex items-center justify-between gap-3 bg-background/80 backdrop-blur-md z-10 select-none min-w-0">
      {/* Left: Monospace Status Pill */}
      <div className="flex items-center gap-2 min-w-0 max-w-[220px] sm:max-w-[320px] lg:max-w-[420px]">
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-panel-obsidian border border-border-subtle min-w-0 truncate">
          <span className="w-2 h-2 rounded-full bg-purple-soft flex-shrink-0"></span>
          <span className="font-mono text-xs font-semibold tracking-wide text-purple-soft truncate" title={`CURRENT DRIFT: ${driftText}`}>
            CURRENT DRIFT: {driftText}
          </span>
        </div>
      </div>

      {/* Center: Minimal Search Input */}
      <div className="relative flex-1 max-w-[160px] sm:max-w-xs md:max-w-sm">
        <Search
          className="w-3.5 h-3.5 text-text-dim absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          strokeWidth={1.8}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="w-full bg-panel-obsidian border border-border-subtle focus:border-electric-blue rounded-md py-1.5 pl-8 pr-7 font-sans text-xs text-text-offwhite placeholder:text-text-dim outline-none transition-all shadow-inner"
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

      {/* Right Header Action Button & Status */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <div className="font-mono text-xs text-text-muted px-2.5 py-1.5 rounded bg-panel-obsidian border border-border-subtle hidden md:flex items-center gap-1">
          <span>CRATE STATUS:</span>
          <span className="text-text-offwhite font-bold">{ratedInCrateCount} / 10 RATED</span>
        </div>

        {/* Editorial White Mode / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 rounded-md bg-panel-obsidian hover:bg-panel-elevated border border-border-subtle hover:border-border-light text-text-offwhite transition-all active:scale-95"
          title={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Obsidian Dark Mode'}
          aria-label={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Obsidian Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-electric-blue" strokeWidth={1.75} />
          ) : (
            <Moon className="w-4 h-4 text-purple-soft" strokeWidth={1.75} />
          )}
        </button>

        {/* Primary Electric Blue Button */}
        <button
          onClick={onRefreshCrate}
          disabled={isLoading}
          className="flex items-center gap-1.5 sm:gap-2 bg-electric-blue hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md font-sans text-xs font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(59,130,246,0.35)] active:scale-95 disabled:opacity-50"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} strokeWidth={2} />
          <span className="hidden sm:inline">Refresh Crate (10)</span>
          <span className="sm:hidden">Refresh</span>
        </button>
      </div>
    </header>
  );
};
