"use client"

import { useState } from "react"
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
  // Pages with a full-bleed hero that pulls under the fixed nav
  const hasHero =
    pathname === "/" || pathname === "/about" || pathname.startsWith("/rentals/")

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-50 h-[10rem] bg-brand shadow-[0_2px_16px_rgba(0,0,0,0.2)]">
        <div className="grid h-full w-full grid-cols-[auto_1fr_auto] items-center pr-3 pl-0 md:pr-4 md:pl-0">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <BrandLogo
              size={81}
              priority
              className="shrink-0 brightness-0 invert drop-shadow-[0_1px_6px_rgba(0,0,0,0.25)]"
            />
            <span className="text-[15px] font-semibold tracking-tight text-white">
              {SITE_NAME}
            </span>
          </Link>

          <div className="hidden items-center justify-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "font-body-lg transition-opacity duration-300 hover:opacity-80",
                  isActive(link.path) ? "font-medium text-white" : "text-white/75"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <NavbarAuth light />
            </div>
            <Link
              href={whatsappHref("573218449988", "Hola, me gustaría reservar una moto")}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden items-center justify-center gap-2 rounded-full px-7 py-3.5",
                "bg-brand-bright text-base font-medium tracking-wide text-white",
                "shadow-[0_4px_16px_rgba(107,123,214,0.45)]",
                "transition-[transform,opacity,box-shadow] duration-200",
                "hover:opacity-90 hover:shadow-[0_6px_20px_rgba(107,123,214,0.55)]",
                "active:scale-[0.98] md:inline-flex"
              )}
            >
              Reservar
              <span className="material-symbols-outlined icon-liga text-[18px]">arrow_forward</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="p-1.5 text-white md:hidden"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span className="material-symbols-outlined text-2xl">
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer — hero pages pull under nav with -mt-[10rem] */}
      {!hasHero ? <div className="h-[10rem]" aria-hidden /> : null}

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
            <BrandLogo size={86} />
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
            <span className="material-symbols-outlined icon-liga text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </>
  )
}
