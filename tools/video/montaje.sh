#!/usr/bin/env bash
# Arma el montaje del hero con tomas de los vuelos en dron de Tocal (bucket de Supabase de la propuesta tocal-simple).
#
#   bash tools/video/montaje.sh
#
# - Recorta cada vuelo a 1066×600 desde (80, 0): deja fuera el logo de la esquina superior derecha y el nombre de la
#   obra que el video trae escrito abajo a la izquierda. Escala a 1280×720 (las fuentes son 720p).
# - Une las tomas con fundidos de 0,5 s, sin audio.
# - Escribe public/video/montaje.{mp4,webm}, el póster y src/data/montaje.js con el tramo de cada obra
#   (lo usa HeroVideo.vue para cambiar la ficha según la toma en pantalla).
set -euo pipefail
cd "$(dirname "$0")/../.."

MEDIA="https://chqllbhsgfawmdogbjoy.supabase.co/storage/v1/object/public/tocal-media/videos"
FUENTES=tools/video/build/fuentes
SALIDA=public/video
DUR=4.6      # segundos por toma
FUNDIDO=0.5

# archivo | segundo de inicio | id de la obra en src/data/obras.js
TOMAS=(
  "tucapel-retiro|1.0|planta-tucapel-retiro"
  "copec-chillan|13.0|copec-chillan"
  "shell-san-carlos|46.0|shell-enex-san-carlos"
  "bodega-megarent|29.0|bodega-megarent-linares"
  "copec-quillon|25.0|copec-quillon"
  "unimarc-talca|15.0|unimarc-talca"
)

mkdir -p "$FUENTES" "$SALIDA"
entradas=()
filtros=""
n=${#TOMAS[@]}
for i in "${!TOMAS[@]}"; do
  IFS='|' read -r archivo inicio _ <<< "${TOMAS[$i]}"
  [ -f "$FUENTES/$archivo.mp4" ] || curl -sSfL -o "$FUENTES/$archivo.mp4" "$MEDIA/$archivo.mp4"
  entradas+=(-ss "$inicio" -t "$DUR" -i "$FUENTES/$archivo.mp4")
  filtros+="[$i:v]crop=1066:600:80:0,scale=1280:720:flags=lanczos,fps=24,setpts=PTS-STARTPTS,format=yuv420p[v$i];"
done

# cadena de fundidos: cada toma entra cuando la anterior lleva DUR - FUNDIDO segundos
previo="v0"
for ((i = 1; i < n; i++)); do
  offset=$(python3 -c "print(round($i * ($DUR - $FUNDIDO), 3))")
  filtros+="[$previo][v$i]xfade=transition=fade:duration=$FUNDIDO:offset=$offset[x$i];"
  previo="x$i"
done
filtros="${filtros%;}"

ffmpeg -v error -y "${entradas[@]}" -filter_complex "$filtros" -map "[$previo]" -an \
  -c:v libx264 -preset slow -crf 25 -profile:v high -pix_fmt yuv420p -movflags +faststart "$SALIDA/montaje.mp4"
ffmpeg -v error -y -i "$SALIDA/montaje.mp4" -an -c:v libvpx-vp9 -crf 37 -b:v 0 -row-mt 1 -deadline good "$SALIDA/montaje.webm"
ffmpeg -v error -y -ss 1.2 -i "$SALIDA/montaje.mp4" -frames:v 1 -c:v libwebp -quality 80 "$SALIDA/montaje-poster.webp"

# tramos: la toma i manda desde la mitad del fundido que la trae
{
  echo "// Generado por tools/video/montaje.sh: qué obra está en pantalla en cada tramo del montaje del hero."
  echo "export const tramos = ["
  for i in "${!TOMAS[@]}"; do
    IFS='|' read -r _ _ obra <<< "${TOMAS[$i]}"
    desde=$(python3 -c "print(0 if $i == 0 else round($i * ($DUR - $FUNDIDO) + $FUNDIDO / 2, 2))")
    echo "  { desde: $desde, obra: '$obra' },"
  done
  echo "]"
  echo "export const duracion = $(python3 -c "print(round($n * $DUR - ($n - 1) * $FUNDIDO, 2))")"
} > src/data/montaje.js

ls -la "$SALIDA"
