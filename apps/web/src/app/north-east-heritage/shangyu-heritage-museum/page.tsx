import React from 'react';

export default function ShangyuHeritageMuseumPage() {
  return (
    <main className="flex-grow flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-surface-container-low border-b border-outline-variant py-stack-lg md:py-[64px]">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="flex flex-col gap-stack-md z-10">
            <div className="flex items-center gap-2 text-custom-saffron font-label-md uppercase tracking-wider">
              <span className="material-symbols-outlined text-[20px]" data-weight="fill">museum</span>
              <span>Permanent Ethnic Village</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface">Shilpgram Heritage Museum</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Located at Panjabari, Guwahati, Shilpgram stands as a vibrant testament to the diverse cultural tapestry of Northeast India. It is a permanent ethnic village and museum designed to preserve, showcase, and celebrate the region's unique traditional architecture, crafts, and performing arts in a singular, immersive environment.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="bg-primary-container text-white px-6 py-3 rounded font-label-md text-label-md hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center gap-2">
                Plan Your Visit <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              {/* <button className="border-2 border-primary-container text-primary-container px-6 py-3 rounded font-label-md text-label-md hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                Virtual Tour
              </button> */}
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-outline-variant shadow-sm group">
            <div className="bg-cover bg-center w-full h-full transform transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/images/shilpgram-gate.png')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="font-label-md flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> Panjabari, Guwahati</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Attractions (Bento Grid) */}
      <section className="py-stack-lg md:py-[64px] bg-surface">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-stack-lg">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Key Attractions</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Explore the diverse architectural styles, traditional crafts, and vibrant performance spaces that make Shilpgram a unique cultural hub.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 auto-rows-[250px]">
            {/* Bento Item 1: Traditional Huts (Large) */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden border border-outline-variant shadow-sm group flex flex-col justify-end bg-surface-container-lowest">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAa--yqkRiE2Y1a9WRsNtTsUbmt65C-1nhjaTGeCnbZnUZjJGJ4n3-_xCG_gVxUG7IZaQSWS_tV_Ha27wYZ9VHM1PK4EOzXRC1VoFDLyprcN8cClbokSHd2MNYMLt2mZ-j5z0vDIZDIVMK8r9a7l0RXt6WmkLD7jiVa18hkHUqzrySF-n6QAnhMma4x4dVBvYbcUNiQE-eguBGOL1rv12eIquItYlmuiJFl1ckVcl2ftpa-YhsdEArZKA')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/40 to-transparent"></div>
              <div className="relative p-6 z-10 text-white flex flex-col gap-2">
                <div className="bg-primary/80 backdrop-blur-sm w-fit px-3 py-1 rounded text-caption font-label-md mb-2">Heritage Architecture</div>
                <h4 className="font-headline-md text-headline-md">Traditional Huts of the North East</h4>
                <p className="font-body-md text-body-md text-white/90 max-w-md hidden md:block">Experience authentic, life-sized recreations of traditional dwellings representing various indigenous communities across the eight Northeastern states, constructed using authentic materials and techniques.</p>
              </div>
            </div>
            {/* Bento Item 2: Open Air Stage */}
            <div className="relative rounded-xl overflow-hidden border border-outline-variant shadow-sm group flex flex-col justify-end bg-surface-container-low">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnvMnui-smfIODQEl9X9XGI04AgCi8Wv-XplS1wqDggaTAK-b-ZdJ6n3cI_pQYppe8rOTbSWE-Ww8Zs927vo7n85yRLUEguJYSwM6iMv0Y5UzPSQAAwZrYyp2A4pwP8EeLn1WX4wHTSnCY7dhKhqq_oTPb55Pa8KiJXZLHKGQYAm2X4uwj0935-XYAkUYlO0lzmsD5pECEeHuz8iJNwN1Le1aDJFumuZH1mrWL_uJ1xrESdzLNzXSMCA')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent"></div>
              <div className="relative p-6 z-10 text-white">
                <h4 className="font-headline-md text-body-lg font-semibold mb-1">Open Air Stage</h4>
                <p className="font-caption text-caption text-white/80">Regular venue for folk performances, theatre, and cultural festivals.</p>
              </div>
            </div>
            {/* Bento Item 3: Craft Gallery */}
            <div className="relative rounded-xl overflow-hidden border border-outline-variant shadow-sm group flex flex-col justify-end bg-surface-container-high">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8WkmhwGORh7DNvJ_2CTl6zQQk0FE-ND7EPIpCv4WGX5sTdGoGvs4Rk7LYX0Oz4fe8VYEsMsuyCCMDIwOngTL4iY6gzjRpezyUG_3f8rPcLEHJRZ5CSnKoKt6apIoUGd3i0RBm5bi8JVv2fp3Vv4lySEBXAHl9doys8suFsFlK7GuPaAY2eLQ7ZGqF1HzfxJ3_g_KNjfbMTMEFSPiVglQXp1dy4aEbq40pL1JYewPM0HikztM6Rf_VuQ')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent"></div>
              <div className="relative p-6 z-10 text-white">
                <h4 className="font-headline-md text-body-lg font-semibold mb-1">Craft Gallery &amp; Souvenirs</h4>
                <p className="font-caption text-caption text-white/80">Exhibition of master crafts and authentic regional souvenirs available for purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Information & Exhibitions Grid */}
      <section className="py-stack-lg md:py-[64px] bg-surface-bright border-t border-outline-variant">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Visitor Info */}
          <div className="lg:col-span-4 flex flex-col gap-stack-md">
            <h3 className="font-headline-md text-headline-md text-on-surface border-b-2 border-primary w-fit pb-2">Visitor Information</h3>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-custom-saffron mt-1">schedule</span>
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface">Museum Timings</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Tuesday to Sunday: 10:00 AM - 6:00 PM</p>
                  <p className="font-caption text-caption text-error mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">info</span> Closed on Mondays and National Holidays</p>
                </div>
              </div>
              <hr className="border-outline-variant/50" />
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-custom-green mt-1">confirmation_number</span>
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface">Entry Fees</h4>
                  <ul className="font-body-md text-body-md text-on-surface-variant space-y-1 mt-1">
                    <li className="flex justify-between w-48"><span>Adults:</span> <span>₹ 50.00</span></li>
                    <li className="flex justify-between w-48"><span>Children (below 12):</span> <span>₹ 20.00</span></li>
                    <li className="flex justify-between w-48"><span>Foreign Nationals:</span> <span>₹ 200.00</span></li>
                  </ul>
                </div>
              </div>
              <hr className="border-outline-variant/50" />
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">map</span>
                <div className="w-full">
                  <h4 className="font-label-md text-label-md text-on-surface mb-2">Location</h4>
                  <div className="h-32 bg-surface-container rounded border border-outline-variant overflow-hidden relative">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk3MBKdUpoGHF97_JBb2chTJXYJCr7xKH_yhlBGeZ4pDJT4BTJDuVbHiL7ViTpTteYbNclVjPBq8ASXGoS2Wk-eUyeAgsNAUYeu7tvydOrnYoPQeqI8jUf34EfYQnZ-Vo7l71hzULUehpfuq5uiUqfamoDRgqxmv4T2EoWL87Jtq5pZ9j5voEFq8GRlkNwLExBjGBq3Ffi8aBCZYF7lBPJM8SI_Dme3HcKD8txVsz-_v3h3qaW5IBkcQ" />
                  </div>
                  <p className="font-caption text-caption text-on-surface-variant mt-2">Panjabari Rd, Batahguli, Guwahati, Assam 781037</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column: Recent Exhibitions */}
          <div className="lg:col-span-8 flex flex-col gap-stack-md">
            <div className="flex justify-between items-end border-b-2 border-outline-variant pb-2">
              <h3 className="font-headline-md text-headline-md text-on-surface">Current Highlights</h3>
              <a className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1" href="#">View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span></a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Highlight Card 1 */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwp0CRLoASVmhrIYlUTDE0hewX2HzHEiKrGs-piVz2m7CS4oxNMap18kPejUYxzvXoR5YvkwS_6M14EJ_3LOncbMEmJUxh7Pnroc6LSZzgvcMGZ5WEFQfcnEOXDVrLDA3HerJjCLTzfzPZt9EfzG3V1a4TawuLY0Mfcc5KEyo6RBAgPusa2IJa5JT08TDChMx7yXi1ygyEAjCRaWl6vVkmDns4JXeWzUuIcsaJKH_1zJVbYU93WIHmPA')" }}></div>
                  <div className="absolute top-2 right-2 bg-custom-green/90 text-white font-caption text-caption px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[14px]">fiber_manual_record</span> Live Demo
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow gap-2">
                  <div className="text-xs font-label-md text-primary">Textiles</div>
                  <h4 className="font-body-lg text-body-lg font-semibold text-on-surface line-clamp-2">Assamese Silk Weaving Demonstration</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mt-auto">Witness master weavers demonstrating the intricate process of creating traditional Muga and Pat silk garments.</p>
                </div>
              </div>
              {/* Highlight Card 2 */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuABUJLONsGWvB5a7YLu7NVmadBcN4dC5HMd40OSts7ysUMFtVe5wi4EmOdxFJj6ao3zID7hzUoox-xMeOS3cwsf9_EV-YLcS33S3oohWnTlzUj1Zc5r7pBcg2xMxC5NsCWrqmnFPtaJ1wlQuA0-Pb77qgOIEL69QwpoFtcV6XUCSXphDw1lN3mVe_1VOtP03blT4Il9lkOIuJhlx336eYHmM3cjDqNecQaVnvnsXUIWMveIqR-UMnhL-Q')" }}></div>
                  <div className="absolute top-2 right-2 bg-primary-container/90 text-white font-caption text-caption px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[14px]">new_releases</span> Special Exhibit
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow gap-2">
                  <div className="text-xs font-label-md text-primary">Artifacts</div>
                  <h4 className="font-body-lg text-body-lg font-semibold text-on-surface line-clamp-2">Tribal Masks of Nagaland</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mt-auto">A special curated exhibition showcasing ceremonial and ritualistic masks from various Naga tribes, detailing their cultural significance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
