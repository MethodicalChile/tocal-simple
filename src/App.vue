<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import TeamSection from './components/TeamSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import ProjectModal from './components/projects/ProjectModal.vue'
import WhatsAppButton from './components/contact/WhatsAppButton.vue'
import { companyData, servicesData, projects, team } from './data/site'
import { useI18n } from './i18n'

const { t } = useI18n()
const activeSection = ref('inicio')
const activeProjectCategory = ref('all')
const selectedProject = ref(null)
const modalOpenerEl = ref(null)
const contactSubject = ref('')
const contactArea = ref('general')

const sectionIds = ['inicio', 'quienes-somos', 'servicios', 'proyectos', 'equipo', 'contacto']
const validCategories = new Set(['all', 'fuels', 'industrial-plants', 'shopping-centers'])
const categoryAliases = {
  combustibles: 'fuels',
  'plantas-industriales': 'industrial-plants',
  'centros-comerciales': 'shopping-centers',
}

function syncUrlParams({ projectSlug = null, category = null, push = false } = {}) {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)

  if (projectSlug) {
    url.searchParams.set('proyecto', projectSlug)
  } else {
    url.searchParams.delete('proyecto')
    url.searchParams.delete('project')
  }

  if (category && category !== 'all') {
    url.searchParams.set('categoria', category)
  } else if (category === 'all') {
    url.searchParams.delete('categoria')
    url.searchParams.delete('category')
  }

  if (push) {
    window.history.pushState({ projectSlug }, '', url.toString())
  } else {
    window.history.replaceState({ projectSlug }, '', url.toString())
  }
}

function openProjectModal(project, triggerEl = null) {
  const wasAlreadyOpen = Boolean(selectedProject.value)
  modalOpenerEl.value =
    triggerEl || (typeof document !== 'undefined' ? document.activeElement : null)
  selectedProject.value = project
  syncUrlParams({
    projectSlug: project?.slug || project?.id || null,
    category: activeProjectCategory.value,
    push: !wasAlreadyOpen,
  })
}

function closeProjectModal() {
  selectedProject.value = null
  syncUrlParams({
    projectSlug: null,
    category: activeProjectCategory.value,
    push: false,
  })
}

function handleFilterByCategory(categoryId) {
  activeProjectCategory.value = categoryId || 'all'
}

watch(activeProjectCategory, (newCat) => {
  syncUrlParams({
    projectSlug: selectedProject.value?.slug || selectedProject.value?.id || null,
    category: newCat,
    push: false,
  })
})

function handleProjectInquire(payload) {
  if (!payload) return
  if (typeof payload === 'string') {
    contactSubject.value = payload
    return
  }
  if (payload.title) {
    contactSubject.value = payload.title
  }
  if (payload.category) {
    contactArea.value = payload.category
  }
}

function restoreStateFromUrl() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)

  const rawCat = (params.get('categoria') || params.get('category') || '').toLowerCase()
  const mappedCat = categoryAliases[rawCat] || rawCat
  if (validCategories.has(mappedCat)) {
    activeProjectCategory.value = mappedCat
  }

  const rawProject = params.get('proyecto') || params.get('project')
  if (rawProject) {
    const found = projects.find((p) => p.slug === rawProject || p.id === rawProject)
    selectedProject.value = found || null
  } else {
    selectedProject.value = null
  }
}

function updateActiveSectionOnScroll() {
  const scrollPosition = window.scrollY + 180
  let current = 'inicio'
  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el && el.offsetTop <= scrollPosition) {
      current = id
    }
  }
  activeSection.value = current
}

onMounted(() => {
  restoreStateFromUrl()
  updateActiveSectionOnScroll()
  window.addEventListener('scroll', updateActiveSectionOnScroll, { passive: true })
  window.addEventListener('popstate', restoreStateFromUrl)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveSectionOnScroll)
  window.removeEventListener('popstate', restoreStateFromUrl)
})
</script>

<template>
  <a href="#main-content" class="skip-link">{{ t('nav.skipToContent') }}</a>

  <SiteHeader :active-section="activeSection" />

  <main id="main-content">
    <HeroSection
      :company="companyData"
      :services="servicesData"
      :projects="projects"
      @select-project="openProjectModal"
      @filter-by-category="handleFilterByCategory"
    />

    <AboutSection :company="companyData" />

    <ServicesSection
      :services="servicesData"
      :projects="projects"
      @filter-by-category="handleFilterByCategory"
      @select-project="openProjectModal"
      @inquire-service="handleProjectInquire"
    />

    <ProjectsSection
      v-model:active-category="activeProjectCategory"
      :projects="projects"
      @select-project="openProjectModal"
    />

    <TeamSection :members="team" />

    <ContactSection
      :services="servicesData"
      :initial-subject="contactSubject"
      :initial-area="contactArea"
    />
  </main>

  <SiteFooter
    :services="servicesData"
    @filter-by-category="handleFilterByCategory"
  />

  <ProjectModal
    :project="selectedProject"
    :projects-list="projects"
    :opener-element="modalOpenerEl"
    @close="closeProjectModal"
    @inquire="handleProjectInquire"
    @navigate="(proj) => openProjectModal(proj, modalOpenerEl)"
  />

  <WhatsAppButton />
</template>
