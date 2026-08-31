import React from 'react';
import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';

export const dynamic = 'force-dynamic';

export default async function ActivitiesHighlightsPage() {
  const payload = await getPayloadClient();
  const activitiesResult = await payload.find({
    collection: 'activities',
    sort: '-createdAt',
    limit: 20,
  });

  const activities = activitiesResult.docs;
  // Fall back to first activity if no featured field exists
  const featuredActivity = activities[0];
  const recentActivities = activities.filter(a => a.id !== featuredActivity?.id).slice(0, 3);

  return (
    <main className="w-full ">
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-16 md:pt-24 pb-stack-lg">
        <div className="max-w-3xl">
          <h1 className="font-serif font-medium md:font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-surface mb-stack-md">Highlights of the Activities</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Discover the diverse cultural initiatives, vibrant festivals, and skill-building workshops organized by NEZCC to preserve, promote, and propagate the rich cultural heritage of North East India.
          </p>
        </div>
      </section>

      {/* Featured Activity Hero */}
      {featuredActivity && (
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg">
        <div className="relative rounded-xl overflow-hidden bg-surface-container shadow-sm border border-outline-variant flex flex-col md:flex-row min-h-[400px]">
          <div className="md:w-2/3 relative h-64 md:h-auto">
            <img 
              className="absolute inset-0 w-full h-full object-cover" 
              src={(typeof featuredActivity.coverImage === 'object' && featuredActivity.coverImage !== null ? featuredActivity.coverImage.url : '') || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPLymRRcNm-mk_ooODU4mwWAQVpz3G_P2CQG17ONBKfS2f3yc4c8AV1ND7o0h9B-T0Eb_1JSNWvvyYX6NlZQgRmzQigQnkG-U9aQD4c6i88RNSNzQV_jLmEZg-jJVpmxUVdCHyD8axmJjBc-qA9rYh6z4Fzo0D26Rfs1SydLWKMAeB1zwZTtcpqJa1O2ilwS4SnPKcgc7bYbI5Sf0tbkCx4pJZdKZWORzjpgzVH07pdu1l8ZjlULq47Q'} 
              alt={featuredActivity.title}
            />
          </div>
          <div className="md:w-1/3 p-stack-lg flex flex-col justify-center bg-surface">
            <div className="flex items-center gap-2 mb-stack-sm text-primary">
              <span className="material-symbols-outlined text-sm">festival</span>
              <span className="font-label-md text-label-md uppercase tracking-wider">Featured Event</span>
            </div>
            <h2 className="font-serif font-medium text-headline-lg text-on-surface mb-stack-sm">{featuredActivity.title}</h2>
            <div className="flex flex-col gap-2 mb-stack-md font-body-md text-body-md text-on-surface-variant">
              {featuredActivity.eventDate && (
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  <span>{new Date(featuredActivity.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              )}
            </div>
            <Link href={`/activities/${featuredActivity.slug || featuredActivity.id}`} className="self-start font-label-md text-label-md text-primary border-2 border-primary px-6 py-2 rounded hover:bg-surface-container-low transition-colors flex items-center justify-center min-h-[44px]">View Details</Link>
          </div>
        </div>
      </section>
      )}

      {/* Activities Categories Grid */}
      <section className="bg-surface-container-low py-stack-lg md:py-16">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-serif font-medium text-headline-md text-on-surface mb-stack-lg text-center">Explore Our Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Category Card 1 */}
            <div className="bg-surface p-stack-md rounded-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center mb-stack-sm group-hover:bg-primary-container/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl">celebration</span>
              </div>
              <h3 className="font-label-md text-label-md text-on-surface mb-2">Folk Festivals</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">Celebrating regional traditions and performing arts.</p>
            </div>
            {/* Category Card 2 */}
            <div className="bg-surface p-stack-md rounded-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-secondary-container/10 flex items-center justify-center mb-stack-sm group-hover:bg-secondary-container/20 transition-colors">
                <span className="material-symbols-outlined text-secondary text-3xl">palette</span>
              </div>
              <h3 className="font-label-md text-label-md text-on-surface mb-2">Craft Fairs</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">Showcasing indigenous handicrafts and handlooms.</p>
            </div>
            {/* Category Card 3 */}
            <div className="bg-surface p-stack-md rounded-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-tertiary-container/10 flex items-center justify-center mb-stack-sm group-hover:bg-tertiary-container/20 transition-colors">
                <span className="material-symbols-outlined text-tertiary text-3xl">school</span>
              </div>
              <h3 className="font-label-md text-label-md text-on-surface mb-2">Workshops & Seminars</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">Skill development and cultural preservation discussions.</p>
            </div>
            {/* Category Card 4 */}
            <div className="bg-surface p-stack-md rounded-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-[#d97706]/10 flex items-center justify-center mb-stack-sm group-hover:bg-[#d97706]/20 transition-colors">
                <span className="material-symbols-outlined text-[#d97706] text-3xl">museum</span>
              </div>
              <h3 className="font-label-md text-label-md text-on-surface mb-2">Exhibitions</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">Curated displays of tribal artifacts and fine arts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chronological Highlights Feed */}
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg md:py-16">
        <div className="flex justify-between items-end mb-stack-lg">
          <h2 className="font-serif font-medium text-headline-md text-on-surface">Recent Activities</h2>
          <Link href="#" className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {recentActivities.map(activity => {
            const imageUrl = typeof activity.coverImage === 'object' && activity.coverImage !== null ? activity.coverImage.url : '';
            return (
              <div key={activity.id} className="bg-surface rounded-lg border border-outline-variant shadow-sm overflow-hidden flex flex-col">
                <div className="h-48 relative bg-surface-container-high">
                  <img 
                    className="absolute inset-0 w-full h-full object-cover" 
                    src={imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPLymRRcNm-mk_ooODU4mwWAQVpz3G_P2CQG17ONBKfS2f3yc4c8AV1ND7o0h9B-T0Eb_1JSNWvvyYX6NlZQgRmzQigQnkG-U9aQD4c6i88RNSNzQV_jLmEZg-jJVpmxUVdCHyD8axmJjBc-qA9rYh6z4Fzo0D26Rfs1SydLWKMAeB1zwZTtcpqJa1O2ilwS4SnPKcgc7bYbI5Sf0tbkCx4pJZdKZWORzjpgzVH07pdu1l8ZjlULq47Q'}
                    alt={activity.title}
                  />
                </div>
                <div className="p-stack-md flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-primary-container/10 text-primary px-2 py-1 rounded text-xs font-label-md uppercase tracking-wide">Event</span>
                    {activity.eventDate && (
                      <span className="text-on-surface-variant text-xs font-body-md">
                        {new Date(activity.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-medium text-lg font-semibold text-on-surface mb-4">{activity.title}</h3>
                  <Link href={`/activities/${activity.slug || activity.id}`} className="mt-auto font-label-md text-label-md text-primary hover:underline">Read More</Link>
                </div>
              </div>
            );
          })}
          
          {recentActivities.length === 0 && (
            <div className="col-span-3 text-center py-12 text-on-surface-variant">No activities found.</div>
          )}
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="bg-inverse-surface text-inverse-on-surface py-stack-lg md:py-16 relative overflow-hidden">
        {/* Abstract decorative background element */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)' }}></div>
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="font-headline-xl text-headline-xl text-primary-fixed mb-2">5,000+</span>
              <span className="font-label-md text-label-md text-surface-variant uppercase tracking-wider">Artistes Supported</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-headline-xl text-headline-xl text-primary-fixed mb-2">120</span>
              <span className="font-label-md text-label-md text-surface-variant uppercase tracking-wider">Events Annually</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-headline-xl text-headline-xl text-primary-fixed mb-2">8</span>
              <span className="font-label-md text-label-md text-surface-variant uppercase tracking-wider">States Covered</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-headline-xl text-headline-xl text-primary-fixed mb-2">30+</span>
              <span className="font-label-md text-label-md text-surface-variant uppercase tracking-wider">Years of Heritage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg md:py-24 text-center">
        <div className="bg-surface-container-low rounded-2xl p-stack-lg md:p-12 border border-outline-variant shadow-sm max-w-4xl mx-auto">
          <span className="material-symbols-outlined text-primary text-5xl mb-4">handshake</span>
          <h2 className="font-serif font-medium text-headline-md text-on-surface mb-stack-sm">Be Part of Our Cultural Journey</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-2xl mx-auto">
            Join us in our mission to preserve and promote the cultural tapestry of North East India. Register for upcoming workshops, participate in festivals, or become a member of our artistic community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="font-label-md text-label-md bg-primary-container text-on-primary px-8 py-3 rounded-md hover:bg-primary transition-colors min-h-[44px] shadow-sm">Register for Events</button>
            <button className="font-label-md text-label-md text-primary border-2 border-primary px-8 py-3 rounded-md hover:bg-surface-container-low transition-colors min-h-[44px]">Contact Us</button>
          </div>
        </div>
      </section>
    </main>
  );
}
