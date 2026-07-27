import Link from "next/link"
import { BrandLogo, SITE_NAME } from "@/app/(site)/components/BrandLogo"
import {
  FooterIconLink,
  footerIconFromLabel,
} from "@/components/site/FooterContactIcons"
import {
  getActiveLocations,
  getActiveSedes,
  getActiveSocialLinks,
  getSiteContact,
} from "@/lib/data/queries"
import { whatsappHref } from "@/lib/types"

function joinSpanish(names: string[]): string {
  if (names.length === 0) return ""
  if (names.length === 1) return names[0]
  if (names.length === 2) return `${names[0]} y ${names[1]}`
  return `${names.slice(0, -1).join(", ")} y ${names.at(-1)}`
}

export default async function Footer() {
  const [contact, socials, sedes, locations] = await Promise.all([
    getSiteContact(),
    getActiveSocialLinks(),
    getActiveSedes(),
    getActiveLocations(),
  ])

  const phone = contact?.phone?.trim() || null
  const whatsapp = contact?.whatsapp?.replace(/\D/g, "") || null
  const wa = whatsapp ? whatsappHref(whatsapp) : null
  const primarySede = sedes[0] ?? null
  const locationNames = locations.map((l) => l.name).filter(Boolean)
  const citiesLabel = joinSpanish(locationNames)

  return (
    <footer className="relative mt-auto overflow-hidden bg-asphalt text-white">
      {/* Brand glow + hairline top accent */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-bright/50 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[720px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-[-10%] size-[400px] rounded-full bg-brand-bright/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-container-max px-margin-mobile pt-20 pb-10 md:px-margin-desktop md:pt-24 md:pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-5 md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3.5">
              <BrandLogo size={84} className="brightness-0 invert" />
              <span className="text-[17px] font-semibold tracking-tight text-white">{SITE_NAME}</span>
            </Link>
            <p className="max-w-sm text-[15px] leading-relaxed text-white/55">
              {citiesLabel
                ? `Alquiler de motocicletas en ${citiesLabel}. Mantenimiento certificado y atención personalizada.`
                : "Alquiler de motocicletas. Mantenimiento certificado y atención personalizada."}
            </p>
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-whatsapp px-5 py-3 font-button font-medium text-white shadow-[0_4px_16px_rgba(37,211,102,0.3)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,211,102,0.4)] active:scale-[0.98]"
              >
                Reservar por WhatsApp
                <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
              </a>
            ) : null}
          </div>

          {/* Links column */}
          <div className="flex flex-col gap-4 md:col-span-3">
            <p className="flex items-center gap-2.5 font-label-caps text-white/40">
              <span aria-hidden className="h-[2px] w-6 rounded-full bg-brand-bright" />
              Enlaces
            </p>
            <nav className="flex flex-col gap-3.5">
              {[
                { href: "/", label: "Inicio" },
                { href: "/catalog", label: "Catálogo" },
                { href: "/about", label: "Acerca de" },
                { href: "/contact", label: "Contacto" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link-underline text-[15px] text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-4 md:col-span-4">
            <p className="flex items-center gap-2.5 font-label-caps text-white/40">
              <span aria-hidden className="h-[2px] w-6 rounded-full bg-brand-bright" />
              Contacto
            </p>
            <div className="flex flex-col gap-3 text-[15px]">
              {phone ? (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {phone}
                </a>
              ) : null}
              {primarySede ? <p className="text-white/45">{primarySede.address}</p> : null}
            </div>
            {(wa || phone || socials.length > 0) && (
              <div className="mt-3 flex flex-wrap gap-2.5">
                {wa ? (
                  <FooterIconLink href={wa} title="WhatsApp" kind="whatsapp" external />
                ) : null}
                {phone ? (
                  <FooterIconLink
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    title="Llamar"
                    kind="phone"
                  />
                ) : null}
                {socials.map((s) => (
                  <FooterIconLink
                    key={s.id}
                    href={s.url}
                    title={s.label}
                    kind={footerIconFromLabel(s.label)}
                    external
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-white/35">
            © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
          </p>
          {locationNames.length > 0 ? (
            <p className="font-meta text-[12px] text-white/35">{locationNames.join(" · ")}</p>
          ) : sedes.length > 0 ? (
            <p className="font-meta text-[12px] text-white/35">
              {[...new Set(sedes.map((s) => s.locations?.name).filter(Boolean))].join(" · ")}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
