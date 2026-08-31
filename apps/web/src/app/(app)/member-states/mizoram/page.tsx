import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member State: Mizoram | North East Zone Cultural Centre",
  description: "Nestled in the lush hills of Northeast India, Mizoram is a vibrant tapestry of tribal heritage, tight-knit communities, and deep-rooted traditions.",
};

export default function MizoramPage() {
  return (
    <main className="flex-grow flex flex-col w-full relative z-0  md:-mt-[30px] relative z-0">
      {/* Hero Section */}
      <header className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-surface-variant">
        <div className="absolute inset-0 z-0">
          <div
            className="bg-cover bg-center w-full h-full"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3JP6g1NfnkIwLNYjxO8ugJ9YljWyjWWzPOmDiZZ4RN-JFG755_0oP8IIJ-y0Vo06lCIM2JTecGGTxoWu64PvPZZKDRPhcOl2fBNCql-qJPAAOGVCRqAsOxaNLlB_Zp0auy74BFS0GYOQ62LvPQV3D9je94krvDfFa8kIivihsXPoNE8_pkyVUaIzIEu4gN9IYCCc0h_Z4ukrg1al-B03e6dxe8NP0rulybkeOBybvnvApPNdoa3306g')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto">
          <h1 className="font-serif font-medium text-headline-xl md:font-serif font-medium md:text-headline-xl text-on-primary mb-stack-md drop-shadow-md">
            Mizoram: Land of the Hill People
          </h1>
          <p className="font-body-lg text-body-lg text-surface-container-highest drop-shadow max-w-2xl mx-auto">
            Nestled in the lush hills of Northeast India, Mizoram is a vibrant
            tapestry of tribal heritage, tight-knit communities, and deep-rooted
            traditions. Experience the warmth of its people and the profound
            beauty of its cultural landscape.
          </p>
        </div>
      </header>

      {/* Geography & People Section */}
      <section className="py-stack-lg md:py-[64px] px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="space-y-stack-md">
            <h2 className="font-serif font-medium text-headline-lg text-primary">
              The Lushai Hills &amp; Its People
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Mizoram, translating literally to 'Land of the Hill People', is
              characterized by its rolling hills, deep valleys, and pristine
              rivers. The state is home to various Mizo tribes, unified by a
              shared history, language, and an intrinsic connection to the land
              they cultivate.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Beyond its striking geography, Mizoram boasts one of the highest
              literacy rates in India. This educational achievement reflects a
              progressive society that deeply values learning while fiercely
              preserving its ancestral customs, creating a unique synthesis of
              modern institutional capability and rich cultural heritage.
            </p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden shadow-sm border border-outline-variant">
            <img
              alt="Mizo People Heritage"
              className="object-cover w-full h-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARrmoQTUPw6ZdTc_4KaKEENYBZhqYIgN69ykEzyzt3CdnxXZiA30TdfXC4u1zaNKr0IDqdaYd6SfANbjc9QvDJZ228nfZcgzi84n76WsStKhFi1OWeODnPsX8iaAzrlM5DaZsQ2jOVJy4T_fru7-inft6QUBkXvLbJAX0otxac_FHesiYURS9Rj_4qDDFB18ZkdIbLp3tqz2bLQNaCAOukTcX-YXmmW2g1FoAOvQQ5aC9W5M-WGP4ulg"
            />
          </div>
        </div>
      </section>

      {/* Heritage & Tradition Section (Banner) */}
      <section className="bg-surface-container-low border-y border-outline-variant py-stack-lg md:py-[64px] px-margin-mobile md:px-margin-desktop w-full">
        <div className="max-w-container-max-width mx-auto text-center max-w-3xl">
          <span
            className="material-symbols-outlined text-primary mb-stack-md"
            style={{ fontSize: "48px", fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            account_balance
          </span>
          <h2 className="font-serif font-medium text-headline-lg text-primary mb-stack-md">
            The Spirit of 'Zawlbuk'
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Central to the traditional Mizo societal structure was the 'Zawlbuk',
            a bachelors' dormitory that served as the nerve center of village
            life. It was here that young men were trained in discipline, martial
            arts, and community service. While the physical structures may have
            evolved, the spirit of 'Zawlbuk'â€”emphasizing selflessness, community
            welfare (Tlawmngaihna), and shared responsibilityâ€”remains the bedrock
            of modern Mizo institutional and social frameworks.
          </p>
        </div>
      </section>

      {/* Cultural Highlights Section */}
      <section className="py-stack-lg md:py-[64px] px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto w-full">
        <h2 className="font-serif font-medium text-headline-lg text-primary text-center mb-[48px]">
          Cultural Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Card 1 */}
          <div className="bg-surface rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
            <div className="h-48 rounded-lg overflow-hidden mb-stack-md bg-surface-variant">
              <img
                alt="Chapchar Kut Festival"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCstEhlFh9rJqD5QOh_qXiuVSNvUVhGg_1urudYEo7VexhQBf8A9QNYChagVWqtqD7gn050pjMwB-7LTSsswsHiBCLF9ylTndzDtjHfOL2XKDGeqhtXUj1DX-WhoCxdGbbHIlqmfyB2b8Ddd9JDyF-hEafq5jataJoOclB0auS4n0lAgD-Ld6T_ybOgjaPb_Xo42LWHl5PJvCCSc9vKW5ULD2tYI2zXtizyU5SIP1CyKfHr75jU_nsuCw"
              />
            </div>
            <h3 className="font-serif font-medium text-headline-md text-on-surface mb-2">
              Chapchar Kut Festival
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
              The most significant spring festival, celebrated with great fervor
              after the arduous task of clearing the jungle for 'Jhum' (shifting
              cultivation). It is a time of joyous celebration, marked by singing,
              dancing, and communal feasting.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-surface rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
            <div className="h-48 rounded-lg overflow-hidden mb-stack-md bg-surface-variant">
              <img
                alt="Cheraw Dance"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd5WVWFCwgsMB0mvQlmpBVWTZPksJQKQBOSkNMocGSjIZnGPnq5ZbHiHhPfEUEITburLtPj15nYfK2D6j5HN4731umNa1l-V6HhcQcYNwi9eZOsAWjA3I9bZ19uJLXJNKdPnJA_orfuyaQxyFK2FVwZ2bQaYl7qQ8sRqoaWH2lokJMBtsIrc9jR2u6-OYxyCFaG0S13SfPbuaJENMviPe5Az901yirszuwEoVB455-cxH2_h41VGbbFg"
              />
            </div>
            <h3 className="font-serif font-medium text-headline-md text-on-surface mb-2">
              Cheraw Dance
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
              Globally renowned as the 'Bamboo Dance', Cheraw is a display of
              incredible skill and timing. Dancers step in and out of clapping
              bamboo staves, showcasing intricate footwork and the vibrant
              traditional attire known as the Puan.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-surface rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
            <div className="h-48 rounded-lg overflow-hidden mb-stack-md bg-surface-variant">
              <img
                alt="Mizo Handlooms"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUuIizZIepOFejANs8KBUJQ8W5R4Kv28WBbZN6KCMYmIumPFEilJHcmMQ6_DQrczF3fFhchPHjnYDmb0vG0r05NUOSRcaxiukjdyStP8iUFVKnaLBbAEobQx_0zQpZK3EqRHeCjS5zqDx8752tcv1WLwx9FLQf2mRW_EuBjs8JFQ_Bl86gdkaKuIZiWhg02w2KzmWrBx2u6wvcEWQJPEJAvJVCWkka81toQ7cUVQAGK68R5UPuvjJEAg"
              />
            </div>
            <h3 className="font-serif font-medium text-headline-md text-on-surface mb-2">
              Mizo Handlooms
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
              Mizo women are master weavers, creating intricate and deeply
              symbolic patterns on traditional loin looms. The textiles,
              especially the ceremonial shawls, are central to Mizo identity
              and are preserved as vital cultural artifacts.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
