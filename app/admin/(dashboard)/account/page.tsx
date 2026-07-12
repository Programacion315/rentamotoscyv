import { ChangePasswordForm } from "@/app/admin/components/AuthForms"
import { changePassword } from "@/app/admin/actions"

export default function AdminAccountPage() {
  return (
    <div className="max-w-md">
      <p className="font-label-caps text-ash mb-2">Cuenta</p>
      <h1 className="mb-2 font-heading-sm text-[28px] text-ink">Cambiar contraseña</h1>
      <p className="mb-6 font-body-sm text-smoke">
        Actualiza la contraseña de tu cuenta de administrador.
      </p>
      <ChangePasswordForm action={changePassword} />
    </div>
  )
}
