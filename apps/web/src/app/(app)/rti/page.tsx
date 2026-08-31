import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Right to Information (RTI) | North East Zone Cultural Centre',
  description: 'Access RTI authorities, statutory disclosures, and filing guidance for NEZCC.',
}

type LinkedMedia = { url?: string | null }

const getDocumentURL = (document: string | number | LinkedMedia | null | undefined, externalURL?: string | null) => {
  if (typeof document === 'object' && document?.url) return document.url
  return externalURL || null
}

export default async function RTIPage() {
  const payload = await getPayloadClient()
  const page = await payload.findGlobal({ slug: 'rti-page', depth: 1 })
  const authorities = page.authorities || []
  const disclosures = page.disclosures || []
  const filingSteps = page.filingSteps || []
  const paymentMethods = page.paymentMethods || []
  const suoMotuURL = getDocumentURL(page.suoMotuDocument, page.suoMotuExternalURL)

  return (
    <main className="flex-grow w-full px-margin-desktop max-w-container-max-width mx-auto py-stack-lg flex flex-col gap-stack-lg mt-8 mb-16">
      <header className="flex flex-col gap-stack-md border-b border-outline-variant pb-stack-md">
        <h1 className="font-serif font-medium text-headline-xl text-on-surface md:text-headline-xl text-headline-xl-mobile">
          {page.pageTitle}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl whitespace-pre-wrap">
          {page.pageDescription}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8 flex flex-col gap-stack-lg">
          <section className="flex flex-col gap-stack-md">
            <h2 className="font-serif font-medium text-headline-lg text-primary border-b-2 border-surface-container-high pb-2 inline-block self-start">
              {page.authoritiesSectionTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              {authorities.map((authority) => (
                <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow" key={authority.id || authority.title}>
                  <div className="flex items-center gap-stack-sm mb-stack-sm">
                    <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                      {authority.icon || 'person'}
                    </span>
                    <h3 className="font-serif font-medium text-headline-md text-on-surface">{authority.title}</h3>
                  </div>
                  <div className="flex flex-col gap-unit">
                    <p className="font-label-md text-label-md text-on-surface-variant">{authority.name}</p>
                    {authority.designation && <p className="font-body-md text-body-md text-on-surface-variant">{authority.designation}</p>}
                    {authority.email && (
                      <div className="flex items-center gap-unit mt-stack-sm">
                        <span className="material-symbols-outlined text-outline text-sm" aria-hidden="true">mail</span>
                        <a className="text-primary hover:underline font-body-md text-body-md break-all" href={`mailto:${authority.email}`}>{authority.email}</a>
                      </div>
                    )}
                    {authority.phone && (
                      <div className="flex items-center gap-unit">
                        <span className="material-symbols-outlined text-outline text-sm" aria-hidden="true">call</span>
                        <a className="font-body-md text-body-md text-on-surface-variant hover:underline" href={`tel:${authority.phone}`}>{authority.phone}</a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-stack-md">
            <h2 className="font-serif font-medium text-headline-lg text-primary border-b-2 border-surface-container-high pb-2 inline-block self-start">
              {page.disclosuresSectionTitle}
            </h2>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
              <ul className="divide-y divide-surface-container-high">
                {disclosures.map((disclosure) => {
                  const documentURL = getDocumentURL(disclosure.document, disclosure.externalURL)
                  return (
                    <li className="flex items-center justify-between p-stack-md hover:bg-surface-container-low transition-colors" key={disclosure.id || disclosure.title}>
                      <div className="flex items-center gap-stack-sm">
                        <span className="material-symbols-outlined text-primary" aria-hidden="true">description</span>
                        <span className="font-body-md text-body-md text-on-surface">{disclosure.title}</span>
                      </div>
                      {documentURL && (
                        <a aria-label={`Open ${disclosure.title}`} className="text-tertiary hover:text-primary-container p-2 rounded focus:ring-2 focus:ring-primary focus:outline-none" href={documentURL} target="_blank" rel="noreferrer">
                          <span className="material-symbols-outlined" aria-hidden="true">download</span>
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>

          <section className="flex flex-col gap-stack-md">
            <h2 className="font-serif font-medium text-headline-lg text-primary border-b-2 border-surface-container-high pb-2 inline-block self-start">{page.suoMotuTitle}</h2>
            <div className="bg-surface-container-low border border-surface-container-high rounded-lg p-stack-md">
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-sm whitespace-pre-wrap">{page.suoMotuDescription}</p>
              {suoMotuURL && page.suoMotuLinkLabel && (
                <a className="inline-flex items-center gap-unit text-primary font-label-md text-label-md hover:underline" href={suoMotuURL} target="_blank" rel="noreferrer">
                  {page.suoMotuLinkLabel}
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                </a>
              )}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 flex flex-col gap-stack-lg">
          <div className="bg-surface-bright border border-outline-variant rounded-lg p-stack-md shadow-sm">
            <h3 className="font-serif font-medium text-headline-md text-on-surface mb-stack-sm flex items-center gap-unit">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">help</span>
              {page.filingTitle}
            </h3>
            <ol className="list-decimal list-inside font-body-md text-body-md text-on-surface-variant space-y-2 mb-stack-md">
              {filingSteps.map((step) => <li key={step.id || step.text}>{step.text}</li>)}
            </ol>
            {paymentMethods.length > 0 && (
              <div className="bg-surface-container-low p-stack-sm rounded border border-surface-container-high">
                <h4 className="font-label-md text-label-md text-on-surface mb-1">{page.paymentMethodsTitle}</h4>
                <ul className="font-body-md text-body-md text-on-surface-variant list-disc list-inside">
                  {paymentMethods.map((method) => <li key={method.id || method.text}>{method.text}</li>)}
                </ul>
              </div>
            )}
          </div>

          <a className="bg-primary-container text-on-primary rounded-lg p-stack-md shadow-md hover:shadow-lg transition-all flex items-center justify-between group min-h-[44px] focus:ring-2 focus:ring-primary focus:ring-offset-2 outline-none" href={page.portalURL} target="_blank" rel="noreferrer">
            <div className="flex flex-col">
              <span className="text-[20px] leading-[28px] font-bold">{page.portalTitle}</span>
              {page.portalSubtitle && <span className="font-caption text-caption opacity-90">{page.portalSubtitle}</span>}
            </div>
            <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform" aria-hidden="true">open_in_new</span>
          </a>

          <div className="bg-error-container text-on-error-container rounded-lg p-stack-md border border-error/20 flex items-start gap-stack-sm">
            <span className="material-symbols-outlined mt-1" aria-hidden="true">info</span>
            <div>
              <h4 className="font-label-md text-label-md mb-1">{page.noticeTitle}</h4>
              <p className="font-caption text-caption whitespace-pre-wrap">{page.noticeText}</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
