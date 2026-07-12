import Link from "next/link"
import { deleteProduct } from "@/app/admin/(dashboard)/actions"
import { ProductsDataTable } from "@/app/admin/components/products/ProductsDataTable"
import {
  ADMIN_PRODUCTS_PAGE_SIZE,
  getAllLocationsAdmin,
  getProductsAdminTablePage,
  type AdminProductSortBy,
  type AdminProductStatusFilter,
} from "@/lib/data/queries"
import { Button } from "@/components/ui/button"

type SearchParams = Promise<{
  q?: string | string[]
  location?: string | string[]
  status?: string | string[]
  page?: string | string[]
  sort?: string | string[]
  dir?: string | string[]
}>

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ""
  return value ?? ""
}

function parseStatus(raw: string): AdminProductStatusFilter {
  if (raw === "active" || raw === "hidden" || raw === "featured") return raw
  return "all"
}

function parseSort(raw: string): AdminProductSortBy {
  if (raw === "name" || raw === "brand" || raw === "updated_at") return raw
  return "updated_at"
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const q = first(params.q).trim()
  const location = first(params.location).trim() || "all"
  const status = parseStatus(first(params.status))
  const page = Math.max(1, Number.parseInt(first(params.page), 10) || 1)
  const sort = parseSort(first(params.sort))
  const dir = first(params.dir) === "asc" ? "asc" : "desc"

  const [result, locations] = await Promise.all([
    getProductsAdminTablePage({
      page,
      pageSize: ADMIN_PRODUCTS_PAGE_SIZE,
      q: q || null,
      locationId: location === "all" ? null : location,
      status,
      sortBy: sort,
      sortDir: dir,
    }),
    getAllLocationsAdmin(),
  ])

  const hasActiveFilters =
    Boolean(q) || location !== "all" || status !== "all"
  const showEmptyCreate = !hasActiveFilters && result.total === 0

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

      {showEmptyCreate ? (
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
          data={result.items}
          locations={locations}
          deleteAction={deleteProduct}
          filters={{
            q,
            location,
            status,
            page: result.page,
            sort,
            dir,
            pageSize: result.pageSize,
            total: result.total,
            totalPages: result.totalPages,
            hasAnyProducts: hasActiveFilters || result.total > 0,
          }}
        />
      )}
    </div>
  )
}
