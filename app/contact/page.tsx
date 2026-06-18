"use client";

import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Simulate sending email/message
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg min-h-screen">

        {/* Page Header */}
        <section className="mb-12">
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-2">
            Contacto y Soporte
          </span>
          <h1 className="font-display-lg text-4xl text-primary mb-4">Ponte en contacto con nosotros</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl">
            ¿Tienes dudas sobre los requisitos, la entrega o quieres cotizar tarifas mensuales? Nuestro equipo te responderá de inmediato.
          </p>
        </section>

        {/* Bento Layout Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

          {/* Contact Details & Form Card */}
          <div className="lg:col-span-6 space-y-8">

            {/* Quick Cards Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-2xl border border-border-subtle shadow-sm flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl">call</span>
                <div>
                  <div className="font-label-caps text-[10px] text-on-surface-variant mb-1 font-bold">LLÁMANOS</div>
                  <a href="tel:+573218449988" className="font-body-md text-[16px] text-on-surface hover:text-primary transition-colors">
                    +57 321 844 9988
                  </a>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-border-subtle shadow-sm flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl">mail</span>
                <div>
                  <div className="font-label-caps text-[10px] mb-1">CORREO</div>
                  <a href="mailto:info@rentamotoscyv.com" className="font-body-md text-[16px] text-on-surface hover:text-primary transition-colors">
                    info@rentamotoscyv.com
                  </a>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-border-subtle shadow-sm flex items-start gap-4 sm:col-span-2">
                <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
                <div>
                  <div className="font-label-caps text-[10px] text-on-surface-variant mb-1 font-bold"><b>NUESTRAS SEDES</b></div>
                  <div className="font-body-md text-[15px] text-on-surface">
                    Bogotá, Colombia
                  </div>
                </div>
              </div>
            </div>

            {/* Message form */}
            <div className="bg-white rounded-3xl border border-border-subtle p-8 shadow-sm">
              <h3 className="font-headline-md text-headline-md text-primary mb-6">Envíanos un Mensaje</h3>

              {submitted && (
                <div className="mb-6 p-4 bg-primary-container text-primary font-body-md text-sm rounded-xl border border-primary/20 flex items-center gap-2">
                  <span className="material-symbols-outlined">check_circle</span>
                  ¡Mensaje enviado con éxito! Nos comunicaremos contigo muy pronto.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="form-name" className="font-label-caps text-[10px] text-secondary mb-2 block font-bold">
                    TU NOMBRE COMPLETO
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-surface border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                    placeholder="Escribe tu nombre..."
                  />
                </div>

                <div>
                  <label htmlFor="form-email" className="font-label-caps text-[10px] text-secondary mb-2 block font-bold">
                    CORREO ELECTRÓNICO
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-surface border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="form-message" className="font-label-caps text-[10px] text-secondary mb-2 block font-bold">
                    ¿CÓMO PODEMOS AYUDARTE?
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-surface border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                    placeholder="Cuéntanos qué motocicleta te interesa, las fechas de alquiler y cualquier requerimiento especial..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-xl font-button-text text-button-text hover:shadow-lg transition-all active:scale-[0.98] text-center"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>

          {/* Location Map Column */}
          <div className="lg:col-span-6 h-full min-h-[500px] lg:min-h-[660px] rounded-3xl overflow-hidden relative shadow-md border border-border-subtle">
            <div className="absolute inset-0 bg-surface-container-highest flex items-center justify-center">

              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d278.10440220095677!2d-74.10016373160774!3d4.603343694043067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9915f111bb09%3A0x8390c053659f2bd7!2sAv.%20Cdad.%20de%20Quito%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1781735327343!5m2!1ses!2sco" width="600" height="750" loading="lazy"></iframe>

              {/* Delivery Zone Info Pill */}
              <div className="absolute bottom-6 left-6 right-6 glass-effect p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-action-orange text-xl">info</span>
                  <span className="font-label-caps text-[10px] text-primary font-bold">ZONA DE COBERTURA</span>
                </div>
                <p className="font-body-md text-xs text-on-surface">
                  Entregamos motocicletas a domicilio en toda el Área Metropolitana de Bogotá y en el Aeropuerto El Dorado.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
