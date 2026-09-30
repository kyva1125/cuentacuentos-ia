"""Generate the approved Suri and Rok story scenes with the local art skill."""

import argparse
import json
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / ".generador" / "suri-rok-scenes.json"
GENERATOR = Path("C:/Users/Nick/.agents/skills/generador-local-imagenes/scripts/generar.py")
OUTPUT = ROOT / "src" / "assets" / "illustrations-v3"
TEMP_ROOT = Path("F:/Proyectos/ComfyUI/salidas")
CHOICES = "abc"


def story_tasks(story_id, story):
    scenes = story["scenes"]
    choices = story["choices"]
    if len(scenes) != 5 or len(choices) != 4 or any(len(row) != 3 for row in choices):
        raise ValueError(f"{story_id}: expected five scenes and four sets of three choices")
    for chapter, prompt in enumerate(scenes, 1):
        name = "opening" if chapter == 1 else f"chapter-{chapter}"
        yield f"{story_id}-{name}-v3.webp", prompt
    for chapter, row in enumerate(choices, 1):
        for key, prompt in zip(CHOICES, row):
            yield f"{story_id}-chapter-{chapter}-choice-{key}-v3.webp", prompt


def generate_story(story_id, story, batch_size, force):
    protagonist = story_id.split("-", 1)[0]
    pending = [(name, prompt) for name, prompt in story_tasks(story_id, story) if force or not (OUTPUT / name).exists()]
    print(f"{story_id}: {len(pending)} images remaining", flush=True)
    for start in range(0, len(pending), batch_size):
        batch = pending[start:start + batch_size]
        with tempfile.TemporaryDirectory(prefix=f"{story_id}-", dir=TEMP_ROOT) as temp_dir:
            temp = Path(temp_dir)
            frames = []
            for index, (name, prompt) in enumerate(batch):
                frames.append({
                    "prompt": f"{prompt}, no words, no letters",
                    "out": str(temp / f"frame-{index}.png"),
                })
            batch_file = temp / "batch.json"
            batch_file.write_text(json.dumps(frames, ensure_ascii=False), encoding="utf-8")
            cmd = [
                sys.executable, str(GENERATOR),
                "--personaje", protagonist,
                "--mundo", f"{story_id}-portada",
                "--ancho", "1024", "--alto", "768",
                "--lote", str(batch_file),
            ]
            subprocess.run(cmd, cwd=ROOT, check=True)
            for (name, _), frame in zip(batch, frames):
                with Image.open(frame["out"]) as image:
                    if image.size != (1024, 768):
                        raise ValueError(f"{name}: unexpected size {image.size}")
                    image.convert("RGB").save(OUTPUT / name, "WEBP", quality=90, method=6)
            print(f"{story_id}: saved {start + len(batch)}/{len(pending)}", flush=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--story", choices=json.loads(MANIFEST.read_text(encoding="utf-8")).keys())
    parser.add_argument("--batch-size", type=int, default=3)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    if args.batch_size < 1 or args.batch_size > 4:
        parser.error("--batch-size must be between 1 and 4")
    stories = json.loads(MANIFEST.read_text(encoding="utf-8"))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for story_id, story in stories.items():
        if args.story and story_id != args.story:
            continue
        generate_story(story_id, story, args.batch_size, args.force)


if __name__ == "__main__":
    main()
