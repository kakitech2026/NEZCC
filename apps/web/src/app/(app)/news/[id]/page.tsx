import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Link from 'next/link';

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const payload = await getPayload({ config: configPromise });

  let article;
  try {
    article = await payload.findByID({
      collection: 'news',
      id,
    });
  } catch (error) {
    return notFound();
  }

  if (!article) {
    return notFound();
  }

  const recentUpdates = await payload.find({
    collection: 'news',
    where: {
      id: {
        not_equals: id,
      },
    },
    sort: '-publishedDate',
    limit: 3,
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const imageUrl = (article.featuredImage as any)?.url;

  return (
    <main className="flex-grow flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-on-background min-h-[35vh] flex items-center justify-center overflow-hidden pt-stack-lg">
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: "url('/images/hero/hero-pattern.png')", 
            backgroundRepeat: "repeat", 
            backgroundSize: "300px auto" 
          }} 
        />
        <div className="relative z-10 w-full max-w-container-max-width px-margin-mobile md:px-margin-desktop text-center flex flex-col items-center gap-stack-md py-stack-lg">
          <div className="inline-flex items-center gap-2 bg-saffron/20 text-saffron px-3 py-1 rounded-full border border-saffron/30 backdrop-blur-sm">
            <span className="material-symbols-outlined text-sm">campaign</span>
            <span className="text-label-md font-label-md uppercase tracking-wider">Latest Update</span>
          </div>
          <h1 className="text-headline-xl-mobile md:text-headline-xl font-headline-xl-mobile md:font-headline-xl text-on-primary max-w-4xl drop-shadow-md">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-on-primary-container text-body-md font-body-md drop-shadow-sm">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">calendar_today</span> 
              {formatDate(article.publishedDate)}
            </span>
          </div>
        </div>
        {/* Tricolor Accent */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#4cb748] z-20"></div>
      </section>

      {/* Content Container */}
      <section className="w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg relative z-20">
        <div className="bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant overflow-hidden">
          {/* Featured Image inside content card */}
          {imageUrl && (
            <div className="w-full h-[40vh] md:h-[50vh] lg:h-[60vh] bg-surface-container relative border-b border-outline-variant">
              <img 
                src={imageUrl} 
                alt={article.title as string} 
                className="w-full h-full object-cover object-center" 
              />
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter p-margin-mobile md:p-margin-desktop pt-8 md:pt-12">
            <aside className="lg:col-span-3 flex flex-col gap-stack-lg">
              <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant">
                <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-4 border-b border-outline-variant pb-2">
                  UPDATE DETAILS
                </h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex flex-col gap-1">
                    <span className="text-caption font-caption text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span> 
                      Published
                    </span>
                    <span className="text-body-md font-body-md text-on-surface font-semibold">
                      {formatDate(article.publishedDate)}
                    </span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-caption font-caption text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">category</span> 
                      Category
                    </span>
                    <span className="text-body-md font-body-md text-on-surface font-semibold">
                      News & Updates
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant">
                <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-4 border-b border-outline-variant pb-2">
                  SHARE
                </h3>
                <div className="flex gap-4">
                  <button aria-label="Share via Email" className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors border border-outline-variant">
                    <span className="material-symbols-outlined">mail</span>
                  </button>
                  <button aria-label="Share Link" className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors border border-outline-variant">
                    <span className="material-symbols-outlined">link</span>
                  </button>
                </div>
              </div>
            </aside>
            <article className="lg:col-span-9 prose prose-lg max-w-none text-on-surface font-body-lg text-body-lg 
              [&>h2]:text-headline-md [&>h2]:font-headline-md [&>h2]:text-on-surface [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:border-l-4 [&>h2]:border-saffron [&>h2]:pl-4
              [&>h3]:text-headline-md [&>h3]:font-headline-md [&>h3]:text-on-surface [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:border-l-4 [&>h3]:border-primary [&>h3]:pl-4
              [&>p]:mb-6 [&>p]:leading-relaxed
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6
              [&>blockquote]:bg-surface-container [&>blockquote]:p-6 [&>blockquote]:rounded-lg [&>blockquote]:border-l-4 [&>blockquote]:border-india-green [&>blockquote]:my-8 [&>blockquote]:not-italic">
              {article.content ? (
                <RichText data={article.content as any} />
              ) : (
                <p>{article.summary}</p>
              )}
            </article>
          </div>
        </div>
      </section>

      {/* Related Updates Section */}
      {recentUpdates.docs.length > 0 && (
        <section className="w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg border-t border-outline-variant">
          <div className="flex justify-between items-center mb-stack-md">
            <h2 className="text-headline-md font-headline-md text-on-surface">Recent Updates</h2>
            <Link href="/news" className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1">
              View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {recentUpdates.docs.map((item: any) => {
              const itemImageUrl = (item.featuredImage as any)?.url;
              return (
                <Link key={item.id} href={`/news/${item.id}`} className="group block bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-surface-variant relative overflow-hidden">
                    {itemImageUrl && (
                      <div 
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300" 
                        style={{ backgroundImage: `url('${itemImageUrl}')` }}
                      ></div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-caption font-caption text-on-surface-variant mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span> 
                      {formatDate(item.publishedDate)}
                    </div>
                    <h3 className="text-body-lg font-headline-md text-on-surface group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
