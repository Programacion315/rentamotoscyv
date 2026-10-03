import { NextResponse } from "next/server"
import { getCatalogProductsPage } from "@/lib/data/queries"

/**
 * Backs the catalog's infinite scroll: CatalogClient fetches subsequent
 * pages from here as the user scrolls, instead of navigating to ?page=N.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")?.trim() || null
  const citySlug = searchParams.get("city")?.trim().toLowerCase() || null
  const page = Math.max(1, Number.parseInt(searchParams.get("page") ?? "1", 10) || 1)

  const result = await getCatalogProductsPage({ page, citySlug, q })
  return NextResponse.json(result)
}
