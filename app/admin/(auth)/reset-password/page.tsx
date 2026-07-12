import Link from "next/link"
import { ResetPasswordForm } from "@/app/admin/components/AuthForms"
import { updatePassword } from "@/app/admin/actions"
import { createClient } from "@/lib/supabase/server"

export default async function ResetPasswordPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <>
        <h1 className="mb-2 font-heading-sm text-[28px] text-ink">Enlace inválido</h1>
        <p className="mb-6 font-body-sm text-smoke">
          El enlace es inválido o expiró. Solicita uno nuevo para restablecer tu contraseña.
        </p>
        <p className="font-body-sm">
          <Link
            href="/admin/forgot-password"
            className="text-smoke underline-offset-4 hover:text-ink hover:underline"
          >
            Recuperar contraseña
          </Link>
        </p>
      </>
    )
  }

  return (
    <>
      <h1 className="mb-2 font-heading-sm text-[28px] text-ink">Nueva contraseña</h1>
      <p className="mb-6 font-body-sm text-smoke">
        Elige una contraseña nueva para tu cuenta de administrador.
      </p>
      <ResetPasswordForm action={updatePassword} />
    </>
  )
}
