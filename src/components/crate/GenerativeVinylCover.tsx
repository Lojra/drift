import React, { useMemo } from 'react';
import { Album } from '../../types/music';

interface GenerativeVinylCoverProps {
  album: Album;
  className?: string;
}

// Deterministic 32-bit hash function from string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Map primary genre to bespoke Dieter Rams & Bauhaus monochrome + amber palettes
function getGenrePalette(genres: string[] = []): {
  bgStart: string;
  bgEnd: string;
  accent: string;
  waveformColor: string;
  patternType: 'waves' | 'grid' | 'circles' | 'strips';
} {
  const g = (genres[0] || '').toLowerCase();
  
  if (g.includes('kraut') || g.includes('motorik')) {
    return {
      bgStart: '#141418',
      bgEnd: '#0A0A0C',
      accent: '#D97706',
      waveformColor: 'rgba(217, 119, 6, 0.4)',
      patternType: 'waves'
    };
  }
  if (g.includes('dub') || g.includes('reggae')) {
    return {
      bgStart: '#16161A',
      bgEnd: '#0A0A0C',
      accent: '#F5F4F0',
      waveformColor: 'rgba(245, 244, 240, 0.35)',
      patternType: 'circles'
    };
  }
  if (g.includes('ambient') || g.includes('drone')) {
    return {
      bgStart: '#121216',
      bgEnd: '#0A0A0C',
      accent: '#9C9A94',
      waveformColor: 'rgba(156, 154, 148, 0.35)',
      patternType: 'strips'
    };
  }
  if (g.includes('jazz') || g.includes('ethio') || g.includes('spiritual')) {
    return {
      bgStart: '#18181D',
      bgEnd: '#0B0B0E',
      accent: '#D97706',
      waveformColor: 'rgba(217, 119, 6, 0.35)',
      patternType: 'grid'
    };
  }
  if (g.includes('post-punk') || g.includes('darkwave') || g.includes('goth')) {
    return {
      bgStart: '#18181B',
      bgEnd: '#0A0A0C',
      accent: '#F5F4F0',
      waveformColor: 'rgba(245, 244, 240, 0.3)',
      patternType: 'waves'
    };
  }
  if (g.includes('electronic') || g.includes('idm') || g.includes('techno')) {
    return {
      bgStart: '#131317',
      bgEnd: '#0A0A0C',
      accent: '#D97706',
      waveformColor: 'rgba(217, 119, 6, 0.4)',
      patternType: 'grid'
    };
  }

  // Default Bauhaus Minimal Noir
  return {
    bgStart: '#141418',
    bgEnd: '#0A0A0C',
    accent: '#D97706',
    waveformColor: 'rgba(217, 119, 6, 0.35)',
    patternType: 'waves'
  };
}

