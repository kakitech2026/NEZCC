import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Calendar of Events - NEZCC',
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
};

export default async function EventsPage() {
  const payload = await getPayload({ config: configPromise });
  
  // Fetch all events, sorted by startDate descending
  const eventsResult = await payload.find({
    collection: 'events',
    sort: '-startDate',
    limit: 50, // Arbitrary high limit for now
  });
  const events = eventsResult.docs;

  // Fetch Events Page Global config
  const eventsPageConfig = await payload.findGlobal({
    slug: 'events-page',
  });
  const pageTitle = eventsPageConfig.pageTitle || 'Calendar Of Events';
  const banners = eventsPageConfig.banners || [];

  return (
    <main className="flex-grow bg-white min-h-screen pb-20 pt-8 md:pt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <h1 className="font-serif text-3xl md:text-5xl text-[#16253a] mb-8 font-semibold">
          {pageTitle === 'Calendar Of Events' ? (
            <>Calendar Of <span className="text-[#df5f18]">Events</span></>
          ) : (
            pageTitle
          )}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search/Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-0 border border-outline-variant rounded shadow-sm overflow-hidden mb-8">
              <select className="bg-[#f3f4f6] text-[#16253a] px-4 py-3 border-b sm:border-b-0 sm:border-r border-outline-variant outline-none font-sans min-w-[120px] focus:bg-white transition-colors cursor-pointer appearance-none">
                <option value="archive">Archive</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <input 
                type="text" 
                placeholder="dd/mm/yyyy" 
                className="flex-grow px-4 py-3 outline-none font-sans text-[#16253a] focus:bg-gray-50 transition-colors" 
              />
              <button className="bg-[#1898df] hover:bg-[#1482be] text-white px-8 py-3 font-sans font-bold tracking-wider uppercase transition-colors">
                Search
              </button>
            </div>

            {/* Event List */}
            <div className="space-y-6">
              {events.map((event) => {
                const imageUrl = (event.featuredImage as any)?.url || "/images/art_heritage.webp";
                return (
                  <div key={event.id} className="flex flex-col sm:flex-row bg-white border border-outline-variant shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                    {/* Image */}
                    <div className="w-full sm:w-[240px] aspect-video sm:aspect-auto sm:min-h-[160px] relative shrink-0">
                      <img src={imageUrl} alt={event.title as string} className="w-full h-full object-cover object-center absolute inset-0" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow min-w-0">
                      <p className="font-sans text-sm font-bold text-[#16253a] mb-3">{formatDate(event.startDate as string)}</p>
                      
                      <div className="flex items-start gap-2 mb-4">
                        <span className="material-symbols-outlined text-sm text-[#16253a] shrink-0 mt-0.5">person</span>
                        <h3 className="font-sans text-sm font-medium text-[#16253a] leading-snug min-w-0 break-words">
                          <Link href={`/events/${event.id}`} className="hover:text-[#df5f18] transition-colors">
                            {event.title}
                          </Link>
                          {event.location && <span className="font-normal text-on-surface-variant block mt-1 break-words">@ {event.location}</span>}
                        </h3>
                      </div>
                      
                      <div className="mt-auto text-right">
                        <Link href={`/events/${event.id}`} className="inline-flex items-center gap-1 font-sans font-semibold text-[#8dc63f] hover:text-[#76a831] transition-colors text-sm">
                          View Details <span className="text-[12px] font-bold">&gt;&gt;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {events.length === 0 && (
                <div className="p-12 text-center border border-outline-variant bg-gray-50">
                  <p className="text-on-surface-variant font-sans">No events found.</p>
                </div>
              )}
            </div>
            
          </div>
          
          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {banners.length > 0 ? (
              banners.map((banner: any, index: number) => {
                const imageUrl = (banner.image as any)?.url || '';
                
                // If it's a link, we use an <a> tag, otherwise a div
                const isLink = !!banner.link;
                const innerContent = (
                  <div className="bg-white rounded shadow-sm border border-outline-variant overflow-hidden relative aspect-[2.5/1]">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={banner.title || ''} 
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center p-6 bg-gray-100">
                         <h3 className="font-sans font-bold text-xl text-center text-[#16253a]">{banner.title}</h3>
                      </div>
                    )}
                  </div>
                );

                if (isLink) {
                  return (
                    <a key={index} href={banner.link} className="block group">
                      {innerContent}
                    </a>
                  );
                }
                
                return (
                  <div key={index} className="block group cursor-default">
                    {innerContent}
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center border border-dashed border-outline-variant rounded-lg bg-gray-50">
                <p className="text-on-surface-variant font-sans text-sm">Add sidebar banners from the admin panel.</p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </main>
  );
}
