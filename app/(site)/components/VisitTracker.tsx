"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

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

    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {
      // best-effort — a failed visit log should never affect the page
    })
  }, [pathname])

  return null
}
