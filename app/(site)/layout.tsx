import Navbar from "@/app/(site)/components/Navbar"
import Footer from "@/app/(site)/components/Footer"
import { SiteWhatsAppFab } from "@/app/(site)/components/SiteWhatsAppFab"
import { VisitTracker } from "@/app/(site)/components/VisitTracker"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VisitTracker />
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
      <SiteWhatsAppFab />
    </>
  )
}
