import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shilpgram Heritage Museum | North East Zone Cultural Centre",
  description: "Explore our sprawling open-air attraction dedicated to preserving and showcasing the rich rural arts and crafts of India's distinct cultural zones.",
};

export default function ShilpgramPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] bg-surface-container-highest overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/about/shilpgram.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-margin-mobile md:p-margin-desktop max-w-container-max-width mx-auto">
          <h1 className="font-serif font-medium text-headline-xl text-surface-container-lowest mb-4">
            Shilpgram: A Rural Heritage District
          </h1>
          <p className="font-body-lg text-body-lg text-surface-container-lowest max-w-3xl">
            Explore our sprawling open-air attraction bordering Fateh Sagar Lake,
            dedicated to preserving and showcasing the rich rural arts and crafts
            of India's distinct cultural zones.
          </p>
        </div>
      </section>

      {/* The Crafts Village Section */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="order-2 lg:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Artisans at work in Shilpgram"
              className="w-full h-auto rounded-lg shadow-md object-cover border border-outline-variant"
              src="/images/about/shilpgram.webp"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-stack-md">
            <h2 className="font-serif font-medium text-headline-lg text-on-surface">
              The Crafts Village
            </h2>
            <div className="h-1 w-16 bg-primary mb-4" />
            <p className="font-body-md text-body-md text-on-surface-variant">
              Step into the authentic world of rural India. The Crafts Village is
              comprised of traditional mud and thatched-roof huts that serve as
              living exhibits. Here, you can witness master artisans demonstrating
              ancient craft-making techniques with traditional tools.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Wander through the bustling bazaar to discover and purchase exquisite
              handcrafted goods, intricate pottery, and authentic vibrant
              Rajasthani textiles directly from the creators.
            </p>
          </div>
        </div>
      </section>

      {/* Cultural Amphitheater Section */}
      <section className="bg-surface-container-low py-stack-lg px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max-width mx-auto grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="space-y-stack-md">
            <h2 className="font-serif font-medium text-headline-lg text-on-surface">
              Cultural Amphitheater
            </h2>
            <div className="h-1 w-16 bg-tertiary mb-4" />
            <p className="font-body-md text-body-md text-on-surface-variant">
              Experience the pulsating heartbeat of regional traditions at our
              stunning open-air amphitheater. As the sun sets, the arena comes
              alive with vibrant performances of live music and captivating folk
              dancing.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              These spectacular shows not only entertain but also serve as a
              crucial platform for sustaining the performing arts heritage of the
              zone, bringing history and culture vividly to life for every visitor.
            </p>
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Cultural performance at Shilpgram amphitheater"
              className="w-full h-auto rounded-lg shadow-md object-cover border border-outline-variant"
              src="/images/about/shilpgram2.webp"
            />
          </div>
        </div>
      </section>

      {/* Visitor Experience Section */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
        <div className="bg-surface rounded-xl border border-outline-variant shadow-sm p-stack-lg text-center max-w-4xl mx-auto">
          <span
            className="material-symbols-outlined text-primary text-4xl mb-4"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            restaurant
          </span>
          <h2 className="font-serif font-medium text-headline-md text-on-surface mb-4">
            Complete Your Visitor Experience
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Beyond the exhibits and performances, Shilpgram offers a tranquil
            retreat. Enjoy relaxed, authentic eateries serving local delicacies
            amidst the serene lakeside setting. It's the perfect environment to
            reflect on the region's rich cultural tapestry.
          </p>
          <button className="bg-transparent border-2 border-primary text-primary px-6 py-3 rounded font-label-md text-label-md hover:bg-surface-container-low transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Plan Your Visit
          </button>
        </div>
      </section>
    </main>
  );
}
