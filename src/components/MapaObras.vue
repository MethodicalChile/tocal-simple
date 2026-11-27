<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { obras, oficinas, sectores, regionesConObras } from '../data/obras.js'
import { conBase, foto } from '../config.js'

const sector = defineModel('sector', { default: 'todas' })
const emit = defineEmits(['abrir'])
const BASE = import.meta.env.BASE_URL || '/'

// ── lista: norte a sur, agrupada por región, con buscador y filtro por rubro ──────────────
const ordenadas = [...obras].sort((a, b) => b.lat - a.lat)
const porId = Object.fromEntries(obras.map((o) => [o.id, o]))
const texto = ref('')
const normal = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const visibles = computed(() => {
  const q = normal(texto.value.trim())
  return ordenadas.filter((o) =>
    (sector.value === 'todas' || o.sector === sector.value) &&
    (!q || normal(`${o.nombre} ${o.mandante} ${o.comuna} ${o.region}`).includes(q)),
  )
})
const porRegion = computed(() => {
  const m = new Map()
  for (const o of visibles.value) {
    if (!m.has(o.region)) m.set(o.region, [])
    m.get(o.region).push(o)
  }
  return [...m.entries()]
})
const cuenta = (id) => (id === 'todas' ? obras.length : obras.filter((o) => o.sector === id).length)

// ── estado compartido entre lista y mapa ─────────────────────────────────────────────────
const activa = ref(null)          // obra bajo el cursor (en la lista o en el mapa)
const elegida = ref(null)         // obra abierta en el mapa
const listaEl = ref(null)

// ── mapa (se carga al acercarse la sección) ──────────────────────────────────────────────
const seccion = ref(null)
const contenedor = ref(null)
const escala = ref(null)
const fase = ref('espera')        // espera | cargando | listo | sin-webgl
const capa = ref('mapa')
const vistaActual = ref('obras')
let mapa = null
let io = null

async function cargarMapa() {
  fase.value = 'cargando'
  try {
    const prueba = document.createElement('canvas')
    if (!prueba.getContext('webgl2') && !prueba.getContext('webgl')) throw new Error('sin WebGL')
    const { crearMapa } = await import('../lib/mapaObras.js')
    mapa = await crearMapa({
      contenedor: contenedor.value,
      escala: escala.value,
      fotoDe: foto,
      obras,
      oficinas,
      base: BASE,
      reducirMovimiento: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      onHover: (id) => { activa.value = id },
      onSelect: (id) => elegir(id, true),
      onAbrir: (id) => emit('abrir', porId[id]),
    })
    mapa.filtrar(new Set(visibles.value.map((o) => o.id)))
    fase.value = 'listo'
  } catch (err) {
    console.warn('Mapa no disponible:', err)
    fase.value = 'sin-webgl'
  }
}

onMounted(() => {
  // MapLibre pesa ~300 KB y ocupa el procesador al iniciar: se carga recién cuando la sección asoma en pantalla
  io = new IntersectionObserver((e) => {
    if (e.some((x) => x.isIntersecting) && fase.value === 'espera') cargarMapa()
  }, { threshold: 0.12 })
  io.observe(seccion.value)
})
onBeforeUnmount(() => { io?.disconnect(); mapa?.destruir() })

watch(visibles, (v) => mapa?.filtrar(new Set(v.map((o) => o.id))))
watch(activa, (id) => {
  mapa?.resaltar(id)
  // si el cursor está en el mapa, la lista muestra la obra sin mover la página
  const item = id && listaEl.value?.querySelector(`[data-obra="${id}"]`)
  const caja = listaEl.value
  if (item && caja && caja.scrollHeight > caja.clientHeight + 4) {
    const arriba = item.offsetTop
    if (arriba < caja.scrollTop + 40 || arriba > caja.scrollTop + caja.clientHeight - item.offsetHeight) {
      caja.scrollTo({ top: arriba - caja.clientHeight / 3, behavior: 'smooth' })
    }
  }
})

