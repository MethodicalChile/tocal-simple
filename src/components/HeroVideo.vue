<script setup>
import { computed, onMounted, ref } from 'vue'
import { conBase } from '../config.js'
import { obras } from '../data/obras.js'
import { duracion, tramos } from '../data/montaje.js'

const emit = defineEmits(['ver-obra'])

const video = ref(null)
const listo = ref(false)
const pausado = ref(false)
const tiempo = ref(0)

const porId = Object.fromEntries(obras.map((o) => [o.id, o]))
const tomas = tramos.map((t, i) => ({
  ...t,
  hasta: tramos[i + 1]?.desde ?? duracion,
  datos: porId[t.obra],
}))
const actual = computed(() => {
  let i = 0
  for (let k = 0; k < tomas.length; k++) if (tiempo.value >= tomas[k].desde) i = k
  return i
})
const obra = computed(() => tomas[actual.value].datos)
const avance = (i) => {
  const t = tomas[i]
  if (i < actual.value) return 1
  if (i > actual.value) return 0
  return Math.min(1, (tiempo.value - t.desde) / (t.hasta - t.desde))
}

onMounted(() => {
  const v = video.value
  if (!v) return
  // con movimiento reducido el montaje no parte solo: queda el primer cuadro y la ficha de Tucapel
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    pausado.value = true
    return
  }
  v.play().catch(() => { pausado.value = true })
})

function alternar() {
  const v = video.value
  if (v.paused) { v.play(); pausado.value = false } else { v.pause(); pausado.value = true }
}
function irAToma(i) {
  video.value.currentTime = tomas[i].desde + 0.05
  tiempo.value = video.value.currentTime
}
</script>

<template>
  <section id="inicio" class="hero">
    <div class="hero__media" aria-hidden="true">
      <img class="hero__poster" :src="conBase('/video/montaje-poster.webp')" alt="" fetchpriority="high" width="1280" height="720" />
      <video
        ref="video" class="hero__video" :class="{ 'es-listo': listo }" :poster="conBase('/video/montaje-poster.webp')"
        muted loop playsinline preload="auto" @playing="listo = true" @timeupdate="tiempo = $event.target.currentTime"
      >
        <source :src="conBase('/video/montaje.webm')" type="video/webm" />
        <source :src="conBase('/video/montaje.mp4')" type="video/mp4" />
      </video>
    </div>

    <div class="contenedor hero__cuerpo">
      <h1>Plantas, bodegas y estaciones de servicio, construidas desde 2008.</h1>
      <p class="hero__bajada">
        Obras industriales y comerciales entre Coquimbo y La Araucanía, con oficinas en Santiago y Linares.
      </p>
      <div class="hero__acciones">
        <a class="boton boton--naranja" href="#contacto">Cotizar una obra</a>
        <a class="enlace" href="#obras">Ver las {{ obras.length }} obras en el mapa</a>
      </div>
    </div>

    <div class="hero__franja">
      <div class="contenedor franja">
        <div class="franja__tomas">
          <p class="franja__rotulo">En pantalla <span class="num">{{ actual + 1 }}/{{ tomas.length }}</span></p>
          <div class="franja__barras">
            <button
              v-for="(t, i) in tomas" :key="t.obra" type="button" class="franja__barra"
              :aria-label="`Ver ${t.datos.nombre}`" :aria-current="i === actual" @click="irAToma(i)"
            ><span :style="{ transform: `scaleX(${avance(i)})` }"></span></button>
          </div>
        </div>
        <dl class="franja__ficha" aria-live="polite">
          <div class="franja__obra"><dt>Obra</dt><dd>{{ obra.nombre }}</dd></div>
          <div><dt>Mandante</dt><dd>{{ obra.mandante }}</dd></div>
          <div><dt>Comuna</dt><dd>{{ obra.comuna }}</dd></div>
          <div><dt>Superficie</dt><dd class="num">{{ obra.construida || 'Sin dato' }}</dd></div>
          <div><dt>Período</dt><dd class="num">{{ obra.anios || 'Sin dato' }}</dd></div>
        </dl>
        <div class="franja__acciones">
          <button type="button" class="enlace" @click="emit('ver-obra', obra.id)">Ver ficha</button>
          <button type="button" class="franja__pausa" @click="alternar">{{ pausado ? 'Reproducir' : 'Pausar' }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative; min-height: min(100svh, 880px); display: grid; grid-template-rows: 1fr auto;
  color: #fff; background: var(--tinta); overflow: hidden; isolation: isolate;
}
.hero__media, .hero__poster, .hero__video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero__media { z-index: -1; }
.hero__video { opacity: 0; transition: opacity .8s ease; }
.hero__video.es-listo { opacity: 1; }
.hero__media::after {
  content: ''; position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(20, 21, 23, .55) 0, rgba(20, 21, 23, 0) 160px),
    linear-gradient(0deg, rgba(20, 21, 23, .7) 0%, rgba(20, 21, 23, .25) 50%, rgba(20, 21, 23, .05) 100%);
}
.hero__cuerpo { align-self: end; padding-bottom: var(--e7); }
.hero h1 { max-width: 19ch; }
.hero__bajada { max-width: 46ch; margin-top: var(--e4); font-size: var(--t-lead); line-height: 1.55; color: rgba(255, 255, 255, .86); }
.hero__acciones { display: flex; flex-wrap: wrap; align-items: center; gap: var(--e4) var(--e6); margin-top: var(--e6); }
.hero__acciones .enlace { text-decoration-color: rgba(255, 255, 255, .55); }

