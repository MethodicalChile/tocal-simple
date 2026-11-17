import { ref, computed } from 'vue'
import { translations } from './translations.js'
import { siteConfig } from '../config/site.js'

const STORAGE_KEY = 'tocal_language'

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return siteConfig.defaultLanguage
  }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && siteConfig.supportedLanguages.includes(saved)) {
      return saved
    }
  } catch {
    // Ignorar errores de acceso a localStorage en modo privado restringido
  }
  return siteConfig.defaultLanguage
}

const currentLanguage = ref(getInitialLanguage())

function syncDocumentMetadata(lang) {
  if (typeof document === 'undefined') return
  const meta = translations[lang]?.meta ?? translations.es.meta
  document.documentElement.lang = lang
  if (meta.title) {
    document.title = meta.title
  }
  const descEl = document.querySelector('meta[name="description"]')
  if (descEl && meta.description) {
    descEl.setAttribute('content', meta.description)
  }
  const ogTitleEl = document.querySelector('meta[property="og:title"]')
  if (ogTitleEl && meta.title) {
    ogTitleEl.setAttribute('content', meta.title)
  }
  const ogDescEl = document.querySelector('meta[property="og:description"]')
  if (ogDescEl && meta.description) {
    ogDescEl.setAttribute('content', meta.description)
  }
}

export function setLanguage(lang) {
  const nextLang = siteConfig.supportedLanguages.includes(lang)
    ? lang
    : siteConfig.defaultLanguage
  currentLanguage.value = nextLang
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextLang)
    }
  } catch {
    // Ignorar errores de escritura en localStorage
  }
  syncDocumentMetadata(nextLang)
}

/**
 * Obtiene un texto traducido desde `translations.js` usando notación de puntos (ej. `nav.home`).
 * Soporta interpolación simple `{key}` y pluralización básica separada por `|`.
 */
export function t(path, params = {}) {
  const lang = currentLanguage.value
  const segments = path.split('.')
  let value = translations[lang]
  for (const segment of segments) {
    value = value?.[segment]
  }
  if (value === undefined) {
    value = translations.es
    for (const segment of segments) {
      value = value?.[segment]
    }
  }
  if (typeof value !== 'string') {
    return value ?? path
  }

  let text = value
  if (text.includes('|') && typeof params.count === 'number') {
    const parts = text.split('|').map((s) => s.trim())
    text = params.count === 1 ? parts[0] : (parts[1] ?? parts[0])
  }

  return text.replace(/\{(\w+)\}/g, (_, key) =>
    params[key] !== undefined ? String(params[key]) : `{${key}}`
  )
}

/**
 * Extrae el valor en el idioma activo desde un objeto bilingüe `{ es, en }` o devuelve el string si es plano.
 */
export function localize(field) {
  if (!field) return ''
  if (typeof field === 'string') return field
  const lang = currentLanguage.value
  return field[lang] ?? field.es ?? ''
}

export function useI18n() {
  syncDocumentMetadata(currentLanguage.value)

  return {
    language: computed(() => currentLanguage.value),
    setLanguage,
    t,
    localize,
  }
}
