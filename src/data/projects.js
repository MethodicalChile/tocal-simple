/**
 * Catálogo de proyectos de TOCAL.
 *
 * IMPORTANTE:
 * Los registros actuales corresponden a fichas demostrativas de referencia para validar
 * el funcionamiento de la galería, los filtros por categoría, la ventana modal y el carrusel.
 * No representan obras reales adjudicadas hasta que TOCAL entregue el listado y fotografías definitivas.
 *
 * Para agregar un nuevo proyecto:
 * 1. Copie las fotografías en `public/images/projects/<slug>/`
 * 2. Agregue un nuevo objeto a este arreglo `projects` siguiendo la estructura.
 */
export const projects = [
  {
    id: 'project-001',
    slug: 'estacion-servicio-combustibles-demo',
    category: 'fuels',
    featured: true,
    isDemo: true,
    title: {
      es: 'Estación de Servicio e Infraestructura de Carga (Proyecto Demostrativo)',
      en: 'Service Station & Fueling Infrastructure (Demo Project)',
    },
    shortDescription: {
      es: 'Ficha demostrativa de obras civiles, marquesina, islas de expendio y pavimentación rígida para estación de combustibles.',
      en: 'Demo record showcasing civil works, canopy structure, dispenser islands, and rigid paving for a fuel service station.',
    },
    description: {
      es: 'Proyecto referencial de demostración para el área de Combustibles. Contempla la ejecución de obras civiles, fundaciones para estructuras de marquesina, islas de carga, pavimentos de hormigón para tránsito pesado y obras de urbanización exterior. Este registro será reemplazado por la información técnica y fotográfica definitiva de TOCAL.',
      en: 'Referential demonstration project for the Fuels sector. Covers the execution of civil works, canopy structure foundations, fueling islands, heavy-duty concrete pavements, and exterior site development. This record will be replaced with TOCAL’s final technical and photographic documentation.',
    },
    workType: {
      es: 'Obras civiles, estructura de marquesina y pavimentación (Referencial)',
      en: 'Civil works, canopy structure, and paving (Referential)',
    },
    location: '',
    year: null,
    coverImage: '/images/projects/fuel-station-demo/cover.webp',
    images: [
      '/images/projects/fuel-station-demo/image-01.webp',
      '/images/projects/fuel-station-demo/image-02.webp',
      '/images/projects/fuel-station-demo/image-03.webp',
    ],
  },
  {
    id: 'project-002',
    slug: 'nave-procesos-planta-industrial-demo',
    category: 'industrial-plants',
    featured: true,
    isDemo: true,
    title: {
      es: 'Nave de Procesos e Infraestructura Industrial (Proyecto Demostrativo)',
      en: 'Process Building & Industrial Infrastructure (Demo Project)',
    },
    shortDescription: {
      es: 'Ficha demostrativa de construcción de nave industrial, fundaciones de alta exigencia, radieres y patios operativos.',
      en: 'Demo record for industrial building construction, heavy-duty foundations, concrete slabs, and operational yards.',
    },
    description: {
      es: 'Proyecto referencial de demostración para el área de Plantas Industriales. Incluye el desarrollo de obras civiles, fundaciones estructurales, montaje de nave principal, radieres industriales y habilitación de áreas de maniobra y operación. Preparado para incorporar los datos reales del proyecto entregado por TOCAL.',
      en: 'Referential demonstration project for the Industrial Plants sector. Includes civil works development, structural foundations, main building assembly, industrial floor slabs, and operational maneuvering areas. Prepared to incorporate actual project data provided by TOCAL.',
    },
    workType: {
      es: 'Construcción industrial, fundaciones y obras civiles (Referencial)',
      en: 'Industrial construction, foundations, and civil works (Referencial)',
    },
    location: '',
    year: null,
    coverImage: '/images/projects/industrial-plant-demo/cover.webp',
    images: [
      '/images/projects/industrial-plant-demo/image-01.webp',
      '/images/projects/industrial-plant-demo/image-02.webp',
      '/images/projects/industrial-plant-demo/image-03.webp',
      '/images/projects/industrial-plant-demo/image-04.webp',
    ],
  },
  {
    id: 'project-003',
    slug: 'complejo-centro-comercial-demo',
    category: 'shopping-centers',
    featured: true,
    isDemo: true,
    title: {
      es: 'Complejo Comercial y Espacios de Servicio (Proyecto Demostrativo)',
      en: 'Commercial Complex & Service Spaces (Demo Project)',
    },
    shortDescription: {
      es: 'Ficha demostrativa de edificación comercial, habilitación de locales, accesos peatonales y estacionamientos.',
      en: 'Demo record for commercial building construction, retail unit fit-out, pedestrian access, and parking areas.',
    },
    description: {
      es: 'Proyecto referencial de demostración para el área de Centros Comerciales. Considera la ejecución de obra gruesa, estructura de cubierta, fachadas comerciales, circulaciones peatonales y obras exteriores de estacionamiento y accesibilidad. Datos e imágenes provisionales de demostración.',
      en: 'Referential demonstration project for the Shopping Centers sector. Encompasses structural shell execution, roof structure, commercial facades, pedestrian walkways, and exterior parking and accessibility works. Provisional demonstration data and images.',
    },
    workType: {
      es: 'Edificación comercial, habilitación y obras exteriores (Referencial)',
      en: 'Commercial building, fit-out, and exterior works (Referential)',
    },
    location: '',
    year: null,
    coverImage: '/images/projects/shopping-center-demo/cover.webp',
    images: [
      '/images/projects/shopping-center-demo/image-01.webp',
      '/images/projects/shopping-center-demo/image-02.webp',
      '/images/projects/shopping-center-demo/image-03.webp',
    ],
  },
  {
    id: 'project-004',
    slug: 'zona-almacenamiento-combustibles-demo',
    category: 'fuels',
    featured: false,
    isDemo: true,
    title: {
      es: 'Obras Civiles para Almacenamiento y Abastecimiento (Proyecto Demostrativo)',
      en: 'Civil Works for Fuel Storage & Supply (Demo Project)',
    },
    shortDescription: {
      es: 'Ficha demostrativa de losas de carga, pretiles de contención y canalizaciones técnicas para instalaciones de combustibles.',
      en: 'Demo record for loading slabs, containment bunds, and technical trenches for fuel facilities.',
    },
    description: {
      es: 'Proyecto referencial de demostración orientado a infraestructura de almacenamiento y transferencia de combustibles. Contempla fundaciones especiales, losas de hormigón armado, pretiles de seguridad y urbanización técnica perimetral. Ficha provisional preparada para carga de datos reales.',
      en: 'Referential demonstration project focused on fuel storage and transfer infrastructure. Includes specialized foundations, reinforced concrete slabs, safety containment bunds, and perimeter technical site works. Provisional record prepared for real data upload.',
    },
    workType: {
      es: 'Obras civiles y contención (Referencial)',
      en: 'Civil works and containment (Referential)',
    },
    location: '',
    year: null,
    coverImage: '/images/projects/fuel-terminal-demo/cover.webp',
    images: [
      '/images/projects/fuel-terminal-demo/image-01.webp',
      '/images/projects/fuel-terminal-demo/image-02.webp',
    ],
  },
  {
    id: 'project-005',
    slug: 'centro-operacional-logistico-demo',
    category: 'industrial-plants',
    featured: false,
    isDemo: true,
    title: {
      es: 'Centro Operacional y Patio de Maniobras Industrial (Proyecto Demostrativo)',
      en: 'Operational Center & Industrial Maneuvering Yard (Demo Project)',
    },
    shortDescription: {
      es: 'Ficha demostrativa de infraestructura de soporte industrial, andenes de carga y pavimentación de alto tráfico.',
      en: 'Demo record for industrial support infrastructure, loading docks, and heavy-traffic paving.',
    },
    description: {
      es: 'Proyecto referencial de demostración para infraestructura logística e industrial. Presenta la integración de galpones operativos, zonas de carga y descarga, pavimentos industriales y servicios de apoyo en planta. Contenido demostrativo provisional.',
      en: 'Referential demonstration project for logistics and industrial infrastructure. Showcases the integration of operational warehouses, loading and unloading bays, industrial pavements, and plant support services. Provisional demonstration content.',
    },
    workType: {
      es: 'Infraestructura industrial y pavimentos (Referencial)',
      en: 'Industrial infrastructure and pavements (Referential)',
    },
    location: '',
    year: null,
    coverImage: '/images/projects/industrial-logistics-demo/cover.webp',
    images: [
      '/images/projects/industrial-logistics-demo/image-01.webp',
      '/images/projects/industrial-logistics-demo/image-02.webp',
    ],
  },
  {
    id: 'project-006',
    slug: 'strip-center-locales-comerciales-demo',
    category: 'shopping-centers',
    featured: false,
    isDemo: true,
    title: {
      es: 'Módulos Comerciales y Centro de Servicios (Proyecto Demostrativo)',
      en: 'Commercial Modules & Service Center (Demo Project)',
    },
    shortDescription: {
      es: 'Ficha demostrativa de construcción de módulos comerciales en un nivel con estacionamientos en superficie.',
      en: 'Demo record for single-level commercial modules construction with surface parking.',
    },
    description: {
      es: 'Proyecto referencial de demostración para equipamiento comercial de proximidad. Considera estructura metálica y hormigón, envolvente arquitectónica, entrega de locales en obra gruesa habitable y obras exteriores de acceso vehicular y peatonal. Incluye una única fotografía referencial para validar el comportamiento del carrusel con imagen única.',
      en: 'Referential demonstration project for neighborhood commercial facilities. Covers steel and concrete structure, architectural envelope, shell-and-core retail unit delivery, and vehicular/pedestrian access works. Includes a single referential photograph to validate carousel behavior with a single image.',
    },
    workType: null,
    location: '',
    year: null,
    coverImage: '/images/projects/strip-center-demo/cover.webp',
    images: ['/images/projects/strip-center-demo/image-01.webp'],
  },
]
