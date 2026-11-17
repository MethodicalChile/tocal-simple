# TOCAL — Sitio Web Corporativo (`tocal-simple`)

Sitio web corporativo bilingüe (Español / Inglés) de **TOCAL (Constructora Tocal Ltda.)**, empresa dedicada a proyectos de construcción, obras civiles e infraestructura con especialización en:

1. **Combustibles** (`fuels`)
2. **Plantas industriales** (`industrial-plants`)
3. **Centros comerciales** (`shopping-centers`)

---

## 1. Tecnologías utilizadas

- **Vue 3** (`<script setup>`, Composition API, `<Teleport>` para ventana modal accesible)
- **Vite** (compilación rápida para producción estática compatible con Cloudflare Pages y GitHub Pages)
- **CSS3 moderno con variables corporativas** (diseño responsive para escritorio, notebooks, tablets y celulares, soporte de `prefers-reduced-motion` y estados `:focus-visible`)
- **Sistema de internacionalización propio (`src/i18n/`)** sin dependencias externas pesadas, con persistencia en `localStorage` (`tocal_language`) y actualización dinámica de metadatos SEO
- **Pruebas automatizadas (`node:test` + `@vue/server-renderer`)** para verificar configuración, paridad de traducciones ES/EN, integridad de imágenes y renderizado de componentes

---

## 2. Instalación y ejecución local

### Requisitos previos
- **Node.js** 20+ (recomendado Node.js 22 LTS o superior)
- **npm**

### Instalar dependencias
```bash
npm install
```

### Servidor de desarrollo local
```bash
npm run dev
```

### Ejecutar pruebas automatizadas
```bash
npm test
```

### Compilar para producción
```bash
npm run build
```
El resultado estático optimizado se genera en el directorio `dist/`.

### Previsualizar el build de producción
```bash
npm run preview
```

---

## 3. Estructura del proyecto

```text
tocal-simple/
├── index.html                  # Documento HTML principal, metadatos SEO, Open Graph y favicon
├── vite.config.js              # Configuración de Vite (base '/' por defecto o VITE_BASE)
├── wrangler.jsonc              # Configuración para despliegue estático en Cloudflare Pages / Workers Assets
├── public/
│   └── images/
│       ├── logo-tocal-blanco.png
│       ├── logo-tocal.png
│       ├── logo-marca.png
│       ├── company/            # Fotografías institucionales y Hero principal (.webp)
│       ├── services/           # Fotografías representativas de cada área de servicio (.webp)
│       ├── projects/           # Subcarpetas por proyecto con portada y galería (.webp)
│       └── team/               # Fotografías de los integrantes del equipo (.webp)
├── src/
│   ├── main.js                 # Punto de entrada de la aplicación Vue
│   ├── App.vue                 # Composición de secciones, navegación activa y estado del modal
│   ├── styles.css              # Variables globales, tipografía, botones y utilidades responsive
│   ├── config/
│   │   └── site.js             # Configuración centralizada (correo, WhatsApp, logos, helpers)
│   ├── i18n/
│   │   ├── index.js            # Composable useI18n(), cambio de idioma y persistencia
│   │   └── translations.js     # Diccionario centralizado de textos de interfaz ES / EN
│   ├── utils/
│   │   └── assets.js           # Helper withBase() para resolver rutas de imágenes en cualquier hosting
│   ├── data/
│   │   ├── company.js          # Contenido institucional (Hero, Quiénes somos, Historia, Misión, Visión, Valores)
│   │   ├── services.js         # Catálogo extensible de áreas de especialización (ES/EN)
│   │   ├── projects.js         # Catálogo de proyectos con galerías para el carrusel (ES/EN)
│   │   ├── team.js             # Nómina de integrantes del equipo (ES/EN)
│   │   └── site.js             # Punto de reexportación central de datos y configuración
│   └── components/
│       ├── SiteHeader.vue      # Barra de navegación sticky, menú móvil y selector ES/EN
│       ├── HeroSection.vue     # Sección Inicio (Hero, áreas de especialización, proyectos destacados y CTA)
│       ├── AboutSection.vue    # Sección Quiénes somos (presentación, historia, misión, visión, valores)
│       ├── ServicesSection.vue # Sección Servicios con proyectos relacionados y filtro directo
│       ├── ProjectsSection.vue # Sección Proyectos con filtros por categoría y cuadrícula responsive
│       ├── TeamSection.vue     # Sección Nuestro equipo
│       ├── ContactSection.vue  # Sección Contacto con canales directos y formulario
│       ├── SiteFooter.vue      # Pie de página corporativo con año dinámico
│       ├── projects/
│       │   ├── ProjectCard.vue     # Tarjeta reutilizable de proyecto
│       │   ├── ProjectFilters.vue  # Barra de filtros por categoría
│       │   ├── ProjectModal.vue    # Ventana modal accesible con bloqueo de scroll y gestión de foco
│       │   └── ProjectCarousel.vue # Carrusel reutilizable de 1 imagen a la vez (teclado, swipe, contador)
│       ├── team/
│       │   └── TeamCard.vue        # Tarjeta individual de integrante del equipo
│       └── contact/
│           ├── ContactForm.vue     # Formulario con validaciones y apertura explícita de mailto:
│           └── WhatsAppButton.vue  # Botón flotante de WhatsApp con mensaje precargado según idioma
└── tests/
    └── verify-site.mjs         # Suite de pruebas automatizadas de datos, activos, i18n y componentes
```

