/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--canvas-bg)',
        'canvas-black': 'var(--canvas-bg)',
        'panel-obsidian': 'var(--panel-obsidian)',
        'panel-elevated': 'var(--panel-elevated)',
        'panel-hover': 'var(--panel-hover)',
        'border-subtle': 'var(--border-subtle)',
        'border-light': 'var(--border-light)',
        'electric-blue': 'var(--electric-blue)',
        'purple-soft': 'var(--purple-soft)',
        'text-offwhite': 'var(--text-offwhite)',
        'text-muted': 'var(--text-muted)',
        'text-dim': 'var(--text-dim)',
        surface: {
          DEFAULT: 'var(--panel-obsidian)',
          hover: 'var(--panel-elevated)',
          border: 'var(--border-subtle)',
          borderHover: 'var(--border-light)'
        },
        accent: {
          primary: 'var(--electric-blue)',
          secondary: 'var(--purple-soft)',
        },
        text: {
          primary: 'var(--text-offwhite)',
          muted: 'var(--text-muted)',
          dim: 'var(--text-dim)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'crate-entrance': {
          '0%': { opacity: '0', transform: 'translateY(14px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      },
      animation: {
        'spin-slow': 'spin-slow 20s linear infinite',
        'crate-entrance': 'crate-entrance 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
