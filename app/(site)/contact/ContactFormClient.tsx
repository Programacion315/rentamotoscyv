"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ContactFormClient({
  whatsappHref: waHref,
}: {
  whatsappHref: string | null
}) {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()
    const text = `Hola, soy ${name}.\n\n${message}`

    if (waHref) {
      const url = `${waHref}${waHref.includes("?") ? "&" : "?"}text=${encodeURIComponent(text)}`
      window.open(url, "_blank", "noopener,noreferrer")
      setSent(true)
      return
    }

    setSent(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-float-up stagger-3 rounded-[24px] border border-stone bg-eggshell p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] md:p-8"
    >
      <h2 className="font-heading-sm text-[22px] text-ink md:text-[24px]">Escríbenos</h2>
      <p className="mt-2 font-body-sm text-smoke">
        Completa el formulario y te abrimos WhatsApp con el mensaje listo.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="font-body-sm font-medium text-graphite">Nombre</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Tu nombre"
            className="h-11 rounded-[10px] border-stone bg-warm-taupe transition-all duration-200 focus:border-brand/50 focus:ring-brand/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="font-body-sm font-medium text-graphite">Mensaje</Label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="¿En qué podemos ayudarte?"
            className="w-full rounded-[10px] border border-stone bg-warm-taupe px-4 py-3 font-body-sm text-ink outline-none transition-all duration-200 focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <Button
          type="submit"
          className="mt-2 h-12 self-start rounded-full bg-brand px-8 font-button text-white shadow-[0_2px_8px_rgba(51,63,123,0.25)] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(51,63,123,0.35)] active:scale-[0.98]"
          disabled={!waHref}
        >
          Enviar por WhatsApp
        </Button>
        {!waHref ? (
          <p className="font-body-sm text-smoke">WhatsApp no está configurado aún.</p>
        ) : null}
        {sent ? (
          <p className="font-body-sm text-brand">Si no se abrió WhatsApp, usa el botón verde flotante.</p>
        ) : null}
      </div>
    </form>
  )
}
