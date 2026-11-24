<script setup>
import { ref } from 'vue'
import { withBase } from '../utils/assets'

defineProps({ company: Object })
defineEmits(['open-videos'])

const videoReady = ref(false)
const videoMuted = ref(true)
</script>

<template>
  <section id="inicio" class="hero">
    <div
      class="hero-media"
      :style="{ backgroundImage: `url('${withBase(company.heroImage)}')` }"
      aria-hidden="true"
    >
      <video
        v-if="company.heroVideo"
        class="hero-video"
        :class="{ 'hero-video--ready': videoReady }"
        :src="company.heroVideo"
        :poster="withBase(company.heroImage)"
        autoplay
        loop
        :muted="videoMuted"
        playsinline
        preload="metadata"
        @canplay="videoReady = true"
      ></video>
    </div>
    <div class="hero-shade" aria-hidden="true"></div>
    <div class="hero-grid" aria-hidden="true"></div>

    <div class="container hero-content">
      <div class="hero-badge-row">
        <p class="eyebrow light">{{ company.eyebrow }}</p>
      </div>
      <h1>{{ company.headline }}</h1>
      <p class="hero-copy">{{ company.description }}</p>

      <div class="hero-actions">
        <a href="#proyectos" class="button button-primary">Explorar portafolio (22 obras)</a>
        <button type="button" class="button button-ghost" @click="$emit('open-videos')">
          ▶ Ver recorridos en dron (11 videos)
        </button>
        <a href="#contacto" class="button button-outline">Cotizar proyecto</a>
      </div>

      <div class="hero-specialties">
        <div class="specialty-tag">
          <span>01</span>
          <strong>Plantas de Proceso y Packing</strong>
        </div>
        <div class="specialty-tag">
          <span>02</span>
          <strong>Bodegas y Centros Logísticos</strong>
        </div>
        <div class="specialty-tag">
          <span>03</span>
          <strong>Estaciones de Servicio (Copec · Shell)</strong>
        </div>
        <div class="specialty-tag">
          <span>04</span>
          <strong>Strip Centers, Retail e Institucional</strong>
        </div>
      </div>
    </div>

    <div class="hero-index">TOCAL / {{ company.founded }} · {{ company.builtSurface }}</div>
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
  padding-top: 120px;
}
.hero-media {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
}
.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.9s ease;
}
.hero-video--ready {
  opacity: 0.65;
}
.hero-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(9,14,21,.92) 0%, rgba(9,14,21,.64) 55%, rgba(9,14,21,.35) 100%),
    linear-gradient(0deg, rgba(9,14,21,.88) 0%, transparent 55%);
}
.hero-grid {
  position: absolute;
  inset: 0;
  opacity: .11;
  background-image:
    linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px);
  background-size: 120px 120px;
}
.hero-content {
  position: relative;
  z-index: 2;
  padding-bottom: 68px;
}
.hero h1 {
  max-width: 980px;
  font-size: clamp(44px, 6.4vw, 92px);
  line-height: .94;
  margin-bottom: 28px;
}
.hero-copy {
  max-width: 680px;
  color: rgba(255,255,255,.82);
  font-size: 18px;
  line-height: 1.68;
  margin-bottom: 34px;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 52px;
}
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 24px;
  font-weight: 700;
  font-size: 14px;
  border: 0;
  transition: transform .2s ease, background .2s ease, border-color .2s ease;
}
.button:hover {
  transform: translateY(-2px);
}
.button-primary {
  background: var(--accent);
  color: var(--fg);
}
.button-ghost {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255,255,255,.42);
  color: white;
  backdrop-filter: blur(6px);
}
.button-ghost:hover {
  background: rgba(255, 255, 255, 0.22);
}
.button-outline {
  border: 1px solid rgba(255,255,255,.28);
  color: rgba(255,255,255,.88);
}
.hero-specialties {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid rgba(255,255,255,.18);
  padding-top: 22px;
  gap: 20px;
}
.specialty-tag {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.specialty-tag span {
  font-size: 11px;
  letter-spacing: .14em;
  color: var(--accent);
  font-weight: 700;
}
.specialty-tag strong {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,.85);
}
.hero-index {
  position: absolute;
  z-index: 2;
  right: 30px;
  bottom: 30px;
  font-size: 11px;
  letter-spacing: .16em;
  color: rgba(255,255,255,.55);
  writing-mode: vertical-rl;
}

@media (max-width: 960px) {
  .hero-content { padding-bottom: 54px; }
  .hero-specialties { grid-template-columns: repeat(2, 1fr); }
  .hero-index { display: none; }
}

@media (max-width: 560px) {
  .hero h1 { font-size: 40px; }
  .hero-copy { font-size: 16px; }
  .hero-actions { flex-direction: column; align-items: stretch; }
  .hero-specialties { grid-template-columns: 1fr; gap: 12px; }
}
</style>
