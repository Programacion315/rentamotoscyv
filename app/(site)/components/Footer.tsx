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
  const email = contact?.email?.trim() || null
  const whatsapp = contact?.whatsapp?.replace(/\D/g, "") || null
  const wa = whatsapp ? whatsappHref(whatsapp) : null
  const primarySede = sedes[0] ?? null
  const locationNames = locations.map((l) => l.name).filter(Boolean)
  const citiesLabel = joinSpanish(locationNames)

  return (
    <footer className="mt-auto bg-eggshell">
      <div className="mx-auto max-w-container-max px-margin-mobile pt-20 pb-10 md:px-margin-desktop md:pt-24 md:pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="flex flex-col gap-5 md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <BrandLogo size={36} />
              <span className="text-[15px] font-medium text-ink">{SITE_NAME}</span>
            </Link>
            <p className="max-w-sm text-[15px] leading-relaxed text-smoke">
              {citiesLabel
                ? `Alquiler de motocicletas en ${citiesLabel}. Mantenimiento certificado y atención personalizada.`
                : "Alquiler de motocicletas. Mantenimiento certificado y atención personalizada."}
            </p>
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Reservar por WhatsApp
              </a>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 md:col-span-3">
            <p className="font-meta text-[12px] tracking-wide text-ash uppercase">Enlaces</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/", label: "Inicio" },
                { href: "/catalog", label: "Catálogo" },
                { href: "/about", label: "Acerca de" },
                { href: "/contact", label: "Contacto" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[15px] text-graphite transition-opacity hover:opacity-70"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 md:col-span-4">
            <p className="font-meta text-[12px] tracking-wide text-ash uppercase">Contacto</p>
            <div className="flex flex-col gap-3 text-[15px]">
              {phone ? (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-graphite hover:text-ink">
                  {phone}
                </a>
              ) : null}
              {email ? (
                <a href={`mailto:${email}`} className="text-graphite hover:text-ink">
                  {email}
                </a>
              ) : null}
              {primarySede ? <p className="text-smoke">{primarySede.address}</p> : null}
            </div>
            {(wa || phone || email || socials.length > 0) && (
              <div className="mt-2 flex flex-wrap gap-2.5">
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
                {email ? (
                  <FooterIconLink href={`mailto:${email}`} title="Email" kind="email" />
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

        <div className="mt-14 flex flex-col gap-2 border-t border-stone pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-ash">
            © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
          </p>
          {locationNames.length > 0 ? (
            <p className="font-meta text-[12px] text-ash">{locationNames.join(" · ")}</p>
          ) : sedes.length > 0 ? (
            <p className="font-meta text-[12px] text-ash">
              {[...new Set(sedes.map((s) => s.locations?.name).filter(Boolean))].join(" · ")}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
