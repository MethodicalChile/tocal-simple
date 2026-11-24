const env = import.meta.env ?? {}

/**
 * Formatea automáticamente un número telefónico internacional (ej. 56963269747 -> +56 9 6326 9747)
 * cuando no se especifica un texto de visualización personalizado en VITE_WHATSAPP_DISPLAY.
 *
 * @param {string} digits
 * @param {string} [customDisplay]
 * @returns {string}
 */
export function formatPhoneDisplay(digits, customDisplay = '') {
  const trimmedCustom = (customDisplay || '').trim()
  if (trimmedCustom) return trimmedCustom

  const clean = String(digits || '').replace(/[^\d]/g, '')
  // Formato móvil chileno de 11 dígitos: 56 + 9 + XXXX + XXXX
  if (/^569\d{8}$/.test(clean)) {
    return `+56 9 ${clean.slice(3, 7)} ${clean.slice(7)}`
  }
  // Formato general con prefijo '+'
  return clean ? `+${clean}` : ''
}

export const contactEmail = (env.VITE_CONTACT_EMAIL || 'constructora@tocal.cl').trim()

export const whatsappNumber = (env.VITE_WHATSAPP_NUMBER || '56963269747')
  .replace(/[^\d]/g, '')
  .trim()

export const whatsappDisplay = formatPhoneDisplay(
  whatsappNumber,
  env.VITE_WHATSAPP_DISPLAY
)

export const siteUrl = (env.VITE_SITE_URL || 'https://www.tocal.cl')
  .trim()
  .replace(/\/+$/, '')

export const supabaseMediaUrl = (
  env.VITE_SUPABASE_MEDIA_URL ||
  'https://chqllbhsgfawmdogbjoy.supabase.co/storage/v1/object/public/tocal-media'
)
  .trim()
  .replace(/\/+$/, '')

export const getSupabaseVideoUrl = (fileName) => {
  const clean = String(fileName || '').replace(/^\/+/, '')
  return `${supabaseMediaUrl}/videos/${clean}`
}

export const officePhone = (env.VITE_OFFICE_PHONE || '02-22474085 / 073-2220473').trim()
export const companyAddress = (
  env.VITE_COMPANY_ADDRESS ||
  'Av. Del Parque 4680-A, Of. 206, Huechuraba – Santiago | Fundo La Granja Lote 10, Oficina B, Linares'
).trim()
export const linkedinUrl = (env.VITE_LINKEDIN_URL || '').trim()
export const contactEndpoint = (env.VITE_CONTACT_ENDPOINT || '').trim()

const rawDefaultLang = (env.VITE_DEFAULT_LANGUAGE || 'es').trim().toLowerCase()
export const defaultLanguage = ['es', 'en'].includes(rawDefaultLang) ? rawDefaultLang : 'es'

const rawShowProvisional = String(env.VITE_SHOW_PROVISIONAL_BADGES ?? 'false')
  .trim()
  .toLowerCase()
export const showProvisionalBadges = rawShowProvisional === 'true' || rawShowProvisional === '1'

export const whatsappMessages = {
  es: (
    env.VITE_WHATSAPP_MSG_ES ||
    'Hola, me gustaría obtener más información sobre los servicios de TOCAL.'
  ).trim(),
  en: (
    env.VITE_WHATSAPP_MSG_EN ||
    "Hello, I would like to receive more information about TOCAL's services."
  ).trim(),
}

/**
 * Genera el enlace oficial de WhatsApp con el mensaje precargado según el idioma activo
 * o con un texto personalizado.
 * @param {'es' | 'en'} [language]
 * @param {string} [customMessage]
 * @returns {string}
 */
export const getWhatsappUrl = (language = 'es', customMessage = '') => {
  const message =
    customMessage.trim() || whatsappMessages[language] || whatsappMessages.es
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const siteConfig = {
  name: 'TOCAL',
  legalName: 'Constructora Tocal Ltda.',
  rut: '76.022.955-5',
  siteUrl,
  supabaseMediaUrl,
  email: contactEmail,
  whatsappNumber,
  whatsappDisplay,
  officePhone,
  address: companyAddress,
  offices: [
    {
      id: 'santiago',
      city: 'Santiago',
      address: 'Av. Del Parque 4680-A, Of. 206, Huechuraba – Santiago',
      phone: '02-22474085',
      telHref: '+56222474085',
    },
    {
      id: 'linares',
      city: 'Linares',
      address: 'Fundo La Granja Lote 10, Oficina B, Linares',
      phone: '073-2220473',
      telHref: '+56732220473',
    },
  ],
  linkedinUrl,
  contactEndpoint,
  defaultLanguage,
  supportedLanguages: ['es', 'en'],
  showProvisionalBadges,
  logos: {
    light: '/images/logo-tocal-blanco.png',
    dark: '/images/logo-tocal.png',
    mark: '/images/logo-marca.png',
  },
  // Antecedentes institucionales oficiales (Presentación Corporativa TOCAL)
  foundedYear: 2008,
  yearsOfExperience: 15,
  builtSurfaceTotal: '+125.000 m²',
  projectsExecutedCount: '+40',
  employeesCount: null,
  socialLinks: linkedinUrl ? [{ name: 'LinkedIn', url: linkedinUrl }] : [],
}

/**
 * Genera un enlace mailto: hacia el correo corporativo.
 * @param {{ subject?: string, body?: string }} [options]
 * @returns {string}
 */
export const getMailtoUrl = ({ subject = '', body = '' } = {}) => {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString()
  // URLSearchParams usa '+' para espacios; reemplazamos por '%20' para máxima compatibilidad con clientes de correo
  const normalizedQuery = query.replace(/\+/g, '%20')
  return normalizedQuery
    ? `mailto:${siteConfig.email}?${normalizedQuery}`
    : `mailto:${siteConfig.email}`
}
