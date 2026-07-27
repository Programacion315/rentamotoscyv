import Link from "next/link"
import Image from "next/image"
import { SITE_NAME } from "@/app/(site)/components/BrandLogo"
import { ProductCard } from "@/components/site/ProductCard"
import { FaqAccordion } from "@/components/site/FaqAccordion"
import { Section, SectionHeading } from "@/components/site/Section"
import { getFeaturedProducts } from "@/lib/data/queries"

const FAQ_ITEMS = [
  {
    q: "¿Cómo puedo realizar una reclamación?",
    a: "Escríbenos por WhatsApp con tu número de contrato y el motivo. Respondemos en menos de 24 horas hábiles.",
  },
  {
    q: "¿Qué incluye el precio de la renta?",
    a: "Alquiler por 24 horas, SOAT vigente, revisión técnico-mecánica al día y dos cascos reglamentarios. Coberturas adicionales son opcionales.",
  },
  {
    q: "¿Hay recargo por entrega en aeropuerto?",
    a: "Sí, según horario y logística. Cotizamos la tarifa exacta al confirmar tu reserva.",
  },
]

export default async function Home() {
  const featuredMotos = await getFeaturedProducts()

  return (
    <div className="bg-eggshell">
      {/* Hero — full-bleed storefront photo, pulls under the glass nav (-mt-20) */}
      <section className="relative -mt-20 flex min-h-[88svh] flex-col justify-end overflow-hidden md:min-h-[94svh]">
        <div className="absolute inset-0">
          <Image
            src="/assets/12620a81-00b7-4396-8acd-3ae464c1e678.webp"
            alt={`Sede de ${SITE_NAME} con la flota de motocicletas lista para salir`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_15%]"
          />
          {/* Legibility: soft veil at the very top (nav adds its own fade) and behind the copy */}
          <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[80%] bg-linear-to-t from-black/95 via-black/55 to-transparent" />
          {/* Side scrim anchoring the text column on the left */}
          <div className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-black/50 via-black/20 to-transparent md:w-[70%]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-container-max px-margin-mobile pb-12 md:px-margin-desktop md:pb-16">
          <p className="animate-fade-rise font-label-caps text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            Bogotá · Neiva — Sede propia
          </p>
          <h1 className="animate-fade-rise animate-delay-1 mt-3 max-w-3xl font-display text-[42px] leading-[1.02] tracking-[-0.02em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.65)] md:text-[68px] lg:text-[76px]">
            {SITE_NAME}
          </h1>
          <p className="animate-fade-rise animate-delay-2 mt-3 font-heading text-[22px] leading-snug text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] md:text-[28px]">
            Libertad sobre dos ruedas
          </p>
          <p className="animate-fade-rise animate-delay-3 mt-4 max-w-xl font-body text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
            Motocicletas mantenidas a la perfección, entrega ágil y atención personalizada para
            recorrer la ciudad con confianza.
          </p>
          <div className="animate-fade-rise animate-delay-4 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalog"
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-white px-7 text-sm font-medium text-black shadow-[0_4px_18px_rgba(0,0,0,0.35)] transition-[opacity,transform] hover:opacity-90 active:scale-[0.98]"
            >
              Renta tu próxima moto
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Contáctanos
            </Link>
          </div>

          <ul className="animate-fade-rise animate-delay-4 mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-6">
            {[
              "Flota propia y revisada",
              "Entrega a domicilio y aeropuerto",
              "SOAT y tecnomecánica al día",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 font-body-sm text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]"
              >
                <span className="material-symbols-outlined text-[18px] text-white/75">check</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Requisitos — light strip right below the hero */}
      <section className="border-b border-stone/60 bg-warm-taupe py-12 md:py-14">
        <div className="mx-auto flex w-full max-w-container-max flex-col items-start justify-between gap-8 px-margin-mobile md:flex-row md:items-center md:px-margin-desktop">
          <div>
            <p className="mb-2 flex items-center gap-2.5 font-label-caps text-ash">
              <span aria-hidden className="h-[2px] w-7 rounded-full bg-brand" />
              Antes de rodar
            </p>
            <h2 className="font-heading-sm text-[24px] text-ink md:text-[28px]">
              Requisitos para la renta
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-3">
            {[
              { label: "Mayor de 18 años", icon: "verified" },
              { label: "Licencia vigente", icon: "badge" },
              { label: "Documento o pasaporte", icon: "description" },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10">
                  <span className="material-symbols-outlined text-[20px] text-brand">
                    {item.icon}
                  </span>
                </span>
                <span className="font-body-sm text-graphite">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured fleet */}
      <Section>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Flota"
            title="Catálogo destacado"
            description="Modelos recientes, revisados y listos para salir."
          />
          <Link
            href="/catalog"
            className="group inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-stone bg-eggshell px-5 text-[13px] font-medium text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
          >
            Ver toda la flota
            <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
              arrow_forward
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {featuredMotos.map((moto, i) => (
            <div
              key={moto.id}
              className={
                i === 0
                  ? "animate-fade-rise animate-delay-1"
                  : i === 1
                    ? "animate-fade-rise animate-delay-2"
                    : "animate-fade-rise animate-delay-3"
              }
            >
              <ProductCard product={moto} priority={i === 0} />
            </div>
          ))}
        </div>
        {featuredMotos.length === 0 ? (
          <p className="font-body text-smoke">Pronto publicaremos nuestra flota destacada.</p>
        ) : null}
      </Section>

      {/* Cómo funciona — 3 pasos */}
      <Section band>
        <SectionHeading
          eyebrow="Así de simple"
          title="De la reserva a la carretera"
          description="Sin papeleos eternos. Tres pasos y estás rodando."
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {[
            {
              n: "01",
              title: "Elige tu moto",
              body: "Explora el catálogo y encuentra el modelo ideal para tu plan: ciudad, trabajo o viaje.",
              icon: "two_wheeler",
            },
            {
              n: "02",
              title: "Reserva por WhatsApp",
              body: "Escríbenos, confirma disponibilidad y coordina fecha, hora y punto de entrega.",
              icon: "chat",
            },
            {
              n: "03",
              title: "Recoge y rueda",
              body: "Recibe la moto con SOAT, tecnomecánica y dos cascos incluidos. A rodar.",
              icon: "key",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="relative overflow-hidden rounded-[24px] bg-eggshell p-8 shadow-whisper"
            >
              <p
                aria-hidden
                className="pointer-events-none absolute -top-3 right-4 font-display text-[88px] leading-none text-stone/70 select-none"
              >
                {step.n}
              </p>
              <span className="relative flex size-12 items-center justify-center rounded-full bg-brand/10">
                <span className="material-symbols-outlined text-[26px] text-brand">{step.icon}</span>
              </span>
              <h3 className="relative mt-5 font-heading-sm text-[24px] text-ink">{step.title}</h3>
              <p className="relative mt-3 font-body-sm leading-relaxed text-smoke">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Cobertura */}
      <Section>
        <SectionHeading
          eyebrow="Cobertura"
          title="Bogotá y Neiva"
          description="Entrega en sede, domicilio u aeropuerto. Coordinamos contigo para que empieces sin demoras."
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {[
            {
              title: "Entrega a domicilio",
              body: "Llevamos la moto a tu hotel, residencia o punto de encuentro en la ciudad.",
              icon: "local_shipping",
            },
            {
              title: "Aeropuerto",
              body: "Te esperamos a tu llegada para que inicies el viaje sin contratiempos.",
              icon: "flight_land",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group rounded-[24px] border border-stone bg-warm-taupe p-8 transition-colors hover:border-brand/30 md:p-10"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-brand/10">
                <span className="material-symbols-outlined text-[26px] text-brand">{card.icon}</span>
              </span>
              <h3 className="mt-5 font-heading-sm text-[24px] text-ink">{card.title}</h3>
              <p className="mt-3 font-body leading-relaxed text-smoke">{card.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section band>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Soporte"
            title="Preguntas frecuentes"
            description="Dudas sobre requisitos, tarifas o entregas. Respondemos por WhatsApp."
            className="mx-auto mb-10 text-center"
          />
          <FaqAccordion items={FAQ_ITEMS} />
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-full border border-stone bg-eggshell px-5 text-sm font-medium text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              Contactar soporte
            </Link>
          </div>
        </div>
      </Section>

      {/* CTA final — clean brand card */}
      <Section>
        <div className="relative overflow-hidden rounded-[28px] bg-linear-to-br from-brand to-[#232c58] px-6 py-16 text-center text-white md:px-12 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[-10%] size-[340px] rounded-full bg-white/10 blur-[90px]"
          />
          <p className="relative flex items-center justify-center gap-2.5 font-label-caps text-white/70">
            ¿Listo para salir?
          </p>
          <h2 className="relative mx-auto mt-4 max-w-2xl font-display text-[34px] leading-[1.05] tracking-[-0.02em] text-white md:text-[52px]">
            Tu próxima ruta empieza aquí
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl font-body text-white/75">
            Reserva en minutos por WhatsApp y recoge tu moto lista, revisada y con todos los
            documentos al día.
          </p>
          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/catalog"
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-white px-7 text-sm font-medium text-ink shadow-[0_4px_18px_rgba(0,0,0,0.25)] transition-[opacity,transform] hover:opacity-90 active:scale-[0.98]"
            >
              Ver catálogo
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </Section>
    </div>
  )
}
