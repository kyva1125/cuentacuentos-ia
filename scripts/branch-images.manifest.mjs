// Manifiesto de imágenes para el modelo de lectura ramificada (bifurca en D1 y D2).
//
// Cada historia declara:
//   - character: descripción FIJA del personaje (continuidad entre imágenes)
//   - style:     descripción FIJA de estilo/formato (16:9, sin texto, paleta)
//   - opening:   escena 1, compartida por todo el cuento (suele existir ya)
//   - branches:  [{ slug, label, page2, subpaths: [{ slug, label, scenes:[p3,p4,p5] }] }]
//
// Archivos generados:
//   opening       -> `${id}-scene-1-v2.webp`                       (1, compartida)
//   rama, pág. 2  -> `${id}-${branchSlug}-scene-2-v2.webp`          (1 por rama = 3)
//   sub-camino    -> `${id}-${branchSlug}-${subSlug}-scene-${n}-v2.webp`  n = 3..5
//                                                                  (3 por sub-camino)
// Total por historia: 1 + 3 + (3 ramas × 3 sub-caminos × 3) = 31 imágenes.
// El prompt final es: `${style}\n\nPersonaje: ${character}\n\nEscena: ${scene}`

/** @type {Record<string, any>} */
export const branchImageManifest = {
  "mila-brujula": {
    character:
      "Mila es una niña de unos 8 años, piel morena clara, mejillas redondas, ojos oscuros grandes y curiosos, pelo negro y rizado recogido en dos coletas cortas. Lleva una chaqueta corta color mostaza sobre una camiseta crema, pantalón corto azul índigo y botas de montaña marrones. Del cuello le cuelga una brújula antigua de latón. La acompaña un pajarito azul pequeño y regordete.",
    style:
      "Ilustración digital de libro infantil, cálida y detallada, pincelada suave, luz dorada de atardecer que va cayendo a noche azul, atmósfera de bosque mágico y tranquilo. Paleta: crema papel, verde bosque, azul noche y dorado. Composición panorámica en formato 16:9. Sin texto, sin letras, sin números, sin marcos ni bordes. Personaje, ropa y estilo idénticos en toda la serie.",
    opening:
      "Mila, en un claro del bosque al atardecer, descubre bajo una piedra azul una brújula antigua de latón cuya aguja gira sola; un pajarito azul se posa a su lado. Sobre las copas de los árboles el cielo empieza a quedarse sin estrellas.",
    openingExists: true,
    branches: [
      {
        slug: "canto",
        label: "Seguir el canto de la brújula",
        page2:
          "Mila cruza un arroyo ancho de aguas rápidas en un bosque frondoso al atardecer; en la orilla opuesta, entre raíces, una caja de música plateada despide ondas de sonido brillantes; el pajarito azul la observa desde una roca.",
        subpaths: [
          {
            slug: "piedras",
            label: "Cruzar saltando de piedra en piedra",
            scenes: [
              "Mila, con los pies empapados y cara de esfuerzo, junto a una caja de música plateada encajada bajo una raíz gruesa en la orilla del arroyo; intenta alcanzarla metiendo el brazo por un hueco estrecho; el pajarito azul da saltitos nervioso.",
              "La caja de música abierta sobre las raíces; de ella salen tres estrellitas mojadas y tiritonas con carita asustada; Mila las mira con ternura; el bosque a su espalda cae en noche azul.",
              "Tres estrellas suben desde una roca junto al arroyo hacia un cielo nocturno profundo que se enciende de dorado; Mila y el pajarito azul las despiden desde abajo con los brazos en alto.",
            ],
          },
          {
            slug: "vado",
            label: "Buscar un vado siguiendo el canto arroyo arriba",
            scenes: [
              "Mila, seca y tranquila, sentada frente a una caja de música plateada atada con un lazo de enredaderas a la orilla de un arroyo poco profundo; acerca su brújula de latón y de ambas salen notas doradas.",
              "La caja abierta; tres estrellitas encogidas asoman por el borde; alrededor, sobre la tierra, Mila ha trazado con la brújula líneas finas como un mapa del cielo; anochecer.",
              "Tres estrellas suben desde un claro despejado del bosque hacia el cielo nocturno encendido de dorado; Mila, de pie en el centro, las ve marchar con el pajarito azul en el hombro.",
            ],
          },
          {
            slug: "ranas",
            label: "Pedir a las ranas que hagan de puente",
            scenes: [
              "Tres ranas en fila hacen de puente sobre un arroyo y Mila cruza pisando sus espaldas; al fondo, una caja de música plateada medio hundida en el barro de la orilla.",
              "Mila y tres ranas alrededor de una caja de música recién sacada del barro y abierta; de ella salen tres estrellitas dormidas y sobresaltadas; noche que cae.",
              "Tres estrellas suben desde una orilla embarrada hacia el cielo nocturno dorado; tres ranas y Mila las despiden desde un charco con un coro de burbujas.",
            ],
          },
        ],
      },
      {
        slug: "pajaro",
        label: "Preguntar al pajarito azul",
        page2:
          "El pajarito azul vuela por delante guiando a Mila por un sendero de musgo entre helechos hacia la orilla de un arroyo; al fondo, una caja de música plateada en la otra orilla. Luz de tarde filtrada entre los árboles.",
        subpaths: [
          {
            slug: "hoja",
            label: "Cruzar por una hoja gigante apoyada como puente",
            scenes: [
              "Mila termina de cruzar un arroyo por una hoja gigante apoyada como puente; en la otra orilla, el pajarito azul posado en el borde de una caja de música plateada cerrada, intentando abrir el cierre con el pico.",
              "La caja de música abierta; tres estrellas asoman muy despacio protegiéndose los ojos; el pajarito azul se coloca protector junto a ellas; bosque casi a oscuras.",
              "El pajarito azul vuela en cabeza y tres estrellas lo siguen hacia un cielo nocturno que se enciende; Mila las anima desde el suelo, junto a una hoja gigante doblada.",
            ],
          },
          {
            slug: "cuerda",
            label: "Dejar que el pajarito lleve una cuerda a la otra orilla",
            scenes: [
              "Mila cruza un arroyo agarrada a una cuerda de hierba tendida entre las dos orillas por el pajarito azul, riéndose, sin tocar el agua; al fondo, una caja de música plateada cerrada.",
              "La caja de música abierta; tres estrellas encogidas asoman; el pajarito azul junto a ellas; Mila sostiene la cuerda de hierba pensando cómo usarla; penumbra.",
              "Tres estrellas suben por una cuerda de hierba tendida hacia una rama muy alta y de ahí hacia el cielo nocturno dorado; Mila abajo, sonriendo, con el pajarito azul.",
            ],
          },
          {
            slug: "vadeo",
            label: "Vadear el arroyo con cuidado, aunque el agua moje",
            scenes: [
              "Mila cruza un arroyo con el agua por las rodillas, temblando de frío pero sujetando firme la brújula; en la orilla, el pajarito azul da saltitos de impaciencia sobre una caja de música plateada.",
              "La caja de música abierta; tres estrellas asoman y tiemblan igual que Mila, que está empapada; el pajarito azul se ríe bajito; noche cayendo.",
              "Mila trepada en lo alto de un roble, con la ropa mojada, despide con la mano a tres estrellas que suben hacia el cielo nocturno; el pajarito azul a su lado.",
            ],
          },
        ],
      },
      {
        slug: "pistas",
        label: "Buscar pistas bajo las hojas",
        page2:
          "Mila agachada levantando hojas del suelo del bosque descubre un reguero de polvo dorado brillante, fino como azúcar, que serpentea hacia un arroyo; al fondo, una caja de música plateada con pequeños destellos. Luz de tarde, tonos tierra y oro.",
        subpaths: [
          {
            slug: "raices",
            label: "Seguir el polvo por unas raíces que cruzan el agua",
            scenes: [
              "Mila cruza un arroyo por unas raíces gruesas que hacen de puente natural, siguiendo un reguero de polvo dorado; al otro lado, una caja de música plateada con tres ranuras finas en la tapa y la brújula encajada en una.",
              "La caja de música abierta con un clic; tres estrellas dormidas se frotan los ojos; en el suelo alrededor, el polvo dorado dibuja líneas claras como un plano; anochecer.",
              "Mila sopla polvo dorado que dibuja una línea luminosa en el aire hasta un hueco entre las ramas; tres estrellas la recorren hacia un cielo nocturno encendido.",
            ],
          },
          {
            slug: "marcas",
            label: "Marcar el rastro con piedritas para no perderlo",
            scenes: [
              "Mila junto a una caja de música plateada al final de un rastro de polvo dorado; detrás de ella, una hilera de piedritas blancas que ha ido dejando cada pocos pasos entre las hojas.",
              "La caja de música abierta; tres estrellas dormidas parpadean en la penumbra; Mila mira su hilera de piedritas blancas con una idea en la cara.",
              "Una hilera de piedritas blancas en línea recta se enciende de dorado sobre el suelo del bosque; tres estrellas suben pisándolas como escalones hacia el cielo nocturno; Mila abajo.",
            ],
          },
          {
            slug: "pajaro",
            label: "Pedir al pajarito que mire el camino desde arriba",
            scenes: [
              "El pajarito azul vuela en círculos sobre el bosque señalando con el ala por dónde sigue un rastro de polvo dorado; abajo, Mila avanza hacia una caja de música plateada con tres ranuras.",
              "La caja de música abierta; tres estrellas soñolientas asoman; el pajarito azul revolotea señalando el cielo con el ala, impaciente.",
              "El pajarito azul vuela hacia un hueco del cielo nocturno y tres estrellas lo siguen en fila; abajo, Mila señala con el dedo la línea de vuelo.",
            ],
          },
        ],
      },
    ],
  },
};

