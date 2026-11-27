import fotos from './data/fotos.json'

const env = import.meta.env ?? {}

/** Bucket público de Supabase con los videos de dron optimizados (el mismo de la propuesta tocal-simple). */
export const MEDIA_URL = (
  env.VITE_SUPABASE_MEDIA_URL || 'https://chqllbhsgfawmdogbjoy.supabase.co/storage/v1/object/public/tocal-media'
).replace(/\/+$/, '')

export const videoUrl = (archivo) => `${MEDIA_URL}/videos/${archivo}`

/** Resuelve rutas de public/ respetando el `base` de Vite (GitHub Pages sirve bajo /<repo>/). */
export function conBase(ruta) {
  if (!ruta || /^(https?:|data:|mailto:|tel:)/i.test(ruta)) return ruta
  const base = env.BASE_URL || '/'
  return `${base.endsWith('/') ? base : base + '/'}${ruta.replace(/^\//, '')}`
}

/**
 * Datos de una foto procesada por tools/fotos/procesar.py: src, srcset (800 y 1600 px) y tamaño.
 * `grande` dice si la foto aguanta un espacio grande (1000 px o más de ancho).
 */
export function foto(ruta) {
  const d = fotos[ruta]
  if (!d) return { src: conBase(ruta), srcset: undefined, ancho: undefined, alto: undefined, grande: false }
  const v = Object.entries(d.versiones)
  const base = ruta.replace(/\.webp$/, '')
  return {
    src: conBase(`${base}@${v[0][0]}.webp`),
    srcset: v.map(([k, [w]]) => `${conBase(`${base}@${k}.webp`)} ${w}w`).join(', '),
    ancho: d.ancho,
    alto: d.alto,
    grande: d.ancho >= 1000,
  }
}

export const empresa = {
  nombre: 'Constructora Tocal',
  razonSocial: 'Constructora Tocal Ltda.',
  rut: '76.022.955-5',
  fundacion: 2008,
  superficie: '125.000 m²',
  correo: (env.VITE_CONTACT_EMAIL || 'constructora@tocal.cl').trim(),
  whatsapp: (env.VITE_WHATSAPP_NUMBER || '56963269747').replace(/\D/g, ''),
  whatsappVisible: '+56 9 6326 9747',
  formularioEndpoint: (env.VITE_CONTACT_ENDPOINT || '').trim(),
  oficinas: [
    { ciudad: 'Santiago', direccion: 'Av. Del Parque 4680-A, of. 206, Huechuraba', telefono: '+56 2 2247 4085', tel: '+56222474085' },
    { ciudad: 'Linares', direccion: 'Fundo La Granja, lote 10, oficina B, Linares', telefono: '+56 73 222 0473', tel: '+56732220473' },
  ],
  gerencia: [
    { nombre: 'Julio Robert M.', cargo: 'Gerente general', telefono: '+56 9 8259 4112', tel: '+56982594112', correo: 'jrobert@tocal.cl' },
    { nombre: 'Mario Poblete A.', cargo: 'Gerente de operaciones', telefono: '+56 9 7959 4798', tel: '+56979594798', correo: 'mpoblete@tocal.cl' },
  ],
  // logos: SVG de Wikimedia Commons (Copec, Bosch Rexroth, Unimarc) y recortes de la lámina de clientes de Tocal,
  // normalizados por tools/fotos/logos.py (se usa la versión <logo>-n.png)
  mandantes: [
    { nombre: 'Copec', logo: 'copec.png' },
    { nombre: 'Empresas Tucapel', logo: 'tucapel.png' },
    { nombre: 'Enex, licenciatario de Shell', logo: 'enex-shell.png' },
    { nombre: 'Ranco Cherries', logo: 'ranco-cherries.png' },
    { nombre: 'Casa de Moneda de Chile', logo: 'casa-de-moneda.png' },
    { nombre: 'Sopraval', logo: 'sopraval.png' },
    { nombre: 'Bosch Rexroth', logo: 'bosch-rexroth.png' },
    { nombre: 'Unimarc', logo: 'unimarc.png' },
    { nombre: 'La Araucana', logo: 'la-araucana.png' },
    { nombre: 'Guallarauco', logo: 'guallarauco.png' },
    { nombre: 'Coagra', logo: 'coagra.png' },
    { nombre: 'POCH by WSP', logo: 'poch.png' },
    { nombre: 'DRS Ingeniería y Gestión', logo: 'drs.png' },
  ],
}

// cada especialidad cuenta sus obras reales con `incluye` (ver Especialidades.vue) y filtra el mapa por `sector`
export const especialidades = [
  {
    id: 'plantas',
    sector: 'industria',
    titulo: 'Plantas de proceso y packing',
    texto: 'Procesadoras de alimentos, liofilizado, recepción de granos y packing frutícola: fundaciones de equipos, naves de proceso, frigoríficos y patios. Casi siempre con la planta del mandante operando al lado.',
    incluye: (o) => o.sector === 'industria' && !/bodeg/i.test(o.nombre),
    imagen: '/images/services/industrial-plants.webp',
  },
  {
    id: 'bodegas',
    sector: 'industria',
    titulo: 'Bodegas y centros logísticos',
    texto: 'Galpones de acopio a granel y centros de bodegaje de grandes luces, con radieres para grúa horquilla y patios de maniobra para camiones.',
    incluye: (o) => /bodeg/i.test(o.nombre),
    imagen: '/images/projects/bodega-megarent-linares/cover.webp',
  },
  {
    id: 'estaciones',
    sector: 'energia',
    titulo: 'Estaciones de servicio',
    texto: 'Estaciones urbanas y ruteras para Copec, Shell y Aramco: marquesina, islas, tienda, autolavado y explanadas de pavimento rígido, con los estándares de seguridad de cada distribuidora.',
    incluye: (o) => o.sector === 'energia' && /estaci/i.test(o.nombre),
    imagen: '/images/projects/copec-chillan/cover.webp',
  },
  {
    id: 'comercio',
    sector: 'comercial',
    titulo: 'Comercio, colegios e instituciones',
    texto: 'Strip centers, supermercados, pabellones escolares con salas acústicas y obras de alta seguridad como la bóveda de billetes de la Casa de Moneda.',
    incluye: (o) => ['comercial', 'institucional'].includes(o.sector),
    imagen: '/images/projects/strip-center-puerto-tepual-talca/cover.webp',
  },
]
