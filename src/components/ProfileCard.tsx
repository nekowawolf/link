'use client';

import { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaGithub, FaXTwitter, FaTiktok, FaGlobe } from 'react-icons/fa6';
import { IoIosSearch } from "react-icons/io";
import { toggleDarkMode } from '@/utils/darkmode';

export default function ProfileCard() {

  const name = "nekowawolf";
  const username = "nekowawolf";
  const bio = "Professional Coder (powered by AI)";
  const avatarUrl = "https://nekowawolf.github.io/cdn-images/images/2025/1763530019_113094795.jpeg";
  const coverUrl = "https://i.pinimg.com/736x/77/81/e2/7781e2e0d509a2ddbb0cb92282e61c38.jpg";

  const links = {
    github: 'https://github.com/nekowawolf',
    twitter: 'https://x.com/nekowawolf_',
    tiktok: 'https://tiktok.com/@nekowawolf',
    website: 'https://nekowawolf.xyz/',
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const current =
      typeof window !== 'undefined' &&
      localStorage.getItem('darkmode') === 'active';
    setIsDarkMode(current);
  }, []);

  const onToggleTheme = () => {
    toggleDarkMode();
    setIsDarkMode((v) => !v);
  };

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-32 sm:h-40 w-full overflow-hidden rounded-t-2xl relative">
        <img
          src={coverUrl}
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
        {links && (
          <div className="absolute bottom-2 right-4 z-10 flex items-center gap-2">
            {links.website && (
              <a
                href={links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/80 hover:text-white transition-opacity duration-200"
              >
                <FaGlobe className="text-sm sm:text-base" />
              </a>
            )}

            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/80 hover:text-white transition-opacity duration-200"
              >
                <FaGithub className="text-sm sm:text-base" />
              </a>
            )}

            {links.twitter && (
              <a
                href={links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/80 hover:text-white transition-opacity duration-200"
              >
                <FaXTwitter className="text-sm sm:text-base" />
              </a>
            )}

            {links.tiktok && (
              <a
                href={links.tiktok}
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
              src={avatarUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name & Username */}
        <div className="mb-3">
          <h1 className="text-2xl font-bold text-fill-color flex items-center gap-2">
            {name}
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
          <p className="text-fill-color/60 font-medium">@{username}</p>
        </div>

        {/* Bio & Search */}
        <div className="space-y-4">
          <p className="text-fill-color/80 text-base leading-relaxed">
            {bio}
          </p>
          
          {/* Search Bar */}
          <div className="relative">
            <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-fill-color/60" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--card-color2)] border border-[var(--border-color)] text-fill-color text-sm placeholder:text-fill-color/40 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}