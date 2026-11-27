<script setup>
import { computed, ref, watch } from 'vue'
import { obras, sectores } from '../data/obras.js'
import { foto } from '../config.js'

const actualId = defineModel('actual', { default: null })
const emit = defineEmits(['ampliar'])

const nombreSector = Object.fromEntries(sectores.map((s) => [s.id, s.nombre]))
const ESPECIALES = { Maule: 'Región del Maule', 'Biobío': 'Región del Biobío', Metropolitana: 'Región Metropolitana' }
const regionLarga = (r) => ESPECIALES[r] || `Región de ${r}`

// curaduría: primero las obras con portada de buena resolución (las destacadas antes), al final las de fotos chicas
const ABREN = ['planta-tucapel-retiro', 'shell-enex-san-carlos', 'copec-chillan']
const fichas = computed(() => {
  const peso = (o) =>
    (ABREN.includes(o.id) ? ABREN.indexOf(o.id) : 10) + (o.destacada ? 0 : 10) + (foto(o.portada).grande ? 0 : 100)
  return obras.filter((o) => o.portada).sort((a, b) => peso(a) - peso(b))
})
const conVideo = computed(() => fichas.value.filter((o) => o.videos?.length).length)

const indice = computed(() => Math.max(0, fichas.value.findIndex((o) => o.id === actualId.value)))
const obra = computed(() => fichas.value[indice.value])
const imagenes = computed(() => [obra.value.portada, ...(obra.value.galeria || [])])
const imagen = ref(0)
const enVideo = ref(-1)
watch(obra, () => { imagen.value = 0; enVideo.value = -1 })

const ir = (d) => { actualId.value = fichas.value[(indice.value + d + fichas.value.length) % fichas.value.length].id }
const elegir = (o) => { actualId.value = o.id }
const principal = computed(() => foto(imagenes.value[imagen.value]))

const ficha = computed(() => {
  const o = obra.value
  return [
    ['Mandante', o.mandante],
    ['Ubicación', `${o.comuna}, ${regionLarga(o.region)}`],
    ['Rubro', nombreSector[o.sector]],
    ['Superficie construida', o.construida],
    ['Obras exteriores', o.exterior],
    ['Período', o.anios],
  ].filter(([, v]) => v)
})

