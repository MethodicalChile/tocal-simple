<script setup>
defineProps({ company: Object })
</script>

<template>
  <section id="contacto" class="contact-section">
    <div class="container contact-grid">
      <div>
        <p class="eyebrow light">Construyamos juntos</p>
        <h2>Conversemos sobre tu próximo proyecto.</h2>
      </div>
      <div class="contact-card">
        <p>Cuéntanos qué necesitas y coordinemos una conversación con nuestro equipo.</p>
        <a class="contact-link" :href="`mailto:${company.email}`">{{ company.email }}</a>
        <a class="contact-link" :href="`tel:${company.phone.replace(/\s/g, '')}`">{{ company.phone }}</a>
        <div class="locations">
          <span v-for="location in company.locations" :key="location">{{ location }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section { background: var(--accent); padding: 110px 0; }
.contact-grid { display:grid; grid-template-columns: 1.15fr .85fr; gap:100px; align-items:start; }
.contact-grid h2 { max-width: 760px; }
.contact-card { padding-top: 42px; }
.contact-card > p { max-width:450px; line-height:1.7; margin:0 0 28px; }
.contact-link { display:block; font-family:'Manrope'; font-size:clamp(24px,3vw,38px); font-weight:700; letter-spacing:-.03em; margin-bottom:12px; }
.locations { display:flex; flex-direction:column; gap:7px; margin-top:30px; font-size:13px; }

@media (max-width: 900px) {
  .contact-grid { grid-template-columns:1fr; gap:38px; }
  .contact-card { padding-top:0; }
}
</style>
