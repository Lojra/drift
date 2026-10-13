import React, { useRef } from 'react';
import { Layers, Disc3, Compass, Sliders, Download, Upload, Share2 } from 'lucide-react';
import { TasteProfile, AlbumRating } from '../../types/music';

interface SidebarProps {
  activeTab: 'crate' | 'archive' | 'taste';
  setActiveTab: (tab: 'crate' | 'archive' | 'taste') => void;
  tasteProfile: TasteProfile;
  ratings: AlbumRating[];
  onRecalibrate: () => void;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
  onToggleDivergence?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  tasteProfile,
  ratings,
  onRecalibrate,
  onExportBackup,
  onImportBackup,
  onToggleDivergence
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
    }
  };

  // Human readable active baseline pills
  const activePills = React.useMemo(() => {
    const map: Record<string, string> = {
      hypnotic: 'Hypnotic',
      distorted: 'Raw Distorted',
      warm: 'Warm Analog',
      melancholic: 'Spacious',
      percussive: 'Percussive',
      experimental: 'Experimental'
    };
    const pills = tasteProfile.selectedStartingPoints.map(id => map[id] || id);
    if (pills.length === 0) {
      return ['Hypnotic', 'Warm Analog', 'Spacious'];
    }
    return pills.slice(0, 3);
  }, [tasteProfile.selectedStartingPoints]);

  const divergence = tasteProfile.vectorDivergence || 4.2;
  const divergenceLabel = `+${divergence.toFixed(1)}σ`;

  // Dynamic calibrated percentage
  const telemetryPercent = React.useMemo(() => {
    if (!tasteProfile.calibrated) return '15%';
    const ratedWeight = Math.min(40, ratings.length * 4);
    return `${Math.min(99, 65 + ratedWeight)}%`;
  }, [tasteProfile.calibrated, ratings.length]);

  return (
    <aside className="w-[240px] flex-shrink-0 bg-panel-obsidian border-r border-border-subtle flex flex-col justify-between p-5 z-20 select-none">
      {/* Top Branding & Navigation */}
      <div className="space-y-6">
        {/* Wordmark Header */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-[0.22em] text-text-offwhite font-sans">
              DRIFT
            </span>
            <div className="flex items-center gap-1.5 ml-1">
              <span className="w-2 h-2 rounded-full bg-electric-blue"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-soft opacity-80"></span>
              <span className="w-1 h-1 rounded-full bg-text-muted opacity-60"></span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-text-dim px-1.5 py-0.5 rounded border border-border-subtle">
            v2.4
          </span>
        </div>

        {/* Section Label */}
        <div className="space-y-1.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-dim px-2 mb-2">
            Navigation
          </p>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {/* Active / Inactive: Current 10 Crate */}
            <button
              onClick={() => setActiveTab('crate')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all group ${
                activeTab === 'crate'
                  ? 'bg-panel-elevated border border-border-light text-text-offwhite'
                  : 'hover:bg-panel-elevated/50 text-text-muted hover:text-text-offwhite border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers
                  className={`w-4 h-4 transition-colors ${
                    activeTab === 'crate' ? 'text-electric-blue' : 'text-text-muted group-hover:text-text-offwhite'
                  }`}
                  strokeWidth={1.8}
                />
                <span className="tracking-tight">Current 10 Crate</span>
              </div>
              {activeTab === 'crate' ? (
                <span className="w-1.5 h-1.5 rounded-full bg-electric-blue shadow-[0_0_8px_#3B82F6]"></span>
              ) : (
                <span className="font-mono text-[11px] text-text-dim">10</span>
              )}
            </button>

            {/* Rated Archive */}
            <button
              onClick={() => setActiveTab('archive')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all group ${
                activeTab === 'archive'
                  ? 'bg-panel-elevated border border-border-light text-text-offwhite'
                  : 'hover:bg-panel-elevated/50 text-text-muted hover:text-text-offwhite border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Disc3
                  className={`w-4 h-4 transition-colors ${
                    activeTab === 'archive' ? 'text-electric-blue' : 'text-text-muted group-hover:text-text-offwhite'
                  }`}
                  strokeWidth={1.8}
                />
                <span className="tracking-tight">Rated Archive</span>
              </div>
              <span className="font-mono text-[11px] text-text-dim">
                {ratings.length}
              </span>
            </button>

            {/* Taste Vector */}
            <button
              onClick={() => setActiveTab('taste')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all group ${
                activeTab === 'taste'
                  ? 'bg-panel-elevated border border-border-light text-text-offwhite'
                  : 'hover:bg-panel-elevated/50 text-text-muted hover:text-text-offwhite border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass
                  className={`w-4 h-4 transition-colors ${
                    activeTab === 'taste' ? 'text-electric-blue' : 'text-text-muted group-hover:text-text-offwhite'
                  }`}
                  strokeWidth={1.8}
                />
                <span className="tracking-tight">Taste Vector</span>
              </div>
              <span className="font-mono text-[10px] text-purple-soft/80 bg-purple-soft/10 px-1.5 py-0.5 rounded">
                {telemetryPercent}
              </span>
            </button>
          </nav>
        </div>

        {/* Curatorial Metric Sub-list: Discovery Filters */}
        <div className="pt-2">
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-dim px-2 mb-2">
            Discovery Filters
          </p>
          <div className="space-y-1.5 px-2 font-mono text-xs text-text-muted">
            <div
              onClick={onToggleDivergence}
              className="flex justify-between items-center py-1 border-b border-border-subtle cursor-pointer hover:text-text-offwhite transition-colors group"
              title="Click to cycle Lateral Divergence degree (+2.1σ, +4.2σ, +6.8σ)"
            >
              <span className="text-[11px] group-hover:text-text-offwhite transition-colors">
                Vector Divergence
              </span>
              <span className="text-text-offwhite text-[11px] font-semibold group-hover:text-purple-soft transition-colors flex items-center gap-1">
                {divergenceLabel}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-border-subtle">
              <span className="text-[11px]">Analog Saturation</span>
              <span className="text-electric-blue text-[11px]">High (88%)</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[11px]">Crate Cadence</span>
              <span className="text-purple-soft text-[11px]">10/batch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Area: Active Sonic Baseline Card & Backup Tools */}
      <div className="space-y-3 pt-4">
        {/* Active Sonic Baseline Card */}
        <div className="p-3.5 rounded-lg bg-panel-elevated border border-border-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim">
              Active Sonic Baseline
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-soft animate-pulse"></span>
          </div>

          {/* 3 Light-Purple Pill Tags */}
          <div className="flex flex-wrap gap-1.5">
            {activePills.map((pill) => (
              <span
                key={pill}
                className="font-mono text-[11px] font-medium text-purple-soft bg-purple-soft/10 border border-purple-soft/20 px-2 py-0.5 rounded-full"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* Ghost Button: Recalibrate Taste */}
          <button
            onClick={onRecalibrate}
            className="w-full mt-1 py-1.5 px-2.5 rounded border border-border-light hover:border-text-muted text-text-muted hover:text-text-offwhite font-mono text-[11px] tracking-tight transition-all text-center flex items-center justify-center gap-1.5 group"
          >
            <Sliders className="w-3 h-3 text-text-dim group-hover:text-text-offwhite transition-colors" />
            <span>Recalibrate Taste</span>
          </button>
        </div>

        {/* Data Persistence Tools & PWA / Share */}
        <div className="space-y-1.5 pt-1">
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={onExportBackup}
              title="Export rating history and crate to JSON backup"
              className="flex items-center justify-center gap-1.5 py-1 px-2 rounded border border-border-subtle hover:border-border-light text-[10px] font-mono text-text-dim hover:text-text-muted transition-colors"
            >
              <Download className="w-3 h-3" strokeWidth={1.5} />
              <span>Export</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import rating history and crate from JSON"
              className="flex items-center justify-center gap-1.5 py-1 px-2 rounded border border-border-subtle hover:border-border-light text-[10px] font-mono text-text-dim hover:text-text-muted transition-colors"
            >
              <Upload className="w-3 h-3" strokeWidth={1.5} />
              <span>Import</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>

          {/* Share / App Link */}
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.origin);
                alert("DRIFT application URL copied to clipboard.");
              }
            }}
            title="Copy app link for quick access"
            className="w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded border border-border-subtle hover:border-border-light text-[10px] font-mono text-text-dim hover:text-text-muted transition-colors"
          >
            <Share2 className="w-3 h-3 text-text-dim" strokeWidth={1.5} />
            <span>Copy App Link</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
