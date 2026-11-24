<script setup>
defineProps({ company: Object })
</script>

<template>
  <section id="contacto" class="contact-section">
    <div class="container">
      <div class="contact-grid">
        <div>
          <p class="eyebrow light">Construyamos juntos · Contacto directo</p>
          <h2>Conversemos sobre tu próximo proyecto.</h2>
          <p class="contact-lead">
            Coordinemos una reunión técnica con nuestro equipo directivo y de operaciones en
            Santiago o Linares.
          </p>

          <div class="contact-actions">
            <a
              class="contact-cta-btn contact-cta-btn--dark"
              :href="`mailto:${company.email}?subject=Consulta%20Proyecto%20Constructora%20TOCAL`"
            >
              Escribir a {{ company.email }}
            </a>
            <a
              class="contact-cta-btn contact-cta-btn--light"
              :href="`https://wa.me/${company.whatsappNumber}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp {{ company.whatsappDisplay }}
            </a>
          </div>
        </div>

        <div class="contact-card">
          <a class="contact-link" :href="`mailto:${company.email}`">{{ company.email }}</a>
          <a class="contact-link contact-link--sub" :href="`tel:${company.offices?.[0]?.telHref}`">
            {{ company.phone }}
          </a>

          <div class="offices-grid">
            <div v-for="office in company.offices" :key="office.city" class="office-box">
              <strong>Oficina {{ office.city }}</strong>
              <span>{{ office.address }}</span>
              <a :href="`tel:${office.telHref}`">Tel: {{ office.phone }}</a>
            </div>
          </div>

          <div class="leadership-block">
            <span class="leadership-title">Dirección Ejecutiva</span>
            <div class="leadership-grid">
              <div v-for="leader in company.leadership" :key="leader.email" class="leader-item">
                <strong>{{ leader.name }}</strong>
                <span>{{ leader.role }}</span>
                <a :href="`tel:${leader.telHref}`">{{ leader.phone }}</a>
                <a :href="`mailto:${leader.email}`">{{ leader.email }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section { background: var(--accent); padding: 110px 0; color: var(--fg); }
.contact-grid {
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 72px;
  align-items: start;
}
.contact-grid h2 { max-width: 680px; margin-bottom: 20px; }
.contact-lead {
  max-width: 480px;
  font-size: 17px;
  line-height: 1.68;
  margin: 0 0 32px;
}
.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.contact-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 22px;
  font-size: 14px;
  font-weight: 700;
}
.contact-cta-btn--dark {
  background: var(--dark);
  color: var(--white);
}
.contact-cta-btn--light {
  background: rgba(255,255,255,.92);
  color: var(--fg);
}
.contact-card {
  padding-top: 12px;
}
.contact-link {
  display: block;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(24px, 2.8vw, 36px);
  font-weight: 800;
  letter-spacing: -.03em;
  margin-bottom: 8px;
}
.contact-link--sub {
  font-size: clamp(18px, 2vw, 24px);
  margin-bottom: 28px;
  opacity: .88;
}
.offices-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 24px 0;
  border-top: 1px solid rgba(26, 26, 26, 0.22);
  border-bottom: 1px solid rgba(26, 26, 26, 0.22);
}
.office-box {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 13px;
  line-height: 1.5;
}
.office-box strong {
  font-size: 15px;
  font-weight: 800;
}
.office-box a {
  font-weight: 700;
}
.leadership-block {
  margin-top: 24px;
}
.leadership-title {
  display: block;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .12em;
  margin-bottom: 14px;
}
.leadership-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.leader-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 13px;
}
.leader-item strong {
  font-size: 15px;
  font-weight: 800;
}
.leader-item a {
  font-weight: 600;
}

@media (max-width: 960px) {
  .contact-grid { grid-template-columns: 1fr; gap: 38px; }
  .contact-card { padding-top: 0; }
}
@media (max-width: 560px) {
  .offices-grid,
  .leadership-grid { grid-template-columns: 1fr; }
}
</style>
