<script setup>
import { conBase, empresa } from '../config.js'

// la cinta lleva la lista dos veces: al llegar a la mitad vuelve al inicio sin salto
const cinta = [...empresa.mandantes, ...empresa.mandantes]
const logo = (m) => conBase(`/images/mandantes/${m.logo.replace('.png', '-n.png')}`)
</script>

<template>
  <section class="mand" aria-labelledby="mand-titulo">
    <div class="mand__ventana">
      <ul class="mand__cinta">
        <li v-for="(m, i) in cinta" :key="i" :aria-hidden="i >= empresa.mandantes.length">
          <img :src="logo(m)" :alt="i < empresa.mandantes.length ? m.nombre : ''" width="240" height="80" loading="lazy" />
        </li>
      </ul>
    </div>
    <p id="mand-titulo" class="contenedor mand__nota">
      {{ empresa.mandantes.length }} de los mandantes con que hemos trabajado desde 2015.
    </p>
  </section>
</template>

<style scoped>
.mand { background: var(--blanco); border-bottom: 1px solid var(--linea); }
.mand__ventana { overflow: hidden; border-bottom: 1px solid var(--linea); }
.mand__cinta { display: flex; width: max-content; animation: avanzar 70s linear infinite; }
.mand__ventana:hover .mand__cinta { animation-play-state: paused; }
/* cada logo en su celda, como un cuadro de planos */
.mand__cinta li {
  flex: none; width: 240px; height: 112px; display: grid; place-items: center; border-right: 1px solid var(--linea);
}
.mand__cinta img { width: 200px; height: auto; opacity: .8; filter: saturate(.85); transition: opacity .2s, filter .2s; }
.mand__cinta li:hover img { opacity: 1; filter: none; }
@keyframes avanzar { to { transform: translateX(-50%); } }
.mand__nota { padding-block: var(--e3); font-size: var(--t-chico); color: var(--gris); }

/* sin animación: grilla quieta */
@media (prefers-reduced-motion: reduce) {
  .mand__cinta { width: auto; flex-wrap: wrap; }
  .mand__cinta li[aria-hidden='true'] { display: none; }
}
@media (max-width: 560px) {
  .mand__cinta li { width: 168px; height: 84px; }
  .mand__cinta img { width: 140px; }
}
</style>
