import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Library | North East Zone Cultural Centre',
  description: 'Preserving the written heritage and cultural wisdom of North East India.',
}

type LinkedMedia = {
  alt?: string | null
  url?: string | null
}

type LibraryCategory = {
  id: string
  title: string
  slug: string
  description?: string | null
  icon?: string | null
}

type LibraryResource = {
  id: string
  author?: string | null
  category?: string | LibraryCategory | null
  coverImage?: string | LinkedMedia | null
  description: string
  document?: string | LinkedMedia | null
  externalURL?: string | null
  isFeatured?: boolean | null
  publishedDate?: string | null
  resourceType: string
  title: string
}

const fallbackCategories: LibraryCategory[] = [
  { id: 'rare-manuscripts', title: 'Rare Manuscripts', slug: 'rare-manuscripts', description: 'Primary source materials, indigenous scripts, and historical documents.', icon: 'history_edu' },
  { id: 'folk-literature', title: 'Folk Literature', slug: 'folk-literature', description: 'Myths, legends, and oral traditions from the eight member states.', icon: 'diversity_3' },
  { id: 'digital-archives', title: 'Digital Archives', slug: 'digital-archives', description: 'Digitized photographs, recordings, scans, and cultural documentation.', icon: 'computer' },
  { id: 'research-papers', title: 'Research Papers', slug: 'research-papers', description: 'Scholarly resources connected to regional culture and heritage.', icon: 'school' },
  { id: 'periodicals-journals', title: 'Periodicals and Journals', slug: 'periodicals-journals', description: 'Serial publications, journals, and recurring cultural literature.', icon: 'auto_stories' },
]

