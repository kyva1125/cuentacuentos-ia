"""Fichas de secundarios, portadas y escenas de Luma. Uso: luma_gen.py [fichas|portadas|escenas] [solo...]"""
import json
import os
import subprocess
import sys

REPO = "F:/Proyectos/cuentos"
G = "C:/Users/Nick/.agents/skills/generador-local-imagenes/scripts/generar.py"
S = os.path.dirname(os.path.abspath(__file__))
SEED = os.environ.get("SEED", "202")
OUT = os.environ.get("OUT_DIR", REPO + "/src/assets/illustrations-fable")
NW = "no words, no letters"

SEC = {
    "brillo": ("Brillo the seagull", "a handsome elegant white seagull with shiny glossy feathers, grey wings and a charming smile, a normal seagull bird",
               "Brillo is a seagull with two wings and two webbed feet"),
    "ermo": ("Don Ermo the hermit crab", "a grumpy old hermit crab living in a big worn spiral sea shell, bushy eyebrows, two big claws, a normal hermit crab",
             "Don Ermo is a small crab with two claws and thin legs, carrying his spiral shell"),
    "tino": ("Tino the otter", "a cheerful brown river otter standing on two legs, round face, whiskers, a normal otter animal",
             "Tino is an otter with two arms, two legs and a thick otter tail"),
    "nacar": ("Nacar the sea turtle", "a wise gentle green sea turtle with a patterned shell and four flippers, kind old eyes, a normal sea turtle",
              "Nacar is a sea turtle with four flippers and a patterned shell"),
    "urraca": ("the magpie", "a clever black and white magpie bird with a long tail and glossy blue-black wings, a normal magpie",
               "the magpie is a bird with two wings and two thin legs"),
}


def run(args, out):
    r = subprocess.run([sys.executable, G, *args, "--sin-estilo", "--sin-pixelar", "--out", out],
                       cwd=REPO, capture_output=True, text=True)
    print((r.stdout.strip().splitlines() or ["?"])[-1], flush=True)
    if r.returncode:
        print(r.stderr[-500:], flush=True)


def fichas():
    os.makedirs(REPO + "/src/assets/fable/secundarios", exist_ok=True)
    f = REPO + "/.generador/ficha.json"
    g = json.load(open(f, encoding="utf8"))
    for k, (name, desc, anat) in SEC.items():
        out = f"{REPO}/src/assets/fable/secundarios/{k}.webp"
        if not os.path.exists(out):
            run(["--sin-ref", "--modo", "portada", "--seed", "22", "--prompt",
                 f"Character sheet portrait of {desc}, single character only, full body, three-quarter view, centered, plain warm cream aged paper background, no scenery, {NW}"], out)
        g["personajes"][k] = {"nombre": name, "ref": f"src/assets/fable/secundarios/{k}.webp", "descripcion": desc, "anatomia": anat}
    json.dump(g, open(f, "w", encoding="utf8"), ensure_ascii=False, indent=2)


def extras(prompt):
    return [a for k, (name, _, _) in SEC.items() if name in prompt for a in ("--personaje", k)]


def main():
    fase = sys.argv[1]
    solo = sys.argv[2:]
    if fase == "fichas":
        return fichas()
    images = json.load(open(S + "/luma_images.json", encoding="utf8"))
    sys.path.insert(0, S)
    from luma_data import STORIES
    for sid, name, prompt in images:
        if (fase == "portadas") != (name == "cover"):
            continue
        if solo and f"{sid}-{name}" not in solo and sid not in solo:
            continue
        tail = STORIES[sid]["tail"]
        if name == "cover":
            out = f"{REPO}/src/assets/fable/covers/{sid}-cover.webp"
            run(["--personaje", "luma", *extras(prompt), "--modo", "portada", "--seed", SEED, "--prompt",
                 f"{prompt}, {tail}, storybook cover illustration, {NW}"], out)
        else:
            run(["--personaje", "luma", *extras(prompt), "--seed", SEED, "--prompt", f"{prompt}, {tail}, {NW}"],
                f"{OUT}/{sid}-{name}.webp")


main()
