<script setup>
import { ref } from 'vue'

const open = ref(false)
const close = () => (open.value = false)
</script>

<template>
  <header class="site-header">
    <a class="brand" href="#inicio" aria-label="Tocal, inicio">
      <span class="brand-mark">T</span>
      <span class="brand-name">TOCAL</span>
    </a>

    <button class="menu-button" type="button" aria-label="Abrir menú" @click="open = !open">
      <span></span><span></span>
    </button>

    <nav :class="['nav', { 'nav--open': open }]">
      <a href="#empresa" @click="close">Empresa</a>
      <a href="#servicios" @click="close">Servicios</a>
      <a href="#proyectos" @click="close">Proyectos</a>
      <a href="#contacto" class="nav-cta" @click="close">Contacto</a>
    </nav>
  </header>
</template>
