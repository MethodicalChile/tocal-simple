/**
 * Mapa de obras sobre MapLibre GL: relieve 3D real, Chile horizontal (norte a la izquierda), obras agrupadas
 * que se separan al acercarse, vuelo a cada obra y modo satélite.
 *
 * Estilo "ficha técnica": el mapa base se aclara y simplifica al cargar, las obras son hitos de topografía
 * (rombo naranjo), los grupos un cuadrado grafito con el número, y la ficha emergente es una tabla.
 *
 * Fuentes (sin claves de API):
 * - Mapa base: OpenFreeMap "positron" (© OpenMapTiles © colaboradores de OpenStreetMap)
 * - Relieve: AWS Terrain Tiles en formato Terrarium (Mapzen, SRTM, GMTED)
 * - Satélite: Sentinel-2 cloudless 2016 de EOX (CC BY 4.0)
 * - Máscara y borde de Chile: Natural Earth (tools/mapa-chile/mascara.py)
 */
import { FullscreenControl, LngLatBounds, Map as MapaGL, NavigationControl, Popup, ScaleControl, setWorkerUrl } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import urlWorker from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url'

setWorkerUrl(urlWorker)

const NORTE_A_LA_IZQUIERDA = 90   // rumbo del mapa: el este queda arriba y el norte a la izquierda
const NARANJA = '#e96a1e'
const TINTA = '#222326'
const GRIS = '#89898d'
const CHILE = [[-75.8, -55.9], [-66.4, -17.5]]

const ES = {
  'NavigationControl.ZoomIn': 'Acercar',
  'NavigationControl.ZoomOut': 'Alejar',
  'NavigationControl.ResetBearing': 'Volver a la orientación con el norte a la izquierda',
  'FullscreenControl.Enter': 'Pantalla completa',
  'FullscreenControl.Exit': 'Salir de pantalla completa',
  'AttributionControl.ToggleAttribution': 'Fuentes del mapa',
  'Popup.Close': 'Cerrar',
  'ScaleControl.Kilometers': 'km',
  'ScaleControl.Meters': 'm',
  'CooperativeGesturesHandler.WindowsHelpText': 'Use Ctrl + rueda del mouse para acercar el mapa',
  'CooperativeGesturesHandler.MacHelpText': 'Use ⌘ + rueda del mouse para acercar el mapa',
  'CooperativeGesturesHandler.MobileHelpText': 'Use dos dedos para mover el mapa',
}

const punto = (o) => ({
  type: 'Feature',
  id: o.n,
  properties: { id: o.id, nombre: o.nombre },
  geometry: { type: 'Point', coordinates: [o.lon, o.lat] },
})
const coleccion = (lista) => ({ type: 'FeatureCollection', features: lista.map(punto) })

/** Íconos dibujados en canvas a 2×: rombo de obra, anillo de obra activa, cuadrado de grupo y de oficina. */
function iconos(mapa) {
  const dibujar = (nombre, lado, fn) => {
    const c = document.createElement('canvas')
    c.width = c.height = lado * 2
    const g = c.getContext('2d')
    g.scale(2, 2)
    fn(g, lado)
    mapa.addImage(nombre, g.getImageData(0, 0, lado * 2, lado * 2), { pixelRatio: 2 })
  }
  const rombo = (g, l, r) => {
    g.beginPath()
    g.moveTo(l / 2, l / 2 - r); g.lineTo(l / 2 + r, l / 2); g.lineTo(l / 2, l / 2 + r); g.lineTo(l / 2 - r, l / 2)
    g.closePath()
  }
  dibujar('hito', 20, (g, l) => {
    rombo(g, l, 8); g.fillStyle = '#fff'; g.fill()
    rombo(g, l, 5.8); g.fillStyle = NARANJA; g.fill()
  })
  dibujar('hito-activo', 34, (g, l) => {
    rombo(g, l, 14); g.lineWidth = 2.5; g.strokeStyle = TINTA; g.stroke()
  })
  dibujar('grupo', 28, (g, l) => {
    g.fillStyle = '#fff'; g.fillRect(0, 0, l, l)
    g.fillStyle = TINTA; g.fillRect(2, 2, l - 4, l - 4)
    g.fillStyle = NARANJA; g.fillRect(2, l - 5, l - 4, 3)
  })
  dibujar('oficina', 14, (g, l) => {
    g.fillStyle = '#fff'; g.fillRect(0, 0, l, l)
    g.fillStyle = '#56565b'; g.fillRect(2, 2, l - 4, l - 4)
  })
}

