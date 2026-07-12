import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const role = user.app_metadata?.role
  if (role !== "admin") {
    redirect("/admin/login?error=unauthorized")
  }

  return { supabase, user }
}

export function isAdminUser(user: { app_metadata?: Record<string, unknown> } | null) {
  return user?.app_metadata?.role === "admin"
}
