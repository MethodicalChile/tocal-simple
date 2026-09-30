<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import StatsSection from './components/StatsSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import { company, projects, services, stats } from './data/site'
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection :company="company" />
    <AboutSection />
    <StatsSection :stats="stats" />
    <ServicesSection :services="services" />
    <ProjectsSection :projects="projects" />
    <ContactSection :company="company" />
  </main>
  <SiteFooter :company="company" />
</template>
