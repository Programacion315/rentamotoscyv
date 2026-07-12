import { getSiteContact } from "@/lib/data/queries"
import { whatsappHref } from "@/lib/types"
import { WhatsAppFab } from "@/components/site/WhatsAppFab"

export async function SiteWhatsAppFab() {
  const contact = await getSiteContact()
  const href = whatsappHref(contact?.whatsapp ?? "573218449988")
  return <WhatsAppFab href={href} />
}
