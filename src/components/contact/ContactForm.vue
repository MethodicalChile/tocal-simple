<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { useI18n } from '../../i18n'
import { siteConfig, getMailtoUrl, getWhatsappUrl } from '../../config/site'

const props = defineProps({
  initialSubject: {
    type: String,
    default: '',
  },
  initialArea: {
    type: String,
    default: 'general',
  },
})

const { language, t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  area: props.initialArea || 'general',
  subject: props.initialSubject || '',
  message: '',
  website: '', // Campo honeypot anti-bots (debe permanecer vacío)
})

const touched = reactive({
  name: false,
  email: false,
  subject: false,
  message: false,
})

const submittedOnce = ref(false)
const preparedMailtoHref = ref('')
const isSubmitting = ref(false)
const endpointSuccess = ref(false)
const clipboardCopied = ref(false)

watch(
  () => props.initialSubject,
  (newSubject) => {
    if (newSubject) {
      form.subject = newSubject
      preparedMailtoHref.value = ''
    }
  }
)

watch(
  () => props.initialArea,
  (newArea) => {
    if (newArea) {
      form.area = newArea
      preparedMailtoHref.value = ''
    }
  }
)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const errors = computed(() => {
  const result = {}
  if (!form.name.trim()) {
    result.name = t('contact.form.errors.nameRequired')
  }
  if (!form.email.trim()) {
    result.email = t('contact.form.errors.emailRequired')
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    result.email = t('contact.form.errors.emailInvalid')
  }
  if (!form.subject.trim()) {
    result.subject = t('contact.form.errors.subjectRequired')
  }
  if (!form.message.trim()) {
    result.message = t('contact.form.errors.messageRequired')
  }
  return result
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

function shouldShowError(field) {
  return (touched[field] || submittedOnce.value) && Boolean(errors.value[field])
}

function markTouched(field) {
  touched[field] = true
  preparedMailtoHref.value = ''
}

function getSelectedAreaLabel() {
  if (form.area === 'general') return t('contact.form.areaGeneral')
  return t(`categories.${form.area}`)
}

function buildFormattedBody() {
  const header = t('contact.form.mailBodyTemplate.header')
  const nameLabel = t('contact.form.mailBodyTemplate.name')
  const emailLabel = t('contact.form.mailBodyTemplate.email')
  const phoneLabel = t('contact.form.mailBodyTemplate.phone')
  const notProvided = t('contact.form.mailBodyTemplate.notProvided')
  const areaLabel = t('contact.form.mailBodyTemplate.area')
  const subjectLabel = t('contact.form.mailBodyTemplate.subject')
  const messageLabel = t('contact.form.mailBodyTemplate.message')

  const bodyLines = [
    header,
    '----------------------------------------',
    `${nameLabel}: ${form.name.trim()}`,
    `${emailLabel}: ${form.email.trim()}`,
    `${phoneLabel}: ${form.phone.trim() || notProvided}`,
    `${areaLabel}: ${getSelectedAreaLabel()}`,
    `${subjectLabel}: ${form.subject.trim()}`,
    '',
    `${messageLabel}:`,
    form.message.trim(),
  ]

  return bodyLines.join('\n')
}

function buildMailtoLink() {
  return getMailtoUrl({
    subject: `[Web TOCAL] ${form.subject.trim()}`,
    body: buildFormattedBody(),
  })
}

function validateAllFields() {
  submittedOnce.value = true
  touched.name = true
  touched.email = true
  touched.subject = true
  touched.message = true
  return isValid.value
}

async function handleSubmit() {
  // Si el honeypot fue rellenado por un bot automatizado, abortar silenciosamente
  if (form.website && form.website.trim().length > 0) {
    return
  }

  if (!validateAllFields()) {
    preparedMailtoHref.value = ''
    endpointSuccess.value = false
    return
  }

  // Si existe un endpoint configurado en VITE_CONTACT_ENDPOINT, enviar vía HTTP POST
  if (siteConfig.contactEndpoint && typeof fetch === 'function') {
    isSubmitting.value = true
    endpointSuccess.value = false
    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          area: getSelectedAreaLabel(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      })
      if (response.ok) {
        endpointSuccess.value = true
        preparedMailtoHref.value = ''
        isSubmitting.value = false
        return
      }
    } catch {
      // Si el endpoint falla por red, continúa hacia el respaldo mailto:
    } finally {
      isSubmitting.value = false
    }
  }

  const mailtoUrl = buildMailtoLink()
  preparedMailtoHref.value = mailtoUrl

  if (typeof window !== 'undefined') {
    window.location.href = mailtoUrl
  }
}

