import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painting Collection | North East Zone Cultural Centre",
  description: "Explore the visual arts traditions across the eight states of North East India.",
};

export default function PaintingCollectionPage() {
  return (
    <main className="flex-grow ">
      {/* Hero Section */}
      <section className="relative w-full bg-surface-container-highest overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center opacity-40 mix-blend-multiply"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWLfXueXXAP6BVDA_nsJQmH8hUPMQiqGcZtrEngxSP2gVLyHzjYA195EelTwT37CRNGbbDARW9CEnrbu4ZvnelToMfI-6LiRmqkmsHY-tkydckG82oDAFnYo018Kple6YmELSyBadm_31IiDdfhX0tGextn1ZCGIW_hyhL-NTUUPumAPb-x7LEyrVA0iMR69z2ajO1ooPc1eHWLZt8hWakVaCw41CYO-YXzlV2ua0P_a1XZVMZluH74g')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
        </div>
        <div className="relative max-w-container-max-width mx-auto px-margin-desktop py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 flex flex-col justify-center">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                palette
              </span>
              Digital Archives
            </span>
            <h1 className="font-serif font-medium text-headline-xl text-on-surface mb-6">
              The Painting Collection
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl leading-relaxed">
              A definitive repository of the visual arts traditions across the eight
              states of North East India. Explore centuries of ritualistic, tribal,
              and contemporary expressions preserved for future generations.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px] flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined" aria-hidden="true">explore</span>
                Browse Full Archive
              </button>
              <button className="bg-transparent text-primary border-2 border-primary font-label-md text-label-md px-6 py-3 rounded hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px] flex items-center gap-2">
                <span className="material-symbols-outlined" aria-hidden="true">download</span>
                Collection Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Categories Grid */}
      <section className="max-w-container-max-width mx-auto px-margin-desktop py-stack-lg my-12">
        <div className="flex justify-between items-end mb-10 border-b border-outline-variant pb-4">
          <div>
            <h2 className="font-serif font-medium text-headline-lg text-on-surface">
              Curated Categories
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Navigate our extensive holdings by artistic tradition and style.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* Card 1 */}
          <Link
            href="#"
            className="group block bg-surface border border-outline-variant rounded-lg overflow-hidden hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <div className="h-48 w-full bg-surface-container-high relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzvR6HjT2yLOVT4tY81sYDkLkgJgNx6zbY9KVcLWDO5mYvjjjC18c0rpR-uOWf4A9Kcnb5jGrZ3iKX8KQR7F64LIT5wQt7vgs7MBiqpyFVLpcCvqAkxtgpd082iOYi_6-zE2s2xhj2tH9NTX31NjbCqFettpk9T7SehuXhicizdI2kGCnyTFtRE0PJEuNSq85_xlGAyIMj7DsY4abUU7EE90oV1ZxXpU5sW29M5sq805VVhsI15Pr8ZQ')",
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif font-medium text-headline-md text-on-surface mb-2 group-hover:text-primary transition-colors">
                Thangka Art
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">
                Sacred Buddhist scroll paintings utilizing mineral pigments, gold
                accents, and strict iconographic grids from Sikkim and Arunachal
                Pradesh.
              </p>
              <span className="font-label-md text-label-md text-primary flex items-center gap-1">
                Explore Works{" "}
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  arrow_forward
                </span>
              </span>
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            href="#"
            className="group block bg-surface border border-outline-variant rounded-lg overflow-hidden hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <div className="h-48 w-full bg-surface-container-high relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCD-Mi10dIp_n1a8XAW9iWWXv5vthS4cGSRCyAj0YwuOWZ2SPYDoRKwX2oqlnlUF1AyJUKbkym9ceRjzv5oiaJJ9EFN-gvsr61sONJOgD8KAi7d2yM5sxlMDfkYbwUz8SRfbV4uVqpKITHPeW2KUz3BjysIyWRZkrZz_WbxRjkvKfrtx1jPT93RP8Re1yTWCbwyX3In8XiGh_kQIPx6AxSGFfBddlDTvQYhD9QcC3iPBROaWTyTGUaUnA')",
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif font-medium text-headline-md text-on-surface mb-2 group-hover:text-primary transition-colors">
                Tribal Motifs
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">
                Geometric patterns and symbolic representations found in indigenous
                textiles and architectural embellishments.
              </p>
              <span className="font-label-md text-label-md text-primary flex items-center gap-1">
                Explore Works{" "}
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  arrow_forward
                </span>
              </span>
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            href="#"
            className="group block bg-surface border border-outline-variant rounded-lg overflow-hidden hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <div className="h-48 w-full bg-surface-container-high relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuArmwhvY_PdVp_r-K-q5l_XvPwvvd5SWNYCe84N1L_PjdpWQDZHHNlE51xDPv2J77r3-diTS-EjLLJGG-BV-jBsIGcig9ZvijymmaxwISNlPhHsu7SOjRFRWUQ2NCHcmXd2JR0htGM_4GPGkiS3wKPUSa0gnpbZ41ir2I-dtqoYyqDPwbnInbIRzG0Hl8OSF7YGjBFbZpSube6p7k-A3rcwYPNd_O8Ihp2RmvLg-Mj5-nxseM-iLfvCAQ')",
                  clipPath: "inset(0px 10% 0px 0px)",
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif font-medium text-headline-md text-on-surface mb-2 group-hover:text-primary transition-colors">
                Folk Illustrations
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">
                Narrative scroll paintings and everyday visual storytelling
                documenting myths, legends, and daily village life.
              </p>
              <span className="font-label-md text-label-md text-primary flex items-center gap-1">
                Explore Works{" "}
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  arrow_forward
                </span>
              </span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
