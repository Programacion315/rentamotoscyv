"use client"

import { useCallback, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ProductCard } from "@/components/site/ProductCard"
import { Pagination } from "@/components/site/Pagination"
import { PageShell } from "@/components/site/Section"
import { Input } from "@/components/ui/input"
import { useDebouncedUrlSearch } from "@/lib/use-debounced-url-search"
import { cn } from "@/lib/utils"
import type { Location, Product } from "@/lib/types"

function buildCatalogHref(params: {
  q?: string
  city?: string
  page?: number
}) {
  const sp = new URLSearchParams()
  const q = params.q?.trim()
  if (q) sp.set("q", q)
  if (params.city) sp.set("city", params.city)
  if (params.page && params.page > 1) sp.set("page", String(params.page))
  const qs = sp.toString()
  return qs ? `/catalog?${qs}` : "/catalog"
}

export default function CatalogClient({
  products,
  locations,
  total,
  page,
  totalPages,
  q,
  citySlug,
}: {
  products: Product[]
  locations: Location[]
  total: number
  page: number
  totalPages: number
  q: string
  citySlug: string | null
}) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const buildSearchHref = useCallback(
    (query: string) =>
      buildCatalogHref({ q: query, city: citySlug ?? undefined, page: 1 }),
    [citySlug]
  )
  const { searchInput, setSearchInput, pending, commitNow } = useDebouncedUrlSearch({
    committedQ: q,
    buildHref: buildSearchHref,
  })

  function setCity(nextSlug: string | null) {
    startTransition(() => {
      router.push(
        buildCatalogHref({
          q: searchInput.trim(),
          city: nextSlug ?? undefined,
          page: 1,
        })
      )
    })
  }

  const hasFilters = Boolean(q || citySlug)
  const emptyTitle = q
    ? "Sin resultados para tu búsqueda"
    : citySlug
      ? "Sin motos en esta ciudad"
      : "Sin motos disponibles"
  const emptyBody = q
    ? "Prueba con otro nombre o marca, o limpia la búsqueda."
    : citySlug
      ? "Prueba otra ciudad o contáctanos para disponibilidad."
      : "Vuelve pronto o escríbenos por WhatsApp."

  return (
    <PageShell>
      <div className="mb-10 max-w-2xl animate-fade-rise">
        <p className="font-label-caps text-ash mb-3">Catálogo</p>
        <h1 className="font-display-lg text-[36px] md:text-[48px] text-ink">
          Elige tu motocicleta
        </h1>
        <p className="mt-4 font-body text-smoke">
          Flota activa en Bogotá y Neiva. Busca, filtra por ciudad y reserva por WhatsApp.
        </p>
      </div>

      <div
        className={cn(
          "mb-10 flex flex-col gap-4 animate-fade-rise animate-delay-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
          pending && "opacity-70"
        )}
      >
        {locations.length > 0 ? (
          <div className="flex min-w-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCity(null)}
              className={cn(
                "rounded-full border px-4 py-2 font-button transition-colors",
                !citySlug
                  ? "border-ink bg-ink text-eggshell"
                  : "border-[#e5e5e5] bg-eggshell text-ink hover:bg-warm-taupe"
              )}
            >
              Todas
            </button>
            {locations.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setCity(loc.slug)}
                className={cn(
                  "rounded-full border px-4 py-2 font-button transition-colors",
                  citySlug === loc.slug
                    ? "border-ink bg-ink text-eggshell"
                    : "border-[#e5e5e5] bg-eggshell text-ink hover:bg-warm-taupe"
                )}
              >
                {loc.name}
              </button>
            ))}
          </div>
        ) : (
          <div />
        )}

        <div className="w-full shrink-0 sm:max-w-xs md:max-w-sm">
          <label htmlFor="catalog-search" className="sr-only">
            Buscar motos
          </label>
          <Input
            id="catalog-search"
            type="search"
            value={searchInput ?? ""}
            onChange={(e) => setSearchInput(e.target.value)}
            onBlur={commitNow}
            placeholder="Buscar por modelo o marca…"
            className="h-11 rounded-full border-[#e5e5e5] bg-eggshell px-4 text-base md:text-sm"
          />
        </div>
      </div>

      {total > 0 ? (
        <p className="mb-4 font-meta text-[12px] text-ash">
          {total} moto{total === 1 ? "" : "s"}
          {hasFilters
            ? total === 1
              ? " encontrada"
              : " encontradas"
            : " disponibles"}
        </p>
      ) : null}

      {products.length > 0 ? (
        <div
          className={cn(
            "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
            pending && "opacity-70"
          )}
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={page === 1 && index < 3}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] bg-warm-taupe px-8 py-16 text-center">
          <p className="font-heading-sm text-[24px] text-ink">{emptyTitle}</p>
          <p className="mt-3 font-body-sm text-smoke">{emptyBody}</p>
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        hrefForPage={(p) =>
          buildCatalogHref({
            q,
            city: citySlug ?? undefined,
            page: p,
          })
        }
      />
    </PageShell>
  )
}
