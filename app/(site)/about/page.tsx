import Image from "next/image"
import Link from "next/link"
import { SITE_NAME } from "@/app/(site)/components/BrandLogo"
import { Section, SectionHeading } from "@/components/site/Section"

export default function About() {
  return (
    <div className="bg-eggshell text-ink">
      {/* Pulls under fixed nav so glass header sits over the hero */}
      <header className="relative -mt-14 flex min-h-[52vh] items-end overflow-hidden md:min-h-[62vh]">
        <div className="absolute inset-0">
          <Image
            src="/motos/yamaha-fz25.webp"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-eggshell via-eggshell/70 to-black/35" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-container-max px-margin-mobile pt-28 pb-12 md:px-margin-desktop md:pt-32 md:pb-16">
          <p className="animate-fade-rise mb-3 font-label-caps text-ash">Nuestra historia</p>
          <h1 className="animate-fade-rise animate-delay-1 max-w-2xl font-display text-[36px] leading-[1.08] tracking-[-0.02em] md:text-[48px]">
            Libertad sobre dos ruedas en Bogotá y Neiva
          </h1>
          <p className="animate-fade-rise animate-delay-2 mt-4 max-w-xl font-body text-smoke">
            En {SITE_NAME} alquilar una moto es empezar un viaje con confianza: flota cuidada,
            procesos claros y soporte real.
          </p>
        </div>
      </header>

      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <div className="rounded-[24px] bg-warm-taupe p-8 md:col-span-7 md:p-12">
            <SectionHeading title="Nuestra misión" className="mb-6" />
            <p className="font-body leading-relaxed text-smoke">
              Ofrecemos alquiler de motocicletas con mantenimiento preventivo serio y atención
              cercana — para turistas y profesionales que necesitan moverse con agilidad en Bogotá
              y Neiva.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-stone pt-8">
              <div>
                <p className="font-display text-[36px] text-ink">100%</p>
                <p className="mt-1 font-label-caps text-ash">Mantenimiento</p>
              </div>
              <div>
                <p className="font-display text-[36px] text-ink">24/7</p>
                <p className="mt-1 font-label-caps text-ash">Soporte vial</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-[24px] border border-stone bg-eggshell p-8 md:col-span-5 md:p-10">
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
                  <span className="material-symbols-outlined text-[18px] text-smoke">check</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section band>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            title="¿Listo para salir?"
            description="Explora el catálogo o escríbenos. Te ayudamos a elegir la moto ideal."
            className="mx-auto mb-8"
          />
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/catalog"
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-black px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Ver catálogo
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#e5e5e5] bg-eggshell px-6 text-sm font-medium text-ink transition-colors hover:bg-warm-taupe"
            >
              Contacto
            </Link>
          </div>
        </div>
      </Section>
    </div>
  )
}