async function elegir(id, desdeMapa = false) {
  elegida.value = id
  mapa?.seleccionar(id)
  vistaActual.value = ''
  // en celulares el mapa queda arriba de la lista: al elegir desde la lista se vuelve a él
  if (!desdeMapa && window.innerWidth < 900) {
    await nextTick()
    contenedor.value?.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function vista(cual) {
  elegida.value = null
  vistaActual.value = cual
  mapa?.vista(cual)
}

function cambiarCapa(cual) {
  capa.value = cual
  mapa?.capa(cual)
}
</script>

<template>
  <section id="obras" ref="seccion" class="obras">
    <div class="obras__marco">
      <div class="panel">
        <div class="panel__cabeza">
          <h2>Dónde hemos construido</h2>
          <p>{{ obras.length }} obras en {{ regionesConObras.length }} regiones, de Coquimbo a La Araucanía.</p>
          <label class="sr" for="buscar-obra">Buscar obra</label>
          <input
            id="buscar-obra" v-model="texto" class="panel__buscar" type="search"
            placeholder="Buscar por obra, mandante o comuna" autocomplete="off"
          />
          <div class="filtros" role="group" aria-label="Filtrar por rubro">
            <button
              v-for="s in [{ id: 'todas', nombre: 'Todas' }, ...sectores]" :key="s.id" type="button"
              class="filtro" :aria-pressed="sector === s.id" @click="sector = s.id"
            >{{ s.nombre }} <span class="num">{{ cuenta(s.id) }}</span></button>
          </div>
        </div>

        <div ref="listaEl" class="panel__lista">
          <p v-if="!visibles.length" class="panel__vacio">
            Ninguna obra coincide con «{{ texto }}». Pruebe con el nombre de una comuna o de un mandante.
          </p>
          <section v-for="[region, lista] in porRegion" :key="region" class="region">
            <h3 class="region__nombre">{{ region }} <span class="num">{{ lista.length }}</span></h3>
            <ul>
              <li
                v-for="o in lista" :key="o.id" :data-obra="o.id" class="item"
                :class="{ 'es-activa': activa === o.id, 'es-elegida': elegida === o.id }"
                @mouseenter="activa = o.id" @mouseleave="activa = null"
              >
                <button type="button" class="item__principal" @click="elegir(o.id)" @focus="activa = o.id" @blur="activa = null">
                  <span class="item__nombre">{{ o.nombre }}</span>
                  <span class="item__lugar">{{ o.comuna }}</span>
                  <span class="item__dato">{{ o.mandante }}</span>
                  <span class="item__anios num">{{ o.enCurso ? 'En ejecución' : o.anios || '' }}</span>
                </button>
                <button v-if="o.portada" type="button" class="item__fotos enlace" @click="emit('abrir', o)">
                  {{ o.videos?.length ? 'Fotos y video' : 'Fotos' }}<span class="sr"> de {{ o.nombre }}</span>
                </button>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <div class="mapa">
        <div ref="contenedor" class="mapa__gl" role="region" aria-label="Mapa de obras de Tocal en Chile, con el norte a la izquierda"></div>
        <div ref="escala" class="escala" aria-hidden="true"></div>
        <img
          v-if="fase === 'sin-webgl'" class="mapa__poster" :src="conBase('/mapa/chile-poster.webp')"
          alt="Maqueta en relieve de la zona centro-sur de Chile, de Coquimbo a La Araucanía"
        />
        <p v-if="fase === 'cargando' || fase === 'espera'" class="mapa__estado">Cargando el mapa…</p>

        <div v-if="fase === 'listo'" class="mapa__barra">
          <div class="segmentos" role="group" aria-label="Encuadre">
            <button type="button" :aria-pressed="vistaActual === 'obras'" @click="vista('obras')">Zona de obras</button>
            <button type="button" :aria-pressed="vistaActual === 'chile'" @click="vista('chile')">Chile completo</button>
          </div>
          <div class="segmentos" role="group" aria-label="Fondo del mapa">
            <button type="button" :aria-pressed="capa === 'mapa'" @click="cambiarCapa('mapa')">Mapa</button>
            <button type="button" :aria-pressed="capa === 'satelite'" @click="cambiarCapa('satelite')">Satélite</button>
          </div>
        </div>
        <p v-if="fase === 'listo'" class="mapa__ayuda">
          Norte a la izquierda. Arrastre para mover, Ctrl + rueda para acercar, clic derecho y arrastre para girar o inclinar.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.obras { background: var(--blanco); border-bottom: 1px solid var(--tinta); }
.obras__marco {
  display: grid; grid-template-columns: minmax(360px, 420px) 1fr;
  height: clamp(640px, calc(100svh - var(--header)), 960px);
}

/* ── panel ── */
.panel { display: flex; flex-direction: column; min-height: 0; border-right: 1px solid var(--tinta); }
.panel__cabeza { padding: var(--e6) var(--e5) var(--e4); border-bottom: 1px solid var(--tinta); }
.panel__cabeza > p { margin-top: var(--e2); color: var(--gris); font-size: var(--t-dato); }
.panel__buscar {
  width: 100%; min-height: 42px; margin-top: var(--e4); padding: 0 var(--e3); border: 1px solid var(--linea-fuerte);
  border-radius: var(--radio); background: var(--blanco); font-size: var(--t-dato);
}
.panel__buscar:focus { outline: 2px solid var(--naranja); outline-offset: -1px; }
.filtros { display: flex; flex-wrap: wrap; margin-top: var(--e3); border-top: 1px solid var(--linea); border-left: 1px solid var(--linea); }
.filtro {
  flex: 1 1 auto; min-height: 32px; padding: 0 var(--e2); border: 0; border-right: 1px solid var(--linea);
  border-bottom: 1px solid var(--linea); background: var(--blanco); font-size: var(--t-chico); color: var(--gris); text-align: left;
}
.filtro span { margin-left: 2px; color: var(--gris); }
.filtro:hover { color: var(--tinta); background: var(--papel); }
.filtro[aria-pressed='true'] { background: var(--tinta); color: #fff; }
.filtro[aria-pressed='true'] span { color: rgba(255, 255, 255, .7); }

.panel__lista { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; position: relative; }
.panel__vacio { padding: var(--e5); color: var(--gris); }
.region__nombre {
  position: sticky; top: 0; z-index: 1; display: flex; justify-content: space-between;
  padding: 7px var(--e5); background: var(--papel); border-bottom: 1px solid var(--linea);
  font-family: var(--f); font-size: var(--t-chico); font-weight: 600; letter-spacing: 0; color: var(--tinta);
}
.region__nombre span { color: var(--gris); font-weight: 500; }
.item { position: relative; border-bottom: 1px solid var(--linea); transition: background-color .12s; }
.item.es-activa { background: var(--naranja-suave); }
.item.es-elegida { background: var(--naranja-suave); box-shadow: inset 3px 0 0 var(--naranja); }
.item__principal {
  display: grid; grid-template-columns: minmax(0, 1fr) auto; column-gap: var(--e4); row-gap: 1px; width: 100%;
  padding: 11px var(--e5) 12px; border: 0; background: none; text-align: left; font-size: var(--t-dato); line-height: 1.4;
}
.item__nombre { font-weight: 600; color: var(--tinta); }
.item__lugar { text-align: right; color: var(--tinta); }
.item__dato, .item__anios { color: var(--gris); }
.item__anios { text-align: right; }
.item__fotos {
  display: flex; align-items: center; min-height: 28px; margin: -8px var(--e5) 6px auto; padding: 0 2px; border: 0; background: none;
  font-size: var(--t-chico);
}
.item.es-activa .item__nombre, .item.es-elegida .item__nombre { color: var(--naranja-osc); }

/* ── mapa ── */
.mapa { position: relative; min-width: 0; background: #eef0f0; }
.mapa__gl { position: absolute; inset: 0; }
.mapa__poster { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.mapa__estado { position: absolute; inset: auto 0 50%; text-align: center; color: var(--gris); }
.mapa__barra { position: absolute; left: 12px; top: 30px; display: flex; flex-wrap: wrap; gap: var(--e2); }
.segmentos { display: flex; background: var(--blanco); border: 1px solid var(--tinta); border-radius: var(--radio); }
.segmentos button {
  min-height: 32px; padding: 0 var(--e3); border: 0; background: none; font-size: var(--t-chico); font-weight: 500; color: var(--gris);
}
.segmentos button + button { border-left: 1px solid var(--tinta); }
.segmentos button[aria-pressed='true'] { background: var(--tinta); color: #fff; }
.mapa__ayuda {
  position: absolute; left: 12px; top: 72px; max-width: calc(100% - 80px); padding: 2px 8px;
  background: rgba(255, 255, 255, .9); font-size: .75rem; color: var(--gris);
}

/* escala de latitud: marcas sobre el borde superior del mapa */
.escala { position: absolute; inset: 0 0 auto; height: 22px; pointer-events: none; background: rgba(255, 255, 255, .88); border-bottom: 1px solid var(--linea-fuerte); }
.escala :deep(.escala__marca) { position: absolute; bottom: 0; width: 1px; height: 5px; background: var(--gris-medio); }
.escala :deep(.escala__marca--cinco) {
  height: 22px; background: var(--tinta); font-size: 11px; line-height: 21px; color: var(--tinta); white-space: nowrap;
  padding-left: 5px; width: auto; background: linear-gradient(var(--tinta), var(--tinta)) left / 1px 100% no-repeat;
  font-variant-numeric: tabular-nums;
}

/* fichas emergentes del mapa (las crea MapLibre fuera del ámbito del componente) */
:global(.pop-etiqueta .maplibregl-popup-content) {
  padding: 3px 8px; border-radius: var(--radio); background: var(--tinta); color: #fff; font: 500 var(--t-chico)/1.3 var(--f); box-shadow: none;
}
:global(.pop-etiqueta.maplibregl-popup-anchor-bottom .maplibregl-popup-tip) { border-top-color: var(--tinta); }
:global(.pop-etiqueta.maplibregl-popup-anchor-top .maplibregl-popup-tip) { border-bottom-color: var(--tinta); }
:global(.pop-ficha .maplibregl-popup-content) {
  padding: 0; border-radius: var(--radio); font-family: var(--f); border: 1px solid var(--tinta); box-shadow: 0 6px 20px rgba(0, 0, 0, .16);
  overflow: hidden;
}
:global(.pop-ficha .maplibregl-popup-close-button) {
  font-size: 18px; width: 28px; height: 28px; background: var(--blanco); color: var(--tinta); border-left: 1px solid var(--linea); border-bottom: 1px solid var(--linea);
}
:global(.ficha-obra__foto) { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; border-bottom: 1px solid var(--linea); }
:global(.ficha-obra__nombre) { padding: 12px 14px 6px; font-weight: 600; font-size: .9375rem; line-height: 1.3; color: var(--tinta); }
:global(.ficha-obra .ficha) { margin: 0 14px; font-size: var(--t-chico); }
:global(.ficha-obra .ficha > dt), :global(.ficha-obra .ficha > dd) { padding: 6px 0; }
:global(.ficha-obra__boton) {
  margin: 12px 14px 14px; min-height: 34px; padding: 0 12px; border: 0; border-radius: var(--radio); background: var(--naranja-boton); color: #fff;
  font: 600 var(--t-chico) var(--f); cursor: pointer;
}
:global(.ficha-obra__boton:hover) { background: var(--naranja-osc); }
:global(.maplibregl-cooperative-gesture-screen) { font-family: var(--f); }
:global(.maplibregl-ctrl-top-right) { top: 22px; }

@media (max-width: 900px) {
  /* en celular: título y buscador, luego el mapa, luego la lista */
  .obras__marco { grid-template-columns: 1fr; height: auto; }
  .panel { display: contents; }
  .panel__cabeza { order: 1; }
  .mapa { order: 2; height: 62svh; min-height: 360px; scroll-margin-top: var(--header); border-bottom: 1px solid var(--tinta); }
  .panel__lista { order: 3; overflow: visible; }
  .panel__cabeza { padding-inline: var(--gutter); }
  .region__nombre, .item__principal { padding-inline: var(--gutter); }
  .item__fotos { margin-right: var(--gutter); }
  .region__nombre { top: var(--header); }
  .mapa__barra { right: 52px; }
  .mapa__ayuda { display: none; }
}
</style>
