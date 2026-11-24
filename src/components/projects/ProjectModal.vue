<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import { useI18n } from '../../i18n'
import { siteConfig } from '../../config/site'
import { withBase } from '../../utils/assets'
import ProjectCarousel from './ProjectCarousel.vue'

const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
  projectsList: {
    type: Array,
    default: () => [],
  },
  openerElement: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'inquire', 'navigate'])
const { t, localize } = useI18n()

const modalDialogRef = ref(null)
const closeButtonRef = ref(null)
const carouselRef = ref(null)
const linkCopied = ref(false)
const activeVideoIdx = ref(0)

const isOpen = computed(() => Boolean(props.project))

function hasText(val) {
  if (val === null || val === undefined) return false
  return String(val).trim().length > 0
}

const projectTitle = computed(() => (props.project ? localize(props.project.title) : ''))
const projectDescription = computed(() =>
  props.project ? localize(props.project.description) : ''
)
const projectWorkType = computed(() =>
  props.project && props.project.workType ? localize(props.project.workType) : ''
)
const projectClient = computed(() =>
  props.project && hasText(props.project.client) ? String(props.project.client).trim() : ''
)
const projectLocation = computed(() =>
  props.project && hasText(props.project.location) ? String(props.project.location).trim() : ''
)
const projectBuiltSurface = computed(() =>
  props.project && hasText(props.project.builtSurface)
    ? String(props.project.builtSurface).trim()
    : ''
)
const projectExteriorSurface = computed(() =>
  props.project && hasText(props.project.exteriorSurface)
    ? String(props.project.exteriorSurface).trim()
    : ''
)
const projectYear = computed(() =>
  props.project && hasText(props.project.year) ? String(props.project.year).trim() : ''
)

const projectImages = computed(() => {
  if (!props.project) return []
  if (Array.isArray(props.project.images) && props.project.images.length > 0) {
    return props.project.images
  }
  if (props.project.coverImage) {
    return [props.project.coverImage]
  }
  return []
})

const projectVideos = computed(() => {
  if (!props.project || !Array.isArray(props.project.videos)) return []
  return props.project.videos.filter((v) => v && v.src)
})

const activeVideo = computed(() => projectVideos.value[activeVideoIdx.value] || null)

watch(
  () => props.project?.id,
  () => {
    activeVideoIdx.value = 0
  }
)

const currentProjectIdx = computed(() => {
  if (!props.project || !Array.isArray(props.projectsList) || props.projectsList.length <= 1) {
    return -1
  }
  return props.projectsList.findIndex((p) => p.id === props.project.id)
})

const prevProjectItem = computed(() => {
  if (currentProjectIdx.value === -1) return null
  const len = props.projectsList.length
  return props.projectsList[(currentProjectIdx.value - 1 + len) % len]
})

const nextProjectItem = computed(() => {
  if (currentProjectIdx.value === -1) return null
  const len = props.projectsList.length
  return props.projectsList[(currentProjectIdx.value + 1) % len]
})

function navigateToProject(targetProject) {
  if (!targetProject) return
  linkCopied.value = false
  emit('navigate', targetProject)
}

function closeModal() {
  linkCopied.value = false
  emit('close')
}

async function copyShareLink() {
  if (!props.project || typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.set('proyecto', props.project.slug || props.project.id)
  url.hash = 'proyectos'
  const shareUrl = url.toString()

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareUrl)
    }
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2500)
  } catch {
    // Fallback silencioso si el navegador restringe el acceso al portapapeles
  }
}

function printProjectSheet() {
  if (typeof window !== 'undefined' && typeof window.print === 'function') {
    window.print()
  }
}

function handleInquire() {
  emit('inquire', {
    title: projectTitle.value,
    category: props.project?.category || 'general',
  })
  closeModal()
}

