import type { Media, Venue, VenueCategory } from '@/payload-types'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Venues - NEZCC',
  description: 'Browse NEZCC venues available for cultural programmes and events.',
}

type SearchParams = Promise<{
  capacity?: string | string[]
  category?: string | string[]
  location?: string | string[]
  q?: string | string[]
  type?: string | string[]
}>

const getParam = (value?: string | string[]) => {
  if (Array.isArray(value)) return value[0] || ''
  return value || ''
}

const getVenueImage = (venue: Venue) => {
  const firstImage = venue.photoGallery?.[0]
  const image = firstImage?.image

  if (typeof image === 'object' && image?.url) {
    return {
      alt: firstImage?.alt || image.alt || venue.name,
      url: image.sizes?.card?.url || image.url,
    }
  }

  return null
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

const getWhere = ({
  capacity,
  category,
  location,
  q,
  type,
}: {
  capacity: string
  category: string
  location: string
  q: string
  type: string
}) => {
  const and: any[] = [
    { isPublished: { equals: true } },
    { isActive: { equals: true } },
  ]

  if (category) {
    and.push({ category: { equals: category } })
  }

  if (location) {
    and.push({ cityState: { equals: location } })
  }

  if (type === 'indoor' || type === 'outdoor' || type === 'indoor-outdoor') {
    and.push({ indoorOutdoor: { equals: type } })
  }

  const minCapacity = Number.parseInt(capacity, 10)
  if (Number.isFinite(minCapacity) && minCapacity > 0) {
    and.push({ capacity: { greater_than_equal: minCapacity } })
  }

  if (q) {
    and.push({
      or: [
        { name: { like: q } },
        { description: { like: q } },
        { address: { like: q } },
        { cityState: { like: q } },
      ],
    })
  }

  return { and }
}

export default async function VenuesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const capacity = getParam(params.capacity)
  const category = getParam(params.category)
  const location = getParam(params.location)
  const q = getParam(params.q).trim()
  const type = getParam(params.type)
  const payload = await getPayloadClient()

  const [venuesResult, categoriesResult, allVenuesResult] = await Promise.all([
    payload.find({
      collection: 'venues',
      depth: 2,
      limit: 60,
      sort: '-isFeatured,name',
      where: getWhere({ capacity, category, location, q, type }),
    }),
    payload.find({
      collection: 'venue-categories',
      depth: 0,
      limit: 100,
      sort: 'sortOrder,name',
      where: { isActive: { equals: true } },
    }),
    payload.find({
      collection: 'venues',
      depth: 0,
      limit: 300,
      sort: 'cityState',
      where: {
        and: [
          { isPublished: { equals: true } },
          { isActive: { equals: true } },
        ],
      },
    }),
  ])

  const venues = venuesResult.docs as Venue[]
  const categories = categoriesResult.docs as VenueCategory[]
  const locations = Array.from(
    new Set((allVenuesResult.docs as Venue[]).map((venue) => venue.cityState).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b))
  const hasFilters = Boolean(capacity || category || location || q || type)

  return (
    <main className="flex-grow min-h-screen pb-20 pt-10 md:pt-14">
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl mb-stack-lg">
          <p className="font-label-md text-label-md text-[#df5f18] uppercase mb-2">Venue Directory</p>
          <h1 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-surface">
            NEZCC Venues
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-sm">
            Browse NEZCC venues for cultural programmes, workshops, exhibitions, and public events. Booking availability is subject to confirmation by NEZCC.
          </p>
        </div>

        <form className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm mb-stack-lg" action="/venues">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-stack-md">
            <label className="md:col-span-2 flex flex-col gap-2 font-label-md text-label-md text-on-surface">
              Search
              <input
                className="min-h-[44px] rounded border border-outline-variant bg-white px-3 py-2 font-body-md text-body-md text-on-surface outline-none focus:border-primary"
                defaultValue={q}
                name="q"
                placeholder="Venue, address, city"
                type="search"
              />
            </label>

            <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
              Category
              <select className="min-h-[44px] rounded border border-outline-variant bg-white px-3 py-2 font-body-md text-body-md text-on-surface outline-none focus:border-primary" defaultValue={category} name="category">
                <option value="">All categories</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
              Location
              <select className="min-h-[44px] rounded border border-outline-variant bg-white px-3 py-2 font-body-md text-body-md text-on-surface outline-none focus:border-primary" defaultValue={location} name="location">
                <option value="">All locations</option>
                {locations.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
              Type
              <select className="min-h-[44px] rounded border border-outline-variant bg-white px-3 py-2 font-body-md text-body-md text-on-surface outline-none focus:border-primary" defaultValue={type} name="type">
                <option value="">All types</option>
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
                <option value="indoor-outdoor">Indoor and Outdoor</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
              Minimum Capacity
              <input
                className="min-h-[44px] rounded border border-outline-variant bg-white px-3 py-2 font-body-md text-body-md text-on-surface outline-none focus:border-primary"
                defaultValue={capacity}
                min="0"
                name="capacity"
                placeholder="Any"
                type="number"
              />
            </label>
          </div>

          <div className="mt-stack-md flex flex-wrap gap-stack-sm">
            <button className="inline-flex min-h-[44px] items-center gap-2 rounded bg-primary px-5 py-2 font-label-md text-label-md text-white transition-colors hover:bg-[#147fba]" type="submit">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">filter_alt</span>
              Apply Filters
            </button>
            {hasFilters && (
              <Link className="inline-flex min-h-[44px] items-center rounded border border-outline-variant bg-white px-5 py-2 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-low" href="/venues">
                Clear
              </Link>
            )}
          </div>
        </form>

        <p className="mb-stack-md font-body-md text-body-md text-on-surface-variant">
          {venuesResult.totalDocs} {venuesResult.totalDocs === 1 ? 'venue' : 'venues'} found
        </p>

        {venues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {venues.map((venue) => {
              const image = getVenueImage(venue)
              const categoryName = getCategoryName(venue)

              return (
                <article className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full" key={venue.id}>
                  <Link className="block h-56 bg-surface-container overflow-hidden border-b border-outline-variant" href={`/venues/${venue.slug}`}>
                    {image ? (
                      <img alt={image.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" src={image.url} />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-[#16253a] text-white">
                        <span className="material-symbols-outlined text-6xl" aria-hidden="true">home_work</span>
                      </div>
                    )}
                  </Link>

                  <div className="p-stack-md flex flex-col gap-3 flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      {venue.isFeatured && (
                        <span className="rounded bg-[#fff4e9] px-2 py-1 text-xs font-semibold uppercase text-[#df5f18]">Featured</span>
                      )}
                      {venue.indoorOutdoor && (
                        <span className="rounded bg-surface-container-low px-2 py-1 text-xs font-semibold uppercase text-on-surface-variant">
                          {indoorOutdoorLabels[venue.indoorOutdoor]}
                        </span>
                      )}
                    </div>

                    <div>
                      <h2 className="font-serif font-medium text-headline-md text-on-surface">
                        <Link className="hover:text-[#df5f18] transition-colors" href={`/venues/${venue.slug}`}>
                          {venue.name}
                        </Link>
                      </h2>
                      <p className="mt-1 flex items-center gap-1 font-body-md text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[17px]" aria-hidden="true">location_on</span>
                        {venue.cityState}
                      </p>
                    </div>

                    {categoryName && <p className="font-label-md text-label-md text-primary">{categoryName}</p>}

                    <div className="grid grid-cols-2 gap-stack-sm rounded bg-surface-container-low p-stack-sm">
                      <div>
                        <p className="font-label-md text-xs uppercase text-on-surface-variant">Capacity</p>
                        <p className="font-body-md text-body-md text-on-surface">{venue.capacity}</p>
                      </div>
                      {venue.availableTimings && (
                        <div>
                          <p className="font-label-md text-xs uppercase text-on-surface-variant">Timings</p>
                          <p className="font-body-md text-body-md text-on-surface">{venue.availableTimings}</p>
                        </div>
                      )}
                    </div>

                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 flex-grow">
                      {venue.description}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-stack-sm border-t border-outline-variant pt-stack-md">
                      <Link className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:underline" href={`/venues/${venue.slug}`}>
                        View Venue
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
                      </Link>
                      {venue.bookingEnabled ? (
                        <span className="text-xs font-semibold uppercase text-[#15803d]">Booking subject to confirmation</span>
                      ) : (
                        <span className="text-xs font-semibold uppercase text-on-surface-variant">Booking unavailable</span>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-10 text-center shadow-sm">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-3" aria-hidden="true">search_off</span>
            <h2 className="font-serif font-medium text-headline-md text-on-surface">No venues found</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Try clearing filters or checking back after more venue profiles are published.</p>
          </div>
        )}
      </section>
    </main>
  )
}
