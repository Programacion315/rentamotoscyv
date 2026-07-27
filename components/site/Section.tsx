import { cn } from "@/lib/utils"

export function Section({
  children,
  className,
  band = false,
  dark = false,
  id,
}: {
  children: React.ReactNode
  className?: string
  band?: boolean
  /** Dark "garage" band — asphalt texture with light-on-dark type */
  dark?: boolean
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        dark ? "asphalt-texture text-white" : band ? "bg-warm-taupe" : "bg-eggshell",
        "py-16 md:py-24",
        className
      )}
    >
      <div className="mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
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
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  /** Light-on-dark variant for asphalt sections */
  dark?: boolean
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 flex items-center gap-2.5 font-label-caps",
            dark ? "text-white/60" : "text-ash",
            className?.includes("text-center") && "justify-center"
          )}
        >
          <span
            aria-hidden
            className={cn("h-[2px] w-7 rounded-full", dark ? "bg-brand-bright" : "bg-brand")}
          />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-heading text-[28px] md:text-[36px]",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 font-body", dark ? "text-white/65" : "text-smoke")}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
