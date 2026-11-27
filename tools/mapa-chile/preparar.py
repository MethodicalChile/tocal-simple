"""Prepara los datos del modelo 3D de Chile (horizontal, norte a la izquierda).

Entradas (se descargan aparte, ver README.md):
  --ne   carpeta con ne_10m_admin_0_countries.geojson y ne_10m_admin_1_states_provinces.geojson (Natural Earth)
  --dem  carpeta con los tiles Terrarium z7 que cubren Chile, nombrados "7_<x>_<y>.png" (AWS Terrain Tiles)

Salidas en --out:
  chile_malla.npz      malla triangulada (superficie + borde) en coordenadas de escena, lista para m3d/Blender
  chile-relieve-8k.webp / chile-relieve-4k.webp   textura de relieve (tinte hipsométrico, sombreado, límites)
  chile-meta.json      constantes de proyección y anclas de etiquetas de región (las usa el front)

La proyección es sinusoidal con meridiano central -71°: para una franja angosta como Chile conserva bien la forma.
Coordenadas de escena: 1 unidad = 100 km; X = hacia el sur, Y = hacia el este, Z = altura exagerada.

    uv run --python 3.12 --with numpy --with pillow --with shapely --with triangle --with scipy \
        python tools/mapa-chile/preparar.py --ne <dir> --dem <dir> --out tools/mapa-chile/build
"""
from __future__ import annotations

import argparse
import json
import math
from pathlib import Path

import numpy as np
import shapely
import triangle
from PIL import Image, ImageDraw
from scipy.ndimage import gaussian_filter
from shapely.geometry import MultiPolygon, Polygon, shape

LON0 = -71.0          # meridiano central
KX = 111.32           # km por grado de longitud en el ecuador
KY = 110.574          # km por grado de latitud
ESCALA = 1 / 100      # 1 unidad de escena = 100 km
EXAG = 5.0            # exageración vertical (Chile mide ~180 km de ancho y los Andes ~6 km de alto)
BASE = 0.12            # espesor del zócalo bajo el nivel del mar, en unidades de escena
LON_MIN_CONTINENTAL = -77.0   # deja fuera Rapa Nui, Juan Fernández y las Desventuradas
Z_DEM = 7

REGIONES_CORTAS = {
    "Arica y Parinacota": "Arica y Parinacota", "Tarapacá": "Tarapacá", "Antofagasta": "Antofagasta",
    "Atacama": "Atacama", "Coquimbo": "Coquimbo", "Valparaíso": "Valparaíso",
    "Región Metropolitana de Santiago": "Metropolitana", "Libertador General Bernardo O'Higgins": "O'Higgins",
    "Maule": "Maule", "Ñuble": "Ñuble", "Bío-Bío": "Biobío", "La Araucanía": "La Araucanía",
    "Los Ríos": "Los Ríos", "Los Lagos": "Los Lagos", "Aisén del General Carlos Ibáñez del Campo": "Aysén",
    "Magallanes y Antártica Chilena": "Magallanes",
}


def proyectar(lon, lat):
    lon, lat = np.asarray(lon, float), np.asarray(lat, float)
    u = -lat * KY
    v = (lon - LON0) * np.cos(np.radians(lat)) * KX
    return u, v


def desproyectar(u, v):
    lat = -np.asarray(u, float) / KY
    lon = LON0 + np.asarray(v, float) / (np.cos(np.radians(lat)) * KX)
    return lon, lat


def proyectar_geom(g):
    return shapely.transform(g, lambda c: np.column_stack(proyectar(c[:, 0], c[:, 1])))


