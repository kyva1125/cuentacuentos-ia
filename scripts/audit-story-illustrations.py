"""Create labeled contact sheets and report obvious asset problems."""

from collections import defaultdict
from hashlib import sha256
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SCENES = ROOT / "src/assets/illustrations-v3"
COVERS = ROOT / "src/assets/style-v2"
SHEETS = Path("F:/Proyectos/ComfyUI/salidas/audit-cuentos")
STORIES = (
    "faro-nubes", "jardin-gigantes", "rio-cantor",
    "teo-taller-estrellas", "teo-ciudad-cobre", "teo-bosque-brujulas",
    "bit-observatorio-luz", "bit-lago-ecos", "bit-ciudad-semillas",
    "luma-faro-mareas", "luma-isla-barcas", "luma-arrecife-cristal",
    "rok-cueva-ecos", "rok-valle-promesas", "rok-nube-volcan",
    "suri-lago-reflejos", "suri-arbol-luciernagas", "suri-sendero-semillas",
)


def slots():
    yield "opening"
    for chapter in range(1, 6):
        if chapter > 1:
            yield f"chapter-{chapter}"
        if chapter < 5:
            for choice in "abc":
                yield f"chapter-{chapter}-choice-{choice}"


def main():
    SHEETS.mkdir(parents=True, exist_ok=True)
    hashes = defaultdict(list)
    problems = []
    covers_sheet = Image.new("RGB", (1200, 1230), "#f0efe9")
    covers_draw = ImageDraw.Draw(covers_sheet)
    for story in STORIES:
        cover = COVERS / f"{story}-cover-v3.webp"
        cover_index = STORIES.index(story)
        cover_x = (cover_index % 6) * 200
        cover_y = (cover_index // 6) * 410
        covers_draw.text((cover_x + 5, cover_y + 3), story[:24], fill="#111111")
        if not cover.exists():
            problems.append(f"MISSING COVER {cover.name}")
        else:
            try:
                with Image.open(cover) as image:
                    if image.format != "WEBP" or image.width != image.height:
                        problems.append(f"COVER FORMAT {cover.name}: {image.format} {image.size}")
                    image.thumbnail((190, 380))
                    covers_sheet.paste(image.convert("RGB"), (cover_x + 5, cover_y + 25))
            except Exception as error:
                problems.append(f"INVALID COVER {cover.name}: {error}")
        sheet = Image.new("RGB", (1200, 1120), "#f0efe9")
        draw = ImageDraw.Draw(sheet)
        draw.text((12, 8), story, fill="#111111")
        for index, slot in enumerate(slots()):
            path = SCENES / f"{story}-{slot}-v3.webp"
            x = (index % 4) * 300
            y = (index // 4) * 220 + 32
            draw.text((x + 8, y), slot, fill="#111111")
            if not path.exists():
                problems.append(f"MISSING {path.name}")
                continue
            hashes[sha256(path.read_bytes()).hexdigest()].append(path.name)
            try:
                with Image.open(path) as image:
                    if image.format != "WEBP" or image.size != (1024, 768):
                        problems.append(f"FORMAT {path.name}: {image.format} {image.size}")
                    image.thumbnail((288, 190))
                    sheet.paste(image.convert("RGB"), (x + 6, y + 20))
            except Exception as error:
                problems.append(f"INVALID {path.name}: {error}")
        sheet.save(SHEETS / f"{story}.jpg", quality=86)
    covers_sheet.save(SHEETS / "covers.jpg", quality=88)
    for same in hashes.values():
        if len(same) > 1:
            problems.append(f"DUPLICATE {', '.join(same)}")
    print(f"Stories: {len(STORIES)}; expected illustrations: {len(STORIES) * 17}")
    print(f"Unique valid file hashes: {len(hashes)}")
    print(f"Contact sheets: {SHEETS}")
    print("Problems:")
    print("\n".join(problems) if problems else "none")


if __name__ == "__main__":
    main()
