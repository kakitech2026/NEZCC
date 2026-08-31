import { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";

type NoticeItem = {
  noticeText?: string | null;
  noticeLink?: string | null;
};

export const metadata: Metadata = {
  title: "Advertisement & Tenders | North East Zone Cultural Centre",
  description: "Official portal for North East Zone Cultural Centre procurements and announcements.",
};

export default async function TendersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams.query === 'string' ? resolvedSearchParams.query : '';
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : '';

  const payload = await getPayloadClient();
  
  // Fetch global settings
  const pageSettings = await payload.findGlobal({
    slug: 'tenders-page',
  });

  // Fetch all tender categories
  const categoriesResult = await payload.find({
    collection: 'tender-categories',
    limit: 100, // Assuming we won't have more than 100 categories
  });
  const allCategories = categoriesResult.docs;

  // Base where clause for main list
  const mainWhere: any = {};
  
  // Add search query filter if exists
  if (query) {
    mainWhere.or = [
      { title: { like: `%${query}%` } },
      { referenceId: { like: `%${query}%` } },
    ];
  }
  
  // Add category dropdown filter if selected
  if (category && category !== 'all') {
    // If a specific category is selected, it overrides the 'not_in' sidebar exclusion
    mainWhere.category = { equals: category };
  }

  // Fetch Main Tenders
  const tendersResult = await payload.find({
    collection: "tenders",
    where: mainWhere,
    sort: "-releaseDate",
    limit: 10,
  });
  
  const tenders = tendersResult.docs;

  // Extract Global Settings with defaults
  const heroTitle = pageSettings.heroTitle || "Advertisement & Tenders";
  const heroDescription = pageSettings.heroDescription || "Welcome to the official portal for North East Zone Cultural Centre procurements and announcements. We are committed to transparency, efficiency, and fair competition in all our procedures.";
  const heroImageUrl = typeof pageSettings.heroImage === 'object' && pageSettings.heroImage?.url 
    ? pageSettings.heroImage.url 
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuAnh1XbqgaPDEmk1nGHaTJ2zguDQI6mQYtdBjqJ_Asz9u3ASIJmUIcPMPX91C4EOt2adlw6QXIQeEcZys3ZRYD7gxI17M_83oN0YIdIq0X_acFjd6tCsVKHboFGX1R5NbH3cKrZTelrPqP8Cfxj5JW5DHxYPFDX0AJd-MzcimOcH2p7HxDv1eO4vMQV4uOeYRVHz8dZGUQslXz-Ej-8Hjg1uqqd5HCFjx5vYH8rKQngIO8huhwh5-pvUw";
    
  const contactTitle = pageSettings.contactTitle || "Need Help?";
  const contactPhone = pageSettings.contactPhone || "";
  const contactEmail = pageSettings.contactEmail || "";
  
  const noticesTitle = pageSettings.noticesTitle || "Important Notices & Updates";
  const noticesList = (pageSettings.noticesList || []) as NoticeItem[];

  return (
    <main className="flex-grow px-margin-mobile md:px-gutter pt-12 md:pt-16 pb-stack-lg w-full overflow-hidden max-w-container-max-width mx-auto ">
      {/* Hero Section */}
      <section className="mb-stack-lg relative rounded-2xl overflow-hidden shadow-sm border border-outline-variant bg-surface-container-lowest">
        <div
          className="absolute inset-0 bg-cover bg-center right-0 md:w-2/3 md:left-auto"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        />
        {/* Gradient overlay to ensure text is readable on the left, fading out to the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/90 to-transparent" />
        
        <div className="relative p-8 md:p-12 z-10">
          <h2 className="font-serif font-medium md:font-serif font-medium text-on-background mb-4 text-primary drop-shadow-sm">
            {heroTitle}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl whitespace-pre-wrap drop-shadow-sm">
            {heroDescription}
          </p>
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Left/Main Column: Opportunities & Recruitment */}
        <div className="lg:col-span-2 space-y-stack-lg">
          {/* Current Opportunities (Bento/Card layout) */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif font-medium text-headline-lg text-on-background flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" aria-hidden="true">
                  campaign
                </span>
                Advertisements & Tenders
              </h3>
            </div>
            
            {/* Search/Filter Bar */}
            <form action="/tenders" method="GET" className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline" aria-hidden="true">
                  search
                </span>
                <input
                  name="query"
                  defaultValue={query}
                  className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-container transition-all font-body-md text-body-md text-on-surface"
                  placeholder="Search Tender ID or Title..."
                  type="text"
                />
              </div>
              <div className="flex gap-2">
                <select 
                  name="category"
                  defaultValue={category || 'all'}
                  className="bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-container"
                >
                  <option value="all">All Categories</option>
                  {allCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
                <button type="submit" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary/90 transition-colors">
                  Search
                </button>
              </div>
            </form>
            
            {/* Tender List */}
            <div className="space-y-4">
              {tenders.length === 0 ? (
                <div className="text-center py-8 text-on-surface-variant">No active tenders found matching your criteria.</div>
              ) : (
                tenders.map((tender) => {
                  const isActive = tender.status === 'active' || tender.status === 'closing_soon';
                  const statusColor = tender.status === 'active' ? 'text-green-600' : tender.status === 'closing_soon' ? 'text-amber-600' : 'text-gray-600';
                  const barColor = tender.status === 'active' ? 'bg-green-500' : tender.status === 'closing_soon' ? 'bg-amber-500' : 'bg-gray-500';
                  
                  return (
                    <div key={tender.id} className="bg-white/80 backdrop-blur-md rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden group border border-white/30">
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${barColor}`} />
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            {tender.referenceId && (
                              <span className="bg-surface-container-high text-on-surface-variant font-caption text-caption px-2 py-1 rounded">
                                ID: {tender.referenceId}
                              </span>
                            )}
                            <span className={`flex items-center gap-1 font-caption text-caption ${statusColor}`}>
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "14px" }}
                                aria-hidden="true"
                              >
                                {tender.status === 'active' ? 'check_circle' : tender.status === 'closing_soon' ? 'schedule' : 'archive'}
                              </span>{" "}
                              {tender.status === 'active' ? 'Active' : tender.status === 'closing_soon' ? 'Closing Soon' : 'Closed'}
                            </span>
                          </div>
                          <h4 className="font-serif font-medium text-body-lg font-semibold text-on-background mb-2 group-hover:text-primary transition-colors">
                            {tender.title}
                          </h4>
                          <div className="flex flex-wrap gap-4 font-caption text-caption text-on-surface-variant">
                            <span className="flex items-center gap-1">
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "16px" }}
                                aria-hidden="true"
                              >
                                calendar_today
                              </span>{" "}
                              Release: {new Date(tender.releaseDate).toLocaleDateString()}
                            </span>
                            {tender.closingDate && (
                              <span className={`flex items-center gap-1 ${tender.status === 'closing_soon' ? 'font-semibold text-amber-700' : ''}`}>
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "16px" }}
                                  aria-hidden="true"
                                >
                                  event_busy
                                </span>{" "}
                                Closing: {new Date(tender.closingDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                          <a 
                            href={typeof tender.document === 'object' && tender.document !== null && tender.document.url ? tender.document.url : '#'} 
                            target="_blank"
                            rel="noreferrer"
                            download
                            className="flex items-center gap-2 text-primary hover:text-primary-container font-label-md text-label-md bg-surface border border-primary px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                          >
                            <span className="material-symbols-outlined" aria-hidden="true">download</span>{" "}
                            Document
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-stack-lg">
          {/* Contact Information Box */}
          <aside className="bg-primary-container text-on-primary rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
              <span className="material-symbols-outlined text-6xl" aria-hidden="true">contact_support</span>
            </div>
            <h3 className="font-serif font-medium text-headline-md mb-4 relative z-10 flex items-center gap-2">
              <span className="material-symbols-outlined" aria-hidden="true">live_help</span>
              {contactTitle}
            </h3>
            <div className="relative z-10 space-y-4">
              {contactPhone && (
                <div>
                  <p className="font-label-sm text-label-sm opacity-80 uppercase tracking-wider mb-1">Phone</p>
                  <a href={`tel:${contactPhone}`} className="font-body-md hover:underline hover:text-secondary-fixed transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">call</span>
                    {contactPhone}
                  </a>
                </div>
              )}
              {contactEmail && (
                <div>
                  <p className="font-label-sm text-label-sm opacity-80 uppercase tracking-wider mb-1">Email</p>
                  <a href={`mailto:${contactEmail}`} className="font-body-md hover:underline hover:text-secondary-fixed transition-colors flex items-center gap-2 break-all">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">mail</span>
                    {contactEmail}
                  </a>
                </div>
              )}
            </div>
          </aside>
          
          {/* Important Notices Box */}
          <aside className="border border-outline-variant rounded-2xl bg-surface overflow-hidden shadow-sm">
            <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant">
              <h3 className="font-serif font-medium text-body-lg font-semibold text-on-background flex items-center gap-2">
                <span className="material-symbols-outlined text-error" aria-hidden="true">notification_important</span>
                {noticesTitle}
              </h3>
            </div>
            <div className="p-0">
              {noticesList && noticesList.length > 0 ? (
                <ul className="divide-y divide-outline-variant">
                  {noticesList.map((notice: NoticeItem, idx: number) => (
                    <li key={idx} className="p-4 hover:bg-surface-container-lowest transition-colors">
                      {notice.noticeLink ? (
                        <a href={notice.noticeLink} target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                          <span className="material-symbols-outlined text-secondary mt-0.5 text-[20px] group-hover:text-primary transition-colors" aria-hidden="true">campaign</span>
                          <div>
                            <p className="font-body-md text-on-surface group-hover:text-primary transition-colors">
                              {notice.noticeText}
                            </p>
                            <p className="font-caption text-caption text-primary flex items-center gap-1 mt-1 group-hover:underline">
                              View Details
                              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">arrow_forward</span>
                            </p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-secondary mt-0.5 text-[20px]" aria-hidden="true">info</span>
                          <p className="font-body-md text-on-surface">
                            {notice.noticeText}
                          </p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center text-on-surface-variant font-body-sm">
                  No new notices at this time.
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
