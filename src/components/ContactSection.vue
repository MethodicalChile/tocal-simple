<script setup>
import { computed } from 'vue'
import { useI18n } from '../i18n'
import { siteConfig, getWhatsappUrl } from '../config/site'
import ContactForm from './contact/ContactForm.vue'

defineProps({
  services: {
    type: Array,
    default: () => [],
  },
  initialSubject: {
    type: String,
    default: '',
  },
  initialArea: {
    type: String,
    default: 'general',
  },
})

const { language, t, localize } = useI18n()

const whatsappUrl = computed(() => getWhatsappUrl(language.value))
</script>

<template>
  <section id="contacto" class="section contact-section">
    <div class="container">
      <div class="section-header">
        <div>
          <p class="eyebrow">{{ t('contact.eyebrow') }}</p>
          <h2>{{ t('contact.title') }}</h2>
        </div>
        <p class="section-subtitle">{{ t('contact.subtitle') }}</p>
      </div>

      <div class="contact-layout">
        <!-- Columna de canales directos -->
        <div class="contact-channels">
          <h3 class="contact-channels__heading">{{ t('contact.directChannelsTitle') }}</h3>

          <!-- Tarjeta de Correo Corporativo -->
          <div class="channel-card">
            <span class="channel-card__label">{{ t('contact.emailLabel') }}</span>
            <a :href="`mailto:${siteConfig.email}`" class="channel-card__primary-link">
              {{ siteConfig.email }}
            </a>
            <span class="channel-card__hint">{{ t('contact.emailHint') }}</span>
          </div>

          <!-- Tarjeta de WhatsApp -->
          <div class="channel-card channel-card--whatsapp">
            <span class="channel-card__label">{{ t('contact.whatsappLabel') }}</span>
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="channel-card__primary-link"
            >
              {{ siteConfig.whatsappDisplay }}
            </a>
            <span class="channel-card__hint">{{ t('contact.whatsappHint') }}</span>
            <div class="channel-card__cta-wrap">
              <a
                :href="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-whatsapp"
              >
                {{ t('contact.whatsappAction') }} →
              </a>
            </div>
          </div>

          <!-- Oficinas Santiago y Linares -->
          <div v-if="siteConfig.offices?.length" class="channel-card">
            <span class="channel-card__label">{{ t('contact.officesTitle') }}</span>
            <div class="office-branches">
              <div
                v-for="office in siteConfig.offices"
                :key="office.id"
                class="office-branch"
              >
                <strong class="office-branch__city">{{ office.city }}</strong>
                <p class="office-branch__address">{{ office.address }}</p>
                <a :href="`tel:${office.telHref}`" class="office-branch__phone">
                  📞 {{ office.phone }}
                </a>
              </div>
            </div>
          </div>

          <!-- Áreas de especialidad -->
          <div v-if="services.length" class="contact-specialties-box">
            <h4>{{ t('contact.specialtyAreasTitle') }}</h4>
            <ul>
              <li v-for="srv in services" :key="srv.id">
                <span class="dot" aria-hidden="true"></span>
                <span>{{ localize(srv.title) }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Columna del Formulario -->
        <div class="contact-form-col">
          <ContactForm :initial-subject="initialSubject" :initial-area="initialArea" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: var(--canvas-alt);
  border-top: 1px solid var(--border);
}

.contact-layout {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 40px;
  align-items: start;
}

.contact-channels {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-channels__heading {
  font-size: 20px;
  margin: 0 0 4px;
}

.channel-card {
  background: var(--dark-2);
  color: var(--white);
  border-radius: var(--radius-md);
  padding: 26px;
  border-left: 4px solid var(--accent);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.channel-card--whatsapp {
  border-left-color: var(--whatsapp);
}

.channel-card__label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.65);
}

.channel-card__primary-link {
  font-family: var(--font-display);
  font-size: clamp(20px, 2.4vw, 26px);
  font-weight: 800;
  color: var(--white);
  word-break: break-word;
  transition: color 0.2s ease;
}

.channel-card__primary-link:hover {
  color: var(--accent);
}

.channel-card--whatsapp .channel-card__primary-link:hover {
  color: var(--whatsapp);
}

.channel-card__hint {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
}

.channel-card__cta-wrap {
  margin-top: 10px;
}

.office-branches {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 6px;
}

.office-branch {
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.office-branch:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.office-branch__city {
  display: block;
  font-size: 15px;
  color: var(--accent);
  margin-bottom: 3px;
}

.office-branch__address {
  margin: 0 0 4px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.84);
}

.office-branch__phone {
  font-size: 13px;
  font-weight: 700;
  color: var(--white);
}

.office-branch__phone:hover {
  color: var(--accent);
}

.contact-specialties-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 24px;
}

.contact-specialties-box h4 {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--fg-muted);
  margin: 0 0 14px;
}

.contact-specialties-box ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-specialties-box li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--fg);
}

.contact-specialties-box .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
}

@media (max-width: 960px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
