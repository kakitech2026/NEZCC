"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type Campaign = {
  id: string;
  title: string;
  description: string;
  image: any;
  link?: string | null;
  linkText?: string | null;
};

interface HeroCarouselProps {
  campaigns: Campaign[];
}

export default function HeroCarousel({ campaigns }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (campaigns.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % campaigns.length);
      }
    }, 4000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [campaigns.length, isHovered]);

  if (!campaigns || campaigns.length === 0) {
    return null;
  }

  const getImageUrl = (image: any) => {
    if (typeof image === 'string') return image;
    return image?.url || '/images/hero/hero-landscape.png';
  };

  return (
    <section
      className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-video min-h-[500px] overflow-hidden bg-[#16253a]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      {campaigns.map((campaign, index) => (
        <div
          key={campaign.id || index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={getImageUrl(campaign.image)}
              alt={campaign.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#16253a]/90 via-[#16253a]/40 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-24 md:pb-32">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4 max-w-3xl leading-tight drop-shadow-lg">
              {campaign.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md">
              {campaign.description}
            </p>
            {campaign.link && (
              <div>
                <a
                  href={campaign.link}
                  className="inline-flex h-[46px] md:h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#df5f18] px-6 md:px-8 text-white shadow-sm hover:bg-[#c65d19] transition-colors focus:outline-none focus:ring-2 focus:ring-[#df5f18] focus:ring-offset-2 focus:ring-offset-[#16253a]"
                >
                  <span className="text-[14px] md:text-[15px] font-bold tracking-wide">
                    {campaign.linkText || "Learn More"}
                  </span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      {campaigns.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
          {campaigns.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${index === currentIndex
                ? "w-8 bg-[#df5f18]"
                : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows (Desktop Only) */}
      {campaigns.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + campaigns.length) % campaigns.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-[#df5f18]"
            aria-label="Previous slide"
          >
            <span className="material-symbols-outlined text-3xl">chevron_left</span>
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % campaigns.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-[#df5f18]"
            aria-label="Next slide"
          >
            <span className="material-symbols-outlined text-3xl">chevron_right</span>
          </button>
        </>
      )}
    </section>
  );
}
