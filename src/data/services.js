/**
 * Catálogo extensible de áreas de especialización y servicios de TOCAL.
 * Para agregar una nueva categoría de servicio, basta con incorporar un nuevo objeto a este arreglo.
 */
export const servicesData = [
  {
    id: 'fuels',
    slug: 'combustibles',
    number: '01',
    image: '/images/services/fuels.webp',
    imageAlt: {
      es: 'Infraestructura para el sector de combustibles: estaciones de servicio y almacenamiento',
      en: 'Infrastructure for the fuels sector: service stations and storage facilities',
    },
    title: {
      es: 'Combustibles',
      en: 'Fuels Infrastructure',
    },
    shortDescription: {
      es: 'Obras civiles, construcción y habilitación de infraestructura para estaciones de servicio, zonas de carga y proyectos del rubro de combustibles.',
      en: 'Civil works, construction, and infrastructure development for service stations, loading zones, and fuel sector projects.',
    },
    description: {
      es: 'Desarrollamos proyectos de construcción y obras civiles orientados a la infraestructura de combustibles. Nuestro enfoque contempla una ejecución planificada bajo estrictos criterios de seguridad operacional, coordinación de especialidades y cumplimiento de los requerimientos propios del sector.',
      en: 'We execute construction and civil engineering projects tailored to fuel infrastructure. Our approach emphasizes planned execution under strict operational safety criteria, multi-disciplinary coordination, and adherence to sector requirements.',
    },
    highlights: {
      es: [
        'Obras civiles y fundaciones para instalaciones de combustibles',
        'Construcción y remodelación de estaciones de servicio y áreas de atención',
        'Pavimentación, islas de carga, marquesinas y obras exteriores asociadas',
      ],
      en: [
        'Civil works and foundations for fuel facilities',
        'Construction and remodeling of service stations and customer service areas',
        'Paving, dispenser islands, canopies, and associated exterior works',
      ],
    },
  },
  {
    id: 'industrial-plants',
    slug: 'plantas-industriales',
    number: '02',
    image: '/images/services/industrial-plants.webp',
    imageAlt: {
      es: 'Construcción e infraestructura para plantas industriales y centros operacionales',
      en: 'Construction and infrastructure for industrial plants and operational facilities',
    },
    title: {
      es: 'Plantas industriales',
      en: 'Industrial Plants',
    },
    shortDescription: {
      es: 'Desarrollo de obras civiles, estructuras e infraestructura productiva y logística para plantas e instalaciones industriales.',
      en: 'Development of civil works, structures, and productive and logistics infrastructure for industrial plants and facilities.',
    },
    description: {
      es: 'Ejecutamos obras de infraestructura para plantas industriales, centros operacionales e instalaciones productivas. Coordinamos cada etapa constructiva para asegurar la continuidad operativa del mandante, priorizando la seguridad en faena y la durabilidad de las obras.',
      en: 'We build infrastructure for industrial plants, operational centers, and manufacturing facilities. We coordinate every construction phase to support client operational continuity, prioritizing job-site safety and long-term durability.',
    },
    highlights: {
      es: [
        'Naves industriales, galpones y recintos de operación',
        'Obras civiles, radieres, fundaciones y urbanización industrial',
        'Ampliaciones, adecuaciones de planta y patios de maniobra',
      ],
      en: [
        'Industrial buildings, warehouses, and operational enclosures',
        'Civil works, concrete slabs, foundations, and industrial site development',
        'Plant expansions, facility upgrades, and maneuvering yards',
      ],
    },
  },
  {
    id: 'shopping-centers',
    slug: 'centros-comerciales',
    number: '03',
    image: '/images/services/shopping-centers.webp',
    imageAlt: {
      es: 'Construcción e infraestructura para centros comerciales y equipamiento de servicios',
      en: 'Construction and infrastructure for shopping centers and commercial facilities',
    },
    title: {
      es: 'Centros comerciales',
      en: 'Shopping Centers',
    },
    shortDescription: {
      es: 'Construcción, habilitación y obras de infraestructura para centros comerciales, strip centers y espacios de servicios.',
      en: 'Construction, fit-out, and infrastructure works for shopping centers, strip centers, and service spaces.',
    },
    description: {
      es: 'Abordamos proyectos de edificación e infraestructura comercial considerando tanto la calidad arquitectónica y constructiva como la funcionalidad de los espacios para operadores y visitantes. Gestionamos obras nuevas, ampliaciones y habilitaciones comerciales.',
      en: 'We deliver commercial building and infrastructure projects balancing architectural and construction quality with functional spaces for operators and visitors. We manage new builds, expansions, and commercial fit-outs.',
    },
    highlights: {
      es: [
        'Construcción de centros comerciales, strip centers y locales de servicio',
        'Habilitación, remodelación y adecuación de espacios comerciales',
        'Obras exteriores, accesos, estacionamientos y urbanización comercial',
      ],
      en: [
        'Construction of shopping centers, strip centers, and service retail spaces',
        'Commercial space fit-out, remodeling, and adaptation',
        'Exterior works, access roads, parking areas, and commercial site works',
      ],
    },
  },
]
