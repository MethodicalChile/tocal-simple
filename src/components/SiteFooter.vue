<script setup>
import { computed } from 'vue'
import { useI18n } from '../i18n'
import { siteConfig, getWhatsappUrl } from '../config/site'
import { withBase } from '../utils/assets'

defineProps({
  services: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['filterByCategory'])
const { language, t, localize } = useI18n()

const currentYear = new Date().getFullYear()
const whatsappUrl = computed(() => getWhatsappUrl(language.value))
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Columna 1: Identidad corporativa -->
        <div class="footer-brand-col">
          <a href="#inicio" class="footer-logo-link" :aria-label="t('nav.brandAria')">
            <img
              :src="withBase(siteConfig.logos.light)"
              :alt="siteConfig.name"
              class="footer-logo"
              width="104"
              height="46"
            />
          </a>
          <p class="footer-desc">{{ t('footer.description') }}</p>
        </div>

        <!-- Columna 2: Enlaces a las secciones -->
        <div class="footer-links-col">
          <h3 class="footer-heading">{{ t('footer.navigationTitle') }}</h3>
          <ul class="footer-list">
            <li><a href="#inicio">{{ t('nav.home') }}</a></li>
            <li><a href="#quienes-somos">{{ t('nav.about') }}</a></li>
            <li><a href="#servicios">{{ t('nav.services') }}</a></li>
            <li><a href="#proyectos">{{ t('nav.projects') }}</a></li>
            <li><a href="#equipo">{{ t('nav.team') }}</a></li>
            <li><a href="#contacto">{{ t('nav.contact') }}</a></li>
          </ul>
        </div>

        <!-- Columna 3: Áreas de especialización -->
        <div class="footer-links-col">
          <h3 class="footer-heading">{{ t('footer.specialtiesTitle') }}</h3>
          <ul class="footer-list">
            <li v-for="srv in services" :key="srv.id">
              <a
                href="#proyectos"
                @click="emit('filterByCategory', srv.id)"
              >
                {{ localize(srv.title) }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Columna 4: Contacto directo -->
        <div class="footer-contact-col">
          <h3 class="footer-heading">{{ t('footer.contactTitle') }}</h3>
          <ul class="footer-contact-list">
            <li>
              <span class="footer-contact-label">{{ t('contact.emailLabel') }}</span>
              <a :href="`mailto:${siteConfig.email}`" class="footer-contact-link">
                {{ siteConfig.email }}
              </a>
            </li>
            <li>
              <span class="footer-contact-label">WhatsApp</span>
              <a
                :href="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-contact-link"
              >
                {{ siteConfig.whatsappDisplay }}
              </a>
            </li>
            <li v-if="siteConfig.officePhone">
              <span class="footer-contact-label">{{ t('contact.officePhoneLabel') }}</span>
              <a
                :href="`tel:${siteConfig.officePhone.replace(/\s+/g, '')}`"
                class="footer-contact-link"
              >
                {{ siteConfig.officePhone }}
              </a>
            </li>
            <li v-if="siteConfig.address">
              <span class="footer-contact-label">{{ t('contact.addressLabel') }}</span>
              <span class="footer-contact-text">{{ siteConfig.address }}</span>
            </li>
            <li v-if="siteConfig.linkedinUrl">
              <span class="footer-contact-label">LinkedIn</span>
              <a
                :href="siteConfig.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-contact-link"
              >
                TOCAL LinkedIn ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          © {{ currentYear }} {{ siteConfig.legalName }} ({{ siteConfig.name }}).
          {{ t('footer.rightsReserved') }}
        </p>
        <a href="#inicio" class="footer-top-link">{{ t('footer.backToTop') }}</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--dark-1);
  color: rgba(255, 255, 255, 0.72);
  padding: 72px 0 36px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 0.9fr 1.1fr;
  gap: 40px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-logo-link {
  display: inline-block;
  margin-bottom: 16px;
}

.footer-logo {
  height: 46px;
  width: auto;
}

.footer-desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  max-width: 340px;
  color: rgba(255, 255, 255, 0.65);
}

.footer-heading {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--white);
  margin: 0 0 18px;
}

.footer-list,
.footer-contact-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-list a {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s ease;
}

.footer-list a:hover {
  color: var(--accent);
}

.footer-contact-list li {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.footer-contact-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.45);
}

.footer-contact-link {
  font-size: 15px;
  font-weight: 700;
  color: var(--white);
  transition: color 0.2s ease;
}

.footer-contact-link:hover {
  color: var(--accent);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 28px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
}

.footer-bottom p {
  margin: 0;
}

.footer-top-link {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.82);
  padding-right: 68px; /* Evita superposición con el botón flotante de WhatsApp */
}

.footer-top-link:hover {
  color: var(--accent);
}

@media (max-width: 960px) {
  .footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
  }
}

@media (max-width: 560px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 48px;
  }
  .footer-top-link {
    padding-right: 0;
  }
}
</style>
