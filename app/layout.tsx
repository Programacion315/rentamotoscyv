import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "rentamotoscyv - Renta de Motocicletas Premium en Medellín",
  description: "Alquiler de motocicletas de alta gama en Medellín e Itagüí. Mantenimiento certificado, entregas a domicilio y en el aeropuerto. ¡Reserva hoy!",
  keywords: "renta de motos medellin, alquiler de motos medellin, rentamotoscyv, nmax connected, dr650, el poblado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        {/* Google Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col text-on-surface transition-colors duration-300">
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

