import { getSupabaseVideoUrl } from '../config/site.js'

/**
 * Catálogo oficial de proyectos ejecutados por Constructora TOCAL Ltda.
 * Incluye las 18 obras documentadas en el portafolio corporativo de TOCAL
 * más los 4 proyectos audiovisuales adicionales registrados en terreno.
 */
export const projects = [
  // ============================================================================
  // 1. PLANTAS INDUSTRIALES Y CENTROS LOGÍSTICOS (industrial-plants)
  // ============================================================================
  {
    id: 'project-001',
    slug: 'planta-tucapel-retiro',
    category: 'industrial-plants',
    featured: true,
    isDemo: false,
    title: {
      es: 'Planta de Recepción de Arroz y Ampliación Galpón Granel — Tucapel S.A.',
      en: 'Rice Reception Plant & Bulk Shed Expansion — Tucapel S.A.',
    },
    shortDescription: {
      es: 'Construcción de planta de recepción de arroz, ampliación de nave de acopio a granel y obras exteriores en Retiro.',
      en: 'Construction of rice reception plant, bulk storage shed expansion, and exterior works in Retiro.',
    },
    description: {
      es: 'Proyecto industrial ejecutado para Tucapel S.A. en la comuna de Retiro. Contempló el desarrollo de obras civiles, fundaciones de alta exigencia, montaje estructural para la planta de recepción de arroz y ampliación del galpón de granel, alcanzando 7.190 m² construidos y 3.500 m² de urbanización y pavimentos exteriores.',
      en: 'Industrial project executed for Tucapel S.A. in Retiro. Covered civil works, heavy-duty foundations, structural assembly for the rice reception plant, and bulk storage shed expansion, totaling 7,190 m² built and 3,500 m² of exterior paving and site works.',
    },
    client: 'Tucapel S.A.',
    workType: {
      es: 'Planta de recepción y ampliación de nave industrial',
      en: 'Reception plant and industrial shed expansion',
    },
    location: 'Retiro, Región del Maule',
    builtSurface: '7.190 m²',
    exteriorSurface: '3.500 m²',
    year: null,
    coverImage: '/images/projects/planta-tucapel-retiro/cover.webp',
    images: [
      {
        src: '/images/projects/planta-tucapel-retiro/image-01.webp',
        caption: {
          es: 'Vista aérea general de la planta Tucapel S.A. en Retiro',
          en: 'General aerial view of the Tucapel S.A. plant in Retiro',
        },
      },
      {
        src: '/images/projects/planta-tucapel-retiro/image-02.webp',
        caption: {
          es: 'Nave de almacenamiento a granel y patios de maniobra',
          en: 'Bulk storage building and maneuvering yards',
        },
      },
      {
        src: '/images/projects/planta-tucapel-retiro/image-03.webp',
        caption: {
          es: 'Infraestructura de recepción y silos de proceso',
          en: 'Reception infrastructure and processing silos',
        },
      },
      {
        src: '/images/projects/planta-tucapel-retiro/image-04.webp',
        caption: {
          es: 'Vista panorámica del complejo agroindustrial',
          en: 'Panoramic view of the agro-industrial complex',
        },
      },
    ],
    videos: [
      {
        src: getSupabaseVideoUrl('tucapel-retiro.mp4'),
        title: {
          es: 'Recorrido aéreo en dron — Planta Tucapel Retiro',
          en: 'Drone aerial tour — Tucapel Retiro Plant',
        },
      },
    ],
  },
  {
    id: 'project-002',
    slug: 'planta-avomex-quillota',
    category: 'industrial-plants',
    featured: true,
    isDemo: false,
    title: {
      es: 'Planta Procesadora de Paltas — Avomex S.A.',
      en: 'Avocado Processing Plant — Avomex S.A.',
    },
    shortDescription: {
      es: 'Construcción de planta de procesamiento agroindustrial de 7.800 m² y 10.000 m² de obras exteriores en Quillota.',
      en: 'Construction of a 7,800 m² agro-industrial processing plant and 10,000 m² of exterior works in Quillota.',
    },
    description: {
      es: 'Ejecución integral de la planta procesadora de paltas para Avomex S.A. en Quillota. El proyecto abarcó 7.800 m² de edificación industrial para líneas de proceso, áreas frigoríficas y servicios, junto con 10.000 m² de pavimentación exterior, andenes de carga y urbanización industrial.',
      en: 'Full execution of the avocado processing plant for Avomex S.A. in Quillota. The project encompassed 7,800 m² of industrial building for processing lines, cold storage, and support areas, alongside 10,000 m² of exterior paving, loading docks, and industrial site works.',
    },
    client: 'Avomex S.A.',
    workType: {
      es: 'Construcción de planta de procesamiento y obras exteriores',
      en: 'Processing plant construction and exterior works',
    },
    location: 'Quillota, Región de Valparaíso',
    builtSurface: '7.800 m²',
    exteriorSurface: '10.000 m²',
    year: null,
    coverImage: '/images/projects/planta-avomex-quillota/cover.webp',
    images: [
      {
        src: '/images/projects/planta-avomex-quillota/image-01.webp',
        caption: {
          es: 'Fachada y patios operativos de Planta Avomex S.A.',
          en: 'Facade and operational yards of Avomex S.A. Plant',
        },
      },
      '/images/projects/planta-avomex-quillota/image-02.webp',
      '/images/projects/planta-avomex-quillota/image-03.webp',
      '/images/projects/planta-avomex-quillota/image-04.webp',
    ],
    videos: [],
  },
  {
    id: 'project-003',
    slug: 'packing-ranco-cherries-rancagua',
    category: 'industrial-plants',
    featured: false,
    isDemo: false,
    title: {
      es: 'Ampliación Planta de Packing — Ranco Cherries S.A.',
      en: 'Packing Plant Expansion — Ranco Cherries S.A.',
    },
    shortDescription: {
      es: 'Ampliación de nave de packing agroindustrial de 7.540 m² construidos y 13.500 m² de obras exteriores en Rancagua.',
      en: 'Agro-industrial packing plant expansion with 7,540 m² built and 13,500 m² of exterior works in Rancagua.',
    },
    description: {
      es: 'Proyecto de ampliación de planta de packing ejecutado para Ranco Cherries S.A. en Rancagua. Contempló la construcción de 7.540 m² de naves de proceso y embalaje de alta capacidad, además de 13.500 m² de patios logísticos, pavimentos para tránsito pesado y obras civiles asociadas.',
      en: 'Packing plant expansion project executed for Ranco Cherries S.A. in Rancagua. Included the construction of 7,540 m² of high-capacity processing and packaging halls, plus 13,500 m² of logistics yards, heavy-traffic pavements, and associated civil works.',
    },
    client: 'Ranco Cherries S.A.',
    workType: {
      es: 'Ampliación de planta de packing y urbanización industrial',
      en: 'Packing plant expansion and industrial site development',
    },
    location: 'Rancagua, Región de O’Higgins',
    builtSurface: '7.540 m²',
    exteriorSurface: '13.500 m²',
    year: null,
    coverImage: '/images/projects/packing-ranco-cherries-rancagua/cover.webp',
    images: [
      '/images/projects/packing-ranco-cherries-rancagua/image-01.webp',
      '/images/projects/packing-ranco-cherries-rancagua/image-02.webp',
      '/images/projects/packing-ranco-cherries-rancagua/image-03.webp',
    ],
    videos: [],
  },
  {
    id: 'project-004',
    slug: 'planta-sopraval-la-calera',
    category: 'industrial-plants',
    featured: false,
    isDemo: false,
    title: {
      es: 'Planta de Procesamiento — Sopraval S.A.',
      en: 'Processing Plant — Sopraval S.A.',
    },
    shortDescription: {
      es: 'Ejecución de instalaciones de planta de proceso de 1.600 m² y 2.000 m² de obras exteriores en La Calera.',
      en: 'Execution of 1,600 m² processing plant facilities and 2,000 m² of exterior works in La Calera.',
    },
    description: {
      es: 'Desarrollo de obras civiles y edificación industrial para la planta de procesamiento de Sopraval S.A. en La Calera, cumpliendo exigentes estándares sanitarios, de seguridad operacional y continuidad productiva.',
      en: 'Civil works and industrial building construction for Sopraval S.A.’s processing plant in La Calera, meeting strict sanitary, operational safety, and production continuity standards.',
    },
    client: 'Sopraval S.A.',
    workType: {
      es: 'Planta de procesamiento industrial y obras exteriores',
      en: 'Industrial processing plant and exterior works',
    },
    location: 'La Calera, Región de Valparaíso',
    builtSurface: '1.600 m²',
    exteriorSurface: '2.000 m²',
    year: null,
    coverImage: '/images/projects/planta-sopraval-la-calera/cover.webp',
    images: [
      '/images/projects/planta-sopraval-la-calera/image-01.webp',
      '/images/projects/planta-sopraval-la-calera/image-02.webp',
      '/images/projects/planta-sopraval-la-calera/image-03.webp',
    ],
    videos: [],
  },
  {
    id: 'project-005',
    slug: 'planta-southam-freeze-dry-buin',
    category: 'industrial-plants',
    featured: false,
    isDemo: false,
    title: {
      es: 'Planta de Procesamiento de Liofilizados — Southam Freeze-Dry',
      en: 'Lyophilized Processing Plant — Southam Freeze-Dry',
    },
    shortDescription: {
      es: 'Construcción de planta industrial especializada en procesos de liofilizado con 3.700 m² edificados en Buin.',
      en: 'Construction of a specialized freeze-drying industrial plant with 3,700 m² built in Buin.',
    },
    description: {
      es: 'Obra industrial para Southam Freeze-Dry en la comuna de Buin. Consideró 3.700 m² de construcción especializada para procesos de liofilización alimentaria, integrando fundaciones técnicas, estructura metálica, envolvente térmica y recintos de proceso controlado.',
      en: 'Industrial facility built for Southam Freeze-Dry in Buin. Encompassed 3,700 m² of specialized construction for food freeze-drying processes, integrating technical foundations, steel structure, thermal cladding, and controlled-environment processing rooms.',
    },
    client: 'Southam Freeze-Dry',
    workType: {
      es: 'Planta industrial de procesamiento liofilizado',
      en: 'Lyophilized food processing industrial plant',
    },
    location: 'Buin, Región Metropolitana',
    builtSurface: '3.700 m²',
    exteriorSurface: null,
    year: null,
    coverImage: '/images/projects/planta-southam-freeze-dry-buin/cover.webp',
    images: [
      '/images/projects/planta-southam-freeze-dry-buin/image-01.webp',
      '/images/projects/planta-southam-freeze-dry-buin/image-02.webp',
    ],
    videos: [],
  },
  {
    id: 'project-006',
    slug: 'packing-montolin-llay-llay',
    category: 'industrial-plants',
    featured: false,
    isDemo: false,
    title: {
      es: 'Ampliación Planta de Packing — Montolin S.A.',
      en: 'Packing Plant Expansion — Montolin S.A.',
    },
    shortDescription: {
      es: 'Obras de ampliación para planta de packing agroindustrial con 4.200 m² construidos en Llay Llay.',
      en: 'Expansion works for an agro-industrial packing plant with 4,200 m² built in Llay Llay.',
    },
    description: {
      es: 'Ejecución de proyecto de ampliación para la planta de packing de Montolin S.A. en Llay Llay, incorporando 4.200 m² de infraestructura productiva, radieres de alta resistencia y naves de procesamiento.',
      en: 'Expansion project executed for Montolin S.A.’s packing facility in Llay Llay, adding 4,200 m² of productive infrastructure, heavy-duty concrete slabs, and processing halls.',
    },
    client: 'Montolin S.A.',
    workType: {
      es: 'Ampliación de planta de packing',
      en: 'Packing plant expansion',
    },
    location: 'Llay Llay, Región de Valparaíso',
    builtSurface: '4.200 m²',
    exteriorSurface: null,
    year: null,
    coverImage: '/images/projects/packing-montolin-llay-llay/cover.webp',
    images: [
      '/images/projects/packing-montolin-llay-llay/image-01.webp',
      '/images/projects/packing-montolin-llay-llay/image-02.webp',
      '/images/projects/packing-montolin-llay-llay/image-03.webp',
    ],
    videos: [],
  },
  {
    id: 'project-007',
    slug: 'bodega-megarent-linares',
    category: 'industrial-plants',
    featured: false,
    isDemo: false,
    title: {
      es: 'Centro de Bodegaje Industrial — Comercial Megarent Ltda.',
      en: 'Industrial Warehouse Facility — Comercial Megarent Ltda.',
    },
    shortDescription: {
      es: 'Construcción de nave de bodegaje y centro logístico de 4.500 m² en la ciudad de Linares.',
      en: 'Construction of a 4,500 m² storage warehouse and logistics center in Linares.',
    },
    description: {
      es: 'Desarrollo y construcción de infraestructura de almacenamiento de 4.500 m² para Comercial Megarent Ltda. en Linares. Incluye estructura metálica de grandes luces, radieres industriales, cubiertas y patios de carga y maniobra.',
      en: 'Development and construction of a 4,500 m² warehouse facility for Comercial Megarent Ltda. in Linares. Features wide-span steel structures, industrial floor slabs, roofing, and loading/maneuvering yards.',
    },
    client: 'Comercial Megarent Ltda.',
    workType: {
      es: 'Nave de bodegaje e infraestructura logística',
      en: 'Storage warehouse and logistics infrastructure',
    },
    location: 'Linares, Región del Maule',
    builtSurface: '4.500 m²',
    exteriorSurface: null,
    year: null,
    coverImage: '/images/projects/bodega-megarent-linares/cover.webp',
    images: [
      '/images/projects/bodega-megarent-linares/image-01.webp',
      '/images/projects/bodega-megarent-linares/image-02.webp',
      '/images/projects/bodega-megarent-linares/image-03.webp',
    ],
    videos: [
      {
        src: getSupabaseVideoUrl('bodega-megarent.mp4'),
        title: {
          es: 'Vista aérea en dron — Bodega Comercial Megarent',
          en: 'Drone aerial view — Comercial Megarent Warehouse',
        },
      },
    ],
  },
  {
    id: 'project-008',
    slug: 'bodega-bodegaas-linares',
    category: 'industrial-plants',
    featured: false,
    isDemo: false,
    title: {
      es: 'Complejo de Bodegas Industriales — Comercial Bodegaas Ltda.',
      en: 'Industrial Warehouse Complex — Comercial Bodegaas Ltda.',
    },
    shortDescription: {
      es: 'Ejecución de complejo de bodegaje industrial de 5.000 m² construidos en Linares.',
      en: 'Execution of a 5,000 m² industrial warehouse complex in Linares.',
    },
    description: {
      es: 'Construcción de 5.000 m² de naves de almacenamiento para Comercial Bodegaas Ltda. en Linares, contemplando obras civiles, fundaciones, montaje estructural, revestimientos industriales y accesos para transporte de carga.',
      en: 'Construction of 5,000 m² of storage warehouses for Comercial Bodegaas Ltda. in Linares, covering civil works, foundations, structural assembly, industrial cladding, and freight access roads.',
    },
    client: 'Comercial Bodegaas Ltda.',
    workType: {
      es: 'Construcción de bodegas industriales',
      en: 'Industrial warehouse construction',
    },
    location: 'Linares, Región del Maule',
    builtSurface: '5.000 m²',
    exteriorSurface: null,
    year: null,
    coverImage: '/images/projects/bodega-bodegaas-linares/cover.webp',
    images: [
      '/images/projects/bodega-bodegaas-linares/image-01.webp',
      '/images/projects/bodega-bodegaas-linares/image-02.webp',
      '/images/projects/bodega-bodegaas-linares/image-03.webp',
    ],
    videos: [
      {
        src: getSupabaseVideoUrl('bodega-bodegaas.mp4'),
        title: {
          es: 'Recorrido aéreo en dron — Comercial Bodegaas Linares',
          en: 'Drone aerial tour — Comercial Bodegaas Linares',
        },
      },
    ],
  },
  {
    id: 'project-009',
    slug: 'bodega-condores-cabrero',
    category: 'industrial-plants',
    featured: false,
    isDemo: false,
    title: {
      es: 'Bodega Industrial Cóndores — Cabrero',
      en: 'Cóndores Industrial Warehouse — Cabrero',
    },
    shortDescription: {
      es: 'Construcción de nave de almacenamiento industrial de 2.000 m² para Cóndores Ltda. en Cabrero.',
      en: 'Construction of a 2,000 m² industrial storage warehouse for Cóndores Ltda. in Cabrero.',
    },
    description: {
      es: 'Proyecto de edificación de nave de bodegaje industrial de 2.000 m² ejecutado para Cóndores Ltda. en la comuna de Cabrero, integrando obras civiles, radieres de hormigón y estructura metálica.',
      en: '2,000 m² industrial storage warehouse building executed for Cóndores Ltda. in Cabrero, integrating civil works, concrete floor slabs, and steel framing.',
    },
    client: 'Cóndores Ltda.',
    workType: {
      es: 'Bodega industrial y obras civiles',
      en: 'Industrial warehouse and civil works',
    },
    location: 'Cabrero, Región del Biobío',
    builtSurface: '2.000 m²',
    exteriorSurface: null,
    year: null,
    coverImage: '/images/projects/bodega-condores-cabrero/cover.webp',
    images: [
      '/images/projects/bodega-condores-cabrero/image-01.webp',
      '/images/projects/bodega-condores-cabrero/image-02.webp',
      '/images/projects/bodega-condores-cabrero/image-03.webp',
    ],
    videos: [],
  },

  // ============================================================================
  // 2. COMBUSTIBLES / ESTACIONES DE SERVICIO (fuels)
  // ============================================================================
  {
    id: 'project-010',
    slug: 'copec-chillan',
    category: 'fuels',
    featured: true,
    isDemo: false,
    title: {
      es: 'Estación de Servicio Copec Chillán',
      en: 'Copec Service Station — Chillán',
    },
    shortDescription: {
      es: 'Construcción de estación de servicio Copec con 900 m² edificados y 9.000 m² de pavimentos y obras exteriores en Chillán.',
      en: 'Construction of Copec service station with 900 m² built and 9,000 m² of paving and exterior works in Chillán.',
    },
    description: {
      es: 'Ejecución integral de estación de servicio para Copec S.A. en Chillán, Región de Ñuble. Contempló 900 m² de edificación comercial y marquesinas, junto con 9.000 m² de pavimentación rígida para tránsito pesado, islas de carga y urbanización.',
      en: 'Full execution of a service station for Copec S.A. in Chillán, Ñuble Region. Included 900 m² of commercial building and canopies, along with 9,000 m² of heavy-duty rigid concrete paving, fueling islands, and site works.',
    },
    client: 'Copec S.A.',
    workType: {
      es: 'Estación de servicio, obras civiles y pavimentación',
      en: 'Service station, civil works, and paving',
    },
    location: 'Chillán, Región de Ñuble',
    builtSurface: '900 m²',
    exteriorSurface: '9.000 m²',
    year: null,
    coverImage: '/images/projects/copec-chillan/cover.webp',
    images: [
      {
        src: '/images/projects/copec-chillan/image-01.webp',
        caption: {
          es: 'Vista general de Estación de Servicio Copec Chillán',
          en: 'General view of Copec Chillán Service Station',
        },
      },
      '/images/projects/copec-chillan/image-02.webp',
      '/images/projects/copec-chillan/image-03.webp',
    ],
    videos: [
      {
        src: getSupabaseVideoUrl('copec-chillan.mp4'),
        title: {
          es: 'Recorrido aéreo en dron — Estación de Servicio Copec Chillán',
          en: 'Drone aerial tour — Copec Chillán Service Station',
        },
      },
    ],
  },
  {
    id: 'project-011',
    slug: 'shell-enex-san-carlos',
    category: 'fuels',
    featured: false,
    isDemo: false,
    title: {
      es: 'Estación de Servicio Shell (ENEX) — San Carlos',
      en: 'Shell (ENEX) Service Station — San Carlos',
    },
    shortDescription: {
      es: 'Complejo de abastecimiento de combustibles en ruta con 900 m² construidos y 37.000 m² de explanada y obras exteriores.',
      en: 'Highway fuel supply complex with 900 m² built and 37,000 m² of apron and exterior works.',
    },
    description: {
      es: 'Construcción de estación de servicio y centro de atención en ruta para ENEX S.A. (Shell) en San Carlos, Región de Ñuble. Destaca por su gran envergadura exterior con 37.000 m² de obras civiles, pistas de desaceleración, estacionamientos de alto tonelaje y 900 m² edificados.',
      en: 'Construction of a highway service station and customer complex for ENEX S.A. (Shell) in San Carlos, Ñuble Region. Stands out for its extensive 37,000 m² exterior civil works, deceleration lanes, heavy-truck parking areas, and 900 m² of buildings.',
    },
    client: 'ENEX S.A.',
    workType: {
      es: 'Estación de servicio en ruta y urbanización de gran escala',
      en: 'Highway service station and large-scale site development',
    },
    location: 'San Carlos, Región de Ñuble',
    builtSurface: '900 m²',
    exteriorSurface: '37.000 m²',
    year: null,
    coverImage: '/images/projects/shell-enex-san-carlos/cover.webp',
    images: [
      '/images/projects/shell-enex-san-carlos/image-01.webp',
      '/images/projects/shell-enex-san-carlos/image-02.webp',
    ],
    videos: [
      {
        src: getSupabaseVideoUrl('shell-san-carlos.mp4'),
        title: {
          es: 'Recorrido aéreo en dron — Estación Shell San Carlos',
          en: 'Drone aerial tour — Shell San Carlos Service Station',
        },
      },
    ],
  },
  {
    id: 'project-012',
    slug: 'copec-chicureo-colina',
    category: 'fuels',
    featured: false,
    isDemo: false,
    title: {
      es: 'Estación de Servicio Copec Chicureo — Colina',
      en: 'Copec Service Station — Chicureo, Colina',
    },
    shortDescription: {
      es: 'Construcción de estación de servicio, tienda de conveniencia y 2.500 m² de obras exteriores en Chicureo.',
      en: 'Construction of service station, convenience store, and 2,500 m² of exterior works in Chicureo.',
    },
    description: {
      es: 'Proyecto ejecutado para Copec S.A. en el sector de Chicureo, comuna de Colina. Consideró 500 m² de edificación comercial, marquesina e islas de expendio, más 2.500 m² de pavimentos rígidos, accesos vehiculares y paisajismo.',
      en: 'Project executed for Copec S.A. in Chicureo, Colina. Included 500 m² of commercial building, canopy, and dispenser islands, plus 2,500 m² of rigid pavements, vehicular access, and landscaping.',
    },
    client: 'Copec S.A.',
    workType: {
      es: 'Estación de servicio, tienda comercial y obras exteriores',
      en: 'Service station, retail store, and exterior works',
    },
    location: 'Chicureo, Colina, Región Metropolitana',
    builtSurface: '500 m²',
    exteriorSurface: '2.500 m²',
    year: null,
    coverImage: '/images/projects/copec-chicureo-colina/cover.webp',
    images: [
      '/images/projects/copec-chicureo-colina/image-01.webp',
      '/images/projects/copec-chicureo-colina/image-02.webp',
      '/images/projects/copec-chicureo-colina/image-03.webp',
    ],
    videos: [],
  },
  {
    id: 'project-013',
    slug: 'copec-horcones',
    category: 'fuels',
    featured: false,
    isDemo: false,
    title: {
      es: 'Estación de Servicio Copec Horcones',
      en: 'Copec Service Station — Horcones',
    },
    shortDescription: {
      es: 'Obras civiles e infraestructura de abastecimiento con 900 m² construidos y 15.000 m² de explanada exterior en Horcones.',
      en: 'Civil works and fueling infrastructure with 900 m² built and 15,000 m² of exterior apron in Horcones.',
    },
    description: {
      es: 'Construcción de estación de servicio Copec en el sector de Horcones. El alcance contempló 900 m² de edificación y estructuras de cubierta, junto a 15.000 m² de pavimentación de alto tráfico y obras civiles exteriores.',
      en: 'Construction of Copec service station in Horcones. Scope covered 900 m² of buildings and canopy structures alongside 15,000 m² of heavy-traffic paving and exterior civil works.',
    },
    client: 'Copec S.A.',
    workType: {
      es: 'Estación de servicio y pavimentación de alto tonelaje',
      en: 'Service station and heavy-duty paving',
    },
    location: 'Horcones, Región del Biobío',
    builtSurface: '900 m²',
    exteriorSurface: '15.000 m²',
    year: null,
    coverImage: '/images/projects/copec-horcones/cover.webp',
    images: ['/images/projects/copec-horcones/image-01.webp'],
    videos: [],
  },
  {
    id: 'project-014',
    slug: 'copec-concon',
    category: 'fuels',
    featured: false,
    isDemo: false,
    title: {
      es: 'Estación de Servicio Copec Concón',
      en: 'Copec Service Station — Concón',
    },
    shortDescription: {
      es: 'Construcción y habilitación de estación de servicio con 300 m² edificados y 3.000 m² de obras exteriores en Concón.',
      en: 'Construction and fit-out of service station with 300 m² built and 3,000 m² of exterior works in Concón.',
    },
    description: {
      es: 'Ejecución de estación de servicio para Copec S.A. en la comuna de Concón, contemplando 300 m² de edificación comercial, marquesina de carga y 3.000 m² de pavimentos y obras civiles exteriores.',
      en: 'Execution of a service station for Copec S.A. in Concón, encompassing 300 m² of commercial building, fueling canopy, and 3,000 m² of pavements and exterior civil works.',
    },
    client: 'Copec S.A.',
    workType: {
      es: 'Estación de servicio y obras civiles',
      en: 'Service station and civil works',
    },
    location: 'Concón, Región de Valparaíso',
    builtSurface: '300 m²',
    exteriorSurface: '3.000 m²',
    year: null,
    coverImage: '/images/projects/copec-concon/cover.webp',
    images: ['/images/projects/copec-concon/image-01.webp'],
    videos: [],
  },
  {
    id: 'project-015',
    slug: 'shell-la-cantera-coquimbo',
    category: 'fuels',
    featured: false,
    isDemo: false,
    title: {
      es: 'Estación de Servicio Shell La Cantera — Coquimbo',
      en: 'Shell Service Station — La Cantera, Coquimbo',
    },
    shortDescription: {
      es: 'Desarrollo de estación de servicio con 200 m² edificados y 4.000 m² de pavimentación y obras exteriores en Coquimbo.',
      en: 'Service station development with 200 m² built and 4,000 m² of paving and exterior works in Coquimbo.',
    },
    description: {
      es: 'Proyecto de infraestructura de combustibles ejecutado para Inversiones La Cantera SpA en Coquimbo. Contempló 200 m² de edificación de servicios y 4.000 m² de obras exteriores, islas de expendio, marquesina y accesos viales.',
      en: 'Fuel infrastructure project executed for Inversiones La Cantera SpA in Coquimbo. Included 200 m² of service buildings and 4,000 m² of exterior works, dispenser islands, canopy, and road access.',
    },
    client: 'Inversiones La Cantera SpA',
    workType: {
      es: 'Estación de servicio y urbanización exterior',
      en: 'Service station and exterior site development',
    },
    location: 'La Cantera, Coquimbo',
    builtSurface: '200 m²',
    exteriorSurface: '4.000 m²',
    year: null,
    coverImage: '/images/projects/shell-la-cantera-coquimbo/cover.webp',
    images: [
      '/images/projects/shell-la-cantera-coquimbo/image-01.webp',
      '/images/projects/shell-la-cantera-coquimbo/image-02.webp',
    ],
    videos: [],
  },
  {
    id: 'project-016',
    slug: 'copec-quillon',
    category: 'fuels',
    featured: false,
    isDemo: false,
    title: {
      es: 'Estación de Servicio Copec Quillón',
      en: 'Copec Service Station — Quillón',
    },
    shortDescription: {
      es: 'Construcción de estación de servicio, áreas de autolavado, tienda de conveniencia y urbanización exterior en Quillón.',
      en: 'Construction of service station, car wash bays, convenience store, and exterior landscaping in Quillón.',
    },
    description: {
      es: 'Obra de infraestructura de combustibles ejecutada por TOCAL para Copec en la comuna de Quillón, Región de Ñuble. Incluye marquesina de islas de carga, tienda de atención, módulos de autolavado, pavimentos rígidos y paisajismo sustentable.',
      en: 'Fuel infrastructure project executed by TOCAL for Copec in Quillón, Ñuble Region. Features fueling canopy islands, customer store, self-service car wash bays, rigid concrete pavements, and sustainable landscaping.',
    },
    client: 'Copec S.A.',
    workType: {
      es: 'Estación de servicio, obras civiles y urbanización',
      en: 'Service station, civil works, and site development',
    },
    location: 'Quillón, Región de Ñuble',
    builtSurface: null,
    exteriorSurface: null,
    year: null,
    coverImage: '/images/projects/copec-quillon/cover.webp',
    images: [
      '/images/projects/copec-quillon/image-01.webp',
      '/images/projects/copec-quillon/image-02.webp',
      '/images/projects/copec-quillon/image-03.webp',
    ],
    videos: [
      {
        src: getSupabaseVideoUrl('copec-quillon.mp4'),
        title: {
          es: 'Recorrido aéreo en dron — Copec Quillón',
          en: 'Drone aerial tour — Copec Quillón',
        },
      },
    ],
  },
  {
    id: 'project-017',
    slug: 'copec-sagrada-familia',
    category: 'fuels',
    featured: false,
    isDemo: false,
    title: {
      es: 'Estación de Servicio Copec Sagrada Familia',
      en: 'Copec Service Station — Sagrada Familia',
    },
    shortDescription: {
      es: 'Ejecución de obras civiles, marquesina, islas de carga y pavimentación para estación de servicio Copec.',
      en: 'Execution of civil works, canopy, fueling islands, and paving for Copec service station.',
    },
    description: {
      es: 'Desarrollo de estación de servicio Copec en Sagrada Familia, Región del Maule, abarcando obras civiles, estructura de marquesina, edificio de servicios, pistas de circulación vehicular y obras exteriores.',
      en: 'Development of Copec service station in Sagrada Familia, Maule Region, covering civil works, canopy structure, service building, vehicular lanes, and exterior works.',
    },
    client: 'Copec S.A.',
    workType: {
      es: 'Estación de servicio y obras civiles',
      en: 'Service station and civil works',
    },
    location: 'Sagrada Familia, Región del Maule',
    builtSurface: null,
    exteriorSurface: null,
    year: null,
    coverImage: '/images/projects/copec-sagrada-familia/cover.webp',
    images: [
      '/images/projects/copec-sagrada-familia/image-01.webp',
      '/images/projects/copec-sagrada-familia/image-02.webp',
      '/images/projects/copec-sagrada-familia/image-03.webp',
    ],
    videos: [
      {
        src: getSupabaseVideoUrl('copec-sagrada-familia.mp4'),
        title: {
          es: 'Recorrido aéreo en dron — Copec Sagrada Familia',
          en: 'Drone aerial tour — Copec Sagrada Familia',
        },
      },
    ],
  },

  // ============================================================================
  // 3. CENTROS COMERCIALES Y EQUIPAMIENTO INSTITUCIONAL (shopping-centers)
  // ============================================================================
  {
    id: 'project-018',
    slug: 'strip-center-puerto-tepual-talca',
    category: 'shopping-centers',
    featured: true,
    isDemo: false,
    title: {
      es: 'Strip Center Puerto Tepual — Talca',
      en: 'Puerto Tepual Strip Center — Talca',
    },
    shortDescription: {
      es: 'Construcción de centro comercial de 2.300 m² edificados y 2.200 m² de estacionamientos y obras exteriores en Talca.',
      en: 'Construction of a 2,300 m² shopping center and 2,200 m² of parking and exterior works in Talca.',
    },
    description: {
      es: 'Proyecto de edificación comercial desarrollado para Inversiones Inmobiliarias Comerciales S.A. en Talca. Consideró 2.300 m² construidos para locales comerciales y de servicios, más 2.200 m² de obras exteriores, accesos y estacionamientos.',
      en: 'Commercial building project developed for Inversiones Inmobiliarias Comerciales S.A. in Talca. Included 2,300 m² built for retail and service units, plus 2,200 m² of exterior works, access roads, and parking areas.',
    },
    client: 'Inv. Inmobiliarias Comerciales S.A.',
    workType: {
      es: 'Edificación de strip center y urbanización comercial',
      en: 'Strip center construction and commercial site works',
    },
    location: 'Talca, Región del Maule',
    builtSurface: '2.300 m²',
    exteriorSurface: '2.200 m²',
    year: null,
    coverImage: '/images/projects/strip-center-puerto-tepual-talca/cover.webp',
    images: [
      '/images/projects/strip-center-puerto-tepual-talca/image-01.webp',
      '/images/projects/strip-center-puerto-tepual-talca/image-02.webp',
      '/images/projects/strip-center-puerto-tepual-talca/image-03.webp',
    ],
    videos: [],
  },
  {
    id: 'project-019',
    slug: 'strip-center-puerto-talca',
    category: 'shopping-centers',
    featured: false,
    isDemo: false,
    title: {
      es: 'Strip Center Puerto Talca',
      en: 'Puerto Talca Strip Center',
    },
    shortDescription: {
      es: 'Desarrollo de equipamiento comercial de 1.500 m² construidos y 2.500 m² de obras exteriores en Talca.',
      en: 'Commercial facility development with 1,500 m² built and 2,500 m² of exterior works in Talca.',
    },
    description: {
      es: 'Construcción del Strip Center Puerto Talca para Inversiones Inmobiliarias Comerciales S.A., integrando 1.500 m² de módulos comerciales de moderna arquitectura y 2.500 m² de explanadas peatonales y estacionamientos.',
      en: 'Construction of the Puerto Talca Strip Center for Inversiones Inmobiliarias Comerciales S.A., integrating 1,500 m² of modern retail modules and 2,500 m² of pedestrian plazas and parking lots.',
    },
    client: 'Inv. Inmobiliarias Comerciales S.A.',
    workType: {
      es: 'Construcción de strip center y obras exteriores',
      en: 'Strip center construction and exterior works',
    },
    location: 'Talca, Región del Maule',
    builtSurface: '1.500 m²',
    exteriorSurface: '2.500 m²',
    year: null,
    coverImage: '/images/projects/strip-center-puerto-talca/cover.webp',
    images: [
      '/images/projects/strip-center-puerto-talca/image-01.webp',
      '/images/projects/strip-center-puerto-talca/image-02.webp',
    ],
    videos: [],
  },
  {
    id: 'project-020',
    slug: 'unimarc-talca',
    category: 'shopping-centers',
    featured: false,
    isDemo: false,
    title: {
      es: 'Supermercado Unimarc y Equipamiento Comercial — Talca',
      en: 'Unimarc Supermarket & Commercial Facility — Talca',
    },
    shortDescription: {
      es: 'Construcción y habilitación de sala de ventas de supermercado, locales comerciales y estacionamientos en Talca.',
      en: 'Construction and fit-out of supermarket sales hall, retail units, and parking areas in Talca.',
    },
    description: {
      es: 'Obra de infraestructura comercial ejecutada en la ciudad de Talca para sala de supermercado Unimarc y servicios asociados, incluyendo edificación principal, fachadas comerciales, estacionamientos en superficie y accesos viales.',
      en: 'Commercial infrastructure project executed in Talca for a Unimarc supermarket and associated retail services, including main building construction, commercial facades, surface parking, and road access.',
    },
    client: 'SMU / Unimarc',
    workType: {
      es: 'Edificación comercial, supermercado y obras exteriores',
      en: 'Commercial building, supermarket, and exterior works',
    },
    location: 'Talca, Región del Maule',
    builtSurface: null,
    exteriorSurface: null,
    year: null,
    coverImage: '/images/projects/unimarc-talca/cover.webp',
    images: [
      '/images/projects/unimarc-talca/image-01.webp',
      '/images/projects/unimarc-talca/image-02.webp',
      '/images/projects/unimarc-talca/image-03.webp',
    ],
    videos: [
      {
        src: getSupabaseVideoUrl('unimarc-talca.mp4'),
        title: {
          es: 'Recorrido aéreo en dron — Unimarc Talca',
          en: 'Drone aerial tour — Unimarc Talca',
        },
      },
    ],
  },
  {
    id: 'project-021',
    slug: 'colegio-ingles-talca',
    category: 'shopping-centers',
    featured: false,
    isDemo: false,
    title: {
      es: 'Infraestructura Educacional — Colegio Inglés de Talca',
      en: 'Educational Infrastructure — Colegio Inglés de Talca',
    },
    shortDescription: {
      es: 'Construcción de pabellones de salas de clases, sala de música y salón de conferencias para el Colegio Inglés de Talca.',
      en: 'Construction of classroom pavilions, music hall, and conference auditorium for Colegio Inglés de Talca.',
    },
    description: {
      es: 'Desarrollo de equipamiento educacional de alto estándar para el Colegio Inglés de Talca. El proyecto contempló la construcción y habilitación de nuevos pabellones de salas de clases, edificio especializado para sala de música con acondicionamiento acústico, salón de conferencias y áreas exteriores de esparcimiento.',
      en: 'High-standard educational facility development for Colegio Inglés de Talca. The project included the construction and fit-out of new classroom pavilions, a specialized acoustically treated music building, a conference auditorium, and outdoor recreational areas.',
    },
    client: 'Colegio Inglés de Talca',
    workType: {
      es: 'Edificación educacional, salón de conferencias y sala de música',
      en: 'Educational buildings, conference hall, and music facility',
    },
    location: 'Talca, Región del Maule',
    builtSurface: null,
    exteriorSurface: null,
    year: null,
    coverImage: '/images/projects/colegio-ingles-talca/cover.webp',
    images: [
      {
        src: '/images/projects/colegio-ingles-talca/image-01.webp',
        caption: {
          es: 'Salón de conferencias y áreas exteriores — Colegio Inglés de Talca',
          en: 'Conference auditorium and outdoor areas — Colegio Inglés de Talca',
        },
      },
      {
        src: '/images/projects/colegio-ingles-talca/image-02.webp',
        caption: {
          es: 'Edificio de Sala de Música — Colegio Inglés de Talca',
          en: 'Music Hall building — Colegio Inglés de Talca',
        },
      },
      {
        src: '/images/projects/colegio-ingles-talca/image-03.webp',
        caption: {
          es: 'Pabellón de salas de clases — Colegio Inglés de Talca',
          en: 'Classroom pavilion — Colegio Inglés de Talca',
        },
      },
    ],
    videos: [
      {
        src: getSupabaseVideoUrl('colegio-ingles-conferencias.mp4'),
        title: {
          es: 'Video 1: Salón de Conferencias — Colegio Inglés de Talca',
          en: 'Video 1: Conference Hall — Colegio Inglés de Talca',
        },
      },
      {
        src: getSupabaseVideoUrl('colegio-ingles-musica.mp4'),
        title: {
          es: 'Video 2: Sala de Música — Colegio Inglés de Talca',
          en: 'Video 2: Music Hall — Colegio Inglés de Talca',
        },
      },
      {
        src: getSupabaseVideoUrl('colegio-ingles-salas.mp4'),
        title: {
          es: 'Video 3: Pabellón de Salas — Colegio Inglés de Talca',
          en: 'Video 3: Classrooms Pavilion — Colegio Inglés de Talca',
        },
      },
    ],
  },
  {
    id: 'project-022',
    slug: 'casa-de-moneda-chile',
    category: 'shopping-centers',
    featured: false,
    isDemo: false,
    title: {
      es: 'Remodelación y Bóveda de Billetes — Casa de Moneda de Chile',
      en: 'Remodeling & Banknote Vault — National Mint of Chile',
    },
    shortDescription: {
      es: 'Ejecución de Primera y Segunda Etapa de Remodelación (6.200 m²) y Bóveda de Billetes (800 m²) en Santiago.',
      en: 'Execution of First and Second Remodeling Phases (6,200 m²) and Banknote Vault (800 m²) in Santiago.',
    },
    description: {
      es: 'Proyectos de alta seguridad y remodelación institucional ejecutados para Casa de Moneda de Chile en Santiago: Primera Etapa del Proyecto de Remodelación (1.400 m²), Segunda Etapa del Proyecto de Remodelación (4.800 m²) y construcción de Bóveda de Billetes (800 m²), totalizando 7.000 m² intervenidos bajo estrictos protocolos de seguridad y calidad.',
      en: 'High-security institutional remodeling projects executed for the National Mint of Chile in Santiago: First Phase of the Remodeling Project (1,400 m²), Second Phase of the Remodeling Project (4,800 m²), and construction of the Banknote Vault (800 m²), totaling 7,000 m² executed under strict security and quality protocols.',
    },
    client: 'Casa de Moneda de Chile',
    workType: {
      es: 'Remodelación institucional Fases I y II + Bóveda de alta seguridad',
      en: 'Institutional remodeling Phases I & II + High-security vault',
    },
    location: 'Santiago, Región Metropolitana',
    builtSurface: '7.000 m² (1.400 m² + 4.800 m² + 800 m²)',
    exteriorSurface: null,
    year: null,
    coverImage: '/images/projects/casa-de-moneda-chile/cover.webp',
    images: ['/images/projects/casa-de-moneda-chile/image-01.webp'],
    videos: [],
  },
]
