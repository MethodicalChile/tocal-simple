<script setup>
import { computed, ref, watch } from 'vue'
import { withBase, handleImageError } from '../utils/assets'

const props = defineProps({
  projects: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
  selectedCategory: { type: String, default: 'all' },
})

const emit = defineEmits(['update:selectedCategory'])

const activeProject = ref(null)
const activeImageIndex = ref(0)
const activeVideoIndex = ref(0)
const activeMediaTab = ref('photos')

const filteredProjects = computed(() => {
  const cat = props.selectedCategory || 'all'
  if (cat === 'all') return props.projects
  if (cat === 'with-video') {
    return props.projects.filter((p) => Array.isArray(p.videos) && p.videos.length > 0)
  }
  return props.projects.filter((p) => p.categoryId === cat)
})

const allDroneVideos = computed(() => {
  const list = []
  for (const project of props.projects) {
    if (Array.isArray(project.videos)) {
      for (const video of project.videos) {
        list.push({
          ...video,
          projectId: project.id,
          projectTitle: project.title,
          location: project.location,
          client: project.client,
          poster: project.image,
          project,
        })
      }
    }
  }
  return list
})

const activeDroneVideo = ref(null)
watch(
  allDroneVideos,
  (list) => {
    if (list.length && !activeDroneVideo.value) {
      activeDroneVideo.value = list[0]
    }
  },
  { immediate: true }
)

function selectCategory(id) {
  emit('update:selectedCategory', id)
}

function getCategoryCount(id) {
  if (id === 'all') return props.projects.length
  if (id === 'with-video') {
    return props.projects.filter((p) => p.videos?.length > 0).length
  }
  return props.projects.filter((p) => p.categoryId === id).length
}

function openProject(project, initialTab = 'photos') {
  activeProject.value = project
  activeImageIndex.value = 0
  activeVideoIndex.value = 0
  activeMediaTab.value =
    initialTab === 'videos' && project.videos?.length ? 'videos' : 'photos'
}

function closeProject() {
  activeProject.value = null
}

function nextImage() {
  if (!activeProject.value?.images?.length) return
  activeImageIndex.value =
    (activeImageIndex.value + 1) % activeProject.value.images.length
}

function prevImage() {
  if (!activeProject.value?.images?.length) return
  activeImageIndex.value =
    (activeImageIndex.value - 1 + activeProject.value.images.length) %
    activeProject.value.images.length
}
</script>

