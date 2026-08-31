import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member State: Sikkim | North East Zone Cultural Centre",
  description: "Sikkim is a sanctuary of profound spiritual heritage and unparalleled natural beauty.",
};

export default function SikkimPage() {
  return (
    <main className="w-full  md:-mt-[30px] relative z-0">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDS_fj-ldIzQFOw9U4Ehgge2mmfXgXVb2n4VUYisZghQiWoVJLrlq2SCkCRMjIylzbk3J81AAg6Li_CAQ2dHuw3vlCrkI_SkIC1SF1XZphrEA0XPDheqTu-D4PO9o4Cg8vgZXINJNvkglqGsP4c53mr3_MpR8pW8p1D01aar_AAChLEpQSfQvJTsfN9U8GiAqTat20Ag2wSDi9IR9JQ-17ON9OSN-JpjwGJTHRJmrNMg0fDXU95wF_VFg')",
            }}
          />
          <div className="absolute inset-0 bg-inverse-surface/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-stack-lg">
          <h1 className="font-serif font-medium text-headline-xl text-on-primary drop-shadow-lg">
            Sikkim: Land of Peace and Purity
          </h1>
          <p className="font-body-lg text-body-lg text-on-primary max-w-2xl drop-shadow-md">
            Nestled in the Himalayas, Sikkim is a sanctuary of profound spiritual
            heritage and unparalleled natural beauty, where ancient traditions
            harmonize with pristine landscapes.
          </p>
          <button className="mt-4 px-8 py-3 bg-primary-container text-on-primary font-label-md text-label-md rounded border-2 border-transparent hover:border-on-primary transition-all shadow-md focus:border-on-primary focus:outline-none">
            Explore Heritage
          </button>
        </div>
      </section>

      {/* 2. Heritage & Spiritual Legacy */}
      <section className="py-12 md:py-24 px-margin-desktop max-w-container-max-width mx-auto">
        <div className="flex flex-col md:flex-row gap-gutter items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-stack-md">
            <h2 className="font-serif font-medium text-headline-lg text-on-surface">
              Heritage &amp; Spiritual Legacy
            </h2>
            <div className="w-16 h-1 bg-primary mb-4" />
            <p className="font-body-md text-body-md text-on-surface-variant">
              Sikkim's cultural tapestry is deeply woven with Buddhist traditions.
              The spiritual legacy is visible in its numerous monasteries, sacred
              rituals, and exquisite art forms that have been preserved for centuries.
            </p>
            <ul className="flex flex-col gap-4 mt-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1" aria-hidden="true">
                  brush
                </span>
                <div>
                  <strong className="font-label-md text-label-md text-on-surface">
                    Thangka Paintings
                  </strong>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Intricate, sacred scrolls depicting Buddhist deities and mandalas,
                    demanding years of precise craftsmanship.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1" aria-hidden="true">
                  theater_comedy
                </span>
                <div>
                  <strong className="font-label-md text-label-md text-on-surface">
                    Mask Dances (Cham)
                  </strong>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Vibrant, rhythmic dances performed by monks during major festivals,
                    symbolizing the triumph of good over evil.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 relative h-[400px] rounded-xl overflow-hidden shadow-md">
            <img
              className="w-full h-full object-cover"
              alt="Cham mask dance"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmWEMHVOCldAnbR64G_4l6ESNklVR4qc85TRrlLKU0exuxYa1k-M7gKCxx2-DLM2CUuSDpXfcNo7lXJY4XMSM3VRO6Gq-fyyclAkZGri5JMoz1syPta6J2vuRLvnpTr7bAT0T9lO793SxTrMLBDT5tbO_OJYLD1FM3npoIwLGgzGig2ch_AYQE0Bfr4ZFG8nBYw20FnLC8YG3WHwz2p_tT1jAwWRahHtnRBAF-24QDNXGpR5JV3f0lfg"
            />
          </div>
        </div>
      </section>

      {/* 3. Cultural Highlights */}
      <section className="py-12 md:py-24 bg-surface-container-low">
        <div className="px-margin-desktop max-w-container-max-width mx-auto flex flex-col gap-stack-lg">
          <div className="text-center flex flex-col items-center gap-stack-sm">
            <h2 className="font-serif font-medium text-headline-lg text-on-surface">
              Cultural Highlights
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              A celebration of unity in diversity across the Lepcha, Bhutia, and Nepali communities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Highlight 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 w-full bg-surface-dim relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Pang Lhabsol festival"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2XHqwnR5x5eg2YOvUuGE9NQPaC86rUyIo0hQXcwPRVVif1Ide1cebd1mCq4Z0kb4FKHyZnbCAY2uUAIlL8k4Up0zmPB_uXoAFk9V7dfywUl_5HaA6EZDQj80Qv2GaxEEUFg3ZKYbOJLXhj99PuUHtPvIGjOfSOe9f010Pz-_oS87FICTE73mqx1prDENp6g50WwfR7W1KEb59YqtWJTE4H3SUWPqhZZ3208IK_O1haHei6aSjg_4GTg"
                />
              </div>
              <div className="p-6 flex flex-col gap-4">
                <h3 className="font-serif font-medium text-headline-md text-on-surface">
                  Pang Lhabsol
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  A unique festival paying homage to Mount Kanchenjunga, revered as
                  the guardian deity of Sikkim.
                </p>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 w-full bg-surface-dim relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Losar festival"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOL4AOQNhKqKvmQWT5Q-qCNlhm_dxZFu4TmKjoB6N9uD2z30vU6M86UQMFVOU4yRaFkJziRdyQ5DRJ-Y2m5w_SBXwyIE1BMwjU5r2vgy77fpF6VUWhdEcDpIDHVOLsAKKwhaWp-WhxRjJE8wBe0EcXcF5H1yTXclagM5jwi9z_Ezaw8w4nh4athtoLHN7Kb2Ewyja_dKEHqZ1KvrIsYwKf5PcOUs4daHAsFd-OFw1mUUF97HsSH_Qugg"
                />
              </div>
              <div className="p-6 flex flex-col gap-4">
                <h3 className="font-serif font-medium text-headline-md text-on-surface">
                  Losar
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  The Tibetan New Year, celebrated with grand traditional feasting,
                  cultural performances, and spiritual reflection.
                </p>
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 w-full bg-surface-dim relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Arts and Crafts"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLDbDgY_Hry2uapk-HyN7qlA41Tuwkeh9K-H5Cu778S6ho2B0_cSHhOX8Niaw9Bn58Ycg4B_9zm_YelzCrpQFGktMnsCYW3JHZWyixKAkn9C12UpcdRyrpb429jekzAHV4BHiFoYiz5d9KYp4qjNNFh36UKuPgz5x_2OQYCGBQyxjvspjZ4mvvA20KqzUhNnT0IpEnGk9r9b5w3rCX0DRxGr1mC5SyBiopITh2SiX0NdcLqroww-emlA"
                />
              </div>
              <div className="p-6 flex flex-col gap-4">
                <h3 className="font-serif font-medium text-headline-md text-on-surface">
                  Arts &amp; Crafts
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Highlighting masterful wood carving, carpet weaving, and the intricate
                  jewelry of the indigenous communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Geography & Environment */}
      <section className="py-12 md:py-24 px-margin-desktop max-w-container-max-width mx-auto">
        <div className="bg-white/70 backdrop-blur-md rounded-xl p-8 md:p-12 border border-white/30 shadow-md relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row gap-gutter items-center">
            <div className="w-full md:w-1/2 flex flex-col gap-stack-md">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-tertiary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  eco
                </span>
                <span className="font-label-md text-label-md text-tertiary-container uppercase tracking-wider">
                  Sustainable Future
                </span>
              </div>
              <h2 className="font-serif font-medium text-headline-lg text-on-surface">
                India's First Organic State
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Beyond its cultural richness, Sikkim stands as a global pioneer in
                environmental sustainability. It is proudly recognized as India's
                first fully organic state, harboring a staggering array of biodiversity
                within its lush valleys and alpine meadows.
              </p>
            </div>
            <div className="w-full md:w-1/2 rounded-lg overflow-hidden h-64 border border-outline-variant">
              <img
                className="w-full h-full object-cover"
                alt="Organic farming in Sikkim"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDphyIzlLVaxMUzdj6e70vpoym4ODSjWIyqPBRipTvtKtooTOul0AtIVO4aV1643cEz9IS_CsZ8c80vxEdl6kWL8YjFSDXTKpslOVMOYDR9w2AarKFPATX4SbOZ42aaC-KNqPqUPLz9BSrKvE47JDVsQ7Wpt2cMK_rBpCL6f9G4I5XKSjvt-rs1iSuUwSPhUoOIq2Wc7Q-anAHUJndrt-eIiUcmou72CWVqG8xKX4lxI-cDpKcdXt5URw"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
