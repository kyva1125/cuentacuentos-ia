"""Escenas fábula de Rok, v2: sin --mundo (copiaba la composición), planos variados y acción visible.

Los prompts están escritos con la tentación en "a"; TARGET la mueve a su posición final
(igual que tentaciones.cjs hizo con el texto).
"""
import json
import os
import subprocess
import sys

REPO = "F:/Proyectos/cuentos"
G = "C:/Users/Nick/.agents/skills/generador-local-imagenes/scripts/generar.py"
SCENES = os.environ.get("OUT_DIR", REPO + "/src/assets/illustrations-fable")
S = "C:/Users/Nick/AppData/Local/Temp/claude/F--Proyectos-cuentos/1a30edf4-ce42-4a2e-8e0a-a59cc0080e68/scratchpad"
TARGET = json.load(open(S + "/rok-target.json"))
NW = "no words, no letters"

PIPO = "Pipo the tiny bat"
TULA = "Grandma Tula the tortoise"
BERTA = "Berta the goat"
CAVE = "cave with glowing golden crystals"
VALLEY = "green valley with a wooden plank bridge over a river, small cottages and an apple tree"
VILLAGE = "cozy stone village with a big stone bread oven"

STORIES = {
    "rok-cueva-ecos": {
        "extra": "only one bat",
        "tail": CAVE,
        "scenes": {
            "opening": f"Wide shot at the entrance of a cave: Rok the little dragon roars proudly with his chest puffed out and a big laugh, while {PIPO} peeks shyly from a crack in the rock wall, warm sunset light outside",
            "chapter-2": f"Back view: Rok walks into a dark cave with {PIPO} riding on one of his horns, Rok's small flame lights only one step, three black tunnel openings ahead",
            "chapter-3": f"Low angle wide shot of a huge cave chamber: a giant golden crystal pillar from floor to ceiling, Rok stares at it with greedy sparkling eyes rubbing his claws, {PIPO} looks worried at the ceiling",
            "chapter-4": f"Almost dark cave lit only by faint golden glints, Rok's flame is out, a water drop falls on his nose, his eyes wide and scared, {PIPO} a tiny shape nearby",
            "chapter-5": f"Wide shot from outside: Rok and {PIPO} come out of the cave mouth into warm sunset light, Pipo flies ahead guiding, Rok smiles gratefully",
            "chapter-1-choice-a": f"Rok marches alone into the dark cave with his chest puffed out and bumps his nose on a rock, stars around his head, surprised face, {PIPO} secretly follows far behind",
            "chapter-1-choice-b": f"Close-up: Rok at the cave entrance with a paw cupped to his ear, eyes closed, listening carefully to the echoes, {PIPO} beside him wiggling his big ears",
            "chapter-1-choice-c": f"Rok, a bit reluctant with a sideways look, lets {PIPO} land on his horn, Pipo is very happy, at the cave entrance",
            "chapter-2-choice-a": f"Close-up side view: Rok is stuck by his round belly in a very narrow rock tunnel, embarrassed blushing face, while {PIPO} pulls his claw with both tiny wings",
            "chapter-2-choice-b": f"Low angle: Rok follows a trail of glittering gold dust on the cave floor with his nose close to the ground like a detective, {PIPO} on his horn",
            "chapter-2-choice-c": f"Close-up of {PIPO} squeaking with eyes closed, sound rings in the air, pointing with his wing at one of three tunnels, Rok behind him looking doubtful",
            "chapter-3-choice-a": f"Wide low angle shot of a huge cave chamber: Rok hugs a giant golden crystal pillar and pulls it with all his strength, straining face, cracks spread across the ceiling and small rocks fall, dust clouds, {PIPO} flies away alarmed",
            "chapter-3-choice-b": f"Close-up: Rok carefully examines where a giant golden crystal pillar touches the cave ceiling, thoughtful face, one claw on his chin, {PIPO} nearby",
            "chapter-3-choice-c": f"{PIPO} explains, pointing up at the cave ceiling held up by a giant golden crystal pillar, while Rok grumbles with arms crossed",
            "chapter-4-choice-a": f"Rok throws his head back and ROARS with his mouth wide open, big curved sound lines fill the dim cave and bounce off every wall, while {PIPO} covers his big ears with his wings",
            "chapter-4-choice-b": f"In a dim cave {PIPO} flies ahead squeaking, soft echo rings drawn in the air, Rok follows quietly on tiptoe, curious",
            "chapter-4-choice-c": f"Close-up: Rok apologizes to {PIPO} with a humble sorry face and lowered head, Pipo smiles kindly, dim golden glints of a cave",
        },
    },
    "rok-valle-promesas": {
        "extra": "only one goat, only one dragon",
        "tail": VALLEY,
        "scenes": {
            "opening": f"Wide shot: Rok the little dragon happily says yes with both arms up to a rabbit pointing at his cottage roof and a squirrel holding a hammer, while {BERTA} stands calmly to the side with a coiled rope, storm clouds far away",
            "chapter-2": f"Close-up: Rok holds a long paper list showing only three small drawings (a bridge, a roof and an apple) and gulps, worried, while {BERTA} walks by calmly in the background with a rope on her shoulder",
            "chapter-3": f"Rok and {BERTA} tie the wooden planks of a bridge over a river with a rope, lightning far away, a rabbit shouts from a cottage with water dripping from its roof",
            "chapter-4": "Low angle: the hedgehog under an apple tree full of red apples looks up hopefully at Rok, who looks very tired with drooping wings, strong storm wind blowing leaves",
            "chapter-5": "Sunrise after the storm, puddles shining: Rok and the hedgehog fill baskets with red apples together, both smiling",
            "chapter-1-choice-a": f"Rok eagerly raises his claw to promise even more, pointing at a windmill on a hill, too excited, while {BERTA} raises an eyebrow",
            "chapter-1-choice-b": "Close-up from above: Rok sits on a rock drawing three small pictures (a bridge, a roof and an apple) on a paper with his claw, gulping, worried eyes",
            "chapter-1-choice-c": f"Rok asks {BERTA}, who explains calmly holding up one hoof, Rok listens with his head tilted",
            "chapter-2-choice-a": "Wide shot: Rok flies frantically between a cottage roof, a wooden bridge and an apple tree, a hammer falls into the river with a splash, funny chaos",
            "chapter-2-choice-b": f"Rok flies straight and determined toward the wooden bridge where {BERTA} waits with a rope",
            "chapter-2-choice-c": "Rok kneels to talk kindly to the hedgehog next to an apple tree, the hedgehog nods gratefully",
            "chapter-3-choice-a": f"Wide shot: the half-tied wooden bridge breaks loose in the wind, planks dance over the river, {BERTA} stands on the bank holding the rope with her teeth, while Rok runs back along the riverbank on his two feet, alarmed",
            "chapter-3-choice-b": f"Close-up: Rok and {BERTA} pull the last knot tight on the wooden bridge, both proud",
            "chapter-3-choice-c": "Rok calls the neighbours with his claws around his mouth, three squirrels and a mole carry big leaves to a rabbit's leaking cottage roof",
            "chapter-4-choice-a": "Night storm: Rok has fallen asleep on a branch of an apple tree, snoring, apples fall in the wind below him",
            "chapter-4-choice-b": "Close-up: Rok honestly tells the hedgehog he cannot help today, the hedgehog covers his apples with a blanket, understanding smile",
            "chapter-4-choice-c": f"Rok, {BERTA} and animal neighbours pick apples together, shaking branches and catching apples in baskets as the first rain drops fall",
        },
    },
    "rok-nube-volcan": {
        "extra": "only one dragon",
        "tail": VILLAGE,
        "scenes": {
            "opening": f"Rok the little dragon boasts proudly with his chin up in front of a big stone bread oven, while {TULA} smiles calmly holding a bowl of dough",
            "chapter-2": f"Wide shot of a stone bakery: on the left, Rok the little dragon crouches and blows gently on glowing orange embers; on the far right, {TULA} stands apart by the table, nodding with a proud smile, the two stand well apart",
            "chapter-3": f"Ten baskets of golden bread on a table, Rok looks at the sky wanting to fly, while {TULA} points at a small bridge over a river",
            "chapter-4": f"Village festival plaza with colorful bunting: Rok and {TULA} at a starting line, each holding an egg on a spoon, Rok grins overconfident",
            "chapter-5": f"Rok and {TULA} carefully cross the finish line with eggs on spoons, villagers cheering, festival bunting",
            "chapter-1-choice-a": f"Rok blows a huge roaring blast of fire into the stone bread oven, black smoke everywhere, {TULA} coughing and waving the smoke away",
            "chapter-1-choice-b": f"Wide shot of a stone bakery: on the right, {TULA} bends to blow softly on the glowing embers of the stone oven; on the far left, Rok the little dragon stands apart watching her, curious, head tilted, the two stand well apart",
            "chapter-1-choice-c": f"{TULA} explains with a raised finger while Rok blows very gently and little orange embers glow in the stone oven",
            "chapter-2-choice-a": f"Rok impatiently shoves flat unrisen dough into the oven too early, {TULA} shakes her head",
            "chapter-2-choice-b": f"Close-up on a bowl of bread dough: {TULA} shows Rok how to poke the dough with a finger, Rok tests carefully with one claw",
            "chapter-2-choice-c": "Village street: Rok plays hide and seek badly with village children (ordinary human children), his tail sticks out from behind a barrel, the children laugh",
            "chapter-3-choice-a": "Wide shot: Rok flies over a river carrying ten wobbling bread baskets, loaves fall into the water, ducks cheer",
            "chapter-3-choice-b": "Rok flies steadily over a river, holding one bread basket full of loaves firmly in each claw, two baskets only, calm careful smile, nothing falls",
            "chapter-3-choice-c": "High angle: a line of village children (ordinary human children) cross a small bridge each carrying a bread basket, Rok flies above watching like a big bird",
            "chapter-4-choice-a": f"Action shot: Rok sprints fast in an egg-and-spoon race, the egg flies off his spoon, splat, while {TULA} walks slowly behind",
            "chapter-4-choice-b": f"Rok watches {TULA}'s careful small steps and copies her, egg balanced on his spoon, festival plaza",
            "chapter-4-choice-c": f"Rok walks side by side with {TULA} in the egg-and-spoon race, both smiling, villagers cheering",
        },
    },
}


