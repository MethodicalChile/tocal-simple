/**
 * Catálogo de obras de Constructora Tocal.
 *
 * - Las obras con `fotos` vienen del portafolio validado (propuesta tocal-simple, rama main).
 * - Las obras con `validar: true` se reconstruyeron desde el registro interno de obras 2015–2026 (nombre de obra, mandante,
 *   rubro y años de ejecución). Antes de publicar, Tocal debe confirmar nombre público y comuna.
 * - `lat`/`lon` son el centro aproximado de la comuna, no la dirección exacta de la faena.
 * - El registro interno también lista obras sin comuna clara (Accesos ES Monterilla, Planta Cenkiwi de Copefrut,
 *   Agrovic, Centro Comercial Don José, Proyecto Verallia); quedan fuera hasta tener su ubicación.
 *
 * Para agregar una obra: copiar un objeto, poner su comuna y coordenadas, y si tiene fotos dejarlas en
 * tools/fotos/originales/projects/<id>/ (cover.webp, image-01.webp, image-02.webp…) y correr
 * tools/fotos/procesar.py, que genera las versiones de 800 y 1600 px que usa el sitio.
 */
import { videoUrl } from '../config.js'

export const sectores = [
  { id: 'industria', nombre: 'Industria y bodegaje' },
  { id: 'energia', nombre: 'Estaciones de servicio y energía' },
  { id: 'comercial', nombre: 'Comercial' },
  { id: 'institucional', nombre: 'Educacional e institucional' },
  { id: 'urbanizacion', nombre: 'Urbanización' },
]

const fotos = (id, n) => ({
  portada: `/images/projects/${id}/cover.webp`,
  galeria: Array.from({ length: n }, (_, i) => `/images/projects/${id}/image-${String(i + 1).padStart(2, '0')}.webp`),
})

