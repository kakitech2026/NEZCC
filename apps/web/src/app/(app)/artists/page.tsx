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

const previewFeaturedArtists = [
  {
    category: 'Folk Dance Ensemble',
    image: '/images/events/foundation.jpg',
    location: 'Nagaland',
    name: 'Ao Cultural Dance Troupe',
    slug: 'preview-ao-cultural-dance-troupe',
  },
  {
    category: 'Traditional Music',
    image: '/images/events/folk-music.jpg',
    location: 'Meghalaya',
    name: 'Khasi Traditional Musicians',
    slug: 'preview-khasi-traditional-musicians',
  },
  {
    category: 'Handicraft Demonstration',
    image: '/images/events/handloom.jpg',
    location: 'Assam',
    name: 'Bamboo & Handloom Artisans',
    slug: 'preview-bamboo-handloom-artisans',
  },
  {
    category: 'Cultural Resource Person',
    image: '/images/art_heritage.webp',
    location: 'North East India',
    name: 'Heritage Documentation Circle',
    slug: 'preview-heritage-documentation-circle',
  },
]

const previewShorts = [
  {
    duration: '0:45',
    image: '/images/ziro.webp',
    title: 'Festival Rhythms from the Hills',
    views: '12.4k',
  },
  {
    duration: '0:59',
    image: '/images/manipur.webp',
    title: 'Classical Movement and Living Memory',
    views: '8.9k',
  },
  {
    duration: '1:08',
    image: '/images/arunachal.webp',
    title: 'Ceremonial Costumes and Community',
    views: '6.3k',
  },
  {
    duration: '0:52',
    image: '/images/losar.webp',
    title: 'Music, Craft, and Oral Traditions',
    views: '5.7k',
  },
]

