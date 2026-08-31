import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { RichText } from '@payloadcms/richtext-lexical/react';

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const payload = await getPayload({ config: configPromise });

  let event;
  try {
    event = await payload.findByID({
      collection: 'events',
      id,
    });
  } catch (error) {
    return notFound();
  }

  if (!event) {
    return notFound();
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const imageUrl = (event.featuredImage as any)?.url;
  const hasTicketing = !!event.ticketing?.ticketPrice;
  const hasActions = !!event.eventActions?.calendarLink || !!event.eventActions?.shareLink || !!event.eventActions?.customLink || !!event.eventActions?.contactEmail;
  const hasSidebar = hasTicketing || hasActions;

  return (
    <main className="flex-grow bg-white min-h-screen flex flex-col">
      {/* Event Hero */}
      {imageUrl && (
        <section className="w-full bg-[#16253a]">
          <img src={imageUrl} alt={event.title as string} className="w-full max-h-[50vh] md:max-h-[70vh] object-cover object-center" />
        </section>
      )}

      <section className="bg-white pb-20 pt-8 md:pt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Column */}
          <div className={`space-y-12 ${hasSidebar ? 'md:col-span-8' : 'md:col-span-12 max-w-4xl mx-auto w-full'}`}>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant">
              {/* Title and Metadata */}
              <div className="mb-8">
                <p className="font-sans text-xs md:text-sm text-[#df5f18] font-bold mb-2 tracking-widest uppercase">
                  {formatDate(event.startDate)}
                </p>
                <h1 className="font-serif text-3xl md:text-5xl text-[#16253a] mb-6 font-semibold">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-[#e8ebf2] rounded-full px-4 py-1.5 flex items-center gap-2 text-[#16253a] text-sm font-medium">
                    <span className="material-symbols-outlined text-sm text-[#df5f18]">location_on</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="bg-[#e8ebf2] rounded-full px-4 py-1.5 flex items-center gap-2 text-[#16253a] text-sm font-medium">
                    <span className="material-symbols-outlined text-sm text-[#df5f18]">schedule</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
              
              <h2 className="font-serif text-2xl text-[#16253a] mb-6 font-semibold border-t border-outline-variant pt-8">About the Event</h2>
              <div className="prose prose-lg max-w-none text-on-surface-variant font-sans [&>p]:mb-4 [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:font-medium [&>h2]:mb-4 [&>h2]:mt-8 [&>h3]:text-xl [&>h3]:font-serif [&>h3]:mb-4 [&>h3]:mt-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>a]:text-[#df5f18] [&>a]:underline">
                {event.content ? (
                  <RichText data={event.content as any} />
                ) : (
                  <p>More details about this event will be announced soon.</p>
                )}
              </div>
            </div>

            {event.highlights && event.highlights.length > 0 && (
              <div className="mt-12">
                <h2 className="font-serif text-3xl text-[#16253a] mb-6 font-semibold">Event Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {event.highlights.map((highlight: any, i: number) => (
                    <div key={i} className="bg-white p-6 rounded-xl text-center border border-outline-variant hover:border-[#df5f18] transition-colors duration-300 shadow-sm">
                      <span className="material-symbols-outlined text-4xl text-[#df5f18] mb-4 block">{highlight.icon}</span>
                      <h3 className="font-sans text-lg font-semibold text-[#16253a] mb-2">{highlight.title}</h3>
                      <p className="text-on-surface-variant text-sm">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.venueMapLink && (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant mt-12">
                <h2 className="font-serif text-3xl text-[#16253a] mb-6 font-semibold">Venue & Directions</h2>
                {event.venueMapLink.includes('<iframe') ? (
                  <div className="aspect-video w-full rounded-lg overflow-hidden border border-outline-variant [&>iframe]:w-full [&>iframe]:h-full" dangerouslySetInnerHTML={{ __html: event.venueMapLink }} />
                ) : event.venueMapLink.includes('/embed') ? (
                  <div className="aspect-video w-full rounded-lg overflow-hidden border border-outline-variant">
                    <iframe src={event.venueMapLink} className="w-full h-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>
                ) : (
                  <div className="aspect-video bg-[#e8ebf2] rounded-lg overflow-hidden flex items-center justify-center border border-outline-variant relative">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero/hero-pattern.png')", opacity: 0.1 }}></div>
                    <a href={event.venueMapLink} target="_blank" rel="noopener noreferrer" className="relative z-10 bg-white/90 backdrop-blur p-6 rounded-xl shadow text-center border border-outline-variant hover:bg-white transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[#16253a] text-4xl mb-2">map</span>
                      <p className="font-sans font-semibold text-[#16253a] uppercase tracking-wider text-sm">View on Map</p>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar (4 cols) */}
          {hasSidebar && (
            <div className="md:col-span-4">
              <div className="sticky top-28 bg-white p-6 rounded-xl shadow-md border border-outline-variant">
                
                {hasTicketing && (
                  <div className="text-center mb-6">
                    <p className="font-sans text-xs text-on-surface-variant mb-2 font-bold tracking-widest uppercase">Tickets</p>
                    <p className="font-sans text-3xl font-bold text-[#16253a]">{event.ticketing?.ticketPrice}</p>
                    {event.ticketing?.registrationRequired && (
                      <p className="text-sm text-on-surface-variant mt-2">Registration Required</p>
                    )}
                  </div>
                )}
                {event.ticketing?.registrationLink && (
                  <div className="mb-6">
                    <a href={event.ticketing.registrationLink} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#df5f18] text-white text-center font-sans font-bold text-sm tracking-wider uppercase py-4 rounded-xl hover:bg-[#c04b0e] transition-colors shadow-sm">
                      Register Now
                    </a>
                  </div>
                )}
                
                {hasActions && (
                  <div className={`space-y-4 ${hasTicketing ? 'pt-6 border-t border-outline-variant' : ''}`}>
                    {event.eventActions?.calendarLink && (
                      <a href={event.eventActions.calendarLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-[#e8ebf2] text-[#16253a] font-sans font-semibold text-sm py-3 rounded-xl hover:bg-[#d0d4e0] transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                        Add to Calendar
                      </a>
                    )}
                    
                    {(event.eventActions?.shareLink || event.eventActions?.customLink || event.eventActions?.contactEmail) && (
                      <div className="flex justify-center gap-3">
                        {event.eventActions?.shareLink && (
                          <a href={event.eventActions.shareLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#e8ebf2] flex items-center justify-center text-[#16253a] hover:bg-[#df5f18] hover:text-white transition-colors shadow-sm" aria-label="Share">
                            <span className="material-symbols-outlined text-[18px]">share</span>
                          </a>
                        )}
                        {event.eventActions?.customLink && (
                          <a href={event.eventActions.customLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#e8ebf2] flex items-center justify-center text-[#16253a] hover:bg-[#df5f18] hover:text-white transition-colors shadow-sm" aria-label="Copy Link">
                            <span className="material-symbols-outlined text-[18px]">link</span>
                          </a>
                        )}
                        {event.eventActions?.contactEmail && (
                          <a href={`mailto:${event.eventActions.contactEmail}`} className="w-10 h-10 rounded-full bg-[#e8ebf2] flex items-center justify-center text-[#16253a] hover:bg-[#df5f18] hover:text-white transition-colors shadow-sm" aria-label="Email">
                            <span className="material-symbols-outlined text-[18px]">mail</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Sponsors Section */}
      {event.sponsors && event.sponsors.length > 0 && (
        <section className="bg-gray-50 py-16 border-t border-outline-variant">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <p className="font-sans text-xs text-on-surface-variant mb-8 font-bold tracking-widest uppercase">Supported By</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-80 hover:opacity-100 transition-all duration-500">
              {event.sponsors.map((sponsor: any, i: number) => (
                <div key={i} className="flex flex-col items-center gap-2 relative group cursor-default">
                  {sponsor.logo ? (
                    <>
                      <img src={sponsor.logo.url} alt={sponsor.name} className="h-16 w-auto object-contain" />
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#16253a] text-white text-xs px-3 py-1.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                        {sponsor.name}
                      </div>
                    </>
                  ) : (
                    <div className="h-16 px-6 bg-black/5 rounded-lg flex items-center justify-center text-sm font-semibold text-black/60 border border-black/10">
                      {sponsor.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
