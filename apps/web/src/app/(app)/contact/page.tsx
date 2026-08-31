import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | North East Zone Cultural Centre",
  description: "Get in touch with the North East Zone Cultural Centre. We are here to assist you with any inquiries.",
};

export default function ContactPage() {
  return (
    <main className="flex-grow ">
      {/* Hero Section */}
      <section className="bg-surface-container-low py-16 md:py-24 border-b border-outline-variant"
               style={{
                 backgroundImage: "radial-gradient(#dce1ff 1px, transparent 1px)",
                 backgroundSize: "20px 20px"
               }}
      >
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h1 className="font-serif font-medium md:font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-primary mb-4">
            Contact Us
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Get in touch with the North East Zone Cultural Centre. We are here to assist you
            with any inquiries regarding our cultural programs, events, and initiatives.
          </p>
        </div>
      </section>

      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg">
          {/* Contact Information Column */}
          <div className="lg:col-span-1 space-y-stack-md">
            {/* Head Office Card */}
            <div className="bg-surface rounded-lg border border-outline-variant p-6 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 ease-out">
              <div className="flex items-center mb-4 text-primary">
                <span className="material-symbols-outlined mr-3 text-[32px]" aria-hidden="true">
                  location_city
                </span>
                <h2 className="font-serif font-medium text-headline-md">Head Office</h2>
              </div>
              <div className="space-y-3 font-body-md text-body-md text-on-surface">
                <p>
                  North East Zone Cultural Centre,<br />
                  Post Box No. 139,<br />
                  Dimapur - 797112, Nagaland.
                </p>
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-2 text-outline" aria-hidden="true">
                    call
                  </span>
                  <span>+91 3862 243557</span>
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-2 text-outline" aria-hidden="true">
                    mail
                  </span>
                  <span>nezccdimapur@yahoo.com</span>
                </div>
              </div>
            </div>
            
            {/* Director's Office Card */}
            <div className="bg-surface rounded-lg border border-outline-variant p-6 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 ease-out">
              <div className="flex items-center mb-4 text-secondary">
                <span className="material-symbols-outlined mr-3 text-[32px]" aria-hidden="true">
                  person_check
                </span>
                <h2 className="font-serif font-medium text-headline-md">
                  Director's Office
                </h2>
              </div>
              <div className="space-y-3 font-body-md text-body-md text-on-surface">
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-2 text-outline" aria-hidden="true">
                    call
                  </span>
                  <span>+91 3862 243556 (Direct)</span>
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-2 text-outline" aria-hidden="true">
                    mail
                  </span>
                  <span>director@nezcc.gov.in</span>
                </div>
              </div>
            </div>
            
            {/* Office Hours Card */}
            <div className="bg-surface-container-low rounded-lg border border-outline-variant p-6 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 ease-out">
              <div className="flex items-center mb-4 text-on-surface">
                <span className="material-symbols-outlined mr-3 text-[32px]" aria-hidden="true">
                  schedule
                </span>
                <h2 className="font-serif font-medium text-headline-md">Office Hours</h2>
              </div>
              <ul className="space-y-2 font-body-md text-body-md text-on-surface-variant">
                <li className="flex justify-between border-b border-outline-variant pb-2">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">9:30 AM - 5:30 PM</span>
                </li>
                <li className="flex justify-between pt-2">
                  <span>Saturday, Sunday &amp; Public Holidays</span>
                  <span className="font-semibold text-error">Closed</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Form & Map Column */}
          <div className="lg:col-span-2 space-y-stack-lg">
            {/* Contact Form */}
            <div className="bg-surface rounded-lg border border-outline-variant p-6 md:p-8 shadow-sm">
              <h2 className="font-serif font-medium text-headline-lg text-on-surface mb-6 border-b border-outline-variant pb-4">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="font-label-md text-label-md text-on-surface mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-surface border border-outline rounded p-3 text-body-md focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-200 ease-out"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      required
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label-md text-label-md text-on-surface mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      className="w-full bg-surface border border-outline rounded p-3 text-body-md focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-200 ease-out"
                      id="email"
                      name="email"
                      placeholder="Enter your email address"
                      required
                      type="email"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="font-label-md text-label-md text-on-surface mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    className="w-full bg-surface border border-outline rounded p-3 text-body-md focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-200 ease-out"
                    id="subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    required
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-label-md text-label-md text-on-surface mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="w-full bg-surface border border-outline rounded p-3 text-body-md focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-200 ease-out resize-y"
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    required
                    rows={5}
                  />
                </div>
                <button
                  className="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded border-2 border-transparent hover:border-primary-container focus:border-primary-container focus:ring-2 focus:ring-primary-container focus:outline-none active:scale-[0.97] transition-all duration-150 ease-out min-h-[44px] flex items-center justify-center w-full md:w-auto"
                  type="submit"
                >
                  <span className="material-symbols-outlined mr-2" aria-hidden="true">
                    send
                  </span>
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Interactive Map Section */}
            <div className="bg-surface rounded-lg border border-outline-variant overflow-hidden shadow-sm h-96 relative active:scale-[0.99] transition-transform duration-200 ease-out">
              {/* Map Image Placeholder */}
              <img
                className="w-full h-full object-cover"
                alt="NEZCC Location Map"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGrRN2cGyF-JT44TFg3ImVXr4evzmLIA_eisckdqLWtSK_T-0OAbJWcX4GrjFUlzkUuFC9uHNgBNGAeipN3GyGzap1jAMJRSkCDypukxcY8T7ur_W84kX4P6Z9JL4zVQqbdrXAm3CP3JRJ5A-BL2ZGHffzdBmuKt_-IDQKXx1x0LScPlEhqgp44wWO1sQ61Kdy03pG7nFKUa3RWxbnYmqbafvCjx87g1wB_ghJrGlDVOL1qZk8cAwz9g"
              />
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 bg-surface/90 backdrop-blur-sm border border-outline-variant p-4 rounded-lg shadow-lg">
                <div className="flex items-start">
                  <span className="material-symbols-outlined text-primary mr-2 mt-1" aria-hidden="true">
                    pin_drop
                  </span>
                  <div>
                    <h3 className="font-label-md text-label-md font-medium text-on-surface">
                      NEZCC Location
                    </h3>
                    <p className="font-caption text-caption text-on-surface-variant mt-1">
                      Post Box No. 139, Dimapur - 797112, Nagaland, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
