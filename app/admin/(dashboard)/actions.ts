"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import sharp from "sharp"
import { requireAdmin } from "@/lib/admin/auth"
import { slugify } from "@/lib/types"

export type ActionResult = { error?: string; success?: string }

function revalidatePublic() {
  revalidatePath("/", "layout")
  revalidatePath("/catalog")
  revalidatePath("/contact")
  revalidatePath("/admin", "layout")
}

// —— Locations ——

export async function upsertLocation(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { supabase } = await requireAdmin()
  const id = String(formData.get("id") ?? "")
  const name = String(formData.get("name") ?? "").trim()
  const slugInput = String(formData.get("slug") ?? "").trim()
  const sort_order = Number(formData.get("sort_order") ?? 0)
  const is_active = formData.get("is_active") === "on"

  if (!name) return { error: "El nombre es obligatorio." }
  const slug = slugify(slugInput || name)
  if (!slug) return { error: "Slug inválido." }

  const payload = { name, slug, sort_order, is_active }

  const { error } = id
    ? await supabase.from("locations").update(payload).eq("id", id)
    : await supabase.from("locations").insert(payload)

  if (error) {
    if (error.code === "23505") {
      return { error: "Ya existe una ciudad con ese nombre. Elige otro." }
    }
    return { error: error.message }
  }
  revalidatePublic()
  return { success: "Ciudad guardada." }
}

export async function deleteLocation(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { supabase } = await requireAdmin()
  const id = String(formData.get("id") ?? "")
  if (!id) return { error: "Ciudad no válida." }

  const [productsRes, sedesRes] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }).eq("location_id", id),
    supabase.from("sedes").select("id", { count: "exact", head: true }).eq("location_id", id),
  ])

  const productCount = productsRes.count ?? 0
  const sedeCount = sedesRes.count ?? 0

  if (productCount > 0 || sedeCount > 0) {
    const parts: string[] = []
    if (productCount > 0) {
      parts.push(`${productCount} moto${productCount === 1 ? "" : "s"}`)
    }
    if (sedeCount > 0) {
      parts.push(`${sedeCount} sede${sedeCount === 1 ? "" : "s"}`)
    }
    return {
      error: `No se puede eliminar: todavía hay ${parts.join(" y ")} en esta ciudad. Muévelas o elimínalas primero.`,
    }
  }

  const { error } = await supabase.from("locations").delete().eq("id", id)
  if (error) {
    if (error.code === "23503") {
      return {
        error:
          "No se puede eliminar porque aún hay motos o sedes vinculadas. Reasígnalas primero.",
      }
    }
    return { error: error.message }
  }

  revalidatePublic()
  return { success: "Ciudad eliminada." }
}

// —— Sedes ——

export async function upsertSede(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const { supabase } = await requireAdmin()
  const id = String(formData.get("id") ?? "")
  const location_id = String(formData.get("location_id") ?? "")
  const name = String(formData.get("name") ?? "").trim()
  const address = String(formData.get("address") ?? "").trim()
  const map_embed_url = String(formData.get("map_embed_url") ?? "").trim() || null
  const sort_order = Number(formData.get("sort_order") ?? 0)
  const is_active = formData.get("is_active") === "on"

  if (!location_id || !name || !address) {
    return { error: "Ubicación, nombre y dirección son obligatorios." }
  }

  const payload = { location_id, name, address, map_embed_url, sort_order, is_active }
  const { error } = id
    ? await supabase.from("sedes").update(payload).eq("id", id)
    : await supabase.from("sedes").insert(payload)

  if (error) return { error: error.message }
  revalidatePublic()
  return { success: "Oficina guardada." }
}

export async function deleteSede(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { supabase } = await requireAdmin()
  const id = String(formData.get("id") ?? "")
  if (!id) return { error: "Sede no válida." }

  const { error } = await supabase.from("sedes").delete().eq("id", id)
  if (error) return { error: error.message }

  revalidatePublic()
  return { success: "Sede eliminada." }
}

// —— Contact + socials ——

