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
