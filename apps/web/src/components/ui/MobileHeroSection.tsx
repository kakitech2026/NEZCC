"use client";

import React from "react";
import UrgentNotice from "./UrgentNotice";

const quickLinks = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="7" rx="6" ry="2" />
        <ellipse cx="12" cy="17" rx="6" ry="2" />
        <path d="M6 7v10M18 7v10" />
        <path d="M6 9l4 6M10 9l-4 6M14 9l4 6M18 9l-4 6" />
        <path d="M8 2l2 3M16 2l-2 3" />
        <circle cx="8" cy="2" r="0.5" fill="currentColor" />
        <circle cx="16" cy="2" r="0.5" fill="currentColor" />
      </svg>
    ),
    title: "Traditional Arts",
    subtitle: "Discover",
    color: "#f97316", // Orange
    bg: "#fff7ed",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14c-3.3 0-6 2.7-6 6h12c0-3.3-2.7-6-6-6z" />
        <circle cx="12" cy="8" r="4" />
        <path d="M6 16c-2.2 0-4 1.8-4 4h4" />
        <circle cx="5" cy="10" r="3" />
        <path d="M18 16c2.2 0 4 1.8 4 4h-4" />
        <circle cx="19" cy="10" r="3" />
      </svg>
    ),
    title: "Cultural Events",
    subtitle: "Explore",
    color: "#22c55e", // Green
    bg: "#f0fdf4",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20M4 20V10M20 20V10M9 20v-5a3 3 0 0 1 6 0v5M12 2L2 10h20L12 2z" />
        <path d="M8 10v10M16 10v10" />
        <path d="M12 13v7" />
        <path d="M10 13h4" />
      </svg>
    ),
    title: "Heritage Sites",
    subtitle: "Visit",
    color: "#92400e", // Brown
    bg: "#fffbeb",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        <path d="M6 8h2M6 12h2M16 8h2M16 12h2" />
      </svg>
    ),
    title: "Publications",
    subtitle: "Read",
    color: "#3b82f6", // Blue
    bg: "#eff6ff",
  },
];

