import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Library | North East Zone Cultural Centre",
  description: "Preserving the written heritage and cultural wisdom of North East India.",
};

export default function LibraryPage() {
  return (
    <main className="flex-grow flex flex-col ">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBB7VoggWyQkthmqLboOgECjSUjdQ3KLA5Uzgu5VkTuW1UN1gquur4vBiBNuR_cd_58lAOGuPiKw-qPPh1ExE1K8VxkkFHc4zzPcDqp0sU4OzvAyQlmcngjcCdJ2CRHqS7oqPmWhgZw_nIPHQ0gE2Waz2eSRj00-H9Yi6dLqbtH3xy1eeNsqvN9pVEbuDmljxuvaGNxYKxYPPaIIJBHVSKalkXOOCIwZWeAOGDTzCEvj9-PdMmr6w2r5g')",
          }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-inverse-surface/70" />
        </div>
        {/* Content */}
        <div className="relative z-10 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center md:text-left flex flex-col items-center md:items-start gap-stack-md">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low text-primary-container font-label-md text-label-md rounded-full border border-primary-container/20 shadow-sm backdrop-blur-sm bg-opacity-80">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              menu_book
            </span>
            Resource Centre
          </span>
          <h1 className="font-serif font-medium text-headline-xl-mobile md:font-serif font-medium md:text-headline-xl text-on-primary max-w-3xl leading-tight">
            NEZCC Reference Library &amp; Resource Centre
          </h1>
          <p className="font-body-lg text-body-lg text-inverse-on-surface max-w-2xl mt-stack-sm md:mt-0">
            Preserving the written heritage and cultural wisdom of North East India.
          </p>
          <div className="mt-stack-md flex flex-wrap gap-stack-sm justify-center md:justify-start">
            <a
              className="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded flex items-center gap-2 border-2 border-transparent focus:border-on-primary hover:bg-on-primary-fixed-variant transition-colors min-h-[44px]"
              href="#search-catalogue"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                search
              </span>
              Search Catalogue
            </a>
            <a
              className="bg-transparent text-on-primary font-label-md text-label-md px-6 py-3 rounded flex items-center gap-2 border-2 border-on-primary hover:bg-on-primary/10 transition-colors min-h-[44px]"
              href="#about"
            >
              Explore Collections
            </a>
          </div>
        </div>
        {/* Aesthetic Accent Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 flex">
          <div className="w-1/3 bg-primary-container h-full" />
          <div className="w-1/3 bg-saffron h-full" />
          <div className="w-1/3 bg-eco-green h-full" />
        </div>
      </section>

      {/* 2. About the Library */}
      <section className="py-stack-lg md:py-16 bg-surface px-margin-mobile md:px-margin-desktop" id="about">
        <div className="max-w-container-max-width mx-auto flex flex-col md:flex-row gap-gutter items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-stack-md">
            <div className="flex items-center gap-2 text-primary font-label-md text-label-md uppercase tracking-wider">
              <span className="w-8 h-[2px] bg-primary" />
              About The Library
            </div>
            <h2 className="font-serif font-medium text-headline-lg text-on-surface">
              A Hub for Cultural Scholarship
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              The NEZCC Reference Library serves as the premier institution for the
              preservation and dissemination of the rich literary and cultural
              heritage of the eight North Eastern States of India (Arunachal Pradesh,
              Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, and Tripura).
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Our curated collections provide invaluable resources for researchers,
              students, anthropologists, and cultural enthusiasts, offering deep
              insights into the region's diverse traditions, folklore, indigenous
              knowledge systems, and contemporary arts.
            </p>
            <ul className="flex flex-col gap-2 mt-2">
              <li className="flex items-start gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  Over 15,000 carefully curated volumes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  Rare manuscripts and out-of-print regional texts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  Quiet, climate-controlled reading rooms
                </span>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 mt-stack-lg md:mt-0">
            {/* High-end structural composition */}
            <div className="relative rounded-lg p-2 bg-surface-container-low border border-outline-variant shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-auto aspect-[4/3] object-cover rounded shadow-sm border border-outline-variant/50"
                alt="Library Interior"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIOp8ysnGFNNKWfH1snIwZHpthYcetEoSQoPSjjrJB02Udg2SyNiOt6lZDCX2tcaGGXga6o5-1S706tpjBT2rmLe1s22YQVCmCbWudsgLDa_jAcDvTiSw3K4AUiOTeNgfaPD0D8KQv1bUiANtnQAAMfK-uo7oh0oNqfsrHVCenSxjgQD9EKTVU224dBNkd43St73viR_3eUsr1lvnrKjQjSj9-Wk65uYah0gDSXeWwJ9m4pDl7A21XvQ"
              />
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest border border-outline-variant p-4 rounded shadow-md hidden sm:flex flex-col gap-1 z-10 w-48">
                <div className="flex items-center gap-2 text-primary-container">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    auto_awesome
                  </span>
                  <span className="font-label-md text-label-md font-bold">
                    New Addition
                  </span>
                </div>
                <span className="font-body-md text-body-md text-on-surface leading-tight">
                  Digital Archives Portal now live for remote access.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Collection Categories (Bento Grid Style) */}
      <section className="py-stack-lg md:py-16 bg-surface-container-lowest px-margin-mobile md:px-margin-desktop border-t border-outline-variant">
        <div className="max-w-container-max-width mx-auto flex flex-col gap-stack-lg">
          <div className="text-center flex flex-col items-center gap-2">
            <h2 className="font-serif font-medium text-headline-lg text-on-surface">
              Explore Our Collections
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Browse through categorized repositories designed to facilitate
              specialized research and cultural discovery.
            </p>
          </div>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter auto-rows-[200px]">
            {/* Large Card (Spans 2 cols on desktop) */}
            <a
              className="group md:col-span-2 row-span-1 md:row-span-2 relative overflow-hidden rounded-lg border border-outline-variant bg-surface-container hover:shadow-md transition-shadow duration-300 flex flex-col justify-end p-stack-md"
              href="#"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-2r9YIfg4t8aum7LUU2YI_Xet5Rc0Bd9Pt3fTPsZO65HKRN06Ipi9TshhJrRclJNeXkqEvDEjsHywvnMo2ovmh16i3nrEG47gDH02MvsqyBf2vmvhmTvW4-nq3p0lx2wGOun_1qopeL279dIAuGpb0ekelLJd8Vz02Bl8b1QIy2dGBeBxs3G2Ip1__7NqkA62c75N2p1qEWh88eHURzd1QW0OZ_80qwnKWJo96TXWM0L0fiEdRtZlgA')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-transparent" />
              <div className="relative z-10 flex flex-col gap-2">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 backdrop-blur-md border border-on-primary/20 flex items-center justify-center text-on-primary mb-2">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    history_edu
                  </span>
                </div>
                <h3 className="font-serif font-medium text-headline-md text-on-primary">
                  Rare Manuscripts
                </h3>
                <p className="font-body-md text-body-md text-inverse-on-surface max-w-md line-clamp-2">
                  Exclusive access to primary source materials, indigenous scripts,
                  and historical documents dating back centuries.
                </p>
              </div>
            </a>
            {/* Standard Card 1 */}
            <a
              className="group relative overflow-hidden rounded-lg border border-outline-variant bg-surface-container hover:shadow-md transition-shadow duration-300 p-stack-md flex flex-col gap-3"
              href="#"
            >
              <div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center text-primary-container border border-outline-variant/50 group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined" aria-hidden="true">
                  diversity_3
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="font-label-md text-label-md font-medium text-on-surface mb-1">
                  Folk Literature
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-3">
                  A comprehensive collection of myths, legends, and oral traditions
                  transcribed into print from the eight member states.
                </p>
              </div>
              <span className="text-primary font-label-md text-label-md flex items-center gap-1 group-hover:underline">
                Browse Collection{" "}
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  arrow_forward
                </span>
              </span>
            </a>
            {/* Standard Card 2 */}
            <a
              className="group relative overflow-hidden rounded-lg border border-outline-variant bg-surface-container hover:shadow-md transition-shadow duration-300 p-stack-md flex flex-col gap-3"
              href="#"
            >
              <div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center text-primary-container border border-outline-variant/50 group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined" aria-hidden="true">
                  computer
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="font-label-md text-label-md font-medium text-on-surface mb-1">
                  Digital Archives
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-3">
                  High-resolution scans of fragile materials, audio recordings of
                  folk songs, and digitized photographs accessible online.
                </p>
              </div>
              <span className="text-primary font-label-md text-label-md flex items-center gap-1 group-hover:underline">
                Access Portal{" "}
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  arrow_forward
                </span>
              </span>
            </a>
            {/* Standard Card 3 */}
            <a
              className="group relative overflow-hidden rounded-lg border border-outline-variant bg-surface hover:shadow-md transition-shadow duration-300 p-stack-md flex flex-col justify-center items-center text-center gap-2"
              href="#"
            >
              <span
                className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors"
                aria-hidden="true"
              >
                school
              </span>
              <h3 className="font-label-md text-label-md font-medium text-on-surface">
                Research Papers
              </h3>
            </a>
            {/* Standard Card 4 */}
            <a
              className="group relative overflow-hidden rounded-lg border border-outline-variant bg-surface hover:shadow-md transition-shadow duration-300 p-stack-md flex flex-col justify-center items-center text-center gap-2"
              href="#"
            >
              <span
                className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors"
                aria-hidden="true"
              >
                auto_stories
              </span>
              <h3 className="font-label-md text-label-md font-medium text-on-surface">
                Periodicals &amp; Journals
              </h3>
            </a>
          </div>
        </div>
      </section>

      {/* 4. Search & Catalogue (Functional UI) */}
      <section
        className="py-stack-lg bg-surface-container-low px-margin-mobile md:px-margin-desktop border-y border-outline-variant"
        id="search-catalogue"
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-stack-md">
          <div className="flex flex-col gap-2 items-center text-center">
            <span className="material-symbols-outlined text-primary-container text-5xl" aria-hidden="true">
              search_insights
            </span>
            <h2 className="font-serif font-medium text-headline-md text-on-surface">
              Search the Online Catalogue
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Find books, journals, and digital assets across our entire collection.
            </p>
          </div>
          {/* Complex Input Component */}
          <div className="bg-surface-container-lowest p-1 rounded-lg border border-outline-variant shadow-sm flex flex-col sm:flex-row gap-2 mt-stack-sm focus-within:border-primary-container focus-within:ring-2 focus-within:ring-primary-container/20 transition-all">
            {/* Category Select */}
            <div className="relative sm:w-1/3 flex items-center border-b sm:border-b-0 sm:border-r border-outline-variant/50">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant" aria-hidden="true">
                category
              </span>
              <select className="w-full pl-10 pr-8 py-3 bg-transparent border-none text-on-surface font-body-md text-body-md focus:ring-0 cursor-pointer appearance-none">
                <option value="all">All Categories</option>
                <option value="books">Books</option>
                <option value="journals">Journals</option>
                <option value="digital">Digital Assets</option>
              </select>
              <span
                className="material-symbols-outlined absolute right-3 text-on-surface-variant pointer-events-none"
                aria-hidden="true"
              >
                arrow_drop_down
              </span>
            </div>
            {/* Search Input */}
            <div className="relative flex-grow flex items-center">
              <input
                className="w-full pl-4 pr-4 py-3 bg-transparent border-none text-on-surface font-body-md text-body-md focus:ring-0 placeholder-on-surface-variant/70"
                placeholder="Search by title, author, or keyword..."
                type="text"
              />
            </div>
            {/* Submit Button */}
            <button className="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded sm:rounded-md flex items-center justify-center gap-2 hover:bg-on-primary-fixed-variant transition-colors min-h-[44px]">
              <span className="material-symbols-outlined" aria-hidden="true">
                search
              </span>
              Search
            </button>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <a className="font-label-md text-label-md text-primary hover:underline text-sm" href="#">
              Advanced Search
            </a>
            <a className="font-label-md text-label-md text-primary hover:underline text-sm" href="#">
              Browse A-Z
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
