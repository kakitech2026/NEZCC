import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member State: Tripura | North East Zone Cultural Centre",
  description: "Tripura: Land of Royal Heritage & Tribal Splendor.",
};

export default function TripuraPage() {
  return (
    <main className="w-full  md:-mt-[30px] relative z-0">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvysV4BDWTZjcOcWeXkWlUmiJ3iprG-qlW-V6gZ0JkhyvItQs3xnjSNXNCAv_CbkcIYpWNxA5u5LhcjPhukYZXEM4cuoNke4RsctNeXs9jXMdntiofu2rV-AJyfGyJeb4srq82pZ6NgViDfP5Ay3_AQyQGJwVtQYyplP7PqT_9K3OoqJEgWeYJgyQoE9dRkdB-mivBLf9cRZbDVjIRF6ENAIC3uyNyeS4Rmg7pX5cGpWGoOCnD2m0G-w')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-background/90 via-on-background/40 to-transparent" />
        <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop w-full text-center mt-32">
          <span className="inline-block px-4 py-1.5 rounded-full bg-surface-variant/80 text-on-surface-variant font-label-md text-label-md mb-stack-md backdrop-blur-sm border border-outline-variant/30 uppercase tracking-widest">
            Member State
          </span>
          <h1 className="font-serif font-medium md:font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-primary mb-stack-md leading-tight">
            Tripura: <span className="text-[#FF9933]">Land of Royal Heritage</span> <br />
            &amp;{" "}
            <span className="text-primary-container text-transparent bg-clip-text bg-gradient-to-r from-primary-fixed to-primary-container">
              Tribal Splendor
            </span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-primary/90 max-w-3xl mx-auto mb-stack-lg">
            Discover the intricate tapestry of Tripura, where the majestic legacy of
            the Manikya Dynasty seamlessly intertwines with the vibrant, living
            traditions of its nineteen distinct tribal communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-on-primary hover:bg-tertiary px-8 py-3 rounded-md font-label-md text-label-md transition-all duration-200 border-2 border-transparent shadow-md flex items-center justify-center gap-2">
              Explore Heritage
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Royal Legacy (Bento Grid) */}
      <section className="py-12 md:py-24 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-stack-lg text-center max-w-2xl mx-auto">
          <h2 className="font-serif font-medium md:font-serif font-medium text-headline-lg-mobile md:text-headline-lg text-on-surface mb-stack-sm">
            The Royal Legacy
          </h2>
          <div className="h-1 w-16 bg-primary mx-auto mb-stack-md rounded-full" />
          <p className="font-body-md text-body-md text-on-surface-variant">
            The Manikya Dynasty shaped the architectural and cultural landscape of
            Tripura for centuries, leaving behind monuments of breathtaking beauty
            and historical significance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[300px]">
          {/* Main Feature */}
          <div className="md:col-span-8 row-span-2 relative rounded-xl overflow-hidden group shadow-sm border border-outline-variant">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Ujjayanta Palace"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw0d_TLeH0nycDnuJ3wwDlJg_RDmQg2jGMqRrWzuMbnTHUqq8iNED_BNMiGY6Hj2RNXIetX2nyre8P3jZb0iPvMTk2IinBAWIXmZaYoP59UpVhVbg444Lt4Z-7c-c6bfgNSO5zAuWeFoRZCZdeJBdPtZeIVQoQZQkI-21V5TpKAb-4huzhI55lWN7VkBrshna3uF5nj2vNcVNda0o_xBL2n5NhYP2hLKV10g8gdSDGmINYAJT9vigfBw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-stack-lg w-full">
              <span className="text-primary-fixed font-label-md text-label-md mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  account_balance
                </span>
                Architecture
              </span>
              <h3 className="font-serif font-medium text-headline-md text-on-primary mb-2">
                Ujjayanta Palace
              </h3>
              <p className="font-body-md text-body-md text-on-primary/80 max-w-xl">
                The magnificent former royal palace situated in Agartala, built in
                1901, serving as a testament to the grand vision of Maharaja Radha
                Kishore Manikya.
              </p>
            </div>
          </div>
          {/* Secondary Feature 1 */}
          <div className="md:col-span-4 row-span-1 relative rounded-xl overflow-hidden group shadow-sm border border-outline-variant">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="The Manikya Dynasty artifacts"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnL4eW5ZBAOtIDF7dK-cdubfTzO8hjKwHP9GYStbTVi88BgjHlgVzmVXZct5-I1nhOu5yLBE7b3supzLIw4bwPRHYwIPFPfoDgBajqJLSg69T7-YR8iqb8ensfgwvk5i1pZnr2KDKoW7gqRxN5ZPvGTaVTV7shPUiZklKy57la7nXRwbKsCABy3nrsJEEaPJ9L3PT3b02ANKsZKEbTWyQvmKg4k8_ZWA1ufln9KL9nGBlYs5m5s5zVog"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-stack-md w-full">
              <h3 className="font-serif font-medium text-headline-md text-on-primary mb-1 text-xl">
                The Manikya Dynasty
              </h3>
              <p className="font-body-md text-body-md text-on-primary/80 text-sm">
                Centuries of unbroken lineage.
              </p>
            </div>
          </div>
          {/* Secondary Feature 2 */}
          <div className="md:col-span-4 row-span-1 bg-surface-container rounded-xl p-stack-md border border-outline-variant flex flex-col justify-center">
            <span className="material-symbols-outlined text-primary text-[40px] mb-stack-md" aria-hidden="true">
              history_edu
            </span>
            <h3 className="font-serif font-medium text-headline-md text-on-surface mb-2 text-xl">
              Historical Archives
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
              Explore digitized records, royal decrees, and historical documents
              detailing the administration of princely Tripura.
            </p>
            <a
              className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1 mt-auto w-fit"
              href="#"
            >
              View Collection{" "}
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Spiritual Marvels (Glassmorphism + Asymmetric) */}
      <section className="py-12 md:py-24 relative bg-on-background overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBu2E4xvb7gfa-3lt0UxdEIkUJOMSni3k8extpv5ZfMyS04Y-4LvuJOHaZBGReE-w3Ky5oQznEfq1C8lOeuTGw9sXFVNP32zbQrB8QY111lZE3jq8hJsdDXD4P9L73DAam8sVs2Q4F1wD763Sg5GD8ImUSfgt1sRKmsSLemU4D0fyuFn0yTCPZsFXJ3661ZYVHHWCfElTIQ2vWP1ZhEkAFvcJ6Ap1Koa4OCnT3HH9eJxekLTrFH4Fvf4Q')",
          }}
        />
        <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center gap-stack-lg">
          <div className="w-full md:w-1/2">
            <div className="bg-white/10 backdrop-blur-md p-stack-lg rounded-2xl border border-white/20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface/20 rounded-full text-on-primary mb-stack-md border border-on-primary/20">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  landscape
                </span>
                <span className="font-label-md text-label-md">
                  Spiritual Heritage
                </span>
              </div>
              <h2 className="font-serif font-medium md:font-serif font-medium text-headline-lg-mobile md:text-headline-lg text-on-primary mb-stack-md">
                Unakoti: The Lost Hill of Faces
              </h2>
              <p className="font-body-md text-body-md text-on-primary/90 mb-stack-md">
                Dating back to the 7th-9th centuries, Unakoti is a remarkable
                Shaivite pilgrimage site featuring colossal rock-cut panels and stone
                idols set amidst lush green hills. It remains one of the most
                enigmatic and spectacular archaeological sites in Northeast India.
              </p>
              <ul className="space-y-3 mb-stack-lg">
                <li className="flex items-start gap-3 text-on-primary/90">
                  <span className="material-symbols-outlined text-primary-fixed mt-0.5" aria-hidden="true">
                    check_circle
                  </span>
                  <span>
                    Central Shiva head known as 'Unakotiswara Kal Bhairava'
                  </span>
                </li>
                <li className="flex items-start gap-3 text-on-primary/90">
                  <span className="material-symbols-outlined text-primary-fixed mt-0.5" aria-hidden="true">
                    check_circle
                  </span>
                  <span>Intricate rock carvings of Ganesha and other deities</span>
                </li>
                <li className="flex items-start gap-3 text-on-primary/90">
                  <span className="material-symbols-outlined text-primary-fixed mt-0.5" aria-hidden="true">
                    check_circle
                  </span>
                  <span>Annual Ashokastami Mela attracting thousands of pilgrims</span>
                </li>
              </ul>
              <button className="bg-surface text-primary hover:bg-surface-variant px-6 py-2.5 rounded-md font-label-md text-label-md transition-all duration-200">
                Virtual Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Highlights */}
      <section className="py-12 md:py-24 bg-surface max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-stack-lg flex flex-col md:flex-row justify-between items-end gap-stack-md border-b border-outline-variant pb-stack-md">
          <div>
            <h2 className="font-serif font-medium md:font-serif font-medium text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
              Cultural Highlights
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Vibrant expressions of life through art, dance, and craft.
            </p>
          </div>
          <a
            className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1 shrink-0"
            href="#"
          >
            View All Culture{" "}
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              arrow_forward
            </span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Card 1 */}
          <div className="group cursor-pointer bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
            <div className="h-48 overflow-hidden relative">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Garia Puja festival"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpPAXlMICk-b54U0Dlnw6F8B0xZGdHO_nuln9L4BQq8Iz0czQwE2EnjVprxXqz2kXUvpXeaL-UeF54SDzaUUt9ZN6UGoAS8Fs8f9a21PUMI-DIAT3NPUKVY3-Q1DDPqIvgseAbasyoBktMFK4MBC2_OK8VLA1b6z1od5oFlPFkiWAhwS3LaCqmUOzrTJ-QdWDfQK9itorooKJMm59BgegPCf_1lUmpMcIdRQH7lpZ9E1V5WCQ6KBuQ2A"
              />
              <div className="absolute top-3 left-3 bg-[#FF9933] text-on-primary text-xs font-semibold px-2 py-1 rounded uppercase tracking-wider">
                Festival
              </div>
            </div>
            <div className="p-stack-md flex-grow flex flex-col">
              <h3 className="font-serif font-medium text-headline-md text-on-surface mb-2 text-xl group-hover:text-primary transition-colors">
                Garia Puja
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex-grow text-sm">
                An essential tribal festival celebrating prosperity and well-being,
                marked by traditional rituals and rhythmic drumming.
              </p>
              <div className="flex items-center text-primary text-sm font-semibold">
                Read more{" "}
                <span
                  className="material-symbols-outlined text-[16px] ml-1 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  chevron_right
                </span>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="group cursor-pointer bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
            <div className="h-48 overflow-hidden relative">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Hojagiri dance"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5AJ4hpH_rs8Nx9-5yAUkWZIZrb9WXhWTTsPuKqaXYSUJI6yPfeRXSVqGszmmvN3E8IRZofyQ_zuBrI_m5660xe7fdH7sUhabWYxRUZdknRWGMK2BXVutJVO-HvEXPcmb8FXcd5dHs0iLvjO4JgLor1kjjcM1AYKr4JhR20x5y2loAd1px2zZSXQRzZ-LIMD-ePCv9KIa7YOs2zx_-fMjY-A4jrmhptFShzA_Oo63MebhrJa5hUDoO3w"
              />
              <div className="absolute top-3 left-3 bg-tertiary text-on-primary text-xs font-semibold px-2 py-1 rounded uppercase tracking-wider">
                Performing Arts
              </div>
            </div>
            <div className="p-stack-md flex-grow flex flex-col">
              <h3 className="font-serif font-medium text-headline-md text-on-surface mb-2 text-xl group-hover:text-primary transition-colors">
                Hojagiri Dance
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex-grow text-sm">
                The mesmerizing folk dance of the Reang community, famous for its
                incredible balance and graceful movements.
              </p>
              <div className="flex items-center text-primary text-sm font-semibold">
                Read more{" "}
                <span
                  className="material-symbols-outlined text-[16px] ml-1 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  chevron_right
                </span>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="group cursor-pointer bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
            <div className="h-48 overflow-hidden relative">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Tripura bamboo crafts"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALwTIx9ZjUvHxQa8n4SMMgVV_Iyw99rkzdQTc7BzyOtNkp61tTKqQ7TN1hFls0R1ua4UqlNlprR35wcvWBKYMMb59XA_AhR1q6BrgnZUMvVC3a7tHAlkAib9Z8E27FFfBalD8Awt_C7DL2IYq3ClthgAF4VRjtshKZ1LoXUUIZnVnQHhyjOaP9vJd2d4W5Bi9oUjyNxlvTOA7kNn7qYUV17Xxlj0wSGT6d-0rXLT6O8LouA_BIbJSIdw"
              />
              <div className="absolute top-3 left-3 bg-[#4cb748] text-on-primary text-xs font-semibold px-2 py-1 rounded uppercase tracking-wider">
                Crafts
              </div>
            </div>
            <div className="p-stack-md flex-grow flex flex-col">
              <h3 className="font-serif font-medium text-headline-md text-on-surface mb-2 text-xl group-hover:text-primary transition-colors">
                Handlooms &amp; Bamboo
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex-grow text-sm">
                Showcasing Tripura's world-renowned cane and bamboo work, alongside
                exquisite indigenous weaving traditions.
              </p>
              <div className="flex items-center text-primary text-sm font-semibold">
                Read more{" "}
                <span
                  className="material-symbols-outlined text-[16px] ml-1 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  chevron_right
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
