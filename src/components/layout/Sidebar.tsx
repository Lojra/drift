import React, { useRef } from 'react';
import { Layers, Disc3, Compass, Sliders, Download, Upload, Share2, Sun, Moon, ShieldCheck, Radio, Cpu } from 'lucide-react';
import { TasteProfile, AlbumRating } from '../../types/music';
import { useTheme } from '../../contexts/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();

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
    <aside className="w-[250px] flex-shrink-0 audiophile-chassis border-r border-border-subtle flex flex-col justify-between p-4 z-20 select-none relative audiophile-rack-edge">
      {/* Top Countersunk Hex Bolt Fasteners */}
      <div className="absolute top-2 left-2 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900 shadow-inner flex items-center justify-center">
          <div className="w-0.5 h-0.5 bg-neutral-500 rounded-full" />
        </div>
      </div>
      <div className="absolute top-2 right-2 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900 shadow-inner flex items-center justify-center">
          <div className="w-0.5 h-0.5 bg-neutral-500 rounded-full" />
        </div>
      </div>

      {/* Top Branding & Master Console Channel Selector */}
      <div className="space-y-5 pt-1">
        {/* Brushed Metal Master Console Plate */}
        <div className="p-2.5 rounded-lg bg-panel-obsidian/90 border border-border-subtle shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse" />
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-widest text-amber-500/90 font-bold leading-none">
                  PHONO STUDIO
                </span>
                <span className="font-black text-lg tracking-[0.2em] text-text-offwhite font-sans leading-tight">
                  DRIFT
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-[9px] text-text-dim px-1.5 py-0.5 rounded bg-panel-elevated border border-border-subtle block">
                MK-IV RACK
              </span>
              <span className="font-mono text-[8px] text-text-dim mt-0.5 block">
                192kHz/24b
              </span>
            </div>
          </div>
        </div>

        {/* Section Label */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-2 mb-1.5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-text-dim">
              CONSOLE BUS SELECTOR
            </p>
            <span className="font-mono text-[8px] text-electric-blue">DIRECT CUE</span>
          </div>

          {/* Navigation Items: Styled as Illuminated Audiophile Rocker Switches */}
          <nav className="space-y-1.5">
            {/* Bus 1: Current 10 Crate */}
            <button
              onClick={() => setActiveTab('crate')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono font-medium transition-all group relative overflow-hidden ${
                activeTab === 'crate'
                  ? 'bg-panel-elevated border-2 border-electric-blue text-text-offwhite shadow-[0_0_16px_rgba(59,130,246,0.25)]'
                  : 'bg-panel-obsidian/60 hover:bg-panel-elevated/70 text-text-muted hover:text-text-offwhite border border-border-subtle'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTab === 'crate'
                      ? 'bg-electric-blue shadow-[0_0_8px_#3B82F6]'
                      : 'bg-neutral-700 group-hover:bg-neutral-500'
                  }`}
                />
                <Layers className="w-3.5 h-3.5" strokeWidth={1.8} />
                <span className="tracking-tight uppercase">TURNTABLE CRATE</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  activeTab === 'crate'
                    ? 'bg-electric-blue/20 text-electric-blue font-bold border border-electric-blue/40'
                    : 'text-text-dim bg-panel-elevated'
                }`}
              >
                10 LPs
              </span>
            </button>

            {/* Bus 2: Rated Archive */}
            <button
              onClick={() => setActiveTab('archive')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono font-medium transition-all group relative overflow-hidden ${
                activeTab === 'archive'
                  ? 'bg-panel-elevated border-2 border-purple-soft text-text-offwhite shadow-[0_0_16px_rgba(192,132,252,0.25)]'
                  : 'bg-panel-obsidian/60 hover:bg-panel-elevated/70 text-text-muted hover:text-text-offwhite border border-border-subtle'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTab === 'archive'
                      ? 'bg-purple-soft shadow-[0_0_8px_#C084FC]'
                      : 'bg-neutral-700 group-hover:bg-neutral-500'
                  }`}
                />
                <Disc3 className="w-3.5 h-3.5" strokeWidth={1.8} />
                <span className="tracking-tight uppercase">WAX ARCHIVE</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  activeTab === 'archive'
                    ? 'bg-purple-soft/20 text-purple-soft font-bold border border-purple-soft/40'
                    : 'text-text-dim bg-panel-elevated'
                }`}
              >
                {ratings.length} CUTS
              </span>
            </button>

            {/* Bus 3: Taste Vector Telemetry */}
            <button
              onClick={() => setActiveTab('taste')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono font-medium transition-all group relative overflow-hidden ${
                activeTab === 'taste'
                  ? 'bg-panel-elevated border-2 border-amber-500 text-text-offwhite shadow-[0_0_16px_rgba(245,158,11,0.25)]'
                  : 'bg-panel-obsidian/60 hover:bg-panel-elevated/70 text-text-muted hover:text-text-offwhite border border-border-subtle'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTab === 'taste'
                      ? 'bg-amber-500 shadow-[0_0_8px_#F59E0B]'
                      : 'bg-neutral-700 group-hover:bg-neutral-500'
                  }`}
                />
                <Compass className="w-3.5 h-3.5" strokeWidth={1.8} />
                <span className="tracking-tight uppercase">RADAR EQ</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  activeTab === 'taste'
                    ? 'bg-amber-500/20 text-amber-500 font-bold border border-amber-500/40'
                    : 'text-text-dim bg-panel-elevated'
                }`}
              >
                {telemetryPercent}
              </span>
            </button>
          </nav>
        </div>

        {/* Rack Calibration & Analog Bias Controls */}
        <div className="p-3 rounded-lg bg-panel-obsidian/70 border border-border-subtle space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim">
              RACK BIAS & FILTERS
            </span>
            <Cpu className="w-3 h-3 text-text-dim" />
          </div>

          <div className="space-y-1.5 font-mono text-[11px] text-text-muted">
            <div
              onClick={onToggleDivergence}
              className="flex justify-between items-center py-1 border-b border-border-subtle cursor-pointer hover:text-text-offwhite transition-colors group"
              title="Click to cycle Lateral Divergence degree (+2.1σ, +4.2σ, +6.8σ)"
            >
              <span className="text-[10px] group-hover:text-text-offwhite">Lateral Bias</span>
              <span className="text-amber-400 font-semibold group-hover:text-amber-300 flex items-center gap-1">
                {divergenceLabel}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-border-subtle">
              <span className="text-[10px]">Phono RIAA</span>
              <span className="text-electric-blue font-semibold text-[10px]">±0.1 dB</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-[10px]">Cartridge Load</span>
              <span className="text-purple-soft font-semibold text-[10px]">47kΩ / 100pF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Area: Vacuum Tube Preamplifier Baseline & Tape Archival Tools */}
      <div className="space-y-3 pt-3">
        {/* Vacuum Tube Stage Card */}
        <div className="p-3 rounded-lg bg-panel-elevated border border-border-light/40 space-y-2.5 relative overflow-hidden">
          {/* Subtle Warm Amber Valve Filament Background Glow */}
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-offwhite font-bold">
                TUBE STAGE 12AX7
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              <span className="font-mono text-[8px] text-amber-500">HOT</span>
            </div>
          </div>

          {/* Active Sonic Baseline Pills */}
          <div className="flex flex-wrap gap-1">
            {activePills.map((pill) => (
              <span
                key={pill}
                className="font-mono text-[10px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* Recalibrate Taste Button */}
          <button
            onClick={onRecalibrate}
            className="w-full mt-1 py-1.5 px-2.5 rounded border border-border-light hover:border-amber-500 text-text-muted hover:text-amber-400 font-mono text-[10px] tracking-tight transition-all text-center flex items-center justify-center gap-1.5 group bg-panel-obsidian/80"
          >
            <Sliders className="w-3 h-3 text-text-dim group-hover:text-amber-400 transition-colors" />
            <span>CALIBRATE PHONO STAGE</span>
          </button>
        </div>

        {/* Master Tape Archival & Export Controls */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-2 py-1 rounded bg-panel-obsidian border border-border-subtle text-[9px] font-mono text-text-dim">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-electric-blue" strokeWidth={1.8} />
              <span className="text-text-muted">AIR-GAPPED VAULT</span>
            </div>
            <span className="text-electric-blue text-[8px] font-bold tracking-wider">LOCAL ONLY</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={onExportBackup}
              title="Export rating history and crate to JSON backup"
              className="flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-panel-obsidian border border-border-subtle hover:border-border-light text-[9px] font-mono text-text-dim hover:text-text-offwhite transition-colors"
            >
              <Download className="w-2.5 h-2.5" strokeWidth={1.5} />
              <span>DUMP REC</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import rating history and crate from JSON"
              className="flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-panel-obsidian border border-border-subtle hover:border-border-light text-[9px] font-mono text-text-dim hover:text-text-offwhite transition-colors"
            >
              <Upload className="w-2.5 h-2.5" strokeWidth={1.5} />
              <span>INGEST</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>

          {/* Share / Console Link */}
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.origin);
                alert("DRIFT console URL copied to clipboard.");
              }
            }}
            title="Copy app link for quick access"
            className="w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-panel-obsidian border border-border-subtle hover:border-border-light text-[9px] font-mono text-text-dim hover:text-text-muted transition-colors"
          >
            <Share2 className="w-2.5 h-2.5 text-text-dim" strokeWidth={1.5} />
            <span>COPY CONSOLE LINK</span>
          </button>

          {/* Theme Mode Toggle (Zero Emoji) */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Obsidian Dark Mode'}
            className="w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-panel-obsidian border border-border-subtle hover:border-border-light text-[9px] font-mono text-text-dim hover:text-text-muted transition-colors"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-2.5 h-2.5 text-amber-500" strokeWidth={1.5} />
                <span>STUDIO WHITE</span>
              </>
            ) : (
              <>
                <Moon className="w-2.5 h-2.5 text-purple-soft" strokeWidth={1.5} />
                <span>OBSIDIAN BLACK</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Countersunk Hex Bolt Fasteners */}
      <div className="absolute bottom-2 left-2 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900 shadow-inner flex items-center justify-center">
          <div className="w-0.5 h-0.5 bg-neutral-500 rounded-full" />
        </div>
      </div>
      <div className="absolute bottom-2 right-2 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900 shadow-inner flex items-center justify-center">
          <div className="w-0.5 h-0.5 bg-neutral-500 rounded-full" />
        </div>
      </div>
    </aside>
  );
};
