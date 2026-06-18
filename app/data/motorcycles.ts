export interface Motorcycle {
  id: string;
  name: string;
  brand: string;
  category: string;
  type: string;
  pricePerDay: number;
  image: string;
  specs: {
    displacement: string;
    power: string;
    torque?: string;
    fuel?: string;
    weight?: string;
  };
  features: string[];
  rating: number;
  description: string;
}

export const motorcycles: Motorcycle[] = [
  {
    id: "yamaha-nmax",
    name: "NMAX 155 Connected",
    brand: "Yamaha",
    category: "SCOOTER PREMIUM",
    type: "Automática",
    pricePerDay: 120000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8RUcAdZCKEj6DB37ofHYaa3RmwelmtFnTmlX_KgV8xwzyLQ_SOzcYswpeNraiu5MkVSPXjJD-Oz1SaFiuno4x7QC2DdYq0loh47UCt1UYJJaqLCn1rPZufFevyPRsUSbbC2Mm8VxG7aUMQpgoPn1wuTmn7DyAppKMR0PQWgGFAOwmWYT6nwx3CTHQdgingliL9C2BIdXCtepycYvbp8cZR-CS1yxWa8SS9pVg9H2yEehAJ_5eEMyCO8H7J-prvqpZdC21W90Bjb4k",
    rating: 4.9,
    specs: {
      displacement: "155cc",
      power: "15 hp",
      torque: "13.9 Nm",
      fuel: "Gasolina",
      weight: "131 kg"
    },
    features: ["ABS", "USB Charge", "Smart Key", "Bluetooth Connect"],
    description: "La Yamaha NMAX 155 es la scooter premium líder en movilidad urbana. Cuenta con frenos ABS de doble canal, conectividad Bluetooth a través de la app Y-Connect y un motor Blue Core eficiente y ágil para el tráfico de la ciudad."
  },
  {
    id: "honda-xr-190l",
    name: "XR 190L",
    brand: "Honda",
    category: "TODO TERRENO",
    type: "Enduro",
    pricePerDay: 135000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAL2Exsfy_EfDKmg8A2kJgu9e0XmWW3SAcH2EjS67ah8DXeqB5mRWUAR0Q_R0Vn7Wju1_e4skbh3gDOrU5ngUK4SpiH5XEx5uRIRR_ywTj4KZg7GJXzmBhsSQudOxEpn8NGTsjIccu8wLJ-pEqNT7nPzHASt-0FvPp4CZoxJB-9DVNG-a5iKfg_sJZCCk1Eweuf9xX5fSKxWNHS8HkuL9evfK8MDISF2E6LUs-sjeI4aNRE8gtRjD_9uOktISJeCLF7g48QxZi2BexF",
    rating: 4.8,
    specs: {
      displacement: "184cc",
      power: "15.6 hp",
      torque: "15.7 Nm",
      fuel: "Gasolina",
      weight: "129 kg"
    },
    features: ["Dual Purpose", "ABS Front", "Inyección Electrónica", "Suspensión de Largo Recorrido"],
    description: "Diseñada para responder tanto en el pavimento de la ciudad como en los caminos de tierra más exigentes. La Honda XR 190L destaca por su fiabilidad mecánica, inyección electrónica PGM-FI y excelente economía de combustible."
  },
  {
    id: "yamaha-fz25",
    name: "FZ25 ABS",
    brand: "Yamaha",
    category: "NAKED SPORT",
    type: "Naked Sport",
    pricePerDay: 150000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfMTkj4AuYVN0SmYSyZrL3fVEifieDesY1lymkCoWgEcibGm2FKNcBtUEzbzC8HglmTrVyw3ycsXWRWHnUkvrxKU-zyfTtkXguL0mlJyXTX7E6KEnJp76hBEV1fuZvKb1IaQWyutLCyf1faHRhQ_YEACCxKphW3qUJxvLvR-3Orpgx0Y8O6oBk3Ihnwpq92WJerT6sUFnPRgXPfz92xx-AL3pxJEsnhniBZ0pGfwpGfM9-lIIXo5FuvZUDkOJlLsECzr560UdRmL2u",
    rating: 5.0,
    specs: {
      displacement: "249cc",
      power: "20.6 hp",
      torque: "20.1 Nm",
      fuel: "Gasolina",
      weight: "146 kg"
    },
    features: ["Dual ABS", "Iluminación LED", "Motor FI Blue Core", "Consola Digital"],
    description: "Una motocicleta naked sport con un diseño robusto y agresivo. Equipada con frenos ABS de doble canal y un motor de 249cc que brinda un torque excepcional en bajas y medias revoluciones para una conducción divertida y segura."
  },
  {
    id: "yamaha-xtz-250",
    name: "XTZ 250 Lander",
    brand: "Yamaha",
    category: "ADVENTURE",
    type: "Adventure",
    pricePerDay: 165000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGwYZfNsdnIQzbsSW_KjtvzJn8_ZzlvnvyyrWQPeC62CJyjYjjubaHB1VRNCFEg8_G3aiQPpljVw5160p_SS-x6VQKyP36AorOs-OTt-1S5Mt4-JziE4D555f0pnj0PjbpNHECt2V_XwzP8nQW3sNnQYkwGMP1p0CYtbQmdGEO4SJ8RjbKIMAe2PernLTOTMURXqrUqiTA5o9PUwJZ068QrdWUumpbLPuaLfaN3Vz120Yg3NvU_-fkd4qeBBeE8F9yT_1OqtepdRQ0",
    rating: 4.7,
    specs: {
      displacement: "249cc",
      power: "20.4 hp",
      torque: "20.5 Nm",
      fuel: "Gasolina",
      weight: "152 kg"
    },
    features: ["Todo Terreno", "ABS Frontal", "Faros LED", "Gran Distancia al Suelo"],
    description: "La Yamaha Lander XTZ 250 es perfecta para explorar las carreteras de Antioquia y caminos rurales con absoluta comodidad. Su chasis resistente y excelente suspensión garantizan un viaje suave incluso en terrenos irregulares."
  },
  {
    id: "suzuki-dr650",
    name: "DR650 SE",
    brand: "Suzuki",
    category: "TODO TERRENO",
    type: "Dual Sport",
    pricePerDay: 220000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgsM9BHt94Z404cvDv0TgeUYF-UhWnBuObqRDPxKGLUHLL1O-TJLJ25OgyVjwHBoBIwaUTAaQqfmzSaIEeknUk47uuw3i-Df1_pRJVlNZ6Wz6wN5jY-e4KP3Kh-BmSwo6V_hPSFjMT_UobQcA-OCA8VCnd172p8rJ-EYQuyoWLWpKDjDQijqr3bKaUievB2c8dtuoCHBB_3utlghQYaKRVFUXdeiqZ5wtPL70CPEW7UYUJ3nQCA7MXu1fMJ52x4aa2Kg79Rc4olDUN",
    rating: 4.9,
    specs: {
      displacement: "644cc",
      power: "43 hp",
      torque: "54 Nm",
      fuel: "Gasolina",
      weight: "166 kg"
    },
    features: ["Poder Dual", "Construcción Robusta", "Transmisión Manual", "Simplicidad Mecánica"],
    description: "La legendaria Suzuki DR650 es una máquina indestructible de alto cilindraje. Perfecta para viajes largos de aventura por carretera y trochas, con un motor monocilíndrico refrigerado por aire y aceite de torque masivo."
  }
];
