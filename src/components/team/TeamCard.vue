<script setup>
import { useI18n } from '../../i18n'
import { siteConfig } from '../../config/site'
import { withBase, handleImageError } from '../../utils/assets'

defineProps({
  member: {
    type: Object,
    required: true,
  },
})

const { t, localize } = useI18n()
</script>

<template>
  <article class="team-card">
    <div class="team-card__media">
      <img
        :src="withBase(member.image)"
        :alt="localize(member.name)"
        class="team-card__image"
        loading="lazy"
        decoding="async"
        @error="handleImageError"
      />
      <span v-if="member.isProvisional && siteConfig.showProvisionalBadges" class="team-card__badge">
        {{ t('team.provisionalBadge') }}
      </span>
    </div>

    <div class="team-card__body">
      <p class="team-card__role">{{ localize(member.role) }}</p>
      <h3 class="team-card__name">{{ localize(member.name) }}</h3>
      <p v-if="localize(member.description)" class="team-card__desc">
        {{ localize(member.description) }}
      </p>

      <div v-if="member.email || member.phone" class="team-card__contact">
        <a
          v-if="member.email"
          :href="`mailto:${member.email}`"
          class="team-card__contact-link"
        >
          <span>✉</span>
          <span>{{ member.email }}</span>
        </a>
        <a
          v-if="member.phone"
          :href="`tel:${member.phone.replace(/\s+/g, '')}`"
          class="team-card__contact-link"
        >
          <span>📞</span>
          <span>{{ member.phone }}</span>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.team-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: grid;
  grid-template-columns: 200px 1fr;
  height: 100%;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.team-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-sm);
}

.team-card__media {
  position: relative;
  width: 100%;
  min-height: 240px;
  background: var(--dark-2);
  overflow: hidden;
}

.team-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-card__badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  padding: 4px 9px;
  border-radius: var(--radius-sm);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: rgba(11, 16, 24, 0.86);
  color: rgba(255, 255, 255, 0.9);
  border-left: 2px solid var(--accent);
}

.team-card__body {
  padding: 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.team-card__role {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.team-card__name {
  font-size: 22px;
  line-height: 1.25;
  margin: 0 0 10px;
  color: var(--fg);
}

.team-card__desc {
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--fg-2);
}

.team-card__contact {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.team-card__contact-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--fg);
  transition: color 0.2s ease;
}

.team-card__contact-link:hover {
  color: var(--accent);
}

@media (max-width: 640px) {
  .team-card {
    grid-template-columns: 1fr;
  }
  .team-card__media {
    aspect-ratio: 4 / 3;
    min-height: 0;
  }
}
</style>
