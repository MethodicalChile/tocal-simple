import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createServer } from 'vite'

import {
  siteConfig,
  whatsappNumber,
  getWhatsappUrl,
  getMailtoUrl,
  companyData,
  servicesData,
  projects,
  team,
} from '../src/data/site.js'
import { formatPhoneDisplay, supabaseMediaUrl } from '../src/config/site.js'
import { translations } from '../src/i18n/translations.js'
import { setLanguage, t, localize, useI18n } from '../src/i18n/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const publicDir = path.join(rootDir, 'public')

function assertPublicAssetExists(assetPath) {
  assert.ok(assetPath && assetPath.startsWith('/'), `Ruta de recurso inválida: ${assetPath}`)
  const fullPath = path.join(publicDir, assetPath.slice(1))
  assert.ok(
    fs.existsSync(fullPath),
    `El archivo de imagen no existe en public/: ${assetPath} (${fullPath})`
  )
  const stat = fs.statSync(fullPath)
  assert.ok(stat.size > 0, `El archivo de imagen está vacío: ${assetPath}`)
}

function getAllKeys(obj, prefix = '') {
  return Object.keys(obj).flatMap((key) => {
    const nextKey = prefix ? `${prefix}.${key}` : key
    const val = obj[key]
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      return getAllKeys(val, nextKey)
    }
    return [nextKey]
  })
}

test('Configuración de contacto: correo corporativo, WhatsApp oficial y oficinas', () => {
  assert.equal(siteConfig.email, 'constructora@tocal.cl')
  assert.equal(whatsappNumber, '56963269747')
  assert.equal(siteConfig.whatsappDisplay, '+56 9 6326 9747')
  assert.equal(siteConfig.rut, '76.022.955-5')
  assert.equal(siteConfig.offices.length, 2)

  const urlEs = getWhatsappUrl('es')
  const urlEn = getWhatsappUrl('en')

  assert.equal(
    urlEs,
    `https://wa.me/56963269747?text=${encodeURIComponent(
      'Hola, me gustaría obtener más información sobre los servicios de TOCAL.'
    )}`
  )
  assert.equal(
    urlEn,
    `https://wa.me/56963269747?text=${encodeURIComponent(
      "Hello, I would like to receive more information about TOCAL's services."
    )}`
  )

  const mailto = getMailtoUrl({ subject: 'Consulta Obra', body: 'Hola TOCAL' })
  assert.ok(mailto.startsWith('mailto:constructora@tocal.cl?'))
  assert.ok(mailto.includes('subject=Consulta%20Obra'))

  assert.equal(formatPhoneDisplay('56963269747', ''), '+56 9 6326 9747')
  assert.equal(formatPhoneDisplay('56912345678', ''), '+56 9 1234 5678')
  assert.equal(formatPhoneDisplay('56963269747', 'Personalizado'), 'Personalizado')
})

test('Datos históricos e institucionales oficiales de TOCAL confirmados', () => {
  assert.equal(siteConfig.foundedYear, 2008)
  assert.equal(siteConfig.yearsOfExperience, 15)
  assert.equal(siteConfig.builtSurfaceTotal, '+125.000 m²')
  assert.equal(siteConfig.projectsExecutedCount, '+40')
  assert.equal(siteConfig.showProvisionalBadges, false)
  assert.ok(supabaseMediaUrl.includes('supabase.co/storage/v1/object/public/tocal-media'))
})

test('Internacionalización ES/EN: paridad completa de claves y cambio dinámico de idioma', () => {
  const esKeys = getAllKeys(translations.es).sort()
  const enKeys = getAllKeys(translations.en).sort()
  assert.deepEqual(esKeys, enKeys, 'Las claves de traducción ES y EN deben coincidir exactamente')

  const { language } = useI18n()
  setLanguage('es')
  assert.equal(language.value, 'es')
  assert.equal(t('nav.home'), 'Inicio')
  assert.equal(t('nav.team'), 'Nuestro equipo')
  assert.equal(t('categories.fuels'), 'Combustibles')

  setLanguage('en')
  assert.equal(language.value, 'en')
  assert.equal(t('nav.home'), 'Home')
  assert.equal(t('nav.team'), 'Our Team')
  assert.equal(t('categories.fuels'), 'Fuels')

  assert.equal(localize({ es: 'Obra civil', en: 'Civil work' }), 'Civil work')
  setLanguage('es')
  assert.equal(localize({ es: 'Obra civil', en: 'Civil work' }), 'Obra civil')
})

test('Servicios: las tres áreas de especialización existen en ES/EN con imágenes válidas', () => {
  const expectedIds = ['fuels', 'industrial-plants', 'shopping-centers']
  assert.deepEqual(
    servicesData.map((s) => s.id),
    expectedIds
  )

  for (const service of servicesData) {
    assert.ok(service.title.es && service.title.en)
    assert.ok(service.shortDescription.es && service.shortDescription.en)
    assert.ok(service.description.es && service.description.en)
    assertPublicAssetExists(service.image)
  }
})

