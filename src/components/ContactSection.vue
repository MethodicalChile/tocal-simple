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