/** Simplifica el mapa base positron: menos caminos y rótulos, agua gris, límites regionales punteados. */
function afinarMapaBase(mapa) {
  const capas = mapa.getStyle().layers
  const fijar = (id, prop, valor, tipo = 'paint') => {
    if (!mapa.getLayer(id)) return
    try {
      tipo === 'paint' ? mapa.setPaintProperty(id, prop, valor) : mapa.setLayoutProperty(id, prop, valor)
    } catch { /* la capa no tiene esa propiedad en esta versión del estilo */ }
  }
  fijar('background', 'background-color', '#fbfbfa')
  fijar('water', 'fill-color', '#e3e6e6')
  fijar('park', 'fill-opacity', 0.25)
  fijar('landcover_wood', 'fill-opacity', 0.25)
  for (const l of capas) {
    if (/^(highway_path|highway_minor|road_pier|railway|aeroway|airport|label_other|waterway_line_label|highway-name|highway-shield|road_shield)/.test(l.id)) {
      mapa.setLayerZoomRange(l.id, Math.max(l.minzoom ?? 0, 10), l.maxzoom ?? 24)
    }
    if (l.type === 'symbol' && /^label_(village|town)/.test(l.id)) fijar(l.id, 'text-color', '#6c6d71')
  }
  fijar('boundary_3', 'line-color', GRIS)
  fijar('boundary_3', 'line-dasharray', [2, 2])
  fijar('boundary_2', 'line-color', '#56565b')
}

