import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Sliders } from 'lucide-react';
import { SonicTag, AlbumRating } from '../../types/music';

interface RatingWidgetProps {
  currentRating?: AlbumRating;
  onRate: (score: number, sonicTag?: SonicTag) => void;
  albumTitle: string;
}

const SONIC_TAGS: SonicTag[] = [
  'Loved the rhythm',
  'Loved the atmosphere',
  'Too repetitive',
  'Not my vibe'
];

export const RatingWidget: React.FC<RatingWidgetProps> = ({
  currentRating,
  onRate,
  albumTitle
}) => {
  const [score, setScore] = useState<number>(currentRating?.score || 8.5);
  const [selectedTag, setSelectedTag] = useState<SonicTag | undefined>(
    currentRating?.sonicTag as SonicTag | undefined
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<boolean>(false);

  useEffect(() => {
    if (currentRating) {
      setScore(currentRating.score);
      setSelectedTag(currentRating.sonicTag as SonicTag | undefined);
    } else {
      setScore(8.5);
      setSelectedTag(undefined);
    }
    setSubmittedFeedback(false);
  }, [currentRating, albumTitle]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScore(parseFloat(e.target.value));
    setSubmittedFeedback(false);
  };

  const handleChipClick = (tag: SonicTag) => {
    setSelectedTag(prev => prev === tag ? undefined : tag);
    setSubmittedFeedback(false);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    onRate(score, selectedTag);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedFeedback(true);
    }, 300);
    setTimeout(() => {
      setSubmittedFeedback(false);
    }, 2500);
  };

  // Audiophile category determination
  let categoryLabel = 'MODERATE ROTATION';
  let categoryColor = 'text-text-muted';
  if (score >= 9.0) {
    categoryLabel = 'MASTER PRESSING (9.0+)';
    categoryColor = 'text-amber-400 font-bold';
  } else if (score >= 7.5) {
    categoryLabel = 'HIGH RESONANCE (7.5+)';
    categoryColor = 'text-purple-soft font-bold';
  } else if (score >= 6.0) {
    categoryLabel = 'SOLID CUT (6.0+)';
    categoryColor = 'text-electric-blue';
  } else {
    categoryLabel = 'FIELD TEST (<6.0)';
    categoryColor = 'text-text-dim';
  }

  return (
    <div className="p-4 rounded-xl audiophile-chassis border border-border-subtle space-y-4 select-none relative shadow-xl">
      <div className="flex items-center justify-between border-b border-border-subtle pb-2.5">
        <div className="flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-offwhite font-bold">
            PHONO EVALUATION ATTENUATOR
          </span>
        </div>
        <span className="font-mono text-[9px] text-amber-400/90 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.2 rounded">
          BIAS WEIGHT: &times;1.65
        </span>
      </div>

      {/* Large Stepped Meter Readout */}
      <div className="flex items-baseline justify-between p-3 rounded-lg bg-panel-obsidian border border-border-subtle shadow-inner">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-3xl font-extrabold text-amber-400 tracking-tight">
            {score.toFixed(1)}
          </span>
          <span className="font-mono text-xs text-text-dim">
            / 10.0
          </span>
        </div>
        <div className="text-right">
          <span className={`font-mono text-[10px] uppercase tracking-wider ${categoryColor}`}>
            {categoryLabel}
          </span>
        </div>
      </div>

      {/* Stepped Attenuator Slider with Amber Scale */}
      <div className="space-y-2">
        <input
          type="range"
          min="1.0"
          max="10.0"
          step="0.5"
          value={score}
          onChange={handleSliderChange}
          className="w-full h-2 bg-panel-obsidian rounded-lg appearance-none cursor-pointer border border-border-subtle accent-amber-500 shadow-inner"
        />
        <div className="flex justify-between font-mono text-[9px] text-text-dim px-0.5">
          <span>1.0 DISCORD</span>
          <span className="text-text-muted">5.0 NEUTRAL</span>
          <span className="text-amber-400">10.0 TRANSCENDENT</span>
        </div>
      </div>

      {/* Quick Stepped Attenuator Presets */}
      <div className="grid grid-cols-5 gap-1 pt-0.5 font-mono text-[10px]">
        {[3.0, 5.0, 7.5, 9.0, 10.0].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setScore(preset);
              setSubmittedFeedback(false);
            }}
            className={`py-1 rounded border text-center transition-all ${
              score === preset
                ? 'border-amber-500 bg-amber-500/20 text-amber-400 font-bold'
                : 'border-border-subtle bg-panel-obsidian hover:bg-panel-elevated text-text-dim hover:text-text-offwhite'
            }`}
          >
            {preset.toFixed(1)}
          </button>
        ))}
      </div>

      {/* Four Sonic Rationale Chips */}
      <div className="space-y-1.5 pt-1">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim block">
          Acoustic Reaction Stamp
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {SONIC_TAGS.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleChipClick(tag)}
                className={`py-1.5 px-2 rounded-lg font-mono text-[10px] text-center transition-all truncate border ${
                  isSelected
                    ? 'border-purple-soft/70 bg-purple-soft/15 text-purple-soft font-semibold shadow-sm'
                    : 'border-border-subtle bg-panel-obsidian hover:bg-panel-elevated text-text-muted hover:text-text-offwhite'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Master Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full py-2.5 px-4 rounded-lg font-mono text-xs font-bold tracking-wider transition-all active:scale-98 flex items-center justify-center gap-2 shadow-lg ${
          submittedFeedback
            ? 'bg-amber-500 text-black font-extrabold'
            : 'bg-electric-blue hover:bg-blue-600 text-white shadow-[0_0_16px_rgba(59,130,246,0.35)]'
        }`}
      >
        {submittedFeedback ? (
          <>
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>STAMPED TO WAX ARCHIVE</span>
          </>
        ) : (
          <>
            <span>ENGRAVE RATING &amp; SHIFT CRATE</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </>
        )}
      </button>
    </div>
  );
};
