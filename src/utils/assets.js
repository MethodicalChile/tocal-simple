/**
 * Resuelve rutas de archivos estáticos ubicados en `public/`
 * respetando el `base` configurado en Vite (ej. `/` en Cloudflare Pages o `/tocal-simple/` en GitHub Pages).
 *
 * @param {string} path - Ruta del recurso (ej. "/images/logo-tocal-blanco.png")
 * @returns {string}
 */
export function withBase(path) {
  if (!path) return ''
  if (/^(https?:|data:|mailto:|tel:)/i.test(path)) {
    return path
  }
  const base = import.meta.env?.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  return `${normalizedBase}${normalizedPath}`
}

const FALLBACK_SVG_DATA_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <rect width="800" height="500" fill="#10161f"/>
      <rect x="0" y="492" width="800" height="8" fill="#f26b21"/>
      <rect x="36" y="36" width="6" height="36" fill="#f26b21"/>
      <text x="54" y="62" fill="#ffffff" font-family="sans-serif" font-size="22" font-weight="bold" letter-spacing="2">TOCAL</text>
    </svg>`
  )

/**
 * Manejador @error para etiquetas <img>: si una fotografía nueva cargada por el cliente
 * tiene una ruta mal escrita, muestra un respaldo corporativo limpio en lugar de un ícono roto.
 *
 * @param {Event} event
 */
export function handleImageError(event) {
  const target = event?.target
  if (!target || target.dataset?.fallbackApplied === 'true') return
  target.dataset.fallbackApplied = 'true'
  target.src = FALLBACK_SVG_DATA_URI
}
