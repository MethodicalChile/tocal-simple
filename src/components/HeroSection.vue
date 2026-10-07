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

<style scoped>
.hero {
  min-height: 100svh;
  position: relative;
  display: grid;
  align-items: end;
  color: white;
  overflow: hidden;
  background: #111827;
}
.hero-media {
  position: absolute; inset: 0;
  background-image: url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=88');
  background-size: cover; background-position: center;
  transform: scale(1.02);
}
.hero-shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(9,14,21,.88) 0%, rgba(9,14,21,.46) 54%, rgba(9,14,21,.18) 100%), linear-gradient(0deg, rgba(9,14,21,.78), transparent 50%); }
.hero-grid { position:absolute; inset:0; opacity:.12; background-image: linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px); background-size: 120px 120px; }
.hero-content { position: relative; z-index: 2; padding-bottom: 110px; }
.hero h1 { max-width: 980px; font-size: clamp(60px, 8vw, 124px); line-height: .88; margin-bottom: 34px; }
.hero-copy { max-width: 620px; color: rgba(255,255,255,.78); font-size: 18px; line-height: 1.7; margin-bottom: 36px; }
.hero-actions { display: flex; gap: 14px; }
.button { display:inline-flex; align-items:center; justify-content:center; min-height: 52px; padding: 0 22px; font-weight: 700; font-size: 14px; }
.button-primary { background: var(--accent); color: var(--fg); }
.button-ghost { border: 1px solid rgba(255,255,255,.38); color: white; }
.hero-index { position:absolute; z-index:2; right:30px; bottom:30px; font-size:11px; letter-spacing:.16em; color:rgba(255,255,255,.55); writing-mode:vertical-rl; }

@media (max-width: 900px) {
  .hero-content { padding-bottom: 76px; }
  .hero h1 { font-size: clamp(58px, 15vw, 92px); }
}

@media (max-width: 560px) {
  .hero h1 { font-size: 56px; }
  .hero-copy { font-size:16px; }
  .hero-actions { flex-direction:column; align-items:stretch; max-width:280px; }
}
</style>
