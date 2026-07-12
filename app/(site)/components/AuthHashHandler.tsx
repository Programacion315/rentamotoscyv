"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

const LOGIN_ERRORS: Record<string, string> = {
  otp_expired: "El enlace expiró o ya fue usado. Solicita uno nuevo en recuperar contraseña.",
  access_denied: "No se pudo completar la autenticación. Intenta de nuevo.",
}

function clearHash() {
  window.history.replaceState(null, "", window.location.pathname + window.location.search)
}

export default function AuthHashHandler() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash.length <= 1) return

    const params = new URLSearchParams(hash.replace(/^#/, ""))

    if (params.has("error") || params.has("error_code")) {
      const code = params.get("error_code") ?? params.get("error") ?? "auth_error"
      const description = params.get("error_description")
      const message =
        LOGIN_ERRORS[code] ??
        (description
          ? decodeURIComponent(description.replace(/\+/g, " "))
          : "Error de autenticación.")

      clearHash()
      window.location.replace(`/admin/login?error=${encodeURIComponent(message)}`)
      return
    }

    const accessToken = params.get("access_token")
    const refreshToken = params.get("refresh_token")
    if (!accessToken || !refreshToken) return

    const type = params.get("type")
    const supabase = createClient()

    void (async () => {
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      clearHash()

      if (error) {
        window.location.replace(`/admin/login?error=${encodeURIComponent(error.message)}`)
        return
      }

      if (type === "recovery") {
        window.location.replace("/admin/reset-password")
        return
      }

      window.location.replace("/admin")
    })()
  }, [])

  return null
}
