import Link from "next/link"

export function NotFoundContent() {
  return (
    <div className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden bg-eggshell px-margin-mobile py-16 text-center md:min-h-[78vh] md:px-margin-desktop md:py-24">
      {/* Soft paper atmosphere — brand mist, not clouds */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[8%] mx-auto h-[42%] max-w-3xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,color-mix(in_srgb,var(--color-brand)_10%,transparent)_0%,transparent_68%)]" />
        <div className="absolute inset-x-[10%] bottom-0 h-2/3 rounded-[100%] bg-warm-taupe/80 blur-3xl" />
        <div className="absolute inset-x-[22%] bottom-[8%] h-1/2 rounded-[100%] bg-stone/70 blur-2xl" />
      </div>

      <div className="relative z-[1] flex w-full max-w-xl flex-col items-center">
        {/* Giant 404 that dissolves into the canvas */}
        <p
          aria-hidden
          className="animate-fade-rise select-none font-display text-[120px] leading-none tracking-[-0.04em] text-transparent md:text-[168px] lg:text-[200px]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, color-mix(in srgb, var(--color-ink) 72%, var(--color-brand) 28%) 0%, color-mix(in srgb, var(--color-graphite) 45%, transparent) 48%, transparent 88%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          404
        </p>

        <h1 className="animate-fade-rise animate-delay-1 -mt-4 font-heading text-[24px] leading-snug tracking-[-0.02em] text-ink md:-mt-6 md:text-[32px]">
          Lo sentimos, no encontramos esta página
        </h1>
        <p className="animate-fade-rise animate-delay-2 mt-4 max-w-md font-body-sm text-smoke md:text-base">
          La ruta no existe o ya no está disponible. Puedes volver al inicio y seguir desde ahí.
        </p>

        <div className="animate-fade-rise animate-delay-3 mt-10">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-[0_2px_8px_rgba(82,80,130,0.25)] transition-opacity hover:opacity-90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
