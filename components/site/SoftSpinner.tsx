import { cn } from "@/lib/utils"

const sizes = {
  sm: "size-6 border-2",
  md: "size-9 border-2",
  lg: "size-12 border-[3px]",
} as const

export function SoftSpinner({
  className,
  size = "md",
  label = "Cargando",
}: {
  className?: string
  size?: keyof typeof sizes
  label?: string
}) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "rounded-full border-stone border-t-brand animate-spin",
        sizes[size],
        className
      )}
    />
  )
}
