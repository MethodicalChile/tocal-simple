<script setup>
defineProps({ company: Object })
</script>

<template>
  <section id="inicio" class="hero">
    <div class="hero-media" aria-hidden="true"></div>
    <div class="hero-shade" aria-hidden="true"></div>
    <div class="hero-grid" aria-hidden="true"></div>

    <div class="container hero-content">
      <p class="eyebrow light">{{ company.eyebrow }}</p>
      <h1>{{ company.headline }}</h1>
      <p class="hero-copy">{{ company.description }}</p>
      <div class="hero-actions">
        <a href="#proyectos" class="button button-primary">Ver proyectos</a>
        <a href="#contacto" class="button button-ghost">Hablemos</a>
      </div>
    </div>

    <div class="hero-index">TOCAL / {{ company.founded }}</div>
  </section>
</template>
