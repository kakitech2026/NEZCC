import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member State: Nagaland | North East Zone Cultural Centre",
  description: "Nagaland is a land of festivals, home to 16 major tribes with a vibrant warrior heritage.",
};

export default function NagalandPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdaYdNCaxQFJ_hcwQUvkYVa4jgyly7hMmMN2QrPx0xlTeJ_PgGTFQEM2yo9wliLJXRPO9-7acfU4nyS4pUrIQXQ0EcdQlWTOe-enRpzjqiJKSGfLMDeO3j-4hUQxhOOcsbqVGbcfSlJgOCEgSfASI5QNlx_-0SU59l2L4lpFsbVcxmyVQ47SgLdDYy3NmwcwLdj_s4Fo4ik7J2o-bdjV_0AgCBL1iWDVcnlLV01S3SinBQxB2oKstvAQ')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/40 to-transparent" />
        <div className="relative z-10 max-w-container-max-width mx-auto px-margin-desktop w-full text-center mt-32">
          <span className="inline-block px-4 py-1 bg-[#FF671F] text-white font-label-md text-label-md rounded-full mb-4 shadow-sm border border-white/20">
            Member State
          </span>
          <h1 className="text-headline-xl font-serif font-medium md:text-headline-xl text-white mb-6 drop-shadow-lg tracking-tight">
            Nagaland: Land of Festivals
          </h1>
          <p className="text-body-lg font-body-lg text-white/90 max-w-3xl mx-auto drop-shadow-md border-l-4 border-[#4cb748] pl-4 text-left">
            Home to 16 major tribes, Nagaland represents a mosaic of vibrant
            traditions, deeply rooted in its rugged terrain. This is a land where
            ancient warrior heritage converges with elaborate communal festivals,
            preserving a profound cultural legacy for future generations.
          </p>
        </div>
      </section>

      {/* Geography & People */}
      <section className="py-12 md:py-24 px-margin-desktop bg-surface-bright" id="geography">
        <div className="max-w-container-max-width mx-auto">
          <div className="flex flex-col md:flex-row gap-gutter items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md uppercase tracking-widest mb-4">
                <span className="material-symbols-outlined text-[#FF671F]" aria-hidden="true">
                  terrain
                </span>
                Geography &amp; Demographics
              </div>
              <h2 className="text-headline-lg font-serif font-medium text-on-surface mb-6">
                The Rugged Terrain &amp; The Naga Tribes
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                Nagaland is a mountainous state in northeast India, bordering
                Myanmar. It is characterized by deep valleys, lofty mountains, and
                dense emerald forests. This challenging topography historically
                nurtured fiercely independent communities, resulting in a rich
                tapestry of distinct tribal identities.
              </p>
              <div className="bg-surface-container-low p-6 rounded-lg border-l-4 border-[#4cb748] shadow-sm">
                <h3 className="text-headline-md font-serif font-medium text-on-surface mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" aria-hidden="true">
                    gite
                  </span>
                  The Morung Tradition
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Central to traditional Naga society is the 'Morung', a communal
                  bachelors' dormitory. It served not only as a guardhouse but as
                  an essential educational institution where elders transmitted
                  ancestral wisdom, folklore, and martial skills to the youth,
                  ensuring the continuity of tribal culture.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 w-full h-[400px] rounded-xl overflow-hidden shadow-md border border-outline-variant">
              <div
                className="bg-cover bg-center w-full h-full"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAAZHgjTaOKhAxoJyj3Jav_q5DyptSq8WQW6nMR4vBuw-S1YrlBOsCX6VxB6vf_x-aPKjgcGkOCwS-8jY0hDR0SzJoraXr2OlVvBd-Hk4fQntBVU9-RFsmBR3mGKQpApIbTO5JbGaq0t_suJOLPAO8RiLIu2Zyq8n8aoGBOazvt4OU9tWfYBA97KBhObPtt6yaz90AVFGCD_v2u2Kai5uyr6-L5ADl2L8GvCmZv67_d2w5mKtVASu6PAA')",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Warrior Heritage & Craft */}
      <section className="py-12 md:py-24 px-margin-desktop bg-surface-container-lowest" id="warrior">
        <div className="max-w-container-max-width mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-gutter items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md uppercase tracking-widest mb-4">
                <span className="material-symbols-outlined text-[#FF671F]" aria-hidden="true">
                  swords
                </span>
                Ancestral Legacy
              </div>
              <h2 className="text-headline-lg font-serif font-medium text-on-surface mb-6">
                Warrior Heritage &amp; Artisanal Mastery
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                The historical narrative of the Naga people is intricately woven
                with their legacy as formidable warriors. This martial history
                deeply influenced their social structure and material culture.
                Today, this fierce pride translates into unparalleled
                craftsmanship, recognized globally.
              </p>
              <ul className="space-y-4 text-body-md font-body-md text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-1" aria-hidden="true">
                    check_circle
                  </span>
                  <div>
                    <strong className="text-on-surface block">Wood Carving</strong>
                    Traditional motifs reflecting village life, animals, and
                    ancestral spirits are meticulously carved into architectural
                    elements and domestic objects.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-1" aria-hidden="true">
                    check_circle
                  </span>
                  <div>
                    <strong className="text-on-surface block">Textile Weaving</strong>
                    Naga women are master weavers, using backstrap looms to create
                    vibrant, intricately patterned shawls that denote the wearer's
                    tribe, social status, and achievements.
                  </div>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4 h-[500px]">
              <div className="rounded-xl overflow-hidden shadow-sm border border-outline-variant h-full">
                <div
                  className="bg-cover bg-center w-full h-full"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCLpMPlqpyjJcp9XO8Des-_RV7SsA5oyELVdPuk7H-U6EO9RadXZGbxRWjUol4qn1NUu9flC2HQdZYSLzidMcSPEFhYm0ETPGJpEBltMn46x1fMcy_LoQbIIf4d4IUpw5Am43vbwccuLnFTskxeP1TYtCQEYOlF5nNFnutM6BCHACiWQxraw1Xl5LgunXA748QKUqhxywN8gDYel1H-nNV7aQF4WWhK2MUTNlj_c8vuYmyhah_mJYGUBQ')",
                  }}
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm border border-outline-variant h-full mt-8">
                <div
                  className="bg-cover bg-center w-full h-full"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDIPkL9MYASSna_lfPxgwy8xY0m__x12VGvmo7RKgImhyqyzwCfE2e9X7kee1QJi8JPOpYAPbaYnDpNqxHHyWvEvfzIdSHgYzQp2nBaLg1lWqvbLv6Vtaq0mrb0zRDWX6B7P2NNbvGEObyCGvLGn-UhqVMMTCCmFzZNOwSWe0NAKxBmoqHpv3Lr0EEXLIaop34-pdArIKNsxWnNRYmfwW1v2DVKwZ7zMh7FZ_9EEJvg4uJLb9bjxKNeEw')",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Highlights Grid */}
      <section className="py-12 md:py-24 px-margin-desktop bg-surface-container-low border-t border-outline-variant" id="festivals">
        <div className="max-w-container-max-width mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md uppercase tracking-widest mb-4 justify-center">
              <span className="material-symbols-outlined text-[#FF671F]" aria-hidden="true">
                celebration
              </span>
              Living Traditions
            </div>
            <h2 className="text-headline-lg font-serif font-medium text-on-surface">
              Cultural Highlights
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant mt-4 max-w-2xl mx-auto">
              Explore the vibrant celebrations and symbolic artistry that define
              the essence of Naga cultural identity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer flex flex-col h-full">
              <div className="h-48 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUtfBdJn4BZI6P20wskDqzigwa59sI3TCkw-VrK-h6O7qjBCmJSMjVvuoReY_Cf-lyVu9gm-YGw6w9cP1T4b-QY0TC6KZrGOodsa2TnWMXFLRyXVEn17JeqV6hp7zFCoC8ewY4Y38v_LYdjfvzAccqpTW7ZgD5jG20KFl2SkOMsWBoY3CqxsIsjN373TZ21TnZSGoa7_lKGZbJgz30PRbJw5yaNFAXklkY56WMMuYMHCrJkUDmwwdWgg')",
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-headline-md font-serif font-medium text-on-surface mb-3 group-hover:text-primary transition-colors">
                  Hornbill Festival
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant flex-grow">
                  Known as the 'Festival of Festivals,' this spectacular event held
                  every December is a collaborative celebration where all Naga
                  tribes converge to display their unique dances, music, and crafts
                  in a unified cultural extravaganza.
                </p>
                <div className="mt-4 pt-4 border-t border-outline-variant flex items-center text-primary font-label-md text-label-md">
                  Read more <span className="material-symbols-outlined ml-1 text-[18px]" aria-hidden="true">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer flex flex-col h-full">
              <div className="h-48 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAk1O7Juplw40FOK08lNis7raZQZHZ9FdQe7pQjwybb-qZekBioHYmGXY3d3ijpEe8VPQ3gVt0AjBOnvS-ve2lurEOBy8zqW6X8RHYNGWO3C8lMu8WomLN6Q9W_UD0dMV9mXG2G6LNuXxNRNERLSNFMU2urTgR2nWmgOarxQYhtg_fcokdeXYj-Z8BpnYcnHGcjtDON5IUwfu61lC5dQ1BKwr_9EwiAsghCJ0BAI81fmsYyYIMq56v0NA')",
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-headline-md font-serif font-medium text-on-surface mb-3 group-hover:text-primary transition-colors">
                  Traditional Naga Attire
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant flex-grow">
                  Naga clothing is deeply symbolic. The distinctive shawls, elaborate
                  headgear, and intricate ornaments constructed from beads, shells,
                  and bone are not merely decorative but communicate social
                  standing, tribal affiliation, and martial prowess.
                </p>
                <div className="mt-4 pt-4 border-t border-outline-variant flex items-center text-primary font-label-md text-label-md">
                  View gallery <span className="material-symbols-outlined ml-1 text-[18px]" aria-hidden="true">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer flex flex-col h-full">
              <div className="h-48 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAymxowbm5cT9pfkYqJSYmBQaQRb7Kx2z7mUDLPnU6hySIQlDq2NF6TqbkyNWlwitIipCJaY37ilwYgVeRSDa9tyKrIhmT_1krZ4KWRrBuYlf-1Ar-QqjW444wBrQIizp1i3qTZQV9UiySZs7A6Fil7KEbwRWt61xPAXBMCg9FULCoAdCjj3kPc1aQsDt0Z05SjhuQt77pignL10WV9amRAyImBppQMLCwjSv9dabAUTkTFhmpzTCrXpg')",
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-headline-md font-serif font-medium text-on-surface mb-3 group-hover:text-primary transition-colors">
                  Sekrenyi Festival
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant flex-grow">
                  Celebrated by the Angami Nagas, Sekrenyi is a profound festival of
                  purification and renewal. Through specific rituals and feasts,
                  the community seeks to wash away past transgressions and secure
                  health and prosperity for the coming year.
                </p>
                <div className="mt-4 pt-4 border-t border-outline-variant flex items-center text-primary font-label-md text-label-md">
                  Learn more <span className="material-symbols-outlined ml-1 text-[18px]" aria-hidden="true">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
