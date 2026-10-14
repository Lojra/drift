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
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-2xl border-b border-border-subtle md:hidden px-3.5 py-2.5 flex items-center justify-between gap-2 select-none shadow-[inset_0_-1px_0_rgba(255,255,255,0.06),0_4px_20px_rgba(0,0,0,0.15)] transition-colors">
      {/* Brand & Wordmark */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.2)]">
          <div className="w-2 h-2 rounded-full bg-electric-blue shadow-[0_0_8px_#3B82F6]" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold tracking-tight text-sm text-text-offwhite leading-none">DRIFT</span>
          <span className="font-mono text-[8px] text-text-dim tracking-widest leading-none mt-0.5">LOCAL VAULT</span>
        </div>
      </div>

      {/* Compact Lateral Drift Trajectory Pill */}
      <div className="flex-1 min-w-0 px-1 text-center">
        <button
          onClick={onCalibrate}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-panel-elevated/70 backdrop-blur-md border border-border-light text-[10px] font-mono text-purple-soft truncate max-w-full hover:border-purple-soft/50 shadow-sm active:scale-95 transition-all"
          title="Tap to recalibrate taste baseline"
        >
          <Compass className="w-3 h-3 flex-shrink-0 text-purple-soft animate-spin-slow" />
          <span className="truncate">{driftPath || 'Calibrated Taste Vector'}</span>
        </button>
      </div>

      {/* Action Controls: View Switcher, Theme Switcher & Refresh Crate */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {onToggleViewMode && (
          <button
            onClick={() => onToggleViewMode(viewMode === 'grid' ? 'studio' : 'grid')}
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-panel-elevated/80 border border-border-light text-electric-blue active:scale-95 transition-all"
            title={viewMode === 'grid' ? 'Switch to Hi-Fi Turntable' : 'Switch to Crate Grid'}
            aria-label="Toggle view mode"
          >
            {viewMode === 'grid' ? <Disc className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          </button>
        )}

        <button
          onClick={toggleTheme}
          className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-panel-elevated/80 hover:bg-panel-hover border border-border-light text-text-offwhite active:scale-95 transition-all shadow-sm"
          title={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Obsidian Dark Mode'}
          aria-label={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Obsidian Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-electric-blue" strokeWidth={1.75} />
          ) : (
            <Moon className="w-4 h-4 text-purple-soft" strokeWidth={1.75} />
          )}
        </button>

        <button
          onClick={onRefreshCrate}
          disabled={isLoading}
          className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-panel-elevated/80 hover:bg-panel-hover border border-border-light text-text-offwhite active:scale-95 transition-all disabled:opacity-50 shadow-sm"
          title="Refresh with 10 completely fresh albums"
          aria-label="Refresh crate"
        >
          <RotateCw className={`w-4 h-4 text-electric-blue ${isLoading ? 'animate-spin' : ''}`} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
};
