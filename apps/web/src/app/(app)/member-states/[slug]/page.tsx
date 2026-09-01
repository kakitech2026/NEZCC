import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { memberStateFallbacks, memberStateSlugs, type ManagedImage, type MemberStateContent } from '../memberStateFallbacks'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ slug: string }>
}

const getImage = (image?: string | ManagedImage | null, imageURL?: string | null, fallbackAlt?: string | null) => {
  if (typeof image === 'object' && image?.url) {
    return { alt: image.alt || fallbackAlt || '', url: image.url }
  }

  return imageURL ? { alt: fallbackAlt || '', url: imageURL } : null
}

const getLink = (link?: { label?: string | null; url?: string | null } | null) => {
  if (!link?.label || !link.url) return null
  return { label: link.label, url: link.url }
}

async function getMemberState(slug: string): Promise<MemberStateContent | null> {
  const fallback = memberStateFallbacks[slug]
  if (!fallback) return null

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'member-states',
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs[0] as MemberStateContent | undefined) || fallback
}

export function generateStaticParams() {
  return memberStateSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const state = memberStateFallbacks[slug]

  if (!state) {
    return {
      title: 'Member State | North East Zone Cultural Centre',
    }
  }

  return {
    title: `Member State: ${state.name} | North East Zone Cultural Centre`,
    description: state.summary,
  }
}

export default async function MemberStatePage({ params }: PageProps) {
  const { slug } = await params
  const state = await getMemberState(slug)

  if (!state) notFound()

  const heroImage = getImage(state.heroImage, state.heroImageURL, state.heroImageAlt || state.name)
  const primaryLink = getLink(state.primaryLink)
  const secondaryLink = getLink(state.secondaryLink)
  const overview = state.overview || []
  const highlights = state.highlights || []

  return (
    <main className="flex-grow w-full md:-mt-[30px] relative z-0">
      <section className="relative w-full min-h-[520px] h-[68vh] flex items-center justify-center overflow-hidden bg-[#16253a]">
        {heroImage ? (
          <img alt={heroImage.alt} className="absolute inset-0 h-full w-full object-cover" src={heroImage.url} />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,153,51,0.35),transparent_35%),linear-gradient(135deg,#16253a,#0f3d2e)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

        <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF671F] text-white font-label-md text-label-md mb-stack-md uppercase tracking-wider shadow-sm">
            Member State
          </span>
          <h1 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-white mb-stack-sm drop-shadow-lg">
            {state.name}: {state.tagline}
          </h1>
          <p className="font-body-lg text-body-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
            {state.summary}
          </p>

          {(primaryLink || secondaryLink) && (
            <div className="mt-stack-lg flex flex-col sm:flex-row gap-4">
              {primaryLink && (
                <a className="bg-[#FF671F] hover:bg-[#df5f18] text-white px-8 py-3 rounded font-label-md text-label-md transition-colors shadow-sm" href={primaryLink.url}>
                  {primaryLink.label}
                </a>
              )}
              {secondaryLink && (
                <a className="bg-white/10 border border-white/70 text-white px-8 py-3 rounded font-label-md text-label-md hover:bg-white/20 transition-colors backdrop-blur-sm" href={secondaryLink.url}>
                  {secondaryLink.label}
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {overview.length > 0 && (
        <section className="py-12 md:py-20 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto" id="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {overview.map((item) => {
              const image = getImage(item.image, item.imageURL, item.imageAlt || item.title)
              const link = getLink(item.link)

              return (
                <article className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm flex flex-col gap-stack-md overflow-hidden" key={item.id || item.title}>
                  {image && (
                    <div className="-mx-stack-md -mt-stack-md h-64 bg-surface-container overflow-hidden border-b border-outline-variant">
                      <img alt={image.alt} className="w-full h-full object-cover" src={image.url} />
                    </div>
                  )}
                  {item.eyebrow && (
                    <p className="font-label-md text-label-md text-primary uppercase tracking-wider">{item.eyebrow}</p>
                  )}
                  <div className="flex items-center gap-3 text-primary">
                    {item.icon && <span className="material-symbols-outlined text-headline-md" aria-hidden="true">{item.icon}</span>}
                    <h2 className="font-serif font-medium text-headline-md text-on-surface">{item.title}</h2>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  {link && (
                    <a className="inline-flex items-center gap-1 text-primary font-label-md text-label-md hover:underline w-fit" href={link.url}>
                      {link.label}
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
                    </a>
                  )}
                </article>
              )
            })}
          </div>
        </section>
      )}

      {highlights.length > 0 && (
        <section className="py-12 md:py-20 px-margin-mobile md:px-margin-desktop bg-surface-container-low border-y border-outline-variant" id="highlights">
          <div className="max-w-container-max-width mx-auto">
            <div className="mb-stack-lg text-center md:text-left">
              <h2 className="font-serif font-medium text-headline-lg-mobile md:text-headline-lg text-on-surface">
                {state.highlightsHeading || 'Cultural Highlights'}
              </h2>
              {state.highlightsDescription && (
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-3xl">
                  {state.highlightsDescription}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {highlights.map((highlight) => {
                const image = getImage(highlight.image, highlight.imageURL, highlight.imageAlt || highlight.title)
                const link = getLink(highlight.link)

                return (
                  <article className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full" key={highlight.id || highlight.title}>
                    {image ? (
                      <div className="h-52 bg-surface-container overflow-hidden border-b border-outline-variant">
                        <img alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={image.url} />
                      </div>
                    ) : (
                      <div className="h-28 bg-[#16253a] text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-5xl" aria-hidden="true">{highlight.icon || 'interests'}</span>
                      </div>
                    )}
                    <div className="p-stack-md flex flex-col gap-3 flex-grow">
                      {highlight.category && (
                        <div className="flex items-center gap-2 text-[#df5f18]">
                          {highlight.icon && <span className="material-symbols-outlined text-[18px]" aria-hidden="true">{highlight.icon}</span>}
                          <span className="font-label-md text-label-md uppercase tracking-wide text-xs">{highlight.category}</span>
                        </div>
                      )}
                      <h3 className="font-serif font-medium text-headline-md text-on-surface">{highlight.title}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap flex-grow">
                        {highlight.description}
                      </p>
                      {link && (
                        <a className="inline-flex items-center gap-1 text-primary font-label-md text-label-md hover:underline w-fit mt-2" href={link.url}>
                          {link.label}
                          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
                        </a>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
