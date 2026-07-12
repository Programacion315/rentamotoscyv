import { getActiveLocations, getActiveProducts } from "@/lib/data/queries"
import CatalogClient from "./CatalogClient"

export default async function CatalogPage() {
  const [products, locations] = await Promise.all([getActiveProducts(), getActiveLocations()])
  return <CatalogClient products={products} locations={locations} />
}
