import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Disc,
  Play,
  Pause,
  RotateCw,
  Sliders,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
  Radio,
  Star
} from 'lucide-react';
import { Album, AlbumRating, SonicTag } from '../../types/music';
import { useAudioPreview } from '../../hooks/useAudioPreview';
import { fetchTracksForAlbum } from '../../services/musicApi';
import { GenerativeVinylCover } from '../crate/GenerativeVinylCover';

interface HiFiStudioDeckProps {
  albums: Album[];
  ratings: AlbumRating[];
  selectedAlbum: Album | null;
  onSelectAlbum: (album: Album) => void;
  onRateAlbum: (albumId: string, score: number, tag?: SonicTag) => void;
  onReplaceAlbum: (albumId: string) => void;
  onOpenInspector: (album: Album) => void;
  isLoading?: boolean;
}

export const HiFiStudioDeck: React.FC<HiFiStudioDeckProps> = ({
  albums,
  ratings,
  selectedAlbum,
  onSelectAlbum,
  onRateAlbum,
  onReplaceAlbum,
  onOpenInspector,
  isLoading = false
}) => {
  // If no album is currently selected, pick the first album in the crate
  const activeAlbum = useMemo(() => {
    if (selectedAlbum) return selectedAlbum;
    return albums.length > 0 ? albums[0] : null;
  }, [selectedAlbum, albums]);

  const [tracks, setTracks] = useState<any[]>([]);
  const [rpm, setRpm] = useState<33 | 45>(33);
  const [pitchOffset, setPitchOffset] = useState<number>(0);
  const [analogGainDb, setAnalogGainDb] = useState<number>(3.5);
  const [driftIntensity, setDriftIntensity] = useState<number>(75);
  const [divergenceEnabled, setDivergenceEnabled] = useState<boolean>(true);
  const [vuLeft, setVuLeft] = useState<number>(0.2);
  const [vuRight, setVuRight] = useState<number>(0.25);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio Preview integration
  const { isPlaying, progress, playTrack, stop } = useAudioPreview();

  // Load tracks for currently active turntable album
  useEffect(() => {
    if (!activeAlbum) return;
    if (activeAlbum.tracks && activeAlbum.tracks.length > 0) {
      setTracks(activeAlbum.tracks);
      return;
    }
    let isCurrent = true;
    fetchTracksForAlbum(activeAlbum).then((loaded) => {
      if (isCurrent && loaded && loaded.length > 0) {
        setTracks(loaded);
      }
    });
    return () => {
      isCurrent = false;
    };
  }, [activeAlbum?.id]);

  // First playable track with audio preview
  const playableTrack = useMemo(() => {
    return tracks.find((t) => t.previewUrl) || tracks[0] || null;
  }, [tracks]);

  // Toggle master playback
  const handleTogglePlayback = () => {
    if (!playableTrack) return;
    if (isPlaying) {
      stop();
    } else {
      playTrack(playableTrack.id, playableTrack.previewUrl);
    }
  };

  // Ballistics loop for analog VU meters and Oscilloscope CRT
  useEffect(() => {
    let animId: number;
    let t = 0;

    const renderOscilloscope = () => {
      t += 0.04;
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = canvas.width;
          const h = canvas.height;
          ctx.fillStyle = '#050508';
          ctx.fillRect(0, 0, w, h);

          // CRT grid lines
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 1;
          for (let x = 0; x < w; x += 20) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
          }
          for (let y = 0; y < h; y += 15) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
          }

          // Center reticle
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
          ctx.beginPath();
          ctx.moveTo(0, h / 2);
          ctx.lineTo(w, h / 2);
          ctx.stroke();

          // Live animated audio signal waveform
          const amp = isPlaying ? 24 : 3;
          ctx.lineWidth = 1.75;

          // Harmonic layer (soft purple)
          ctx.strokeStyle = 'rgba(192, 132, 252, 0.6)';
          ctx.beginPath();
          for (let x = 0; x < w; x++) {
            const freq = (x / w) * 12 + t * 2;
            const y = h / 2 + Math.sin(freq * 1.5) * (amp * 0.5) + Math.cos(freq * 0.7) * (amp * 0.3);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          // Fundamental layer (electric blue)
          ctx.strokeStyle = '#3B82F6';
          ctx.beginPath();
          for (let x = 0; x < w; x++) {
            const freq = (x / w) * 8 + t * 3;
            const y = h / 2 + Math.sin(freq) * amp + Math.sin(freq * 2.3) * (amp * 0.4);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      // Needle ballistics simulation
      if (isPlaying) {
        const jitterL = Math.sin(t * 7) * 0.2 + Math.random() * 0.15 + 0.65;
        const jitterR = Math.cos(t * 8) * 0.2 + Math.random() * 0.15 + 0.68;
        setVuLeft(Math.min(1.05, Math.max(0.15, jitterL)));
        setVuRight(Math.min(1.05, Math.max(0.15, jitterR)));
      } else {
        setVuLeft((prev) => Math.max(0.08, prev * 0.92));
        setVuRight((prev) => Math.max(0.08, prev * 0.92));
      }

      animId = requestAnimationFrame(renderOscilloscope);
    };

    animId = requestAnimationFrame(renderOscilloscope);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const activeRating = ratings.find((r) => r.albumId === activeAlbum?.id);

  if (!activeAlbum) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-muted font-mono text-sm">
        Crate loading or empty...
      </div>
    );
  }

  // Active index inside the 10-album crate
  const activeIndex = albums.findIndex((a) => a.id === activeAlbum.id);

  const handlePrevAlbum = () => {
    if (albums.length === 0) return;
    const nextIdx = (activeIndex - 1 + albums.length) % albums.length;
    onSelectAlbum(albums[nextIdx]);
  };

  const handleNextAlbum = () => {
    if (albums.length === 0) return;
    const nextIdx = (activeIndex + 1) % albums.length;
    onSelectAlbum(albums[nextIdx]);
  };

  return (
    <div className="flex flex-col h-full w-full bg-canvas-black text-text-offwhite select-none overflow-y-auto lg:overflow-hidden p-2 sm:p-4 gap-4">
      {/* Top Deck: Turntable Main Stage (Left) & Audiophile Rack Instrument Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Left Section: Direct-Drive Audiophile Turntable Stage (7 Columns on Large) */}
        <div className="lg:col-span-7 flex flex-col bg-panel-obsidian border border-border-subtle rounded-xl p-4 sm:p-6 shadow-2xl relative overflow-hidden justify-between">
          {/* Deck Top Header: Mechanical Branding & Speed Selectors */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-electric-blue animate-pulse"></span>
              <span className="font-mono text-xs font-bold tracking-widest text-text-offwhite">
                STUDIO DIRECT-DRIVE MK-IV
              </span>
              <span className="font-mono text-[10px] text-text-dim px-1.5 py-0.5 rounded bg-panel-elevated border border-border-subtle">
                QUARTZ LOCKED
              </span>
            </div>

            {/* RPM Speed Selector Buttons */}
            <div className="flex items-center gap-1.5 bg-panel-elevated p-1 rounded-md border border-border-subtle">
              <button
                onClick={() => setRpm(33)}
                className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold transition-all ${
                  rpm === 33
                    ? 'bg-electric-blue text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                    : 'text-text-muted hover:text-text-offwhite'
                }`}
              >
                33 RPM
              </button>
              <button
                onClick={() => setRpm(45)}
                className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold transition-all ${
                  rpm === 45
                    ? 'bg-electric-blue text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                    : 'text-text-muted hover:text-text-offwhite'
                }`}
              >
                45 RPM
              </button>
            </div>
          </div>

          {/* Central Turntable Mechanics (Platter + Tonearm Assembly) */}
          <div className="relative flex-1 flex items-center justify-center my-4 min-h-[260px] sm:min-h-[320px]">
            {/* Circular Vinyl Platter Chassis */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 xl:w-80 xl:h-80 rounded-full border-4 border-neutral-800 bg-[#07070A] shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center">
              {/* Spinning Vinyl Record Body */}
              <div
                className={`w-[96%] h-[96%] rounded-full vinyl-grooves relative flex items-center justify-center transition-transform ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
                style={{
                  animationDuration: rpm === 33 ? '18s' : '13s',
                  boxShadow: '0 0 25px rgba(0,0,0,0.95), inset 0 0 50px rgba(0,0,0,0.9)'
                }}
              >
                {/* Vinyl Light Sheen Cone Overlay */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none opacity-40"
                  style={{
                    background:
                      'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.08) 45deg, transparent 90deg, rgba(255,255,255,0.08) 225deg, transparent 270deg)'
                  }}
                />

                {/* Spindle Center Label (Current Album Cover + Title) */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 xl:w-32 xl:h-32 rounded-full overflow-hidden border-2 border-border-light relative shadow-inner bg-panel-obsidian flex flex-col items-center justify-center p-2 text-center z-10">
                  {activeAlbum.coverArtUrl ? (
                    <img
                      src={activeAlbum.coverArtUrl}
                      alt={activeAlbum.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                  ) : (
                    <GenerativeVinylCover album={activeAlbum} className="absolute inset-0 w-full h-full" />
                  )}
                  {/* Spindle Center Brass Hole */}
                  <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center p-1">
                    <div className="w-3.5 h-3.5 rounded-full bg-neutral-900 border-2 border-amber-600/80 mb-1 z-20 shadow-sm" />
                    <span className="font-mono text-[8px] font-bold text-white truncate max-w-[90px] drop-shadow">
                      {activeAlbum.title}
                    </span>
                    <span className="font-mono text-[7px] text-neutral-300 truncate max-w-[80px]">
                      {activeAlbum.artist}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tonearm Assembly Overlay */}
              <div
                className="absolute top-2 right-2 sm:top-4 sm:right-4 w-32 h-48 pointer-events-none transition-transform duration-700 ease-out origin-top-right z-30"
                style={{
                  transform: isPlaying ? 'rotate(-14deg)' : 'rotate(10deg)'
                }}
              >
                {/* Pivot Gimbal Base */}
                <div className="absolute top-0 right-0 w-10 h-10 rounded-full bg-neutral-800 border-2 border-neutral-600 shadow-md flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-neutral-600 border border-neutral-400" />
                </div>
                {/* Tonearm Titanium Tube */}
                <div
                  className="absolute top-5 right-5 w-1 h-36 bg-gradient-to-b from-neutral-400 via-neutral-200 to-neutral-400 shadow-sm rounded-full origin-top"
                  style={{ transform: 'rotate(-18deg)' }}
                >
                  {/* Headshell & Stylus Cartridge */}
                  <div className="absolute bottom-0 left-[-4px] w-3 h-6 bg-neutral-900 border border-neutral-500 rounded-sm flex items-center justify-center shadow-lg">
                    {/* Glowing Blue Stylus LED Indicator */}
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isPlaying ? 'bg-electric-blue shadow-[0_0_8px_#3B82F6]' : 'bg-neutral-600'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Master Transport & Deck Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border-subtle bg-panel-elevated/40 p-3 rounded-lg">
            {/* Play / Cue Record Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleTogglePlayback}
                disabled={!playableTrack}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs font-bold transition-all shadow-md active:scale-95 ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-600 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-electric-blue hover:bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.35)]'
                } disabled:opacity-40`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'LIFT NEEDLE (PAUSE)' : 'CUE RECORD (PLAY)'}</span>
              </button>

              {/* Progress Slider */}
              <div className="hidden sm:flex flex-col">
                <span className="font-mono text-[9px] text-text-dim">
                  GROOVE HEAD: {progress.toFixed(0)}%
                </span>
                <div className="w-32 h-1.5 bg-neutral-800 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-electric-blue transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Pitch Fader Slider */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-text-muted">PITCH:</span>
              <input
                type="range"
                min="-8"
                max="8"
                step="0.5"
                value={pitchOffset}
                onChange={(e) => setPitchOffset(parseFloat(e.target.value))}
                className="w-20 sm:w-24 accent-electric-blue cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
              />
              <span className="font-mono text-[10px] text-electric-blue font-bold min-w-[38px]">
                {pitchOffset >= 0 ? `+${pitchOffset}%` : `${pitchOffset}%`}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Audiophile Master Instrument Rack (5 Columns on Large) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Top Panel: Analog VU Stereo Meters & Digital Oscilloscope */}
          <div className="bg-panel-obsidian border border-border-subtle rounded-xl p-4 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <span className="font-mono text-xs font-bold text-text-offwhite flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-electric-blue" />
                STEREO BALLISTICS & FFT ANALYZER
              </span>
              <span className="font-mono text-[10px] text-text-muted">600Ω BALANCED</span>
            </div>

            {/* Dual Analog Illuminated Warm Amber VU Meters */}
            <div className="grid grid-cols-2 gap-3">
              {/* Channel Left */}
              <div className="bg-[#12120e] border border-amber-900/40 rounded-lg p-2.5 relative overflow-hidden shadow-inner flex flex-col justify-between h-20">
                <div className="flex justify-between font-mono text-[9px] text-amber-500/80 z-10">
                  <span>CH-L</span>
                  <span>-20 -10 -5 0 +3dB</span>
                </div>
                {/* Meter Dial Scale Arc */}
                <div className="absolute inset-x-2 bottom-1 h-14 border-t border-amber-600/30 rounded-t-full pointer-events-none" />
                {/* Moving Needle */}
                <div
                  className="w-0.5 h-14 bg-red-500 origin-bottom mx-auto transition-transform duration-75 ease-out shadow-[0_0_6px_rgba(239,68,68,0.8)] z-20"
                  style={{
                    transform: `rotate(${(vuLeft - 0.5) * 65}deg)`
                  }}
                />
              </div>

              {/* Channel Right */}
              <div className="bg-[#12120e] border border-amber-900/40 rounded-lg p-2.5 relative overflow-hidden shadow-inner flex flex-col justify-between h-20">
                <div className="flex justify-between font-mono text-[9px] text-amber-500/80 z-10">
                  <span>CH-R</span>
                  <span>-20 -10 -5 0 +3dB</span>
                </div>
                {/* Meter Dial Scale Arc */}
                <div className="absolute inset-x-2 bottom-1 h-14 border-t border-amber-600/30 rounded-t-full pointer-events-none" />
                {/* Moving Needle */}
                <div
                  className="w-0.5 h-14 bg-red-500 origin-bottom mx-auto transition-transform duration-75 ease-out shadow-[0_0_6px_rgba(239,68,68,0.8)] z-20"
                  style={{
                    transform: `rotate(${(vuRight - 0.5) * 65}deg)`
                  }}
                />
              </div>
            </div>

            {/* Real-time Canvas CRT Waveform Oscilloscope */}
            <div className="relative w-full h-20 bg-black rounded-lg border border-border-subtle overflow-hidden">
              <canvas
                ref={canvasRef}
                width={380}
                height={80}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1.5 left-2 font-mono text-[9px] text-electric-blue/70">
                CRT OSCILLOSCOPE // 48kHz
              </div>
            </div>
          </div>

          {/* Middle Panel: Parametric Rotary DSP Knobs */}
          <div className="bg-panel-obsidian border border-border-subtle rounded-xl p-4 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <span className="font-mono text-xs font-bold text-text-offwhite flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-soft" />
                PARAMETRIC DSP & DRIFT BIAS
              </span>
              <span className="font-mono text-[10px] text-purple-soft">HARMONIC CORE</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {/* Knob 1: Sonic Drift */}
              <div className="flex flex-col items-center bg-panel-elevated/40 p-2.5 rounded-lg border border-border-subtle">
                <span className="font-mono text-[9px] text-text-dim mb-1">DRIFT BIAS</span>
                <div
                  onClick={() => setDriftIntensity((prev) => (prev >= 100 ? 25 : prev + 25))}
                  className="w-12 h-12 rounded-full bg-neutral-800 border-2 border-neutral-600 shadow-md cursor-pointer flex items-center justify-center hover:border-electric-blue transition-colors"
                >
                  <div
                    className="w-1 h-4 bg-electric-blue rounded-full origin-bottom"
                    style={{ transform: `rotate(${(driftIntensity / 100) * 270 - 135}deg)` }}
                  />
                </div>
                <span className="font-mono text-[10px] font-bold text-electric-blue mt-1">
                  {driftIntensity}%
                </span>
              </div>

              {/* Knob 2: Analog Tube Gain */}
              <div className="flex flex-col items-center bg-panel-elevated/40 p-2.5 rounded-lg border border-border-subtle">
                <span className="font-mono text-[9px] text-text-dim mb-1">TUBE GAIN</span>
                <div
                  onClick={() => setAnalogGainDb((prev) => (prev >= 10 ? -3 : prev + 3))}
                  className="w-12 h-12 rounded-full bg-neutral-800 border-2 border-neutral-600 shadow-md cursor-pointer flex items-center justify-center hover:border-amber-500 transition-colors"
                >
                  <div
                    className="w-1 h-4 bg-amber-500 rounded-full origin-bottom"
                    style={{ transform: `rotate(${(analogGainDb / 12) * 180}deg)` }}
                  />
                </div>
                <span className="font-mono text-[10px] font-bold text-amber-500 mt-1">
                  {analogGainDb > 0 ? `+${analogGainDb}dB` : `${analogGainDb}dB`}
                </span>
              </div>

              {/* Knob 3: Divergence Toggle */}
              <div className="flex flex-col items-center bg-panel-elevated/40 p-2.5 rounded-lg border border-border-subtle">
                <span className="font-mono text-[9px] text-text-dim mb-1">DIVERGENCE</span>
                <button
                  onClick={() => setDivergenceEnabled(!divergenceEnabled)}
                  className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center shadow-md ${
                    divergenceEnabled
                      ? 'bg-purple-soft/20 border-purple-soft text-purple-soft shadow-[0_0_12px_rgba(192,132,252,0.4)]'
                      : 'bg-neutral-800 border-neutral-600 text-neutral-500'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                </button>
                <span className="font-mono text-[10px] font-bold text-purple-soft mt-1">
                  {divergenceEnabled ? 'SIGMA-2 ON' : 'SIGMA-1 OFF'}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Panel: Current Record Liner Notes & Quick Actions */}
          <div className="bg-panel-obsidian border border-border-subtle rounded-xl p-4 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <span className="font-mono text-[10px] text-text-muted">CURRENT RECORD</span>
                <span className="font-mono text-[10px] text-purple-soft font-bold">
                  {activeRating ? `RATED: ${activeRating.score.toFixed(1)}/10` : 'UNRATED'}
                </span>
              </div>

              <div className="pt-2">
                <h3 className="font-bold text-sm text-text-offwhite truncate" title={activeAlbum.title}>
                  {activeAlbum.title}
                </h3>
                <p className="font-sans text-xs text-text-muted truncate">
                  {activeAlbum.artist} &middot; <span className="font-mono">{activeAlbum.releaseYear}</span>
                </p>
                <p className="font-sans text-xs italic text-electric-blue/90 mt-1 line-clamp-2">
                  &ldquo;{activeAlbum.driftReason}&rdquo;
                </p>
              </div>

              {/* Quick Rate Buttons (1 to 10) */}
              <div className="mt-2.5 pt-2 border-t border-border-subtle/50">
                <div className="flex items-center justify-between text-[9px] font-mono text-text-dim mb-1">
                  <span>QUICK RATE:</span>
                  <span className="flex items-center gap-1 text-purple-soft">
                    <Star className="w-2.5 h-2.5 fill-current" /> SELECT SCORE
                  </span>
                </div>
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  {[6, 7, 8, 9, 10].map((score) => (
                    <button
                      key={score}
                      onClick={() => onRateAlbum(activeAlbum.id, score)}
                      className={`flex-1 py-1 rounded font-mono text-[10px] font-bold border transition-all ${
                        activeRating && Math.round(activeRating.score) === score
                          ? 'bg-purple-soft text-black border-purple-soft shadow-sm'
                          : 'bg-panel-elevated hover:bg-neutral-800 text-text-muted border-border-subtle'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 pt-3 border-t border-border-subtle mt-2">
              <button
                onClick={() => onOpenInspector(activeAlbum)}
                className="flex-1 flex items-center justify-center gap-1.5 bg-panel-elevated hover:bg-neutral-800 text-text-offwhite border border-border-subtle hover:border-electric-blue py-2 rounded-lg font-mono text-[11px] font-bold transition-all"
              >
                <Info className="w-3.5 h-3.5 text-electric-blue" />
                <span>INSPECT LINER NOTES</span>
              </button>

              <button
                onClick={() => onReplaceAlbum(activeAlbum.id)}
                disabled={isLoading}
                className="flex items-center justify-center gap-1 bg-panel-elevated hover:bg-neutral-800 text-text-muted hover:text-red-400 border border-border-subtle px-3 py-2 rounded-lg font-mono text-[11px] transition-all"
                title="Replace this album with fresh discovery"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">REPLACE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stage: Horizontal 3D Vinyl Crate Flipper Rack */}
      <div className="bg-panel-obsidian border border-border-subtle rounded-xl p-3 sm:p-4 shadow-2xl flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Disc className="w-4 h-4 text-electric-blue" />
            <span className="font-mono text-xs font-bold text-text-offwhite">
              CRATE RACK // FLIP RECORD SLEEVES ({albums.length} RECORDS)
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevAlbum}
              className="p-1 rounded bg-panel-elevated hover:bg-neutral-800 border border-border-subtle text-text-offwhite transition-colors"
              title="Previous album"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs font-bold px-2 text-text-muted">
              {activeIndex + 1} / {albums.length}
            </span>
            <button
              onClick={handleNextAlbum}
              className="p-1 rounded bg-panel-elevated hover:bg-neutral-800 border border-border-subtle text-text-offwhite transition-colors"
              title="Next album"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Vinyl Jackets Rack */}
        <div className="flex items-center gap-3 overflow-x-auto py-2 px-1 scrollbar-thin">
          {albums.map((album) => {
            const isSelected = album.id === activeAlbum.id;
            const itemRating = ratings.find((r) => r.albumId === album.id);

            return (
              <div
                key={album.id}
                onClick={() => onSelectAlbum(album)}
                className={`flex-shrink-0 w-28 sm:w-32 group cursor-pointer transition-all duration-300 rounded-lg p-2 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-panel-elevated border-electric-blue shadow-[0_0_15px_rgba(59,130,246,0.3)] -translate-y-1'
                    : 'bg-panel-obsidian border-border-subtle hover:border-border-light hover:bg-panel-elevated'
                }`}
              >
                {/* 3D Vinyl Sleeve with Peek-Out Disc */}
                <div className="relative w-full aspect-square rounded overflow-hidden shadow-md mb-1.5 flex items-center justify-center bg-black">
                  {album.coverArtUrl ? (
                    <img
                      src={album.coverArtUrl}
                      alt={album.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <GenerativeVinylCover album={album} className="w-full h-full" />
                  )}

                  {/* Rating Tag */}
                  {itemRating && (
                    <div className="absolute top-1 right-1 font-mono text-[9px] font-bold px-1 rounded bg-black/80 text-purple-soft border border-purple-soft/40">
                      {itemRating.score.toFixed(1)}
                    </div>
                  )}

                  {/* Active Needle Drop Indicator */}
                  {isSelected && (
                    <div className="absolute bottom-1 left-1 font-mono text-[8px] font-bold px-1 rounded bg-electric-blue text-white">
                      ON DECK
                    </div>
                  )}
                </div>

                <h4 className="font-sans text-[11px] font-bold text-text-offwhite truncate" title={album.title}>
                  {album.title}
                </h4>
                <p className="font-sans text-[9px] text-text-muted truncate">
                  {album.artist}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
