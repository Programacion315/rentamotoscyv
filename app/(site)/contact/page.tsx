import { getActiveSedes, getSiteContact } from "@/lib/data/queries"
import { whatsappHref } from "@/lib/types"
import ContactFormClient from "./ContactFormClient"

export default async function ContactPage() {
  const [contact, sedes] = await Promise.all([getSiteContact(), getActiveSedes()])
  const phone = contact?.phone?.trim() || null
  const whatsapp = contact?.whatsapp?.replace(/\D/g, "") || null
  const wa = whatsapp ? whatsappHref(whatsapp) : null
  const mapUrl = sedes.find((s) => s.map_embed_url)?.map_embed_url ?? null

  return (
    <div className="bg-eggshell">
      {/* Hero band */}
      <section className="relative overflow-hidden bg-asphalt py-16 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-5%] size-[500px] rounded-full bg-brand/15 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 left-[-10%] size-[350px] rounded-full bg-brand-bright/10 blur-[80px]"
        />
        <div className="relative mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="animate-fade-rise max-w-2xl">
            <p className="mb-4 flex items-center gap-3 font-label-caps text-white/50">
              <span aria-hidden className="h-[2px] w-8 rounded-full bg-brand-bright" />
              Contacto
            </p>
            <h1 className="font-display text-[36px] leading-[1.05] tracking-[-0.02em] text-white md:text-[52px] lg:text-[58px]">
              Ponte en contacto
            </h1>
            <p className="mt-4 font-body text-white/60">
              ¿Dudas sobre requisitos, entrega o tarifas? Te respondemos de inmediato.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-8 lg:col-span-6">
              {/* Contact info cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {phone ? (
                  <div className="animate-float-up stagger-1 group rounded-[20px] border border-stone bg-eggshell p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-brand/30 hover:shadow-[0_4px_16px_rgba(51,63,123,0.1)] sm:col-span-2">
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden
                        className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(51,63,123,0.3)]"
                      >
                        <span className="material-symbols-outlined text-[22px]">call</span>
                      </span>
                      <div>
                        <p className="font-label-caps text-ash">Teléfono</p>
                        <a
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="mt-1 block font-heading-sm text-[20px] text-ink transition-colors hover:text-brand"
                        >
                          {phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ) : null}
                {sedes.length > 0 ? (
                  <div className="animate-float-up stagger-2 group rounded-[20px] border border-stone bg-eggshell p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-brand/30 hover:shadow-[0_4px_16px_rgba(51,63,123,0.1)] sm:col-span-2">
                    <div className="mb-5 flex items-center gap-4">
                      <span
                        aria-hidden
                        className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(51,63,123,0.3)]"
                      >
                        <span className="material-symbols-outlined text-[22px]">garage_home</span>
                      </span>
                      <p className="font-label-caps text-ash">Sedes</p>
                    </div>
                    <ul className="flex flex-col gap-4">
                      {sedes.map((sede) => (
                        <li key={sede.id} className="border-l-[3px] border-brand/40 pl-4">
                          <p className="font-body-sm font-medium text-ink">{sede.name}</p>
                          <p className="mt-0.5 font-body-sm text-smoke">{sede.address}</p>
                          {sede.locations?.name ? (
                            <p className="mt-1 font-meta text-ash">{sede.locations.name}</p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <ContactFormClient whatsappHref={wa} />
            </div>

            {mapUrl ? (
              <div className="animate-float-up stagger-3 overflow-hidden rounded-[24px] border border-stone bg-eggshell shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] lg:col-span-6">
                <iframe
                  src={mapUrl}
                  title="Mapa de sedes"
                  className="h-[420px] w-full lg:h-full lg:min-h-[560px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
