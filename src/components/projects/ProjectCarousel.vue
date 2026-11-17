<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from '../../i18n'
import { withBase, handleImageError } from '../../utils/assets'

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  projectTitle: {
    type: String,
    default: '',
  },
  projectKey: {
    type: String,
    default: '',
  },
})

const { t, localize } = useI18n()
const currentIndex = ref(0)
const isFullscreen = ref(false)
const touchStartX = ref(null)
const touchStartY = ref(null)

/**
 * Normaliza cada elemento del arreglo `images` para soportar tanto rutas de texto simples
 * ("/images/projects/.../image-01.webp") como objetos con pie de foto opcional:
 * ({ src: "/images/...", caption: { es: "...", en: "..." } }).
 */
const normalizedImages = computed(() => {
  if (!Array.isArray(props.images)) return []
  return props.images
    .map((item) => {
      if (!item) return null
      if (typeof item === 'string') {
        return { src: item, caption: null }
      }
      if (typeof item === 'object' && typeof item.src === 'string' && item.src.trim()) {
        return { src: item.src.trim(), caption: item.caption ?? null }
      }
      return null
    })
    .filter(Boolean)
})

const total = computed(() => normalizedImages.value.length)
const hasMultiple = computed(() => total.value > 1)
const currentItem = computed(() => normalizedImages.value[currentIndex.value] || null)
const currentImage = computed(() => currentItem.value?.src || '')
const currentCaption = computed(() =>
  currentItem.value?.caption ? localize(currentItem.value.caption).trim() : ''
)

function preloadNeighborImages(idx) {
  if (typeof window === 'undefined' || total.value <= 1) return
  const nextIdx = (idx + 1) % total.value
  const prevIdx = (idx - 1 + total.value) % total.value
  for (const neighborIdx of [nextIdx, prevIdx]) {
    const src = normalizedImages.value[neighborIdx]?.src
    if (src) {
      const img = new window.Image()
      img.src = withBase(src)
    }
  }
}

// Reiniciar siempre a la primera fotografía (índice 0) al cambiar de proyecto o de arreglo de imágenes
watch(
  [() => props.projectKey, () => props.images],
  () => {
    currentIndex.value = 0
    isFullscreen.value = false
    preloadNeighborImages(0)
  },
  { immediate: true }
)

watch(currentIndex, (idx) => {
  preloadNeighborImages(idx)
})

function next() {
  if (!hasMultiple.value) return
  currentIndex.value = (currentIndex.value + 1) % total.value
}

function prev() {
  if (!hasMultiple.value) return
  currentIndex.value = (currentIndex.value - 1 + total.value) % total.value
}

function goTo(idx) {
  if (idx >= 0 && idx < total.value) {
    currentIndex.value = idx
  }
}

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

function exitFullscreen() {
  isFullscreen.value = false
}

function onTouchStart(event) {
  if (!hasMultiple.value) return
  const touch = event.changedTouches?.[0]
  if (!touch) return
  touchStartX.value = touch.clientX
  touchStartY.value = touch.clientY
}

function onTouchEnd(event) {
  if (!hasMultiple.value || touchStartX.value === null) return
  const touch = event.changedTouches?.[0]
  if (!touch) return
  const deltaX = touch.clientX - touchStartX.value
  const deltaY = touch.clientY - (touchStartY.value ?? touch.clientY)

  // Solo activar swipe horizontal cuando el desplazamiento horizontal supera 40px y es mayor que el vertical
  if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX < 0) {
      next()
    } else {
      prev()
    }
  }
  touchStartX.value = null
  touchStartY.value = null
}

defineExpose({
  next,
  prev,
  goTo,
  currentIndex,
  isFullscreen,
  exitFullscreen,
})
</script>

