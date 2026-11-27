"""Genera las capas vectoriales del mapa de obras (MapLibre):

  public/mapa/chile-mascara.geojson   el mundo menos Chile continental: se pinta encima para atenuar lo que no es Chile
  public/mapa/chile-contorno.geojson  el borde de Chile continental, para dibujarlo como línea

    uv run --python 3.12 --with shapely python tools/mapa-chile/mascara.py --ne <carpeta-natural-earth> --out public/mapa
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from shapely.geometry import MultiPolygon, Polygon, mapping, shape
from shapely.geometry.polygon import orient

LON_MIN_CONTINENTAL = -77.0   # fuera Rapa Nui, Juan Fernández y las Desventuradas


def redondear(obj, dec=4):
    if isinstance(obj, float):
        return round(obj, dec)
    if isinstance(obj, (list, tuple)):
        return [redondear(x, dec) for x in obj]
    if isinstance(obj, dict):
        return {k: redondear(v, dec) for k, v in obj.items()}
    return obj


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ne", type=Path, required=True)
    ap.add_argument("--out", type=Path, required=True)
    a = ap.parse_args()

    d = json.loads((a.ne / "ne_10m_admin_0_countries.geojson").read_text())
    g = shape(next(f for f in d["features"] if f["properties"].get("ADM0_A3") == "CHL")["geometry"])
    polis = [p.simplify(0.004, preserve_topology=True) for p in g.geoms if p.bounds[0] > LON_MIN_CONTINENTAL]
    polis = [p for p in polis if p.area > 0.0005]
    chile = MultiPolygon(polis)

    mundo = Polygon([(-180, -85), (180, -85), (180, 85), (-180, 85)], holes=[list(p.exterior.coords) for p in polis])
    mascara = orient(mundo, 1.0)

    def escribir(nombre, geom):
        fc = {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {}, "geometry": redondear(mapping(geom))}]}
        (a.out / nombre).write_text(json.dumps(fc, separators=(",", ":")))
        print(nombre, f"{(a.out / nombre).stat().st_size / 1024:.0f} KB")

    a.out.mkdir(parents=True, exist_ok=True)
    escribir("chile-mascara.geojson", mascara)
    escribir("chile-contorno.geojson", chile)


if __name__ == "__main__":
    main()
