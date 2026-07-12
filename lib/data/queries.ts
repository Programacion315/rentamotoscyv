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
    .select(
      "id, name, brand, slug, category, image_path, is_active, is_featured, location_id, updated_at, locations(name)"
    )
    .order("updated_at", { ascending: false })

  if (error) throw error

  return (data ?? []).map((row) => {
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
  })
}

export const ADMIN_PRODUCTS_PAGE_SIZE = 10

export async function getProductsAdminPage(
  page = 1,
  pageSize = ADMIN_PRODUCTS_PAGE_SIZE
): Promise<{
  products: Product[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}> {
  const supabase = await createClient()
  const safeSize = Math.max(1, Math.min(pageSize, 50))
  const safePage = Math.max(1, page)
  const from = (safePage - 1) * safeSize
  const to = from + safeSize - 1

  // Count separately — nested selects + count can be unreliable in PostgREST
  const [countRes, dataRes] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase
      .from("products")
      .select(productSelect)
      .order("updated_at", { ascending: false })
      .range(from, to),
  ])

  if (countRes.error) throw countRes.error
  if (dataRes.error) throw dataRes.error

  const total = countRes.count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / safeSize))

  return {
    products: sortNested((dataRes.data as Product[]) ?? []),
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
