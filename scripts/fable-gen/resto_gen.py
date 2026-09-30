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
    "bruno": ("Bruno the beaver", "a friendly brown beaver standing on two legs, big front teeth, flat paddle tail, a normal beaver", "Bruno is a beaver with two arms, two legs and one flat paddle tail"),
    "olivia": ("Olivia the owl", "a wise old brown owl with round glasses-like eye rings and soft feathers, a normal owl bird", "Olivia is an owl with two wings and two talons"),
    "tomas": ("Tomas the mole", "a small velvety dark grey mole gardener with pink hands and nose, tiny eyes, wearing a little green apron, a normal mole", "Tomas is a mole with two arms and two short legs"),
    "oruga": ("the giant caterpillar", "a huge friendly plump green caterpillar with round segments, stubby legs and big hungry eyes", "the giant caterpillar is a long segmented green caterpillar"),
    "lia": ("Lia the mouse", "a tiny grey mouse apprentice with big round ears, a pink nose and a small tool belt, a normal mouse", "Lia is a mouse with two arms, two legs and one thin tail"),
    "ada": ("Ada the ant", "a cheerful red ant standing on her back legs, two antennae, a small scarf, a normal ant", "Ada is an ant with six thin legs and two antennae"),
    "pinto": ("Pinto the woodpecker", "a lively woodpecker with a red cap, black and white feathers and a strong beak, a normal bird", "Pinto is a woodpecker with two wings and two feet"),
    "pia": ("Pia the swallow", "a small elegant blue and white swallow with a forked tail and a red throat, a normal bird", "Pia is a swallow with two wings and a forked tail"),
    "ruli": ("Ruli the frog", "a small cute green frog with big golden eyes and a pale belly, a normal frog", "Ruli is a frog with four legs"),
    "chispa": ("Chispa the squirrel", "a nimble red squirrel with a big fluffy tail and tufted ears, a normal squirrel", "Chispa is a squirrel with four legs and one fluffy tail"),
    "brisa": ("Brisa the hare", "a slender light brown hare with long ears and long hind legs, a normal hare", "Brisa is a hare with four legs and two long ears"),
    "lumi": ("Lumi the firefly", "a tiny cute firefly with a softly glowing yellow tail light and small wings, a normal firefly", "Lumi is a tiny firefly with a glowing tail"),
    "tobi": ("Tobi the field mouse", "a small brown field mouse with big ears and a brave little face, a normal mouse", "Tobi is a mouse with two arms, two legs and one thin tail"),
    "cuervo": ("the crow", "a big glossy black crow with a round full belly and clever eyes, a normal crow", "the crow is a bird with two wings and two feet"),
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
    images = json.load(open(S + "/resto_data_images.json", encoding="utf8"))
    sys.path.insert(0, S)
    from resto_data import STORIES, OWNER
    for sid, name, prompt in images:
        if (fase == "portadas") != (name == "cover"):
            continue
        if solo and f"{sid}-{name}" not in solo and sid not in solo:
            continue
        tail = STORIES[sid]["tail"]
        if name == "cover":
            out = f"{REPO}/src/assets/fable/covers/{sid}-cover.webp"
            run(["--personaje", OWNER[sid], *extras(prompt), "--modo", "portada", "--seed", SEED, "--prompt",
                 f"{prompt}, {tail}, storybook cover illustration, {NW}"], out)
        else:
            if os.path.exists(f"{OUT}/{sid}-{name}.webp"):
                continue
            run(["--personaje", OWNER[sid], *extras(prompt), "--seed", SEED, "--prompt", f"{prompt}, {tail}, {NW}"],
                f"{OUT}/{sid}-{name}.webp")


main()