const previewDirectoryArtists = [
  {
    artistType: 'group',
    bookingEnabled: true,
    category: 'Folk Dance Ensemble',
    districtCity: 'Mokokchung',
    image: '/images/events/foundation.jpg',
    isFeatured: true,
    name: 'Ao Cultural Dance Troupe',
    shortBiography:
      'A traditional ensemble presenting ceremonial dances, community songs, and festival performances rooted in the cultural heritage of Nagaland.',
    slug: 'preview-ao-cultural-dance-troupe',
    stateRegion: 'Nagaland',
  },
  {
    artistType: 'group',
    bookingEnabled: true,
    category: 'Traditional Music',
    districtCity: 'Shillong',
    image: '/images/events/folk-music.jpg',
    isFeatured: true,
    name: 'Khasi Traditional Musicians',
    shortBiography:
      'A collective of instrumentalists and vocal performers specializing in indigenous rhythms, folk melodies, and live cultural accompaniment.',
    slug: 'preview-khasi-traditional-musicians',
    stateRegion: 'Meghalaya',
  },
  {
    artistType: 'individual',
    bookingEnabled: true,
    category: 'Handicraft Demonstration',
    districtCity: 'Majuli',
    image: '/images/events/handloom.jpg',
    isFeatured: false,
    name: 'Rupali Handloom Artisan',
    shortBiography:
      'A craft practitioner demonstrating handloom weaving, textile motifs, natural materials, and traditional design methods from Assam.',
    slug: 'preview-rupali-handloom-artisan',
    stateRegion: 'Assam',
  },
  {
    artistType: 'individual',
    bookingEnabled: false,
    category: 'Cultural Resource Person',
    districtCity: 'Dimapur',
    image: '/images/art_heritage.webp',
    isFeatured: false,
    name: 'Dr. Alem Heritage Scholar',
    shortBiography:
      'A cultural researcher available for lectures, orientation sessions, documentation guidance, and heritage education programmes.',
    slug: 'preview-alem-heritage-scholar',
    stateRegion: 'Nagaland',
  },
  {
    artistType: 'group',
    bookingEnabled: true,
    category: 'Festival Performance',
    districtCity: 'Imphal',
    image: '/images/manipur.webp',
    isFeatured: false,
    name: 'Manipuri Classical Ensemble',
    shortBiography:
      'A performance group presenting refined movement traditions, devotional repertoire, costume heritage, and institutional stage programmes.',
    slug: 'preview-manipuri-classical-ensemble',
    stateRegion: 'Manipur',
  },
  {
    artistType: 'group',
    bookingEnabled: true,
    category: 'Folk Music & Dance',
    districtCity: 'Ziro',
    image: '/images/ziro.webp',
    isFeatured: false,
    name: 'Apatani Folk Collective',
    shortBiography:
      'Community performers sharing folk songs, dance traditions, ceremonial expressions, and cultural presentations from Arunachal Pradesh.',
    slug: 'preview-apatani-folk-collective',
    stateRegion: 'Arunachal Pradesh',
  },
]

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

  const categories = categoriesResult.docs as ArtistCategory[]
  const locations = Array.from(
    new Set([
      ...(allArtistsResult.docs as Artist[]).map((artist) => artist.stateRegion).filter(Boolean),
      ...previewDirectoryArtists.map((artist) => artist.stateRegion),
    ]),
  ).sort((a, b) => a.localeCompare(b))
  const artists = previewDirectoryArtists
  const hasFilters = Boolean(category || location || q || type)

  return (
    <main className="flex-grow min-h-screen pb-20">
      <section className="relative min-h-[560px] overflow-hidden bg-[#16253a]">
        <img
          alt="Cultural artists from North East India"
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/hero/hero-landscape4.png"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c30]/95 via-[#0b1c30]/70 to-[#0b1c30]/20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-container-max-width items-end px-margin-mobile py-16 md:px-margin-desktop md:py-20">
          <div className="max-w-3xl text-white">
            <p className="font-label-md text-label-md uppercase text-[#FF9933] mb-stack-sm">Artist Directory</p>
            <h1 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl">
              Experience the Living Traditions of the North East
            </h1>
            <p className="mt-stack-md max-w-2xl font-body-lg text-body-lg text-white/90">
              Browse NEZCC-associated artists, ensembles, craft practitioners, and cultural resource persons for public, institutional, and official programmes.
            </p>
            <div className="mt-stack-lg flex flex-col gap-stack-md sm:flex-row">
              <a className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-primary px-7 py-3 font-label-md text-label-md text-white shadow-lg transition-colors hover:bg-[#147fba]" href="#artist-directory">
                Explore Artists
              </a>
              <a className="inline-flex min-h-[52px] items-center justify-center rounded-lg border border-white/40 bg-white/10 px-7 py-3 font-label-md text-label-md text-white backdrop-blur-sm transition-colors hover:bg-white/20" href="#featured-artists">
                View Featured
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-10 mb-8">
        <div className="mx-auto max-w-container-max-width px-margin-mobile md:px-margin-desktop">
          <form className="rounded-lg bg-white p-2 shadow-lg ring-1 ring-outline-variant/70" action="/artists">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.15fr_1fr_1fr_0.8fr_48px]">
              <label className="flex min-h-[44px] items-center gap-2 rounded-md border border-[#dbe3f3] bg-[#eef4ff] px-3 text-on-surface focus-within:border-primary">
                <span className="material-symbols-outlined text-[18px] text-[#72839b]" aria-hidden="true">search</span>
                <span className="sr-only">Search</span>
                <input
                  className="h-full min-h-[42px] flex-1 border-0 bg-transparent p-0 font-body-md text-[15px] text-on-surface outline-none placeholder:text-[#72839b] focus:ring-0"
                  defaultValue={q}
                  name="q"
                  placeholder="Search name, city, or art form"
                  type="search"
                />
              </label>

              <label className="relative">
                <span className="sr-only">Category</span>
                <select className="min-h-[44px] w-full appearance-none rounded-md border border-[#dbe3f3] bg-[#eef4ff] px-4 py-2 pr-9 font-body-md text-[15px] text-on-surface outline-none focus:border-primary" defaultValue={category} name="category">
                  <option value="">All categories</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#72839b]" aria-hidden="true">keyboard_arrow_down</span>
              </label>

              <label className="relative">
                <span className="sr-only">Location</span>
                <select className="min-h-[44px] w-full appearance-none rounded-md border border-[#dbe3f3] bg-[#eef4ff] px-4 py-2 pr-9 font-body-md text-[15px] text-on-surface outline-none focus:border-primary" defaultValue={location} name="location">
                  <option value="">All locations</option>
                  {locations.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#72839b]" aria-hidden="true">keyboard_arrow_down</span>
              </label>

              <label className="relative">
                <span className="sr-only">Artist Type</span>
                <select className="min-h-[44px] w-full appearance-none rounded-md border border-[#dbe3f3] bg-[#eef4ff] px-4 py-2 pr-9 font-body-md text-[15px] text-on-surface outline-none focus:border-primary" defaultValue={type} name="type">
                  <option value="">All types</option>
                  <option value="individual">Individual</option>
                  <option value="group">Group</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#72839b]" aria-hidden="true">keyboard_arrow_down</span>
              </label>

              <button className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-[#147fba]" type="submit" aria-label="Apply artist filters">
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">tune</span>
              </button>
            </div>

            {hasFilters && (
              <div className="mt-stack-sm">
                <Link className="inline-flex min-h-[32px] items-center px-1 font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary" href="/artists">
                  Clear filters
                </Link>
              </div>
            )}
          </form>
        </div>
      </section>

      <section className="bg-surface-container-lowest pb-20 pt-12 md:pb-24 md:pt-16" id="featured-artists">
        <div className="mx-auto max-w-container-max-width px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-label-md text-label-md uppercase text-[#df5f18] mb-stack-sm">Featured Roster</p>
              <h2 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-surface">
                Featured Artists
              </h2>
              <p className="mt-stack-md max-w-md font-body-lg text-body-lg text-on-surface-variant">
                Preview layout using sample artists. Once approved, these cards can be powered by artists marked as featured in the admin panel.
              </p>
              <div className="mt-stack-lg flex flex-wrap items-center gap-stack-sm">
                <a className="flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant bg-white text-on-surface transition-colors hover:bg-primary hover:text-white" href="#artist-directory" aria-label="Go to artist directory">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_back</span>
                </a>
                <a className="flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant bg-white text-on-surface transition-colors hover:bg-primary hover:text-white" href="#artist-directory" aria-label="Go to artist directory">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_forward</span>
                </a>
                <a className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-5 py-2 font-label-md text-label-md text-white shadow-sm transition-colors hover:bg-[#147fba]" href="#artist-directory">
                  View All Artists
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-stack-md md:gap-gutter lg:col-span-7">
              <div className="space-y-stack-md md:space-y-gutter">
                {[previewFeaturedArtists[0], previewFeaturedArtists[2]].map((artist, index) => (
                  <a
                    className={`${index === 0 ? 'min-h-[310px] md:min-h-[400px]' : 'min-h-[220px] md:min-h-[250px]'} group relative block overflow-hidden rounded-lg bg-surface-container shadow-md transition-transform duration-500 hover:-translate-y-1`}
                    href="#artist-directory"
                    key={artist.slug}
                  >
                    <img alt={artist.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={artist.image} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />
                    <div className="relative flex h-full min-h-[220px] flex-col justify-end p-stack-md text-white">
                      <p className="font-caption text-caption uppercase text-white/75">{artist.category}</p>
                      <h3 className="mt-1 font-serif text-headline-md font-medium">{artist.name}</h3>
                      <p className="mt-2 font-body-md text-body-md text-white/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{artist.location}</p>
                      <span className="mt-stack-md h-1 w-10 bg-[#FF9933] transition-all duration-300 group-hover:w-16" aria-hidden="true" />
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-12 space-y-stack-md md:space-y-gutter">
                {[previewFeaturedArtists[1], previewFeaturedArtists[3]].map((artist, index) => (
                  <a
                    className={`${index === 0 ? 'min-h-[220px] md:min-h-[250px]' : 'min-h-[310px] md:min-h-[400px]'} group relative block overflow-hidden rounded-lg bg-surface-container shadow-md transition-transform duration-500 hover:-translate-y-1`}
                    href="#artist-directory"
                    key={artist.slug}
                  >
                    <img alt={artist.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={artist.image} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />
                    <div className="relative flex h-full min-h-[220px] flex-col justify-end p-stack-md text-white">
                      <p className="font-caption text-caption uppercase text-white/75">{artist.category}</p>
                      <h3 className="mt-1 font-serif text-headline-md font-medium">{artist.name}</h3>
                      <p className="mt-2 font-body-md text-body-md text-white/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{artist.location}</p>
                      <span className="mt-stack-md h-1 w-10 bg-[#FF9933] transition-all duration-300 group-hover:w-16" aria-hidden="true" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-outline-variant bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-container-max-width px-margin-mobile md:px-margin-desktop">
          <div className="mb-stack-lg flex flex-col gap-stack-md md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-label-md text-label-md uppercase text-[#df5f18] mb-stack-sm">Cultural Media</p>
              <h2 className="font-serif font-medium text-headline-lg text-on-surface">Cultural Shorts</h2>
              <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                Dummy reel cards for previewing the section layout before connecting real artist media.
              </p>
            </div>
            <div className="hidden gap-2 sm:flex" aria-hidden="true">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-on-surface">
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-on-surface">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </span>
            </div>
          </div>

          <div className="flex snap-x snap-mandatory gap-gutter overflow-x-auto pb-stack-md">
            {previewShorts.map((short) => (
              <a
                className="group relative h-[460px] w-[260px] flex-none snap-center overflow-hidden rounded-lg bg-surface-variant shadow-md md:h-[500px] md:w-[280px]"
                href="#artist-directory"
                key={short.title}
              >
                <img alt={short.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={short.image} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/85" />
                <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded bg-black/50 px-2 py-1 text-white backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">play_circle</span>
                  <span className="font-caption text-caption">{short.duration}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-stack-md text-white">
                  <h3 className="font-serif font-medium text-headline-md leading-tight">{short.title}</h3>
                  <p className="mt-2 flex items-center gap-1 font-body-md text-body-md text-white/75">
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">visibility</span>
                    {short.views}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[430px] overflow-hidden">
        <img alt="Celebrating cultural preservation in North East India" className="absolute inset-0 h-full w-full object-cover" src="/images/hero/hero-landscape6.png" />
        <div className="absolute inset-0 bg-primary/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001551]/95 via-[#001551]/45 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[430px] max-w-container-max-width flex-col items-center justify-center px-margin-mobile py-16 text-center text-white md:px-margin-desktop">
          <div className="mb-stack-md flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm">
            <span className="material-symbols-outlined text-4xl text-[#FF9933]" aria-hidden="true">workspace_premium</span>
          </div>
          <h2 className="max-w-4xl font-serif text-[36px] font-medium leading-tight md:text-[56px]">
            Celebrating Cultural Preservation. Join the Legacy.
          </h2>
          <p className="mt-stack-md max-w-2xl font-body-lg text-body-lg text-white/85">
            A preview banner for the future booking journey, using the existing NEZCC visual system.
          </p>
          <a className="mt-stack-lg inline-flex min-h-[52px] items-center justify-center rounded-lg bg-[#FF9933] px-7 py-3 font-label-md text-label-md text-[#0b1c30] shadow-lg transition-colors hover:bg-white" href="#artist-directory">
            Start Booking Request
          </a>
        </div>
      </section>

      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-14 md:pt-20" id="artist-directory">
        <div className="mb-stack-lg flex flex-col gap-stack-md md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="font-label-md text-label-md text-[#df5f18] uppercase mb-2">Artist Directory</p>
            <h2 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-surface">
              Cultural Artists
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-sm">
              A cleaner preview of how published artists can appear once real NEZCC roster content is connected.
            </p>
          </div>
          <p className="shrink-0 rounded-full bg-surface-container-lowest px-4 py-2 font-label-md text-label-md text-on-surface-variant">
            {artists.length} preview {artists.length === 1 ? 'artist' : 'artists'}
          </p>
        </div>

        {artists.length > 0 ? (
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => {
              return (
                <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-md" key={artist.slug}>
                  <Link className="relative block aspect-[4/3] overflow-hidden bg-surface-container" href="#artist-directory">
                    <img alt={artist.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" src={artist.image} />
                    {artist.isFeatured && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#fff4e9] px-3 py-1 font-caption text-caption font-semibold uppercase text-[#df5f18] shadow-sm">
                        Featured
                      </span>
                    )}
                  </Link>

                  <div className="flex flex-grow flex-col p-stack-md">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="font-label-md text-label-md text-primary">{artist.category}</span>
                        <span className="h-1 w-1 rounded-full bg-outline" aria-hidden="true" />
                        <span className="font-caption text-caption uppercase text-on-surface-variant">
                          {artist.artistType === 'group' ? 'Group' : 'Individual'}
                        </span>
                      </div>
                      <h3 className="font-serif font-medium text-headline-md text-on-surface">
                        <Link className="hover:text-[#df5f18] transition-colors" href="#artist-directory">
                          {artist.name}
                        </Link>
                      </h3>
                      <p className="mt-1 flex items-center gap-1 font-body-md text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[17px]" aria-hidden="true">location_on</span>
                        {[artist.districtCity, artist.stateRegion].filter(Boolean).join(', ')}
                      </p>
                    </div>

                    <p className="mt-stack-md line-clamp-2 flex-grow font-body-md text-body-md text-on-surface-variant">
                      {artist.shortBiography}
                    </p>

                    <div className="mt-stack-md flex flex-wrap items-center justify-between gap-stack-sm border-t border-outline-variant pt-stack-md">
                      <Link className="inline-flex min-h-[40px] items-center gap-1 font-label-md text-label-md text-primary hover:underline" href="#artist-directory">
                        View Profile
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
                      </Link>
                      {artist.bookingEnabled ? (
                        <span className="rounded-full bg-[#ecfdf3] px-3 py-1 font-caption text-caption font-semibold uppercase text-[#15803d]">
                          Requests Open
                        </span>
                      ) : (
                        <span className="rounded-full bg-surface-container-low px-3 py-1 font-caption text-caption font-semibold uppercase text-on-surface-variant">
                          Unavailable
                        </span>
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
