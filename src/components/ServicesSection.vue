<script setup>
defineProps({ services: Array })
</script>

<template>
  <section id="servicios" class="section section-dark">
    <div class="container">
      <div class="section-heading light-heading">
        <div>
          <p class="eyebrow light">Qué hacemos</p>
          <h2>Capacidad técnica para construir de principio a fin.</h2>
        </div>
        <p>Servicios integrales para proyectos industriales, civiles y de infraestructura.</p>
      </div>

      <div class="service-list">
        <article v-for="service in services" :key="service.number" class="service-row">
          <span class="service-number">{{ service.number }}</span>
          <h3>{{ service.title }}</h3>
          <p>{{ service.text }}</p>
          <span class="service-arrow">↗</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-dark { background: #10161f; color: white; }
.section-heading { display:grid; grid-template-columns: 1fr 360px; gap: 60px; align-items:end; margin-bottom: 72px; }
.section-heading > p { color:#667080; line-height:1.7; margin:0; }
.light-heading > p { color:rgba(255,255,255,.58); }
.service-list { border-top:1px solid rgba(255,255,255,.18); }
.service-row { display:grid; grid-template-columns: 100px 1fr 1.3fr 50px; gap:30px; align-items:center; padding:34px 0; border-bottom:1px solid rgba(255,255,255,.16); }
.service-number { color:rgba(255,255,255,.42); font-size:12px; }
.service-row h3 { margin:0; font-size:28px; }
.service-row p { margin:0; color:rgba(255,255,255,.58); line-height:1.65; font-size:14px; }
.service-arrow { font-size:28px; text-align:right; color:var(--accent); }

@media (max-width: 900px) {
  .section-heading { grid-template-columns:1fr; gap:38px; }
  .service-row { grid-template-columns: 54px 1fr 36px; }
  .service-row p { grid-column: 2 / 4; }
}
@media (max-width: 560px) {
  .service-row { grid-template-columns:42px 1fr 28px; gap:16px; }
  .service-row h3 { font-size:24px; }
}
</style>
