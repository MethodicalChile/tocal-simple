<script setup>
import { ref } from 'vue'

const open = ref(false)
const close = () => (open.value = false)
</script>

<template>
  <header class="site-header">
    <a class="brand" href="#inicio" aria-label="Tocal, inicio">
      <img src="/images/logo-tocal-blanco.png" alt="Tocal" class="brand-image" />
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
  background: linear-gradient(to bottom, rgba(11, 16, 24, 0.95), rgba(11, 16, 24, 0.7));
}
.brand { display: flex; align-items: center; gap: 12px; }
.brand-image {
  height: 50px;
  width: auto;
}
.nav { display: flex; align-items: center; gap: 34px; font-size: 14px; }
.nav a { opacity: .88; transition: opacity .2s; }
.nav a:hover { opacity: 1; }
.nav-cta { padding: 11px 16px; border: 1px solid rgba(255,255,255,.55); }
.menu-button { display: none; border: 0; background: transparent; padding: 8px; }
.menu-button span { display:block; width: 24px; height: 1px; background: white; margin: 6px 0; }

@media (max-width: 900px) {
  .site-header { padding: 0 16px; }
  .menu-button { display:block; z-index:102; }
  .nav { position:fixed; inset:0; background:#10161f; display:flex; flex-direction:column; align-items:flex-start; justify-content:center; padding:32px; gap:26px; font-size:32px; transform:translateX(100%); transition:transform .3s ease; }
  .nav--open { transform:translateX(0); }
  .nav-cta { border:0; padding:0; color:var(--accent); }
}
</style>