export async function crearMapa({ contenedor, escala, obras, oficinas, base = '/', fotoDe, reducirMovimiento = false, onHover, onSelect, onAbrir }) {
  const dur = (ms) => (reducirMovimiento ? 0 : ms)
  const porId = Object.fromEntries(obras.map((o, n) => [o.id, { ...o, n }]))
  const lista = Object.values(porId)
  let visibles = lista

  const mapa = new MapaGL({
    container: contenedor,
    style: 'https://tiles.openfreemap.org/styles/positron',
    bounds: CHILE,
    bearing: NORTE_A_LA_IZQUIERDA,
    pitch: 20,
    maxPitch: 75,
    cooperativeGestures: true,
    locale: ES,
    attributionControl: { compact: true },
    fadeDuration: 150,
  })
  mapa.addControl(new NavigationControl({ visualizePitch: true }), 'top-right')
  mapa.addControl(new FullscreenControl(), 'top-right')
  mapa.addControl(new ScaleControl({ unit: 'metric' }), 'bottom-right')

  await new Promise((ok, mal) => {
    mapa.once('load', ok)
    mapa.once('error', (e) => (mapa.loaded() ? null : mal(e.error || e)))
  })

  // las fuentes del mapa quedan plegadas en el botón (i): desplegadas tapan el mapa en pantallas chicas
  contenedor.querySelector('.maplibregl-ctrl-attrib')?.classList.remove('maplibregl-compact-show')
  afinarMapaBase(mapa)
  iconos(mapa)

  // ── relieve, satélite y máscara ─────────────────────────────────────────────────────────
  const primeraEtiqueta = mapa.getStyle().layers.find((l) => l.type === 'symbol')?.id
  const terrarium = (maxzoom) => ({
    type: 'raster-dem',
    tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
    encoding: 'terrarium', tileSize: 256, maxzoom,
    attribution: 'Relieve: <a href="https://registry.opendata.aws/terrain-tiles/">Mapzen Terrain Tiles</a>',
  })
  mapa.addSource('dem-terreno', terrarium(12))
  mapa.addSource('dem-sombra', terrarium(12))
  mapa.addSource('satelite', {
    type: 'raster',
    tiles: ['https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg'],
    tileSize: 256, maxzoom: 15,
    attribution: '<a href="https://s2maps.eu">Sentinel-2 cloudless</a> de EOX (datos Copernicus 2016)',
  })
  mapa.addSource('mascara', { type: 'geojson', data: `${base}mapa/chile-mascara.geojson` })
  mapa.addSource('contorno', { type: 'geojson', data: `${base}mapa/chile-contorno.geojson` })

  mapa.addLayer({ id: 'satelite', type: 'raster', source: 'satelite', layout: { visibility: 'none' } }, primeraEtiqueta)
  mapa.addLayer({
    id: 'sombreado', type: 'hillshade', source: 'dem-sombra',
    paint: {
      'hillshade-exaggeration': 0.6,
      'hillshade-shadow-color': '#62656a',
      'hillshade-highlight-color': '#ffffff',
      'hillshade-accent-color': '#909397',
      'hillshade-illumination-direction': 315,
    },
  }, primeraEtiqueta)
  // la máscara va sobre todo el mapa base, etiquetas incluidas: lo que no es Chile queda como fondo
  mapa.addLayer({ id: 'fuera-de-chile', type: 'fill', source: 'mascara', paint: { 'fill-color': '#f6f6f4', 'fill-opacity': 0.82 } })
  mapa.addLayer({
    id: 'borde-chile', type: 'line', source: 'contorno',
    paint: { 'line-color': TINTA, 'line-width': ['interpolate', ['linear'], ['zoom'], 4, 0.6, 10, 1.4], 'line-opacity': 0.55 },
  })

  mapa.setTerrain({ source: 'dem-terreno', exaggeration: 1.6 })
  mapa.setSky({
    'sky-color': '#d9e0e5', 'horizon-color': '#f1f2f2', 'fog-color': '#f6f6f4',
    'sky-horizon-blend': 0.6, 'horizon-fog-blend': 0.7, 'fog-ground-blend': 0.25, 'atmosphere-blend': 0,
  })

  // ── obras y oficinas ────────────────────────────────────────────────────────────────────
  mapa.addSource('obras', { type: 'geojson', data: coleccion(visibles), cluster: true, clusterRadius: 34, clusterMaxZoom: 10 })
  mapa.addSource('obras-todas', { type: 'geojson', data: coleccion(visibles) })
  mapa.addSource('oficinas', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: oficinas.map((o) => ({ type: 'Feature', properties: { nombre: o.nombre }, geometry: { type: 'Point', coordinates: [o.lon, o.lat] } })),
    },
  })
  const texto = { 'text-color': TINTA, 'text-halo-color': '#fff', 'text-halo-width': 1.6 }

  mapa.addLayer({
    id: 'oficinas', type: 'symbol', source: 'oficinas',
    layout: {
      'icon-image': 'oficina', 'icon-allow-overlap': true,
      'text-field': ['get', 'nombre'], 'text-font': ['Noto Sans Regular'], 'text-size': 11,
      'text-offset': [0, 1], 'text-anchor': 'top', 'text-optional': true,
    },
    paint: { ...texto, 'text-opacity': ['step', ['zoom'], 0, 7, 1] },
  })
  mapa.addLayer({
    id: 'grupos', type: 'symbol', source: 'obras', filter: ['has', 'point_count'],
    layout: {
      'icon-image': 'grupo', 'icon-allow-overlap': true, 'text-allow-overlap': true,
      'icon-size': ['step', ['get', 'point_count'], 0.86, 4, 1, 7, 1.18],
      'text-field': ['get', 'point_count'], 'text-font': ['Noto Sans Bold'], 'text-size': 12, 'text-offset': [0, -0.1],
    },
    paint: { 'text-color': '#fff' },
  })
  mapa.addLayer({
    id: 'obras', type: 'symbol', source: 'obras', filter: ['!', ['has', 'point_count']],
    layout: {
      'icon-image': 'hito', 'icon-allow-overlap': true,
      'text-field': ['step', ['zoom'], '', 9.5, ['get', 'nombre']], 'text-font': ['Noto Sans Regular'], 'text-size': 12,
      'text-max-width': 14, 'text-offset': [0, 1], 'text-anchor': 'top', 'text-optional': true,
    },
    paint: texto,
  })
  // rombo de la obra activa (desde la lista o el mapa): se dibuja aunque la obra esté dentro de un grupo
  mapa.addLayer({
    id: 'obra-activa', type: 'symbol', source: 'obras-todas', filter: ['==', ['get', 'id'], ''],
    layout: { 'icon-image': 'hito-activo', 'icon-allow-overlap': true, 'icon-ignore-placement': true },
  })

  // ── escala de latitud en el borde superior: marcas cada grado, rótulo cada cinco ──────────
  function dibujarEscala() {
    if (!escala) return
    const ancho = contenedor.clientWidth
    const marcas = []
    for (let lat = -18; lat >= -56; lat--) {
      const x = mapa.project([-71.2, lat]).x
      if (x < 8 || x > ancho - 8) continue
      marcas.push(`<span class="escala__marca${lat % 5 === 0 ? ' escala__marca--cinco' : ''}" style="left:${x.toFixed(1)}px">${lat % 5 === 0 ? `${-lat}° S` : ''}</span>`)
    }
    escala.innerHTML = marcas.join('')
  }
  mapa.on('move', dibujarEscala)
  dibujarEscala()

  // ── encuadres ───────────────────────────────────────────────────────────────────────────
  const limites = (l) => l.reduce((b, o) => b.extend([o.lon, o.lat]), new LngLatBounds([l[0].lon, l[0].lat], [l[0].lon, l[0].lat]))
  const margen = () => {
    const w = contenedor.clientWidth
    return w < 700 ? { top: 80, bottom: 40, left: 30, right: 30 } : { top: 110, bottom: 60, left: 80, right: 80 }
  }
  function vista(cual) {
    cerrarFicha()
    if (cual === 'chile') {
      mapa.fitBounds(CHILE, { bearing: NORTE_A_LA_IZQUIERDA, pitch: 25, padding: 30, duration: dur(1800) })
    } else {
      mapa.fitBounds(limites(visibles.length ? visibles : lista), {
        bearing: NORTE_A_LA_IZQUIERDA, pitch: 52, padding: margen(), duration: dur(2400), maxZoom: 9,
      })
    }
  }

  // ── fichas emergentes ───────────────────────────────────────────────────────────────────
  const etiqueta = new Popup({ closeButton: false, closeOnClick: false, offset: 14, className: 'pop-etiqueta' })
  const ficha = new Popup({ closeButton: true, closeOnClick: false, offset: 18, maxWidth: '320px', className: 'pop-ficha' })

  function htmlFicha(o) {
    const el = document.createElement('div')
    el.className = 'ficha-obra'
    const f = o.portada && fotoDe?.(o.portada)
    if (f) {
      const img = document.createElement('img')
      img.src = f.src
      img.alt = ''
      img.className = 'ficha-obra__foto'
      el.appendChild(img)
    }
    const h = document.createElement('p')
    h.className = 'ficha-obra__nombre'
    h.textContent = o.nombre
    el.appendChild(h)
    const dl = document.createElement('dl')
    dl.className = 'ficha'
    for (const [k, v] of [['Mandante', o.mandante], ['Comuna', `${o.comuna}, ${o.region}`], ['Superficie', o.construida], ['Período', o.anios]]) {
      if (!v) continue
      const dt = document.createElement('dt'); dt.textContent = k
      const dd = document.createElement('dd'); dd.textContent = v
      dl.append(dt, dd)
    }
    el.appendChild(dl)
    if (o.portada) {
      const b = document.createElement('button')
      b.type = 'button'
      b.className = 'ficha-obra__boton'
      b.textContent = o.videos?.length ? 'Ver fotos y video' : 'Ver fotos'
      b.addEventListener('click', () => onAbrir?.(o.id))
      el.appendChild(b)
    }
    return el
  }
  function cerrarFicha() { ficha.remove() }

  function resaltar(id) {
    mapa.setFilter('obra-activa', ['==', ['get', 'id'], id || ''])
    const o = id && porId[id]
    if (o && !ficha.isOpen()) etiqueta.setLngLat([o.lon, o.lat]).setText(o.nombre).addTo(mapa)
    else etiqueta.remove()
  }

  function seleccionar(id) {
    const o = porId[id]
    if (!o) return
    etiqueta.remove()
    mapa.setFilter('obra-activa', ['==', ['get', 'id'], id])
    mapa.flyTo({
      center: [o.lon, o.lat], zoom: 11.2, pitch: 60, bearing: NORTE_A_LA_IZQUIERDA,
      duration: dur(2600), essential: true, padding: { top: 220, bottom: 0, left: 0, right: 0 },
    })
    ficha.setLngLat([o.lon, o.lat]).setDOMContent(htmlFicha(o)).addTo(mapa)
  }

  // ── interacción en el mapa ──────────────────────────────────────────────────────────────
  mapa.on('mouseenter', 'obras', (e) => {
    mapa.getCanvas().style.cursor = 'pointer'
    onHover?.(e.features[0].properties.id)
  })
  mapa.on('mouseleave', 'obras', () => {
    mapa.getCanvas().style.cursor = ''
    onHover?.(null)
  })
  mapa.on('click', 'obras', (e) => onSelect?.(e.features[0].properties.id))
  mapa.on('mouseenter', 'grupos', () => { mapa.getCanvas().style.cursor = 'zoom-in' })
  mapa.on('mouseleave', 'grupos', () => { mapa.getCanvas().style.cursor = '' })
  mapa.on('click', 'grupos', async (e) => {
    const f = e.features[0]
    const zoom = await mapa.getSource('obras').getClusterExpansionZoom(f.properties.cluster_id)
    mapa.easeTo({ center: f.geometry.coordinates, zoom: zoom + 0.3, duration: dur(900) })
  })

  function filtrar(ids) {
    visibles = ids ? lista.filter((o) => ids.has(o.id)) : lista
    mapa.getSource('obras').setData(coleccion(visibles))
    mapa.getSource('obras-todas').setData(coleccion(visibles))
  }

  function capa(cual) {
    const sat = cual === 'satelite'
    mapa.setLayoutProperty('satelite', 'visibility', sat ? 'visible' : 'none')
    mapa.setPaintProperty('fuera-de-chile', 'fill-color', sat ? '#1c1d1f' : '#f6f6f4')
    mapa.setPaintProperty('fuera-de-chile', 'fill-opacity', sat ? 0.55 : 0.82)
    mapa.setPaintProperty('borde-chile', 'line-color', sat ? '#ffffff' : TINTA)
    mapa.setLayoutProperty('sombreado', 'visibility', sat ? 'none' : 'visible')
  }

  // el único movimiento automático: de Chile completo a la zona donde están las obras
  setTimeout(() => vista('obras'), reducirMovimiento ? 0 : 600)

  return {
    mapa, vista, resaltar, seleccionar, filtrar, capa,
    redimensionar: () => mapa.resize(),
    destruir: () => mapa.remove(),
  }
}
