import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest pt-16 pb-8 mt-auto border-t border-border-subtle">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-stack-lg pb-12 border-b border-outline-variant/20 mb-8">

        {/* Left Column: Logo & Branding */}
        <div className="space-y-4">
          <svg className="h-10 w-auto -ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80">
            <rect width="300" height="80" fill="transparent" />
            <path d="M40 20 L60 20 L55 50 L35 50 Z" fill="var(--color-primary, #00357f)" />
            <circle cx="42" cy="55" r="8" fill="#E94C1F" />
            <circle cx="58" cy="55" r="8" fill="var(--color-on-surface, #191c1e)" />
            <text
              x="80"
              y="48"
              fontFamily="Hanken Grotesk, sans-serif"
              fontWeight="bold"
              fontSize="28"
              fill="var(--color-primary, #00357f)"
            >
              rentamotos
            </text>
            <text
              x="235"
              y="48"
              fontFamily="Hanken Grotesk, sans-serif"
              fontWeight="bold"
              fontSize="28"
              fill="var(--color-on-surface, #191c1e)"
            >
              cyv
            </text>
          </svg>
          <p className="font-body-md text-on-secondary-container max-w-xs leading-relaxed">
            Tu aliado confiable para recorrer en Bogotá, y todos los alrededores con total libertad y seguridad.
          </p>
        </div>

        {/* Center Column: Quick Links */}
        <div className="space-y-4 md:pl-12">
          <h4 className="font-label-caps text-label-caps text-primary font-bold tracking-wider">Enlaces Rápidos</h4>
          <div className="flex flex-col gap-3">
            <Link href="/" className="font-body-md text-on-secondary-container hover:text-action-orange transition-colors">
              Inicio
            </Link>
            <Link href="/catalog" className="font-body-md text-on-secondary-container hover:text-action-orange transition-colors">
              Catálogo
            </Link>
            <Link href="/about" className="font-body-md text-on-secondary-container hover:text-action-orange transition-colors">
              Acerca de nosotros
            </Link>
            <Link href="/contact" className="font-body-md text-on-secondary-container hover:text-action-orange transition-colors">
              Contacto
            </Link>
          </div>
        </div>

        {/* Right Column: Contact & Socials */}
        <div className="space-y-4">
          <h4 className="font-label-caps text-label-caps text-primary font-bold tracking-wider">Contacto</h4>
          <div className="flex flex-wrap gap-3 mb-4">
            <a
              href="https://wa.me/3218449988"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-action-orange hover:text-white transition-all shadow-sm"
              title="Chat on WhatsApp"
            >
              <span className="material-symbols-outlined">chat</span>
            </a>
            <a
              href="tel:+573218449988"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-action-orange hover:text-white transition-all shadow-sm"
              title="Call us"
            >
              <span className="material-symbols-outlined">call</span>
            </a>
            <a
              href="mailto:info@rentamotoscyv.com"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-action-orange hover:text-white transition-all shadow-sm"
              title="Email us"
            >
              <span className="material-symbols-outlined">mail</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-action-orange hover:text-white transition-all shadow-sm"
              title="Follow Instagram"
            >
              <span className="material-symbols-outlined">photo_camera</span>
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-[10px] text-secondary">WHATSAPP DE ATENCIÓN</span>
            <span className="font-body-md text-body-md font-bold text-on-surface">321 844 9988</span>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="font-label-caps text-[10px] text-secondary">OFICINAS</span>
            <span className="font-body-md text-[14px] text-on-surface-variant">Avenida Carrera 30 #3-08 los martires, Bogotá, Colombia</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-on-secondary-container/80 pt-4">
        <p className="font-body-md text-sm">
          © {new Date().getFullYear()} rentamotoscyv. Todos los derechos reservados.
        </p>
        <div className="flex gap-6 text-sm">
          <Link href="#" className="font-label-caps hover:underline">
            Términos y Condiciones
          </Link>
          <Link href="#" className="font-label-caps hover:underline">
            Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
