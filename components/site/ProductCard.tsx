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
        "group relative flex flex-col overflow-hidden rounded-[20px] bg-eggshell shadow-whisper",
        "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,17,23,0.14)]",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-taupe">
        <ProductMedia
          src={imageUrl}
          alt={product.name}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          imageClassName="img-zoom"
        />
        {/* photo legibility fade for the chips */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black/25 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.category ? (
            <span className="rounded-full bg-black/55 px-2.5 py-1 font-label-caps text-[10px] text-white backdrop-blur-sm">
              {product.category}
            </span>
          ) : null}
          {product.is_featured ? (
            <span className="rounded-full bg-brand px-2.5 py-1 font-label-caps text-[10px] text-white">
              Destacada
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-5 md:p-6">
        {product.brand ? (
          <p className="flex items-center gap-2 font-label-caps text-ash">
            <span aria-hidden className="h-[2px] w-4 rounded-full bg-brand/70" />
            {product.brand}
          </p>
        ) : null}
        <h3 className="font-heading-sm text-[22px] leading-tight text-ink md:text-[24px]">
          {product.name}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          {locationName ? (
            <p className="flex items-center gap-1.5 font-body-sm text-smoke">
              <span className="material-symbols-outlined text-[16px] text-ash">location_on</span>
              {locationName}
            </p>
          ) : (
            <span />
          )}
          <span
            aria-hidden
            className={cn(
              "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-stone text-ink",
              "transition-[background-color,border-color,color,transform] duration-300",
              "group-hover:border-brand group-hover:bg-brand group-hover:text-white group-hover:translate-x-0.5"
            )}
          >
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
