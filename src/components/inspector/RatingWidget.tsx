import React, { useState, useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';
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

  // Category determination
  let categoryLabel = 'Moderate Fit';
  let categoryColor = 'text-text-muted';
  if (score >= 8.5) {
    categoryLabel = 'Transcendent Pick';
    categoryColor = 'text-purple-soft';
  } else if (score >= 7.0) {
    categoryLabel = 'High Resonance';
    categoryColor = 'text-electric-blue';
  } else if (score < 5.0) {
    categoryLabel = 'Low Affinity';
    categoryColor = 'text-text-dim';
  }

  return (
    <div className="p-4 rounded-lg bg-panel-elevated border border-border-subtle space-y-4 select-none">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-purple-soft font-semibold">
          RATE TO SHIFT ALGORITHM
        </span>
        <span className="font-mono text-[10px] text-text-dim">
          WEIGHT: &times;1.65
        </span>
      </div>

      {/* Large Monospace Readout */}
      <div className="flex items-baseline justify-between py-1">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-3xl font-extrabold text-text-offwhite tracking-tight">
            {score.toFixed(1)}
          </span>
          <span className="font-mono text-xs text-text-dim">
            / 10.0
          </span>
        </div>
        <div className="text-right">
          <span className={`font-mono text-[11px] uppercase font-semibold ${categoryColor}`}>
            {categoryLabel}
          </span>
        </div>
      </div>

      {/* Sleek Horizontal Step Slider */}
      <div className="space-y-1.5">
        <input
          type="range"
          min="1.0"
          max="10.0"
          step="0.5"
          value={score}
          onChange={handleSliderChange}
          className="w-full h-1.5 bg-panel-obsidian rounded-lg appearance-none cursor-pointer border border-border-subtle accent-electric-blue"
        />
        <div className="flex justify-between font-mono text-[9px] text-text-dim px-0.5">
          <span>1.0 DISCORD</span>
          <span>5.0 NEUTRAL</span>
          <span>10.0 TRANSCENDENT</span>
        </div>
      </div>

      {/* Four Quick-Select Feedback Chips */}
      <div className="space-y-1.5 pt-1">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim block">
          Sonic Rationale
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {SONIC_TAGS.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleChipClick(tag)}
                className={`py-1.5 px-2 rounded font-mono text-[10px] text-center transition-all truncate border ${
                  isSelected
                    ? 'border-purple-soft/60 bg-purple-soft/10 text-purple-soft shadow-sm'
                    : 'border-border-light bg-panel-obsidian hover:bg-panel-hover text-text-muted hover:text-text-offwhite'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Electric Blue Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full py-2.5 px-4 rounded-md font-sans text-xs font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] active:scale-98 flex items-center justify-center gap-2 ${
          submittedFeedback
            ? 'bg-purple-soft text-black font-semibold'
            : 'bg-electric-blue hover:bg-blue-600 text-text-offwhite'
        }`}
      >
        {submittedFeedback ? (
          <>
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Rating Submitted &amp; Vector Shifted</span>
          </>
        ) : (
          <>
            <span>Submit Rating &amp; Drift</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </>
        )}
      </button>
    </div>
  );
};
