const env = import.meta.env ?? {}

export const SUPABASE_MEDIA_URL = (
  env.VITE_SUPABASE_MEDIA_URL ||
  'https://chqllbhsgfawmdogbjoy.supabase.co/storage/v1/object/public/tocal-media'
)
  .trim()
  .replace(/\/+$/, '')

export const getSupabaseVideoUrl = (fileName) => {
  const clean = String(fileName || '').replace(/^\/+/, '')
  return `${SUPABASE_MEDIA_URL}/videos/${clean}`
}

export const company = {
  name: 'TOCAL',
  legalName: 'Constructora Tocal Ltda.',
  rut: '76.022.955-5',
  website: 'www.tocal.cl',
  eyebrow: 'Desde 2008 · +125.000 m² Construidos · +40 Proyectos en Chile',
  headline: 'Soluciones constructivas e infraestructura industrial de alto estándar.',
  description:
    'En Constructora TOCAL nos destacamos en la ejecución de obras industriales, plantas de proceso, bodegas, estaciones de servicio y equipamiento comercial, garantizando calidad, seguridad y estricto cumplimiento de los plazos comprometidos.',
  founded: '2008',
  yearsExperience: '+15',
  builtSurface: '+125.000 m²',
  projectsCount: '+40',
  heroImage: '/images/company/hero-main.webp',
  heroVideo: getSupabaseVideoUrl('tucapel-retiro.mp4'),
  email: (env.VITE_CONTACT_EMAIL || 'constructora@tocal.cl').trim(),
  phone: '02-22474085 / 073-2220473',
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER || '56963269747').replace(/[^\d]/g, ''),
  whatsappDisplay: '+56 9 6326 9747',
  offices: [
    {
      city: 'Santiago',
      address: 'Av. Del Parque 4680-A, Of. 206, Huechuraba – Santiago',
      phone: '02-22474085',
      telHref: '+56222474085',
    },
    {
      city: 'Linares',
      address: 'Fundo La Granja Lote 10, Oficina B, Linares',
      phone: '073-2220473',
      telHref: '+56732220473',
    },
  ],
  leadership: [
    {
      name: 'Julio Robert M.',
      role: 'CEO · Gerente General',
      phone: '+56 9 8259 4112',
      telHref: '+56982594112',
      email: 'jrobert@tocal.cl',
    },
    {
      name: 'Mario Poblete A.',
      role: 'COO · Gerente de Operaciones',
      phone: '+56 9 7959 4798',
      telHref: '+56979594798',
      email: 'mpoblete@tocal.cl',
    },
  ],
  locations: [
    'Santiago · Av. Del Parque 4680-A, Of. 206, Huechuraba',
    'Linares · Fundo La Granja Lote 10, Oficina B',
  ],
  about: {
    eyebrow: 'Quiénes somos',
    title: 'Más de 15 años siendo un aliado estratégico en obras industriales y comerciales.',
    paragraphs: [
      'Constructora TOCAL nació en 2008 con el propósito de desarrollar proyectos industriales de manera eficiente, garantizando altos estándares de calidad y seguridad. A lo largo de estos más de 15 años, nos hemos consolidado como un aliado estratégico para nuestros clientes, destacando por nuestro firme compromiso con el cumplimiento de los plazos.',
      'Con más de 125.000 m² construidos y más de 40 proyectos industriales ejecutados a lo largo del país —incluyendo plantas de procesamiento, plantas de packing, centros de bodegaje, estaciones de servicio y equipamiento comercial e institucional—, impulsamos el crecimiento de las empresas en Chile con espacios funcionales y de alto estándar técnico.',
    ],
    pillars: [
      {
        number: '01',
        title: 'Seguridad operacional',
        text: 'Prevención de riesgos y estándares rigurosos de protección en cada faena e instalación activa.',
      },
      {
        number: '02',
        title: 'Calidad y eficiencia',
        text: 'Control técnico permanente y soluciones constructivas adaptadas a la operación de cada mandante.',
      },
      {
        number: '03',
        title: 'Cumplimiento de plazos',
        text: 'Planificación realista y compromiso comprobado con las fechas de entrega acordadas.',
      },
      {
        number: '04',
        title: 'Alcance nacional',
        text: 'Operación desde Santiago y Linares con despliegue en terreno desde Coquimbo hasta el centro-sur del país.',
      },
    ],
    showcaseImages: [
      {
        src: '/images/company/about-main.webp',
        title: 'Planta Procesadora Avomex S.A.',
        meta: 'Quillota · 7.800 m² construidos + 10.000 m² obras exteriores',
      },
      {
        src: '/images/company/about-secondary.webp',
        title: 'Estación de Servicio Copec Chicureo',
        meta: 'Colina · 500 m² construidos + 2.500 m² obras exteriores',
      },
    ],
  },
  clients: {
    eyebrow: 'Confianza comprobada',
    title: 'Nuestros clientes',
    subtitle:
      'Mandantes líderes del sector agroindustrial, alimentos, energía, combustibles, retail e instituciones públicas que han confiado sus proyectos a TOCAL.',
    bannerImage: '/images/company/clients.webp',
    list: [
      'Copec S.A.',
      'Enex / Shell',
      'Tucapel S.A.',
      'Sopraval S.A.',
      'Ranco Cherries S.A.',
      'Avomex S.A.',
      'Casa de Moneda de Chile',
      'Montolin S.A.',
      'Southam Freeze-Dry',
      'SMU / Unimarc',
      'Colegio Inglés de Talca',
      'Bosch',
      'Guallarauco',
      'Coagra',
      'La Araucana',
      'DRS Ingeniería y Gestión',
    ],
  },
}

