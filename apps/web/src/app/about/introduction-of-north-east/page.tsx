import React from 'react';

export default function IntroductionOfNorthEast() {
  return (
    <main className="flex-grow w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] md:h-[50vh] min-h-[300px] flex items-end pb-stack-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBSHZ4uQDSeGV87M8y_D6V7lvzIbuyLpQLfi5Ruf4ebJl422E9jce3IXtdmtgeMsrrDW6-Kkgn-6TVqVAXLmX9D8XO06c8xPOC9Mv7TOMtvIPNjBaGr_C_9iOTZbE5NhdfjJKF2HyrfoKGytRKZK7Ot7UiV1iQU3rxMrQmYP6lYXd6iSRsVR-BYB6K0wrmt28fDAGjdGAl6xFoliJEp50bvAXwG1PZanFQ54O8bLc2LYH76w5NeahY0rA')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        <div className="relative z-10 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-on-background">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex text-caption font-caption text-on-surface-variant mb-stack-sm">
            <ol className="flex items-center space-x-2">
              <li><a className="hover:text-primary transition-colors" href="/">Home</a></li>
              <li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
              <li><span className="text-on-surface-variant">About Us</span></li>
              <li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
              <li aria-current="page" className="text-primary font-bold">Introduction of North East</li>
            </ol>
          </nav>
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary drop-shadow-md">Introduction of North East</h1>
        </div>
      </section>

      {/* Container for Content */}
      <div className="w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col gap-stack-lg">
        {/* Section 1: The Land of Seven Sisters (Bento Grid Style) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="md:col-span-2 bento-card p-6 flex flex-col justify-center bg-surface-bright border-t-4 border-t-[#FF9933]">
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-stack-md flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FF9933]" style={{ fontVariationSettings: "'FILL' 1" }}>landscape</span>
              The Land of Seven Sisters
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">
              A fascinating place with enchanted frontiers, the North East region of India is a geographic and cultural marvel. Connected to the rest of the country by a narrow 20 km wide strip of land in Jalpaiguri, famously known as the <strong>"Siliguri Corridor"</strong> or <strong>"Chicken's Neck"</strong>, it serves as a vital bridge to Southeast Asia.
            </p>
          </div>
          <div className="bento-card p-6 flex flex-col justify-around bg-primary text-on-primary">
            <div className="text-center">
              <span className="block font-headline-xl text-headline-xl text-[#FF9933] mb-1">2.55L</span>
              <span className="font-label-md text-label-md text-surface-container-highest uppercase tracking-wider">Sq. Kms Area</span>
            </div>
            <div className="h-px w-full bg-white/20 my-4"></div>
            <div className="text-center">
              <span className="block font-headline-xl text-headline-xl text-[#FF9933] mb-1">38.5M</span>
              <span className="font-label-md text-label-md text-surface-container-highest uppercase tracking-wider">Population</span>
            </div>
            <div className="h-px w-full bg-white/20 my-4"></div>
            <div className="flex justify-between text-center px-4">
              <div>
                <span className="block font-headline-md text-headline-md font-bold">8%</span>
                <span className="font-caption text-caption text-surface-container-highest">of India's Land</span>
              </div>
              <div>
                <span className="block font-headline-md text-headline-md font-bold">4%</span>
                <span className="font-caption text-caption text-surface-container-highest">of India's Pop.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Member States */}
        <section className="flex flex-col gap-stack-md">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="font-headline-md text-headline-md text-primary">Member States</h2>
            <div className="h-px bg-outline-variant flex-grow ml-4"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* State Cards */}
            <div className="bento-card p-4 text-center hover:bg-surface-container transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-3xl text-outline group-hover:text-primary mb-2 transition-colors">map</span>
              <h3 className="font-label-md text-label-md text-on-background">Arunachal Pradesh</h3>
            </div>
            <div className="bento-card p-4 text-center hover:bg-surface-container transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-3xl text-outline group-hover:text-primary mb-2 transition-colors">map</span>
              <h3 className="font-label-md text-label-md text-on-background">Assam</h3>
            </div>
            <div className="bento-card p-4 text-center hover:bg-surface-container transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-3xl text-outline group-hover:text-primary mb-2 transition-colors">map</span>
              <h3 className="font-label-md text-label-md text-on-background">Manipur</h3>
            </div>
            <div className="bento-card p-4 text-center hover:bg-surface-container transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-3xl text-outline group-hover:text-primary mb-2 transition-colors">map</span>
              <h3 className="font-label-md text-label-md text-on-background">Meghalaya</h3>
            </div>
            <div className="bento-card p-4 text-center hover:bg-surface-container transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-3xl text-outline group-hover:text-primary mb-2 transition-colors">map</span>
              <h3 className="font-label-md text-label-md text-on-background">Mizoram</h3>
            </div>
            <div className="bento-card p-4 text-center hover:bg-surface-container transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-3xl text-outline group-hover:text-primary mb-2 transition-colors">map</span>
              <h3 className="font-label-md text-label-md text-on-background">Nagaland</h3>
            </div>
            <div className="bento-card p-4 text-center hover:bg-surface-container transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-3xl text-outline group-hover:text-primary mb-2 transition-colors">map</span>
              <h3 className="font-label-md text-label-md text-on-background">Sikkim</h3>
            </div>
            <div className="bento-card p-4 text-center hover:bg-surface-container transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-3xl text-outline group-hover:text-primary mb-2 transition-colors">map</span>
              <h3 className="font-label-md text-label-md text-on-background">Tripura</h3>
            </div>
          </div>
        </section>

        {/* Section 3: Ethnic & Cultural Tapestry */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center py-stack-md">
          <div className="lg:col-span-5 order-2 lg:order-1 relative rounded-xl overflow-hidden h-80 shadow-md">
            <img alt="Cultural Diversity" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwnQ8u3nK11RZhOrzaAX_AdjX8OvL9eIMwd5_KyDpMyRJpmdjZaRYJD3CFw6dVPRP3LDVhV6OL_u9CLkzboW_1Be2XUdNohsgRlE8rXf9KGGmDqzQgmS51Bd9KUvKv2JoEnpZgwCUyqWWXqRAu9UC6atvVtEJfUpTHIuysE-ou9QB79SL79awE_lEaqEuHh-gZTPDTc6unkV816QWbfXmhkGVKaTdhXu7Z7nVOm-UjVPxLaR7UpgLZBQ" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="glass-card p-3 rounded text-white flex items-center gap-4">
                <div className="text-center border-r border-white/30 pr-4">
                  <span className="block font-headline-md font-bold">209</span>
                  <span className="font-caption text-xs uppercase">Tribes</span>
                </div>
                <div className="text-center">
                  <span className="block font-headline-md font-bold">192</span>
                  <span className="font-caption text-xs uppercase">Languages</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-stack-sm pl-0 lg:pl-8">
            <span className="font-label-md text-label-md text-[#FF9933] uppercase tracking-widest font-bold">Demographics</span>
            <h2 className="font-headline-lg text-headline-lg text-primary leading-tight">An Ethnic &amp; Cultural Tapestry</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              The North East is a veritable melting pot of diverse communities, faiths, and cultures. With approximately 209 tribes and 192 spoken languages, it is one of the most culturally rich regions in the world.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              This extraordinary diversity creates a unique societal fabric where ancient traditions seamlessly blend with modern life, making it a critical area for cultural preservation and study.
            </p>
          </div>
        </section>

        {/* Section 4 & 5: Economy and Nature */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter py-stack-sm">
          {/* Economic Powerhouse */}
          <div className="bento-card p-8 border-l-4 border-l-primary flex flex-col h-full bg-surface-bright">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-white mb-6 shadow-sm">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>factory</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-background mb-4">Economic Powerhouse</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
              The region is immensely rich in natural resources, traditionally summarized by 'TOT' - Tea, Oil, and Timber. Its topography also offers massive, largely untapped hydroelectric potential that positions it as a future engine of sustainable energy.
            </p>
            <ul className="flex flex-col gap-2 font-label-md text-label-md text-on-surface">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Abundant Tea Plantations</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Significant Oil Reserves</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Untapped Hydroelectric Capacity</li>
            </ul>
          </div>
          {/* Nature & Aesthetics */}
          <div className="bento-card p-8 border-l-4 border-l-[#4cb748] flex flex-col h-full relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#4cb748]/10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#4cb748] rounded-full flex items-center justify-center text-white mb-6 shadow-sm">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-background mb-4">Nature &amp; Aesthetics</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                Renowned for its scenic beauty, the region boasts unparalleled biodiversity. This deep connection with the environment is reflected intimately in the local art forms, where men and nature exist in profound harmony.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant italic border-l-2 border-[#4cb748] pl-4 ml-2">
                "The flora and fauna do not just surround the people; they inspire every facet of their creative expression."
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Traditional Heritage */}
        <section className="bg-surface-container rounded-xl overflow-hidden border border-outline-variant shadow-sm flex flex-col md:flex-row my-stack-sm">
          <div className="w-full md:w-2/5 min-h-[300px] relative bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFzLfX2mSlGbwK-YFZbySLLwHNzb69VM3lGbT7XdZEtL9NhLEMiklDLKJBdKqgKNHrCbBJGZaH7EzzXGe8zWnk1ddvWFRwosUbO1sdY5w-qaImqk6g8cMkwDQgUVS8quOXOIcbtr8ro6E8i_UJbOODv6lrtQTG1-ext6nAPUNWXxEroYGIqHXEd-yQNH7gt5KFlzmoAGnQELSEy9Ml0qkGPbNt89p9G977uyCUH3AKnbHZnjRN138pDQ')" }}>
            {/* Image placeholder via background */}
          </div>
          <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 bg-tertiary-container text-on-tertiary font-caption text-xs rounded-full w-max mb-4">Cultural Legacy</span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">A Legacy of Art &amp; Heritage</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              The traditional poetry, enchanting folk songs, and resonant musical sounds tell stories of centuries past. A striking feature of their visual arts and textiles is the specific, vibrant use of colors—predominantly <strong>sun-set red, deep sky blue, and jungle greens</strong>—often derived from natural vegetable dyes.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              This rich tapestry of cultures encompasses everything from sophisticated classical dances to rhythmic, vigorous folk forms, creating an artistic continuum that is unique to the North East.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