export async function updateSiteContact(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { supabase } = await requireAdmin()
  const phone = String(formData.get("phone") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const whatsapp = String(formData.get("whatsapp") ?? "").replace(/\D/g, "")

  const { error } = await supabase
    .from("site_contact")
    .upsert({ id: 1, phone, email, whatsapp })

  if (error) return { error: error.message }
  revalidatePublic()
  return { success: "Contacto actualizado." }
}

export async function upsertSocialLink(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { supabase } = await requireAdmin()
  const id = String(formData.get("id") ?? "")
  const label = String(formData.get("label") ?? "").trim()
  const url = String(formData.get("url") ?? "").trim()
  const sort_order = Number(formData.get("sort_order") ?? 0)
  const is_active = formData.get("is_active") === "on"

  if (!label || !url) return { error: "Etiqueta y URL son obligatorias." }

  const payload = { label, url, sort_order, is_active }
  const { error } = id
    ? await supabase.from("social_links").update(payload).eq("id", id)
    : await supabase.from("social_links").insert(payload)

  if (error) return { error: error.message }
  revalidatePublic()
  return { success: "Enlace guardado." }
}

export async function deleteSocialLink(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { supabase } = await requireAdmin()
  const id = String(formData.get("id") ?? "")
  if (!id) return { error: "Enlace no válido." }

  const { error } = await supabase.from("social_links").delete().eq("id", id)
  if (error) return { error: error.message }

  revalidatePublic()
  return { success: "Enlace eliminado." }
}

// —— Products ——

function parsePairs(formData: FormData, prefix: "spec" | "feature") {
  const labels = formData.getAll(`${prefix}_label`).map(String)
  const values = prefix === "spec" ? formData.getAll("spec_value").map(String) : []
  const rows: { label: string; value?: string; sort_order: number }[] = []
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i]?.trim()
    if (!label) continue
    if (prefix === "spec") {
      const value = values[i]?.trim()
      if (!value) continue
      rows.push({ label, value, sort_order: i })
    } else {
      rows.push({ label, sort_order: i })
    }
  }
  return rows
}

async function uploadProductImage(
  supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"],
  productId: string,
  slug: string,
  file: File
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const webp = await sharp(buffer).rotate().webp({ quality: 80 }).toBuffer()
  const path = `${productId}/${slug}.webp`

  const { error } = await supabase.storage.from("motorcycle-images").upload(path, webp, {
    contentType: "image/webp",
    upsert: true,
  })

  if (error) throw new Error(error.message)
  return path
}

export async function upsertProduct(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { supabase } = await requireAdmin()
  const id = String(formData.get("id") ?? "")
  const name = String(formData.get("name") ?? "").trim()
  const brand = String(formData.get("brand") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const location_id = String(formData.get("location_id") ?? "")
  const category = String(formData.get("category") ?? "").trim() || null
  const slugInput = String(formData.get("slug") ?? "").trim()
  const is_featured = formData.get("is_featured") === "on"
  const is_active = formData.get("is_active") === "on"
  const image = formData.get("image")

  if (!name || !brand || !location_id) {
    return { error: "Nombre, marca y ubicación son obligatorios." }
  }

  const slug = slugify(slugInput || name)
  if (!slug) return { error: "Slug inválido." }

  let productId = id

  if (!productId) {
    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        brand,
        description,
        location_id,
        category,
        slug,
        is_featured,
        is_active,
      })
      .select("id")
      .single()

    if (error) return { error: error.message }
    productId = data.id
  } else {
    const { error } = await supabase
      .from("products")
      .update({
        name,
        brand,
        description,
        location_id,
        category,
        slug,
        is_featured,
        is_active,
      })
      .eq("id", productId)

    if (error) return { error: error.message }
  }

  if (image instanceof File && image.size > 0) {
    try {
      const image_path = await uploadProductImage(supabase, productId, slug, image)
      const { error } = await supabase.from("products").update({ image_path }).eq("id", productId)
      if (error) return { error: error.message }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Error al subir la imagen." }
    }
  }

  await supabase.from("product_specs").delete().eq("product_id", productId)
  await supabase.from("product_features").delete().eq("product_id", productId)

  const specs = parsePairs(formData, "spec")
  if (specs.length) {
    const { error } = await supabase.from("product_specs").insert(
      specs.map((s) => ({
        product_id: productId,
        label: s.label,
        value: s.value!,
        sort_order: s.sort_order,
      }))
    )
    if (error) return { error: error.message }
  }

  const features = parsePairs(formData, "feature")
  if (features.length) {
    const { error } = await supabase.from("product_features").insert(
      features.map((f) => ({
        product_id: productId,
        label: f.label,
        sort_order: f.sort_order,
      }))
    )
    if (error) return { error: error.message }
  }

  revalidatePublic()
  revalidatePath(`/rentals/${slug}`)
  redirect("/admin/products")
}

export async function deleteProduct(formData: FormData) {
  const { supabase } = await requireAdmin()
  const id = String(formData.get("id") ?? "")

  const { data: product } = await supabase.from("products").select("image_path").eq("id", id).maybeSingle()
  if (product?.image_path && !product.image_path.startsWith("http")) {
    await supabase.storage.from("motorcycle-images").remove([product.image_path])
  }

  const { error } = await supabase.from("products").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePublic()
}
