"use client"

import Link from "next/link"
import { useState } from "react"
import type { Product } from "@/lib/types"
import { formatWhatsappDisplay, getProductImageUrl, whatsappHref } from "@/lib/types"
import { ProductMedia } from "@/components/site/ProductMedia"
import { ImageLightbox } from "@/components/site/ImageLightbox"
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
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <div className="bg-eggshell text-ink">
      <PageShell>
        <div className="mb-8">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-smoke transition-colors hover:text-brand"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Volver al catálogo
          </Link>
        </div>

        <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[24px] md:aspect-[16/10]">
              <ProductMedia
                src={imageUrl}
                alt={product.name}
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              {imageUrl ? (
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Ampliar imagen"
                  className="absolute inset-0 z-[1] cursor-zoom-in"
                />
              ) : null}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-16 bg-linear-to-b from-black/25 to-transparent" />
              <div className="pointer-events-none absolute top-4 left-4 z-[2] flex flex-wrap gap-2">
                {product.category ? (
                  <span className="rounded-full bg-black/55 px-3 py-1 font-label-caps text-white backdrop-blur-sm">
                    {product.category}
                  </span>
                ) : null}
                {product.is_featured ? (
                  <span className="rounded-full bg-brand px-3 py-1 font-label-caps text-white">
                    Destacada
                  </span>
                ) : null}
              </div>
              {imageUrl ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-4 right-4 z-[2] flex size-9 items-center justify-center rounded-full bg-ink/50 text-white backdrop-blur-sm transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100"
                >
                  <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                </span>
              ) : null}
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Escríbenos por WhatsApp al ${formatWhatsappDisplay(whatsapp)}`}
                className="absolute bottom-4 left-1/2 z-[3] inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-white shadow-[0_4px_18px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-105 active:scale-[0.98]"
              >
                <svg className="h-4.5 w-4.5 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {formatWhatsappDisplay(whatsapp)}
              </a>
            </div>

            <div>
              <p className="flex items-center gap-2.5 font-label-caps text-ash">
                <span aria-hidden className="h-[2px] w-7 rounded-full bg-brand" />
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
              <div className="rounded-[24px] border border-stone bg-warm-taupe p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="material-symbols-outlined flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[20px] text-brand"
                  >
                    speed
                  </span>
                  <h3 className="font-heading-sm text-[24px] text-ink">Especificaciones</h3>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                  {product.product_specs!.map((spec) => (
                    <div
                      key={spec.id}
                      className="rounded-[12px] border border-stone/80 bg-eggshell p-4 transition-colors hover:border-brand/30"
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
                <p className="mb-3 flex items-center gap-2.5 font-label-caps text-ash">
                  <span aria-hidden className="h-[2px] w-7 rounded-full bg-brand" />
                  Características
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.product_features!.map((feature) => (
                    <span
                      key={feature.id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-stone bg-eggshell px-3 py-1.5 font-body-sm text-graphite"
                    >
                      <span aria-hidden className="material-symbols-outlined text-[15px] text-brand">
                        check
                      </span>
                      {feature.label}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="sticky top-20 rounded-[24px] border border-stone bg-eggshell p-6 shadow-whisper lg:col-span-5 lg:p-8">
            <p className="flex items-center gap-2.5 font-label-caps text-ash">
              <span aria-hidden className="h-[2px] w-7 rounded-full bg-brand" />
              Ubicación
            </p>
            <p className="mt-2 font-heading-sm text-[28px] text-ink">En {locationName}</p>
            <p className="mt-3 font-body-sm text-smoke">
              Consulta disponibilidad y reserva directamente por WhatsApp.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5 border-t border-stone pt-5">
              {[
                "Respuesta inmediata",
                "Dos cascos reglamentarios incluidos",
                "Entrega en sede, domicilio o aeropuerto",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 font-body-sm text-graphite">
                  <span aria-hidden className="material-symbols-outlined text-[17px] text-brand">
                    check_circle
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-medium text-white shadow-[0_2px_8px_rgba(51,63,123,0.25)] transition-opacity hover:opacity-90"
            >
              Consultar por WhatsApp
            </a>
          </aside>
        </section>
      </PageShell>

      {imageUrl ? (
        <ImageLightbox
          src={imageUrl}
          alt={product.name}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </div>
  )
}
