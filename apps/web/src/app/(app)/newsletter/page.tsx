import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | North East Zone Cultural Centre",
  description: "Stay connected with the vibrant cultural tapestry of North East India.",
};

export default function NewsletterPage() {
  return (
    <main className="flex-grow ">
      {/* Hero Section */}
      <section className="relative bg-surface-container-lowest py-16 md:py-24 overflow-hidden border-b border-outline-variant">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 100% 0%, var(--tw-colors-primary-container) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col md:flex-row items-center gap-stack-lg">
          <div className="md:w-1/2 flex flex-col gap-stack-md">
            <h1 className="font-serif font-medium md:font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-primary font-medium">
              NEZCC Newsletter
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Stay connected with the vibrant cultural tapestry of North East India.
              Subscribe to receive updates on upcoming events, specialized workshops,
              cultural publications, and institutional news directly to your inbox.
            </p>
          </div>
          <div className="md:w-1/2 w-full mt-8 md:mt-0">
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-md border-t-4 border-t-[#FF9933] flex flex-col gap-stack-md border-x border-b border-white/50">
              <h2 className="font-serif font-medium text-headline-md text-on-surface">
                Subscribe Now
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Join our mailing list to receive quarterly updates.
              </p>
              <form className="flex flex-col gap-stack-sm mt-2">
                <label
                  className="font-label-md text-label-md text-on-surface"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    className="flex-grow bg-surface-container-lowest border border-outline rounded p-3 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container/20 transition-all"
                    id="email"
                    placeholder="enter.your@email.com"
                    type="email"
                    required
                  />
                  <button
                    className="bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-md text-label-md py-3 px-6 rounded min-w-[140px] flex items-center justify-center gap-2"
                    type="submit"
                  >
                    Subscribe{" "}
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      send
                    </span>
                  </button>
                </div>
                <p className="font-caption text-caption text-outline mt-1 text-center sm:text-left">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Issue Featured */}
      <section className="py-16 md:py-24 bg-surface-container-low">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center gap-2 mb-8">
            <span
              className="material-symbols-outlined text-primary text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              new_releases
            </span>
            <h2 className="font-serif font-medium text-headline-lg text-on-surface">
              Latest Issue
            </h2>
          </div>
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-surface-variant p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-outline-variant">
              {/* Placeholder for Cover Image */}
              <div className="w-full max-w-[280px] aspect-[1/1.414] bg-surface shadow-md relative overflow-hidden group">
                <div
                  className="bg-cover bg-center w-full h-full transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-uzO42k2DhoC8dr7Cr_vF9kRzLZQxzMJtfHRM7x3mB-BmLY4d5ouWrkFLTy0lkNdbw_-oKVPmTMdL6yeAjmbmT1zG0mvMkfIgTe6IkAwcKGGikywJj_h9aU-4BK70RkTrMHs-fYLEBqkNjQxpBn4-PNgyWD4QvdIeaoBMpAn3_LrlTwGJqHFNIes5erzVx93S7BO30Io19VM9oepN5flTYGK4yJhjn6iMRGyIe4JkeRkIOxyg92F02g')",
                  }}
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-transparent group-hover:text-white text-4xl drop-shadow-md transition-colors duration-300" aria-hidden="true">
                    download
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 p-8 flex flex-col justify-center gap-stack-md">
              <div className="flex items-center gap-2">
                <span className="bg-[#FF9933]/10 text-[#d97706] font-label-md text-label-md px-3 py-1 rounded-full border border-[#FF9933]/30">
                  Vol. 14, Issue 3
                </span>
                <span className="text-on-surface-variant font-caption text-caption">
                  Quarter 3, 2024
                </span>
              </div>
              <h3 className="font-serif font-medium text-headline-md text-primary">
                Echoes of the East: Autumn Edition
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                In this edition, we explore the rich harvest festivals celebrated across
                the North Eastern states. Highlights include an exclusive feature on the
                Hornbill Festival preparations, a retrospective on indigenous weaving
                techniques, and a report on the successful conclusion of the recent
                youth cultural exchange program.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button className="bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-md text-label-md py-3 px-6 rounded flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined" aria-hidden="true">picture_as_pdf</span>{" "}
                  Download PDF (2.4 MB)
                </button>
                <button className="border-2 border-primary-container text-primary-container hover:bg-surface-container transition-colors font-label-md text-label-md py-3 px-6 rounded flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined" aria-hidden="true">visibility</span> Read
                  Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[28px]" aria-hidden="true">
                auto_stories
              </span>
              <h2 className="font-serif font-medium text-headline-lg text-on-surface">
                Newsletter Archive
              </h2>
            </div>
            {/* Filter/Sort Dropdown Mockup */}
            <div className="relative inline-block w-48">
              <select className="block w-full bg-surface-container-lowest border border-outline-variant text-on-surface py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-primary font-body-md appearance-none">
                <option>Year: 2024</option>
                <option>Year: 2023</option>
                <option>Year: 2022</option>
                <option>All Years</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
                <span className="material-symbols-outlined" aria-hidden="true">arrow_drop_down</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {/* Archive Item 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:shadow-md transition-shadow flex gap-4 items-start group">
              <div className="w-24 h-32 shrink-0 bg-surface-variant border border-outline-variant/50 relative overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDa6A0tUQyYJ3IkIdceSze7Vm0bH-e3m9Nt5CLqpY4582uLtS-TPooORRN8D0L_gQ4rzqZ1fSKz0Es8H-883MvbnLRXSYiFTWKmgwOXc5bNpVjrib1_SsmeY40KfjiZu_3ksJMhYWxzB87am9A8SZQMc8SQakWVOyc9iL8pPnujEQsJtnDIfnVhNpnvGRRjWSAgNBMWc34dWQsiELIrbKcYkPIV3u7ASVoyjBRfXv1wwzFEhTK0gpIIww')",
                  }}
                />
              </div>
              <div className="flex flex-col flex-grow h-full justify-between">
                <div>
                  <div className="text-outline font-caption text-caption mb-1">
                    Vol. 14, Issue 2 â€¢ Q2 2024
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                    Summer Melodies &amp; Monsoon Rhythms
                  </h4>
                </div>
                <button className="text-primary font-label-md text-label-md flex items-center gap-1 mt-4 hover:underline w-fit">
                  Download <span className="material-symbols-outlined text-[16px]" aria-hidden="true">download</span>
                </button>
              </div>
            </div>
            {/* Archive Item 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:shadow-md transition-shadow flex gap-4 items-start group">
              <div className="w-24 h-32 shrink-0 bg-surface-variant border border-outline-variant/50 relative overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJMhEvAmFtQQ5R8xFnPPCfeIhhnARTJW4oOdSin4Ddpd8jAYZjx-07SqLtgXeoMp82EqyHpKMvgwgU_UmNPHaUeNpQCp62lDD1XMS6osi32GQNfLONkm7ZYwzIeqm1yFb1NyrjiRCqXr2jQNA2V4RfSAvoKnWbq5NOaHZi4tQxI7Gg4mWKH-bOXoKqbD14orZIq6kIx5CDuGMLygGWnc4pnOxkrk1CfdpKgkxBF_WtW2gICnnR95tlmQ')",
                  }}
                />
              </div>
              <div className="flex flex-col flex-grow h-full justify-between">
                <div>
                  <div className="text-outline font-caption text-caption mb-1">
                    Vol. 14, Issue 1 â€¢ Q1 2024
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                    Spring Heritage Festival Review
                  </h4>
                </div>
                <button className="text-primary font-label-md text-label-md flex items-center gap-1 mt-4 hover:underline w-fit">
                  Download <span className="material-symbols-outlined text-[16px]" aria-hidden="true">download</span>
                </button>
              </div>
            </div>
            {/* Archive Item 3 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:shadow-md transition-shadow flex gap-4 items-start group">
              <div className="w-24 h-32 shrink-0 bg-surface-variant border border-outline-variant/50 relative overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCisatOuZlTDDvFzGjafrHkGEdVluh8HQeVBWq9LSRq1ULc_VMmYckjxPbPPAXQUth29bY6n-ZsTu8hbFFLWLQqL3m2PFCasPHobMY807wH7c_Fcti0uuFLOLZnxnHCqC-SeEainNkjksKvLJ0CP02LKGeVIJ8iW60HYoTLoH8abZ741VOSQd74OYn30p63SH8blynGeWyX5PT7E94-Vak0kibpWSEnDeAPTvYfgcVm95F5ypFcAfNcnQ')",
                  }}
                />
              </div>
              <div className="flex flex-col flex-grow h-full justify-between">
                <div>
                  <div className="text-outline font-caption text-caption mb-1">
                    Vol. 13, Issue 4 â€¢ Q4 2023
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                    Year in Review: Cultural Milestones
                  </h4>
                </div>
                <button className="text-primary font-label-md text-label-md flex items-center gap-1 mt-4 hover:underline w-fit">
                  Download <span className="material-symbols-outlined text-[16px]" aria-hidden="true">download</span>
                </button>
              </div>
            </div>
            {/* Archive Item 4 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:shadow-md transition-shadow flex gap-4 items-start group">
              <div className="w-24 h-32 shrink-0 bg-surface-variant border border-outline-variant/50 relative overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBClClh6BPKfW9ONCnNnZkFMhV3ccY5aRfZmOTITnP8DpFlokVty9Li0xszLQEPQMEsdXYB9_iK5alKM1eoh6iLTLUOcKT3ZhCL09qN6zZHIRekym3ewB1MRjq6XcZanu-8UlReyZd6bJzCY8YsL5B_kO-enK0wqfb5f07koIP-C3Zy88YTY9jZT55B0djTfHKyXLB5Y3eZTeTQo2XV77PD3RSA_r4ajJqhzr5HcNXsB07Nbq6uc4u02w')",
                  }}
                />
              </div>
              <div className="flex flex-col flex-grow h-full justify-between">
                <div>
                  <div className="text-outline font-caption text-caption mb-1">
                    Vol. 13, Issue 3 â€¢ Q3 2023
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                    Artisan Grant Scheme Announcements
                  </h4>
                </div>
                <button className="text-primary font-label-md text-label-md flex items-center gap-1 mt-4 hover:underline w-fit">
                  Download <span className="material-symbols-outlined text-[16px]" aria-hidden="true">download</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button className="text-primary hover:text-primary-container font-label-md text-label-md py-2 px-4 rounded border border-outline-variant hover:border-primary transition-colors flex items-center gap-2 bg-surface-container-lowest">
              Load More Issues <span className="material-symbols-outlined" aria-hidden="true">expand_more</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
