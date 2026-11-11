import Image from 'next/image'

const states = [
  'Arunachal Pradesh',
  'Assam',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Sikkim',
  'Tripura',
]

const objectives = [
  {
    title: 'Arts of the Zone',
    icon: 'palette',
    text: 'To preserve, innovate and promote the projection and dissemination of the arts of the Zone under the broad disciplines of Sangeet Natak, Lalit Kala and Sahitya.',
  },
  {
    title: 'Cultural Diversity',
    icon: 'diversity_2',
    text: 'To develop and promote the rich diversity and uniqueness of the various arts of the Zone, and to upgrade and enrich the consciousness of the people about their cultural heritage.',
  },
  {
    title: 'A Shared Cultural Identity',
    icon: 'account_tree',
    text: 'To lay special emphasis in its activities on the linkages among various areas through the evolution of styles and their contribution to the largest composite identity of India’s cultural heritage.',
  },
  {
    title: 'Folk and Tribal Arts',
    icon: 'history_edu',
    text: 'To make special efforts to encourage folk and tribal arts and to frame special programmes for their preservation, including documentation and sustaining vanishing art forms.',
  },
  {
    title: 'Youth and Cultural Exchange',
    icon: 'groups',
    text: 'To encourage and involve the youth of the Zone, both among themselves and together with youth from the rest of the country, in creative cultural communication through seminars, exchanges and workshops on matters relating to India’s cultural heritage.',
  },
  {
    title: 'Inter-State Cultural Linkages',
    icon: 'handshake',
    text: 'To pursue activities and programmes that strengthen and promote cultural inter-linkages among States, including the setting up of Sub-Centres within the Zone.',
  },
  {
    title: 'Research in the Arts',
    icon: 'school',
    text: 'To encourage research activities relating to various art forms.',
  },
]

const masterPlanFacilities = [
  'Administrative Building',
  'Artistes Dormitory (Ground Floor)',
  'Essential Staff Quarters: Director’s Residence, Deputy Director’s Residence and Officers’ Quarters',
  'Site Development Works',
  'Performing Art Block',
  'Library Building',
  'Auditorium Building',
  'Open Air Theatre',
  'Museum Building',
  'VIP Guest House',
  'Residential Buildings',
  'Service Block',
]

const completedFacilities = [
  'Site Development Works',
  'Administrative Building',
  'Artistes Dormitory (Ground Floor) – 200 capacity',
  'Director’s Residence',
  'Essential Staff Quarters – 14 units',
]

const shilpgramFacilities = [
  { name: 'Exhibition-cum-Sale Counter', detail: '45 stalls' },
  { name: 'Pavilion Block', detail: '8 pavilions' },
  { name: 'Traditional Food Stalls', detail: '8 stalls' },
  { name: 'Artistes Dormitory', detail: '150 capacity' },
  { name: 'Canteen', detail: '1' },
  { name: 'Multipurpose Open Air Stage', detail: '4,000–5,000 capacity' },
  { name: 'Administrative Block', detail: '1' },
  { name: 'A.C. Auditorium', detail: '350 capacity' },
  { name: 'Children’s Park' },
  { name: 'Open Food Court' },
  { name: 'Guest House', detail: '6 rooms' },
]

