import React from 'react';
import { RotateCw, Compass, Sun, Moon, LayoutGrid, Disc, FileText, Sliders } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface MobileHeaderProps {
  driftPath: string;
  onRefreshCrate: () => void;
  isLoading: boolean;
  onCalibrate?: () => void;
  viewMode?: 'grid' | 'studio';
  onToggleViewMode?: (mode: 'grid' | 'studio') => void;
  activeDrawerTable?: 'none' | 'info' | 'test';
  onToggleDrawerTable?: (table: 'info' | 'test') => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  driftPath,
  onRefreshCrate,
  isLoading,
  onCalibrate,
  viewMode = 'studio',
  onToggleViewMode,
  activeDrawerTable = 'none',
  onToggleDrawerTable
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-[#0E0E11] border-b border-[rgba(245,244,240,0.08)] md:hidden px-3.5 py-2.5 flex items-center justify-between gap-2 select-none shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-colors">
      {/* Brand & Wordmark */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-7 h-7 rounded-sm bg-[#111114] border border-[#D97706]/40 flex items-center justify-center shadow-[0_0_10px_rgba(217,119,6,0.3)]">
          <div className="w-2 h-2 rounded-full bg-[#D97706] shadow-[0_0_8px_#D97706] animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold tracking-widest text-sm text-[#F5F4F0] leading-none font-sans">DRIFT</span>
          <span className="font-mono text-[8px] text-[#D97706] tracking-widest leading-none mt-0.5">SYSTEM 10</span>
        </div>
      </div>

      {/* Compact Lateral Drift Trajectory Pill */}
      <div className="flex-1 min-w-0 px-1 text-center">
        <button
          onClick={onCalibrate}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#16161A] border border-white/10 text-[10px] font-mono text-[#D97706] truncate max-w-full hover:border-[#D97706]/50 shadow-sm active:scale-95 transition-all"
          title="Tap to recalibrate taste baseline"
        >
          <Compass className="w-3 h-3 flex-shrink-0 text-[#D97706] animate-spin-slow" />
          <span className="truncate">{driftPath || 'Calibrated Taste Vector'}</span>
        </button>
      </div>

      {/* Action Controls: Dual Shelf Drawers, View Switcher, Theme & Refresh */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {onToggleDrawerTable && (
          <>
            <button
              onClick={() => onToggleDrawerTable('info')}
              className={`min-w-[32px] min-h-[32px] flex items-center justify-center rounded border transition-all ${
                activeDrawerTable === 'info'
                  ? 'bg-[#18181D] border-white/40 text-[#F5F4F0]'
                  : 'bg-[#111114] border-white/10 text-[#9C9A94] hover:text-[#F5F4F0]'
              }`}
              title="Toggle Music Info Table"
              aria-label="Toggle Music Info Table"
            >
              <FileText className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleDrawerTable('test')}
              className={`min-w-[32px] min-h-[32px] flex items-center justify-center rounded border transition-all ${
                activeDrawerTable === 'test'
                  ? 'bg-[#18181D] border-[#D97706] text-[#D97706]'
                  : 'bg-[#111114] border-white/10 text-[#9C9A94] hover:text-[#F5F4F0]'
              }`}
              title="Toggle Music Test Table"
              aria-label="Toggle Music Test Table"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {onToggleViewMode && (
          <button
            onClick={() => onToggleViewMode(viewMode === 'grid' ? 'studio' : 'grid')}
            className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded bg-[#111114] border border-white/10 text-[#D97706] active:scale-95 transition-all shadow-sm"
            title={viewMode === 'grid' ? 'Switch to Hi-Fi Turntable' : 'Switch to Crate Grid'}
            aria-label="Toggle view mode"
          >
            {viewMode === 'grid' ? <Disc className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
          </button>
        )}

        <button
          onClick={toggleTheme}
          className="min-w-[34px] min-h-[34px] flex items-center justify-center rounded bg-[#111114] hover:bg-[#16161C] border border-white/10 text-[#F5F4F0] active:scale-95 transition-all shadow-sm"
          title={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Pitch Black Mode'}
          aria-label={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Pitch Black Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-[#D97706]" strokeWidth={1.75} />
          ) : (
            <Moon className="w-3.5 h-3.5 text-[#F5F4F0]" strokeWidth={1.75} />
          )}
        </button>

        <button
          onClick={onRefreshCrate}
          disabled={isLoading}
          className="min-w-[34px] min-h-[34px] flex items-center justify-center rounded bg-[#D97706] hover:bg-[#B45309] border border-[#D97706] text-black active:scale-95 transition-all disabled:opacity-50 shadow-[0_0_12px_rgba(217,119,6,0.3)]"
          title="Refresh with 10 completely fresh albums"
          aria-label="Refresh crate"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} strokeWidth={2.2} />
        </button>
      </div>
    </header>
  );
};
