import { notFound } from "next/navigation"
import Link from "next/link"
import { ProductForm } from "@/app/admin/components/ProductForm"
import { upsertProduct } from "@/app/admin/(dashboard)/actions"
import { getAllLocationsAdmin, getProductByIdAdmin } from "@/lib/data/queries"
import { Button } from "@/components/ui/button"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [product, locations] = await Promise.all([
    getProductByIdAdmin(id),
    getAllLocationsAdmin(),
  ])

  if (!product) notFound()

  return (
    <div className="w-full">
      <Button render={<Link href="/admin/products" />} variant="ghost" size="sm" className="mb-4">
        ← Volver al listado
      </Button>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-heading text-[28px] text-ink md:text-[32px]">Editar {product.name}</h1>
        <p className="mt-2 font-body-sm text-smoke">
          Cambia lo que necesites y guarda. La foto solo se reemplaza si eliges una nueva.
        </p>
      </header>
      <ProductForm action={upsertProduct} product={product} locations={locations} />
    </div>
  )
}
