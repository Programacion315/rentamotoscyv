import type { Metadata } from "next"
import { Outfit, Inter, Geist_Mono } from "next/font/google"
import AuthHashHandler from "@/app/(site)/components/AuthHashHandler"
import "./globals.css"
import { cn } from "@/lib/utils"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-outfit",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Renta Motos CyV — Renta de Motocicletas",
  description:
    "Alquiler de motocicletas en Bogotá y Neiva. Mantenimiento certificado y atención personalizada.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={cn("h-full antialiased", outfit.variable, inter.variable, geistMono.variable)}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-eggshell text-ink font-sans">
        <AuthHashHandler />
        {children}
      </body>
    </html>
  )
}
