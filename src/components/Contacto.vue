<script setup>
import { reactive, ref } from 'vue'
import { empresa } from '../config.js'
import { sectores } from '../data/obras.js'

const f = reactive({ nombre: '', empresa: '', correo: '', telefono: '', tipo: '', comuna: '', plazo: '', mensaje: '' })
const errores = reactive({})
const estado = ref('')            // '' | enviando | enviado | correo | error

function validar() {
  for (const k of Object.keys(errores)) delete errores[k]
  if (!f.nombre.trim()) errores.nombre = 'Escriba su nombre.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.correo.trim())) errores.correo = 'Escriba un correo válido, por ejemplo nombre@empresa.cl.'
  if (f.mensaje.trim().length < 10) errores.mensaje = 'Cuéntenos en una o dos frases qué necesita construir.'
  return Object.keys(errores).length === 0
}

function cuerpo() {
  return [
    `Nombre: ${f.nombre}`, `Empresa: ${f.empresa}`, `Correo: ${f.correo}`, `Teléfono: ${f.telefono}`,
    `Tipo de obra: ${f.tipo}`, `Comuna de la obra: ${f.comuna}`, `Plazo esperado: ${f.plazo}`, '', f.mensaje,
  ].join('\n')
}

async function enviar() {
  if (!validar()) {
    document.getElementById(`c-${Object.keys(errores)[0]}`)?.focus()
    return
  }
  // con VITE_CONTACT_ENDPOINT configurado se envía directo; si no, se abre el correo con la solicitud escrita
  if (empresa.formularioEndpoint) {
    estado.value = 'enviando'
    try {
      const r = await fetch(empresa.formularioEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f }),
      })
      if (!r.ok) throw new Error(r.status)
      estado.value = 'enviado'
    } catch {
      estado.value = 'error'
    }
    return
  }
  const asunto = `Solicitud de cotización${f.empresa ? ': ' + f.empresa : ''}`
  window.location.href = `mailto:${empresa.correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo())}`
  estado.value = 'correo'
}

const whatsapp = `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent('Hola, quisiera cotizar una obra con Constructora Tocal.')}`
</script>

