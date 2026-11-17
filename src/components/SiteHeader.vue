<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from '../i18n'
import { siteConfig } from '../config/site'
import { withBase } from '../utils/assets'

defineProps({
  activeSection: {
    type: String,
    default: 'inicio',
  },
})

const { language, setLanguage, t } = useI18n()
const menuOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
  { id: 'inicio', href: '#inicio', labelKey: 'nav.home' },
  { id: 'quienes-somos', href: '#quienes-somos', labelKey: 'nav.about' },
  { id: 'servicios', href: '#servicios', labelKey: 'nav.services' },
  { id: 'proyectos', href: '#proyectos', labelKey: 'nav.projects' },
  { id: 'equipo', href: '#equipo', labelKey: 'nav.team' },
  { id: 'contacto', href: '#contacto', labelKey: 'nav.contact', isCta: true },
]

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function selectLanguage(lang) {
  setLanguage(lang)
}

function onScroll() {
  isScrolled.value = window.scrollY > 24
}

function onKeydown(event) {
  if (event.key === 'Escape' && menuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header :class="['site-header', { 'site-header--scrolled': isScrolled, 'site-header--open': menuOpen }]">
    <div class="container header-inner">
      <a class="brand" href="#inicio" :aria-label="t('nav.brandAria')" @click="closeMenu">
        <img
          :src="withBase(siteConfig.logos.light)"
          :alt="siteConfig.name"
          class="brand-image"
          width="112"
          height="50"
        />
      </a>

      <nav
        id="primary-navigation"
        :class="['nav', { 'nav--open': menuOpen }]"
        :aria-label="t('nav.mainNavAria')"
      >
        <ul class="nav-list">
          <li v-for="item in navItems" :key="item.id" class="nav-item">
            <a
              :href="item.href"
              :class="[
                'nav-link',
                {
                  'nav-link--active': activeSection === item.id && !item.isCta,
                  'nav-link--cta': item.isCta,
                  'nav-link--cta-active': item.isCta && activeSection === item.id,
                },
              ]"
              :aria-current="activeSection === item.id ? 'location' : undefined"
              @click="closeMenu"
            >
              {{ t(item.labelKey) }}
            </a>
          </li>
        </ul>

        <div class="lang-switcher" role="group" :aria-label="t('nav.languageSelectorAria')">
          <button
            type="button"
            :class="['lang-btn', { 'lang-btn--active': language === 'es' }]"
            :aria-label="t('nav.switchToEs')"
            :aria-pressed="language === 'es' ? 'true' : 'false'"
            @click="selectLanguage('es')"
          >
            ES
          </button>
          <span class="lang-divider" aria-hidden="true">/</span>
          <button
            type="button"
            :class="['lang-btn', { 'lang-btn--active': language === 'en' }]"
            :aria-label="t('nav.switchToEn')"
            :aria-pressed="language === 'en' ? 'true' : 'false'"
            @click="selectLanguage('en')"
          >
            EN
          </button>
        </div>
      </nav>

      <div class="header-mobile-controls">
        <div class="lang-switcher lang-switcher--mobile" role="group" :aria-label="t('nav.languageSelectorAria')">
          <button
            type="button"
            :class="['lang-btn', { 'lang-btn--active': language === 'es' }]"
            :aria-label="t('nav.switchToEs')"
            :aria-pressed="language === 'es' ? 'true' : 'false'"
            @click="selectLanguage('es')"
          >
            ES
          </button>
          <button
            type="button"
            :class="['lang-btn', { 'lang-btn--active': language === 'en' }]"
            :aria-label="t('nav.switchToEn')"
            :aria-pressed="language === 'en' ? 'true' : 'false'"
            @click="selectLanguage('en')"
          >
            EN
          </button>
        </div>

        <button
          type="button"
          :class="['menu-button', { 'menu-button--open': menuOpen }]"
          :aria-label="menuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          aria-controls="primary-navigation"
          @click="toggleMenu"
        >
          <span class="menu-button__bar"></span>
          <span class="menu-button__bar"></span>
          <span class="menu-button__bar"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  height: var(--header-h);
  z-index: 200;
  color: var(--white);
  background: rgba(11, 16, 24, 0.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}

.site-header--scrolled {
  background: rgba(11, 16, 24, 0.97);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.28);
}

.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  z-index: 202;
  flex-shrink: 0;
}

.brand-image {
  height: 48px;
  width: auto;
}

.nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 8px 2px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.82);
  transition: color 0.2s ease;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link--active {
  color: var(--white);
}

.nav-link--active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--accent);
}

.nav-link--cta {
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.45);
  color: var(--white);
  font-weight: 600;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.nav-link--cta:hover,
.nav-link--cta-active {
  background: var(--accent);
  border-color: var(--accent);
  color: #111827;
}

.lang-switcher {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.lang-btn {
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.65);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 4px 7px;
  border-radius: 3px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.lang-btn:hover {
  color: var(--white);
}

.lang-btn--active {
  background: var(--accent);
  color: #111827;
}

.lang-divider {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
}

.header-mobile-controls {
  display: none;
  align-items: center;
  gap: 10px;
  z-index: 202;
}

.menu-button {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.06);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0;
}

.menu-button__bar {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--white);
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.menu-button--open .menu-button__bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-button--open .menu-button__bar:nth-child(2) {
  opacity: 0;
}

.menu-button--open .menu-button__bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 1020px) {
  .header-mobile-controls {
    display: flex;
  }

  .nav {
    position: fixed;
    top: var(--header-h);
    left: 0;
    right: 0;
    height: calc(100dvh - var(--header-h));
    background: #0d131c;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: 28px 24px 40px;
    gap: 28px;
    overflow-y: auto;
    transform: translateX(100%);
    visibility: hidden;
    transition: transform 0.28s ease, visibility 0.28s ease;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav--open {
    transform: translateX(0);
    visibility: visible;
  }

  .nav-list {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }

  .nav-link {
    font-size: 20px;
    font-weight: 600;
    padding: 14px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .nav-link--active::after {
    display: none;
  }

  .nav-link--active {
    color: var(--accent);
  }

  .nav-link--cta {
    margin-top: 12px;
    justify-content: center;
    background: var(--accent);
    border-color: var(--accent);
    color: #111827;
    font-size: 16px;
  }

  .nav > .lang-switcher {
    display: none;
  }
}
</style>
