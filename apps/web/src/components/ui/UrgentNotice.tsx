import React from 'react';

export default function UrgentNotice() {
  return (
    <section 
      aria-label="Urgent Notice" 
      className="w-full" 
      style={{ backgroundColor: 'rgb(255, 103, 31)', borderColor: 'rgb(229, 91, 26)', borderTopWidth: '1px', borderBottomWidth: '1px' }}
    >
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-sm flex flex-col sm:flex-row items-center justify-between gap-stack-sm">
        <div className="flex items-start sm:items-center gap-stack-sm">
          <div aria-hidden="true" className="flex-shrink-0 mt-1 sm:mt-0" style={{ color: 'rgb(255, 255, 255)' }}>
            <span className="material-symbols-outlined" data-icon="campaign" style={{ fontVariationSettings: '"FILL" 1' }}>campaign</span>
          </div>
          <p className="text-body-md font-body-md" style={{ color: 'rgb(255, 255, 255)' }}>
            <strong className="font-semibold mr-2">Notice:</strong> Applications for the Annual Cultural Grant are now open.
          </p>
        </div>
        <a 
          className="text-label-md font-label-md font-semibold underline underline-offset-4 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#d97706] rounded px-1" 
          href="#" 
          style={{ color: 'rgb(19, 136, 8)', backgroundColor: 'white', padding: '2px 8px', borderRadius: '4px' }}
        >
          Read More
        </a>
      </div>
    </section>
  );
}