<template>
  <section id="contacto" class="con">
    <div class="contenedor">
      <div class="cabeza cabeza--oscura">
        <h2>Solicitud de cotización</h2>
        <p>Indique qué necesita construir, en qué comuna y para cuándo. Respondemos con una propuesta técnica y económica.</p>
      </div>

      <div class="grilla con__cuerpo">
        <form class="form" novalidate @submit.prevent="enviar">
          <div class="campo campo--6">
            <label for="c-nombre">Nombre</label>
            <input id="c-nombre" v-model="f.nombre" autocomplete="name" :aria-invalid="!!errores.nombre" aria-describedby="e-nombre" />
            <p v-if="errores.nombre" id="e-nombre" class="campo__error">{{ errores.nombre }}</p>
          </div>
          <div class="campo campo--6">
            <label for="c-empresa">Empresa <span>opcional</span></label>
            <input id="c-empresa" v-model="f.empresa" autocomplete="organization" />
          </div>
          <div class="campo campo--6">
            <label for="c-correo">Correo</label>
            <input id="c-correo" v-model="f.correo" type="email" autocomplete="email" :aria-invalid="!!errores.correo" aria-describedby="e-correo" />
            <p v-if="errores.correo" id="e-correo" class="campo__error">{{ errores.correo }}</p>
          </div>
          <div class="campo campo--6">
            <label for="c-telefono">Teléfono <span>opcional</span></label>
            <input id="c-telefono" v-model="f.telefono" type="tel" autocomplete="tel" />
          </div>
          <div class="campo campo--4">
            <label for="c-tipo">Tipo de obra</label>
            <select id="c-tipo" v-model="f.tipo">
              <option value="">Elegir</option>
              <option v-for="s in sectores" :key="s.id" :value="s.nombre">{{ s.nombre }}</option>
              <option value="Otra">Otra</option>
            </select>
          </div>
          <div class="campo campo--4">
            <label for="c-comuna">Comuna de la obra <span>opcional</span></label>
            <input id="c-comuna" v-model="f.comuna" />
          </div>
          <div class="campo campo--4">
            <label for="c-plazo">Plazo esperado <span>opcional</span></label>
            <input id="c-plazo" v-model="f.plazo" placeholder="Ej.: operando en marzo 2027" />
          </div>
          <div class="campo campo--12">
            <label for="c-mensaje">Qué necesita construir</label>
            <textarea id="c-mensaje" v-model="f.mensaje" rows="5" :aria-invalid="!!errores.mensaje" aria-describedby="e-mensaje"></textarea>
            <p v-if="errores.mensaje" id="e-mensaje" class="campo__error">{{ errores.mensaje }}</p>
          </div>
          <div class="campo campo--12 form__pie">
            <button class="boton boton--naranja" type="submit" :disabled="estado === 'enviando'">
              {{ estado === 'enviando' ? 'Enviando solicitud…' : 'Enviar solicitud' }}
            </button>
            <p class="form__nota" role="status">
              <template v-if="estado === 'enviado'">Solicitud enviada. Le responderemos a {{ f.correo }}.</template>
              <template v-else-if="estado === 'correo'">Se abrió su programa de correo con la solicitud escrita; envíela desde ahí.</template>
              <template v-else-if="estado === 'error'">La solicitud no se pudo enviar. Escríbanos directo a {{ empresa.correo }}.</template>
              <template v-else-if="!empresa.formularioEndpoint">Al enviar se abrirá su programa de correo con la solicitud lista.</template>
            </p>
          </div>
        </form>

        <div class="con__directo">
          <h3>Contacto directo</h3>
          <table class="tabla-contacto">
            <tbody>
              <tr v-for="g in empresa.gerencia" :key="g.nombre">
                <th scope="row">{{ g.nombre }}<span>{{ g.cargo }}</span></th>
                <td><a :href="`tel:${g.tel}`" class="num">{{ g.telefono }}</a><a :href="`mailto:${g.correo}`">{{ g.correo }}</a></td>
              </tr>
              <tr v-for="o in empresa.oficinas" :key="o.ciudad">
                <th scope="row">Oficina {{ o.ciudad }}<span>{{ o.direccion }}</span></th>
                <td><a :href="`tel:${o.tel}`" class="num">{{ o.telefono }}</a></td>
              </tr>
              <tr>
                <th scope="row">Correo general</th>
                <td><a :href="`mailto:${empresa.correo}`">{{ empresa.correo }}</a></td>
              </tr>
              <tr>
                <th scope="row">WhatsApp</th>
                <td><a :href="whatsapp" target="_blank" rel="noopener" class="num">{{ empresa.whatsappVisible }}</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.con { background: var(--tinta); color: #fff; padding-bottom: var(--e8); }
.cabeza--oscura { border-bottom-color: rgba(255, 255, 255, .6); }
.cabeza--oscura p { color: rgba(255, 255, 255, .7); }
.con__cuerpo { padding-top: var(--e6); row-gap: var(--e7); }

/* formulario como formulario impreso: cuadrícula de líneas finas */
.form {
  grid-column: 1 / span 7; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr));
  background: var(--blanco); color: var(--tinta); border-top: 1px solid var(--linea); border-left: 1px solid var(--linea);
}
.campo {
  display: flex; flex-direction: column; padding: 10px 14px 12px; border-right: 1px solid var(--linea); border-bottom: 1px solid var(--linea);
}
.campo:focus-within { background: var(--naranja-suave); }
.campo--4 { grid-column: span 4; }
.campo--6 { grid-column: span 6; }
.campo--12 { grid-column: span 12; }
.campo label { font-size: var(--t-chico); color: var(--gris); }
.campo label span { color: var(--gris); margin-left: 4px; font-style: italic; }
.campo input, .campo select, .campo textarea {
  width: 100%; min-height: 32px; margin-top: 2px; padding: 0; border: 0; background: transparent; font-size: var(--t-texto);
}
.campo textarea { resize: vertical; line-height: 1.5; padding-top: 4px; }
.campo input:focus, .campo select:focus, .campo textarea:focus { outline: none; }
.campo:has([aria-invalid='true']) { background: #fdf1f0; }
.campo__error { margin-top: 4px; font-size: var(--t-chico); color: #b3261e; }
.form__pie { flex-direction: row; flex-wrap: wrap; align-items: center; gap: var(--e3) var(--e5); padding-block: var(--e4); }
.form__nota { flex: 1 1 220px; font-size: var(--t-chico); color: var(--gris); }
.boton:disabled { opacity: .6; cursor: progress; }

.con__directo { grid-column: 9 / span 4; }
.con__directo h3 { font-size: var(--t-h3); padding-bottom: var(--e3); border-bottom: 1px solid rgba(255, 255, 255, .6); }
.tabla-contacto { width: 100%; border-collapse: collapse; font-size: var(--t-dato); }
.tabla-contacto th, .tabla-contacto td { text-align: left; vertical-align: top; padding: 11px 0; border-bottom: 1px solid rgba(255, 255, 255, .18); }
.tabla-contacto th { font-weight: 600; padding-right: var(--e4); }
.tabla-contacto th span { display: block; font-weight: 400; color: rgba(255, 255, 255, .6); }
.tabla-contacto td { text-align: right; }
.tabla-contacto a { display: block; text-decoration: none; }
.tabla-contacto a:hover { color: var(--naranja); }
.tabla-contacto a + a { color: rgba(255, 255, 255, .65); }

@media (max-width: 1000px) {
  .form, .con__directo { grid-column: 1 / -1; }
}
@media (max-width: 560px) {
  .campo--4, .campo--6 { grid-column: span 12; }
}
</style>
