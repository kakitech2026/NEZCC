import React from 'react';

interface EventCardProps {
  month: string;
  day: string;
  title: string;
  location: string;
  time: string;
  imageUrl?: string;
  href?: string;
}

export default function EventCard({ month, day, title, location, time, imageUrl, href = "#" }: EventCardProps) {
  return (
    <a href={href} className="bg-white border border-outline-variant/50 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative group h-full">
      {imageUrl && (
        <div className="w-full aspect-[4/3] overflow-hidden mb-3 relative">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-primary font-semibold text-[10px] uppercase px-2 py-1 rounded shadow-sm border border-white/20">
            {month} {day}
          </div>
        </div>
      )}
      <div className={`flex flex-col items-start flex-1 w-full text-left ${imageUrl ? 'p-4 pt-2' : 'p-6'}`}>
        {!imageUrl && (
          <div className="mb-4 text-primary transition-transform group-hover:scale-110 duration-300">
            <span className="material-symbols-outlined text-4xl" style={{ color: '#df5f18' }}>event</span>
          </div>
        )}
        {!imageUrl && (
          <div className="flex items-center gap-1 mb-2 font-label-md text-primary" style={{ color: '#1898df' }}>
            <span className="uppercase text-xs font-semibold bg-primary/10 px-2 py-0.5 rounded">{month} {day}</span>
          </div>
        )}
        <h3 className="text-[15px] font-medium text-on-surface leading-[1.3] group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <div className="text-caption text-on-surface-variant mt-auto pt-3 flex flex-col gap-1 w-full">
          <p className="flex items-center gap-1 w-full">
            <span className="material-symbols-outlined text-[14px] shrink-0">location_on</span>
            <span className="truncate">{location.split(',')[0]}</span>
          </p>
          <p className="flex items-center gap-1 w-full text-[11px] opacity-80">
             <span className="material-symbols-outlined text-[13px] shrink-0">schedule</span>
             <span className="truncate">{time}</span>
          </p>
        </div>
      </div>
    </a>
  );
}
