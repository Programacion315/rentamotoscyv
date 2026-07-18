import Link from "next/link"
import { cn } from "@/lib/utils"
import { getProductImageUrl, type Product } from "@/lib/types"
import { ProductMedia } from "@/components/site/ProductMedia"

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
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProductMedia
          src={imageUrl}
          alt={product.name}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          imageClassName="img-zoom"
        />
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
