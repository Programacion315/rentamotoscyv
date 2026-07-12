import Link from "next/link"
import { deleteProduct } from "@/app/admin/(dashboard)/actions"
import { ProductsDataTable } from "@/app/admin/components/products/ProductsDataTable"
import { getAllLocationsAdmin, getProductsAdminTable } from "@/lib/data/queries"
import { Button } from "@/components/ui/button"

export default async function AdminProductsPage() {
  const [products, locations] = await Promise.all([
    getProductsAdminTable(),
    getAllLocationsAdmin(),
  ])

  return (
    <div className="w-full">
      <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h1 className="font-heading text-[28px] text-ink md:text-[32px]">Motos del catálogo</h1>
          <p className="mt-2 font-body-sm leading-relaxed text-smoke">
            Busca, filtra y ordena el inventario. Ideal cuando hay muchas motos.
          </p>
        </div>
        <Button render={<Link href="/admin/products/new" />} size="lg" className="w-full sm:w-auto">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Nueva moto
        </Button>
      </header>

      {products.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-stone bg-warm-taupe/40 px-6 py-14 text-center">
          <span className="material-symbols-outlined mb-3 text-[40px] text-ash">two_wheeler</span>
          <p className="font-heading-sm text-[20px] text-ink">Aún no hay motos</p>
          <p className="mx-auto mt-2 max-w-sm font-body-sm text-smoke">
            Agrega la primera moto con foto, ciudad y datos básicos.
          </p>
          <Button render={<Link href="/admin/products/new" />} className="mt-6">
            Crear primera moto
          </Button>
        </div>
      ) : (
        <ProductsDataTable
          data={products}
          locations={locations}
          deleteAction={deleteProduct}
        />
      )}
    </div>
  )
}
