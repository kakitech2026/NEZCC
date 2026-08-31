import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motor Sports Museum | North East Zone Cultural Centre",
  description: "Celebrating the spirit of adventure and the rich automotive heritage of the North East.",
};

export default function MotorSportsMuseumPage() {
  return (
    <main className="flex-grow ">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center bg-inverse-surface text-on-secondary">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida/AP1WRLsS81IKmq1RTyj8ixAj0LNhWESJvJtsDGpxlu35NINiCCKlrmm5dUnBSHx91LOw_qegZroYGJR8A_6S7MGM6h0eVU5oMWltKjH1S0tEBsR8UoP1xdq72VRm_SrcfRCPHdQp2aofdZ70PhfdSO_-Nkmu_oVYGi9JFFnMwSwccMfMPuwjmC1Hw9KrLxWPg6RiS0NMqmZTovwyQ7r2DVGAiR4xgidrCjVOLcAaiBokDyvPqQCidIqGvWW5ug_5')",
            }}
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-margin-mobile md:px-margin-desktop">
          <h1 className="text-headline-xl-mobile md:text-headline-xl font-serif font-medium md:font-serif font-medium mb-4 text-[#FF9933]">
            Motor Sports Museum
          </h1>
          <p className="text-body-lg font-body-lg text-inverse-on-surface max-w-2xl mx-auto">
            Celebrating the spirit of adventure and the rich automotive heritage of
            the North East.
          </p>
        </div>
      </section>

      {/* Key Exhibits Bento Grid */}
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg my-stack-lg">
        <h2 className="text-headline-lg font-serif font-medium mb-8 text-on-background">
          Key Exhibits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter auto-rows-[300px]">
          {/* Vintage Rallies */}
          <div className="md:col-span-2 relative rounded-xl overflow-hidden shadow-sm border border-outline-variant bg-surface group hover:shadow-md transition-shadow">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida/AP1WRLu9kmdXfIhyUNU2r-6a2kq2LEIEEgpUzGdtcSZaN63RuZCMHY3ZjQ_lG21T3iom2CF5HyysaAlhSvL9ChAjoF9znzPQchv3YsrRcC-fp963ivDJW-KgU-EiCb2vkRnVcxKwt1Ya6f7SYc3NlC8X8UEM1qjk6J2GSZ2hGFy67nTHRyQpH5qsWASuDXOxAWuYRilVLqgcX7zihp0ipXi-XKLxCk4_8hXfDxoJu2aTshY1axHLUTnCEPgvY44')",
              }}
            />
            <div className="relative z-10 p-stack-md flex flex-col justify-end h-full bg-gradient-to-t from-surface-container-highest to-transparent">
              <h3 className="text-headline-md font-serif font-medium text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined" aria-hidden="true">
                  sports_score
                </span>{" "}
                Vintage Rallies
              </h3>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Trace the thrilling history of iconic rally routes traversing the
                challenging landscapes of the eight North Eastern states,
                featuring historic route maps and driver memorabilia.
              </p>
            </div>
          </div>

          {/* Off-Roading Heritage */}
          <div className="relative rounded-xl overflow-hidden shadow-sm border border-outline-variant bg-surface group hover:shadow-md transition-shadow">
            <div className="p-stack-md flex flex-col h-full justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLsZMuqBOXWNrFrUDWIUV29quwARLH-DWAF5N5m9j4UTlFtozLccCwYD3l8piBYk6bJUdD8rEg2USAtpMoC2c1DyrHFO1eiyCMZ_ib5CrMDsnL5B2Opt_t1YrTlt6vTTBOEsm41Am8tKtj15uL9qJYr6leDcALEs_Z5tqRa1BLQnmTJdeHiKJsibYNoIcjlStLDiYBQKoaMB6_M8NHkpt8qQxD6YUP2NiFQtx8XoK-bchslMPpwcGAwz0RcW"
                alt="The Naga Jeep"
                className="h-16 w-fit object-contain mb-4"
              />
              <div>
                <h3 className="text-headline-md font-serif font-medium text-on-surface mb-2">
                  Off-Roading Heritage
                </h3>
                <p className="text-label-md font-label-md text-on-surface-variant">
                  Discover the evolution of 4x4 culture essential for navigating
                  the rugged, uncharted terrains of the region.
                </p>
              </div>
            </div>
          </div>

          {/* Legendary Machines */}
          <div className="md:col-span-3 relative rounded-xl overflow-hidden shadow-sm border border-outline-variant bg-surface-container group hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              <div className="p-stack-lg flex flex-col justify-center">
                <h3 className="text-headline-md font-serif font-medium text-secondary-fixed-variant mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    directions_car
                  </span>{" "}
                  Legendary Machines
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-6">
                  A curated collection of historic vintage vehicles preserved by the
                  museum, showcasing the regional ingenuity and mechanical
                  resilience of the North East's automotive past.
                </p>
                <button className="w-fit bg-primary-container text-on-primary px-6 py-3 rounded text-label-md font-label-md hover:bg-primary transition-colors flex items-center gap-2">
                  View Gallery{" "}
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">
                    arrow_forward
                  </span>
                </button>
              </div>
              <div
                className="h-full min-h-[300px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida/AP1WRLsZMuqBOXWNrFrUDWIUV29quwARLH-DWAF5N5m9j4UTlFtozLccCwYD3l8piBYk6bJUdD8rEg2USAtpMoC2c1DyrHFO1eiyCMZ_ib5CrMDsnL5B2Opt_t1YrTlt6vTTBOEsm41Am8tKtj15uL9qJYr6leDcALEs_Z5tqRa1BLQnmTJdeHiKJsibYNoIcjlStLDiYBQKoaMB6_M8NHkpt8qQxD6YUP2NiFQtx8XoK-bchslMPpwcGAwz0RcW')",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
