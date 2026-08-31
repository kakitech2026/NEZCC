import { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Annual Reports | North East Zone Cultural Centre",
  description: "Upholding transparency and institutional accountability. Explore our comprehensive annual reports.",
};

export default async function AnnualReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams.query === 'string' ? resolvedSearchParams.query : '';
  const filterYear = typeof resolvedSearchParams.filterYear === 'string' ? resolvedSearchParams.filterYear : 'all';

  const payload = await getPayloadClient();
  
  // Fetch global settings
  const pageSettings = await payload.findGlobal({
    slug: 'annual-reports-page',
  });

  const heroTitle = pageSettings.heroTitle || "Annual Reports";
  const heroDescription = pageSettings.heroDescription || "Upholding transparency and institutional accountability. Explore our comprehensive annual reports detailing cultural initiatives, financial statements, and regional impact across the North East Zone.";

  // Build where clause
  const where: any = {};
  const andConditions: any[] = [];

  if (query) {
    andConditions.push({
      or: [
        { title: { like: query } },
        { description: { like: query } },
        { financialYear: { like: query } },
      ]
    });
  }

  // Handle year filtering logic based on hardcoded groups
  if (filterYear === '2020 - Present') {
    andConditions.push({ publishedDate: { greater_than_equal: '2020-01-01' } });
  } else if (filterYear === '2015 - 2019') {
    andConditions.push({ publishedDate: { greater_than_equal: '2015-01-01' } });
    andConditions.push({ publishedDate: { less_than: '2020-01-01' } });
  } else if (filterYear === 'Pre-2015') {
    andConditions.push({ publishedDate: { less_than: '2015-01-01' } });
  }

  if (andConditions.length > 0) {
    where.and = andConditions;
  }

  // Fetch Reports
  const reportsResult = await payload.find({
    collection: "annual-reports",
    where,
    sort: "-publishedDate",
    limit: 100,
  });
  
  const allReports = reportsResult.docs;
  
  const featuredReport = allReports.length > 0 ? allReports[0] : null;
  const previousReports = allReports.length > 1 ? allReports.slice(1) : [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const featuredCoverImageURL = featuredReport &&
    typeof featuredReport.coverImage === 'object' &&
    featuredReport.coverImage !== null
      ? featuredReport.coverImage.url
      : null;

  return (
    <main className="flex-grow w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg ">
      {/* Hero Section */}
      <section className="mb-stack-lg text-center md:text-left">
        <h1 className="font-serif font-medium md:font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-background mb-stack-sm">
          {heroTitle}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl whitespace-pre-wrap">
          {heroDescription}
        </p>
      </section>

      {/* Search and Filter */}
      <section className="mb-stack-lg bg-surface-container-low p-stack-md rounded-lg border border-outline-variant">
        <form action="/publications/annual-reports" method="GET" className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/2 relative">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline"
              aria-hidden="true"
            >
              search
            </span>
            <input
              name="query"
              defaultValue={query}
              className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded font-body-md focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none min-h-[44px]"
              placeholder="Search reports by keyword or year..."
              type="text"
            />
          </div>
          <div className="w-full md:w-auto flex items-center gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant whitespace-nowrap">
              Filter by Year:
            </label>
            <select 
              name="filterYear"
              defaultValue={filterYear}
              className="w-full md:w-auto px-4 py-3 border border-outline-variant rounded font-body-md focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none min-h-[44px] bg-surface-container-lowest"
            >
              <option value="all">All Years</option>
              <option value="2020 - Present">2020 - Present</option>
              <option value="2015 - 2019">2015 - 2019</option>
              <option value="Pre-2015">Pre-2015</option>
            </select>
            <button type="submit" className="bg-primary text-on-primary px-6 py-3 rounded font-label-md hover:bg-primary/90 transition-colors h-[44px]">
              Filter
            </button>
          </div>
        </form>
      </section>

      {/* Featured Report */}
      {featuredReport && (
        <section className="mb-stack-lg bg-surface-container-lowest border border-outline-variant shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {featuredCoverImageURL && (
              <div className="md:w-1/3 bg-surface-container-low p-stack-md flex justify-center items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={featuredReport.title}
                  className="max-w-[200px] w-full h-auto shadow-md rounded border border-outline-variant object-cover aspect-[3/4]"
                  src={featuredCoverImageURL}
                />
              </div>
            )}
            
            <div className={`p-6 md:p-8 flex-1 flex ${featuredCoverImageURL ? 'flex-col justify-center' : 'flex-col md:flex-row md:items-center md:justify-between gap-6'}`}>
              
              <div className={featuredCoverImageURL ? '' : 'flex-1'}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-saffron text-white font-label-md text-label-md px-2 py-1 rounded text-xs uppercase tracking-wider">
                    Latest
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {featuredReport.financialYear}
                  </span>
                </div>
                <h2 className={`font-serif font-medium text-headline-lg text-on-background ${featuredCoverImageURL ? 'mb-4' : 'mb-2'}`}>
                  {featuredReport.title}
                </h2>
                <p className={`font-body-md text-body-md text-on-surface-variant line-clamp-3 ${featuredCoverImageURL ? 'mb-6' : ''}`}>
                  {featuredReport.description}
                </p>
              </div>

              <div className={`flex flex-wrap gap-4 ${featuredCoverImageURL ? 'items-center' : 'flex-col w-full md:w-auto shrink-0 md:items-stretch'}`}>
                <a 
                  href={typeof featuredReport.document === 'object' && featuredReport.document?.url ? featuredReport.document.url : '#'} 
                  download
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-center gap-2 bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded hover:bg-primary transition-colors border-2 border-transparent focus:border-on-primary focus:ring-2 focus:ring-primary-container min-h-[44px] ${featuredCoverImageURL ? '' : 'w-full'}`}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">download</span>
                  Download PDF
                </a>
                <a 
                  href={typeof featuredReport.document === 'object' && featuredReport.document?.url ? featuredReport.document.url : '#'}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-center gap-2 text-primary border-2 border-primary font-label-md text-label-md px-6 py-3 rounded hover:bg-surface-container-low transition-colors min-h-[44px] ${featuredCoverImageURL ? '' : 'w-full'}`}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">visibility</span>
                  View Online
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Chronological Archive */}
      {previousReports.length > 0 && (
        <section>
          <h3 className="font-serif font-medium text-headline-md text-on-background mb-stack-md border-b border-outline-variant pb-2">
            Previous Reports
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {previousReports.map((report) => (
              <div key={report.id} className="bg-surface-container-lowest border border-outline-variant shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-lg p-stack-md flex gap-4 hover:shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-shadow">
                <div className="w-20 shrink-0 bg-surface-container-low rounded border border-outline-variant flex items-center justify-center overflow-hidden">
                  {typeof report.coverImage === 'object' && report.coverImage?.url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={report.coverImage.url} 
                      alt={report.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-4xl text-primary opacity-50" aria-hidden="true">
                      description
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="font-label-md text-label-md text-on-background font-medium mb-1 line-clamp-2">
                      {report.title}
                    </h4>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Published: {formatDate(report.publishedDate)}
                    </p>
                  </div>
                  <a
                    className="text-primary hover:text-tertiary-container font-label-md text-label-md flex items-center gap-1 mt-2 w-max"
                    href={typeof report.document === 'object' && report.document?.url ? report.document.url : '#'}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">download</span>{" "}
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {allReports.length === 0 && (
        <div className="text-center py-12 text-on-surface-variant">
          No annual reports found matching your criteria.
        </div>
      )}
    </main>
  );
}
