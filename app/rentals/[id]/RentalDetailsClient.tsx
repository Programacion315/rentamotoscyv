"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motorcycles } from "../../data/motorcycles";

interface RentalDetailsClientProps {
  id: string;
}

export default function RentalDetailsClient({ id }: RentalDetailsClientProps) {
  const moto = useMemo(() => {
    return motorcycles.find((m) => m.id === id) || motorcycles[0];
  }, [id]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const [insuranceOption, setInsuranceOption] = useState("basic");

  const bookingSummary = useMemo(() => {
    if (!startDate || !endDate) return { days: 0, subtotal: 0, deliveryFee: 0, insuranceFee: 0, total: 0 };

    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();

    let days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (days <= 0) days = 1;

    const subtotal = moto.pricePerDay * days;
    let deliveryFee = 0;
    if (deliveryOption === "hotel") deliveryFee = 25000;
    else if (deliveryOption === "airport") deliveryFee = 60000;

    let insuranceFee = 0;
    if (insuranceOption === "premium") insuranceFee = 35000 * days;

    const total = subtotal + deliveryFee + insuranceFee;

    return { days, subtotal, deliveryFee, insuranceFee, total };
  }, [startDate, endDate, deliveryOption, insuranceOption, moto]);

  const whatsappLink = useMemo(() => {
    const { days, total } = bookingSummary;
    if (days === 0) return "#";

    const deliveryText =
      deliveryOption === "pickup"
        ? "Recogida en tienda (Sin costo)"
        : deliveryOption === "hotel"
          ? "Entrega a Domicilio/Hotel ($25,000 COP)"
          : "Entrega en Aeropuerto José María Córdova ($60,000 COP)";

    const insuranceText = insuranceOption === "basic" ? "Seguro Básico (Incluido)" : "Seguro Premium ($35,000 COP/día)";

    const message = `Hola rentamotoscyv! Quisiera reservar la siguiente motocicleta:
- Modelo: ${moto.brand} ${moto.name}
- Fecha de inicio: ${startDate}
- Fecha de entrega: ${endDate}
- Duración: ${days} día(s)
- Opción de Entrega: ${deliveryText}
- Cobertura de Seguro: ${insuranceText}
- Valor Total Estimado: $${total.toLocaleString()} COP

¿Me confirman disponibilidad por favor?`;

    return `https://wa.me/573218449988?text=${encodeURIComponent(message)}`;
  }, [bookingSummary, startDate, endDate, deliveryOption, insuranceOption, moto]);

  return (
    <div className="bg-background text-on-surface">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg min-h-screen">
        <div className="mb-8">
          <Link
            href="/catalog"
            className="text-primary font-button-text items-center gap-2 hover:underline inline-flex"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Volver al catálogo
          </Link>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-border-subtle shadow-md">
              <img src={moto.image} alt={moto.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-primary text-white font-label-caps text-label-caps px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                {moto.type}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider">
                  {moto.category}
                </span>
                <div className="flex items-center gap-1 text-action-orange">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span className="font-bold text-sm">{moto.rating}</span>
                </div>
              </div>
              <h1 className="font-display-lg text-4xl text-primary mb-4">
                {moto.brand} {moto.name}
              </h1>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                {moto.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-border-subtle p-8 shadow-sm">
              <h3 className="font-headline-md text-headline-md text-primary mb-6">Especificaciones Técnicas</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-4 bg-surface rounded-xl border border-border-subtle">
                  <div className="font-label-caps text-secondary text-[11px] mb-1">CILINDRAJE</div>
                  <div className="text-xl font-bold text-primary font-label-caps tracking-tight">
                    {moto.specs.displacement}
                  </div>
                </div>
                <div className="p-4 bg-surface rounded-xl border border-border-subtle">
                  <div className="font-label-caps text-secondary text-[11px] mb-1">POTENCIA MÁXIMA</div>
                  <div className="text-xl font-bold text-primary font-label-caps tracking-tight">
                    {moto.specs.power}
                  </div>
                </div>
                {moto.specs.torque && (
                  <div className="p-4 bg-surface rounded-xl border border-border-subtle">
                    <div className="font-label-caps text-secondary text-[11px] mb-1">TORQUE MÁXIMO</div>
                    <div className="text-xl font-bold text-primary font-label-caps tracking-tight">
                      {moto.specs.torque}
                    </div>
                  </div>
                )}
                {moto.specs.weight && (
                  <div className="p-4 bg-surface rounded-xl border border-border-subtle">
                    <div className="font-label-caps text-secondary text-[11px] mb-1">PESO EN SECO</div>
                    <div className="text-xl font-bold text-primary font-label-caps tracking-tight">
                      {moto.specs.weight}
                    </div>
                  </div>
                )}
                {moto.specs.fuel && (
                  <div className="p-4 bg-surface rounded-xl border border-border-subtle">
                    <div className="font-label-caps text-secondary text-[11px] mb-1">COMBUSTIBLE</div>
                    <div className="text-xl font-bold text-primary font-label-caps tracking-tight">
                      {moto.specs.fuel}
                    </div>
                  </div>
                )}
                <div className="p-4 bg-surface rounded-xl border border-border-subtle">
                  <div className="font-label-caps text-secondary text-[11px] mb-1">MANTENIMIENTO</div>
                  <div className="text-xl font-bold text-primary font-label-caps tracking-tight">
                    Pro Certificado
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border-subtle">
                <h4 className="font-label-caps text-secondary text-xs mb-3 font-bold tracking-wider">CARACTERÍSTICAS DESTACADAS</h4>
                <div className="flex flex-wrap gap-2">
                  {moto.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-secondary-container text-primary font-label-caps text-[11px] px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-border-subtle rounded-3xl p-8 shadow-md sticky top-24 space-y-6">
            <div>
              <span className="font-label-caps text-[11px] text-secondary uppercase block mb-1">PRECIO DIARIO</span>
              <div className="text-3xl font-bold text-primary">
                ${moto.pricePerDay.toLocaleString()}
                <span className="text-lg font-normal text-on-surface-variant">/día</span>
              </div>
            </div>

            <hr className="border-border-subtle" />

            <div className="space-y-4">
              <div>
                <label htmlFor="start-date" className="font-label-caps text-secondary text-[11px] mb-2 block">
                  FECHA DE INICIO
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low border border-border-subtle rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="end-date" className="font-label-caps text-secondary text-[11px] mb-2 block">
                  FECHA DE ENTREGA
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  min={startDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low border border-border-subtle rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="font-label-caps text-secondary text-[11px] mb-2 block">
                MÉTODO DE ENTREGA Y DEVOLUCIÓN
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-surface border border-border-subtle rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryOption === "pickup"}
                    onChange={() => setDeliveryOption("pickup")}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-body-md text-sm font-semibold text-primary">Recogida en Oficina</div>
                    <div className="text-xs text-on-surface-variant">Sin costo</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-surface border border-border-subtle rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors">
                  <input
                    type="radio"
                    name="delivery"
                    value="hotel"
                    checked={deliveryOption === "hotel"}
                    onChange={() => setDeliveryOption("hotel")}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-body-md text-sm font-semibold text-primary">Domicilio en Bogotá</div>
                    <div className="text-xs text-on-surface-variant">Llevamos a tu Hotel o Casa (+$25,000)</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-surface border border-border-subtle rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors">
                  <input
                    type="radio"
                    name="delivery"
                    value="airport"
                    checked={deliveryOption === "airport"}
                    onChange={() => setDeliveryOption("airport")}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-body-md text-sm font-semibold text-primary">Aeropuerto</div>
                    <div className="text-xs text-on-surface-variant">Entrega en Terminal (+$60,000)</div>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="font-label-caps text-secondary text-[11px] mb-2 block">
                COBERTURA DE SEGUROS
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-surface border border-border-subtle rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors">
                  <input
                    type="radio"
                    name="insurance"
                    value="basic"
                    checked={insuranceOption === "basic"}
                    onChange={() => setInsuranceOption("basic")}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-body-md text-sm font-semibold text-primary">Seguro Básico</div>
                    <div className="text-xs text-on-surface-variant">SOAT + Responsabilidad Civil (Incluido)</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-surface border border-border-subtle rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors">
                  <input
                    type="radio"
                    name="insurance"
                    value="premium"
                    checked={insuranceOption === "premium"}
                    onChange={() => setInsuranceOption("premium")}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-body-md text-sm font-semibold text-primary">Cobertura Premium</div>
                    <div className="text-xs text-on-surface-variant">Daños parciales/totales y robo (+$35,000 / día)</div>
                  </div>
                </label>
              </div>
            </div>

            {bookingSummary.days > 0 ? (
              <div className="p-4 bg-surface-container rounded-2xl space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Alquiler por {bookingSummary.days} día(s):</span>
                  <span className="font-semibold">${bookingSummary.subtotal.toLocaleString()} COP</span>
                </div>
                {bookingSummary.deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Recargo por Entrega:</span>
                    <span className="font-semibold">${bookingSummary.deliveryFee.toLocaleString()} COP</span>
                  </div>
                )}
                {bookingSummary.insuranceFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Cobertura Premium:</span>
                    <span className="font-semibold">${bookingSummary.insuranceFee.toLocaleString()} COP</span>
                  </div>
                )}
                <hr className="border-border-subtle my-2" />
                <div className="flex justify-between text-base font-bold text-primary">
                  <span>Valor Total:</span>
                  <span>${bookingSummary.total.toLocaleString()} COP</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-surface-container-low border border-dashed border-outline-variant rounded-2xl text-center text-sm text-on-surface-variant">
                Selecciona fechas de inicio y entrega para calcular el costo de tu reserva.
              </div>
            )}

            <a
              href={whatsappLink}
              target={bookingSummary.days > 0 ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`w-full py-4 rounded-xl font-button-text text-button-text text-center flex items-center justify-center gap-2 shadow-lg transition-all ${bookingSummary.days > 0
                ? "bg-action-orange text-white hover:opacity-95 active:scale-98"
                : "bg-surface-dim text-on-surface/40 cursor-not-allowed pointer-events-none"
                }`}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.548-.68.116-.173.231-.144.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z" />
              </svg>
              Confirmar Reserva vía WhatsApp
            </a>
          </div>
        </section>

        <section className="mt-20 border-t border-border-subtle pt-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline-md text-headline-md text-primary mb-8 text-center">Preguntas Frecuentes sobre el Alquiler</h2>
            <div className="space-y-4">
              <details className="group bg-white border border-border-subtle rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer list-none font-headline-md text-primary outline-none select-none">
                  <span>¿Qué documentos necesito para retirar la motocicleta?</span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="mt-4 font-body-md text-on-surface-variant leading-relaxed">
                  Debes presentar tu licencia de conducción original y vigente (apta para motocicletas), documento de identidad o pasaporte en físico, y firmar el contrato de arrendamiento en nuestra oficina o al recibir el vehículo a domicilio.
                </div>
              </details>

              <details className="group bg-white border border-border-subtle rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer list-none font-headline-md text-primary outline-none select-none">
                  <span>¿Cómo funciona el depósito de garantía?</span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="mt-4 font-body-md text-on-surface-variant leading-relaxed">
                  Para proceder con el alquiler se requiere dejar un depósito de garantía mediante tarjeta de crédito o efectivo. Este valor varía según el cilindraje de la moto y se devuelve en su totalidad inmediatamente después de entregar el vehículo en las mismas condiciones mecánicas y estéticas recibidas.
                </div>
              </details>

              <details className="group bg-white border border-border-subtle rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer list-none font-headline-md text-primary outline-none select-none">
                  <span>¿Puedo salir del Valle de Aburrá con la moto alquilada?</span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="mt-4 font-body-md text-on-surface-variant leading-relaxed">
                  Sí, tienes libertad de circular por todo el territorio de Antioquia. En caso de querer realizar viajes nacionales o de mayor distancia fuera de la región, indícalo por favor a nuestro asesor al momento de confirmar tu reserva.
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
