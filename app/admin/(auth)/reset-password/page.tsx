import { ResetPasswordForm } from "@/app/admin/components/AuthForms"
import { updatePassword } from "@/app/admin/actions"

export default function ResetPasswordPage() {
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
