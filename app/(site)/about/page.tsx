import Image from "next/image"
import Link from "next/link"
import { SITE_NAME } from "@/app/(site)/components/BrandLogo"
import { Section, SectionHeading } from "@/components/site/Section"

export default function About() {
  return (
    <div className="bg-eggshell text-ink">
      {/* Pulls under fixed nav so glass header sits over the hero */}
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
          <p className="animate-fade-rise mb-3 flex items-center gap-2.5 font-label-caps text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
            <span aria-hidden className="h-[2px] w-7 rounded-full bg-brand-bright" />
            Nuestra historia
          </p>
          <h1 className="animate-fade-rise animate-delay-1 max-w-2xl font-display text-[36px] leading-[1.08] tracking-[-0.02em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] md:text-[48px]">
            Libertad sobre dos ruedas en Bogotá y Neiva
          </h1>
          <p className="animate-fade-rise animate-delay-2 mt-4 max-w-xl font-body text-white/80 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
            En {SITE_NAME} alquilar una moto es empezar un viaje con confianza: flota cuidada,
            procesos claros y soporte real.
          </p>
        </div>
      </header>

      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <div className="rounded-[24px] bg-warm-taupe p-8 md:col-span-7 md:p-12">
            <SectionHeading eyebrow="Por qué existimos" title="Nuestra misión" className="mb-6" />
            <p className="font-body leading-relaxed text-smoke">
              Ofrecemos alquiler de motocicletas con mantenimiento preventivo serio y atención
              cercana — para turistas y profesionales que necesitan moverse con agilidad en Bogotá
              y Neiva.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-stone pt-8">
              <div>
                <p className="font-display text-[36px] text-brand">100%</p>
                <p className="mt-1 font-label-caps text-ash">Mantenimiento</p>
              </div>
              <div>
                <p className="font-display text-[36px] text-brand">24/7</p>
                <p className="mt-1 font-label-caps text-ash">Soporte vial</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-[24px] border border-stone bg-eggshell p-8 md:col-span-5 md:p-10">
            <span
              aria-hidden
              className="material-symbols-outlined mb-5 flex size-11 items-center justify-center rounded-full bg-brand/10 text-[22px] text-brand"
            >
              route
            </span>
            <h3 className="font-heading-sm text-[24px] text-ink">Experiencia simple</h3>
            <p className="mt-3 font-body-sm text-smoke">
              Reserva rápida por WhatsApp. Más tiempo en la carretera, menos trámites.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Reserva segura por WhatsApp",
                "Entrega en sede, domicilio o aeropuerto",
                "Dos cascos reglamentarios incluidos",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 font-body-sm text-graphite">
                  <span className="material-symbols-outlined text-[18px] text-brand">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-[28px] bg-linear-to-br from-brand to-[#232c58] px-6 py-14 text-center text-white md:px-12 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[-10%] size-[340px] rounded-full bg-white/10 blur-[90px]"
          />
          <div className="relative mx-auto max-w-2xl">
            <p className="font-label-caps text-white/70">¿Listo para salir?</p>
            <h2 className="mt-4 font-heading text-[28px] text-white md:text-[36px]">
              Tu próxima ruta empieza aquí
            </h2>
            <p className="mt-4 font-body text-white/75">
              Explora el catálogo o escríbenos. Te ayudamos a elegir la moto ideal.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/catalog"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-white px-6 text-sm font-medium text-ink transition-opacity hover:opacity-90"
              >
                Ver catálogo
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/35 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
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
