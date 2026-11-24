<script setup>
import { withBase, handleImageError } from '../utils/assets'

defineProps({ services: Array })
defineEmits(['select-category'])
</script>

<template>
  <section id="servicios" class="section section-dark">
    <div class="container">
      <div class="section-heading light-heading">
        <div>
          <p class="eyebrow light">Nuestro trabajo · Especialidades</p>
          <h2>Capacidad técnica para construir de principio a fin.</h2>
        </div>
        <p>
          Soluciones constructivas adaptadas a cada mandante en plantas de procesamiento, bodegas,
          estaciones de servicio y equipamiento comercial e institucional.
        </p>
      </div>

      <div class="service-list">
        <article
          v-for="service in services"
          :key="service.number"
          class="service-row"
          role="button"
          tabindex="0"
          @click="$emit('select-category', service.id)"
          @keydown.enter="$emit('select-category', service.id)"
        >
          <span class="service-number">{{ service.number }}</span>
          <div class="service-title-col">
            <h3>{{ service.title }}</h3>
            <span class="service-clients">{{ service.meta }}</span>
          </div>
          <p>{{ service.text }}</p>
          <div class="service-thumb">
            <img
              :src="withBase(service.image)"
              :alt="service.title"
              loading="lazy"
              @error="handleImageError"
            />
          </div>
          <span class="service-arrow" title="Ver proyectos de esta área">↗</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-dark { background: #10161f; color: white; }
.section-heading {
  display:grid;
  grid-template-columns: 1fr 400px;
  gap: 60px;
  align-items:end;
  margin-bottom: 72px;
}
.section-heading > p { color:rgba(255,255,255,.65); line-height:1.7; margin:0; font-size: 15px; }
.service-list { border-top:1px solid rgba(255,255,255,.18); }
.service-row {
  display:grid;
  grid-template-columns: 68px 1.05fr 1.35fr 130px 44px;
  gap: 28px;
  align-items:center;
  padding: 34px 12px;
  border-bottom:1px solid rgba(255,255,255,.16);
  cursor: pointer;
  transition: background .25s ease, padding-left .25s ease;
}
.service-row:hover {
  background: rgba(255,255,255,.04);
  padding-left: 20px;
}
.service-number { color:var(--accent); font-size:13px; font-weight: 800; letter-spacing: .12em; }
.service-title-col h3 { margin:0 0 6px; font-size:26px; line-height: 1.15; }
.service-clients {
  display: block;
  font-size: 12px;
  color: rgba(255,255,255,.46);
  letter-spacing: .02em;
}
.service-row p { margin:0; color:rgba(255,255,255,.68); line-height:1.65; font-size:14px; }
.service-thumb {
  width: 130px;
  height: 78px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.16);
}
.service-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.service-arrow { font-size:28px; text-align:right; color:var(--accent); transition: transform .2s ease; }
.service-row:hover .service-arrow { transform: translate(3px, -3px); }

@media (max-width: 960px) {
  .section-heading { grid-template-columns:1fr; gap:24px; }
  .service-row { grid-template-columns: 48px 1fr 36px; gap: 16px; }
  .service-row p { grid-column: 2 / 4; }
  .service-thumb { display: none; }
}
@media (max-width: 560px) {
  .service-row { grid-template-columns:36px 1fr 28px; gap:12px; padding: 26px 0; }
  .service-title-col h3 { font-size:22px; }
}
</style>
