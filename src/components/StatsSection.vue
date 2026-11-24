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

<style scoped>
.stats-section {
  background: var(--canvas-2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.stats-grid { display:grid; grid-template-columns: repeat(4,1fr); }
.stat-item { padding: 42px 28px; border-right:1px solid var(--border); }
.stat-item:first-child { padding-left: 0; }
.stat-item:last-child { border-right: 0; }
.stat-item strong {
  display:block;
  font-family:'Manrope', sans-serif;
  font-size: clamp(32px,3.6vw,48px);
  letter-spacing:-.04em;
  color: var(--fg);
}
.stat-item span { display:block; margin-top:10px; color:var(--fg-2); font-size:13px; font-weight: 500; }

@media (max-width: 900px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .stat-item { border-bottom:1px solid var(--border); padding: 32px 20px; }
}
@media (max-width: 560px) {
  .stats-grid { grid-template-columns:1fr; }
  .stat-item { border-right:0; padding-left:0; }
}
</style>
