"""Escribe resto_data_images.json (lista de prompts) sin tocar App.tsx. Misma lógica que resto_build.py."""
import json
import os
import sys

S = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, S)
from resto_data import STORIES, TARGET  # noqa: E402

KEYS = ["a", "b", "c"]
images = []
for sid, st in STORIES.items():
    for ci, opts in enumerate(st["chapters"]):
        rest = [k for k in KEYS if k != TARGET[sid][ci]]
        placed = {TARGET[sid][ci]: opts[0], rest[0]: opts[1], rest[1]: opts[2]}
        images += [[sid, f"chapter-{ci + 1}-choice-{k}", o[3]] for k, o in placed.items()]
    names = ["opening", "chapter-2", "chapter-3", "chapter-4", "chapter-5"]
    images += [[sid, n, p] for n, p in zip(names, st["scene_prompts"])]
    images.append([sid, "cover", st["cover"]])
over = json.load(open(S + "/resto_overrides.json", encoding="utf8"))
images = [[sid, n, over.get(f"{sid}-{n}", p)] for sid, n, p in images]
json.dump(images, open(S + "/resto_data_images.json", "w", encoding="utf8"), ensure_ascii=False, indent=1)
print("ok", len(images), "imágenes")