async function copyMessageForWebmail() {
  const fullClip = `Para / To: ${siteConfig.email}\nAsunto / Subject: [Web TOCAL] ${form.subject.trim()}\n\n${buildFormattedBody()}`
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(fullClip)
    }
    clipboardCopied.value = true
    setTimeout(() => {
      clipboardCopied.value = false
    }, 3000)
  } catch {
    // Ignorar si el navegador restringe el portapapeles
  }
}

function handleSendViaWhatsapp() {
  if (!validateAllFields()) {
    return
  }
  const waUrl = getWhatsappUrl(language.value, buildFormattedBody())
  if (typeof window !== 'undefined') {
    window.open(waUrl, '_blank', 'noopener,noreferrer')
  }
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.area = 'general'
  form.subject = ''
  form.message = ''
  form.website = ''
  touched.name = false
  touched.email = false
  touched.subject = false
  touched.message = false
  submittedOnce.value = false
  preparedMailtoHref.value = ''
  endpointSuccess.value = false
  clipboardCopied.value = false
}
</script>

<template>
  <form class="contact-form" novalidate @submit.prevent="handleSubmit">
    <div class="contact-form__header">
      <h3>{{ t('contact.form.title') }}</h3>
      <p>{{ t('contact.form.subtitle', { email: siteConfig.email }) }}</p>
    </div>

    <div
      v-if="submittedOnce && !isValid"
      class="form-error-summary"
      role="alert"
      aria-live="assertive"
    >
      <strong>{{ t('contact.form.errors.summaryTitle') }}</strong>
      <ul>
        <li v-for="(errMsg, key) in errors" :key="key">{{ errMsg }}</li>
      </ul>
    </div>

    <div class="form-row form-row--two">
      <div class="form-field">
        <label for="contact-name">
          {{ t('contact.form.nameLabel') }} <span class="required-mark" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          required
          :placeholder="t('contact.form.namePlaceholder')"
          :aria-invalid="shouldShowError('name') ? 'true' : 'false'"
          :aria-describedby="shouldShowError('name') ? 'error-contact-name' : undefined"
          @blur="markTouched('name')"
          @input="preparedMailtoHref = ''"
        />
        <p v-if="shouldShowError('name')" id="error-contact-name" class="field-error" role="alert">
          {{ errors.name }}
        </p>
      </div>

      <div class="form-field">
        <label for="contact-email">
          {{ t('contact.form.emailLabel') }} <span class="required-mark" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          required
          :placeholder="t('contact.form.emailPlaceholder')"
          :aria-invalid="shouldShowError('email') ? 'true' : 'false'"
          :aria-describedby="shouldShowError('email') ? 'error-contact-email' : undefined"
          @blur="markTouched('email')"
          @input="preparedMailtoHref = ''"
        />
        <p v-if="shouldShowError('email')" id="error-contact-email" class="field-error" role="alert">
          {{ errors.email }}
        </p>
      </div>
    </div>

    <div class="form-row form-row--two">
      <div class="form-field">
        <label for="contact-phone">
          {{ t('contact.form.phoneLabel') }}
          <span class="optional-tag">({{ t('contact.form.optionalTag') }})</span>
        </label>
        <input
          id="contact-phone"
          v-model="form.phone"
          type="tel"
          name="phone"
          autocomplete="tel"
          :placeholder="t('contact.form.phonePlaceholder')"
          @input="preparedMailtoHref = ''"
        />
      </div>

      <div class="form-field">
        <label for="contact-area">
          {{ t('contact.form.areaLabel') }}
        </label>
        <select
          id="contact-area"
          v-model="form.area"
          name="area"
          @change="preparedMailtoHref = ''"
        >
          <option value="general">{{ t('contact.form.areaGeneral') }}</option>
          <option value="fuels">{{ t('categories.fuels') }}</option>
          <option value="industrial-plants">{{ t('categories.industrial-plants') }}</option>
          <option value="shopping-centers">{{ t('categories.shopping-centers') }}</option>
        </select>
      </div>
    </div>

    <div class="form-field">
      <label for="contact-subject">
        {{ t('contact.form.subjectLabel') }} <span class="required-mark" aria-hidden="true">*</span>
      </label>
      <input
        id="contact-subject"
        v-model="form.subject"
        type="text"
        name="subject"
        required
        :placeholder="t('contact.form.subjectPlaceholder')"
        :aria-invalid="shouldShowError('subject') ? 'true' : 'false'"
        :aria-describedby="shouldShowError('subject') ? 'error-contact-subject' : undefined"
        @blur="markTouched('subject')"
        @input="preparedMailtoHref = ''"
      />
      <p
        v-if="shouldShowError('subject')"
        id="error-contact-subject"
        class="field-error"
        role="alert"
      >
        {{ errors.subject }}
      </p>
    </div>

    <div class="form-field">
      <label for="contact-message">
        {{ t('contact.form.messageLabel') }} <span class="required-mark" aria-hidden="true">*</span>
      </label>
      <textarea
        id="contact-message"
        v-model="form.message"
        name="message"
        rows="5"
        required
        :placeholder="t('contact.form.messagePlaceholder')"
        :aria-invalid="shouldShowError('message') ? 'true' : 'false'"
        :aria-describedby="shouldShowError('message') ? 'error-contact-message' : undefined"
        @blur="markTouched('message')"
        @input="preparedMailtoHref = ''"
      ></textarea>
      <p
        v-if="shouldShowError('message')"
        id="error-contact-message"
        class="field-error"
        role="alert"
      >
        {{ errors.message }}
      </p>
    </div>

    <p class="form-disclaimer">{{ t('contact.form.mailtoDisclaimer', { email: siteConfig.email }) }}</p>

    <!-- Campo Honeypot anti-spam oculto para usuarios reales -->
    <div class="hp-field" aria-hidden="true">
      <label for="contact-website">Website</label>
      <input
        id="contact-website"
        v-model="form.website"
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
      />
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary form-submit-btn" :disabled="isSubmitting">
        {{
          isSubmitting
            ? t('contact.form.sendingBtn')
            : t('contact.form.submitButton', { email: siteConfig.email })
        }}
      </button>
      <button type="button" class="btn btn-whatsapp" @click="handleSendViaWhatsapp">
        {{ t('contact.form.whatsappSubmitButton') }}
      </button>
      <button type="button" class="btn btn-outline-dark" @click="resetForm">
        {{ t('contact.form.clearButton') }}
      </button>
    </div>

    <!-- Confirmación real cuando se configura VITE_CONTACT_ENDPOINT -->
    <div
      v-if="endpointSuccess"
      class="form-mailto-notice"
      role="status"
      aria-live="polite"
    >
      <h4>{{ t('contact.form.endpointSuccessTitle') }}</h4>
      <p>{{ t('contact.form.endpointSuccessText') }}</p>
    </div>

    <!-- Aviso explícito cuando se prepara el cliente de correo (con opción de copiado para Gmail/Webmail) -->
    <div
      v-if="preparedMailtoHref"
      class="form-mailto-notice"
      role="status"
      aria-live="polite"
    >
      <h4>{{ t('contact.form.mailtoReadyTitle') }}</h4>
      <p>{{ t('contact.form.mailtoReadyText', { email: siteConfig.email }) }}</p>
      <div class="form-mailto-notice__actions">
        <a :href="preparedMailtoHref" class="btn btn-outline-dark">
          {{ t('contact.form.mailtoDirectLink') }} →
        </a>
        <button type="button" class="btn btn-primary" @click="copyMessageForWebmail">
          {{
            clipboardCopied
              ? t('contact.form.copyMessageSuccess')
              : t('contact.form.copyMessageBtn')
          }}
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.contact-form {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 36px;
  box-shadow: var(--shadow-sm);
}

