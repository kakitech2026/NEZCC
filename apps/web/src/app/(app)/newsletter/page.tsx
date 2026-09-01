import type { Metadata } from 'next'
import NewsletterSubscribeForm from '@/components/newsletter/NewsletterSubscribeForm'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Newsletter | North East Zone Cultural Centre',
  description: 'Stay connected with the vibrant cultural tapestry of North East India.',
}

type LinkedMedia = {
  alt?: string | null
  url?: string | null
}

type NewsletterEdition = {
  id: string
  coverImage?: string | LinkedMedia | null
  document?: string | LinkedMedia | null
  fileSize?: string | null
  isFeatured?: boolean | null
  issue?: string | null
  onlineURL?: string | null
  period?: string | null
  publishedDate: string
  summary: string
  title: string
  volume?: string | null
}

const getMedia = (media?: string | LinkedMedia | null) => {
  if (typeof media === 'object' && media?.url) return { alt: media.alt || '', url: media.url }
  return null
}

const getEditionURL = (edition: NewsletterEdition) => {
  if (typeof edition.document === 'object' && edition.document?.url) return edition.document.url
  return edition.onlineURL || null
}

const getEditionMeta = (edition: NewsletterEdition) => {
  const parts = [edition.volume, edition.issue].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : 'Newsletter Edition'
}

const getYear = (dateString: string) => new Date(dateString).getFullYear().toString()

