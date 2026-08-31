"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openAccordion, setOpenAccordion] = React.useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navItemBase =
    "text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[11.5px] tracking-tight font-semibold text-slate-700 hover:text-[#df5f18] transition-colors duration-200 whitespace-nowrap";

  const dropdownItem =
    "block px-4 py-2.5 text-[14px] text-slate-700 hover:bg-[#fff4e9] hover:text-[#df5f18] transition-colors";

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className={`fixed left-0 top-0 z-[100] h-[5px] w-full bg-slate-200/50 transition-opacity duration-300 ${isScrolled ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="h-full bg-[linear-gradient(90deg,#ea580c_0%,#ffffff_50%,#15803d_100%)] shadow-sm transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* =========================
          HEADER
      ========================== */}
      <header className="relative z-[60] w-full bg-white">

        {/* =========================
            TOP UTILITY BAR
        ========================== */}
        <div className="relative overflow-hidden border-b border-white/40 bg-[#f7a928]">

          <div className="relative z-10 mx-auto flex h-[36px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">

            {/* Left utility links */}
            <nav className="flex min-w-0 flex-1 items-center overflow-hidden whitespace-nowrap pr-4 py-1">
              <a
                href="/tenders"
                className="flex items-center gap-2 text-[12px] sm:text-[13px] font-semibold text-slate-800 transition hover:text-[#df5f18] shrink-0"
              >
                {/* small megaphone badge */}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f28c18] text-white shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-[15px]">
                    campaign
                  </span>
                </span>

                <span>Advertisement &amp; Tenders</span>
              </a>

              <span className="mx-3 h-4 w-px bg-slate-500/40 shrink-0" aria-hidden="true" />

              <a href="/feedback" className="text-[12px] sm:text-[13px] font-semibold text-slate-800 hover:text-[#df5f18] transition-colors shrink-0">
                Feedback
              </a>

              <span className="mx-3 hidden h-4 w-px bg-slate-500/40 shrink-0 sm:block" aria-hidden="true" />

              <a href="/newsletter" className="hidden text-[12px] sm:text-[13px] font-semibold text-slate-800 hover:text-[#df5f18] transition-colors shrink-0 sm:block">
                Newsletter
              </a>

              <span className="mx-3 hidden h-4 w-px bg-slate-500/40 shrink-0 sm:block" aria-hidden="true" />

              <a href="/contact" className="hidden text-[12px] sm:text-[13px] font-semibold text-slate-800 hover:text-[#df5f18] transition-colors shrink-0 sm:block">
                Contact
              </a>
            </nav>

            <button
              aria-expanded={isMobileMenuOpen}
              aria-label="Menu"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-800 transition hover:bg-white/30 hover:text-[#df5f18] focus:outline-none focus:ring-2 focus:ring-white/70 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined text-[22px]">
                menu
              </span>
            </button>

            {/* Social icons */}
            <div className="hidden sm:flex items-center gap-4">

              <a
                href="#"
                aria-label="Facebook"
                className="text-slate-800 hover:text-[#df5f18] transition-colors"
              >
                <svg
                  className="h-[16px] w-[16px] fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="text-slate-800 hover:text-[#df5f18] transition-colors"
              >
                <svg
                  className="h-[17px] w-[17px] fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                href="#"
                aria-label="X (Twitter)"
                className="text-slate-800 hover:text-[#df5f18] transition-colors"
              >
                <svg
                  className="h-[16px] w-[16px] fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="text-slate-800 hover:text-[#df5f18] transition-colors"
              >
                <svg
                  className="h-[18px] w-[18px] fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M21.582 6.186a2.585 2.585 0 00-1.815-1.83C18.163 3.93 12 3.93 12 3.93s-6.163 0-7.767.426a2.585 2.585 0 00-1.815 1.83c-.428 1.623-.428 5.01-.428 5.01s0 3.387.428 5.01a2.585 2.585 0 001.815 1.83C6.163 18.462 12 18.462 12 18.462s6.163 0 7.767-.426a2.585 2.585 0 001.815-1.83c.428-1.623.428-5.01.428-5.01s0-3.387-.428-5.01zM9.54 12.87V7.545l5.59 2.662-5.59 2.662z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* =========================
            BRAND / IDENTITY AREA
        ========================== */}
        <div className="relative bg-white">
          {/* Banner Background */}
          <img
            alt="Header Background"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-40"
            src="/images/banner/header-banner.png"
          />

          <div className="relative z-10 mx-auto flex min-h-[100px] w-full max-w-[1440px] items-center justify-between px-2 py-3 sm:px-6 lg:px-10">

            {/* NEZCC */}
            <a
              href="/"
              className="block shrink-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#df5f18]/40"
            >
              <img
                alt="NEZCC Logo"
                className="h-[38px] w-auto object-contain sm:h-[54px] md:h-[76px]"
                src="/images/logos/nezcc.png"
              />
            </a>

            <button
              aria-expanded={isMobileMenuOpen}
              aria-label="Menu"
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 hover:text-[#df5f18] focus:outline-none focus:ring-2 focus:ring-[#df5f18]/30 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined text-[28px]">
                menu
              </span>
            </button>

            {/* Government branding */}
            <div className="flex items-start gap-1 sm:gap-4 md:gap-5 min-w-0 shrink pt-1">

              <img
                alt="Ministry of Culture Logo"
                className="hidden h-[28px] w-auto max-w-[140px] object-contain sm:block sm:h-[40px] md:h-[62px] shrink"
                src="/images/logos/ministry_of_culture_india.png"
              />

              {/* Ministry emblem / portraits can remain part of existing ministry image */}
              <div className="hidden items-start gap-3 md:flex">

                <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:h-[60px] md:w-[60px]">
                  <img
                    alt="Ministry of Culture Logo"
                    className="h-full w-full object-cover"
                    src="/images/logos/ministry-of-culture.jpeg"
                  />
                </div>

                <div className="flex items-start gap-4">
                  {/* Portrait 1 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:h-[60px] md:w-[60px]">
                      <img
                        alt="Shri Gajendra Singh Shekhawat"
                        className="h-full w-full object-cover object-top"
                        src="/images/logos/Shri-Gajendra-Singh-Shekhawat.jpg"
                      />
                    </div>
                    <div className="mt-1.5 w-[80px] md:w-[90px]">
                      <div className="text-[9.5px] font-bold leading-tight text-slate-800 md:text-[10.5px]">
                        Shri Gajendra Singh Shekhawat
                      </div>
                    </div>
                  </div>

                  {/* Portrait 2 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:h-[60px] md:w-[60px]">
                      <img
                        alt="Shri Rao Inderjit Singh"
                        className="h-full w-full object-cover object-top"
                        src="/images/logos/shri-rao-inderjit-singh.jpeg"
                      />
                    </div>
                    <div className="mt-1.5 w-[80px] md:w-[90px]">
                      <div className="text-[9.5px] font-bold leading-tight text-slate-800 md:text-[10.5px]">
                        Shri Rao Inderjit Singh
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* mobile menu */}
              <button
                aria-expanded={isMobileMenuOpen}
                aria-label="Menu"
                className="hidden shrink-0 self-center rounded-lg p-1.5 text-slate-700 transition hover:bg-slate-100 hover:text-[#df5f18] focus:outline-none focus:ring-2 focus:ring-[#df5f18]/30 md:hidden ml-1"
                id="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <span className="material-symbols-outlined text-[28px]">
                  menu
                </span>
              </button>
            </div>
          </div>

          {/* =========================
              FLOATING NAV
          ========================== */}
          <div className="relative h-[25px] md:h-[27px] w-full z-40 mb-2 md:mb-0">
            <div
              className={`z-50 mx-auto w-full max-w-[1536px] px-2 sm:px-4 lg:px-6 transition-all duration-500 ease-in-out ${isScrolled
                  ? "fixed left-0 right-0 top-4"
                  : "absolute left-0 right-0 top-0"
                }`}
            >
              {/* DESKTOP NAV */}
              <nav
                className={`hidden md:flex relative min-h-[50px] md:min-h-[54px] w-full items-center justify-between rounded-2xl border border-slate-200 px-1 lg:px-3 xl:px-4 py-1 transition-all duration-300 ${isScrolled
                    ? "bg-white/95 shadow-lg backdrop-blur-md"
                    : "bg-white shadow-[0_6px_24px_rgba(15,23,42,0.08)]"
                  }`}
              >
                {/* Home */}
                <a
                  href="/"
                  className={`shrink-0 relative flex items-center gap-0.5 lg:gap-1 rounded-xl px-1.5 lg:px-2 py-1.5 text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[11.5px] tracking-tight font-semibold transition-all duration-200 ${pathname === "/"
                    ? "bg-[#df5f18] text-white shadow-md"
                    : "text-slate-700 hover:bg-[#fff4e9] hover:text-[#df5f18]"
                    }`}
                >
                  <span className="material-symbols-outlined text-[13px] lg:text-[14px]">
                    home
                  </span>
                  <span>Home</span>
                </a>

                {/* About Us */}
                <div className="shrink-0 group relative flex h-full items-center">
                  <button className={`flex items-center gap-0.5 lg:gap-1 rounded-xl px-1 lg:px-1.5 xl:px-2 py-2.5 ${navItemBase}`}>
                    <span className="material-symbols-outlined text-[13px] lg:text-[14px]">
                      person
                    </span>
                    <span>About Us</span>
                    <span className="material-symbols-outlined text-[12px] lg:text-[13px]">
                      expand_more
                    </span>
                  </button>

                  <div className="invisible absolute left-0 top-full mt-1 w-64 translate-y-2 rounded-xl border border-slate-200 bg-white py-3 shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <a className={dropdownItem} href="/about/introduction-of-north-east">
                      Introduction of North East
                    </a>
                    <a className={dropdownItem} href="/about/introduction-of-nezcc">
                      Introduction of NEZCC
                    </a>
                    <a className={dropdownItem} href="/about/leadership-and-team">
                      Leadership &amp; Team
                    </a>
                    <a className={dropdownItem} href="/about/aims-and-objectives">
                      Aims &amp; Objectives
                    </a>
                  </div>
                </div>

                {/* Highlights of the Activities */}
                <div className="shrink-0 group relative flex h-full items-center">
                  <a
                    href="/activities"
                    className={`flex items-center gap-0.5 lg:gap-1 rounded-xl px-1 lg:px-1.5 xl:px-2 py-2.5 ${navItemBase}`}
                  >
                    <span className="material-symbols-outlined text-[13px] lg:text-[14px]">
                      star
                    </span>
                    <span>Highlights of the Activities</span>
                    {/* <span className="material-symbols-outlined text-[12px] lg:text-[13px]">
                      expand_more
                    </span> */}
                  </a>
                </div>

                {/* North East Heritage */}
                <div className="shrink-0 group relative flex h-full items-center">
                  <button className={`flex items-center gap-0.5 lg:gap-1 rounded-xl px-1 lg:px-1.5 xl:px-2 py-2.5 ${navItemBase}`}>
                    <span className="material-symbols-outlined text-[13px] lg:text-[14px]">
                      location_on
                    </span>
                    <span>North East Heritage</span>
                    <span className="material-symbols-outlined text-[12px] lg:text-[13px]">
                      expand_more
                    </span>
                  </button>

                  <div className="invisible absolute left-1/2 top-full mt-1 w-72 -translate-x-1/2 translate-y-2 rounded-xl border border-slate-200 bg-white py-3 shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <a className={dropdownItem} href="/north-east-heritage/museum-collection">
                      Museum Collection
                    </a>
                    <a className={dropdownItem} href="/north-east-heritage/shangyu-heritage-museum">
                      Shangyu Heritage Museum
                    </a>
                    <a className={dropdownItem} href="/north-east-heritage/tribal-painting-collection">
                      Tribal Painting Collection
                    </a>
                    <a className={dropdownItem} href="/north-east-heritage/painting-collection">
                      Painting Collection
                    </a>
                    <a className={dropdownItem} href="/north-east-heritage/motor-sports-museum">
                      Motor Sports Museum
                    </a>
                  </div>
                </div>

                {/* Shilpgram */}
                <a
                  href="/shilpgram"
                  className={`shrink-0 flex items-center gap-0.5 lg:gap-1 rounded-xl px-1 lg:px-1.5 xl:px-2 py-2.5 ${navItemBase}`}
                >
                  <span className="material-symbols-outlined text-[13px] lg:text-[14px]">
                    cottage
                  </span>
                  <span>Shilpgram</span>
                </a>

                {/* Library */}
                <a
                  href="/library"
                  className={`shrink-0 flex items-center gap-0.5 lg:gap-1 rounded-xl px-1 lg:px-1.5 xl:px-2 py-2.5 ${navItemBase}`}
                >
                  <span className="material-symbols-outlined text-[13px] lg:text-[14px]">
                    book
                  </span>
                  <span>Library</span>
                </a>

                {/* Gallery */}
                <a
                  href="/gallery"
                  className={`shrink-0 flex items-center gap-0.5 lg:gap-1 rounded-xl px-1 lg:px-1.5 xl:px-2 py-2.5 ${navItemBase}`}
                >
                  <span className="material-symbols-outlined text-[13px] lg:text-[14px]">
                    photo_library
                  </span>
                  <span>Gallery</span>
                </a>

                {/* Members State */}
                <div className="shrink-0 group relative flex h-full items-center">
                  <button className={`flex items-center gap-0.5 lg:gap-1 rounded-xl px-1 lg:px-1.5 xl:px-2 py-2.5 ${navItemBase}`}>
                    <span className="material-symbols-outlined text-[13px] lg:text-[14px]">
                      groups
                    </span>
                    <span>Members State</span>
                    <span className="material-symbols-outlined text-[12px] lg:text-[13px]">
                      expand_more
                    </span>
                  </button>

                  <div className="invisible absolute left-1/2 top-full mt-1 w-[320px] -translate-x-1/2 translate-y-2 rounded-xl border border-slate-200 bg-white p-3 shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-1">
                      <a className={dropdownItem} href="/member-states/arunachal-pradesh">Arunachal</a>
                      <a className={dropdownItem} href="/member-states/assam">Assam</a>
                      <a className={dropdownItem} href="/member-states/manipur">Manipur</a>
                      <a className={dropdownItem} href="/member-states/meghalaya">Meghalaya</a>
                      <a className={dropdownItem} href="/member-states/mizoram">Mizoram</a>
                      <a className={dropdownItem} href="/member-states/nagaland">Nagaland</a>
                      <a className={dropdownItem} href="/member-states/sikkim">Sikkim</a>
                      <a className={dropdownItem} href="/member-states/tripura">Tripura</a>
                    </div>
                  </div>
                </div>

                {/* RTI */}
                <a
                  href="/rti"
                  className={`shrink-0 flex items-center gap-0.5 lg:gap-1 rounded-xl px-1 lg:px-1.5 xl:px-2 py-2.5 ${navItemBase}`}
                >
                  <span className="material-symbols-outlined text-[13px] lg:text-[14px]">
                    info
                  </span>
                  <span>RTI</span>
                </a>

                {/* Publication */}
                <div className="shrink-0 group relative flex h-full items-center">
                  <button className={`flex items-center gap-0.5 lg:gap-1 rounded-xl px-1 lg:px-1.5 xl:px-2 py-2.5 ${navItemBase}`}>
                    <span className="material-symbols-outlined text-[13px] lg:text-[14px]">
                      menu_book
                    </span>
                    <span>Publication</span>
                    <span className="material-symbols-outlined text-[12px] lg:text-[13px]">
                      expand_more
                    </span>
                  </button>

                  <div className="invisible absolute right-0 top-full mt-1 w-56 translate-y-2 rounded-xl border border-slate-200 bg-white py-3 shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <a className={dropdownItem} href="/publications/annual-reports">
                      Annual Reports
                    </a>
                  </div>
                </div>
              </nav>

              {/* MOBILE NAV */}
              <nav
                className={`grid md:hidden relative min-h-[50px] w-full grid-cols-5 items-center gap-1 rounded-2xl border border-slate-200 px-2 py-1.5 transition-all duration-300 ${isScrolled
                    ? "bg-white/95 shadow-lg backdrop-blur-md"
                    : "bg-white shadow-[0_6px_24px_rgba(15,23,42,0.08)]"
                  }`}
              >

                {/* Home */}
                <a
                  href="/"
                  className={`flex items-center justify-center gap-1.5 rounded-xl px-2 sm:px-3 py-2 text-[12px] md:text-[13px] font-semibold transition-all duration-200 ${pathname === "/"
                      ? "bg-[#df5f18] text-white shadow-sm"
                      : "text-slate-700 hover:bg-[#fff4e9] hover:text-[#df5f18] active:scale-95"
                    }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    home
                  </span>
                  <span className="hidden sm:block">Home</span>
                </a>

                {/* About Us */}
                <div
                  className="group relative flex h-full items-center justify-center min-w-0"
                  onMouseEnter={() => setOpenDropdown('about')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
                    className={`flex items-center justify-center gap-1.5 rounded-xl px-2 sm:px-3 py-2 hover:bg-[#fff4e9] active:scale-95 ${navItemBase}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      person_outline
                    </span>
                    <span className="hidden sm:block">About Us</span>
                  </button>

                  <div className={`absolute left-0 top-full mt-1 w-64 translate-y-1 rounded-xl border border-slate-200 bg-white py-2 shadow-xl transition-all duration-200 ${openDropdown === 'about' ? 'visible translate-y-0 opacity-100' : 'invisible opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100'}`}>
                    <a className={dropdownItem} href="/about/introduction-of-north-east">
                      Introduction of North East
                    </a>
                    <a className={dropdownItem} href="/about/introduction-of-nezcc">
                      Introduction of NEZCC
                    </a>
                    <a className={dropdownItem} href="/about/leadership-and-team">
                      Leadership &amp; Team
                    </a>
                    <a className={dropdownItem} href="/about/aims-and-objectives">
                      Aims &amp; Objectives
                    </a>
                  </div>
                </div>

                {/* Heritage */}
                <div
                  className="group relative flex h-full items-center justify-center min-w-0"
                  onMouseEnter={() => setOpenDropdown('heritage')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'heritage' ? null : 'heritage')}
                    className={`flex items-center justify-center gap-1.5 rounded-xl px-2 sm:px-3 py-2 hover:bg-[#fff4e9] active:scale-95 ${navItemBase}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      location_on
                    </span>
                    <span className="hidden sm:block">Heritage</span>
                  </button>

                  <div className={`absolute left-1/2 top-full mt-1 w-64 -translate-x-1/2 translate-y-1 rounded-xl border border-slate-200 bg-white py-2 shadow-xl transition-all duration-200 ${openDropdown === 'heritage' ? 'visible translate-y-0 opacity-100' : 'invisible opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100'}`}>
                    <a className={dropdownItem} href="/north-east-heritage/museum-collection">
                      Museum Collection
                    </a>
                    <a className={dropdownItem} href="/north-east-heritage/shangyu-heritage-museum">
                      Shangyu Heritage Museum
                    </a>
                    <a className={dropdownItem} href="/north-east-heritage/tribal-painting-collection">
                      Tribal Painting Collection
                    </a>
                    <a className={dropdownItem} href="/north-east-heritage/painting-collection">
                      Painting Collection
                    </a>
                    <a className={dropdownItem} href="/north-east-heritage/motor-sports-museum">
                      Motor Sports Museum
                    </a>
                  </div>
                </div>

                {/* Gallery */}
                <a
                  href="/gallery"
                  className={`flex items-center justify-center gap-1.5 rounded-xl px-2 sm:px-3 py-2 hover:bg-[#fff4e9] active:scale-95 ${navItemBase}`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    photo_library
                  </span>
                  <span className="hidden sm:block">Gallery</span>
                </a>

                {/* RTI */}
                <a
                  href="/rti"
                  className={`hidden items-center justify-center gap-1.5 rounded-xl px-2 sm:px-3 py-2 hover:bg-[#fff4e9] active:scale-95 ${navItemBase}`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    info
                  </span>
                  <span className="hidden sm:block">RTI</span>
                </a>

                {/* More Dropdown */}
                <div
                  className="group relative flex h-full items-center justify-center min-w-0"
                  onMouseEnter={() => setOpenDropdown('more')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'more' ? null : 'more')}
                    aria-label="More navigation"
                    className={`flex items-center justify-center gap-1 rounded-xl px-2 sm:px-3 py-2 hover:bg-[#fff4e9] active:scale-95 ${navItemBase}`}
                  >
                    <span className="hidden sm:block">More</span>
                    <span className="material-symbols-outlined text-[18px] sm:text-[16px]">
                      menu
                    </span>
                  </button>

                  <div className={`absolute right-0 top-full mt-1 w-56 translate-y-1 rounded-xl border border-slate-200 bg-white py-2 shadow-xl transition-all duration-200 ${openDropdown === 'more' ? 'visible translate-y-0 opacity-100' : 'invisible opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100'}`}>
                    <a className={dropdownItem} href="/activities">
                      Highlights of Activities
                    </a>
                    <a className={dropdownItem} href="/shilpgram">
                      Shilpgram
                    </a>
                    <a className={dropdownItem} href="/library">
                      Library
                    </a>
                    <div className="h-px w-full bg-slate-100 my-1" />
                    <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Member States
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 px-2 pb-1">
                      <a className="block rounded px-2 py-1.5 text-[13px] text-slate-700 hover:bg-[#fff4e9] hover:text-[#df5f18]" href="/member-states/arunachal-pradesh">Arunachal</a>
                      <a className="block rounded px-2 py-1.5 text-[13px] text-slate-700 hover:bg-[#fff4e9] hover:text-[#df5f18]" href="/member-states/assam">Assam</a>
                      <a className="block rounded px-2 py-1.5 text-[13px] text-slate-700 hover:bg-[#fff4e9] hover:text-[#df5f18]" href="/member-states/manipur">Manipur</a>
                      <a className="block rounded px-2 py-1.5 text-[13px] text-slate-700 hover:bg-[#fff4e9] hover:text-[#df5f18]" href="/member-states/meghalaya">Meghalaya</a>
                      <a className="block rounded px-2 py-1.5 text-[13px] text-slate-700 hover:bg-[#fff4e9] hover:text-[#df5f18]" href="/member-states/mizoram">Mizoram</a>
                      <a className="block rounded px-2 py-1.5 text-[13px] text-slate-700 hover:bg-[#fff4e9] hover:text-[#df5f18]" href="/member-states/nagaland">Nagaland</a>
                      <a className="block rounded px-2 py-1.5 text-[13px] text-slate-700 hover:bg-[#fff4e9] hover:text-[#df5f18]" href="/member-states/sikkim">Sikkim</a>
                      <a className="block rounded px-2 py-1.5 text-[13px] text-slate-700 hover:bg-[#fff4e9] hover:text-[#df5f18]" href="/member-states/tripura">Tripura</a>
                    </div>
                    <div className="h-px w-full bg-slate-100 my-1" />
                    <a className={dropdownItem} href="/publications/annual-reports">
                      Publications
                    </a>
                  </div>
                </div>

              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* =========================
          MOBILE NAVIGATION DRAWER
      ========================== */}
      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[110] w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
            <span className="text-lg font-bold text-slate-800">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto py-4 px-4">
            <nav className="flex flex-col space-y-1">
              <a href="/" className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#df5f18]">
                <span className="material-symbols-outlined mr-3 text-[20px]">home</span>
                Home
              </a>

              {/* About Us Accordion */}
              <div className="flex flex-col">
                <button
                  onClick={() => toggleAccordion('about')}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#df5f18]"
                >
                  <div className="flex items-center">
                    <span className="material-symbols-outlined mr-3 text-[20px]">person_outline</span>
                    About Us
                  </div>
                  <span className={`material-symbols-outlined text-[20px] transition-transform ${openAccordion === 'about' ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {openAccordion === 'about' && (
                  <div className="flex flex-col space-y-1 pl-12 pr-4 pb-2 pt-1">
                    <a href="/about/introduction-of-north-east" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Introduction of North East</a>
                    <a href="/about/introduction-of-nezcc" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Introduction of NEZCC</a>
                    <a href="/about/leadership-and-team" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Leadership &amp; Team</a>
                    <a href="/about/aims-and-objectives" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Aims &amp; Objectives</a>
                  </div>
                )}
              </div>

              <a href="/activities" className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#df5f18]">
                <span className="material-symbols-outlined mr-3 text-[20px]">star_outline</span>
                Highlights of the Activities
              </a>

              {/* Heritage Accordion */}
              <div className="flex flex-col">
                <button
                  onClick={() => toggleAccordion('heritage')}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#df5f18]"
                >
                  <div className="flex items-center">
                    <span className="material-symbols-outlined mr-3 text-[20px]">account_balance</span>
                    North East Heritage
                  </div>
                  <span className={`material-symbols-outlined text-[20px] transition-transform ${openAccordion === 'heritage' ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {openAccordion === 'heritage' && (
                  <div className="flex flex-col space-y-1 pl-12 pr-4 pb-2 pt-1">
                    <a href="/north-east-heritage/museum-collection" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Museum Collection</a>
                    <a href="/north-east-heritage/shangyu-heritage-museum" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Shangyu Heritage Museum</a>
                    <a href="/north-east-heritage/tribal-painting-collection" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Tribal Painting Collection</a>
                    <a href="/north-east-heritage/painting-collection" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Painting Collection</a>
                    <a href="/north-east-heritage/motor-sports-museum" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Motor Sports Museum</a>
                  </div>
                )}
              </div>

              <a href="/shilpgram" className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#df5f18]">
                <span className="material-symbols-outlined mr-3 text-[20px]">home_work</span>
                Shilpgram
              </a>

              <a href="/library" className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#df5f18]">
                <span className="material-symbols-outlined mr-3 text-[20px]">menu_book</span>
                Library
              </a>

              <a href="/gallery" className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#df5f18]">
                <span className="material-symbols-outlined mr-3 text-[20px]">photo_library</span>
                Gallery
              </a>

              {/* Members State Accordion */}
              <div className="flex flex-col">
                <button
                  onClick={() => toggleAccordion('members')}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#df5f18]"
                >
                  <div className="flex items-center">
                    <span className="material-symbols-outlined mr-3 text-[20px]">groups</span>
                    Members State
                  </div>
                  <span className={`material-symbols-outlined text-[20px] transition-transform ${openAccordion === 'members' ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {openAccordion === 'members' && (
                  <div className="flex flex-col space-y-1 pl-12 pr-4 pb-2 pt-1">
                    <a href="/member-states/arunachal-pradesh" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Arunachal Pradesh</a>
                    <a href="/member-states/assam" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Assam</a>
                    <a href="/member-states/manipur" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Manipur</a>
                    <a href="/member-states/meghalaya" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Meghalaya</a>
                    <a href="/member-states/mizoram" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Mizoram</a>
                    <a href="/member-states/nagaland" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Nagaland</a>
                    <a href="/member-states/sikkim" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Sikkim</a>
                    <a href="/member-states/tripura" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Tripura</a>
                  </div>
                )}
              </div>

              <a href="/rti" className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#df5f18]">
                <span className="material-symbols-outlined mr-3 text-[20px]">info</span>
                RTI
              </a>

              {/* Publication Accordion */}
              <div className="flex flex-col mb-4">
                <button
                  onClick={() => toggleAccordion('publication')}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#df5f18]"
                >
                  <div className="flex items-center">
                    <span className="material-symbols-outlined mr-3 text-[20px]">auto_stories</span>
                    Publication
                  </div>
                  <span className={`material-symbols-outlined text-[20px] transition-transform ${openAccordion === 'publication' ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {openAccordion === 'publication' && (
                  <div className="flex flex-col space-y-1 pl-12 pr-4 pb-2 pt-1">
                    <a href="/publications/annual-reports" className="py-2 text-sm text-slate-600 hover:text-[#df5f18]">Annual Reports</a>
                  </div>
                )}
              </div>

            </nav>
          </div>

          {/* Mobile Utility Links Footer */}
          <div className="border-t border-slate-100 bg-slate-50 p-4">
            <div className="flex flex-wrap gap-4">
              <a href="/tenders" className="text-sm font-semibold text-slate-700 hover:text-[#df5f18]">Tenders</a>
              <a href="/feedback" className="text-sm font-semibold text-slate-700 hover:text-[#df5f18]">Feedback</a>
              <a href="/newsletter" className="text-sm font-semibold text-slate-700 hover:text-[#df5f18]">Newsletter</a>
              <a href="/contact" className="text-sm font-semibold text-slate-700 hover:text-[#df5f18]">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
