"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import type { Location } from "@/lib/types"
import type { ProductTableRow } from "@/lib/types"
import type {
  AdminProductSortBy,
  AdminProductStatusFilter,
} from "@/lib/data/queries"
import { createProductColumns } from "@/app/admin/components/products/columns"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const COLUMN_LABELS: Record<string, string> = {
  name: "Moto",
  brand: "Marca",
  location: "Ciudad",
  category: "Categoría",
  status: "Estado",
  updated_at: "Actualizado",
}

type DeleteAction = (formData: FormData) => Promise<void>

export type AdminProductsFilters = {
  q: string
  location: string
  status: AdminProductStatusFilter
  page: number
  sort: AdminProductSortBy
  dir: "asc" | "desc"
  pageSize: number
  total: number
  totalPages: number
  hasAnyProducts: boolean
}

function buildAdminHref(filters: {
  q?: string
  location?: string
  status?: string
  page?: number
  sort?: string
  dir?: string
}) {
  const sp = new URLSearchParams()
  const q = filters.q?.trim()
  if (q) sp.set("q", q)
  if (filters.location && filters.location !== "all") sp.set("location", filters.location)
  if (filters.status && filters.status !== "all") sp.set("status", filters.status)
  if (filters.page && filters.page > 1) sp.set("page", String(filters.page))
  if (filters.sort && filters.sort !== "updated_at") sp.set("sort", filters.sort)
  if (filters.dir && filters.dir !== "desc") sp.set("dir", filters.dir)
  const qs = sp.toString()
  return qs ? `/admin/products?${qs}` : "/admin/products"
}

export function ProductsDataTable({
  data,
  locations,
  deleteAction,
  filters,
}: {
  data: ProductTableRow[]
  locations: Location[]
  deleteAction: DeleteAction
  filters: AdminProductsFilters
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [searchInput, setSearchInput] = useState(filters?.q ?? "")
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  useEffect(() => {
    setSearchInput(filters?.q ?? "")
  }, [filters?.q])

  useEffect(() => {
    if (!filters) return
    const handle = window.setTimeout(() => {
      const next = (searchInput ?? "").trim()
      if (next === filters.q) return
      startTransition(() => {
        router.push(
          buildAdminHref({
            q: next,
            location: filters.location,
            status: filters.status,
            page: 1,
            sort: filters.sort,
            dir: filters.dir,
          })
        )
      })
    }, 300)
    return () => window.clearTimeout(handle)
  }, [searchInput, filters, router])

  function navigate(patch: Partial<{
    q: string
    location: string
    status: AdminProductStatusFilter
    page: number
    sort: AdminProductSortBy
    dir: "asc" | "desc"
  }>) {
    startTransition(() => {
      router.push(
        buildAdminHref({
          q: patch.q ?? searchInput,
          location: patch.location ?? filters.location,
          status: patch.status ?? filters.status,
          page: patch.page ?? filters.page,
          sort: patch.sort ?? filters.sort,
          dir: patch.dir ?? filters.dir,
        })
      )
    })
  }

  const sorting: SortingState = [
    { id: filters.sort, desc: filters.dir === "desc" },
  ]

  const columns = useMemo(
    () =>
      createProductColumns(deleteAction, {
        onSort: (columnId) => {
          const sort = (["name", "brand", "updated_at"].includes(columnId)
            ? columnId
            : "updated_at") as AdminProductSortBy
          const dir: "asc" | "desc" =
            filters.sort === sort
              ? filters.dir === "asc"
                ? "desc"
                : "asc"
              : "asc"
          navigate({ sort, dir, page: 1 })
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- navigate closes over latest filters/search
    [deleteAction, filters.sort, filters.dir]
  )

  const table = useReactTable({
    data,
    columns,
    pageCount: filters.totalPages,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    state: {
      sorting,
      columnVisibility,
      pagination: {
        pageIndex: filters.page - 1,
        pageSize: filters.pageSize,
      },
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  })

  const from = filters.total === 0 ? 0 : (filters.page - 1) * filters.pageSize + 1
  const to = Math.min(filters.page * filters.pageSize, filters.total)
  const hasActiveFilters =
    Boolean(filters.q) ||
    (filters.location !== "all" && Boolean(filters.location)) ||
    filters.status !== "all"

  return (
    <div className={cn("flex w-full flex-col gap-4", pending && "opacity-70")}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Input
          placeholder="Buscar por nombre, marca, ciudad…"
          value={searchInput ?? ""}
          onChange={(e) => setSearchInput(e.target.value)}
          className="h-10 max-w-md rounded-[4px] bg-eggshell"
        />

        <div className="flex flex-wrap items-center gap-2">
          <FilterSelect
            label="Ciudad"
            value={filters.location || "all"}
            onChange={(v) => navigate({ location: v, page: 1 })}
            options={[
              { value: "all", label: "Todas las ciudades" },
              ...locations.map((l) => ({ value: l.id, label: l.name })),
            ]}
          />

          <FilterSelect
            label="Estado"
            value={filters.status}
            onChange={(v) =>
              navigate({ status: (v as AdminProductStatusFilter) || "all", page: 1 })
            }
            options={[
              { value: "all", label: "Todos los estados" },
              { value: "active", label: "Visibles" },
              { value: "hidden", label: "Ocultas" },
              { value: "featured", label: "Destacadas" },
            ]}
          />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="sm" className="h-10" />}
            >
              Columnas
              <ChevronDown data-icon="inline-end" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((col) => col.getCanHide())
                  .map((col) => (
                    <DropdownMenuCheckboxItem
                      key={col.id}
                      checked={col.getIsVisible()}
                      onCheckedChange={(value) => col.toggleVisibility(!!value)}
                    >
                      {COLUMN_LABELS[col.id] ?? col.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-stone bg-eggshell">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-stone hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-11 px-3 font-meta text-ash">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-stone">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-3 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center font-body-sm text-smoke"
                >
                  {hasActiveFilters
                    ? "No hay motos que coincidan con los filtros."
                    : filters.hasAnyProducts
                      ? "No hay motos que coincidan con los filtros."
                      : "Aún no hay motos en el catálogo."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-meta text-[12px] text-ash">
          {filters.total === 0 ? (
            "Sin resultados"
          ) : (
            <>
              Mostrando{" "}
              <span className="text-graphite">
                {from}–{to}
              </span>{" "}
              de <span className="text-graphite">{filters.total}</span>
            </>
          )}
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate({ page: Math.max(1, filters.page - 1) })}
            disabled={filters.page <= 1 || pending}
          >
            Anterior
          </Button>
          <span className="min-w-[4.5rem] text-center font-meta text-[12px] text-ash">
            {filters.total === 0 ? 0 : filters.page} / {Math.max(filters.totalPages, 1)}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              navigate({ page: Math.min(filters.totalPages, filters.page + 1) })
            }
            disabled={filters.page >= filters.totalPages || pending}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <Select value={value} items={options} onValueChange={(v) => onChange(v ?? "all")}>
      <SelectTrigger
        size="sm"
        aria-label={label}
        className={cn(
          "h-10 max-w-[200px] rounded-full border-[#e5e5e5] bg-eggshell px-3 font-body-sm text-graphite"
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
