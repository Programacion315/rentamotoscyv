import { createClient } from "@/lib/supabase/server"
import type {
  Location,
  LocationWithUsage,
  Product,
  ProductTableRow,
  Sede,
  SiteContact,
  SocialLink,
} from "@/lib/types"

export async function getActiveLocations(): Promise<Location[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .eq("is_active", true)
    .order("sort_order")

  if (error) throw error
  return data ?? []
}

export async function getAllLocationsAdmin(): Promise<Location[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .order("sort_order")

  if (error) throw error
  return data ?? []
}

export async function getLocationsWithUsageAdmin(): Promise<LocationWithUsage[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("locations")
    .select("*, products(count), sedes(count)")
    .order("sort_order")

  if (error) throw error

  return (data ?? []).map((row) => {
    const { products, sedes, ...location } = row as Location & {
      products: { count: number }[] | null
      sedes: { count: number }[] | null
    }
    return {
      ...location,
      product_count: products?.[0]?.count ?? 0,
      sede_count: sedes?.[0]?.count ?? 0,
    }
  })
}

export async function getActiveSedes(): Promise<Sede[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("sedes")
    .select("*, locations(id, name, slug)")
    .eq("is_active", true)
    .order("sort_order")

  if (error) throw error
  return (data as Sede[]) ?? []
}

export async function getAllSedesAdmin(): Promise<Sede[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("sedes")
    .select("*, locations(id, name, slug)")
    .order("sort_order")

  if (error) throw error
  return (data as Sede[]) ?? []
}

export async function getSiteContact(): Promise<SiteContact | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("site_contact").select("*").eq("id", 1).maybeSingle()
  if (error) throw error
  return data
}

export async function getActiveSocialLinks(): Promise<SocialLink[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .eq("is_active", true)
    .order("sort_order")

  if (error) throw error
  return data ?? []
}

export async function getAllSocialLinksAdmin(): Promise<SocialLink[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("social_links").select("*").order("sort_order")
  if (error) throw error
  return data ?? []
}

const productSelect =
  "*, locations(id, name, slug), product_specs(*), product_features(*)"

const catalogListSelect =
  "id, slug, name, brand, image_path, category, location_id, is_featured, is_active, locations(id, name, slug)"

const adminTableSelect =
  "id, name, brand, slug, category, image_path, is_active, is_featured, location_id, updated_at, locations(name)"

export const CATALOG_PAGE_SIZE = 12
export const ADMIN_PRODUCTS_PAGE_SIZE = 10

export type PageResult<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/** Strip PostgREST OR wildcards from user search input */
function sanitizeSearch(q: string | undefined | null): string {
  return String(q ?? "")
    .trim()
    .replace(/[%_,.()]/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 80)
}

function mapAdminTableRow(row: unknown): ProductTableRow {
  const r = row as {
    id: string
    name: string
    brand: string
    slug: string
    category: string | null
    image_path: string | null
    is_active: boolean
    is_featured: boolean
    location_id: string
    updated_at: string | null
    locations: { name: string } | { name: string }[] | null
  }
  const loc = Array.isArray(r.locations) ? r.locations[0] : r.locations
  return {
    id: r.id,
    name: r.name,
    brand: r.brand,
    slug: r.slug,
    category: r.category,
    image_path: r.image_path,
    is_active: r.is_active,
    is_featured: r.is_featured,
    location_id: r.location_id,
    location_name: loc?.name ?? "Sin ciudad",
    updated_at: r.updated_at,
  }
}

export async function getActiveProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("is_active", true)
    .order("name")

  if (error) throw error
  return sortNested((data as Product[]) ?? [])
}

