# Constructora Tocal — sitio web (propuesta QA)

Sitio corporativo de una página en Vue 3 + Vite, con un mapa 3D de Chile en horizontal que ubica las
obras de Tocal y se sincroniza con el listado de obras. Tipografía como en la propuesta 2: Manrope e Inter.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # sale en dist/
```

En GitHub Pages: `VITE_BASE=/<repo>/ npm run build`. Variables opcionales en `.env`:
`VITE_CONTACT_EMAIL`, `VITE_WHATSAPP_NUMBER`, `VITE_CONTACT_ENDPOINT` (POST JSON del formulario; si falta,
el formulario abre el correo con la solicitud escrita) y `VITE_SUPABASE_MEDIA_URL` (videos de dron).

## Dirección visual: "ficha técnica"

El sitio usa el lenguaje de los planos y letreros de obra, para no parecer una plantilla:

- La grilla se ve: reglas de 1 px separan secciones y datos. Bordes de 0 a 2 px, sin sombras ni degradados decorativos.
- Los datos van en fichas (etiqueta y valor) con cifras tabulares, no en tarjetas.
- El naranja del logo (`#e96a1e`) marca obras y líneas. Botones y texto usan sus versiones oscuras (`#c4531a`,
  `#a8461a`) para cumplir contraste AA.
- Movimiento solo en dos lugares: el montaje del hero y los vuelos del mapa.
- Textos con datos concretos: sin guiones largos, sin triadas, sin palabras vacías.

`node tools/revisar-texto.mjs` revisa `src/` contra esos patrones y termina en 1 si encuentra alguno.

## Medios

| Qué | Cómo se genera |
|---|---|
| Montaje del hero (`public/video/`) | `bash tools/video/montaje.sh`: 6 tomas de los vuelos en dron (Supabase), recortadas para quitar el logo y el texto que traen, con fundidos. Escribe `src/data/montaje.js` con qué obra está en pantalla en cada tramo |
| Fotos (`public/images/…@800.webp`, `@1600.webp`) | `uv run --python 3.12 --with pillow python tools/fotos/procesar.py`: lee `tools/fotos/originales/`, recorta portadas a 3:2, aplica una corrección común y escribe `src/data/fotos.json`. En el código se usan con `foto(ruta)` de `src/config.js` |
| Logos de mandantes | `tools/fotos/logos.py`: los iguala en peso visual dentro de celdas de 240×80 |

## Qué se tomó de cada propuesta

| De | Qué |
|---|---|
| `tocal-simple` (rama `main` remota) | Video de dron detrás del hero (`tucapel-retiro.mp4` en Supabase), las 22 obras con fotos, superficies, mandantes, oficinas y contactos |
| `tocal-simple-dev` | Ficha de obra en modal con galería, formulario con validación, estructura de datos separada de los componentes |
| Lámina de clientes (`clients.webp`) + Wikimedia Commons | Logos del carrusel de mandantes (`public/images/mandantes/`). Copec, Bosch Rexroth y Unimarc son SVG de Commons; el resto, recortes de la lámina |
| Registro interno de obras 2015–2026 | 18 obras más (sin fotos) para completar el mapa: solo nombre, mandante, rubro y años. **Sin montos** |

## Estructura

```
src/
  config.js              datos de empresa, contactos, especialidades, helper conBase()
  data/obras.js          catálogo de obras (40) con comuna y coordenadas
  lib/mapaObras.js       mapa de obras (MapLibre GL): relieve, satélite, grupos, vuelo a cada obra
  data/montaje.js        tramos del montaje del hero (lo genera tools/video/montaje.sh)
  data/fotos.json        tamaños de cada foto (lo genera tools/fotos/procesar.py)
  components/            SiteHeader, HeroVideo, Mandantes, MapaObras, Portafolio (fichas de obra), Especialidades,
                         Empresa, Contacto, SiteFooter, ObraModal
  styles/base.css        tokens (color, tipo) y base
public/
  mapa/                  máscara y borde de Chile (GeoJSON) y póster para navegadores sin WebGL
  images/                fotos de obras y empresa
tools/mapa-chile/        cómo se fabrica el modelo (ver abajo)
```

