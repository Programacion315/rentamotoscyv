"use client"

import Image from "next/image"
import { useState } from "react"
import { SoftSpinner } from "@/components/site/SoftSpinner"
import { cn } from "@/lib/utils"

type ProductMediaProps = {
  src: string | null
  alt: string
  priority?: boolean
  sizes?: string
  className?: string
  imageClassName?: string
}

export function ProductMedia({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
  imageClassName,
}: ProductMediaProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    src ? "loading" : "error"
  )

  const showSpinner = Boolean(src) && status === "loading"

  return (
    <div className={cn("relative size-full overflow-hidden bg-warm-taupe", className)}>
      {showSpinner ? (
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <SoftSpinner size="md" />
        </div>
      ) : null}

      {src && status !== "error" ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes={sizes}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "object-cover transition-opacity duration-300",
            status === "loaded" ? "opacity-100" : "opacity-0",
            imageClassName
          )}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-ash">
          <span className="material-symbols-outlined text-4xl md:text-5xl">two_wheeler</span>
        </div>
      )}
    </div>
  )
}
