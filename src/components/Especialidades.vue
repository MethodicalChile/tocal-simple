<script setup>
import { ref } from 'vue'
import { especialidades, foto } from '../config.js'
import { obras } from '../data/obras.js'

const emit = defineEmits(['filtrar'])
const sel = ref(0)

const filas = especialidades.map((e) => {
  const lista = obras.filter(e.incluye)
  const mandantes = [...new Set(lista.map((o) => o.mandante.replace(/ (S\.A\.|SpA|Ltda\.|S\.A)$/i, '')))]
  return { ...e, cuenta: lista.length, mandantes: mandantes.slice(0, 4).join(', ') + (mandantes.length > 4 ? ' y otros' : '') }
})
</script>

<template>
  <section id="especialidades" class="esp">
    <div class="contenedor">
      <div class="cabeza">
        <h2>Especialidades</h2>
        <p>Casi todas se hacen junto a una operación que no puede parar: una planta recibiendo fruta, una estación vendiendo combustible.</p>
      </div>

      <div class="esp__cuerpo">
        <table class="esp__tabla">
          <thead>
            <tr><th scope="col">Especialidad</th><th scope="col">Qué incluye</th><th scope="col" class="num">Obras</th></tr>
          </thead>
          <tbody>
            <tr
              v-for="(e, i) in filas" :key="e.id" :class="{ 'es-sel': sel === i }"
              @mouseenter="sel = i" @focusin="sel = i"
            >
              <th scope="row">{{ e.titulo }}</th>
              <td>
                {{ e.texto }}
                <span class="esp__mandantes">{{ e.mandantes }}</span>
              </td>
              <td class="esp__cuenta">
                <a href="#obras" class="num" @click="emit('filtrar', e.sector)">{{ e.cuenta }}<span class="sr"> obras, ver en el mapa</span></a>
              </td>
            </tr>
          </tbody>
        </table>

        <figure class="esp__foto" aria-hidden="true">
          <img
            v-for="(e, i) in filas" :key="e.id" :src="foto(e.imagen).src" :srcset="foto(e.imagen).srcset"
            sizes="(max-width: 1100px) 0px, 400px" alt="" :class="{ 'es-sel': sel === i }" loading="lazy"
          />
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.esp { background: var(--blanco); padding-bottom: var(--e8); border-bottom: 1px solid var(--tinta); }
.esp__cuerpo { display: grid; grid-template-columns: minmax(0, 1fr) 400px; gap: var(--e6); }
.esp__tabla { width: 100%; border-collapse: collapse; font-size: var(--t-dato); line-height: 1.55; }
.esp__tabla th, .esp__tabla td { text-align: left; vertical-align: top; padding: var(--e4) var(--e4) var(--e4) 0; border-bottom: 1px solid var(--linea); }
.esp__tabla thead th { padding-block: var(--e3); font-weight: 500; color: var(--gris); font-size: var(--t-chico); }
.esp__tabla tbody th { width: 30%; font-family: var(--f-titulo); font-size: var(--t-h3); line-height: 1.25; font-weight: 700; letter-spacing: -0.015em; }
.esp__tabla tbody td:nth-child(2) { color: var(--gris); }
.esp__mandantes { display: block; margin-top: var(--e2); color: var(--tinta); font-weight: 500; }
.esp__cuenta { width: 64px; text-align: right !important; padding-right: 0 !important; }
.esp__cuenta a {
  font-family: var(--f-titulo); font-size: 2rem; font-weight: 700; line-height: 1; text-decoration: none;
  border-bottom: 2px solid transparent;
}
.esp__cuenta a:hover { color: var(--naranja-osc); border-bottom-color: currentColor; }
.esp__tabla tbody tr { transition: background-color .12s; }
.esp__tabla tbody tr.es-sel th { color: var(--naranja-osc); }

.esp__foto { position: sticky; top: calc(var(--header) + var(--e5)); align-self: start; aspect-ratio: 4 / 5; background: var(--claro); overflow: hidden; margin-top: 45px; }
.esp__foto img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .3s; }
.esp__foto img.es-sel { opacity: 1; }

@media (max-width: 1100px) {
  .esp__cuerpo { grid-template-columns: 1fr; }
  .esp__foto { display: none; }
}
@media (max-width: 640px) {
  .esp__tabla thead { display: none; }
  .esp__tabla tr { display: grid; grid-template-columns: 1fr auto; border-bottom: 1px solid var(--linea); padding-block: var(--e4); }
  .esp__tabla th, .esp__tabla td { border: 0; padding: 0; }
  .esp__tabla tbody th { width: auto; }
  .esp__tabla tbody td:nth-child(2) { grid-column: 1 / -1; grid-row: 2; margin-top: var(--e2); }
  .esp__cuenta { grid-row: 1; grid-column: 2; }
}
</style>
