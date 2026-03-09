'use client';

import { useState } from 'react';

type Tab = 'all' | 'projects' | 'designs';

interface SocialTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs = [
  { id: 'all' as Tab, label: 'All Posts', count: 3 },
  { id: 'projects' as Tab, label: 'Projects', count: 2 },
  { id: 'designs' as Tab, label: 'Designs', count: 1 },
];

export default function SocialTabs({ activeTab, onTabChange }: SocialTabsProps) {
  return (
    <div className="border-divider-b">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative flex-1 py-4 px-4 text-sm font-medium transition-all duration-200
              ${activeTab === tab.id 
                ? 'text-fill-color' 
                : 'text-fill-color/60 hover:text-fill-color/80 hover:bg-[var(--card-color2)]'
              }
            `}
          >
            <span className="flex items-center justify-center gap-2">
              {tab.label}
              <span className={`
                text-xs px-2 py-0.5 rounded-full
                ${activeTab === tab.id 
                  ? 'bg-[var(--stack-chip-bg)] text-[var(--stack-chip-text)]' 
                  : 'bg-[var(--card-color2)] text-fill-color/50'
                }
              `}>
                {tab.count}
              </span>
            </span>
            
            {/* Active Indicator */}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full animate-in slide-in-from-left duration-200" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}