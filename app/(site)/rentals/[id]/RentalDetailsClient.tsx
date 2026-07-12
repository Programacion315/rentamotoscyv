"use client"

import Link from "next/link"
import type { Product } from "@/lib/types"
import { getProductImageUrl, whatsappHref } from "@/lib/types"
import { SparkOrb } from "@/components/site/ProductCard"
import { PageShell } from "@/components/site/Section"

export default function RentalDetailsClient({
  product,
  whatsapp,
}: {
  product: Product
  whatsapp: string
}) {
  const locationName = product.locations?.name ?? "Colombia"
  const message = `Hola! Me gustaría reservar la moto ${product.brand} ${product.name} en ${locationName}, Me podrías brindar más información?`
  const wa = whatsappHref(whatsapp, message)
  const imageUrl = getProductImageUrl(product.image_path)

  return (
    <div className="bg-eggshell text-ink">
      <PageShell>
        <div className="mb-8">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-smoke transition-colors hover:text-ink"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Volver al catálogo
          </Link>
        </div>

        <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-warm-taupe md:aspect-[16/10]">
              <SparkOrb className="-right-10 -top-8 size-[240px] opacity-60" />
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="relative z-[1] size-full object-cover"
                />
              ) : (
                <div className="relative z-[1] flex size-full items-center justify-center text-ash">
                  <span className="material-symbols-outlined text-5xl">two_wheeler</span>
                </div>
              )}
              <div className="absolute top-4 left-4 z-[2] flex flex-wrap gap-2">
                {product.is_featured ? (
                  <span className="rounded-full bg-black px-3 py-1 font-label-caps text-white">
                    Destacada
                  </span>
                ) : null}
                {product.category ? (
                  <span className="rounded-full border border-stone bg-eggshell/90 px-3 py-1 font-label-caps text-ink backdrop-blur-sm">
                    {product.category}
                  </span>
                ) : null}
              </div>
            </div>

            <div>
              <p className="font-meta text-ash">
                {product.brand}
                {product.locations?.name ? ` · ${product.locations.name}` : ""}
              </p>
              <h1 className="mt-2 font-display text-[36px] leading-[1.08] tracking-[-0.02em] md:text-[48px]">
                {product.name}
              </h1>
              <p className="mt-4 max-w-2xl font-body leading-relaxed text-smoke">
                {product.description}
              </p>
            </div>

            {(product.product_specs?.length ?? 0) > 0 ? (
              <div className="rounded-[24px] bg-warm-taupe p-6 md:p-8">
                <h3 className="font-heading-sm text-[24px] text-ink">Especificaciones</h3>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                  {product.product_specs!.map((spec) => (
                    <div
                      key={spec.id}
                      className="rounded-[12px] border border-stone/80 bg-eggshell p-4"
                    >
                      <p className="font-meta text-ash">{spec.label}</p>
                      <p className="mt-1 font-body font-medium text-ink">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {(product.product_features?.length ?? 0) > 0 ? (
              <div>
                <p className="mb-3 font-label-caps text-ash">Características</p>
                <div className="flex flex-wrap gap-2">
                  {product.product_features!.map((feature) => (
                    <span
                      key={feature.id}
                      className="rounded-full border border-stone bg-eggshell px-3 py-1.5 font-body-sm text-graphite"
                    >
                      {feature.label}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="sticky top-20 rounded-[24px] border border-stone bg-eggshell p-6 shadow-whisper lg:col-span-5 lg:p-8">
            <p className="font-label-caps text-ash">Ubicación</p>
            <p className="mt-2 font-heading-sm text-[28px] text-ink">En {locationName}</p>
            <p className="mt-3 font-body-sm text-smoke">
              Consulta disponibilidad y reserva directamente por WhatsApp.
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-black text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Consultar por WhatsApp
            </a>
          </aside>
        </section>
      </PageShell>
    </div>
  )
}
