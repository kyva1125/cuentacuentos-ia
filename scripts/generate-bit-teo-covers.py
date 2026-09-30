"""Generate review covers for the Bit and Teo story worlds."""

from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
GENERATOR = Path("C:/Users/Nick/.agents/skills/generador-local-imagenes/scripts/generar.py")
OUT = ROOT / "src/assets/style-v2"

STORIES = {
    "teo-taller-estrellas": "Teo in a warm inventor workshop beside a large star making machine with copper gears; one small white robot helps him; glowing stars shine through tall windows, no words, no letters",
    "teo-ciudad-cobre": "Teo beside a giant copper clock tower in a lively city of brass rooftops; one tiny mechanical bird rests safely in a nest among the gears, no words, no letters",
    "teo-bosque-brujulas": "Teo in a vivid forest crossroads beside a compass flower; one hedgehog, one butterfly and one tortoise look toward three different paths, no words, no letters, no signs",
    "bit-observatorio-luz": "Bit at a colorful hilltop observatory under a deep blue starry sky; a glowing dome projector, one astronomer and a small flock of metal birds flying safely overhead, no words, no letters",
    "bit-lago-ecos": "Bit on the shore of a bright enchanted lake beside one sad little frog and one lantern fish; clear water reflects glowing stones and a wooden pier, no words, no letters",
    "bit-ciudad-semillas": "Bit in a vibrant city of tiny seed houses and leafy rooftops; one house glows too brightly while nearby seed homes wait in darkness; Bit holds a small glowing cable bridge, no words, no letters",
}

for story, prompt in STORIES.items():
    target = OUT / f"{story}-cover-v3.webp"
    if target.exists():
        print(f"exists: {target.name}", flush=True)
        continue
    character = story.split("-", 1)[0]
    command = [sys.executable, str(GENERATOR), "--modo", "portada", "--personaje", character, "--prompt", prompt, "--out", str(target)]
    print(f"generating: {target.name}", flush=True)
    subprocess.run(command, cwd=ROOT, check=True)