const formatDate = (dateString?: string | null) => {
  if (!dateString) return null
  return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

const getMedia = (media?: string | LinkedMedia | null, fallbackURL?: string | null, fallbackAlt?: string | null) => {
  if (typeof media === 'object' && media?.url) {
    return { alt: media.alt || fallbackAlt || '', url: media.url }
  }

  return fallbackURL ? { alt: fallbackAlt || '', url: fallbackURL } : null
}

const getResourceURL = (resource: LibraryResource) => {
  if (typeof resource.document === 'object' && resource.document?.url) return resource.document.url
  return resource.externalURL || null
}

const getCategoryTitle = (category?: string | LibraryCategory | null) => {
  if (typeof category === 'object' && category?.title) return category.title
  return 'Library Resource'
}

const getCategorySlug = (category?: string | LibraryCategory | null) => {
  if (typeof category === 'object' && category?.slug) return category.slug
  return null
}

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const query = typeof resolvedSearchParams.query === 'string' ? resolvedSearchParams.query.trim() : ''
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : 'all'

  const payload = await getPayloadClient()
  const [page, categoriesResult] = await Promise.all([
    payload.findGlobal({ slug: 'library-page', depth: 1 }),
    payload.find({ collection: 'library-categories', sort: 'title', limit: 100 }),
  ])

  const andConditions: any[] = []

  if (query) {
    andConditions.push({
      or: [
        { title: { like: query } },
        { description: { like: query } },
        { author: { like: query } },
      ],
    })
  }

  if (category !== 'all') {
    andConditions.push({
      'category.slug': {
        equals: category,
      },
    })
  }

  const resourcesResult = await payload.find({
    collection: 'library-resources',
    depth: 1,
    limit: 100,
    sort: '-isFeatured,-publishedDate,-createdAt',
    where: andConditions.length > 0 ? { and: andConditions } : undefined,
  })

  const categories = categoriesResult.docs.length > 0 ? (categoriesResult.docs as LibraryCategory[]) : fallbackCategories
  const resources = resourcesResult.docs as LibraryResource[]
  const heroImage = getMedia(page.heroImage as string | LinkedMedia | null, page.heroImageURL, page.heroImageAlt)
  const aboutImage = getMedia(page.aboutImage as string | LinkedMedia | null, page.aboutImageURL, page.aboutImageAlt)

  return (
    <main className="flex-grow flex flex-col">
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {heroImage ? (
          <img alt={heroImage.alt} className="absolute inset-0 w-full h-full object-cover" src={heroImage.url} />
        ) : (
          <div className="absolute inset-0 bg-[#16253a]" />
        )}
        <div className="absolute inset-0 bg-inverse-surface/70" />

        <div className="relative z-10 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center md:text-left flex flex-col items-center md:items-start gap-stack-md">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low text-primary-container font-label-md text-label-md rounded-full border border-primary-container/20 shadow-sm backdrop-blur-sm bg-opacity-80">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">menu_book</span>
            {page.heroEyebrow}
          </span>
          <h1 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-primary max-w-3xl leading-tight">{page.heroTitle}</h1>
          <p className="font-body-lg text-body-lg text-inverse-on-surface max-w-2xl mt-stack-sm md:mt-0 whitespace-pre-wrap">{page.heroDescription}</p>
          <div className="mt-stack-md flex flex-wrap gap-stack-sm justify-center md:justify-start">
            <a className="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded flex items-center gap-2 border-2 border-transparent focus:border-on-primary hover:bg-on-primary-fixed-variant transition-colors min-h-[44px]" href="#search-catalogue">
              <span className="material-symbols-outlined" aria-hidden="true">search</span>
              Search Catalogue
            </a>
            <a className="bg-transparent text-on-primary font-label-md text-label-md px-6 py-3 rounded flex items-center gap-2 border-2 border-on-primary hover:bg-on-primary/10 transition-colors min-h-[44px]" href="#collections">
              Explore Collections
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 flex">
          <div className="w-1/3 bg-primary-container h-full" />
          <div className="w-1/3 bg-saffron h-full" />
          <div className="w-1/3 bg-eco-green h-full" />
        </div>
      </section>

      <section className="py-stack-lg md:py-16 bg-surface px-margin-mobile md:px-margin-desktop" id="about">
        <div className="max-w-container-max-width mx-auto flex flex-col md:flex-row gap-gutter items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-stack-md">
            <div className="flex items-center gap-2 text-primary font-label-md text-label-md uppercase tracking-wider">
              <span className="w-8 h-[2px] bg-primary" />
              {page.aboutEyebrow}
            </div>
            <h2 className="font-serif font-medium text-headline-lg text-on-surface">{page.aboutTitle}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap">{page.aboutDescription}</p>
            <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap">{page.aboutDetails}</p>
            {page.features && page.features.length > 0 && (
              <ul className="flex flex-col gap-2 mt-2">
                {page.features.map((feature: { id?: string | null; text: string }) => (
                  <li className="flex items-start gap-2" key={feature.id || feature.text}>
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">check_circle</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">{feature.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {aboutImage && (
            <div className="w-full md:w-1/2 mt-stack-lg md:mt-0">
              <div className="relative rounded-lg p-2 bg-surface-container-low border border-outline-variant shadow-sm">
                <img className="w-full h-auto aspect-[4/3] object-cover rounded shadow-sm border border-outline-variant/50" alt={aboutImage.alt} src={aboutImage.url} />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-stack-lg md:py-16 bg-surface-container-lowest px-margin-mobile md:px-margin-desktop border-t border-outline-variant" id="collections">
        <div className="max-w-container-max-width mx-auto flex flex-col gap-stack-lg">
          <div className="text-center flex flex-col items-center gap-2">
            <h2 className="font-serif font-medium text-headline-lg text-on-surface">{page.collectionsTitle}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl whitespace-pre-wrap">{page.collectionsDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {categories.map((item) => (
              <Link className="group relative overflow-hidden rounded-lg border border-outline-variant bg-surface-container hover:shadow-md transition-shadow duration-300 p-stack-md flex flex-col gap-3 min-h-[190px]" href={`/library?category=${item.slug}#search-catalogue`} key={item.id}>
                <div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center text-primary-container border border-outline-variant/50 group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined" aria-hidden="true">{item.icon || 'menu_book'}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-label-md text-label-md font-medium text-on-surface mb-1">{item.title}</h3>
                  {item.description && <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-3">{item.description}</p>}
                </div>
                <span className="text-primary font-label-md text-label-md flex items-center gap-1 group-hover:underline">
                  Browse Collection <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-stack-lg bg-surface-container-low px-margin-mobile md:px-margin-desktop border-y border-outline-variant" id="search-catalogue">
        <div className="max-w-container-max-width mx-auto flex flex-col gap-stack-md">
          <div className="flex flex-col gap-2 items-center text-center">
            <span className="material-symbols-outlined text-primary-container text-5xl" aria-hidden="true">search_insights</span>
            <h2 className="font-serif font-medium text-headline-md text-on-surface">{page.catalogueTitle}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap">{page.catalogueDescription}</p>
          </div>

          <form action="/library" className="bg-surface-container-lowest p-1 rounded-lg border border-outline-variant shadow-sm flex flex-col sm:flex-row gap-2 mt-stack-sm focus-within:border-primary-container focus-within:ring-2 focus-within:ring-primary-container/20 transition-all">
            <div className="relative sm:w-1/3 flex items-center border-b sm:border-b-0 sm:border-r border-outline-variant/50">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant" aria-hidden="true">category</span>
              <select className="w-full pl-10 pr-8 py-3 bg-transparent border-none text-on-surface font-body-md text-body-md focus:ring-0 cursor-pointer appearance-none" defaultValue={category} name="category">
                <option value="all">All Categories</option>
                {categories.map((item) => <option key={item.id} value={item.slug}>{item.title}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-3 text-on-surface-variant pointer-events-none" aria-hidden="true">arrow_drop_down</span>
            </div>
            <div className="relative flex-grow flex items-center">
              <input className="w-full pl-4 pr-4 py-3 bg-transparent border-none text-on-surface font-body-md text-body-md focus:ring-0 placeholder-on-surface-variant/70" defaultValue={query} name="query" placeholder="Search by title, author, or keyword..." type="text" />
            </div>
            <button className="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded sm:rounded-md flex items-center justify-center gap-2 hover:bg-on-primary-fixed-variant transition-colors min-h-[44px]" type="submit">
              <span className="material-symbols-outlined" aria-hidden="true">search</span>
              Search
            </button>
          </form>

          {resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mt-stack-md">
              {resources.map((resource) => {
                const cover = getMedia(resource.coverImage, null, resource.title)
                const resourceURL = getResourceURL(resource)
                const date = formatDate(resource.publishedDate)
                const categorySlug = getCategorySlug(resource.category)

                return (
                  <article className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm flex flex-col gap-4" key={resource.id}>
                    <div className="flex gap-4">
                      <div className="w-20 h-28 shrink-0 bg-surface-container-low rounded border border-outline-variant flex items-center justify-center overflow-hidden">
                        {cover ? <img alt={cover.alt} className="w-full h-full object-cover" src={cover.url} /> : <span className="material-symbols-outlined text-4xl text-primary opacity-60" aria-hidden="true">description</span>}
                      </div>
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md text-primary uppercase tracking-wide text-xs">{getCategoryTitle(resource.category)}</p>
                        <h3 className="font-serif font-medium text-headline-md text-on-surface text-xl line-clamp-2">{resource.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-caption text-caption text-on-surface-variant">
                          {resource.author && <span>{resource.author}</span>}
                          {date && <span>{date}</span>}
                        </div>
                      </div>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 flex-grow">{resource.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {resourceURL ? (
                        <a className="inline-flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded font-label-md text-label-md hover:bg-primary/90" href={resourceURL} rel="noreferrer" target="_blank">
                          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">open_in_new</span>
                          Open Resource
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-on-surface-variant px-4 py-2 rounded border border-outline-variant font-label-md text-label-md">File pending</span>
                      )}
                      {categorySlug && (
                        <Link className="inline-flex items-center gap-2 text-primary px-4 py-2 rounded border border-primary font-label-md text-label-md hover:bg-surface-container-low" href={`/library?category=${categorySlug}#search-catalogue`}>
                          Related
                        </Link>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="mt-stack-md p-10 text-center bg-surface-container-lowest border border-dashed border-outline-variant rounded-lg">
              <p className="font-body-md text-body-md text-on-surface-variant">No library resources found. Add publications and documents from the admin panel.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
