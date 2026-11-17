<script setup>
import { computed } from 'vue'
import { useI18n } from '../i18n'
import { siteConfig, getWhatsappUrl } from '../config/site'
import { withBase } from '../utils/assets'
import ProjectCard from './projects/ProjectCard.vue'

const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
  services: {
    type: Array,
    required: true,
  },
  projects: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['selectProject', 'filterByCategory'])
const { language, t, localize } = useI18n()

const featuredProjects = computed(() =>
  props.projects.filter((project) => project.featured).slice(0, 3)
)

const whatsappHref = computed(() => getWhatsappUrl(language.value))

function handleServiceFilter(categoryId) {
  emit('filterByCategory', categoryId)
}

function handleProjectSelect(project, triggerEl) {
  emit('selectProject', project, triggerEl)
}
</script>

<template>
  <div id="inicio" class="home-wrapper">
    <!-- 4.1 Hero Principal -->
    <section class="hero">
      <div class="hero-media">
        <img
          :src="withBase(company.hero.image)"
          :alt="localize(company.hero.imageAlt)"
          class="hero-media__img"
          fetchpriority="high"
        />
      </div>
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="hero-grid" aria-hidden="true"></div>

      <div class="container hero-content">
        <div class="hero-brand-badge">
          <img
            :src="withBase(siteConfig.logos.mark)"
            :alt="siteConfig.name"
            class="hero-brand-badge__logo"
            width="28"
            height="28"
          />
          <span>{{ siteConfig.name }} · {{ siteConfig.legalName }}</span>
        </div>

        <p class="eyebrow light">{{ localize(company.hero.eyebrow) }}</p>
        <h1>{{ localize(company.hero.title) }}</h1>
        <p class="hero-copy">{{ localize(company.hero.description) }}</p>

        <div class="hero-actions">
          <a href="#proyectos" class="btn btn-primary">
            {{ t('hero.primaryCta') }}
          </a>
          <a href="#contacto" class="btn btn-outline-light">
            {{ t('hero.secondaryCta') }}
          </a>
        </div>
      </div>
    </section>

    <!-- 4.2 Presentación de las 3 áreas de especialización en Inicio -->
    <section class="section home-specialties" aria-labelledby="home-specialties-heading">
      <div class="container">
        <div class="section-header">
          <div>
            <p class="eyebrow">{{ t('hero.specialtiesLabel') }}</p>
            <h2 id="home-specialties-heading">{{ t('hero.specialtiesTitle') }}</h2>
          </div>
          <p class="section-subtitle">{{ t('hero.specialtiesSubtitle') }}</p>
        </div>

        <div class="specialties-cards">
          <article
            v-for="service in services"
            :key="service.id"
            class="specialty-card"
          >
            <div class="specialty-card__media">
              <img
                :src="withBase(service.image)"
                :alt="localize(service.imageAlt)"
                class="specialty-card__img"
                loading="lazy"
                decoding="async"
              />
              <span class="specialty-card__number">{{ service.number }}</span>
            </div>
            <div class="specialty-card__body">
              <h3>{{ localize(service.title) }}</h3>
              <p>{{ localize(service.shortDescription) }}</p>
              <div class="specialty-card__actions">
                <a :href="`#servicio-${service.id}`" class="specialty-card__link">
                  {{ t('hero.exploreService') }} →
                </a>
                <a
                  href="#proyectos"
                  class="specialty-card__filter-btn"
                  @click="handleServiceFilter(service.id)"
                >
                  {{ t('hero.filterProjectsByArea') }}
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 4.3 Proyectos Destacados (reutilizando ProjectCard) -->
    <section
      v-if="featuredProjects.length > 0"
      class="section home-featured-projects"
      aria-labelledby="home-featured-heading"
    >
      <div class="container">
        <div class="section-header">
          <div>
            <p class="eyebrow">{{ t('hero.featuredLabel') }}</p>
            <h2 id="home-featured-heading">{{ t('hero.featuredTitle') }}</h2>
          </div>
          <div class="featured-header-side">
            <p class="section-subtitle">{{ t('hero.featuredSubtitle') }}</p>
            <a href="#proyectos" class="btn btn-outline-dark featured-all-btn" @click="handleServiceFilter('all')">
              {{ t('hero.viewAllProjects') }} →
            </a>
          </div>
        </div>

        <div class="featured-grid">
          <ProjectCard
            v-for="project in featuredProjects"
            :key="`featured-${project.id}`"
            :project="project"
            @select="handleProjectSelect"
          />
        </div>
      </div>
    </section>

    <!-- 4.4 Llamado a la acción en Inicio (con Correo y WhatsApp) -->
    <section class="home-cta-banner" aria-labelledby="home-cta-heading">
      <div class="container home-cta-inner">
        <div class="home-cta-copy">
          <p class="eyebrow light">{{ t('hero.ctaBannerEyebrow') }}</p>
          <h2 id="home-cta-heading">{{ t('hero.ctaBannerTitle') }}</h2>
          <p>{{ t('hero.ctaBannerText') }}</p>
        </div>
        <div class="home-cta-actions">
          <a :href="`mailto:${siteConfig.email}`" class="btn btn-primary">
            {{ t('hero.ctaBannerEmailBtn', { email: siteConfig.email }) }}
          </a>
          <a
            :href="whatsappHref"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-whatsapp"
          >
            {{ t('hero.ctaBannerWhatsappBtn') }}
          </a>
          <a href="#contacto" class="btn btn-outline-light">
            {{ t('hero.ctaBannerFormBtn') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  min-height: 92svh;
  padding-top: calc(var(--header-h) + 48px);
  padding-bottom: 88px;
  position: relative;
  display: flex;
  align-items: flex-end;
  color: var(--white);
  overflow: hidden;
  background: var(--dark-1);
}

.hero-media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-media__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-shade {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(90deg, rgba(9, 14, 21, 0.94) 0%, rgba(9, 14, 21, 0.76) 58%, rgba(9, 14, 21, 0.45) 100%),
    linear-gradient(0deg, rgba(9, 14, 21, 0.88) 0%, transparent 55%);
}

.hero-grid {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.1;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.22) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.22) 1px, transparent 1px);
  background-size: 110px 110px;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-brand-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px 6px 8px;
  margin-bottom: 22px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.9);
}

