'use client';

import { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaGithub, FaXTwitter, FaTiktok, FaGlobe, FaInstagram } from 'react-icons/fa6';
import { IoIosSearch } from "react-icons/io";
import { toggleDarkMode } from '@/utils/darkmode';
import { useLinkData } from '@/hooks/useLinkData';

interface ProfileCardProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const defaultProfile = {
  name: 'nekowawolf',
  username: 'nekowawolf',
  bio: 'Professional Coder (vibe coding)',
  avatar_url: 'https://nekowawolf.github.io/cdn-images/images/2025/1763530019_113094795.jpeg',
  cover_url: 'https://nekowawolf.github.io/cdn-images/images/2026/1775599464_bg_link.png',
  links: {
    github: 'https://github.com/nekowawolf',
    twitter: 'https://x.com/nekowawolf_',
    tiktok: 'https://tiktok.com/@nekowawolf',
    website: 'https://nekowawolf.xyz/',
    instagram: 'https://instagram.com/nekowawolf',
  },
};

export default function ProfileCard({
  searchQuery,
  onSearchChange,
}: ProfileCardProps) {
  const { profile, loading } = useLinkData();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const current = typeof window !== 'undefined' && localStorage.getItem('darkmode') === 'active';
    setIsDarkMode(current);
  }, []);

  const onToggleTheme = () => {
    toggleDarkMode();
    setIsDarkMode((v) => !v);
  };

  const data = profile || defaultProfile;

  if (loading) {
    return (
      <div className="relative">
        {/* Cover Image Skeleton */}
        <div className="h-32 sm:h-40 w-full rounded-t-2xl bg-gray-700 animate-pulse" />
        
        {/* Top Right - Dark Mode Toggle Skeleton */}
        <div className="absolute top-4 right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-600 animate-pulse" />
        
        {/* Bottom Right - Social Links Skeleton */}
        <div className="absolute bottom-72 right-4 z-10 flex items-center gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-600/50 animate-pulse" />
          ))}
        </div>

        {/* Profile Info Skeleton */}
        <div className="px-4 pb-6 relative">
          <div className="relative -mt-16 mb-4">
            <div className="w-32 h-32 rounded-full border-4 border-[var(--body-color)] bg-gray-600 animate-pulse" />
          </div>
          
          {/* Name Skeleton */}
          <div className="mb-3">
            <div className="h-8 w-48 bg-gray-600 rounded animate-pulse mb-2" />
            <div className="h-5 w-32 bg-gray-600/60 rounded animate-pulse" />
          </div>
          
          {/* Bio Skeleton */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-600 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-600 rounded animate-pulse" />
            </div>
            
            {/* Search Bar Skeleton */}
            <div className="h-11 w-full bg-gray-600 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-32 sm:h-40 w-full overflow-hidden rounded-t-2xl relative">
        <img
          src={data.cover_url}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
        
        {/* Top Right - Dark Mode Toggle */}
        <button
          aria-label="Toggle dark mode"
          onClick={onToggleTheme}
          className="absolute top-4 right-4 card-color w-8 h-8 sm:w-9 sm:h-9 text-fill-color rounded-full border border-color flex items-center justify-center text-lg hover:opacity-80 transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm"
        >
          <FaSun className={!isDarkMode ? '' : 'hidden'} />
          <FaMoon className={isDarkMode ? '' : 'hidden'} />
        </button>

        {/* Bottom Right - Social Links */}
        {data.links && (
          <div className="absolute bottom-2 right-4 z-10 flex items-center gap-2">
            {data.links.website && (
              <a
                href={data.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/80 hover:text-white transition-opacity duration-200"
              >
                <FaGlobe className="text-sm sm:text-base" />
              </a>
            )}

            {data.links.github && (
              <a
                href={data.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/80 hover:text-white transition-opacity duration-200"
              >
                <FaGithub className="text-sm sm:text-base" />
              </a>
            )}

            {data.links.twitter && (
              <a
                href={data.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/80 hover:text-white transition-opacity duration-200"
              >
                <FaXTwitter className="text-sm sm:text-base" />
              </a>
            )}

            {data.links.instagram && (
              <a
                href={data.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/80 hover:text-white transition-opacity duration-200"
              >
                <FaInstagram className="text-sm sm:text-base" />
              </a>
            )}

            {data.links.tiktok && (
              <a
                href={data.links.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/80 hover:text-white transition-opacity duration-200"
              >
                <FaTiktok className="text-sm sm:text-base" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-6 relative">
        {/* Avatar */}
        <div className="relative -mt-16 mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-[var(--body-color)] overflow-hidden card-color shadow-xl">
            <img
              src={data.avatar_url}
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name & Username */}
        <div className="mb-3">
          <h1 className="text-2xl font-bold text-fill-color flex items-center gap-2">
            {data.name}
            <svg 
              className="w-5 h-5 text-blue-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
          </h1>
          <p className="text-fill-color/60 font-medium">@{data.username}</p>
        </div>

        {/* Bio & Search */}
        <div className="space-y-4">
          <p className="text-fill-color/80 text-base leading-relaxed">
            {data.bio}
          </p>
          
          {/* Search Bar */}
          <div className="relative">
            <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-fill-color/60" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--card-color2)] border border-[var(--border-color)] text-fill-color text-sm placeholder:text-fill-color/40 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}