/* franja inferior: la ficha técnica de la obra que se ve en el montaje */
.hero__franja { background: rgba(28, 29, 32, .82); border-top: 1px solid rgba(255, 255, 255, .18); backdrop-filter: blur(8px); }
.franja {
  display: grid; grid-template-columns: 180px minmax(0, 1fr) auto; align-items: stretch;
  font-size: var(--t-dato); line-height: 1.4;
}
.franja > * { padding-block: var(--e4); }
.franja__tomas { padding-right: var(--e5); border-right: 1px solid rgba(255, 255, 255, .18); }
.franja__rotulo { color: rgba(255, 255, 255, .62); }
.franja__rotulo span { color: #fff; margin-left: var(--e1); }
.franja__barras { display: flex; gap: 4px; margin-top: var(--e1); }
.franja__barra { position: relative; flex: 1; height: 24px; padding: 11px 0; border: 0; background: none; }
.franja__barra::before { content: ''; display: block; height: 2px; background: rgba(255, 255, 255, .28); }
.franja__barra span {
  position: absolute; left: 0; right: 0; top: 11px; height: 2px; background: var(--naranja); transform-origin: left;
}
.franja__ficha { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1.5fr) repeat(3, minmax(0, 1fr)); }
.franja__ficha > div { padding: 0 var(--e5); border-right: 1px solid rgba(255, 255, 255, .18); min-width: 0; }
.franja__ficha dt { color: rgba(255, 255, 255, .62); }
.franja__ficha dd { margin-top: 2px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.franja__acciones { display: flex; flex-direction: column; justify-content: center; gap: var(--e2); padding-left: var(--e5); }
.franja__acciones button { border: 0; background: none; padding: 0; color: #fff; font-size: var(--t-dato); text-align: left; }
.franja__acciones .enlace { text-decoration-color: rgba(255, 255, 255, .55); }
.franja__pausa { color: rgba(255, 255, 255, .7) !important; }
.franja__pausa:hover { color: #fff !important; }

@media (max-width: 1100px) {
  .franja__ficha { grid-template-columns: minmax(0, 2fr) repeat(2, minmax(0, 1fr)); }
  .franja__ficha > div:nth-child(n + 4) { display: none; }
}
@media (max-width: 760px) {
  .franja { grid-template-columns: 1fr auto; }
  .franja__tomas { grid-column: 1 / -1; border-right: 0; padding-right: 0; padding-bottom: 0; }
  .franja__ficha { grid-template-columns: 1fr; }
  .franja__ficha > div { padding: 0; border: 0; }
  .franja__ficha > div:not(.franja__obra) { display: none; }
  .franja__acciones { padding-left: var(--e4); }
}
</style>
