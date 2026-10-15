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
  let categoryColor = 'text-[#9C9A94]';
  if (score >= 9.0) {
    categoryLabel = 'MASTER PRESSING (9.0+)';
    categoryColor = 'text-[#D97706] font-bold';
  } else if (score >= 7.5) {
    categoryLabel = 'HIGH RESONANCE (7.5+)';
    categoryColor = 'text-[#F5F4F0] font-bold';
  } else if (score >= 6.0) {
    categoryLabel = 'SOLID CUT (6.0+)';
    categoryColor = 'text-[#9C9A94]';
  } else {
    categoryLabel = 'FIELD TEST (<6.0)';
    categoryColor = 'text-[#575550]';
  }

  return (
    <div className="p-4 rounded-xl bg-[#111114] border border-[rgba(245,244,240,0.08)] space-y-4 select-none relative shadow-xl">
      <div className="flex items-center justify-between border-b border-[rgba(245,244,240,0.08)] pb-2.5">
        <div className="flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-[#D97706]" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#F5F4F0] font-bold">
            PHONO EVALUATION ATTENUATOR
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#D97706] bg-[#D97706]/10 border border-[#D97706]/30 px-1.5 py-0.2 rounded">
          BIAS WEIGHT: &times;1.65
        </span>
      </div>

      {/* Large Stepped Meter Readout */}
      <div className="flex items-baseline justify-between p-3 rounded-lg bg-[#0E0E10] border border-[rgba(245,244,240,0.08)] shadow-inner">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-3xl font-extrabold text-[#F5F4F0] tracking-tight">
            {score.toFixed(1)}
          </span>
          <span className="font-mono text-xs text-[#575550]">
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
          className="w-full amber-thumb cursor-pointer"
        />
        <div className="flex justify-between font-mono text-[9px] text-[#575550] px-0.5">
          <span>1.0 DISCORD</span>
          <span className="text-[#9C9A94]">5.0 NEUTRAL</span>
          <span className="text-[#D97706] font-bold">10.0 TRANSCENDENT</span>
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
                ? 'border-[#D97706] bg-[#D97706]/20 text-[#D97706] font-bold'
                : 'border-white/5 bg-[#0E0E10] hover:bg-[#16161C] text-[#575550] hover:text-[#F5F4F0]'
            }`}
          >
            {preset.toFixed(1)}
          </button>
        ))}
      </div>

      {/* Four Sonic Rationale Chips */}
      <div className="space-y-1.5 pt-1">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#9C9A94] block">
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
                    ? 'border-[#D97706] bg-[#D97706]/15 text-[#D97706] font-semibold shadow-sm'
                    : 'border-white/5 bg-[#0E0E10] hover:bg-[#16161C] text-[#9C9A94] hover:text-[#F5F4F0]'
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
        className={`w-full py-2.5 px-4 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-all active:scale-98 flex items-center justify-center gap-2 shadow-lg ${
          submittedFeedback
            ? 'bg-[#D97706] text-black font-extrabold'
            : 'bg-[#D97706] hover:bg-[#B45309] text-black shadow-[0_2px_12px_rgba(217,119,6,0.3)]'
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
