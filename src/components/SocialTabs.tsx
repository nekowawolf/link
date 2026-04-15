'use client';

import { useLinkData } from '@/hooks/useLinkData';

type Tab = 'all' | 'AI Prompts' | 'Templates' | 'projects';

interface SocialTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function SocialTabs({ activeTab, onTabChange }: SocialTabsProps) {
  const { posts } = useLinkData();

  const getTabCount = (tabId: Tab): number => {
    if (tabId === 'all') return posts.length;
    return posts.filter(post => post.category === tabId).length;
  };

  const tabs = [
    { id: 'all' as Tab, label: 'All Posts' },
    { id: 'AI Prompts' as Tab, label: 'AI Prompts' },
    { id: 'Templates' as Tab, label: 'Templates' },
    { id: 'projects' as Tab, label: 'Projects' },
  ];

  return (
    <div className="border-divider-b">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const count = getTabCount(tab.id);
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative py-4 px-4 text-sm font-medium transition-all duration-200 whitespace-nowrap
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
                  {count}
                </span>
              </span>

              {activeTab === tab.id && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-blue-500 rounded-full w-[calc(100%-2rem)] max-w-[calc(100%-1rem)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}