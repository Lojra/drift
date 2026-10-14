import React from 'react';
import { RotateCw, Compass, Sun, Moon, LayoutGrid, Disc } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface MobileHeaderProps {
  driftPath: string;
  onRefreshCrate: () => void;
  isLoading: boolean;
  onCalibrate?: () => void;
  viewMode?: 'grid' | 'studio';
  onToggleViewMode?: (mode: 'grid' | 'studio') => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  driftPath,
  onRefreshCrate,
  isLoading,
  onCalibrate,
  viewMode = 'studio',
  onToggleViewMode
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 audiophile-chassis border-b border-border-subtle md:hidden px-3.5 py-2.5 flex items-center justify-between gap-2 select-none shadow-[inset_0_-1px_0_rgba(255,255,255,0.06),0_4px_20px_rgba(0,0,0,0.5)] transition-colors">
      {/* Brand & Wordmark */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-panel-obsidian border border-amber-500/40 flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.3)]">
          <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#F59E0B] animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold tracking-widest text-sm text-text-offwhite leading-none font-sans">DRIFT</span>
          <span className="font-mono text-[8px] text-amber-500/90 tracking-widest leading-none mt-0.5">PHONO LAB</span>
        </div>
      </div>

      {/* Compact Lateral Drift Trajectory Pill */}
      <div className="flex-1 min-w-0 px-1 text-center">
        <button
          onClick={onCalibrate}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-panel-obsidian/90 border border-border-light text-[10px] font-mono text-amber-400 truncate max-w-full hover:border-amber-500/50 shadow-sm active:scale-95 transition-all"
          title="Tap to recalibrate taste baseline"
        >
          <Compass className="w-3 h-3 flex-shrink-0 text-amber-500 animate-spin-slow" />
          <span className="truncate">{driftPath || 'Calibrated Taste Vector'}</span>
        </button>
      </div>

      {/* Action Controls: View Switcher, Theme Switcher & Refresh Crate */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {onToggleViewMode && (
          <button
            onClick={() => onToggleViewMode(viewMode === 'grid' ? 'studio' : 'grid')}
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-panel-obsidian border border-border-light text-amber-400 active:scale-95 transition-all shadow-sm"
            title={viewMode === 'grid' ? 'Switch to Hi-Fi Turntable' : 'Switch to Crate Grid'}
            aria-label="Toggle view mode"
          >
            {viewMode === 'grid' ? <Disc className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          </button>
        )}

        <button
          onClick={toggleTheme}
          className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-panel-obsidian hover:bg-panel-elevated border border-border-light text-text-offwhite active:scale-95 transition-all shadow-sm"
          title={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Obsidian Dark Mode'}
          aria-label={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Obsidian Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-500" strokeWidth={1.75} />
          ) : (
            <Moon className="w-4 h-4 text-purple-soft" strokeWidth={1.75} />
          )}
        </button>

        <button
          onClick={onRefreshCrate}
          disabled={isLoading}
          className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-electric-blue hover:bg-blue-600 border border-electric-blue text-white active:scale-95 transition-all disabled:opacity-50 shadow-[0_0_12px_rgba(59,130,246,0.35)]"
          title="Refresh with 10 completely fresh albums"
          aria-label="Refresh crate"
        >
          <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
};