export const GenerativeVinylCover: React.FC<GenerativeVinylCoverProps> = ({ album, className = '' }) => {
  const seed = useMemo(() => hashString(`${album.artist}-${album.title}`), [album.artist, album.title]);
  const palette = useMemo(() => getGenrePalette(album.genres), [album.genres]);

  // Generate 7-10 harmonic waves based on seed
  const wavePaths = useMemo(() => {
    const paths: string[] = [];
    const count = 8;
    const width = 400;

    for (let i = 0; i < count; i++) {
      const yOffset = 180 + i * 20;
      const freq = 0.02 + ((seed + i * 17) % 20) * 0.001;
      const amp = 15 + ((seed * (i + 1)) % 30);
      
      let d = `M 20 ${yOffset}`;
      for (let x = 20; x <= width - 20; x += 10) {
        // Bell-curve modulation towards center
        const bell = Math.sin((x / width) * Math.PI);
        const y = yOffset - Math.sin(x * freq + i * 0.7) * amp * bell;
        d += ` L ${x} ${y.toFixed(1)}`;
      }
      paths.push(d);
    }
    return paths;
  }, [seed]);

  const primaryGenre = album.genres?.[0] || 'ARCHIVE';
  const catalogNum = `DF-${(seed % 899 + 100)}`;

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-[#0A0A0C] ${className}`}>
      {/* SVG Canvas */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full block"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`bg-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.bgStart} />
            <stop offset="100%" stopColor={palette.bgEnd} />
          </linearGradient>

          <radialGradient id={`glow-${seed}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background Fill */}
        <rect width="400" height="400" fill={`url(#bg-${seed})`} />

        {/* Ambient Center Glow */}
        <circle cx="200" cy="240" r="140" fill={`url(#glow-${seed})`} />

        {/* Geometric Micro Pattern Background */}
        {palette.patternType === 'grid' && (
          <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`gh-${i}`} x1="20" y1={40 + i * 40} x2="380" y2={40 + i * 40} />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`gv-${i}`} x1={40 + i * 40} y1="20" x2={40 + i * 40} y2="380" />
            ))}
          </g>
        )}

        {palette.patternType === 'circles' && (
          <g stroke={palette.waveformColor} strokeWidth="1" fill="none">
            <circle cx="200" cy="240" r="30" strokeDasharray="3 3" />
            <circle cx="200" cy="240" r="60" />
            <circle cx="200" cy="240" r="95" strokeDasharray="4 4" />
            <circle cx="200" cy="240" r="130" opacity="0.6" />
          </g>
        )}

        {/* Waveform / Harmonic Ribbons */}
        {palette.patternType === 'waves' && (
          <g fill="none" stroke={palette.waveformColor} strokeWidth="1.5" strokeLinecap="round">
            {wavePaths.map((d, idx) => (
              <path
                key={idx}
                d={d}
                opacity={0.3 + (idx / wavePaths.length) * 0.7}
                stroke={idx % 2 === 0 ? palette.accent : palette.waveformColor}
              />
            ))}
          </g>
        )}

        {palette.patternType === 'strips' && (
          <g fill="none" strokeWidth="2">
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={`s-${i}`}
                x1={60 + i * 24}
                y1={160 + (i % 3) * 12}
                x2={60 + i * 24}
                y2={320 - (i % 4) * 16}
                stroke={i % 3 === 0 ? palette.accent : palette.waveformColor}
                opacity={0.5 + (i % 4) * 0.12}
                strokeDasharray="6 3"
              />
            ))}
          </g>
        )}

        {/* Vinyl Stylized Grooves Overlay at the bottom right */}
        <circle
          cx="370"
          cy="370"
          r="160"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        <circle
          cx="370"
          cy="370"
          r="130"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
        <circle
          cx="370"
          cy="370"
          r="100"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />

        {/* Header Metadata Bar */}
        <text
          x="24"
          y="38"
          fill={palette.accent}
          fontSize="11"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
          letterSpacing="0.1em"
        >
          {primaryGenre.toUpperCase()}
        </text>

        <text
          x="376"
          y="38"
          fill="rgba(255,255,255,0.4)"
          fontSize="10"
          fontFamily="JetBrains Mono, monospace"
          textAnchor="end"
        >
          {catalogNum}
        </text>

        {/* Subtle Horizontal Divider */}
        <line x1="24" y1="48" x2="376" y2="48" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* Album Typography: Title & Artist */}
        <text
          x="24"
          y="84"
          fill="#F5F4F0"
          fontSize="20"
          fontFamily="Plus Jakarta Sans, sans-serif"
          fontWeight="700"
          letterSpacing="-0.02em"
        >
          {album.title.length > 22 ? `${album.title.slice(0, 20)}...` : album.title}
        </text>

        <text
          x="24"
          y="108"
          fill="rgba(245,244,240,0.65)"
          fontSize="13"
          fontFamily="Plus Jakarta Sans, sans-serif"
          fontWeight="500"
        >
          {album.artist} &middot; {album.releaseYear}
        </text>

        {/* Bottom Archival Stamp */}
        <text
          x="24"
          y="372"
          fill="rgba(255,255,255,0.3)"
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.12em"
        >
          DRIFT GENERATIVE ARCHIVE &bull; HIGH-FIDELITY VINYL
        </text>
      </svg>
    </div>
  );
};
