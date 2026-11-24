<script setup>
import { ref } from 'vue'
import { withBase, handleImageError } from '../utils/assets'

defineProps({ company: Object })

const open = ref(false)
const close = () => (open.value = false)
</script>

<template>
  <header class="site-header">
    <a class="brand" href="#inicio" aria-label="Tocal, inicio" @click="close">
      <img
        :src="withBase('/images/logo-tocal-blanco.png')"
        alt="Constructora TOCAL"
        class="brand-image"
        @error="handleImageError"
      />
    </a>

    <button
      class="menu-button"
      type="button"
      :aria-expanded="open"
      aria-label="Abrir menú"
      @click="open = !open"
    >
      <span></span><span></span>
    </button>

    <nav :class="['nav', { 'nav--open': open }]">
      <a href="#empresa" @click="close">Empresa</a>
      <a href="#clientes" @click="close">Clientes</a>
      <a href="#servicios" @click="close">Especialidades</a>
      <a href="#proyectos" @click="close">Proyectos (22)</a>
      <a href="#videos-dron" @click="close">Videos Dron</a>
      <a href="#contacto" class="nav-cta" @click="close">Contacto</a>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  height: 82px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 max(24px, calc((100vw - var(--max)) / 2));
  color: white;
  background: linear-gradient(to bottom, rgba(11, 16, 24, 0.96), rgba(11, 16, 24, 0.78));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.brand { display: flex; align-items: center; gap: 12px; }
.brand-image {
  height: 48px;
  width: auto;
}
.nav { display: flex; align-items: center; gap: 30px; font-size: 14px; font-weight: 500; }
.nav a { opacity: .86; transition: opacity .2s, color .2s; }
.nav a:hover { opacity: 1; color: var(--accent); }
.nav-cta {
  padding: 10px 18px;
  border: 1px solid rgba(255,255,255,.55);
  font-weight: 700;
  transition: background .2s, border-color .2s, color .2s;
}
.nav-cta:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--fg) !important;
}
.menu-button { display: none; border: 0; background: transparent; padding: 8px; }
.menu-button span { display:block; width: 24px; height: 2px; background: white; margin: 6px 0; }

@media (max-width: 960px) {
  .site-header { padding: 0 16px; }
  .menu-button { display:block; z-index:102; }
  .nav {
    position:fixed;
    inset:0;
    background:#10161f;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:center;
    padding:32px;
    gap:24px;
    font-size:28px;
    transform:translateX(100%);
    transition:transform .3s ease;
  }
  .nav--open { transform:translateX(0); }
  .nav-cta { border:0; padding:0; color:var(--accent); }
}
</style>
