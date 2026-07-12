"use client"

import { useActionState, useEffect, useState } from "react"
import type { ActionResult } from "@/app/admin/(dashboard)/actions"
import type { SiteContact, SocialLink } from "@/lib/types"
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

export function ContactManager({
  contact,
  socials,
  updateContactAction,
  upsertSocialAction,
  deleteSocialAction,
}: {
  contact: SiteContact | null
  socials: SocialLink[]
  updateContactAction: UpsertAction
  upsertSocialAction: UpsertAction
  deleteSocialAction: DeleteAction
}) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const sorted = socials.toSorted(
    (a, b) => a.sort_order - b.sort_order || a.label.localeCompare(b.label)
  )
  const nextOrder =
    sorted.length > 0 ? Math.max(...sorted.map((s) => s.sort_order)) + 1 : 1

  return (
    <div className="flex w-full flex-col gap-12 lg:gap-14">
      <section>
        <header className="mb-6 max-w-xl">
          <h1 className="font-heading text-[28px] text-ink md:text-[32px]">Contacto del sitio</h1>
          <p className="mt-2 font-body-sm leading-relaxed text-smoke">
            Teléfono, correo y WhatsApp que ven los clientes. El botón verde de WhatsApp usa estos
            datos.
          </p>
        </header>
        <ContactEditor action={updateContactAction} contact={contact} />
      </section>

      <section>
        <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-heading-sm text-[24px] text-ink md:text-[28px]">Redes sociales</h2>
            <p className="mt-2 font-body-sm text-smoke">
              Enlaces del pie de página (Instagram, Facebook, etc.).
            </p>
          </div>
          <Button
            type="button"
            size="lg"
            className="w-full shrink-0 sm:w-auto"
            onClick={() => {
              setEditingId(null)
              setAdding(true)
            }}
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Agregar red
          </Button>
        </header>

        <div className={cn("admin-expand mb-6", adding && "mb-8")} data-open={adding}>
          <div className="admin-expand-inner">
            <div className="rounded-[20px] border border-stone bg-warm-taupe/50 p-5 md:p-6 lg:p-8">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading-sm text-[18px] text-ink">Nueva red social</h3>
                  <p className="mt-1 font-body-sm text-smoke">Nombre y enlace públicos.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAdding(false)}
                  className="rounded-full p-1.5 text-smoke hover:bg-eggshell hover:text-ink"
                  aria-label="Cerrar"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>
              <SocialEditor
                key="new"
                action={upsertSocialAction}
                defaultOrder={nextOrder}
                onSuccess={() => setAdding(false)}
                onCancel={() => setAdding(false)}
                submitLabel="Guardar enlace"
              />
            </div>
          </div>
        </div>

        {sorted.length === 0 && !adding ? (
          <div className="rounded-[24px] border border-dashed border-stone bg-warm-taupe/40 px-6 py-12 text-center">
            <span className="material-symbols-outlined mb-3 text-[36px] text-ash">share</span>
            <p className="font-heading-sm text-[18px] text-ink">Sin redes todavía</p>
            <p className="mx-auto mt-2 max-w-sm font-body-sm text-smoke">
              Agrega Instagram u otras redes para mostrarlas en el pie del sitio.
            </p>
          </div>
        ) : null}

        {sorted.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sorted.map((link, index) => {
              const isEditing = editingId === link.id
              return (
                <li
                  key={link.id}
                  className={cn("admin-card-enter", isEditing && "md:col-span-2 xl:col-span-3")}
                  style={{ animationDelay: `${Math.min(index, 6) * 50}ms` }}
                >
                  {isEditing ? (
                    <div className="admin-card-enter rounded-[20px] border border-ink/15 bg-eggshell p-5 shadow-whisper md:p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-heading-sm text-[18px] text-ink">Editar {link.label}</h3>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="rounded-full p-1.5 text-smoke hover:bg-warm-taupe"
                          aria-label="Cancelar"
                        >
                          <span className="material-symbols-outlined text-[22px]">close</span>
                        </button>
                      </div>
                      <SocialEditor
                        key={link.id}
                        action={upsertSocialAction}
                        link={link}
                        onSuccess={() => setEditingId(null)}
                        onCancel={() => setEditingId(null)}
                        submitLabel="Guardar cambios"
                      />
                    </div>
                  ) : (
                    <SocialCard
                      link={link}
                      onEdit={() => {
                        setAdding(false)
                        setEditingId(link.id)
                      }}
                      deleteAction={deleteSocialAction}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        ) : null}
      </section>
    </div>
  )
}

function ContactEditor({
  action,
  contact,
}: {
  action: UpsertAction
  contact: SiteContact | null
}) {
  const [state, formAction, pending] = useActionState(action, initial)

  return (
    <form
      action={formAction}
      className="admin-card-enter rounded-[20px] border border-stone bg-eggshell p-5 md:p-6 lg:p-8"
    >
      {state.error ? (
        <p role="alert" className="mb-4 rounded-[10px] bg-destructive/10 px-3 py-2.5 font-body-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="mb-4 animate-fade-rise rounded-[10px] bg-warm-taupe px-3 py-2.5 font-body-sm text-graphite">
          {state.success}
        </p>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={contact?.phone ?? ""}
            placeholder="+57 300 000 0000"
            className="rounded-[4px] bg-eggshell text-base md:text-sm"
          />
          <p className="font-meta text-[12px] text-ash">Se muestra en el pie y Contacto.</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={contact?.email ?? ""}
            placeholder="info@tudominio.com"
            className="rounded-[4px] bg-eggshell text-base md:text-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2 xl:col-span-1">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            id="whatsapp"
            name="whatsapp"
            defaultValue={contact?.whatsapp ?? ""}
            placeholder="573001112233"
            className="rounded-[4px] bg-eggshell text-base md:text-sm"
          />
          <p className="font-meta text-[12px] text-ash">
            Solo números, con código de país (57…), sin espacios ni +.
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto sm:min-w-[180px]">
          {pending ? "Guardando…" : "Guardar contacto"}
        </Button>
      </div>
    </form>
  )
}

function SocialCard({
  link,
  onEdit,
  deleteAction,
}: {
  link: SocialLink
  onEdit: () => void
  deleteAction: DeleteAction
}) {
  return (
    <article className="flex h-full flex-col rounded-[20px] border border-stone bg-eggshell p-5 transition-[box-shadow] duration-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="mb-2 flex items-center gap-2">
        <h3 className="font-heading-sm text-[18px] text-ink">{link.label}</h3>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 font-meta text-[11px] uppercase",
            link.is_active ? "bg-warm-taupe text-graphite" : "bg-stone text-ash"
          )}
        >
          {link.is_active ? "Visible" : "Oculta"}
        </span>
      </div>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="truncate font-body-sm text-smoke underline-offset-2 hover:text-ink hover:underline"
      >
        {link.url}
      </a>
      <p className="mt-2 font-meta text-[12px] text-ash">Orden {link.sort_order}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onEdit} className="flex-1 sm:flex-none">
          <span className="material-symbols-outlined text-[18px]">edit</span>
          Editar
        </Button>
        <DeleteSocialButton id={link.id} name={link.label} action={deleteAction} />
      </div>
    </article>
  )
}

function SocialEditor({
  action,
  link,
  defaultOrder = 1,
  onSuccess,
  onCancel,
  submitLabel,
}: {
  action: UpsertAction
  link?: SocialLink
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
      {link?.id ? <input type="hidden" name="id" value={link.id} /> : null}
      {state.error ? (
        <p role="alert" className="rounded-[10px] bg-destructive/10 px-3 py-2.5 font-body-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label>Nombre de la red</Label>
          <Input
            name="label"
            defaultValue={link?.label}
            placeholder="Ej. Instagram"
            required
            className="rounded-[4px] bg-eggshell text-base md:text-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Enlace (URL)</Label>
          <Input
            name="url"
            defaultValue={link?.url}
            placeholder="https://instagram.com/tuusuario"
            required
            className="rounded-[4px] bg-eggshell text-base md:text-sm"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label>Orden</Label>
          <Input
            name="sort_order"
            type="number"
            min={0}
            defaultValue={link?.sort_order ?? defaultOrder}
            className="max-w-[140px] rounded-[4px] bg-eggshell"
          />
        </div>
        <label className="flex cursor-pointer items-start gap-3 rounded-[12px] border border-stone bg-eggshell p-4 self-end">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={link?.is_active ?? true}
            className="mt-0.5 size-4 accent-black"
          />
          <span>
            <span className="block font-body-sm font-medium text-ink">Mostrar en el sitio</span>
            <span className="mt-0.5 block font-meta text-[12px] text-ash">Visible en el pie de página.</span>
          </span>
        </label>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {onCancel ? (
          <Button type="button" variant="outline" size="lg" onClick={onCancel} disabled={pending}>
            Cancelar
          </Button>
        ) : null}
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Guardando…" : submitLabel}
        </Button>
      </div>
    </form>
  )
}

function DeleteSocialButton({
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
            El enlace desaparecerá del pie de página.
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
