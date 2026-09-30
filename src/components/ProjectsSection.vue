<script setup>
defineProps({ projects: Array })
</script>

<template>
  <section id="proyectos" class="section projects-section">
    <div class="container">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Experiencia</p>
          <h2>Proyectos que hablan por nosotros.</h2>
        </div>
        <p>Esta galería está preparada para reemplazarse por proyectos reales de Tocal.</p>
      </div>

      <div class="projects-grid">
        <article v-for="project in projects" :key="project.title" class="project-card">
          <div class="project-image-wrap">
            <img :src="project.image" :alt="project.title" class="project-image" />
            <span class="project-category">{{ project.category }}</span>
          </div>
          <div class="project-meta">
            <h3>{{ project.title }}</h3>
            <p>{{ project.location }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
