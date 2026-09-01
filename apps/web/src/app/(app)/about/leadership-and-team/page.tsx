import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Leadership & Team | North East Zone Cultural Centre',
  description: 'Meet the leadership, officers, and staff of the North East Zone Cultural Centre.',
}

type LinkedPhoto = {
  alt?: string | null
  url?: string | null
}

type Person = {
  designation: string
  emails?: { email: string; id?: string | null }[] | null
  id?: string | null
  name: string
  phone?: string | null
  photo?: string | LinkedPhoto | null
  photoURL?: string | null
}

const getPhoto = (person: Person) => {
  if (typeof person.photo === 'object' && person.photo?.url) {
    return { alt: person.photo.alt || person.name, url: person.photo.url }
  }

  return person.photoURL ? { alt: person.name, url: person.photoURL } : null
}

function ContactDetails({ person, compact = false }: { person: Person; compact?: boolean }) {
  const emails = person.emails || []

  if (emails.length === 0 && !person.phone) return null

  return (
    <div className={compact ? 'mt-3 space-y-1' : 'space-y-2'}>
      {emails.length > 0 && (
        <div className="flex items-start gap-2">
          <span className="material-symbols-outlined text-on-surface-variant text-base mt-1" aria-hidden="true">mail</span>
          <div className="font-body-md text-body-md text-on-surface-variant break-all">
            {emails.map((entry) => (
              <a className="hover:text-primary hover:underline block" href={`mailto:${entry.email}`} key={entry.id || entry.email}>
                {entry.email}
              </a>
            ))}
          </div>
        </div>
      )}
      {person.phone && (
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface-variant text-base" aria-hidden="true">call</span>
          <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline" href={`tel:${person.phone}`}>
            {person.phone}
          </a>
        </div>
      )}
    </div>
  )
}

function Portrait({ person, compact = false }: { person: Person; compact?: boolean }) {
  const photo = getPhoto(person)
  const sizeClass = compact ? 'w-16 h-16 rounded-full' : 'w-32 h-32 rounded'

  return (
    <div className={`${sizeClass} flex-shrink-0 bg-surface-container overflow-hidden flex items-center justify-center`}>
      {photo ? (
        <img alt={photo.alt} className="w-full h-full object-cover" src={photo.url} />
      ) : (
        <span className={`material-symbols-outlined text-outline ${compact ? 'text-4xl' : 'text-6xl'}`} aria-hidden="true">person</span>
      )}
    </div>
  )
}

export default async function LeadershipAndTeamPage() {
  const payload = await getPayloadClient()
  const page = await payload.findGlobal({ slug: 'leadership-page', depth: 1 })
  const leaders = (page.leaders || []) as Person[]
  const staff = (page.staff || []) as Person[]

  return (
    <main className="flex-grow w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-16 md:pt-24 pb-stack-lg">
      <div className="mb-stack-lg">
        <h1 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-surface">{page.pageTitle}</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-3xl whitespace-pre-wrap">{page.pageDescription}</p>
      </div>

      {leaders.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif font-medium text-headline-lg text-on-surface mb-stack-md border-b border-outline-variant pb-2">{page.leadershipSectionTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {leaders.map((leader) => (
              <article className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-stack-md items-start" key={leader.id || leader.name}>
                <Portrait person={leader} />
                <div className="flex-grow min-w-0">
                  <h3 className="font-serif font-medium text-headline-md text-on-surface mb-1">{leader.name}</h3>
                  <p className="font-label-md text-label-md text-primary-container mb-4">({leader.designation})</p>
                  <ContactDetails person={leader} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {staff.length > 0 && (
        <section>
          <h2 className="font-serif font-medium text-headline-lg text-on-surface mb-stack-md border-b border-outline-variant pb-2">{page.staffSectionTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {staff.map((member) => (
              <article className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow" key={member.id || member.name}>
                <div className="flex items-center gap-4">
                  <Portrait person={member} compact />
                  <div className="min-w-0">
                    <h3 className="font-serif font-medium text-headline-md text-on-surface text-lg">{member.name}</h3>
                    <p className="font-label-md text-label-md text-primary-container">({member.designation})</p>
                  </div>
                </div>
                <ContactDetails person={member} compact />
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
