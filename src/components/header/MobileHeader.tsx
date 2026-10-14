import React from 'react';
import { RotateCw, Compass } from 'lucide-react';

interface MobileHeaderProps {
  driftPath: string;
  onRefreshCrate: () => void;
  isLoading: boolean;
  onCalibrate?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  driftPath,
  onRefreshCrate,
  isLoading,
  onCalibrate
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#050507]/90 backdrop-blur-xl border-b border-border-subtle md:hidden px-3.5 py-2.5 flex items-center justify-between gap-2 select-none">
      {/* Brand & Wordmark */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-6 h-6 rounded bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-electric-blue shadow-[0_0_8px_#3B82F6]" />
        </div>
        <span className="font-bold tracking-tight text-sm text-text-offwhite">DRIFT</span>
      </div>

      {/* Compact Lateral Drift Trajectory Pill */}
      <div className="flex-1 min-w-0 px-1 text-center">
        <button
          onClick={onCalibrate}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-panel-elevated/80 border border-border-light text-[10px] font-mono text-purple-soft truncate max-w-full hover:border-purple-soft/50 transition-colors"
          title="Tap to recalibrate taste baseline"
        >
          <Compass className="w-3 h-3 flex-shrink-0 text-purple-soft" />
          <span className="truncate">{driftPath || 'Calibrated Taste Vector'}</span>
        </button>
      </div>

      {/* One-Tap Refresh Crate Button */}
      <button
        onClick={onRefreshCrate}
        disabled={isLoading}
        className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-md bg-panel-elevated hover:bg-panel-hover border border-border-light text-text-offwhite active:scale-95 transition-all disabled:opacity-50 flex-shrink-0"
        title="Refresh with 10 completely fresh albums"
        aria-label="Refresh crate"
      >
        <RotateCw className={`w-4 h-4 text-electric-blue ${isLoading ? 'animate-spin' : ''}`} strokeWidth={1.8} />
      </button>
    </header>
  );
};
