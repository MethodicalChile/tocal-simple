// Revisa src/ contra los patrones que delatan un sitio hecho "por defecto" (ver plan de diseño "ficha técnica").
//   node tools/revisar-texto.mjs        → termina en 1 si encuentra algo
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const RAIZ = new URL('..', import.meta.url).pathname
const archivos = []
const recorrer = (d) => {
  for (const n of readdirSync(d)) {
    const p = join(d, n)
    if (statSync(p).isDirectory()) recorrer(p)
    else if (/\.(vue|js|css)$/.test(n)) archivos.push(p)
  }
}
recorrer(join(RAIZ, 'src'))

// [nombre, expresión, archivos donde se permite (justificado)]
const reglas = [
  ['guion largo (—) en texto', /—/, []],
  ['mayúsculas forzadas', /text-transform:\s*uppercase/i, []],
  ['interletraje amplio', /letter-spacing:\s*0?\.(0[5-9]|[1-9])\d*em/i, []],
  ['sombra decorativa', /box-shadow:\s*(?!inset 3px 0 0)(?!none)[^;]*rgba/i, ['MapaObras.vue']],
  ['degradado decorativo', /(linear|radial)-gradient/i, ['HeroVideo.vue', 'MapaObras.vue']],
  ['aparición al hacer scroll', /(fade-?in|slide-?up|data-aos|animate__)/i, []],
  ['palabra vacía', /\b(alto estándar|integral(es)?|soluciones|líderes?|innovador(a|es)?|excelencia|clase mundial|potenciar|impulsa(r|mos)|sinergia|vanguardia|de primer nivel)\b/i, []],
]

let fallas = 0
for (const a of archivos) {
  const nombre = relative(RAIZ, a)
  const lineas = readFileSync(a, 'utf8').split('\n')
  lineas.forEach((l, i) => {
    for (const [regla, re, permitidos] of reglas) {
      if (permitidos.some((p) => nombre.endsWith(p))) continue
      if (re.test(l)) {
        fallas++
        console.log(`${nombre}:${i + 1}  ${regla}:  ${l.trim().slice(0, 110)}`)
      }
    }
  })
}
console.log(fallas ? `\n${fallas} hallazgos` : 'Sin hallazgos')
process.exit(fallas ? 1 : 0)
