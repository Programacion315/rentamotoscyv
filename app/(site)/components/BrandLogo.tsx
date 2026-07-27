import Image from "next/image"
import { cn } from "@/lib/utils"

export const SITE_NAME = "Rentamotos CyV"

// logo.webp is a transparent 610×409 image — keep its wide aspect ratio
const LOGO_RATIO = 610 / 409

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
      src="/assets/logo.webp?v=2"
      alt={SITE_NAME}
      width={width}
      height={size}
      priority={priority}
      className={cn("object-contain", className)}
      style={{ width, height: size }}
    />
  )
}
