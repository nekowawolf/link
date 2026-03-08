'use client';

import { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaGithub, FaXTwitter, FaTiktok, FaGlobe } from 'react-icons/fa6';
import { toggleDarkMode } from '@/utils/darkmode';

interface ProfileCardProps {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  coverUrl?: string;
  links?: {
    github?: string;
    twitter?: string;
    tiktok?: string;
    website?: string;
  };
}

export default function ProfileCard({
  name,
  username,
  bio,
  avatarUrl,
  coverUrl = 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop',
  links,
}: ProfileCardProps) {
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        
        {/* Dark Mode Toggle - Positioned on Cover */}
        <button
          aria-label="Toggle dark mode"
          onClick={onToggleTheme}
          className="absolute top-4 right-4 card-color w-10 h-10 text-fill-color rounded-full border border-color flex items-center justify-center text-lg hover:opacity-80 transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm"
        >
          <FaSun className={!isDarkMode ? '' : 'hidden'} />
          <FaMoon className={isDarkMode ? '' : 'hidden'} />
        </button>
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-6 relative">
        {/* Avatar  */}
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

        {/* Bio */}
        <p className="text-fill-color/80 text-base leading-relaxed mb-4">
          {bio}
        </p>

       {/* Social Links */}
        {links && (
          <div className="flex items-center gap-3 flex-wrap">
            
            {links.website && (
              <a
                href={links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="card-color w-10 h-10 rounded-full border border-color flex items-center justify-center text-fill-color/70 hover:text-fill-color hover:scale-110 transition-all duration-200"
              >
                <FaGlobe size={18} />
              </a>
            )}

            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="card-color w-10 h-10 rounded-full border border-color flex items-center justify-center text-fill-color/70 hover:text-fill-color hover:scale-110 transition-all duration-200"
              >
                <FaGithub size={18} />
              </a>
            )}

            {links.twitter && (
              <a
                href={links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="card-color w-10 h-10 rounded-full border border-color flex items-center justify-center text-fill-color/70 hover:text-fill-color hover:scale-110 transition-all duration-200"
              >
                <FaXTwitter size={18} />
              </a>
            )}

            {links.tiktok && (
              <a
                href={links.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="card-color w-10 h-10 rounded-full border border-color flex items-center justify-center text-fill-color/70 hover:text-fill-color hover:scale-110 transition-all duration-200"
              >
                <FaTiktok size={18} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}