"use client"

import Link from "next/link"
import { useActionState, useEffect, useState } from "react"
import type { ActionResult } from "@/app/admin/(dashboard)/actions"
import type { Location, LocationWithUsage } from "@/lib/types"
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

export function LocationsManager({
  locations,
  upsertAction,
  deleteAction,
}: {
  locations: LocationWithUsage[]
  upsertAction: UpsertAction
  deleteAction: DeleteAction
}) {
  const [adding, setAdding] = useState(locations.length === 0)
  const [editingId, setEditingId] = useState<string | null>(null)

  const sorted = locations.toSorted(
    (a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name)
  )
  const nextOrder =
    sorted.length > 0 ? Math.max(...sorted.map((l) => l.sort_order)) + 1 : 1

  function openAdd() {
    setEditingId(null)
    setAdding(true)
  }

  function openEdit(id: string) {
    setAdding(false)
    setEditingId(id)
  }

  return (
    <div className="w-full">
      <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h1 className="font-heading text-[28px] text-ink md:text-[32px]">Ciudades</h1>
          <p className="mt-2 font-body-sm leading-relaxed text-smoke">
            Aquí defines las ciudades del catálogo (por ejemplo Bogotá o Neiva). Los clientes las
            usan para filtrar motos disponibles.
          </p>
        </div>
        <Button
          type="button"
          size="lg"
          className="w-full shrink-0 sm:w-auto"
          onClick={openAdd}
          aria-expanded={adding}
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Agregar ciudad
        </Button>
      </header>

      <div className={cn("admin-expand mb-6", adding && "mb-8")} data-open={adding}>
        <div className="admin-expand-inner">
          <section className="rounded-[20px] border border-stone bg-warm-taupe/50 p-5 md:p-6 lg:p-8">
            <div className="mb-5 flex items-start justify-between gap-3 lg:mb-6">
              <div>
                <h2 className="font-heading-sm text-[20px] text-ink">Nueva ciudad</h2>
                <p className="mt-1 font-body-sm text-smoke">
                  Solo necesitas el nombre. El resto es opcional.
                </p>
              </div>
              {locations.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setAdding(false)}
                  className="shrink-0 rounded-full p-1.5 text-smoke transition-colors hover:bg-eggshell hover:text-ink"
                  aria-label="Cerrar formulario"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              ) : null}
            </div>
            <LocationEditor
              key="new"
              action={upsertAction}
              defaultOrder={nextOrder}
              onSuccess={() => setAdding(false)}
              onCancel={locations.length > 0 ? () => setAdding(false) : undefined}
              submitLabel="Guardar ciudad"
              wide
            />
          </section>
        </div>
      </div>

      {sorted.length === 0 && !adding ? <EmptyState onAdd={openAdd} /> : null}

      {sorted.length > 0 ? (
        <section>
          <div className="mb-4 flex items-baseline justify-between gap-2 px-1">
            <h2 className="font-meta text-[12px] tracking-wide text-ash uppercase">
              Tus ciudades ({sorted.length})
            </h2>
            <p className="font-meta text-[11px] text-ash">Orden = posición en el catálogo</p>
          </div>

          <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {sorted.map((loc, index) => {
              const isEditing = editingId === loc.id
              return (
                <li
                  key={loc.id}
                  className={cn(
                    "admin-card-enter",
                    isEditing && "xl:col-span-2"
                  )}
                  style={{ animationDelay: `${Math.min(index, 6) * 50}ms` }}
                >
                  {isEditing ? (
                    <div
                      key={`edit-${loc.id}`}
                      className="admin-card-enter rounded-[20px] border border-ink/15 bg-eggshell p-5 shadow-whisper md:p-6 lg:p-8"
                    >
                      <div className="mb-4 flex items-center justify-between gap-2 lg:mb-6">
                        <h3 className="font-heading-sm text-[18px] text-ink">
                          Editar {loc.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="rounded-full p-1.5 text-smoke transition-colors hover:bg-warm-taupe hover:text-ink"
                          aria-label="Cancelar edición"
                        >
                          <span className="material-symbols-outlined text-[22px]">close</span>
                        </button>
                      </div>
                      <LocationEditor
                        key={loc.id}
                        action={upsertAction}
                        location={loc}
                        onSuccess={() => setEditingId(null)}
                        onCancel={() => setEditingId(null)}
                        submitLabel="Guardar cambios"
                        wide
                      />
                    </div>
                  ) : (
                    <LocationCard
                      location={loc}
                      position={index + 1}
                      onEdit={() => openEdit(loc.id)}
                      deleteAction={deleteAction}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}
    </div>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-[24px] border border-dashed border-stone bg-warm-taupe/40 px-6 py-14 text-center">
      <span className="material-symbols-outlined mb-3 text-[40px] text-ash">location_on</span>
      <p className="font-heading-sm text-[20px] text-ink">Aún no hay ciudades</p>
      <p className="mx-auto mt-2 max-w-sm font-body-sm text-smoke">
        Agrega la primera ciudad para poder asignar motos y filtrar el catálogo.
      </p>
      <Button type="button" className="mt-6" onClick={onAdd}>
        Agregar primera ciudad
      </Button>
    </div>
  )
}

function LocationCard({
  location,
  position,
  onEdit,
  deleteAction,
}: {
  location: LocationWithUsage
  position: number
  onEdit: () => void
  deleteAction: DeleteAction
}) {
  const usageBits: string[] = []
  if (location.product_count > 0) {
    usageBits.push(
      `${location.product_count} moto${location.product_count === 1 ? "" : "s"}`
    )
  }
  if (location.sede_count > 0) {
    usageBits.push(`${location.sede_count} sede${location.sede_count === 1 ? "" : "s"}`)
  }

  return (
    <article
      className={cn(
        "h-full rounded-[20px] border border-stone bg-eggshell p-4 md:p-5",
        "transition-[border-color,box-shadow,transform] duration-200 ease-out",
        "hover:border-stone hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      )}
    >
      <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-warm-taupe font-meta text-[13px] text-graphite"
            aria-hidden
          >
            {position}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-heading-sm text-[20px] text-ink">{location.name}</h3>
              <StatusBadge active={location.is_active} />
            </div>
            <p className="mt-1 font-body-sm text-smoke">
              Orden {location.sort_order}
              <span className="mx-1.5 text-ash">·</span>
              {location.is_active ? "Visible en el catálogo" : "Oculta para los clientes"}
            </p>
            {usageBits.length > 0 ? (
              <p className="mt-1 font-meta text-[12px] text-ash">Usa: {usageBits.join(" · ")}</p>
            ) : (
              <p className="mt-1 font-meta text-[12px] text-ash">Sin motos ni sedes aún</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-1 transition-transform duration-200 active:scale-[0.98] sm:flex-none"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Editar
          </Button>
          <DeleteLocationButton location={location} action={deleteAction} />
        </div>
      </div>
    </article>
  )
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-meta text-[11px] tracking-wide uppercase",
        active ? "bg-warm-taupe text-graphite" : "bg-stone text-ash"
      )}
    >
      {active ? "Visible" : "Oculta"}
    </span>
  )
}

function LocationEditor({
  action,
  location,
  defaultOrder = 1,
  onSuccess,
  onCancel,
  submitLabel,
  wide = false,
}: {
  action: UpsertAction
  location?: Location
  defaultOrder?: number
  onSuccess?: () => void
  onCancel?: () => void
  submitLabel: string
  wide?: boolean
}) {
  const [state, formAction, pending] = useActionState(action, initial)

  useEffect(() => {
    if (state.success) onSuccess?.()
  }, [state.success, onSuccess])

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {location?.id ? <input type="hidden" name="id" value={location.id} /> : null}
      <input type="hidden" name="slug" value={location?.slug ?? ""} />

      {state.error ? (
        <p
          role="alert"
          className="animate-fade-rise rounded-[10px] bg-destructive/10 px-3 py-2.5 font-body-sm text-destructive"
        >
          {state.error}
        </p>
      ) : null}

      <div className={cn(wide && "grid gap-5 md:grid-cols-2")}>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={location ? `name-${location.id}` : "name-new"}>Nombre de la ciudad</Label>
          <Input
            id={location ? `name-${location.id}` : "name-new"}
            name="name"
            defaultValue={location?.name}
            placeholder="Ej. Bogotá"
            required
            autoFocus={!location}
            className="rounded-[4px] bg-eggshell text-base md:text-sm"
          />
          <p className="font-meta text-[12px] text-ash">Así la verán los clientes en el filtro.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={location ? `order-${location.id}` : "order-new"}>Orden en la lista</Label>
          <Input
            id={location ? `order-${location.id}` : "order-new"}
            name="sort_order"
            type="number"
            min={0}
            defaultValue={location?.sort_order ?? defaultOrder}
            className="max-w-[160px] rounded-[4px] bg-eggshell text-base md:text-sm"
          />
          <p className="font-meta text-[12px] text-ash">
            El número más bajo aparece primero (1, luego 2…).
          </p>
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-[12px] border border-stone bg-eggshell p-4 transition-colors hover:bg-warm-taupe/40">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={location?.is_active ?? true}
          className="mt-0.5 size-4 accent-black"
        />
        <span>
          <span className="block font-body-sm font-medium text-ink">Mostrar en el sitio</span>
          <span className="mt-0.5 block font-meta text-[12px] text-ash">
            Si lo desactivas, la ciudad no aparece en el catálogo (las motos siguen guardadas).
          </span>
        </span>
      </label>

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

function DeleteLocationButton({
  location,
  action,
}: {
  location: LocationWithUsage
  action: DeleteAction
}) {
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(action, initial)
  const blocked = location.product_count > 0 || location.sede_count > 0

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
            className="flex-1 border-destructive/30 text-destructive transition-transform duration-200 hover:bg-destructive/5 active:scale-[0.98] sm:flex-none"
          />
        }
      >
        <span className="material-symbols-outlined text-[18px]">delete</span>
        Eliminar
      </DialogTrigger>
      <DialogContent className="rounded-[20px] bg-eggshell sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading-sm text-[22px]">
            {blocked ? `No se puede eliminar ${location.name}` : `¿Eliminar ${location.name}?`}
          </DialogTitle>
          <DialogDescription className="font-body-sm text-smoke">
            {blocked ? (
              <>
                Esta ciudad tiene{" "}
                {location.product_count > 0 ? (
                  <>
                    <strong className="font-medium text-ink">
                      {location.product_count} moto
                      {location.product_count === 1 ? "" : "s"}
                    </strong>
                  </>
                ) : null}
                {location.product_count > 0 && location.sede_count > 0 ? " y " : null}
                {location.sede_count > 0 ? (
                  <strong className="font-medium text-ink">
                    {location.sede_count} sede{location.sede_count === 1 ? "" : "s"}
                  </strong>
                ) : null}
                . La base de datos bloquea el borrado para no dejar motos o sedes sin ciudad.
                Reasígnalas o elimínalas primero.
              </>
            ) : (
              "Se quitará del catálogo. Esta acción no se puede deshacer."
            )}
          </DialogDescription>
        </DialogHeader>

        {state.error ? (
          <p
            role="alert"
            className="animate-fade-rise rounded-[10px] bg-destructive/10 px-3 py-2.5 font-body-sm text-destructive"
          >
            {state.error}
          </p>
        ) : null}

        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
          {blocked ? (
            <>
              {location.product_count > 0 ? (
                <Button render={<Link href="/admin/products" />} variant="outline" size="lg">
                  Ver productos
                </Button>
              ) : null}
              {location.sede_count > 0 ? (
                <Button render={<Link href="/admin/sedes" />} variant="outline" size="lg">
                  Ver sedes
                </Button>
              ) : null}
            </>
          ) : (
            <form action={formAction} className="w-full sm:w-auto">
              <input type="hidden" name="id" value={location.id} />
              <Button
                type="submit"
                variant="destructive"
                size="lg"
                disabled={pending}
                className="w-full sm:w-auto"
              >
                {pending ? "Eliminando…" : "Sí, eliminar"}
              </Button>
            </form>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
