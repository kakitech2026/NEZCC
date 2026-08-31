import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tribal Painting Collection - North East Zone Cultural Centre',
  description: 'Explore the rich tapestry of indigenous art from Northeast India. This curated gallery showcases the profound connection between nature, spirituality, and community through vibrant traditional and contemporary painting styles preserved by the NEZCC.',
};

export default function TribalPaintingCollection() {
  return (
    <main className="flex-grow ">
      {/* Hero Section */}
      <section className="relative bg-surface-container-low py-16 md:py-24 border-b border-outline-variant overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, #1d4ed8 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center md:text-left flex flex-col md:flex-row items-center gap-gutter">
          <div className="flex-1 md:pr-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full font-label-md mb-6">
              <span className="material-symbols-outlined text-sm" data-weight="fill">palette</span>
              <span>Cultural Archives</span>
            </div>
            <h1 className="font-serif font-medium md:font-serif font-medium text-on-surface mb-6 leading-tight">
              Tribal Painting <br className="hidden md:block" /><span className="text-primary">Collection</span>
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto md:mx-0">
              Explore the rich tapestry of indigenous art from Northeast India. This curated gallery showcases the profound connection between nature, spirituality, and community through vibrant traditional and contemporary painting styles preserved by the NEZCC.
            </p>
          </div>
          <div className="flex-1 w-full mt-10 md:mt-0">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-outline-variant shadow-lg bg-surface flex items-center justify-center group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="A high-quality, brightly lit wide shot of a traditional indigenous painting from Northeast India displayed in a modern museum setting. The painting features vibrant geometric patterns and natural motifs in earthy reds, ochres, and deep blues. The gallery space is pristine white with warm, focused spotlighting highlighting the artwork's intricate textures. A sense of cultural reverence and contemporary preservation permeates the scene." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDGzcGv2SvHR6MMqx8-9Kei3wxmkpMNJfR_kyXhIqOug8iqidjXsgpOZNpAfvg0ThJjrNsn8h5x96pjI7iYmOzYq4PchWoQ8q5ymOxrnUPlC8EzCcGrF83cP6wSJapg8ZCC2ABHWwnqZca2daVwOjBcWFX_zQW8-5rdzXPsc2sMX26IT4JdbFAIWOO1abvL8UoPJlza1B5J-Omf0vZttvsVQM_AAxu22MWwtp52d81tAN-wXwG2hVmzQ')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-label-md uppercase tracking-wider text-white/80 mb-1">Featured Work</p>
                <p className="font-headline-md">Ancestral Echoes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="font-serif font-medium text-on-surface mb-2">Curated Archives</h2>
            <p className="font-body-md text-on-surface-variant">Preserving the visual narratives of indigenous communities.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border-2 border-primary text-primary rounded font-label-md hover:bg-primary/5 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-primary/10">All Styles</button>
            <button className="px-4 py-2 border border-outline text-on-surface-variant rounded font-label-md hover:bg-surface-variant transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2">Thangka</button>
            <button className="px-4 py-2 border border-outline text-on-surface-variant rounded font-label-md hover:bg-surface-variant transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2">Contemporary</button>
          </div>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter auto-rows-[300px]">
          {/* Item 1: Large Span */}
          <div className="md:col-span-2 md:row-span-2 group relative rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-md transition-shadow bg-surface flex flex-col cursor-pointer">
            <div className="flex-grow bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="A detailed close-up of a traditional Buddhist Thangka painting from Arunachal Pradesh, India." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVnVizGCJF2RbPjLz1WL1TahSchbPnmnQeoEDADYsD-9N6O6LlZSybI69397IIpcgszEcuW_vl_kPtAvza5dOWGvo-Zd7dNvaSW7EP2DC4t0nH5IIF7Pbvrkt0ix9vWCW7SzAD3E1tXCXV1qIkCWy3d-x_SgjVs8yV7YSX2pSaWaa67N9CDws919pst21L1J5ayTE2qlxcqjxgUAedFf3vzUY0WqFgFuq-1_SjJi8aZxln1o-aUV9P-w')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-saffron text-white text-xs font-bold rounded">Arunachal Pradesh</span>
                <span className="flex items-center gap-1 text-xs text-white/80">
                  <span className="material-symbols-outlined text-[14px]">brush</span> Thangka Technique
                </span>
              </div>
              <h3 className="font-serif font-medium text-white mb-2">Wheel of Life Thangka</h3>
              <p className="font-body-md text-white/90 line-clamp-2">A profound visual representation of the cyclic nature of existence, utilized historically as a meditation tool and teaching aid in monasteries across the high Himalayas.</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="group relative rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-md transition-shadow bg-surface flex flex-col cursor-pointer">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="A vibrant, contemporary tribal motif painting from Northeast India." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpNJ4V9Gc4WwKThz0-WoAHaYwVTMH5ui23Kseb2BdFV9YFa79Sup5166RQKERmQUOZA7b7b7eKLJ3SWFX09O6AtHr5pfVQnQAczFO8XzuRz0ETA4LEay0S1MFBm9_zGefulnqWLZ_rt0dzu-xG9vzxwB_xnntIS0o1m2kbGn6GwnTuR6Dc30yIMS4gGhsG0WS05gGn0pgv50KKVFTIP3HzU95ArrC5A3Db5EfIctzZBKfvcYPKvSjKjQ')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-5 text-white z-10">
              <span className="px-2 py-1 bg-custom-green text-white text-xs font-bold rounded mb-2 inline-block">Nagaland</span>
              <h3 className="font-label-md text-white text-lg mb-1">Naga Spear Motifs</h3>
              <p className="font-caption text-white/80 line-clamp-2">Contemporary interpretation of traditional textile patterns representing warrior status.</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="group relative rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-md transition-shadow bg-surface flex flex-col cursor-pointer">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="A traditional Warli-style painting adapted by tribal artists in Northeast India." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTCCUxDlGRjVrcq2wHhbhcfiH4ySLT-Wt2OtvKqURB7azk2FRLqXXaCt0cIRyWQ-m5keuRytDrXfCE2o5jL1nKnMzoZKa-znvjN6fgxTCWrahnOdPJQjzYUNX-rehZD6KuJbaURntOWOshI6tWHAKJxhfs5-SYMtdH-FdU5XiAnIzdjYQiCNpXqySXyUDQiCrlMVqrUIUkTViaOhZYI3OwvcP40vtjILFkizN0Mq5_yRlYQZWNz6NrzQ')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-5 text-white z-10">
              <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded mb-2 inline-block">Assam</span>
              <h3 className="font-label-md text-white text-lg mb-1">Harvest Dance</h3>
              <p className="font-caption text-white/80 line-clamp-2">Stylized representations of community celebrations using natural white pigments.</p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="md:col-span-3 group relative rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-md transition-shadow bg-surface flex flex-col md:flex-row cursor-pointer bg-surface-bright">
            <div className="w-full md:w-1/2 h-64 md:h-full bg-cover bg-center" data-alt="A wide panoramic view of a massive, intricate mural painting depicting a vibrant mythological scene." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzO_jddM9H75m2uG4bnafOk6IoRBAsbMsDG4ucNCQLz5NERZ8phYX1oyU8oV6qujbNAcnnmdNZbsu23tmfBeThJ8YX1M1b5jkgtcFLN1m3rEhOJnq0KKBF682InauKC_2y90-7rKpcBl5gRFb01n1Dqb6AxUVAnCZnTKoocBoE-_PK8xxluqpff_-zHKOKbXDKEyE3_z5TlXUCKnipDmudTYgo_kBxyrHeo4WL33P9rtp2xBmoXHa7-w')" }}></div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 border border-primary text-primary text-xs font-bold rounded-full">Exhibition Piece</span>
                <span className="flex items-center text-on-surface-variant font-caption">
                  <span className="material-symbols-outlined text-[16px] mr-1">location_on</span> Manipur
                </span>
              </div>
              <h3 className="font-serif font-medium text-on-surface mb-4">The Creation Myth Mural</h3>
              <p className="font-body-md text-on-surface-variant mb-6">A monumental contemporary piece synthesizing various tribal creation myths of the region into a single, cohesive narrative landscape. This work highlights the transition of traditional motifs into modern large-scale formats.</p>
              <button className="self-start flex items-center gap-2 text-primary font-label-md hover:text-primary-fixed-variant transition-colors group-hover:underline">
                View Full Analysis <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artist & CTA Section */}
      <section className="py-16 md:py-24 bg-surface-container-low border-b border-outline-variant relative overflow-hidden">
        {/* Subtle decorative pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 3px 3px, #dce1ff 3px, transparent 0)', backgroundSize: '48px 48px', backgroundPosition: '24px 24px' }}></div>
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          {/* Artist Spotlight */}
          <div className="flex-1 bg-surface border border-outline-variant p-8 md:p-10 rounded-2xl shadow-sm relative">
            <div className="absolute -top-6 -left-6 bg-saffron text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md">
              <span className="material-symbols-outlined" data-weight="fill">star</span>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <img className="w-24 h-24 rounded-full object-cover border-4 border-surface-container shadow-sm" data-alt="A professional portrait of an indigenous master artist from Northeast India, seated in a bright, modern studio." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCQ5kTggqVLs4lr3-QtgHSmr1cOciFX3dJfNsFE5p-W8MhOOz23h_V3cPBbWyi29vaZ4Y6AYqwfsxWaCFcAW2PDGKgwwcYDvcvwCQUM6N4Y70olrBwMhdlyWvwQ_j6YWsfN2KEKr4HzPIychFNP_ae88U8p9PssnBBYUjrS5G5sYVTrnzNRsbXZRMw68gS3Ar_z_wxsjr_s8trXoF3RtSaoG3d4uAEFLpDqXiwWH0y0OcQqqLyTvSZww" alt="Artist Portrait" />
              <div>
                <h3 className="font-serif font-medium text-on-surface">Tenzin Norbu</h3>
                <p className="font-body-md text-primary">Master Thangka Painter</p>
              </div>
            </div>
            <p className="font-body-md text-on-surface-variant italic mb-6">"Our art is not merely decoration; it is a visual language that holds the spiritual history of our ancestors. Teaching these techniques ensures our stories continue to be told."</p>
            <div className="flex gap-4">
              <span className="inline-flex items-center gap-1 text-sm text-on-surface-variant"><span className="material-symbols-outlined text-[16px] text-custom-green">verified</span> Heritage Award 2023</span>
            </div>
          </div>
          {/* Workshop CTA */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary-container text-on-primary-container mb-6">
              <span className="material-symbols-outlined text-3xl" data-weight="fill">school</span>
            </div>
            <h2 className="font-serif font-medium text-on-surface mb-4">Preserve the Tradition</h2>
            <p className="font-body-lg text-on-surface-variant mb-8 max-w-lg mx-auto lg:mx-0">
              Join our upcoming workshops and training sessions led by master artisans. Learn traditional techniques, pigment preparation, and the cultural significance behind regional motifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-6 py-4 bg-primary text-white font-label-md rounded-lg shadow-sm hover:bg-primary-fixed-variant hover:shadow-md transition-all focus:outline-none focus:ring-4 focus:ring-primary/30 min-h-[44px] border-2 border-transparent focus:border-primary-container">
                Register for Workshops
              </button>
              <button className="px-6 py-4 bg-transparent text-primary font-label-md rounded-lg border-2 border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-4 focus:ring-primary/30 min-h-[44px]">
                Download Curriculum
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
