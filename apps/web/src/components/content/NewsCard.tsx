import React from 'react';

interface NewsCardProps {
  date: string;
  title: string;
  summary: string;
  imageSrc?: string;
  imageAlt?: string;
  isPlaceholder?: boolean;
  href?: string;
}

export default function NewsCard({
  date,
  title,
  summary,
  imageSrc,
  imageAlt,
  isPlaceholder = false,
  href = '#',
}: NewsCardProps) {
  return (
    <article className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-primary flex flex-col h-full group">
      <div className={`relative w-full h-48 overflow-hidden bg-surface-variant ${isPlaceholder ? 'flex items-center justify-center p-stack-lg' : ''}`}>
        {isPlaceholder ? (
          <div className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center text-white">
            <span aria-hidden="true" className="material-symbols-outlined text-4xl" data-icon="description">
              description
            </span>
          </div>
        ) : (
          <img
            alt={imageAlt || title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={imageSrc}
          />
        )}
      </div>
      <div className="p-stack-md flex flex-col flex-grow">
        <time className="text-caption font-caption text-on-surface-variant mb-stack-sm flex items-center gap-1" suppressHydrationWarning>
          <span aria-hidden="true" className="material-symbols-outlined text-[16px]" data-icon="calendar_today">
            calendar_today
          </span>{' '}
          {date}
        </time>
        <h3 className="text-headline-md font-serif font-medium text-on-surface mb-stack-sm line-clamp-2">
          <a className="focus:outline-none hover:text-[#df5f18] transition-colors" href={href}>
            {title}
          </a>
        </h3>
        <p className="text-body-md font-body-md text-on-surface-variant mb-stack-lg line-clamp-2 flex-grow">
          {summary}
        </p>
        <div className="mt-auto pt-stack-sm border-t border-surface-variant">
          <a
            className="inline-flex items-center text-primary font-label-md text-label-md font-semibold hover:text-surface-tint focus:outline-none group/link"
            href={href}
          >
            Read Article{' '}
            <span
              aria-hidden="true"
              className="material-symbols-outlined ml-1 text-[18px] group-hover/link:translate-x-1 transition-transform text-[#df5f18]"
              data-icon="arrow_forward"
            >
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
