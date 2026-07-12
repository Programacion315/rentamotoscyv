"use client"

import type { ReactNode } from "react"
import { useActionState, useEffect, useRef, useState } from "react"
import type { ActionResult } from "@/app/admin/(dashboard)/actions"
import type { Location, Product } from "@/lib/types"
import { SPEC_LABEL_SUGGESTIONS, getProductImageUrl } from "@/lib/types"
import { FormSelect } from "@/components/admin/FormSelect"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const initial: ActionResult = {}
const inputClass = "rounded-[4px] bg-eggshell text-base md:text-sm"

type SpecRow = { label: string; value: string }
type FeatureRow = { label: string }

export function ProductForm({
  action,
  product,
  locations,
}: {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>
  product?: Product | null
  locations: Location[]
}) {
  const [state, formAction, pending] = useActionState(action, initial)
  const [specs, setSpecs] = useState<SpecRow[]>(
    product?.product_specs?.map((s) => ({ label: s.label, value: s.value })) ?? [
      { label: "Cilindraje", value: "" },
    ]
  )
  const [features, setFeatures] = useState<FeatureRow[]>(
    product?.product_features?.map((f) => ({ label: f.label })) ?? [{ label: "" }]
  )
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    product?.image_path ? getProductImageUrl(product.image_path) : null
  )
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function onFileChange(file: File | undefined) {
    if (!file) return
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(URL.createObjectURL(file))
  }

  return (
    <form action={formAction} className="flex flex-col gap-6 pb-24 lg:pb-8">
      {product?.id ? <input type="hidden" name="id" value={product.id} /> : null}
      {/* Slug auto from name on server if empty */}
      <input type="hidden" name="slug" value={product?.slug ?? ""} />

      {state.error ? (
        <p
          role="alert"
          className="animate-fade-rise rounded-[10px] bg-destructive/10 px-3 py-2.5 font-body-sm text-destructive"
        >
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-12 xl:items-start">
        {/* Main column */}
        <div className="flex flex-col gap-6 xl:col-span-7">
          <Section
            step={1}
            title="Datos de la moto"
            description="Lo esencial que verán los clientes en el catálogo."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Nombre del modelo"
                name="name"
                defaultValue={product?.name}
                required
                placeholder="Ej. FZ25 ABS"
                hint="Nombre corto y claro."
              />
              <Field
                label="Marca"
                name="brand"
                defaultValue={product?.brand}
                required
                placeholder="Ej. Yamaha"
              />
              <Field
                label="Categoría (opcional)"
                name="category"
                defaultValue={product?.category ?? ""}
                placeholder="Ej. Naked Sport"
                hint="Aparece como etiqueta pequeña."
              />
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="location_id">Ciudad</Label>
                <FormSelect
                  id="location_id"
                  name="location_id"
                  required
                  placeholder="¿En qué ciudad está?"
                  defaultValue={product?.location_id}
                  options={locations.map((l) => ({ value: l.id, label: l.name }))}
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="description">Descripción</Label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  defaultValue={product?.description ?? ""}
                  placeholder="Cuenta qué hace especial esta moto…"
                  className={cn(
                    "w-full border border-input px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ink/20",
                    inputClass
                  )}
                />
              </div>
            </div>
          </Section>

          <Section
            step={3}
            title="Ficha técnica"
            description="Datos como cilindraje o potencia. Puedes dejar filas vacías."
            action={
              <button
                type="button"
                className="font-body-sm text-smoke transition-colors hover:text-ink"
                onClick={() => setSpecs((s) => [...s, { label: "", value: "" }])}
              >
                + Agregar fila
              </button>
            }
          >
            <p className="mb-3 font-meta text-[12px] text-ash">
              Sugeridas: {SPEC_LABEL_SUGGESTIONS.join(" · ")}
            </p>
            <div className="flex flex-col gap-2">
              {specs.map((row, i) => (
                <div key={i} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Input
                    name="spec_label"
                    value={row.label}
                    onChange={(e) =>
                      setSpecs((rows) =>
                        rows.map((r, idx) => (idx === i ? { ...r, label: e.target.value } : r))
                      )
                    }
                    placeholder="Dato (ej. Cilindraje)"
                    className={`${inputClass} flex-1`}
                    list="spec-suggestions"
                  />
                  <Input
                    name="spec_value"
                    value={row.value}
                    onChange={(e) =>
                      setSpecs((rows) =>
                        rows.map((r, idx) => (idx === i ? { ...r, value: e.target.value } : r))
                      )
                    }
                    placeholder="Valor (ej. 250 cc)"
                    className={`${inputClass} flex-1`}
                  />
                  <button
                    type="button"
                    className="shrink-0 self-end py-2 font-body-sm text-destructive sm:self-auto"
                    onClick={() => setSpecs((rows) => rows.filter((_, idx) => idx !== i))}
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>
            <datalist id="spec-suggestions">
              {SPEC_LABEL_SUGGESTIONS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </Section>

          <Section
            step={4}
            title="Etiquetas rápidas"
            description='Palabras cortas como "ABS" o "Dual Purpose".'
            action={
              <button
                type="button"
                className="font-body-sm text-smoke transition-colors hover:text-ink"
                onClick={() => setFeatures((f) => [...f, { label: "" }])}
              >
                + Agregar
              </button>
            }
          >
            <div className="flex flex-col gap-2">
              {features.map((row, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    name="feature_label"
                    value={row.label}
                    onChange={(e) =>
                      setFeatures((rows) =>
                        rows.map((r, idx) => (idx === i ? { label: e.target.value } : r))
                      )
                    }
                    placeholder="Ej. Dual Purpose"
                    className={`${inputClass} flex-1`}
                  />
                  <button
                    type="button"
                    className="font-body-sm text-destructive"
                    onClick={() => setFeatures((rows) => rows.filter((_, idx) => idx !== i))}
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Side column: photo + visibility */}
        <div className="flex flex-col gap-6 xl:col-span-5 xl:sticky xl:top-6">
          <Section
            step={2}
            title="Foto"
            description="Se convierte sola a WebP. Usa una foto clara de la moto."
          >
            <input
              ref={fileRef}
              type="file"
              name="image"
              accept="image/*"
              className="sr-only"
              onChange={(e) => onFileChange(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className={cn(
                "group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-dashed border-stone bg-warm-taupe/50",
                "min-h-[220px] transition-[border-color,background-color] duration-200",
                "hover:border-ink/30 hover:bg-warm-taupe"
              )}
            >
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <>
                  <span className="material-symbols-outlined text-[40px] text-ash">add_a_photo</span>
                  <span className="mt-2 font-body-sm text-smoke">Toca para elegir foto</span>
                </>
              )}
              {previewUrl ? (
                <span className="absolute inset-x-0 bottom-0 bg-black/55 py-2.5 text-center text-[13px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Cambiar foto
                </span>
              ) : null}
            </button>
            {product?.image_path && !previewUrl?.startsWith("blob:") ? (
              <p className="mt-2 font-meta text-[12px] text-ash">Foto actual guardada. Elige otra para reemplazarla.</p>
            ) : null}
          </Section>

          <Section step={5} title="Visibilidad" description="Controla si aparece en el sitio.">
            <div className="flex flex-col gap-3">
              <ToggleCard
                name="is_active"
                defaultChecked={product?.is_active ?? true}
                title="Mostrar en el catálogo"
                hint="Si lo desactivas, los clientes no la verán."
              />
              <ToggleCard
                name="is_featured"
                defaultChecked={product?.is_featured ?? false}
                title="Destacar en inicio"
                hint="Aparece en la sección de motos destacadas."
              />
            </div>
          </Section>

          <div className="hidden lg:block">
            <Button type="submit" disabled={pending} size="lg" className="w-full">
              {pending ? "Guardando…" : product ? "Guardar cambios" : "Crear moto"}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile sticky save */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-stone bg-eggshell/95 p-4 backdrop-blur-md lg:hidden">
        <Button type="submit" disabled={pending} size="lg" className="w-full">
          {pending ? "Guardando…" : product ? "Guardar cambios" : "Crear moto"}
        </Button>
      </div>
    </form>
  )
}

function Section({
  step,
  title,
  description,
  action,
  children,
}: {
  step: number
  title: string
  description: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="admin-card-enter rounded-[20px] border border-stone bg-eggshell p-5 md:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-warm-taupe font-meta text-[12px] text-graphite"
            aria-hidden
          >
            {step}
          </span>
          <div>
            <h2 className="font-heading-sm text-[18px] text-ink">{title}</h2>
            <p className="mt-0.5 font-body-sm text-smoke">{description}</p>
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

function Field({
  label,
  name,
  defaultValue,
  required,
  placeholder,
  hint,
}: {
  label: string
  name: string
  defaultValue?: string
  required?: boolean
  placeholder?: string
  hint?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
      {hint ? <p className="font-meta text-[12px] text-ash">{hint}</p> : null}
    </div>
  )
}

function ToggleCard({
  name,
  defaultChecked,
  title,
  hint,
}: {
  name: string
  defaultChecked: boolean
  title: string
  hint: string
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-[12px] border border-stone bg-warm-taupe/40 p-4 transition-colors hover:bg-warm-taupe">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 size-4 accent-black"
      />
      <span>
        <span className="block font-body-sm font-medium text-ink">{title}</span>
        <span className="mt-0.5 block font-meta text-[12px] text-ash">{hint}</span>
      </span>
    </label>
  )
}