export const obras = [
  // ── Coquimbo ───────────────────────────────────────────────────────────────────────────────
  {
    id: 'shell-la-cantera-coquimbo', sector: 'energia', nombre: 'Estación de servicio Shell La Cantera',
    mandante: 'Inversiones La Cantera SpA', comuna: 'Coquimbo', region: 'Coquimbo', lat: -29.985, lon: -71.31,
    anios: '2022–2023', construida: '200 m²', exterior: '4.000 m²',
    resumen: 'Edificio comercial de 200 m², marquesina, islas de expendio, accesos viales y 4.000 m² de pavimentos.',
    ...fotos('shell-la-cantera-coquimbo', 2),
  },
  {
    id: 'copec-islon-la-serena', sector: 'energia', nombre: 'Estación de servicio Copec Islón',
    mandante: 'Copec S.A.', comuna: 'La Serena', region: 'Coquimbo', lat: -29.93, lon: -71.14, anios: '2015–2016',
    validar: true,
  },
  {
    id: 'condominio-nueva-umbrales', sector: 'urbanizacion', nombre: 'Movimiento de tierras Condominio Nueva Umbrales',
    mandante: 'Inmobiliaria Nueva Umbrales de La Serena SpA', comuna: 'La Serena', region: 'Coquimbo',
    lat: -29.91, lon: -71.25, anios: '2023–2024', validar: true,
  },
  {
    id: 'copec-ovalle', sector: 'energia', nombre: 'Estación de servicio Copec Ovalle', mandante: 'Copec S.A.',
    comuna: 'Ovalle', region: 'Coquimbo', lat: -30.60, lon: -71.20, anios: '2025–2026', enCurso: true, validar: true,
  },

  // ── Valparaíso ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'planta-avomex-quillota', sector: 'industria', nombre: 'Planta procesadora de paltas Avomex',
    mandante: 'Avomex S.A.', comuna: 'Quillota', region: 'Valparaíso', lat: -32.88, lon: -71.25, destacada: true,
    construida: '7.800 m²', exterior: '10.000 m²',
    resumen: 'Planta agroindustrial de 7.800 m² con líneas de proceso, frigoríficos y servicios, más 10.000 m² de pavimentos exteriores y andenes de carga.',
    ...fotos('planta-avomex-quillota', 4),
  },
  {
    id: 'planta-solar-el-boco', sector: 'energia', nombre: 'Obras civiles Planta Solar El Boco',
    mandante: 'Belectric Chile', comuna: 'Quillota', region: 'Valparaíso', lat: -32.85, lon: -71.17,
    anios: '2016–2017', validar: true,
  },
  {
    id: 'planta-sopraval-la-calera', sector: 'industria', nombre: 'Planta de procesamiento Sopraval',
    mandante: 'Sopraval S.A.', comuna: 'La Calera', region: 'Valparaíso', lat: -32.79, lon: -71.20,
    construida: '1.600 m²', exterior: '2.000 m²',
    resumen: 'Obras civiles y edificación industrial para planta de procesamiento, con estándares sanitarios y la operación funcionando.',
    ...fotos('planta-sopraval-la-calera', 3),
  },
  {
    id: 'packing-montolin-llay-llay', sector: 'industria', nombre: 'Ampliación planta de packing Montolin',
    mandante: 'Agrícola Montolin S.A.', comuna: 'Llay-Llay', region: 'Valparaíso', lat: -32.84, lon: -70.96,
    anios: '2018–2019', construida: '4.200 m²',
    resumen: 'Ampliación de 4.200 m² de naves de proceso y radieres de alta resistencia para packing agroindustrial.',
    ...fotos('packing-montolin-llay-llay', 3),
  },
  {
    id: 'copec-concon', sector: 'energia', nombre: 'Estación de servicio Copec Concón', mandante: 'Copec S.A.',
    comuna: 'Concón', region: 'Valparaíso', lat: -32.93, lon: -71.52, construida: '300 m²', exterior: '3.000 m²',
    resumen: 'Edificio de 300 m², marquesina de carga y 3.000 m² de pavimentos y obras exteriores.',
    ...fotos('copec-concon', 1),
  },

  // ── Metropolitana ──────────────────────────────────────────────────────────────────────────
  {
    id: 'copec-chicureo-colina', sector: 'energia', nombre: 'Estación de servicio Copec Laguna Chicureo',
    mandante: 'Copec S.A.', comuna: 'Colina', region: 'Metropolitana', lat: -33.28, lon: -70.65, anios: '2023–2024',
    construida: '500 m²', exterior: '2.500 m²',
    resumen: 'Estación con tienda de conveniencia, marquesina e islas de expendio: 500 m² edificados y 2.500 m² de pavimentos.',
    ...fotos('copec-chicureo-colina', 3),
  },
  {
    id: 'casa-de-moneda-chile', sector: 'institucional', nombre: 'Remodelación y bóveda de billetes, Casa de Moneda de Chile',
    mandante: 'Casa de Moneda de Chile', comuna: 'Santiago', region: 'Metropolitana', lat: -33.45, lon: -70.66,
    construida: '7.000 m²',
    resumen: 'Obras de alta seguridad en tres etapas: remodelación fase I (1.400 m²), fase II (4.800 m²) y bóveda de billetes (800 m²).',
    ...fotos('casa-de-moneda-chile', 1),
  },
  {
    id: 'tega-acotec-santiago', sector: 'industria', nombre: 'Ampliación planta Tega Acotec', mandante: 'Tega Acotec S.A.',
    comuna: 'Santiago', region: 'Metropolitana', lat: -33.50, lon: -70.72, anios: '2015', validar: true,
  },
  {
    id: 'bosch-rexroth-santiago', sector: 'industria', nombre: 'Nuevas instalaciones Bosch Rexroth',
    mandante: 'Bosch Rexroth Chile SpA', comuna: 'Santiago', region: 'Metropolitana', lat: -33.40, lon: -70.75,
    anios: '2015–2016', validar: true,
  },
  {
    id: 'planta-southam-freeze-dry-buin', sector: 'industria', nombre: 'Planta de liofilizados Southam Freeze-Dry',
    mandante: 'Southam Freeze-Dry', comuna: 'Buin', region: 'Metropolitana', lat: -33.73, lon: -70.74,
    construida: '3.700 m²',
    resumen: 'Planta de 3.700 m² para liofilización de alimentos: fundaciones técnicas, estructura metálica y envolvente térmica.',
    ...fotos('planta-southam-freeze-dry-buin', 2),
  },
  {
    id: 'centro-comercial-alto-jahuel', sector: 'comercial', nombre: 'Centro comercial Alto Jahuel',
    mandante: 'Desarrollo Comercial Buin SpA', comuna: 'Buin', region: 'Metropolitana', lat: -33.72, lon: -70.68,
    anios: '2024–2025', validar: true,
  },

  // ── O'Higgins ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'packing-ranco-cherries-rancagua', sector: 'industria', nombre: 'Ampliación planta de packing Ranco Cherries',
    mandante: 'Exportadora Rancagua S.A.', comuna: 'Rancagua', region: "O'Higgins", lat: -34.17, lon: -70.74,
    destacada: true, anios: '2018–2020', construida: '7.540 m²', exterior: '13.500 m²',
    resumen: 'Naves de proceso y embalaje de 7.540 m² y 13.500 m² de patios logísticos con pavimentos para tránsito pesado.',
    ...fotos('packing-ranco-cherries-rancagua', 3),
  },
  {
    id: 'planta-rancagua-2025', sector: 'industria', nombre: 'Ampliación planta Rancagua 2025',
    mandante: 'Exportadora Rancagua S.A.', comuna: 'Rancagua', region: "O'Higgins", lat: -34.19, lon: -70.70,
    anios: '2025–2026', enCurso: true, validar: true,
  },
  {
    id: 'copec-rengo', sector: 'energia', nombre: 'Estación de servicio Copec Rengo', mandante: 'Copec S.A.',
    comuna: 'Rengo', region: "O'Higgins", lat: -34.41, lon: -70.86, anios: '2019–2020', validar: true,
  },

  // ── Maule ──────────────────────────────────────────────────────────────────────────────────
  {
    id: 'copec-sagrada-familia', sector: 'energia', nombre: 'Estación de servicio Copec Sagrada Familia',
    mandante: 'Copec S.A.', comuna: 'Sagrada Familia', region: 'Maule', lat: -34.99, lon: -71.38, anios: '2019–2020',
    resumen: 'Obras civiles, marquesina, islas de carga, edificio de servicios y pavimentación vehicular.',
    ...fotos('copec-sagrada-familia', 3), videos: [{ titulo: 'Vuelo en dron', src: videoUrl('copec-sagrada-familia.mp4') }],
  },
  {
    id: 'copefrut-curico', sector: 'industria', nombre: 'Ampliación planta Copefrut Curicó', mandante: 'Copefrut S.A.',
    comuna: 'Curicó', region: 'Maule', lat: -34.98, lon: -71.24, anios: '2023', validar: true,
  },
  {
    id: 'strip-center-puerto-tepual-talca', sector: 'comercial', nombre: 'Strip center Puerto Tepual',
    mandante: 'Inversiones Inmobiliarias Comerciales S.A.', comuna: 'Talca', region: 'Maule', lat: -35.43, lon: -71.66,
    destacada: true, anios: '2021–2022', construida: '2.300 m²', exterior: '2.200 m²',
    resumen: 'Centro comercial de 2.300 m² para locales comerciales y de servicios, más 2.200 m² de estacionamientos y urbanización.',
    ...fotos('strip-center-puerto-tepual-talca', 3),
  },
  {
    id: 'strip-center-puerto-talca', sector: 'comercial', nombre: 'Strip center Puerto Talca',
    mandante: 'Inversiones Inmobiliarias Comerciales S.A.', comuna: 'Talca', region: 'Maule', lat: -35.42, lon: -71.65,
    anios: '2020–2021', construida: '1.500 m²', exterior: '2.500 m²',
    resumen: 'Módulos comerciales de 1.500 m² y 2.500 m² de explanadas peatonales y estacionamientos.',
    ...fotos('strip-center-puerto-talca', 2),
  },
  {
    id: 'unimarc-talca', sector: 'comercial', nombre: 'Supermercado Unimarc y locales comerciales',
    mandante: 'SMU / Unimarc', comuna: 'Talca', region: 'Maule', lat: -35.44, lon: -71.67,
    resumen: 'Sala de ventas, locales comerciales, fachadas, estacionamientos en superficie y accesos viales.',
    ...fotos('unimarc-talca', 3), videos: [{ titulo: 'Vuelo en dron', src: videoUrl('unimarc-talca.mp4') }],
  },
  {
    id: 'colegio-ingles-talca', sector: 'institucional', nombre: 'Pabellones, sala de música y auditorio, Colegio Inglés',
    mandante: 'Inmobiliaria Colegio Inglés S.A.', comuna: 'Talca', region: 'Maule', lat: -35.41, lon: -71.63,
    anios: '2024–2025',
    resumen: 'Pabellón de salas de clases, edificio de música con acondicionamiento acústico y salón de conferencias.',
    ...fotos('colegio-ingles-talca', 3),
    videos: [
      { titulo: 'Salón de conferencias', src: videoUrl('colegio-ingles-conferencias.mp4') },
      { titulo: 'Sala de música', src: videoUrl('colegio-ingles-musica.mp4') },
      { titulo: 'Pabellón de salas', src: videoUrl('colegio-ingles-salas.mp4') },
    ],
  },
  {
    id: 'cirel-constitucion', sector: 'comercial', nombre: 'Remodelación Cirel', mandante: 'MM Constitución SpA',
    comuna: 'Constitución', region: 'Maule', lat: -35.33, lon: -72.41, anios: '2025–2026', enCurso: true,
    validar: true,
  },
  {
    id: 'bodega-megarent-linares', sector: 'industria', nombre: 'Centro de bodegaje Megarent',
    mandante: 'Comercial Megarent Ltda.', comuna: 'Linares', region: 'Maule', lat: -35.85, lon: -71.60,
    anios: '2017–2026', construida: '4.500 m²',
    resumen: 'Nave de bodegaje de 4.500 m² con estructura metálica de grandes luces, radieres industriales y patios de maniobra; hoy en ampliación.',
    ...fotos('bodega-megarent-linares', 3), videos: [{ titulo: 'Vuelo en dron', src: videoUrl('bodega-megarent.mp4') }],
  },
  {
    id: 'bodega-bodegaas-linares', sector: 'industria', nombre: 'Complejo de bodegas Bodegaas',
    mandante: 'Comercial Bodegaas Ltda.', comuna: 'Linares', region: 'Maule', lat: -35.86, lon: -71.58,
    anios: '2019–2025', construida: '5.000 m²',
    resumen: 'Complejo de bodegaje de 5.000 m²: obras civiles, montaje estructural, accesos de carga y drenaje de aguas lluvias.',
    ...fotos('bodega-bodegaas-linares', 3), videos: [{ titulo: 'Vuelo en dron', src: videoUrl('bodega-bodegaas.mp4') }],
  },
  {
    id: 'copefrut-linares', sector: 'industria', nombre: 'Ampliaciones planta Copefrut Linares', mandante: 'Copefrut S.A.',
    comuna: 'Linares', region: 'Maule', lat: -35.83, lon: -71.62, anios: '2023–2025', validar: true,
  },
  {
    id: 'la-araucana-linares', sector: 'institucional', nombre: 'Edificio institucional La Araucana',
    mandante: 'La Araucana CCAF', comuna: 'Linares', region: 'Maule', lat: -35.85, lon: -71.59, anios: '2015–2016',
    validar: true,
  },
  {
    id: 'planta-tucapel-retiro', sector: 'industria', nombre: 'Planta de recepción de arroz Tucapel',
    mandante: 'Empresas Tucapel S.A.', comuna: 'Retiro', region: 'Maule', lat: -36.05, lon: -71.76, destacada: true,
    anios: '2016–2019', construida: '7.190 m²', exterior: '3.500 m²',
    resumen: 'Planta de recepción de arroz en tres etapas, nave de acopio a granel, fundaciones industriales y 3.500 m² de obras exteriores.',
    ...fotos('planta-tucapel-retiro', 4), videos: [{ titulo: 'Vuelo en dron', src: videoUrl('tucapel-retiro.mp4') }],
  },
  {
    id: 'centro-comercial-parral', sector: 'comercial', nombre: 'Centro comercial Parral', mandante: 'Comercial Diez y Moreno Ltda.',
    comuna: 'Parral', region: 'Maule', lat: -36.14, lon: -71.83, anios: '2023–2024', validar: true,
  },

  // ── Ñuble ──────────────────────────────────────────────────────────────────────────────────
  {
    id: 'shell-enex-san-carlos', sector: 'energia', nombre: 'Estación de servicio Shell San Carlos', mandante: 'Enex S.A.',
    comuna: 'San Carlos', region: 'Ñuble', lat: -36.42, lon: -71.96, destacada: true, anios: '2021–2023',
    construida: '900 m²', exterior: '37.000 m²',
    resumen: 'Complejo rutero con 900 m² edificados y una explanada de 37.000 m² de pistas y estacionamientos de alto tonelaje.',
    ...fotos('shell-enex-san-carlos', 2), videos: [{ titulo: 'Vuelo en dron', src: videoUrl('shell-san-carlos.mp4') }],
  },
  {
    id: 'barrio-sur-san-carlos', sector: 'comercial', nombre: 'Centro comercial Barrio Sur', mandante: 'Barrio Sur SpA',
    comuna: 'San Carlos', region: 'Ñuble', lat: -36.43, lon: -71.95, anios: '2025–2026', enCurso: true, validar: true,
  },
  {
    id: 'copec-chillan', sector: 'energia', nombre: 'Estación de servicio Copec Chillán', mandante: 'Copec S.A.',
    comuna: 'Chillán', region: 'Ñuble', lat: -36.61, lon: -72.10, destacada: true, anios: '2022–2023',
    construida: '900 m²', exterior: '9.000 m²',
    resumen: 'Estación de 900 m² edificados y 9.000 m² de pavimento rígido para tránsito pesado, islas de carga y urbanización.',
    ...fotos('copec-chillan', 3), videos: [{ titulo: 'Vuelo en dron', src: videoUrl('copec-chillan.mp4') }],
  },
  {
    id: 'copec-quillon', sector: 'energia', nombre: 'Estación de servicio Copec Quillón', mandante: 'Copec S.A.',
    comuna: 'Quillón', region: 'Ñuble', lat: -36.74, lon: -72.47, anios: '2024–2025',
    resumen: 'Marquesina de islas de carga, tienda de conveniencia, módulos de autolavado y urbanización exterior.',
    ...fotos('copec-quillon', 3), videos: [{ titulo: 'Vuelo en dron', src: videoUrl('copec-quillon.mp4') }],
  },

  // ── Biobío ─────────────────────────────────────────────────────────────────────────────────
  {
    id: 'urbanizacion-talcahuano', sector: 'urbanizacion', nombre: 'Movimiento de tierras Talcahuano',
    mandante: 'Inmobiliaria Talcahuano SpA', comuna: 'Talcahuano', region: 'Biobío', lat: -36.72, lon: -73.10,
    anios: '2022–2023', validar: true,
  },
  {
    id: 'bodega-condores-cabrero', sector: 'industria', nombre: 'Centro de bodegaje Cóndores',
    mandante: 'Inversiones Cóndores SpA', comuna: 'Cabrero', region: 'Biobío', lat: -37.03, lon: -72.40,
    anios: '2021–2024', construida: '2.000 m²',
    resumen: 'Nave de almacenamiento de 2.000 m² con obras civiles, radieres de hormigón y estructura metálica.',
    ...fotos('bodega-condores-cabrero', 3),
  },
  {
    id: 'copec-horcones', sector: 'energia', nombre: 'Estación de servicio Copec Horcones', mandante: 'Copec S.A.',
    comuna: 'Arauco', region: 'Biobío', lat: -37.21, lon: -73.33, anios: '2016–2018', construida: '900 m²',
    exterior: '15.000 m²',
    resumen: 'Estación de 900 m² construidos con 15.000 m² de pavimentos de alto tráfico y explanada exterior.',
    ...fotos('copec-horcones', 1),
  },

  // ── La Araucanía ───────────────────────────────────────────────────────────────────────────
  {
    id: 'aramco-angol', sector: 'energia', nombre: 'Estación de servicio Aramco Angol', mandante: 'EDS Angol SpA',
    comuna: 'Angol', region: 'La Araucanía', lat: -37.80, lon: -72.71, anios: '2026', enCurso: true, validar: true,
  },
  {
    id: 'shell-labranza', sector: 'energia', nombre: 'Estación de servicio Shell Labranza',
    mandante: 'Inmobiliaria Santiago II SpA', comuna: 'Temuco', region: 'La Araucanía', lat: -38.76, lon: -72.75,
    anios: '2021–2023', validar: true,
  },
]

/** Oficinas: se dibujan en el mapa con otro símbolo. */
export const oficinas = [
  { id: 'of-santiago', nombre: 'Oficina Santiago', comuna: 'Huechuraba', lat: -33.37, lon: -70.63 },
  { id: 'of-linares', nombre: 'Oficina Linares', comuna: 'Linares', lat: -35.84, lon: -71.61 },
]

export const regionesConObras = [...new Set(obras.map((o) => o.region))]
