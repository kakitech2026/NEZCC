import React from 'react';
import Link from 'next/link';

export default function ActivitiesHighlightsPage() {
  return (
    <main className="w-full">
      {/* Page Header */}
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg md:py-16">
        <div className="max-w-3xl">
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface mb-stack-md">Highlights of the Activities</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Discover the diverse cultural initiatives, vibrant festivals, and skill-building workshops organized by NEZCC to preserve, promote, and propagate the rich cultural heritage of North East India.
          </p>
        </div>
      </section>

      {/* Featured Activity Hero */}
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg">
        <div className="relative rounded-xl overflow-hidden bg-surface-container shadow-sm border border-outline-variant flex flex-col md:flex-row min-h-[400px]">
          <div className="md:w-2/3 relative h-64 md:h-auto">
            <img 
              className="absolute inset-0 w-full h-full object-cover" 
              data-alt="A vibrant, wide-angle photograph of the Hornbill Festival in Nagaland. Traditional tribal dancers in colorful, elaborate indigenous attire performing a synchronized dance in a large outdoor arena. Bright daylight, festive atmosphere, high-quality documentary style photography. The scene is energetic and culturally rich." 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPLymRRcNm-mk_ooODU4mwWAQVpz3G_P2CQG17ONBKfS2f3yc4c8AV1ND7o0h9B-T0Eb_1JSNWvvyYX6NlZQgRmzQigQnkG-U9aQD4c6i88RNSNzQV_jLmEZg-jJVpmxUVdCHyD8axmJjBc-qA9rYh6z4Fzo0D26Rfs1SydLWKMAeB1zwZTtcpqJa1O2ilwS4SnPKcgc7bYbI5Sf0tbkCx4pJZdKZWORzjpgzVH07pdu1l8ZjlULq47Q" 
              alt=""
            />
          </div>
          <div className="md:w-1/3 p-stack-lg flex flex-col justify-center bg-surface">
            <div className="flex items-center gap-2 mb-stack-sm text-primary">
              <span className="material-symbols-outlined text-sm">festival</span>
              <span className="font-label-md text-label-md uppercase tracking-wider">Featured Event</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">Hornbill Festival</h2>
            <div className="flex flex-col gap-2 mb-stack-md font-body-md text-body-md text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">calendar_month</span>
                <span>December 1 - 10, 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base" data-location="Nagaland">location_on</span>
                <span>Kisama Heritage Village, Nagaland</span>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface mb-stack-lg line-clamp-3">
              The 'Festival of Festivals' brings together all ethnic groups of Nagaland to showcase their vibrant culture, traditional arts, indigenous sports, and culinary delights in a grand celebration of heritage.
            </p>
            <button className="self-start font-label-md text-label-md text-primary border-2 border-primary px-6 py-2 rounded hover:bg-surface-container-low transition-colors min-h-[44px]">View Gallery</button>
          </div>
        </div>
      </section>

      {/* Activities Categories Grid */}
      <section className="bg-surface-container-low py-stack-lg md:py-16">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-lg text-center">Explore Our Initiatives</h2>
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
          <h2 className="font-headline-md text-headline-md text-on-surface">Recent Activities</h2>
          <Link href="#" className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* Activity Card 1 */}
          <div className="bg-surface rounded-lg border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <div className="h-48 relative bg-surface-container-high">
              <img 
                className="absolute inset-0 w-full h-full object-cover" 
                data-alt="A medium shot photograph of a Mime Workshop taking place indoors in a well-lit studio. Several young participants in casual wear are practicing mime techniques, guided by an instructor. Focus on expressive faces and hand gestures. Clean, professional documentary style, natural lighting." 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASnQsqE9HlEz6lo9TOcJckRiBzUc3QEpwlQ-yldLfQGEo3lvU6w65KskZMzbtsyMVdJb6sRDHV-vNPR9FaJTeREG6GPBwIl5L_8ENdQvsEgKfjQ98HGOzWF8jr1ZBbeeBF02lC-KSkcFjHR_K8U8EBp1UQFSdx3hdpohrsnOxpnKUnplXqmUWuUhSxzOH5ETEa912JJOqYR6xcc88dJHN4MUtRgfdYwE2vkOIKO79fgS1J0NKdEhTjRQ"
                alt=""
              />
            </div>
            <div className="p-stack-md flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-primary-container/10 text-primary px-2 py-1 rounded text-xs font-label-md uppercase tracking-wide">Workshop</span>
                <span className="text-on-surface-variant text-xs font-body-md">Oct 15, 2023</span>
              </div>
              <h3 className="font-headline-sm text-lg font-semibold text-on-surface mb-2">Mime Workshop at Dimapur</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">A specialized workshop focusing on non-verbal theatrical expression, engaging local youth in dramatic arts.</p>
              <Link href="#" className="mt-auto font-label-md text-label-md text-primary hover:underline">Read More</Link>
            </div>
          </div>
          {/* Activity Card 2 */}
          <div className="bg-surface rounded-lg border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <div className="h-48 relative bg-surface-container-high">
              <img 
                className="absolute inset-0 w-full h-full object-cover" 
                data-alt="A close-up photograph of a Traditional Weaving Exhibition. Intricate, colorful handwoven textiles are draped elegantly over wooden stands. A local artisan is demonstrating weaving on a traditional wooden loom in the background. Warm, inviting lighting, focusing on the texture and craftsmanship of the textiles." 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdThzTY5nC44NLDprqv6Q9qK1kr4KO49zCPQ5lphnFGpS49a0I49CmtobnwI3ON2Ecd55H01NiQBUQQZT9lTXCVzgXohLDyBnLdjaxKQQElD-M6Fvg-P2RIeoy0I1y_Px2HZUISYTQbnqOxPngu9Bb_jrha5oiCfJd1FXZiFx3kt2JcAeeK1Z52ewS77Xp0ffwWX5tGZe61otZyUX_HGhlJwnqWWo6ILZO6S9pHxhIhEvUabnAmZLjTw"
                alt=""
              />
            </div>
            <div className="p-stack-md flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-secondary-container/10 text-secondary px-2 py-1 rounded text-xs font-label-md uppercase tracking-wide">Exhibition</span>
                <span className="text-on-surface-variant text-xs font-body-md">Sep 22, 2023</span>
              </div>
              <h3 className="font-headline-sm text-lg font-semibold text-on-surface mb-2">Traditional Weaving Exhibition</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">Showcasing the intricate handloom designs and preserving the ancient weaving techniques of regional tribes.</p>
              <Link href="#" className="mt-auto font-label-md text-label-md text-primary hover:underline">Read More</Link>
            </div>
          </div>
          {/* Activity Card 3 */}
          <div className="bg-surface rounded-lg border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <div className="h-48 relative bg-surface-container-high">
              <img 
                className="absolute inset-0 w-full h-full object-cover" 
                data-alt="A wide documentary shot of a Border Area Programme cultural event. A makeshift stage set up in a rural village setting. Local villagers and border security personnel are gathered watching a traditional folk music performance. Daylight, community-focused, authentic rural Indian context." 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8iuucJvXnPq5jYou3HpJhzuxCRMkoiMPnePjlUf4_m6TLH1tAAQaHe_8vHkZUqAtZ-nBCHeVJtRCxtpiAvwYXN1hcKAk_YI5YeDiwSIwZDHC8Cdes5RIRflT2objCxvVWOyjcEGRKnAoQ_4r1lmpWdCPbkkGbTspaaDNqC64b4x2soSf2cgPEW4DzPKQv0qQLjkQw49duy4cQZ_tS4sYdNMPs7Ae1FEG8KBicnS1lYooMnuzSdEO7yg"
                alt=""
              />
            </div>
            <div className="p-stack-md flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-[#16a34a]/10 text-[#16a34a] px-2 py-1 rounded text-xs font-label-md uppercase tracking-wide">Programme</span>
                <span className="text-on-surface-variant text-xs font-body-md">Aug 05, 2023</span>
              </div>
              <h3 className="font-headline-sm text-lg font-semibold text-on-surface mb-2">Border Area Programme</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">Cultural outreach initiative aimed at fostering unity and promoting arts in remote border communities.</p>
              <Link href="#" className="mt-auto font-label-md text-label-md text-primary hover:underline">Read More</Link>
            </div>
          </div>
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
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">Be Part of Our Cultural Journey</h2>
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
