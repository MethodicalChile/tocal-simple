<script setup>
import { ref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import StatsSection from './components/StatsSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import { company, projects, projectCategories, services, stats } from './data/site'

const selectedCategory = ref('all')

function handleSelectServiceCategory(categoryId) {
  const mapped = categoryId === 'warehouses' ? 'industrial-plants' : categoryId
  selectedCategory.value = mapped
  const el = document.getElementById('proyectos')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleOpenDroneVideos() {
  selectedCategory.value = 'with-video'
  const el = document.getElementById('proyectos')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <SiteHeader :company="company" />
  <main>
    <HeroSection
      :company="company"
      @open-videos="handleOpenDroneVideos"
    />
    <StatsSection :stats="stats" />
    <AboutSection :company="company" />
    <ServicesSection
      :services="services"
      @select-category="handleSelectServiceCategory"
    />
    <ProjectsSection
      :projects="projects"
      :categories="projectCategories"
      v-model:selected-category="selectedCategory"
    />
    <ContactSection :company="company" />
  </main>
  <SiteFooter :company="company" />
</template>
