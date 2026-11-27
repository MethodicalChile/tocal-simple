"""Escena m3d (methomations): arma el modelo 3D de Chile horizontal, exporta el GLB para la web y deja la cámara
lista para el póster de respaldo (lo que se ve si el navegador no tiene WebGL).

Requiere haber corrido antes ``preparar.py`` (deja ``build/chile_malla.npz`` y la textura de relieve).

    blender -b --factory-startup -P ~/Desktop/Repositorios/methomations/src/methomations/m3d/runner.py -- \
        tools/mapa-chile/chile3d.py --preset final --out tools/mapa-chile/build/poster --stills 0

El GLB sale sin materiales (solo geometría, normales y UV, comprimido con Draco): el material y la luz los pone
three.js en el sitio, así el mismo modelo sirve con tema claro u oscuro.
"""
from __future__ import annotations

import math
import os
from pathlib import Path

import bpy
import numpy as np

from m3d import camara
from m3d.materiales import _nuevo, arcilla
from m3d.escena import rgba

FORMATO = "wide"
LOOK = "cine"
DUR = 1 / 30

AQUI = Path(__file__).resolve().parent
BUILD = AQUI / "build"
DESTINO_GLB = Path(os.environ.get("CHILE_GLB", BUILD / "chile.glb"))

# colores del sitio (src/styles/tokens.css)
TABLERO = "#d3d2cc"
ZOCALO = "#c9c7c0"


def _malla(nombre, verts, caras, uv=None):
    me = bpy.data.meshes.new(nombre)
    me.vertices.add(len(verts))
    me.vertices.foreach_set("co", verts.ravel())
    n = len(caras)
    me.loops.add(n * 3)
    me.loops.foreach_set("vertex_index", caras.ravel())
    me.polygons.add(n)
    me.polygons.foreach_set("loop_start", np.arange(0, n * 3, 3))
    me.polygons.foreach_set("loop_total", np.full(n, 3))
    me.update(calc_edges=True)
    me.validate()
    if uv is not None:
        capa = me.uv_layers.new(name="UVMap")
        capa.data.foreach_set("uv", uv[caras.ravel()].ravel())
    o = bpy.data.objects.new(nombre, me)
    bpy.context.scene.collection.objects.link(o)
    return o


def _material_relieve():
    m, b = _nuevo("relieve")
    nt = m.node_tree
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = bpy.data.images.load(str(BUILD / "chile-color-8k.webp"))
    tex.interpolation = "Cubic"
    nt.links.new(tex.outputs["Color"], b.inputs["Base Color"])
    b.inputs["Roughness"].default_value = 0.82
    return m


def construir(e):
    d = np.load(BUILD / "chile_malla.npz")
    tierra = _malla("tierra", d["verts"], d["faces"], d["uv"])
    tierra.data.polygons.foreach_set("use_smooth", np.ones(len(d["faces"]), bool))
    zocalo = _malla("zocalo", d["borde_verts"], d["borde_faces"])

    # ── GLB para la web ──────────────────────────────────────────────────────────────────────
    bpy.ops.object.select_all(action="DESELECT")
    tierra.select_set(True); zocalo.select_set(True)
    bpy.context.view_layer.objects.active = tierra
    DESTINO_GLB.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=str(DESTINO_GLB), export_format="GLB", use_selection=True, export_yup=True,
        export_materials="NONE", export_normals=True, export_texcoords=True, export_apply=True,
        export_draco_mesh_compression_enable=True, export_draco_mesh_compression_level=7,
        export_draco_position_quantization=14, export_draco_normal_quantization=10,
        export_draco_texcoord_quantization=13,
    )
    print(f"m3d: GLB -> {DESTINO_GLB} ({DESTINO_GLB.stat().st_size / 1e6:.2f} MB)", flush=True)

    # ── póster ───────────────────────────────────────────────────────────────────────────────
    tierra.data.materials.append(_material_relieve())
    zocalo.data.materials.append(arcilla(ZOCALO, rugosidad=0.95, nombre="zocalo"))
    base = float(d["borde_verts"][:, 2].min())
    bpy.ops.mesh.primitive_plane_add(size=400, location=(0, 0, base))
    tablero = bpy.context.object
    tablero.data.materials.append(arcilla(TABLERO, rugosidad=1.0, nombre="tablero"))

    sol = bpy.data.lights.new("sol", "SUN")
    sol.energy = 2.6
    sol.angle = math.radians(8)
    sol.color = rgba("#fff4e6")[:3]
    o = bpy.data.objects.new("sol", sol)
    e.scene.collection.objects.link(o)
    o.rotation_euler = (math.radians(40), 0, math.radians(-125))
    e.fondo("#f4f3ef", 0.9)        # cielo claro de estudio: rellena las laderas en sombra

    # vista de la zona de obras (Coquimbo a La Araucanía), igual que la vista inicial del sitio
    e.camara.data.lens = 38
    e.camara.location = (-2.6, -8.6, 5.4)
    camara.objetivo(e, (-2.6, 0.35, 0.0))
    e.muestras = 96


def despues_de_fisica(e):
    e.scene.render.use_motion_blur = False