.hero-brand-badge__logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.hero h1 {
  max-width: 900px;
  font-size: clamp(38px, 5.8vw, 76px);
  line-height: 1.02;
  margin-bottom: 24px;
}

.hero-copy {
  max-width: 640px;
  color: rgba(255, 255, 255, 0.84);
  font-size: clamp(16px, 1.8vw, 19px);
  line-height: 1.7;
  margin: 0 0 36px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

/* 4.2 Especialidades en Inicio */
.home-specialties {
  background: var(--canvas);
  border-bottom: 1px solid var(--border);
}

.specialties-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 26px;
}

.specialty-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.specialty-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.specialty-card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  background: var(--dark-2);
  overflow: hidden;
}

.specialty-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.specialty-card:hover .specialty-card__img {
  transform: scale(1.04);
}

.specialty-card__number {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 5px 10px;
  border-radius: var(--radius-sm);
  background: rgba(11, 16, 24, 0.88);
  color: var(--accent);
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.specialty-card__body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.specialty-card__body h3 {
  font-size: 22px;
  margin: 0 0 10px;
}

.specialty-card__body p {
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--fg-2);
  flex: 1;
}

.specialty-card__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  font-size: 13px;
  font-weight: 700;
}

.specialty-card__link {
  color: var(--fg);
}

.specialty-card__link:hover {
  color: var(--accent);
}

.specialty-card__filter-btn {
  color: var(--accent);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.specialty-card__filter-btn:hover {
  text-decoration: underline;
}

/* 4.3 Proyectos Destacados */
.home-featured-projects {
  background: var(--canvas-alt);
  border-bottom: 1px solid var(--border);
}

.featured-header-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 26px;
}

/* 4.4 CTA Banner */
.home-cta-banner {
  background: var(--dark-2);
  color: var(--white);
  padding: 64px 0;
  border-bottom: 3px solid var(--accent);
}

.home-cta-inner {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 40px;
  align-items: center;
}

.home-cta-copy h2 {
  font-size: clamp(26px, 3.2vw, 40px);
  margin-bottom: 12px;
}

.home-cta-copy p {
  margin: 0;
  color: rgba(255, 255, 255, 0.76);
  font-size: 15px;
  max-width: 580px;
}

.home-cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-end;
}

@media (max-width: 1020px) {
  .specialties-cards,
  .featured-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .home-cta-inner {
    grid-template-columns: 1fr;
  }
  .home-cta-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: 82svh;
    padding-bottom: 64px;
  }
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .specialties-cards,
  .featured-grid {
    grid-template-columns: 1fr;
  }
  .home-cta-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
