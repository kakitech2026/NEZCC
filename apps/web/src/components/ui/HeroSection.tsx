"use client";

import React from "react";

const quickLinks = [
  {
    icon: "palette",
    title: "Traditional Arts",
    subtitle: "Discover",
    color: "#ef6d1d",
    bg: "#fff4e9",
  },
  {
    icon: "groups",
    title: "Cultural Events",
    subtitle: "Explore",
    color: "#4e9257",
    bg: "#f1f8f0",
  },
  {
    icon: "account_balance",
    title: "Heritage Sites",
    subtitle: "Visit",
    color: "#99591c",
    bg: "#fff7ed",
  },
  {
    icon: "menu_book",
    title: "Publications",
    subtitle: "Read",
    color: "#1898df",
    bg: "#eef4ff",
  },
];

export default function HeroSection() {
  return (
    <section className="relative bg-[#f8f1e6] pb-[60px] lg:pb-[75px]">

      {/* =========================================================
          HERO
      ========================================================== */}

      <div className="relative mx-auto max-w-[1536px]">

        {/* Cream background */}
        <div className="absolute inset-0 bg-[#f8f1e6]" />

        {/* Left tribal pattern */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-[1] h-full w-[155px] opacity-[0.22]"
          style={{
            backgroundImage: "url('/images/hero/hero-pattern.png')",
            backgroundRepeat: "repeat-y",
            backgroundPosition: "left top",
            backgroundSize: "155px auto",
          }}
        />



        {/* =====================================================
            ARTWORK
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-[5]
            hidden
            h-full
            w-[64%]
            overflow-hidden
            lg:block
            xl:w-[65%]
          "
        >

          <div
            className="
              absolute
              inset-[-45px]
              bg-cover
              bg-center
              bg-no-repeat
            "
            style={{
              backgroundImage: "url('/images/hero/hero-landscape6.png')",

              // This is the important part:
              // enlarge the artwork so the internal transparent
              // margins are pushed outside the visible container.
              backgroundSize: "125% auto",
              backgroundPosition: "center center",
            }}
          />

        </div>


        {/* Fade artwork into cream area */}
        <div
          className="
            pointer-events-none
            absolute
            right-[34%]
            top-0
            z-[6]
            hidden
            h-full
            w-[260px]
            lg:block
          "
          style={{
            background:
              "linear-gradient(90deg, #f8f1e6 0%, rgba(248,241,230,0.93) 22%, rgba(248,241,230,0.35) 68%, rgba(248,241,230,0) 100%)",
          }}
        />


        {/* Mobile Background Artwork */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            z-[5]
            block
            h-[65%]
            w-full
            lg:hidden
          "
        >
          <div
            className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
            style={{
              backgroundImage: "url('/images/hero/hero-landscape6.png')",
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
            }}
          />
        </div>


        {/* =====================================================
            HERO CONTENT
        ====================================================== */}

        <div className="relative z-20 min-h-[750px] lg:min-h-[500px] xl:min-h-[530px] flex flex-col justify-between">

          {/* LEFT COLUMN */}
          <div
            className="
              relative
              z-30
              mx-auto
              md:ml-[4.5%]
              w-[90%]
              md:w-[44%]
              min-w-0
              pt-[60px]
              md:pt-[82px]
              pb-[320px]
              md:pb-[125px]
              text-center
              md:text-left
              flex
              flex-col
              items-center
              md:items-start
            "
          >

            {/* Eyebrow & Ornament */}
            <div className="flex flex-col items-center md:items-center self-center md:self-start">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#c65d19] sm:text-[13px]">
                <span>Celebrating Diversity</span>
                <span>•</span>
                <span>Preserving Heritage</span>
              </div>

              {/* Ornament */}
              <div className="mt-3.5 flex items-center justify-center gap-3">
                <span className="h-px w-[52px] bg-[#b99269]" />
                <span
                  className="
                    flex
                    h-[14px]
                    w-[14px]
                    rotate-45
                    items-center
                    justify-center
                    border
                    border-[#b99269]
                  "
                >
                  <span className="h-[4px] w-[4px] bg-[#c8611b]" />
                </span>
                <span className="h-px w-[58px] bg-[#b99269]" />
              </div>
            </div>


            {/* Heading */}
            <h1
              className="
                mt-6
                max-w-[610px]
                font-serif
                text-[48px]
                font-medium
                leading-[0.98]
                tracking-[-0.035em]
                text-[#16253a]
                sm:text-[56px]
                xl:text-[60px]
              "
            >

              <span className="block">
                Preserving the Heritage of
              </span>

              <span className="mt-1 block text-[#df5f18]">
                North East India
              </span>

            </h1>


            {/* Description */}
            <p className="mt-6 max-w-[520px] text-[15px] leading-[1.65] text-[#525c66] sm:text-[16px]">
              Discover the vibrant traditions, arts, and cultural events
              organized by the North East Zone Cultural Centre.
            </p>


            {/* Buttons */}
            <div className="mt-7 flex flex-row flex-wrap justify-center md:justify-start items-center gap-4">

              <a
                href="/events"
                className="
                  inline-flex
                  h-[54px]
                  items-center
                  gap-2.5
                  rounded-full
                  bg-[#df5f18]
                  px-7
                  text-[15px]
                  font-semibold
                  text-white
                  shadow-[0_8px_20px_rgba(223,95,24,0.18)]
                  transition
                  hover:-translate-y-[1px]
                  hover:bg-[#c65313]
                "
              >
                <span className="material-symbols-outlined text-[20px]">
                  calendar_month
                </span>

                Explore Events
              </a>


              <a
                href="/about/introduction-of-nezcc"
                className="
                  inline-flex
                  h-[54px]
                  items-center
                  gap-2.5
                  rounded-full
                  border
                  border-[#737981]
                  bg-white/25
                  px-7
                  text-[15px]
                  font-semibold
                  text-[#222b33]
                  transition
                  hover:border-[#df5f18]
                  hover:bg-white
                  hover:text-[#df5f18]
                "
              >
                <span className="material-symbols-outlined text-[20px]">
                  play_circle
                </span>

                Learn More
              </a>

            </div>

          </div>


          {/* ===================================================
              QUICK ACCESS CARD
          ==================================================== */}

          <div
            className="
              relative
              lg:absolute
              bottom-[20px]
              lg:bottom-[-45px]
              left-1/2
              z-50
              w-[92%]
              lg:w-[calc(100%-170px)]
              max-w-[1090px]
              -translate-x-1/2
            "
          >

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                overflow-hidden
                rounded-[20px]
                border
                border-white
                bg-white/95
                shadow-[0_15px_42px_rgba(30,40,45,0.13)]
                backdrop-blur-md
              "
            >

              {quickLinks.map((link, index) => (
                <a
                  key={link.title}
                  href="#"
                  className={`
                    flex
                    min-h-[108px]
                    items-center
                    gap-4
                    px-6
                    py-5
                    ${index % 2 === 0 ? "sm:border-r" : ""}
                    ${index < 2 ? "sm:border-b lg:border-b-0" : ""}
                    ${index !== 3 ? "lg:border-r border-slate-200" : ""}
                    ${index !== 3 && index !== 1 ? "border-b sm:border-b-0" : ""}
                    transition-colors
                    hover:bg-[#fffaf5]
                  `}
                >

                  <div
                    className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border"
                    style={{
                      color: link.color,
                      backgroundColor: link.bg,
                      borderColor: `${link.color}38`,
                    }}
                  >
                    <span className="material-symbols-outlined text-[29px]">
                      {link.icon}
                    </span>
                  </div>


                  <div>

                    <div className="text-[14px] font-bold text-[#22282e]">
                      {link.title}
                    </div>

                    <div className="mt-1 text-[13px] text-[#777e84]">
                      {link.subtitle}
                    </div>

                    <div
                      className="mt-3 h-[4px] w-[42px] rounded-full"
                      style={{
                        backgroundColor: link.color,
                      }}
                    />

                  </div>

                </a>
              ))}

            </div>

          </div>

        </div>

      </div>




      {/* =========================================================
          BOTTOM ILLUSTRATION
      ========================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          z-[1]
          hidden
          h-full
          w-full
          bg-[length:100%_auto]
          bg-bottom
          bg-no-repeat
          opacity-[0.2]
          lg:block
        "
        style={{
          backgroundImage: "url('/images/hero/hero-illustration5.png')",
        }}
      />

    </section>
  );
}