<template>
  <section id="proyectos" class="section projects-section">
    <div class="container">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Experiencia comprobada · Portafolio oficial</p>
          <h2>Proyectos que hablan por nosotros.</h2>
        </div>
        <p>
          Más de 125.000 m² construidos en plantas industriales, centros de bodegaje,
          estaciones de servicio y equipamiento comercial e institucional en todo Chile.
        </p>
      </div>

      <!-- Barra de filtros editorial -->
      <div class="filters-bar" role="tablist" aria-label="Filtrar proyectos por especialidad">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          class="filter-pill"
          :class="{ 'filter-pill--active': selectedCategory === cat.id }"
          @click="selectCategory(cat.id)"
        >
          <span>{{ cat.label }}</span>
          <small>{{ getCategoryCount(cat.id) }}</small>
        </button>
      </div>

      <!-- Cuadrícula editorial de proyectos -->
      <div class="projects-grid">
        <article
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="project-card"
          :class="{ 'project-card--featured': index === 0 && selectedCategory === 'all' }"
          @click="openProject(project)"
        >
          <div class="project-image-wrap">
            <img
              :src="withBase(project.image)"
              :alt="project.title"
              class="project-image"
              loading="lazy"
              @error="handleImageError"
            />
            <div class="project-badges">
              <span class="project-category">{{ project.category }}</span>
              <span v-if="project.builtSurface" class="project-surface">
                {{ project.builtSurface }}
              </span>
            </div>
            <button
              v-if="project.videos?.length"
              type="button"
              class="project-video-tag"
              @click.stop="openProject(project, 'videos')"
            >
              ▶ Video Dron ({{ project.videos.length }})
            </button>
          </div>

          <div class="project-meta">
            <div class="project-meta-main">
              <span class="project-client">{{ project.client }} · {{ project.location }}</span>
              <h3>{{ project.title }}</h3>
              <p class="project-summary">{{ project.summary }}</p>
            </div>
            <div class="project-meta-side">
              <span class="project-cta-link">
                Ver ficha y fotos ({{ project.images?.length || 1 }}) ↗
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Showcase dedicado de los 11 Videos en Dron alojados en Supabase -->
      <div id="videos-dron" class="drone-showcase">
        <div class="drone-header">
          <div>
            <p class="eyebrow light">Material audiovisual en terreno · Supabase Media</p>
            <h3>Recorridos aéreos en dron de nuestras obras.</h3>
          </div>
          <p>
            Selecciona cualquiera de los 11 registros audiovisuales en alta definición para
            inspeccionar nuestras plantas industriales, bodegas, estaciones de servicio y obras educacionales.
          </p>
        </div>

        <div v-if="activeDroneVideo" class="drone-stage">
          <div class="drone-player-col">
            <div class="drone-video-frame">
              <video
                :key="activeDroneVideo.src"
                class="drone-video-element"
                :src="activeDroneVideo.src"
                :poster="withBase(activeDroneVideo.poster)"
                controls
                playsinline
                preload="metadata"
              ></video>
            </div>
            <div class="drone-video-caption">
              <div>
                <span class="drone-caption-client">
                  {{ activeDroneVideo.client }} · {{ activeDroneVideo.location }}
                </span>
                <h4>{{ activeDroneVideo.title }}</h4>
              </div>
              <button
                type="button"
                class="drone-open-project"
                @click="openProject(activeDroneVideo.project)"
              >
                Ver ficha técnica del proyecto ↗
              </button>
            </div>
          </div>

          <div class="drone-playlist">
            <button
              v-for="(vid, idx) in allDroneVideos"
              :key="vid.src"
              type="button"
              class="drone-playlist-item"
              :class="{ 'drone-playlist-item--active': activeDroneVideo.src === vid.src }"
              @click="activeDroneVideo = vid"
            >
              <span class="drone-idx">{{ String(idx + 1).padStart(2, '0') }}</span>
              <div class="drone-item-info">
                <strong>{{ vid.title }}</strong>
                <span>{{ vid.client }} · {{ vid.location }}</span>
              </div>
              <span class="drone-play-icon">▶</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal / Lightbox de proyecto con fotos del PPTX y videos de Supabase -->
    <div
      v-if="activeProject"
      class="project-modal-backdrop"
      role="dialog"
      aria-modal="true"
      :aria-label="activeProject.title"
      @click.self="closeProject"
    >
      <div class="project-modal">
        <div class="modal-topbar">
          <div>
            <span class="modal-eyebrow">
              {{ activeProject.category }} · {{ activeProject.client }}
            </span>
            <h3>{{ activeProject.title }}</h3>
          </div>
          <button type="button" class="modal-close" @click="closeProject">
            Cerrar ✕
          </button>
        </div>

        <div v-if="activeProject.videos?.length" class="modal-tabs">
          <button
            type="button"
            class="modal-tab"
            :class="{ 'modal-tab--active': activeMediaTab === 'photos' }"
            @click="activeMediaTab = 'photos'"
          >
            Fotografías ({{ activeProject.images?.length || 1 }})
          </button>
          <button
            type="button"
            class="modal-tab"
            :class="{ 'modal-tab--active': activeMediaTab === 'videos' }"
            @click="activeMediaTab = 'videos'"
          >
            ▶ Video Dron ({{ activeProject.videos.length }})
          </button>
        </div>

        <div class="modal-body">
          <div class="modal-media-col">
            <template v-if="activeMediaTab === 'videos' && activeProject.videos?.length">
              <div class="modal-video-wrap">
                <video
                  :key="activeProject.videos[activeVideoIndex].src"
                  :src="activeProject.videos[activeVideoIndex].src"
                  :poster="withBase(activeProject.image)"
                  controls
                  autoplay
                  playsinline
                  class="modal-video"
                ></video>
              </div>
              <div v-if="activeProject.videos.length > 1" class="modal-video-selector">
                <button
                  v-for="(v, vIdx) in activeProject.videos"
                  :key="v.src"
                  type="button"
                  class="video-sub-btn"
                  :class="{ 'video-sub-btn--active': activeVideoIndex === vIdx }"
                  @click="activeVideoIndex = vIdx"
                >
                  ▶ {{ v.title }}
                </button>
              </div>
            </template>

            <template v-else>
              <div class="modal-photo-stage">
                <img
                  :src="withBase(activeProject.images?.[activeImageIndex] || activeProject.image)"
                  :alt="activeProject.title"
                  class="modal-photo"
                  @error="handleImageError"
                />
                <template v-if="activeProject.images?.length > 1">
                  <button type="button" class="photo-nav photo-nav--prev" @click="prevImage">
                    ←
                  </button>
                  <button type="button" class="photo-nav photo-nav--next" @click="nextImage">
                    →
                  </button>
                </template>
              </div>

              <div v-if="activeProject.images?.length > 1" class="modal-thumbs">
                <button
                  v-for="(imgSrc, idx) in activeProject.images"
                  :key="imgSrc"
                  type="button"
                  class="thumb-btn"
                  :class="{ 'thumb-btn--active': activeImageIndex === idx }"
                  @click="activeImageIndex = idx"
                >
                  <img :src="withBase(imgSrc)" :alt="`Foto ${idx + 1}`" @error="handleImageError" />
                </button>
              </div>
            </template>
          </div>

          <div class="modal-specs-col">
            <h4>Ficha técnica del proyecto</h4>
            <p class="modal-description">{{ activeProject.summary }}</p>

            <dl class="specs-list">
              <div>
                <dt>Mandante / Cliente</dt>
                <dd>{{ activeProject.client }}</dd>
              </div>
              <div>
                <dt>Ubicación</dt>
                <dd>{{ activeProject.location }}</dd>
              </div>
              <div v-if="activeProject.builtSurface">
                <dt>Superficie construida</dt>
                <dd>{{ activeProject.builtSurface }}</dd>
              </div>
              <div v-if="activeProject.exteriorSurface">
                <dt>Superficie / Obras exteriores</dt>
                <dd>{{ activeProject.exteriorSurface }}</dd>
              </div>
              <div>
                <dt>Especialidad</dt>
                <dd>{{ activeProject.category }}</dd>
              </div>
            </dl>

            <a href="#contacto" class="modal-contact-cta" @click="closeProject">
              Consultar por un proyecto similar →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section { background: #ebe8e0; }
.section-heading {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 60px;
  align-items: end;
  margin-bottom: 42px;
}
.section-heading > p {
  color: var(--fg-2);
  line-height: 1.7;
  margin: 0;
  font-size: 15px;
}

.filters-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}
.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 11px 18px;
  background: var(--white);
  border: 1px solid var(--border);
  font-size: 13px;
  font-weight: 700;
  color: var(--fg);
  transition: background .2s, color .2s, border-color .2s;
}
.filter-pill small {
  font-size: 11px;
  opacity: .65;
}
.filter-pill--active,
.filter-pill:hover {
  background: var(--dark);
  color: var(--white);
  border-color: var(--dark);
}
.filter-pill--active small {
  color: var(--accent);
  opacity: 1;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}