.contact-form__header {
  margin-bottom: 24px;
}

.contact-form__header h3 {
  font-size: 24px;
  margin: 0 0 8px;
}

.contact-form__header p {
  margin: 0;
  font-size: 14px;
  color: var(--fg-2);
}

.form-error-summary {
  background: var(--error-bg);
  border: 1px solid rgba(185, 28, 28, 0.35);
  border-left: 4px solid var(--error);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  margin-bottom: 22px;
  color: var(--error);
  font-size: 13px;
}

.form-error-summary strong {
  display: block;
  margin-bottom: 6px;
}

.form-error-summary ul {
  margin: 0;
  padding-left: 18px;
}

.form-row--two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

.form-field label {
  font-size: 13px;
  font-weight: 700;
  color: var(--fg);
  margin-bottom: 7px;
}

.required-mark {
  color: var(--accent);
}

.optional-tag {
  font-weight: 500;
  color: var(--fg-muted);
  font-size: 12px;
}

.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--canvas);
  color: var(--fg);
  font-size: 14px;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  background: var(--surface);
  border-color: var(--accent);
}

.form-field input[aria-invalid='true'],
.form-field textarea[aria-invalid='true'] {
  border-color: var(--error);
  background: var(--error-bg);
}

.field-error {
  margin: 6px 0 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--error);
}

.form-disclaimer {
  margin: 4px 0 20px;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  background: var(--canvas);
  font-size: 12px;
  line-height: 1.55;
  color: var(--fg-2);
}

.hp-field {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.form-mailto-notice__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.form-mailto-notice {
  margin-top: 22px;
  padding: 18px;
  border-radius: var(--radius-md);
  background: var(--canvas);
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
}

.form-mailto-notice h4 {
  margin: 0 0 6px;
  font-size: 16px;
}

.form-mailto-notice p {
  margin: 0 0 14px;
  font-size: 13px;
  color: var(--fg-2);
}

@media (max-width: 680px) {
  .contact-form {
    padding: 22px 18px;
  }
  .form-row--two {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
