import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback | North East Zone Cultural Centre",
  description: "We value your input and welcome any suggestions, grievances, or feedback.",
};

export default function FeedbackPage() {
  return (
    <main className="flex-grow w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg ">
      {/* Header Section */}
      <section className="mb-stack-lg text-center md:text-left">
        <h2 className="font-serif font-medium md:font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-surface mb-stack-sm">
          Public Feedback &amp; Suggestions
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          The North East Zone Cultural Centre is committed to continuous improvement and
          transparency. We value your input and welcome any suggestions, grievances, or
          feedback regarding our cultural programs, website experience, or general
          operations.
        </p>
      </section>
      
      {/* Feedback Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Form Container */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-outline-variant p-stack-lg">
          <form className="flex flex-col gap-stack-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Full Name */}
              <div className="flex flex-col gap-unit">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="fullName">
                  Full Name <span className="text-error">*</span>
                </label>
                <input
                  className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all duration-200"
                  id="fullName"
                  name="fullName"
                  required
                  type="text"
                />
              </div>
              {/* Email Address */}
              <div className="flex flex-col gap-unit">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="email">
                  Email Address <span className="text-error">*</span>
                </label>
                <input
                  className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all duration-200"
                  id="email"
                  name="email"
                  required
                  type="email"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Phone Number */}
              <div className="flex flex-col gap-unit">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all duration-200"
                  id="phone"
                  name="phone"
                  type="tel"
                />
              </div>
              {/* Subject */}
              <div className="flex flex-col gap-unit">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="subject">
                  Subject of Feedback <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all duration-200 pr-10"
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                  >
                    <option disabled value="">
                      Select an option
                    </option>
                    <option value="general">General Suggestion</option>
                    <option value="grievance">Grievance</option>
                    <option value="website">Website Experience</option>
                    <option value="program">Cultural Program Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  <span
                    className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
                    aria-hidden="true"
                  >
                    arrow_drop_down
                  </span>
                </div>
              </div>
            </div>
            {/* Message */}
            <div className="flex flex-col gap-unit">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="message">
                Detailed Message/Feedback <span className="text-error">*</span>
              </label>
              <textarea
                className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all duration-200 resize-y"
                id="message"
                name="message"
                required
                rows={6}
              />
            </div>
            {/* Submit Button */}
            <div className="pt-stack-sm flex justify-end">
              <button
                className="bg-primary-container hover:bg-primary-fixed-variant text-on-primary font-label-md text-label-md font-bold py-3 px-8 rounded-DEFAULT transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container flex items-center gap-2 min-h-[44px]"
                type="submit"
              >
                Submit Feedback
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  send
                </span>
              </button>
            </div>
          </form>
        </div>
        
        {/* Contextual Information Card */}
        <div className="lg:col-span-4 flex flex-col gap-stack-md">
          <div className="bg-surface-container-low rounded-xl border border-outline-variant p-stack-md flex flex-col gap-stack-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-500" />
            <div className="flex items-center gap-3 text-primary mb-2">
              <span
                className="material-symbols-outlined text-3xl text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                policy
              </span>
              <h3 className="font-serif font-medium text-headline-md font-medium">
                Our Promise
              </h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant relative z-10">
              Every submission is reviewed by our dedicated public relations team. We
              aim to respond to specific inquiries within 3-5 working days.
            </p>
            <div className="mt-stack-sm pt-stack-sm border-t border-outline-variant flex items-center gap-2 relative z-10">
              <span className="material-symbols-outlined text-primary text-sm" aria-hidden="true">
                mail
              </span>
              <a
                className="font-label-md text-label-md text-primary hover:underline"
                href="mailto:nezccdimapur@yahoo.co.in"
              >
                nezccdimapur@yahoo.co.in
              </a>
            </div>
          </div>
          {/* Subtle Decorative Element */}
          <div className="bg-surface-container-highest rounded-xl p-stack-md flex items-center justify-center opacity-70">
            <img
              className="w-full h-32 object-cover rounded-lg mix-blend-multiply opacity-50"
              alt="Decorative weave texture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKAgOOawAuyS1JPLQAs3GM0Y1Tzos3zFtNfI-svNjNP_1TVR7VVN6g6TLE1OyPEWLspWDUyETY64x5--YGR7665Y-DUOb5hjJ91I0Uo-EKmGBai2IXbQpNGmj-8hG9e9XxPnIZlokZIyockdJpAsspkPeBT-WMCfl07EQYgysNl5v5TBggBZUQEhrqbP9IQiqUs8WKis5VNRY4osskYnJcB4Z9_LwrFy7lozbvKX_2j4mXHnqskrDUzg"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
