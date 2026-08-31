import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Right to Information (RTI) | North East Zone Cultural Centre",
  description: "The Right to Information Act, 2005 mandates timely response to citizen requests for government information.",
};

export default function RTIPage() {
  return (
    <main className="flex-grow w-full px-margin-desktop max-w-container-max-width mx-auto py-stack-lg flex flex-col gap-stack-lg mt-8 mb-16 ">
      {/* Header Section */}
      <header className="flex flex-col gap-stack-md border-b border-outline-variant pb-stack-md">
        <h1 className="font-serif font-medium text-headline-xl text-on-surface md:text-headline-xl text-headline-xl-mobile">
          Right to Information
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          The Right to Information Act, 2005 mandates timely response to citizen
          requests for government information. The North East Zone Cultural
          Centre is committed to transparency and accountability in its
          functioning.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main Content Area */}
        <div className="lg:col-span-8 flex flex-col gap-stack-lg">
          {/* Public Authorities Bento Grid */}
          <section className="flex flex-col gap-stack-md">
            <h2 className="font-serif font-medium text-headline-lg text-primary border-b-2 border-surface-container-high pb-2 inline-block self-start">
              Authorities Under RTI Act
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              {/* CPIO Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-stack-sm mb-stack-sm">
                  <span
                    className="material-symbols-outlined text-tertiary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    person
                  </span>
                  <h3 className="font-serif font-medium text-headline-md text-on-surface">
                    Central Public Information Officer (CPIO)
                  </h3>
                </div>
                <div className="flex flex-col gap-unit">
                  <p className="font-label-md text-label-md text-on-surface-variant">
                    Shri. [Name]
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Deputy Director
                  </p>
                  <div className="flex items-center gap-unit mt-stack-sm">
                    <span className="material-symbols-outlined text-outline text-sm" aria-hidden="true">
                      mail
                    </span>
                    <a
                      className="text-primary hover:underline font-body-md text-body-md"
                      href="mailto:cpio@nezcc.in"
                    >
                      cpio@nezcc.in
                    </a>
                  </div>
                  <div className="flex items-center gap-unit">
                    <span className="material-symbols-outlined text-outline text-sm" aria-hidden="true">
                      call
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      +91-XXXXXXXXXX
                    </span>
                  </div>
                </div>
              </div>

              {/* Appellate Authority Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-stack-sm mb-stack-sm">
                  <span
                    className="material-symbols-outlined text-tertiary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    gavel
                  </span>
                  <h3 className="font-serif font-medium text-headline-md text-on-surface">
                    First Appellate Authority (FAA)
                  </h3>
                </div>
                <div className="flex flex-col gap-unit">
                  <p className="font-label-md text-label-md text-on-surface-variant">
                    Shri. [Name]
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Director
                  </p>
                  <div className="flex items-center gap-unit mt-stack-sm">
                    <span className="material-symbols-outlined text-outline text-sm" aria-hidden="true">
                      mail
                    </span>
                    <a
                      className="text-primary hover:underline font-body-md text-body-md"
                      href="mailto:dir@nezcc.in"
                    >
                      dir@nezcc.in
                    </a>
                  </div>
                  <div className="flex items-center gap-unit">
                    <span className="material-symbols-outlined text-outline text-sm" aria-hidden="true">
                      call
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      +91-XXXXXXXXXX
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Statutory Disclosures List */}
          <section className="flex flex-col gap-stack-md">
            <h2 className="font-serif font-medium text-headline-lg text-primary border-b-2 border-surface-container-high pb-2 inline-block self-start">
              Section 4(1)(b) Disclosures
            </h2>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
              <ul className="divide-y divide-surface-container-high">
                <li className="flex items-center justify-between p-stack-md hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-stack-sm">
                    <span className="material-symbols-outlined text-primary" aria-hidden="true">
                      description
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">
                      Organization Structure &amp; Functions
                    </span>
                  </div>
                  <button
                    aria-label="Download PDF"
                    className="text-tertiary hover:text-primary-container p-2 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">download</span>
                  </button>
                </li>
                <li className="flex items-center justify-between p-stack-md hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-stack-sm">
                    <span className="material-symbols-outlined text-primary" aria-hidden="true">
                      description
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">
                      Powers and Duties of Officers
                    </span>
                  </div>
                  <button
                    aria-label="Download PDF"
                    className="text-tertiary hover:text-primary-container p-2 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">download</span>
                  </button>
                </li>
                <li className="flex items-center justify-between p-stack-md hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-stack-sm">
                    <span className="material-symbols-outlined text-primary" aria-hidden="true">
                      description
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">
                      Rules, Regulations, Instructions, Manuals
                    </span>
                  </div>
                  <button
                    aria-label="Download PDF"
                    className="text-tertiary hover:text-primary-container p-2 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">download</span>
                  </button>
                </li>
                <li className="flex items-center justify-between p-stack-md hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-stack-sm">
                    <span className="material-symbols-outlined text-primary" aria-hidden="true">
                      description
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">
                      Directory of Officers and Employees
                    </span>
                  </div>
                  <button
                    aria-label="Download PDF"
                    className="text-tertiary hover:text-primary-container p-2 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">download</span>
                  </button>
                </li>
              </ul>
            </div>
          </section>

          {/* Suo Motu Disclosure */}
          <section className="flex flex-col gap-stack-md">
            <h2 className="font-serif font-medium text-headline-lg text-primary border-b-2 border-surface-container-high pb-2 inline-block self-start">
              Suo Motu Disclosure
            </h2>
            <div className="bg-surface-container-low border border-surface-container-high rounded-lg p-stack-md">
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-sm">
                In compliance with the RTI Act, NEZCC proactively discloses
                information to the public at regular intervals through various
                means of communications, including internet, so that the public
                have minimum resort to the use of this Act to obtain
                information.
              </p>
              <a
                className="inline-flex items-center gap-unit text-primary font-label-md text-label-md hover:underline"
                href="#"
              >
                View Full Suo Motu Disclosure
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  arrow_forward
                </span>
              </a>
            </div>
          </section>
        </div>

        {/* Sidebar / Auxiliary Info */}
        <aside className="lg:col-span-4 flex flex-col gap-stack-lg">
          {/* How to File Card */}
          <div className="bg-surface-bright border border-outline-variant rounded-lg p-stack-md shadow-sm">
            <h3 className="font-serif font-medium text-headline-md text-on-surface mb-stack-sm flex items-center gap-unit">
              <span
                className="material-symbols-outlined text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                help
              </span>
              How to File an RTI
            </h3>
            <ol className="list-decimal list-inside font-body-md text-body-md text-on-surface-variant space-y-2 mb-stack-md">
              <li>Write a formal application addressing the CPIO.</li>
              <li>Clearly specify the information required.</li>
              <li>Attach the application fee of â‚¹10/-.</li>
              <li>Send via post or submit in person.</li>
            </ol>
            <div className="bg-surface-container-low p-stack-sm rounded border border-surface-container-high">
              <h4 className="font-label-md text-label-md text-on-surface mb-1">
                Fee Payment Methods:
              </h4>
              <ul className="font-body-md text-body-md text-on-surface-variant list-disc list-inside">
                <li>Demand Draft / Banker's Cheque</li>
                <li>Indian Postal Order (IPO)</li>
                <li>Cash (against proper receipt)</li>
              </ul>
            </div>
          </div>

          {/* Online RTI Portal Link */}
          <a
            className="bg-primary-container text-on-primary rounded-lg p-stack-md shadow-md hover:shadow-lg transition-all flex items-center justify-between group min-h-[44px] focus:ring-2 focus:ring-primary focus:ring-offset-2 outline-none"
            href="#"
          >
            <div className="flex flex-col">
              <span className="text-[20px] leading-[28px] font-bold">
                File RTI Online
              </span>
              <span className="font-caption text-caption opacity-90">
                Visit rtionline.gov.in
              </span>
            </div>
            <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform" aria-hidden="true">
              open_in_new
            </span>
          </a>

          {/* Important Notice */}
          <div className="bg-error-container text-on-error-container rounded-lg p-stack-md border border-error/20 flex items-start gap-stack-sm">
            <span className="material-symbols-outlined mt-1" aria-hidden="true">info</span>
            <div>
              <h4 className="font-label-md text-label-md mb-1">Notice</h4>
              <p className="font-caption text-caption">
                Information related to national security or falling under
                exemptions of Section 8 of the RTI Act will not be disclosed.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
