import { Metadata } from 'next'
import FeedbackForm from '@/components/feedback/FeedbackForm'

export const metadata: Metadata = {
  title: 'Feedback | North East Zone Cultural Centre',
  description: 'We value your input and welcome any suggestions, grievances, or feedback.',
}

export default function FeedbackPage() {
  return (
    <main className="flex-grow w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
      <section className="mb-stack-lg text-center md:text-left">
        <h1 className="font-serif font-medium text-headline-xl-mobile md:text-headline-xl text-on-surface mb-stack-sm">
          Public Feedback &amp; Suggestions
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          The North East Zone Cultural Centre is committed to continuous improvement and
          transparency. We value your input and welcome any suggestions, grievances, or
          feedback regarding our cultural programs, website experience, or general
          operations.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-outline-variant p-stack-lg">
          <FeedbackForm />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-stack-md">
          <div className="bg-surface-container-low rounded-lg border border-outline-variant p-stack-md flex flex-col gap-stack-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-500" />
            <div className="flex items-center gap-3 text-primary mb-2">
              <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                policy
              </span>
              <h2 className="font-serif font-medium text-headline-md">
                Our Promise
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant relative z-10">
              Every submission is reviewed by our dedicated public relations team. We
              aim to respond to specific inquiries within 3-5 working days.
            </p>
            <div className="mt-stack-sm pt-stack-sm border-t border-outline-variant flex items-center gap-2 relative z-10">
              <span className="material-symbols-outlined text-primary text-sm" aria-hidden="true">
                mail
              </span>
              <a className="font-label-md text-label-md text-primary hover:underline" href="mailto:nezccdimapur@yahoo.co.in">
                nezccdimapur@yahoo.co.in
              </a>
            </div>
          </div>

          <div className="bg-surface-container-highest rounded-lg p-stack-md flex items-center justify-center opacity-70">
            <img
              className="w-full h-32 object-cover rounded-lg mix-blend-multiply opacity-50"
              alt="Decorative weave texture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKAgOOawAuyS1JPLQAs3GM0Y1Tzos3zFtNfI-svNjNP_1TVR7VVN6g6TLE1OyPEWLspWDUyETY64x5--YGR7665Y-DUOb5hjJ91I0Uo-EKmGBai2IXbQpNGmj-8hG9e9XxPnIZlokZIyockdJpAsspkPeBT-WMCfl07EQYgysNl5v5TBggBZUQEhrqbP9IQiqUs8WKis5VNRY4osskYnJcB4Z9_LwrFy7lozbvKX_2j4mXHnqskrDUzg"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
