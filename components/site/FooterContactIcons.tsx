import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type FooterIconKind =
  | "whatsapp"
  | "phone"
  | "email"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "youtube"
  | "link"

const iconPaths: Record<FooterIconKind, ReactNode> = {
  whatsapp: (
    <path
      fill="currentColor"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.09.61 4.09 1.76 5.81L2 22l4.45-1.85a9.86 9.86 0 005.59 1.72h.005c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 17.96h-.004a8.1 8.1 0 01-4.12-1.13l-.296-.175-3.07.8.82-2.99-.193-.307a8.05 8.05 0 01-1.24-4.32c0-4.47 3.64-8.11 8.12-8.11 2.17 0 4.21.85 5.74 2.38a8.07 8.07 0 012.38 5.74c0 4.47-3.64 8.11-8.12 8.11z"
    />
  ),
  phone: (
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.5 4.5h3l1.5 3.5-2 1.5a11 11 0 005 5l1.5-2 3.5 1.5v3a1.5 1.5 0 01-1.5 1.5A13 13 0 014 6a1.5 1.5 0 011.5-1.5z"
    />
  ),
  email: (
    <>
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7.5l8 5.5 8-5.5"
      />
    </>
  ),
  instagram: (
    <>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </>
  ),
  facebook: (
    <path
      fill="currentColor"
      d="M14.5 8.5h2.5l-.5 3h-2v9h-3.5v-9H9.5V8.5h1.5V6.8c0-1.2.4-2.1 1.2-2.7.8-.6 1.9-.9 3.3-.9.9 0 1.7.1 2.3.2v2.6h-1.6c-.7 0-1.1.1-1.4.4-.3.3-.4.7-.4 1.3V8.5z"
    />
  ),
  tiktok: (
    <path
      fill="currentColor"
      d="M14.5 5.5c.6 1.2 1.6 2.1 2.8 2.5V11c-1.1 0-2.1-.3-3-.8v5.3a4.5 4.5 0 11-4.5-4.5c.2 0 .5 0 .7.1a4.48 4.48 0 003.8 2.2V9.4a6.9 6.9 0 01-3.8-1.1V5.5h4z"
    />
  ),
  youtube: (
    <>
      <rect
        x="3"
        y="6.5"
        width="18"
        height="11"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path fill="currentColor" d="M11 9.5v5l4.5-2.5L11 9.5z" />
    </>
  ),
  link: (
    <>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 14.5l-2 2a2.5 2.5 0 103.5 3.5l2-2M14.5 9.5l2-2a2.5 2.5 0 10-3.5-3.5l-2 2"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 14l4-4"
      />
    </>
  ),
}

export function footerIconFromLabel(label: string): FooterIconKind {
  const key = label.toLowerCase()
  if (key.includes("whatsapp")) return "whatsapp"
  if (key.includes("instagram")) return "instagram"
  if (key.includes("facebook")) return "facebook"
  if (key.includes("tiktok")) return "tiktok"
  if (key.includes("youtube")) return "youtube"
  return "link"
}

function FooterIconGlyph({ kind }: { kind: FooterIconKind }) {
  return (
    <svg viewBox="0 0 24 24" className="size-[15px]" aria-hidden>
      {iconPaths[kind]}
    </svg>
  )
}

export function FooterIconLink({
  href,
  title,
  kind,
  external = false,
}: {
  href: string
  title: string
  kind: FooterIconKind
  external?: boolean
}) {
  return (
    <a
      href={href}
      title={title}
      aria-label={title}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group/icon flex size-9 items-center justify-center rounded-full",
        "border border-stone bg-eggshell text-graphite",
        "transition-[color,background-color,border-color,transform] duration-200",
        "hover:border-ink hover:bg-warm-taupe hover:text-ink",
        "active:scale-[0.97]"
      )}
    >
      <FooterIconGlyph kind={kind} />
    </a>
  )
}
