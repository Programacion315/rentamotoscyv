export type Location = {
  id: string
  name: string
  slug: string
  sort_order: number
  is_active: boolean
}

export type LocationWithUsage = Location & {
  product_count: number
  sede_count: number
}

export type Sede = {
  id: string
  location_id: string
  name: string
  address: string
  map_embed_url: string | null
  sort_order: number
  is_active: boolean
  locations?: Pick<Location, "id" | "name" | "slug"> | null
}

export type ProductSpec = {
  id: string
  product_id: string
  label: string
  value: string
  sort_order: number
}

export type ProductFeature = {
  id: string
  product_id: string
  label: string
  sort_order: number
}

export type Product = {
  id: string
  slug: string
  name: string
  brand: string
  description: string
  location_id: string
  image_path: string | null
  category: string | null
  is_featured: boolean
  is_active: boolean
  created_at?: string
  updated_at?: string
  locations?: Pick<Location, "id" | "name" | "slug"> | null
  product_specs?: ProductSpec[]
  product_features?: ProductFeature[]
}

/** Lightweight row for admin DataTable (no specs/features) */
export type ProductTableRow = {
  id: string
  slug: string
  name: string
  brand: string
  category: string | null
  image_path: string | null
  is_featured: boolean
  is_active: boolean
  location_id: string
  location_name: string
  updated_at: string | null
}

export type SiteContact = {
  id: number
  phone: string
  email: string
  whatsapp: string
}

export type SocialLink = {
  id: string
  label: string
  url: string
  sort_order: number
  is_active: boolean
}

export const SPEC_LABEL_SUGGESTIONS = [
  "Cilindraje",
  "Potencia máxima",
  "Torque máximo",
  "Peso en seco",
  "Combustible",
  "Mantenimiento",
] as const

export function getProductImageUrl(imagePath: string | null | undefined): string | null {
  if (!imagePath) return null
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://") || imagePath.startsWith("/")) {
    return imagePath
  }
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!base) return null
  return `${base}/storage/v1/object/public/motorcycle-images/${imagePath}`
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function whatsappHref(whatsapp: string, message?: string): string {
  const digits = whatsapp.replace(/\D/g, "")
  const base = `https://wa.me/${digits}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}
