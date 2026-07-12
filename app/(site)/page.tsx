import Image from "next/image"
import Link from "next/link"
import { SITE_NAME } from "@/app/(site)/components/BrandLogo"
import { ProductCard } from "@/components/site/ProductCard"
import { FaqAccordion } from "@/components/site/FaqAccordion"
import { Section, SectionHeading } from "@/components/site/Section"
import { getFeaturedProducts } from "@/lib/data/queries"

const FAQ_ITEMS = [
  {
    q: "¿Cómo puedo realizar una reclamación?",
    a: "Escríbenos por WhatsApp o correo con tu número de contrato y el motivo. Respondemos en menos de 24 horas hábiles.",
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
      {/* Hero */}
      <section className="mx-auto max-w-container-max px-margin-mobile pt-10 pb-16 md:px-margin-desktop md:pt-16 md:pb-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="animate-fade-rise font-label-caps text-ash">Bogotá · Neiva</p>
            <h1 className="animate-fade-rise animate-delay-1 mt-3 font-display text-[40px] leading-[1.05] tracking-[-0.02em] text-ink md:text-[52px]">
              {SITE_NAME}
            </h1>
            <p className="animate-fade-rise animate-delay-2 mt-4 font-heading text-[22px] leading-snug text-graphite md:text-[28px]">
              Libertad sobre dos ruedas
            </p>
            <p className="animate-fade-rise animate-delay-3 mt-5 max-w-md font-body text-smoke">
              Motocicletas mantenidas a la perfección, entrega ágil y atención personalizada para
              recorrer la ciudad con confianza.
            </p>
            <div className="animate-fade-rise animate-delay-4 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/catalog"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-black px-6 text-sm font-medium text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-opacity hover:opacity-90"
              >
                Ver catálogo
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full border border-[#e5e5e5] bg-eggshell px-6 text-sm font-medium text-ink transition-colors hover:bg-warm-taupe"
              >
                Contáctanos
              </Link>
            </div>
          </div>

          <div className="animate-fade-rise animate-delay-2 relative lg:col-span-7">
            <div className="spark-orb absolute -top-8 -right-6 size-[200px] opacity-50 md:size-[260px]" />
            <div className="relative overflow-hidden rounded-[28px] bg-warm-taupe shadow-whisper md:rounded-[32px]">
              <div className="relative aspect-[4/3] md:aspect-[16/11]">
                <Image
                  src="/motos/yamaha-fz25.webp"
                  alt="Motocicleta Yamaha lista para renta"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requisitos */}
      <Section band className="!py-12 md:!py-14">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="font-heading-sm text-[24px] text-ink md:text-[28px]">
            Requisitos para la renta
          </h2>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {["Mayor de 18 años", "Licencia vigente", "Documento o pasaporte"].map((item) => (
              <li key={item} className="flex items-center gap-2 font-body-sm text-graphite">
                <span className="material-symbols-outlined text-[18px] text-smoke">check</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

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
            className="inline-flex h-9 items-center justify-center rounded-full border border-[#e5e5e5] bg-eggshell px-4 text-[13px] font-medium text-ink transition-colors hover:bg-warm-taupe"
          >
            Ver todo
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

      {/* Cobertura */}
      <Section band>
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
              className="rounded-[24px] bg-eggshell p-8 shadow-whisper md:p-10"
            >
              <span className="material-symbols-outlined text-3xl text-graphite">{card.icon}</span>
              <h3 className="mt-5 font-heading-sm text-[24px] text-ink">{card.title}</h3>
              <p className="mt-3 font-body leading-relaxed text-smoke">{card.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Soporte"
            title="Preguntas frecuentes"
            description="Dudas sobre requisitos, tarifas o entregas. Respondemos por WhatsApp o correo."
            className="mx-auto mb-10 text-center"
          />
          <FaqAccordion items={FAQ_ITEMS} />
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-full border border-[#e5e5e5] bg-eggshell px-5 text-sm font-medium text-ink transition-colors hover:bg-warm-taupe"
            >
              Contactar soporte
            </Link>
          </div>
        </div>
      </Section>
    </div>
  )
}
