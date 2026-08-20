"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className="bg-surface-container-lowest dark:bg-inverse-surface border-b border-outline-variant dark:border-outline shadow-sm dark:shadow-none w-full transition-all duration-300">
        <div className="bg-gradient-to-r from-saffron via-surface-container-lowest to-green-600 border-b border-outline-variant">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto py-2">
          <nav className="flex items-center gap-4">
            <a href="#" className="text-label-md font-label-md text-on-surface hover:text-primary transition-colors">Advertisement &amp; Tenders</a>
            <span className="text-on-surface/50" aria-hidden="true">|</span>
            <a href="#" className="text-label-md font-label-md text-on-surface hover:text-primary transition-colors">Feedback</a>
            <span className="text-on-surface/50" aria-hidden="true">|</span>
            <a href="#" className="text-label-md font-label-md text-on-surface hover:text-primary transition-colors">Newsletter</a>
            <span className="text-on-surface/50" aria-hidden="true">|</span>
            <a href="#" className="text-label-md font-label-md text-on-surface hover:text-primary transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="text-on-surface hover:text-primary transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-on-surface hover:text-primary transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" aria-label="X (Twitter)" className="text-on-surface hover:text-primary transition-colors">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="text-on-surface hover:text-primary transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M21.582 6.186a2.585 2.585 0 00-1.815-1.83C18.163 3.93 12 3.93 12 3.93s-6.163 0-7.767.426a2.585 2.585 0 00-1.815 1.83c-.428 1.623-.428 5.01-.428 5.01s0 3.387.428 5.01a2.585 2.585 0 001.815 1.83C6.163 18.462 12 18.462 12 18.462s6.163 0 7.767-.426a2.585 2.585 0 001.815-1.83c.428-1.623.428-5.01.428-5.01s0-3.387-.428-5.01zM9.54 12.87V7.545l5.59 2.662-5.59 2.662z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto py-3">
        <a className="focus:outline-none focus:ring-2 focus:ring-primary rounded" href="#">
          <img alt="NEZCC Logo" className="h-16 md:h-20 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfBWeYUZIU3MjGIR9yUh6jsURE3OkhtgLHB755vSdaitB5Zn59aXWkBuWxnGx7-ozYqXIOm5it14tNRGZUe3p4VurX0G89IKW0vF6OwmOWv6qvoDgZoXbZLSH_dOlUXNJp2Vf2aAHCTrrKlR16YK6G0HczglFJ5qxv81urffR3Qj_9lIe29yzA2NcsvxR0eRqasHxV7zIAxndWtNU9r9PhmFxw3hqRjpxVNGURLRRn1_fUFUy6mjyYT2nTUurO2FzPwb8" />
        </a>
        <div className="flex items-center gap-4">
          <img alt="Ministry of Culture Logo" className="hidden md:block h-12 md:h-16 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmZVD489jQZFYPSs-y6X_OalegdbeZc79mgDO0BqwZASngcaa_IHkenpoowMAbT-5MgQ01ag06SXgIQpjC5RzMk9k9W6yYsD44rbOZsoq9mAqsouIs-eIR-6-ZlmKdT_j-kH1UwprHmNefWLITOk5COLKVPENXoGBZLoTv3A2a-Cq7VR8YPpe1Iys6aikiEeYYvOctIrD_CYZ8d2cHZ_61pDqgA5Ng8poZlV7GxyvG48g6WiaLiZJ2TnbTQq4oYaV0KkQ" />
          <div className="flex items-center gap-stack-sm">
            <button aria-expanded="false" aria-label="Menu" className="md:hidden p-2 text-on-surface-variant hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded" id="mobile-menu-btn">
              <span className="material-symbols-outlined" data-icon="menu">menu</span>
            </button>
          </div>
        </div>
      </div>
      </header>
      <div className="hidden md:block border-t border-outline-variant bg-surface-container-lowest sticky top-0 z-50 shadow-sm">
        <nav className="flex items-center justify-center gap-6 w-full px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto h-14">
          <a className={`text-label-md font-label-md focus:outline-none focus:ring-2 focus:ring-primary rounded transition-opacity duration-150 ${pathname === '/' ? 'text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1 font-bold' : 'text-on-surface-variant dark:text-on-secondary-fixed-dim hover:text-[#1d4ed8] transition-colors opacity-80 hover:opacity-100 font-semibold'}`} href="/">Home</a>
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1 text-on-surface-variant dark:text-on-secondary-fixed-dim hover:text-[#1d4ed8] transition-colors text-label-md font-label-md focus:outline-none focus:ring-2 focus:ring-primary rounded opacity-80 hover:opacity-100 font-semibold">
              About Us <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
            <div className="absolute left-0 top-full mt-0 w-64 bg-surface-container-lowest border border-outline-variant rounded-b-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="/about/introduction-of-north-east">Introduction of North East</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="/about/introduction-of-nezcc">Introduction of NEZCC</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="/about/leadership-and-team">Leadership &amp; Team</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="/about/aims-and-objectives">Aims &amp; Objectives</a>
            </div>
          </div>
          <a className="text-on-surface-variant dark:text-on-secondary-fixed-dim hover:text-[#1d4ed8] transition-colors text-label-md font-label-md focus:outline-none focus:ring-2 focus:ring-primary rounded opacity-80 hover:opacity-100 font-semibold" href="/activities">Highlights of the Activities</a>
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1 text-on-surface-variant dark:text-on-secondary-fixed-dim hover:text-[#1d4ed8] transition-colors text-label-md font-label-md focus:outline-none focus:ring-2 focus:ring-primary rounded opacity-80 hover:opacity-100 font-semibold">
              North East Heritage <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
            <div className="absolute left-0 top-full mt-0 w-64 bg-surface-container-lowest border border-outline-variant rounded-b-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="/north-east-heritage/museum-collection">Museum Collection</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="/north-east-heritage/shangyu-heritage-museum">Shangyu Heritage Museum</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="/north-east-heritage/tribal-painting-collection">Tribal Painting Collection</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="#">Painting Collection</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="#">Motor Sports Museum</a>
            </div>
          </div>
          <a className="text-on-surface-variant dark:text-on-secondary-fixed-dim hover:text-[#1d4ed8] transition-colors text-label-md font-label-md focus:outline-none focus:ring-2 focus:ring-primary rounded opacity-80 hover:opacity-100 font-semibold" href="#">Shilpgram</a>
          <a className="text-on-surface-variant dark:text-on-secondary-fixed-dim hover:text-[#1d4ed8] transition-colors text-label-md font-label-md focus:outline-none focus:ring-2 focus:ring-primary rounded opacity-80 hover:opacity-100 font-semibold" href="#">Library</a>
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1 text-on-surface-variant dark:text-on-secondary-fixed-dim hover:text-[#1d4ed8] transition-colors text-label-md font-label-md focus:outline-none focus:ring-2 focus:ring-primary rounded opacity-80 hover:opacity-100 font-semibold">
              Gallery <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
            <div className="absolute left-0 top-full mt-0 w-48 bg-surface-container-lowest border border-outline-variant rounded-b-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="#">Photo Gallery</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="#">Video Gallery</a>
            </div>
          </div>
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1 text-on-surface-variant dark:text-on-secondary-fixed-dim hover:text-[#1d4ed8] transition-colors text-label-md font-label-md focus:outline-none focus:ring-2 focus:ring-primary rounded opacity-80 hover:opacity-100 font-semibold">
              Members State <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
            <div className="absolute left-0 top-full mt-0 w-48 bg-surface-container-lowest border border-outline-variant rounded-b-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="#">Arunachal</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="#">Assam</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="#">Manipur</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="#">Meghalaya</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="#">Mizoram</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="#">Nagaland</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="#">Sikkim</a>
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="#">Tripura</a>
            </div>
          </div>
          <a className="text-on-surface-variant dark:text-on-secondary-fixed-dim hover:text-[#1d4ed8] transition-colors text-label-md font-label-md focus:outline-none focus:ring-2 focus:ring-primary rounded opacity-80 hover:opacity-100 font-semibold" href="#">RTI</a>
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1 text-on-surface-variant dark:text-on-secondary-fixed-dim hover:text-[#1d4ed8] transition-colors text-label-md font-label-md focus:outline-none focus:ring-2 focus:ring-primary rounded opacity-80 hover:opacity-100 font-semibold">
              Publication <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
            <div className="absolute right-0 top-full mt-0 w-48 bg-surface-container-lowest border border-outline-variant rounded-b-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <a className="block px-4 py-2 text-body-md hover:bg-surface-variant hover:text-[#1d4ed8]" href="#">Annual Reports</a>
            </div>
          </div>
        </nav>
        <div className="w-full h-1 bg-gradient-to-r from-saffron via-surface-container-lowest to-green-600"></div>
      </div>
    </>
  );
}
