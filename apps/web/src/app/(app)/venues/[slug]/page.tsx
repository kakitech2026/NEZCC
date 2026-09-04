import type { Media, Venue } from '@/payload-types'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookingPolicySummary } from '@/components/bookings/BookingPolicySummary'
import { getPublicBookingSettings } from '@/lib/bookings/bookingSettingsService'
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

const getGalleryImage = (venue: Venue) => {
  const firstImage = venue.photoGallery?.[0]
  return getMedia(firstImage?.image, firstImage?.alt || venue.name)
}

const getCategoryName = (venue: Venue) => {
  const category = venue.category
  return typeof category === 'object' && category ? category.name : ''
}

const indoorOutdoorLabels: Record<string, string> = {
  indoor: 'Indoor',
  outdoor: 'Outdoor',
  'indoor-outdoor': 'Indoor and Outdoor',
}

const getDirectionsURL = (venue: Venue) => {
  const mapURL = venue.googleMapsEmbedURL
  if (!mapURL) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.name}, ${venue.address}`)}`

  return mapURL.replace('/embed?', '/search?api=1&')
}

async function getVenue(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'venues',
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

  return (result.docs[0] as Venue | undefined) || null
}

async function getVenuePageData(slug: string) {
  const payload = await getPayloadClient()
  const [venueResult, bookingSettings] = await Promise.all([
    payload.find({
      collection: 'venues',
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
    bookingSettings,
    venue: (venueResult.docs[0] as Venue | undefined) || null,
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const venue = await getVenue(slug)

  if (!venue) {
    return {
      title: 'Venue - NEZCC',
    }
  }

  return {
    title: `${venue.name} - NEZCC Venue`,
    description: venue.description,
  }
}

export default async function VenueDetailPage({ params }: PageProps) {
  const { slug } = await params
  const { bookingSettings, venue } = await getVenuePageData(slug)

  if (!venue) notFound()

  const heroImage = getGalleryImage(venue)
  const categoryName = getCategoryName(venue)
  const gallery = venue.photoGallery || []
  const rulesDocument = typeof venue.rulesTermsDocument === 'object' ? venue.rulesTermsDocument : null
  const facilityItems = [
    { label: 'Stage', enabled: venue.stageAvailability, icon: 'theater_comedy' },
    { label: 'Parking', enabled: venue.parkingAvailability, icon: 'local_parking' },
    { label: 'Sound System', enabled: venue.soundSystemAvailability, icon: 'volume_up' },
    { label: 'Lighting', enabled: venue.lightingAvailability, icon: 'lightbulb' },
    { label: 'Green Room', enabled: venue.greenRoomAvailability, icon: 'meeting_room' },
    { label: 'Projector/Screen', enabled: venue.projectorScreenAvailability, icon: 'present_to_all' },
  ].filter((item) => item.enabled)
  const canRequestBooking = venue.bookingEnabled && bookingSettings.bookingEnabled

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
          <Link className="inline-flex items-center gap-1 rounded bg-white/10 px-3 py-2 font-label-md text-label-md text-white backdrop-blur-sm hover:bg-white/20" href="/venues">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_back</span>
            Venues
          </Link>

          <div className="max-w-4xl mt-stack-lg">
            <div className="mb-stack-sm flex flex-wrap gap-2">
              {categoryName && (
                <span className="rounded bg-[#FF671F] px-3 py-1 text-xs font-semibold uppercase text-white shadow-sm">
                  {categoryName}
                </span>
              )}
              {venue.indoorOutdoor && (
                <span className="rounded bg-white/15 px-3 py-1 text-xs font-semibold uppercase text-white backdrop-blur-sm">
                  {indoorOutdoorLabels[venue.indoorOutdoor]}
                </span>
              )}
            </div>

            <h1 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-white drop-shadow-lg">
              {venue.name}
            </h1>
            <p className="font-body-lg text-body-lg text-white/90 mt-stack-sm max-w-3xl">
              {venue.description}
            </p>
            <p className="mt-stack-md inline-flex items-center gap-2 rounded bg-white/10 px-4 py-2 font-body-md text-body-md text-white backdrop-blur-sm">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">location_on</span>
              {venue.cityState}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-8 space-y-stack-lg">
            <article className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg shadow-sm">
              <h2 className="font-serif font-medium text-headline-lg text-on-surface">About the Venue</h2>
              <p className="mt-stack-md font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap leading-relaxed">{venue.description}</p>
            </article>

            <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg shadow-sm">
              <h2 className="font-serif font-medium text-headline-lg text-on-surface">Facilities</h2>
              <div className="mt-stack-md grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
                <div className="rounded border border-outline-variant bg-surface-container-lowest p-stack-md">
                  <p className="font-label-md text-label-md text-on-surface">Capacity</p>
                  <p className="mt-1 font-serif font-medium text-headline-md text-primary">{venue.capacity}</p>
                </div>
                {venue.seatingType && (
                  <div className="rounded border border-outline-variant bg-surface-container-lowest p-stack-md">
                    <p className="font-label-md text-label-md text-on-surface">Seating</p>
                    <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{venue.seatingType}</p>
                  </div>
                )}
                {venue.availableTimings && (
                  <div className="rounded border border-outline-variant bg-surface-container-lowest p-stack-md">
                    <p className="font-label-md text-label-md text-on-surface">Available Timings</p>
                    <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{venue.availableTimings}</p>
                  </div>
                )}
                {venue.indoorOutdoor && (
                  <div className="rounded border border-outline-variant bg-surface-container-lowest p-stack-md">
                    <p className="font-label-md text-label-md text-on-surface">Venue Type</p>
                    <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{indoorOutdoorLabels[venue.indoorOutdoor]}</p>
                  </div>
                )}
              </div>

              {facilityItems.length > 0 && (
                <div className="mt-stack-md grid grid-cols-2 md:grid-cols-3 gap-stack-sm">
                  {facilityItems.map((item) => (
                    <div className="flex items-center gap-2 rounded bg-surface-container-low p-3 font-label-md text-label-md text-on-surface" key={item.label}>
                      <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              )}

              {venue.accessibilityFacilities && (
                <div className="mt-stack-md rounded border border-outline-variant bg-surface-container-low p-stack-md">
                  <h3 className="font-serif font-medium text-headline-md text-on-surface">Accessibility</h3>
                  <p className="mt-2 font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap">{venue.accessibilityFacilities}</p>
                </div>
              )}
            </section>

            {(venue.googleMapsEmbedURL || venue.address) && (
              <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg shadow-sm">
                <h2 className="font-serif font-medium text-headline-lg text-on-surface">Location Map</h2>
                <p className="mt-2 font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap">{venue.address}</p>
                {venue.googleMapsEmbedURL ? (
                  <div className="mt-stack-md aspect-video w-full overflow-hidden rounded-lg border border-outline-variant bg-surface-container [&>iframe]:h-full [&>iframe]:w-full">
                    <iframe
                      allowFullScreen
                      className="h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={venue.googleMapsEmbedURL}
                      title={`${venue.name} location map`}
                    />
                  </div>
                ) : null}
                <a className="mt-stack-md inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:underline" href={getDirectionsURL(venue)} rel="noopener noreferrer" target="_blank">
                  Open map directions
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">open_in_new</span>
                </a>
              </section>
            )}

            {(venue.rulesTermsText || rulesDocument?.url) && (
              <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg shadow-sm">
                <h2 className="font-serif font-medium text-headline-lg text-on-surface">Rules and Terms</h2>
                {venue.rulesTermsText && (
                  <p className="mt-stack-md font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap leading-relaxed">{venue.rulesTermsText}</p>
                )}
                {rulesDocument?.url && (
                  <a className="mt-stack-md inline-flex items-center gap-2 rounded border border-outline-variant bg-white px-4 py-3 font-label-md text-label-md text-primary hover:bg-surface-container-low" href={rulesDocument.url} rel="noopener noreferrer" target="_blank">
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">description</span>
                    Download rules document
                  </a>
                )}
              </section>
            )}

            {gallery.length > 1 && (
              <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg shadow-sm">
                <h2 className="font-serif font-medium text-headline-lg text-on-surface">Gallery</h2>
                <div className="mt-stack-md grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
                  {gallery.slice(1).map((item) => {
                    const image = getMedia(item.image, item.alt || venue.name)
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
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-stack-md">
              <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm">
                <h2 className="font-serif font-medium text-headline-md text-on-surface">Booking</h2>
                <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                  {canRequestBooking
                    ? 'Venue booking requests are subject to NEZCC review, availability, final quote, and payment verification.'
                    : bookingSettings.bookingEnabled
                      ? 'This venue profile is visible, but bookings are currently not available.'
                      : 'NEZCC bookings are temporarily suspended. This venue profile remains available for reference.'}
                </p>
                {venue.indicativeRentText && (
                  <div className="mt-stack-md rounded bg-surface-container-low p-stack-sm">
                    <p className="font-label-md text-label-md text-on-surface">Indicative rent</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">{venue.indicativeRentText}</p>
                  </div>
                )}
                {canRequestBooking ? (
                  <Link className="mt-stack-md inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded bg-primary px-5 py-3 font-label-md text-label-md text-white hover:bg-[#147fba]" href={`/venues/${venue.slug}#booking`}>
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">event_available</span>
                    Request Booking
                  </Link>
                ) : (
                  <div className="mt-stack-md rounded border border-outline-variant bg-surface-container-low px-4 py-3 text-center font-label-md text-label-md text-on-surface-variant">
                    Booking unavailable
                  </div>
                )}
              </section>

              <BookingPolicySummary settings={bookingSettings} />

              <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm">
                <h2 className="font-serif font-medium text-headline-md text-on-surface">Venue Summary</h2>
                <dl className="mt-stack-md space-y-3">
                  <div>
                    <dt className="font-label-md text-label-md text-on-surface">Address</dt>
                    <dd className="font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap">{venue.address}</dd>
                  </div>
                  <div>
                    <dt className="font-label-md text-label-md text-on-surface">Capacity</dt>
                    <dd className="font-body-md text-body-md text-on-surface-variant">{venue.capacity}</dd>
                  </div>
                  {venue.availableTimings && (
                    <div>
                      <dt className="font-label-md text-label-md text-on-surface">Timings</dt>
                      <dd className="font-body-md text-body-md text-on-surface-variant">{venue.availableTimings}</dd>
                    </div>
                  )}
                </dl>
              </section>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
