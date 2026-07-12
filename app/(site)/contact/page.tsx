import { getActiveSedes, getSiteContact } from "@/lib/data/queries"
import ContactFormClient from "./ContactFormClient"
import { PageShell } from "@/components/site/Section"

export default async function ContactPage() {
  const [contact, sedes] = await Promise.all([getSiteContact(), getActiveSedes()])
  const phone = contact?.phone?.trim() || null
  const email = contact?.email?.trim() || null
  const mapUrl = sedes.find((s) => s.map_embed_url)?.map_embed_url ?? null

  return (
    <PageShell>
      <div className="mb-12 max-w-2xl animate-fade-rise">
        <p className="mb-3 font-label-caps text-ash">Contacto</p>
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
              <div className="rounded-[20px] bg-warm-taupe p-6">
                <p className="font-label-caps text-ash">Teléfono</p>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="mt-2 block font-body text-ink hover:opacity-70"
                >
                  {phone}
                </a>
              </div>
            ) : null}
            {email ? (
              <div className="rounded-[20px] bg-warm-taupe p-6">
                <p className="font-label-caps text-ash">Correo</p>
                <a
                  href={`mailto:${email}`}
                  className="mt-2 block font-body text-ink hover:opacity-70"
                >
                  {email}
                </a>
              </div>
            ) : null}
            {sedes.length > 0 ? (
              <div className="rounded-[20px] bg-warm-taupe p-6 sm:col-span-2">
                <p className="mb-3 font-label-caps text-ash">Sedes</p>
                <ul className="flex flex-col gap-4">
                  {sedes.map((sede) => (
                    <li key={sede.id}>
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
          <ContactFormClient />
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
    </PageShell>
  )
}
