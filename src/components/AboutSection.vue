<template>
  <section id="empresa" class="section about">
    <div class="container split-grid">
      <div>
        <p class="eyebrow">Quiénes somos</p>
        <h2>Experiencia que se transforma en obra.</h2>
      </div>
      <div class="about-copy">
        <p>
          En Tocal abordamos cada proyecto con una mirada práctica, técnica y cercana. Coordinamos personas,
          planificación y ejecución para entregar soluciones constructivas confiables.
        </p>
        <p>
          Nuestro trabajo se apoya en cuatro pilares: seguridad, calidad, cumplimiento y capacidad de respuesta
          en terreno.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.split-grid { display:grid; grid-template-columns: 1.1fr .9fr; gap: 100px; align-items:start; }
.about-copy { font-size: 19px; line-height: 1.8; color: var(--fg-2); padding-top: 45px; }
.about-copy p { margin: 0 0 24px; }

@media (max-width: 900px) {
  .split-grid { grid-template-columns:1fr; gap:38px; }
  .about-copy { padding-top:0; }
}
</style>
