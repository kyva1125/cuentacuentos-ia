// Execute this function with Playwright MCP's browser_run_code_unsafe(filename).
// It uses the extension's existing Chrome page and never launches a browser.
async (page) => {
  const base = 'http://127.0.0.1:5175/stories/';
  await page.goto(base);
  await page.bringToFront();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const backup = await page.evaluate(() => Object.fromEntries(Object.entries(localStorage).filter(([key]) => key.startsWith('aventuras-pixel-'))));
  const saveKey = 'aventuras-pixel-progress-v3';
  const readSave = () => page.evaluate((key) => JSON.parse(localStorage.getItem(key) || '{}'), saveKey);
  const check = (value, message) => { if (!value) throw new Error(message); };
  const readyImages = async () => {
    try {
      await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0), null, { polling: 100, timeout: 15000 });
    } catch {
      const missing = await page.locator('img').evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src));
      throw new Error(`Imágenes sin cargar: ${missing.join(', ')}`);
    }
  };
  const completed = [];
  try {
    await page.evaluate(() => Object.keys(localStorage).filter((key) => key.startsWith('aventuras-pixel-')).forEach((key) => localStorage.removeItem(key)));
    await page.reload();
    await page.getByRole('button', { name: 'Abrir perfil de Nia', exact: true }).waitFor();
    check(await page.locator('.character-card').count() === 6, 'Deben aparecer seis personajes');
    for (const name of ['Nia', 'Teo', 'Luma', 'Rok', 'Bit', 'Suri']) {
      await page.getByRole('button', { name: `Abrir perfil de ${name}`, exact: true }).evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
      await page.getByRole('button', { name: `Ver cuentos de ${name}`, exact: true }).evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
      check(await page.locator('.story-library-card').count() === 3, `${name} necesita tres cuentos`);
      await readyImages();
      const covers = await page.locator('.story-cover img').evaluateAll((images) => images.map((image) => image.getAttribute('src')));
      check(covers.every((src) => src.includes('/fable/covers/')), `${name} muestra una portada antigua`);
      for (let storyIndex = 0; storyIndex < 3; storyIndex++) {
        const card = page.locator('.story-library-card').nth(storyIndex);
        const title = await card.locator('h2').innerText();
        await card.getByRole('button').evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
        for (let chapter = 1; chapter <= 4; chapter++) {
          check(await page.locator('.decision-card').count() === 3, `${title}, capítulo ${chapter}: faltan decisiones`);
          if (chapter === 1) {
            await page.locator('.decision-card').nth(1).evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
            await page.locator('.decision-card').nth(2).evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
          }
          await page.locator('.decision-card').first().evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
          const hero = await page.locator('.decision-card img').first().getAttribute('src');
          await page.getByRole('button', { name: `Continuar al capítulo ${chapter + 1}`, exact: true }).evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
          check(await page.getByRole('dialog').isVisible(), 'Debe aparecer el resultado intermedio');
          await page.getByRole('dialog').getByRole('button', { name: 'Continuar', exact: true }).evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
          await page.locator('.chapter-number').filter({ hasText: `Capítulo ${chapter + 1} de 5` }).waitFor();
          check(await page.locator('.scene-frame img').getAttribute('src') === hero, 'La imagen elegida debe ser la imagen del capítulo siguiente');
          await readyImages();
        }
        check(await page.locator('.moral-card').isVisible(), `${title}: falta moraleja`);
        check(await page.locator('.decision-card').count() === 0, 'El capítulo cinco no debe ofrecer decisiones');
        await page.getByRole('button', { name: 'Ir a las preguntas', exact: true }).evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
        for (let question = 1; question <= 3; question++) {
          const label = (await page.locator('.quiz-label').textContent()).replace(/\s+/g, ' ');
          check(label.includes(`Pregunta ${question} de 3`), `El cierre debe tener tres preguntas: ${label}`);
          const before = (await readSave()).coins;
          for (let option = 0; option < 3; option++) {
            await page.locator('.quiz-options button').nth(option).evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
            if (await page.locator('.feedback.correct').isVisible()) break;
            check((await readSave()).coins === before, 'Una respuesta incorrecta no debe quitar ni dar monedas');
          }
          check(await page.locator('.feedback.correct').isVisible(), 'La pregunta debe tener una respuesta correcta');
          check((await readSave()).coins === before + question, 'Las preguntas deben entregar 1, 2 y 3 monedas');
          await page.getByRole('button', { name: question < 3 ? 'Siguiente pregunta' : 'Ver mi recompensa', exact: true }).evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
        }
        check((await page.locator('h1').textContent()).trim() === '¡Aventura completada!', 'Falta la pantalla de recompensa');
        completed.push(title);
        await page.getByRole('button', { name: 'Elegir otro cuento', exact: true }).evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
      }
      await page.getByRole('button', { name: `Volver con ${name}`, exact: true }).evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
      await page.getByRole('button', { name: 'Elegir otro personaje', exact: true }).evaluateAll((elements) => { if (elements.length !== 1 || elements[0].disabled) throw new Error('Control no disponible'); elements[0].click(); });
    }
    const save = await readSave();
    check(save.coins === 108 && save.lifetimeCoins === 108, 'Los 18 cuentos deben sumar 108 monedas');
    check(Object.values(save.characters).reduce((sum, character) => sum + character.completedStories.length, 0) === 18, 'Deben guardarse los 18 cuentos completados');
    await page.reload();
    check((await readSave()).coins === 108, 'El progreso debe sobrevivir a una recarga');
    return { passed: true, stories: completed.length, chapters: 90, questions: 54, coins: 108 };
  } finally {
    await page.goto('about:blank');
    await page.goto(base);
    await page.evaluate((backup) => {
      Object.keys(localStorage).filter((key) => key.startsWith('aventuras-pixel-')).forEach((key) => localStorage.removeItem(key));
      for (const [key, value] of Object.entries(backup)) localStorage.setItem(key, value);
    }, backup);
    await page.goto('about:blank');
  }
}
