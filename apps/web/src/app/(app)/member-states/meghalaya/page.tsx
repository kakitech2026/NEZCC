import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member State: Meghalaya | North East Zone Cultural Centre",
  description: "Discover a land of mist-covered hills, cascading waterfalls, and ancient indigenous wisdom. Meghalaya stands as a testament to the harmonious relationship between nature and culture.",
};

export default function MeghalayaPage() {
  return (
    <main className="flex-grow  md:-mt-[30px] relative z-0">
      {/* Hero Section with Glassmorphism */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full object-cover"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvHtd_SARIAa0NsoYgCRaQlWeTsPZfpSpHcGXONcDMigHzU8Bz-ihYjqCNP9xemLiSoN9BA1zHuo4i6RPiHPMkKpFYVuMPCELjItSocq77rLjl0nXAD7j-M3h8HYKsDqmZKsHgnbviktZCFDPtcEKRcb0gzIS16P-UBXJvJgBIKC6Sq-6FNAe1ppHAhAsu3fifZZea2_MMaEgAo2eNyxGLg2rRPElPuYb3E4oi0T5z3cCy3Ee0hnr7WA')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay for text readability */}
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-white/30 p-8 rounded-xl">
          <h1 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-primary mb-stack-md font-medium text-gray-900">
            Meghalaya: Abode of Clouds
          </h1>
          <p className="font-body-lg text-body-lg text-on-primary-container text-gray-800">
            Discover a land of mist-covered hills, cascading waterfalls, and
            ancient indigenous wisdom. Meghalaya stands as a testament to the
            harmonious relationship between nature and culture.
          </p>
        </div>
      </section>

      {/* Content Sections Container */}
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg space-y-stack-lg">
        {/* Geography & People (Asymmetric Layout) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center bg-surface-container-lowest p-8 rounded-lg shadow-sm border border-outline-variant">
          <div>
            <h2 className="font-serif font-medium text-headline-lg text-primary mb-stack-sm flex items-center gap-2">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                landscape
              </span>
              Geography &amp; People
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Known as the wettest place on earth, Meghalaya is home to the Khasi,
              Jaintia, and Garo tribes. Its landscape is a vibrant tapestry of
              rolling hills, deep gorges, and sacred groves that have been
              preserved for generations.
            </p>
          </div>
          <div className="h-64 md:h-full min-h-[250px] rounded-lg overflow-hidden border border-outline-variant">
            <img
              className="w-full h-full object-cover"
              alt="Khasi elder in sacred grove"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZNvtHOIESLBGOUoJTRJPtWDDEvkOtN2cXfq4hsmIxAhc5RMX_x-IIO69dC_ST3mxKLoWWkhu3zfJLUhuEo0O6cfNJECLE9xAETjkN64W1bSp_VbPRDRbPVMKuP0RxzhcXTW3MVhtVhXSrqdLiO2Z8JNxfZV3ZYw387bIBpckZ9-jYL8pBhVBlSyFF33dy8iTy3skoXGaEnMxyTzWpnTTUPoASOTg6Kf1VTK9lfAIVnjzWokoxi5J1ig"
            />
          </div>
        </section>

        {/* Heritage & Tradition (Full Width Banner Style) */}
        <section className="bg-surface-variant p-8 rounded-lg border-l-4 border-primary">
          <h2 className="font-serif font-medium text-headline-lg text-on-surface mb-stack-sm flex items-center gap-2">
            <span className="material-symbols-outlined" aria-hidden="true">auto_stories</span>
            Heritage &amp; Tradition
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-3xl">
            The cultural fabric of Meghalaya is woven with matrilineal traditions,
            vibrant festivals, and unique bio-engineering marvels. From the
            rhythmic beats of the 100 Drums to the living bridges of Cherrapunji,
            Meghalaya offers a deep dive into the soul of the Northeast.
          </p>
        </section>

        {/* Cultural Highlights (Bento Grid) */}
        <section>
          <h2 className="font-serif font-medium text-headline-lg text-primary mb-stack-md border-b border-outline-variant pb-2">
            Cultural Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Highlight 1 */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col h-full">
              <div className="h-48 rounded-md overflow-hidden mb-4 bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Wangala Festival"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRX3aTM3VK8keibkhcAYWO2l74VV5-E48TmBwuAeJaCxjVeRvfVDyoG1aLLz2Q8rgaevYQ_JUXnRbiy7tZpeLSocqkijJvyFWmEU-HSxrYJkX6yJ7_KnE6B8XF9tVP19IRjHnf4jzFtWziy1FCaa3_l49Kknb3Gv7ahAvEflT80jqFjwJHgKEZnEpD-ELo3Ufq1yHkxcIEwn7RSmogEDf-nL_7Uv-FPvugfXc3wLB3o9uxQVa3mIkSiQ"
                />
              </div>
              <h3 className="font-serif font-medium text-headline-md text-on-surface mb-2">
                Wangala Festival
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                The "100 Drums Festival" is the most significant harvest festival of
                the Garo tribe. It marks the end of the agricultural year and is a
                vibrant celebration of dance, music, and gratitude to the Sun God.
              </p>
            </div>

            {/* Highlight 2 */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col h-full border-t-4 border-t-[#FF671F]">
              <div className="h-48 rounded-md overflow-hidden mb-4 bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Living Root Bridges"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJsO1Ele4xBuQwKKx4SfbRaCq3KSDDZ_ERpCVHZpMJ7FF-3dsPfTWSt6wfnhPQENVa6ZSdaWEqDt0TYLkc_0S4324d46JGoj0Fb5PY1JiggpeJOvKYcIjc6CH421cYQXhqhoZEV3qoYqEZLvgxf1x_t21U8vWgeJGGA7U_ZDQXLgkQBROSgctZYkfAOvY00f07Gz5_s0IymLsaijsyxveWtGlVqaI4AJqnwtQ0K3qoPJaFLpIMmeQ_Bw"
                />
              </div>
              <h3 className="font-serif font-medium text-headline-md text-on-surface mb-2">
                Living Root Bridges
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                A masterpiece of indigenous bio-engineering, these bridges are
                handmade from the aerial roots of Ficus elastica trees by the Khasi
                and Jaintia people, growing stronger over centuries.
              </p>
            </div>

            {/* Highlight 3 */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col h-full">
              <div className="h-48 rounded-md overflow-hidden mb-4 bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Shad Suk Mynsiem"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfmMoRElDnCrhlis46IDY5Nb-dt7Y-igPPry5vHaq7EXqJoVsMDslCse4y-6OvcsHiDXWEYOkWRd6LDOJY5fiJbkmATgDcrfTBybvRQUzDrmFSgri8OxpZeXgur1KOobiEMQHC3AUZszpZAh-OOoT2lzcoDDugqoCMfJ7HIRU5De01ES_zK2Q_42gD74kHdpjDyyOEAWUIuK6lwzdVad32EMQyfs-kuE_R4oB7E3J3y0K51Dmb6yzfdA"
                />
              </div>
              <h3 className="font-serif font-medium text-headline-md text-on-surface mb-2">
                Shad Suk Mynsiem
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                The "Dance of the Grateful Heart" is a major Khasi festival
                celebrating the harvest and the cycle of life. Performers in
                traditional attire dance to the beats of drums and the melody of the
                tangmuri.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
