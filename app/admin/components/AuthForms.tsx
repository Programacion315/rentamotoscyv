"use client"

import { useActionState } from "react"
import Link from "next/link"
import type { AuthResult } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initial: AuthResult = {}

const fieldClass = "rounded-[4px] bg-eggshell"

export function LoginForm({
  action,
  nextPath,
  errorFromQuery,
}: {
  action: (prev: AuthResult, formData: FormData) => Promise<AuthResult>
  nextPath: string
  errorFromQuery?: string
}) {
  const [state, formAction, pending] = useActionState(action, initial)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={nextPath} />
      {(state.error || errorFromQuery) && (
        <p className="rounded-[10px] bg-destructive/10 px-3 py-2 font-body-sm text-destructive">
          {state.error || (errorFromQuery === "unauthorized" ? "No autorizado." : errorFromQuery)}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Correo</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={fieldClass}
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Ingresando…" : "Ingresar"}
      </Button>
      <p className="text-center font-body-sm">
        <Link href="/admin/forgot-password" className="text-smoke underline-offset-4 hover:text-ink hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>
      </p>
    </form>
  )
}

export function ForgotPasswordForm({
  action,
}: {
  action: (prev: AuthResult, formData: FormData) => Promise<AuthResult>
}) {
  const [state, formAction, pending] = useActionState(action, initial)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && (
        <p className="rounded-[10px] bg-destructive/10 px-3 py-2 font-body-sm text-destructive">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-[10px] bg-warm-taupe px-3 py-2 font-body-sm text-graphite">
          {state.success}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Correo</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Enviando…" : "Enviar enlace"}
      </Button>
      <p className="text-center font-body-sm">
        <Link href="/admin/login" className="text-smoke underline-offset-4 hover:text-ink hover:underline">
          Volver al login
        </Link>
      </p>
    </form>
  )
}

export function ResetPasswordForm({
  action,
}: {
  action: (prev: AuthResult, formData: FormData) => Promise<AuthResult>
}) {
  const [state, formAction, pending] = useActionState(action, initial)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && (
        <p className="rounded-[10px] bg-destructive/10 px-3 py-2 font-body-sm text-destructive">
          {state.error}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Nueva contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirm">Confirmar contraseña</Label>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={fieldClass}
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Guardando…" : "Actualizar contraseña"}
      </Button>
      <p className="text-center font-body-sm">
        <Link href="/admin/login" className="text-smoke underline-offset-4 hover:text-ink hover:underline">
          Volver al login
        </Link>
      </p>
    </form>
  )
}

export function ChangePasswordForm({
  action,
}: {
  action: (prev: AuthResult, formData: FormData) => Promise<AuthResult>
}) {
  const [state, formAction, pending] = useActionState(action, initial)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && (
        <p className="rounded-[10px] bg-destructive/10 px-3 py-2 font-body-sm text-destructive">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-[10px] bg-warm-taupe px-3 py-2 font-body-sm text-graphite">
          {state.success}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Nueva contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirm">Confirmar contraseña</Label>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={fieldClass}
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Guardando…" : "Cambiar contraseña"}
      </Button>
    </form>
  )
}