.project-card {
  background: var(--white);
  border: 1px solid var(--border);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform .25s ease, box-shadow .25s ease;
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px rgba(16, 22, 31, 0.08);
}
.project-card--featured {
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
}
.project-image-wrap {
  position: relative;
  overflow: hidden;
  height: 330px;
  background: #d7d4cc;
}
.project-card--featured .project-image-wrap {
  height: 100%;
  min-height: 440px;
}
.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .55s ease;
}
.project-card:hover .project-image {
  transform: scale(1.035);
}
.project-badges {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.project-category {
  padding: 7px 11px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  background: rgba(255,255,255,.94);
  color: var(--fg);
}
.project-surface {
  padding: 7px 11px;
  font-size: 11px;
  font-weight: 800;
  background: var(--dark);
  color: var(--white);
}
.project-video-tag {
  position: absolute;
  bottom: 16px;
  right: 16px;
  padding: 8px 13px;
  border: 0;
  font-size: 12px;
  font-weight: 700;
  background: var(--accent);
  color: var(--fg);
}

.project-meta {
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  flex: 1;
}
.project-client {
  display: block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--accent);
  margin-bottom: 6px;
}
.project-meta h3 {
  font-size: 22px;
  line-height: 1.2;
  margin: 0 0 10px;
}
.project-summary {
  margin: 0;
  color: var(--fg-2);
  font-size: 14px;
  line-height: 1.62;
}
.project-cta-link {
  font-size: 13px;
  font-weight: 700;
  color: var(--fg);
  border-top: 1px solid var(--border);
  padding-top: 14px;
  display: block;
}

