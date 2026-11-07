"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

/**
 * Fire-and-forget page view logger for the public site. Mounted once in
 * the (site) layout so admin pages aren't counted. Runs client-side only
 * (not during server-side prefetching) so it reflects real visits.
 */
export function VisitTracker() {
  const pathname = usePathname()
  const lastTracked = useRef<string | null>(null)

  useEffect(() => {
    if (lastTracked.current === pathname) return
    lastTracked.current = pathname

    const supabase = createClient()
    supabase
      .from("page_views")
      .insert({ path: pathname })
      .then(({ error }) => {
        // console.warn (not .error) — Next.js dev shows console.error as a
        // full-screen overlay, which would make this look like a crash even
        // though the failure is harmless and already handled.
        if (error) console.warn("No se pudo registrar la visita:", error.message)
      })
  }, [pathname])

  return null
}
