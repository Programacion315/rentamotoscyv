import { ProductForm } from "@/app/admin/components/ProductForm"
import { upsertProduct } from "@/app/admin/(dashboard)/actions"
import { getAllLocationsAdmin } from "@/lib/data/queries"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function NewProductPage() {
  const locations = await getAllLocationsAdmin()

  return (
    <div className="w-full">
      <Button render={<Link href="/admin/products" />} variant="ghost" size="sm" className="mb-4">
        ← Volver al listado
      </Button>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-heading text-[28px] text-ink md:text-[32px]">Nueva moto</h1>
        <p className="mt-2 font-body-sm text-smoke">
          Completa los pasos: datos, foto, ficha técnica y visibilidad. El enlace web se genera solo
          desde el nombre.
        </p>
      </header>
      <ProductForm action={upsertProduct} locations={locations} />
    </div>
  )
}
