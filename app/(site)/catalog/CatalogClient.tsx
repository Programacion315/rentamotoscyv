"use client"

import { useCallback, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ProductCard } from "@/components/site/ProductCard"
import { Pagination } from "@/components/site/Pagination"
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
    <div className="bg-eggshell">
      {/* Hero band for catalog */}
      <section className="relative overflow-hidden bg-asphalt py-16 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-5%] size-[500px] rounded-full bg-brand/15 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 left-[-10%] size-[350px] rounded-full bg-brand-bright/10 blur-[80px]"
        />
        <div className="relative mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="animate-fade-rise max-w-2xl">
            <p className="mb-4 flex items-center gap-3 font-label-caps text-white/50">
              <span aria-hidden className="h-[2px] w-8 rounded-full bg-brand-bright" />
              Catálogo
            </p>
            <h1 className="font-display text-[36px] leading-[1.05] tracking-[-0.02em] text-white md:text-[52px] lg:text-[58px]">
              Elige tu motocicleta
            </h1>
            <p className="mt-4 font-body text-white/60">
              {locations.length > 0
                ? "Flota activa en Bogotá y Neiva. Busca, filtra por ciudad y reserva por WhatsApp."
                : "Busca por modelo o marca y reserva por WhatsApp."}
            </p>
          </div>
        </div>
      </section>

      {/* Filters & search bar */}
      <section className="border-b border-stone bg-warm-taupe/50 py-6 md:py-8">
        <div className="mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div
            className={cn(
              "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
              pending && "opacity-70"
            )}
          >
            {locations.length > 0 ? (
              <div className="flex min-w-0 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCity(null)}
                  className={cn(
                    "rounded-full px-4 py-2 font-button transition-all duration-300",
                    !citySlug
                      ? "bg-brand text-white shadow-[0_2px_8px_rgba(51,63,123,0.3)]"
                      : "border border-stone bg-eggshell text-graphite hover:border-brand/40 hover:bg-brand/5"
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
                      "rounded-full px-4 py-2 font-button transition-all duration-300",
                      citySlug === loc.slug
                        ? "bg-brand text-white shadow-[0_2px_8px_rgba(51,63,123,0.3)]"
                        : "border border-stone bg-eggshell text-graphite hover:border-brand/40 hover:bg-brand/5"
                    )}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            ) : null}

            <div
              className={cn(
                "relative w-full",
                locations.length > 0 && "shrink-0 sm:max-w-xs md:max-w-sm"
              )}
            >
              <label htmlFor="catalog-search" className="sr-only">
                Buscar motos
              </label>
              <span
                aria-hidden
                className="material-symbols-outlined pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[18px] text-ash"
              >
                search
              </span>
              <Input
                id="catalog-search"
                type="search"
                value={searchInput ?? ""}
                onChange={(e) => setSearchInput(e.target.value)}
                onBlur={commitNow}
                placeholder="Buscar por modelo o marca…"
                className="h-11 rounded-full border-stone bg-eggshell pr-4 pl-11 text-base transition-all duration-200 focus:border-brand/50 focus:ring-brand/20 md:text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
          {total > 0 ? (
            <p className="mb-6 flex items-center gap-2.5 font-label-caps text-ash">
              <span aria-hidden className="h-[2px] w-6 rounded-full bg-brand/60" />
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
                "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
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
            <div className="flex flex-col items-center justify-center rounded-[24px] border border-stone bg-warm-taupe py-20 text-center">
              <span
                aria-hidden
                className="material-symbols-outlined mb-4 flex size-16 items-center justify-center rounded-full bg-brand/10 text-[32px] text-brand"
              >
                two_wheeler
              </span>
              <p className="font-heading-sm text-[22px] text-ink">{emptyTitle}</p>
              <p className="mt-3 max-w-md font-body-sm text-smoke">{emptyBody}</p>
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
        </div>
      </section>
    </div>
  )
}
