/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050507',
        'canvas-black': '#050507',
        'panel-obsidian': '#0C0C10',
        'panel-elevated': '#13131A',
        'panel-hover': '#181822',
        'border-subtle': 'rgba(255, 255, 255, 0.06)',
        'border-light': 'rgba(255, 255, 255, 0.12)',
        'electric-blue': '#3B82F6',
        'purple-soft': '#C084FC',
        'text-offwhite': '#F4F4F6',
        'text-muted': '#8E8E9E',
        'text-dim': '#575766',
        surface: {
          DEFAULT: '#0C0C10',
          hover: '#13131A',
          border: 'rgba(255, 255, 255, 0.06)',
          borderHover: 'rgba(255, 255, 255, 0.14)'
        },
        accent: {
          primary: '#3B82F6',
          secondary: '#C084FC',
        },
        text: {
          primary: '#F4F4F6',
          muted: '#8E8E9E',
          dim: '#575766',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      }
    },
  },
  plugins: [],
}
