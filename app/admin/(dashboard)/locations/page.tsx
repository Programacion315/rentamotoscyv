import { LocationsManager } from "@/app/admin/components/LocationsManager"
import { deleteLocation, upsertLocation } from "@/app/admin/(dashboard)/actions"
import { getLocationsWithUsageAdmin } from "@/lib/data/queries"

export default async function AdminLocationsPage() {
  const locations = await getLocationsWithUsageAdmin()

  return (
    <LocationsManager
      locations={locations}
      upsertAction={upsertLocation}
      deleteAction={deleteLocation}
    />
  )
}
