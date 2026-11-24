<script setup>
import { withBase, handleImageError } from '../utils/assets'

defineProps({ company: Object })
</script>

<template>
  <section id="empresa" class="section about">
    <div class="container">
      <div class="split-grid">
        <div>
          <p class="eyebrow">{{ company.about.eyebrow }}</p>
          <h2>{{ company.about.title }}</h2>
        </div>
        <div class="about-copy">
          <p v-for="(paragraph, idx) in company.about.paragraphs" :key="idx">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div class="pillars-grid">
        <article v-for="pillar in company.about.pillars" :key="pillar.number" class="pillar-card">
          <span class="pillar-num">{{ pillar.number }}</span>
          <h3>{{ pillar.title }}</h3>
          <p>{{ pillar.text }}</p>
        </article>
      </div>

      <div class="about-showcase">
        <figure
          v-for="item in company.about.showcaseImages"
          :key="item.src"
          class="showcase-figure"
        >
          <div class="showcase-image-wrap">
            <img
              :src="withBase(item.src)"
              :alt="item.title"
              loading="lazy"
              @error="handleImageError"
            />
          </div>
          <figcaption>
            <strong>{{ item.title }}</strong>
            <span>{{ item.meta }}</span>
          </figcaption>
        </figure>
      </div>

      <!-- Sección Clientes Oficiales (Slide 22 Presentación TOCAL) -->
      <div id="clientes" class="clients-block">
        <div class="clients-header">
          <div>
            <p class="eyebrow">{{ company.clients.eyebrow }}</p>
            <h3>{{ company.clients.title }}</h3>
          </div>
          <p class="clients-subtitle">{{ company.clients.subtitle }}</p>
        </div>

        <div class="clients-board">
          <div class="clients-banner">
            <img
              :src="withBase(company.clients.bannerImage)"
              alt="Logos de clientes de Constructora TOCAL"
              loading="lazy"
              @error="handleImageError"
            />
          </div>
          <div class="clients-tags">
            <span v-for="clientName in company.clients.list" :key="clientName" class="client-pill">
              {{ clientName }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.split-grid {
  display: grid;
  grid-template-columns: 1.08fr .92fr;
  gap: 80px;
  align-items: start;
}
.about-copy {
  font-size: 18px;
  line-height: 1.78;
  color: var(--fg-2);
  padding-top: 28px;
}
.about-copy p { margin: 0 0 22px; }
.about-copy p:last-child { margin-bottom: 0; }

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 68px;
  padding-top: 40px;
  border-top: 1px solid var(--border);
}
.pillar-card {
  padding-right: 16px;
}
.pillar-num {
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .12em;
  color: var(--accent);
  margin-bottom: 12px;
}
.pillar-card h3 {
  font-size: 21px;
  margin-bottom: 10px;
}
.pillar-card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: var(--fg-2);
}

.about-showcase {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 24px;
  margin-top: 56px;
}
.showcase-figure {
  margin: 0;
}
.showcase-image-wrap {
  height: 360px;
  overflow: hidden;
  background: #d7d4cc;
}
.showcase-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .5s ease;
}
.showcase-figure:hover .showcase-image-wrap img {
  transform: scale(1.03);
}
.showcase-figure figcaption {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding-top: 12px;
  font-size: 13px;
}
.showcase-figure figcaption span {
  color: var(--muted);
}

.clients-block {
  margin-top: 96px;
  padding-top: 72px;
  border-top: 1px solid var(--border);
}
.clients-header {
  display: grid;
  grid-template-columns: 1fr 440px;
  gap: 48px;
  align-items: end;
  margin-bottom: 40px;
}
.clients-header h3 {
  font-size: clamp(32px, 3.8vw, 52px);
  line-height: 1.02;
  margin: 0;
}
.clients-subtitle {
  margin: 0;
  color: var(--fg-2);
  line-height: 1.65;
  font-size: 15px;
}
.clients-board {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;
  background: var(--white);
  padding: 36px;
  border: 1px solid var(--border);
}
.clients-banner img {
  width: 100%;
  height: auto;
  max-height: 360px;
  object-fit: contain;
}
.clients-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.client-pill {
  padding: 9px 14px;
  background: var(--canvas);
  border: 1px solid var(--border);
  font-size: 13px;
  font-weight: 600;
  color: var(--fg);
}

@media (max-width: 960px) {
  .split-grid { grid-template-columns: 1fr; gap: 28px; }
  .about-copy { padding-top: 0; }
  .pillars-grid { grid-template-columns: repeat(2, 1fr); }
  .about-showcase { grid-template-columns: 1fr; }
  .clients-header { grid-template-columns: 1fr; gap: 18px; }
  .clients-board { grid-template-columns: 1fr; padding: 24px; }
}

@media (max-width: 560px) {
  .pillars-grid { grid-template-columns: 1fr; }
  .showcase-image-wrap { height: 260px; }
  .showcase-figure figcaption { flex-direction: column; gap: 4px; }
}
</style>
