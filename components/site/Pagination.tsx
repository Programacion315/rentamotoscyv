import Link from "next/link"
import { cn } from "@/lib/utils"

export function Pagination({
  page,
  totalPages,
  hrefForPage,
  className,
}: {
  page: number
  totalPages: number
  hrefForPage: (page: number) => string
  className?: string
}) {
  if (totalPages <= 1) return null

  const prev = Math.max(1, page - 1)
  const next = Math.min(totalPages, page + 1)

  return (
    <nav
      aria-label="Paginación"
      className={cn("mt-12 flex items-center justify-center gap-3", className)}
    >
      <PaginationLink href={hrefForPage(prev)} disabled={page <= 1} rel="prev" direction="prev">
        Anterior
      </PaginationLink>
      <span className="flex h-10 min-w-[5rem] items-center justify-center rounded-full bg-warm-taupe px-4 font-button text-smoke">
        {page} / {totalPages}
      </span>
      <PaginationLink href={hrefForPage(next)} disabled={page >= totalPages} rel="next" direction="next">
        Siguiente
      </PaginationLink>
    </nav>
  )
}

function PaginationLink({
  href,
  disabled,
  children,
  rel,
  direction,
}: {
  href: string
  disabled?: boolean
  children: React.ReactNode
  rel?: string
  direction: "prev" | "next"
}) {
  if (disabled) {
    return (
      <span className="inline-flex h-10 items-center gap-1.5 rounded-full border border-stone px-5 font-button text-ash opacity-40">
        {direction === "prev" && (
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
        )}
        {children}
        {direction === "next" && (
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        )}
      </span>
    )
  }

  return (
    <Link
      href={href}
      rel={rel}
      className="group inline-flex h-10 items-center gap-1.5 rounded-full border border-stone bg-eggshell px-5 font-button text-ink transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white hover:shadow-[0_4px_12px_rgba(51,63,123,0.2)]"
      scroll={false}
    >
      {direction === "prev" && (
        <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:-translate-x-0.5">chevron_left</span>
      )}
      {children}
      {direction === "next" && (
        <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-0.5">chevron_right</span>
      )}
    </Link>
  )
}
