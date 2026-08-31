import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import NewsCard from '@/components/content/NewsCard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'News & Announcements | NEZCC',
  description: 'Latest news, updates, and announcements from the North East Zone Cultural Centre.',
};

export default async function NewsPage() {
  const payload = await getPayload({ config: configPromise });
  
  const newsResult = await payload.find({
    collection: 'news',
    sort: '-publishedDate',
    limit: 50,
  });
  
  const newsItems = newsResult.docs;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <main className="flex-grow w-full flex flex-col bg-[#f8f1e6] min-h-screen">
      {/* Header Section */}
      <section className="relative w-full pt-32 pb-16 overflow-hidden bg-[#16253a]">
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: "url('/images/hero/hero-pattern.png')", 
            backgroundRepeat: "repeat", 
            backgroundSize: "300px auto" 
          }} 
        />
        <div className="relative max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop z-10 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4 drop-shadow-md">
            News & <span className="text-[#df5f18]">Announcements</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Stay updated with the latest events, programs, and cultural initiatives from the North East Zone Cultural Centre.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          {newsItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((article) => (
                <NewsCard
                  key={article.id}
                  date={formatDate(article.publishedDate)}
                  title={article.title as string}
                  summary={article.summary as string}
                  imageSrc={(article.featuredImage as any)?.url}
                  imageAlt={article.title as string}
                  href={`/news/${article.id}`}
                  isPlaceholder={!((article.featuredImage as any)?.url)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl shadow-sm border border-outline-variant text-center">
              <span className="material-symbols-outlined text-6xl text-primary/40 mb-4">article</span>
              <h2 className="text-xl font-serif text-on-surface mb-2">No News Available</h2>
              <p className="text-on-surface-variant">Check back later for updates and announcements.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
