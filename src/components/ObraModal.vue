<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { foto } from '../config.js'
import { sectores } from '../data/obras.js'

const props = defineProps({ obra: { type: Object, default: null }, inicio: { type: Number, default: 0 } })
const emit = defineEmits(['cerrar'])

const dialogo = ref(null)
const indice = ref(0)
const modo = ref('fotos')        // fotos | video
const videoSel = ref(0)
const nombreSector = Object.fromEntries(sectores.map((s) => [s.id, s.nombre]))
const ESPECIALES = { Maule: 'Región del Maule', 'Biobío': 'Región del Biobío', Metropolitana: 'Región Metropolitana' }
const regionLarga = (r) => ESPECIALES[r] || `Región de ${r}`

const imagenes = computed(() => (props.obra ? [props.obra.portada, ...(props.obra.galeria || [])] : []))
const ficha = computed(() => {
  const o = props.obra
  if (!o) return []
  return [
    ['Mandante', o.mandante],
    ['Ubicación', `${o.comuna}, ${regionLarga(o.region)}`],
    ['Rubro', nombreSector[o.sector]],
    ['Superficie construida', o.construida],
    ['Obras exteriores', o.exterior],
    ['Período', o.anios],
  ].filter(([, v]) => v)
})

let foco = null
watch(() => props.obra, async (o) => {
  if (o) {
    indice.value = props.inicio
    videoSel.value = 0
    modo.value = 'fotos'
    foco = document.activeElement
    document.documentElement.style.overflow = 'hidden'
    await nextTick()
    dialogo.value?.showModal()
  } else {
    dialogo.value?.close()
    document.documentElement.style.overflow = ''
    foco?.focus?.()
  }
})
onBeforeUnmount(() => { document.documentElement.style.overflow = '' })

const mover = (d) => { indice.value = (indice.value + d + imagenes.value.length) % imagenes.value.length }
function teclas(e) {
  if (modo.value !== 'fotos') return
  if (e.key === 'ArrowRight') mover(1)
  if (e.key === 'ArrowLeft') mover(-1)
}
</script>

<template>
  <dialog ref="dialogo" class="modal" aria-labelledby="modal-titulo" @close="emit('cerrar')" @keydown="teclas"
    @click.self="emit('cerrar')">
    <div v-if="obra" class="modal__caja">
      <div class="modal__media">
        <template v-if="modo === 'fotos'">
          <img
            :key="imagenes[indice]" :src="foto(imagenes[indice]).src" :srcset="foto(imagenes[indice]).srcset" sizes="(max-width: 860px) 100vw, 64vw"
            :alt="`${obra.nombre}, fotografía ${indice + 1} de ${imagenes.length}`"
          />
          <div v-if="imagenes.length > 1" class="modal__nav">
            <button type="button" aria-label="Fotografía anterior" @click="mover(-1)">‹</button>
            <span class="num">{{ indice + 1 }} / {{ imagenes.length }}</span>
            <button type="button" aria-label="Fotografía siguiente" @click="mover(1)">›</button>
          </div>
        </template>
        <video
          v-else :key="obra.videos[videoSel].src" :src="obra.videos[videoSel].src" controls autoplay muted playsinline
          :poster="foto(obra.portada).src"
        ></video>
      </div>

      <div class="modal__texto">
        <button type="button" class="modal__cerrar" @click="emit('cerrar')">Cerrar</button>
        <h2 id="modal-titulo" class="modal__titulo">{{ obra.nombre }}</h2>
        <p v-if="obra.resumen" class="modal__resumen">{{ obra.resumen }}</p>
        <dl class="ficha modal__ficha">
          <template v-for="[k, v] in ficha" :key="k"><dt>{{ k }}</dt><dd>{{ v }}</dd></template>
        </dl>
        <div v-if="obra.videos?.length" class="modal__videos">
          <button type="button" :aria-pressed="modo === 'fotos'" @click="modo = 'fotos'">Fotografías</button>
          <button
            v-for="(v, i) in obra.videos" :key="v.src" type="button"
            :aria-pressed="modo === 'video' && videoSel === i" @click="modo = 'video'; videoSel = i"
          >{{ v.titulo }}</button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.modal {
  width: min(1240px, calc(100% - 32px)); max-height: calc(100dvh - 32px); padding: 0; border: 0;
  background: var(--blanco); color: var(--tinta); overflow: auto; border-radius: var(--radio);
}
.modal::backdrop { background: rgba(20, 26, 30, .78); }
.modal__caja { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(300px, 1fr); }
.modal__media { position: relative; background: var(--tinta); min-height: 320px; }
.modal__media img, .modal__media video { width: 100%; height: 100%; max-height: calc(100dvh - 32px); object-fit: cover; }
.modal__media video { object-fit: contain; background: #000; }
.modal__nav {
  position: absolute; left: 16px; bottom: 16px; display: flex; align-items: center; gap: 4px;
  background: rgba(31, 37, 41, .85); color: #fff; font-size: .875rem; border-radius: var(--radio);
}
.modal__nav button { width: 40px; height: 40px; border: 0; background: none; color: #fff; font-size: 1.5rem; line-height: 1; }
.modal__nav span { min-width: 48px; text-align: center; }
.modal__texto { padding: 28px clamp(20px, 3vw, 36px) 32px; display: flex; flex-direction: column; gap: 20px; }
.modal__cerrar {
  align-self: flex-end; border: 1px solid var(--linea); background: none; border-radius: var(--radio); padding: 8px 14px;
  font-size: .875rem; font-weight: 600;
}
.modal__cerrar:hover { border-color: var(--tinta); }
.modal__titulo { font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem); }
.modal__ficha { border-top: 1px solid var(--tinta); }
.modal__resumen { color: var(--tinta); }
.modal__videos { display: flex; flex-wrap: wrap; gap: 6px; }
.modal__videos button {
  border: 1px solid var(--linea); background: none; border-radius: var(--radio); padding: 8px 12px; font-size: .875rem; font-weight: 500;
}
.modal__videos button[aria-pressed='true'] { background: var(--tinta); color: #fff; border-color: var(--tinta); }

@media (max-width: 860px) {
  .modal__caja { grid-template-columns: 1fr; }
  .modal__media { aspect-ratio: 4 / 3; min-height: 0; }
  }
</style>
