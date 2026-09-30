"""Valida los textos de Luma, los inserta en App.tsx y escribe la lista de imágenes."""
import json
import re
import sys

sys.path.insert(0, sys.argv[1])
import importlib  # noqa: E402
mod = importlib.import_module(sys.argv[2])
STORIES, TARGET, THREAD = mod.STORIES, mod.TARGET, mod.THREAD

APP = "src/App.tsx"
KEYS = ["a", "b", "c"]
errors = []


def words(t):
    return len(t.split())


def place(options, target):
    """options[0] es la tentación: la deja en `target` y reparte el resto en orden."""
    rest = [k for k in KEYS if k != target]
    return {target: options[0], rest[0]: options[1], rest[1]: options[2]}


q = lambda x, **k: json.dumps(x, **{"ensure_ascii": False, **k})
out = []
images = []
for sid, st in STORIES.items():
    for i, t in enumerate(st["texts"]):
        n = words(t)
        if "\n\n" not in t or not 30 <= n <= 55:
            errors.append(f"{sid} texto {i + 1}: {n} palabras")
    paths = []
    for ci, opts in enumerate(st["chapters"]):
        placed = place(opts, TARGET[sid][ci])
        paths.append(placed)
        for k, o in placed.items():
            n = words(o[2])
            if "\n\n" not in o[2] or not 28 <= n <= 60:
                errors.append(f"{sid} cap {ci + 1}{k}: {n} palabras")
            if THREAD[sid] not in o[2].lower():
                errors.append(f"{sid} cap {ci + 1}{k}: falta '{THREAD[sid]}'")
            images.append([sid, f"chapter-{ci + 1}-choice-{k}", o[3]])
    names = ["opening", "chapter-2", "chapter-3", "chapter-4", "chapter-5"]
    images += [[sid, n, p] for n, p in zip(names, st["scene_prompts"])]
    images.append([sid, "cover", st["cover"]])

    block = [f"  {q(sid)}: {{", f"    lesson: {q(st['lesson'])},", "    titles: ["]
    block += [f"      {q(t)}," for t in st["titles"]] + ["    ],", "    texts: ["]
    block += [f"      {q(t)}," for t in st["texts"]] + ["    ],", "    paths: ["]
    for ci, placed in enumerate(paths):
        block.append("      {")
        for k in KEYS:
            o = placed[k]
            block += [f"        {k}: {{", f"          label: {q(o[0])},", f"          title: {q(o[1])},", f"          text: {q(o[2])},"]
            if ci == 3:
                block.append(f"          lesson: {q(o[5])},")
            if o is st["chapters"][ci][0]:
                block.append(f"          temptation: {q(o[4])},")
            block.append("        },")
        block.append("      },")
    block += ["    ],", "  },"]
    out.append("\n".join(block))

if errors:
    print("\n".join(errors))
    sys.exit(1)

c = open(APP, encoding="utf8").read().replace("\r\n", "\n")
from entry_block import replace_entries  # noqa: E402
c = replace_entries(c, STORIES, out)

qz = c.index("const fableQuizFacts")
for sid, st in STORIES.items():
    facts = ",\n".join("    " + q(f) for f in st["quiz"])
    s = c.find(f'  "{sid}": [', qz)
    if s < 0:
        s = e = c.index("\n", qz) + 1
    else:
        e = c.index("  ],\n", s) + 5
    c = c[:s] + f'  "{sid}": [\n{facts},\n  ],\n' + c[e:]

lines = c.split("\n")
for n, line in enumerate(lines):
    if line.strip() == "createStoryShell(" and lines[n + 1].strip().strip('",') in STORIES:
        sh = STORIES[lines[n + 1].strip().strip('",')]["shell"]
        lines[n + 2], lines[n + 3] = f"    {q(sh[0], ensure_ascii=False)},", f"    {q(sh[1], ensure_ascii=False)},"
        lines[n + 5], lines[n + 6] = f"    {q(sh[2], ensure_ascii=False)},", f"    {q(sh[3], ensure_ascii=False)},"
c = "\n".join(lines)
open(APP, "w", encoding="utf8", newline="\r\n").write(c)
json.dump(images, open(sys.argv[1] + f"/{sys.argv[2]}_images.json", "w", encoding="utf8"), ensure_ascii=False, indent=1)
print("ok", len(images), "imágenes")
