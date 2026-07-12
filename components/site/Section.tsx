import { cn } from "@/lib/utils"

export function Section({
  children,
  className,
  band = false,
  id,
}: {
  children: React.ReactNode
  className?: string
  band?: boolean
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn(band ? "bg-warm-taupe" : "bg-eggshell", "py-16 md:py-24", className)}
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
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="font-label-caps text-ash mb-3">{eyebrow}</p>
      ) : null}
      <h2 className="font-heading text-ink text-[28px] md:text-[36px]">{title}</h2>
      {description ? (
        <p className="mt-4 font-body text-smoke">{description}</p>
      ) : null}
    </div>
  )
}