export const stats = [
  { value: '2008', label: 'Año de fundación (+15 años de trayectoria)' },
  { value: '+125.000 m²', label: 'Superficie construida a nivel nacional' },
  { value: '+40', label: 'Proyectos industriales y comerciales ejecutados' },
  { value: '100%', label: 'Compromiso con seguridad, calidad y plazos' },
]

export const services = [
  {
    id: 'industrial-plants',
    number: '01',
    title: 'Plantas industriales y de proceso',
    text: 'Ejecución integral de plantas procesadoras de alimentos, plantas de liofilizado, complejos de packing agroindustrial y plantas de recepción de granos, incluyendo fundaciones técnicas, naves de proceso y urbanización.',
    meta: 'Avomex · Tucapel · Sopraval · Ranco Cherries · Southam Freeze-Dry · Montolin',
    image: '/images/services/industrial-plants.webp',
  },
  {
    id: 'warehouses',
    number: '02',
    title: 'Bodegas y centros logísticos',
    text: 'Construcción de galpones de acopio a granel y centros de bodegaje industrial de grandes luces, radieres de alta resistencia para tránsito pesado y patios de maniobra.',
    meta: 'Comercial Megarent · Comercial Bodegaas · Bodega Cóndores',
    image: '/images/projects/bodega-megarent-linares/cover.webp',
  },
  {
    id: 'fuels',
    number: '03',
    title: 'Estaciones de servicio y combustibles',
    text: 'Desarrollo completo de estaciones de servicio urbanas y ruteras, marquesinas, islas de carga, tiendas de conveniencia, módulos de autolavado y grandes explanadas en pavimento rígido.',
    meta: 'Copec S.A. · Shell / Enex S.A. · Inversiones La Cantera',
    image: '/images/services/fuels.webp',
  },
  {
    id: 'shopping-centers',
    number: '04',
    title: 'Equipamiento comercial e institucional',
    text: 'Edificación y habilitación de strip centers, supermercados, infraestructura educacional (pabellones de aulas, auditorios y salas acústicas) y remodelaciones institucionales de alta seguridad.',
    meta: 'Casa de Moneda de Chile · Strip Center Puerto Tepual & Puerto Talca · Unimarc · Colegio Inglés',
    image: '/images/services/shopping-centers.webp',
  },
]

export const projectCategories = [
  { id: 'all', label: 'Todos los proyectos' },
  { id: 'industrial-plants', label: 'Plantas y Bodegas' },
  { id: 'fuels', label: 'Combustibles' },
  { id: 'shopping-centers', label: 'Comercial e Institucional' },
  { id: 'with-video', label: '▶ Con video en dron' },
]