## El mapa de obras

`src/lib/mapaObras.js`, sobre [MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js) (BSD, sin claves de API):

- Chile horizontal: rumbo 90°, norte a la izquierda. Relieve 3D real (exageración 1,6×) y sombreado.
- Fondo "Mapa" (OpenFreeMap, estilo positron) o "Satélite" (Sentinel-2 cloudless 2016 de EOX, CC BY 4.0).
- Lo que no es Chile queda atenuado con una máscara (`public/mapa/chile-mascara.geojson`).
- Las obras se agrupan con un número y se separan al acercar; clic en una obra o en la lista vuela hasta ella
  y abre su ficha con el botón de fotos y video.
- Para no secuestrar el scroll de la página: Ctrl + rueda para acercar en escritorio, dos dedos en celular.
- Lista y mapa sincronizados: buscador, filtro por rubro, la obra bajo el cursor se marca en ambos lados.

`tools/mapa-chile/` fabrica los archivos de apoyo:

- `mascara.py` genera la máscara y el borde de Chile desde Natural Earth.
- `preparar.py` + `chile3d.py` (escena de **m3d / methomations** en Blender) generan el póster
  `public/mapa/chile-poster.webp`, que se muestra si el navegador no tiene WebGL.

```bash
uv run --python 3.12 --with shapely python tools/mapa-chile/mascara.py --ne <carpeta-ne> --out public/mapa
```

## Agregar una obra

Copiar un objeto en `src/data/obras.js` con `comuna`, `region`, `lat` y `lon` (centro de la comuna basta).
Si tiene fotos, crear `public/images/projects/<id>/cover.webp` e `image-01.webp`… y usar `...fotos('<id>', n)`.
Las obras de una misma comuna se agrupan solas en un marcador con número.

## Pendiente de validar con Tocal

- Logo de Tocal en vector (SVG o AI): hoy se usa el PNG de 200×200 de las otras propuestas.
- Fotos del equipo en terreno, testimonios con nombre y cargo, certificaciones (CChC, mutual) y, con permiso,
  una página del informe semanal con los datos del mandante tapados.
- Fotos de obras en alta resolución: 18 de las 87 actuales tienen menos de 1000 px de ancho.
- Logos de mandantes en buena resolución, sobre todo Enex/Shell, Tucapel y POCH (los recortes son chicos), y
  permiso para mostrarlos. Faltan Aramco, Copefrut y Avomex.

- Las 18 obras marcadas `validar: true` (vienen del registro interno de obras): nombre público, comuna y si se pueden mostrar.
- Obras del registro interno que quedaron fuera por no tener comuna clara: Accesos ES Monterilla (Copec),
  Planta Cenkiwi (Copefrut), ampliación Frutas Agrovic, Centro Comercial Don José (Calesa), Proyecto Verallia.
- Fotos y nombres de la gerencia, textos de principios y la cifra "+125.000 m²" (vienen de la propuesta anterior).

## Fuentes y repositorios usados

- [nvkelso/natural-earth-vector](https://github.com/nvkelso/natural-earth-vector): contorno y regiones (dominio público)
- [AWS Terrain Tiles / tilezen](https://registry.opendata.aws/terrain-tiles/): elevación Terrarium (SRTM, GMTED; atribución Mapzen)
- [maplibre/maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js): mapa 3D
- [OpenFreeMap](https://openfreemap.org): mapa base vectorial sin claves (© OpenMapTiles © OpenStreetMap)
- [Sentinel-2 cloudless 2016 (EOX)](https://s2maps.eu): imagen satelital, CC BY 4.0
- [rufat/triangle](https://github.com/drufat/triangle) (Shewchuk Triangle): triangulación con restricción de costa
- methomations (`m3d`): escena Blender que renderiza el póster de respaldo
- Referencias evaluadas: `gkjohnson/three-geojson`, `takram-design-engineering/three-geospatial`, `caracena/chile-geojson`
