'use client';
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative w-full mt-auto text-white overflow-hidden bg-[#051120]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-[url('/images/about/ne.png')] bg-cover bg-center bg-no-repeat opacity-80"
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#051120]/60 via-[#051120]/75 to-[#030913]/90"></div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#df5f18]/50 to-transparent z-10"></div>

      <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">



        {/* Asymmetrical Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand & Mission (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-12">
            <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded mb-8 inline-block">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                <img
                  alt="NEZCC Logo"
                  className="h-20 w-auto object-contain opacity-70"
                  src="/images/logos/nezcc-white.png"
                />
              </div>
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#df5f18]"></div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#df5f18]">
                Ministry of Culture, Govt. of India
              </p>
            </div>

            <p className="text-body-lg text-white/70 font-light leading-relaxed max-w-md mb-10">
              Dedicated to the preservation, promotion, and rich cultural heritage of North East India through documentation, festivals, and grants.
            </p>

            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="group w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#df5f18] hover:border-[#df5f18] transition-all duration-300">
                <svg className="h-5 w-5 fill-current text-white/70 group-hover:text-white transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="group w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#df5f18] hover:border-[#df5f18] transition-all duration-300">
                <svg className="h-5 w-5 fill-current text-white/70 group-hover:text-white transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-label="X (Twitter)" className="group w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#df5f18] hover:border-[#df5f18] transition-all duration-300">
                <svg className="h-5 w-5 fill-current text-white/70 group-hover:text-white transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="group w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#df5f18] hover:border-[#df5f18] transition-all duration-300">
                <svg className="h-5 w-5 fill-current text-white/70 group-hover:text-white transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M21.582 6.186a2.585 2.585 0 00-1.815-1.83C18.163 3.93 12 3.93 12 3.93s-6.163 0-7.767.426a2.585 2.585 0 00-1.815 1.83c-.428 1.623-.428 5.01-.428 5.01s0 3.387.428 5.01a2.585 2.585 0 001.815 1.83C6.163 18.462 12 18.462 12 18.462s6.163 0 7.767-.426a2.585 2.585 0 001.815-1.83c.428-1.623.428-5.01.428-5.01s0-3.387-.428-5.01zM9.54 12.87V7.545l5.59 2.662-5.59 2.662z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation & Contact (7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

            {/* About Navigation */}
            <div className="flex flex-col">
              <h4 className="font-serif italic text-white/90 text-xl mb-6">Navigation</h4>
              <nav className="flex flex-col gap-4">
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="/">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Home</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="/about/introduction-of-nezcc">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="/activities">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Highlights of the Activities</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="/north-east-heritage/museum-collection">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">North East Heritage</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="/shilpgram">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Shilpgram</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="/library">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Library</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="/gallery">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Gallery</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="/member-states/assam">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Members State</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="/rti">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">RTI</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="/publications/annual-reports">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Publication</span>
                </Link>
              </nav>
            </div>

            {/* Important Links */}
            <div className="flex flex-col">
              <h4 className="font-serif italic text-white/90 text-xl mb-6">Important Links</h4>
              <nav className="flex flex-col gap-4">
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="#">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">WZCC</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="#">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">SZCC</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="#">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">EZCC</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="#">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">SCZCC</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="#">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">NCZCC</span>
                </Link>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="#">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Culture North India</span>
                </Link>
                <a className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="https://indiaculture.gov.in" target="_blank" rel="noopener noreferrer">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Ministry of Culture</span>
                </a>
                <Link className="group flex items-center text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded w-max" href="#">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-[#df5f18] font-bold">—</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Azadi Ka Amrit Mahotsav</span>
                </Link>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col md:col-span-1 sm:col-span-2">
              <h4 className="font-serif italic text-white/90 text-xl mb-6">Contact Info</h4>
              <address className="not-italic flex flex-col gap-6">
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">Location</p>
                  <p className="text-sm text-white/80 font-serif leading-relaxed">
                    North East Zone Cultural Centre, Post Box No. 98, Near Airport,<br />
                    Dimapur, Nagaland – 797112, India.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">Direct</p>
                  <p className="text-sm text-white/80 font-serif">
                    Phone: 03862 – 243557/243573<br />
                    Fax: 03862 – 243626
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">Electronic</p>
                  <a href="mailto:info@nezcc.in" className="text-sm text-[#df5f18] hover:text-white transition-colors font-serif italic border-b border-[#df5f18]/30 hover:border-white pb-0.5 inline-block">
                    info@nezcc.in
                  </a>
                </div>
              </address>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/40 font-medium tracking-wide">
            © {new Date().getFullYear()} NEZCC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-white/40 font-medium tracking-wide uppercase">
            <Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded" href="#">Privacy</Link>
            <Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded" href="#">Terms</Link>
            <Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded" href="#">Sitemap</Link>
            <Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#df5f18] rounded" href="/feedback">Feedback</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
