"""Normaliza los logos de mandantes para que pesen parecido en la cinta.

Cada logo se ajusta a una caja de 480×160 px (2× de 240×80) según su "área de tinta": un logo compacto y macizo
(el círculo de Casa de Moneda) queda más chico que uno alargado y liviano (el de Enex), como se hace a ojo en una
lámina de clientes. Lee tools/fotos/originales/mandantes/ y escribe public/images/mandantes/<logo>-n.png.
Los SVG se pasan antes a PNG:

    for f in copec bosch-rexroth unimarc; do rsvg-convert -h 320 tools/fotos/originales/mandantes/$f.svg -o tools/fotos/originales/mandantes/$f.png; done
    uv run --python 3.12 --with pillow --with numpy python tools/fotos/logos.py
"""
from __future__ import annotations

import json
import math
from pathlib import Path

import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parents[2]
ORIGINALES = RAIZ / "tools" / "fotos" / "originales" / "mandantes"
CARPETA = RAIZ / "public" / "images" / "mandantes"
CAJA = (480, 160)
AREA_OBJETIVO = 0.30   # fracción de la caja que debería cubrir la tinta del logo


def main():
    escalas = {}
    for p in sorted(ORIGINALES.glob("*.png")):
        im = Image.open(p).convert("RGBA")
        a = np.asarray(im)[..., 3].astype(np.float32) / 255
        tinta = a.sum() / (im.width * im.height)            # qué tan lleno está el rectángulo del logo
        # tamaño que hace que la tinta cubra AREA_OBJETIVO de la caja, sin salirse de ella
        area_caja = CAJA[0] * CAJA[1] * AREA_OBJETIVO
        k = math.sqrt(area_caja / max(tinta * im.width * im.height, 1))
        k = min(k, CAJA[0] / im.width, CAJA[1] / im.height)
        w, h = max(1, round(im.width * k)), max(1, round(im.height * k))
        lienzo = Image.new("RGBA", CAJA, (0, 0, 0, 0))
        lienzo.paste(im.resize((w, h), Image.LANCZOS), ((CAJA[0] - w) // 2, (CAJA[1] - h) // 2))
        lienzo.save(CARPETA / f"{p.stem}-n.png", optimize=True)
        escalas[p.name] = round(w / CAJA[0], 3)
    print(json.dumps(escalas, indent=1))


if __name__ == "__main__":
    main()
