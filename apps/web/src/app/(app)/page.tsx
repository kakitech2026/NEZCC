import HeroSection from '@/components/ui/HeroSection';
import MobileHeroSection from '@/components/ui/MobileHeroSection';
import UrgentNotice from '@/components/ui/UrgentNotice';
import NewsCard from '@/components/content/NewsCard';
import EventCard from '@/components/content/EventCard';
import HeroCarousel from '@/components/ui/HeroCarousel';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  
  const campaignsResult = await payload.find({
    collection: 'campaigns',
    where: {
      isActive: {
        equals: true,
      },
    },
  });
  const campaigns = campaignsResult.docs;

  const newsResult = await payload.find({
    collection: 'news',
    sort: '-publishedDate',
    limit: 5,
  });
  const newsItems = newsResult.docs;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const eventsResult = await payload.find({
    collection: 'events',
    sort: '-startDate',
    limit: 4,
  });
  const upcomingEvents = eventsResult.docs;

  const featuredArticle = newsItems.find((n) => n.isFeatured) || newsItems[0];
  const listArticles = newsItems.filter((n) => n.id !== featuredArticle?.id).slice(0, 2);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <main id="main-content" className="flex-grow w-full flex flex-col ">
      {campaigns && campaigns.length > 0 ? (
        <>
          <HeroCarousel campaigns={campaigns as any[]} />
          <UrgentNotice />
        </>
      ) : (
        <>
          <div className="block md:hidden">
            <MobileHeroSection />
          </div>
          <div className="hidden md:block">
            <HeroSection />
            <UrgentNotice />
          </div>
        </>
      )}

      {/* Latest Updates Section */}
      <section className="w-full py-stack-lg md:py-24 bg-surface" id="news">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-stack-lg gap-stack-md border-b border-outline-variant pb-stack-sm">
            <div>
              <h2 className="text-headline-lg font-serif font-medium text-on-surface inline-block border-b-4 pb-2" style={{ borderColor: '#df5f18' }}>Latest Updates</h2>
              <p className="text-body-md font-body-md text-on-surface-variant mt-3">News and announcements from the centre.</p>
            </div>
            <a className="group inline-flex items-center text-primary font-label-md text-label-md font-semibold hover:text-surface-tint transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1" href="/news">
              View All News
              <span aria-hidden="true" className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform text-[#df5f18]" data-icon="arrow_forward">arrow_forward</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Featured Article */}
            {featuredArticle ? (
              <a href={`/news/${featuredArticle.id}`} className="lg:col-span-2 group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary h-full flex flex-col min-h-[400px] lg:min-h-[480px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10 transition-opacity group-hover:opacity-95"></div>
                <img
                  src={(featuredArticle.featuredImage as any)?.url || '/images/art_heritage.webp'}
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="relative z-20 mt-auto p-6 md:p-8 w-full">
                  <div className="flex items-center gap-2 text-white/90 text-sm font-medium mb-3">
                    <span aria-hidden="true" className="material-symbols-outlined text-[16px]">calendar_today</span>
                    <time suppressHydrationWarning>{formatDate(featuredArticle.publishedDate)}</time>
                    {featuredArticle.isFeatured && (
                      <span className="px-2.5 py-0.5 text-white text-xs font-semibold rounded-full ml-2 uppercase tracking-wide shadow-sm" style={{ backgroundColor: '#df5f18' }}>Featured</span>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white mb-3 group-hover:text-[#1898df] transition-colors line-clamp-2 drop-shadow-md">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-white/90 line-clamp-2 mb-6 max-w-2xl text-sm md:text-base drop-shadow-sm">
                    {featuredArticle.summary}
                  </p>
                  <div className="inline-flex items-center text-[#1898df] font-semibold group-hover:text-white transition-colors">
                    Read Full Article
                    <span aria-hidden="true" className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </a>
            ) : (
              <div className="lg:col-span-2 bg-surface-container rounded-2xl flex items-center justify-center p-8 text-on-surface-variant min-h-[400px]">
                No recent news articles found.
              </div>
            )}

            {/* List Articles */}
            <div className="flex flex-col gap-4 md:gap-6 justify-between h-full">
              {listArticles.map((article) => (
                <a key={article.id} href={`/news/${article.id}`} className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 group items-start bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant hover:border-primary hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary flex-1">
                  <div className="w-full sm:w-2/5 lg:w-full xl:w-2/5 aspect-video sm:aspect-square lg:aspect-video xl:aspect-square rounded-xl overflow-hidden shrink-0 relative bg-surface-container flex items-center justify-center">
                    {(article.featuredImage as any)?.url ? (
                      <img
                        src={(article.featuredImage as any)?.url}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <span aria-hidden="true" className="material-symbols-outlined text-4xl text-primary">description</span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center flex-1 py-1 h-full">
                    <div className="text-xs text-on-surface-variant mb-2 font-medium flex items-center gap-1">
                      <span aria-hidden="true" className="material-symbols-outlined text-[14px]">calendar_today</span>
                      <time suppressHydrationWarning>{formatDate(article.publishedDate)}</time>
                    </div>
                    <h4 className="text-[17px] leading-tight font-serif font-medium text-on-surface group-hover:text-[#df5f18] transition-colors line-clamp-2 mb-2">
                      {article.title}
                    </h4>
                    <p className="text-sm text-on-surface-variant line-clamp-2 mb-3 flex-grow">
                      {article.summary}
                    </p>
                    <div className="text-primary text-sm font-semibold mt-auto inline-flex items-center">
                      Read More <span aria-hidden="true" className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Information Categories Section */}
      <section className="w-full py-stack-lg md:py-24 bg-surface-container-lowest relative" id="information-categories">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="flex flex-col items-center justify-center text-center mb-10">
            <h2 className="text-headline-lg font-serif font-medium text-on-surface inline-block border-b-4 pb-2" style={{ borderColor: '#df5f18' }}>Information Categories</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Calendar of Events Card */}
            <a href="/events" className="flex flex-row items-center bg-white p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0 mr-6 text-white group-hover:scale-105 transition-transform shadow-inner" style={{ backgroundColor: '#df5f18' }}>
                <span aria-hidden="true" className="material-symbols-outlined text-4xl">calendar_month</span>
              </div>
              <div className="flex flex-col flex-1 h-full justify-center">
                <h3 className="text-xl font-serif font-medium text-on-surface mb-1 group-hover:text-[#df5f18] transition-colors">Calendar of Events</h3>
                <p className="text-sm text-on-surface-variant mb-2">Latest Calendar of Events 2018</p>
                <div className="text-primary text-sm font-semibold flex items-center mt-auto">
                  View <span aria-hidden="true" className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </a>

            {/* Ad & Tenders Card */}
            <a href="/tenders" className="flex flex-row items-center bg-white p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0 mr-6 text-white group-hover:scale-105 transition-transform shadow-inner" style={{ backgroundColor: '#df5f18' }}>
                <span aria-hidden="true" className="material-symbols-outlined text-4xl">campaign</span>
              </div>
              <div className="flex flex-col flex-1 h-full justify-center">
                <h3 className="text-xl font-serif font-medium text-on-surface mb-1 group-hover:text-[#df5f18] transition-colors">Ad & Tenders</h3>
                <p className="text-sm text-on-surface-variant mb-2">Advertisement & Tenders</p>
                <div className="text-primary text-sm font-semibold flex items-center mt-auto">
                  View <span aria-hidden="true" className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </a>

            {/* Annual Report Card */}
            <a href="/publications/annual-reports" className="flex flex-row items-center bg-white p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0 mr-6 text-white group-hover:scale-105 transition-transform shadow-inner" style={{ backgroundColor: '#df5f18' }}>
                <span aria-hidden="true" className="material-symbols-outlined text-4xl">description</span>
              </div>
              <div className="flex flex-col flex-1 h-full justify-center">
                <h3 className="text-xl font-serif font-medium text-on-surface mb-1 group-hover:text-[#df5f18] transition-colors">Annual Report</h3>
                <p className="text-sm text-on-surface-variant mb-2">Details of all annual reports</p>
                <div className="text-primary text-sm font-semibold flex items-center mt-auto">
                  View <span aria-hidden="true" className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </a>

          </div>
        </div>
      </section>
      {/* Upcoming Events Section */}
      <section className="w-full py-stack-lg md:py-24 bg-background border-t border-surface-variant relative overflow-hidden" id="events">
        {/* Faint Background Sketch */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] bg-[url('/images/about/ne.png')] bg-[center_25%] bg-no-repeat bg-cover mix-blend-multiply"></div>

        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="flex flex-col items-center justify-center text-center mb-10">
            <h2 className="text-headline-lg font-serif font-medium text-on-surface inline-block border-b-4 pb-2" style={{ borderColor: '#df5f18' }}>Upcoming Events</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => {
                const date = new Date(event.startDate as string);
                const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                const day = date.toLocaleDateString('en-US', { day: '2-digit' });
                return (
                  <EventCard
                    key={event.id}
                    month={month}
                    day={day}
                    title={event.title as string}
                    location={event.location as string}
                    time={event.time as string}
                    imageUrl={(event.featuredImage as any)?.url || "/images/art_heritage.webp"}
                    href={`/events/${event.id}`}
                  />
                );
              })
            ) : (
              <>
                <EventCard
                  month="OCT" day="15"
                  title="Hornbill Festival Prelude"
                  location="Dimapur Cultural Ground, Nagaland"
                  time="10:00 AM - 6:00 PM"
                  imageUrl="/images/events/hornbill.jpg"
                />
                <EventCard
                  month="NOV" day="02"
                  title="Folk Music Symposium"
                  location="Shillong Auditorium, Meghalaya"
                  time="9:00 AM - 4:00 PM"
                  imageUrl="/images/events/folk-music.jpg"
                />
                <EventCard
                  month="DEC" day="12"
                  title="Winter Handloom Expo"
                  location="Guwahati Trade Center, Assam"
                  time="11:00 AM - 8:00 PM"
                  imageUrl="/images/events/handloom.jpg"
                />
                <EventCard
                  month="JAN" day="05"
                  title="NEZCC Foundation Day"
                  location="Headquarters, Dimapur"
                  time="4:00 PM - 9:00 PM"
                  imageUrl="/images/events/foundation.jpg"
                />
              </>
            )}
          </div>
          <div className="mt-12 flex justify-center">
            <a className="group inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-label-md text-label-md font-semibold rounded-full hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:shadow-md" href="#">
              View All Events
            </a>
          </div>
        </div>
      </section>

      {/* Facilities & GOI Programme Section */}
      <section className="w-full py-stack-lg md:py-24 bg-surface border-t border-surface-variant relative" id="facilities-goi">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">

            {/* Facilities Column (Left) */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-medium text-on-surface inline-block border-b-2 pb-2" style={{ borderColor: '#df5f18' }}>Facilities of NEZCC</h2>
                <p className="text-sm text-on-surface-variant mt-2">Explore what NEZCC offers</p>
              </div>

              <div className="flex flex-col border-t border-outline-variant">
                {/* Welfare Facilities */}
                <a href="#" className="flex items-center gap-4 py-4 border-b border-outline-variant group hover:bg-surface-container-low transition-colors px-2">
                  <div className="w-12 h-12 rounded-full border border-outline-variant/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                    <span className="material-symbols-outlined text-2xl">favorite</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs text-on-surface-variant">General</span>
                      <span className="text-xs text-on-surface-variant">Available Now</span>
                    </div>
                    <h3 className="font-medium text-on-surface group-hover:text-primary transition-colors text-[16px]">Welfare Facilities</h3>
                  </div>
                </a>

                {/* Trending */}
                <a href="#" className="flex items-center gap-4 py-4 border-b border-outline-variant group hover:bg-surface-container-low transition-colors px-2">
                  <div className="w-12 h-12 rounded-full border border-outline-variant/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                    <span className="material-symbols-outlined text-2xl">trending_up</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs text-on-surface-variant">Popular</span>
                      <span className="text-xs text-on-surface-variant">Updated</span>
                    </div>
                    <h3 className="font-medium text-on-surface group-hover:text-primary transition-colors text-[16px]">Trending Facilities</h3>
                  </div>
                </a>

                {/* Healthy Working Environment */}
                <a href="#" className="flex items-center gap-4 py-4 border-b border-outline-variant group hover:bg-surface-container-low transition-colors px-2">
                  <div className="w-12 h-12 rounded-full border border-outline-variant/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                    <span className="material-symbols-outlined text-2xl">health_and_safety</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs text-on-surface-variant">Health</span>
                      <span className="text-xs text-on-surface-variant">Certified</span>
                    </div>
                    <h3 className="font-medium text-on-surface group-hover:text-primary transition-colors text-[16px]">Healthy Working Environment</h3>
                  </div>
                </a>

                {/* Safe Working Environment */}
                <a href="#" className="flex items-center gap-4 py-4 border-b border-outline-variant group hover:bg-surface-container-low transition-colors px-2">
                  <div className="w-12 h-12 rounded-full border border-outline-variant/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                    <span className="material-symbols-outlined text-2xl">security</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs text-on-surface-variant">Security</span>
                      <span className="text-xs text-on-surface-variant">24/7 Monitored</span>
                    </div>
                    <h3 className="font-medium text-on-surface group-hover:text-primary transition-colors text-[16px]">Safe Working Environment</h3>
                  </div>
                </a>
              </div>
              <div className="mt-6 flex justify-start">
                <a href="#" className="text-primary font-bold text-sm inline-flex items-center hover:underline">
                  View All Facilities <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* GOI Programme Column (Right) */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-medium text-on-surface inline-block border-b-2 pb-2" style={{ borderColor: '#df5f18' }}>GOI Programme</h2>
                <p className="text-sm text-on-surface-variant mt-2">Government initiatives and legislative updates</p>
              </div>

              <div className="flex flex-col sm:flex-row border border-outline-variant bg-white h-full">
                {/* Featured Pane */}
                <a href="#" className="w-full sm:w-1/2 flex flex-col group border-b sm:border-b-0 sm:border-r border-outline-variant">
                  <div className="w-full aspect-video sm:aspect-square md:aspect-video lg:aspect-square overflow-hidden relative p-4">
                    <img src="/images/goi/digital_india.png" alt="Act and Subordinate Legislation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-start" style={{ backgroundColor: '#df5f18', color: 'white' }}>
                    <span className="text-xs font-semibold mb-2 opacity-90">August 2026</span>
                    <h3 className="text-lg font-serif font-medium leading-tight mb-2">Act and Subordinate Legislation</h3>
                    <p className="text-sm opacity-90 line-clamp-4">
                      The Government of India has approved a centrally sponsored scheme for the comprehensive development of cultural preservation in border blocks across the North East region.
                    </p>
                  </div>
                </a>

                {/* List Pane */}
                <div className="w-full sm:w-1/2 flex flex-col">
                  <a href="#" className="p-4 border-b border-outline-variant group hover:bg-surface-container-lowest transition-colors flex-1 flex flex-col justify-center">
                    <span className="text-xs text-on-surface-variant mb-1">July 2026</span>
                    <h4 className="font-serif font-medium text-on-surface text-[15px] group-hover:text-primary transition-colors leading-tight">Act and Subordinate</h4>
                  </a>
                  <a href="#" className="p-4 border-b border-outline-variant group hover:bg-surface-container-lowest transition-colors flex-1 flex flex-col justify-center">
                    <span className="text-xs text-on-surface-variant mb-1">June 2026</span>
                    <h4 className="font-serif font-medium text-on-surface text-[15px] group-hover:text-primary transition-colors leading-tight">Gyan Bharatam Mission</h4>
                  </a>
                  <a href="#" className="p-4 border-b border-outline-variant group hover:bg-surface-container-lowest transition-colors flex-1 flex flex-col justify-center">
                    <span className="text-xs text-on-surface-variant mb-1">May 2026</span>
                    <h4 className="font-serif font-medium text-on-surface text-[15px] group-hover:text-primary transition-colors leading-tight">Census of India 2027</h4>
                  </a>
                  <a href="#" className="p-4 group hover:bg-surface-container-lowest transition-colors flex-1 flex flex-col justify-center">
                    <span className="text-xs text-on-surface-variant mb-1">April 2026</span>
                    <h4 className="font-serif font-medium text-on-surface text-[15px] group-hover:text-primary transition-colors leading-tight">National Handloom Development Programme</h4>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Government Logos Section */}
      <section className="w-full py-12 md:py-16 bg-white border-t border-outline-variant" id="government-logos">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <p className="text-sm font-semibold text-on-surface-variant tracking-widest uppercase mb-10">
            Important Links & Initiatives
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center items-center gap-4 md:gap-6 lg:gap-8">
            
            {/* Ministry of Culture */}
            <a href="#" className="group flex items-center justify-center h-20 md:h-24 w-full md:w-[200px] px-4 bg-white border border-outline-variant rounded-xl hover:shadow-md hover:border-primary transition-all duration-300 hover:-translate-y-1">
              <img 
                src="/images/logos/ministry_of_culture_india.png" 
                alt="Ministry of Culture" 
                className="max-h-12 md:max-h-16 max-w-full object-contain" 
              />
            </a>

            {/* India.gov.in */}
            <a href="#" className="group flex items-center justify-center h-20 md:h-24 w-full md:w-[200px] px-4 bg-white border border-outline-variant rounded-xl hover:shadow-md hover:border-primary transition-all duration-300 hover:-translate-y-1">
              <img 
                src="/images/logos/India_gov_in.png" 
                alt="India.gov.in" 
                className="max-h-12 md:max-h-16 max-w-full object-contain" 
              />
            </a>

            {/* Digital India */}
            <a href="#" className="group flex items-center justify-center h-20 md:h-24 w-full md:w-[200px] px-4 bg-white border border-outline-variant rounded-xl hover:shadow-md hover:border-primary transition-all duration-300 hover:-translate-y-1">
              <img 
                src="/images/logos/digital_india.png" 
                alt="Digital India" 
                className="max-h-12 md:max-h-16 max-w-full object-contain" 
              />
            </a>

            {/* NEZCC Allahabad */}
            <a href="#" className="group flex items-center justify-center h-20 md:h-24 w-full md:w-[200px] px-4 bg-white border border-outline-variant rounded-xl hover:shadow-md hover:border-primary transition-all duration-300 hover:-translate-y-1">
              <img 
                src="/images/logos/nezcc_allahabad.jpeg" 
                alt="NCZCC Allahabad" 
                className="max-h-12 md:max-h-16 max-w-full object-contain" 
              />
            </a>

            {/* Museums of India */}
            <a href="#" className="group flex items-center justify-center h-20 md:h-24 w-full md:w-[200px] px-4 bg-white border border-outline-variant rounded-xl hover:shadow-md hover:border-primary transition-all duration-300 hover:-translate-y-1">
              <img 
                src="/images/logos/museums_of_india.jpg" 
                alt="Museums of India" 
                className="max-h-12 md:max-h-16 max-w-full object-contain" 
              />
            </a>

            {/* 75 Years */}
            <a href="#" className="group flex items-center justify-center h-20 md:h-24 w-full md:w-[200px] px-4 bg-white border border-outline-variant rounded-xl hover:shadow-md hover:border-primary transition-all duration-300 hover:-translate-y-1">
              <img 
                src="/images/logos/seventy_five.png" 
                alt="Azadi Ka Amrit Mahotsav" 
                className="max-h-12 md:max-h-16 max-w-full object-contain" 
              />
            </a>

            {/* Mahatma */}
            <a href="#" className="group flex items-center justify-center h-20 md:h-24 w-full md:w-[200px] px-4 bg-white border border-outline-variant rounded-xl hover:shadow-md hover:border-primary transition-all duration-300 hover:-translate-y-1">
              <img 
                src="/images/logos/mahatma.png" 
                alt="Mahatma Gandhi 150" 
                className="max-h-12 md:max-h-16 max-w-full object-contain" 
              />
            </a>

            {/* MyGov */}
            <a href="#" className="group flex items-center justify-center h-20 md:h-24 w-full md:w-[200px] px-4 bg-white border border-outline-variant rounded-xl hover:shadow-md hover:border-primary transition-all duration-300 hover:-translate-y-1">
              <img 
                src="/images/logos/mygov.png" 
                alt="MyGov" 
                className="max-h-12 md:max-h-16 max-w-full object-contain" 
              />
            </a>

          </div>
        </div>
      </section>
    </main>
  );
}
