import { geoNaturalEarth1, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import countries from "world-atlas/countries-110m.json"
import iso from "i18n-iso-countries"
import type { CountryStat } from "@/lib/analytics/db"

// world-atlas ships raw TopoJSON with no published type declarations —
// these are just enough shape for what we read out of it below.
type MinimalTopology = {
  type: "Topology"
  objects: { countries: unknown }
}

const WIDTH = 800
const HEIGHT = 420

const PALETTES = {
  // admin dashboard — light (eggshell) background
  light: { empty: "var(--color-stone)", stroke: "var(--color-eggshell)" },
  // public site footer — dark (asphalt) background
  dark: { empty: "rgba(255,255,255,0.08)", stroke: "rgba(0,0,0,0.35)" },
} as const

/**
 * Static choropleth world map, computed server-side on every render
 * (cheap: ~177 country paths, no client JS/bundle cost). Countries with at
 * least one recorded visit get a brand-blue fill; everything else is a flat
 * neutral tone appropriate for the given background.
 */
export function VisitWorldMap({
  byCountry,
  variant = "light",
}: {
  byCountry: CountryStat[]
  variant?: "light" | "dark"
}) {
  const palette = PALETTES[variant]
  const countByAlpha2 = new Map<string, number>()
  for (const row of byCountry) {
    if (row.countryCode) countByAlpha2.set(row.countryCode.toUpperCase(), row.count)
  }
  const maxCount = Math.max(1, ...countByAlpha2.values())

  const topology = countries as unknown as MinimalTopology
  const geo = feature(
    topology as never,
    topology.objects.countries as never
  ) as unknown as { features: Array<{ id?: string; geometry: unknown }> }

  const projection = geoNaturalEarth1().fitSize([WIDTH, HEIGHT], {
    type: "Sphere",
  } as never)
  const pathGenerator = geoPath(projection)

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-auto w-full"
      role="img"
      aria-label="Mapa de países desde donde visitan el sitio"
    >
      {geo.features.map((f, i) => {
        const numericId = f.id ? String(f.id).padStart(3, "0") : null
        const alpha2 = numericId ? iso.numericToAlpha2(numericId) : undefined
        const count = alpha2 ? countByAlpha2.get(alpha2.toUpperCase()) : undefined
        const d = pathGenerator(f as never) ?? undefined
        const intensity = count ? 0.35 + 0.65 * (count / maxCount) : 0

        return (
          <path
            key={alpha2 ?? i}
            d={d}
            fill={
              count
                ? `color-mix(in srgb, var(--color-brand-bright) ${Math.round(intensity * 100)}%, ${palette.empty})`
                : palette.empty
            }
            stroke={palette.stroke}
            strokeWidth={0.5}
          >
            {count ? <title>{`${alpha2}: ${count} visita${count === 1 ? "" : "s"}`}</title> : null}
          </path>
        )
      })}
    </svg>
  )
}