def final_name(sid, name):
    """Aplica el intercambio a<->tentación del capítulo a los nombres de las opciones."""
    if "-choice-" not in name:
        return name
    chapter = int(name.split("-")[1])
    key = name[-1]
    t = TARGET[sid][chapter - 1]
    if key == "a":
        key = t
    elif key == t:
        key = "a"
    return f"chapter-{chapter}-choice-{key}"


solo = sys.argv[1:]
for sid, st in STORIES.items():
    for name, prompt in st["scenes"].items():
        if solo and f"{sid}-{final_name(sid, name)}" not in solo and sid not in solo:
            continue
        out = f"{SCENES}/{sid}-{final_name(sid, name)}.webp"
        extra = [a for k, n in (("tula", "Tula"), ("berta", "Berta"), ("pipo", "Pipo"), ("erizo", "hedgehog"))
                 if n in prompt for a in ("--personaje", k)]
        r = subprocess.run([sys.executable, G, "--personaje", "rok", *extra, "--sin-estilo", "--sin-pixelar", "--seed", os.environ.get("SEED", "202"),
                            "--prompt", f"{prompt}, Rok has exactly two legs, two arms, two wings and one tail, {st['tail']}, {st['extra']}, {NW}", "--out", out],
                           cwd=REPO, capture_output=True, text=True)
        print((r.stdout.strip().splitlines() or ["?"])[-1], flush=True)
        if r.returncode:
            print(r.stderr[-600:], flush=True)
