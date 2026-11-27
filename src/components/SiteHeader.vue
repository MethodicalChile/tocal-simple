<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { conBase } from '../config.js'

const solida = ref(false)
const abierto = ref(false)
const activa = ref('')
const enlaces = [
  { id: 'obras', texto: 'Obras' },
  { id: 'fichas', texto: 'Fichas de obra' },
  { id: 'especialidades', texto: 'Especialidades' },
  { id: 'empresa', texto: 'Empresa' },
]

let io = null
const alDesplazar = () => { solida.value = window.scrollY > 40 }
onMounted(() => {
  alDesplazar()
  window.addEventListener('scroll', alDesplazar, { passive: true })
  // la sección que cruza la franja central de la pantalla queda marcada en el menú
  io = new IntersectionObserver((entradas) => {
    for (const e of entradas) if (e.isIntersecting) activa.value = e.target.id
  }, { rootMargin: '-45% 0px -50% 0px' })
  for (const id of [...enlaces.map((e) => e.id), 'inicio', 'contacto']) {
    const el = document.getElementById(id)
    if (el) io.observe(el)
  }
})
onBeforeUnmount(() => { window.removeEventListener('scroll', alDesplazar); io?.disconnect() })
</script>

<template>
  <header class="cab" :class="{ 'cab--solida': solida || abierto }">
    <div class="contenedor cab__fila">
      <a href="#inicio" class="logo" aria-label="Constructora Tocal, ir al inicio">
        <img class="logo__claro" :src="conBase('/images/logo-tocal-blanco-recorte.png')" alt="" width="130" height="197" />
        <img class="logo__oscuro" :src="conBase('/images/logo-tocal-recorte.png')" alt="" width="130" height="197" />
      </a>
      <nav id="menu-movil" class="nav" :class="{ 'nav--abierta': abierto }" aria-label="Principal">
        <a
          v-for="e in enlaces" :key="e.id" :href="`#${e.id}`" :aria-current="activa === e.id ? 'location' : undefined"
          @click="abierto = false"
        >{{ e.texto }}</a>
        <a
          href="#contacto" class="boton nav__cta" :class="solida || abierto ? 'boton--naranja' : 'boton--contorno'"
          @click="abierto = false"
        >Cotizar una obra</a>
      </nav>
      <button class="menu" type="button" :aria-expanded="abierto" aria-controls="menu-movil" @click="abierto = !abierto">
        {{ abierto ? 'Cerrar' : 'Menú' }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.cab {
  position: fixed; inset: 0 0 auto; z-index: 50; height: var(--header); color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, .22);
  transition: background-color .2s, color .2s, border-color .2s;
}
.cab--solida { background: var(--blanco); color: var(--tinta); border-bottom-color: var(--linea); }
.cab__fila { height: 100%; display: flex; align-items: center; justify-content: space-between; gap: var(--e5); }
.logo { display: block; height: 56px; position: relative; aspect-ratio: 130 / 197; }
.logo img { position: absolute; inset: 0; width: 100%; height: 100%; transition: opacity .2s; }
.logo__oscuro { opacity: 0; }
.cab--solida .logo__claro { opacity: 0; }
.cab--solida .logo__oscuro { opacity: 1; }
.nav { display: flex; align-items: stretch; gap: var(--e6); height: 100%; font-size: .9375rem; font-weight: 500; }
.nav a:not(.boton) {
  display: flex; align-items: center; text-decoration: none; border-bottom: 2px solid transparent; margin-bottom: -1px;
}
.nav a:not(.boton):hover { border-bottom-color: currentColor; }
.nav a[aria-current] { border-bottom-color: var(--naranja); }
.nav__cta { align-self: center; min-height: 40px; padding: 0 16px; font-size: var(--t-dato); }
.cab:not(.cab--solida) .nav__cta.boton--contorno:hover { background: #fff; border-color: #fff; color: var(--tinta); }
.menu {
  display: none; min-height: 38px; padding: 0 14px; background: none; border: 1px solid currentColor;
  border-radius: var(--radio); font-weight: 600; font-size: var(--t-dato);
}

@media (max-width: 900px) {
  .logo { height: 46px; }
  .menu { display: block; }
  .nav {
    position: fixed; inset: var(--header) 0 auto; height: auto; flex-direction: column; gap: 0;
    padding: 0 var(--gutter) var(--e5); background: var(--blanco); color: var(--tinta); border-bottom: 1px solid var(--linea);
    visibility: hidden; opacity: 0; transition: opacity .2s, visibility .2s;
  }
  .nav--abierta { visibility: visible; opacity: 1; }
  .nav a:not(.boton) { padding: 14px 0; border-bottom: 1px solid var(--linea); margin: 0; font-size: var(--t-texto); }
  .nav a[aria-current] { border-bottom-color: var(--linea); color: var(--naranja-osc); }
  .nav__cta { align-self: stretch; margin-top: var(--e4); min-height: 46px; }
}
</style>
