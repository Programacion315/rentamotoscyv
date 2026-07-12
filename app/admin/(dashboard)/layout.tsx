import { logoutAdmin } from "@/app/admin/actions"
import { AdminShell } from "@/app/admin/components/AdminShell"
import { requireAdmin } from "@/lib/admin/auth"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  return <AdminShell logoutAction={logoutAdmin}>{children}</AdminShell>
}
