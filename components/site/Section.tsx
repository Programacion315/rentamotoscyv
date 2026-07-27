import { cn } from "@/lib/utils"

export function Section({
  children,
  className,
  band = false,
  dark = false,
  id,
  noPadding = false,
}: {
  children: React.ReactNode
  className?: string
  band?: boolean
  dark?: boolean
  id?: string
  noPadding?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        dark ? "asphalt-texture text-white" : band ? "bg-warm-taupe" : "bg-eggshell",
        noPadding ? "" : "py-20 md:py-28",
        className
      )}
    >
      <div className={cn(
        "mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop",
        noPadding && "px-0"
      )}>
        {children}
      </div>
    </section>
  )
}

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop py-12 md:py-16",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  dark = false,
  size = "default",
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  dark?: boolean
  size?: "default" | "lg" | "sm"
}) {
  const titleSizes = {
    default: "text-[28px] md:text-[36px]",
    lg: "text-[32px] md:text-[44px]",
    sm: "text-[22px] md:text-[28px]",
  }

  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 flex items-center gap-3 font-label-caps",
            dark ? "text-white/50" : "text-ash"
          )}
        >
          <span
            aria-hidden
            className={cn(
              "h-[2px] w-8 rounded-full",
              dark ? "bg-brand-bright" : "bg-brand"
            )}
          />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-heading leading-[1.08] tracking-[-0.02em]",
          titleSizes[size],
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 font-body leading-relaxed", dark ? "text-white/60" : "text-smoke")}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