// el índice horizontal sigue a la ficha elegida
const tira = ref(null)
watch(indice, (i) => {
  const el = tira.value?.children[i]
  if (el) tira.value.scrollTo({ left: el.offsetLeft - tira.value.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
})
</script>

<template>
  <section id="fichas" class="fichas">
    <div class="contenedor">
      <div class="cabeza">
        <h2>Fichas de obra</h2>
        <p>{{ fichas.length }} obras con registro fotográfico; {{ conVideo }} con vuelo en dron.</p>
      </div>

      <article class="ficha-obra-grande grilla" :aria-label="obra.nombre">
        <div class="fg__media">
          <div class="fg__marco">
            <video
              v-if="enVideo >= 0" :key="obra.videos[enVideo].src" :src="obra.videos[enVideo].src"
              controls autoplay muted playsinline :poster="principal.src"
            ></video>
            <button v-else type="button" class="fg__ampliar" @click="emit('ampliar', obra, imagen)">
              <img
                :key="principal.src" :src="principal.src" :srcset="principal.srcset"
                sizes="(max-width: 900px) 100vw, 860px" :alt="`${obra.nombre}, fotografía ${imagen + 1} de ${imagenes.length}`"
              />
              <span class="fg__lupa">Ampliar</span>
            </button>
          </div>
          <div class="fg__miniaturas">
            <button
              v-for="(src, i) in imagenes" :key="src" type="button" :aria-pressed="enVideo < 0 && imagen === i"
              :aria-label="`Fotografía ${i + 1}`" @click="imagen = i; enVideo = -1"
            ><img :src="foto(src).src" alt="" loading="lazy" /></button>
            <button
              v-for="(v, i) in obra.videos || []" :key="v.src" type="button" class="fg__video"
              :aria-pressed="enVideo === i" @click="enVideo = i"
            >{{ v.titulo }}</button>
          </div>
        </div>

        <div class="fg__texto">
          <p class="fg__numero num">{{ String(indice + 1).padStart(2, '0') }} / {{ fichas.length }}</p>
          <h3>{{ obra.nombre }}</h3>
          <p v-if="obra.resumen" class="fg__resumen">{{ obra.resumen }}</p>
          <dl class="ficha">
            <template v-for="[k, v] in ficha" :key="k"><dt>{{ k }}</dt><dd>{{ v }}</dd></template>
          </dl>
          <div class="fg__nav">
            <button type="button" class="boton boton--contorno" @click="ir(-1)">Anterior</button>
            <button type="button" class="boton boton--contorno" @click="ir(1)">Siguiente</button>
          </div>
        </div>
      </article>

      <ol ref="tira" class="tira" aria-label="Todas las fichas de obra">
        <li v-for="(o, i) in fichas" :key="o.id">
          <button type="button" :aria-current="i === indice" @click="elegir(o)">
            <img :src="foto(o.portada).src" alt="" loading="lazy" />
            <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="tira__nombre">{{ o.nombre }}</span>
          </button>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.fichas { background: var(--blanco); padding-bottom: var(--e8); border-bottom: 1px solid var(--tinta); }
.ficha-obra-grande { padding-top: var(--e6); row-gap: var(--e5); }
.fg__media { grid-column: 1 / span 8; min-width: 0; }
.fg__texto { grid-column: 9 / span 4; display: flex; flex-direction: column; }

.fg__marco { position: relative; aspect-ratio: 3 / 2; background: var(--claro); overflow: hidden; }
.fg__marco video, .fg__marco img { width: 100%; height: 100%; object-fit: cover; }
.fg__marco video { object-fit: contain; background: #000; }
.fg__ampliar { display: block; width: 100%; height: 100%; padding: 0; border: 0; background: none; cursor: zoom-in; }
.fg__lupa {
  position: absolute; right: 0; bottom: 0; padding: 6px 10px; background: var(--tinta); color: #fff;
  font-size: var(--t-chico); opacity: 0; transition: opacity .15s;
}
.fg__ampliar:hover .fg__lupa, .fg__ampliar:focus-visible .fg__lupa { opacity: 1; }

.fg__miniaturas { display: flex; flex-wrap: wrap; gap: var(--e2); margin-top: var(--e2); }
.fg__miniaturas button {
  width: 88px; height: 58px; padding: 0; border: 1px solid var(--linea); background: var(--claro); overflow: hidden;
}
.fg__miniaturas img { width: 100%; height: 100%; object-fit: cover; }
.fg__miniaturas button[aria-pressed='true'] { outline: 2px solid var(--naranja); outline-offset: 1px; }
.fg__miniaturas .fg__video {
  width: auto; padding: 0 var(--e3); background: var(--tinta); color: #fff; font-size: var(--t-chico); font-weight: 500;
}
.fg__miniaturas .fg__video::before {
  content: ''; display: inline-block; margin-right: 8px; border-left: 7px solid var(--naranja); border-block: 4.5px solid transparent;
}

.fg__numero { font-size: var(--t-dato); color: var(--gris); padding-bottom: var(--e3); border-bottom: 1px solid var(--tinta); }
.fg__texto h3 { margin-top: var(--e4); font-size: clamp(1.375rem, 1.1rem + .8vw, 1.75rem); line-height: 1.2; letter-spacing: -0.02em; }
.fg__resumen { margin-top: var(--e3); color: var(--gris); font-size: var(--t-dato); line-height: 1.55; }
.fg__texto .ficha { margin-top: var(--e5); border-top: 1px solid var(--linea); }
.fg__nav { display: flex; gap: var(--e2); margin-top: auto; padding-top: var(--e5); }
.fg__nav .boton { flex: 1; min-height: 42px; }

.tira {
  display: flex; gap: 0; margin-top: var(--e7); overflow-x: auto; scroll-snap-type: x proximity;
  border-top: 1px solid var(--tinta); border-left: 1px solid var(--linea); scrollbar-width: thin;
}
.tira li { flex: none; width: 180px; scroll-snap-align: start; }
.tira button {
  display: block; width: 100%; height: 100%; padding: var(--e2); border: 0; border-right: 1px solid var(--linea);
  border-bottom: 1px solid var(--linea); background: none; text-align: left; font-size: var(--t-chico); line-height: 1.35;
}
.tira img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; background: var(--claro); filter: saturate(.85); }
.tira .num { display: block; margin-top: var(--e2); color: var(--gris); }
.tira__nombre { display: block; margin-top: 2px; font-weight: 500; }
.tira button:hover { background: var(--papel); }
.tira button[aria-current='true'] { background: var(--naranja-suave); }
.tira button[aria-current='true'] img { filter: none; }
.tira button[aria-current='true'] .num { color: var(--naranja-osc); }

@media (max-width: 900px) {
  .fg__media, .fg__texto { grid-column: 1 / -1; }
  .fg__nav { margin-top: var(--e5); }
  .tira li { width: 150px; }
}
</style>
