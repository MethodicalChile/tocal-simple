"""Prepara las fotos del sitio con un mismo tratamiento.

Lee los originales de tools/fotos/originales/{projects,company,services} (fuera de public/ para no publicarlos)
y escribe en public/images/ las versiones que usa el sitio. Para cada foto:
  - portadas (cover.webp) recortadas al centro a 3:2, para que todas las fichas calcen
  - corrección común y leve: un poco más de contraste y un poco menos de saturación (las fotos vienen de
    cámaras y drones distintos; así se leen como una sola serie)
  - versiones de 800 y 1600 px de ancho (nunca más grandes que el original): foto@800.webp, foto@1600.webp

Escribe src/data/fotos.json con el ancho y alto de cada versión, que usa srcset() en src/config.js y la
curaduría (las fotos de menos de 1000 px no van en espacios grandes).

    uv run --python 3.12 --with pillow python tools/fotos/procesar.py
"""
from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageEnhance

RAIZ = Path(__file__).resolve().parents[2]
PUBLIC = RAIZ / "public"
ORIGINALES = RAIZ / "tools" / "fotos" / "originales"
ANCHOS = (800, 1600)


def tratar(im: Image.Image) -> Image.Image:
    im = ImageEnhance.Contrast(im).enhance(1.05)
    im = ImageEnhance.Color(im).enhance(0.92)
    return im


def recortar_3x2(im: Image.Image) -> Image.Image:
    w, h = im.size
    if abs(w / h - 1.5) < 0.02:
        return im
    if w / h > 1.5:
        nw = round(h * 1.5)
        x = (w - nw) // 2
        return im.crop((x, 0, x + nw, h))
    nh = round(w / 1.5)
    y = (h - nh) // 2
    return im.crop((0, y, w, y + nh))


def main():
    inventario = {}
    fuentes = [p for carpeta in ("projects", "company", "services") for p in sorted((ORIGINALES / carpeta).rglob("*.webp"))]
    for p in fuentes:
        im = Image.open(p).convert("RGB")
        if p.name == "cover.webp":
            im = recortar_3x2(im)
        im = tratar(im)
        rel = p.relative_to(ORIGINALES)
        ruta = "/images/" + rel.as_posix()
        versiones = {}
        for ancho in ANCHOS:
            a = min(ancho, im.width)
            if any(v[0] == a for v in versiones.values()):
                break                       # la foto es más chica que este tamaño y ya está guardada entera
            v = im if a == im.width else im.resize((a, round(im.height * a / im.width)), Image.LANCZOS)
            destino = PUBLIC / "images" / rel.with_name(f"{p.stem}@{ancho}.webp")
            destino.parent.mkdir(parents=True, exist_ok=True)
            v.save(destino, quality=82, method=6)
            versiones[ancho] = [v.width, v.height]
        inventario[ruta] = {"ancho": im.width, "alto": im.height, "versiones": versiones}
    (RAIZ / "src" / "data" / "fotos.json").write_text(json.dumps(inventario, indent=0, ensure_ascii=False))
    chicas = [k for k, v in inventario.items() if v["ancho"] < 1000]
    print(f"{len(inventario)} fotos; {len(chicas)} bajo 1000 px")


if __name__ == "__main__":
    main()
