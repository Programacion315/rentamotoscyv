import Link from "next/link"
import { BrandLogo, SITE_NAME } from "@/app/(site)/components/BrandLogo"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-eggshell px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-3">
        <BrandLogo size={40} />
        <span className="font-button text-ink">{SITE_NAME}</span>
      </Link>
      <div className="w-full max-w-md rounded-[24px] border border-stone bg-eggshell p-8 shadow-whisper">
        {children}
      </div>
    </div>
  )
}
