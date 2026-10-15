import React, { useState, useEffect, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCw,
  Sliders,
  ExternalLink,
  Volume2,
  FileText,
  Sparkles
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
  onReplaceAlbum?: (albumId: string) => void;
  onOpenInspector?: (album: Album) => void;
  isLoading?: boolean;
  tableMode?: 'info' | 'test';
  onSwitchTable?: (mode: 'info' | 'test') => void;
}

export const HiFiStudioDeck: React.FC<HiFiStudioDeckProps> = ({
  albums,
  ratings,
  selectedAlbum,
  onSelectAlbum,
  onRateAlbum,
  onReplaceAlbum,
  onOpenInspector,
  isLoading = false,
  tableMode: externalTableMode,
  onSwitchTable: externalOnSwitchTable
}) => {
  // If no album is currently selected, pick the first album in the crate
  const activeAlbum = useMemo(() => {
    if (selectedAlbum) return selectedAlbum;
    return albums.length > 0 ? albums[0] : null;
  }, [selectedAlbum, albums]);

  const [tracks, setTracks] = useState<any[]>(() => activeAlbum?.tracks || []);
  const [rpm, setRpm] = useState<33 | 45>(33);
  const [pitchOffset, setPitchOffset] = useState<number>(0);
  const [isMotorRunning, setIsMotorRunning] = useState<boolean>(true);
  const [internalTableMode, setInternalTableMode] = useState<'info' | 'test'>('info');
  const [activeAttenuatorScore, setActiveAttenuatorScore] = useState<number>(8.5);
  const [selectedReactionTag, setSelectedReactionTag] = useState<SonicTag | undefined>(undefined);

  const activeTableMode = externalTableMode || internalTableMode;
  const setTableMode = (mode: 'info' | 'test') => {
    setInternalTableMode(mode);
    if (externalOnSwitchTable) {
      externalOnSwitchTable(mode);
    }
  };

  // Audio preview playback integration
  const { isPlaying, progress, error: audioError, playTrack, stop } = useAudioPreview();

  // Stop previous album audio preview when mounted LP on turntable changes
  useEffect(() => {
    stop();
  }, [activeAlbum?.id, stop]);

  // Load tracks for currently active turntable album
  useEffect(() => {
    if (!activeAlbum) return;
    if (activeAlbum.tracks && activeAlbum.tracks.length > 0) {
      setTracks(activeAlbum.tracks);
      return;
    }
    setTracks([]);
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

  // Sync attenuator score when active album changes
  const activeRating = ratings.find((r) => r.albumId === activeAlbum?.id);
  useEffect(() => {
    if (activeRating) {
      setActiveAttenuatorScore(activeRating.score);
      setSelectedReactionTag(activeRating.sonicTag as SonicTag | undefined);
    } else {
      setActiveAttenuatorScore(8.0);
      setSelectedReactionTag(undefined);
    }
  }, [activeRating, activeAlbum?.id]);

  // First playable track with audio preview
  const playableTrack = useMemo(() => {
    return tracks.find((t) => t.previewUrl) || tracks[0] || null;
  }, [tracks]);

  // Interactive tonearm needle drop & playback trigger
  const handleTogglePlayback = () => {
    if (!playableTrack) return;
    if (isPlaying) {
      stop();
    } else {
      setIsMotorRunning(true);
      playTrack(playableTrack.id, playableTrack.previewUrl);
    }
  };

  // Handle rating submission
  const handleCommitRating = () => {
    if (!activeAlbum) return;
    onRateAlbum(activeAlbum.id, activeAttenuatorScore, selectedReactionTag);
  };

  if (!activeAlbum) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#9C9A94] font-mono text-xs uppercase tracking-wider">
        PHYSICAL CRATE EMPTY // CYCLE 10 LPs TO ENGAGE
      </div>
    );
  }

  // Active index inside the 10-album crate
  const activeIndex = albums.findIndex((a) => a.id === activeAlbum.id);

  // Reaction stamp options matching specification
  const reactionStamps: { tag: SonicTag; label: string; desc: string; stampNum: string }[] = [
    { tag: 'Loved the rhythm', label: 'Loved rhythm', desc: 'Hypnotic · +0.8 Motorik Cadence', stampNum: '01' },
    { tag: 'Loved the atmosphere', label: 'Loved atmosphere', desc: 'Warm Analog · +1.2 Tape Saturation', stampNum: '02' },
    { tag: 'Too repetitive', label: 'Too repetitive', desc: 'Too Repetitive · -0.5 Cadence Lock', stampNum: '03' },
    { tag: 'Not my vibe', label: 'Not my vibe', desc: 'Cold/Sterile · Dampen Solid-State', stampNum: '04' }
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full w-full bg-[#0A0A0C] text-[#F5F4F0] select-none overflow-hidden">
      
      {/* =========================================================================
          LEFT PANE: 10-LP PHYSICAL CRATE RACK (VERTICAL SCROLL, ~380px)
          STRICTLY ZERO BOTTOM CAROUSEL INVARIANT
      ========================================================================= */}
      <section className="w-full lg:w-[400px] xl:w-[440px] bg-[#0A0A0C] border-b lg:border-b-0 lg:border-r border-[rgba(245,244,240,0.08)] flex flex-col h-[320px] lg:h-full shrink-0">
        
        {/* Crate Header Info */}
        <div className="p-3.5 bg-[#0D0D10] border-b border-[rgba(245,244,240,0.08)] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#F5F4F0] font-semibold">
                Physical Archive Crate
              </h2>
              <span className="text-[10px] font-mono bg-[#1E1E24] text-[#D97706] px-1.5 py-0.5 rounded border border-white/5">
                {isLoading ? 'SYNCING...' : `${albums.length} LPs`}
              </span>
            </div>
            <p className="text-[11px] text-[#9C9A94] mt-0.5">
              Click any record sleeve to mount platter and cue tonearm
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-[10px] font-mono text-[#9C9A94]">
            <span className="text-[#D97706] font-bold">SLOT {activeIndex + 1}/{albums.length}</span>
          </div>
        </div>

        {/* Scrollable Vertical 10-LP Crate Stack */}
        <div className="flex-1 overflow-y-auto divide-y divide-[rgba(245,244,240,0.05)] p-3 space-y-2">
          {albums.map((album, idx) => {
            const isSelected = album.id === activeAlbum.id;
            const itemRating = ratings.find((r) => r.albumId === album.id);
            const formatSpeed = idx % 3 === 0 ? '45 RPM' : '33 RPM';

            return (
              <div
                key={album.id}
                onClick={() => onSelectAlbum(album)}
                role="button"
                tabIndex={0}
                className={`cursor-pointer p-3 rounded-sm transition-all flex items-start space-x-3.5 group ${
                  isSelected
                    ? 'bg-[#131317] border border-[#D97706] shadow-[0_4px_16px_rgba(0,0,0,0.6)]'
                    : 'bg-[#0E0E12] border border-[rgba(245,244,240,0.06)] hover:border-[rgba(245,244,240,0.2)]'
                }`}
              >
                {/* 56px Physical Sleeve Artwork */}
                <div className="relative w-14 h-14 shrink-0 bg-[#15151B] rounded overflow-hidden border border-[rgba(245,244,240,0.1)] shadow-md">
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

                  {/* On Deck Pilot Badge */}
                  {isSelected && (
                    <div className="absolute bottom-0.5 right-0.5 px-1 bg-[#D97706] text-black text-[7px] font-mono font-bold tracking-tight uppercase rounded-xs">
                      ON DECK
                    </div>
                  )}
                </div>

                {/* Metadata Column */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0">
                      <h3 className={`text-xs font-semibold truncate transition-colors ${
                        isSelected ? 'text-[#D97706]' : 'text-[#F5F4F0] group-hover:text-[#F5F4F0]'
                      }`}>
                        {album.title}
                      </h3>
                      <p className="text-[11px] text-[#9C9A94] font-mono truncate">
                        {album.artist} &bull; {album.releaseYear} &bull; {formatSpeed}
                      </p>
                    </div>

                    {/* Rating Badge & Cycle Option */}
                    <div className="flex items-center space-x-1 shrink-0">
                      {onReplaceAlbum && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onReplaceAlbum(album.id);
                          }}
                          title="Cycle this LP from crate"
                          className="text-[8px] font-mono text-[#9C9A94] hover:text-[#D97706] transition-colors px-1 py-0.5 rounded bg-black/40 hover:bg-black/80"
                        >
                          CYCLE
                        </button>
                      )}
                      {itemRating ? (
                        <span className="text-xs font-mono font-bold text-[#D97706] bg-[#1E1C18] border border-[#D97706]/30 px-1.5 py-0.5 rounded shrink-0">
                          {itemRating.score.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-[#9C9A94] bg-[#141418] border border-white/5 px-1.5 py-0.5 rounded shrink-0">
                          UNRATED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Lateral Drift Bridge Note */}
                  <p className="mt-1.5 text-[10px] text-[#9C9A94] italic truncate font-sans">
                    {album.driftReason || 'Acoustic resonance matching current taste vector.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Crate Footer Status */}
        <div className="h-8 bg-[#0B0B0E] border-t border-[rgba(245,244,240,0.08)] px-4 flex items-center justify-between text-[10px] font-mono text-[#9C9A94] shrink-0">
          <span>PRESSING: 180G VIRGIN VINYL</span>
          <span className="text-[#D97706] font-bold">ROTATION: {ratings.filter(r => albums.some(a => a.id === r.albumId)).length}/10 RATED</span>
        </div>
      </section>


      {/* =========================================================================
          RIGHT PANE: BRAUN PS-500 TRANSCRIPTION TURNTABLE & DUAL TABLE CONSOLE
      ========================================================================= */}
      <section className="flex-1 bg-[#0E0E11] flex flex-col h-full overflow-hidden">
        
        {/* ================= INTEGRATED TABLE SWITCHER BAR ================= */}
        <div className="h-12 bg-[#121216] border-b border-[rgba(245,244,240,0.08)] px-5 flex items-center justify-between shrink-0">
          {/* Mechanical Table Switcher */}
          <div className="flex items-center space-x-1 bg-[#09090B] p-1 rounded-sm border border-[rgba(245,244,240,0.1)]">
            <button
              id="tabInfoBtn"
              onClick={() => setTableMode('info')}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-sm flex items-center space-x-2 transition-all ${
                activeTableMode === 'info'
                  ? 'braun-switch active shadow-sm'
                  : 'text-[#9C9A94] hover:text-[#F5F4F0]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Music Info Table</span>
              {activeTableMode === 'info' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
              )}
            </button>

            <button
              id="tabTestBtn"
              onClick={() => setTableMode('test')}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-sm flex items-center space-x-2 transition-all ${
                activeTableMode === 'test'
                  ? 'braun-switch active shadow-sm'
                  : 'text-[#9C9A94] hover:text-[#F5F4F0]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Music Test Table</span>
              {activeTableMode === 'test' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
              )}
            </button>
          </div>

          {/* Master Direct-Drive Caliper Bar */}
          <div className="hidden sm:flex items-center space-x-3 text-xs font-mono">
            <span className="text-[#9C9A94]">TORQUE:</span>
            <span className="text-[#F5F4F0] font-bold">4.5 kgf·cm</span>
            <div className="h-3 w-[1px] bg-white/10" />
            <span className="text-[#9C9A94]">STYLUS FORCE:</span>
            <span className="text-[#D97706] font-bold">1.82g</span>
          </div>
        </div>

        {/* ================= SCROLLABLE RIGHT WORKSPACE ================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">

          {/* ================= HERO BRAUN PS-500 MECHANICAL TURNTABLE ================= */}
          <div className="relative w-full bg-[#08080A] rounded-md border border-[rgba(245,244,240,0.08)] p-4 sm:p-5 shadow-[inset_0_2px_12px_rgba(0,0,0,0.8)]">
            
            {/* Braun Aluminum Plaque Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(245,244,240,0.08)] mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D97706] shadow-[0_0_8px_#D97706] ring-2 ring-black" />
                <span className="text-[11px] font-mono tracking-widest text-[#F5F4F0] font-semibold uppercase">
                  BRAUN // DRIFT PS-500 HI-FI TRANSCRIPTION PLATTER
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-mono text-[#9C9A94]">
                <span>QUARTZ LOCK:</span>
                <span className="text-[#F5F4F0] bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  0.00% WOW/FLUTTER
                </span>
              </div>
            </div>

            {/* Turntable Hardware Bed */}
            <div className="flex flex-col lg:flex-row items-center justify-around gap-6">

              {/* Platter Assembly */}
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] shrink-0 flex items-center justify-center">
                
                {/* Outer Heavy Cast Aluminum Ring with Strobe Dots */}
                <div className="absolute inset-0 rounded-full bg-[#18181D] border-4 border-[#24242A] shadow-2xl flex items-center justify-center">
                  <div className="absolute inset-2 rounded-full strobe-ring opacity-40" />
                </div>

                {/* Spinning Platter & 12" Vinyl Disc (Clickable needle drop/lift) */}
                <div
                  id="vinylPlatter"
                  onClick={handleTogglePlayback}
                  role="button"
                  tabIndex={0}
                  aria-label={isPlaying ? "Lift needle from vinyl" : "Drop needle onto vinyl to play sample"}
                  title={isPlaying ? "Click record or needle to lift stylus (pause)" : "Click record or needle to drop stylus (play sample)"}
                  className={`relative w-[250px] h-[250px] sm:w-[285px] sm:h-[285px] rounded-full vinyl-surface border-2 border-white/10 flex items-center justify-center cursor-pointer group/platter ${
                    isPlaying && isMotorRunning ? 'spinning' : 'paused'
                  }`}
                  style={{
                    animationDuration: rpm === 33 ? '1.8s' : '1.33s'
                  }}
                >
                  {/* Concentric Precision Micro-Grooves */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 340 340">
                    <circle cx="170" cy="170" r="160" fill="none" stroke="#F5F4F0" strokeWidth="0.3" strokeDasharray="8 4" opacity="0.3"/>
                    <circle cx="170" cy="170" r="145" fill="none" stroke="#F5F4F0" strokeWidth="0.4" opacity="0.2"/>
                    <circle cx="170" cy="170" r="130" fill="none" stroke="#F5F4F0" strokeWidth="0.3" strokeDasharray="3 3" opacity="0.3"/>
                    <circle cx="170" cy="170" r="115" fill="none" stroke="#F5F4F0" strokeWidth="0.5" opacity="0.25"/>
                    <circle cx="170" cy="170" r="95" fill="none" stroke="#F5F4F0" strokeWidth="0.4" opacity="0.2"/>
                    <circle cx="170" cy="170" r="75" fill="none" stroke="#F5F4F0" strokeWidth="0.3" strokeDasharray="6 2" opacity="0.3"/>
                  </svg>

                  {/* Light Glare Shimmer */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                  {/* Center 3" Paper Record Label (Bauhaus Typography) */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#E5E3DC] border-2 border-[#1A1A1E] shadow-md flex flex-col items-center justify-between p-2 text-black z-10">
                    <div className="text-[7px] font-mono tracking-widest font-bold uppercase text-black/70">
                      DRIFT &bull; SYSTEM 10
                    </div>
                    
                    <div className="text-center my-auto px-1">
                      <p className="text-[9px] font-bold leading-tight uppercase font-mono tracking-tight truncate max-w-[85px]">
                        {activeAlbum.title}
                      </p>
                      <p className="text-[8px] font-mono text-black/70 truncate max-w-[80px]">
                        {activeAlbum.artist}
                      </p>
                      <div className="w-2.5 h-2.5 rounded-full border border-black/40 mx-auto mt-0.5 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-[#D97706]" />
                      </div>
                    </div>

                    <div className="text-[7px] font-mono text-black/50">
                      {rpm} RPM &bull; STEREO
                    </div>
                    {/* Center Spindle Hole */}
                    <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-[#0A0A0C] border-2 border-[#8E8E9E]" />
                  </div>
                </div>

                {/* Speed Strobe Light Housing */}
                <div className="absolute -bottom-2 -left-2 z-20 flex items-center space-x-1.5 bg-[#121216] px-2 py-1 rounded border border-white/10 shadow-lg">
                  <span className={`w-2 h-2 rounded-full bg-[#D97706] ${isMotorRunning ? 'shadow-[0_0_8px_#D97706] animate-pulse' : 'opacity-40'}`} />
                  <span className="text-[8px] font-mono text-[#F5F4F0]">STROBE 50Hz</span>
                </div>
              </div>

              {/* Tonearm Assembly & Braun Physical Deck Controls */}
              <div className="flex flex-col justify-between h-[300px] w-full max-w-[280px] bg-[#101014] p-3.5 rounded border border-white/5">
                
                {/* Tonearm Visual Mechanics (Interactive Clickable Stylus) */}
                <div
                  onClick={handleTogglePlayback}
                  role="button"
                  tabIndex={0}
                  aria-label={isPlaying ? "Lift stylus needle from record" : "Press stylus needle to drop onto record"}
                  title={isPlaying ? "Click needle to lift and pause sample" : "Click needle to drop and play sample"}
                  className="relative h-40 bg-[#0A0A0D] rounded border border-white/5 overflow-hidden p-3 flex flex-col justify-between cursor-pointer group/needle select-none"
                >
                  <div className="flex justify-between items-center text-[9px] font-mono text-[#9C9A94]">
                    <span>TONEARM BASE: GIMBAL</span>
                    <span className={`font-semibold ${isPlaying ? 'text-[#D97706]' : 'text-[#9C9A94]'}`}>
                      {isPlaying ? 'NEEDLE TRACKING' : 'NEEDLE PARKED'}
                    </span>
                  </div>

                  {/* Graphic Representation of Dieter Rams Tonearm & Stylus */}
                  <div className="relative w-full h-20 flex items-center justify-center">
                    {/* Pivot Gimbal Base */}
                    <div className="absolute top-1 right-6 w-8 h-8 rounded-full bg-[#2A2A30] border-2 border-[#4A4A52] flex items-center justify-center shadow-md">
                      <div className="w-3 h-3 rounded-full bg-[#0A0A0C] border border-[#D97706]" />
                    </div>

                    {/* Tonearm Tube */}
                    <div
                      className="absolute top-5 right-9 w-28 h-[3px] bg-gradient-to-l from-[#C0C0C8] via-[#8A8A94] to-[#404048] transform origin-right transition-transform duration-700 shadow-sm"
                      style={{
                        transform: isPlaying ? `rotate(${-18 - (progress / 100) * 10}deg)` : 'rotate(12deg)'
                      }}
                    >
                      {/* Headshell & Diamond Stylus Cartridge */}
                      <div className="absolute -left-5 -top-2 w-6 h-4 bg-[#18181D] border border-white/20 rounded-sm flex items-center justify-between px-1">
                        <span className={`w-1 h-2 rounded-xs ${isPlaying ? 'bg-[#D97706]' : 'bg-neutral-600'}`} />
                        <span className="text-[6px] font-mono text-white/70">SHURE</span>
                      </div>
                      
                      {/* Stylus Needle Cantilever & Tip */}
                      <div className="absolute -left-4 top-2 w-0.5 h-2 bg-neutral-300">
                        <div className={`w-1 h-1 rounded-full -bottom-0.5 -left-0.2 absolute ${
                          isPlaying ? 'bg-[#D97706] shadow-[0_0_6px_#D97706]' : 'bg-neutral-400'
                        }`} />
                      </div>
                    </div>
                  </div>

                  {/* Needle Drop / Lift Indicator Prompts (Matching tests) */}
                  <div className="flex items-center justify-between text-[9px] font-mono">
                    <span className="text-[#9C9A94]">Diamond Stylus MM</span>
                    <span className="text-[#D97706] font-bold">
                      {isPlaying ? `CLICK NEEDLE TO LIFT (${Math.round(progress)}%)` : 'CLICK NEEDLE TO DROP'}
                    </span>
                  </div>

                  {audioError && (
                    <div className="text-[8px] font-mono text-[#D97706] tracking-tight truncate mt-0.5">
                      {audioError.toUpperCase()}
                    </div>
                  )}

                  {isPlaying && (
                    <div className="w-full bg-white/10 h-0.5 rounded-full overflow-hidden mt-1">
                      <div
                        className="bg-[#D97706] h-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(2, progress))}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Deck Transport Controls */}
                <div className="space-y-2.5 mt-2">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Motor RUN / STOP */}
                    <button
                      id="platterRunBtn"
                      onClick={() => setIsMotorRunning(!isMotorRunning)}
                      className={`braun-switch py-2 px-3 text-[11px] font-mono uppercase tracking-wider rounded-sm flex items-center justify-center space-x-1.5 ${
                        isMotorRunning ? 'active-amber' : 'text-[#9C9A94]'
                      }`}
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>{isMotorRunning ? 'MOTOR RUN' : 'MOTOR STOP'}</span>
                    </button>

                    {/* Cue Needle Drop / Lift */}
                    <button
                      id="needleCueBtn"
                      onClick={handleTogglePlayback}
                      className={`braun-switch py-2 px-3 text-[11px] font-mono uppercase tracking-wider rounded-sm flex items-center justify-center space-x-1.5 ${
                        isPlaying ? 'active' : 'text-[#F5F4F0]'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span>{isPlaying ? 'CUE LIFT' : 'CUE DROP'}</span>
                    </button>
                  </div>

                  {/* Pitch Calibration Slider & Speed Selectors */}
                  <div className="p-2 bg-[#0C0C0F] rounded border border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center text-[9px] font-mono">
                      <span className="text-[#9C9A94]">PITCH: {pitchOffset >= 0 ? `+${pitchOffset.toFixed(1)}%` : `${pitchOffset.toFixed(1)}%`}</span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => setRpm(33)}
                          className={`px-1.5 py-0.5 rounded-xs text-[9px] font-mono transition-all ${
                            rpm === 33
                              ? 'bg-[#F5F4F0] text-black font-bold'
                              : 'bg-[#18181D] text-[#9C9A94] hover:text-white'
                          }`}
                        >
                          33
                        </button>
                        <button
                          onClick={() => setRpm(45)}
                          className={`px-1.5 py-0.5 rounded-xs text-[9px] font-mono transition-all ${
                            rpm === 45
                              ? 'bg-[#F5F4F0] text-black font-bold'
                              : 'bg-[#18181D] text-[#9C9A94] hover:text-white'
                          }`}
                        >
                          45
                        </button>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="-8"
                      max="8"
                      step="0.5"
                      value={pitchOffset}
                      onChange={(e) => setPitchOffset(parseFloat(e.target.value))}
                      className="w-full amber-thumb cursor-pointer"
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>


          {/* ================= LOWER DYNAMIC TABLE (SWITCHED BY SHELVES) ================= */}
          {activeTableMode === 'info' ? (
            /* ================= MODE A: MUSIC INFO TABLE ================= */
            <div id="viewInfoTable" className="space-y-4">
              
              {/* Gatefold Technical Specifications Card */}
              <div className="bg-[#0B0B0E] p-4 sm:p-5 rounded border border-[rgba(245,244,240,0.08)] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(245,244,240,0.08)]">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-xs bg-[#D97706]" />
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#F5F4F0] font-semibold">
                      Gatefold Technical Specifications
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#9C9A94]">
                    CATALOGUE: #{activeAlbum.id.slice(0, 8).toUpperCase()}
                  </span>
                </div>

                {/* Metadata Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 bg-[#111116] rounded border border-white/5">
                    <span className="text-[9px] text-[#9C9A94] block uppercase">Original Master Year</span>
                    <span className="text-[#F5F4F0] font-bold text-xs mt-0.5 block truncate">
                      {activeAlbum.releaseYear}
                    </span>
                  </div>
                  <div className="p-3 bg-[#111116] rounded border border-white/5">
                    <span className="text-[9px] text-[#9C9A94] block uppercase">Master Bitrate</span>
                    <span className="text-[#D97706] font-bold text-xs mt-0.5 block">
                      24-BIT/96kHz PCM
                    </span>
                  </div>
                  <div className="p-3 bg-[#111116] rounded border border-white/5">
                    <span className="text-[9px] text-[#9C9A94] block uppercase">Dynamic Range Matrix</span>
                    <span className="text-[#F5F4F0] font-bold text-xs mt-0.5 block">
                      DR14
                    </span>
                  </div>
                  <div className="p-3 bg-[#111116] rounded border border-white/5">
                    <span className="text-[9px] text-[#9C9A94] block uppercase">Physical Pressing</span>
                    <span className="text-[#F5F4F0] font-bold text-xs mt-0.5 block truncate">
                      180G VIRGIN VINYL
                    </span>
                  </div>
                </div>

                {/* Gatefold Curatorial Liner Notes */}
                <div className="p-3.5 bg-[#101014] rounded border border-white/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D97706] block mb-1">
                    Archivist Curatorial Notes:
                  </span>
                  <p className="text-xs text-[#9C9A94] leading-relaxed font-sans">
                    &ldquo;{activeAlbum.driftReason || 'Pressed from original analogue safety masters. Matched into your crate through structural sonic affinities and lateral genre bridges.'}&rdquo;
                  </p>
                </div>

                {/* External Streaming Action Links */}
                <div className="pt-1 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <a
                    href={activeAlbum.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent(activeAlbum.artist + ' ' + activeAlbum.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 bg-[#141418] hover:bg-[#1E1E24] text-[#F5F4F0] text-xs font-mono rounded border border-white/10 flex items-center justify-center space-x-2 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>SPOTIFY STREAM</span>
                  </a>

                  <a
                    href={activeAlbum.youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(activeAlbum.artist + ' ' + activeAlbum.title + ' full album')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 bg-[#141418] hover:bg-[#1E1E24] text-[#F5F4F0] text-xs font-mono rounded border border-white/10 flex items-center justify-center space-x-2 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>YOUTUBE MASTER</span>
                  </a>

                  <a
                    href={activeAlbum.youtubeMusicUrl || `https://music.youtube.com/search?q=${encodeURIComponent(activeAlbum.artist + ' ' + activeAlbum.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 bg-[#141418] hover:bg-[#1E1E24] text-[#F5F4F0] text-xs font-mono rounded border border-white/10 flex items-center justify-center space-x-2 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>YT MUSIC STREAM</span>
                  </a>
                </div>

                {onOpenInspector && (
                  <div className="pt-2 border-t border-[rgba(245,244,240,0.06)]">
                    <button
                      type="button"
                      onClick={() => onOpenInspector(activeAlbum)}
                      className="w-full py-2 px-3 bg-[#131317] hover:bg-[#1A1A22] text-[#F5F4F0] text-xs font-mono rounded border border-white/10 flex items-center justify-center space-x-2 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>OPEN FULL GATEFOLD SLEEVE INSPECTOR</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Master Tracklist Table */}
              <div className="bg-[#0B0B0E] p-4 sm:p-5 rounded border border-[rgba(245,244,240,0.08)] space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(245,244,240,0.08)]">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#F5F4F0] font-semibold">
                    Side A &bull; Tracklist Composition
                  </h3>
                  <span className="text-[10px] font-mono text-[#9C9A94]">
                    {tracks.length > 0 ? `${tracks.length} TRACKS LOADED` : 'HYDRATING TRACKLIST...'}
                  </span>
                </div>

                <div className="divide-y divide-[rgba(245,244,240,0.05)] font-mono text-xs">
                  {tracks.length > 0 ? (
                    tracks.map((track, i) => {
                      const isCurrentTrackPlaying = isPlaying && playableTrack?.id === track.id;
                      return (
                        <div
                          key={track.id || i}
                          onClick={() => {
                            if (track.previewUrl) {
                              playTrack(track.id, track.previewUrl);
                            }
                          }}
                          className={`py-2.5 flex items-center justify-between transition-colors ${
                            track.previewUrl ? 'cursor-pointer hover:text-[#F5F4F0]' : 'opacity-70'
                          } ${isCurrentTrackPlaying ? 'text-[#D97706]' : 'text-[#9C9A94]'}`}
                        >
                          <div className="flex items-center space-x-3 truncate">
                            <span className="text-[#D97706] font-bold text-xs min-w-[20px]">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="font-medium truncate text-xs text-[#F5F4F0]">
                              {track.title}
                            </span>
                            {isCurrentTrackPlaying && (
                              <span className="text-[8px] bg-[#D97706]/20 text-[#D97706] px-1.5 py-0.5 rounded border border-[#D97706]/40 uppercase shrink-0">
                                ACTIVE ON PLATTER
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 shrink-0">
                            {track.previewUrl && (
                              <Volume2 className="w-3 h-3 text-[#D97706]" />
                            )}
                            <span className="text-[#9C9A94] text-xs">
                              {track.duration ? `${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, '0')}` : '03:45'}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-4 text-center text-[#9C9A94] text-xs font-mono">
                      Hydrating master tracks from MusicBrainz archive...
                    </div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            /* ================= MODE B: MUSIC TEST TABLE ================= */
            <div id="viewTestTable" className="space-y-4">
              
              {/* 1.0 to 10.0 Stepped Rating Attenuator Container */}
              <div className="bg-[#0B0B0E] p-4 sm:p-5 rounded border border-[rgba(245,244,240,0.08)] space-y-5">
                
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(245,244,240,0.08)]">
                  <div>
                    <span className="text-[9px] font-mono text-[#D97706] tracking-widest uppercase block">
                      TEST CALIBRATION UNIT
                    </span>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#F5F4F0] font-bold">
                      1.0 &rarr; 10.0 Stepped Rating Attenuator
                    </h3>
                  </div>
                  
                  {/* Rating Readout */}
                  <div className="flex items-baseline space-x-1.5 bg-[#121217] px-3 py-1.5 rounded border border-white/10 font-mono">
                    <span className="text-xl font-bold text-[#F5F4F0]">
                      {activeAttenuatorScore.toFixed(1)}
                    </span>
                    <span className="text-xs text-[#9C9A94]">/ 10.0</span>
                    <span className="ml-2 text-[8px] bg-[#D97706] text-black font-bold px-1.5 py-0.5 rounded uppercase">
                      {activeAttenuatorScore >= 7.5 ? 'HIGH AFFINITY' : activeAttenuatorScore >= 5.0 ? 'NEUTRAL' : 'DIVERGENT'}
                    </span>
                  </div>
                </div>

                {/* Visual Mechanical Step Scale Marks */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex justify-between text-[9px] font-mono text-[#9C9A94] px-1">
                    <span>1.0 DISCORD</span>
                    <span>3.0</span>
                    <span>5.0 NEUTRAL</span>
                    <span>7.0</span>
                    <span className="text-[#D97706] font-bold">{activeAttenuatorScore.toFixed(1)} CURRENT</span>
                    <span>10.0 TRANSCENDENT</span>
                  </div>

                  {/* Attenuator Stepped Range Slider */}
                  <div className="relative py-1">
                    <input
                      id="attenuatorSlider"
                      type="range"
                      min="1.0"
                      max="10.0"
                      step="0.5"
                      value={activeAttenuatorScore}
                      onChange={(e) => setActiveAttenuatorScore(parseFloat(e.target.value))}
                      className="w-full amber-thumb cursor-pointer"
                    />
                    
                    {/* Mechanical Notches */}
                    <div className="flex justify-between w-full mt-2 px-1">
                      {Array.from({ length: 19 }).map((_, idx) => {
                        const stepValue = 1.0 + idx * 0.5;
                        const isCurrent = Math.abs(stepValue - activeAttenuatorScore) < 0.2;
                        return (
                          <span
                            key={idx}
                            className={`w-0.5 transition-all ${
                              isCurrent
                                ? 'h-3 bg-[#D97706]'
                                : idx % 2 === 0
                                ? 'h-2 bg-white/20'
                                : 'h-1 bg-white/10'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Sonic Reaction Stamps (Braun Minimalist Matrix) */}
                <div className="space-y-2.5 pt-3 border-t border-[rgba(245,244,240,0.08)]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9C9A94] block">
                    Sonic Reaction Stamps (Shift Next 10 Crate):
                  </span>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    {reactionStamps.map((stamp) => {
                      const isSelected = selectedReactionTag === stamp.tag;
                      return (
                        <button
                          key={stamp.tag}
                          onClick={() => setSelectedReactionTag(isSelected ? undefined : stamp.tag)}
                          className={`p-2.5 rounded text-left transition-all ${
                            isSelected
                              ? 'bg-[#181822] border border-[#D97706] shadow-sm'
                              : 'bg-[#111116] border border-white/5 hover:border-white/20 opacity-80'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-[8px] font-mono font-bold ${isSelected ? 'text-[#D97706]' : 'text-[#9C9A94]'}`}>
                              STAMP {stamp.stampNum}
                            </span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />}
                          </div>
                          <span className="text-xs font-mono text-[#F5F4F0] font-semibold block truncate">
                            {stamp.label}
                          </span>
                          <span className="text-[9px] text-[#9C9A94] mt-0.5 block leading-tight font-mono">
                            {stamp.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Commit Rating CTA in Warm Amber */}
                <div className="pt-2">
                  <button
                    onClick={handleCommitRating}
                    className="w-full py-3 bg-[#D97706] hover:bg-[#B45309] text-black font-mono font-bold text-xs uppercase tracking-widest rounded transition-all shadow-[0_2px_12px_rgba(217,119,6,0.25)] flex items-center justify-center space-x-2 active:scale-[0.99]"
                  >
                    <span>COMMIT RATING & RE-DRIFT 10 CRATE DISCS</span>
                    <Sparkles className="w-4 h-4 text-black" />
                  </button>
                </div>

              </div>

              {/* Lateral Drift Vector Explanation & Acoustic Output */}
              <div className="bg-[#0B0B0E] p-4 rounded border border-[rgba(245,244,240,0.08)] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[rgba(245,244,240,0.08)]">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-xs bg-[#D97706]" />
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#F5F4F0] font-semibold">
                      Lateral Drift Vector Shift Engine
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono text-[#D97706]">STOCHASTIC CONVERGENCE</span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-[#111116] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[#D97706] font-bold text-[11px]">
                        RATING &ge; 7.0 // LATERAL SUBGENRE PIVOT
                      </span>
                      <span className="text-[9px] text-[#9C9A94] bg-[#181822] px-1.5 py-0.5 rounded border border-white/5">
                        AFFINITY LOCK
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9C9A94] font-sans leading-relaxed">
                      Engine locks onto texture, pacing, and sonic attributes, intentionally pivoting to a DIFFERENT unexpected genre or subgenre for future recommendations.
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-[#111116] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[#9C9A94] font-bold text-[11px]">
                        RATING &lt; 5.0 // VECTOR DIVERGENCE DAMPING
                      </span>
                      <span className="text-[9px] text-[#575550] bg-[#141418] px-1.5 py-0.5 rounded border border-white/5">
                        DOWNWEIGHT
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9C9A94] font-sans leading-relaxed">
                      Engine downweights both this genre and its specific acoustic signature, shifting discovery away from sterile or unaligned sonic traits.
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-[#111116] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[#F5F4F0] font-bold text-[11px]">
                        5.0 &le; RATING &lt; 7.0 // GRADUAL EQUILIBRIUM
                      </span>
                      <span className="text-[9px] text-[#9C9A94] bg-[#181822] px-1.5 py-0.5 rounded border border-white/5">
                        MAINTAIN
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9C9A94] font-sans leading-relaxed">
                      Maintains current genre affinity balance while preparing smooth transitional bridges in the next 10-LP crate cycle.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono pt-1 border-t border-[rgba(245,244,240,0.06)]">
                  <div className="p-2.5 bg-[#111116] rounded border border-white/5">
                    <span className="text-[9px] text-[#9C9A94] block">LATERAL SHIFT:</span>
                    <span className="text-[#F5F4F0] font-bold block mt-0.5">
                      {activeAttenuatorScore >= 7.0 ? '+4.20 σ (Lateral Subgenre Pivot)' : activeAttenuatorScore < 5.0 ? '-2.10 σ (Genre Downweight)' : '0.00 σ (Equilibrium)'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-[#111116] rounded border border-white/5">
                    <span className="text-[9px] text-[#9C9A94] block">COHERENCE AFFINITY:</span>
                    <span className="text-[#D97706] font-bold block mt-0.5">
                      {(activeAttenuatorScore * 9.8).toFixed(1)}% Match
                    </span>
                  </div>
                  <div className="p-2.5 bg-[#111116] rounded border border-white/5">
                    <span className="text-[9px] text-[#9C9A94] block">CRATE DAMPING:</span>
                    <span className="text-[#F5F4F0] font-bold block mt-0.5">
                      0.12 Q-Factor
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </section>

    </div>
  );
};
