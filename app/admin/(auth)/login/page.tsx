import { LoginForm } from "@/app/admin/components/AuthForms"
import { loginAdmin } from "@/app/admin/actions"

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const params = await searchParams
  return (
    <>
      <h1 className="mb-2 font-heading-sm text-[28px] text-ink">Admin</h1>
      <p className="mb-6 font-body-sm text-smoke">Inicia sesión para gestionar el sitio.</p>
      <LoginForm
        action={loginAdmin}
        nextPath={params.next?.startsWith("/admin") ? params.next : "/admin"}
        errorFromQuery={params.error}
      />
    </>
  )
}
