"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motorcycles, Motorcycle } from "../data/motorcycles";

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState("Todas");

  const brands = ["Todas", "Yamaha", "Honda", "Suzuki", "Bajaj", "AKT", "TVS"];

  const filteredMotorcycles = useMemo(() => {
    return motorcycles.filter((moto) => {
      // Filter by brand
      const matchesBrand = activeBrand === "Todas" || moto.brand.toLowerCase() === activeBrand.toLowerCase();

      // Filter by search query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        moto.name.toLowerCase().includes(query) ||
        moto.brand.toLowerCase().includes(query) ||
        moto.category.toLowerCase().includes(query) ||
        moto.type.toLowerCase().includes(query) ||
        (moto.specs.displacement && moto.specs.displacement.toLowerCase().includes(query));

      return matchesBrand && matchesSearch;
    });
  }, [searchQuery, activeBrand]);

  return (
    <div className="bg-background text-on-surface">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg min-h-screen">

        {/* Search & Filter Header Section */}
        <section className="mb-stack-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
            <div className="flex-1 max-w-2xl">
              <h1 className="font-display-lg text-4xl text-primary mb-2">Catálogo de Motocicletas</h1>
              <p className="text-on-surface-variant font-body-lg">
                Encuentra la compañera perfecta para tu próxima aventura en la ciudad o carretera.
              </p>
            </div>

            {/* Search Input Box */}
            <div className="flex flex-col gap-2">
              <label htmlFor="search-input" className="font-label-caps text-label-caps text-on-surface-variant">
                Buscar moto
              </label>
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-80 px-4 py-3 bg-surface-white border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Escribe marca, modelo o cilindraje..."
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
              </div>
            </div>
          </div>

          {/* Brand Filter Chips */}
          <div className="mt-8">
            <label className="font-label-caps text-label-caps text-on-surface-variant mb-3 block">
              Filtrar por marca
            </label>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-5 py-2 rounded-full border text-label-caps font-button-text transition-all text-blue-700 bg-primary-catalog ${activeBrand === brand
                    ? "border-primary bg-primary-fixed text-sky font-bold shadow-sm"
                    : "border-border-subtle bg-surface-white text-on-surface-variant hover:border-primary hover:text-sky"
                    }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid Catalog List */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredMotorcycles.map((moto) => (
            <div
              key={moto.id}
              className="bg-surface-blue-hard rounded-xl border border-border-subtle vehicle-card-shadow overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* Card Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={moto.name}
                  src={moto.image}
                />
                <div className="absolute top-4 left-4 bg-primary-catalog font-label-caps text-label-caps px-3 py-1 rounded-full uppercase tracking-wider">
                  {moto.type}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-label-caps text-label-caps text-on-secondary-container uppercase">
                    {moto.brand}
                  </span>
                </div>

                <h3 className="font-headline-md text-headline-md mb-4 text-primary">
                  {moto.name}
                </h3>

                {/* Tech Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-border-subtle text-on-surface-variant grow">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">ev_station</span>
                    <span className="text-label-caps font-body-md text-[13px]">{moto.specs.displacement}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">speed</span>
                    <span className="text-label-caps font-body-md text-[13px]">{moto.specs.power}</span>
                  </div>
                  {moto.specs.weight && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-xl">weight</span>
                      <span className="text-label-caps font-body-md text-[13px]">{moto.specs.weight}</span>
                    </div>
                  )}
                  {moto.specs.fuel && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-xl">local_gas_station</span>
                      <span className="text-label-caps font-body-md text-[13px]">{moto.specs.fuel}</span>
                    </div>
                  )}
                </div>

                {/* Card Footer pricing */}
                <div className="flex items-center justify-between pt-4 mt-auto">
                  <div>
                    <span className="block text-on-surface-variant text-label-caps">Desde</span>
                    <span className="text-headline-md font-bold text-on-surface">
                      ${moto.pricePerDay.toLocaleString()}
                      <span className="text-body-md font-normal text-on-surface-variant">/día</span>
                    </span>
                  </div>
                  <Link
                    href={`/rentals/${moto.id}`}
                    className="bg-action-orange text-white px-5 py-2.5 rounded-lg font-button-text text-button-text hover:shadow-lg hover:opacity-95 transition-all active:scale-95 text-center"
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Add-on Request / Empty Slot Slot */}
          <div className="bg-surface-container-low border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-12 text-center h-full min-h-[350px]">
            <span className="material-symbols-outlined text-outline text-6xl mb-4">
              add_circle
            </span>
            <h4 className="font-headline-md text-headline-md text-on-surface-variant mb-2">
              ¿Buscas otro modelo?
            </h4>
            <p className="text-on-surface-variant mb-6 text-sm max-w-xs">
              Próximamente añadiremos más modelos y marcas a nuestra flota de alquiler en Bogotá.
            </p>
            <Link href="/contact" className="text-primary font-button-text hover:underline">
              Sugerir un modelo
            </Link>
          </div>
        </section>

        {/* Catalog Trust Badges */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-stack-lg border-t border-border-subtle pt-16 mb-8">
          <div className="text-center md:text-left">
            <div className="w-16 h-16 bg-primary-fixed rounded-2xl flex items-center justify-center mb-4 mx-auto md:mx-0">
              <span className="material-symbols-outlined text-primary text-4xl">verified_user</span>
            </div>
            <h4 className="font-headline-md text-headline-md text-primary mb-2">Mantenimiento PRO</h4>
            <p className="text-on-surface-variant font-body-md text-sm">
              Cada vehículo es inspeccionado minuciosamente cada 1,000 kilómetros por técnicos mecánicos especializados.
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="w-16 h-16 bg-secondary-fixed rounded-2xl flex items-center justify-center mb-4 mx-auto md:mx-0">
              <span className="material-symbols-outlined text-secondary text-4xl">schedule</span>
            </div>
            <h4 className="font-headline-md text-headline-md text-primary mb-2">Alquiler Flexible</h4>
            <p className="text-on-surface-variant font-body-md text-sm">
              Planes por días, semanas o meses con tarifas preferenciales decrecientes para reservas de larga duración.
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="w-16 h-16 bg-tertiary-fixed rounded-2xl flex items-center justify-center mb-4 mx-auto md:mx-0">
              <span className="material-symbols-outlined text-tertiary text-4xl">support_agent</span>
            </div>
            <h4 className="font-headline-md text-headline-md text-primary mb-2">Asistencia 24/7</h4>
            <p className="text-on-surface-variant font-body-md text-sm">
              Atención personalizada y grúa en carretera en cualquier lugar de Antioquia, a cualquier hora.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
