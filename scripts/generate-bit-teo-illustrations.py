"""Generate Bit and Teo scene art from the authored story and choice copy."""

import argparse
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src/App.tsx"
GENERATOR = Path("C:/Users/Nick/.agents/skills/generador-local-imagenes/scripts/generar.py")
OUTPUT = ROOT / "src/assets/illustrations-v3"
TEMP_ROOT = Path("F:/Proyectos/ComfyUI/salidas")
STORIES = {
    "teo-taller-estrellas": "warm inventor workshop, copper gears, star making machine and glowing windows around",
    "teo-ciudad-cobre": "giant copper clock tower, brass rooftops and mechanical bird nest around",
    "teo-bosque-brujulas": "colorful forest crossroads, compass flower and three branching paths around",
    "bit-observatorio-luz": "hilltop observatory, glowing dome, night sky and metal birds around",
    "bit-lago-ecos": "enchanted lake, glowing stones, wooden pier and sunset mountains around",
    "bit-ciudad-semillas": "leafy seed house city, glowing windows and energy cables around",
}
ANGLES = ["Wide shot", "Medium shot", "Close-up", "High angle", "Wide ending shot"]
STRING = re.compile(r'"(?:\\.|[^"\\])*"')
CHOICE = re.compile(r'([abc]): \[("(?:\\.|[^"\\])*").*?, ("(?:\\.|[^"\\])*")\]')


def first_sentences(value, count=2):
    clean = value.replace("\n", " ").strip()
    parts = re.split(r"(?<=[.!?])\s+", clean)
    return " ".join(parts[:count])


def story_tasks(story_id, setting, source):
    name = story_id.split("-", 1)[0].capitalize()
    authored = re.search(rf'  "{story_id}": \{{(.*?)\n  \}},', source, re.S)
    if not authored:
        raise ValueError(f"Missing authored story: {story_id}")
    texts_match = re.search(r"texts: \[(.*?)\n    \],", authored.group(1), re.S)
    if not texts_match:
        raise ValueError(f"Missing chapter texts: {story_id}")
    texts = [json.loads(match.group()) for match in STRING.finditer(texts_match.group(1))]
    if len(texts) != 5:
        raise ValueError(f"{story_id}: {len(texts)} chapter texts")

    branch = re.search(rf'  "{story_id}": \[(.*?)\n  \],', source, re.S)
    if not branch:
        raise ValueError(f"Missing choice paths: {story_id}")
    choices = [(letter, json.loads(continuation)) for letter, _label, continuation in CHOICE.findall(branch.group(1))]
    endings = re.findall(r'([abc]): \{ label: ("(?:\\.|[^"\\])*"), title: ("(?:\\.|[^"\\])*"), text: ("(?:\\.|[^"\\])*")', authored.group(1))
    choices.extend((letter, json.loads(continuation)) for letter, _label, _title, continuation in endings)
    if len(choices) != 12 or [letter for letter, _ in choices] != list("abc" * 4):
        raise ValueError(f"{story_id}: expected four ordered choice trios, found {len(choices)}")

    seed_note = "Beside Bit stands one tiny living seed child with a green sprout on its head, little eyes and leaves. " if story_id == "bit-ciudad-semillas" else ""
    for chapter, story_text in enumerate(texts, 1):
        slot = "opening" if chapter == 1 else f"chapter-{chapter}"
        prompt = f"{ANGLES[chapter - 1]}: exactly one {name}. {seed_note}{first_sentences(story_text)} {setting}. no words, no letters, no signs, no speech bubbles"
        yield f"{story_id}-{slot}-v3.webp", prompt
    for index, (letter, continuation) in enumerate(choices):
        chapter = index // 3 + 1
        angle = ["Side view", "Close-up", "Medium shot"][index % 3]
        prompt = f"{angle}: exactly one {name}. {seed_note}{first_sentences(continuation)} {setting}. no words, no letters, no signs, no speech bubbles"
        yield f"{story_id}-chapter-{chapter}-choice-{letter}-v3.webp", prompt


def generate(story_id, setting, source, batch_size, force):
    pending = [(filename, prompt) for filename, prompt in story_tasks(story_id, setting, source) if force or not (OUTPUT / filename).exists()]
    print(f"{story_id}: {len(pending)} images remaining", flush=True)
    for start in range(0, len(pending), batch_size):
        batch = pending[start:start + batch_size]
        with tempfile.TemporaryDirectory(prefix=f"{story_id}-", dir=TEMP_ROOT) as temp_dir:
            temp = Path(temp_dir)
            frames = [{"prompt": prompt, "out": str(temp / f"frame-{index}.png")} for index, (_, prompt) in enumerate(batch)]
            batch_file = temp / "batch.json"
            batch_file.write_text(json.dumps(frames, ensure_ascii=False), encoding="utf-8")
            command = [sys.executable, str(GENERATOR), "--personaje", story_id.split("-", 1)[0], "--mundo", f"{story_id}-portada", "--ancho", "1024", "--alto", "768", "--lote", str(batch_file)]
            subprocess.run(command, cwd=ROOT, check=True)
            for (filename, _), frame in zip(batch, frames):
                with Image.open(frame["out"]) as image:
                    if image.size != (1024, 768):
                        raise ValueError(f"{filename}: unexpected size {image.size}")
                    image.convert("RGB").save(OUTPUT / filename, "WEBP", quality=90, method=6)
            print(f"{story_id}: saved {start + len(batch)}/{len(pending)}", flush=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--story", choices=STORIES)
    parser.add_argument("--batch-size", type=int, default=3)
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    if not 1 <= args.batch_size <= 4:
        parser.error("--batch-size must be between 1 and 4")
    source = SOURCE.read_text(encoding="utf-8")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for story_id, setting in STORIES.items():
        if args.story and story_id != args.story:
            continue
        if args.dry_run:
            tasks = list(story_tasks(story_id, setting, source))
            print(f"{story_id}: {len(tasks)} tasks; first={tasks[0][1]}")
        else:
            generate(story_id, setting, source, args.batch_size, args.force)


if __name__ == "__main__":
    main()
