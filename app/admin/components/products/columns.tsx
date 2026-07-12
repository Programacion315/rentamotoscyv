"use client"

import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import type { ProductTableRow } from "@/lib/types"
import { getProductImageUrl } from "@/lib/types"
import { DeleteProductButton } from "@/app/admin/components/DeleteProductButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type DeleteAction = (formData: FormData) => Promise<void>

export function createProductColumns(deleteAction: DeleteAction): ColumnDef<ProductTableRow>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="-ml-2 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Moto
          <ArrowUpDown data-icon="inline-end" />
        </Button>
      ),
      cell: ({ row }) => {
        const p = row.original
        const img = getProductImageUrl(p.image_path)
        return (
          <div className="flex min-w-[200px] items-center gap-3">
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img}
                alt=""
                className="size-11 rounded-[8px] object-cover"
              />
            ) : (
              <div className="flex size-11 items-center justify-center rounded-[8px] bg-warm-taupe">
                <span className="material-symbols-outlined text-[18px] text-ash">two_wheeler</span>
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">{p.name}</p>
              <p className="truncate font-meta text-[11px] text-ash">{p.slug}</p>
            </div>
          </div>
        )
      },
      filterFn: "includesString",
    },
    {
      accessorKey: "brand",
      header: ({ column }) => (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="-ml-2 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Marca
          <ArrowUpDown data-icon="inline-end" />
        </Button>
      ),
      cell: ({ row }) => <span className="text-graphite">{row.original.brand}</span>,
    },
    {
      accessorKey: "location_name",
      id: "location",
      header: "Ciudad",
      cell: ({ row }) => <span className="text-graphite">{row.original.location_name}</span>,
      filterFn: (row, _id, value: string) => {
        if (!value || value === "all") return true
        return row.original.location_id === value
      },
    },
    {
      accessorKey: "category",
      header: "Categoría",
      cell: ({ row }) => (
        <span className="text-smoke">{row.original.category ?? "—"}</span>
      ),
    },
    {
      id: "status",
      accessorFn: (row) => {
        if (!row.is_active) return "hidden"
        if (row.is_featured) return "featured"
        return "visible"
      },
      header: "Estado",
      cell: ({ row }) => {
        const p = row.original
        return (
          <div className="flex flex-wrap gap-1.5">
            <Badge variant={p.is_active ? "secondary" : "outline"}>
              {p.is_active ? "Visible" : "Oculta"}
            </Badge>
            {p.is_featured ? <Badge variant="default">Destacada</Badge> : null}
          </div>
        )
      },
      filterFn: (row, _id, value: string) => {
        if (!value || value === "all") return true
        if (value === "active") return row.original.is_active
        if (value === "hidden") return !row.original.is_active
        if (value === "featured") return row.original.is_featured
        return true
      },
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="-ml-2 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Actualizado
          <ArrowUpDown data-icon="inline-end" />
        </Button>
      ),
      cell: ({ row }) => {
        const raw = row.original.updated_at
        if (!raw) return <span className="text-ash">—</span>
        const d = new Date(raw)
        return (
          <span className="font-meta text-[12px] text-ash">
            {d.toLocaleDateString("es-CO", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <span className="sr-only">Acciones</span>,
      cell: ({ row }) => {
        const p = row.original
        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              render={<Link href={`/admin/products/${p.id}/edit`} />}
              variant="outline"
              size="xs"
            >
              Editar
            </Button>
            <DeleteProductButton id={p.id} name={p.name} action={deleteAction} />
          </div>
        )
      },
    },
  ]
}
