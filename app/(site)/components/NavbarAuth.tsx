"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { cn } from "@/lib/utils"

function isAdmin(user: User | null) {
  return user?.app_metadata?.role === "admin"
}

function displayLabel(user: User) {
  const email = user.email ?? ""
  const name = email.split("@")[0]
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "Admin"
}

export default function NavbarAuth({
  onNavigate,
  light = false,
}: {
  onNavigate?: () => void
  light?: boolean
}) {
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => {
      setUser(isAdmin(data.user) ? data.user : null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null
      setUser(isAdmin(nextUser) ? nextUser : null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!open) return

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setOpen(false)
    onNavigate?.()
    router.refresh()
  }

  if (loading) {
    return (
      <div
        className={cn(
          "hidden h-9 w-24 animate-pulse rounded-full md:block",
          light ? "bg-white/20" : "bg-warm-taupe"
        )}
        aria-hidden
      />
    )
  }

  if (!user) {
    return (
      <Link
        href="/admin/login"
        onClick={onNavigate}
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-full px-4 text-[13px] font-medium transition-colors",
          light
            ? "border border-white/35 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            : "border border-[#e5e5e5] bg-eggshell text-ink hover:bg-warm-taupe"
        )}
      >
        Iniciar sesión
      </Link>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex h-9 items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors",
          light
            ? "border border-white/35 bg-white/10 text-white hover:bg-white/20"
            : "border border-[#e5e5e5] bg-eggshell text-ink hover:bg-warm-taupe"
        )}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span
          className={cn(
            "flex size-6 items-center justify-center rounded-full text-xs font-medium",
            light ? "bg-white text-black" : "bg-primary text-primary-foreground"
          )}
        >
          {displayLabel(user).charAt(0)}
        </span>
        <span className="hidden max-w-[120px] truncate md:inline">{displayLabel(user)}</span>
        <span className="material-symbols-outlined text-lg">
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 min-w-[200px] overflow-hidden rounded-[20px] border border-stone bg-eggshell py-1 shadow-whisper"
        >
          <p className="border-b border-stone px-4 py-2 font-meta text-ash">{user.email}</p>
          <Link
            href="/admin"
            role="menuitem"
            onClick={() => {
              setOpen(false)
              onNavigate?.()
            }}
            className="flex items-center gap-2 px-4 py-2.5 font-body-sm text-ink hover:bg-warm-taupe"
          >
            <span className="material-symbols-outlined text-lg">dashboard</span>
            Panel admin
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-body-sm text-ink hover:bg-warm-taupe"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Cerrar sesión
          </button>
        </div>
      ) : null}
    </div>
  )
}