export default function IntroductionOfNEZCC() {
  return (
    <main className="max-w-container-max-width mx-auto px-margin-desktop pt-16 md:pt-24 pb-stack-lg min-h-screen">
      <section className="mb-stack-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div>
            <h1 className="font-serif font-medium text-headline-xl text-primary mb-stack-md">
              Introduction of NEZCC
            </h1>
            <div className="h-1 w-20 bg-[#4cb748] mb-stack-md" />
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-md">
              Under the aegis of the Ministry of Culture, Government of India, the
              North East Zone Cultural Centre (NEZCC), as the Zonal Cultural
              Centre for North East India, was established in June 1986 with its
              headquarters at Dimapur, Nagaland.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              NEZCC serves the eight constituent States of Arunachal Pradesh,
              Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim and Tripura.
            </p>
          </div>
          <div
            role="img"
            aria-label="North East Zone Cultural Centre headquarters in Dimapur, Nagaland."
            className="rounded-xl overflow-hidden shadow-sm border border-outline-variant bg-surface-container-lowest h-64 md:h-full min-h-[300px] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/about/nezcc_hq.webp')" }}
          />
        </div>
      </section>

      <section className="mb-stack-lg bg-surface-container-low p-stack-lg rounded-xl border border-outline-variant shadow-sm">
        <h2 className="font-serif font-medium text-headline-md text-on-surface mb-stack-md">
          Constituent States
        </h2>
        <div className="h-1 w-16 bg-[#f97316] mb-stack-md" />
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-stack-md">
          {states.map((state) => (
            <li
              key={state}
              className="bg-surface-container-lowest p-stack-md rounded-lg border border-outline-variant flex items-center gap-stack-sm"
            >
              <span className="material-symbols-outlined text-primary" aria-hidden="true">
                location_on
              </span>
              <span className="font-label-md text-label-md text-on-surface">{state}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-stack-lg">
        <div className="text-center max-w-4xl mx-auto mb-stack-lg">
          <h2 className="font-serif font-medium text-headline-lg text-primary mb-stack-sm">
            Aims and Objectives
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-stack-md" />
          <p className="font-body-md text-body-md text-on-surface-variant">
            With the vision of promoting and preserving the rich cultural
            heritage of the North East, promoting cultural linkages and creative
            cultural communication among the States and with the rest of the
            country, and contributing to the largest composite identity of
            India’s cultural heritage, NEZCC was established with the following
            aims and objects:
          </p>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {objectives.map((objective, index) => (
            <li
              key={objective.title}
              className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-stack-md">
                <span className="material-symbols-outlined text-primary text-3xl" aria-hidden="true">
                  {objective.icon}
                </span>
                <span className="font-label-md text-label-md text-primary" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-label-md text-label-md text-on-surface mb-stack-sm font-medium">
                {objective.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {objective.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-stack-lg">
        <div className="mb-stack-lg">
          <h2 className="font-serif font-medium text-headline-lg text-primary mb-stack-sm">
            Infrastructure Facilities
          </h2>
          <div className="h-1 w-24 bg-primary mb-stack-md" />
        </div>

        <article className="bg-surface-bright rounded-xl border border-outline-variant shadow-sm overflow-hidden mb-stack-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-gutter p-stack-lg bg-surface-container-low">
            <div>
              <h3 className="font-serif font-medium text-headline-md text-on-surface mb-stack-sm">
                Head Office, Dimapur
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                The NEZCC Head Office is adjacent to Dimapur Airport, about 6 km
                from the main city. The Government of Nagaland provided 20 acres
                of prime land near the airport, free of cost, for the Centre. As
                the site had no existing infrastructure, the Governing Body and
                Executive Board approved a master plan to develop a full-fledged
                Cultural Centre and address the shortage of arts infrastructure
                in the North East, particularly in the host State.
              </p>
            </div>

            <figure className="w-full max-w-xl justify-self-center lg:justify-self-end">
              <Image
                src="/images/about/nezcc-dimapur-facilities-map.webp"
                alt="Satellite map of the NEZCC Dimapur campus showing the Head Office, roads and Stone Garden."
                width={2472}
                height={1239}
                sizes="(max-width: 1024px) calc(100vw - 3rem), 576px"
                className="h-auto w-full rounded-lg border border-outline-variant shadow-sm"
              />
              <figcaption className="mt-1 text-xs text-on-surface-variant/70">
                NEZCC Head Office and campus site plan, Dimapur.
              </figcaption>
            </figure>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter p-stack-lg">
            <div>
              <h4 className="font-label-md text-label-md text-on-surface mb-stack-md font-medium">
                Master Plan
              </h4>
              <ol className="space-y-2">
                {masterPlanFacilities.map((facility, index) => (
                  <li
                    key={facility}
                    className="flex gap-stack-sm items-start text-on-surface-variant"
                  >
                    <span className="font-label-md text-primary min-w-8">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-body-md text-body-md">{facility}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h4 className="font-label-md text-label-md text-on-surface mb-stack-md font-medium">
                Facilities Completed
              </h4>
              <ul className="space-y-2 mb-stack-lg">
                {completedFacilities.map((facility) => (
                  <li
                    key={facility}
                    className="flex gap-stack-sm items-start text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">
                      check_circle
                    </span>
                    <span className="font-body-md text-body-md">{facility}</span>
                  </li>
                ))}
              </ul>

              <h4 className="font-label-md text-label-md text-on-surface mb-stack-md font-medium">
                Other Projects at the Complex
              </h4>
              <div className="space-y-stack-sm">
                <div className="p-stack-md bg-surface-container-low rounded-lg border border-outline-variant">
                  <h5 className="font-label-md text-label-md text-on-surface mb-2 font-medium">
                    NEZCC Stone Sculpture Garden
                  </h5>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    The garden includes stone sculptures, a children’s park,
                    traditional huts representing Arunachal Pradesh, Assam,
                    Manipur, Meghalaya, Mizoram, Nagaland, Sikkim and Tripura,
                    and an amphitheatre.
                  </p>
                </div>
                <div className="p-stack-md bg-surface-container-low rounded-lg border border-outline-variant">
                  <h5 className="font-label-md text-label-md text-on-surface font-medium">
                    Regional Convention Centre
                  </h5>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Construction of a Regional Convention Centre at the NEZCC
                    Complex, Dimapur, has also been taken up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="bg-surface-bright rounded-xl overflow-hidden border border-outline-variant shadow-sm">
        <div className="p-stack-lg lg:p-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-gutter">
            <Image
              src="/images/about/nezcc-shilpgram-guwahati.webp"
              alt="Entrance gate at NEZCC Shilpgram in Guwahati."
              width={1360}
              height={1020}
              sizes="(max-width: 1024px) calc(100vw - 3rem), 50vw"
              className="h-auto w-full max-w-xl justify-self-center rounded-lg border border-outline-variant"
            />

            <div>
              <div className="inline-flex items-center gap-2 mb-stack-md bg-surface-container-high text-primary px-3 py-1 rounded-full w-max text-sm font-semibold">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  storefront
                </span>
                Cultural Facility
              </div>
              <h2 className="font-serif font-medium text-headline-lg text-on-surface mb-stack-md">
                NEZCC Shilpgram, Guwahati
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-sm">
                In line with the decision of the Ministry of Culture, Government
                of India, NEZCC established its Shilpgram in Guwahati. The
                Government of Assam allotted 7 acres of land, free of cost, at
                Panjabari, adjacent to Srimanta Sankardeva Kalakshetra.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-sm">
                Shilpgram began functioning after its inauguration on 17 January
                2006. It is about 38 km from Guwahati Airport and 12 km from the
                Guwahati Railway Station.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Its facilities provide avenues for artisans to produce and
                market the arts and crafts of the North East.
              </p>
            </div>
          </div>

          <div className="mt-stack-lg border-t border-outline-variant pt-stack-lg">
            <h3 className="font-label-md text-label-md text-on-surface mb-stack-md font-medium">
              Facilities
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.85fr)] items-start gap-gutter">
              <figure className="order-first w-full max-w-2xl justify-self-center xl:order-last xl:justify-self-end">
                <Image
                  src="/images/about/shilpgram-Guwahati-facilities-map.webp"
                  alt="Satellite map of NEZCC Shilpgram in Guwahati showing the paths and facility buildings."
                  width={2628}
                  height={1494}
                  sizes="(max-width: 1279px) calc(100vw - 3rem), 35vw"
                  className="h-auto w-full rounded-lg border border-outline-variant shadow-sm"
                />
                <figcaption className="mt-1 text-xs text-on-surface-variant/70">
                  Shilpgram, Guwahati facilities map.
                </figcaption>
              </figure>

              <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-stack-sm">
                {shilpgramFacilities.map((facility) => (
                  <li
                    key={facility.name}
                    className="bg-surface-container-low p-stack-md rounded-lg border border-outline-variant"
                  >
                    <span className="font-label-md text-label-md text-on-surface">
                      {facility.name}
                    </span>
                    {facility.detail && (
                      <span className="block font-body-md text-body-md text-on-surface-variant mt-1">
                        {facility.detail}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
