import React from 'react';
import { Compass, Sparkles, Activity, ShieldAlert, Sliders } from 'lucide-react';
import { TasteProfile, AlbumRating } from '../../types/music';

interface TasteVectorViewProps {
  tasteProfile: TasteProfile;
  ratings: AlbumRating[];
  onRecalibrate: () => void;
}

export const TasteVectorView: React.FC<TasteVectorViewProps> = ({
  tasteProfile,
  ratings,
  onRecalibrate
}) => {
  const traits = [
    { key: 'atmospheric', label: 'Atmospheric & Spatial', value: tasteProfile.traits.atmospheric, color: '#3B82F6' },
    { key: 'hypnotic', label: 'Hypnotic & Motorik', value: tasteProfile.traits.hypnotic, color: '#C084FC' },
    { key: 'distortion', label: 'Raw Distortion & Fuzz', value: tasteProfile.traits.distortion, color: '#EF4444' },
    { key: 'percussive', label: 'Polyrhythmic & Percussive', value: tasteProfile.traits.percussive, color: '#10B981' },
    { key: 'experimental', label: 'Avant-Garde & Dense', value: tasteProfile.traits.experimental, color: '#F59E0B' },
    { key: 'melancholic', label: 'Nocturnal & Melancholic', value: tasteProfile.traits.melancholic, color: '#818CF8' }
  ];

  const highRatings = ratings.filter(r => r.score >= 7.0);

  return (
    <div className="space-y-6 max-w-4xl select-none pb-8">
      {/* Overview Card */}
      <div className="p-6 rounded-xl bg-panel-obsidian border border-border-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-purple-soft">
            <Compass className="w-5 h-5" />
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono">
              Taste Vector Telemetry
            </h2>
          </div>
          <button
            onClick={onRecalibrate}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-panel-elevated hover:bg-electric-blue hover:text-text-offwhite text-text-muted text-xs font-mono transition-colors border border-border-subtle"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Recalibrate Baseline</span>
          </button>
        </div>

        <div className="p-4 rounded-lg bg-canvas-black border border-border-subtle space-y-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
            Active Lateral Vector
          </span>
          <p className="text-sm font-mono text-text-offwhite font-medium">
            {tasteProfile.currentDriftPath || 'Calibrating taste vector with crate ratings'}
          </p>
          <p className="text-xs text-text-muted leading-relaxed pt-1">
            Ratings &ge; 7.0 automatically lock onto acoustic and textural traits while deliberately steering into adjacent, unvisited subcultures.
          </p>
        </div>
      </div>

      {/* Sonic Traits Dimension Weights */}
      <div className="p-6 rounded-xl bg-panel-obsidian border border-border-subtle space-y-5">
        <div className="flex items-center space-x-2 text-electric-blue">
          <Activity className="w-4 h-4" />
          <h3 className="text-xs font-semibold uppercase tracking-wider font-mono">
            Sonic Dimension Weights
          </h3>
        </div>

        <div className="space-y-4">
          {traits.map((t) => (
            <div key={t.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-text-offwhite">{t.label}</span>
                <span className="text-text-muted">{Math.round(t.value * 100)}%</span>
              </div>
              <div className="w-full bg-canvas-black h-2 rounded-full overflow-hidden border border-border-subtle/50">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.max(6, t.value * 100)}%`,
                    backgroundColor: t.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exploration Dynamics: Liked vs Disliked */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reinforced Lateral Anchors */}
        <div className="p-5 rounded-xl bg-panel-obsidian border border-border-subtle space-y-3">
          <div className="flex items-center space-x-2 text-purple-soft">
            <Sparkles className="w-4 h-4" />
            <h4 className="text-xs font-semibold uppercase tracking-wider font-mono">
              Reinforced Anchors ({highRatings.length})
            </h4>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Genres that scored 7.0 or higher. DRIFT actively leverages their sonic DNA for lateral leaps.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {Object.keys(tasteProfile.likedGenres).length > 0 ? (
              Object.entries(tasteProfile.likedGenres).map(([genre, count]) => (
                <span
                  key={genre}
                  className="text-xs font-mono px-2 py-1 rounded-md bg-purple-soft/10 border border-purple-soft/30 text-purple-soft flex items-center gap-1.5"
                >
                  <span>{genre}</span>
                  <span className="text-[10px] opacity-75">&times;{count}</span>
                </span>
              ))
            ) : (
              <span className="text-xs text-text-dim italic font-mono">
                Rate albums 7.0+ to unlock reinforced lateral anchors.
              </span>
            )}
          </div>
        </div>

        {/* Suppressed Trajectories */}
        <div className="p-5 rounded-xl bg-panel-obsidian border border-border-subtle space-y-3">
          <div className="flex items-center space-x-2 text-red-400">
            <ShieldAlert className="w-4 h-4" />
            <h4 className="text-xs font-semibold uppercase tracking-wider font-mono">
              Suppressed Boundaries ({tasteProfile.dislikedGenres.length})
            </h4>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Styles rated below 5.0. The algorithm dampens recommendations associated with these tags.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tasteProfile.dislikedGenres.length > 0 ? (
              tasteProfile.dislikedGenres.map((genre) => (
                <span
                  key={genre}
                  className="text-xs font-mono px-2 py-1 rounded-md bg-red-950/20 border border-red-900/40 text-red-300"
                >
                  {genre}
                </span>
              ))
            ) : (
              <span className="text-xs text-text-dim italic font-mono">
                No styles currently suppressed.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
