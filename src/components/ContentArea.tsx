'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { IoCheckmarkCircle } from "react-icons/io5";

type Tab = 'all' | 'projects' | 'designs';

interface ContentAreaProps {
  activeTab: Tab;
}

interface TweetPost {
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  caption: string;
  imageUrl?: string;
  time: string;
  date: string;
  views: string;
  category: Tab | 'all';
}

const posts: TweetPost[] = [
  {
    id: 1,
    name: 'nekowawolf',
    username: 'nekowawolf',
    isVerified: true,
    caption: '3D Model Mouse Interaction Tutorial \n\nLink: https://lynk.id/nekowawolf/l9w9391l0kk2',
    imageUrl: 'https://nekowawolf.github.io/cdn-images/images/2026/1773012524_3d.png',
    time: '8:30 PM',
    date: '08/03/2026',
    views: '12.5K',
    category: 'projects',
  },
  {
    id: 2,
    name: 'nekowawolf',
    username: 'nekowawolf',
    isVerified: true,
    caption: 'web ini sepenuhnya belum selesai, selesai gk selesai yang penting production',
    imageUrl: 'https://i.pinimg.com/736x/ea/31/70/ea3170757b604c874728307393950f0f.jpg',
    time: '6:10 PM',
    date: '07/03/2026',
    views: '8.2K',
    category: 'designs',
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

export default function ContentArea({ activeTab }: ContentAreaProps) {
  const filteredPosts = posts.filter(
    (post) => activeTab === 'all' || post.category === activeTab || post.category === 'all'
  );

  return (
    <div className="h-[500px] overflow-y-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
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
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-[var(--border-color)]">
                    <img
                      src="https://nekowawolf.github.io/cdn-images/images/2025/1763530019_113094795.jpeg"
                      alt={post.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name + Username */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-fill-color text-[15px] hover:underline leading-tight">
                      {post.name}
                    </span>

                    {post.isVerified && (
                      <IoCheckmarkCircle className="text-blue-500 w-4 h-4 flex-shrink-0" />
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

              {/* Image */}
              {post.imageUrl && (
                <div className="mb-3">
                  <div className="rounded-2xl overflow-hidden border border-[var(--border-color)]">
                    <img
                      src={post.imageUrl}
                      alt="Post content"
                      className="w-full h-auto max-h-80 object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="text-gray-500 text-[13px]">
                {post.time} • {post.date} • {post.views} views
              </div>
            </article>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}