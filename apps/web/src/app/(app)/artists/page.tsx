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

type ArtistImage = {
  alt: string
  url: string
}

const fallbackCategoryImages = [
  '/images/events/foundation.jpg',
  '/images/events/folk-music.jpg',
  '/images/events/hornbill.jpg',
  '/images/events/handloom.jpg',
]

const getParam = (value?: string | string[]) => {
  if (Array.isArray(value)) return value[0] || ''
  return value || ''
}

const getArtistImage = (artist: Artist): ArtistImage | null => {
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

const getHeroImage = (artists: Artist[]) => {
  const featured = artists.find((artist) => artist.isFeatured && getArtistImage(artist))
  const firstWithImage = artists.find((artist) => getArtistImage(artist))
  const image = featured ? getArtistImage(featured) : firstWithImage ? getArtistImage(firstWithImage) : null

  return image || { alt: 'Traditional cultural performance from North East India', url: '/images/art_heritage.webp' }
}

const getCategoryNames = (artist: Artist) =>
  (artist.categories || [])
    .map((category) => (typeof category === 'object' ? category.name : null))
    .filter(Boolean)
    .join(', ')

const artistHasCategory = (artist: Artist, categoryId: string | number) =>
  (artist.categories || []).some((category) => {
    if (typeof category === 'object') return String(category.id) === String(categoryId)
    return String(category) === String(categoryId)
  })

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

const getBookableCount = (artists: Artist[]) => artists.filter((artist) => artist.bookingEnabled).length

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
      depth: 2,
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
  const allArtists = allArtistsResult.docs as Artist[]
  const locations = Array.from(new Set(allArtists.map((artist) => artist.stateRegion).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  )
  const heroImage = getHeroImage(allArtists)
  const featuredArtists = allArtists.filter((artist) => artist.isFeatured).slice(0, 4)
  const categoryHighlights = categories.slice(0, 4).map((item, index) => {
    const categoryArtist = allArtists.find((artist) => artistHasCategory(artist, item.id) && getArtistImage(artist))
    const image = categoryArtist ? getArtistImage(categoryArtist) : null

    return {
      count: allArtists.filter((artist) => artistHasCategory(artist, item.id)).length,
      description: item.description,
      href: `/artists?category=${encodeURIComponent(String(item.id))}`,
      image: image || { alt: item.name, url: fallbackCategoryImages[index % fallbackCategoryImages.length] },
      name: item.name,
    }
  })
  const videos = allArtists
    .flatMap((artist) =>
      (artist.videoLinks || []).map((video) => ({
        artistName: artist.name,
        artistSlug: artist.slug,
        title: video.title || artist.name,
        url: video.url,
      })),
    )
    .slice(0, 4)
  const hasFilters = Boolean(category || location || q || type)
  const hasCategoryHighlights = categoryHighlights.length > 0

  return (
    <main className="flex-grow min-h-screen pb-20">
      <section className="relative min-h-[520px] overflow-hidden bg-[#16253a]">
        <img alt={heroImage.alt} className="absolute inset-0 h-full w-full object-cover" src={heroImage.url} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c30]/95 via-[#0b1c30]/70 to-[#0b1c30]/25" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-surface to-transparent" />

        <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-20 md:py-28">
          <div className="max-w-3xl text-white">
            <p className="font-label-md text-label-md text-[#FF9933] uppercase mb-stack-sm">Artist Directory</p>
            <h1 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl">
              Experience the Living Traditions of the North East
            </h1>
            <p className="font-body-lg text-body-lg text-white/90 mt-stack-md max-w-2xl">
              Browse NEZCC-associated artists, ensembles, craft practitioners, and cultural resource persons. Submit a booking request for NEZCC review and confirmation.
            </p>

            <div className="mt-stack-lg flex flex-col sm:flex-row gap-stack-md">
              <a className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-primary px-6 py-3 font-label-md text-label-md text-white shadow-sm transition-colors hover:bg-[#147fba]" href="#artist-directory">
                Explore Artists
              </a>
              <a className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-white/40 bg-white/10 px-6 py-3 font-label-md text-label-md text-white backdrop-blur-sm transition-colors hover:bg-white/20" href={hasCategoryHighlights ? '#artist-categories' : '#artist-directory'}>
                View Art Forms
              </a>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-stack-md max-w-3xl">
            <div className="rounded-lg border border-white/20 bg-white/10 p-stack-md text-white backdrop-blur-sm">
              <p className="font-serif font-medium text-headline-md">{allArtistsResult.totalDocs}</p>
              <p className="font-caption text-caption uppercase text-white/80">Published Artists</p>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 p-stack-md text-white backdrop-blur-sm">
              <p className="font-serif font-medium text-headline-md">{categories.length}</p>
              <p className="font-caption text-caption uppercase text-white/80">Art Forms</p>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 p-stack-md text-white backdrop-blur-sm">
              <p className="font-serif font-medium text-headline-md">{getBookableCount(allArtists)}</p>
              <p className="font-caption text-caption uppercase text-white/80">Accepting Requests</p>
            </div>
          </div>
        </div>
      </section>

      {hasCategoryHighlights && (
        <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-14 md:py-20" id="artist-categories">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-4">
              <p className="font-label-md text-label-md text-[#df5f18] uppercase mb-stack-sm">Our Heritage</p>
              <h2 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-surface">
                Cultural Disciplines
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-md">
                Explore artist categories managed by NEZCC, from performance traditions to craft demonstrations and cultural knowledge sessions.
              </p>
              <a className="mt-stack-lg inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#001551] px-5 py-2 font-label-md text-label-md text-white transition-colors hover:bg-primary" href="#artist-directory">
                View All Artists
              </a>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
              {categoryHighlights.map((item, index) => (
                <Link
                  className={`group relative block overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm ${
                    index === 0 || index === 3 ? 'sm:min-h-[320px]' : 'sm:min-h-[260px]'
                  }`}
                  href={item.href}
                  key={item.name}
                >
                  <img alt={item.image.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={item.image.url} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/95 via-[#0b1c30]/40 to-transparent" />
                  <div className="relative flex min-h-[260px] h-full flex-col justify-end p-stack-md text-white">
                    <p className="font-caption text-caption uppercase text-white/75">{item.count} artists</p>
                    <h3 className="font-serif font-medium text-headline-md mt-1">{item.name}</h3>
                    {item.description && <p className="font-body-md text-body-md text-white/85 mt-2 line-clamp-2">{item.description}</p>}
                    <span className="mt-stack-md h-1 w-10 bg-[#FF9933] transition-all duration-300 group-hover:w-16" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {featuredArtists.length > 0 && (
        <section className="bg-surface-container-lowest border-y border-outline-variant py-14 md:py-20">
          <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="mb-stack-lg flex flex-col md:flex-row md:items-end md:justify-between gap-stack-md">
              <div>
                <p className="font-label-md text-label-md text-[#df5f18] uppercase mb-stack-sm">Featured Roster</p>
                <h2 className="font-serif font-medium text-headline-lg text-on-surface">Artists Highlighted by NEZCC</h2>
              </div>
              <a className="inline-flex min-h-[44px] items-center rounded-lg border border-outline-variant bg-white px-5 py-2 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-low" href="#artist-directory">
                Browse Directory
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {featuredArtists.map((artist) => {
                const image = getArtistImage(artist)

                return (
                  <Link className="group block overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm" href={`/artists/${artist.slug}`} key={artist.id}>
                    <div className="h-72 bg-[#16253a] overflow-hidden">
                      {image ? (
                        <img alt={image.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={image.url} />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-white">
                          <span className="material-symbols-outlined text-6xl" aria-hidden="true">theater_comedy</span>
                        </div>
                      )}
                    </div>
                    <div className="p-stack-md">
                      <p className="font-caption text-caption uppercase text-primary">{artist.artistType === 'group' ? 'Group' : 'Individual'}</p>
                      <h3 className="font-serif font-medium text-headline-md text-on-surface mt-1 group-hover:text-[#df5f18] transition-colors">
                        {artist.name}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-2 line-clamp-2">{artist.shortBiography}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-14 md:py-20" id="artist-directory">
        <div className="max-w-3xl mb-stack-lg">
          <p className="font-label-md text-label-md text-[#df5f18] uppercase mb-stack-sm">Explore Roster</p>
          <h2 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-surface">
            Cultural Artists
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-sm">
            Search by name, location, category, or artist type. Booking availability is always subject to final NEZCC confirmation.
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
            <button className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-primary px-5 py-2 font-label-md text-label-md text-white transition-colors hover:bg-[#147fba]" type="submit">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">filter_alt</span>
              Apply Filters
            </button>
            {hasFilters && (
              <Link className="inline-flex min-h-[44px] items-center rounded-lg border border-outline-variant bg-white px-5 py-2 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-low" href="/artists">
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
                <article className="group bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full" key={artist.id}>
                  <Link className="block h-64 bg-surface-container overflow-hidden border-b border-outline-variant" href={`/artists/${artist.slug}`}>
                    {image ? (
                      <img alt={image.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={image.url} />
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
                      <h3 className="font-serif font-medium text-headline-md text-on-surface">
                        <Link className="hover:text-[#df5f18] transition-colors" href={`/artists/${artist.slug}`}>
                          {artist.name}
                        </Link>
                      </h3>
                      <p className="mt-1 flex items-center gap-1 font-body-md text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[17px]" aria-hidden="true">location_on</span>
                        {[artist.districtCity, artist.stateRegion].filter(Boolean).join(', ')}
                      </p>
                    </div>

                    {categoryNames && <p className="font-label-md text-label-md text-primary">{categoryNames}</p>}

                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 flex-grow">
                      {artist.shortBiography}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-stack-sm border-t border-outline-variant pt-stack-md">
                      <Link className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:underline" href={`/artists/${artist.slug}`}>
                        View Profile
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
                      </Link>
                      {artist.bookingEnabled ? (
                        <Link className="inline-flex items-center rounded-lg bg-[#001551] px-4 py-2 font-label-md text-label-md text-white transition-colors hover:bg-primary" href={`/artists/${artist.slug}#booking`}>
                          Book Now
                        </Link>
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
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Try clearing filters or checking back after more artist profiles are published.
            </p>
          </div>
        )}
      </section>

      {videos.length > 0 && (
        <section className="bg-surface-container-lowest border-y border-outline-variant py-14 md:py-20">
          <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="mb-stack-lg">
              <p className="font-label-md text-label-md text-[#df5f18] uppercase mb-stack-sm">Cultural Media</p>
              <h2 className="font-serif font-medium text-headline-lg text-on-surface">Artist Videos</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Watch selected public video links from NEZCC artist profiles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {videos.map((video) => (
                <a className="group rounded-lg border border-outline-variant bg-white p-stack-md shadow-sm transition-colors hover:bg-surface-container-low" href={video.url} key={`${video.artistSlug}-${video.url}`} rel="noopener noreferrer" target="_blank">
                  <span className="material-symbols-outlined text-4xl text-primary" aria-hidden="true">play_circle</span>
                  <h3 className="font-serif font-medium text-headline-md text-on-surface mt-stack-sm group-hover:text-[#df5f18] transition-colors">
                    {video.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">{video.artistName}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
