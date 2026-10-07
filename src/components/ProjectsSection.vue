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

<style scoped>
.projects-section { background:#ebe8e0; }
.projects-grid { display:grid; grid-template-columns: 1.2fr .8fr; gap:22px; }
.project-card:first-child { grid-row: span 2; }
.project-image-wrap { position:relative; overflow:hidden; min-height:330px; background:#d7d4cc; }
.project-card:first-child .project-image-wrap { height: 690px; }
.project-image { height:100%; object-fit:cover; position:absolute; inset:0; transition:transform .55s ease; }
.project-card:hover .project-image { transform:scale(1.035); }
.project-category { position:absolute; top:18px; left:18px; padding:8px 11px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; background:rgba(255,255,255,.92); }
.project-meta { display:flex; align-items:center; justify-content:space-between; gap:20px; padding:18px 0 8px; }
.project-meta h3 { font-size:20px; margin:0; }
.project-meta p { margin:0; color:#727987; font-size:13px; }

@media (max-width: 900px) {
  .section-heading { grid-template-columns:1fr; gap:38px; }
  .projects-grid { grid-template-columns:1fr; }
  .project-card:first-child { grid-row:auto; }
  .project-card:first-child .project-image-wrap { height:440px; }
  .project-image-wrap { height:360px; }
}
@media (max-width: 560px) {
  .project-image-wrap, .project-card:first-child .project-image-wrap { height:320px; }
  .project-meta { align-items:flex-start; flex-direction:column; gap:4px; }
}
</style>
