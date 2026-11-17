<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../i18n'
import { siteConfig } from '../config/site'
import ProjectCard from './projects/ProjectCard.vue'
import ProjectFilters from './projects/ProjectFilters.vue'

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
  activeCategory: {
    type: String,
    default: 'all',
  },
})

const emit = defineEmits(['update:activeCategory', 'selectProject'])
const { t, localize } = useI18n()

const searchQuery = ref('')
const categoryKeys = ['all', 'fuels', 'industrial-plants', 'shopping-centers']

const categoryCounts = computed(() => {
  const counts = {
    all: props.projects.length,
    fuels: 0,
    'industrial-plants': 0,
    'shopping-centers': 0,
  }
  for (const project of props.projects) {
    if (counts[project.category] !== undefined) {
      counts[project.category] += 1
    }
  }
  return counts
})

const filteredProjects = computed(() => {
  const byCategory =
    props.activeCategory === 'all'
      ? props.projects
      : props.projects.filter((project) => project.category === props.activeCategory)

  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return byCategory

  return byCategory.filter((project) => {
    const searchable = [
      localize(project.title),
      localize(project.shortDescription),
      localize(project.description),
      localize(project.workType),
      project.location || '',
    ]
      .join(' ')
      .toLowerCase()
    return searchable.includes(query)
  })
})

function setCategory(cat) {
  emit('update:activeCategory', cat)
}

function resetAllFilters() {
  searchQuery.value = ''
  emit('update:activeCategory', 'all')
}

function onSelectProject(project, triggerEl) {
  emit('selectProject', project, triggerEl)
}
</script>

<template>
  <section id="proyectos" class="section projects-section">
    <div class="container">
      <div class="section-header">
        <div>
          <p class="eyebrow">{{ t('projects.eyebrow') }}</p>
          <h2>{{ t('projects.title') }}</h2>
        </div>
        <p class="section-subtitle">{{ t('projects.subtitle') }}</p>
      </div>

      <div v-if="siteConfig.showProvisionalBadges" class="projects-demo-banner" role="note">
        <span class="provisional-pill">{{ t('projects.demoBadge') }}</span>
        <p>{{ t('projects.demoNotice') }}</p>
      </div>

      <div class="projects-toolbar">
        <ProjectFilters
          :categories="categoryKeys"
          :active-category="activeCategory"
          :counts="categoryCounts"
          @change="setCategory"
        />

        <div class="projects-search">
          <input
            v-model="searchQuery"
            type="search"
            class="projects-search__input"
            :placeholder="t('projects.searchPlaceholder')"
            :aria-label="t('projects.searchAria')"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="projects-search__clear"
            :aria-label="t('projects.clearSearch')"
            @click="searchQuery = ''"
          >
            ✕
          </button>
        </div>
      </div>

      <TransitionGroup
        v-if="filteredProjects.length > 0"
        name="project-grid"
        tag="div"
        class="projects-grid"
      >
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          @select="onSelectProject"
        />
      </TransitionGroup>

      <div v-else class="projects-empty" role="status">
        <h3>{{ t('projects.emptyCategoryTitle') }}</h3>
        <p>{{ t('projects.emptyCategoryText') }}</p>
        <button type="button" class="btn btn-outline-dark" @click="resetAllFilters">
          {{ t('projects.resetFilter') }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  background: var(--canvas-alt);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.projects-demo-banner {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  margin-bottom: 28px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius-sm);
}

.projects-demo-banner p {
  margin: 0;
  font-size: 13px;
  color: var(--fg-2);
}

.projects-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 36px;
}

.projects-toolbar :deep(.project-filters) {
  margin-bottom: 0;
}

.projects-search {
  position: relative;
  min-width: 280px;
  flex: 1 1 280px;
  max-width: 380px;
}

.projects-search__input {
  width: 100%;
  min-height: 44px;
  padding: 10px 36px 10px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--fg);
  font-size: 13px;
}

.projects-search__input:focus {
  border-color: var(--accent);
}

.projects-search__clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: var(--fg-muted);
  font-size: 14px;
  padding: 4px 6px;
}

/* Diseño recomendado en el requerimiento 7.1: 3 columnas en pantallas grandes, 2 en tablets, 1 en celulares */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 26px;
}

.project-grid-enter-active,
.project-grid-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.project-grid-enter-from,
.project-grid-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.projects-empty {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 56px 24px;
  text-align: center;
}

.projects-empty h3 {
  font-size: 22px;
  margin-bottom: 10px;
}

.projects-empty p {
  max-width: 520px;
  margin: 0 auto 24px;
  color: var(--fg-2);
  font-size: 15px;
}

@media (max-width: 1040px) {
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
  }
}

@media (max-width: 640px) {
  .projects-demo-banner {
    flex-direction: column;
    align-items: flex-start;
  }
  .projects-search {
    max-width: 100%;
  }
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
