import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';
import { culturalAchievements } from '@/content/culturalAchievements';
import { culturalAchievementSummaries } from '@/content/culturalAchievementSummaries';
import ActivityPhoto from './ActivityPhoto';

export const dynamic = 'force-dynamic';

const annualPhotoFiles: Record<string, readonly string[]> = {
  '2014-2015': ['2014-15 (1).webp', '2014-15 (2).webp'],
  '2015-2016': ['2015-16 (1).webp', '2015-16 (2).webp'],
  '2016-2017': ['2016-17 (1).webp', '2016-17 (2).webp'],
  '2017-2018': ['2017–18 (1).webp', '2017–18 (2).webp'],
  '2018-2019': ['2018–19 (1).webp', '2018–19 (2).webp'],
  '2019-2020': ['2019–20 (1).webp', '2019–20 (2).webp'],
  '2020-2021': ['2020–21 (1).webp', '2020–21 (2).webp'],
  '2021-2022': ['2021–22 (1).webp', '2021–22 (2).webp'],
  '2022-2023': ['2022–23 (1).webp', '2022–23 (2).webp'],
  '2023-2024': ['2023–24 (1).webp', '2023–24 (2).webp'],
  '2024-2025': ['2024–25 (1).webp', '2024–25 (2).webp'],
};

function CulturalAchievementsGallery() {
  return (
    <section id="cultural-achievements" className="bg-surface py-stack-lg md:py-16">
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mx-auto max-w-5xl divide-y divide-outline-variant">
          {culturalAchievements.map(({ year, content }) => {
            const paragraphs = content
              .split(/\n{2,}|\n(?=\s*\d+[.)]\s)/)
              .filter((paragraph) => paragraph.trim().length > 0);
            const annualSummary = culturalAchievementSummaries[year];
            const photoFiles = annualPhotoFiles[year]
              ?? annualSummary.highlights.map((_, index) => `${year}-photo-${index + 1}.webp`);

            return (
              <article key={year} className="py-stack-lg first:pt-0">
                <h3 className="mb-stack-md text-center font-serif font-medium text-headline-md text-primary">
                  {year.replace('-', '–')}
                </h3>
                <p className="mx-auto max-w-4xl text-center font-body-lg text-body-lg text-on-surface-variant">
                  {annualSummary.summary}
                </p>

                <div className="mt-stack-lg grid gap-gutter md:grid-cols-2">
                  {annualSummary.highlights.map((highlight, highlightIndex) => (
                    <div key={`${year}-highlight-${highlightIndex}`} className="rounded-lg border border-outline-variant bg-surface-container-lowest p-stack-md">
                      <h4 className="font-serif font-medium text-headline-sm text-on-surface mb-2">
                        {highlight.title}
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-stack-lg border-t border-outline-variant pt-stack-md">
                  <p className="mb-stack-sm font-label-md text-label-md text-on-surface-variant">
                    Photos from this year
                  </p>
                  <div className="grid gap-gutter sm:grid-cols-2">
                    {photoFiles.map((filename, photoIndex) => (
                      <ActivityPhoto
                        key={`${year}-photo-${photoIndex}`}
                        filename={filename}
                        className="aspect-[16/10] w-full"
                      />
                    ))}
                  </div>
                </div>

                <details className="mt-stack-lg rounded-lg border border-outline-variant bg-surface-container-lowest">
                  <summary className="cursor-pointer px-stack-md py-3 font-label-md text-label-md text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
                    Read full programme record
                  </summary>
                  <div className="border-t border-outline-variant px-stack-md py-stack-md space-y-stack-sm">
                    {paragraphs.map((paragraph, paragraphIndex) => {
                      if (/^\*{5,}$/.test(paragraph.trim())) {
                        return <hr key={`${year}-divider-${paragraphIndex}`} className="border-outline-variant" />;
                      }

                      return (
                        <p key={`${year}-paragraph-${paragraphIndex}`} className="font-body-md text-body-md text-on-surface-variant whitespace-pre-line break-words">
                          {paragraph.split(/(https?:\/\/[^\s]+)/g).map((part, partIndex) =>
                            /^https?:\/\//.test(part) ? (
                              <a
                                key={`${year}-link-${paragraphIndex}-${partIndex}`}
                                href={part}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="text-primary underline underline-offset-2 break-all"
                              >
                                {part}
                              </a>
                            ) : (
                              part
                            ),
                          )}
                        </p>
                      );
                    })}
                  </div>
                </details>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
  const featuredActivityImageUrl = featuredActivity && typeof featuredActivity.coverImage === 'object' && featuredActivity.coverImage !== null
    ? featuredActivity.coverImage.url
    : '';

  return (
    <main className="w-full ">
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-16 md:pt-24 pb-stack-lg">
        <div className="max-w-3xl">
          <h1 className="font-serif font-medium md:font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-surface mb-stack-md">Highlights of the Activities</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            A 12-year record of NEZCC programmes, performances and cultural exchange across North East India.
          </p>
        </div>
      </section>

      <CulturalAchievementsGallery />

      {/* Featured Activity Hero */}
      {featuredActivity && (
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg">
        <div className="relative rounded-xl overflow-hidden bg-surface-container shadow-sm border border-outline-variant flex flex-col md:flex-row min-h-[400px]">
          <div className="md:w-2/3 relative h-64 md:h-auto">
            {featuredActivityImageUrl ? (
              <img className="absolute inset-0 w-full h-full object-cover" src={featuredActivityImageUrl} alt={featuredActivity.title} />
            ) : (
              <ActivityPhoto filename="featured-activity.webp" className="absolute inset-0 h-full w-full rounded-none" />
            )}
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
            <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface shadow-sm transition-shadow hover:shadow-md">
              <ActivityPhoto filename="folk-festivals.webp" className="aspect-[4/3] w-full rounded-none" />
              <div className="p-stack-md">
                <h3 className="font-label-md text-label-md text-on-surface mb-2">Folk Festivals</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">Celebrating regional traditions and performing arts.</p>
              </div>
            </div>
            {/* Category Card 2 */}
            <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface shadow-sm transition-shadow hover:shadow-md">
              <ActivityPhoto filename="craft-fairs.webp" className="aspect-[4/3] w-full rounded-none" />
              <div className="p-stack-md">
                <h3 className="font-label-md text-label-md text-on-surface mb-2">Craft Fairs</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">Showcasing indigenous handicrafts and handlooms.</p>
              </div>
            </div>
            {/* Category Card 3 */}
            <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface shadow-sm transition-shadow hover:shadow-md">
              <ActivityPhoto filename="workshops-seminars.webp" className="aspect-[4/3] w-full rounded-none" />
              <div className="p-stack-md">
                <h3 className="font-label-md text-label-md text-on-surface mb-2">Workshops & Seminars</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">Skill development and cultural preservation discussions.</p>
              </div>
            </div>
            {/* Category Card 4 */}
            <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface shadow-sm transition-shadow hover:shadow-md">
              <ActivityPhoto filename="exhibitions.webp" className="aspect-[4/3] w-full rounded-none" />
              <div className="p-stack-md">
                <h3 className="font-label-md text-label-md text-on-surface mb-2">Exhibitions</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">Curated displays of tribal artifacts and fine arts.</p>
              </div>
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
                  {imageUrl ? (
                    <img className="absolute inset-0 w-full h-full object-cover" src={imageUrl} alt={activity.title} />
                  ) : (
                    <ActivityPhoto
                      filename={`activity-${activity.slug || activity.id}.webp`}
                      className="absolute inset-0 h-full w-full rounded-none"
                    />
                  )}
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
