import Image from "next/image"
import { cn } from "@/lib/utils"

export const SITE_NAME = "Renta Motos CyV"
export const SITE_EMAIL = "Rentamotoscyv@gmail.com"

// logo.webp is a transparent 446×221 image, trimmed tight to the artwork
// (the original 610×409 file had a lot of empty margin baked in, which made
// the logo look like it couldn't sit closer to the navbar's edge no matter
// how much container padding was removed) — keep its aspect ratio
const LOGO_RATIO = 446 / 221

type BrandLogoProps = {
  className?: string
  /** Rendered height in px; width follows the logo's natural aspect */
  size?: number
  priority?: boolean
}

export function BrandLogo({ className, size = 56, priority = false }: BrandLogoProps) {
  const width = Math.round(size * LOGO_RATIO)
  return (
    <Image
      src="/assets/logo.webp?v=3"
      alt={SITE_NAME}
      width={width}
      height={size}
      priority={priority}
      className={cn("object-contain", className)}
      style={{ width, height: size }}
    />
  )
}