test('Proyectos: 22 obras reales con fotografías WebP válidas y videos en Supabase Storage', () => {
  assert.equal(projects.length, 22)
  const validCategories = new Set(['fuels', 'industrial-plants', 'shopping-centers'])

  for (const project of projects) {
    assert.ok(project.id, 'Falta id en proyecto')
    assert.ok(project.slug, `Falta slug en proyecto ${project.id}`)
    assert.ok(
      validCategories.has(project.category),
      `Categoría inválida ${project.category} en ${project.id}`
    )
    assert.ok(project.title?.es && project.title?.en, `Falta título bilingüe en ${project.id}`)
    assert.ok(
      project.shortDescription?.es && project.shortDescription?.en,
      `Falta descripción breve bilingüe en ${project.id}`
    )
    assert.ok(
      project.description?.es && project.description?.en,
      `Falta descripción completa bilingüe en ${project.id}`
    )
    assert.equal(project.isDemo, false, 'Los proyectos oficiales deben tener isDemo: false')
    assertPublicAssetExists(project.coverImage)
    assert.ok(Array.isArray(project.images) && project.images.length >= 1)
    for (const imgEntry of project.images) {
      const imgPath = typeof imgEntry === 'string' ? imgEntry : imgEntry?.src
      assertPublicAssetExists(imgPath)
      if (typeof imgEntry === 'object' && imgEntry?.caption && typeof imgEntry.caption === 'object') {
        assert.ok(
          imgEntry.caption.es && imgEntry.caption.en,
          `El pie de foto (caption) debe tener traducción ES y EN en ${project.id}`
        )
      }
    }
    if (Array.isArray(project.videos) && project.videos.length > 0) {
      for (const vid of project.videos) {
        assert.ok(vid.src.startsWith(supabaseMediaUrl), `URL de video inválida en ${project.slug}`)
        assert.ok(vid.title?.es && vid.title?.en, `Falta título bilingüe de video en ${project.slug}`)
      }
    }
  }

  const imageCounts = new Set(projects.map((p) => p.images.length))
  assert.ok(
    imageCounts.has(1),
    'Debe existir al menos un proyecto con 1 sola fotografía para probar ocultamiento de controles'
  )
  assert.ok(
    [...imageCounts].some((c) => c >= 3),
    'Debe existir al menos un proyecto con 3 o más fotografías'
  )
})

test('Equipo e imágenes institucionales: todos los archivos gráficos existen en public/', () => {
  assertPublicAssetExists(siteConfig.logos.light)
  assertPublicAssetExists(siteConfig.logos.dark)
  assertPublicAssetExists(siteConfig.logos.mark)
  assertPublicAssetExists(companyData.hero.image)
  assertPublicAssetExists(companyData.about.clients.image)
  assertPublicAssetExists('/robots.txt')
  assertPublicAssetExists('/sitemap.xml')
  assertPublicAssetExists('/site.webmanifest')
  assertPublicAssetExists('/404.html')
  assertPublicAssetExists('/_headers')
  assertPublicAssetExists('/images/company/og-share.png')

  for (const img of companyData.about.images) {
    assertPublicAssetExists(img.src)
  }

  assert.equal(team.length, 2)
  for (const member of team) {
    assert.ok(member.id)
    assert.ok(member.name?.es && member.name?.en)
    assert.ok(member.role?.es && member.role?.en)
    assert.equal(member.isProvisional, false)
    assert.ok(member.email && member.phone)
    assertPublicAssetExists(member.image)
  }
})

