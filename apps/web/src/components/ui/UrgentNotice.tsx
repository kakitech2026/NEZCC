import React from 'react';

export default function UrgentNotice() {
  return (
    <section aria-label="Urgent Notice" className="w-full relative z-20 bg-[#df5f18]">
      <div className="max-w-container-max-width mx-auto px-4 md:px-8 py-2 md:py-2.5 flex flex-row items-center justify-between gap-3">
        <div className="flex flex-row items-start sm:items-center gap-2 md:gap-3 text-left w-full">
          <div aria-hidden="true" className="flex-shrink-0 text-white flex items-center justify-center mt-0.5 sm:mt-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[22px]" style={{ fontVariationSettings: '"FILL" 1' }}>campaign</span>
          </div>
          <p className="text-white text-[12px] sm:text-[14px] md:text-[15px] flex-1 font-medium m-0 leading-snug">
            <strong className="font-bold text-white">Notice:</strong>
            <span className="ml-1">Applications for the Annual Cultural Grant are now open.</span>
          </p>
        </div>
        <a 
          className="flex-shrink-0 inline-flex items-center justify-center bg-white hover:bg-gray-50 text-[#16a34a] text-[11px] sm:text-[13px] md:text-[14px] font-bold rounded px-3 py-1.5 shadow-sm transition-colors"
          href="#" 
        >
          <span className="underline decoration-2 underline-offset-[2px] md:underline-offset-[3px]">Read More</span>
        </a>
      </div>
    </section>
  );
}