---

## 4. Guía de mantenimiento de contenidos

Toda la información de la página está desacoplada de los componentes visuales. No es necesario editar archivos `.vue` para actualizar contenidos.

### 4.1 Cómo agregar proyectos e incorporar fotografías
1. Crea una carpeta para el proyecto dentro de `public/images/projects/<slug-del-proyecto>/`.
2. Guarda allí la imagen de portada (`cover.webp`) y las fotografías de la galería (`image-01.webp`, `image-02.webp`, etc.). Se recomienda formato `.webp`.
3. Abre [`src/data/projects.js`](./src/data/projects.js) y agrega un nuevo objeto al arreglo `projects`:
   ```js
   {
     id: 'project-007',
     slug: 'nuevo-proyecto',
     category: 'fuels', // 'fuels' | 'industrial-plants' | 'shopping-centers'
     featured: true,    // true para mostrar también en Proyectos Destacados del Inicio
     isDemo: false,     // Cambiar a false cuando sea un proyecto real confirmado
     title: {
       es: 'Nombre del Proyecto',
       en: 'Project Name',
     },
     shortDescription: {
       es: 'Resumen breve para la tarjeta.',
       en: 'Short summary for the card.',
     },
     description: {
       es: 'Descripción completa que se muestra en la ventana modal.',
       en: 'Full description displayed inside the modal dialog.',
     },
     workType: {
       es: 'Obras civiles y montaje', // Opcional (dejar en null si no aplica)
       en: 'Civil works and assembly',
     },
     location: 'Región del Maule, Chile', // Opcional (dejar en '' si no aplica)
     year: '2025',                        // Opcional (dejar en null si no aplica)
     coverImage: '/images/projects/nuevo-proyecto/cover.webp',
     images: [
       // Puedes usar rutas de texto simples:
       '/images/projects/nuevo-proyecto/image-01.webp',
       // O bien objetos con pie de foto (caption) opcional en ES y EN:
       {
         src: '/images/projects/nuevo-proyecto/image-02.webp',
         caption: {
           es: 'Montaje de estructura principal',
           en: 'Main structure assembly',
         },
       },
     ],
   }
   ```
   > **Nota:** Si `location`, `year` o `workType` se dejan vacíos (`""` o `null`), el modal oculta automáticamente la etiqueta correspondiente sin mostrar campos vacíos. Si el arreglo `images` tiene 1 sola fotografía, el carrusel oculta automáticamente las flechas de navegación. Además, antes de cada `npm run build` se ejecuta automáticamente `prebuild` (`npm test`) para verificar que todas las imágenes referenciadas existan en `public/images/` y que no falten traducciones.

