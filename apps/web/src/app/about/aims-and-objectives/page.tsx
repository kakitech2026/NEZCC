import React from 'react';

export default function AimsAndObjectives() {
  return (
    <main className="flex-grow">
      {/* Page Header */}
      <section className="bg-surface-container py-12 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max-width mx-auto">
          {/* Added Breadcrumbs for consistency */}
          <nav aria-label="Breadcrumb" className="flex text-on-surface-variant font-caption text-caption mb-4">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a className="hover:text-primary transition-colors" href="/">Home</a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-sm mx-1">chevron_right</span>
                  <span className="text-on-surface-variant ml-1 md:ml-2">About Us</span>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-sm mx-1">chevron_right</span>
                  <span className="text-on-surface font-semibold ml-1 md:ml-2">Aims &amp; Objectives</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface">Aims &amp; Objectives</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-3xl">Guiding principles for the preservation and promotion of our cultural heritage.</p>
        </div>
      </section>

      {/* Core Objectives Grid */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface-lowest">
        <div className="max-w-container-max-width mx-auto">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg border-b-2 border-primary inline-block pb-2">Core Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Objective 1 */}
            <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>theater_comedy</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">To preserve, innovate and promote the projection and dissemination of arts of the Zone under the broad discipline of Sangeet Natak, Lalit Kala and Sahitya.</p>
            </div>
            {/* Objective 2 */}
            <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>diversity_3</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">To develop and promote the rich diversity and uniqueness of various arts of the Zone and to upgrade and enrich consciousness of the people about their cultural heritage.</p>
            </div>
            {/* Objective 3 */}
            <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-tertiary-container/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">To lay special emphasis in its activities on the linkages among various areas through evolution of styles and their contribution to the largest composite identity of cultural heritage of India.</p>
            </div>
            {/* Objective 4 */}
            <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>festival</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">To make special efforts to encourage folk and tribal arts and to frame special programme for preservation including documentation and sustaining of the vanishing art forms.</p>
            </div>
            {/* Objective 5 */}
            <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4 lg:col-span-2">
              <div className="w-12 h-12 rounded-full bg-secondary-container/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">To frame such programmes as would encourage and involve the youth of the Zone amongst themselves and with the youth of the rest of the country in creative cultural communications through the process of seminars, exchanges and workshops on matter relating to cultural heritage of India.</p>
            </div>
            {/* Objective 6 */}
            <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-tertiary-container/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">To encourage the research activities relating to various art forms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Vision Narrative */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-low">
        <div className="max-w-container-max-width mx-auto">
          <div className="bg-surface rounded-xl border border-outline-variant p-stack-lg md:p-[48px] shadow-sm">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
              Institutional Vision
            </h2>
            <div className="prose max-w-none text-on-surface-variant font-body-lg text-body-lg space-y-6">
              <p>Distinctively productize progressive deliverables before diverse products. Phosfluorescently formulate out-of-the-box partnerships without error-free meta-services. Credibly evisculate functional experiences after out-of-the-box intellectual capital. Holisticly innovate enterprise e-business for market positioning infomediaries. Dramatically pontificate an expanded array of metrics whereas B2C scenarios.</p>
              <p>Continually strategize B2C materials and resource sucking paradigms. Interactively incubate B2B applications before sticky alignments. Assertively maximize long-term high-impact mindshare without granular platforms. Authoritatively seize interactive benefits without accurate results. Monotonectally transform enabled leadership for cutting-edge relationships.</p>
              <p>Appropriately parallel task bleeding-edge internal or "organic" sources before unique schemas. Credibly expedite robust content before backward-compatible architectures. Interactively extend market positioning leadership vis-a-vis long-term high-impact metrics. Completely maximize sticky ROI vis-a-vis out-of-the-box initiatives. Dramatically revolutionize dynamic scenarios whereas out-of-the-box experiences.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
