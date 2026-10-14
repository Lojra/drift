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
    <nav className="fixed bottom-0 inset-x-0 bg-[#050507]/95 backdrop-blur-xl border-t border-border-light z-30 md:hidden pb-safe select-none">
      <div className="grid grid-cols-3 h-14 items-center max-w-md mx-auto">
        {/* Tab 1: Crate */}
        <button
          onClick={() => setActiveTab('crate')}
          className={`flex flex-col items-center justify-center h-full transition-colors relative min-h-[44px] ${
            activeTab === 'crate' ? 'text-electric-blue' : 'text-text-muted hover:text-text-offwhite'
          }`}
        >
          <div className="relative">
            <Disc3 className={`w-5 h-5 ${activeTab === 'crate' ? 'animate-spin-slow' : ''}`} strokeWidth={1.75} />
            {crateCount > 0 && (
              <span className="absolute -top-1 -right-2.5 font-mono text-[9px] px-1 bg-panel-elevated border border-border-light text-text-offwhite rounded-full">
                {crateCount}
              </span>
            )}
          </div>
          <span className="font-mono text-[10px] mt-1 font-medium tracking-wide">CRATE</span>
          {activeTab === 'crate' && (
            <div className="absolute top-0 inset-x-6 h-[2px] bg-electric-blue shadow-[0_0_8px_#3B82F6]" />
          )}
        </button>

        {/* Tab 2: Rated Archive */}
        <button
          onClick={() => setActiveTab('archive')}
          className={`flex flex-col items-center justify-center h-full transition-colors relative min-h-[44px] ${
            activeTab === 'archive' ? 'text-electric-blue' : 'text-text-muted hover:text-text-offwhite'
          }`}
        >
          <div className="relative">
            <Archive className="w-5 h-5" strokeWidth={1.75} />
            {ratedCount > 0 && (
              <span className="absolute -top-1 -right-2.5 font-mono text-[9px] px-1 bg-purple-soft/20 border border-purple-soft/40 text-purple-soft rounded-full font-bold">
                {ratedCount}
              </span>
            )}
          </div>
          <span className="font-mono text-[10px] mt-1 font-medium tracking-wide">ARCHIVE</span>
          {activeTab === 'archive' && (
            <div className="absolute top-0 inset-x-6 h-[2px] bg-electric-blue shadow-[0_0_8px_#3B82F6]" />
          )}
        </button>

        {/* Tab 3: Taste Vector */}
        <button
          onClick={() => setActiveTab('taste')}
          className={`flex flex-col items-center justify-center h-full transition-colors relative min-h-[44px] ${
            activeTab === 'taste' ? 'text-electric-blue' : 'text-text-muted hover:text-text-offwhite'
          }`}
        >
          <Sliders className="w-5 h-5" strokeWidth={1.75} />
          <span className="font-mono text-[10px] mt-1 font-medium tracking-wide">VECTOR</span>
          {activeTab === 'taste' && (
            <div className="absolute top-0 inset-x-6 h-[2px] bg-electric-blue shadow-[0_0_8px_#3B82F6]" />
          )}
        </button>
      </div>
    </nav>
  );
};
