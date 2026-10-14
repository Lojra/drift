import React from 'react';
import { Disc3, Archive, Sliders } from 'lucide-react';

interface MobileTabBarProps {
  activeTab: 'crate' | 'archive' | 'taste';
  setActiveTab: (tab: 'crate' | 'archive' | 'taste') => void;
  crateCount: number;
  ratedCount: number;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  activeTab,
  setActiveTab,
  crateCount,
  ratedCount
}) => {
  return (
    <div className="fixed bottom-4 inset-x-4 max-w-sm mx-auto z-40 md:hidden select-none">
      {/* iOS Liquid Glass Floating Capsule */}
      <nav
        aria-label="Mobile Navigation"
        className="relative bg-panel-elevated/80 dark:bg-[#0C0C10]/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-full p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_16px_36px_rgba(0,0,0,0.45)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_16px_40px_rgba(0,0,0,0.65)] transition-all duration-300"
      >
        {/* Specular gloss highlight gradient line */}
        <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none rounded-full" />

        <div className="grid grid-cols-3 gap-1 relative z-10">
          {/* Tab 1: Crate */}
          <button
            onClick={() => setActiveTab('crate')}
            className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all duration-200 min-h-[48px] ${
              activeTab === 'crate'
                ? 'bg-electric-blue/15 text-electric-blue border border-electric-blue/30 shadow-[0_0_16px_rgba(59,130,246,0.25)]'
                : 'text-text-muted hover:text-text-offwhite hover:bg-white/5 border border-transparent'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <Disc3
                className={`w-5 h-5 transition-transform duration-300 ${
                  activeTab === 'crate' ? 'animate-spin-slow scale-110' : ''
                }`}
                strokeWidth={1.75}
              />
              {crateCount > 0 && (
                <span
                  className={`absolute -top-1 -right-3 font-mono text-[9px] px-1 py-0.2 rounded-full border transition-all ${
                    activeTab === 'crate'
                      ? 'bg-electric-blue text-white border-electric-blue font-bold shadow-sm'
                      : 'bg-panel-elevated border-border-light text-text-muted'
                  }`}
                >
                  {crateCount}
                </span>
              )}
            </div>
            <span className="font-mono text-[10px] mt-1 font-semibold tracking-wider">CRATE</span>
          </button>

          {/* Tab 2: Archive */}
          <button
            onClick={() => setActiveTab('archive')}
            className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all duration-200 min-h-[48px] ${
              activeTab === 'archive'
                ? 'bg-purple-soft/15 text-purple-soft border border-purple-soft/30 shadow-[0_0_16px_rgba(192,132,252,0.25)]'
                : 'text-text-muted hover:text-text-offwhite hover:bg-white/5 border border-transparent'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <Archive
                className={`w-5 h-5 transition-transform duration-300 ${
                  activeTab === 'archive' ? 'scale-110' : ''
                }`}
                strokeWidth={1.75}
              />
              {ratedCount > 0 && (
                <span
                  className={`absolute -top-1 -right-3 font-mono text-[9px] px-1.5 py-0.2 rounded-full border transition-all ${
                    activeTab === 'archive'
                      ? 'bg-purple-soft text-black border-purple-soft font-bold shadow-sm'
                      : 'bg-purple-soft/20 border-purple-soft/40 text-purple-soft font-bold'
                  }`}
                >
                  {ratedCount}
                </span>
              )}
            </div>
            <span className="font-mono text-[10px] mt-1 font-semibold tracking-wider">ARCHIVE</span>
          </button>

          {/* Tab 3: Taste Vector */}
          <button
            onClick={() => setActiveTab('taste')}
            className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all duration-200 min-h-[48px] ${
              activeTab === 'taste'
                ? 'bg-electric-blue/15 text-electric-blue border border-electric-blue/30 shadow-[0_0_16px_rgba(59,130,246,0.25)]'
                : 'text-text-muted hover:text-text-offwhite hover:bg-white/5 border border-transparent'
            }`}
          >
            <Sliders
              className={`w-5 h-5 transition-transform duration-300 ${
                activeTab === 'taste' ? 'scale-110' : ''
              }`}
              strokeWidth={1.75}
            />
            <span className="font-mono text-[10px] mt-1 font-semibold tracking-wider">VECTOR</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
