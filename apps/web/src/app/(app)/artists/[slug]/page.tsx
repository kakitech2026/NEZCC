import type { Artist, ArtistCategory, Media } from '@/payload-types'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookingPolicySummary } from '@/components/bookings/BookingPolicySummary'
import { BookingRequestForm } from '@/components/bookings/BookingRequestForm'
import { getPublicBookingSettings } from '@nezcc/cms/bookings/bookingSettingsService'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ slug: string }>
}

const getMedia = (image?: string | Media | null, fallbackAlt?: string | null) => {
  if (typeof image === 'object' && image?.url) {
    return {
      alt: image.alt || fallbackAlt || '',
      url: image.url,
    }
  }

  return null
}

const getGalleryImage = (artist: Artist) => {
  const firstImage = artist.photoGallery?.[0]
  return getMedia(firstImage?.image, firstImage?.alt || artist.name)
}

const getCategoryNames = (artist: Artist) =>
  (artist.categories || [])
    .map((category) => (typeof category === 'object' ? category.name : null))
    .filter(Boolean)

const travelLabels: Record<string, string> = {
  available: 'Available to Travel',
  'local-only': 'Local Only',
  'not-available': 'Not Available',
  'subject-to-confirmation': 'Subject to Confirmation',
}

async function getArtist(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'artists',
    depth: 2,
    limit: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        { isPublished: { equals: true } },
        { isActive: { equals: true } },
      ],
    },
  })

  return (result.docs[0] as Artist | undefined) || null
}

