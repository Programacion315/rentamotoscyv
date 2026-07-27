"use client"

import Link from "next/link"
import { useState } from "react"
import type { Product } from "@/lib/types"
import { formatWhatsappDisplay, getProductImageUrl, whatsappHref } from "@/lib/types"
import { ProductMedia } from "@/components/site/ProductMedia"
import { ImageLightbox } from "@/components/site/ImageLightbox"

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`${className} shrink-0 fill-current`} viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

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

  const specs = product.product_specs ?? []
  const features = product.product_features ?? []

  return (
    <div className="bg-eggshell text-ink">
      {/* Hero section — background reaches transparent nav, breadcrumbs pulled below */}
      <section className="relative -mt-20 overflow-hidden">
        {/* Dark scrim for nav text contrast (white text on dark gradient over eggshell) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[280px] bg-linear-to-b from-black to-black/25"
        />

        <div className="relative z-[2] bg-eggshell pt-[12.5rem] md:pt-[13.5rem]">
          <div className="mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
            {/* Back link + breadcrumb — pulled below the nav, visible on eggshell */}
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/catalog"
                className="group inline-flex items-center gap-2 font-button text-smoke transition-colors hover:text-brand"
              >
                <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:-translate-x-1">arrow_back</span>
                Volver al catálogo
              </Link>
              <div className="hidden items-center gap-2 font-meta text-ash sm:flex">
                <Link href="/" className="hover:text-ink transition-colors">Inicio</Link>
                <span className="text-stone">/</span>
                <Link href="/catalog" className="hover:text-ink transition-colors">Catálogo</Link>
                <span className="text-stone">/</span>
                <span className="text-graphite">{product.brand} {product.name}</span>
              </div>
            </div>

            {/* Grid: image left, info right */}
            <div className="grid grid-cols-1 gap-6 pb-10 lg:grid-cols-12 lg:gap-10 md:pb-16">
              {/* Image card */}
              <div className="animate-float-up stagger-1 group relative overflow-hidden rounded-[24px] bg-asphalt lg:col-span-7">
                <div className="relative aspect-[4/3] md:aspect-[5/4]">
                  <ProductMedia
                    src={imageUrl}
                    alt={product.name}
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                  {imageUrl ? (
                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      aria-label="Ampliar imagen"
                      className="absolute inset-0 z-[1] cursor-zoom-in"
                    />
                  ) : null}
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-24 bg-linear-to-b from-black/40 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-linear-to-t from-black/55 to-transparent" />

                  <div className="absolute top-4 left-4 z-[2] flex flex-wrap gap-2">
                    {product.category ? (
                      <span className="rounded-full bg-black/65 px-3 py-1.5 font-label-caps text-white backdrop-blur-md">
                        {product.category}
                      </span>
                    ) : null}
                    {product.is_featured ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 font-label-caps text-white shadow-[0_4px_12px_rgba(51,63,123,0.5)]">
                        <span className="size-1.5 rounded-full bg-white animate-pulse" />
                        Destacada
                      </span>
                    ) : null}
                  </div>

                  {imageUrl ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-4 right-4 z-[2] flex size-10 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                    </span>
                  ) : null}

                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Escríbenos por WhatsApp al ${formatWhatsappDisplay(whatsapp)}`}
                    className="absolute bottom-4 left-1/2 z-[3] inline-flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-2.5 font-button font-semibold whitespace-nowrap text-white shadow-[0_4px_20px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_28px_rgba(37,211,102,0.5)] active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-[18px] w-[18px]" />
                    {formatWhatsappDisplay(whatsapp)}
                  </a>
                </div>
              </div>

              {/* Right column: brand + bike name + specs + side CTA */}
              <div className="animate-float-up stagger-2 flex flex-col lg:col-span-5">
                <div className="mb-5 flex items-end gap-3">
                  <span aria-hidden className="h-[2px] w-12 rounded-full bg-brand" />
                  <p className="font-display text-[14px] font-medium uppercase tracking-[0.2em] text-brand">
                    {product.brand}
                  </p>
                </div>

                <h1 className="font-editorial text-[64px] text-ink sm:text-[80px] md:text-[96px] lg:text-[112px]">
                  {product.name}
                </h1>

                {product.description ? (
                  <p className="mt-6 max-w-xl font-body leading-relaxed text-smoke md:text-[17px]">
                    {product.description}
                  </p>
                ) : null}

                {specs.length > 0 ? (
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-stone pt-6">
                    {specs.map((spec) => (
                      <div key={spec.id} className="flex flex-col">
                        <p className="font-label-caps text-ash">{spec.label}</p>
                        <p className="font-display text-[24px] text-ink md:text-[28px]">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Reservar por WhatsApp al ${formatWhatsappDisplay(whatsapp)}`}
                  className="group mt-7 inline-flex h-[52px] w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-7 font-button font-semibold text-white shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-[1.01] hover:bg-[#1eb857] hover:shadow-[0_8px_24px_rgba(37,211,102,0.5)] active:scale-[0.99]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>Reservar por WhatsApp</span>
                </a>

                <p className="mt-3 inline-flex items-center gap-2 self-start font-meta text-ash">
                  <span className="size-1.5 rounded-full bg-whatsapp" />
                  Respuesta inmediata · sin compromiso
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {features.length > 0 ? (
        <section className="bg-eggshell py-16 md:py-20">
          <div className="mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span aria-hidden className="h-[2px] w-8 rounded-full bg-brand" />
                  <p className="font-label-caps text-ash">Lo que incluye</p>
                </div>
                <h2 className="font-display text-[28px] leading-[1.08] tracking-[-0.02em] text-ink md:text-[36px]">
                  Características destacadas
                </h2>
              </div>
              <p className="max-w-sm font-body-sm text-smoke">
                Cada {product.name} se entrega revisada, con documentos al día y lista para rodar.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
              {features.map((feature, i) => (
                <div
                  key={feature.id}
                  className={`animate-float-up stagger-${Math.min(i + 1, 6)} group flex items-start gap-4 rounded-[16px] border border-stone bg-eggshell p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </span>
                  <p className="font-body-sm font-medium text-graphite">{feature.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="relative overflow-hidden rounded-[28px] bg-asphalt">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 right-[-5%] size-[400px] rounded-full bg-brand/30 blur-[120px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 left-[-10%] size-[300px] rounded-full bg-brand-bright/15 blur-[100px]"
            />

            <div className="relative grid grid-cols-1 gap-10 p-8 md:p-12 lg:grid-cols-12 lg:gap-12 lg:p-16">
              <div className="lg:col-span-7">
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden className="h-[2px] w-8 rounded-full bg-brand-bright" />
                  <p className="font-label-caps text-white/45">Tu próxima ruta</p>
                </div>
                <h2 className="font-display text-[36px] leading-[1.05] tracking-[-0.02em] text-white md:text-[48px] lg:text-[56px]">
                  Reserva tu {product.name}<br className="hidden md:block" />
                  <span className="text-brand-bright"> por WhatsApp.</span>
                </h2>
                <p className="mt-5 max-w-md font-body leading-relaxed text-white/60 md:text-[17px]">
                  Confirma disponibilidad en minutos. Te entregamos la moto en sede, domicilio o aeropuerto.
                </p>

                <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
                  {[
                    "Respuesta inmediata",
                    "Documentos al día",
                    "Cascos incluidos",
                    "Entrega flexible",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-white/80">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-whatsapp/20 text-whatsapp">
                        <span className="material-symbols-outlined text-[12px]">check</span>
                      </span>
                      <span className="font-body-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center gap-3 lg:col-span-5">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-7 font-button text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-[1.01] hover:bg-[#1eb857] hover:shadow-[0_8px_28px_rgba(37,211,102,0.5)] active:scale-[0.99]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>Hablar por WhatsApp</span>
                  <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                </a>
                <a
                  href={`tel:${whatsapp.replace(/\D/g, "")}`}
                  className="group inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 font-button text-[15px] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>{formatWhatsappDisplay(whatsapp)}</span>
                </a>
                <Link
                  href="/catalog"
                  className="mt-2 inline-flex items-center justify-center gap-2 font-button text-[14px] text-white/55 transition-colors hover:text-white"
                >
                  Ver más motos disponibles
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
