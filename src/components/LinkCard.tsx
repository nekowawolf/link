'use client';

import { ReactNode } from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

interface LinkCardProps {
  title: string;
  description?: string;
  url: string;
  icon?: ReactNode;
  imageUrl?: string;
  tags?: string[];
}

export default function LinkCard({
  title,
  description,
  url,
  icon,
  imageUrl,
  tags,
}: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block glass-card rounded-xl p-4 card-hover"
    >
      <div className="flex items-start gap-4">
        {/* Icon or Image */}
        <div className="flex-shrink-0">
          {imageUrl ? (
            <div className="w-14 h-14 rounded-lg overflow-hidden border border-color">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-lg card-color border border-color flex items-center justify-center text-fill-color text-2xl">
              {icon || <FaArrowUpRightFromSquare />}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-fill-color text-base group-hover:text-blue-400 transition-colors line-clamp-1">
              {title}
            </h3>
            <FaArrowUpRightFromSquare 
              className="text-fill-color/40 group-hover:text-fill-color/80 transition-all duration-200 flex-shrink-0 mt-1" 
              size={14}
            />
          </div>
          
          {description && (
            <p className="text-fill-color/60 text-sm mt-1 line-clamp-2">
              {description}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-[var(--stack-chip-bg)] text-[var(--stack-chip-text)] border border-[var(--stack-chip-border)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}