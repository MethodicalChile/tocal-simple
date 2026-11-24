<script setup>
import { withBase, handleImageError } from '../utils/assets'

defineProps({ company: Object })
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <img
          :src="withBase('/images/logo-tocal-blanco.png')"
          alt="Constructora TOCAL"
          class="footer-logo"
          @error="handleImageError"
        />
      </div>
      <p>
        {{ company.legalName }} · RUT {{ company.rut }} · Fundada en {{ company.founded }} —
        {{ new Date().getFullYear() }}
      </p>
      <a href="#inicio">Volver arriba ↑</a>
    </div>
  </footer>
</template>

<style scoped>
.footer { background:#0b1018; color:rgba(255,255,255,.68); padding:32px 0; }
.footer-inner {
  display:grid;
  grid-template-columns:1fr auto 1fr;
  align-items:center;
  gap:30px;
  font-size:12px;
}
.footer-logo {
  height: 32px;
  width: auto;
}
.footer p { margin:0; text-align:center; }
.footer a { text-align:right; font-weight: 700; color: var(--white); }

@media (max-width: 900px) {
  .footer-inner { grid-template-columns:1fr; text-align:left; gap: 16px; }
  .footer p, .footer a { text-align:left; }
}
</style>