function handleKeydown(event) {
  if (!isOpen.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    if (carouselRef.value?.isFullscreen) {
      carouselRef.value.exitFullscreen()
      return
    }
    closeModal()
    return
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    carouselRef.value?.next()
    return
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    carouselRef.value?.prev()
    return
  }

  if (event.key === 'Tab' && modalDialogRef.value) {
    const focusableSelectors =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusable = Array.from(modalDialogRef.value.querySelectorAll(focusableSelectors))
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

watch(
  isOpen,
  async (open, wasOpen) => {
    if (typeof document === 'undefined') return
    if (open) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeydown)
      await nextTick()
      closeButtonRef.value?.focus()
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeydown)
      if (wasOpen && props.openerElement && typeof props.openerElement.focus === 'function') {
        await nextTick()
        props.openerElement.focus()
      }
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="project"
      class="modal-backdrop"
      role="presentation"
      @click.self="closeModal"
    >
      <div
        ref="modalDialogRef"
        class="modal-dialog"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`modal-title-${project.id}`"
      >
        <header class="modal-header">
          <div class="modal-header__meta">
            <span class="modal-category">
              {{ t(`categories.${project.category}`) }}
            </span>
            <span v-if="projectVideos.length" class="provisional-pill">
              ▶ {{ t('projects.videoBadge') }}
            </span>
            <span v-if="project.isDemo && siteConfig.showProvisionalBadges" class="provisional-pill">
              {{ t('projects.demoBadge') }}
            </span>
          </div>

          <div class="modal-header__actions">
            <button
              type="button"
              class="modal-share-btn"
              :aria-label="t('projects.modal.printAria')"
              @click="printProjectSheet"
            >
              <span aria-hidden="true">🖨</span>
              <span>{{ t('projects.modal.printBtn') }}</span>
            </button>

            <button
              type="button"
              class="modal-share-btn"
              :aria-label="t('projects.modal.shareAria')"
              @click="copyShareLink"
            >
              <span aria-hidden="true">🔗</span>
              <span>{{ linkCopied ? t('projects.modal.shareCopied') : t('projects.modal.shareBtn') }}</span>
            </button>

            <button
              ref="closeButtonRef"
              type="button"
              class="modal-close"
              :aria-label="t('projects.modal.closeAria')"
              @click="closeModal"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>
        </header>

        <div class="modal-body">
          <h2 :id="`modal-title-${project.id}`" class="modal-title">
            {{ projectTitle }}
          </h2>

          <ProjectCarousel
            ref="carouselRef"
            :images="projectImages"
            :project-title="projectTitle"
            :project-key="project.id || project.slug"
          />

          <!-- Reproductor de video alojado en Supabase Storage -->
          <div v-if="projectVideos.length > 0 && activeVideo" class="modal-video-section">
            <div class="modal-video-header">
              <h3 class="modal-section-label">
                ▶ {{ t('projects.modal.videoSectionLabel') }}
              </h3>
              <div v-if="projectVideos.length > 1" class="modal-video-tabs">
                <button
                  v-for="(vid, vIdx) in projectVideos"
                  :key="vid.src"
                  type="button"
                  :class="['modal-video-tab', { 'modal-video-tab--active': vIdx === activeVideoIdx }]"
                  @click="activeVideoIdx = vIdx"
                >
                  {{ localize(vid.title) }}
                </button>
              </div>
            </div>

            <div class="modal-video-frame">
              <video
                :key="activeVideo.src"
                :src="activeVideo.src"
                :poster="project.coverImage ? withBase(project.coverImage) : undefined"
                class="modal-video-player"
                controls
                playsinline
                preload="metadata"
              ></video>
            </div>
            <p v-if="activeVideo.title" class="modal-video-caption">
              {{ localize(activeVideo.title) }}
            </p>
          </div>

          <div class="modal-details-grid">
            <div class="modal-description-col">
              <h3 class="modal-section-label">{{ t('projects.modal.descriptionLabel') }}</h3>
              <p class="modal-description">{{ projectDescription }}</p>
            </div>

            <aside class="modal-specs-col">
              <dl class="modal-specs">
                <div class="modal-spec-item">
                  <dt>{{ t('projects.modal.categoryLabel') }}</dt>
                  <dd>{{ t(`categories.${project.category}`) }}</dd>
                </div>

                <div v-if="projectClient" class="modal-spec-item">
                  <dt>{{ t('projects.modal.clientLabel') }}</dt>
                  <dd>{{ projectClient }}</dd>
                </div>

                <!-- Solo se muestran ubicación, superficies, año y tipo de trabajo cuando existen datos reales -->
                <div v-if="projectLocation" class="modal-spec-item">
                  <dt>{{ t('projects.modal.locationLabel') }}</dt>
                  <dd>{{ projectLocation }}</dd>
                </div>

                <div v-if="projectBuiltSurface" class="modal-spec-item">
                  <dt>{{ t('projects.modal.builtSurfaceLabel') }}</dt>
                  <dd>{{ projectBuiltSurface }}</dd>
                </div>

                <div v-if="projectExteriorSurface" class="modal-spec-item">
                  <dt>{{ t('projects.modal.exteriorSurfaceLabel') }}</dt>
                  <dd>{{ projectExteriorSurface }}</dd>
                </div>

                <div v-if="projectYear" class="modal-spec-item">
                  <dt>{{ t('projects.modal.yearLabel') }}</dt>
                  <dd>{{ projectYear }}</dd>
                </div>

                <div v-if="projectWorkType" class="modal-spec-item">
                  <dt>{{ t('projects.modal.workTypeLabel') }}</dt>
                  <dd>{{ projectWorkType }}</dd>
                </div>
              </dl>

              <a
                href="#contacto"
                class="btn btn-primary modal-inquire-btn"
                @click="handleInquire"
              >
                {{ t('projects.modal.inquireProject') }}
              </a>
            </aside>
          </div>

          <footer v-if="prevProjectItem && nextProjectItem" class="modal-projects-nav">
            <button
              type="button"
              class="modal-project-switch"
              @click="navigateToProject(prevProjectItem)"
            >
              <span class="modal-project-switch__label">{{ t('projects.modal.prevProject') }}</span>
              <strong class="modal-project-switch__title">{{ localize(prevProjectItem.title) }}</strong>
            </button>

            <button
              type="button"
              class="modal-project-switch modal-project-switch--next"
              @click="navigateToProject(nextProjectItem)"
            >
              <span class="modal-project-switch__label">{{ t('projects.modal.nextProject') }}</span>
              <strong class="modal-project-switch__title">{{ localize(nextProjectItem.title) }}</strong>
            </button>
          </footer>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(9, 13, 20, 0.84);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal-dialog {
  width: min(100%, 980px);
  max-height: calc(100dvh - 48px);
  background: var(--surface);
  color: var(--fg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 28px;
  border-bottom: 1px solid var(--border);
  background: var(--canvas);
  flex-shrink: 0;
}

.modal-header__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.modal-header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-share-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--fg-2);
  font-size: 12px;
  font-weight: 700;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}

.modal-share-btn:hover {
  border-color: var(--accent);
  color: var(--fg);
}

.modal-category {
  display: inline-block;
  padding: 5px 12px;
  border-radius: var(--radius-sm);
  background: var(--dark-2);
  color: var(--white);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-left: 3px solid var(--accent);
}

.modal-close {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--fg);
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  flex-shrink: 0;
}

