import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member State: Assam | North East Zone Cultural Centre",
  description: "Discover the gateway to the North East, where ancient traditions flow as endlessly as the mighty Brahmaputra.",
};

export default function AssamPage() {
  return (
    <div className="flex-grow flex w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
      <main className="flex-grow w-full overflow-hidden  md:-mt-[30px] relative z-0">


        {/* Hero Section */}
        <section className="relative w-full rounded-xl overflow-hidden mb-stack-lg shadow-sm border border-outline-variant bg-surface-container-lowest">
          <div
            className="w-full h-64 md:h-80 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCH4nVmspcAaAFGslmpB_Jk3nhjkCNtKOzN0yWGnXTLmDmXBDyXhnpCZ_7UZg2FgAHHSpm-D93LbOLmtmUiU9-kF1296dHzsQVw4JHH9fQ_dqXUEQDi4I-c80or8rkVN5xW5yl0DPKc9Ay1Jip7F4AYwKBO8yQ6mpwzslVW1ndGFxJ_ZsIAis-zLU2Z1arOHl5_wpZR1V4eoj--EEFiOwXp6DIrxgzIDbVSQkOMF9C_Aj7gUbsGrwOeIQ')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 p-gutter w-full">
            <span className="inline-block px-3 py-1 bg-[#FF671F] text-white text-caption font-caption font-semibold rounded-sm mb-stack-sm tracking-wider uppercase">
              Member State
            </span>
            <h1 className="text-headline-xl-mobile md:text-headline-xl font-serif font-medium md:font-serif font-medium text-white mb-2 text-balance">
              Assam: The Land of the Red River and Blue Hills
            </h1>
            <p className="text-inverse-on-surface text-body-lg font-body-lg max-w-3xl opacity-90">
              Discover the gateway to the North East, where ancient traditions flow
              as endlessly as the mighty Brahmaputra.
            </p>
          </div>
        </section>

        {/* Overview Section (Bento Layout) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-stack-lg">
          <div className="bg-surface-container-lowest p-gutter rounded-lg border border-outline-variant shadow-[0_1px_3px_rgba(0,0,0,0.1)] flex flex-col gap-stack-md">
            <div className="flex items-center gap-3 text-primary">
              <span
                className="material-symbols-outlined text-headline-md"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                public
              </span>
              <h2 className="text-headline-md font-serif font-medium">
                Geography &amp; People
              </h2>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant flex-grow">
              Positioned as the vital gateway to the North East, Assam is defined
              by the sweeping Brahmaputra valley. It is a vibrant mosaic of
              multi-ethnic populations, where indigenous tribes and plains people
              co-exist, fostering a rich, deeply interconnected social fabric
              essential to the region's cultural stability.
            </p>
            <div className="flex items-center gap-2 text-caption font-caption text-secondary font-medium">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                map
              </span>
              Explore Demographics
            </div>
          </div>
          <div className="bg-surface-container-lowest p-gutter rounded-lg border border-outline-variant shadow-[0_1px_3px_rgba(0,0,0,0.1)] flex flex-col gap-stack-md">
            <div className="flex items-center gap-3 text-primary">
              <span
                className="material-symbols-outlined text-headline-md"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                account_balance
              </span>
              <h2 className="text-headline-md font-serif font-medium">
                Heritage &amp; Craft
              </h2>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant flex-grow">
              Rooted in the legacy of the ancient Ahom kingdom, Assam's heritage
              is profound. From the spiritual significance of Majuli, the world's
              largest river island, to its global renown for robust Assam tea and
              exquisite indigenous silk weaving, the state's cultural economy
              remains resilient and celebrated.
            </p>
            <div className="flex items-center gap-2 text-caption font-caption text-secondary font-medium">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                history_edu
              </span>
              View Archival Records
            </div>
          </div>
        </section>

        {/* Cultural Highlights Section */}
        <section className="mb-stack-lg">
          <div className="flex items-center justify-between mb-stack-md">
            <h2 className="text-headline-lg font-serif font-medium text-on-background">
              Cultural Highlights
            </h2>
            <a
              className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1"
              href="#"
            >
              View All{" "}
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                arrow_forward
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Card 1 */}
            <article className="bento-card hover:-translate-y-1 hover:shadow-md transition-all duration-200 bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col">
              <div
                className="h-48 bg-cover bg-center border-b border-outline-variant"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpliqzgkGnWeAsc2fKrAPVG1of-cAUs7BgAWkjxnbY5U6DgtVcysgmTNfhFN66vRyOWs_8lAYQCHfaMo16S8911AByjiMmqNDeFPC4bl9wSA0ECRK9Ea3BNd_VWQOFlv40C7n-yfK9aiP8xK8Eo4fskGQG6pRXTnbJrQcHlYUveCigWlCnre5RHyRITsAUa_MxAdQ9iH5dLPLkRa0Ekh2gsLdOZRcsc8HDuK8b0XBXhNb4KZMoaMukhw')",
                }}
              />
              <div className="p-stack-md flex flex-col flex-grow">
                <h3 className="text-headline-md font-serif font-medium text-on-background mb-2">
                  Bihu Festival
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-stack-md flex-grow">
                  The heartbeat of Assamese culture, encompassing the three
                  distinct Bihusâ€”Rongali (spring/sowing), Kongali
                  (autumn/auspicious), and Bhogali (winter/harvest).
                </p>
                <span className="inline-flex items-center gap-1 text-caption font-caption text-[#16a34a] bg-[#16a34a]/10 px-2 py-1 rounded w-fit">
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                    verified
                  </span>{" "}
                  Preserved Tradition
                </span>
              </div>
            </article>

            {/* Card 2 */}
            <article className="bento-card hover:-translate-y-1 hover:shadow-md transition-all duration-200 bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col">
              <div
                className="h-48 bg-cover bg-center border-b border-outline-variant"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsameEeY-rz5Ku_K-2kne9oK5MuxiJNwX3ZT2hvjwWcp3NIYBRllBq9BL7piUg1rJa_KR5YSN2XDpF1Tf24hYFm9OBDQAj1l8-lMGE1r9bkuGPZs4x0uqFLhkMmfDnFfjXcBs2o_YToLJxv8MpVE886IcwrdN8ET-O8sfOWMFbhZyTv_x-3FESiX5udM4tFyZxpVRPzSn5H0Ptx3mncosdwtTvGj6L63xI3ft4faHanakCz71lzPylLw')",
                }}
              />
              <div className="p-stack-md flex flex-col flex-grow">
                <h3 className="text-headline-md font-serif font-medium text-on-background mb-2">
                  Muga &amp; Eri Silk
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-stack-md flex-grow">
                  Renowned for the highly prized golden Muga silk and warm Eri
                  silk, anchored by the indigenous, centuries-old weaving
                  traditions centered in Sualkuchi.
                </p>
                <span className="inline-flex items-center gap-1 text-caption font-caption text-[#1d4ed8] bg-[#1d4ed8]/10 px-2 py-1 rounded w-fit">
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                    info
                  </span>{" "}
                  Artisan Craft
                </span>
              </div>
            </article>

            {/* Card 3 */}
            <article className="bento-card hover:-translate-y-1 hover:shadow-md transition-all duration-200 bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col">
              <div
                className="h-48 bg-cover bg-center border-b border-outline-variant"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA4ey9RvRNLlYMiOza5KrHFbQUALUSvc4VD8XOdulXZrnWZbxhNeThs76FT86H_If8oQovpHMbNPXsDySiZgQiLBGS9VPAd3daGj44sQoVxkskGZKBBSf5UWLyn8QVQ0lp72v9I92XhaZcV00ccCQcMkakAjkDAtsEFoE2q65AHmqgJi5-aVDODkRIAB-sLqdVDTLFXIolZQLOKugTm-pJgABHp-Ww-G3f5X1NhoysalsOzz4Gn6FpUWQ')",
                }}
              />
              <div className="p-stack-md flex flex-col flex-grow">
                <h3 className="text-headline-md font-serif font-medium text-on-background mb-2">
                  Sattriya Dance
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-stack-md flex-grow">
                  A major Indian classical dance form that originated in the 15th
                  century within the Vaishnavite Sattras (monasteries), preserving
                  spiritual narratives through graceful movement.
                </p>
                <span className="inline-flex items-center gap-1 text-caption font-caption text-[#16a34a] bg-[#16a34a]/10 px-2 py-1 rounded w-fit">
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                    verified
                  </span>{" "}
                  Classical Art
                </span>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
