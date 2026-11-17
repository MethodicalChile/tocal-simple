<script setup>
import { useI18n } from '../i18n'
import { siteConfig } from '../config/site'
import { withBase, handleImageError } from '../utils/assets'

defineProps({
  company: {
    type: Object,
    required: true,
  },
})

const { t, localize } = useI18n()
</script>

<template>
  <section id="quienes-somos" class="section about-section">
    <div class="container">
      <!-- Encabezado y presentación general -->
      <div class="about-top-grid">
        <div class="about-intro">
          <p class="eyebrow">{{ localize(company.about.eyebrow) }}</p>
          <h2>{{ localize(company.about.title) }}</h2>
          <span v-if="siteConfig.showProvisionalBadges" class="provisional-pill">
            {{ t('about.provisionalBadge') }}
          </span>
        </div>

        <div class="about-overview">
          <p v-for="(paragraph, idx) in company.about.overview" :key="idx">
            {{ localize(paragraph) }}
          </p>
        </div>
      </div>

      <!-- Historia, Misión y Visión -->
      <div class="about-statements-grid">
        <article class="statement-card">
          <div class="statement-card__header">
            <h3>{{ localize(company.about.history.title) }}</h3>
            <span
              v-if="company.about.history.isProvisional && siteConfig.showProvisionalBadges"
              class="provisional-pill"
            >
              {{ localize(company.about.history.badge) }}
            </span>
          </div>
          <p>{{ localize(company.about.history.text) }}</p>
        </article>

        <article class="statement-card">
          <div class="statement-card__header">
            <h3>{{ localize(company.about.mission.title) }}</h3>
          </div>
          <p>{{ localize(company.about.mission.text) }}</p>
        </article>

        <article class="statement-card">
          <div class="statement-card__header">
            <h3>{{ localize(company.about.vision.title) }}</h3>
          </div>
          <p>{{ localize(company.about.vision.text) }}</p>
        </article>
      </div>

      <!-- Fotografías institucionales -->
      <div class="about-gallery" :aria-label="t('about.galleryLabel')">
        <figure
          v-for="(img, idx) in company.about.images"
          :key="idx"
          class="about-figure"
        >
          <div class="about-figure__media">
            <img
              :src="withBase(img.src)"
              :alt="localize(img.alt)"
              class="about-figure__img"
              loading="lazy"
              decoding="async"
              @error="handleImageError"
            />
          </div>
          <figcaption class="about-figure__caption">
            {{ localize(img.caption) }}
          </figcaption>
        </figure>
      </div>

      <!-- Valores corporativos -->
      <div class="about-values">
        <div class="about-values__header">
          <p class="eyebrow">{{ t('about.pillarsEyebrow') }}</p>
          <h3>{{ t('about.pillarsTitle') }}</h3>
        </div>

        <div class="values-grid">
          <article
            v-for="(val, idx) in company.about.values"
            :key="val.id"
            class="value-card"
          >
            <span class="value-card__index">0{{ idx + 1 }}</span>
            <h4>{{ localize(val.title) }}</h4>
            <p>{{ localize(val.description) }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  background: var(--canvas);
}

.about-top-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 64px;
  align-items: start;
  margin-bottom: 56px;
}

.about-intro h2 {
  margin-bottom: 18px;
}

.about-overview p {
  margin: 0 0 20px;
  font-size: 17px;
  line-height: 1.75;
  color: var(--fg-2);
}

.about-overview p:last-child {
  margin-bottom: 0;
}

.about-statements-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-bottom: 56px;
}

.statement-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  border-radius: var(--radius-md);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.statement-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.statement-card h3 {
  font-size: 22px;
  margin: 0;
}

.statement-card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--fg-2);
}

.about-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-bottom: 64px;
}

.about-figure {
  margin: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.about-figure__media {
  aspect-ratio: 16 / 10;
  background: var(--dark-2);
  overflow: hidden;
}

.about-figure__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-figure__caption {
  padding: 14px 18px;
  font-size: 13px;
  color: var(--fg-muted);
  border-top: 1px solid var(--border);
}

.about-values__header {
  margin-bottom: 28px;
}

.about-values__header h3 {
  font-size: clamp(26px, 3vw, 36px);
  margin: 0;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.value-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 24px;
}

.value-card__index {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 12px;
}

.value-card h4 {
  font-size: 18px;
  margin: 0 0 10px;
}

.value-card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: var(--fg-2);
}

@media (max-width: 1020px) {
  .about-top-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .about-statements-grid {
    grid-template-columns: 1fr;
  }
  .values-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .about-gallery,
  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>
