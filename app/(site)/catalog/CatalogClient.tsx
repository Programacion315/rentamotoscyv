"use client"

import { useState } from "react"
import { ProductCard } from "@/components/site/ProductCard"
import { PageShell } from "@/components/site/Section"
import { cn } from "@/lib/utils"
import type { Location, Product } from "@/lib/types"

export default function CatalogClient({
  products,
  locations,
}: {
  products: Product[]
  locations: Location[]
}) {
  const [locationId, setLocationId] = useState<string | "all">("all")

  const filtered =
    locationId === "all"
      ? products
      : products.filter((p) => p.location_id === locationId)

  return (
    <PageShell>
      <div className="mb-10 max-w-2xl animate-fade-rise">
        <p className="font-label-caps text-ash mb-3">Catálogo</p>
        <h1 className="font-display-lg text-[36px] md:text-[48px] text-ink">
          Elige tu motocicleta
        </h1>
        <p className="mt-4 font-body text-smoke">
          Flota activa en Bogotá y Neiva. Filtra por ciudad y reserva por WhatsApp.
        </p>
      </div>

      {locations.length > 0 ? (
        <div className="mb-10 flex flex-wrap gap-2 animate-fade-rise animate-delay-1">
          <button
            type="button"
            onClick={() => setLocationId("all")}
            className={cn(
              "rounded-full border px-4 py-2 font-button transition-colors",
              locationId === "all"
                ? "border-ink bg-ink text-eggshell"
                : "border-[#e5e5e5] bg-eggshell text-ink hover:bg-warm-taupe"
            )}
          >
            Todas
          </button>
          {locations.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => setLocationId(loc.id)}
              className={cn(
                "rounded-full border px-4 py-2 font-button transition-colors",
                locationId === loc.id
                  ? "border-ink bg-ink text-eggshell"
                  : "border-[#e5e5e5] bg-eggshell text-ink hover:bg-warm-taupe"
              )}
            >
              {loc.name}
            </button>
          ))}
        </div>
      ) : null}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] bg-warm-taupe px-8 py-16 text-center">
          <p className="font-heading-sm text-[24px] text-ink">Sin motos en esta ciudad</p>
          <p className="mt-3 font-body-sm text-smoke">
            Prueba otro filtro o contáctanos para disponibilidad.
          </p>
        </div>
      )}
    </PageShell>
  )
}