### 4.2 Cómo agregar o actualizar integrantes del equipo
1. Guarda la fotografía del integrante en `public/images/team/` (se recomienda proporción vertical `4:5`, ej. `800x960 px` en formato `.webp`).
2. Edita [`src/data/team.js`](./src/data/team.js) y actualiza o agrega un objeto en el arreglo `team`:
   ```js
   {
     id: 'member-001',
     isProvisional: false, // Cambiar a false al cargar los datos reales
     name: {
       es: 'Nombre Apellido',
       en: 'Nombre Apellido',
     },
     role: {
       es: 'Gerente de Operaciones',
       en: 'Operations Manager',
     },
     description: {
       es: 'Breve reseña profesional opcional.',
       en: 'Optional short professional bio.',
     },
     image: '/images/team/member-001.webp',
   }
   ```

### 4.3 Cómo modificar los servicios o agregar nuevas áreas
Edita [`src/data/services.js`](./src/data/services.js). Cada elemento del arreglo `servicesData` define el identificador (`id`), número (`number`), imagen (`image`), títulos (`title.es` / `title.en`), descripción breve (`shortDescription`), descripción extendida (`description`) y listado de alcances (`highlights`).

### 4.4 Cómo cambiar el correo corporativo y el número de WhatsApp
Puedes actualizarlos mediante variables de entorno en `.env` (ver [`.env.example`](./.env.example)) o en el panel de **Cloudflare Pages**:
```env
VITE_CONTACT_EMAIL=constructora@tocal.cl
VITE_WHATSAPP_NUMBER=56963269747
VITE_WHATSAPP_DISPLAY="+56 9 6326 9747"
```
También puedes editar los valores predeterminados en [`src/config/site.js`](./src/config/site.js):
- **Correo corporativo:** `VITE_CONTACT_EMAIL` / `siteConfig.email` (actualmente `'constructora@tocal.cl'`). Actualiza automáticamente la sección Contacto, los llamados a la acción, el formulario y el Footer.
- **Número de WhatsApp:** `VITE_WHATSAPP_NUMBER` / `whatsappNumber` (formato internacional sin `+` ni espacios, actualmente `'56963269747'`) y `VITE_WHATSAPP_DISPLAY` / `siteConfig.whatsappDisplay` (actualmente `'+56 9 6326 9747'`).
- **Mensajes precargados de WhatsApp:** edita `whatsappMessages.es` y `whatsappMessages.en` en el mismo archivo [`src/config/site.js`](./src/config/site.js).

### 4.5 Cómo modificar los textos traducidos (Español / Inglés)
- **Textos de interfaz (menús, botones, títulos de sección, etiquetas de formulario, mensajes de validación y accesibilidad):** edita [`src/i18n/translations.js`](./src/i18n/translations.js).
- **Textos institucionales (Hero, Quiénes somos, Historia, Misión, Visión y Valores):** edita [`src/data/company.js`](./src/data/company.js).

---

## 5. Despliegue

### Cloudflare Pages / Workers Assets (Recomendado)
El repositorio incluye [`wrangler.jsonc`](./wrangler.jsonc) apuntando al directorio `./dist`.
- **Comando de compilación (Build command):** `npm run build`
- **Directorio de salida (Build output directory):** `dist`
- **Variables de entorno requeridas:** ninguna (por defecto `base` es `'/'`).

### GitHub Pages
El flujo de trabajo [`.github/workflows/static.yml`](./.github/workflows/static.yml) compila el proyecto definiendo `VITE_BASE: /tocal-simple/`, y todos los recursos estáticos se resuelven automáticamente mediante el helper `withBase()`.
