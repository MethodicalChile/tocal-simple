<script setup>
import { conBase, empresa } from '../config.js'
import { obras } from '../data/obras.js'
const anio = new Date().getFullYear()
</script>

<template>
  <!-- pie como cajetín de plano: una tabla con los datos de la empresa -->
  <footer class="pie">
    <div class="contenedor cajetin">
      <div class="cajetin__logo">
        <img :src="conBase('/images/logo-tocal-blanco-recorte.png')" alt="Constructora Tocal" width="130" height="197" loading="lazy" />
      </div>
      <dl class="cajetin__celda">
        <dt>Razón social</dt><dd>{{ empresa.razonSocial }}</dd>
        <dt>RUT</dt><dd class="num">{{ empresa.rut }}</dd>
      </dl>
      <dl v-for="o in empresa.oficinas" :key="o.ciudad" class="cajetin__celda">
        <dt>Oficina {{ o.ciudad }}</dt><dd>{{ o.direccion }}</dd>
        <dt>Teléfono</dt><dd class="num"><a :href="`tel:${o.tel}`">{{ o.telefono }}</a></dd>
      </dl>
      <dl class="cajetin__celda">
        <dt>Contenido</dt><dd>{{ obras.length }} obras, 2015 a {{ anio }}</dd>
        <dt>Datos del mapa</dt><dd>Natural Earth, Mapzen, EOX, OpenStreetMap</dd>
      </dl>
      <p class="cajetin__pie">© {{ anio }} {{ empresa.razonSocial }}</p>
    </div>
  </footer>
</template>

<style scoped>
.pie { background: #1a1b1d; color: rgba(255, 255, 255, .75); font-size: var(--t-chico); padding-block: var(--e7); }
.cajetin {
  display: grid; grid-template-columns: 120px repeat(4, minmax(0, 1fr));
  border-top: 1px solid rgba(255, 255, 255, .35); border-left: 1px solid rgba(255, 255, 255, .35);
}
.cajetin > * { border-right: 1px solid rgba(255, 255, 255, .35); border-bottom: 1px solid rgba(255, 255, 255, .35); }
.cajetin__logo { display: grid; place-items: center; padding: var(--e4); }
.cajetin__logo img { width: auto; height: 72px; }
.cajetin__celda { display: grid; grid-template-columns: 1fr; align-content: start; padding: var(--e3) var(--e4); line-height: 1.45; }
.cajetin__celda dt { color: rgba(255, 255, 255, .5); }
.cajetin__celda dd { color: #fff; margin-bottom: var(--e2); }
.cajetin__celda a { text-decoration: none; }
.cajetin__celda a:hover { color: var(--naranja); }
.cajetin__pie { grid-column: 1 / -1; padding: var(--e2) var(--e4); color: rgba(255, 255, 255, .5); }

@media (max-width: 900px) {
  .cajetin { grid-template-columns: 1fr 1fr; }
  .cajetin__logo { grid-column: 1 / -1; justify-content: start; }
}
@media (max-width: 520px) {
  .cajetin { grid-template-columns: 1fr; }
}
</style>
