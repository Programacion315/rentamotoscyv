import { ForgotPasswordForm } from "@/app/admin/components/AuthForms"
import { requestPasswordReset } from "@/app/admin/actions"

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="mb-2 font-heading-sm text-[28px] text-ink">Recuperar contraseña</h1>
      <p className="mb-6 font-body-sm text-smoke">
        Te enviaremos un enlace para restablecer tu acceso de administrador.
      </p>
      <ForgotPasswordForm action={requestPasswordReset} />
    </>
  )
}
