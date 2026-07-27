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
      <section className="relative -mt-20 flex min-h-[88svh] flex-col justify-start overflow-hidden md:min-h-[94svh] md:justify-end">
        <div className="absolute inset-0">
          <Image
            src="/assets/12620a81-00b7-4396-8acd-3ae464c1e678.webp"
            alt={`Sede de ${SITE_NAME} con la flota de motocicletas lista para salir`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom md:object-[center_15%]"
          />
          <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[92%] bg-linear-to-t from-black/95 via-black/65 to-transparent md:h-[80%] md:via-black/55" />
          <div className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-black/75 via-black/40 to-transparent md:w-[70%] md:from-black/50 md:via-black/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-container-max px-margin-mobile pt-48 pb-12 md:px-margin-desktop md:pb-16 md:pt-0">
          <p className="animate-fade-rise font-label-caps text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            Bogotá · Neiva
          </p>
          <h1 className="animate-fade-rise animate-delay-1 mt-2 max-w-3xl font-display text-[32px] leading-[1.02] tracking-[-0.02em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.65)] md:mt-3 md:text-[68px] lg:text-[76px]">
            {SITE_NAME}
          </h1>
          <p className="animate-fade-rise animate-delay-2 mt-2 font-heading text-lg leading-snug text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] md:mt-3 md:text-[28px]">
            Libertad sobre dos ruedas
          </p>
          <p className="animate-fade-rise animate-delay-3 mt-3 max-w-xl font-body text-sm text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)] md:mt-4 md:text-base">
            Motocicletas mantenidas a la perfección, entrega ágil y atención personalizada para
            recorrer la ciudad con confianza.
          </p>
          <div className="animate-fade-rise animate-delay-4 mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
            <Link
              href="/catalog"
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-white px-7 text-sm font-medium text-black shadow-[0_4px_18px_rgba(0,0,0,0.35)] transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] md:h-12"
            >
              Renta tu próxima moto
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:h-12"
            >
              Contáctanos
            </Link>
          </div>

          <ul className="animate-fade-rise animate-delay-4 mt-6 flex flex-col gap-2 border-t border-white/20 pt-4 md:mt-10 md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-3 md:pt-6">
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

      {/* Requisitos — dark dramatic band */}
      <section className="relative overflow-hidden bg-asphalt py-16 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-5%] size-[500px] rounded-full bg-brand/15 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-[-10%] size-[400px] rounded-full bg-brand/10 blur-[80px]"
        />
        <div className="relative mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="animate-fade-rise">
              <p className="mb-3 flex items-center gap-3 font-label-caps text-white/50">
                <span aria-hidden className="h-[2px] w-8 rounded-full bg-brand-bright" />
                Antes de rodar
              </p>
              <h2 className="font-heading text-[26px] leading-[1.1] tracking-[-0.02em] text-white md:text-[32px]">
                Requisitos para la renta
              </h2>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              {[
                { label: "Mayor de 18 años", icon: "verified", desc: "Edad mínima" },
                { label: "Licencia vigente", icon: "badge", desc: "Categoría A o B" },
                { label: "Documento o pasaporte", icon: "description", desc: "Identificación válida" },
              ].map((item, i) => (
                <li
                  key={item.label}
                  className={`animate-float-up stagger-${i + 1} group flex items-start gap-4 rounded-[16px] asphalt-card p-5`}
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-bright transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  </span>
                  <div>
                    <p className="font-body-sm font-medium text-white">{item.label}</p>
                    <p className="mt-0.5 font-body-sm text-white/50">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured fleet */}
      <Section>
        <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Flota"
            title="Catálogo destacado"
            description="Modelos recientes, revisados y listos para salir."
            size="lg"
          />
          <Link
            href="/catalog"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-stone bg-eggshell px-6 font-button text-ink transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white hover:shadow-[0_4px_16px_rgba(51,63,123,0.2)]"
          >
            Ver toda la flota
            <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1">
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
                  ? "animate-float-up stagger-1"
                  : i === 1
                    ? "animate-float-up stagger-2"
                    : "animate-float-up stagger-3"
              }
            >
              <ProductCard product={moto} priority={i === 0} />
            </div>
          ))}
        </div>
        {featuredMotos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[24px] border border-stone bg-warm-taupe py-20 text-center">
            <span className="material-symbols-outlined mb-4 text-[48px] text-ash">two_wheeler</span>
            <p className="font-heading-sm text-[22px] text-ink">Pronto publicaremos nuestra flota destacada</p>
            <p className="mt-2 font-body-sm text-smoke">Estamos preparando modelos increíbles para ti.</p>
          </div>
        ) : null}
      </Section>

      {/* Cómo funciona — 3 pasos with dramatic design */}
      <Section band>
        <div className="mb-16">
          <SectionHeading
            eyebrow="Así de simple"
            title="De la reserva a la carretera"
            description="Sin papeleos eternos. Tres pasos y estás rodando."
            size="lg"
          />
        </div>
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
          ].map((step, i) => (
            <div
              key={step.n}
              className={`animate-float-up stagger-${i + 1} group relative overflow-hidden rounded-[24px] bg-eggshell p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] md:p-10`}
            >
              {/* Large number watermark */}
              <p
                aria-hidden
                className="pointer-events-none absolute -top-4 right-5 font-display text-[100px] leading-none text-stone/50 select-none transition-colors duration-500 group-hover:text-brand/10"
              >
                {step.n}
              </p>

              {/* Icon */}
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(51,63,123,0.3)]">
                <span className="material-symbols-outlined text-[28px]">{step.icon}</span>
              </span>

              {/* Content */}
              <h3 className="relative mt-6 font-heading-sm text-[22px] text-ink md:text-[24px]">{step.title}</h3>
              <p className="relative mt-3 font-body-sm leading-relaxed text-smoke">{step.body}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 rounded-full bg-brand transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </Section>

      {/* Cobertura — asymmetric layout */}
      <Section>
        <div className="mb-14">
          <SectionHeading
            eyebrow="Cobertura"
            title="Bogotá y Neiva"
            description="Entrega en sede, domicilio u aeropuerto. Coordinamos contigo para que empieces sin demoras."
            size="lg"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {[
            {
              title: "Entrega a domicilio",
              body: "Llevamos la moto a tu hotel, residencia o punto de encuentro en la ciudad.",
              icon: "local_shipping",
              accent: "from-brand to-[#4a5499]",
            },
            {
              title: "Aeropuerto",
              body: "Te esperamos a tu llegada para que inicies el viaje sin contratiempos.",
              icon: "flight_land",
              accent: "from-[#232c58] to-brand",
            },
          ].map((card, i) => (
            <div
              key={card.title}
              className={`animate-float-up stagger-${i + 1} group relative overflow-hidden rounded-[24px] border border-stone bg-eggshell p-8 transition-all duration-500 hover:border-brand/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] md:p-10`}
            >
              {/* Gradient accent bar */}
              <div className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${card.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

              <span className="flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(51,63,123,0.3)]">
                <span className="material-symbols-outlined text-[28px]">{card.icon}</span>
              </span>
              <h3 className="mt-6 font-heading-sm text-[22px] text-ink md:text-[24px]">{card.title}</h3>
              <p className="mt-3 font-body leading-relaxed text-smoke">{card.body}</p>

              <div className="mt-6 flex items-center gap-2 font-button text-brand opacity-0 transition-all duration-300 group-hover:opacity-100">
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                Más información
              </div>
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
            className="mx-auto mb-12 text-center"
            size="lg"
          />
          <FaqAccordion items={FAQ_ITEMS} />
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-stone bg-eggshell px-6 font-button text-ink transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white hover:shadow-[0_4px_16px_rgba(51,63,123,0.2)]"
            >
              Contactar soporte
              <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </Section>

      {/* CTA final — dramatic brand card */}
      <Section>
        <div className="relative overflow-hidden rounded-[28px] bg-linear-to-br from-brand via-[#2d3a6e] to-[#1a2245] px-6 py-20 text-center text-white md:px-12 md:py-28">
          {/* Decorative elements */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 right-[-10%] size-[400px] rounded-full bg-white/8 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 left-[-5%] size-[300px] rounded-full bg-brand-bright/15 blur-[80px]"
          />
          {/* Diagonal lines decoration */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
            <div className="absolute -top-1/2 left-1/4 h-[200%] w-px rotate-12 bg-white" />
            <div className="absolute -top-1/2 left-1/2 h-[200%] w-px rotate-12 bg-white" />
            <div className="absolute -top-1/2 left-3/4 h-[200%] w-px rotate-12 bg-white" />
          </div>

          <div className="relative">
            <p className="animate-fade-rise flex items-center justify-center gap-3 font-label-caps text-white/60">
              <span aria-hidden className="h-[2px] w-8 rounded-full bg-brand-bright" />
              ¿Listo para salir?
              <span aria-hidden className="h-[2px] w-8 rounded-full bg-brand-bright" />
            </p>
            <h2 className="animate-fade-rise animate-delay-1 mx-auto mt-6 max-w-3xl font-display text-[36px] leading-[1.05] tracking-[-0.02em] text-white md:text-[56px] lg:text-[64px]">
              Tu próxima ruta empieza aquí
            </h2>
            <p className="animate-fade-rise animate-delay-2 mx-auto mt-5 max-w-xl font-body text-white/70">
              Reserva en minutos por WhatsApp y recoge tu moto lista, revisada y con todos los
              documentos al día.
            </p>
            <div className="animate-fade-rise animate-delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/catalog"
                className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-white px-8 font-button text-ink shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] active:scale-[0.98]"
              >
                Ver catálogo
                <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/30 px-8 font-button text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
