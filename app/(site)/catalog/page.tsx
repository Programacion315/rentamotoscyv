import { getActiveLocations, getCatalogProductsPage } from "@/lib/data/queries"
import CatalogClient from "./CatalogClient"

type SearchParams = Promise<{
  q?: string | string[]
  city?: string | string[]
  page?: string | string[]
}>

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ""
  return value ?? ""
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const q = first(params.q).trim()
  const citySlug = first(params.city).trim().toLowerCase() || null
  const page = Math.max(1, Number.parseInt(first(params.page), 10) || 1)

  const [result, locations] = await Promise.all([
    getCatalogProductsPage({ page, citySlug, q: q || null }),
    getActiveLocations(),
  ])

  return (
    <CatalogClient
      products={result.items}
      locations={locations}
      total={result.total}
      page={result.page}
      totalPages={result.totalPages}
      q={q}
      citySlug={citySlug}
    />
  )
}