test('Renderizado SSR de componentes Vue (App, Galería, Filtros, Modal y Carrusel) en ES y EN', async () => {
  const vite = await createServer({
    root: rootDir,
    logLevel: 'silent',
    server: { middlewareMode: true },
    appType: 'custom',
  })

  try {
    const { default: App } = await vite.ssrLoadModule('/src/App.vue')
    const { default: ProjectCarousel } = await vite.ssrLoadModule(
      '/src/components/projects/ProjectCarousel.vue'
    )
    const { default: ProjectModal } = await vite.ssrLoadModule(
      '/src/components/projects/ProjectModal.vue'
    )
    const { default: ProjectsSection } = await vite.ssrLoadModule(
      '/src/components/ProjectsSection.vue'
    )
    const i18nMod = await vite.ssrLoadModule('/src/i18n/index.js')

    // 1. Renderizar App completa en Español
    i18nMod.setLanguage('es')
    const htmlEs = await renderToString(createSSRApp(App))
    assert.ok(htmlEs.includes('id="inicio"'))
    assert.ok(htmlEs.includes('id="quienes-somos"'))
    assert.ok(htmlEs.includes('id="servicios"'))
    assert.ok(htmlEs.includes('id="proyectos"'))
    assert.ok(htmlEs.includes('id="equipo"'))
    assert.ok(htmlEs.includes('id="contacto"'))
    assert.ok(htmlEs.includes('mailto:constructora@tocal.cl'))
    assert.ok(htmlEs.includes('https://wa.me/56963269747?text=Hola'))
    assert.ok(htmlEs.includes('+125.000 m²'))
    assert.ok(htmlEs.includes('Julio Robert M.'))
    assert.ok(htmlEs.includes('Mario Poblete A.'))
    assert.ok(!htmlEs.toLowerCase().includes('organigrama'))

    // 2. Renderizar App completa en Inglés
    i18nMod.setLanguage('en')
    const htmlEn = await renderToString(createSSRApp(App))
    assert.ok(htmlEn.includes('Our projects'))
    assert.ok(htmlEn.includes('About Us'))
    assert.ok(htmlEn.includes('Fuels'))
    assert.ok(htmlEn.includes('Industrial Plants'))
    assert.ok(htmlEn.includes('Shopping Centers'))
    assert.ok(htmlEn.includes('https://wa.me/56963269747?text=Hello'))

    i18nMod.setLanguage('es')

    // 3. Carrusel con múltiples fotografías (soportando strings y objetos con caption bilingüe)
    const htmlMulti = await renderToString(
      createSSRApp({
        render: () =>
          h(ProjectCarousel, {
            images: [
              {
                src: '/images/projects/planta-tucapel-retiro/image-01.webp',
                caption: {
                  es: 'Vista aérea general de la planta Tucapel S.A.',
                  en: 'General aerial view of Tucapel S.A. plant',
                },
              },
              '/images/projects/planta-tucapel-retiro/image-02.webp',
              '/images/projects/planta-tucapel-retiro/image-03.webp',
            ],
            projectTitle: 'Proyecto Multi',
            projectKey: 'p-multi',
          }),
      })
    )
    assert.ok(htmlMulti.includes('1 / 3'), 'El contador debe mostrar 1 / 3')
    assert.ok(htmlMulti.includes('carousel__nav--prev'), 'Debe mostrar flecha anterior con >1 foto')
    assert.ok(htmlMulti.includes('carousel__nav--next'), 'Debe mostrar flecha siguiente con >1 foto')
    assert.ok(htmlMulti.includes('carousel__thumbs'), 'Debe mostrar tira de miniaturas con >1 foto')
    assert.ok(
      htmlMulti.includes('Vista aérea general de la planta Tucapel S.A.'),
      'Debe mostrar el pie de foto (caption) cuando se define en la imagen'
    )

    // 4. Carrusel con una sola fotografía (controles anterior/siguiente ocultos)
    const htmlSingle = await renderToString(
      createSSRApp({
        render: () =>
          h(ProjectCarousel, {
            images: ['/images/projects/copec-horcones/image-01.webp'],
            projectTitle: 'Proyecto Único',
            projectKey: 'p-single',
          }),
      })
    )
    assert.ok(htmlSingle.includes('1 / 1'), 'El contador debe mostrar 1 / 1')
    assert.ok(
      !htmlSingle.includes('carousel__nav--prev'),
      'No debe mostrar controles anterior/siguiente cuando solo existe 1 fotografía'
    )

    // 5. Carrusel sin fotografías (estado vacío)
    const htmlEmpty = await renderToString(
      createSSRApp({
        render: () =>
          h(ProjectCarousel, {
            images: [],
            projectTitle: 'Proyecto Vacío',
            projectKey: 'p-empty',
          }),
      })
    )
    assert.ok(htmlEmpty.includes('carousel__empty'), 'Debe mostrar estado vacío sin fotografías')

    // 6. Filtrado por categoría en ProjectsSection
    const htmlFuels = await renderToString(
      createSSRApp({
        render: () =>
          h(ProjectsSection, {
            projects,
            activeCategory: 'fuels',
          }),
      })
    )
    assert.ok(htmlFuels.includes('Copec Chillán'))
    assert.ok(!htmlFuels.includes('Strip Center Puerto Tepual'))

    // 7. Modal con video y especificaciones técnicas
    const projectWithVideo = projects.find((p) => p.videos?.length > 0)
    const modalCtx = {}
    await renderToString(
      createSSRApp({
        render: () =>
          h(ProjectModal, {
            project: projectWithVideo,
          }),
      }),
      modalCtx
    )
    const teleportedModalHtml = Object.values(modalCtx.teleports || {}).join('')
    assert.ok(teleportedModalHtml.includes('role="dialog"'))
    assert.ok(teleportedModalHtml.includes('aria-modal="true"'))
    assert.ok(teleportedModalHtml.includes('modal-video-player'))
    assert.ok(teleportedModalHtml.includes('Mandante / Cliente'))
  } finally {
    await vite.close()
  }
})