/** Plan aplanado: una entrada por imagen a generar. */
export function flattenPlan(manifest = branchImageManifest) {
  const jobs = [];
  for (const [id, plan] of Object.entries(manifest)) {
    if (!plan.openingExists) {
      jobs.push({
        storyId: id,
        kind: "opening",
        scene: 1,
        file: `${id}-scene-1-v2.webp`,
        prompt: buildPrompt(plan, plan.opening),
      });
    }
    for (const branch of plan.branches) {
      jobs.push({
        storyId: id,
        kind: "branch-page2",
        slug: branch.slug,
        scene: 2,
        file: `${id}-${branch.slug}-scene-2-v2.webp`,
        prompt: buildPrompt(plan, branch.page2),
      });
      for (const sub of branch.subpaths) {
        sub.scenes.forEach((scene, index) => {
          jobs.push({
            storyId: id,
            kind: "subpath",
            slug: `${branch.slug}-${sub.slug}`,
            scene: index + 3,
            file: `${id}-${branch.slug}-${sub.slug}-scene-${index + 3}-v2.webp`,
            prompt: buildPrompt(plan, scene),
          });
        });
      }
    }
  }
  return jobs;
}

export function buildPrompt(plan, scene) {
  return `${plan.style}\n\nPersonaje: ${plan.character}\n\nEscena: ${scene}`;
}
