import React from 'react';

export default function IntroductionOfNEZCC() {
  return (
    <main className="max-w-container-max-width mx-auto px-margin-desktop pt-16 md:pt-24 pb-stack-lg min-h-screen">

      {/* Hero Section */}
      <section className="mb-stack-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div>
            <h1 className="font-serif font-medium text-headline-xl text-primary mb-stack-md">Introduction of NEZCC</h1>
            <div className="h-1 w-20 bg-[#4cb748] mb-stack-md"></div>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-md">
              The Zonal Cultural Centre of the Northeast India, North East Zone Cultural Centre was set up in June 1986 with its headquarters at Dimapur, Nagaland. The 8 (eight) North Eastern States, viz; Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim and Tripura are the constituent States of the North East Zone Cultural Centre.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              The NEZCC started functioning with the formal inauguration of the Centre by Late Rajiv Gandhi, the then Prime Minister of India on 6th October 1987.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-sm border border-outline-variant bg-surface-container-lowest h-64 md:h-full relative group">
            <div className="bg-cover bg-center w-full h-full min-h-[300px]" data-alt="Photograph of the North East Zone Cultural Centre headquarters building in Dimapur, Nagaland." style={{ backgroundImage: "url('/images/about/nezcc_hq.webp')" }}></div>
          </div>
        </div>
      </section>

      {/* Constituent States Bento Grid */}
      <section className="mb-stack-lg bg-surface-container-low p-stack-lg rounded-xl border border-outline-variant shadow-sm">
        <h2 className="font-serif font-medium text-headline-md text-on-surface mb-stack-md">Constituent States</h2>
        <div className="h-1 w-16 bg-[#f97316] mb-stack-md"></div>
        <p className="mb-stack-md text-on-surface-variant font-body-md text-body-md">NEZCC comprises eight diverse and culturally vibrant member states:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-md">
          <div className="bg-surface-container-lowest p-stack-md rounded-lg border border-outline-variant flex items-center gap-stack-sm hover:shadow-md transition-shadow duration-300">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span className="font-label-md text-label-md text-on-surface">Arunachal Pradesh</span>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-lg border border-outline-variant flex items-center gap-stack-sm hover:shadow-md transition-shadow duration-300">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span className="font-label-md text-label-md text-on-surface">Assam</span>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-lg border border-outline-variant flex items-center gap-stack-sm hover:shadow-md transition-shadow duration-300">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span className="font-label-md text-label-md text-on-surface">Manipur</span>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-lg border border-outline-variant flex items-center gap-stack-sm hover:shadow-md transition-shadow duration-300">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span className="font-label-md text-label-md text-on-surface">Meghalaya</span>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-lg border border-outline-variant flex items-center gap-stack-sm hover:shadow-md transition-shadow duration-300">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span className="font-label-md text-label-md text-on-surface">Mizoram</span>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-lg border border-outline-variant flex items-center gap-stack-sm hover:shadow-md transition-shadow duration-300">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span className="font-label-md text-label-md text-on-surface">Nagaland</span>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-lg border border-outline-variant flex items-center gap-stack-sm hover:shadow-md transition-shadow duration-300">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span className="font-label-md text-label-md text-on-surface">Sikkim</span>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-lg border border-outline-variant flex items-center gap-stack-sm hover:shadow-md transition-shadow duration-300">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span className="font-label-md text-label-md text-on-surface">Tripura</span>
          </div>
        </div>
      </section>

      {/* Aims & Objectives Cards */}
      <section className="mb-stack-lg">
        <div className="text-center max-w-2xl mx-auto mb-stack-lg">
          <h2 className="font-serif font-medium text-headline-lg text-primary mb-stack-sm">Aims and Objectives</h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-stack-md"></div>
          <p className="font-body-md text-body-md text-on-surface-variant">Following are the main aims and objects of the Centre:</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">palette</span>
            </div>
            <span className="material-symbols-outlined text-primary mb-stack-sm text-3xl">palette</span>
            <h3 className="font-label-md text-label-md text-on-surface mb-2 font-medium">Preserve &amp; Promote</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">To preserve, innovate and promote the projection and dissemination of the arts &amp; crafts;</p>
          </div>
          <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-[#f97316]">diversity_2</span>
            </div>
            <span className="material-symbols-outlined text-[#f97316] mb-stack-sm text-3xl">diversity_2</span>
            <h3 className="font-label-md text-label-md text-on-surface mb-2 font-medium">Develop Diversity</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">To develop and promote the rich diversity and uniqueness of various arts and crafts of the Zone and to upgrade and enrich consciousness of the people about their cultural heritage;</p>
          </div>
          <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-[#4cb748]">account_tree</span>
            </div>
            <span className="material-symbols-outlined text-[#4cb748] mb-stack-sm text-3xl">account_tree</span>
            <h3 className="font-label-md text-label-md text-on-surface mb-2 font-medium">Composite Identity</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">To lay special emphasis in its activities on the linkages among various areas through evolution of styles and their contribution to the largest composite identity of cultural heritage of India;</p>
          </div>
          <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">history_edu</span>
            </div>
            <span className="material-symbols-outlined text-primary mb-stack-sm text-3xl">history_edu</span>
            <h3 className="font-label-md text-label-md text-on-surface mb-2 font-medium">Document &amp; Preserve</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">To make special efforts to encourage folk and tribal arts and to frame special programme for preservation by documenting the vanishing art forms;</p>
          </div>
          <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-[#f97316]">groups</span>
            </div>
            <span className="material-symbols-outlined text-[#f97316] mb-stack-sm text-3xl">groups</span>
            <h3 className="font-label-md text-label-md text-on-surface mb-2 font-medium">Youth Involvement</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">To frame such programmes as would encourage and involve the youth of the Zone amongst themselves and with the youth of the rest of the country in creative cultural communications through the process of seminars, exchanges and workshops on matter relating to cultural heritage of India.</p>
          </div>
          <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-[#4cb748]">handshake</span>
            </div>
            <span className="material-symbols-outlined text-[#4cb748] mb-stack-sm text-3xl">handshake</span>
            <h3 className="font-label-md text-label-md text-on-surface mb-2 font-medium">Inter-state Linkages</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">To pursue such other activities and programmes as would strengthen and promote the cultural interlinkages amongst States; including setting up of Sub-Centres within the Zone;</p>
          </div>
          <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group md:col-span-2 lg:col-span-3 lg:w-1/3 lg:mx-auto">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">school</span>
            </div>
            <span className="material-symbols-outlined text-primary mb-stack-sm text-3xl">school</span>
            <h3 className="font-label-md text-label-md text-on-surface mb-2 font-medium">Encourage Research</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">To encourage the research activities relating to various art forms.</p>
          </div>
        </div>
      </section>

      {/* Shilpgram Section (Asymmetric Layout) */}
      <section className="mb-stack-lg bg-surface-bright rounded-xl overflow-hidden border border-outline-variant shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-cover bg-center min-h-[300px] lg:min-h-full w-full" data-alt="Photograph of Shilpgram Crafts Village in Guwahati." style={{ backgroundImage: "url('/images/about/shilpgram.webp')" }}></div>
          <div className="p-margin-desktop flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-stack-md bg-surface-container-high text-primary px-3 py-1 rounded-full w-max text-sm font-semibold">
              <span className="material-symbols-outlined text-sm">storefront</span>
              Facility
            </div>
            <h2 className="font-serif font-medium text-headline-lg text-on-surface mb-stack-sm">Shilpgram (Crafts Village)</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
              The NEZCC has also established its <strong>Shilpgram (Crafts Village)</strong>, at Panjabari, Guwahati.
            </p>
            <div className="bg-surface-container p-stack-md rounded-lg border-l-4 border-primary">
              <p className="font-body-md text-body-md text-on-surface-variant italic">
                "Inaugurated by Dr. Manmohan Singh the then Hon'ble Prime Minister of India on January 17, 2006."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Reach */}
      <section className="bg-primary text-on-primary rounded-xl p-margin-desktop text-center relative overflow-hidden shadow-sm">
        {/* Background Texture/Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="material-symbols-outlined text-4xl mb-stack-md">public</span>
          <h2 className="font-serif font-medium text-headline-lg mb-stack-md">Unity through Culture</h2>
          <p className="font-body-md text-body-md text-on-primary/90 mb-stack-md text-left">
            Over the years, the Centre has been making concerted effort towards achieving these objectives by organizing different types of programmes, such as, Folk Song &amp; Dance Festivals, Craft Fairs &amp; Exhibitions, Workshops &amp; Seminars, undertaking research and documentation works on vanished and vanishing/dying art forms of the region, etc.
            <br /><br />
            A lot of Cultural interaction and exchange programmes have also been undertaken by the Centre involving artistes from the region as well as from different parts of the country. These cultural interaction and exchange programmes together with participation in the important National events have had a positive effect towards fulfillment of the common theme of the Zonal Cultural Centres â€“ â€œUnity through Cultureâ€.
          </p>
          <button className="bg-white text-primary px-6 py-3 rounded font-label-md text-label-md font-bold hover:bg-surface-container-lowest transition-colors border-2 border-transparent focus:border-on-primary mt-4">
            Explore Our Activities
          </button>
        </div>
      </section>
    </main>
  );
}
