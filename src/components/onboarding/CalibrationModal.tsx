import React, { useState, useEffect } from 'react';
import { Check, Compass, ArrowRight } from 'lucide-react';
import { SONIC_STARTING_POINTS } from '../../services/sonicBridge';

interface CalibrationModalProps {
  isOpen: boolean;
  onCalibrate: (startingPointIds: string[], baselineInputs: string[]) => void;
  onClose?: () => void;
}

export const CalibrationModal: React.FC<CalibrationModalProps> = ({
  isOpen,
  onCalibrate,
  onClose
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['hypnotic', 'warm']);
  const [anchorInput, setAnchorInput] = useState<string>('Joy Division, Can');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Close on Escape key if allowed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleTexture = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }
      if (prev.length >= 3) {
        // Swap earliest selection to enforce cap at 3
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const handleClearAnchor = () => {
    setAnchorInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0 && !anchorInput.trim()) return;

    setIsSubmitting(true);
    const baselines = anchorInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    setTimeout(() => {
      onCalibrate(selectedIds, baselines);
      setIsSubmitting(false);
    }, 600);
  };

  const selectedCount = selectedIds.length;
  const isReady = selectedCount >= 2 || (selectedCount >= 1 && anchorInput.trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none">
      {/* Audiophile Hardware Setup Container (Exact 560px max width) */}
      <div className="relative w-full max-w-[560px] max-h-[92vh] audiophile-chassis rounded-2xl border border-border-light shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-y-auto flex flex-col z-20">
        {/* Hex Bolts in Corners */}
        <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900" />
        <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900" />
        <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900" />
        <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900" />

        {/* Top Amber Illumination Accent Strip */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/70 to-transparent flex-shrink-0" />

        {/* Modal Header */}
        <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-3 sm:pb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            {/* Eyebrow with Pulsing Amber Valve Node */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#F59E0B] animate-pulse" />
              <span className="font-mono text-[10px] text-amber-500 tracking-widest uppercase font-bold">
                PHONO CARTRIDGE ALIGNMENT &middot; STEP 01
              </span>
            </div>
            {/* Dismiss / Escape Hint */}
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-[11px] text-text-dim hover:text-text-muted cursor-pointer transition-colors px-1.5 py-0.5 rounded border border-border-subtle"
              >
                ESC
              </button>
            ) : (
              <span className="font-mono text-[10px] text-text-dim px-1.5 py-0.5 rounded border border-border-subtle">
                REQUIRED
              </span>
            )}
          </div>

          <h1 className="text-xl font-bold tracking-tight text-text-offwhite font-sans">
            SET INITIAL ACOUSTIC HARMONICS
          </h1>
          <p className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
            Select 2-3 sonic frequency foundations. We will carve your first 10 vinyl records and dynamically drift into lateral acoustic dimensions as you evaluate them.
          </p>
        </div>

        {/* Main Modal Body */}
        <div className="px-5 sm:px-7 space-y-4 pb-2">
          {/* 12 Sonic Texture Cards in 2-column scrollable grid */}
          <div className="grid grid-cols-2 gap-2.5 max-h-[290px] overflow-y-auto pr-1" id="textureGrid">
            {SONIC_STARTING_POINTS.map((point) => {
              const isSelected = selectedIds.includes(point.id);
              return (
                <div
                  key={point.id}
                  onClick={() => toggleTexture(point.id)}
                  className={`texture-card cursor-pointer p-3.5 rounded-xl transition-all flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-panel-elevated border-2 border-amber-500/80 shadow-[0_0_16px_rgba(245,158,11,0.2)]'
                      : 'bg-panel-obsidian border border-border-subtle hover:border-border-light hover:bg-panel-elevated'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-bold leading-tight font-sans transition-colors ${
                        isSelected ? 'text-amber-400' : 'text-text-offwhite group-hover:text-amber-300'
                      }`}
                    >
                      {point.title}
                    </span>
                    <div
                      className={`status-icon w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-amber-500 text-black font-bold'
                          : 'border border-border-subtle group-hover:border-text-muted'
                      }`}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-black stroke-[3]" />
                      )}
                    </div>
                  </div>
                  <p className="font-sans text-[11px] text-text-muted mt-1.5 line-clamp-2 leading-snug">
                    {point.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Section: Optional Reference Artist/Album Anchor Input */}
          <div className="pt-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-text-dim uppercase tracking-wider">
                  REFERENCE DISC / ARTIST ANCHOR
                </span>
                <span className="font-mono text-[9px] text-text-dim px-1 rounded bg-panel-elevated border border-border-subtle">
                  GEO-BIAS 0%
                </span>
              </div>
              <span className="font-mono text-[10px] text-text-dim">FREEFORM</span>
            </div>

            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-text-muted pointer-events-none">
                <Compass className="w-4 h-4 text-amber-500" strokeWidth={1.5} />
              </div>
              <input
                type="text"
                value={anchorInput}
                onChange={(e) => setAnchorInput(e.target.value)}
                placeholder="Or type 1-2 benchmark artists or albums as reference..."
                className="w-full bg-panel-obsidian border border-border-subtle focus:border-amber-500 rounded-lg py-2.5 pl-10 pr-24 font-mono text-xs text-text-offwhite placeholder:text-text-dim outline-none transition-all shadow-inner"
              />
              <div className="absolute right-2 flex items-center gap-1">
                {anchorInput.trim() ? (
                  <button
                    type="button"
                    onClick={handleClearAnchor}
                    className="font-mono text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded cursor-pointer hover:bg-amber-500/20 transition-all font-bold"
                  >
                    Active Anchor
                  </button>
                ) : (
                  <span className="font-mono text-[10px] text-text-dim border border-border-subtle px-1.5 py-0.5 rounded">
                    Optional
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Action */}
        <div className="px-5 sm:px-7 pt-3 pb-6 space-y-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isReady || isSubmitting}
            className="w-full py-3 px-4 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-black font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(217,119,6,0.35)] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>CALCULATING PHONO BIAS &amp; CUTTING CRATE...</span>
            ) : (
              <>
                <span>INITIALIZE FIRST 10 VINYL RECORDS</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </>
            )}
          </button>

          {/* Dynamic Counter Footer Caption */}
          <div className="text-center font-mono text-[11px] text-text-muted tracking-tight">
            {selectedCount >= 2 ? (
              <span>
                {selectedCount} OF 3 BIAS TILES SELECTED &bull;{' '}
                <span className="text-amber-400 font-bold">CARTRIDGE ALIGNMENT READY</span>
              </span>
            ) : (
              <span>
                {selectedCount} OF 3 BIAS TILES SELECTED &bull;{' '}
                <span className="text-text-dim">SELECT AT LEAST 2 TO CALIBRATE</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
