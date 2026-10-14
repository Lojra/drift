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
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none">
      {/* Calibration Modal Container (Exact 560px max width, scrollable on mobile) */}
      <div className="relative w-full max-w-[560px] max-h-[92vh] bg-panel-obsidian rounded-2xl border border-border-light shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-y-auto flex flex-col z-20">
        {/* Top Subtle Illumination Accent Strip */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-soft/60 to-transparent flex-shrink-0"></div>

        {/* Modal Header */}
        <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-3 sm:pb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            {/* Eyebrow with Pulsing Purple Node */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-soft shadow-[0_0_8px_#C084FC]"></span>
              <span className="font-mono text-[10px] text-purple-soft tracking-widest uppercase">
                TASTE RECALIBRATION // STEP 01
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
            SET YOUR STARTING DIRECTION
          </h1>
          <p className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
            Pick 2-3 broad sonic textures. We will generate 10 albums and drift across new genres as you rate them.
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
                      ? 'bg-panel-elevated border border-purple-soft/80 shadow-[0_0_16px_rgba(192,132,252,0.12)]'
                      : 'bg-panel-elevated border border-white/[0.06] hover:border-white/[0.18] hover:bg-panel-hover'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-semibold leading-tight transition-colors ${
                        isSelected ? 'text-text-offwhite' : 'text-text-offwhite group-hover:text-purple-soft'
                      }`}
                    >
                      {point.title}
                    </span>
                    <div
                      className={`status-icon w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'text-purple-soft'
                          : 'border border-border-subtle group-hover:border-text-muted'
                      }`}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-purple-soft stroke-[2.2]" />
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

          {/* Section: Optional Anchor Input */}
          <div className="pt-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-text-dim uppercase tracking-wider">
                  OPTIONAL ANCHOR REFERENCE
                </span>
                <span className="font-mono text-[9px] text-text-dim px-1 rounded bg-panel-elevated border border-border-subtle">
                  GEO-BIAS 0%
                </span>
              </div>
              <span className="font-mono text-[10px] text-text-dim">FREEFORM</span>
            </div>

            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-text-muted pointer-events-none">
                <Compass className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <input
                type="text"
                value={anchorInput}
                onChange={(e) => setAnchorInput(e.target.value)}
                placeholder="Or type 1-2 artists or genres as a loose anchor..."
                className="w-full bg-panel-elevated border border-white/[0.08] focus:border-electric-blue rounded-lg py-2.5 pl-10 pr-24 font-sans text-xs text-text-offwhite placeholder:text-text-dim outline-none transition-all"
              />
              <div className="absolute right-2 flex items-center gap-1">
                {anchorInput.trim() ? (
                  <button
                    type="button"
                    onClick={handleClearAnchor}
                    className="font-mono text-[10px] text-purple-soft/90 bg-purple-soft/10 border border-purple-soft/30 px-1.5 py-0.5 rounded cursor-pointer hover:bg-purple-soft/20 transition-all"
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
            className="w-full py-3 px-4 rounded-lg bg-electric-blue hover:bg-blue-600 text-text-offwhite font-sans text-xs font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Calculating Vector Trajectory...</span>
            ) : (
              <>
                <span>Generate First 10 Albums</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </>
            )}
          </button>

          {/* Dynamic Counter Footer Caption */}
          <div className="text-center font-mono text-[11px] text-text-muted tracking-tight">
            {selectedCount >= 2 ? (
              <span>
                {selectedCount} OF 3 TEXTURES SELECTED &bull;{' '}
                <span className="text-purple-soft">ALGORITHM CALIBRATION READY</span>
              </span>
            ) : (
              <span>
                {selectedCount} OF 3 TEXTURES SELECTED &bull;{' '}
                <span className="text-text-dim">SELECT AT LEAST 2 TO CALIBRATE</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