export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const selectedYear = typeof resolvedSearchParams.year === 'string' ? resolvedSearchParams.year : 'all'
  const payload = await getPayloadClient()
  const [page, allEditionsResult] = await Promise.all([
    payload.findGlobal({ slug: 'newsletter-page' }),
    payload.find({ collection: 'newsletter-editions', depth: 1, limit: 100, sort: '-publishedDate', pagination: false }),
  ])
  const allEditions = allEditionsResult.docs as NewsletterEdition[]
  const yearOptions = Array.from(new Set(allEditions.map((edition) => getYear(edition.publishedDate))))
  const editions = selectedYear === 'all'
    ? allEditions
    : allEditions.filter((edition) => getYear(edition.publishedDate) === selectedYear)
  const featuredIssue = editions.find((edition) => edition.isFeatured) || editions[0] || null
  const archiveIssues = featuredIssue ? editions.filter((edition) => edition.id !== featuredIssue.id) : editions

  return (
    <main className="flex-grow">
      <section className="relative bg-surface-container-lowest py-16 md:py-24 overflow-hidden border-b border-outline-variant">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_100%_0%,#0f7f5c_0%,transparent_50%)]" />
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col md:flex-row items-center gap-stack-lg">
          <div className="md:w-1/2 flex flex-col gap-stack-md">
            <h1 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-primary">{page.heroTitle}</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl whitespace-pre-wrap">{page.heroDescription}</p>
          </div>
          <div className="md:w-1/2 w-full mt-8 md:mt-0">
            <div className="bg-white/80 backdrop-blur-md rounded-lg p-8 shadow-md border-t-4 border-t-[#FF9933] flex flex-col gap-stack-md border-x border-b border-white/50">
              <h2 className="font-serif font-medium text-headline-md text-on-surface">{page.subscribeTitle}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap">{page.subscribeDescription}</p>
              <NewsletterSubscribeForm privacyNote={page.privacyNote} />
            </div>
          </div>
        </div>
      </section>

      {featuredIssue && (
        <section className="py-16 md:py-24 bg-surface-container-low">
          <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">new_releases</span>
              <h2 className="font-serif font-medium text-headline-lg text-on-surface">{page.latestIssueTitle}</h2>
            </div>
            <EditionFeature edition={featuredIssue} />
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[28px]" aria-hidden="true">auto_stories</span>
              <h2 className="font-serif font-medium text-headline-lg text-on-surface">{page.archiveTitle}</h2>
            </div>
            {yearOptions.length > 0 && (
              <form action="/newsletter" className="relative inline-block w-full sm:w-48">
                <select className="block w-full bg-surface-container-lowest border border-outline-variant text-on-surface py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-primary font-body-md appearance-none" defaultValue={selectedYear} name="year">
                  <option value="all">All Years</option>
                  {yearOptions.map((year) => <option key={year} value={year}>Year: {year}</option>)}
                </select>
                <button className="sr-only" type="submit">Filter</button>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
                  <span className="material-symbols-outlined" aria-hidden="true">arrow_drop_down</span>
                </div>
              </form>
            )}
          </div>

          {archiveIssues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {archiveIssues.map((edition) => <ArchiveEdition edition={edition} key={edition.id} />)}
            </div>
          ) : (
            <div className="p-10 text-center bg-surface-container-lowest border border-dashed border-outline-variant rounded-lg">
              <p className="font-body-md text-body-md text-on-surface-variant">{page.emptyArchiveMessage}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function EditionFeature({ edition }: { edition: NewsletterEdition }) {
  const cover = getMedia(edition.coverImage)
  const editionURL = getEditionURL(edition)
  const downloadable = typeof edition.document === 'object' && Boolean(edition.document?.url)

  return (
    <article className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3 bg-surface-variant p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-outline-variant">
        <div className="w-full max-w-[280px] aspect-[1/1.414] bg-surface shadow-md relative overflow-hidden group flex items-center justify-center">
          {cover ? <img alt={cover.alt || edition.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={cover.url} /> : <span className="material-symbols-outlined text-6xl text-primary opacity-60" aria-hidden="true">article</span>}
        </div>
      </div>
      <div className="md:w-2/3 p-8 flex flex-col justify-center gap-stack-md">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[#FF9933]/10 text-[#d97706] font-label-md text-label-md px-3 py-1 rounded-full border border-[#FF9933]/30">{getEditionMeta(edition)}</span>
          {edition.period && <span className="text-on-surface-variant font-caption text-caption">{edition.period}</span>}
        </div>
        <h3 className="font-serif font-medium text-headline-md text-primary">{edition.title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4 whitespace-pre-wrap">{edition.summary}</p>
        {editionURL && (
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <a className="bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-md text-label-md py-3 px-6 rounded flex items-center justify-center gap-2" href={editionURL} rel="noreferrer" target="_blank" download={downloadable || undefined}>
              <span className="material-symbols-outlined" aria-hidden="true">picture_as_pdf</span>
              Download PDF{edition.fileSize ? ` (${edition.fileSize})` : ''}
            </a>
            <a className="border-2 border-primary-container text-primary-container hover:bg-surface-container transition-colors font-label-md text-label-md py-3 px-6 rounded flex items-center justify-center gap-2" href={edition.onlineURL || editionURL} rel="noreferrer" target="_blank">
              <span className="material-symbols-outlined" aria-hidden="true">visibility</span>
              Read Online
            </a>
          </div>
        )}
      </div>
    </article>
  )
}

function ArchiveEdition({ edition }: { edition: NewsletterEdition }) {
  const cover = getMedia(edition.coverImage)
  const editionURL = getEditionURL(edition)

  return (
    <article className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:shadow-md transition-shadow flex gap-4 items-start group">
      <div className="w-24 h-32 shrink-0 bg-surface-variant border border-outline-variant/50 relative overflow-hidden flex items-center justify-center">
        {cover ? <img alt={cover.alt || edition.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" src={cover.url} /> : <span className="material-symbols-outlined text-4xl text-primary opacity-60" aria-hidden="true">article</span>}
      </div>
      <div className="flex flex-col flex-grow min-w-0">
        <div className="text-outline font-caption text-caption mb-1">{getEditionMeta(edition)}{edition.period ? ` | ${edition.period}` : ''}</div>
        <h3 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors line-clamp-2">{edition.title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-2 mt-2">{edition.summary}</p>
        {editionURL && (
          <a className="text-primary font-label-md text-label-md flex items-center gap-1 mt-4 hover:underline w-fit" href={editionURL} rel="noreferrer" target="_blank">
            Open <span className="material-symbols-outlined text-[16px]" aria-hidden="true">open_in_new</span>
          </a>
        )}
      </div>
    </article>
  )
}
