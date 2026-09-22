# Product — Aventuras Píxel MVP

## Platform and audience

A child-only web experience built with React, TypeScript, and Vite for readers aged 8–12. It runs entirely in the browser with no backend dependency.

## Purpose

Aventuras Píxel turns reading choices into visible RPG-style growth. The child chooses a recurring protagonist, reads a reusable story of 6–8 chapters, makes one equally valid Courage, Ingenuity, or Friendship decision after every chapter, and finishes with two comprehension questions.

## Current MVP scope

- Nia starts unlocked. Teo, Luma, Rok, Bit, and Suri are unlocked permanently with shared coins.
- Six visible avatars using one shared human template plus distinct dragon, robot, and forest-spirit templates.
- GPT pixel-art portraits in the roster/profile, paired with code-built emotional sprites during chapters and decisions.
- Three-line lore for every character, visible in the roster and repeated in the active profile.
- One visible model story, “El Río que Canta,” assigned specifically to Nia and containing five chapters.
- The other prototype stories remain preserved in source but hidden while the model is reviewed.
- Character progression lives in the profile; story discovery and progress live on a separate library screen.
- Three decisions per chapter: exactly one for each skill.
- Fixed decision images with generic default copy and optional character-specific copy; Nia has all fifteen variants.
- Twenty reusable pixel-art scenes: five chapter backgrounds and fifteen character-free decision images.
- Code-built character sprites and a fixed portrait bar with neutral, courage, wit, and friend expressions.
- Decisions can be changed; each chapter contributes at most one skill point.
- Exactly three closing questions after the final chapter, with unlimited retry and no penalty.
- Questions award 1, 2, and 3 coins in order.
- Replaying a story presents the quiz again, allowing the child to earn more coins.
- A final reward showing coins earned, wallet balance, skill growth, and milestone achievements.
- Progress, wallet, and permanent character unlocks persist in `localStorage` under `aventuras-pixel-progress-v3`.

## Product rules

- All visual content assets are generated with GPT: character avatars, emotional portraits, chapter scenes, decision images, story covers, badges, trophies, and collectibles. Code remains responsible for UI controls, layout, accessibility, and interaction.
- Every generated asset follows the same pixel scale, official palette, hard outlines, and no-antialiasing direction established by the Nia reference set.

- No decision is presented as morally or mechanically correct.
- Skills accumulate per character without a ceiling.
- Completing a journey banks that run's chapter choices into permanent skill totals; replaying the story can keep raising them.
- Skills never block content; they award achievements at 1 and every multiple of 5 (5, 10, 15, 20…).
- Coins have a spendable wallet balance and an uncapped lifetime-earned total; spending never reduces lifetime progress.
- Every story belongs to one specific protagonist and is not shared with other characters.
- Incorrect quiz answers never advance the question and never reduce progress.
- There is no XP or separate character-level system.
- The experience remains gentle, non-violent, and readable in Spanish.
- Parent accounts, payments, story generation, and backend persistence are outside this prototype.

## Success criteria

A child can complete all six connected screens—from character selection through reward—change a chapter decision without duplicating points, retry both questions until correct, earn coins, unlock a new character, close the browser, and return with wallet and progress intact.
