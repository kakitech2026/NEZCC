import React from 'react';
import Link from 'next/link';

export default function MuseumCollectionPage() {
  return (
    <main className="flex-grow ">
      {/* Hero Section */}
      <section className="bg-surface-container-low py-16 px-margin-mobile md:px-margin-desktop border-b border-outline-variant relative overflow-hidden">
        <div className="max-w-container-max-width mx-auto flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-primary mb-4 text-5xl" data-icon="museum">museum</span>
          <h1 className="font-serif font-medium text-headline-xl text-on-secondary-fixed mb-6">Museum Collections</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
            Preserving the material culture of North East India. Our extensive archives house thousands of artifacts that tell the profound stories of tribal heritage, artistry, and the daily lives of the region's indigenous communities.
          </p>
        </div>
      </section>

      {/* Collection Categories Grid */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif font-medium text-headline-lg text-on-background">Explore by Category</h2>
          <div className="h-[1px] flex-grow ml-8 bg-outline-variant hidden md:block"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 group cursor-pointer flex flex-col">
            <div className="h-48 bg-surface-variant relative overflow-hidden">
              <div className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500" data-alt="A meticulously curated display of vibrant tribal textiles and woven garments from North East India, featuring intricate geometric patterns in red, black, and white. The lighting is soft, museum-quality gallery lighting highlighting the texture of the threads. The setting is clean and modern, conveying a premium institutional aesthetic." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBft-sGXNYn6i7dYgPeOABMPLZNTY3lf28U_KYMHgX1WTkDnH0I4mipfNnGHZ_QKvKhG4fH-PRSe0KCxcKbDal1dT_htq87ttNf0VD_t-bcyiugl7HN_9q6dqj_ZyKSh73xCC2-7In0Ma0ivgljzB3mGxqfEKC9ZmNCE_agUF4Xi3EG5p34N2a4NSCPxS-L214VxN-XZx4SmQi1Jp3bZqMTepo8zC9Y7MGYGsg_bTtutleZEHGG_v7gdg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span className="absolute bottom-4 left-4 text-white font-label-md bg-primary/90 px-3 py-1 rounded backdrop-blur-sm">Textiles</span>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="font-serif font-medium text-headline-md text-on-secondary-fixed mb-2">Tribal Costumes</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex-grow">A vibrant collection of traditional handwoven garments, shawls, and ceremonial attire reflecting the distinct identities of various tribes.</p>
              <div className="flex items-center text-primary font-label-md group-hover:translate-x-2 transition-transform">
                <span>View Archive</span>
                <span className="material-symbols-outlined ml-1 text-sm" data-icon="arrow_forward">arrow_forward</span>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 group cursor-pointer flex flex-col">
            <div className="h-48 bg-surface-variant relative overflow-hidden">
              <div className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500" data-alt="A dramatic, low-key lighting shot of traditional North East Indian weaponry, including ornate spears, Dao swords, and woven shields. The artifacts are mounted on a pristine white gallery wall. The aesthetic is clean, authoritative, and focuses on the historical craftsmanship and metallurgical details of the items." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6E4stJnuNOpdrpN64XHxiTIipEqOo0IT8BAfQhiaIgpC5ow6QivhkCgwkj3BChsvlipztzWppRDCHOxwB1p75VPJeWJcX0_gt1tV5eutrcMzWFWrUriXxFVrPO_AvCa9pcF5CbtILaYGABMC-r3WsMyZ_6eJJnI7WHowju_VnDDSnl9YhrXuXWPUe7WnNxXL_aVEwcDiMZMT0Y5SQ2yEYATBylZoubnygjZcXNpWbcmXhFvo3n_pA7g')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span className="absolute bottom-4 left-4 text-white font-label-md bg-primary/90 px-3 py-1 rounded backdrop-blur-sm">Artifacts</span>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="font-serif font-medium text-headline-md text-on-secondary-fixed mb-2">Traditional Weaponry</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex-grow">Historical arms, armor, and hunting implements showcasing exceptional metallurgy and indigenous engineering techniques.</p>
              <div className="flex items-center text-primary font-label-md group-hover:translate-x-2 transition-transform">
                <span>View Archive</span>
                <span className="material-symbols-outlined ml-1 text-sm" data-icon="arrow_forward">arrow_forward</span>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 group cursor-pointer flex flex-col">
            <div className="h-48 bg-surface-variant relative overflow-hidden">
              <div className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500" data-alt="An elegant arrangement of indigenous musical instruments from North East India, such as bamboo flutes, log drums, and stringed lutes. The items rest on a minimalist white pedestal under soft, diffused spotlighting. The composition emphasizes the rich, warm tones of the aged wood and bamboo against a modern, bright institutional background." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDmbhTLa1Wf0Wdmcf_5QiKVZ8AFCZ4kjh-atFMSaRSRkezEMnsTuHO4QmvpGZrcdR36UKf_UkSCcvA2wW6pb7bNAhMvixuVhMjS3_QRHG2lRMl2AVTMKQPovdy-wvhbtIGGQhQSNIS6XzTJ68U4cQJaRzOYcwL6v7EOEOulL05mllTvt73YWRuftPAgzXEIvT0v1zovjKLO9jb1yQkxTK6cZJwtt5QytuokdmppefvKK292SHdt1lKjrQ')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span className="absolute bottom-4 left-4 text-white font-label-md bg-primary/90 px-3 py-1 rounded backdrop-blur-sm">Audio Heritage</span>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="font-serif font-medium text-headline-md text-on-secondary-fixed mb-2">Musical Instruments</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex-grow">A curated selection of wind, string, and percussion instruments integral to folk music, rituals, and community celebrations.</p>
              <div className="flex items-center text-primary font-label-md group-hover:translate-x-2 transition-transform">
                <span>View Archive</span>
                <span className="material-symbols-outlined ml-1 text-sm" data-icon="arrow_forward">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artifact Bento Box */}
      <section className="bg-surface-container py-16 border-y border-outline-variant">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center mb-8 gap-3">
            <span className="material-symbols-outlined text-saffron" data-icon="star" data-weight="fill">star</span>
            <h2 className="font-serif font-medium text-headline-lg text-on-secondary-fixed">Featured Artifact</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Main Image Area */}
            <div className="md:col-span-8 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant relative min-h-[400px]">
              <div className="absolute inset-0 bg-cover bg-center" data-alt="A highly detailed, macro photograph of a majestic Naga Warrior Headgear adorned with hornbill feathers, boar tusks, and intricate beadwork. The artifact is professionally lit in a high-key, modern museum setting with a clean, light-mode background. The lighting emphasizes the texture of the natural materials, presenting a premium, curated visual experience." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAN8fx9nlrRJJn-U-s1f8z-pZOU41iqY4ZT83y5ccNNgVFeEsfcdKBys_MEQHpAJTQN7arERPlFyTD3X2-J5YcPvJ8Vv1AMXRwTHbFrULAmen3guVhjxswhvJDfVrhXrur3FPN4cecubhHRjlbwCyHw2vWSh8fHHI6TE_pfdIKiry3lx3JZBmR_yYEAxwmKVO37ua6SnMjKiB0wbt5k0fue4wj2_KFUiDOA_n0Fs5VJsMMxwSu0jL13Yw')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-saffron font-label-md tracking-wider uppercase mb-2">Acquisition: 1987</span>
                <h3 className="font-serif font-medium text-headline-xl text-white mb-2">The Naga Warrior Headgear</h3>
                <p className="text-white/90 font-body-lg max-w-2xl">A ceremonial masterpiece representing valor, social standing, and deep spiritual connection to the natural world.</p>
              </div>
            </div>
            {/* Details Area */}
            <div className="md:col-span-4 flex flex-col gap-gutter">
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant flex-grow">
                <h4 className="font-serif font-medium text-headline-md text-on-background border-b border-outline-variant pb-4 mb-4">Technical Details</h4>
                <ul className="space-y-4">
                  <li>
                    <span className="block font-label-md text-on-surface-variant mb-1">Origin</span>
                    <span className="font-body-md text-on-background flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm" data-icon="location_on">location_on</span>
                      Nagaland State
                    </span>
                  </li>
                  <li>
                    <span className="block font-label-md text-on-surface-variant mb-1">Materials</span>
                    <span className="font-body-md text-on-background flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm" data-icon="category">category</span>
                      Cane, Boar Tusks, Hornbill Feathers, Dyed Goat Hair
                    </span>
                  </li>
                  <li>
                    <span className="block font-label-md text-on-surface-variant mb-1">Status</span>
                    <span className="font-body-md text-green-700 flex items-center gap-2 font-medium">
                      <span className="material-symbols-outlined text-sm" data-icon="verified">verified</span>
                      Preserved - Main Gallery
                    </span>
                  </li>
                </ul>
              </div>
              <button className="w-full bg-primary-container text-white py-4 rounded-xl font-label-md hover:bg-primary-fixed-variant transition-colors flex items-center justify-center gap-2 border-2 border-transparent focus:border-primary-fixed outline-none">
                <span className="material-symbols-outlined" data-icon="info">info</span>
                View Full Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-12 md:py-24 px-margin-mobile md:px-margin-desktop relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-surface-container-lowest/80 backdrop-blur-md p-12 rounded-2xl border border-outline-variant shadow-sm">
          <span className="material-symbols-outlined text-4xl text-primary mb-4" data-icon="360">360</span>
          <h2 className="font-serif font-medium text-headline-lg text-on-background mb-4">Experience the Collections</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            Cannot visit Shilpgram in person? Step inside our galleries from anywhere in the world with our interactive 360-degree virtual tour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-container text-white px-8 py-3 rounded-lg font-label-md hover:bg-primary transition-colors min-h-[44px] flex items-center justify-center gap-2 shadow-sm focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <span className="material-symbols-outlined text-sm" data-icon="explore">explore</span>
              Start Virtual Tour
            </button>
            <button className="bg-transparent text-primary border-2 border-primary px-8 py-3 rounded-lg font-label-md hover:bg-surface-container-low transition-colors min-h-[44px] flex items-center justify-center gap-2 focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <span className="material-symbols-outlined text-sm" data-icon="map">map</span>
              Plan a Physical Visit
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