.modal-close:hover {
  background: var(--dark-2);
  border-color: var(--dark-2);
  color: var(--white);
}

.modal-body {
  padding: 28px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.modal-title {
  font-size: clamp(22px, 3vw, 30px);
  line-height: 1.2;
  margin: 0 0 22px;
  color: var(--fg);
}

.modal-video-section {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.modal-video-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}

.modal-video-header .modal-section-label {
  margin: 0;
  color: var(--accent);
  font-weight: 800;
}

.modal-video-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.modal-video-tab {
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--canvas);
  color: var(--fg-2);
  font-size: 12px;
  font-weight: 700;
  transition: all 0.2s ease;
}

.modal-video-tab--active {
  background: var(--accent);
  border-color: var(--accent);
  color: #111827;
}

.modal-video-frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #0c1118;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.modal-video-player {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.modal-video-caption {
  margin: 8px 0 0;
  font-size: 12px;
  color: var(--fg-muted);
}

.modal-details-grid {
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 32px;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  align-items: start;
}

.modal-section-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--fg-muted);
  margin: 0 0 10px;
}

.modal-description {
  margin: 0;
  font-size: 15px;
  line-height: 1.75;
  color: var(--fg-2);
}

.modal-specs-col {
  background: var(--canvas);
  padding: 20px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
}

.modal-specs {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.modal-spec-item {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.modal-spec-item:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.modal-spec-item dt {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--fg-muted);
  margin-bottom: 4px;
}

.modal-spec-item dd {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--fg);
}

.modal-inquire-btn {
  width: 100%;
  margin-top: 20px;
}

.modal-projects-nav {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.modal-project-switch {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--canvas);
  text-align: left;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.modal-project-switch--next {
  text-align: right;
  align-items: flex-end;
}

.modal-project-switch:hover {
  border-color: var(--accent);
  background: var(--surface);
}

.modal-project-switch__label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.modal-project-switch__title {
  font-size: 13px;
  color: var(--fg);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 820px) {
  .modal-backdrop {
    padding: 12px;
  }
  .modal-dialog {
    max-height: calc(100dvh - 24px);
  }
  .modal-header {
    padding: 14px 18px;
  }
  .modal-body {
    padding: 18px;
  }
  .modal-details-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
