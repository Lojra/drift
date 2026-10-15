import React, { useRef } from 'react';
import { Layers, Disc3, Disc, Compass, Sliders, Download, Upload, Share2, Sun, Moon, ShieldCheck, Radio, Cpu } from 'lucide-react';
import { TasteProfile, AlbumRating, Album } from '../../types/music';
import { useTheme } from '../../contexts/ThemeContext';
import { GenerativeVinylCover } from '../crate/GenerativeVinylCover';

interface SidebarProps {
  activeTab: 'crate' | 'archive' | 'taste';
  setActiveTab: (tab: 'crate' | 'archive' | 'taste') => void;
  tasteProfile: TasteProfile;
  ratings: AlbumRating[];
  onRecalibrate: () => void;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
  onToggleDivergence?: () => void;
  crate?: Album[];
  selectedAlbum?: Album | null;
  onSelectAlbum?: (album: Album) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  tasteProfile,
  ratings,
  onRecalibrate,
  onExportBackup,
  onImportBackup,
  onToggleDivergence,
  crate = [],
  selectedAlbum = null,
  onSelectAlbum
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
    <aside className="w-[260px] xl:w-[275px] flex-shrink-0 audiophile-chassis border-r border-[rgba(245,244,240,0.08)] flex flex-col justify-between p-3.5 z-30 select-none relative audiophile-rack-edge overflow-visible bg-[#0A0A0C]">
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
      <div className="space-y-4 pt-1">
        {/* Brushed Metal Master Console Plate */}
        <div className="p-2.5 rounded-lg bg-[#111114] border border-[rgba(245,244,240,0.08)] shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] shadow-[0_0_10px_rgba(217,119,6,0.8)] animate-pulse" />
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#D97706] font-bold leading-none">
                  PHONO STUDIO
                </span>
                <span className="font-black text-lg tracking-[0.2em] text-[#F5F4F0] font-sans leading-tight">
                  DRIFT
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-[9px] text-[#9C9A94] px-1.5 py-0.5 rounded bg-[#16161C] border border-white/5 block">
                MK-IV RACK
              </span>
              <span className="font-mono text-[8px] text-[#575550] mt-0.5 block">
                192kHz/24b
              </span>
            </div>
          </div>
        </div>

        {/* Section Label */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-2 mb-1.5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#575550]">
              CONSOLE BUS SELECTOR
            </p>
            <span className="font-mono text-[8px] text-[#D97706]">DIRECT CUE</span>
          </div>

          {/* Navigation Items: Styled as Illuminated Rocker Switches */}
          <nav className="space-y-1.5">
            {/* Bus 1: Current 10 Crate */}
            <button
              onClick={() => setActiveTab('crate')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all group relative overflow-hidden ${
                activeTab === 'crate'
                  ? 'bg-[#181820] border-2 border-[#D97706] text-[#F5F4F0] shadow-[0_0_16px_rgba(217,119,6,0.25)]'
                  : 'bg-[#111114]/60 hover:bg-[#16161C] text-[#9C9A94] hover:text-[#F5F4F0] border border-[rgba(245,244,240,0.08)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTab === 'crate'
                      ? 'bg-[#D97706] shadow-[0_0_8px_#D97706]'
                      : 'bg-neutral-700 group-hover:bg-neutral-500'
                  }`}
                />
                <Layers className="w-3.5 h-3.5" strokeWidth={1.8} />
                <span className="tracking-tight uppercase">TURNTABLE CRATE</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  activeTab === 'crate'
                    ? 'bg-[#D97706]/20 text-[#D97706] font-bold border border-[#D97706]/40'
                    : 'text-[#575550] bg-[#16161C]'
                }`}
              >
                10 LPs
              </span>
            </button>

            {/* Bus 2: Rated Archive */}
            <button
              onClick={() => setActiveTab('archive')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all group relative overflow-hidden ${
                activeTab === 'archive'
                  ? 'bg-[#181820] border-2 border-white/60 text-[#F5F4F0] shadow-sm'
                  : 'bg-[#111114]/60 hover:bg-[#16161C] text-[#9C9A94] hover:text-[#F5F4F0] border border-[rgba(245,244,240,0.08)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTab === 'archive'
                      ? 'bg-[#F5F4F0] shadow-[0_0_8px_rgba(245,244,240,0.6)]'
                      : 'bg-neutral-700 group-hover:bg-neutral-500'
                  }`}
                />
                <Disc3 className="w-3.5 h-3.5" strokeWidth={1.8} />
                <span className="tracking-tight uppercase">WAX ARCHIVE</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  activeTab === 'archive'
                    ? 'bg-white/10 text-[#F5F4F0] font-bold border border-white/20'
                    : 'text-[#575550] bg-[#16161C]'
                }`}
              >
                {ratings.length} CUTS
              </span>
            </button>

            {/* Bus 3: Taste Vector Telemetry */}
            <button
              onClick={() => setActiveTab('taste')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all group relative overflow-hidden ${
                activeTab === 'taste'
                  ? 'bg-[#181820] border-2 border-[#D97706] text-[#F5F4F0] shadow-[0_0_16px_rgba(217,119,6,0.25)]'
                  : 'bg-[#111114]/60 hover:bg-[#16161C] text-[#9C9A94] hover:text-[#F5F4F0] border border-[rgba(245,244,240,0.08)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTab === 'taste'
                      ? 'bg-[#D97706] shadow-[0_0_8px_#D97706]'
                      : 'bg-neutral-700 group-hover:bg-neutral-500'
                  }`}
                />
                <Compass className="w-3.5 h-3.5" strokeWidth={1.8} />
                <span className="tracking-tight uppercase">RADAR EQ</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  activeTab === 'taste'
                    ? 'bg-[#D97706]/20 text-[#D97706] font-bold border border-[#D97706]/40'
                    : 'text-[#575550] bg-[#16161C]'
                }`}
              >
                {telemetryPercent}
              </span>
            </button>
          </nav>
        </div>

        {/* Physical 10-LP Vinyl Shelf Unit */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5">
              <Disc className="w-3 h-3 text-[#D97706]" strokeWidth={2} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#575550] font-bold">
                VINYL SHELF // 10-LP RACK
              </span>
            </div>
            <span className="font-mono text-[8px] text-[#D97706] uppercase">POPOUT ON HOVER</span>
          </div>

          {/* Shelving Cabinet Slots */}
          <div className="p-1 rounded-xl bg-[#111114]/90 border border-[rgba(245,244,240,0.08)] shadow-inner space-y-1 overflow-visible">
            {crate && crate.length > 0 ? (
              crate.slice(0, 10).map((album, idx) => {
                const isSelected = selectedAlbum?.id === album.id;
                const albumRating = ratings.find((r) => r.albumId === album.id);
                const isRated = !!albumRating;
                const slotNum = String(idx + 1).padStart(2, '0');

                return (
                  <div
                    key={album.id}
                    className="relative group/slot cursor-pointer"
                    onClick={() => {
                      onSelectAlbum?.(album);
                      if (activeTab !== 'crate') setActiveTab('crate');
                    }}
                  >
                    {/* Tucked-in Vinyl Spine in Shelf Slot */}
                    <div
                      className={`w-full h-7 px-2 rounded-md flex items-center justify-between font-mono text-[10px] transition-all duration-200 border relative ${
                        isSelected
                          ? 'bg-[#181822] border-[#D97706] text-[#D97706] shadow-[0_0_12px_rgba(217,119,6,0.25)] translate-x-1.5'
                          : 'bg-[#111114]/80 hover:bg-[#16161C] border-[rgba(245,244,240,0.06)] hover:border-white/20 text-[#9C9A94] hover:text-[#F5F4F0] hover:translate-x-2'
                      }`}
                    >
                      {/* Left Slot Spine Edge & Title */}
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className={`text-[8px] font-bold ${isSelected ? 'text-[#D97706]' : 'text-[#575550]'}`}>
                          {slotNum}
                        </span>
                        <span
                          className={`w-1 h-3 rounded-full flex-shrink-0 ${
                            isSelected
                              ? 'bg-[#D97706] shadow-[0_0_6px_#D97706]'
                              : isRated
                              ? 'bg-white/60'
                              : 'bg-[#D97706]/60'
                          }`}
                        />
                        <span className="truncate max-w-[125px] font-sans font-medium text-[10px] text-[#F5F4F0]">
                          {album.title}
                        </span>
                      </div>

                      {/* Right Edge Badge */}
                      <div className="flex-shrink-0 text-[8px] font-mono text-[#575550] pl-1">
                        {isRated ? (
                          <span className="text-[#D97706] font-bold">{albumRating.score.toFixed(1)}</span>
                        ) : isSelected ? (
                          <span className="text-[#D97706] font-bold">CUED</span>
                        ) : (
                          <span className="text-[#575550]">LP</span>
                        )}
                      </div>
                    </div>

                    {/* Pop-Out Vinyl Record Sleeve & Spinning Disc Preview */}
                    <div className={`absolute left-full ${idx >= 6 ? 'bottom-0' : 'top-1/2 -translate-y-1/2'} ml-3 w-64 p-3 rounded-xl bg-[#111114] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.98)] opacity-0 pointer-events-none group-hover/slot:opacity-100 group-hover/slot:pointer-events-auto transition-all duration-300 z-50 flex flex-col gap-2.5 backdrop-blur-xl`}>
                      {/* Popout Header */}
                      <div className="flex items-center justify-between text-[9px] font-mono">
                        <span className="text-[#D97706] font-bold">LP RACK SLOT #{slotNum}</span>
                        <span className="text-[#575550] uppercase tracking-wider">
                          {isSelected ? 'ON TURNTABLE PLATTER' : 'READY TO DROP'}
                        </span>
                      </div>

                      {/* Artwork with Grooved Vinyl Disc Sliding Out */}
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-neutral-950 border border-white/10 shadow-lg flex items-center justify-center">
                        {/* Grooved Vinyl Disc Slipping Out */}
                        <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full vinyl-grooves border border-neutral-700 shadow-2xl flex items-center justify-center transition-transform duration-500 group-hover/slot:translate-x-4">
                          <div className="w-12 h-12 rounded-full bg-[#D97706]/80 border border-neutral-900 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-black" />
                          </div>
                        </div>

                        {/* Front Jacket Art */}
                        <div className="relative w-full h-full z-10 rounded-lg overflow-hidden">
                          {album.coverArtUrl ? (
                            <img
                              src={album.coverArtUrl}
                              alt={album.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <GenerativeVinylCover album={album} className="w-full h-full" />
                          )}
                          <div className="absolute inset-0 vinyl-sleeve-gloss pointer-events-none" />
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="min-w-0">
                        <h4 className="font-sans font-bold text-xs text-[#F5F4F0] truncate">
                          {album.title}
                        </h4>
                        <p className="font-sans text-[11px] text-[#9C9A94] truncate">
                          {album.artist} &middot; <span className="font-mono text-[10px]">{album.releaseYear}</span>
                        </p>
                      </div>

                      {/* Lateral Drift Reason */}
                      {album.driftReason && (
                        <p className="font-sans text-[10px] text-[#575550] italic line-clamp-2 leading-relaxed bg-[#16161C] p-1.5 rounded border border-white/5">
                          &ldquo;{album.driftReason}&rdquo;
                        </p>
                      )}

                      {/* Drop Action */}
                      <div className="flex items-center justify-between pt-1 border-t border-[rgba(245,244,240,0.08)] text-[9px] font-mono">
                        <span className="text-[#D97706] flex items-center gap-1 font-bold">
                          <Disc className="w-3 h-3 animate-spin-slow" />
                          CLICK TO DROP ON TURNTABLE
                        </span>
                        {isRated && (
                          <span className="text-[#F5F4F0] font-bold">RATED {albumRating.score.toFixed(1)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-4 text-center font-mono text-[10px] text-[#575550]">
                LOADING 10-LP RACK...
              </div>
            )}
          </div>
        </div>

        {/* Rack Calibration & Analog Bias Controls */}
        <div className="p-2.5 rounded-lg bg-[#111114]/70 border border-[rgba(245,244,240,0.08)] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#575550]">
              RACK BIAS &amp; FILTERS
            </span>
            <Cpu className="w-3 h-3 text-[#575550]" />
          </div>

          <div className="space-y-1 font-mono text-[11px] text-[#9C9A94]">
            <div
              onClick={onToggleDivergence}
              className="flex justify-between items-center py-0.5 border-b border-[rgba(245,244,240,0.08)] cursor-pointer hover:text-[#F5F4F0] transition-colors group"
              title="Click to cycle Lateral Divergence degree (+2.1σ, +4.2σ, +6.8σ)"
            >
              <span className="text-[10px] group-hover:text-[#F5F4F0]">Lateral Bias</span>
              <span className="text-[#D97706] font-semibold group-hover:text-amber-400 flex items-center gap-1">
                {divergenceLabel}
              </span>
            </div>

            <div className="flex justify-between items-center py-0.5 border-b border-[rgba(245,244,240,0.08)]">
              <span className="text-[10px]">Phono RIAA</span>
              <span className="text-[#F5F4F0] font-semibold text-[10px]">±0.1 dB</span>
            </div>

            <div className="flex justify-between items-center py-0.5">
              <span className="text-[10px]">Cartridge Load</span>
              <span className="text-[#9C9A94] font-semibold text-[10px]">47kΩ / 100pF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Area: Vacuum Tube Preamplifier Baseline & Tape Archival Tools */}
      <div className="space-y-3 pt-3">
        {/* Vacuum Tube Stage Card */}
        <div className="p-3 rounded-lg bg-[#16161C] border border-white/10 space-y-2.5 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#D97706]/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#D97706] animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#F5F4F0] font-bold">
                TUBE STAGE 12AX7
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-ping" />
              <span className="font-mono text-[8px] text-[#D97706]">HOT</span>
            </div>
          </div>

          {/* Active Sonic Baseline Pills */}
          <div className="flex flex-wrap gap-1">
            {activePills.map((pill) => (
              <span
                key={pill}
                className="font-mono text-[10px] font-medium text-[#D97706] bg-[#D97706]/10 border border-[#D97706]/30 px-2 py-0.5 rounded-full"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* Recalibrate Taste Button */}
          <button
            onClick={onRecalibrate}
            className="w-full mt-1 py-1.5 px-2.5 rounded border border-white/10 hover:border-[#D97706] text-[#9C9A94] hover:text-[#D97706] font-mono text-[10px] tracking-tight transition-all text-center flex items-center justify-center gap-1.5 group bg-[#111114]"
          >
            <Sliders className="w-3 h-3 text-[#575550] group-hover:text-[#D97706] transition-colors" />
            <span>CALIBRATE PHONO STAGE</span>
          </button>
        </div>

        {/* Master Tape Archival & Export Controls */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-2 py-1 rounded bg-[#111114] border border-[rgba(245,244,240,0.08)] text-[9px] font-mono text-[#575550]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#D97706]" strokeWidth={1.8} />
              <span className="text-[#9C9A94]">AIR-GAPPED VAULT</span>
            </div>
            <span className="text-[#D97706] text-[8px] font-bold tracking-wider">LOCAL ONLY</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={onExportBackup}
              title="Export rating history and crate to JSON backup"
              className="flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-[#111114] border border-[rgba(245,244,240,0.08)] hover:border-white/20 text-[9px] font-mono text-[#9C9A94] hover:text-[#F5F4F0] transition-colors"
            >
              <Download className="w-2.5 h-2.5" strokeWidth={1.5} />
              <span>DUMP REC</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import rating history and crate from JSON"
              className="flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-[#111114] border border-[rgba(245,244,240,0.08)] hover:border-white/20 text-[9px] font-mono text-[#9C9A94] hover:text-[#F5F4F0] transition-colors"
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
            className="w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-[#111114] border border-[rgba(245,244,240,0.08)] hover:border-white/20 text-[9px] font-mono text-[#575550] hover:text-[#9C9A94] transition-colors"
          >
            <Share2 className="w-2.5 h-2.5 text-[#575550]" strokeWidth={1.5} />
            <span>COPY CONSOLE LINK</span>
          </button>

          {/* Theme Mode Toggle (Zero Emoji) */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Editorial White Mode' : 'Switch to Pitch Black Mode'}
            className="w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-[#111114] border border-[rgba(245,244,240,0.08)] hover:border-white/20 text-[9px] font-mono text-[#575550] hover:text-[#9C9A94] transition-colors"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-2.5 h-2.5 text-[#D97706]" strokeWidth={1.5} />
                <span>STUDIO WHITE</span>
              </>
            ) : (
              <>
                <Moon className="w-2.5 h-2.5 text-[#F5F4F0]" strokeWidth={1.5} />
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
