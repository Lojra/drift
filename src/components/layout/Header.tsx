import React from 'react';
import { RotateCw, Search, X, Sun, Moon, LayoutGrid, Disc, FileText, Sliders } from 'lucide-react';
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
  activeDrawerTable?: 'none' | 'info' | 'test';
  onToggleDrawerTable?: (table: 'info' | 'test') => void;
}

export const Header: React.FC<HeaderProps> = ({
  tasteProfile,
  ratedInCrateCount,
  onRefreshCrate,
  isLoading,
  searchQuery,
  onSearchChange,
  viewMode = 'studio',
  onToggleViewMode,
  activeDrawerTable = 'none',
  onToggleDrawerTable
}) => {
  const { theme, toggleTheme } = useTheme();
  const driftText = (tasteProfile.currentDriftPath || 'INITIAL EXPLORATION').toUpperCase();

  return (
    <header className="h-14 flex-shrink-0 bg-[#0E0E11] border-b border-[rgba(245,244,240,0.08)] px-4 lg:px-6 flex items-center justify-between gap-3 z-10 select-none min-w-0 relative">
      {/* Left: Dieter Rams Bauhaus Wordmark & Divergence Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="flex items-baseline space-x-2 shrink-0">
          <span className="text-lg font-bold tracking-tighter text-[#F5F4F0]">DRIFT</span>
          <span className="text-[9px] font-mono tracking-widest text-[#9C9A94] uppercase hidden sm:inline">
            SYSTEM 10 // BRAUN MK-10
          </span>
        </div>

        <div className="h-4 w-[1px] bg-white/10 hidden sm:block shrink-0" />

        {/* Master Clock & Acoustic Divergence Readout */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#16161A] border border-white/5 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shadow-[0_0_8px_#D97706] shrink-0" />
          <div className="min-w-0 truncate font-mono text-[11px]">
            <span className="text-[#9C9A94] text-[9px] tracking-wider uppercase hidden xl:inline mr-1">
              MASTER CLOCK // 192kHz &bull;
            </span>
            <span className="text-[#F5F4F0] font-medium tracking-tight">
              ACOUSTIC DIVERGENCE:
            </span>{' '}
            <span className="text-[#9C9A94] tracking-wider truncate">
              {driftText}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Precision Search Console */}
      <div className="relative flex-1 max-w-[140px] sm:max-w-xs md:max-w-sm">
        <Search
          className="w-3.5 h-3.5 text-[#9C9A94] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          strokeWidth={1.75}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter catalog or artist..."
          className="w-full bg-[#141418] border border-[rgba(245,244,240,0.08)] focus:border-[#D97706] rounded py-1 pl-8 pr-7 font-mono text-xs text-[#F5F4F0] placeholder:text-[#575550] outline-none transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9C9A94] hover:text-[#F5F4F0] p-0.5 rounded transition-colors"
            title="Clear filter"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Right Controls: View Switcher, Dual Table Tabs, Theme & Refresh */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* View Mode Toggle: Grid vs Hi-Fi Studio Deck */}
        {onToggleViewMode && (
          <div className="flex items-center bg-[#09090B] border border-white/10 p-0.5 rounded-sm">
            <button
              onClick={() => onToggleViewMode('grid')}
              className={`px-2 py-1 rounded-sm flex items-center gap-1.5 font-mono text-[10px] transition-all ${
                viewMode === 'grid'
                  ? 'braun-switch active shadow-sm'
                  : 'text-[#9C9A94] hover:text-[#F5F4F0]'
              }`}
              title="Classic Crate Grid"
            >
              <LayoutGrid className="w-3 h-3" />
              <span className="hidden xl:inline">CRATE GRID</span>
            </button>
            <button
              onClick={() => onToggleViewMode('studio')}
              className={`px-2 py-1 rounded-sm flex items-center gap-1.5 font-mono text-[10px] transition-all ${
                viewMode === 'studio'
                  ? 'braun-switch active-amber shadow-sm'
                  : 'text-[#9C9A94] hover:text-[#F5F4F0]'
              }`}
              title="Braun Transcription Deck"
            >
              <Disc className="w-3 h-3" />
              <span className="hidden xl:inline">HI-FI DECK</span>
            </button>
          </div>
        )}

        {/* Dual Shelves: Music Info Table & Music Test Table */}
        {onToggleDrawerTable && (
          <div className="flex items-center bg-[#09090B] border border-white/10 p-0.5 rounded-sm">
            {/* Shelf 1: Music Info Table */}
            <button
              onClick={() => onToggleDrawerTable('info')}
              className={`px-2.5 py-1 rounded-sm flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider transition-all ${
                activeDrawerTable === 'info'
                  ? 'braun-switch active shadow-sm'
                  : 'text-[#9C9A94] hover:text-[#F5F4F0]'
              }`}
              title="Music Info Table (Gatefold Jacket, tracklist, audio preview, specs)"
              aria-label="Toggle Music Info Table"
            >
              <FileText className="w-3 h-3" />
              <span className="hidden lg:inline">INFO TABLE</span>
              {activeDrawerTable === 'info' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
              )}
            </button>

            {/* Shelf 2: Music Test Table */}
            <button
              onClick={() => onToggleDrawerTable('test')}
              className={`px-2.5 py-1 rounded-sm flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider transition-all ${
                activeDrawerTable === 'test'
                  ? 'braun-switch active-amber shadow-sm'
                  : 'text-[#9C9A94] hover:text-[#F5F4F0]'
              }`}
              title="Music Test Table (Stepped attenuator rating, sonic reaction stamps)"
              aria-label="Toggle Music Test Table"
            >
              <Sliders className="w-3 h-3" />
              <span className="hidden lg:inline">TEST TABLE</span>
              {activeDrawerTable === 'test' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
              )}
            </button>
          </div>
        )}

        {/* Crate Rotation Counter */}
        <div className="font-mono text-xs px-2.5 py-1 rounded bg-[#141418] border border-white/5 hidden md:flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
          <span className="text-[#9C9A94] text-[9px] uppercase">ROTATION:</span>
          <span className="text-[#F5F4F0] font-bold text-[10px]">{ratedInCrateCount}/10 RATED</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-7 h-7 rounded bg-[#141418] hover:bg-[#1E1E24] border border-white/10 text-[#F5F4F0] transition-all active:scale-95 shadow-sm"
          title={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Pitch Black Mode'}
          aria-label={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Pitch Black Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-[#D97706]" strokeWidth={1.75} />
          ) : (
            <Moon className="w-3.5 h-3.5 text-[#F5F4F0]" strokeWidth={1.75} />
          )}
        </button>

        {/* Cycle 10 LPs Button */}
        <button
          onClick={onRefreshCrate}
          disabled={isLoading}
          className="flex items-center gap-1.5 bg-[#D97706] hover:bg-[#B45309] text-black px-3 py-1.5 rounded font-mono text-[11px] font-bold tracking-wider uppercase transition-all shadow-[0_2px_10px_rgba(217,119,6,0.3)] active:scale-95 disabled:opacity-50"
        >
          <RotateCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} strokeWidth={2.2} />
          <span className="hidden sm:inline">CYCLE 10 LPs</span>
          <span className="sm:hidden">CYCLE</span>
        </button>
      </div>
    </header>
  );
};
