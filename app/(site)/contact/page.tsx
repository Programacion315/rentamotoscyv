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
    <div className="mx-auto w-full max-w-container-max px-margin-mobile py-12 md:px-margin-desktop md:py-16">
      <div className="mb-12 max-w-2xl animate-fade-rise">
        <p className="mb-3 flex items-center gap-2.5 font-label-caps text-ash">
          <span aria-hidden className="h-[2px] w-7 rounded-full bg-brand" />
          Contacto
        </p>
        <h1 className="font-display text-[36px] leading-[1.08] tracking-[-0.02em] text-ink md:text-[48px]">
          Ponte en contacto
        </h1>
        <p className="mt-4 font-body text-smoke">
          ¿Dudas sobre requisitos, entrega o tarifas? Te respondemos de inmediato.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {phone ? (
              <div className="rounded-[20px] border border-stone bg-warm-taupe p-6 sm:col-span-2">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="material-symbols-outlined flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[20px] text-brand"
                  >
                    call
                  </span>
                  <div>
                    <p className="font-label-caps text-ash">Teléfono</p>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="mt-1 block font-body text-ink hover:text-brand"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
            {sedes.length > 0 ? (
              <div className="rounded-[20px] border border-stone bg-warm-taupe p-6 sm:col-span-2">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="material-symbols-outlined flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[20px] text-brand"
                  >
                    garage_home
                  </span>
                  <p className="font-label-caps text-ash">Sedes</p>
                </div>
                <ul className="flex flex-col gap-4">
                  {sedes.map((sede) => (
                    <li key={sede.id} className="border-l-2 border-brand/40 pl-3">
                      <p className="font-body-sm font-medium text-ink">{sede.name}</p>
                      <p className="font-body-sm text-smoke">{sede.address}</p>
                      {sede.locations?.name ? (
                        <p className="mt-0.5 font-meta text-ash">{sede.locations.name}</p>
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
          <div className="overflow-hidden rounded-[24px] border border-stone lg:col-span-6">
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
  )
}
