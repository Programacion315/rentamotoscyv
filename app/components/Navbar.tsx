"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import logo from './public/assets/LOGO.jpg'

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme status on mount
  useEffect(() => {
    const isDark =
      document.documentElement.classList.contains("dark") ||
      localStorage.getItem("theme") === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
      // setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      // setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Catálogo", path: "/catalog" },
    { name: "Acerca de nosotros", path: "/about" },
    { name: "Contacto", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-blue-100 backdrop-blur-md border-b border-border-subtle shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-3 max-w-container-max mx-auto">
          {/* Logo Section */}
          <Link href="/" className="flex items-center">
            {/* <Image src="{logo}" alt="Logo Renta Motos CYV" width={100} height={100} /> */}
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-label-caps text-label-caps transition-all py-1 border-b-2 hover:text-primary ${isActive(link.path)
                  ? "text-primary border-primary font-bold"
                  : "text-on-surface-variant border-transparent"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-primary hover:bg-surface-container-low transition-colors"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-2xl">
                {darkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>

            <Link
              href="/catalog"
              className="hidden md:block bg-action-orange text-white px-6 py-2 rounded-lg font-button-text text-button-text hover:opacity-90 active:scale-95 transition-all text-center"
            >
              Reservar Ahora
            </Link>
            <button onClick={toggleMenu} className="md:hidden text-primary focus:outline-none p-1" aria-label="Toggle menu">
              <span className="material-symbols-outlined text-3xl">
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col p-6 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center mb-8">
          <svg className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80">
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
          <div className="flex items-center gap-2">
            {/* Dark Mode Switch inside mobile drawer */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-primary hover:bg-surface-container-low transition-colors"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-2xl">
                {darkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <button onClick={toggleMenu} className="text-on-surface focus:outline-none p-1">
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 grow">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={toggleMenu}
              className={`font-headline-md text-xl py-2 border-b border-border-subtle hover:text-primary transition-colors ${isActive(link.path)
                ? "text-primary font-bold"
                : "text-on-surface-variant"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            href="/catalog"
            onClick={toggleMenu}
            className="block w-full bg-action-orange text-white py-4 rounded-xl font-button-text text-button-text text-center hover:opacity-90 transition-all shadow-md"
          >
            Reservar Ahora
          </Link>
        </div>
      </div>
    </>
  );
}