export const projects = [
  // =========================================================================
  // PLANTAS INDUSTRIALES Y BODEGAS
  // =========================================================================
  {
    id: 'planta-tucapel-retiro',
    categoryId: 'industrial-plants',
    category: 'Planta Industrial',
    featured: true,
    title: 'Planta de Recepción de Arroz y Galpón Granel — Tucapel S.A.',
    client: 'Tucapel S.A.',
    location: 'Retiro, Región del Maule',
    builtSurface: '7.190 m²',
    exteriorSurface: '3.500 m²',
    summary:
      'Construcción de planta de recepción de arroz, ampliación de nave de acopio a granel, fundaciones industriales y 3.500 m² de obras exteriores y pavimentos en Retiro.',
    image: '/images/projects/planta-tucapel-retiro/cover.webp',
    images: [
      '/images/projects/planta-tucapel-retiro/image-01.webp',
      '/images/projects/planta-tucapel-retiro/image-02.webp',
      '/images/projects/planta-tucapel-retiro/image-03.webp',
      '/images/projects/planta-tucapel-retiro/image-04.webp',
    ],
    videos: [
      {
        title: 'Recorrido aéreo en dron — Planta Tucapel Retiro',
        src: getSupabaseVideoUrl('tucapel-retiro.mp4'),
      },
    ],
  },
  {
    id: 'planta-avomex-quillota',
    categoryId: 'industrial-plants',
    category: 'Planta de Procesamiento',
    featured: true,
    title: 'Planta Procesadora de Paltas — Avomex S.A.',
    client: 'Avomex S.A.',
    location: 'Quillota, Región de Valparaíso',
    builtSurface: '7.800 m²',
    exteriorSurface: '10.000 m²',
    summary:
      'Ejecución integral de planta agroindustrial de 7.800 m² para líneas de proceso, áreas frigoríficas y servicios, más 10.000 m² de pavimentación exterior y andenes de carga.',
    image: '/images/projects/planta-avomex-quillota/cover.webp',
    images: [
      '/images/projects/planta-avomex-quillota/image-01.webp',
      '/images/projects/planta-avomex-quillota/image-02.webp',
      '/images/projects/planta-avomex-quillota/image-03.webp',
      '/images/projects/planta-avomex-quillota/image-04.webp',
    ],
    videos: [],
  },
  {
    id: 'packing-ranco-cherries-rancagua',
    categoryId: 'industrial-plants',
    category: 'Planta de Packing',
    featured: true,
    title: 'Ampliación Planta de Packing — Ranco Cherries S.A.',
    client: 'Ranco Cherries S.A.',
    location: 'Rancagua, Región de O’Higgins',
    builtSurface: '7.540 m²',
    exteriorSurface: '13.500 m²',
    summary:
      'Construcción de 7.540 m² de naves de proceso y embalaje de alta capacidad, junto con 13.500 m² de patios logísticos y pavimentos para tránsito pesado.',
    image: '/images/projects/packing-ranco-cherries-rancagua/cover.webp',
    images: [
      '/images/projects/packing-ranco-cherries-rancagua/image-01.webp',
      '/images/projects/packing-ranco-cherries-rancagua/image-02.webp',
      '/images/projects/packing-ranco-cherries-rancagua/image-03.webp',
    ],
    videos: [],
  },
  {
    id: 'planta-sopraval-la-calera',
    categoryId: 'industrial-plants',
    category: 'Planta de Procesamiento',
    featured: false,
    title: 'Planta de Procesamiento — Sopraval S.A.',
    client: 'Sopraval S.A.',
    location: 'La Calera, Región de Valparaíso',
    builtSurface: '1.600 m²',
    exteriorSurface: '2.000 m²',
    summary:
      'Obras civiles y edificación industrial para planta de procesamiento de Sopraval S.A. bajo estrictos estándares sanitarios y de continuidad operativa.',
    image: '/images/projects/planta-sopraval-la-calera/cover.webp',
    images: [
      '/images/projects/planta-sopraval-la-calera/image-01.webp',
      '/images/projects/planta-sopraval-la-calera/image-02.webp',
      '/images/projects/planta-sopraval-la-calera/image-03.webp',
    ],
    videos: [],
  },
  {
    id: 'planta-southam-freeze-dry-buin',
    categoryId: 'industrial-plants',
    category: 'Planta de Liofilizados',
    featured: false,
    title: 'Planta de Procesamiento de Liofilizados — Southam Freeze-Dry',
    client: 'Southam Freeze-Dry',
    location: 'Buin, Región Metropolitana',
    builtSurface: '3.700 m²',
    exteriorSurface: null,
    summary:
      'Construcción especializada de 3.700 m² para procesos de liofilización alimentaria, integrando fundaciones técnicas, estructura metálica y envolvente térmica.',
    image: '/images/projects/planta-southam-freeze-dry-buin/cover.webp',
    images: [
      '/images/projects/planta-southam-freeze-dry-buin/image-01.webp',
      '/images/projects/planta-southam-freeze-dry-buin/image-02.webp',
    ],
    videos: [],
  },
  {
    id: 'packing-montolin-llay-llay',
    categoryId: 'industrial-plants',
    category: 'Planta de Packing',
    featured: false,
    title: 'Ampliación Planta de Packing — Montolin S.A.',
    client: 'Montolin S.A.',
    location: 'Llay Llay, Región de Valparaíso',
    builtSurface: '4.200 m²',
    exteriorSurface: null,
    summary:
      'Obras de ampliación para planta de packing agroindustrial con 4.200 m² construidos, radieres de alta resistencia y naves de procesamiento.',
    image: '/images/projects/packing-montolin-llay-llay/cover.webp',
    images: [
      '/images/projects/packing-montolin-llay-llay/image-01.webp',
      '/images/projects/packing-montolin-llay-llay/image-02.webp',
      '/images/projects/packing-montolin-llay-llay/image-03.webp',
    ],
    videos: [],
  },
  {
    id: 'bodega-megarent-linares',
    categoryId: 'industrial-plants',
    category: 'Bodega Industrial',
    featured: false,
    title: 'Centro de Bodegaje — Comercial Megarent Ltda.',
    client: 'Comercial Megarent Ltda.',
    location: 'Linares, Región del Maule',
    builtSurface: '4.500 m²',
    exteriorSurface: null,
    summary:
      'Construcción de nave de bodegaje y centro logístico de 4.500 m² en Linares con estructura metálica de grandes luces, radieres industriales y patios de maniobra.',
    image: '/images/projects/bodega-megarent-linares/cover.webp',
    images: [
      '/images/projects/bodega-megarent-linares/image-01.webp',
      '/images/projects/bodega-megarent-linares/image-02.webp',
      '/images/projects/bodega-megarent-linares/image-03.webp',
    ],
    videos: [
      {
        title: 'Vista aérea en dron — Bodega Comercial Megarent',
        src: getSupabaseVideoUrl('bodega-megarent.mp4'),
      },
    ],
  },
  {
    id: 'bodega-bodegaas-linares',
    categoryId: 'industrial-plants',
    category: 'Bodega Industrial',
    featured: false,
    title: 'Complejo de Bodegas — Comercial Bodegaas Ltda.',
    client: 'Comercial Bodegaas Ltda.',
    location: 'Linares, Región del Maule',
    builtSurface: '5.000 m²',
    exteriorSurface: null,
    summary:
      'Ejecución de complejo de bodegaje industrial de 5.000 m² construidos en Linares, incluyendo obras civiles, montaje estructural y accesos de carga.',
    image: '/images/projects/bodega-bodegaas-linares/cover.webp',
    images: [
      '/images/projects/bodega-bodegaas-linares/image-01.webp',
      '/images/projects/bodega-bodegaas-linares/image-02.webp',
      '/images/projects/bodega-bodegaas-linares/image-03.webp',
    ],
    videos: [
      {
        title: 'Recorrido aéreo en dron — Comercial Bodegaas Linares',
        src: getSupabaseVideoUrl('bodega-bodegaas.mp4'),
      },
    ],
  },
  {
    id: 'bodega-condores-cabrero',
    categoryId: 'industrial-plants',
    category: 'Bodega Industrial',
    featured: false,
    title: 'Bodega Industrial Cóndores — Cabrero',
    client: 'Cóndores Ltda.',
    location: 'Cabrero, Región del Biobío',
    builtSurface: '2.000 m²',
    exteriorSurface: null,
    summary:
      'Construcción de nave de almacenamiento industrial de 2.000 m² para Cóndores Ltda. en Cabrero, integrando obras civiles, radieres de hormigón y estructura metálica.',
    image: '/images/projects/bodega-condores-cabrero/cover.webp',
    images: [
      '/images/projects/bodega-condores-cabrero/image-01.webp',
      '/images/projects/bodega-condores-cabrero/image-02.webp',
      '/images/projects/bodega-condores-cabrero/image-03.webp',
    ],
    videos: [],
  },

  // =========================================================================
  // COMBUSTIBLES / ESTACIONES DE SERVICIO
  // =========================================================================
  {
    id: 'copec-chillan',
    categoryId: 'fuels',
    category: 'Combustibles',
    featured: true,
    title: 'Estación de Servicio Copec Chillán',
    client: 'Copec S.A.',
    location: 'Chillán, Región de Ñuble',
    builtSurface: '900 m²',
    exteriorSurface: '9.000 m²',
    summary:
      'Ejecución integral de estación de servicio Copec con 900 m² edificados y 9.000 m² de pavimentación rígida para tránsito pesado, islas de carga y urbanización.',
    image: '/images/projects/copec-chillan/cover.webp',
    images: [
      '/images/projects/copec-chillan/image-01.webp',
      '/images/projects/copec-chillan/image-02.webp',
      '/images/projects/copec-chillan/image-03.webp',
    ],
    videos: [
      {
        title: 'Recorrido aéreo en dron — Estación de Servicio Copec Chillán',
        src: getSupabaseVideoUrl('copec-chillan.mp4'),
      },
    ],
  },
  {
    id: 'shell-enex-san-carlos',
    categoryId: 'fuels',
    category: 'Combustibles',
    featured: true,
    title: 'Estación de Servicio Shell (ENEX) — San Carlos',
    client: 'ENEX S.A.',
    location: 'San Carlos, Región de Ñuble',
    builtSurface: '900 m²',
    exteriorSurface: '37.000 m²',
    summary:
      'Complejo rutero de abastecimiento de combustibles con 900 m² edificados y una gran explanada de 37.000 m² de obras civiles, pistas y estacionamientos de alto tonelaje.',
    image: '/images/projects/shell-enex-san-carlos/cover.webp',
    images: [
      '/images/projects/shell-enex-san-carlos/image-01.webp',
      '/images/projects/shell-enex-san-carlos/image-02.webp',
    ],
    videos: [
      {
        title: 'Recorrido aéreo en dron — Estación Shell San Carlos',
        src: getSupabaseVideoUrl('shell-san-carlos.mp4'),
      },
    ],
  },
  {
    id: 'copec-chicureo-colina',
    categoryId: 'fuels',
    category: 'Combustibles',
    featured: false,
    title: 'Estación de Servicio Copec Chicureo — Colina',
    client: 'Copec S.A.',
    location: 'Chicureo, Colina, Región Metropolitana',
    builtSurface: '500 m²',
    exteriorSurface: '2.500 m²',
    summary:
      'Construcción de estación de servicio, tienda de conveniencia, marquesina e islas de expendio con 500 m² edificados y 2.500 m² de pavimentos y obras exteriores.',
    image: '/images/projects/copec-chicureo-colina/cover.webp',
    images: [
      '/images/projects/copec-chicureo-colina/image-01.webp',
      '/images/projects/copec-chicureo-colina/image-02.webp',
      '/images/projects/copec-chicureo-colina/image-03.webp',
    ],
    videos: [],
  },
  {
    id: 'copec-horcones',
    categoryId: 'fuels',
    category: 'Combustibles',
    featured: false,
    title: 'Estación de Servicio Copec Horcones',
    client: 'Copec S.A.',
    location: 'Horcones, Región del Biobío',
    builtSurface: '900 m²',
    exteriorSurface: '15.000 m²',
    summary:
      'Obras civiles e infraestructura de abastecimiento con 900 m² construidos y 15.000 m² de pavimentación de alto tráfico y explanada exterior.',
    image: '/images/projects/copec-horcones/cover.webp',
    images: ['/images/projects/copec-horcones/image-01.webp'],
    videos: [],
  },
  {
    id: 'copec-concon',
    categoryId: 'fuels',
    category: 'Combustibles',
    featured: false,
    title: 'Estación de Servicio Copec Concón',
    client: 'Copec S.A.',
    location: 'Concón, Región de Valparaíso',
    builtSurface: '300 m²',
    exteriorSurface: '3.000 m²',
    summary:
      'Construcción y habilitación de estación de servicio con 300 m² edificados, marquesina de carga y 3.000 m² de pavimentos y obras civiles exteriores.',
    image: '/images/projects/copec-concon/cover.webp',
    images: ['/images/projects/copec-concon/image-01.webp'],
    videos: [],
  },
  {
    id: 'shell-la-cantera-coquimbo',
    categoryId: 'fuels',
    category: 'Combustibles',
    featured: false,
    title: 'Estación de Servicio Shell La Cantera — Coquimbo',
    client: 'Inversiones La Cantera SpA',
    location: 'La Cantera, Coquimbo',
    builtSurface: '200 m²',
    exteriorSurface: '4.000 m²',
    summary:
      'Desarrollo de estación de servicio con 200 m² de edificación comercial y 4.000 m² de pavimentación, islas de expendio, marquesina y accesos viales.',
    image: '/images/projects/shell-la-cantera-coquimbo/cover.webp',
    images: [
      '/images/projects/shell-la-cantera-coquimbo/image-01.webp',
      '/images/projects/shell-la-cantera-coquimbo/image-02.webp',
    ],
    videos: [],
  },
  {
    id: 'copec-quillon',
    categoryId: 'fuels',
    category: 'Combustibles',
    featured: false,
    title: 'Estación de Servicio Copec Quillón',
    client: 'Copec S.A.',
    location: 'Quillón, Región de Ñuble',
    builtSurface: null,
    exteriorSurface: null,
    summary:
      'Construcción de estación de servicio Copec en Quillón con marquesina de islas de carga, tienda de conveniencia, módulos de autolavado y urbanización exterior.',
    image: '/images/projects/copec-quillon/cover.webp',
    images: [
      '/images/projects/copec-quillon/image-01.webp',
      '/images/projects/copec-quillon/image-02.webp',
      '/images/projects/copec-quillon/image-03.webp',
    ],
    videos: [
      {
        title: 'Recorrido aéreo en dron — Copec Quillón',
        src: getSupabaseVideoUrl('copec-quillon.mp4'),
      },
    ],
  },
  {
    id: 'copec-sagrada-familia',
    categoryId: 'fuels',
    category: 'Combustibles',
    featured: false,
    title: 'Estación de Servicio Copec Sagrada Familia',
    client: 'Copec S.A.',
    location: 'Sagrada Familia, Región del Maule',
    builtSurface: null,
    exteriorSurface: null,
    summary:
      'Ejecución de obras civiles, estructura de marquesina, islas de carga, edificio de servicios y pavimentación vehicular en Sagrada Familia.',
    image: '/images/projects/copec-sagrada-familia/cover.webp',
    images: [
      '/images/projects/copec-sagrada-familia/image-01.webp',
      '/images/projects/copec-sagrada-familia/image-02.webp',
      '/images/projects/copec-sagrada-familia/image-03.webp',
    ],
    videos: [
      {
        title: 'Recorrido aéreo en dron — Copec Sagrada Familia',
        src: getSupabaseVideoUrl('copec-sagrada-familia.mp4'),
      },
    ],
  },

  // =========================================================================
  // EQUIPAMIENTO COMERCIAL E INSTITUCIONAL
  // =========================================================================
  {
    id: 'strip-center-puerto-tepual-talca',
    categoryId: 'shopping-centers',
    category: 'Centro Comercial',
    featured: true,
    title: 'Strip Center Puerto Tepual — Talca',
    client: 'Inv. Inmobiliarias Comerciales S.A.',
    location: 'Talca, Región del Maule',
    builtSurface: '2.300 m²',
    exteriorSurface: '2.200 m²',
    summary:
      'Construcción de centro comercial de 2.300 m² edificados para locales comerciales y de servicios, más 2.200 m² de estacionamientos y urbanización.',
    image: '/images/projects/strip-center-puerto-tepual-talca/cover.webp',
    images: [
      '/images/projects/strip-center-puerto-tepual-talca/image-01.webp',
      '/images/projects/strip-center-puerto-tepual-talca/image-02.webp',
      '/images/projects/strip-center-puerto-tepual-talca/image-03.webp',
    ],
    videos: [],
  },
  {
    id: 'strip-center-puerto-talca',
    categoryId: 'shopping-centers',
    category: 'Centro Comercial',
    featured: false,
    title: 'Strip Center Puerto Talca',
    client: 'Inv. Inmobiliarias Comerciales S.A.',
    location: 'Talca, Región del Maule',
    builtSurface: '1.500 m²',
    exteriorSurface: '2.500 m²',
    summary:
      'Desarrollo de equipamiento comercial de 1.500 m² construidos en módulos de moderna arquitectura y 2.500 m² de explanadas peatonales y estacionamientos.',
    image: '/images/projects/strip-center-puerto-talca/cover.webp',
    images: [
      '/images/projects/strip-center-puerto-talca/image-01.webp',
      '/images/projects/strip-center-puerto-talca/image-02.webp',
    ],
    videos: [],
  },
  {
    id: 'unimarc-talca',
    categoryId: 'shopping-centers',
    category: 'Comercial / Retail',
    featured: false,
    title: 'Supermercado Unimarc y Equipamiento Comercial — Talca',
    client: 'SMU / Unimarc',
    location: 'Talca, Región del Maule',
    builtSurface: null,
    exteriorSurface: null,
    summary:
      'Construcción y habilitación de sala de ventas de supermercado Unimarc, locales comerciales, fachadas, estacionamientos en superficie y accesos viales en Talca.',
    image: '/images/projects/unimarc-talca/cover.webp',
    images: [
      '/images/projects/unimarc-talca/image-01.webp',
      '/images/projects/unimarc-talca/image-02.webp',
      '/images/projects/unimarc-talca/image-03.webp',
    ],
    videos: [
      {
        title: 'Recorrido aéreo en dron — Unimarc Talca',
        src: getSupabaseVideoUrl('unimarc-talca.mp4'),
      },
    ],
  },
  {
    id: 'colegio-ingles-talca',
    categoryId: 'shopping-centers',
    category: 'Infraestructura Educacional',
    featured: false,
    title: 'Infraestructura Educacional — Colegio Inglés de Talca',
    client: 'Colegio Inglés de Talca',
    location: 'Talca, Región del Maule',
    builtSurface: null,
    exteriorSurface: null,
    summary:
      'Construcción y habilitación de pabellones de salas de clases, edificio especializado para sala de música con acondicionamiento acústico y salón de conferencias.',
    image: '/images/projects/colegio-ingles-talca/cover.webp',
    images: [
      '/images/projects/colegio-ingles-talca/image-01.webp',
      '/images/projects/colegio-ingles-talca/image-02.webp',
      '/images/projects/colegio-ingles-talca/image-03.webp',
    ],
    videos: [
      {
        title: 'Salón de Conferencias — Colegio Inglés de Talca',
        src: getSupabaseVideoUrl('colegio-ingles-conferencias.mp4'),
      },
      {
        title: 'Sala de Música — Colegio Inglés de Talca',
        src: getSupabaseVideoUrl('colegio-ingles-musica.mp4'),
      },
      {
        title: 'Pabellón de Salas de Clases — Colegio Inglés de Talca',
        src: getSupabaseVideoUrl('colegio-ingles-salas.mp4'),
      },
    ],
  },
  {
    id: 'casa-de-moneda-chile',
    categoryId: 'shopping-centers',
    category: 'Infraestructura Institucional',
    featured: false,
    title: 'Remodelación Fases I y II + Bóveda de Billetes — Casa de Moneda de Chile',
    client: 'Casa de Moneda de Chile (Gobierno de Chile)',
    location: 'Santiago, Región Metropolitana',
    builtSurface: '7.000 m²',
    exteriorSurface: '1.400 m² (Fase I) · 4.800 m² (Fase II) · 800 m² (Bóveda)',
    summary:
      'Proyectos de alta seguridad institucional para Casa de Moneda de Chile en Santiago: Primera Etapa de Remodelación (1.400 m²), Segunda Etapa de Remodelación (4.800 m²) y Bóveda de Billetes (800 m²).',
    image: '/images/projects/casa-de-moneda-chile/cover.webp',
    images: ['/images/projects/casa-de-moneda-chile/image-01.webp'],
    videos: [],
  },
]
