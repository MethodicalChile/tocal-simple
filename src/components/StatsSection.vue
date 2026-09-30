<script setup>
defineProps({ stats: Array })
</script>

<template>
  <section class="stats-section">
    <div class="container stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-item">
        <strong>{{ stat.value }}</strong>
        <span>{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>
