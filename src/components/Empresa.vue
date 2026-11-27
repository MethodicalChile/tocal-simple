<script setup>
import { empresa, foto } from '../config.js'
import { obras, regionesConObras } from '../data/obras.js'

const anios = new Date().getFullYear() - empresa.fundacion
const copec = obras.filter((o) => /copec/i.test(o.mandante)).length
const img = foto('/images/projects/planta-tucapel-retiro/image-02.webp')

const fichaEmpresa = [
  ['Razón social', empresa.razonSocial],
  ['RUT', empresa.rut],
  ['Fundación', `${empresa.fundacion} (${anios} años)`],
  ['Superficie construida', `Más de ${empresa.superficie}`],
  ['Obras', `${obras.length} en ${regionesConObras.length} regiones, de Coquimbo a La Araucanía`],
  ...empresa.oficinas.map((o) => [`Oficina ${o.ciudad}`, o.direccion]),
  ...empresa.gerencia.map((g) => [g.cargo, g.nombre]),
]

const metodo = [
  ['Informe semanal', 'Cada semana el mandante recibe avance físico, curva S del programa, estados de pago, consultas abiertas y fotografías.'],
  ['Prevención de riesgos', 'Experto en prevención en cada faena, lista de chequeo según DS 44 y DS 76, control de dotación, incidentes y días perdidos.'],
  ['Plazo', 'Programa con ruta crítica aprobado por el mandante; cada reprogramación queda documentada.'],
  ['Contacto directo', 'Los teléfonos de la gerencia general y de operaciones están publicados en esta página.'],
]
</script>

<template>
  <section id="empresa" class="emp">
    <div class="contenedor">
      <div class="cabeza">
        <h2>La empresa</h2>
        <p>
          {{ anios }} años y {{ obras.length }} obras. Copec nos ha encargado {{ copec }} estaciones de servicio; Tucapel,
          Copefrut y Exportadora Rancagua, varias etapas de sus plantas.
        </p>
      </div>

      <div class="grilla emp__cuerpo">
        <figure class="emp__foto">
          <img :src="img.src" :srcset="img.srcset" sizes="(max-width: 900px) 100vw, 520px" loading="lazy"
            alt="Galpón de acopio de arroz a granel de la planta Tucapel en Retiro, terminado" />
          <figcaption>Galpón de acopio a granel, planta Tucapel en Retiro. Tres etapas entre 2016 y 2019.</figcaption>
        </figure>

        <div class="emp__datos">
          <h3>Ficha de la empresa</h3>
          <dl class="ficha">
            <template v-for="[k, v] in fichaEmpresa" :key="k"><dt>{{ k }}</dt><dd>{{ v }}</dd></template>
          </dl>
        </div>

        <div class="emp__metodo">
          <h3>Cómo llevamos una obra</h3>
          <dl class="ficha ficha--metodo">
            <template v-for="[k, v] in metodo" :key="k"><dt>{{ k }}</dt><dd>{{ v }}</dd></template>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.emp { background: var(--papel); padding-bottom: var(--e8); border-bottom: 1px solid var(--tinta); }
.emp__cuerpo { padding-top: var(--e6); row-gap: var(--e7); }
.emp__foto { grid-column: 1 / span 5; grid-row: span 2; }
.emp__foto img { width: 100%; aspect-ratio: 1; object-fit: cover; object-position: 50% 78%; }
.emp__foto figcaption { margin-top: var(--e2); font-size: var(--t-chico); color: var(--gris); }
.emp__datos, .emp__metodo { grid-column: 7 / span 6; }
.emp h3 { font-size: var(--t-h3); padding-bottom: var(--e3); border-bottom: 1px solid var(--tinta); }
.emp .ficha { grid-template-columns: 11rem 1fr; }
.ficha--metodo > dd { font-weight: 400; color: var(--gris); }
.ficha--metodo > dt { color: var(--tinta); font-weight: 600; }

@media (max-width: 900px) {
  .emp__foto, .emp__datos, .emp__metodo { grid-column: 1 / -1; grid-row: auto; }
  .emp__foto img { aspect-ratio: 3 / 2; }
}
@media (max-width: 520px) {
  .emp .ficha { grid-template-columns: 1fr; }
  .emp .ficha > dt { border-bottom: 0; padding-bottom: 0; }
  .emp .ficha > dd { padding-top: 2px; }
}
</style>
