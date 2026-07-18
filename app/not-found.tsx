import Navbar from "@/app/(site)/components/Navbar"
import Footer from "@/app/(site)/components/Footer"
import { NotFoundContent } from "@/components/site/NotFoundContent"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="grow">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  )
}