export async function getCatalogProductsPage({
  page = 1,
  pageSize = CATALOG_PAGE_SIZE,
  citySlug,
  q,
}: {
  page?: number
  pageSize?: number
  citySlug?: string | null
  q?: string | null
} = {}): Promise<PageResult<Product>> {
  const supabase = await createClient()
  const safeSize = Math.max(1, Math.min(pageSize, 48))
  const safePage = Math.max(1, page)
  const from = (safePage - 1) * safeSize
  const to = from + safeSize - 1
  const search = sanitizeSearch(q)
  const slug = citySlug?.trim().toLowerCase() || null

  let locationId: string | null = null
  if (slug) {
    const { data: loc, error: locError } = await supabase
      .from("locations")
      .select("id")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle()
    if (locError) throw locError
    if (!loc) {
      return { items: [], total: 0, page: safePage, pageSize: safeSize, totalPages: 1 }
    }
    locationId = loc.id
  }

  let countQuery = supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true)

  let dataQuery = supabase
    .from("products")
    .select(catalogListSelect)
    .eq("is_active", true)
    .order("name")
    .range(from, to)

  if (locationId) {
    countQuery = countQuery.eq("location_id", locationId)
    dataQuery = dataQuery.eq("location_id", locationId)
  }

  if (search) {
    const pattern = `"%${search}%"`
    const orFilter = `name.ilike.${pattern},brand.ilike.${pattern},category.ilike.${pattern}`
    countQuery = countQuery.or(orFilter)
    dataQuery = dataQuery.or(orFilter)
  }

  const [countRes, dataRes] = await Promise.all([countQuery, dataQuery])
  if (countRes.error) throw countRes.error
  if (dataRes.error) throw dataRes.error

  const total = countRes.count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / safeSize))
  const rows = (dataRes.data ?? []) as unknown as Array<{
    id: string
    slug: string
    name: string
    brand: string
    image_path: string | null
    category: string | null
    location_id: string
    is_featured: boolean
    is_active: boolean
    locations: Product["locations"] | Product["locations"][] | null
  }>

  const items: Product[] = rows.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    description: "",
    image_path: p.image_path,
    category: p.category,
    location_id: p.location_id,
    is_featured: p.is_featured,
    is_active: p.is_active,
    locations: Array.isArray(p.locations) ? (p.locations[0] ?? null) : p.locations,
  }))

  return { items, total, page: safePage, pageSize: safeSize, totalPages }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("name")

  if (error) throw error
  return sortNested((data as Product[]) ?? [])
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  return sortNested([data as Product])[0]
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .order("updated_at", { ascending: false })

  if (error) throw error
  return sortNested((data as Product[]) ?? [])
}

/** Flat rows for admin DataTable — no nested specs/features */
export async function getProductsAdminTable(): Promise<ProductTableRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select(adminTableSelect)
    .order("updated_at", { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapAdminTableRow)
}

export type AdminProductStatusFilter = "all" | "active" | "hidden" | "featured"
export type AdminProductSortBy = "name" | "brand" | "updated_at"

export async function getProductsAdminTablePage({
  page = 1,
  pageSize = ADMIN_PRODUCTS_PAGE_SIZE,
  q,
  locationId,
  status = "all",
  sortBy = "updated_at",
  sortDir = "desc",
}: {
  page?: number
  pageSize?: number
  q?: string | null
  locationId?: string | null
  status?: AdminProductStatusFilter
  sortBy?: AdminProductSortBy
  sortDir?: "asc" | "desc"
} = {}): Promise<PageResult<ProductTableRow>> {
  const supabase = await createClient()
  const safeSize = Math.max(1, Math.min(pageSize, 50))
  const safePage = Math.max(1, page)
  const from = (safePage - 1) * safeSize
  const to = from + safeSize - 1
  const search = sanitizeSearch(q)
  const allowedSort: AdminProductSortBy[] = ["name", "brand", "updated_at"]
  const column = allowedSort.includes(sortBy) ? sortBy : "updated_at"
  const ascending = sortDir === "asc"

  let countQuery = supabase.from("products").select("id", { count: "exact", head: true })
  let dataQuery = supabase
    .from("products")
    .select(adminTableSelect)
    .order(column, { ascending })
    .range(from, to)

  if (locationId) {
    countQuery = countQuery.eq("location_id", locationId)
    dataQuery = dataQuery.eq("location_id", locationId)
  }

  if (status === "active") {
    countQuery = countQuery.eq("is_active", true)
    dataQuery = dataQuery.eq("is_active", true)
  } else if (status === "hidden") {
    countQuery = countQuery.eq("is_active", false)
    dataQuery = dataQuery.eq("is_active", false)
  } else if (status === "featured") {
    countQuery = countQuery.eq("is_featured", true)
    dataQuery = dataQuery.eq("is_featured", true)
  }

  if (search) {
    const pattern = `"%${search}%"`
    const orFilter = `name.ilike.${pattern},brand.ilike.${pattern},slug.ilike.${pattern},category.ilike.${pattern}`
    countQuery = countQuery.or(orFilter)
    dataQuery = dataQuery.or(orFilter)
  }

  const [countRes, dataRes] = await Promise.all([countQuery, dataQuery])
  if (countRes.error) throw countRes.error
  if (dataRes.error) throw dataRes.error

  const total = countRes.count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / safeSize))

  return {
    items: (dataRes.data ?? []).map(mapAdminTableRow),
    total,
    page: safePage,
    pageSize: safeSize,
    totalPages,
  }
}

export async function getProductByIdAdmin(id: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  return sortNested([data as Product])[0]
}

function sortNested(products: Product[]): Product[] {
  return products.map((p) => ({
    ...p,
    product_specs: [...(p.product_specs ?? [])].sort((a, b) => a.sort_order - b.sort_order),
    product_features: [...(p.product_features ?? [])].sort((a, b) => a.sort_order - b.sort_order),
  }))
}
