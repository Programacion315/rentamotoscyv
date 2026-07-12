import { notFound } from "next/navigation"
import { getProductBySlug, getSiteContact } from "@/lib/data/queries"
import RentalDetailsClient from "./RentalDetailsClient"

export default async function RentalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, contact] = await Promise.all([getProductBySlug(id), getSiteContact()])
  if (!product) notFound()

  return (
    <RentalDetailsClient
      product={product}
      whatsapp={contact?.whatsapp ?? "573218449988"}
    />
  )
}
