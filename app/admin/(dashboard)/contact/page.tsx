import { ContactManager } from "@/app/admin/components/ContactManager"
import {
  deleteSocialLink,
  updateSiteContact,
  upsertSocialLink,
} from "@/app/admin/(dashboard)/actions"
import { getAllSocialLinksAdmin, getSiteContact } from "@/lib/data/queries"

export default async function AdminContactPage() {
  const [contact, socials] = await Promise.all([getSiteContact(), getAllSocialLinksAdmin()])

  return (
    <ContactManager
      contact={contact}
      socials={socials}
      updateContactAction={updateSiteContact}
      upsertSocialAction={upsertSocialLink}
      deleteSocialAction={deleteSocialLink}
    />
  )
}
