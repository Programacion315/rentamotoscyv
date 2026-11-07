import Link from "next/link"
import { getVisitStats } from "@/lib/analytics/db"
import { VisitWorldMap } from "@/components/site/VisitWorldMap"

function flagEmoji(countryCode: string | null): string {
  if (!countryCode || countryCode.length !== 2) return "🏳️"
  const codePoints = [...countryCode.toUpperCase()].map(
    (c) => 127397 + c.charCodeAt(0)
  )
  return String.fromCodePoint(...codePoints)
}

export default async function AdminHomePage() {
  const { total: totalVisits, byCountry } = getVisitStats()

  const cards = [
    { href: "/admin/products", title: "Productos", desc: "Motos, specs, features e imágenes" },
    { href: "/admin/locations", title: "Ubicaciones", desc: "Ciudades para filtrar el catálogo" },
    { href: "/admin/sedes", title: "Sedes", desc: "Direcciones y mapas por ubicación" },
    { href: "/admin/contact", title: "Contacto y redes", desc: "Teléfono, WhatsApp y socials" },
  ]

  return (
    <div>
      <h1 className="font-heading text-[28px] md:text-[32px] text-ink">Panel de administración</h1>
      <p className="mt-2 mb-8 font-body text-smoke">
        Gestiona el catálogo y la información de contacto.
      </p>

      <div className="mb-6 grid gap-4 sm:grid-cols-[auto_1fr]">
        <div className="rounded-[20px] bg-primary px-6 py-5 text-primary-foreground">
          <p className="font-body-sm opacity-80">Visitas totales al sitio</p>
          <p className="mt-1 font-heading text-[32px]">{totalVisits.toLocaleString("es-CO")}</p>
        </div>

        {byCountry.length > 0 ? (
          <div className="rounded-[20px] bg-warm-taupe p-5">
            <p className="mb-3 font-body-sm text-smoke">De dónde vienen</p>
            <div className="flex flex-col gap-2">
              {byCountry.slice(0, 10).map((row) => (
                <div
                  key={`${row.country}-${row.countryCode}`}
                  className="flex items-center justify-between gap-3 font-body-sm text-ink"
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden>{flagEmoji(row.countryCode)}</span>
                    {row.country}
                  </span>
                  <span className="font-button text-smoke">{row.count}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {byCountry.length > 0 ? (
        <div className="mb-6 rounded-[20px] bg-warm-taupe p-5">
          <p className="mb-3 font-body-sm text-smoke">Mapa de visitas</p>
          <VisitWorldMap byCountry={byCountry} />
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-[20px] bg-warm-taupe p-6 transition-opacity hover:opacity-90"
          >
            <h2 className="font-button text-ink">{card.title}</h2>
            <p className="mt-1 font-body-sm text-smoke">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
