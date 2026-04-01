'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type Tab = 'all' | 'AI Prompts' | 'Templates' | 'projects';

interface ContentAreaProps {
  activeTab: Tab;
  searchQuery: string;
}

interface TweetPost {
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  caption: string;
  url?: string;
  time: string;
  date: string;
  views: string;
  category: Tab | 'all';
}

const posts: TweetPost[] = [
  {
    id: 5,
    name: 'nekowawolf',
    username: 'nekowawolf',
    isVerified: true,
    caption:
      'Ethereal Gate asset game pack \n\nLink: https://lynk.id/nekowawolf/q4w3d0k30y5w',
    url: 'https://nekowawolf.github.io/cdn-images/images/2026/1775047721_pixel.png',
    time: '7:00 PM',
    date: '01/04/2026',
    views: '6.3K',
    category: 'Templates',
  },
  {
    id: 4,
    name: 'nekowawolf',
    username: 'nekowawolf',
    isVerified: true,
    caption:
      'Ethereal Gate \n\nLink: https://www.greenfoot.org/scenarios/36166',
    url: 'https://nekowawolf.github.io/cdn-images/images/2026/1773590789_Screenshot%202026-03-15%20231137.png',
    time: '10:00 PM',
    date: '15/03/2026',
    views: '3.1K',
    category: 'projects',
  },
  {
    id: 3,
    name: 'nekowawolf',
    username: 'nekowawolf',
    isVerified: true,
    caption:
      '3D Model Mouse Interaction Tutorial \n\nLink: https://lynk.id/nekowawolf/l9w9391l0kk2',
    url: 'https://nekowawolf.github.io/cdn-images/images/2026/1773012524_3d.png',
    time: '8:30 PM',
    date: '08/03/2026',
    views: '12.5K',
    category: 'AI Prompts',
  },
  {
    id: 2,
    name: 'nekowawolf',
    username: 'nekowawolf',
    isVerified: true,
    caption:
      'web ini sepenuhnya belum selesai, selesai gk selesai yang penting production',
    url: 'https://i.pinimg.com/736x/ea/31/70/ea3170757b604c874728307393950f0f.jpg',
    time: '6:10 PM',
    date: '07/03/2026',
    views: '8.2K',
    category: 'Templates',
  },
  {
    id: 1,
    name: 'nekowawolf',
    username: 'nekowawolf',
    isVerified: true,
    caption: 'test url video',
    url: 'https://www.youtube.com/watch?v=sAuEeM_6zpk',
    time: '7:10 PM',
    date: '02/02/2026',
    views: '2.2K',
    category: 'projects',
  },
];

function renderCaption(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

function getYouTubeEmbed(url: string) {
  const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function isImage(url: string) {
  return /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
}

export default function ContentArea({ activeTab, searchQuery }: ContentAreaProps) {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {

    const matchesTab =
      activeTab === 'all' ||
      post.category === activeTab ||
      post.category === 'all';

    const matchesSearch =
      post.caption.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <>
      <div className="h-[500px] overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="divide-y divide-[var(--border-divider)]"
          >
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="p-4 hover:bg-[var(--card-color2)] transition-colors duration-200 cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-[var(--border-color)]">
                      <img
                        src="https://nekowawolf.github.io/cdn-images/images/2025/1763530019_113094795.jpeg"
                        alt={post.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-fill-color text-[15px] hover:underline leading-tight">
                        {post.name}
                      </span>

                      {post.isVerified && (
                        <svg
                          className="w-4 h-4 text-blue-500 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>

                    <span className="text-gray-400 text-[14px] leading-tight">
                      @{post.username}
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="mb-3">
                  <p className="text-fill-color text-[15px] leading-normal whitespace-pre-wrap">
                    {renderCaption(post.caption)}
                  </p>
                </div>

                {/* Media */}
                {post.url && (
                  <div className="mb-3">
                    <div className="rounded-2xl overflow-hidden border border-[var(--border-color)]">

                      {getYouTubeEmbed(post.url) ? (
                        <iframe
                          src={getYouTubeEmbed(post.url)!}
                          className="w-full h-80"
                          allowFullScreen
                        />
                      ) : isImage(post.url) ? (

                        <img
                          src={post.url}
                          alt="Post content"
                          onClick={() => setSelectedImage(post.url!)}
                          className="w-full h-auto max-h-80 object-cover cursor-zoom-in"
                        />

                      ) : null}

                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="text-gray-500 text-[13px]">
                  {post.time} • {post.date} • {post.views} views
                </div>
              </article>
            ))}

            {filteredPosts.length === 0 && (
              <div className="p-6 text-center text-fill-color/50">
                No posts found
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* IMAGE MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              className="max-w-full max-h-full rounded-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}