# ── elevación ──────────────────────────────────────────────────────────────────────────────────
class DEM:
    def __init__(self, carpeta: Path):
        tiles = {}
        for p in carpeta.glob(f"{Z_DEM}_*_*.png"):
            _, x, y = p.stem.split("_")
            tiles[(int(x), int(y))] = p
        xs = sorted({k[0] for k in tiles}); ys = sorted({k[1] for k in tiles})
        self.x0, self.y0 = xs[0], ys[0]
        nx, ny = xs[-1] - xs[0] + 1, ys[-1] - ys[0] + 1
        h = np.zeros((ny * 256, nx * 256), np.float32)
        for (x, y), p in tiles.items():
            a = np.asarray(Image.open(p).convert("RGB"), np.float32)
            t = a[..., 0] * 256 + a[..., 1] + a[..., 2] / 256 - 32768
            h[(y - self.y0) * 256:(y - self.y0 + 1) * 256, (x - self.x0) * 256:(x - self.x0 + 1) * 256] = t
        self.h = gaussian_filter(h, 0.6)

    def __call__(self, lon, lat):
        n = 2 ** Z_DEM * 256
        lat_r = np.radians(np.clip(lat, -85, 85))
        px = (np.asarray(lon) + 180) / 360 * n - self.x0 * 256 - 0.5
        py = (1 - np.log(np.tan(lat_r) + 1 / np.cos(lat_r)) / math.pi) / 2 * n - self.y0 * 256 - 0.5
        px = np.clip(px, 0, self.h.shape[1] - 1.001); py = np.clip(py, 0, self.h.shape[0] - 1.001)
        x0 = np.floor(px).astype(int); y0 = np.floor(py).astype(int)
        fx = px - x0; fy = py - y0
        h = self.h
        return ((h[y0, x0] * (1 - fx) + h[y0, x0 + 1] * fx) * (1 - fy)
                + (h[y0 + 1, x0] * (1 - fx) + h[y0 + 1, x0 + 1] * fx) * fy)


# ── geometría ──────────────────────────────────────────────────────────────────────────────────
def chile(ne: Path):
    d = json.loads((ne / "ne_10m_admin_0_countries.geojson").read_text())
    g = shape(next(f for f in d["features"] if f["properties"].get("ADM0_A3") == "CHL")["geometry"])
    polis = [p for p in g.geoms if p.bounds[0] > LON_MIN_CONTINENTAL]
    proy = [proyectar_geom(p).simplify(0.5, preserve_topology=True) for p in polis]
    return [p for p in proy if p.area > 12.0]           # km²: fuera islotes que no se verían


def regiones(ne: Path):
    d = json.loads((ne / "ne_10m_admin_1_states_provinces.geojson").read_text())
    out = []
    for f in d["features"]:
        if f["properties"].get("adm0_a3") != "CHL":
            continue
        g = shape(f["geometry"])
        geoms = [p for p in getattr(g, "geoms", [g]) if p.bounds[0] > LON_MIN_CONTINENTAL]
        if not geoms:
            continue
        g = MultiPolygon(geoms)
        nombre = REGIONES_CORTAS.get(f["properties"]["name"], f["properties"]["name"])
        principal = max(geoms, key=lambda p: p.area)
        ancla = principal.representative_point()
        out.append({"nombre": nombre, "geom": g, "lon": round(ancla.x, 3), "lat": round(ancla.y, 3),
                    "lat_n": round(principal.bounds[3], 3), "lat_s": round(principal.bounds[1], 3),
                    "lon_o": round(principal.bounds[0], 3)})
    out.sort(key=lambda r: -r["lat"])
    return out


def _anillo(coords):
    c = np.asarray(coords)[:-1]
    n = len(c)
    return c, np.column_stack([np.arange(n), (np.arange(n) + 1) % n])


