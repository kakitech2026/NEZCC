import HeroSection from '@/components/ui/HeroSection';
import UrgentNotice from '@/components/ui/UrgentNotice';
import NewsCard from '@/components/content/NewsCard';
import EventCard from '@/components/content/EventCard';

export default function Home() {
  return (
    <main id="main-content" className="flex-grow w-full flex flex-col">
      <HeroSection />
      <UrgentNotice />

      {/* Latest Updates Section */}
      <section className="w-full py-stack-lg md:py-24 bg-surface" id="news">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-stack-lg gap-stack-md border-b border-outline-variant pb-stack-sm">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-on-surface inline-block border-b-4 pb-2" style={{ borderColor: 'rgb(220, 38, 38)' }}>Latest Updates</h2>
              <p className="text-body-md font-body-md text-on-surface-variant mt-3">News and announcements from the centre.</p>
            </div>
            <a className="group inline-flex items-center text-primary font-label-md text-label-md font-semibold hover:text-surface-tint transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1" href="#">
              View All News
              <span aria-hidden="true" className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform" data-icon="arrow_forward" style={{ color: 'rgb(76, 183, 72)' }}>arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Featured Article */}
            <a href="#" className="lg:col-span-2 group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary h-full flex flex-col min-h-[400px] lg:min-h-[480px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10 transition-opacity group-hover:opacity-95"></div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8HSW1jTviniVwQ10BKqYJngDFlIRNTyMtkX3U6ye7BE2pVSXPbZYUMDe_Q2zjBtMslgcGEkJbLX8gVCS3ZiMUxLnqr5_XWTvaG7TgYpCneB46C-6BleCDavuwMJp2V4FtZWdHb9x4uuUqgddwCQZH2J7Po1MYOAMuAwJtqdN08CeUCyL3ETBCCcdG3fYuRpuQGj7wK2HJwKjKEwlvSUcriFLuzd60a0A3b-pDDhWp7wxOuEcb1p2-PA"
                alt="A brightly lit interior shot of a modern gallery space with pristine white walls."
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="relative z-20 mt-auto p-6 md:p-8 w-full">
                <div className="flex items-center gap-2 text-white/90 text-sm font-medium mb-3">
                  <span aria-hidden="true" className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <time suppressHydrationWarning>Aug 12, 2026</time>
                  <span className="px-2.5 py-0.5 text-white text-xs font-bold rounded-full ml-2 uppercase tracking-wide shadow-sm" style={{ backgroundColor: 'rgb(220, 38, 38)' }}>Featured</span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 group-hover:text-primary-container transition-colors line-clamp-2 drop-shadow-md">
                  Inauguration of the New Textile Archive
                </h3>
                <p className="text-white/90 line-clamp-2 mb-6 max-w-2xl text-sm md:text-base drop-shadow-sm">
                  NEZCC successfully launched the new digital and physical archive dedicated to preserving indigenous textile patterns.
                </p>
                <div className="inline-flex items-center text-primary-container font-semibold group-hover:text-white transition-colors">
                  Read Full Article
                  <span aria-hidden="true" className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </a>

            {/* List Articles */}
            <div className="flex flex-col gap-4 md:gap-6 justify-between h-full">
              <a href="#" className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 group items-start bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant hover:border-primary hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary flex-1">
                <div className="w-full sm:w-2/5 lg:w-full xl:w-2/5 aspect-video sm:aspect-square lg:aspect-video xl:aspect-square rounded-xl overflow-hidden shrink-0 relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuChzPVu_31rq7y64O1E8zupp0_f6cRw8v8QIVhRySg4XCvoszIhC_TvLJ2jFYajlJhq9CnydNomM6DPdOTc_v45RxQRBD8W764CMXkPM3pkBO4mX3MFLMxWV32gzML322RSYMcyvv0Kgvk_1uSQFHlIvg1UeHoWDpyQzkcE8DqPmJ0fb7sUb4sXs3zRAxTZVqDTGYESm3zAUMIyvF1Ryfu2_HekzqxjI5X-gS8c_X6Yx69gK8U0oL9UGw"
                    alt="A high-quality close-up photograph of a skilled artisan hands carefully carving an intricate wooden mask."
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 py-1 h-full">
                  <div className="text-xs text-on-surface-variant mb-2 font-medium flex items-center gap-1">
                    <span aria-hidden="true" className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <time suppressHydrationWarning>Aug 10, 2026</time>
                  </div>
                  <h4 className="text-[17px] leading-tight font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    Mastercrafts Workshop Concludes Successfully
                  </h4>
                  <p className="text-sm text-on-surface-variant line-clamp-2 mb-3 flex-grow">
                    Over 50 artisans from across the region participated in the two-week intensive workshop on traditional mask making.
                  </p>
                  <div className="text-primary text-sm font-semibold mt-auto inline-flex items-center">
                    Read More <span aria-hidden="true" className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </a>

              <a href="#" className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 group items-start bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant hover:border-primary hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary flex-1">
                <div className="w-full sm:w-2/5 lg:w-full xl:w-2/5 aspect-video sm:aspect-square lg:aspect-video xl:aspect-square rounded-xl overflow-hidden shrink-0 bg-primary-container flex items-center justify-center text-primary">
                  <span aria-hidden="true" className="material-symbols-outlined text-4xl">description</span>
                </div>
                <div className="flex flex-col justify-center flex-1 py-1 h-full">
                  <div className="text-xs text-on-surface-variant mb-2 font-medium flex items-center gap-1">
                    <span aria-hidden="true" className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <time suppressHydrationWarning>Aug 05, 2026</time>
                  </div>
                  <h4 className="text-[17px] leading-tight font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    Annual Report 2025-2026 Published
                  </h4>
                  <p className="text-sm text-on-surface-variant line-clamp-2 mb-3 flex-grow">
                    Detailed insights into the cultural programs, grants distributed, and strategic initiatives undertaken in the last fiscal year.
                  </p>
                  <div className="text-primary text-sm font-semibold mt-auto inline-flex items-center">
                    Read More <span aria-hidden="true" className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Information Categories Section */}
      <section className="w-full py-stack-lg md:py-24 bg-surface-container-lowest relative" id="information-categories">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h2 className="text-headline-lg font-headline-lg text-on-surface inline-block border-b-4 pb-2" style={{ borderColor: 'rgb(220, 38, 38)' }}>Information Categories</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Calendar of Events Card */}
            <a href="#" className="flex flex-row items-center bg-white p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0 mr-6 text-white group-hover:scale-105 transition-transform shadow-inner" style={{ backgroundColor: 'rgb(220, 38, 38)' }}>
                <span aria-hidden="true" className="material-symbols-outlined text-4xl">calendar_month</span>
              </div>
              <div className="flex flex-col flex-1 h-full justify-center">
                <h3 className="text-xl font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">Calendar of Events</h3>
                <p className="text-sm text-on-surface-variant mb-2">Latest Calendar of Events 2018</p>
                <div className="text-primary text-sm font-semibold flex items-center mt-auto">
                  View <span aria-hidden="true" className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </a>

            {/* Ad & Tenders Card */}
            <a href="#" className="flex flex-row items-center bg-white p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0 mr-6 text-white group-hover:scale-105 transition-transform shadow-inner" style={{ backgroundColor: 'rgb(220, 38, 38)' }}>
                <span aria-hidden="true" className="material-symbols-outlined text-4xl">campaign</span>
              </div>
              <div className="flex flex-col flex-1 h-full justify-center">
                <h3 className="text-xl font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">Ad & Tenders</h3>
                <p className="text-sm text-on-surface-variant mb-2">Advertisement & Tenders</p>
                <div className="text-primary text-sm font-semibold flex items-center mt-auto">
                  View <span aria-hidden="true" className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </a>

            {/* Annual Report Card */}
            <a href="#" className="flex flex-row items-center bg-white p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0 mr-6 text-white group-hover:scale-105 transition-transform shadow-inner" style={{ backgroundColor: 'rgb(220, 38, 38)' }}>
                <span aria-hidden="true" className="material-symbols-outlined text-4xl">description</span>
              </div>
              <div className="flex flex-col flex-1 h-full justify-center">
                <h3 className="text-xl font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">Annual Report</h3>
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
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] bg-[url('/images/tribal-hut-bg.png')] bg-[center_25%] bg-no-repeat bg-cover mix-blend-multiply"></div>

        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10 py-12">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h2 className="text-headline-lg font-headline-lg text-on-surface inline-block border-b-4 pb-2" style={{ borderColor: 'rgb(220, 38, 38)' }}>Upcoming Events</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <EventCard
              month="OCT" day="15"
              title="Hornbill Festival Prelude"
              location="Dimapur Cultural Ground, Nagaland"
              time="10:00 AM - 6:00 PM"
            />
            <EventCard
              month="NOV" day="02"
              title="Folk Music Symposium"
              location="Shillong Auditorium, Meghalaya"
              time="9:00 AM - 4:00 PM"
            />
            <EventCard
              month="DEC" day="12"
              title="Winter Handloom Expo"
              location="Guwahati Trade Center, Assam"
              time="11:00 AM - 8:00 PM"
            />
            <EventCard
              month="JAN" day="05"
              title="NEZCC Foundation Day"
              location="Headquarters, Dimapur"
              time="4:00 PM - 9:00 PM"
            />
          </div>
          <div className="mt-12 flex justify-center">
            <a className="group inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-label-md text-label-md font-semibold rounded-full hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:shadow-md" href="#">
              View All Events
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
