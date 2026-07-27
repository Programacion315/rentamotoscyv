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
  const specs = product.product_specs ?? []

  return (
    <Link
      href={`/rentals/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[20px] bg-eggshell",
        "shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]",
        "transition-[transform,box-shadow] duration-500 ease-out",
        "hover:-translate-y-1.5 hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_36px_rgba(15,17,23,0.16)]",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[5/4] overflow-hidden bg-asphalt">
        <ProductMedia
          src={imageUrl}
          alt={product.name}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Top gradient + badges */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-20 bg-linear-to-b from-black/35 to-transparent" />
        <div className="absolute top-3.5 left-3.5 z-[2] flex flex-wrap gap-1.5">
          {product.category ? (
            <span className="rounded-full bg-black/55 px-2.5 py-1 font-label-caps text-[10px] text-white backdrop-blur-sm">
              {product.category}
            </span>
          ) : null}
          {product.is_featured ? (
            <span className="rounded-full bg-brand px-2.5 py-1 font-label-caps text-[10px] text-white shadow-[0_2px_8px_rgba(51,63,123,0.5)]">
              Destacada
            </span>
          ) : null}
        </div>

        {/* Hover-reveal arrow at top-right of image */}
        <span
          aria-hidden
          className={cn(
            "absolute top-3.5 right-3.5 z-[2] flex size-8 items-center justify-center rounded-full bg-white/90 text-ink",
            "opacity-0 transition-all duration-300 group-hover:opacity-100",
            "shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
          )}
        >
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </span>

        {/* Spec badge — bottom-right of image */}
        {specs.length > 0 ? (
          <span className="absolute right-3.5 bottom-3.5 z-[2] rounded-full bg-black/55 px-3 py-1 font-body-sm font-medium text-white backdrop-blur-sm">
            {specs[0].value}
          </span>
        ) : null}

        {/* Bottom accent bar — brand colored, slides on hover */}
        <div className="absolute inset-x-0 bottom-0 z-[2] h-[3px] origin-left scale-x-0 rounded-full bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </div>

      {/* Content area — editorial typography */}
      <div className="flex flex-1 flex-col gap-2 px-6 pt-5 pb-6">
        {/* Brand with decorative rule lines */}
        {product.brand ? (
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="h-px w-6 rounded-full bg-brand/40" />
            <p className="font-label-caps text-ash">{product.brand}</p>
            <span aria-hidden className="h-px flex-1 rounded-full bg-stone/50" />
          </div>
        ) : null}

        {/* Model name — large display */}
        <h3 className="font-heading-sm text-[24px] leading-[1.05] tracking-[-0.02em] text-ink md:text-[26px]">
          {product.name}
        </h3>

        {/* Description preview */}
        {product.description ? (
          <p className="line-clamp-2 font-body-sm leading-relaxed text-smoke">
            {product.description}
          </p>
        ) : null}

        {/* Action row */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-stone/60">
          {locationName ? (
            <p className="flex items-center gap-1.5 font-body-sm text-smoke">
              <span className="material-symbols-outlined text-[14px] shrink-0 text-ash">location_on</span>
              <span className="truncate">{locationName}</span>
            </p>
          ) : (
            <span />
          )}
          <span
            aria-hidden
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 font-button text-[12px]",
              "bg-warm-taupe text-graphite",
              "transition-all duration-300",
              "group-hover:bg-brand group-hover:text-white"
            )}
          >
            Ver detalles
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
