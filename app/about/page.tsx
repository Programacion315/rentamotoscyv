import Link from "next/link";

export default function About() {
  return (
    <div className="text-on-surface">

      {/* Hero Header Section */}
      <section className="relative h-[450px] md:h-[550px] flex items-center overflow-hidden">
        {/* Background & Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-transparent" />
          <img
            className="w-full h-full object-cover"
            alt="Mantenimiento preventivo de motocicletas"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbd4pIsFBwSCDk_XsbBhM-rYfTf3yEQdVXeo_mFAPf9LMm2T3n7N0Sy32DqyuOxGzb2RwQsUM-0oOUZzuKSrgXTu-IggvpOYVOcR3Nruk6a1MOmmNL9rJldyMxBbpo3jvc3xQsqUeObN49BTF7GwkEvoGx-VDd9XXeSReg7ky5zf_sahSPjfdSgjs9LKmwcTi4YJVUZfToWM-OHiM9aIcs0zjAycTqo02-JJeSp-Z086-GIH8PmBo3is8ss3qKxAex03RbsEHL6P3C"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl space-y-4">
            <span className="font-label-caps text-label-caps px-3 py-1 rounded-full uppercase tracking-wider bg-primary/30 px-3 py-1 rounded-full backdrop-blur-sm inline-block">
              NUESTRA HISTORIA
            </span>
            <h1 className="font-display-lg text-4xl md:text-5xl font-bold leading-tight text-primary">
              Libertad sobre dos ruedas en el corazón de Bogotá.
            </h1>
            <p className="font-body-lg text-surface-container-lowest max-w-xl">
              En rentamotoscyv, no solo alquilamos motocicletas; entregamos la llave para explorar la ciudad de la eterna primavera con total independencia, confianza y seguridad.
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid layout for Mission and focus */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

          {/* Mission Card (7 columns) */}
          <div className="md:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-border-subtle shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="mb-6 text-primary bg-primary/5 w-12 h-12 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">flag</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Nuestra Misión</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed mb-8">
                Nacimos con el propósito de revolucionar la movilidad y el turismo en Bogotá, ofreciendo un servicio de alquiler de motocicletas de alta gama, con un enfoque innegociable en el mantenimiento preventivo y la satisfacción del conductor. Buscamos ser el compañero de confianza tanto para el turista aventurero como para el profesional local que necesita agilidad.
              </p>
            </div>

            <div className="pt-6 border-t border-border-subtle grid grid-cols-2 gap-4">
              <div>
                <div className="text-primary font-bold text-3xl">100%</div>
                <div className="text-label-caps font-label-caps uppercase text-on-surface-variant mt-1">
                  Mantenimiento PRO
                </div>
              </div>
              <div>
                <div className="text-primary font-bold text-3xl">24/7</div>
                <div className="text-label-caps font-label-caps uppercase text-on-surface-variant mt-1">
                  Soporte Vial
                </div>
              </div>
            </div>
          </div>

          {/* Experience Card (5 columns) */}
          <div className="md:col-span-5 bg-surface-container-highest p-8 rounded-3xl flex flex-col justify-center border border-border-subtle shadow-sm">
            <div className="relative z-10 space-y-4">
              <h3 className="font-headline-md text-headline-md text-primary">Experiencia de Alquiler</h3>
              <p className="font-body-md opacity-90 leading-relaxed">
                Nuestros procesos de reserva son 100% digitales y rápidos para que pases más tiempo conduciendo por las carreteras y menos tiempo haciendo trámites aburridos.
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-primary-container">check_circle</span>
                  <span>Reserva online segura por WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-primary-container">check_circle</span>
                  <span>Entrega en puntos clave y aeropuertos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-primary-container">check_circle</span>
                  <span>Dos cascos reglamentarios incluidos</span>
                </li>
              </ul>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10 scale-150">
              <span className="material-symbols-outlined text-[160px] select-none">motorcycle</span>
            </div>
          </div>

          {/* Local Experts Card (5 columns) */}
          <div className="md:col-span-5 bg-surface-container-highest p-8 rounded-3xl flex flex-col justify-center border border-border-subtle shadow-sm">
            <div className="text-action-orange mb-4">
              <span className="material-symbols-outlined text-5xl">verified</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">Pasión por Bogotá</h3>
            <p className="font-body-md leading-relaxed">
              Conoce cada ruta, cada mirador y cada atajo de la ciudad. disfruta de viajes personalizados para que tu estadía y conducción sean seguras e inolvidables.
            </p>
          </div>

          {/* Skyline Travel Image (7 columns) */}
          <div className="md:col-span-7 h-64 md:h-auto rounded-3xl overflow-hidden shadow-sm border border-border-subtle">
            <img
              className="w-full h-full object-cover"
              alt="Motociclista observando la panorámica de Bogotá al atardecer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm657P2n-gmOlSclph1ll3eSd58xVauVcG-1vrC6-5U53M_pl2dvH_WY7HiuAQn_vraQlhICGV7MYTvGzzIppwXnT104lFI3fZI2TJf8LprNypErjH3yAkR_-VsBpR2zw3am1Kc73bls259p8RLkyc6MduEyRe1QrTqeD_qkkQy_sdst2Z9hIctuMudSz2t-ipcdhLc_VujEgkhuhi6uqb-ZLqcniN9NzFCKs8TGj83SpM7OBz9c-Y99ngBMNHtiDXRWEjI8xYaO_-"
            />
          </div>

        </div>
      </section>

      {/* CTA section to redirect */}
      <section className="bg-surface-container-low py-16 border-t border-border-subtle text-center">
        <div className="max-w-2xl mx-auto px-margin-mobile">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">¿Listo para emprender tu viaje?</h2>
          <p className="font-body-md text-on-surface-variant mb-8">
            Elige la motocicleta que mejor se adapte a tus necesidades de viaje y recíbela en la puerta de tu hotel o en el aeropuerto.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/catalog"
              className="bg-action-orange text-white px-8 py-4 rounded-lg font-button-text text-button-text shadow-md hover:shadow-lg hover:opacity-95 transition-all text-center"
            >
              Ver Catálogo de Motos
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}