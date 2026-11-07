import { NextResponse } from "next/server"
import { recordVisit } from "@/lib/analytics/db"

/**
 * Records one page view, best-effort geolocating the visitor's IP via
 * ip-api.com's free endpoint (no API key, no cost at this site's volume).
 * Never fails the request if the geo lookup fails — location is a bonus,
 * the visit count itself always gets recorded.
 */
export async function POST(request: Request) {
  let path = "/"
  try {
    const body = await request.json()
    if (typeof body?.path === "string") path = body.path
  } catch {
    // no/invalid body — keep default path
  }

  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null

  let country: string | null = null
  let countryCode: string | null = null
  let city: string | null = null

  const isPrivateIp = !ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")

  if (!isPrivateIp) {
    try {
      const geoRes = await fetch(
        `http://ip-api.com/json/${ip}?fields=status,country,countryCode,city`,
        { signal: AbortSignal.timeout(2000) }
      )
      const geo = await geoRes.json()
      if (geo.status === "success") {
        country = geo.country ?? null
        countryCode = geo.countryCode ?? null
        city = geo.city ?? null
      }
    } catch {
      // geo lookup is best-effort; record the visit without location
    }
  }

  recordVisit({ path, ip, country, countryCode, city })
  return NextResponse.json({ ok: true })
}
