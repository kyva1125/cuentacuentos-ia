# Seguimiento de ilustraciones GPT

Actualizado: 9 de septiembre de 2026.

Este registro indica qué cuentos usan una secuencia GPT propia y cuáles siguen
pendientes. Una migración solo se considera terminada si activa cinco archivos
`<id>-scene-1-v2.webp` a `<id>-scene-5-v2.webp` en `src/App.tsx`.

## Regla obligatoria de decisiones

Cada decisión debe mostrar una ilustración narrativa diferente. Una misma
imagen no puede reaparecer como sustituto de otra opción, de otra página ni de
otro cuento. Para dar por terminada una historia se debe registrar una matriz
de imágenes por decisión y comprobarla en el lector.

**Auditoría actual:** el verificador comprueba que los 70 cuentos estén activos,
que cada uno tenga exactamente cinco WebP GPT `scene-*-v2`, que no haya archivos
duplicados dentro de una secuencia ni compartidos entre cuentos, y que no exista
una ruta ejecutable hacia un proveedor de imágenes antiguo. El lector muestra
esas cinco escenas en orden, una por capítulo.

## No modificar: secuencias GPT activas

Estas secuencias ya están conectadas al lector. No se sustituyen al continuar
el lote salvo que Nick pida una corrección concreta.

- Inés y el mapa que se mueve (`ines-mapa`)
- Bruno y la bicicleta de las ideas (`bruno-bicicleta`)
- Mara y el secreto del faro apagado (`mara-faro`)
- Samira y el club de las preguntas difíciles (`samira-preguntas`)
- Daniel y la carta sin destinatario (`daniel-carta`)
- Julia y la ventana de los pájaros (`julia-ventana`)
- Noa y el día en que falló el robot (`noa-robot`)
- Amaya y el puente de las dos orillas (`amaya-puente`)
- Iván y la melodía escondida (`ivan-melodia`)
- Elena y el bosque que pedía silencio (`elena-bosque`)
- La ballena de las mil luces (`ballena-luz`)
- El dragón que horneaba nubes (`dragon-panadero`)
- Lila y el reloj de las flores (`lila-reloj`)
- Leo y la isla de las cometas (`leo-isla-cometas`)
- Nara y la linterna de lluvia (`nara-linterna`)
- Kiro y el lago de la luna (`kiro-lago-luna`)
- Sol y el coral que contaba historias (`sol-coral`)
- Pipa y la montaña de nubes (`pipa-montana`)
- Maya y la colmena de los deseos (`maya-colmena`)
- Ciro y los sombreros mágicos (`ciro-sombreros`)
- Elsa y el tren de la nieve (`elsa-tren`)
- Rufo y la linterna de las estrellas (`rufo-linterna`)
- Iris y el arcoíris dormido (`iris-arcoiris`)
- Tito y la orquesta del río (`tito-orquesta`)
- Valle y la fogata de los amigos (`valle-fogata`)
- Lina y el faro de los barcos (`lina-faro`)
- Mili y la lluvia de semillas (`mili-lluvia`)
- Paco y el tren de las estrellas (`paco-tren`)
- Duna y las mariposas de papel (`duna-mariposas`)
- Coa y las luciérnagas del bosque (`coa-luciernagas`)
- Nilo y el globo de las islas (`nilo-globo`)
- Tara y el barco de papel (`tara-barco`)
- Simón y el teleférico de los volcanes (`simon-teleferico`)
- Nora y el tren de la nieve (`nora-nieve`)
- Gabo y los puentes de la selva (`gabo-selva`)
- Lolo y la luna de papel (`lolo-luna`)
- Fer y el reloj de arenas doradas (`fer-reloj`, añadido el 9 de septiembre)
- Mira y los faroles flotantes (`mira-faroles`, añadido el 9 de septiembre)
- Tomás y el dragón de bruma (`tomas-bruma`, añadido el 9 de septiembre)
- Aina y el faro de las luciérnagas (`aina-faro-luciernagas`, completado el 9 de septiembre)
- Elif y la tienda de estrellas (`elif-estrellas`, completado el 9 de septiembre)
- Dulce y la heladería de los sabores (`dulce-helados`, completado el 9 de septiembre)
- Pipi y el río de chocolate (`pipi-chocolate`, completado el 9 de septiembre)
- Coco y el mercado de frutas mágicas (`coco-frutas`, completado el 9 de septiembre)
- Bella y la fábrica de algodón de azúcar (`bella-algodon`, completado el 9 de septiembre)
- Kaya y el lago de las tortugas (`kaya-tortugas`, completado el 9 de septiembre)
- Tomi y los árboles que cantan (`tomi-arboles`, completado el 9 de septiembre)
- Estela y el jardín bajo el mar (`estela-coral`, completado el 9 de septiembre)
- Rui y los colibríes de cristal (`rui-colibries`, completado el 9 de septiembre)
- Sami y el volcán de flores (`sami-volcan`, completado el 9 de septiembre)
- Bea y la lluvia de semillas estelares (`bea-semillas`, completado el 9 de septiembre)
- Beto y los puentes de papel (`beto-puentes-papel`, completado el 9 de septiembre)
- Zuri y el farol viajero (`zuri-farol`, completado el 9 de septiembre)
- Lumi y el colibrí de la mañana (`lumi-colibri`, completado el 9 de septiembre)
- Nora y la nutria curiosa (`nora-nutria`, completado el 9 de septiembre)
- Uma y el jardín de estrellas (`uma-jardin-estrellas`, completado el 9 de septiembre)
- Paco y el loro de la biblioteca (`paco-loro-biblioteca`, completado el 9 de septiembre)
- Ramón y la máquina de arcoíris (`ramon-mapache-arcoiris`, completado el 9 de septiembre)
- Vicu y las cintas del viento (`vicu-cintas-viento`, completado el 9 de septiembre)
- Tina y la tortuga de corales (`tina-tortuga-corales`, completado el 9 de septiembre)

## Pendientes de migrar con GPT

Ninguno.

## Cuentos con assets GPT propios no registrados como secuencia completa

Ninguno. Los 70 cuentos están registrados en `fullyRegeneratedStoryIds`.
