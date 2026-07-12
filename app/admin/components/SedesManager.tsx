"use client"

import Link from "next/link"
import { useActionState, useEffect, useState } from "react"
import type { ActionResult } from "@/app/admin/(dashboard)/actions"
import type { Location, Sede } from "@/lib/types"
import { FormSelect } from "@/components/admin/FormSelect"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const initial: ActionResult = {}

type UpsertAction = (prev: ActionResult, formData: FormData) => Promise<ActionResult>
type DeleteAction = (prev: ActionResult, formData: FormData) => Promise<ActionResult>

export function SedesManager({
  sedes,
  locations,
  upsertAction,
  deleteAction,
}: {
  sedes: Sede[]
  locations: Location[]
  upsertAction: UpsertAction
  deleteAction: DeleteAction
}) {
  const [adding, setAdding] = useState(sedes.length === 0)
  const [editingId, setEditingId] = useState<string | null>(null)

  const sorted = sedes.toSorted(
    (a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name)
  )
  const nextOrder =
    sorted.length > 0 ? Math.max(...sorted.map((s) => s.sort_order)) + 1 : 1

  function openAdd() {
    setEditingId(null)
    setAdding(true)
  }

  return (
    <div className="w-full">
      <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h1 className="font-heading text-[28px] text-ink md:text-[32px]">Oficinas / sedes</h1>
          <p className="mt-2 font-body-sm leading-relaxed text-smoke">
            Direcciones físicas que aparecen en Contacto y el pie de página. Cada sede pertenece a
            una ciudad.
          </p>
        </div>
        <Button
          type="button"
          size="lg"
          className="w-full shrink-0 sm:w-auto"
          onClick={openAdd}
          disabled={locations.length === 0}
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Agregar oficina
        </Button>
      </header>

      {locations.length === 0 ? (
        <div className="rounded-[20px] border border-dashed border-stone bg-warm-taupe/40 px-6 py-10 text-center">
          <p className="font-heading-sm text-[18px] text-ink">Primero crea una ciudad</p>
          <p className="mt-2 font-body-sm text-smoke">
            Las oficinas necesitan una ciudad (Ubicaciones) antes de poder agregarse.
          </p>
          <Button render={<Link href="/admin/locations" />} className="mt-5">
            Ir a ciudades
          </Button>
        </div>
      ) : null}

      {locations.length > 0 ? (
        <>
          <div className={cn("admin-expand mb-6", adding && "mb-8")} data-open={adding}>
            <div className="admin-expand-inner">
              <section className="rounded-[20px] border border-stone bg-warm-taupe/50 p-5 md:p-6 lg:p-8">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-heading-sm text-[20px] text-ink">Nueva oficina</h2>
                    <p className="mt-1 font-body-sm text-smoke">
                      Ciudad, nombre comercial y dirección. El mapa es opcional.
                    </p>
                  </div>
                  {sedes.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setAdding(false)}
                      className="shrink-0 rounded-full p-1.5 text-smoke hover:bg-eggshell hover:text-ink"
                      aria-label="Cerrar"
                    >
                      <span className="material-symbols-outlined text-[22px]">close</span>
                    </button>
                  ) : null}
                </div>
                <SedeEditor
                  key="new"
                  action={upsertAction}
                  locations={locations}
                  defaultOrder={nextOrder}
                  onSuccess={() => setAdding(false)}
                  onCancel={sedes.length > 0 ? () => setAdding(false) : undefined}
                  submitLabel="Guardar oficina"
                />
              </section>
            </div>
          </div>

          {sorted.length === 0 && !adding ? (
            <EmptyState onAdd={openAdd} />
          ) : null}

          {sorted.length > 0 ? (
            <section>
              <div className="mb-4 flex items-baseline justify-between gap-2 px-1">
                <h2 className="font-meta text-[12px] tracking-wide text-ash uppercase">
                  Tus oficinas ({sorted.length})
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {sorted.map((sede, index) => {
                  const isEditing = editingId === sede.id
                  return (
                    <li
                      key={sede.id}
                      className={cn("admin-card-enter", isEditing && "xl:col-span-2")}
                      style={{ animationDelay: `${Math.min(index, 6) * 50}ms` }}
                    >
                      {isEditing ? (
                        <div className="admin-card-enter rounded-[20px] border border-ink/15 bg-eggshell p-5 shadow-whisper md:p-6 lg:p-8">
                          <div className="mb-4 flex items-center justify-between gap-2">
                            <h3 className="font-heading-sm text-[18px] text-ink">
                              Editar {sede.name}
                            </h3>
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="rounded-full p-1.5 text-smoke hover:bg-warm-taupe hover:text-ink"
                              aria-label="Cancelar"
                            >
                              <span className="material-symbols-outlined text-[22px]">close</span>
                            </button>
                          </div>
                          <SedeEditor
                            key={sede.id}
                            action={upsertAction}
                            sede={sede}
                            locations={locations}
                            onSuccess={() => setEditingId(null)}
                            onCancel={() => setEditingId(null)}
                            submitLabel="Guardar cambios"
                          />
                        </div>
                      ) : (
                        <SedeCard
                          sede={sede}
                          onEdit={() => {
                            setAdding(false)
                            setEditingId(sede.id)
                          }}
                          deleteAction={deleteAction}
                        />
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-[24px] border border-dashed border-stone bg-warm-taupe/40 px-6 py-14 text-center">
      <span className="material-symbols-outlined mb-3 text-[40px] text-ash">store</span>
      <p className="font-heading-sm text-[20px] text-ink">Aún no hay oficinas</p>
      <p className="mx-auto mt-2 max-w-sm font-body-sm text-smoke">
        Agrega la dirección donde entregas o recibes las motos.
      </p>
      <Button type="button" className="mt-6" onClick={onAdd}>
        Agregar primera oficina
      </Button>
    </div>
  )
}

function SedeCard({
  sede,
  onEdit,
  deleteAction,
}: {
  sede: Sede
  onEdit: () => void
  deleteAction: DeleteAction
}) {
  return (
    <article className="flex h-full flex-col rounded-[20px] border border-stone bg-eggshell p-5 transition-[box-shadow] duration-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-warm-taupe px-2.5 py-0.5 font-meta text-[11px] text-graphite uppercase">
          {sede.locations?.name ?? "Sin ciudad"}
        </span>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 font-meta text-[11px] uppercase",
            sede.is_active ? "bg-warm-taupe text-graphite" : "bg-stone text-ash"
          )}
        >
          {sede.is_active ? "Visible" : "Oculta"}
        </span>
      </div>
      <h3 className="font-heading-sm text-[20px] text-ink">{sede.name}</h3>
      <p className="mt-2 flex-1 font-body-sm leading-relaxed text-smoke">{sede.address}</p>
      {sede.map_embed_url ? (
        <p className="mt-2 flex items-center gap-1 font-meta text-[12px] text-ash">
          <span className="material-symbols-outlined text-[16px]">map</span>
          Tiene mapa
        </p>
      ) : (
        <p className="mt-2 font-meta text-[12px] text-ash">Sin mapa</p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onEdit} className="flex-1 sm:flex-none">
          <span className="material-symbols-outlined text-[18px]">edit</span>
          Editar
        </Button>
        <DeleteSedeButton id={sede.id} name={sede.name} action={deleteAction} />
      </div>
    </article>
  )
}

function SedeEditor({
  action,
  sede,
  locations,
  defaultOrder = 1,
  onSuccess,
  onCancel,
  submitLabel,
}: {
  action: UpsertAction
  sede?: Sede
  locations: Location[]
  defaultOrder?: number
  onSuccess?: () => void
  onCancel?: () => void
  submitLabel: string
}) {
  const [state, formAction, pending] = useActionState(action, initial)

  useEffect(() => {
    if (state.success) onSuccess?.()
  }, [state.success, onSuccess])

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {sede?.id ? <input type="hidden" name="id" value={sede.id} /> : null}
      {state.error ? (
        <p role="alert" className="animate-fade-rise rounded-[10px] bg-destructive/10 px-3 py-2.5 font-body-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={sede ? `loc-${sede.id}` : "loc-new"}>Ciudad</Label>
          <FormSelect
            id={sede ? `loc-${sede.id}` : "loc-new"}
            name="location_id"
            required
            placeholder="Elige la ciudad…"
            defaultValue={sede?.location_id}
            options={locations.map((l) => ({ value: l.id, label: l.name }))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={sede ? `name-${sede.id}` : "name-new"}>Nombre de la oficina</Label>
          <Input
            id={sede ? `name-${sede.id}` : "name-new"}
            name="name"
            defaultValue={sede?.name}
            placeholder="Ej. Renta Motos CyV Bogotá"
            required
            className="rounded-[4px] bg-eggshell text-base md:text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={sede ? `addr-${sede.id}` : "addr-new"}>Dirección completa</Label>
        <textarea
          id={sede ? `addr-${sede.id}` : "addr-new"}
          name="address"
          defaultValue={sede?.address}
          required
          rows={2}
          placeholder="Calle, número, barrio, ciudad"
          className="w-full rounded-[4px] border border-input bg-eggshell px-3 py-2 text-base outline-none focus-visible:ring-2 focus-visible:ring-ink/20 md:text-sm"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={sede ? `map-${sede.id}` : "map-new"}>Enlace del mapa (opcional)</Label>
        <textarea
          id={sede ? `map-${sede.id}` : "map-new"}
          name="map_embed_url"
          defaultValue={sede?.map_embed_url ?? ""}
          rows={2}
          placeholder="Pega el enlace de Google Maps (compartir → insertar mapa)"
          className="w-full rounded-[4px] border border-input bg-eggshell px-3 py-2 font-mono text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
        />
        <p className="font-meta text-[12px] text-ash">
          Si no lo tienes, déjalo vacío. Se puede agregar después.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={sede ? `ord-${sede.id}` : "ord-new"}>Orden en la lista</Label>
          <Input
            id={sede ? `ord-${sede.id}` : "ord-new"}
            name="sort_order"
            type="number"
            min={0}
            defaultValue={sede?.sort_order ?? defaultOrder}
            className="max-w-[140px] rounded-[4px] bg-eggshell"
          />
        </div>
        <label className="flex cursor-pointer items-start gap-3 rounded-[12px] border border-stone bg-eggshell p-4 self-end">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={sede?.is_active ?? true}
            className="mt-0.5 size-4 accent-black"
          />
          <span>
            <span className="block font-body-sm font-medium text-ink">Mostrar en el sitio</span>
            <span className="mt-0.5 block font-meta text-[12px] text-ash">
              Visible en Contacto y pie de página.
            </span>
          </span>
        </label>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {onCancel ? (
          <Button type="button" variant="outline" size="lg" onClick={onCancel} disabled={pending}>
            Cancelar
          </Button>
        ) : null}
        <Button type="submit" size="lg" disabled={pending} className="sm:min-w-[160px]">
          {pending ? "Guardando…" : submitLabel}
        </Button>
      </div>
    </form>
  )
}

function DeleteSedeButton({
  id,
  name,
  action,
}: {
  id: string
  name: string
  action: DeleteAction
}) {
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(action, initial)

  useEffect(() => {
    if (state.success) setOpen(false)
  }, [state.success])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/5 sm:flex-none"
          />
        }
      >
        <span className="material-symbols-outlined text-[18px]">delete</span>
        Eliminar
      </DialogTrigger>
      <DialogContent className="rounded-[20px] bg-eggshell sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading-sm text-[22px]">¿Eliminar {name}?</DialogTitle>
          <DialogDescription className="font-body-sm text-smoke">
            Dejará de mostrarse en Contacto y el pie de página. No se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        {state.error ? (
          <p role="alert" className="rounded-[10px] bg-destructive/10 px-3 py-2.5 font-body-sm text-destructive">
            {state.error}
          </p>
        ) : null}
        <DialogFooter>
          <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <Button type="submit" variant="destructive" size="lg" disabled={pending}>
              {pending ? "Eliminando…" : "Sí, eliminar"}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
