import { SedesManager } from "@/app/admin/components/SedesManager"
import { deleteSede, upsertSede } from "@/app/admin/(dashboard)/actions"
import { getAllLocationsAdmin, getAllSedesAdmin } from "@/lib/data/queries"

export default async function AdminSedesPage() {
  const [sedes, locations] = await Promise.all([getAllSedesAdmin(), getAllLocationsAdmin()])

  return (
    <SedesManager
      sedes={sedes}
      locations={locations}
      upsertAction={upsertSede}
      deleteAction={deleteSede}
    />
  )
}
