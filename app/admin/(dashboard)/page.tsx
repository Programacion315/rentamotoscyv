import Link from "next/link"

export default function AdminHomePage() {
  const cards = [
    { href: "/admin/products", title: "Productos", desc: "Motos, specs, features e imágenes" },
    { href: "/admin/locations", title: "Ubicaciones", desc: "Ciudades para filtrar el catálogo" },
    { href: "/admin/sedes", title: "Sedes", desc: "Direcciones y mapas por ubicación" },
    { href: "/admin/contact", title: "Contacto y redes", desc: "Teléfono, email, WhatsApp y socials" },
  ]

  return (
    <div>
      <h1 className="font-heading text-[28px] md:text-[32px] text-ink">Panel de administración</h1>
      <p className="mt-2 mb-8 font-body text-smoke">
        Gestiona el catálogo y la información de contacto.
      </p>
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
