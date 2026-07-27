"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import NavbarAuth from "@/app/(site)/components/NavbarAuth"
import { BrandLogo, SITE_NAME } from "@/app/(site)/components/BrandLogo"
import { whatsappHref } from "@/lib/types"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Inicio", path: "/" },
  { name: "Catálogo", path: "/catalog" },
  { name: "Acerca de", path: "/about" },
  { name: "Contacto", path: "/contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Pages with a full-bleed hero that pulls under the fixed nav
  const hasHero =
    pathname === "/" || pathname === "/about" || pathname.startsWith("/rentals/")

  const isRental = pathname.startsWith("/rentals/")

  // Over a hero: glass over the photo until scroll. Elsewhere: light frosted bar.
  const overHero = hasHero && !scrolled

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12)
        ticking = false
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Reset scroll state when route changes
  useEffect(() => {
    setScrolled(window.scrollY > 12)
  }, [pathname])

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 right-0 left-0 z-50 h-20",
          "transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ease-out",
          overHero
            ? "border-b border-transparent bg-transparent"
            : scrolled
              ? "border-b border-transparent bg-eggshell/85 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
        )}
      >
        {/* Over-hero backdrop: subtle blur + dark gradient that fades into the photo (no hard edge) */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -z-10 h-32",
            isRental
              ? "bg-linear-to-b from-black/65 via-black/30 to-transparent"
              : "bg-linear-to-b from-black/45 via-black/20 to-transparent",
            !isRental && "backdrop-blur-[3px]",
            "[mask-image:linear-gradient(to_bottom,black_35%,transparent)]",
            "transition-opacity duration-300",
            overHero ? "opacity-100" : "opacity-0"
          )}
        />
        <div className="mx-auto flex h-full max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <BrandLogo
              size={72}
              priority
              className={cn(
                "shrink-0 transition-[filter] duration-300",
                // White logo while the glass nav sits over the dark hero photo
                overHero && "brightness-0 invert drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]"
              )}
            />
            <span
              className={cn(
                "text-[15px] font-semibold tracking-tight transition-colors duration-300",
                overHero ? "text-white" : "text-ink"
              )}
            >
              {SITE_NAME}
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "font-body-sm transition-[color,opacity] duration-300 hover:opacity-70",
                  overHero
                    ? isActive(link.path)
                      ? "font-medium text-white"
                      : "text-white/75"
                    : isActive(link.path)
                      ? "font-medium text-ink"
                      : "text-smoke"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <NavbarAuth light={overHero} />
            </div>
            <Link
              href={whatsappHref("573218449988", "Hola, me gustaría reservar una moto")}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden items-center justify-center gap-1.5 rounded-full px-5 py-2.5",
                "text-[13px] font-medium tracking-wide",
                "transition-[transform,opacity,box-shadow,background-color,color] duration-200",
                "active:scale-[0.98] md:inline-flex",
                  overHero
                  ? "bg-white text-black shadow-[0_2px_12px_rgba(0,0,0,0.25)] hover:opacity-95"
                  : "bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(51,63,123,0.25)] hover:opacity-90 hover:shadow-[0_4px_14px_rgba(51,63,123,0.35)]"
              )}
            >
              Reservar
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className={cn(
                "p-1.5 md:hidden transition-colors duration-300",
                overHero ? "text-white" : "text-ink"
              )}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span className="material-symbols-outlined text-2xl">
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer — hero pages pull under nav with -mt-20 */}
      {!hasHero ? <div className="h-20" aria-hidden /> : null}

      {isOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      ) : null}

      <div
        className={cn(
          "fixed top-0 right-0 z-50 flex h-full w-[85%] max-w-sm flex-col bg-eggshell p-6 transition-transform duration-300 ease-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5">
            <BrandLogo size={64} />
            <span className="text-[15px] font-semibold tracking-tight text-ink">{SITE_NAME}</span>
          </Link>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar menú">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "rounded-[10px] px-3 py-3 font-heading-sm text-[22px] transition-colors",
                isActive(link.path) ? "bg-warm-taupe text-ink" : "text-graphite"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <NavbarAuth onNavigate={() => setIsOpen(false)} />
          <Link
            href={whatsappHref("573218449988", "Hola, me gustaría reservar una moto")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-[0_2px_8px_rgba(51,63,123,0.25)]"
          >
            Reservar
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </>
  )
}
