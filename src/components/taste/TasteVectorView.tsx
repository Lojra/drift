import React, { useRef, useEffect } from 'react';
import { Sparkles, Activity, ShieldAlert, Sliders, Zap, Disc } from 'lucide-react';
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const traits = [
    { key: 'atmospheric', label: 'Atmospheric & Spatial', value: tasteProfile.traits.atmospheric, color: '#3B82F6', band: '60Hz // AIR' },
    { key: 'hypnotic', label: 'Hypnotic & Motorik', value: tasteProfile.traits.hypnotic, color: '#C084FC', band: '250Hz // DRIVE' },
    { key: 'distortion', label: 'Raw Distortion & Fuzz', value: tasteProfile.traits.distortion, color: '#EF4444', band: '1kHz // CRUNCH' },
    { key: 'percussive', label: 'Polyrhythmic & Pulse', value: tasteProfile.traits.percussive, color: '#10B981', band: '4kHz // ATTACK' },
    { key: 'experimental', label: 'Avant-Garde & Dense', value: tasteProfile.traits.experimental, color: '#F59E0B', band: '8kHz // HARMONICS' },
    { key: 'melancholic', label: 'Nocturnal & Reverb', value: tasteProfile.traits.melancholic, color: '#818CF8', band: '16kHz // SPACE' }
  ];

  const highRatings = ratings.filter(r => r.score >= 7.0);

  // Animated Cathode Ray Tube Radar Scope for Sonic Multiverse Dimensions
  useEffect(() => {
    let animId: number;
    let angle = 0;

    const renderRadar = () => {
      angle += 0.03;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(cx, cy) - 26;

      ctx.fillStyle = '#06070a';
      ctx.fillRect(0, 0, w, h);

      // CRT Concentric Range Ticks
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;
      [0.25, 0.5, 0.75, 1.0].forEach((ratio) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * ratio, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Crosshairs & Radial Spokes (6 directions for the 6 traits)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      const numAxes = traits.length;
      for (let i = 0; i < numAxes; i++) {
        const rad = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
        const ex = cx + Math.cos(rad) * radius;
        const ey = cy + Math.sin(rad) * radius;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }

      // Radar Rotating Sweep Beam
      const sweepX = cx + Math.cos(angle) * radius;
      const sweepY = cy + Math.sin(angle) * radius;
      const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      sweepGrad.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
      sweepGrad.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
      ctx.fillStyle = sweepGrad;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle - 0.35, angle);
      ctx.lineTo(cx, cy);
      ctx.fill();

      // Sweep Beam Frontline
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepX, sweepY);
      ctx.stroke();

      // Trait Values Polygon (Filled Holographic Acoustic Polygon)
      ctx.beginPath();
      traits.forEach((t, i) => {
        const rad = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
        const valRadius = radius * Math.max(0.15, Math.min(1.0, t.value));
        const px = cx + Math.cos(rad) * valRadius;
        const py = cy + Math.sin(rad) * valRadius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(192, 132, 252, 0.22)';
      ctx.fill();
      ctx.strokeStyle = '#C084FC';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Node Points for Each Trait
      traits.forEach((t, i) => {
        const rad = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
        const valRadius = radius * Math.max(0.15, Math.min(1.0, t.value));
        const px = cx + Math.cos(rad) * valRadius;
        const py = cy + Math.sin(rad) * valRadius;

        ctx.fillStyle = t.color;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();

        // White Center Pip
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(renderRadar);
    };

    animId = requestAnimationFrame(renderRadar);
    return () => cancelAnimationFrame(animId);
  }, [tasteProfile.traits]);

  return (
    <div className="space-y-6 max-w-5xl select-none pb-12">
      {/* Top Console Chassis */}
      <div className="p-5 sm:p-6 rounded-xl audiophile-chassis border border-border-subtle shadow-2xl relative space-y-4">
        {/* Hex Bolts */}
        <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900" />
        <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full border border-neutral-700 bg-neutral-900" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse" />
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest font-mono text-text-offwhite">
                STUDIO ACOUSTIC ANALYZER // 6-BAND PARAMETRIC CONSOLE
              </h2>
              <p className="text-[11px] font-mono text-text-muted">
                CALIBRATED FREQUENCY MATRIX &middot; REAL-TIME POLAR TELEMETRY
              </p>
            </div>
          </div>

          <button
            onClick={onRecalibrate}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-panel-elevated hover:bg-amber-500 hover:text-black text-amber-400 text-xs font-mono transition-all border border-amber-500/30 shadow-sm active:scale-95"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>RECALIBRATE PHONO STAGE</span>
          </button>
        </div>

        {/* Master Trajectory Status Plate */}
        <div className="p-4 rounded-lg bg-panel-obsidian border border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim">
                ACTIVE DRIFT VECTOR // CARTESIAN DRIFT
              </span>
              <span className="font-mono text-[8px] text-electric-blue px-1.5 py-0.2 rounded bg-electric-blue/10 border border-electric-blue/30">
                LOCKED
              </span>
            </div>
            <p className="text-sm font-mono text-text-offwhite font-bold tracking-tight">
              {tasteProfile.currentDriftPath || 'Awaiting initial crate ratings to lock lateral bridge...'}
            </p>
            <p className="text-xs text-text-muted font-sans leading-relaxed">
              Ratings &ge; 7.0 automatically bias the analog response curves while purposefully sweeping into unvisited genre borders.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 font-mono text-xs">
            <div className="p-2 rounded bg-canvas-black border border-border-subtle text-center min-w-[70px]">
              <span className="text-[9px] text-text-dim block">BIAS</span>
              <span className="text-amber-400 font-bold block">{tasteProfile.vectorDivergence || 4.2}&sigma;</span>
            </div>
            <div className="p-2 rounded bg-canvas-black border border-border-subtle text-center min-w-[70px]">
              <span className="text-[9px] text-text-dim block">ACCURACY</span>
              <span className="text-purple-soft font-bold block">99.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center Stage: CRT Polar Acoustic Radar Scope (Left) & 6-Band Parametric Equalizer Rack (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Phosphor CRT Polar Scope (5 Columns) */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-panel-obsidian border border-border-subtle shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-electric-blue" />
              <span className="font-mono text-xs font-bold text-text-offwhite uppercase tracking-wider">
                POLAR ACOUSTIC RADAR
              </span>
            </div>
            <span className="font-mono text-[9px] text-text-dim px-1.5 py-0.5 rounded bg-panel-elevated border border-border-subtle">
              CRT 6-AXIS
            </span>
          </div>

          {/* Canvas Display with Scanline Filter */}
          <div className="relative w-full aspect-square max-h-[320px] mx-auto rounded-lg overflow-hidden border border-border-light shadow-inner flex items-center justify-center bg-[#06070a]">
            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              className="w-full h-full object-contain"
            />
            {/* CRT Screen Scanlines Overlay */}
            <div className="absolute inset-0 crt-screen-overlay" />
          </div>

          <div className="pt-3 font-mono text-[10px] text-text-dim flex items-center justify-between">
            <span>SWEEP: 33.3 RPM RAD</span>
            <span className="text-purple-soft">HARMONIC POLARITY: POS</span>
          </div>
        </div>

        {/* 6-Band Graphic Equalizer Faders Rack (7 Columns) */}
        <div className="lg:col-span-7 p-5 rounded-xl audiophile-chassis border border-border-subtle shadow-xl flex flex-col justify-between relative">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2.5 mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-500" />
              <span className="font-mono text-xs font-bold text-text-offwhite uppercase tracking-wider">
                PARAMETRIC EQ FADER RACK
              </span>
            </div>
            <span className="font-mono text-[9px] text-amber-500 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
              RIAA CALIBRATED
            </span>
          </div>

          {/* 6 Vertical Equalizer Channel Strips */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 py-2">
            {traits.map((t) => {
              const pct = Math.round(t.value * 100);
              const dbVal = ((t.value - 0.5) * 24).toFixed(1);
              const sign = Number(dbVal) >= 0 ? '+' : '';

              return (
                <div
                  key={t.key}
                  className="flex flex-col items-center p-2 rounded-lg bg-panel-obsidian border border-border-subtle space-y-2 relative group"
                >
                  {/* Channel Frequency Tag */}
                  <span className="font-mono text-[8px] text-text-dim text-center tracking-tight leading-tight">
                    {t.band}
                  </span>

                  {/* Level Readout */}
                  <span
                    className="font-mono text-[10px] font-bold"
                    style={{ color: t.color }}
                  >
                    {sign}{dbVal}dB
                  </span>

                  {/* Vertical Fader Track Slot */}
                  <div className="relative w-6 h-36 bg-canvas-black rounded-full border border-border-subtle flex flex-col items-center justify-end p-1 shadow-inner overflow-hidden">
                    {/* Center Detent (0dB) Marker */}
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-neutral-600/60 z-0" />

                    {/* Illuminated Vertical Level Fill */}
                    <div
                      className="w-1.5 rounded-full transition-all duration-500 opacity-60 group-hover:opacity-100"
                      style={{
                        height: `${Math.max(10, pct)}%`,
                        backgroundColor: t.color,
                        boxShadow: `0 0 10px ${t.color}`
                      }}
                    />

                    {/* Tactile Knurled Aluminum Fader Cap Sliding Thumb */}
                    <div
                      className="absolute w-5 h-3 rounded fader-cap-knurled border border-neutral-600 z-10 flex items-center justify-center transition-all duration-300 pointer-events-none"
                      style={{
                        bottom: `calc(${pct}% - 6px)`
                      }}
                    >
                      <div
                        className="w-2.5 h-[2px] rounded-full"
                        style={{ backgroundColor: t.color }}
                      />
                    </div>
                  </div>

                  {/* Percentage Readout */}
                  <span className="font-mono text-[10px] text-text-offwhite font-medium">
                    {pct}%
                  </span>

                  {/* Short Trait Name */}
                  <span className="font-sans text-[10px] text-text-muted text-center font-medium line-clamp-1">
                    {t.label.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-border-subtle flex items-center justify-between font-mono text-[10px] text-text-dim">
            <span>DETENT: 0.0 dB</span>
            <span>GAIN RANGE: -12.0 dB TO +12.0 dB</span>
          </div>
        </div>
      </div>

      {/* Bottom Area: Magnetic Tape Bias Anchors & Suppressed Notch Boundaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Reinforced Magnetic Anchors */}
        <div className="p-5 rounded-xl audiophile-chassis border border-border-subtle space-y-3.5 shadow-xl relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-purple-soft">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                MAGNETIC TAPE BIAS ANCHORS ({highRatings.length})
              </h4>
            </div>
            <span className="font-mono text-[9px] text-purple-soft bg-purple-soft/10 border border-purple-soft/30 px-1.5 py-0.2 rounded">
              GRADE 7.0+
            </span>
          </div>

          <p className="text-xs text-text-muted font-sans leading-relaxed">
            Acoustic footprints scoring 7.0 or higher. DRIFT magnetically binds to their harmonic structures to engineer lateral transitions.
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {Object.keys(tasteProfile.likedGenres).length > 0 ? (
              Object.entries(tasteProfile.likedGenres).map(([genre, count]) => (
                <span
                  key={genre}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-purple-soft/10 border border-purple-soft/40 text-purple-soft flex items-center gap-1.5 shadow-sm"
                >
                  <Disc className="w-3 h-3 text-purple-soft/70" />
                  <span className="font-semibold">{genre}</span>
                  <span className="text-[10px] text-purple-soft/75 bg-purple-soft/20 px-1 rounded">&times;{count}</span>
                </span>
              ))
            ) : (
              <span className="text-xs text-text-dim italic font-mono">
                Rate albums 7.0+ on the turntable to stamp magnetic bias anchors.
              </span>
            )}
          </div>
        </div>

        {/* Suppressed Trajectories / Notch Filters */}
        <div className="p-5 rounded-xl audiophile-chassis border border-border-subtle space-y-3.5 shadow-xl relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-red-400">
              <ShieldAlert className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                ACOUSTIC NOTCH SUPPRESSION ({tasteProfile.dislikedGenres.length})
              </h4>
            </div>
            <span className="font-mono text-[9px] text-red-400 bg-red-950/30 border border-red-900/40 px-1.5 py-0.2 rounded">
              DAMPENED
            </span>
          </div>

          <p className="text-xs text-text-muted font-sans leading-relaxed">
            Styles rated below 5.0. High-order acoustic notch filters attenuate matching traits in future crate generations.
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {tasteProfile.dislikedGenres.length > 0 ? (
              tasteProfile.dislikedGenres.map((genre) => (
                <span
                  key={genre}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-red-950/30 border border-red-900/50 text-red-300 shadow-sm"
                >
                  {genre}
                </span>
              ))
            ) : (
              <span className="text-xs text-text-dim italic font-mono">
                No styles currently notch-filtered.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
