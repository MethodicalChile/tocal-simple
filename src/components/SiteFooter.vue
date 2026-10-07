<script setup>
defineProps({ company: Object })
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">TOCAL</div>
      <p>{{ company.legalName }} · {{ company.founded }} — {{ new Date().getFullYear() }}</p>
      <a href="#inicio">Volver arriba ↑</a>
    </div>
  </footer>
</template>

<style scoped>
.footer { background:#0b1018; color:rgba(255,255,255,.62); padding:30px 0; }
.footer-inner { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:30px; font-size:12px; }
.footer-brand { color:white; font-weight:800; letter-spacing:.08em; }
.footer p { margin:0; text-align:center; }
.footer a { text-align:right; }

@media (max-width: 900px) {
  .footer-inner { grid-template-columns:1fr; text-align:left; }
  .footer p, .footer a { text-align:left; }
}
</style>
