'use client';

import { useState } from 'react';
import ProfileCard from '@/components/ProfileCard';
import SocialTabs from '@/components/SocialTabs';
import ContentArea from '@/components/ContentArea';

type Tab = 'all' | 'projects' | 'designs';


export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  return (
    <div className="min-h-screen body-color py-8 px-4 sm:py-12">
      <div className="max-w-md mx-auto w-full">
        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
          {/* Profile Section */}
          <ProfileCard
            name="nekowawolf"
            username="nekowawolf"
            bio="Fullstack developer building scalable web apps, backend services, and UI systems with modern, production ready standards."
            avatarUrl="https://nekowawolf.github.io/cdn-images/images/2025/1763530019_113094795.jpeg"
            coverUrl="https://i.pinimg.com/736x/77/81/e2/7781e2e0d509a2ddbb0cb92282e61c38.jpg"
            links={{
              github: 'https://github.com',
              twitter: 'https://twitter.com',
              linkedin: 'https://linkedin.com',
              website: 'https://hensor.net',
            }}
          />

          {/* Social-style Tabs */}
          <SocialTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Content Area */}
          <ContentArea activeTab={activeTab} />
        </div>

      </div>
    </div>
  );
}