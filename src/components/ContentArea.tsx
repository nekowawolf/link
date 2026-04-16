'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useLinkData } from '@/hooks/useLinkData';
import Image from "next/image";

type Tab = 'all' | 'AI Prompts' | 'Templates' | 'projects';

interface ContentAreaProps {
  activeTab: Tab;
  searchQuery: string;
}

function renderCaption(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
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
  const { posts, loading, error } = useLinkData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!posts.length) return [];
    
    let filtered = posts.filter((post) => {
      const matchesTab = activeTab === 'all' || post.category === activeTab;
      const matchesSearch = post.caption.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
    
    return filtered.reverse();
  }, [posts, activeTab, searchQuery]);

  if (loading) {
    return (
      <div className="h-[500px] overflow-y-auto">
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-gray-600" />
                <div className="flex-1">
                  <div className="h-4 w-32 bg-gray-600 rounded mb-2" />
                  <div className="h-3 w-24 bg-gray-600 rounded" />
                </div>
              </div>
              <div className="h-20 bg-gray-600 rounded mb-3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p>Failed to load posts</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

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
                key={post._id}
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

                      {post.is_verified && (
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
                  {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} •{' '}
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </article>
            ))}

            {filteredPosts.length === 0 ? (
              <div className="text-center py-10">
                <Image
                  src="https://nekowawolf.github.io/cdn-images/images/2026/1771661079_pixchan.png"
                  alt="No posts found"
                  width={176}
                  height={176}
                  className="mx-auto"
                />
                <p className="text-gray-500 mt-4">No posts found.</p>
              </div>
            ) : null}
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