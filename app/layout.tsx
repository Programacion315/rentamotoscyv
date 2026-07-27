import type { Metadata } from "next"
import localFont from "next/font/local"
import AuthHashHandler from "@/app/(site)/components/AuthHashHandler"
import "./globals.css"
import { cn } from "@/lib/utils"

// Single global typeface — Suisse Intl Regular (weights are synthesized by the browser)
const suisse = localFont({
  src: "../public/fonts/SuisseIntl-Regular.ttf",
  weight: "400",
  variable: "--font-suisse",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rentamotos CyV — Renta de Motocicletas",
  description:
    "Alquiler de motocicletas en Bogotá y Neiva. Mantenimiento certificado y atención personalizada.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={cn("h-full antialiased", suisse.variable)}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) inject body attributes before React hydrates */}
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-eggshell text-ink font-sans"
      >
        <AuthHashHandler />
        {children}
      </body>
    </html>
  )
}
