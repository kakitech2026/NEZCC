import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-inverse-surface">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-overlay" 
          role="img"
          aria-label="A vibrant, high-resolution photograph capturing a dynamic traditional dance performance in North East India. Dancers wearing deeply saturated, intricately woven traditional garments in reds, yellows, and blacks are mid-motion against a backdrop of a clear blue sky and lush green hills. The lighting is bright, natural sunlight, creating a high-contrast, energetic mood. The image is composed with a modern, institutional framing suitable for a large hero banner, emphasizing cultural pride and heritage preservation." 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBXFKUxRPU4q7s7y7DJVpk_ccD2sRBhYEAL3fs64Dxa7wET5S0nnlqLH2GYt3MKkiemhqWvuP6AcE4K60dnEvEnkBxXPt-WUBMLxdyZmt7DFgM8E4xnFx8OfiFwMdUyMxDmDiWXk9fvsn3dO6Y3l8pS2Z1O4NBlXJWMnlQQLqKmvwEmrglI6UTPNPWjr0KhO3Y9tG4oCp1SLALGNGy3LGicr3t6qVR0iPVg54-Zb0xUdQh8TemQEVgZSA")' }}
        />
      </div>
      <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop w-full text-center md:text-left flex flex-col md:items-start items-center gap-stack-lg mt-stack-lg mb-stack-lg">
        <div className="max-w-3xl space-y-stack-md bg-inverse-surface/30 backdrop-blur-sm p-stack-lg rounded-xl border border-white/10 shadow-lg">
          <h1 className="text-headline-xl-mobile md:text-headline-xl font-headline-xl-mobile md:font-headline-xl text-white drop-shadow-md">
            Preserving the Heritage of North East India
          </h1>
          <p className="text-body-lg font-body-lg text-inverse-on-surface max-w-2xl text-shadow-sm">
            Discover the vibrant traditions, arts, and cultural events organized by the North East Zone Cultural Centre.
          </p>
          <div className="flex flex-col sm:flex-row gap-stack-md pt-stack-sm w-full sm:w-auto">
            <a 
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary-container text-white font-label-md text-label-md font-semibold hover:bg-surface-tint hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border-2 border-transparent focus:border-white" 
              href="#events"
            >
              Explore Events
            </a>
            <a 
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-transparent text-white border-2 border-white font-label-md text-label-md font-semibold hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-inverse-surface" 
              href="#about"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
