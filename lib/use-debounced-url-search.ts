"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

type UseDebouncedUrlSearchOptions = {
  committedQ: string
  buildHref: (q: string) => string
  delay?: number
}

export function useDebouncedUrlSearch({
  committedQ,
  buildHref,
  delay = 300,
}: UseDebouncedUrlSearchOptions) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [searchInput, setSearchInput] = useState(committedQ ?? "")
  const prevCommittedRef = useRef(committedQ ?? "")

  useEffect(() => {
    const prev = prevCommittedRef.current
    const nextCommitted = committedQ ?? ""
    if (nextCommitted === prev) return

    prevCommittedRef.current = nextCommitted

    setSearchInput((current) => {
      if (current.trim() === prev.trim()) {
        return nextCommitted
      }
      return current
    })
  }, [committedQ])

  useEffect(() => {
    const next = (searchInput ?? "").trim()
    if (next === (committedQ ?? "")) return

    const effectiveDelay = next === "" ? 0 : delay
    const handle = window.setTimeout(() => {
      startTransition(() => {
        router.push(buildHref(next))
      })
    }, effectiveDelay)

    return () => window.clearTimeout(handle)
  }, [searchInput, committedQ, buildHref, router, delay])

  function commitNow() {
    const next = (searchInput ?? "").trim()
    if (next === (committedQ ?? "")) return
    startTransition(() => {
      router.push(buildHref(next))
    })
  }

  return {
    searchInput,
    setSearchInput,
    pending,
    commitNow,
  }
}