/* Drone Video Showcase */
.drone-showcase {
  margin-top: 88px;
  background: var(--dark);
  color: var(--white);
  padding: 56px;
}
.drone-header {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 48px;
  align-items: end;
  margin-bottom: 40px;
}
.drone-header h3 {
  font-size: clamp(30px, 3.6vw, 48px);
  line-height: 1.04;
  margin: 0;
}
.drone-header > p {
  margin: 0;
  color: rgba(255,255,255,.68);
  line-height: 1.65;
  font-size: 14px;
}
.drone-stage {
  display: grid;
  grid-template-columns: 1.4fr 0.6fr;
  gap: 28px;
  align-items: start;
}
.drone-video-frame {
  background: #05080d;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.15);
}
.drone-video-element {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.drone-video-caption {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-top: 18px;
}
.drone-caption-client {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .12em;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 4px;
}
.drone-video-caption h4 {
  margin: 0;
  font-size: 20px;
}
.drone-open-project {
  background: transparent;
  border: 1px solid rgba(255,255,255,.35);
  color: var(--white);
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}
.drone-open-project:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.drone-playlist {
  display: flex;
  flex-direction: column;
  max-height: 440px;
  overflow-y: auto;
  border: 1px solid rgba(255,255,255,.14);
}
.drone-playlist-item {
  display: grid;
  grid-template-columns: 32px 1fr 24px;
  gap: 12px;
  align-items: center;
  text-align: left;
  padding: 14px 16px;
  background: rgba(255,255,255,.02);
  color: var(--white);
  border: 0;
  border-bottom: 1px solid rgba(255,255,255,.1);
  transition: background .2s;
}
.drone-playlist-item:hover {
  background: rgba(255,255,255,.08);
}
.drone-playlist-item--active {
  background: rgba(242, 107, 33, 0.18);
  border-left: 3px solid var(--accent);
}
.drone-idx {
  font-size: 11px;
  font-weight: 800;
  color: var(--accent);
}
.drone-item-info strong {
  display: block;
  font-size: 13px;
  line-height: 1.3;
}
.drone-item-info span {
  display: block;
  font-size: 11px;
  color: rgba(255,255,255,.55);
  margin-top: 3px;
}
.drone-play-icon {
  font-size: 12px;
  color: var(--accent);
  text-align: right;
}

/* Modal */
.project-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(9, 14, 21, 0.84);
  backdrop-filter: blur(6px);
  display: grid;
  place-items: center;
  padding: 24px;
  overflow-y: auto;
}
.project-modal {
  background: var(--white);
  color: var(--fg);
  width: min(1120px, 100%);
  border: 1px solid var(--border);
  overflow: hidden;
}
.modal-topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 24px 32px;
  background: var(--dark);
  color: var(--white);
}
.modal-eyebrow {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .12em;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 6px;
}
.modal-topbar h3 {
  margin: 0;
  font-size: 24px;
}
.modal-close {
  background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,255,255,.25);
  color: var(--white);
  padding: 8px 14px;
  font-weight: 700;
  font-size: 13px;
}
.modal-tabs {
  display: flex;
  gap: 8px;
  padding: 12px 32px;
  background: var(--canvas);
  border-bottom: 1px solid var(--border);
}
.modal-tab {
  padding: 8px 16px;
  border: 1px solid var(--border);
  background: var(--white);
  font-weight: 700;
  font-size: 13px;
}
.modal-tab--active {
  background: var(--accent);
  border-color: var(--accent);
}
.modal-body {
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 32px;
  padding: 32px;
}
.modal-photo-stage,
.modal-video-wrap {
  position: relative;
  background: #10161f;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}
.modal-photo,
.modal-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.photo-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border: 0;
  background: rgba(16, 22, 31, 0.82);
  color: var(--white);
  font-size: 18px;
}
.photo-nav--prev { left: 12px; }
.photo-nav--next { right: 12px; }
.modal-thumbs {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  overflow-x: auto;
}
.thumb-btn {
  width: 88px;
  height: 60px;
  padding: 0;
  border: 2px solid transparent;
  overflow: hidden;
  flex-shrink: 0;
}
.thumb-btn--active {
  border-color: var(--accent);
}
.thumb-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.modal-video-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
.video-sub-btn {
  padding: 8px 12px;
  border: 1px solid var(--border);
  background: var(--canvas);
  font-size: 12px;
  font-weight: 700;
}
.video-sub-btn--active {
  background: var(--dark);
  color: var(--white);
}
.modal-specs-col h4 {
  font-size: 20px;
  margin-bottom: 12px;
}
.modal-description {
  font-size: 14px;
  line-height: 1.65;
  color: var(--fg-2);
  margin: 0 0 24px;
}
.specs-list {
  margin: 0 0 28px;
  border-top: 1px solid var(--border);
}
.specs-list > div {
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.specs-list dt {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--muted);
  font-weight: 700;
}
.specs-list dd {
  margin: 4px 0 0;
  font-size: 15px;
  font-weight: 700;
}
.modal-contact-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 48px;
  background: var(--accent);
  color: var(--fg);
  font-weight: 700;
  font-size: 14px;
}

@media (max-width: 960px) {
  .section-heading { grid-template-columns: 1fr; gap: 20px; }
  .projects-grid { grid-template-columns: 1fr; }
  .project-card--featured { grid-column: auto; grid-template-columns: 1fr; }
  .project-card--featured .project-image-wrap { min-height: 320px; }
  .drone-showcase { padding: 32px 20px; }
  .drone-header { grid-template-columns: 1fr; gap: 16px; }
  .drone-stage { grid-template-columns: 1fr; }
  .drone-video-caption { flex-direction: column; align-items: flex-start; }
  .modal-body { grid-template-columns: 1fr; padding: 20px; }
  .modal-topbar { padding: 18px 20px; }
}
</style>
