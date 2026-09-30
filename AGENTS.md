# Repository Guidelines

## Project Structure & Module Organization

This repository is currently an empty starter workspace. Keep the root limited to project metadata and top-level documentation. As the project grows, use a predictable layout:

- `src/` — application or library source files.
- `tests/` — automated tests that mirror the paths in `src/`.
- `assets/` — version-controlled static resources, such as story media or templates.
- `docs/` — longer project documentation and design notes.

Avoid placing generated files, local caches, or editor settings in the repository root. Add tool-specific ignore rules before introducing build output.

## Image Generation

**Current instruction from Nick, 29 September 2026:** use Google Flow for images in this project, through `gflow` and his authenticated web subscription. This supersedes the local-generator requirement and the restriction on other generators below. Never use the unrelated `flow` command. Preserve the classic fable style and the character sheets as references, review every result enlarged, and deliver upload images as WebP. If `gflow` needs renewed login, ask Nick to sign in through Brave; do not switch to another generator. Videos and songs still require explicit credit approval.

The local-generator commands below are historical workflow references, not the current generation method.

Story images are generated FROM the six app characters (`src/assets/fable/characters/`: nia, teo, luma, rok, bit, suri) in the classic fable style. All of it lives in `.generador/ficha.json`; run from inside the repo and the generator picks it up automatically:

```bash
python C:/Users/Nick/.agents/skills/generador-local-imagenes/scripts/generar.py \
  --personaje rok --personaje tula --sin-estilo --sin-pixelar \
  --prompt "Close-up: Rok watches Grandma Tula the tortoise blow softly on the oven embers, curious, cozy stone village with a big stone bread oven, no words, no letters" \
  --out src/assets/illustrations-fable/<story-id>-chapter-<n>.webp
```

Pass every app character that appears with `--personaje` (repeatable). Describe the scene, the character's **concrete emotion**, and any secondary character in `--prompt`. **Every recurring secondary character needs its own sheet** in `src/assets/fable/secundarios/`, registered under `personajes` in `ficha.json` and passed with `--personaje` (tula, berta, pipo, erizo); otherwise it inherits the protagonist's traits (a goat with wings, a grandma dragon). Every character in `ficha.json` has an `anatomia` field that `.generador/hooks.py` appends to the prompt automatically; give every new character one, written in positive terms, because Flux does not understand negations. Never restate the style or the protagonists' outfits. Scenes are 1024x768; use `--modo portada` for square library covers. When two green or similar characters (Rok and Tula) or a winged and a wingless one (Rok and Berta) share a close-up, the model mixes their traits: place them apart ("on the left… on the far right…, the two stand well apart"), or leave the protagonist out of the shot if the text allows it. Generate two or three seeds for each hard scene and keep the correct one. Always pass `--sin-estilo --sin-pixelar`, and never pixelate or quantize.

**Project art style (Nick changed it on 27 Sept 2026): classic fable book.** Pen-and-ink and watercolor on cream paper, earthy tones with warm glowing accents, and the protagonists drawn as **cute young children** from their sheets in `src/assets/fable/characters/`. `.generador/ficha.json` already carries this style and these references. The pixel art (`src/assets/illustrations-v3/`, `.generador/mundos/`, `estilo-referencia.png`) is the previous style: do not use it as a reference. Do not introduce other styles, generators, or paid services. The pilot is Rok's three stories.

Workflow for a whole story (a cover plus 17 scenes: `<story-id>-opening.webp`, `-chapter-<2..5>.webp`, `-chapter-<1..4>-choice-<a|b|c>.webp` in `src/assets/illustrations-fable/`; the app prefers them over the v3 pixel art):

1. **Write or rewrite the text first**, because every image must show what the text says.
2. Make the **cover** (`--modo portada --personaje <owner>`) in `src/assets/fable/covers/<story-id>-cover.webp`, and get Nick's approval.
3. Generate every scene **without** `--mundo`, because it copies the cover's composition and every image comes out the same. Instead, vary the shot (wide, close-up, low angle) and end the prompt with the setting's key elements. A choice image shows the moment of the action its option describes, because it becomes the large image of the next chapter.
4. Review every image before installing it, **enlarged, not only in a thumbnail sheet** (a third leg does not show up in a thumbnail). Count each character's legs, arms, wings and tails. Reject extra or missing limbs, tails that belong to another character (a tortoise with a dragon tail, a child with a tail), duplicated characters, characters nobody asked for, invented text (add "no words, no letters"), Bit with a nose or mouth, and images that do not show what the option says.

**Stories are Aesop-style fables for 8-year-olds.** The **protagonist** has a small flaw that comes from their personality, and a secondary character stands for the opposite. The world is concrete and simple: few characters, one goal, and everyday objects. Put a hook in the first line, and use dialogue with some humor and repetition. In every chapter one of the three options is the **temptation**: choosing it leads to a funny or instructive consequence, never a punishment, and the story continues. The ending has a twist and closes with a short, memorable **moral**, like a proverb, which the app shows in a card. Keep every page to 35–45 words in two short paragraphs. Each chapter's three options get a label and a continuation in `authoredStoryContent[...].paths`. All three continuations must leave the story in the same situation, because the next chapter's options are shared. The reference is Rok's three stories.

## Build, Test, and Development Commands

- Frontend: `npm run dev`, `npm run build`, and `npm test` from the repository root.
- Backend: `npm run dev` and `npm run test:pixel-progress` from `server/`, with the local PostgreSQL service and `server/.env` configured.
- User journeys: execute `tests/qa-journey.mjs` with Playwright MCP's existing Chrome extension session; it never launches a browser. Development API requests use Vite's `/api` proxy to port 3300.
- Production builds use `.env.production` and reject local or non-HTTPS API URLs. Deployment remains a separate, explicitly authorized action.
- SMTP, email verification, and email password recovery are outside the current scope at Nick's request on 29 September 2026.

## Coding Style & Naming Conventions

Follow the formatter and linter selected for the project; do not hand-format files that those tools manage. Use 2 spaces for JSON, YAML, JavaScript, and TypeScript unless the adopted formatter says otherwise. Name files and folders in lowercase kebab-case (for example, `character-profile.md`); use the language’s usual symbol conventions, such as `camelCase` for JavaScript variables and `PascalCase` for classes.

## Testing Guidelines

Put tests under `tests/` or alongside source only when the chosen framework convention requires it. Use descriptive test names that state behavior, such as `renders-empty-story-list`. Add or update tests for every behavior change, including error cases. Run the full test command before opening a pull request.

## Commit & Pull Request Guidelines

Git history is not available in this workspace, so no existing commit convention can be inferred. Use concise imperative commits, preferably Conventional Commits: `feat: add story metadata parser` or `fix: handle missing title`. Pull requests should explain the change, link the relevant issue when applicable, list verification performed, and include screenshots for visible UI changes.
