<script setup>
import { useI18n } from '../i18n'
import { siteConfig } from '../config/site'
import TeamCard from './team/TeamCard.vue'

defineProps({
  members: {
    type: Array,
    required: true,
  },
})

const { t } = useI18n()
</script>

<template>
  <section id="equipo" class="section team-section">
    <div class="container">
      <div class="section-header">
        <div>
          <p class="eyebrow">{{ t('team.eyebrow') }}</p>
          <h2>{{ t('team.title') }}</h2>
        </div>
        <p class="section-subtitle">{{ t('team.subtitle') }}</p>
      </div>

      <div v-if="siteConfig.showProvisionalBadges" class="team-provisional-banner" role="note">
        <span class="provisional-pill">{{ t('team.provisionalBadge') }}</span>
        <p>{{ t('team.provisionalBanner') }}</p>
      </div>

      <div class="team-grid">
        <TeamCard
          v-for="member in members"
          :key="member.id"
          :member="member"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  background: var(--canvas);
}

.team-provisional-banner {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  margin-bottom: 36px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius-sm);
}

.team-provisional-banner p {
  margin: 0;
  font-size: 13px;
  color: var(--fg-2);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
}

@media (max-width: 960px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .team-provisional-banner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