def triangular(p: Polygon, dem: DEM):
    verts, segs, huecos, off = [], [], [], 0
    for anillo in [p.exterior, *p.interiors]:
        c, s = _anillo(anillo.coords)
        verts.append(c); segs.append(s + off); off += len(c)
    for i in p.interiors:
        huecos.append(Polygon(i).representative_point().coords[0])
    entrada = {"vertices": np.vstack(verts), "segments": np.vstack(segs)}
    if huecos:
        entrada["holes"] = np.asarray(huecos)
    t = triangle.triangulate(entrada, "pq28a40")
    # refinamiento: triángulos chicos donde el relieve cambia mucho (cordillera), grandes en el valle y la pampa
    v = t["vertices"]; tri = t["triangles"]
    h = np.maximum(dem(*desproyectar(v[:, 0], v[:, 1])), 0) / 1000
    rango = h[tri].max(1) - h[tri].min(1)
    area = np.interp(rango, [0.05, 0.4, 1.2], [30, 5, 1.1])
    t["triangle_max_area"] = area
    t2 = triangle.triangulate(t, "rpq28a")
    return t2["vertices"], t2["triangles"], t2.get("segments")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ne", type=Path, required=True)
    ap.add_argument("--dem", type=Path, required=True)
    ap.add_argument("--out", type=Path, required=True)
    a = ap.parse_args()
    a.out.mkdir(parents=True, exist_ok=True)

    dem = DEM(a.dem)
    polis = chile(a.ne)
    todo = shapely.union_all(polis)
    umin, vmin, umax, vmax = todo.bounds
    uc = (umin + umax) / 2
    print(f"Chile continental: {len(polis)} polígonos, {todo.area:,.0f} km², {umax - umin:,.0f} × {vmax - vmin:,.0f} km")

    V, F, SV, SF = [], [], [], []
    off = soff = 0
    for p in polis:
        v, t, _ = triangular(p, dem)
        h = np.maximum(dem(*desproyectar(v[:, 0], v[:, 1])), 0)
        V.append(np.column_stack([v, h])); F.append(t + off)
        # zócalo: paredes desde los bordes (aristas usadas por un solo triángulo) hasta la base
        aristas = np.sort(np.vstack([t[:, [0, 1]], t[:, [1, 2]], t[:, [2, 0]]]), axis=1)
        uniq, cuenta = np.unique(aristas, axis=0, return_counts=True)
        borde = uniq[cuenta == 1]
        # orientar cada arista como en su triángulo para que las paredes miren hacia afuera
        dir_ = {}
        for tri in t:
            for i, j in ((tri[0], tri[1]), (tri[1], tri[2]), (tri[2], tri[0])):
                dir_[(i, j)] = True
        for i, j in borde:
            if not dir_.get((i, j)):
                i, j = j, i
            a0 = np.r_[v[i], h[i]]; a1 = np.r_[v[j], h[j]]
            b0 = np.r_[v[i], -BASE / ESCALA * 1000 / EXAG / 1]; b1 = np.r_[v[j], b0[2]]
            SV.extend([a0, a1, b1, b0])
            SF.extend([[soff, soff + 3, soff + 2], [soff, soff + 2, soff + 1]])
            soff += 4
        off += len(v)

    V = np.vstack(V); F = np.vstack(F); SV = np.asarray(SV); SF = np.asarray(SF)

    def escena(m):
        return np.column_stack([(m[:, 0] - uc) * ESCALA, m[:, 1] * ESCALA, m[:, 2] / 1000 * ESCALA * EXAG])

    # Blender pone el origen de las UV abajo; la fila 0 de la imagen es el oeste → se invierte v
    uv = np.column_stack([(V[:, 0] - umin) / (umax - umin), 1 - (V[:, 1] - vmin) / (vmax - vmin)])
    np.savez_compressed(a.out / "chile_malla.npz", verts=escena(V).astype(np.float32), faces=F.astype(np.int32),
                        uv=uv.astype(np.float32), borde_verts=escena(SV).astype(np.float32),
                        borde_faces=SF.astype(np.int32))
    print(f"malla: {len(V):,} vértices, {len(F):,} triángulos; zócalo: {len(SF):,} triángulos")

    regs = regiones(a.ne)
    textura(a.out, dem, polis, regs, (umin, vmin, umax, vmax))

    meta = {
        "proyeccion": {"lon0": LON0, "kx": KX, "ky": KY, "escala": ESCALA, "exag": EXAG, "uc": round(uc, 4),
                        "base": BASE},
        "limites": {"x": [(umin - uc) * ESCALA, (umax - uc) * ESCALA], "z_este": [vmin * ESCALA, vmax * ESCALA]},
        "regiones": [{k: r[k] for k in ("nombre", "lon", "lat", "lat_n", "lat_s", "lon_o")} for r in regs],
        "fuentes": ["Natural Earth 1:10m (dominio público)", "AWS Terrain Tiles / Terrarium (Mapzen, SRTM, GMTED)"],
    }
    (a.out / "chile-meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1))


# ── textura ───────────────────────────────────────────────────────────────────────────────────
RAMPA = [  # elevación (m) → color de maqueta: yeso cálido en el valle, un gris apenas más frío en altura
    (0, (236, 234, 228)), (600, (231, 229, 223)), (1800, (222, 222, 218)), (3500, (214, 216, 214)),
    (5000, (230, 231, 230)), (6500, (244, 244, 242)),
]


def textura(out: Path, dem: DEM, polis, regs, lim):
    """Dos texturas en el mismo encuadre que las UV de la malla:
    - color: tinte de maqueta + oclusión suave en quebradas + límites regionales (sin sombreado horneado:
      la luz la pone three.js, así sombra y relieve siempre coinciden)
    - normales en espacio de objeto (Y arriba, como el GLB): el relieve fino a 0,5 km que la malla no alcanza
    """
    umin, vmin, umax, vmax = lim
    W = 8192
    H = int(math.ceil(W * (vmax - vmin) / (umax - umin) / 8) * 8)
    px_km = (umax - umin) / W
    pv_km = (vmax - vmin) / H
    us = umin + (np.arange(W) + 0.5) * px_km
    vs = vmin + (np.arange(H) + 0.5) * pv_km
    U, Vv = np.meshgrid(us, vs)
    h = np.maximum(dem(*desproyectar(U, Vv)), 0).astype(np.float32)
    hs_km = gaussian_filter(h, 0.9) / 1000

    # normales: superficie y = EXAG·h(u, v) con x = u, z = −v  →  n ∝ (−EXAG·∂h/∂u, 1, EXAG·∂h/∂v)
    dhdu = np.gradient(hs_km, px_km, axis=1)
    dhdv = np.gradient(hs_km, pv_km, axis=0)
    n = np.dstack([-EXAG * dhdu, np.ones_like(hs_km), EXAG * dhdv])
    n /= np.linalg.norm(n, axis=2, keepdims=True)
    normal = Image.fromarray(np.clip((n * 0.5 + 0.5) * 255 + 0.5, 0, 255).astype(np.uint8), "RGB")

    # oclusión: lo que queda bajo el promedio de su entorno (quebradas, valles encajonados) se oscurece un poco
    hondo = sum(np.clip(gaussian_filter(hs_km, r) - hs_km, 0, None) * w for r, w in ((3, 1.0), (10, 0.6), (28, 0.35)))
    ao = np.clip(1 - hondo * 0.55, 0.72, 1)

    hs = [r[0] for r in RAMPA]
    col = np.dstack([np.interp(h, hs, [r[1][c] for r in RAMPA]) for c in range(3)])
    img = Image.fromarray(np.clip(col * ao[..., None], 0, 255).astype(np.uint8), "RGB")

    # el eje v crece hacia el este; en la imagen, la fila 0 es v mínimo (oeste) → coincide con uv.y = 0
    def pix(geom_coords, ss=1):
        c = np.asarray(geom_coords)
        return list(zip((c[:, 0] - umin) / px_km * ss, (c[:, 1] - vmin) / pv_km * ss))

    # límites regionales a doble resolución y reducidos: línea fina con antialias, como grabada en la maqueta
    SS = 2
    capa = Image.new("RGBA", (W * SS, H * SS), (0, 0, 0, 0))
    d = ImageDraw.Draw(capa)
    for r in regs:
        for p in proyectar_geom(r["geom"]).geoms:
            d.line(pix(p.exterior.coords, SS), fill=(98, 98, 103, 135), width=int(2.2 * SS), joint="curve")
    img = Image.alpha_composite(img.convert("RGBA"), capa.resize((W, H), Image.LANCZOS)).convert("RGB")

    for tam, sufijo in ((W, "8k"), (W // 2, "4k")):
        alto = H * tam // W
        img.resize((tam, alto), Image.LANCZOS).save(out / f"chile-color-{sufijo}.webp", quality=88, method=6)
        normal.resize((tam, alto), Image.LANCZOS).save(out / f"chile-normal-{sufijo}.webp", quality=92, method=6)
    print(f"texturas {W}×{H} ({px_km:.2f} km/px)")


if __name__ == "__main__":
    main()
