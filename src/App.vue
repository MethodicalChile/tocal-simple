<script setup>
import { nextTick, ref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroVideo from './components/HeroVideo.vue'
import Mandantes from './components/Mandantes.vue'
import MapaObras from './components/MapaObras.vue'
import Portafolio from './components/Portafolio.vue'
import Especialidades from './components/Especialidades.vue'
import Empresa from './components/Empresa.vue'
import Contacto from './components/Contacto.vue'
import SiteFooter from './components/SiteFooter.vue'
import ObraModal from './components/ObraModal.vue'

const sector = ref('todas')
const fichaId = ref(null)
const modal = ref({ obra: null, inicio: 0 })

const abrir = (obra, inicio = 0) => { modal.value = { obra, inicio } }

// desde el hero: lleva a la ficha de la obra que estaba en pantalla
async function verFicha(id) {
  fichaId.value = id
  await nextTick()
  document.getElementById('fichas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <SiteHeader />
  <main>
    <HeroVideo @ver-obra="verFicha" />
    <Mandantes />
    <MapaObras v-model:sector="sector" @abrir="abrir" />
    <Portafolio v-model:actual="fichaId" @ampliar="abrir" />
    <Especialidades @filtrar="sector = $event" />
    <Empresa />
    <Contacto />
  </main>
  <SiteFooter />
  <ObraModal :obra="modal.obra" :inicio="modal.inicio" @cerrar="modal = { obra: null, inicio: 0 }" />
</template>
