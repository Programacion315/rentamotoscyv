import Image from "next/image"
import Link from "next/link"
import { SITE_NAME } from "@/app/(site)/components/BrandLogo"
import { Section, SectionHeading } from "@/components/site/Section"

export default function About() {
  return (
    <div className="bg-eggshell text-ink">
      {/* Hero — pulls under fixed nav */}
      <header className="relative -mt-20 flex min-h-[52vh] items-end overflow-hidden md:min-h-[62vh]">
        <div className="absolute inset-0">
          <Image
            src="/motos/yamaha-fz25.webp"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/35" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-container-max px-margin-mobile pt-28 pb-12 md:px-margin-desktop md:pt-32 md:pb-16">
          <p className="animate-fade-rise mb-3 flex items-center gap-3 font-label-caps text-white/60 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
            <span aria-hidden className="h-[2px] w-8 rounded-full bg-brand-bright" />
            Nuestra historia
          </p>
          <h1 className="animate-fade-rise animate-delay-1 max-w-2xl font-display text-[36px] leading-[1.05] tracking-[-0.02em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] md:text-[52px] lg:text-[58px]">
            Libertad sobre dos ruedas en Bogotá y Neiva
          </h1>
          <p className="animate-fade-rise animate-delay-2 mt-4 max-w-xl font-body text-white/75 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
            En {SITE_NAME} alquilar una moto es empezar un viaje con confianza: flota cuidada,
            procesos claros y soporte real.
          </p>
        </div>
      </header>

      {/* Mission + values */}
      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <div className="animate-float-up stagger-1 rounded-[24px] bg-warm-taupe p-8 md:col-span-7 md:p-12">
            <SectionHeading eyebrow="Por qué existimos" title="Nuestra misión" className="mb-6" size="lg" />
            <p className="font-body leading-relaxed text-smoke">
              Ofrecemos alquiler de motocicletas con mantenimiento preventivo serio y atención
              cercana — para turistas y profesionales que necesitan moverse con agilidad en Bogotá
              y Neiva.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-stone pt-8">
              <div className="group">
                <p className="font-display text-[42px] text-gradient-brand md:text-[48px]">100%</p>
                <p className="mt-1 font-label-caps text-ash">Mantenimiento</p>
              </div>
              <div className="group">
                <p className="font-display text-[42px] text-gradient-brand md:text-[48px]">24/7</p>
                <p className="mt-1 font-label-caps text-ash">Soporte vial</p>
              </div>
            </div>
          </div>

          <div className="animate-float-up stagger-2 flex flex-col justify-center rounded-[24px] border border-stone bg-eggshell p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] md:col-span-5 md:p-10">
            <span
              aria-hidden
              className="material-symbols-outlined mb-5 flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-[24px] text-brand"
            >
              route
            </span>
            <h3 className="font-heading-sm text-[22px] text-ink md:text-[24px]">Experiencia simple</h3>
            <p className="mt-3 font-body-sm text-smoke">
              Reserva rápida por WhatsApp. Más tiempo en la carretera, menos trámites.
            </p>
            <ul className="mt-6 flex flex-col gap-3.5">
              {[
                "Reserva segura por WhatsApp",
                "Entrega en sede, domicilio o aeropuerto",
                "Dos cascos reglamentarios incluidos",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-body-sm text-graphite">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 mt-0.5">
                    <span className="material-symbols-outlined text-[14px] text-brand">check</span>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-[28px] bg-linear-to-br from-brand via-[#2d3a6e] to-[#1a2245] px-6 py-16 text-center text-white md:px-12 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[-10%] size-[340px] rounded-full bg-white/8 blur-[90px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 left-[-5%] size-[250px] rounded-full bg-brand-bright/15 blur-[70px]"
          />

          <div className="relative mx-auto max-w-2xl">
            <p className="flex items-center justify-center gap-3 font-label-caps text-white/50">
              <span aria-hidden className="h-[2px] w-6 rounded-full bg-brand-bright" />
              ¿Listo para salir?
              <span aria-hidden className="h-[2px] w-6 rounded-full bg-brand-bright" />
            </p>
            <h2 className="mt-5 font-display text-[30px] leading-[1.08] tracking-[-0.02em] text-white md:text-[42px]">
              Tu próxima ruta empieza aquí
            </h2>
            <p className="mt-4 font-body text-white/65">
              Explora el catálogo o escríbenos. Te ayudamos a elegir la moto ideal.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/catalog"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 font-button text-ink shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] active:scale-[0.98]"
              >
                Ver catálogo
                <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 px-7 font-button text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
