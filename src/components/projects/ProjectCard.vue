<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../i18n'
import { siteConfig } from '../../config/site'
import { withBase, handleImageError } from '../../utils/assets'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select'])
const { t, localize } = useI18n()
const triggerButtonRef = ref(null)

const cardCoverSrc = computed(() => {
  if (props.project.coverImage) return props.project.coverImage
  const first = props.project.images?.[0]
  if (!first) return ''
  return typeof first === 'string' ? first : first.src || ''
})

function handleOpen() {
  emit('select', props.project, triggerButtonRef.value)
}
</script>

<template>
  <article class="project-card" @click="handleOpen">
    <div class="project-card__media">
      <img
        :src="withBase(cardCoverSrc)"
        :alt="localize(project.title)"
        class="project-card__image"
        loading="lazy"
        decoding="async"
        @error="handleImageError"
      />
      <div class="project-card__badges">
        <span class="project-card__category">
          {{ t(`categories.${project.category}`) }}
        </span>
        <span v-if="project.isDemo && siteConfig.showProvisionalBadges" class="project-card__demo-badge">
          {{ t('projects.demoBadge') }}
        </span>
      </div>
      <span v-if="project.images?.length" class="project-card__photo-count">
        {{ t('projects.photosCount', { count: project.images.length }) }}
      </span>
    </div>

    <div class="project-card__body">
      <h3 class="project-card__title">{{ localize(project.title) }}</h3>
      <p class="project-card__excerpt">{{ localize(project.shortDescription) }}</p>

      <div class="project-card__footer">
        <button
          ref="triggerButtonRef"
          type="button"
          class="project-card__cta"
          :aria-label="t('projects.viewProjectAria', { title: localize(project.title) })"
          @click.stop="handleOpen"
        >
          <span>{{ t('projects.viewProject') }}</span>
          <span class="project-card__cta-icon" aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  height: 100%;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: rgba(242, 107, 33, 0.45);
}

.project-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #141b26;
  overflow: hidden;
}

.project-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.project-card:hover .project-card__image {
  transform: scale(1.04);
}

.project-card__badges {
  position: absolute;
  top: 14px;
  left: 14px;
  right: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
}

.project-card__category {
  padding: 6px 11px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(16, 22, 31, 0.9);
  color: var(--white);
  border-left: 3px solid var(--accent);
}

.project-card__demo-badge {
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: rgba(255, 255, 255, 0.92);
  color: #3a3936;
}

.project-card__photo-count {
  position: absolute;
  bottom: 12px;
  right: 12px;
  padding: 4px 9px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 600;
  background: rgba(11, 16, 24, 0.82);
  color: rgba(255, 255, 255, 0.92);
}

.project-card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 22px 24px 24px;
}

.project-card__title {
  font-size: 19px;
  line-height: 1.3;
  margin: 0 0 10px;
  color: var(--fg);
}

.project-card__excerpt {
  margin: 0 0 22px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--fg-2);
  flex: 1;
}

.project-card__footer {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

.project-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  background: transparent;
  border: 0;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--fg);
  transition: color 0.2s ease;
}

.project-card:hover .project-card__cta,
.project-card__cta:hover {
  color: var(--accent);
}

.project-card__cta-icon {
  display: inline-block;
  transition: transform 0.2s ease;
  color: var(--accent);
}

.project-card:hover .project-card__cta-icon {
  transform: translateX(4px);
}
</style>
