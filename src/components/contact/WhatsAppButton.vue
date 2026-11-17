<script setup>
import { computed } from 'vue'
import { useI18n } from '../../i18n'
import { siteConfig, getWhatsappUrl } from '../../config/site'

const { language, t } = useI18n()

const whatsappUrl = computed(() => getWhatsappUrl(language.value))
</script>

<template>
  <a
    :href="whatsappUrl"
    class="whatsapp-float"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="t('whatsappFloat.ariaLabel', { phone: siteConfig.whatsappDisplay })"
    :title="t('whatsappFloat.tooltip')"
  >
    <svg
      class="whatsapp-float__icon"
      viewBox="0 0 32 32"
      width="28"
      height="28"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M16.004 3.2c-7.068 0-12.8 5.732-12.8 12.8 0 2.256.59 4.46 1.71 6.404L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.244 1.624h.006c7.068 0 12.8-5.732 12.8-12.8 0-3.42-1.332-6.636-3.75-9.054A12.716 12.716 0 0 0 16.004 3.2zm0 23.344h-.004a10.59 10.59 0 0 1-5.402-1.48l-.388-.23-3.892 1.02 1.038-3.794-.252-.402a10.586 10.586 0 0 1-1.636-5.658c0-5.868 4.774-10.642 10.644-10.642 2.842 0 5.514 1.108 7.524 3.118a10.574 10.574 0 0 1 3.116 7.526c0 5.87-4.778 10.542-10.748 10.542zm5.838-7.968c-.32-.16-1.894-.934-2.188-1.042-.292-.106-.506-.16-.72.16-.214.32-.826 1.042-1.014 1.254-.186.214-.374.24-.694.08-.32-.16-1.352-.498-2.574-1.588-.952-.848-1.594-1.898-1.78-2.218-.186-.32-.02-.492.14-.652.144-.144.32-.374.48-.56.16-.186.214-.32.32-.534.106-.214.054-.4-.026-.56-.08-.16-.72-1.734-.986-2.374-.26-.624-.524-.538-.72-.548l-.614-.01c-.214 0-.56.08-.854.4-.292.32-1.12 1.094-1.12 2.668s1.146 3.094 1.306 3.308c.16.214 2.256 3.444 5.466 4.83.764.33 1.36.526 1.824.674.766.244 1.464.208 2.016.126.614-.092 1.894-.774 2.16-1.522.266-.746.266-1.386.186-1.522-.08-.132-.292-.212-.612-.372z"
      />
    </svg>
  </a>
</template>

<style scoped>
.whatsapp-float {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 500;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--whatsapp);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.32);
  border: 2px solid rgba(255, 255, 255, 0.85);
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
}

.whatsapp-float:hover {
  background: var(--whatsapp-hover);
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
}

.whatsapp-float__icon {
  width: 30px;
  height: 30px;
}

@media (max-width: 560px) {
  .whatsapp-float {
    right: 16px;
    bottom: 16px;
    width: 54px;
    height: 54px;
  }
}
</style>
