'use client';

import { useState } from 'react';
import ProfileCard from '@/components/ProfileCard';
import SocialTabs from '@/components/SocialTabs';
import ContentArea from '@/components/ContentArea';

type Tab = 'all' | 'AI Prompts' | 'Templates' | 'projects';


export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  return (
    <div className="min-h-screen body-color py-8 px-4 sm:py-12">
      <div className="max-w-md mx-auto w-full">
        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
          {/* Profile Section */}
          <ProfileCard/>

          {/* Social-style Tabs */}
          <SocialTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Content Area */}
           <div className="flex-1 overflow-hidden">
            <ContentArea activeTab={activeTab} />
          </div>
        </div>

      </div>
    </div>
  );
}