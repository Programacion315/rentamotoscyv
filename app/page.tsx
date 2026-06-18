import React from "react";
import Link from "next/link";
import { motorcycles } from "./data/motorcycles";

export default function Home() {
  // Select a few motorcycles for the homepage feature (e.g. NMAX, DR650, FZ25)
  const featuredMotos = motorcycles.slice(0, 3);

  return (
    <div className="bg-background">
      {/* 1. Hero Section */}
      <header className="relative min-h-[700px] md:min-h-[819px] flex items-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-40 md:opacity-100"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxQTtZn5Od_SVLKAxLg6wR8bHaqC6F3Sjo4FG_AzCnsrZTZxQSMtTQhn6zkl7PGO9RkC89NiqRPClHxwbmot6xbZa5_y5rGAUGdpLmr6UWT-_Um4uJMuKhD6cELsPj700PwL7gxwvdhGA4qcAwolPOV6Xr8x_du56qpw80rjnRA1juD7EU5gfcOjnlYe5zMjp68YZgeeZeIP8fNuCZ92uG_pVoHsInMXrqTXTeZU3FUzWADv9n4CMqpyY100_D_sdYFaqOBbC9jbcS')`,
            }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-12">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-primary font-label-caps text-label-caps mb-4">
              LIBERTAD SOBRE DOS RUEDAS
            </span>
            <h1 className="font-display-lg text-4xl md:text-display-lg text-primary mb-6 leading-tight">
              Domina la Ciudad y la Carretera con Estilo
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
              Renta motocicletas de alta gama mantenidas a la perfección. Profesionalismo, velocidad y el mejor servicio de entrega en Medellín.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalog"
                className="bg-action-orange text-white px-8 py-4 rounded-lg font-button-text text-button-text shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                Ver Catálogo
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                href="/contact"
                className="bg-surface-white border border-border-subtle text-primary px-8 py-4 rounded-lg font-button-text text-button-text hover:bg-surface-container-low transition-all flex items-center justify-center gap-2"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Requisitos para la renta */}
      <section className="bg-surface-container-low py-12 border-y border-border-subtle">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-action-orange text-4xl">verified_user</span>
              <h2 className="font-headline-md text-headline-md text-primary">Requisitos para la renta</h2>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-sm border border-border-subtle">
                <span className="material-symbols-outlined text-secondary">person_check</span>
                <span className="font-body-md text-body-md text-on-surface">Ser mayor de 18 años</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-sm border border-border-subtle">
                <span className="material-symbols-outlined text-secondary">badge</span>
                <span className="font-body-md text-body-md text-on-surface">Licencia de conducción vigente</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-sm border border-border-subtle">
                <span className="material-symbols-outlined text-secondary">credit_card</span>
                <span className="font-body-md text-body-md text-on-surface">Documento de identidad o Pasaporte</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Entrega a domicilio y Aeropuerto (Bento Pattern) */}
      <section className="py-24 bg-background">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Large Content Card */}
            <div className="md:col-span-7 bg-primary rounded-3xl p-10 text-white relative overflow-hidden flex flex-col justify-end min-h-[400px]">
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <span className="material-symbols-outlined text-[120px] select-none">local_shipping</span>
              </div>
              <div className="relative z-10">
                <h3 className="font-headline-lg text-headline-lg mb-4 text-white">Entrega a domicilio y Aeropuerto</h3>
                <p className="font-body-lg text-body-lg text-on-primary-container max-w-md">
                  Llevamos tu aventura directamente hasta ti. Entregamos en la puerta de tu hotel, residencia o incluso directamente en la entrada del aeropuerto José María Córdova.
                </p>
              </div>
            </div>
            {/* Map / Location Card */}
            <div className="md:col-span-5 bg-surface-container-high rounded-3xl overflow-hidden relative min-h-[400px] border border-border-subtle">
              <div className="absolute inset-0">
                <img
                  className="w-full h-full object-cover grayscale opacity-50"
                  alt="Ubicación de entrega en Medellín"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6dfYEYjJqeXNJ8tLepTWjWlKfvOWwVMbZ9t1u8F134vfX6uiuMY3XU8gF-e_dZUmOp1HLBa-U5TlZ_opVvp8K83QcfOq2vQ5izDC1QS_yan_gkCWD9pDDMVVLRFdFaU9cO0PWeQ7XXLd0mPSuvsNbJNhpA5wRGNjpBNUcL3VykcQBbFsMPeZ41UXT3EZHuc2Ul1DU5ApamqtJpAOXb12tfaSdzNgHca2vDVpzZNEtp3bt0AR2WF1K2xR6nz9GZkvdj2eUwuXufsXZ"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 glass-effect p-6 rounded-2xl">
                <div className="flex items-center gap-4 mb-2">
                  <span className="material-symbols-outlined text-primary">flight_land</span>
                  <span className="font-label-caps text-label-caps text-primary">SERVICIO AEROPUERTO</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface">
                  Esperamos por ti a tu llegada para que inicies tu viaje sin demoras ni contratiempos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Motorcycles */}
      <section className="py-24 bg-surface-container-low border-t border-border-subtle">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Catálogo Destacado</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Modelos recientes y perfectamente mantenidos.</p>
            </div>
            <Link
              href="/catalog"
              className="text-primary font-button-text hover:underline flex items-center gap-1 group"
            >
              Ver todo el catálogo
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMotos.map((moto) => (
              <div
                key={moto.id}
                className="bg-white rounded-2xl overflow-hidden border border-border-subtle shadow-sm hover:shadow-lg transition-all group flex flex-col h-full"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={moto.name}
                    src={moto.image}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-[10px] px-3 py-1 rounded-full font-label-caps uppercase">
                      {moto.type}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col grow">
                  <span className="font-label-caps text-label-caps text-secondary mb-2 block">
                    {moto.category}
                  </span>
                  <h3 className="font-headline-md text-headline-md text-primary mb-4">
                    {moto.name}
                  </h3>

                  {/* Specs summary */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-border-subtle mb-6 text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">ev_station</span>
                      <span className="font-label-caps text-[11px]">{moto.specs.displacement}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">speed</span>
                      <span className="font-label-caps text-[11px]">{moto.specs.power}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Desde</span>
                      <span className="font-headline-md text-primary">
                        ${moto.pricePerDay.toLocaleString()} <small className="text-[14px]">/ día</small>
                      </span>
                    </div>
                    <Link
                      href={`/rentals/${moto.id}`}
                      className="bg-action-orange text-white px-5 py-2.5 rounded-lg font-button-text text-button-text hover:opacity-90 transition-all text-center"
                    >
                      Reservar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ / PQR Section */}
      <section className="py-24 bg-background border-t border-border-subtle">
        <div className="px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Soporte y Atención</span>
            <h2 className="font-headline-lg text-headline-lg text-primary mt-2">Preguntas y Reclamaciones (PQR)</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4">
              ¿Tienes alguna duda o inconveniente? Nuestro equipo está listo para ayudarte.
            </p>
          </div>
          <div className="space-y-4">
            <details className="group bg-white border border-border-subtle rounded-xl p-6">
              <summary className="flex justify-between items-center cursor-pointer list-none font-headline-md text-primary outline-none select-none">
                <span>¿Cómo puedo realizar una reclamación?</span>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="mt-4 font-body-md text-on-surface-variant leading-relaxed">
                Puedes enviarnos tu solicitud directamente a través de nuestro WhatsApp oficial o correo electrónico indicando tu número de contrato y el motivo de tu consulta. Respondemos en menos de 24 horas hábiles.
              </div>
            </details>
            <details className="group bg-white border border-border-subtle rounded-xl p-6" open>
              <summary className="flex justify-between items-center cursor-pointer list-none font-headline-md text-primary outline-none select-none">
                <span>¿Qué incluye el precio de la renta?</span>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="mt-4 font-body-md text-on-surface-variant leading-relaxed">
                El precio incluye el alquiler de la motocicleta por 24 horas, SOAT vigente, revisión técnico-mecánica al día, y dos cascos reglamentarios. El seguro por daños a terceros o cobertura extendida es adicional y opcional.
              </div>
            </details>
            <details className="group bg-white border border-border-subtle rounded-xl p-6">
              <summary className="flex justify-between items-center cursor-pointer list-none font-headline-md text-primary outline-none select-none">
                <span>¿Hay recargos por entrega en el aeropuerto?</span>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="mt-4 font-body-md text-on-surface-variant leading-relaxed">
                Sí, existe un cargo por gestión logística dependiendo del horario de llegada y entrega en el aeropuerto José María Córdova. Por favor consulta con nuestro asesor al momento de realizar la reserva para cotizar la tarifa exacta.
              </div>
            </details>
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary font-button-text text-button-text hover:underline"
            >
              Contactar directamente con soporte
              <span className="material-symbols-outlined">support_agent</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <div className="fixed bottom-8 right-8 z-50">
        <a
          className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
          href="https://wa.me/3218449988"
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp de rentamotoscyv"
        >
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.548-.68.116-.173.231-.144.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
