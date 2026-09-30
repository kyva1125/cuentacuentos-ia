"""Generate the two Nia story worlds from their approved cover references."""

from pathlib import Path
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
GENERATOR = Path("C:/Users/Nick/.agents/skills/generador-local-imagenes/scripts/generar.py")
OUT = ROOT / "src/assets/illustrations-v3"

STORIES = {
    "rio-cantor": {
        "world": "nia-rio-portada",
        "setting": "winding singing river, mossy waterfall, colorful musical light notes, vivid warm forest, no words, no letters",
        "scenes": [
            "Nia meets one proud brown owl beside a silent river; one glowing red musical note floats over the water at dawn",
            "Nia carries the red glowing note while one brown owl tries to sing with it alone; tracks lead toward a waterfall where a blue note shines",
            "Nia helps one brown owl up from slippery stones beside the mossy waterfall; a blue note glows behind the moss and one deer waits at a river fork",
            "One deer guides Nia and one brown owl along the calm current to a green note glowing beneath a stone; the owl hesitates before sharing it",
            "Nia, one brown owl and one deer happily sing beside the flowing river as three red blue and green notes shine together; stones seem to dance",
        ],
        "choices": [
            [
                "Nia carefully crosses wet stepping stones to pick up the red glowing note while one brown owl slips nearby",
                "Nia follows a trail of red light left by the red note in the sand while one brown owl looks on in surprise",
                "Nia asks one deer to guide her across firm stones toward the red note while one brown owl watches",
            ],
            [
                "Nia extends a branch to help one brown owl out of slippery rocks beside the waterfall; blue note glows behind moss",
                "Nia compares glowing tracks with a blank map and points to moss behind the waterfall where the blue note waits; one owl beside her",
                "Nia listens to one small forest guardian beside the waterfall pointing to the hidden blue note; one owl thanks the guardian",
            ],
            [
                "Nia follows one deer along the calm river current while one brown owl travels beside them toward a green note under a stone",
                "Nia listens to red and blue glowing notes in her hands; their echo points to the quiet river current and the hidden green note",
                "Nia lets one deer lead her and one brown owl across the river fork toward the green note beneath a stone",
            ],
            [
                "Nia crosses wet stones carefully toward the green note while one brown owl follows her safe footsteps",
                "Nia tests three glowing red blue and green notes together beside the river while one brown owl listens closely",
                "Nia invites one brown owl and one deer to sing together around three glowing notes as the river begins to dance",
            ],
        ],
    },
    "faro-nubes": {
        "world": "nia-faro-portada",
        "setting": "cloud lighthouse, glowing lantern, warm colorful sky, distant lost birds, no words, no letters",
        "scenes": [
            "Nia meets proud cloud Alba, who tries to hold every light alone; her heavy lantern dims while lost birds wait in mist",
            "Alba stumbles under the lantern, and Nia points to the waiting birds as a tiny blue cloud offers help",
            "Nia draws a wind route on a blank map while Alba listens to several clouds and the birds are visible far away",
            "Nia and clouds place colorful lights inside the lighthouse lens; Alba shares the weight and a bright beam reaches the birds",
            "The birds return home safely; Alba thanks the little blue cloud and they tend the shining lighthouse together with Nia",
        ],
        "choices": [
            [
                "Nia catches the falling heavy lantern while Alba struggles nearby",
                "Nia examines the dim lantern and sees it is too heavy for Alba to carry alone",
                "Nia listens to a tiny blue cloud offering her light while Alba hesitates and lost birds wait",
            ],
            [
                "Nia holds one side of the heavy lantern, a tiny blue cloud holds the other, and Alba catches her breath",
                "Nia draws wind currents on a blank map as Alba watches and the clouds point out a hidden route",
                "Nia asks several clouds about their routes as Alba listens and they gather around a blank map",
            ],
            [
                "Nia climbs to the lighthouse lens carrying a light while Alba holds the lantern and birds fly beyond",
                "Nia compares a blank map with cloud shadows before turning the lighthouse lens toward a safe route",
                "Nia invites different clouds to place colorful lights in the lighthouse lens while Alba helps",
            ],
            [
                "Nia steadies the lantern in a strong gust while Alba and a tiny blue cloud support it; birds follow the beam",
                "Nia checks the wind map and aims the beam away from a storm, guiding the birds safely",
                "Nia invites each cloud to contribute a light to the lens; Alba welcomes the tiniest cloud and the lighthouse glows",
            ],
        ],
    },
    "jardin-gigantes": {
        "world": "nia-jardin-portada",
        "setting": "enchanted garden, giant orange flower, tiny seed and stone fountain, rich warm colors, no words, no letters",
        "scenes": [
            "Nia kneels beside a tiny seed while a giant flower mocks it; the stone fountain has run dry",
            "Nia follows the tiny seed's root under the soil toward a leaf-blocked irrigation channel while the giant flower watches",
            "Nia and a caterpillar and hedgehog clear leaves from the channel; water runs toward the fountain but a root knot blocks it",
            "The tiny seed guides Nia to gently loosen a root knot beneath the fountain while the giant flower holds the stone basin",
            "The seed sprouts beside the flowing fountain; the giant flower shades it and Nia celebrates with the caterpillar and hedgehog",
        ],
        "choices": [
            [
                "Nia stands protectively beside the tiny seed as the giant flower mocks it; a root trail leads beneath the soil",
                "Nia touches damp soil beside the tiny seed and discovers the irrigation channel under the giant flower",
                "Nia listens closely to the tiny seed while the giant flower looks surprised; leaf-covered channel nearby",
            ],
            [
                "Nia carefully clears fallen leaves from the irrigation channel so water flows toward the fountain",
                "Nia follows the water along the channel and notices a delicate root knot underneath the fountain",
                "Nia, one caterpillar and one hedgehog together clear leaves from the channel as water reaches the fountain",
            ],
            [
                "Nia stops the giant flower from yanking a delicate root; the tiny seed shows how to handle the knot",
                "Nia examines the tangled root beneath the fountain from close up and finds a loose loop",
                "Nia listens to the tiny seed explain the root knot while the giant flower carefully holds the fountain",
            ],
            [
                "Nia asks the giant flower to hold the fountain steady while the tiny seed releases the knot and water returns",
                "Nia follows the root to its knot under the fountain and gently loosens it without breaking it",
                "Nia gathers one caterpillar, one hedgehog and the giant flower to clear leaves, hold the fountain and protect the tiny seed",
            ],
        ],
    },
}


def generate(story_id: str, name: str, prompt: str, world: str, setting: str) -> None:
    target = OUT / f"{story_id}-{name}-v3.webp"
    if target.exists():
        return
    command = [
        sys.executable, str(GENERATOR), "--personaje", "nia", "--mundo", world,
        "--prompt", f"Exactly one Nia. {prompt}. {setting}", "--out", str(target),
    ]
    print(f"Generating {target.name}", flush=True)
    subprocess.run(command, cwd=ROOT, check=True)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for story_id, data in STORIES.items():
        world = data["world"]
        setting = data["setting"]
        for chapter, prompt in enumerate(data["scenes"], 1):
            name = "opening" if chapter == 1 else f"chapter-{chapter}"
            generate(story_id, name, prompt, world, setting)
        for chapter, options in enumerate(data["choices"], 1):
            for option, prompt in zip("abc", options):
                generate(story_id, f"chapter-{chapter}-choice-{option}", prompt, world, setting)


if __name__ == "__main__":
    main()
