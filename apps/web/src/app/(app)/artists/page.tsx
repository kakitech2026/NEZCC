import type { Artist, ArtistCategory } from '@/payload-types'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Cultural Artists - NEZCC',
  description: 'Browse cultural artists associated with the North East Zone Cultural Centre.',
}

type SearchParams = Promise<{
  category?: string | string[]
  location?: string | string[]
  q?: string | string[]
  type?: string | string[]
}>

const getParam = (value?: string | string[]) => {
  if (Array.isArray(value)) return value[0] || ''
  return value || ''
}

const getArtistImage = (artist: Artist) => {
  const firstImage = artist.photoGallery?.[0]
  const image = firstImage?.image

  if (typeof image === 'object' && image?.url) {
    return {
      alt: firstImage?.alt || image.alt || artist.name,
      url: image.sizes?.card?.url || image.url,
    }
  }

  return null
}

const getCategoryNames = (artist: Artist) =>
  (artist.categories || [])
    .map((category) => (typeof category === 'object' ? category.name : null))
    .filter(Boolean)
    .join(', ')

const getWhere = ({ category, location, q, type }: { category: string; location: string; q: string; type: string }) => {
  const and: any[] = [
    { isPublished: { equals: true } },
    { isActive: { equals: true } },
  ]

  if (category) {
    and.push({ categories: { contains: category } })
  }

  if (location) {
    and.push({ stateRegion: { equals: location } })
  }

  if (type === 'individual' || type === 'group') {
    and.push({ artistType: { equals: type } })
  }

  if (q) {
    and.push({
      or: [
        { name: { like: q } },
        { shortBiography: { like: q } },
        { districtCity: { like: q } },
        { stateRegion: { like: q } },
      ],
    })
  }

  return { and }
}

export default async function ArtistsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const category = getParam(params.category)
  const location = getParam(params.location)
  const q = getParam(params.q).trim()
  const type = getParam(params.type)
  const payload = await getPayloadClient()

  const [artistsResult, categoriesResult, allArtistsResult] = await Promise.all([
    payload.find({
      collection: 'artists',
      depth: 2,
      limit: 60,
      sort: '-isFeatured,name',
      where: getWhere({ category, location, q, type }),
    }),
    payload.find({
      collection: 'artist-categories',
      depth: 0,
      limit: 100,
      sort: 'sortOrder,name',
      where: { isActive: { equals: true } },
    }),
    payload.find({
      collection: 'artists',
      depth: 0,
      limit: 300,
      sort: 'stateRegion',
      where: {
        and: [
          { isPublished: { equals: true } },
          { isActive: { equals: true } },
        ],
      },
    }),
  ])

  const artists = artistsResult.docs as Artist[]
  const categories = categoriesResult.docs as ArtistCategory[]
  const locations = Array.from(
    new Set((allArtistsResult.docs as Artist[]).map((artist) => artist.stateRegion).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b))
  const hasFilters = Boolean(category || location || q || type)

  return (
    <main className="flex-grow min-h-screen pb-20 pt-10 md:pt-14">
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl mb-stack-lg">
          <p className="font-label-md text-label-md text-[#df5f18] uppercase mb-2">Artist Directory</p>
          <h1 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-surface">
            Cultural Artists
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-sm">
            Explore artists, ensembles, and cultural practitioners associated with NEZCC. Booking availability is subject to confirmation by NEZCC.
          </p>
        </div>

        <form className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm mb-stack-lg" action="/artists">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-stack-md">
            <label className="md:col-span-2 flex flex-col gap-2 font-label-md text-label-md text-on-surface">
              Search
              <input
                className="min-h-[44px] rounded border border-outline-variant bg-white px-3 py-2 font-body-md text-body-md text-on-surface outline-none focus:border-primary"
                defaultValue={q}
                name="q"
                placeholder="Name, city, art form"
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
              Artist Type
              <select className="min-h-[44px] rounded border border-outline-variant bg-white px-3 py-2 font-body-md text-body-md text-on-surface outline-none focus:border-primary" defaultValue={type} name="type">
                <option value="">All types</option>
                <option value="individual">Individual</option>
                <option value="group">Group</option>
              </select>
            </label>
          </div>

          <div className="mt-stack-md flex flex-wrap gap-stack-sm">
            <button className="inline-flex min-h-[44px] items-center gap-2 rounded bg-primary px-5 py-2 font-label-md text-label-md text-white transition-colors hover:bg-[#147fba]" type="submit">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">filter_alt</span>
              Apply Filters
            </button>
            {hasFilters && (
              <Link className="inline-flex min-h-[44px] items-center rounded border border-outline-variant bg-white px-5 py-2 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-low" href="/artists">
                Clear
              </Link>
            )}
          </div>
        </form>

        <div className="mb-stack-md flex items-center justify-between gap-stack-md">
          <p className="font-body-md text-body-md text-on-surface-variant">
            {artistsResult.totalDocs} {artistsResult.totalDocs === 1 ? 'artist' : 'artists'} found
          </p>
        </div>

        {artists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {artists.map((artist) => {
              const image = getArtistImage(artist)
              const categoryNames = getCategoryNames(artist)

              return (
                <article className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full" key={artist.id}>
                  <Link className="block h-56 bg-surface-container overflow-hidden border-b border-outline-variant" href={`/artists/${artist.slug}`}>
                    {image ? (
                      <img alt={image.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" src={image.url} />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-[#16253a] text-white">
                        <span className="material-symbols-outlined text-6xl" aria-hidden="true">theater_comedy</span>
                      </div>
                    )}
                  </Link>

                  <div className="p-stack-md flex flex-col gap-3 flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      {artist.isFeatured && (
                        <span className="rounded bg-[#fff4e9] px-2 py-1 text-xs font-semibold uppercase text-[#df5f18]">Featured</span>
                      )}
                      <span className="rounded bg-surface-container-low px-2 py-1 text-xs font-semibold uppercase text-on-surface-variant">
                        {artist.artistType === 'group' ? 'Group' : 'Individual'}
                      </span>
                    </div>

                    <div>
                      <h2 className="font-serif font-medium text-headline-md text-on-surface">
                        <Link className="hover:text-[#df5f18] transition-colors" href={`/artists/${artist.slug}`}>
                          {artist.name}
                        </Link>
                      </h2>
                      <p className="mt-1 flex items-center gap-1 font-body-md text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[17px]" aria-hidden="true">location_on</span>
                        {[artist.districtCity, artist.stateRegion].filter(Boolean).join(', ')}
                      </p>
                    </div>

                    {categoryNames && (
                      <p className="font-label-md text-label-md text-primary">{categoryNames}</p>
                    )}

                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 flex-grow">
                      {artist.shortBiography}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-stack-sm border-t border-outline-variant pt-stack-md">
                      <Link className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:underline" href={`/artists/${artist.slug}`}>
                        View Profile
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
                      </Link>
                      {artist.bookingEnabled ? (
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
            <h2 className="font-serif font-medium text-headline-md text-on-surface">No artists found</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Try clearing filters or checking back after more artist profiles are published.</p>
          </div>
        )}
      </section>
    </main>
  )
}
