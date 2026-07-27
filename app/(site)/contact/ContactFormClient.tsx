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
      className="rounded-[24px] bg-warm-taupe p-6 md:p-8"
    >
      <h2 className="font-heading-sm text-[24px] text-ink">Escríbenos</h2>
      <p className="mt-2 font-body-sm text-smoke">
        Completa el formulario y te abrimos WhatsApp con el mensaje listo.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" name="name" required placeholder="Tu nombre" className="rounded-[4px] bg-eggshell" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="message">Mensaje</Label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="¿En qué podemos ayudarte?"
            className="w-full rounded-[4px] border border-input bg-eggshell px-3 py-2 font-body-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
          />
        </div>
        <Button type="submit" className="mt-2 self-start" disabled={!waHref}>
          Enviar por WhatsApp
        </Button>
        {!waHref ? (
          <p className="font-body-sm text-smoke">WhatsApp no está configurado aún.</p>
        ) : null}
        {sent ? (
          <p className="font-body-sm text-smoke">Si no se abrió WhatsApp, usa el botón verde flotante.</p>
        ) : null}
      </div>
    </form>
  )
}
