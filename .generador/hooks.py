"""Ajustes del proyecto al prompt del generador (Maticuentos).

1. Mundos aprobados de Suri y Rok: nueva composición en vez de copiar la portada.
2. Anatomía: añade la anatomía de cada personaje usado con --personaje (campo "anatomia" de la
   ficha) y una regla general. Evita lo visto en sep-2026: Rok con tres patas, tortuga y cabra con
   cola de dragón, niños con cola. Un modelo de difusión no entiende negaciones ("no tail" pinta
   colas), así que la anatomía se describe en positivo.
"""

import re


def _anatomia(texto, ctx):
    ficha = ctx.get("ficha") or {}
    personajes = ficha.get("personajes") or {}
    usados = ctx["args"].get("personaje") or []
    frases = [personajes[k]["anatomia"] for k in usados if personajes.get(k, {}).get("anatomia")]
    general = ficha.get("anatomia_general")
    if general:
        frases.append(general)
    frases = [f for f in frases if f not in texto]
    return texto + (", " + ", ".join(frases) if frases else "")


def prompt(texto, ctx):
    texto = _anatomia(texto, ctx)
    mundo = ctx["args"].get("mundo") or ""
    if not mundo.startswith(("suri-", "rok-")):
        return texto
    return re.sub(
        r"set in the same place shown in image (\d+), same scenery and the same art style as image \1",
        r"set elsewhere in the same story world as image \1, with its setting elements and exact art style, "
        r"but a new camera framing that clearly shows the described action; do not recreate the cover composition",
        texto,
    )
