import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member State: Arunachal Pradesh | North East Zone Cultural Centre",
  description: "Arunachal Pradesh, the 'Land of the Rising Sun,' is a vibrant tapestry of 26 major tribes and over 100 sub-tribes.",
};

export default function ArunachalPradeshPage() {
  return (
    <main className="flex-grow  md:-mt-[30px] relative z-0">


      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <div
            className="bg-cover bg-top w-full h-full"
            style={{
              backgroundImage:
                "url('/images/arunachal.webp')",
            }}
          />
          <div className="absolute inset-0 bg-inverse-surface/60" />
        </div>
        <div className="relative z-10 text-center px-gutter max-w-4xl mx-auto flex flex-col items-center gap-stack-md">
          <span className="text-orange-400 font-label-md text-label-md uppercase tracking-wider bg-inverse-surface/80 px-4 py-1 rounded-full border border-orange-400/50 backdrop-blur-sm">
            Member State
          </span>
          <h1 className="text-headline-xl font-serif font-medium text-on-primary md:text-[56px] leading-tight font-extrabold drop-shadow-lg">
            Arunachal Pradesh:
          </h1>
          <p className="text-body-lg font-body-lg text-inverse-on-surface mt-stack-sm max-w-2xl text-white/90 drop-shadow-md">
            The Land of the Rising Sun
          </p>
          <div className="mt-stack-lg flex gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-DEFAULT font-label-md text-label-md transition-colors border-2 border-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
              Explore Culture
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-DEFAULT font-label-md text-label-md hover:bg-white/10 transition-colors backdrop-blur-sm">
              State Initiatives
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-container-max-width mx-auto px-gutter py-stack-lg">
        <section className="mb-24">
          <div className="flex items-end justify-between mb-stack-lg border-b border-outline-variant pb-4">
            <h2 className="text-headline-lg font-serif font-medium text-primary">Overview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <h3 className="text-headline-md font-serif font-medium text-on-surface">
                Geography and People
              </h3>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Arunachal Pradesh shares international borders with Bhutan, Tibet,
                and Myanmar. The state is home to a diverse population including the
                Monpa, Tani, Mishmi, and Naga tribes, each with their own unique
                languages, customs, and artistic expressions. The varied topography,
                ranging from snow-capped peaks to lush sub-tropical forests, has
                shaped the distinctive lifestyle of its inhabitants.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-headline-md font-serif font-medium text-on-surface">
                Spirituality and Tradition
              </h3>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Religion plays a central role in the lives of the people, with a
                harmonious blend of Animism (Donyi-Polo), Buddhism, and other
                faiths. The state's architecture, such as the historic Tawang
                Monasteryâ€”the largest in Indiaâ€”reflects this spiritual depth.
                Festivals are a cornerstone of communal life, celebrated with
                traditional music, elaborate dances, and a deep respect for nature.
              </p>
            </div>
          </div>
        </section>

        {/* Cultural Highlights (Bento Grid) */}
        <section className="mb-24">
          <div className="flex items-end justify-between mb-stack-lg border-b border-outline-variant pb-4">
            <div>
              <h2 className="text-headline-lg font-serif font-medium text-primary">
                Cultural Highlights
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant mt-2">
                The living traditions and artistic expressions of the state.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-96 flex flex-col relative">
              <div
                className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('/images/losar.webp')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-transparent z-10" />
              <div className="relative z-20 mt-auto p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-orange-400 mb-1">
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">
                    festival
                  </span>
                  <span className="font-label-md text-label-md uppercase tracking-wide text-xs">
                    Traditional Festivals
                  </span>
                </div>
                <h3 className="text-headline-md font-serif font-medium text-white font-medium">
                  Losar &amp; Solung
                </h3>
                <p className="text-body-md font-body-md text-white/80 line-clamp-2">
                  Losar marks the Monpa New Year with prayers and masked dances,
                  while Solung is the harvest festival of the Adis, celebrated with
                  the 'Ponung' dance to ensure a bountiful season and protection of
                  livestock.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-96 flex flex-col relative">
              <div
                className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyqtDJFa-JFV7U971vKjgEuEHK0zwXIijS8fTuxHDLnV3zAn_t1af8vfQbgsH925H_9W1smFd2RaWmyZDozHlE8qEfLMZ6uTXqnsszjBmyjR04owMQxwXwp7ADNij7ANGiJmn9T-rnf89ZVr1PyFlSFJg7yXvbKf9vV3Qmf2n42o8pdTlYkkz4nhPDjQvCZSdn-3X2Y_6ooA7HTY6uxfLpxNdmACd0Q8IKwbFqiuszBhtrh_IMV2Fzzw')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-transparent z-10" />
              <div className="relative z-20 mt-auto p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary-fixed mb-1">
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">
                    brush
                  </span>
                  <span className="font-label-md text-label-md uppercase tracking-wide text-xs">
                    Indigenous Crafts
                  </span>
                </div>
                <h3 className="text-headline-md font-serif font-medium text-white font-medium">
                  Thangka &amp; Weaving
                </h3>
                <p className="text-body-md font-body-md text-white/80 line-clamp-2">
                  The Monpas are renowned for their Thangka paintingsâ€”sacred Buddhist
                  scrollsâ€”while every tribe excels in weaving. Women use loin looms
                  to create intricate patterns that serve as symbols of tribal
                  identity.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-96 flex flex-col relative">
              <div
                className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8lkNVt3x2q76N1HFMCJ3O8yE3nudp90R5aDt9NMgl4Nyfp5flAe0mk4KE5uuPuedM1XLFrizOBosrlTguQiePvEeQ3hKQMg4v8PIIvQLwewluCOM1ER29D27aqHvsXavI8BjK7fd-6_a3RaSa9J0eWT48V_zxL7hufmpYI9R8g5RKYS6GM-RVHbelBnqqwMhJ0PUqtNvJkr38pPsCxAFP30UgFwFyDRBgGnAtWS8HMEEsQXZfw6oOhQ')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-transparent z-10" />
              <div className="relative z-20 mt-auto p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-secondary-fixed mb-1">
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">
                    theater_comedy
                  </span>
                  <span className="font-label-md text-label-md uppercase tracking-wide text-xs">
                    Folk Performances
                  </span>
                </div>
                <h3 className="text-headline-md font-serif font-medium text-white font-medium">
                  Aji Lhamu Dance
                </h3>
                <p className="text-body-md font-body-md text-white/80 line-clamp-2">
                  A traditional folk dance of the Monpa and Sherdukpen tribes, Aji
                  Lhamu depicts scenes from the Ramayana and other local legends,
                  performed with vibrant masks and elaborate costumes during major
                  festivals.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
