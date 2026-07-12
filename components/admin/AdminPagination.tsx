import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

/** Compact page list: 1 … 4 5 6 … 20 */
export function getPaginationItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const items: (number | "ellipsis")[] = [1]
  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)

  if (left > 2) items.push("ellipsis")
  for (let n = left; n <= right; n++) items.push(n)
  if (right < total - 1) items.push("ellipsis")
  items.push(total)

  return items
}

export function AdminPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  basePath,
}: {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  basePath: string
}) {
  if (totalItems === 0) return null

  const from = (currentPage - 1) * pageSize + 1
  const to = Math.min(currentPage * pageSize, totalItems)
  const items = getPaginationItems(currentPage, totalPages)

  function href(page: number) {
    if (page <= 1) return basePath
    return `${basePath}?page=${page}`
  }

  return (
    <nav
      className="mt-8 flex flex-col gap-4 border-t border-stone pt-6 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Paginación"
    >
      <p className="font-meta text-[12px] text-ash">
        Mostrando{" "}
        <span className="text-graphite">
          {from}–{to}
        </span>{" "}
        de <span className="text-graphite">{totalItems}</span> motos
      </p>

      {totalPages > 1 ? (
        <div className="flex flex-wrap items-center gap-1.5">
          <PaginationLink
            href={href(currentPage - 1)}
            disabled={currentPage <= 1}
            label="Anterior"
            rel="prev"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            <span className="hidden sm:inline">Anterior</span>
          </PaginationLink>

          {items.map((item, i) =>
            item === "ellipsis" ? (
              <span
                key={`e-${i}`}
                className="flex size-9 items-center justify-center font-meta text-ash"
                aria-hidden
              >
                …
              </span>
            ) : (
              <Link
                key={item}
                href={href(item)}
                aria-current={item === currentPage ? "page" : undefined}
                className={cn(
                  "flex size-9 items-center justify-center rounded-full font-body-sm transition-colors",
                  item === currentPage
                    ? "bg-black text-white"
                    : "text-graphite hover:bg-warm-taupe"
                )}
              >
                {item}
              </Link>
            )
          )}

          <PaginationLink
            href={href(currentPage + 1)}
            disabled={currentPage >= totalPages}
            label="Siguiente"
            rel="next"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </PaginationLink>
        </div>
      ) : null}
    </nav>
  )
}

function PaginationLink({
  href,
  disabled,
  label,
  rel,
  children,
}: {
  href: string
  disabled: boolean
  label: string
  rel?: string
  children: ReactNode
}) {
  if (disabled) {
    return (
      <span
        className="inline-flex h-9 items-center gap-1 rounded-full px-3 font-body-sm text-ash opacity-50"
        aria-disabled
      >
        {children}
      </span>
    )
  }

  return (
    <Link
      href={href}
      rel={rel}
      aria-label={label}
      className="inline-flex h-9 items-center gap-1 rounded-full px-3 font-body-sm text-graphite transition-colors hover:bg-warm-taupe"
    >
      {children}
    </Link>
  )
}
