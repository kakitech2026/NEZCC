import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member State: Manipur | North East Zone Cultural Centre",
  description: "Discover a land of rich cultural traditions and unparalleled natural beauty. Manipur stands as a beacon of artistic excellence.",
};

export default function ManipurPage() {
  return (
    <main className="flex-grow flex flex-col w-full relative z-0  md:-mt-[30px] relative z-0">
      {/* Breadcrumbs */}


      {/* Hero Section: Manipur: The Jewel of India */}
      <section className="w-full relative overflow-hidden bg-surface-container-lowest border-b border-outline-variant">
        <div className="absolute inset-0 z-0">
          <div
            className="bg-cover bg-center w-full h-full"
            style={{
              backgroundImage:
                "url('/images/manipur.webp')",
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg md:py-24 relative z-10 flex flex-col items-center text-center">
          <span className="inline-block px-3 py-1 mb-stack-md border border-orange-400 text-orange-400 rounded-full font-label-md text-label-md uppercase tracking-wider bg-black/40 backdrop-blur-sm shadow-sm">
            Member State
          </span>
          <h1 className="font-serif font-medium md:font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-white drop-shadow-lg mb-stack-md max-w-4xl">
            Manipur: The Jewel of India
          </h1>
          <p className="font-body-lg text-body-lg text-white/90 drop-shadow-md max-w-3xl mx-auto mb-stack-lg">
            Discover a land of rich cultural traditions and unparalleled natural
            beauty. Manipur stands as a beacon of artistic excellence and ecological
            wonder in the Northeast.
          </p>
          <button className="bg-orange-400 border border-orange-400 text-white font-label-md text-label-md px-8 py-3 rounded shadow-md hover:shadow-lg hover:bg-on-primary-fixed-variant transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary border-2 border-transparent active:scale-95 duration-150 ease-in-out min-h-[44px] inline-flex items-center justify-center gap-2">
            Explore Heritage{" "}
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              explore
            </span>
          </button>
        </div>
      </section>

      {/* Content Sections: Split Layout */}
      <section className="w-full bg-background py-stack-lg md:py-20 border-b border-outline-variant">
        <div className="w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg md:gap-gutter items-center">
            {/* Geography & People */}
            <div className="flex flex-col gap-stack-md bg-surface p-stack-lg rounded border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container opacity-10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
              <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded flex items-center justify-center mb-2 shadow-sm">
                <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                  public
                </span>
              </div>
              <h2 className="font-serif font-medium text-headline-md text-on-surface relative z-10">
                Geography &amp; People
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant relative z-10 leading-relaxed">
                Positioned in the heart of Northeast India, Manipur is a vibrant
                mosaic of traditions. It is home to diverse ethnic communities,
                notably the Meitei, Naga, and Kuki peoples, who weave together a
                rich tapestry of communal harmony and distinct cultural practices
                that define the region's identity.
              </p>
            </div>

            {/* Art & Culture */}
            <div className="flex flex-col gap-stack-md bg-surface p-stack-lg rounded border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#f97316] opacity-5 rounded-tr-full -ml-10 -mb-10 transition-transform group-hover:scale-110" />
              <div className="w-12 h-12 bg-[#f97316]/20 text-[#c2410c] border border-[#f97316]/30 rounded flex items-center justify-center mb-2 shadow-sm">
                <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                  palette
                </span>
              </div>
              <h2 className="font-serif font-medium text-headline-md text-on-surface relative z-10">
                Art &amp; Culture
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant relative z-10 leading-relaxed">
                Manipur preserves a profound legacy of classical and folk forms,
                deeply rooted in spiritual devotion and martial prowess. From the
                intricate rhythms of traditional percussion to the graceful
                expressions of dance, the cultural landscape is a testament to
                centuries of artistic dedication and spiritual storytelling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Highlights Bento Grid */}
      <section className="w-full bg-surface-container-lowest py-stack-lg md:py-20">
        <div className="w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mb-stack-lg text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-stack-md">
            <div>
              <h2 className="font-serif font-medium md:font-serif font-medium text-headline-lg-mobile md:text-headline-lg text-on-surface mb-stack-sm">
                Cultural Highlights
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Explore the distinct elements that constitute Manipur's invaluable
                contribution to India's national heritage.
              </p>
            </div>
            <a
              className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors group focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
              href="#"
            >
              View Complete Archive
              <span
                className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              >
                arrow_forward
              </span>
            </a>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md md:gap-gutter">
            {/* Highlight 1: Raas Leela */}
            <article className="col-span-1 md:col-span-2 bg-surface border border-outline-variant rounded shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group focus-within:ring-2 focus-within:ring-primary relative">
              <div className="h-64 md:h-80 w-full relative overflow-hidden bg-surface-container">
                <img
                  alt="Raas Leela Dance Performance"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAspfpPFCgwKKsUJ2WCermbKZZZYqq4eXefwpMgNxrBqC2hE62nJuqbpUzVDKaHx_rup4P8YBpnsHSovatWWhcx4fcfiacwJfsR4e5qQ0avrtOazzCGAf-5o0uJWoOKA7SBwbsd1K7QZACc1_FHJBPFrzp48JBI8s4HAVcTlJaShY0jGqSDHgblGlBFSCsNqVWYHRlT6kPPmn--5MvSqcuomNrJCrHbB4-xROGPfeaOui0GZ4mqpAyU_Q"
                />
              </div>
              <div className="p-stack-lg flex-grow flex flex-col justify-center bg-surface relative z-10">
                <div className="flex items-center gap-2 mb-stack-sm text-primary">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    theater_comedy
                  </span>
                  <span className="font-label-md text-label-md uppercase tracking-wider">
                    Classical Heritage
                  </span>
                </div>
                <h3 className="font-serif font-medium text-headline-md text-on-surface mb-stack-sm group-hover:text-primary transition-colors">
                  Raas Leela Dance
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  The epitome of Manipuri classical dance, depicting the divine love
                  of Radha and Krishna through graceful, fluid movements. It is a
                  profound expression of devotion, characterized by intricate
                  footwork, subtle facial expressions, and magnificent traditional
                  attire.
                </p>
              </div>
            </article>

            {/* Stack for 2 and 3 */}
            <div className="col-span-1 flex flex-col gap-stack-md md:gap-gutter">
              {/* Highlight 2: Handlooms */}
              <article className="bg-surface border border-outline-variant rounded shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden flex-grow group focus-within:ring-2 focus-within:ring-primary">
                <div className="h-40 w-full relative overflow-hidden bg-surface-container">
                  <img
                    alt="Manipuri Handlooms"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjTUbCM1wVqo30T8dCi-ie0JNbbpX3bJxCg1D3CPqzlvauySmggB1WQ05QVZf1OQXtpOPYQ5nbFoKU4yHC4PD9opUwiHiZMgQ5GvHzThPjVB05ip5FfoZBFVwnXXWLJMwb58iBIOFcLIBzkt6G4kLubzZJxIMnKOB3oYgRlZu0OfcGUr4oG_1UUeZEZqmnD702AQougY97r7a0LHad96YH7S67Uy5dvF2HiEb1Y988u2zfTVc6kIswdQ"
                  />
                </div>
                <div className="p-stack-md flex-grow flex flex-col">
                  <h3 className="font-serif font-medium text-headline-md text-on-surface mb-stack-sm text-lg group-hover:text-primary transition-colors">
                    Handlooms &amp; Textiles
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm flex-grow">
                    World-renowned for intricate designs like the Phanek and
                    Enaphi, reflecting a legacy of expert craftsmanship passed down
                    through generations.
                  </p>
                </div>
              </article>

              {/* Highlight 3: Loktak Lake */}
              <article className="bg-surface border border-outline-variant rounded shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden flex-grow group focus-within:ring-2 focus-within:ring-primary">
                <div className="h-40 w-full relative overflow-hidden bg-surface-container">
                  <img
                    alt="Loktak Lake and Phumdis"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNCQgfIkfslqfQC3corvXOthrDSq0IeN2M-5l0qwzJw5ELTXL3ui8CC8SQ7pOso0zbav_j15JbP7xPy_2VksEZWFsY9QF0xLC9sriu7OoDJ_J71IQkZKm2Ftlto5WGhVqrQD_6mekWCmUZ8REZvkBO9kl5FdMbHIEu5nmqotufyeHUfd0rDfZnl4fxpFm7WtoaPbgugogrOhio-xWU3rkTYHXDGaZge0n5I-b6hya5r-WJc4GMvtyPeA"
                  />
                </div>
                <div className="p-stack-md flex-grow flex flex-col">
                  <h3 className="font-serif font-medium text-headline-md text-on-surface mb-stack-sm text-lg group-hover:text-primary transition-colors">
                    Loktak Lake &amp; Phumdis
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm flex-grow">
                    The largest freshwater lake in Northeast India, home to unique
                    floating islands and a symbol of ecological heritage.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
