"use client"

import { useMemo, useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import type { Location } from "@/lib/types"
import type { ProductTableRow } from "@/lib/types"
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

const PAGE_SIZE = 10

const COLUMN_LABELS: Record<string, string> = {
  name: "Moto",
  brand: "Marca",
  location: "Ciudad",
  category: "Categoría",
  status: "Estado",
  updated_at: "Actualizado",
}

type DeleteAction = (formData: FormData) => Promise<void>

export function ProductsDataTable({
  data,
  locations,
  deleteAction,
}: {
  data: ProductTableRow[]
  locations: Location[]
  deleteAction: DeleteAction
}) {
  const columns = useMemo(() => createProductColumns(deleteAction), [deleteAction])

  const [sorting, setSorting] = useState<SortingState>([
    { id: "updated_at", desc: true },
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const q = String(filterValue ?? "")
        .trim()
        .toLowerCase()
      if (!q) return true
      const p = row.original
      return [p.name, p.brand, p.slug, p.category ?? "", p.location_name]
        .join(" ")
        .toLowerCase()
        .includes(q)
    },
    initialState: {
      pagination: { pageSize: PAGE_SIZE },
    },
  })

  const locationFilter = (table.getColumn("location")?.getFilterValue() as string) ?? "all"
  const statusFilter = (table.getColumn("status")?.getFilterValue() as string) ?? "all"

  const filteredCount = table.getFilteredRowModel().rows.length
  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()
  const from = filteredCount === 0 ? 0 : pageIndex * PAGE_SIZE + 1
  const to = Math.min((pageIndex + 1) * PAGE_SIZE, filteredCount)

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Input
          placeholder="Buscar por nombre, marca, ciudad…"
          value={globalFilter}
          onChange={(e) => {
            setGlobalFilter(e.target.value)
            table.setPageIndex(0)
          }}
          className="h-10 max-w-md rounded-[4px] bg-eggshell"
        />

        <div className="flex flex-wrap items-center gap-2">
          <FilterSelect
            label="Ciudad"
            value={locationFilter}
            onChange={(v) => {
              table.getColumn("location")?.setFilterValue(v === "all" ? undefined : v)
              table.setPageIndex(0)
            }}
            options={[
              { value: "all", label: "Todas las ciudades" },
              ...locations.map((l) => ({ value: l.id, label: l.name })),
            ]}
          />

          <FilterSelect
            label="Estado"
            value={statusFilter}
            onChange={(v) => {
              table.getColumn("status")?.setFilterValue(v === "all" ? undefined : v)
              table.setPageIndex(0)
            }}
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
                  No hay motos que coincidan con los filtros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-meta text-[12px] text-ash">
          {filteredCount === 0 ? (
            "Sin resultados"
          ) : (
            <>
              Mostrando{" "}
              <span className="text-graphite">
                {from}–{to}
              </span>{" "}
              de <span className="text-graphite">{filteredCount}</span>
              {filteredCount !== data.length ? (
                <>
                  {" "}
                  (filtrado de {data.length})
                </>
              ) : null}
            </>
          )}
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <span className="min-w-[4.5rem] text-center font-meta text-[12px] text-ash">
            {pageCount === 0 ? 0 : pageIndex + 1} / {Math.max(pageCount, 1)}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
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
