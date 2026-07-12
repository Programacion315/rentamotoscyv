"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export type AuthResult = { error?: string; success?: string }

export async function loginAdmin(
  _prev: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const next = String(formData.get("next") ?? "/admin")

  if (!email || !password) {
    return { error: "Ingresa correo y contraseña." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  if (data.user?.app_metadata?.role !== "admin") {
    await supabase.auth.signOut()
    return { error: "No tienes permisos de administrador." }
  }

  redirect(next.startsWith("/admin") ? next : "/admin")
}

export async function logoutAdmin() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}

export async function requestPasswordReset(
  _prev: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim()
  if (!email) return { error: "Ingresa tu correo." }

  const supabase = await createClient()
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/admin/reset-password`,
  })

  if (error) return { error: error.message }
  return { success: "Si el correo existe, recibirás un enlace para restablecer la contraseña." }
}

function validateNewPassword(password: string, confirm: string): AuthResult | null {
  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." }
  }
  if (password !== confirm) {
    return { error: "Las contraseñas no coinciden." }
  }
  return null
}

export async function updatePassword(
  _prev: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const password = String(formData.get("password") ?? "")
  const confirm = String(formData.get("confirm") ?? "")
  const invalid = validateNewPassword(password, confirm)
  if (invalid) return invalid

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "El enlace es inválido o expiró. Solicita uno nuevo." }
  }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) return { error: error.message }

  redirect("/admin")
}

export async function changePassword(
  _prev: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const password = String(formData.get("password") ?? "")
  const confirm = String(formData.get("confirm") ?? "")
  const invalid = validateNewPassword(password, confirm)
  if (invalid) return invalid

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user || user.app_metadata?.role !== "admin") {
    return { error: "No tienes permisos de administrador." }
  }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) return { error: error.message }

  return { success: "Contraseña actualizada correctamente." }
}