async function getArtistPageData(slug: string) {
  const payload = await getPayloadClient()
  const [artistResult, bookingSettings] = await Promise.all([
    payload.find({
      collection: 'artists',
      depth: 2,
      limit: 1,
      where: {
        and: [
          { slug: { equals: slug } },
          { isPublished: { equals: true } },
          { isActive: { equals: true } },
        ],
      },
    }),
    getPublicBookingSettings(payload),
  ])

  return {
    artist: (artistResult.docs[0] as Artist | undefined) || null,
    bookingSettings,
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const artist = await getArtist(slug)

  if (!artist) {
    return {
      title: 'Artist - NEZCC',
    }
  }

  return {
    title: `${artist.name} - Cultural Artist - NEZCC`,
    description: artist.shortBiography,
  }
}

export default async function ArtistDetailPage({ params }: PageProps) {
  const { slug } = await params
  const { artist, bookingSettings } = await getArtistPageData(slug)

  if (!artist) notFound()

  const heroImage = getGalleryImage(artist)
  const categories = getCategoryNames(artist)
  const gallery = artist.photoGallery || []
  const videos = artist.videoLinks || []
  const highlights = artist.culturalHighlights || []
  const hasPerformanceDetails = Boolean(
    artist.performanceDuration ||
    artist.teamSize ||
    artist.languagesSpoken ||
    artist.yearsOfExperience ||
    artist.travelAvailability,
  )
  const canRequestBooking = artist.bookingEnabled && bookingSettings.bookingEnabled

  return (
    <main className="flex-grow min-h-screen pb-20">
      <section className="relative min-h-[440px] bg-[#16253a] overflow-hidden">
        {heroImage ? (
          <img alt={heroImage.alt} className="absolute inset-0 h-full w-full object-cover" src={heroImage.url} />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#16253a,#0f3d2e)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

        <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-20 md:py-28">
          <Link className="inline-flex items-center gap-1 rounded bg-white/10 px-3 py-2 font-label-md text-label-md text-white backdrop-blur-sm hover:bg-white/20" href="/artists">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_back</span>
            Artists
          </Link>

          <div className="max-w-4xl mt-stack-lg">
            <div className="mb-stack-sm flex flex-wrap gap-2">
              {categories.map((category) => (
                <span className="rounded bg-[#FF671F] px-3 py-1 text-xs font-semibold uppercase text-white shadow-sm" key={category}>
                  {category}
                </span>
              ))}
              <span className="rounded bg-white/15 px-3 py-1 text-xs font-semibold uppercase text-white backdrop-blur-sm">
                {artist.artistType === 'group' ? 'Group' : 'Individual'}
              </span>
            </div>

            <h1 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-white drop-shadow-lg">
              {artist.name}
            </h1>
            <p className="font-body-lg text-body-lg text-white/90 mt-stack-sm max-w-3xl">
              {artist.shortBiography}
            </p>
            <p className="mt-stack-md inline-flex items-center gap-2 rounded bg-white/10 px-4 py-2 font-body-md text-body-md text-white backdrop-blur-sm">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">location_on</span>
              {[artist.districtCity, artist.stateRegion].filter(Boolean).join(', ')}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-8 space-y-stack-lg">
            <article className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg shadow-sm">
              <h2 className="font-serif font-medium text-headline-lg text-on-surface">Profile</h2>
              <div className="mt-stack-md space-y-4 font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap leading-relaxed">
                <p>{artist.detailedProfile || artist.shortBiography}</p>
              </div>
            </article>

            {highlights.length > 0 && (
              <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg shadow-sm">
                <h2 className="font-serif font-medium text-headline-lg text-on-surface">Cultural Highlights</h2>
                <div className="mt-stack-md grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  {highlights.map((highlight) => (
                    <article className="rounded border border-outline-variant bg-surface-container-lowest p-stack-md" key={highlight.id || highlight.title}>
                      <h3 className="font-serif font-medium text-headline-md text-on-surface">{highlight.title}</h3>
                      {highlight.description && (
                        <p className="mt-2 font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap">{highlight.description}</p>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {artist.awardsRecognition && (
              <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg shadow-sm">
                <h2 className="font-serif font-medium text-headline-lg text-on-surface">Awards and Recognition</h2>
                <p className="mt-stack-md font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap leading-relaxed">{artist.awardsRecognition}</p>
              </section>
            )}

            {gallery.length > 1 && (
              <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg shadow-sm">
                <h2 className="font-serif font-medium text-headline-lg text-on-surface">Gallery</h2>
                <div className="mt-stack-md grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
                  {gallery.slice(1).map((item) => {
                    const image = getMedia(item.image, item.alt || artist.name)
                    if (!image) return null

                    return (
                      <figure className="overflow-hidden rounded border border-outline-variant bg-surface-container" key={item.id || image.url}>
                        <img alt={image.alt} className="h-56 w-full object-cover" src={image.url} />
                        {item.caption && <figcaption className="p-3 font-body-md text-sm text-on-surface-variant">{item.caption}</figcaption>}
                      </figure>
                    )
                  })}
                </div>
              </section>
            )}

            {videos.length > 0 && (
              <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg shadow-sm">
                <h2 className="font-serif font-medium text-headline-lg text-on-surface">Video Links</h2>
                <div className="mt-stack-md flex flex-col gap-stack-sm">
                  {videos.map((video) => (
                    <a className="inline-flex items-center gap-2 rounded border border-outline-variant bg-white px-4 py-3 font-label-md text-label-md text-primary hover:bg-surface-container-low" href={video.url} key={video.id || video.url} rel="noopener noreferrer" target="_blank">
                      <span className="material-symbols-outlined text-[20px]" aria-hidden="true">play_circle</span>
                      {video.title || video.url}
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-stack-md">
              <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm" id="booking">
                <h2 className="font-serif font-medium text-headline-md text-on-surface">Booking</h2>
                <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                  {canRequestBooking
                    ? 'Booking requests are subject to NEZCC review, availability, final quote, and payment verification.'
                    : bookingSettings.bookingEnabled
                      ? 'This artist profile is visible, but bookings are currently not available.'
                      : 'NEZCC bookings are temporarily suspended. This artist profile remains available for reference.'}
                </p>
                {artist.indicativeFeeText && (
                  <div className="mt-stack-md rounded bg-surface-container-low p-stack-sm">
                    <p className="font-label-md text-label-md text-on-surface">Indicative fee</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">{artist.indicativeFeeText}</p>
                  </div>
                )}
                {canRequestBooking ? (
                  <div className="mt-stack-md">
                    <BookingRequestForm
                      resource={{
                        bookingType: 'artist',
                        displayName: artist.name,
                        resourceId: artist.id,
                        sourcePage: `/artists/${artist.slug}`,
                      }}
                      settings={bookingSettings}
                    />
                  </div>
                ) : (
                  <div className="mt-stack-md rounded border border-outline-variant bg-surface-container-low px-4 py-3 text-center font-label-md text-label-md text-on-surface-variant">
                    Booking unavailable
                  </div>
                )}
              </section>

              <BookingPolicySummary settings={bookingSettings} />

              {hasPerformanceDetails && (
                <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm">
                  <h2 className="font-serif font-medium text-headline-md text-on-surface">Performance Details</h2>
                  <dl className="mt-stack-md space-y-3">
                    {artist.performanceDuration && (
                      <div>
                        <dt className="font-label-md text-label-md text-on-surface">Duration</dt>
                        <dd className="font-body-md text-body-md text-on-surface-variant">{artist.performanceDuration}</dd>
                      </div>
                    )}
                    {artist.teamSize && (
                      <div>
                        <dt className="font-label-md text-label-md text-on-surface">Team Size</dt>
                        <dd className="font-body-md text-body-md text-on-surface-variant">{artist.teamSize}</dd>
                      </div>
                    )}
                    {artist.languagesSpoken && (
                      <div>
                        <dt className="font-label-md text-label-md text-on-surface">Languages</dt>
                        <dd className="font-body-md text-body-md text-on-surface-variant">{artist.languagesSpoken}</dd>
                      </div>
                    )}
                    {artist.yearsOfExperience !== null && artist.yearsOfExperience !== undefined && (
                      <div>
                        <dt className="font-label-md text-label-md text-on-surface">Experience</dt>
                        <dd className="font-body-md text-body-md text-on-surface-variant">{artist.yearsOfExperience} years</dd>
                      </div>
                    )}
                    {artist.travelAvailability && (
                      <div>
                        <dt className="font-label-md text-label-md text-on-surface">Travel</dt>
                        <dd className="font-body-md text-body-md text-on-surface-variant">{travelLabels[artist.travelAvailability] || artist.travelAvailability}</dd>
                      </div>
                    )}
                  </dl>
                </section>
              )}

              {(artist.facebookURL || artist.instagramURL || artist.youtubeURL || artist.websiteURL) && (
                <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm">
                  <h2 className="font-serif font-medium text-headline-md text-on-surface">Public Links</h2>
                  <div className="mt-stack-md flex flex-col gap-stack-sm">
                    {artist.facebookURL && <a className="font-label-md text-label-md text-primary hover:underline" href={artist.facebookURL} rel="noopener noreferrer" target="_blank">Facebook</a>}
                    {artist.instagramURL && <a className="font-label-md text-label-md text-primary hover:underline" href={artist.instagramURL} rel="noopener noreferrer" target="_blank">Instagram</a>}
                    {artist.youtubeURL && <a className="font-label-md text-label-md text-primary hover:underline" href={artist.youtubeURL} rel="noopener noreferrer" target="_blank">YouTube</a>}
                    {artist.websiteURL && <a className="font-label-md text-label-md text-primary hover:underline" href={artist.websiteURL} rel="noopener noreferrer" target="_blank">Website</a>}
                  </div>
                </section>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
