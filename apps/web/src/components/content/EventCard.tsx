import React from 'react';

interface EventCardProps {
  month: string;
  day: string;
  title: string;
  location: string;
  time: string;
}

export default function EventCard({ month, day, title, location, time }: EventCardProps) {
  return (
    <a href="#" className="bg-white border border-outline-variant/50 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative group">
      <div className="mb-4 text-primary transition-transform group-hover:scale-110 duration-300">
        <span className="material-symbols-outlined text-4xl" style={{ color: 'rgb(220, 38, 38)' }}>event</span>
      </div>
      <div className="flex items-center gap-1 mb-2 font-label-md text-primary" style={{ color: 'rgb(0, 0, 128)' }}>
        <span className="uppercase text-xs font-bold bg-primary/10 px-2 py-0.5 rounded">{month} {day}</span>
      </div>
      <h3 className="text-body-md font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-caption text-on-surface-variant mt-2 flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px]">location_on</span>
        <span className="truncate w-full max-w-[120px]">{location.split(',')[0]}</span>
      </p>
    </a>
  );
}
