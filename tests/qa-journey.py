"""Smoke tests for the child-facing reading journey.

Start the Vite app first, then run: python tests/qa-journey.py
Set CUENTOS_BASE_URL to use a different address.
"""

import os
import sys

from playwright.sync_api import Error, sync_playwright


BASE_URL = os.environ.get("CUENTOS_BASE_URL", "http://127.0.0.1:5175")


def expect(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    console_errors: list[str] = []

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1000})
        page.on(
            "console",
            lambda message: console_errors.append(message.text)
            if message.type == "error"
            else None,
        )

        try:
            page.goto(BASE_URL, wait_until="networkidle")
        except Error as error:
            raise RuntimeError(
                f"No se pudo abrir {BASE_URL}. Inicia la app con npm run dev -- --host 127.0.0.1 --port 5175."
            ) from error

        expect(page.get_by_role("heading", name="Hoy, ¿a dónde viajamos?").is_visible(), "La portada no muestra su mensaje principal.")
        expect(page.get_by_role("navigation", name="Navegación principal").is_visible(), "No se muestra la navegación principal.")

        page.get_by_role("button", name="Biblioteca").click()
        page.get_by_role("heading", name="Elige un mundo").wait_for()
        expect(page.get_by_text("cuentos disponibles").is_visible(), "La biblioteca no informa cuántos cuentos hay.")

        story_buttons = page.locator("article button")
        story_count = story_buttons.count()
        expect(story_count == 70, f"La biblioteca debe mostrar 70 cuentos, no {story_count}.")

        for story_index in range(story_count):
            story_buttons.nth(story_index).click()
            page.get_by_text("PÁGINA 1 DE 5").wait_for(timeout=5_000)

            for chapter in range(1, 5):
                expect(page.get_by_text("ELIGE UN CAMINO").is_visible(), f"El cuento {story_index + 1}, capítulo {chapter}, no ofrece una decisión.")
                expect(page.locator(".route-option").count() == 3, f"El cuento {story_index + 1}, capítulo {chapter}, no muestra tres caminos.")
                page.locator(".route-option").first.click()
                next_chapter = chapter + 1
                page.get_by_text(f"PÁGINA {next_chapter} DE 5").wait_for(timeout=5_000)
                expect(
                    page.get_by_role("navigation", name=f"Progreso de la aventura: página {next_chapter} de 5").is_visible(),
                    f"El cuento {story_index + 1} no actualizó el mapa al capítulo {next_chapter}.",
                )

            broken_images = page.locator("img").evaluate_all(
                "images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src)"
            )
            expect(not broken_images, f"El cuento {story_index + 1} tiene ilustraciones rotas: {broken_images}")
            page.get_by_role("button", name="Crear otra aventura").click()
            page.get_by_role("heading", name="Hoy, ¿a dónde viajamos?").wait_for(timeout=5_000)
            if story_index < story_count - 1:
                page.get_by_role("button", name="Biblioteca").click()
                page.get_by_role("heading", name="Elige un mundo").wait_for(timeout=5_000)

        page.get_by_role("button", name="Biblioteca").click()
        page.locator("article button").first.click()
        page.get_by_text("PÁGINA 1 DE 5").wait_for()
        page.locator(".route-option").first.click()
        page.get_by_text("PÁGINA 2 DE 5").wait_for(timeout=5_000)
        page.get_by_role("button", name="Volver al inicio").click()
        page.get_by_role("dialog", name="¿Volver al inicio?").wait_for()
        page.get_by_role("button", name="Seguir leyendo").click()
        expect(page.get_by_text("PÁGINA 2 DE 5").is_visible(), "El diálogo de salida no permite continuar leyendo.")
        expect(not console_errors, f"La interfaz produjo errores de consola: {console_errors}")

        mobile = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
        mobile.goto(BASE_URL, wait_until="networkidle")
        mobile.get_by_role("button", name="Biblioteca").click()
        mobile.locator("article button").first.click()
        mobile.get_by_text("PÁGINA 1 DE 5").wait_for()
        expect(
            mobile.locator(".chapter-map").evaluate("map => map.scrollWidth <= map.clientWidth"),
            "El mapa de capítulos desborda el ancho móvil.",
        )
        expect(
            mobile.locator(".route-option").count() == 3,
            "La lectura móvil no muestra sus tres caminos.",
        )
        mobile.close()
        print("QA OK: 70 cuentos, 5 capítulos, decisiones, salida, ilustraciones y vista móvil verificados.")
        browser.close()
        return 0
    

if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (AssertionError, RuntimeError) as error:
        print(f"QA FAILED: {error}", file=sys.stderr)
        raise SystemExit(1)