export default function MobileHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f8f1e6]">

      {/* =========================================================
          MOBILE HERO
      ========================================================== */}

      <div className="relative">

        {/* Subtle heritage pattern */}
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-0
            h-[600px]
            w-[105px]
            opacity-[0.23]
          "
          style={{
            backgroundImage: "url('/images/hero/hero-pattern.png')",
            backgroundRepeat: "repeat-y",
            backgroundPosition: "left top",
            backgroundSize: "105px auto",
          }}
        />


        {/* =====================================================
            HERO TEXT
        ====================================================== */}

        <div className="relative z-20 px-6 pt-12">

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-center text-[8px] font-semibold uppercase tracking-[0.17em] text-[#c65d19]">

            <span>
              Celebrating Diversity
            </span>

            <span className="text-[#b86b33]">
              •
            </span>

            <span>
              Preserving Heritage
            </span>

          </div>


          {/* Ornament */}
          <div className="mt-5 flex items-center justify-center gap-3">

            <span className="h-px w-[42px] bg-[#b99269]" />

            <span
              className="
                flex
                h-[13px]
                w-[13px]
                rotate-45
                items-center
                justify-center
                border
                border-[#b99269]
              "
            >
              <span className="h-[4px] w-[4px] bg-[#c8611b]" />
            </span>

            <span className="h-px w-[42px] bg-[#b99269]" />

          </div>


          {/* Heading */}
          <h1
            className="
              mx-auto
              mt-6
              max-w-[680px]
              text-center
              font-serif
              text-[43px]
              font-medium
              leading-[0.98]
              tracking-[-0.035em]
              text-[#16253a]
            "
          >
            <span className="block">
              Preserving the Heritage of
            </span>

            <span className="mt-2 block text-[#df5f18]">
              North East India
            </span>
          </h1>


          {/* Description */}
          <p
            className="
              mx-auto
              mt-6
              max-w-[520px]
              text-center
              text-[17px]
              leading-[1.55]
              text-[#59626b]
            "
          >
            Discover the vibrant traditions, arts, and cultural events
            organized by the North East Zone Cultural Centre.
          </p>


          {/* CTA buttons */}
          <div className="mt-7 flex items-center justify-center gap-3">
            <a
              href="/events"
              className="
                inline-flex
                h-[46px]
                items-center
                justify-center
                gap-2.5
                rounded-full
                bg-[#df5f18]
                px-5
                text-white
                shadow-sm
              "
            >
              <span className="material-symbols-outlined text-[18px]">
                calendar_month
              </span>

              <span className="text-[13px] font-bold tracking-wide">
                Events
              </span>
            </a>

            <a
              href="/about/introduction-of-nezcc"
              className="
                inline-flex
                h-[46px]
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-[#737981]
                bg-white/40
                px-5
                text-[#222b33]
              "
            >
              <span className="material-symbols-outlined text-[19px]">
                play_circle
              </span>

              <span className="text-[13px] font-semibold">
                Learn More
              </span>
            </a>
          </div>
        </div>


        {/* =====================================================
            HERO ARTWORK
        ====================================================== */}

        <div className="relative z-10 -mt-6 w-full">

          {/* Large artwork */}
          <div className="relative flex w-full justify-center overflow-hidden">

            <img
              src="/images/hero/hero-landscape.png"
              alt="North East India cultural heritage"
              className="
                w-[132%]
                max-w-none
                shrink-0
                object-contain
                object-top
              "
            />

          </div>


          {/* Decorative birds */}
          <div className="pointer-events-none absolute left-[8%] top-[40px] text-[#9c744f] opacity-80">
            <span className="mr-3 text-[19px]">⌁</span>
            <span className="text-[13px]">⌁</span>
          </div>

          <div className="pointer-events-none absolute left-[12%] top-[110px] text-[#9c744f] opacity-70">
            <span className="text-[17px]">⌁</span>
          </div>

        </div>


        {/* =====================================================
            QUICK LINKS
        ====================================================== */}

        <div className="relative z-30 px-5">

          <div
            className="
              mt-5
              overflow-hidden
              rounded-[24px]
              border
              border-slate-100
              bg-white
              shadow-[0_8px_30px_rgb(0,0,0,0.06)]
            "
          >

            <div className="grid grid-cols-2">

              {quickLinks.map((item, index) => (
                <a
                  key={item.title}
                  href="#"
                  className={`
                    flex
                    min-h-[110px]
                    flex-row
                    items-center
                    justify-start
                    gap-3
                    px-4
                    py-5
                    text-left
                    ${index % 2 === 0
                      ? "border-r border-slate-100/80"
                      : ""
                    }
                    ${index < 2
                      ? "border-b border-slate-100/80"
                      : ""
                    }
                  `}
                >

                  {/* icon */}
                  <div
                    className="
                      flex
                      h-[52px]
                      w-[52px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                    "
                    style={{
                      color: item.color,
                      backgroundColor: item.bg,
                    }}
                  >
                    <div className="scale-[0.85]">{item.icon}</div>
                  </div>

                  {/* text content */}
                  <div className="flex flex-col items-start justify-center">
                    {/* title */}
                    <div className="text-[12px] font-bold leading-tight text-[#1e293b] sm:text-[13px]">
                      {item.title}
                    </div>

                    {/* subtitle */}
                    <div className="mt-1 text-[11px] font-medium text-[#64748b]">
                      {item.subtitle}
                    </div>

                    {/* color indicator */}
                    <div
                      className="mt-2 h-[3px] w-[18px] rounded-full"
                      style={{
                        backgroundColor: item.color,
                      }}
                    />
                  </div>

                </a>
              ))}

            </div>

          </div>

        </div>


        {/* =====================================================
            NOTICE
        ====================================================== */}

        <div className="relative z-40 mt-8 w-full pb-6">
          <UrgentNotice />
        </div>

      </div>



    </section>
  );
}
