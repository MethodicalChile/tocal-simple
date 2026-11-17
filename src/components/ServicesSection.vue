<script setup>
import { useI18n } from '../i18n'
import { withBase, handleImageError } from '../utils/assets'

const props = defineProps({
  services: {
    type: Array,
    required: true,
  },
  projects: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['filterByCategory', 'selectProject', 'inquireService'])
const { t, localize } = useI18n()

function getRelatedProjects(categoryId) {
  return props.projects.filter((project) => project.category === categoryId).slice(0, 2)
}

function handleFilterCategory(categoryId) {
  emit('filterByCategory', categoryId)
}

function handleOpenProject(project, event) {
  emit('selectProject', project, event?.currentTarget ?? null)
}

function handleInquireService(service) {
  emit('inquireService', {
    category: service.id,
    title: localize(service.title),
  })
}
</script>

<template>
  <section id="servicios" class="section section-dark services-section">
    <div class="container">
      <div class="section-header">
        <div>
          <p class="eyebrow light">{{ t('services.eyebrow') }}</p>
          <h2>{{ t('services.title') }}</h2>
        </div>
        <p class="section-subtitle">{{ t('services.subtitle') }}</p>
      </div>

      <div class="services-blocks">
        <article
          v-for="service in services"
          :id="`servicio-${service.id}`"
          :key="service.id"
          class="service-block"
        >
          <div class="service-block__media">
            <img
              :src="withBase(service.image)"
              :alt="localize(service.imageAlt)"
              class="service-block__image"
              loading="lazy"
              decoding="async"
              @error="handleImageError"
            />
            <span class="service-block__number">{{ service.number }}</span>
          </div>

          <div class="service-block__content">
            <div class="service-block__header">
              <span class="service-block__tag">{{ localize(service.title) }}</span>
              <h3>{{ localize(service.title) }}</h3>
              <p class="service-block__description">{{ localize(service.description) }}</p>
            </div>

            <div v-if="localize(service.highlights)?.length" class="service-block__scope">
              <h4>{{ t('services.scopeTitle') }}</h4>
              <ul class="service-scope-list">
                <li v-for="(item, idx) in localize(service.highlights)" :key="idx">
                  {{ item }}
                </li>
              </ul>
            </div>

            <!-- Proyectos relacionados de la categoría -->
            <div
              v-if="getRelatedProjects(service.id).length > 0"
              class="service-block__related"
            >
              <h4>{{ t('services.relatedProjectsTitle') }}</h4>
              <div class="related-mini-list">
                <button
                  v-for="relProject in getRelatedProjects(service.id)"
                  :key="relProject.id"
                  type="button"
                  class="related-mini-card"
                  @click="handleOpenProject(relProject, $event)"
                >
                  <img
                    :src="withBase(relProject.coverImage)"
                    :alt="localize(relProject.title)"
                    class="related-mini-card__img"
                    loading="lazy"
                  />
                  <div class="related-mini-card__info">
                    <strong>{{ localize(relProject.title) }}</strong>
                    <span>{{ t('projects.viewProject') }} →</span>
                  </div>
                </button>
              </div>
            </div>

            <div class="service-block__actions">
              <a
                href="#proyectos"
                class="btn btn-primary"
                @click="handleFilterCategory(service.id)"
              >
                {{ t('services.viewCategoryProjects') }}
              </a>
              <a
                href="#contacto"
                class="btn btn-outline-light"
                @click="handleInquireService(service)"
              >
                {{ t('services.inquireService') }}
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  background: var(--dark-2);
  color: var(--white);
}

.services-blocks {
  display: flex;
  flex-direction: column;
  gap: 42px;
}

.service-block {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 44px;
  background: var(--dark-3);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-lg);
  overflow: hidden;
  padding: 32px;
  align-items: center;
  scroll-margin-top: calc(var(--header-h) + 20px);
}

.service-block:nth-child(even) {
  grid-template-columns: 1.05fr 0.95fr;
}

.service-block:nth-child(even) .service-block__media {
  order: 2;
}

.service-block:nth-child(even) .service-block__content {
  order: 1;
}

.service-block__media {
  position: relative;
  aspect-ratio: 16 / 11;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--dark-1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.service-block__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.service-block__number {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: #111827;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.08em;
}

.service-block__content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.service-block__tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-bottom: 8px;
}

.service-block__header h3 {
  font-size: clamp(26px, 3vw, 36px);
  margin: 0 0 12px;
}

.service-block__description {
  margin: 0;
  font-size: 15px;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.78);
}

.service-block__scope h4,
.service-block__related h4 {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.56);
  margin: 0 0 12px;
}

.service-scope-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.service-scope-list li {
  position: relative;
  padding-left: 20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.88);
}

.service-scope-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 8px;
  height: 2px;
  background: var(--accent);
}

.related-mini-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.related-mini-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(11, 16, 24, 0.55);
  color: var(--white);
  text-align: left;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.related-mini-card:hover {
  border-color: var(--accent);
  background: rgba(11, 16, 24, 0.85);
}

.related-mini-card__img {
  width: 64px;
  height: 48px;
  object-fit: cover;
  border-radius: 3px;
  flex-shrink: 0;
}

.related-mini-card__info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.related-mini-card__info strong {
  font-size: 12px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-mini-card__info span {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
}

.service-block__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 6px;
}

@media (max-width: 960px) {
  .service-block,
  .service-block:nth-child(even) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 24px;
  }
  .service-block:nth-child(even) .service-block__media,
  .service-block:nth-child(even) .service-block__content {
    order: initial;
  }
}

@media (max-width: 600px) {
  .service-block {
    padding: 18px;
  }
  .related-mini-list {
    grid-template-columns: 1fr;
  }
  .service-block__actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
