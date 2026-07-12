"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BrandLogo, SITE_NAME } from "@/app/(site)/components/BrandLogo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/admin", label: "Resumen", icon: "dashboard" },
  { href: "/admin/products", label: "Productos", icon: "two_wheeler" },
  { href: "/admin/locations", label: "Ubicaciones", icon: "location_on" },
  { href: "/admin/sedes", label: "Sedes", icon: "store" },
  { href: "/admin/contact", label: "Contacto", icon: "mail" },
]

export function AdminShell({
  children,
  logoutAction,
}: {
  children: React.ReactNode
  // Server action bound to the logout form
  logoutAction: (formData: FormData) => void | Promise<void>
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  const NavLinks = (
    <nav className="flex flex-col gap-1">
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 font-body-sm transition-colors",
            isActive(item.href)
              ? "bg-warm-taupe text-ink"
              : "text-smoke hover:bg-warm-taupe/60 hover:text-ink"
          )}
        >
          <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-eggshell text-ink">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-stone bg-eggshell px-4 py-3 md:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <BrandLogo size={28} />
          <span className="font-button text-sm">Admin</span>
        </Link>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Menú">
          <span className="material-symbols-outlined text-2xl">
            {open ? "close" : "menu"}
          </span>
        </button>
      </header>

      {open ? (
        <div className="fixed inset-0 z-30 bg-ink/20 md:hidden" onClick={() => setOpen(false)} />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-stone bg-eggshell p-5 transition-transform duration-300 md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Link href="/admin" className="mb-8 hidden items-center gap-2.5 md:flex">
          <BrandLogo size={32} />
          <div>
            <p className="font-label-caps text-ash">Admin</p>
            <p className="font-button text-sm text-ink">{SITE_NAME}</p>
          </div>
        </Link>

        <div className="flex-1 overflow-y-auto pt-2 md:pt-0">{NavLinks}</div>

        <div className="mt-4 border-t border-stone pt-4">
          <Link
            href="/"
            className="mb-2 flex h-8 w-full items-center justify-center rounded-full border border-[#e5e5e5] bg-eggshell text-[0.8rem] font-medium text-ink transition-colors hover:bg-warm-taupe"
          >
            Ver sitio
          </Link>
          <form action={logoutAction}>
            <Button type="submit" variant="ghost" size="sm" className="w-full">
              Cerrar sesión
            </Button>
          </form>
        </div>
      </aside>

      <main className="md:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</div>
      </main>
    </div>
  )
}
