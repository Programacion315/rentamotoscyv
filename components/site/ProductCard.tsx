import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getProductImageUrl, type Product } from "@/lib/types"

export function SparkOrb({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "spark-orb absolute rounded-full size-[180px] md:size-[220px] opacity-70",
        className
      )}
    />
  )
}

export function ProductCard({
  product,
  className,
  priority = false,
}: {
  product: Product
  className?: string
  priority?: boolean
}) {
  const imageUrl = getProductImageUrl(product.image_path)
  const locationName = product.locations?.name

  return (
    <Link
      href={`/rentals/${product.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[20px] bg-warm-taupe transition-[transform,opacity] duration-300 hover:opacity-95",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone/40">
        <SparkOrb className="-right-8 -top-6" />
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="img-zoom object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ash">
            <span className="material-symbols-outlined text-4xl">two_wheeler</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        {product.brand ? (
          <p className="font-meta text-ash">{product.brand}</p>
        ) : null}
        <h3 className="font-heading-sm text-[22px] md:text-[24px] text-ink leading-tight">
          {product.name}
        </h3>
        {locationName ? (
          <p className="font-body-sm text-smoke mt-auto pt-2">{locationName}</p>
        ) : null}
      </div>
    </Link>
  )
}
