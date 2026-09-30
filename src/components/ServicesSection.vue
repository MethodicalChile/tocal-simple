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