<template>
  <div
    :class="['carousel', { 'carousel--fullscreen': isFullscreen }]"
    role="region"
    :aria-label="t('projects.carousel.regionAria')"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <div v-if="total > 0" class="carousel__viewport">
      <img
        :key="`${projectKey}-${currentIndex}`"
        :src="withBase(currentImage)"
        :alt="currentCaption ? `${projectTitle} — ${currentCaption}` : `${projectTitle} — ${currentIndex + 1} / ${total}`"
        class="carousel__image"
        @error="handleImageError"
      />

      <button
        type="button"
        class="carousel__fullscreen-btn"
        :aria-label="
          isFullscreen
            ? t('projects.carousel.fullscreenCloseAria')
            : t('projects.carousel.fullscreenOpenAria')
        "
        @click="toggleFullscreen"
      >
        <span aria-hidden="true">{{ isFullscreen ? '✕' : '⛶' }}</span>
      </button>

      <button
        v-if="hasMultiple"
        type="button"
        class="carousel__nav carousel__nav--prev"
        :aria-label="t('projects.carousel.prevAria')"
        @click="prev"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <button
        v-if="hasMultiple"
        type="button"
        class="carousel__nav carousel__nav--next"
        :aria-label="t('projects.carousel.nextAria')"
        @click="next"
      >
        <span aria-hidden="true">›</span>
      </button>

      <div v-if="currentCaption" class="carousel__caption">
        {{ currentCaption }}
      </div>

      <div
        class="carousel__counter"
        aria-live="polite"
        :aria-label="t('projects.carousel.counterAria', { current: currentIndex + 1, total })"
      >
        {{ currentIndex + 1 }} / {{ total }}
      </div>
    </div>

    <div v-else class="carousel__empty">
      <span class="carousel__empty-icon" aria-hidden="true">◻</span>
      <p>{{ t('projects.carousel.emptyGallery') }}</p>
    </div>

    <div v-if="hasMultiple" class="carousel__footer">
      <div
        class="carousel__thumbs"
        role="tablist"
        :aria-label="t('projects.carousel.thumbnailsAria')"
      >
        <button
          v-for="(item, idx) in normalizedImages"
          :key="`${item.src}-${idx}`"
          type="button"
          role="tab"
          :class="['carousel__thumb', { 'carousel__thumb--active': idx === currentIndex }]"
          :aria-selected="idx === currentIndex ? 'true' : 'false'"
          :aria-label="
            item.caption
              ? `${t('projects.carousel.counterAria', { current: idx + 1, total })}: ${localize(item.caption)}`
              : t('projects.carousel.counterAria', { current: idx + 1, total })
          "
          @click="goTo(idx)"
        >
          <img
            :src="withBase(item.src)"
            :alt="`${projectTitle} — ${idx + 1}`"
            class="carousel__thumb-img"
            loading="lazy"
            @error="handleImageError"
          />
        </button>
      </div>
      <p class="carousel__hint">{{ t('projects.carousel.keyboardHint') }}</p>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  width: 100%;
  user-select: none;
}

.carousel--fullscreen {
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(6, 9, 14, 0.96);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
}

.carousel__viewport {
  position: relative;
  width: 100%;
  /* Contenedor de proporción fija para evitar que imágenes de distinta relación de aspecto deformen o desplacen el modal */
  aspect-ratio: 16 / 10;
  max-height: 58vh;
  background: #0c1118;
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.carousel--fullscreen .carousel__viewport {
  aspect-ratio: auto;
  height: calc(100dvh - 140px);
  max-height: none;
  background: transparent;
  border: 0;
}

.carousel__image {
  width: 100%;
  height: 100%;
  /* Mantiene la proporción original de cada fotografía sin recortes innecesarios */
  object-fit: contain;
  display: block;
}

.carousel__fullscreen-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(11, 16, 24, 0.78);
  color: var(--white);
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.carousel__fullscreen-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #111827;
}

.carousel__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(11, 16, 24, 0.78);
  color: var(--white);
  font-size: 28px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  z-index: 2;
}

.carousel__nav:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #111827;
}

.carousel__nav--prev {
  left: 14px;
}

.carousel__nav--next {
  right: 14px;
}

.carousel__caption {
  position: absolute;
  left: 14px;
  bottom: 14px;
  right: 96px;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  background: rgba(11, 16, 24, 0.85);
  border-left: 3px solid var(--accent);
  color: rgba(255, 255, 255, 0.94);
  font-size: 13px;
  line-height: 1.4;
  z-index: 2;
}

.carousel__counter {
  position: absolute;
  bottom: 14px;
  right: 14px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(11, 16, 24, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: var(--white);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  z-index: 2;
}

.carousel__empty {
  aspect-ratio: 16 / 9;
  max-height: 360px;
  background: #121822;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.65);
}

.carousel__empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
  color: var(--accent);
}

.carousel__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 14px;
}

.carousel--fullscreen .carousel__footer {
  justify-content: center;
}

.carousel__thumbs {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  max-width: 100%;
}

.carousel__thumb {
  width: 68px;
  height: 46px;
  border-radius: var(--radius-sm);
  border: 2px solid transparent;
  padding: 0;
  overflow: hidden;
  background: #0c1118;
  opacity: 0.58;
  flex-shrink: 0;
  transition: opacity 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.carousel__thumb:hover {
  opacity: 0.9;
}

.carousel__thumb--active {
  opacity: 1;
  border-color: var(--accent);
  transform: translateY(-1px);
}

.carousel__thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__hint {
  margin: 0;
  font-size: 12px;
  color: var(--fg-muted);
}

.carousel--fullscreen .carousel__hint {
  color: rgba(255, 255, 255, 0.68);
}

@media (max-width: 640px) {
  .carousel__viewport {
    aspect-ratio: 4 / 3;
  }
  .carousel__nav {
    width: 40px;
    height: 40px;
    font-size: 24px;
  }
  .carousel__nav--prev {
    left: 8px;
  }
  .carousel__nav--next {
    right: 8px;
  }
  .carousel__caption {
    font-size: 11px;
    padding: 6px 10px;
    left: 8px;
    bottom: 8px;
    right: 78px;
  }
  .carousel__hint {
    display: none;
  }
}
</style>
