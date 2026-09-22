# Repository Guidelines

## Project Structure & Module Organization

This repository is currently an empty starter workspace. Keep the root limited to project metadata and top-level documentation. As the project grows, use a predictable layout:

- `src/` — application or library source files.
- `tests/` — automated tests that mirror the paths in `src/`.
- `assets/` — version-controlled static resources, such as story media or templates.
- `docs/` — longer project documentation and design notes.

Avoid placing generated files, local caches, or editor settings in the repository root. Add tool-specific ignore rules before introducing build output.

## Build, Test, and Development Commands

No build system, runtime, or test framework is configured yet. When one is added, document the canonical commands here and in the project README. Prefer a small, repeatable command set, for example `npm run dev`, `npm test`, and `npm run build` for a Node-based project. Commands must run from the repository root and should not require machine-specific paths.

## Coding Style & Naming Conventions

Follow the formatter and linter selected for the project; do not hand-format files that those tools manage. Use 2 spaces for JSON, YAML, JavaScript, and TypeScript unless the adopted formatter says otherwise. Name files and folders in lowercase kebab-case (for example, `character-profile.md`); use the language’s usual symbol conventions, such as `camelCase` for JavaScript variables and `PascalCase` for classes.

## Testing Guidelines

Put tests under `tests/` or alongside source only when the chosen framework convention requires it. Use descriptive test names that state behavior, such as `renders-empty-story-list`. Add or update tests for every behavior change, including error cases. Run the full test command before opening a pull request.

## Commit & Pull Request Guidelines

Git history is not available in this workspace, so no existing commit convention can be inferred. Use concise imperative commits, preferably Conventional Commits: `feat: add story metadata parser` or `fix: handle missing title`. Pull requests should explain the change, link the relevant issue when applicable, list verification performed, and include screenshots for visible UI changes.
