'use client';
import React from 'react';

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe clicked');
  };

  return (
    <footer className="bg-on-surface dark:bg-surface-container-lowest text-surface-container-lowest dark:text-on-surface w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max-width mx-auto">
        <div className="flex flex-col gap-stack-sm">
          <a className="text-headline-sm font-headline-sm font-bold text-surface-container-lowest dark:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded inline-block w-max" href="#">
            <div className="bg-white p-2 rounded">
              <img alt="NEZCC Logo" className="h-12 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlI9XNKu55kqQDuiSb1yucMIPYq3bgVIj9ENFBrKYXLZkcO-bFfPC3ZiyIkqzPxgNTRsdxp_49jnPx3h_3G4uyi5MeYVz0Goi8dYg0Z8cugO7jXk4CKjzfT-63r7ngof-rN2bcsx3ddHGyJD1A8yEb-aUyxv1zaxN-t1LUOJXBjPXMFIRPbYtrnF5zP7YcsAmCvyHms_faVRs4mlnar7I5CArrxEaooRq_M8n688tipD1PwDpwYdFV-CgQV8w5WW_DRuI" />
            </div>
          </a>
          <p className="text-body-md font-body-md text-surface-variant mt-2 max-w-xs">
            Preserving and promoting the rich cultural heritage of North East India.
          </p>
        </div>
        <div className="flex flex-col gap-stack-sm">
          <h4 className="text-label-md font-label-md font-semibold text-white uppercase tracking-wider mb-2">About</h4>
          <nav className="flex flex-col gap-2">
            <a className="text-surface-variant dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary rounded w-max" href="#">Overview</a>
            <a className="text-surface-variant dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary rounded w-max" href="#">Leadership</a>
            <a className="text-surface-variant dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary rounded w-max" href="#">Careers</a>
          </nav>
        </div>
        <div className="flex flex-col gap-stack-sm">
          <h4 className="text-label-md font-label-md font-semibold text-white uppercase tracking-wider mb-2">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            <a className="text-surface-variant dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary rounded w-max" href="#">Grants &amp; Funding</a>
            <a className="text-surface-variant dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary rounded w-max" href="#">Publications</a>
            <a className="text-surface-variant dark:text-on-surface-variant hover:text-white dark:hover:text-primary transition-colors text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary rounded w-max" href="#">RTI</a>
          </nav>
        </div>
        <div className="flex flex-col gap-stack-sm">
          <h4 className="text-label-md font-label-md font-semibold text-white uppercase tracking-wider mb-2">Contact &amp; Newsletter</h4>
          <address className="text-surface-variant text-body-md font-body-md not-italic mb-4">
            Dimapur, Nagaland<br />
            India - 797112<br />
            <a className="hover:text-white underline underline-offset-4 mt-2 inline-block" href="mailto:info@nezcc.in">info@nezcc.in</a>
          </address>
          <form className="flex flex-col gap-2 mt-auto" onSubmit={handleSubscribe}>
            <label className="sr-only" htmlFor="newsletter-email">Email for newsletter</label>
            <div className="flex gap-2">
              <input className="w-full bg-inverse-surface border border-outline text-white px-3 py-2 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md font-body-md h-11" id="newsletter-email" placeholder="Email Address" required type="email" />
              <button className="bg-primary-container text-white px-4 py-2 rounded-md hover:bg-surface-tint focus:outline-none focus:ring-2 focus:ring-primary font-label-md text-label-md font-semibold h-11" type="submit">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-inverse-surface mt-stack-lg bg-[#050f1a]">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-md flex flex-col md:flex-row justify-between items-center gap-4 text-surface-variant text-caption font-caption">
          <p>© 2026 North East Zone Cultural Centre. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a className="hover:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded" href="#">Privacy Policy</a>
            <a className="hover:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded" href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
