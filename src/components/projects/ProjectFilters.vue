<script setup>
import { useI18n } from '../../i18n'

defineProps({
  categories: {
    type: Array,
    required: true,
  },
  activeCategory: {
    type: String,
    required: true,
  },
  counts: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['change'])
const { t } = useI18n()
</script>

<template>
  <div class="project-filters" role="group" :aria-label="t('projects.filterAria')">
    <button
      v-for="cat in categories"
      :key="cat"
      type="button"
      :class="['filter-btn', { 'filter-btn--active': activeCategory === cat }]"
      :aria-pressed="activeCategory === cat ? 'true' : 'false'"
      @click="emit('change', cat)"
    >
      <span>{{ t(`categories.${cat}`) }}</span>
      <span v-if="counts[cat] !== undefined" class="filter-btn__count">
        {{ counts[cat] }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.project-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 36px;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--fg-2);
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.filter-btn:hover {
  border-color: var(--fg);
  color: var(--fg);
}

.filter-btn--active {
  background: var(--dark-2);
  border-color: var(--dark-2);
  color: var(--white);
}

.filter-btn--active:hover {
  background: var(--dark-1);
  border-color: var(--dark-1);
  color: var(--white);
}

.filter-btn__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: var(--canvas);
  color: var(--fg-2);
}

.filter-btn--active .filter-btn__count {
  background: var(--accent);
  color: #111827;
}

@media (max-width: 560px) {
  .project-filters {
    gap: 8px;
  }
  .filter-btn {
    flex: 1 1 calc(50% - 8px);
    justify-content: space-between;
    padding: 10px 14px;
    font-size: 13px;
  }
}
</style>
