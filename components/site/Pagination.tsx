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
      className={cn("mt-10 flex items-center justify-center gap-2", className)}
    >
      <PaginationLink href={hrefForPage(prev)} disabled={page <= 1} rel="prev">
        Anterior
      </PaginationLink>
      <span className="min-w-[5rem] text-center font-meta text-[12px] text-ash">
        {page} / {totalPages}
      </span>
      <PaginationLink href={hrefForPage(next)} disabled={page >= totalPages} rel="next">
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
}: {
  href: string
  disabled?: boolean
  children: React.ReactNode
  rel?: string
}) {
  if (disabled) {
    return (
      <span className="rounded-full border border-[#e5e5e5] px-4 py-2 font-button text-ash opacity-50">
        {children}
      </span>
    )
  }

  return (
    <Link
      href={href}
      rel={rel}
      className="rounded-full border border-[#e5e5e5] bg-eggshell px-4 py-2 font-button text-ink transition-colors hover:bg-warm-taupe"
      scroll={false}
    >
      {children}
    </Link>
  )
}
