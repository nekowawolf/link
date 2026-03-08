'use client';

import { motion, AnimatePresence } from 'framer-motion';
import LinkCard from './LinkCard';
import { FaGithub, FaFigma, FaDribbble, FaMedium, FaYoutube } from 'react-icons/fa6';

type Tab = 'all' | 'projects' | 'designs';

interface ContentAreaProps {
  activeTab: Tab;
}

const allLinks = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'My personal portfolio built with Next.js and Tailwind CSS',
    url: 'https://example.com',
    icon: <FaGithub />,
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    category: 'projects',
  },
  {
    id: 2,
    title: 'Design System',
    description: 'A comprehensive design system for modern web applications',
    url: 'https://figma.com',
    icon: <FaFigma />,
    tags: ['Figma', 'UI/UX', 'Design System'],
    category: 'designs',
  },
  {
    id: 3,
    title: 'Open Source Project',
    description: 'Contributing to the React ecosystem',
    url: 'https://github.com',
    icon: <FaGithub />,
    tags: ['React', 'Open Source'],
    category: 'projects',
  },
  {
    id: 4,
    title: 'Dribbble Shots',
    description: 'Latest UI designs and explorations',
    url: 'https://dribbble.com',
    icon: <FaDribbble />,
    tags: ['UI Design', 'Inspiration'],
    category: 'designs',
  },
  {
    id: 5,
    title: 'Technical Blog',
    description: 'Articles about web development and design',
    url: 'https://medium.com',
    icon: <FaMedium />,
    tags: ['Writing', 'Tutorial'],
    category: 'all',
  },
  {
    id: 6,
    title: 'YouTube Channel',
    description: 'Tutorials and behind the scenes content',
    url: 'https://youtube.com',
    icon: <FaYoutube />,
    tags: ['Video', 'Education'],
    category: 'all',
  },
];

export default function ContentArea({ activeTab }: ContentAreaProps) {
  const filteredLinks = allLinks.filter(
    (link) => activeTab === 'all' || link.category === activeTab || link.category === 'all'
  );

  return (
    <div className="p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          {filteredLinks.map((link) => (
            <LinkCard
              key={link.id}
              title={link.title}
              description={link.description}
              url={link.url}
              icon={link.icon}
              tags={link.tags}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}