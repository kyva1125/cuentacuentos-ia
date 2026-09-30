import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  authenticateParent,
  PARENT_SESSION_KEY,
  PROGRESS_OWNER_KEY,
  PROGRESS_SYNC_KEY,
  readCloudProgress,
  storedParentSession,
  writeCloudProgress,
  type ParentSession,
} from "./parent-progress";
import {
  ArrowLeft,
  Bird,
  Brain,
  Check,
  ChevronRight,
  Clock3,
  Coins,
  Compass,
  Eye,
  Flame,
  Frown,
  Gem,
  Heart,
  Leaf,
  Lightbulb,
  LockKeyhole,
  Puzzle,
  RotateCcw,
  Search,
  Shield,
  Smile,
  ScrollText,
  Sparkles,
  Star,
  Sun,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import chapterOne from "./assets/illustrations-fable/rio-cantor-opening.webp";
import chapterTwo from "./assets/illustrations-fable/rio-cantor-chapter-2.webp";
import chapterThree from "./assets/illustrations-fable/rio-cantor-chapter-3.webp";
import chapterFour from "./assets/illustrations-fable/rio-cantor-chapter-4.webp";
import chapterFive from "./assets/illustrations-fable/rio-cantor-chapter-5.webp";
import c1a from "./assets/illustrations-fable/rio-cantor-chapter-1-choice-a.webp";
import c1b from "./assets/illustrations-fable/rio-cantor-chapter-1-choice-b.webp";
import c1c from "./assets/illustrations-fable/rio-cantor-chapter-1-choice-c.webp";
import c2a from "./assets/illustrations-fable/rio-cantor-chapter-2-choice-a.webp";
import c2b from "./assets/illustrations-fable/rio-cantor-chapter-2-choice-b.webp";
import c2c from "./assets/illustrations-fable/rio-cantor-chapter-2-choice-c.webp";
import c3a from "./assets/illustrations-fable/rio-cantor-chapter-3-choice-a.webp";
import c3b from "./assets/illustrations-fable/rio-cantor-chapter-3-choice-b.webp";
import c3c from "./assets/illustrations-fable/rio-cantor-chapter-3-choice-c.webp";
import c4a from "./assets/illustrations-fable/rio-cantor-chapter-4-choice-a.webp";
import c4b from "./assets/illustrations-fable/rio-cantor-chapter-4-choice-b.webp";
import c4c from "./assets/illustrations-fable/rio-cantor-chapter-4-choice-c.webp";
import c5a from "./assets/illustrations-fable/rio-cantor-chapter-5.webp";
import c5b from "./assets/illustrations-fable/rio-cantor-chapter-5.webp";
import c5c from "./assets/illustrations-fable/rio-cantor-chapter-5.webp";
import niaAvatar from "./assets/fable/characters/nia.webp";
import niaEmotions from "./assets/fable/emotions/nia-emotions.webp";
import teoEmotions from "./assets/fable/emotions/teo-emotions.webp";
import teoAvatar from "./assets/fable/characters/teo.webp";
import lumaAvatar from "./assets/fable/characters/luma.webp";
import lumaEmotions from "./assets/fable/emotions/luma-emotions.webp";
import rokAvatar from "./assets/fable/characters/rok.webp";
import rokEmotions from "./assets/fable/emotions/rok-emotions.webp";
import bitAvatar from "./assets/fable/characters/bit.webp";
import bitEmotions from "./assets/fable/emotions/bit-emotions.webp";
import suriAvatar from "./assets/fable/characters/suri.webp";
import suriEmotions from "./assets/fable/emotions/suri-emotions.webp";
import senderoCover from "./assets/fable/covers/rio-cantor-cover.webp";
import faroCover from "./assets/fable/covers/faro-nubes-cover.webp";
import nubeCover from "./assets/fable/covers/faro-nubes-cover.webp";
import rioCover from "./assets/fable/covers/rio-cantor-cover.webp";
import rioChapterOneChoiceA from "./assets/illustrations-fable/rio-cantor-chapter-1-choice-a.webp";
import rioChapterOneChoiceB from "./assets/illustrations-fable/rio-cantor-chapter-1-choice-b.webp";
import rioChapterOneChoiceC from "./assets/illustrations-fable/rio-cantor-chapter-1-choice-c.webp";
import rioChapterTwoChoiceA from "./assets/illustrations-fable/rio-cantor-chapter-2-choice-a.webp";
import rioChapterTwoChoiceB from "./assets/illustrations-fable/rio-cantor-chapter-2-choice-b.webp";
import rioChapterTwoChoiceC from "./assets/illustrations-fable/rio-cantor-chapter-2-choice-c.webp";
import rioChapterThreeChoiceA from "./assets/illustrations-fable/rio-cantor-chapter-3-choice-a.webp";
import rioChapterThreeChoiceB from "./assets/illustrations-fable/rio-cantor-chapter-3-choice-b.webp";
import rioChapterThreeChoiceC from "./assets/illustrations-fable/rio-cantor-chapter-3-choice-c.webp";
import rioChapterFourChoiceA from "./assets/illustrations-fable/rio-cantor-chapter-4-choice-a.webp";
import rioChapterFourChoiceB from "./assets/illustrations-fable/rio-cantor-chapter-4-choice-b.webp";
import rioChapterFourChoiceC from "./assets/illustrations-fable/rio-cantor-chapter-4-choice-c.webp";
import bibliotecaCover from "./assets/fable/covers/faro-nubes-cover.webp";
import jardinCover from "./assets/fable/covers/jardin-gigantes-cover.webp";
import faroNubesCover from "./assets/fable/covers/faro-nubes-cover.webp";
import jardinGigantesCover from "./assets/fable/covers/jardin-gigantes-cover.webp";
import teoTallerCover from "./assets/fable/covers/teo-taller-estrellas-cover.webp";
import teoCiudadCover from "./assets/fable/covers/teo-ciudad-cobre-cover.webp";
import teoBosqueCover from "./assets/fable/covers/teo-bosque-brujulas-cover.webp";
import bitObservatorioCover from "./assets/fable/covers/bit-observatorio-luz-cover.webp";
import bitLagoCover from "./assets/fable/covers/bit-lago-ecos-cover.webp";
import bitSemillasCover from "./assets/fable/covers/bit-ciudad-semillas-cover.webp";
import lumaFaroMareasCover from "./assets/fable/covers/luma-faro-mareas-cover.webp";
import lumaIslaBarcasCover from "./assets/fable/covers/luma-isla-barcas-cover.webp";
import lumaArrecifeCristalCover from "./assets/fable/covers/luma-arrecife-cristal-cover.webp";
import rokCuevaEcosCover from "./assets/fable/covers/rok-cueva-ecos-cover.webp";
import rokVallePromesasCover from "./assets/fable/covers/rok-valle-promesas-cover.webp";
import rokNubeVolcanCover from "./assets/fable/covers/rok-nube-volcan-cover.webp";
import suriLagoReflejosCover from "./assets/fable/covers/suri-lago-reflejos-cover.webp";
import suriArbolLuciérnagasCover from "./assets/fable/covers/suri-arbol-luciernagas-cover.webp";
import suriSenderoSemillasCover from "./assets/fable/covers/suri-sendero-semillas-cover.webp";

// El catálogo activo usa exclusivamente el arte de fábula clásica.
const storyFableAssets = import.meta.glob("./assets/illustrations-fable/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

function storyV3Asset(name: string) {
  return storyFableAssets[`./assets/illustrations-fable/${name}.webp`];
}
type SceneVariant = "scene" | "a" | "b" | "c";

function storyScene(storyId: string, chapter: number, variant: SceneVariant) {
  chapter = Math.min(chapter, 5);
  const name = variant === "scene" || chapter > 4
    ? chapter === 1 ? "opening" : `chapter-${chapter}`
    : `chapter-${chapter}-choice-${variant}`;
  const image = storyV3Asset(`${storyId}-${name}`) ?? storyV3Asset(`rio-cantor-${name}`);
  if (!image)
    throw new Error(
      `Falta la ilustración ${storyId}, capítulo ${chapter}, ${variant}.`,
    );
  return image;
}

function storyV2Scene(storyId: string, chapter: number, variant: SceneVariant) {
  const image = storyV3Asset(`${storyId}-chapter-${chapter}-choice-${variant}`);
  if (!image)
    throw new Error(
      `Falta la ilustración v2 ${storyId}, capítulo ${chapter}, ${variant}.`,
    );
  return image;
}

function storyV3Opening(storyId: string) {
  return storyV3Asset(`${storyId}-opening`);
}

function storyV3Scene(storyId: string, chapter: number) {
  return storyV3Asset(`${storyId}-chapter-${chapter}`);
}

function storyV3Decision(storyId: string, chapter: number) {
  return storyV3Asset(`${storyId}-decision-${chapter}`);
}

function storyV3Choice(storyId: string, chapter: number, variant: SceneVariant) {
  return storyV3Asset(`${storyId}-chapter-${chapter}-choice-${variant}`);
}

type SkillKey = "a" | "b" | "c";
type Expression = "neutral" | "courage" | "wit" | "friend";
type Screen =
  | "characters"
  | "profile"
  | "library"
  | "chapter"
  | "quiz"
  | "reward"
  | "parent";
type SpriteTemplate = "human" | "dragon" | "robot" | "spirit";
type SkillIconName =
  | "shield"
  | "brain"
  | "heart"
  | "search"
  | "lightbulb"
  | "clock"
  | "sun"
  | "users"
  | "flame"
  | "eye"
  | "gem"
  | "puzzle"
  | "compass"
  | "zap"
  | "leaf"
  | "bird";
type SpriteConfig = {
  template: SpriteTemplate;
  hairColor: string;
  outfitColor: string;
  accentColor: string;
};
type Character = {
  id: string;
  name: string;
  tag: string;
  lore: [string, string, string];
  avatarImage: string;
  spriteConfig: SpriteConfig;
  skillLabels: Record<SkillKey, string>;
  skillIcons: Record<SkillKey, SkillIconName>;
  skills: Record<SkillKey, number>;
  unlockCost: number;
};
type Decision = {
  skillKey: SkillKey;
  image: string;
  defaultLabel: string;
  labelByCharacter?: Partial<Record<string, string>>;
};
type Continuation = { title: string; text: string };
type Chapter = {
  id: string;
  order: number;
  sceneType: "day" | "night";
  title: string;
  text: string;
  background: string;
  decisions: Decision[];
  continuations?: Partial<Record<SkillKey, Continuation>>;
};
type Question = {
  prompt: string;
  options: [string, string, string];
  correctIndex: number;
  coinReward: 1 | 2 | 3;
};
type Story = {
  id: string;
  ownerId: string;
  title: string;
  blurb: string;
  coverImage: string;
  unlockCost: number;
  chapters: Chapter[];
  closingQuiz: { questions: Question[] };
};
type CharacterSave = {
  decisions: Record<string, SkillKey>;
  completedStories: string[];
  skills: Record<SkillKey, number>;
  lessons?: string[];
};
type SaveData = {
  coins: number;
  lifetimeCoins: number;
  unlockedCharacters: string[];
  unlockedStories: string[];
  characters: Record<string, CharacterSave>;
};

const STORAGE_KEY = "aventuras-pixel-progress-v3";
const LEGACY_STORAGE_KEYS = [
  "aventuras-pixel-progress-v2",
  "aventuras-pixel-progress-v1",
];
const STORY_ID = "el-sendero-perdido";
const MODEL_STORY_ID = "rio-cantor";
const EMPTY_SKILLS: Record<SkillKey, number> = { a: 0, b: 0, c: 0 };
const emptyCharacterSave = (): CharacterSave => ({
  decisions: {},
  completedStories: [],
  skills: { ...EMPTY_SKILLS },
});

const characters: Character[] = [
  {
    id: "nia",
    name: "Nia",
    tag: "La Exploradora",
    lore: [
      "Creció junto a los caminos que rodean Villa Brújula.",
      "Guarda mapas, piedras curiosas y relatos de cada lugar.",
      "Explora para demostrar que el valor también significa pedir ayuda.",
    ],
    avatarImage: niaAvatar,
    spriteConfig: {
      template: "human",
      hairColor: "#7E2553",
      outfitColor: "#00E436",
      accentColor: "#29ADFF",
    },
    skillLabels: { a: "Valentía", b: "Ingenio", c: "Amistad" },
    skillIcons: { a: "shield", b: "brain", c: "heart" },
    skills: { ...EMPTY_SKILLS },
    unlockCost: 0,
  },
  {
    id: "teo",
    name: "Teo",
    tag: "El Inventor",
    lore: [
      "Vive sobre un taller lleno de resortes en Ciudad Cobre.",
      "Antes de construir, pregunta, prueba y vuelve a intentarlo.",
      "Viaja para crear inventos que resuelvan problemas de verdad.",
    ],
    avatarImage: teoAvatar,
    spriteConfig: {
      template: "human",
      hairColor: "#FFA300",
      outfitColor: "#7E2553",
      accentColor: "#FFEC27",
    },
    skillLabels: { a: "Curiosidad", b: "Ingenio", c: "Paciencia" },
    skillIcons: { a: "search", b: "lightbulb", c: "clock" },
    skills: { ...EMPTY_SKILLS },
    unlockCost: 3,
  },
  {
    id: "luma",
    name: "Luma",
    tag: "La Guardiana",
    lore: [
      "Protege el Faro Turquesa frente al mar de nubes.",
      "Escucha primero y mantiene la calma cuando otros se preocupan.",
      "Sale de aventura para cuidar lugares que todavía no conoce.",
    ],
    avatarImage: lumaAvatar,
    spriteConfig: {
      template: "human",
      hairColor: "#1D2B53",
      outfitColor: "#29ADFF",
      accentColor: "#FF004D",
    },
    skillLabels: { a: "Calma", b: "Amistad", c: "Valentía" },
    skillIcons: { a: "sun", b: "users", c: "shield" },
    skills: { ...EMPTY_SKILLS },
    unlockCost: 5,
  },
  {
    id: "rok",
    name: "Rok",
    tag: "El Dragón Joven",
    lore: [
      "Nació entre las cuevas verdes de la Montaña Dorada.",
      "Sus alas aún son pequeñas, pero observa pistas que otros pasan por alto.",
      "Busca aventuras para aprender a usar su fuerza con lealtad.",
    ],
    avatarImage: rokAvatar,
    spriteConfig: {
      template: "dragon",
      hairColor: "#00E436",
      outfitColor: "#00E436",
      accentColor: "#FFEC27",
    },
    skillLabels: { a: "Fuerza", b: "Astucia", c: "Lealtad" },
    skillIcons: { a: "flame", b: "eye", c: "gem" },
    skills: { ...EMPTY_SKILLS },
    unlockCost: 7,
  },
  {
    id: "bit",
    name: "Bit",
    tag: "El Robot Curioso",
    lore: [
      "Despertó en un observatorio olvidado bajo una lluvia eléctrica.",
      "Convierte cada misterio en preguntas, patrones y pequeñas pruebas.",
      "Explora para comprender las emociones que no caben en sus cálculos.",
    ],
    avatarImage: bitAvatar,
    spriteConfig: {
      template: "robot",
      hairColor: "#FFF1E8",
      outfitColor: "#1D2B53",
      accentColor: "#29ADFF",
    },
    skillLabels: { a: "Lógica", b: "Curiosidad", c: "Valentía" },
    skillIcons: { a: "puzzle", b: "compass", c: "zap" },
    skills: { ...EMPTY_SKILLS },
    unlockCost: 9,
  },
  {
    id: "suri",
    name: "Suri",
    tag: "El Espíritu del Bosque",
    lore: [
      "Apareció cuando brotó el árbol más antiguo del Bosque Hondo.",
      "Se mueve en silencio y entiende las señales de hojas y animales.",
      "Viaja para sanar senderos y reunir amigos que respeten la naturaleza.",
    ],
    avatarImage: suriAvatar,
    spriteConfig: {
      template: "spirit",
      hairColor: "#7E2553",
      outfitColor: "#00E436",
      accentColor: "#7E2553",
    },
    skillLabels: { a: "Sigilo", b: "Sabiduría", c: "Amistad" },
    skillIcons: { a: "leaf", b: "bird", c: "heart" },
    skills: { ...EMPTY_SKILLS },
    unlockCost: 12,
  },
];

const comingSoonCharacterIds = new Set<string>();
const iconMap: Record<SkillIconName, typeof Shield> = {
  shield: Shield,
  brain: Brain,
  heart: Heart,
  search: Search,
  lightbulb: Lightbulb,
  clock: Clock3,
  sun: Sun,
  users: Users,
  flame: Flame,
  eye: Eye,
  gem: Gem,
  puzzle: Puzzle,
  compass: Compass,
  zap: Zap,
  leaf: Leaf,
  bird: Bird,
};
const skillMeta: Record<SkillKey, { expression: Expression; note: string }> = {
  a: {
    expression: "courage",
    note: "Encuentras tu manera de dar el primer paso.",
  },
  b: { expression: "wit", note: "Observas y encuentras una solución propia." },
  c: {
    expression: "friend",
    note: "Cuidas el camino y a quienes te acompañan.",
  },
};

const chapters: Chapter[] = [
  {
    id: "mapa",
    order: 1,
    sceneType: "day",
    title: "El mapa entre las raíces",
    text: "{personaje} llega al borde del Bosque Susurrante. Entre las raíces de un árbol gigante encuentra un mapa viejo. Sus líneas parecen moverse con la brisa. Al fondo, un sendero se divide en tres.",
    background: chapterOne,
    decisions: [
      {
        skillKey: "a",
        image: c1a,
        defaultLabel: "Avanzar decidido hacia el bosque más oscuro.",
        labelByCharacter: {
          nia: "Seguir el mapa directo hacia el bosque más oscuro, sin pensarlo dos veces.",
          bit: "Calcular la ruta más corta antes de avanzar.",
        },
      },
      {
        skillKey: "b",
        image: c1b,
        defaultLabel: "Revisar el mapa con calma antes de moverse.",
        labelByCharacter: {
          nia: "Estudiar el mapa con cuidado antes de dar un paso.",
          rok: "Buscar pistas ocultas dibujadas al margen del mapa.",
        },
      },
      {
        skillKey: "c",
        image: c1c,
        defaultLabel: "Buscar ayuda de algún animal cercano.",
        labelByCharacter: {
          nia: "Preguntarle a un ave del bosque si conoce el camino.",
          suri: "Escuchar con atención lo que el bosque parece susurrar.",
        },
      },
    ],
  },
  {
    id: "zorro",
    order: 2,
    sceneType: "day",
    title: "El guardián del sendero",
    text: "Más adelante, {personaje} encuentra un zorro cojo sentado en medio del camino. No parece peligroso, pero tiembla y mira una espina atrapada en su pata. El sendero es estrecho y hay que decidir cómo ayudarlo.",
    background: chapterTwo,
    decisions: [
      {
        skillKey: "a",
        image: c2a,
        defaultLabel: "Acercarse con decisión para ayudar al zorro.",
        labelByCharacter: {
          nia: "Dar un paso valiente y acercarse despacio para retirar la espina.",
        },
      },
      {
        skillKey: "b",
        image: c2b,
        defaultLabel: "Buscar una forma cuidadosa de retirar la espina.",
        labelByCharacter: {
          nia: "Usar dos ramitas para sacar la espina con mucho ingenio.",
        },
      },
      {
        skillKey: "c",
        image: c2c,
        defaultLabel: "Hablar con calma para ganar la confianza del zorro.",
        labelByCharacter: {
          nia: "Ofrecerle amistad al zorro y tranquilizarlo con palabras suaves.",
        },
      },
    ],
  },
  {
    id: "puente",
    order: 3,
    sceneType: "day",
    title: "El puente roto",
    text: "El zorro guía a {personaje} hasta un río brillante. El viejo puente de cuerdas está roto y varias tablas flotan cerca de la orilla. Al otro lado, una marca del mapa brilla sobre una roca.",
    background: chapterThree,
    decisions: [
      {
        skillKey: "a",
        image: c3a,
        defaultLabel: "Usar las cuerdas firmes para intentar cruzar.",
        labelByCharacter: {
          nia: "Avanzar con valentía por las cuerdas que todavía están firmes.",
        },
      },
      {
        skillKey: "b",
        image: c3b,
        defaultLabel: "Idear una balsa con las tablas sueltas.",
        labelByCharacter: {
          nia: "Construir una pequeña balsa usando su ingenio y las tablas sueltas.",
        },
      },
      {
        skillKey: "c",
        image: c3c,
        defaultLabel: "Buscar ayuda para reparar el puente entre todos.",
        labelByCharacter: {
          nia: "Pedir ayuda a sus nuevos amigos para reparar el puente.",
        },
      },
    ],
  },
  {
    id: "cueva",
    order: 4,
    sceneType: "night",
    title: "Los símbolos de la cueva",
    text: "Cuando cae la noche, {personaje} entra en una cueva iluminada por hongos azules. Las paredes muestran símbolos de estrellas, hojas y huellas. El mapa señala una puerta de piedra sin manija.",
    background: chapterFour,
    decisions: [
      {
        skillKey: "a",
        image: c4a,
        defaultLabel: "Tocar con decisión el símbolo que más brilla.",
        labelByCharacter: {
          nia: "Reunir valentía y tocar el símbolo que brilla con más fuerza.",
        },
      },
      {
        skillKey: "b",
        image: c4b,
        defaultLabel: "Comparar los símbolos con las marcas del mapa.",
        labelByCharacter: {
          nia: "Usar su ingenio para comparar la pared con el mapa.",
        },
      },
      {
        skillKey: "c",
        image: c4c,
        defaultLabel: "Seguir la pista que muestra el compañero del camino.",
        labelByCharacter: {
          nia: "Confiar en su amistad con el zorro y observar la pista que señala.",
        },
      },
    ],
  },
  {
    id: "aldea",
    order: 5,
    sceneType: "night",
    title: "La puerta de la aldea perdida",
    text: "La puerta se abre y revela la aldea perdida bajo un cielo lleno de estrellas. Sus habitantes celebran al ver de nuevo el mapa que creían perdido. {personaje} comprende que cada elección ayudó a encontrar el camino. Ahora queda decidir cómo compartir el descubrimiento.",
    background: chapterFive,
    decisions: [
      {
        skillKey: "a",
        image: c5a,
        defaultLabel: "Contar ante la aldea cómo se superó cada obstáculo.",
        labelByCharacter: {
          nia: "Contar con valentía ante todos cómo encontró el sendero perdido.",
        },
      },
      {
        skillKey: "b",
        image: c5b,
        defaultLabel: "Dibujar un mapa nuevo para futuros viajeros.",
        labelByCharacter: {
          nia: "Usar su ingenio para dibujar un mapa que nadie pueda perder.",
        },
      },
      {
        skillKey: "c",
        image: c5c,
        defaultLabel: "Celebrar con quienes ayudaron durante el viaje.",
        labelByCharacter: {
          nia: "Compartir la celebración con todos los amigos que encontró.",
        },
      },
    ],
  },
  {
    id: "nuevo-sendero",
    order: 6,
    sceneType: "night",
    title: "Un camino para todos",
    text: "Antes de despedirse, {personaje} mira el mapa junto a los habitantes de la aldea. Entre todos dibujan señales para que nadie vuelva a perder el sendero. Las estrellas iluminan una nueva ruta hacia casa. La aventura termina, pero el mapa ya guarda el comienzo de otra.",
    background: storyScene(STORY_ID, 6, "scene"),
    decisions: [
      {
        skillKey: "a",
        image: storyScene(STORY_ID, 6, "a"),
        defaultLabel:
          "Guiar el primer recorrido por el sendero recién marcado.",
        labelByCharacter: {
          nia: "Guiar con valentía el primer recorrido por el nuevo sendero.",
        },
      },
      {
        skillKey: "b",
        image: storyScene(STORY_ID, 6, "b"),
        defaultLabel: "Añadir al mapa señales claras para cada cruce.",
        labelByCharacter: {
          nia: "Usar su ingenio para dibujar señales fáciles de recordar.",
        },
      },
      {
        skillKey: "c",
        image: storyScene(STORY_ID, 6, "c"),
        defaultLabel: "Invitar a todos a cuidar juntos la nueva ruta.",
        labelByCharacter: {
          nia: "Reunir a sus amigos para cuidar juntos el sendero.",
        },
      },
    ],
  },
];

const chapterExpressions: Expression[] = [
  "neutral",
  "friend",
  "courage",
  "wit",
  "friend",
];

const questions: [Question, Question] = [
  {
    prompt: "¿Qué encontró {personaje} al borde del Bosque Susurrante?",
    options: ["Un mapa viejo", "Un dragón dormido", "Un cofre del tesoro"],
    correctIndex: 0,
    coinReward: 1,
  },
  {
    prompt: "¿Por qué crees que {personaje} decidió ayudar al zorro?",
    options: [
      "Porque quería asustarlo",
      "Porque entendió que necesitaba ayuda",
      "Porque el mapa se lo ordenó",
    ],
    correctIndex: 1,
    coinReward: 2,
  },
];

function createStoryShell(
  id: string,
  title: string,
  blurb: string,
  coverImage: string,
  place: string,
  goal: string,
  ownerId = "nia",
  unlockCost = 0,
): Story {
  const opening = storyV3Opening(id) ?? coverImage;
  const art = (chapter: number, variant: SceneVariant) => {
    if (
      id === "rio-cantor" ||
      id === "faro-nubes" ||
      id === "jardin-gigantes" ||
      id.startsWith("teo-") ||
      id.startsWith("bit-") ||
      id.startsWith("luma-") ||
      id.startsWith("rok-") ||
      id.startsWith("suri-")
    ) {
      const scene = storyV3Scene(id, chapter) ?? opening;
      if (variant === "scene" || chapter > 4) return scene;
      return (
        storyV3Choice(id, chapter, variant) ??
        storyV3Decision(id, chapter) ??
        storyV2Scene(id, chapter, variant)
      );
    }
    if (id === MODEL_STORY_ID) {
      if (variant === "scene") return opening;
      if (chapter === 1) {
        if (variant === "a") return rioChapterOneChoiceA;
        if (variant === "b") return rioChapterOneChoiceB;
        if (variant === "c") return rioChapterOneChoiceC;
      }
      if (chapter === 2) {
        if (variant === "a") return rioChapterTwoChoiceA;
        if (variant === "b") return rioChapterTwoChoiceB;
        if (variant === "c") return rioChapterTwoChoiceC;
      }
      if (chapter === 3) {
        if (variant === "a") return rioChapterThreeChoiceA;
        if (variant === "b") return rioChapterThreeChoiceB;
        if (variant === "c") return rioChapterThreeChoiceC;
      }
      if (chapter === 4) {
        if (variant === "a") return rioChapterFourChoiceA;
        if (variant === "b") return rioChapterFourChoiceB;
        if (variant === "c") return rioChapterFourChoiceC;
      }
    }
    return storyScene(id, chapter, variant);
  };
  const trialChapters: Chapter[] = [
    {
      id: "entrada",
      order: 1,
      sceneType: "day",
      title: `La entrada a ${place}`,
      text: `{personaje} llega a ${place} y descubre que ${goal}. Una señal brillante marca tres caminos posibles. El viaje acaba de comenzar.`,
      background: art(1, "scene"),
      decisions: [
        {
          skillKey: "a",
          image: art(1, "a"),
          defaultLabel: "Dar el primer paso con decisión.",
        },
        {
          skillKey: "b",
          image: art(1, "b"),
          defaultLabel: "Observar las pistas antes de avanzar.",
        },
        {
          skillKey: "c",
          image: art(1, "c"),
          defaultLabel: "Buscar a alguien que conozca el lugar.",
        },
      ],
    },
    {
      id: "senal",
      order: 2,
      sceneType: "day",
      title: "Una señal inesperada",
      text: `{personaje} encuentra una señal escondida que confirma el camino. Cerca de ella hay huellas pequeñas y un sonido amistoso. Elegir cómo responder revelará una nueva pista.`,
      background: art(2, "scene"),
      decisions: [
        {
          skillKey: "a",
          image: art(2, "a"),
          defaultLabel: "Seguir las huellas sin perder tiempo.",
        },
        {
          skillKey: "b",
          image: art(2, "b"),
          defaultLabel: "Comparar la señal con las pistas anteriores.",
        },
        {
          skillKey: "c",
          image: art(2, "c"),
          defaultLabel: "Responder al sonido con un saludo amable.",
        },
      ],
    },
    {
      id: "desvio",
      order: 3,
      sceneType: "day",
      title: "El desvío",
      text: `El sendero cambia justo delante de {personaje}. Una ruta parece rápida y otra guarda marcas antiguas. No existe una respuesta incorrecta: cada elección muestra algo distinto del lugar.`,
      background: art(3, "scene"),
      decisions: [
        {
          skillKey: "a",
          image: art(3, "a"),
          defaultLabel: "Probar la ruta más directa.",
        },
        {
          skillKey: "b",
          image: art(3, "b"),
          defaultLabel: "Descifrar las marcas del camino antiguo.",
        },
        {
          skillKey: "c",
          image: art(3, "c"),
          defaultLabel: "Esperar y avanzar junto a los nuevos amigos.",
        },
      ],
    },
    {
      id: "secreto",
      order: 4,
      sceneType: "night",
      title: "El secreto despierta",
      text: `Al caer la noche, ${place} cambia de color. {personaje} comprende que cada pista forma parte de un mismo mensaje. Falta descubrir qué quiere contar.`,
      background: art(4, "scene"),
      decisions: [
        {
          skillKey: "a",
          image: art(4, "a"),
          defaultLabel: "Acercarse al brillo para verlo mejor.",
        },
        {
          skillKey: "b",
          image: art(4, "b"),
          defaultLabel: "Ordenar todas las pistas encontradas.",
        },
        {
          skillKey: "c",
          image: art(4, "c"),
          defaultLabel: "Escuchar lo que los habitantes recuerdan.",
        },
      ],
    },
    {
      id: "respuesta",
      order: 5,
      sceneType: "night",
      title: "La respuesta",
      text: `{personaje} descubre cómo ayudar: ${goal}. El plan necesita una última idea y la colaboración de quienes viven allí. Todos se preparan para intentarlo juntos.`,
      background: art(5, "scene"),
      decisions: [
        {
          skillKey: "a",
          image: art(5, "a"),
          defaultLabel: "Comenzar el plan con energía.",
        },
        {
          skillKey: "b",
          image: art(5, "b"),
          defaultLabel: "Revisar cada parte del plan.",
        },
        {
          skillKey: "c",
          image: art(5, "c"),
          defaultLabel: "Repartir las tareas para trabajar en equipo.",
        },
      ],
    },
    {
      id: "regreso",
      order: 6,
      sceneType: "night",
      title: "Una historia para recordar",
      text: `El plan funciona y ${place} vuelve a brillar. {personaje} guarda una pequeña señal del viaje y promete regresar. Cada decisión se convierte en una parte de la historia.`,
      background: art(6, "scene"),
      decisions: [
        {
          skillKey: "a",
          image: art(6, "a"),
          defaultLabel: "Contar cómo comenzó la aventura.",
        },
        {
          skillKey: "b",
          image: art(6, "b"),
          defaultLabel: "Dibujar lo aprendido para no olvidarlo.",
        },
        {
          skillKey: "c",
          image: art(6, "c"),
          defaultLabel: "Celebrar con todos los nuevos amigos.",
        },
      ],
    },
  ];
  if (id === MODEL_STORY_ID) {
    const modelCopy = [
      {
        title: "El río perdió su canción",
        text: "Nia llega al Río Cantor justo cuando el amanecer debería llenar el valle de música. Sin embargo, el agua avanza en silencio. Sobre las piedras flotan tres destellos: una nota roja, una azul y una verde. El búho de la orilla explica que la melodía se rompió durante la noche. Nia abre su mapa musical, escucha el rumor de las hojas y promete encontrar la primera nota antes de que el valle olvide la canción del río.",
        labels: [
          "Cruzar las piedras con cuidado para alcanzar la nota roja que flota junto a la orilla.",
          "Observar el ritmo de los destellos y descubrir por dónde viajó primero la nota roja.",
          "Pedir al ciervo y al búho que cuenten dónde escucharon el último sonido del río.",
        ],
      },
      {
        title: "Las huellas junto al agua",
        text: "La nota roja vuelve a brillar en el agua y deja pequeñas huellas sobre la arena húmeda. Nia las sigue río arriba hasta una cascada cubierta de musgo. Allí oye un tintineo: la segunda nota se esconde entre rocas lisas y resbalosas. El mapa muestra una espiral parecida a las piedras de la cascada. Nia comprende que la aventura no consiste en correr: necesita mirar, escuchar y cuidar a quienes conocen este lugar.",
        labels: [
          "Seguir las huellas por la orilla estrecha y llegar con valentía hasta la cascada.",
          "Comparar las piedras de la cascada con la espiral del mapa para encontrar la segunda nota.",
          "Saludar al pequeño guardián de la cascada y pedirle ayuda para hallar la nota escondida.",
        ],
      },
      {
        title: "El desvío de las dos corrientes",
        text: "Con dos notas guardadas en su mapa, Nia llega a un cruce donde el río se separa en dos corrientes. A la izquierda, el agua baja rápida entre rocas doradas. A la derecha, corre despacio bajo símbolos antiguos que parecen notas musicales. La tercera nota responde desde algún lugar, pero su eco cambia con cada corriente. Nia revisa lo aprendido: las huellas, la espiral y la ayuda de sus amigos. Ahora debe decidir qué pista seguir sin perder el camino de regreso.",
        labels: [
          "Atravesar la corriente más directa, saltando de roca en roca hasta seguir el eco de la tercera nota.",
          "Descifrar los símbolos musicales de la orilla antes de decidir hacia qué corriente continuar.",
          "Esperar al ciervo y al búho para cruzar juntos por el paso seguro que conocen.",
        ],
      },
      {
        title: "La melodía escondida",
        text: "Al final del desvío, Nia encuentra la tercera nota suspendida sobre un remolino tranquilo. Cuando la acerca a las otras dos, las tres forman un acorde breve y luminoso. Pero el río todavía no canta. El mapa revela que cada nota debe colocarse en un orden especial: primero la que guía, luego la que responde y al final la que reúne. Los animales del bosque recuerdan fragmentos de la antigua melodía. Nia escucha con atención mientras el agua vuelve a murmurar.",
        labels: [
          "Acercarse al brillo central y despertar el acorde con un primer paso valiente.",
          "Ordenar las tres notas y las piedras del remolino siguiendo las señales del mapa musical.",
          "Escuchar los recuerdos de los animales para completar juntos el ritmo que falta.",
        ],
      },
      {
        title: "El río vuelve a cantar",
        text: "Nia coloca las notas en el orden correcto. Primero suena la roja, después responde la azul y la verde reúne cada eco. La cascada despierta, las piedras vibran y el Río Cantor recupera una melodía que se escucha por todo el valle. El búho y el ciervo celebran con Nia. Ella guarda el mapa musical, agradece a sus amigos y vuelve a casa sabiendo que escuchar, observar y ayudar hicieron que el río cantara otra vez.",
        labels: [],
      },
    ];
    modelCopy.forEach((copy, index) => {
      trialChapters[index].title = copy.title;
      trialChapters[index].text = copy.text;
      trialChapters[index].decisions.forEach((decision, decisionIndex) => {
        decision.defaultLabel = copy.labels[decisionIndex];
      });
    });
    trialChapters[1].continuations = {
      a: {
        title: "El salto hasta la cascada",
        text: "Nia cruza las piedras y alcanza la nota roja. Su valor despierta un eco que señala la cascada, donde la segunda nota responde entre las rocas.",
      },
      b: {
        title: "El ritmo de los destellos",
        text: "Nia sigue el ritmo de los destellos y encuentra la nota roja sin mojar el mapa. El patrón dibuja una espiral que conduce a la cascada.",
      },
      c: {
        title: "Los amigos del río",
        text: "El ciervo y el búho recuerdan el último sonido del río. Con su ayuda, Nia encuentra la nota roja y llega a la cascada siguiendo sus indicaciones.",
      },
    };
    trialChapters[2].continuations = {
      a: {
        title: "Las huellas valientes",
        text: "Nia siguió las huellas por la orilla estrecha. Al otro lado de la cascada, la segunda nota revela que el río se divide en dos corrientes.",
      },
      b: {
        title: "La espiral del mapa",
        text: "La espiral del mapa encaja con las piedras y libera la segunda nota. Su brillo apunta hacia el desvío de las dos corrientes.",
      },
      c: {
        title: "El guardián de la cascada",
        text: "El pequeño guardián comparte la segunda nota con Nia. A cambio, le pide escuchar con cuidado al llegar al desvío del río.",
      },
    };
    trialChapters[3].continuations = {
      a: {
        title: "El eco entre las rocas",
        text: "Nia salta de roca en roca siguiendo el eco. La tercera nota la espera al final del desvío, junto a un remolino luminoso.",
      },
      b: {
        title: "Los símbolos que cantan",
        text: "Nia descifra los símbolos y descubre el orden de las notas. El último signo señala un remolino donde la tercera nota permanece escondida.",
      },
      c: {
        title: "El paso seguro",
        text: "Con el ciervo y el búho, Nia cruza por el paso seguro. Sus amigos oyen la tercera nota llamando desde un remolino tranquilo.",
      },
    };
    trialChapters[4].continuations = {
      a: {
        title: "El acorde despierta",
        text: "Nia se acerca al brillo central y el acorde despierta. Las tres notas ordenadas devuelven al río la melodía que el valle esperaba.",
      },
      b: {
        title: "El mapa completa la canción",
        text: "Nia ordena las notas según el mapa musical. La cascada responde y el río vuelve a cantar de principio a fin.",
      },
      c: {
        title: "La canción compartida",
        text: "Los recuerdos de los animales completan el ritmo. Nia une las notas y todos escuchan cómo el Río Cantor recupera su canción.",
      },
    };
  }
  // El quinto capítulo cierra cada aventura y conduce directamente a la evaluación.
  trialChapters[4].decisions = [];
  return {
    id,
    ownerId,
    title,
    blurb,
    coverImage,
    unlockCost,
    chapters: trialChapters.slice(0, 5),
    closingQuiz: {
      questions: [
        {
          prompt: `¿A qué lugar llegó {personaje} al comenzar la aventura?`,
          options: [place, "A una ciudad común", "A una playa vacía"],
          correctIndex: 0,
          coinReward: 1,
        },
        {
          prompt: `¿Qué ayudó a {personaje} a completar el viaje?`,
          options: [
            "Ignorar todas las pistas",
            "Observar, decidir y colaborar",
            "Esperar sin hacer nada",
          ],
          correctIndex: 1,
          coinReward: 2,
        },
        ...(id === MODEL_STORY_ID ||
        id === "faro-nubes" ||
        id === "jardin-gigantes" ||
        id.startsWith("teo-") ||
        id.startsWith("bit-") ||
        id.startsWith("luma-") ||
        id.startsWith("rok-") ||
        id.startsWith("suri-")
          ? [
              {
                prompt: `¿Qué consiguió {personaje} al completar la aventura en ${place}?`,
                options: [
                  "Ayudar a que el lugar volviera a brillar",
                  "Perder todas las pistas",
                  "Olvidar a sus amigos",
                ] as [string, string, string],
                correctIndex: 0,
                coinReward: 3 as const,
              },
            ]
          : []),
      ],
    },
  };
}

const stories: Story[] = [
  {
    id: STORY_ID,
    ownerId: "nia",
    title: "El Sendero Perdido",
    blurb: "Un mapa antiguo conduce hasta una aldea olvidada.",
    coverImage: senderoCover,
    unlockCost: 0,
    chapters,
    closingQuiz: { questions },
  },
  createStoryShell(
    "faro-nubes",
    "La Exploradora que No Escuchaba",
    "Nia sube al Faro de las Nubes sin escuchar a la vieja lechuza.",
    faroNubesCover,
    "el faro de las nubes",
    "Nia debe llevar la chispa nueva al faro antes de la noche",
  ),
  createStoryShell(
    "nube-engranajes",
    "La Nube de Engranajes",
    "Una ciudad flotante ha perdido el compás de sus máquinas.",
    nubeCover,
    "la ciudad de las nubes",
    "sus engranajes deben volver a trabajar en armonía",
  ),
  createStoryShell(
    "rio-cantor",
    "El Río que se Quedó Callado",
    "Un tronco enorme calla al río, y Nia quiere moverlo ella sola.",
    rioCover,
    "el río que canta",
    "el río necesita volver a cantar antes de la fiesta",
  ),
  createStoryShell(
    "biblioteca-luna",
    "La Biblioteca bajo la Luna",
    "Los libros secretos despiertan cuando aparece la luna.",
    bibliotecaCover,
    "la biblioteca lunar",
    "un libro perdido debe regresar a su estante",
  ),
  createStoryShell(
    "jardin-gigantes",
    "La Exploradora que Contaba de Más",
    "Nia exagera sus aventuras… hasta el día en que dice la verdad.",
    jardinGigantesCover,
    "el jardín de los gigantes",
    "el jardín debe salvarse de la oruga hambrienta",
    "nia",
    5,
  ),
  createStoryShell(
    "teo-taller-estrellas",
    "El Engranaje Escondido",
    "Teo pone un engranaje al revés… y decide esconderlo.",
    teoTallerCover,
    "el taller de las estrellas",
    "la máquina de estrellas debe funcionar para la noche de las fugaces",
    "teo",
  ),
  createStoryShell(
    "teo-ciudad-cobre",
    "El Inventor y la Hormiga",
    "Todo el verano inventando juguetes… y el invierno llega a Ciudad Cobre.",
    teoCiudadCover,
    "la ciudad de cobre",
    "la estufa de la ciudad debe estar lista antes de la primera nevada",
    "teo",
  ),
  createStoryShell(
    "teo-bosque-brujulas",
    "El Inventor que Miraba su Invento",
    "Teo inventa una brújula que habla… y deja de mirar el camino.",
    teoBosqueCover,
    "el bosque de las brújulas",
    "Teo debe llevar la tarta a la fiesta del claro",
    "teo",
    5,
  ),
  createStoryShell(
    "bit-observatorio-luz",
    "El Robot que Culpó sin Pruebas",
    "El proyector de estrellas se apaga y Bit acusa a las golondrinas.",
    bitObservatorioCover,
    "el observatorio de la luz",
    "el proyector de estrellas debe funcionar para la noche del cometa",
    "bit",
  ),
  createStoryShell(
    "bit-lago-ecos",
    "La Verdad con Cariño",
    "Bit siempre dice la verdad… aunque a veces duela.",
    bitLagoCover,
    "el lago de los ecos",
    "Ruli debe volver a cantar en el concierto del lago",
    "bit",
  ),
  createStoryShell(
    "bit-ciudad-semillas",
    "Las Uvas Verdes de Bit",
    "Bit no alcanza la flor de luz… y dice que no sirve para nada.",
    bitSemillasCover,
    "la ciudad de las semillas",
    "la flor de luz de la torre debe brillar para las semillas",
    "bit",
    5,
  ),
  createStoryShell(
    "luma-faro-mareas",
    "La Gaviota de las Plumas Brillantes",
    "Una gaviota muy simpática y un cangrejo gruñón. ¿A quién creerá Luma?",
    lumaFaroMareasCover,
    "el faro de las mareas",
    "las barcas necesitan la luz del faro antes de que llegue la niebla",
    "luma",
  ),
  createStoryShell(
    "luma-isla-barcas",
    "La Barca Perfecta",
    "Luma quiere la barca más perfecta del mar… y la carrera es mañana.",
    lumaIslaBarcasCover,
    "la isla de las barcas",
    "la barca debe estar lista para la carrera de mañana",
    "luma",
  ),
  createStoryShell(
    "luma-arrecife-cristal",
    "La Concha y su Reflejo",
    "Una concha rosada, un agua que engaña y un regalo para la abuela.",
    lumaArrecifeCristalCover,
    "el arrecife de cristal",
    "la concha rosada debe llegar a casa de la abuela",
    "luma",
    5,
  ),
  createStoryShell(
    "rok-cueva-ecos",
    "El Murciélago y el Gran Rugido",
    "Rok se ríe de un murciélago diminuto… hasta que se queda a oscuras.",
    rokCuevaEcosCover,
    "la cueva de los ecos dorados",
    "Rok necesita salir de la cueva a oscuras",
    "rok",
  ),
  createStoryShell(
    "rok-valle-promesas",
    "El Dragón que Prometía de Más",
    "Rok dice que sí a todo, y esta noche llega una tormenta.",
    rokVallePromesasCover,
    "el valle de las promesas",
    "el puente, el tejado y las manzanas deben estar listos antes de la tormenta",
    "rok",
  ),
  createStoryShell(
    "rok-nube-volcan",
    "El Dragón que Tenía Prisa",
    "El dragón más rápido del valle aprende que el pan no quiere prisa.",
    rokNubeVolcanCover,
    "el pueblo de la abuela Tula",
    "cien panes deben estar listos para la fiesta",
    "rok",
    5,
  ),
  createStoryShell(
    "suri-lago-reflejos",
    "El Espíritu y su Corona",
    "Suri adora su corona de hojas y se avergüenza de sus pies descalzos.",
    suriLagoReflejosCover,
    "el lago de los reflejos",
    "Suri debe llegar a la fiesta de la luna al otro lado del bosque",
    "suri",
  ),
  createStoryShell(
    "suri-arbol-luciernagas",
    "La Luciérnaga Pequeña",
    "Suri tiene prisa por encender el gran árbol… y no ayuda a la más pequeña.",
    suriArbolLuciérnagasCover,
    "el árbol de las luciérnagas",
    "el gran árbol debe encenderse para guiar a los pájaros de la noche",
    "suri",
  ),
  createStoryShell(
    "suri-sendero-semillas",
    "Del Dicho al Hecho",
    "Todos tienen un plan para salvar las semillas… pero nadie quiere hacerlo.",
    suriSenderoSemillasCover,
    "el sendero de las semillas",
    "las semillas del sendero deben salvarse del cuervo",
    "suri",
    5,
  ),
];
const visibleStories = stories.filter(({ id }) =>
  [
    MODEL_STORY_ID,
    "faro-nubes",
    "jardin-gigantes",
    "teo-taller-estrellas",
    "teo-ciudad-cobre",
    "teo-bosque-brujulas",
    "bit-observatorio-luz",
    "bit-lago-ecos",
    "bit-ciudad-semillas",
    "luma-faro-mareas",
    "luma-isla-barcas",
    "luma-arrecife-cristal",
    "rok-cueva-ecos",
    "rok-valle-promesas",
    "rok-nube-volcan",
    "suri-lago-reflejos",
    "suri-arbol-luciernagas",
    "suri-sendero-semillas",
  ].includes(id),
);

// `temptation`: la opción es la tentación de la fábula. No suma habilidad; deja esta lección.
type AuthoredPath = { label: string; title: string; text: string; lesson?: string; temptation?: string };

// Clave `historia:capítulo:opción` → lección de la tentación.
const temptationLessons = new Map<string, string>();
const temptationLesson = (decisionKey: string, skillKey?: SkillKey) =>
  skillKey ? temptationLessons.get(`${decisionKey}:${skillKey}`) : undefined;

// `paths[i]` escribe las 3 opciones del capítulo i+1 y la continuación que cada una abre en el
// capítulo siguiente; sin `paths` se usan las frases genéricas. `quiz` sustituye al cuestionario final.
const authoredStoryContent: Record<
  string,
  {
    titles: string[];
    texts: string[];
    lesson: string;
    paths?: Record<SkillKey, AuthoredPath>[];
    endingPaths?: Record<SkillKey, AuthoredPath>;
    choiceBeats?: Record<SkillKey, [label: string, action: string]>[];
    quiz?: Question[];
  }
> = {
  "rio-cantor": {
    lesson: "Juntos se puede lo que solos no.",
    titles: [
      "Un tronco enorme",
      "Un palo se rompe",
      "La roca",
      "¡El patito!",
      "El río canta otra vez",
    ],
    texts: [
      "El Río que Canta se ha quedado callado. Un tronco enorme tapa el agua y los peces ya no bailan.\n\n—¡Yo lo muevo! —dice Nia, y empuja con todas sus fuerzas. Bruno, el castor, asoma la cabeza: —¿Te ayudo? Mi familia sabe mover troncos.",
      "El tronco no se mueve ni un dedo. Nia busca un palo largo para hacer palanca. ¡Crac! El palo se rompe.\n\nBruno silba y aparecen cinco castores más. —Un palo solo se rompe —dice—. Muchos juntos, no. Nia cruza los brazos.",
      "Con un haz de palos atados, el tronco se mueve un poquito. ¡Pero se atasca en una roca grande!\n\n—Necesitamos a alguien en la cuerda y a otros empujando —dice Bruno. Nia mira la cuerda. Ella quiere empujar, para que todos la vean.",
      "¡El tronco rueda y el río vuelve a cantar! Pero el agua sale tan fuerte que arrastra a un patito hacia la cascada.\n\nNia está en la orilla, cerca del patito. Bruno y los castores están lejos, al otro lado. ¿Qué hará Nia?",
      "El río canta otra vez, y los peces bailan entre las piedras. Los castores celebran con una fiesta de ramitas.\n\nNia se sienta con Bruno en la orilla. —Mañana construimos algo juntos —le dice. Y esta vez no piensa hacerlo sola.",
    ],
    paths: [
      {
        a: {
          label: "Preguntarle a Bruno cómo lo hace su familia.",
          title: "Contando hasta tres",
          text: "—Mi familia empuja a la vez, contando hasta tres —explica Bruno. Nia intenta sola con un palo como palanca. ¡Crac! Se rompe.\n\nBruno silba y aparecen cinco castores más. —Un palo solo se rompe —dice—. Muchos juntos, no.",
        },
        b: {
          label: "Empujar sola otra vez, más fuerte.",
          title: "Barro hasta las rodillas",
          text: "Nia empuja fuerte. ¡Uf! Se resbala y cae sentada en el barro. El tronco no se mueve ni un dedo.\n\nBruno silba y aparecen cinco castores. —Un tronco no se mueve con una sola pata —dice. Nia se limpia el barro y cruza los brazos.",
          temptation: "Hay cosas que nadie puede hacer solo.",
        },
        c: {
          label: "Mirar bien dónde está atascado el tronco.",
          title: "Entre dos piedras",
          text: "Nia mira de cerca: el tronco está atascado entre dos piedras. Prueba con un palo como palanca. ¡Crac! Se rompe.\n\nBruno silba y aparecen cinco castores más. —Un palo solo se rompe —dice—. Muchos juntos, no. Nia duda.",
        },
      },
      {
        a: {
          label: "Juntar muchos palos en un haz, como dice Bruno.",
          title: "El haz de palos",
          text: "Nia y Bruno atan muchos palos en un haz. ¡Esta vez no se rompe! El tronco se mueve un poquito.\n\nPero se atasca en una roca grande. —Unos a la cuerda y otros a empujar —dice Bruno. Nia quiere empujar, para que todos la vean.",
        },
        b: {
          label: "Dejar que los castores le enseñen.",
          title: "Clase de castores",
          text: "Los castores le enseñan a atar palos en un haz fuerte. Nia aprende rápido. El tronco se mueve un poquito.\n\nPero se atasca en una roca grande. —Unos a la cuerda y otros a empujar —dice Bruno. Nia quiere empujar, para que todos la vean.",
        },
        c: {
          label: "Buscar un palo más grande para ella sola.",
          title: "Otro ¡crac!",
          text: "Nia arrastra un palo enorme. ¡Crac! También se rompe. Bruno ata muchos palos en un haz, y ese no se rompe.\n\nEl tronco se mueve un poquito, pero se atasca en una roca. —Unos a la cuerda y otros a empujar —dice Bruno.",
          temptation: "Un palo solo se rompe; muchos juntos, no.",
        },
      },
      {
        a: {
          label: "Empujar al frente para ser la heroína.",
          title: "La heroína",
          text: "Nia empuja delante, pero nadie sujeta la cuerda y el tronco rueda hacia ella. ¡Salta justo a tiempo! Bruno agarra la cuerda.\n\n¡El río vuelve a cantar! Pero el agua arrastra a un patito hacia la cascada. Bruno y los castores están lejos.",
          temptation: "Ser la heroína importa menos que ayudar.",
        },
        b: {
          label: "Contar cuántos hacen falta en cada lado.",
          title: "Cuatro y dos",
          text: "Nia cuenta: cuatro en la cuerda y dos empujando. Bruno asiente. —¡Uno, dos, tres! El tronco rueda.\n\n¡El río vuelve a cantar! Pero el agua arrastra a un patito hacia la cascada. Bruno y los castores están lejos, al otro lado.",
        },
        c: {
          label: "Sujetar la cuerda, donde hace falta.",
          title: "La cuerda",
          text: "Nia sujeta la cuerda con fuerza mientras Bruno y los castores empujan. ¡El tronco rueda!\n\n¡El río vuelve a cantar! Pero el agua sale tan fuerte que arrastra a un patito hacia la cascada. Los castores están lejos, al otro lado.",
        },
      },
      {
        a: {
          label: "Lanzar la cuerda y pedir a los castores que tiren.",
          title: "¡Tirad!",
          text: "Nia lanza la cuerda al patito y grita: —¡Bruno, tirad! Los castores tiran todos a la vez, y el patito llega a la orilla.\n\nNia aprende que pedir ayuda a tiempo también es ser valiente.",
          lesson: "Pedir ayuda a tiempo también es ser valiente.",
        },
        b: {
          label: "Saltar sola al agua a por el patito.",
          title: "Solos no podemos todo",
          text: "Nia salta sola al agua. ¡La corriente la arrastra a ella también! Bruno y los castores forman una cadena y los sacan a los dos.\n\nNia, empapada, se ríe: —Solos no podemos todo. Juntos se puede lo que solos no.",
          lesson: "Juntos se puede lo que solos no.",
          temptation: "Juntos se puede lo que solos no.",
        },
        c: {
          label: "Formar una cadena de manos con todos.",
          title: "La cadena",
          text: "Nia, Bruno y los castores se dan la mano en una cadena larga. El último agarra al patito justo antes de la cascada.\n\nEl río canta más fuerte que nunca. Nia descubre que una cadena de amigos es más fuerte que cualquier brazo.",
          lesson: "Una cadena de amigos es más fuerte que un brazo.",
        },
      },
    ],
  },
  "faro-nubes": {
    lesson: "Quien no escucha consejo, se pierde.",
    titles: [
      "Tres consejos",
      "El puente de nubes",
      "Gotas gordas",
      "La nota de los guardianes",
      "La luz del faro",
    ],
    texts: [
      "El Faro de las Nubes se apagó. Nia debe subir con una chispa nueva en su farol. —Yo sé el camino —dice.\n\nOlivia, la lechuza, le da tres consejos: —Sigue las piedras blancas. No cruces las nubes con viento. Tapa la chispa si llueve.",
      "El camino llega a un puente hecho de nubes. Del otro lado se ve el faro, apagado. ¡Fiuuu! Sopla un viento fuerte.\n\nLas nubes del puente se estiran como algodón. Olivia ulula desde una rama: —Recuerda mi segundo consejo.",
      "Nia cruza el puente cuando el viento se calma. Arriba, empiezan a caer gotas gordas. ¡Plic, plic! La chispa del farol tiembla.\n\nFalta muy poco para llegar al faro. Olivia vuela a su lado, mojada. —Mi tercer consejo —le recuerda.",
      "Nia llega al faro con la chispa viva. Arriba está la gran lámpara, fría y oscura. Junto a ella hay una nota antigua de los guardianes.\n\n—Esa nota dice cómo encenderla —dice Olivia. Pero Nia ya tiene la mecha en la mano. ¿Qué hará?",
      "La luz del faro cruza las nubes y guía a los pájaros de la noche. Abajo, el pueblo aplaude.\n\nNia baja la montaña junto a Olivia. Esta vez va por las piedras blancas, y escucha todo lo que la lechuza le cuenta.",
    ],
    paths: [
      {
        a: {
          label: "Seguir las piedras blancas.",
          title: "Las piedras blancas",
          text: "Nia sigue las piedras blancas, una tras otra. El camino es largo, pero seguro. Olivia vuela sobre su cabeza.\n\nAl final llega a un puente de nubes. ¡Fiuuu! Sopla un viento fuerte y las nubes se estiran como algodón.",
        },
        b: {
          label: "Pedirle a Olivia que la acompañe.",
          title: "Dos exploradoras",
          text: "—Te acompaño hasta el puente —dice Olivia, y vuela a su lado. Juntas siguen las piedras blancas.\n\nAl final llegan a un puente de nubes. ¡Fiuuu! Sopla un viento fuerte y las nubes se estiran como algodón.",
        },
        c: {
          label: "Tomar un atajo, ¡ella sabe el camino!",
          title: "El atajo",
          text: "Nia toma un atajo entre las rocas. ¡Se pierde entre zarzas y tiene que volver! Olivia la guía de nuevo hasta las piedras blancas.\n\nEl camino llega a un puente de nubes. ¡Fiuuu! Sopla un viento fuerte y las nubes se estiran como algodón.",
          temptation: "Un atajo sin mapa es un camino largo.",
        },
      },
      {
        a: {
          label: "Cruzar corriendo antes de que sople más.",
          title: "El viento empuja",
          text: "Nia cruza corriendo. ¡El viento la empuja y casi se cae! Se agarra a una nube hasta que Olivia la ayuda a volver. Esperan a que se calme.\n\nYa del otro lado, empiezan a caer gotas gordas. ¡Plic, plic! La chispa del farol tiembla.",
          temptation: "La prisa no gana al viento.",
        },
        b: {
          label: "Esperar a que el viento se calme.",
          title: "Paciencia",
          text: "Nia se sienta a esperar. Poco a poco, el viento se calma y el puente se queda quieto. Cruza despacio, y Olivia vuela a su lado.\n\nArriba, empiezan a caer gotas gordas. ¡Plic, plic! La chispa del farol tiembla.",
        },
        c: {
          label: "Preguntar a Olivia cuánto dura el viento.",
          title: "Contar hasta cien",
          text: "—El viento sopla un ratito y descansa —dice Olivia—. Cuenta hasta cien. Nia cuenta despacio, el viento se calma y cruza tranquila.\n\nArriba, empiezan a caer gotas gordas. ¡Plic, plic! La chispa del farol tiembla.",
        },
      },
      {
        a: {
          label: "Tapar el farol con su bufanda.",
          title: "La bufanda azul",
          text: "Nia tapa el farol con su bufanda azul. La lluvia cae, pero la chispa sigue brillando. Olivia ulula contenta.\n\nLlegan al faro. Arriba está la gran lámpara, fría y oscura. Junto a ella hay una nota antigua de los guardianes.",
        },
        b: {
          label: "Correr sin tapar el farol, ¡ya casi llega!",
          title: "La chispa que tiembla",
          text: "Nia corre sin tapar el farol. ¡La chispa casi se apaga! Olivia la cubre con sus alas justo a tiempo.\n\nLlegan al faro con la chispa viva, pero pequeña. Arriba está la gran lámpara, y junto a ella, una nota antigua de los guardianes.",
          temptation: "Lo que se protege a tiempo, no se pierde.",
        },
        c: {
          label: "Refugiarse con Olivia bajo una roca.",
          title: "Bajo la roca",
          text: "Nia y Olivia esperan bajo una roca hasta que para la lluvia. La chispa sigue viva y calentita.\n\nLuego suben al faro. Arriba está la gran lámpara, fría y oscura. Junto a ella hay una nota antigua de los guardianes.",
        },
      },
      {
        a: {
          label: "Encenderla a su manera, sin leer nada.",
          title: "Casi me pierdo tres veces",
          text: "Nia acerca la chispa a su manera. ¡Fsss! La mecha estaba mojada y la chispa casi se apaga. Olivia lee la nota: primero, secar la mecha.\n\nAl fin, el faro brilla. Nia suspira: —Quien no escucha consejo, se pierde. ¡Y casi me pierdo tres veces!",
          lesson: "Quien no escucha consejo, se pierde.",
          temptation: "Quien no escucha consejo, se pierde.",
        },
        b: {
          label: "Leer la nota con Olivia, paso a paso.",
          title: "Paso a paso",
          text: "Olivia y Nia leen la nota: secar la mecha, abrir la ventana, acercar la chispa. ¡El faro brilla sobre todas las nubes!\n\nNia sonríe. Aprendió que escuchar a quien sabe también es una forma de explorar.",
          lesson: "Escuchar a quien sabe también es explorar.",
        },
        c: {
          label: "Pedirle a Olivia que sostenga el farol.",
          title: "Buen equipo",
          text: "Olivia sostiene el farol con sus garras mientras Nia seca la mecha y enciende la lámpara. ¡El faro brilla otra vez!\n\n—Gracias por tus consejos —dice Nia. Aprendió que un buen consejo es como una luz en el camino.",
          lesson: "Un buen consejo es como una luz en el camino.",
        },
      },
    ],
  },
  "jardin-gigantes": {
    lesson: "Al que miente, nadie le cree aunque diga la verdad.",
    titles: [
      "Un caracol enorme",
      "Hojas mordidas",
      "¿Otra aventura inventada?",
      "La calabaza de la fiesta",
      "La verdad también es una aventura",
    ],
    texts: [
      "En el Jardín de los Gigantes, las calabazas son grandes como casas. A Nia le encanta contar aventuras y exagerarlas un poquito.\n\n—¡Vi un caracol enorme como un carro! —grita. Tomás, el topo jardinero, corre asustado. Solo era un caracol pequeño. Nia se ríe.",
      "Al día siguiente, Nia encuentra hojas gigantes mordidas, con agujeros redondos. Algo muy grande ha comido allí.\n\nLas huellas llevan hacia el huerto de coles. Tomás riega tranquilo en la otra punta. No sabe nada.",
      "Detrás de las coles hay una oruga enorme, verde y hambrienta. ¡Ñam, ñam! Se come una col en tres mordiscos.\n\nNia corre a avisar a Tomás y a los vecinos. —¿Otra aventura inventada? —dice Tomás, y sigue regando. Nadie se mueve.",
      "Por fin, los vecinos ven a la oruga. ¡Va derecha hacia la calabaza más grande, la de la fiesta!\n\nTomás tiembla. —Nia, tú que has visto tantas cosas, ¿qué hacemos? Todos la miran esperando. ¿Qué hará Nia?",
      "La calabaza de la fiesta se salva. Esa noche, Tomás le pide a Nia que cuente una aventura.\n\nNia cuenta lo que pasó de verdad, sin ponerle nada de más. Y resulta que la verdad también era una aventura estupenda.",
    ],
    paths: [
      {
        a: {
          label: "Contar otra aventura, ¡todavía más grande!",
          title: "Un gusano como un tren",
          text: "—¡Y ayer vi un gusano del tamaño de un tren! —exagera Nia. Tomás suspira y ya no corre. Sigue regando.\n\nAl día siguiente, Nia encuentra hojas gigantes mordidas, con agujeros redondos. Unas huellas llevan al huerto de coles. Tomás no sabe nada.",
          temptation: "Quien exagera mucho, pierde la confianza.",
        },
        b: {
          label: "Pedirle perdón a Tomás por el susto.",
          title: "Perdón, Tomás",
          text: "—Perdón por el susto, Tomás —dice Nia. El topo sonríe, pero le pide que no invente más.\n\nAl día siguiente, Nia encuentra hojas gigantes mordidas, con agujeros redondos. Unas huellas llevan al huerto de coles. Tomás riega en la otra punta.",
        },
        c: {
          label: "Ayudar a Tomás a regar las calabazas.",
          title: "Regando gigantes",
          text: "Nia ayuda a Tomás a regar las calabazas. El topo le cuenta que el jardín es muy delicado.\n\nAl día siguiente, Nia encuentra hojas gigantes mordidas, con agujeros redondos. Unas huellas llevan al huerto de coles. Tomás riega en la otra punta, sin saber nada.",
        },
      },
      {
        a: {
          label: "Seguir las huellas para ver qué es.",
          title: "Las huellas",
          text: "Nia sigue las huellas. Detrás de las coles hay una oruga enorme, verde y hambrienta. ¡Ñam! Se come una col en tres mordiscos.\n\nCorre a avisar. —¿Otra aventura inventada? —dice Tomás, y sigue regando. Nadie se mueve.",
        },
        b: {
          label: "Gritar que viene un monstruo con tres cabezas.",
          title: "El monstruo de tres cabezas",
          text: "—¡Viene un monstruo con tres cabezas! —grita Nia. Los vecinos se ríen. Luego ve lo que es de verdad: una oruga enorme comiéndose las coles.\n\nCorre a avisar otra vez. —¿Otra aventura inventada? —dice Tomás, y sigue regando. Nadie se mueve.",
          temptation: "Si inventas, tu verdad también suena a cuento.",
        },
        c: {
          label: "Contárselo a Tomás, tal como lo vio.",
          title: "Sin exagerar",
          text: "—Tomás, hay hojas mordidas y huellas grandes —dice Nia, sin exagerar. El topo duda y sigue regando.\n\nNia va a mirar: ¡una oruga enorme se come las coles! Vuelve corriendo, pero nadie se mueve. —¿Otra aventura inventada? —dice Tomás.",
        },
      },
      {
        a: {
          label: "Traer una hoja mordida como prueba.",
          title: "La prueba",
          text: "Nia trae una hoja mordida, grande como una sábana. Tomás la mira y se le ponen los pelos de punta. ¡Es verdad!\n\nLos vecinos corren a verla: la oruga va hacia la calabaza de la fiesta. —Nia, ¿qué hacemos? —pregunta Tomás.",
        },
        b: {
          label: "Llevar a Tomás de la mano a verlo.",
          title: "De la mano",
          text: "Nia lleva a Tomás de la mano hasta las coles. El topo abre mucho los ojos: ¡la oruga es real!\n\nLos vecinos llegan detrás. La oruga va derecha hacia la calabaza de la fiesta. —Nia, ¿qué hacemos? —pregunta Tomás.",
        },
        c: {
          label: "Gritar más fuerte y exagerar, a ver si así creen.",
          title: "Grande como una montaña",
          text: "Nia grita y exagera: —¡Es grande como una montaña! Los vecinos se tapan los oídos. Al fin, Tomás se asoma… y la ve.\n\nLa oruga va derecha hacia la calabaza de la fiesta. —Nia, ¿qué hacemos? —pregunta Tomás, temblando.",
          temptation: "Gritar más no hace más creíble una historia.",
        },
      },
      {
        a: {
          label: "Ofrecerle a la oruga las hojas viejas del montón.",
          title: "Hojas viejas",
          text: "Nia lleva las hojas viejas del montón. La oruga las prefiere y deja en paz la calabaza. ¡Se come todo el montón y se duerme!\n\nTomás aplaude. Nia aprende que una buena idea dicha con verdad vale más que mil aventuras inventadas.",
          lesson: "Una verdad sencilla vale más que mil cuentos.",
        },
        b: {
          label: "Construir con todos una valla de ramas.",
          title: "La valla",
          text: "Nia, Tomás y los vecinos hacen una valla de ramas. La oruga no puede pasar y se va a comer las hojas del bosque.\n\nLa calabaza se salva. Todos confían otra vez en Nia, porque esta vez dijo la verdad y ayudó.",
          lesson: "La confianza se gana diciendo la verdad.",
        },
        c: {
          label: "Inventar que sabe domar orugas.",
          title: "La domadora",
          text: "—¡Yo sé domar orugas! —dice Nia. Pero no sabe, y la oruga se come media calabaza. Tomás la aparta con hojas viejas.\n\nNia baja la cabeza. Aprende que al que miente, nadie le cree… ni siquiera cuando más lo necesita.",
          lesson: "Al que miente, nadie le cree aunque diga la verdad.",
          temptation: "Al que miente, nadie le cree aunque diga la verdad.",
        },
      },
    ],
  },
  "teo-taller-estrellas": {
    lesson: "Esconder un error lo hace más grande.",
    titles: [
      "¡Clonc!",
      "Humo gris",
      "Cien tornillos",
      "La alcaldesa",
      "Estrellas fugaces",
    ],
    texts: [
      "Esta noche, la máquina de Teo lanzará estrellas fugaces para el pueblo. Al montarla, pone un engranaje al revés. ¡Clonc!\n\nNadie lo ha visto. Teo lo tapa con una tela. Lía, la ratoncita aprendiz, pregunta: —¿Qué fue ese ruido? —Nada —dice Teo—. Nada de nada.",
      "La máquina empieza a temblar. ¡Clonc, clonc! Sale un humito gris por detrás de la tela.\n\nLía mira el humo, preocupada. En una hora vendrá la alcaldesa a ver las estrellas. Teo se muerde el labio.",
      "Bajo la tela aparece el engranaje al revés. Para arreglarlo, hay que desmontar media máquina. ¡Hay cien tornillos diminutos!\n\nLía tiene manos pequeñas, perfectas para tornillos. —Yo puedo ayudar —dice—. Pero tienes que contarme qué pasó.",
      "¡La máquina vuelve a girar suave! Justo entonces llega la alcaldesa con todo el pueblo. —¿Por qué salía humo hace un rato? —pregunta.\n\nTeo siente las mejillas calientes. Lía lo mira en silencio. ¿Qué hará Teo?",
      "Las estrellas fugaces cruzan el cielo, doradas y brillantes. Todo el pueblo pide deseos.\n\nTeo guarda el engranaje torcido en una cajita. —Para acordarme —le dice a Lía—. Un error contado a tiempo es solo un pequeño tropiezo.",
    ],
    paths: [
      {
        a: {
          label: "Contarle a Lía lo del engranaje.",
          title: "La confesión",
          text: "—Puse un engranaje al revés —confiesa Teo. Lía asiente: —Pues habrá que mirarlo.\n\nPero antes de que puedan, la máquina empieza a temblar. ¡Clonc, clonc! Sale un humito gris. En una hora vendrá la alcaldesa.",
        },
        b: {
          label: "Decir que el ruido lo hizo el gato.",
          title: "Culpa del gato",
          text: "—Fue el gato —dice Teo. Lía mira al gato, que duerme tranquilo en la ventana. No dice nada.\n\nDe pronto, la máquina empieza a temblar. ¡Clonc, clonc! Sale un humito gris. En una hora vendrá la alcaldesa.",
          temptation: "Culpar a otro no arregla nada.",
        },
        c: {
          label: "Mirar bajo la tela cómo quedó.",
          title: "Bajo la tela",
          text: "Teo levanta la tela. El engranaje está torcido, pero parece aguantar. Lía se acerca, muy curiosa, para mirarlo.\n\nDe pronto, la máquina empieza a temblar. ¡Clonc, clonc! Sale un humito gris. En una hora vendrá la alcaldesa.",
        },
      },
      {
        a: {
          label: "Tapar el humo con otra tela más grande.",
          title: "Más telas",
          text: "Teo pone otra tela encima. ¡El humo sale igual, y ahora huele a quemado! Lía levanta las telas: ahí está el engranaje al revés.\n\nHay que desmontar media máquina, con cien tornillos diminutos. —Yo puedo ayudar —dice Lía—. Pero cuéntame qué pasó.",
          temptation: "Tapar un problema no lo hace desaparecer.",
        },
        b: {
          label: "Buscar qué pieza hace el ruido.",
          title: "Siguiendo el clonc",
          text: "Teo escucha el ruido y sigue el clonc hasta el engranaje al revés. Para arreglarlo, hay que desmontar media máquina.\n\n¡Hay cien tornillos diminutos! Lía se ofrece: —Yo tengo manos pequeñas. Pero cuéntame qué pasó.",
        },
        c: {
          label: "Pedirle a Lía que traiga la caja de herramientas.",
          title: "La caja de herramientas",
          text: "Lía trae la caja de herramientas. Juntos quitan la tela y encuentran el engranaje al revés.\n\nHay que desmontar media máquina, con cien tornillos diminutos. —Yo puedo con los tornillos —dice Lía—. Pero cuéntame qué pasó.",
        },
      },
      {
        a: {
          label: "Contarle toda la verdad.",
          title: "La verdad",
          text: "Teo le cuenta todo a Lía. Ella sonríe y se pone manos a la obra. Tornillo a tornillo, la máquina vuelve a girar suave.\n\nJusto entonces llega la alcaldesa con todo el pueblo: —¿Por qué salía humo hace un rato?",
        },
        b: {
          label: "Dibujar un plano para arreglarlo juntos.",
          title: "El plano",
          text: "Teo dibuja un plano y le cuenta a Lía lo que pasó. Con el plano, arreglan la máquina en un santiamén.\n\nJusto entonces llega la alcaldesa con todo el pueblo: —¿Por qué salía humo hace un rato? —pregunta, mirando a Lía.",
        },
        c: {
          label: "Decirle a Lía que fue culpa suya.",
          title: "Culpa de Lía",
          text: "—Fue culpa tuya —dice Teo. Lía baja las orejas, triste, pero ayuda igual. Teo se siente fatal y le pide perdón.\n\nJuntos terminan justo a tiempo. Llega la alcaldesa con todo el pueblo: —¿Por qué salía humo hace un rato?",
          temptation: "Echar la culpa a un amigo duele a los dos.",
        },
      },
      {
        a: {
          label: "Contar que se equivocó y cómo lo arreglaron.",
          title: "Buenos inventores",
          text: "—Me equivoqué con un engranaje —dice Teo—. Lía y yo lo arreglamos. La alcaldesa sonríe: —Eso es de buenos inventores.\n\nLas estrellas cruzan el cielo. Teo aprende que decir la verdad le quita un peso de encima.",
          lesson: "Decir la verdad te quita un peso de encima.",
        },
        b: {
          label: "Decir que el humo era parte del espectáculo.",
          title: "Una estrella torcida",
          text: "—El humo era parte del espectáculo —dice Teo. Pero la máquina tose otra vez… ¡y una estrella sale torcida! Lía arregla un tornillo suelto.\n\nTeo por fin cuenta la verdad. Aprende que esconder un error lo hace más grande.",
          lesson: "Esconder un error lo hace más grande.",
          temptation: "Esconder un error lo hace más grande.",
        },
        c: {
          label: "Presentar a Lía como la gran ayudante.",
          title: "La gran ayudante",
          text: "—Hoy la gran ayudante fue Lía —dice Teo, y cuenta lo del engranaje. El pueblo aplaude a los dos.\n\nLas estrellas cruzan el cielo. Teo aprende que reconocer un error y a quien te ayudó te hace más grande.",
          lesson: "Reconocer tus errores te hace más grande.",
        },
      },
    ],
  },
  "teo-ciudad-cobre": {
    lesson: "Hay tiempo para jugar y tiempo para prepararse.",
    titles: [
      "Patines de resortes",
      "El tubo de cobre",
      "Nubes de nieve",
      "La estufita de Ada",
      "Calor para todos",
    ],
    texts: [
      "Es verano en Ciudad Cobre. Teo debe construir la gran estufa de la ciudad antes del invierno. ¡Pero hace tanto calor!\n\nAda, la hormiga, pasa cargando leña. —¿Y tu estufa? —pregunta. —¡Hay tiempo! —dice Teo, y sigue con sus patines de resortes.",
      "Llega el otoño. El viento sopla frío. La estufa de Teo está a medias: falta un tubo de cobre.\n\nEl mercado solo lo vende hasta mañana. Pero sus amigos lo llaman: —¡Teo, ven a probar los patines en la cuesta! Ada lo mira de reojo.",
      "Teo ya tiene el tubo. Pero en el cielo aparecen nubes blancas y gordas: ¡la primera nevada está cerca!\n\nLa estufa está casi lista, pero no hay carbón. Ada tiene su almacén lleno, porque trabajó todo el verano.",
      "¡La gran estufa se enciende! Cae la nieve, y la ciudad se llena de calor. Pero Ada llega tiritando.\n\n—Mi estufita se rompió con el frío —dice. Teo mira sus patines de resortes, y luego mira a Ada. ¿Qué hará?",
      "La nieve cubre Ciudad Cobre, pero nadie pasa frío. La gran estufa ronronea como un gato.\n\nTeo guarda sus patines para la primavera. —El año que viene —le dice a Ada—, primero la estufa y después los juguetes.",
    ],
    paths: [
      {
        a: {
          label: "Terminar los patines, ¡la estufa puede esperar!",
          title: "Todo el verano patinando",
          text: "Teo pasa el verano con sus patines. ¡Qué divertido! Ada pasa y pasa con su leña. Llega el otoño y la estufa está a medias.\n\nFalta un tubo de cobre. El mercado solo lo vende hasta mañana. Sus amigos lo llaman a patinar.",
          temptation: "El verano pasa rápido si solo juegas.",
        },
        b: {
          label: "Hacer una lista de lo que necesita la estufa.",
          title: "La lista",
          text: "Teo escribe una lista: patas, puerta, tubo, carbón. Trabaja un poco cada día, aunque también juega. Ada lo saluda contenta.\n\nLlega el otoño. Solo falta un tubo grande de cobre, y el mercado lo vende hasta mañana. Sus amigos lo llaman a patinar.",
        },
        c: {
          label: "Ayudar a Ada con la leña y preguntarle.",
          title: "Un poco cada día",
          text: "Teo carga leña con Ada. —Un poco cada día, y el invierno no te pilla —explica ella. Teo empieza su estufa esa tarde.\n\nLlega el otoño. Falta un tubo de cobre, y el mercado lo vende hasta mañana. Sus amigos lo llaman a patinar.",
        },
      },
      {
        a: {
          label: "Ir primero al mercado a por el tubo.",
          title: "Primero el tubo",
          text: "Teo corre al mercado y compra el tubo de cobre. Patinará mañana. Lo monta esa misma noche.\n\nEn el cielo aparecen nubes blancas y gordas. La estufa está casi lista, pero no hay carbón. Ada tiene su almacén lleno.",
        },
        b: {
          label: "Pedirle a Ada que le guarde el tubo.",
          title: "Ada ayuda",
          text: "Ada compra el tubo y se lo guarda. Teo patina un ratito y luego lo monta con ella. —Gracias, Ada —le dice.\n\nEn el cielo aparecen nubes blancas y gordas. La estufa está casi lista, pero no hay carbón. Ada tiene su almacén lleno.",
        },
        c: {
          label: "Ir a patinar, ¡el tubo puede esperar!",
          title: "El último tubo",
          text: "Teo patina toda la tarde. Al día siguiente, el mercado está cerrando. ¡Consigue el último tubo por los pelos!\n\nEn el cielo aparecen nubes blancas y gordas. La estufa está casi lista, pero no hay carbón. Ada tiene su almacén lleno.",
          temptation: "Lo que dejas para luego, luego corre prisa.",
        },
      },
      {
        a: {
          label: "Buscar carbón por la ciudad antes de pedir.",
          title: "Un poquito de carbón",
          text: "Teo busca por toda la ciudad y encuentra solo un poquito. Ada le presta el resto, y él promete devolvérselo.\n\n¡La gran estufa se enciende! Cae la nieve. Más tarde, Ada llega tiritando: su estufita se rompió.",
        },
        b: {
          label: "Exigirle a Ada su carbón, ¡la estufa es de todos!",
          title: "No se exige",
          text: "—¡Dame tu carbón, la estufa es de todos! —exige Teo. Ada frunce el ceño. Teo se da cuenta y le pide perdón. Ella le presta un saco.\n\n¡La gran estufa se enciende! Cae la nieve. Más tarde, Ada llega tiritando: su estufita se rompió.",
          temptation: "Lo que otro guardó con esfuerzo se pide, no se exige.",
        },
        c: {
          label: "Ofrecer a Ada algo a cambio.",
          title: "Una carretilla con resortes",
          text: "Teo le ofrece a Ada un invento: una carretilla con resortes para su leña. Ada, feliz, le da el carbón.\n\n¡La gran estufa se enciende! Cae la nieve. Más tarde, Ada llega tiritando: su estufita se rompió con el frío.",
        },
      },
      {
        a: {
          label: "Seguir jugando, ya ayudará mañana.",
          title: "Mañana es tarde",
          text: "Teo sale a patinar en la nieve. Cuando vuelve, Ada sigue tiritando. Teo se siente mal y arregla la estufita a toda prisa.\n\nAprende que hay tiempo para jugar y tiempo para prepararse… y para ayudar.",
          lesson: "Hay tiempo para jugar y tiempo para prepararse.",
          temptation: "Hay tiempo para jugar y tiempo para prepararse.",
        },
        b: {
          label: "Arreglar la estufita de Ada con sus resortes.",
          title: "Resortes útiles",
          text: "Teo usa los resortes de sus patines para arreglar la estufita de Ada. ¡Funciona mejor que nunca! La hormiga se calienta las patas.\n\nAda sonríe. Teo aprende que lo que inventas jugando puede servir cuando llega el frío.",
          lesson: "Lo que aprendes jugando puede servir en el frío.",
        },
        c: {
          label: "Invitar a Ada a calentarse en la gran estufa.",
          title: "Todos juntos",
          text: "Teo invita a Ada a la gran estufa. Toda la ciudad se sienta junta, contando historias y tomando chocolate. La hormiga trae su taza diminuta.\n\nTeo aprende que el calor, como el trabajo, es mejor cuando se comparte.",
          lesson: "El calor es mejor cuando se comparte.",
        },
      },
    ],
  },
  "teo-bosque-brujulas": {
    lesson: "Mira por dónde pisas, no solo tu invento.",
    titles: [
      "¡Norte, norte!",
      "El arroyo",
      "La brújula loca",
      "El hoyo de hojas",
      "La fiesta del claro",
    ],
    texts: [
      "Teo inventó una brújula que habla: —¡Norte, norte! —canta. Hoy cruzará el bosque para llevar la tarta a la fiesta del claro.\n\nPinto, el pájaro carpintero, avisa: —Hay raíces, charcos y ramas bajas. —Mi brújula lo sabe todo —dice Teo, sin levantar la vista.",
      "Llegan a un arroyo con piedras para cruzar. —¡Recto, recto! —canta la brújula.\n\nPero las piedras brillan de musgo y están muy resbaladizas. Pinto se posa en una rama: —Mira bien dónde pones los pies, Teo.",
      "Dentro del bosque, la brújula se vuelve loca: —¡Norte! ¡Sur! ¡Norte! Una roca brillante la confunde.\n\nPinto se ríe: —El musgo crece en el lado norte de los árboles. Y las hormigas van al claro. Teo mira su invento, sacudiéndolo.",
      "Ya se oye la música de la fiesta. La brújula vuelve a cantar: —¡Recto, recto! Pero justo delante hay un hoyo tapado de hojas.\n\nPinto lo ve desde arriba. Teo lleva la tarta en las manos y la brújula colgada del cuello. ¿Qué hará?",
      "En el claro, los animales bailan y comen tarta. Pinto marca el ritmo con el pico: ¡toc, toc, toc!\n\nTeo guarda la brújula en el bolsillo. —Ahora sé cuándo mirarla —dice—. Y cuándo mirar el bosque.",
    ],
    paths: [
      {
        a: {
          label: "Mirar el camino y, a veces, la brújula.",
          title: "Ojos en el camino",
          text: "Teo mira el camino y, a veces, la brújula. Salta raíces y esquiva ramas. Pinto vuela contento sobre él.\n\nLlegan a un arroyo con piedras llenas de musgo. —¡Recto, recto! —canta la brújula. Pero las piedras resbalan mucho.",
        },
        b: {
          label: "Pedirle a Pinto que vuele delante.",
          title: "El vigía",
          text: "Pinto vuela delante y avisa: —¡Raíz! ¡Rama baja! Teo levanta la vista y llega al arroyo sin un rasguño.\n\nPara cruzar hay piedras llenas de musgo. —¡Recto, recto! —canta la brújula. Pero las piedras resbalan mucho bajo sus botas.",
        },
        c: {
          label: "Caminar mirando solo la brújula.",
          title: "¡Plaf!",
          text: "Teo camina mirando la brújula. ¡Plaf! Tropieza con una raíz y casi se le cae la tarta. Pinto se ríe desde una rama.\n\nLlegan a un arroyo con piedras llenas de musgo. —¡Recto, recto! —canta la brújula. Las piedras resbalan mucho.",
          temptation: "Quien solo mira su invento, tropieza.",
        },
      },
      {
        a: {
          label: "Buscar las piedras sin musgo.",
          title: "Piedras secas",
          text: "Teo busca las piedras secas, sin musgo, y cruza saltando. ¡Ni una gota! Pinto aplaude con las alas.\n\nDentro del bosque, la brújula se vuelve loca: —¡Norte! ¡Sur! Una roca brillante la confunde. —Mira el musgo —dice Pinto.",
        },
        b: {
          label: "Cruzar recto, como dice la brújula.",
          title: "Un pie al agua",
          text: "Teo cruza recto y… ¡plof!, un pie al agua. La tarta se salva por un pelo. Pinto lo ayuda a secarse el zapato.\n\nDentro del bosque, la brújula se vuelve loca: —¡Norte! ¡Sur! Una roca brillante la confunde. —Mira el musgo —dice Pinto.",
          temptation: "Lo que dice tu invento no siempre ve lo que hay.",
        },
        c: {
          label: "Cruzar por el tronco que señala Pinto.",
          title: "El tronco",
          text: "Pinto señala un tronco caído sobre el arroyo. Teo cruza por él, despacito, con la tarta en alto.\n\nDentro del bosque, la brújula se vuelve loca: —¡Norte! ¡Sur! Una roca brillante la confunde. —Mira el musgo —dice Pinto.",
        },
      },
      {
        a: {
          label: "Sacudir la brújula hasta que funcione.",
          title: "Mareado",
          text: "Teo sacude la brújula. ¡Sacude y sacude! Solo consigue marearse. Al final, Pinto lo guía por el camino de hormigas.\n\nYa se oye la música de la fiesta. La brújula vuelve a cantar: —¡Recto! Pero delante hay un hoyo tapado de hojas.",
          temptation: "Sacudir un problema no lo arregla.",
        },
        b: {
          label: "Mirar el musgo de los árboles.",
          title: "El musgo",
          text: "Teo mira el musgo de los árboles y encuentra el norte. ¡Funciona! Pinto lo felicita con un toc, toc.\n\nYa se oye la música de la fiesta. La brújula vuelve a cantar: —¡Recto! Pero delante hay un hoyo tapado de hojas.",
        },
        c: {
          label: "Seguir el camino de hormigas con Pinto.",
          title: "La fila de hormigas",
          text: "Teo y Pinto siguen una fila de hormigas que llevan migas a la fiesta. ¡Qué buena idea!\n\nYa se oye la música del claro. La brújula vuelve a cantar: —¡Recto! Pero justo delante hay un hoyo tapado de hojas.",
        },
      },
      {
        a: {
          label: "Mirar el suelo antes de dar el paso.",
          title: "La tarta entera",
          text: "Teo mira el suelo: las hojas tapan un hoyo. Lo rodea con cuidado y llega a la fiesta con la tarta entera. Pinto lo aplaude.\n\nAprende que un invento ayuda, pero los ojos propios también cuentan.",
          lesson: "Un invento ayuda, pero tus ojos también cuentan.",
        },
        b: {
          label: "Escuchar a Pinto, que grita desde la rama.",
          title: "¡Cuidado!",
          text: "—¡Cuidado, un hoyo! —grita Pinto. Teo se para en seco y lo rodea. Llegan juntos a la fiesta, con la tarta intacta.\n\nTeo aprende que un amigo que mira desde arriba vale más que cualquier brújula.",
          lesson: "Un amigo atento vale más que cualquier brújula.",
        },
        c: {
          label: "Seguir recto, como canta la brújula.",
          title: "Lleno de nata",
          text: "Teo sigue recto… ¡y cae en el hoyo, con tarta y todo! Pinto llama a los animales, que lo sacan con una cuerda de lianas.\n\nTeo, lleno de nata, se ríe. Aprende que hay que mirar por dónde se pisa, no solo el invento.",
          lesson: "Mira por dónde pisas, no solo tu invento.",
          temptation: "Mira por dónde pisas, no solo tu invento.",
        },
      },
    ],
  },
  "bit-observatorio-luz": {
    lesson: "Antes de culpar, comprueba.",
    titles: [
      "¡Error detectado!",
      "Tres huevos",
      "La antena suelta",
      "La pregunta del guardián",
      "El cometa",
    ],
    texts: [
      "Esta noche pasa un cometa. El proyector del observatorio debe mostrarlo a todos, pero la luz se apaga una y otra vez. ¡Pif!\n\nBit ve a Pía, la golondrina, junto al techo. —¡Error detectado! —pita—. ¡Las golondrinas rompen el proyector! Pía abre mucho los ojos.",
      "En el techo, Pía cuida un nido con tres huevos. Bit vigila con sus ojos azules. ¡Pif! La luz se apaga otra vez.\n\nPero ahora Pía está fuera, buscando comida. Bit parpadea. Si ella no estaba… ¿quién apagó la luz?",
      "Siguiendo el cable, Bit sube al tejado. Allí, una antena suelta se mueve con el viento. Cada vez que se tuerce, ¡pif!, la luz se apaga.\n\nFalta poco para el cometa. Pía revolotea cerca: el nido está justo al lado de la antena.",
      "¡La antena queda firme y el proyector brilla! En el cielo aparece el cometa, con su cola de plata. Llegan los vecinos a mirar.\n\nEl guardián pregunta: —Bit, ¿no decías que las golondrinas lo rompían? Pía espera en su nido. ¿Qué hará Bit?",
      "El cometa cruza el cielo, largo y brillante. Todos miran hacia arriba en silencio.\n\nEn el nido, los tres huevos empiezan a romperse. ¡Pío, pío! Bit graba el momento. —Nuevo dato —dice—: las golondrinas traen suerte.",
    ],
    paths: [
      {
        a: {
          label: "Echar a las golondrinas del techo.",
          title: "¡Fuera!",
          text: "Bit agita los brazos y Pía sale volando asustada. Pero… ¡pif!, la luz se apaga otra vez. Bit mira el techo: hay un nido con tres huevos.\n\nPía estaba fuera cuando la luz falló. Bit parpadea. Si ella no estaba… ¿quién apagó la luz?",
          temptation: "Sin pruebas, una sospecha es solo una idea.",
        },
        b: {
          label: "Anotar cuándo se apaga la luz.",
          title: "Datos",
          text: "Bit anota la hora de cada apagón en su pantalla. En el techo, Pía cuida un nido con tres huevos. ¡Pif! Otro apagón.\n\nPero Pía estaba fuera, buscando comida. Bit parpadea. Si ella no estaba… ¿quién apagó la luz?",
        },
        c: {
          label: "Preguntarle a Pía qué hace en el techo.",
          title: "Tres huevos",
          text: "—Cuido mis huevos —dice Pía, y le muestra un nido con tres huevos. Luego sale a buscar comida.\n\n¡Pif! La luz se apaga otra vez, y Pía no estaba. Bit parpadea. Si ella no estaba… ¿quién apagó la luz?",
        },
      },
      {
        a: {
          label: "Revisar los cables del proyector.",
          title: "El cable largo",
          text: "Bit revisa los cables uno a uno y sigue el más largo hasta el tejado. Allí, una antena suelta se mueve con el viento. ¡Pif!\n\nFalta poco para el cometa. Pía revolotea cerca: su nido está justo al lado de la antena.",
        },
        b: {
          label: "Decidir que fueron los huevos.",
          title: "Los huevos no se mueven",
          text: "—¡Fueron los huevos! —pita Bit. Pía lo mira seria. —Los huevos no se mueven. Bit se sonroja por dentro y sigue el cable.\n\nEn el tejado, una antena suelta se mueve con el viento. ¡Pif! El nido de Pía está justo al lado.",
          temptation: "Una idea rara no es una prueba.",
        },
        c: {
          label: "Pedir perdón a Pía y buscar juntos.",
          title: "Perdón, Pía",
          text: "—Perdón, Pía —dice Bit—. ¿Me ayudas a buscar? Juntos siguen el cable hasta el tejado.\n\nAllí, una antena suelta se mueve con el viento. ¡Pif! Falta poco para el cometa, y el nido de Pía está justo al lado.",
        },
      },
      {
        a: {
          label: "Medir cuánto espacio hay junto al nido.",
          title: "Con cuidado",
          text: "Bit mide el espacio: hay sitio para arreglar la antena sin tocar el nido. Aprieta la tuerca con cuidado. Pía lo mira tranquila.\n\n¡El proyector brilla! Aparece el cometa. El guardián pregunta: —¿No decías que las golondrinas lo rompían?",
        },
        b: {
          label: "Pedirle a Pía que sujete el cable con el pico.",
          title: "Buen equipo",
          text: "Pía sujeta el cable con el pico mientras Bit aprieta la tuerca. ¡Qué buen equipo! La antena queda firme.\n\n¡El proyector brilla! Aparece el cometa sobre las casas. El guardián pregunta: —Bit, ¿no decías que las golondrinas lo rompían?",
        },
        c: {
          label: "Quitar el nido para arreglar rápido.",
          title: "El nido no se toca",
          text: "Bit estira el brazo hacia el nido. Pía se pone delante, con las alas abiertas. Bit se detiene y arregla la antena despacio, sin tocarlo.\n\n¡El proyector brilla! Aparece el cometa. El guardián pregunta: —¿No decías que las golondrinas lo rompían?",
          temptation: "La prisa no justifica romper la casa de otro.",
        },
      },
      {
        a: {
          label: "Explicar que se equivocó y cuál era el fallo.",
          title: "Un buen científico",
          text: "—Me equivoqué —dice Bit—. El fallo era una antena suelta, no Pía. Los vecinos asienten: eso es ser un buen científico.\n\nPía vuelve tranquila a su nido. Bit aprende que un dato vale más que una sospecha.",
          lesson: "Un dato vale más que una sospecha.",
        },
        b: {
          label: "Decir que Pía seguro hizo algo también.",
          title: "Era el viento",
          text: "—Algo haría Pía también —dice Bit. Pero el guardián le enseña la antena suelta: era el viento. Bit se queda sin palabras.\n\nLe pide perdón a Pía. Aprende que antes de culpar, hay que comprobar.",
          lesson: "Antes de culpar, comprueba.",
          temptation: "Antes de culpar, comprueba.",
        },
        c: {
          label: "Pedir a todos un aplauso para Pía.",
          title: "Un aplauso",
          text: "—¡Un aplauso para Pía! —pide Bit, y cuenta que ella ayudó a sujetar el cable. Todos aplauden, y la golondrina saluda.\n\nBit aprende que cuando te equivocas con alguien, lo mejor es reconocer lo bueno que hizo.",
          lesson: "Reconocer lo bueno del otro arregla un error.",
        },
      },
    ],
  },
  "bit-lago-ecos": {
    lesson: "La verdad dicha con cariño ayuda más.",
    titles: [
      "Desafina un 40 %",
      "Ecos tristes",
      "Una segunda voz",
      "La nota más alta",
      "Un amigo cerca",
    ],
    texts: [
      "En el Lago de los Ecos habrá concierto. Ruli, la rana, iba a cantar con su amiga, pero ella se mudó lejos.\n\nRuli ensaya sola, con voz temblorosa. Bit la escucha y pita: —Análisis: tu voz desafina un 40 %. Ruli se queda callada.",
      "Ruli suspira: —Sin mi amiga, no sé cantar. El eco del lago repite: «No sé cantar… cantar… cantar».\n\nBit calcula. Sus números no explican por qué un eco puede sonar tan triste. Ruli se esconde entre los juncos.",
      "Ruli asoma la cabeza. —Quizá cante —dice—, pero la canción es para dos voces.\n\nBit prueba a cantar: —¡Bip, bup, bip! El eco se ríe. Entonces Bit nota algo: el eco repite cada nota un segundo después, como una segunda voz.",
      "Llega el concierto. Ruli canta y el eco le responde como una amiga. ¡Suena precioso! Pero en la nota más alta, su voz tiembla.\n\nLos animales murmuran. Ruli mira a Bit, asustada. ¿Qué hará Bit?",
      "El lago aplaude con cientos de ecos. Ruli sonríe por primera vez en muchos días.\n\n—Mi amiga está lejos —le dice a Bit—, pero ahora tengo otro amigo cerca. Bit no sabe calcularlo, pero siente un calorcito en el pecho.",
    ],
    paths: [
      {
        a: {
          label: "Preguntarle por qué está triste.",
          title: "¿Por qué?",
          text: "—¿Por qué estás triste? —pregunta Bit. Ruli suspira: —Mi amiga se mudó. Sin ella, no sé cantar.\n\nEl eco repite: «No sé cantar… cantar». Bit calcula, pero sus números no explican la tristeza. Ruli se esconde entre los juncos.",
        },
        b: {
          label: "Explicarle todos sus errores, uno por uno.",
          title: "Error uno, error dos",
          text: "—Error uno: desafinas. Error dos: tiemblas. Error tres… —Ruli se tapa los oídos. —¡Sin mi amiga no sé cantar!\n\nEl eco repite: «No sé cantar… cantar». Bit calcula, pero sus números no explican la tristeza. Ruli se esconde entre los juncos.",
          temptation: "Contar errores no ayuda si no hay cariño.",
        },
        c: {
          label: "Sentarse a su lado sin decir nada.",
          title: "En silencio",
          text: "Bit se sienta junto a Ruli, en silencio. Al rato, ella habla: —Mi amiga se mudó. Sin ella, no sé cantar.\n\nEl eco repite: «No sé cantar… cantar». Bit calcula, pero sus números no explican la tristeza. Ruli se esconde entre los juncos.",
        },
      },
      {
        a: {
          label: "Buscar un dato bueno sobre su voz.",
          title: "Un dato bueno",
          text: "—Dato: tus notas graves son perfectas —dice Bit. Ruli asoma la cabeza: —¿De verdad? Pero la canción era para dos voces.\n\nBit prueba: —¡Bip, bup! El eco se ríe, y Bit nota que repite cada nota, como una segunda voz.",
        },
        b: {
          label: "Contarle que él también echa de menos a alguien.",
          title: "Yo también",
          text: "—Yo echo de menos mi observatorio —dice Bit. Ruli lo mira con cariño: —Entonces me entiendes. La canción era para dos voces.\n\nBit prueba: —¡Bip, bup! El eco se ríe, y Bit nota que repite cada nota, como una segunda voz.",
        },
        c: {
          label: "Decirle que la tristeza no es lógica.",
          title: "No es lógica",
          text: "—La tristeza no es lógica —dice Bit. Ruli se esconde. Bit añade: —Pero es real. Perdón. Ruli asoma: —La canción era para dos voces.\n\nBit prueba: —¡Bip, bup! El eco se ríe y repite cada nota, como una segunda voz.",
          temptation: "Lo que alguien siente es real, aunque no sea lógico.",
        },
      },
      {
        a: {
          label: "Decirle que su plan es mejor que el de ella.",
          title: "Mi plan es mejor",
          text: "—Mi plan es mejor: canta con el eco —dice Bit. Ruli frunce el ceño: era su idea también. Bit se disculpa y lo prueban juntos.\n\nLlega el concierto. Ruli canta y el eco le responde. ¡Precioso! Pero en la nota más alta, su voz tiembla.",
          temptation: "Una idea compartida suena mejor que una impuesta.",
        },
        b: {
          label: "Probar la idea del eco con una nota.",
          title: "Un dúo",
          text: "Ruli canta una nota y el eco se la devuelve. ¡Suena como un dúo! Ruli da un saltito de alegría.\n\nLlega el concierto. Ruli canta y el eco le responde como una amiga. Pero en la nota más alta, su voz tiembla.",
        },
        c: {
          label: "Preguntar a Ruli qué canción cantaban juntas.",
          title: "La canción de las luciérnagas",
          text: "—La canción de las luciérnagas —dice Ruli, y la canta despacio. El eco la acompaña como una amiga.\n\nLlega el concierto. Ruli canta y el eco le responde. ¡Precioso! Pero en la nota más alta, su voz tiembla.",
        },
      },
      {
        a: {
          label: "Susurrarle: «Las otras notas fueron perfectas».",
          title: "Un susurro",
          text: "—Las otras notas fueron perfectas —le susurra Bit. Ruli respira hondo y canta la nota otra vez. ¡Esta vez sale redonda!\n\nTodos aplauden. Bit aprende que una palabra amable da más fuerza que un análisis.",
          lesson: "Una palabra amable da más fuerza que un análisis.",
        },
        b: {
          label: "Cantar con ella la nota difícil.",
          title: "Bip-croac",
          text: "Bit canta con Ruli la nota difícil: ¡bip-croac! Los animales se ríen, pero de alegría. Ruli también se ríe y termina la canción.\n\nEl lago repite sus voces juntas. Bit aprende que acompañar a alguien vale más que corregirlo.",
          lesson: "Acompañar vale más que corregir.",
        },
        c: {
          label: "Decir en voz alta que desafinó.",
          title: "Con cariño",
          text: "—¡Desafinó un poco! —pita Bit. Ruli se encoge. Bit ve su cara y entiende. —Pero las demás notas fueron preciosas —añade rápido.\n\nRuli termina la canción. Bit aprende que la verdad dicha con cariño ayuda más.",
          lesson: "La verdad dicha con cariño ayuda más.",
          temptation: "La verdad dicha con cariño ayuda más.",
        },
      },
    ],
  },
  "bit-ciudad-semillas": {
    lesson: "Despreciar lo que no alcanzas no te hace más listo.",
    titles: [
      "Esa flor no sirve",
      "Luz sin calor",
      "La cornisa",
      "Una voz más fuerte",
      "La flor sí servía",
    ],
    texts: [
      "Una flor de luz brilla en la torre de la Ciudad de las Semillas. Calienta las semillas pequeñas, pero hoy está cerrada.\n\nBit intenta subir. Resbala una vez, dos, tres. —Bah —pita—. Esa flor no sirve para nada. Chispa, la ardilla, lo mira sorprendida.",
      "Cae la noche y las semillas tiemblan de frío. Bit enciende su lámpara, pero da luz sin calor. Las semillas siguen tiritando.\n\nChispa mira la torre: —La flor se abre si alguien le canta su canción desde arriba. Bit mira sus piernas cortas.",
      "A mitad de la torre sopla un viento fuerte. Chispa trepa como un rayo, pero Bit se queda atascado en una cornisa.\n\n—¡No llego! —pita Bit. Desde arriba, Chispa le lanza una cuerda de enredadera. Bit duda: le da miedo soltarse.",
      "¡Llegan arriba! La flor de luz sigue cerrada, como un puño dormido. Chispa canta la canción, pero su voz es muy bajita.\n\n—Necesita una voz más fuerte —dice Chispa, y mira a Bit. Bit solo sabe hacer bips. ¿Qué hará?",
      "La flor de luz brilla sobre la ciudad y las semillas se duermen calentitas. Mañana brotarán.\n\nBit y Chispa bajan de la torre, cansados y felices. —Esa flor sí servía —dice Bit—. Solo que yo no llegaba.",
    ],
    paths: [
      {
        a: {
          label: "Pensar otra forma de subir.",
          title: "Muelle, escalera, globo",
          text: "Bit busca otra forma de subir: una escalera, un muelle, un globo… ¡nada funciona! Chispa lo mira con curiosidad.\n\nCae la noche y las semillas tiemblan de frío. —La flor se abre si alguien le canta desde arriba —dice Chispa.",
        },
        b: {
          label: "Preguntarle a Chispa si sabe trepar.",
          title: "¡Como nadie!",
          text: "—¿Sabes trepar? —pregunta Bit. —¡Como nadie! —dice Chispa—. Y sé algo más: la flor se abre si alguien le canta desde arriba.\n\nCae la noche. Las semillas tiemblan de frío. Bit mira sus piernas cortas y la torre altísima.",
        },
        c: {
          label: "Decir que las lámparas de Bit son mejores.",
          title: "Mis lámparas",
          text: "—Mis lámparas son mejores —presume Bit, y enciende una. Chispa se encoge de hombros.\n\nCae la noche. La lámpara de Bit da luz, pero no calor, y las semillas tiemblan. —La flor se abre si alguien le canta desde arriba —dice Chispa.",
          temptation: "Lo que no alcanzas no deja de valer.",
        },
      },
      {
        a: {
          label: "Decir que la canción es una tontería.",
          title: "Una tontería",
          text: "—Cantar a una flor es una tontería —pita Bit. Una semilla llora de frío. Bit calla, avergonzado, y empieza a subir con Chispa.\n\nA mitad de la torre sopla viento fuerte. Bit se atasca en una cornisa. Chispa le lanza una cuerda de enredadera.",
          temptation: "Burlarse de lo que no entiendes no ayuda a nadie.",
        },
        b: {
          label: "Calcular un camino con escalones.",
          title: "Escalones",
          text: "Bit calcula un camino: ventanas, cornisas y tejas, como escalones. Chispa sube delante, saltando.\n\nA mitad de la torre sopla un viento fuerte. Bit se atasca en una cornisa. Desde arriba, Chispa le lanza una cuerda de enredadera.",
        },
        c: {
          label: "Pedirle a Chispa que suba con él.",
          title: "Juntos",
          text: "—Subimos juntos —dice Chispa, y le enseña dónde agarrarse. Bit sube despacio, pita de miedo, pero sube.\n\nA mitad de la torre sopla un viento fuerte. Bit se atasca en una cornisa. Chispa le lanza una cuerda de enredadera.",
        },
      },
      {
        a: {
          label: "Calcular dónde agarrar la cuerda.",
          title: "Nudo, nudo, cornisa",
          text: "Bit calcula dónde agarrar la cuerda: nudo, nudo, cornisa. ¡Sube sin resbalar! Chispa lo ayuda en el último tramo.\n\nArriba, la flor sigue cerrada. Chispa canta, pero su voz es muy bajita. —Necesita una voz más fuerte —dice.",
        },
        b: {
          label: "Bajar y decir que la torre es aburrida.",
          title: "Una torre aburrida",
          text: "—Esta torre es aburrida —dice Bit, y baja un escalón. Abajo, las semillas tiritan. Bit se para, agarra la cuerda y sube con Chispa.\n\nArriba, la flor sigue cerrada. Chispa canta, pero su voz es muy bajita. —Necesita una voz más fuerte —dice.",
          temptation: "Rendirse y decir que no importa no calienta a nadie.",
        },
        c: {
          label: "Contar hasta tres con Chispa y subir.",
          title: "¡Uno, dos, tres!",
          text: "—¡Uno, dos, tres! —cuentan Bit y Chispa. Bit se suelta de la cornisa y sube por la cuerda.\n\nArriba, la flor sigue cerrada como un puño dormido. Chispa canta, pero su voz es muy bajita. —Necesita una voz más fuerte —dice.",
        },
      },
      {
        a: {
          label: "Decir que cantar es cosa de ardillas.",
          title: "Bips con fuerza",
          text: "—Cantar es cosa de ardillas —dice Bit. Pero la flor no se abre, y las semillas tiemblan. Chispa espera. Bit hace bips con todas sus fuerzas. ¡La flor se abre!\n\nBit aprende que despreciar lo que no sabes hacer no te hace más listo.",
          lesson: "Despreciar lo que no alcanzas no te hace más listo.",
          temptation: "Despreciar lo que no alcanzas no te hace más listo.",
        },
        b: {
          label: "Hacer los bips al ritmo de la canción.",
          title: "Bip, bip, biiip",
          text: "Bit hace bips al ritmo de la canción: ¡bip, bip, biiip! La flor se abre despacio y llena la ciudad de luz tibia.\n\nChispa aplaude. Bit aprende que cada uno puede ayudar a su manera.",
          lesson: "Cada uno puede ayudar a su manera.",
        },
        c: {
          label: "Cantar junto a Chispa, aunque suene raro.",
          title: "Voz de radio vieja",
          text: "Bit canta junto a Chispa, con su voz de radio vieja. Suena rarísimo, ¡pero la flor se abre de par en par!\n\nLas semillas se calientan. Bit aprende que intentarlo vale más que decir que no sirve.",
          lesson: "Intentarlo vale más que decir que no sirve.",
        },
      },
    ],
  },
  "luma-faro-mareas": {
    lesson: "Las apariencias engañan.",
    titles: [
      "Una gaviota muy simpática",
      "La campana en la niebla",
      "Plumas en la escalera",
      "Una sombra en el muelle",
      "Lo que dicen, no cómo se ven",
    ],
    texts: [
      "Luma cuida el faro. Esta noche vuelven las barcas. Una gaviota brillante se posa cerca: —Soy Brillo. ¡Qué guardiana tan lista!\n\nDesde una roca, un cangrejo gruñe: —Huele a niebla. Enciende la luz temprano. Luma arruga la nariz. ¡Qué cangrejo tan gruñón!",
      "La niebla llega despacio, como una sábana gris. Brillo sonríe: —No enciendas la luz, que molesta a los peces.\n\nPero Luma ve algo raro: la gaviota no deja de mirar las cestas de sardinas de las barcas. Suena la campana de un barco perdido.",
      "Luma sube corriendo al faro. ¡La caja de cerillas no está! Solo encuentra plumas blancas en el suelo.\n\nDon Ermo sube detrás, paso a paso, con su concha a cuestas. —Yo guardo una piedra de chispa —dice—. Pero pesa mucho para mí.",
      "¡La luz se enciende! Su rayo corta la niebla y las barcas giran hacia el puerto. Una sombra blanca se acerca a las cestas de sardinas.\n\nEs Brillo, con las cerillas escondidas bajo el ala. Los pescadores no la han visto. ¿Qué hará Luma?",
      "Las barcas llegan sanas, con sus cestas llenas. Brillo se va volando sin una sola sardina.\n\nLuma se sienta junto a Don Ermo. —Perdón por llamarte gruñón —le dice. El cangrejo casi sonríe. Desde esa noche, Luma escucha lo que dicen, no cómo se ven.",
    ],
    paths: [
      {
        a: {
          label: "Hacer caso a Brillo, que es tan simpática.",
          title: "El baile de Brillo",
          text: "Luma se queda viendo el baile de Brillo. ¡Qué plumas! ¡Qué vueltas! Cuando mira el mar, la niebla ya tapa las olas.\n\nLa gaviota no deja de mirar las cestas de sardinas de las barcas. Allá lejos, suena la campana de un barco perdido.",
          temptation: "Una sonrisa bonita no siempre dice la verdad.",
        },
        b: {
          label: "Preguntarle al cangrejo por qué huele a niebla.",
          title: "El olfato de Don Ermo",
          text: "—Me llamo Don Ermo —gruñe el cangrejo—. La niebla huele a sal mojada. Luma lo huele también. ¡Tiene razón!\n\nPero Brillo la llama con voz dulce, sin dejar de mirar las cestas de sardinas. Allá lejos, suena la campana de un barco perdido.",
        },
        c: {
          label: "Subir a mirar el mar desde lo alto del faro.",
          title: "Desde lo alto",
          text: "Desde lo alto, Luma ve una sábana gris que avanza sobre el mar. ¡Niebla! Abajo, Brillo da vueltas junto al muelle.\n\nLa gaviota no mira el mar: mira las cestas de sardinas de las barcas. Allá lejos, suena la campana de un barco perdido.",
        },
      },
      {
        a: {
          label: "Seguir la mirada de Brillo hasta las cestas.",
          title: "Lo que mira Brillo",
          text: "Luma sigue la mirada de Brillo: ¡las sardinas! Algo no cuadra. Corre al faro para encender la luz.\n\n¡La caja de cerillas no está! Solo hay plumas blancas en el suelo. Don Ermo llega detrás: —Tengo una piedra de chispa, pero pesa mucho.",
        },
        b: {
          label: "Llamar a Don Ermo para que la ayude.",
          title: "Un cangrejo en la escalera",
          text: "—¡Don Ermo, ayúdeme! —grita Luma. El cangrejo sube paso a paso, gruñendo, mientras Brillo se aleja volando.\n\nArriba, ¡la caja de cerillas no está! Solo hay plumas blancas en el suelo. —Tengo una piedra de chispa —dice Don Ermo—, pero pesa mucho.",
        },
        c: {
          label: "Escuchar la canción de Brillo un ratito más.",
          title: "Una canción muy larga",
          text: "Brillo canta tan bonito que Luma cierra los ojos. ¡Tilín, tilín!, insiste la campana. Luma despierta y corre al faro.\n\n¡La caja de cerillas no está! Solo hay plumas blancas en el suelo. Don Ermo llega detrás: —Tengo una piedra de chispa, pero pesa mucho.",
          temptation: "Quien te distrae, a veces quiere algo.",
        },
      },
      {
        a: {
          label: "Mirar bien las plumas del suelo.",
          title: "Plumas de gaviota",
          text: "Luma mira las plumas: son de gaviota. ¡Brillo se llevó las cerillas! No hay tiempo para enfadarse. Con la piedra de Don Ermo, ¡chas!, se enciende la luz.\n\nLas barcas llegan al puerto. Y abajo, Brillo se acerca a las cestas de sardinas.",
        },
        b: {
          label: "Buscar a Brillo para pedirle las cerillas.",
          title: "La gaviota que no sabía nada",
          text: "Luma busca a Brillo. —¿Cerillas? Ni idea —dice la gaviota, y esconde el ala. Luma pierde tiempo precioso.\n\nAl fin, Don Ermo y ella encienden la luz con la piedra de chispa. Las barcas llegan. Brillo se acerca a las cestas de sardinas.",
          temptation: "Antes de confiar, fíjate en lo que hacen.",
        },
        c: {
          label: "Cargar la concha de Don Ermo escaleras arriba.",
          title: "Una concha muy pesada",
          text: "Luma carga la concha de Don Ermo escaleras arriba. ¡Uf, cómo pesa! El cangrejo saca su piedra y, ¡chas!, se enciende la luz.\n\nLas barcas llegan al puerto, una detrás de otra. Y abajo, Brillo se acerca a las cestas de sardinas.",
        },
      },
      {
        a: {
          label: "Enseñar a todos las plumas y las cerillas.",
          title: "Las pistas no mienten",
          text: "Luma muestra las plumas blancas y la caja de cerillas. Los pescadores entienden todo y cuidan sus cestas. Brillo se va volando, avergonzada.\n\nLuma aprende que las pistas dicen la verdad, aunque una sonrisa diga otra cosa.",
          lesson: "Las pistas dicen más que una sonrisa.",
        },
        b: {
          label: "Pedir a Don Ermo que cuente lo que vio.",
          title: "El testigo gruñón",
          text: "Don Ermo cuenta lo que vio desde su roca: Brillo esconde cosas ajenas. Todos le creen, porque siempre dice la verdad, aunque gruña.\n\nLuma lo mira con otros ojos. Un amigo gruñón y sincero vale más que uno bonito y mentiroso.",
          lesson: "Un amigo sincero vale más que uno bonito.",
        },
        c: {
          label: "Creer a Brillo, que dice que solo mira.",
          title: "Una voz muy dulce",
          text: "—Solo miraba, de verdad —dice Brillo con su voz dulce. Luma duda… y la gaviota se lleva la cesta más grande de un picotazo.\n\nDon Ermo suspira. Luma aprende tarde, pero aprende: las plumas brillantes no hacen buena a una gaviota. Las apariencias engañan.",
          lesson: "Las apariencias engañan.",
          temptation: "Las apariencias engañan.",
        },
      },
    ],
  },
  "luma-isla-barcas": {
    lesson: "Mejor hecho que perfecto.",
    titles: [
      "Una balsa torcida",
      "¡Glu, glu!",
      "La rendija",
      "¡Preparados, listos…!",
      "La meta",
    ],
    texts: [
      "Mañana es la carrera de barcas. Luma quiere construir la barca más perfecta del mar: lisa, pintada y sin fallos.\n\nTino, la nutria, ya tiene una balsa de troncos. —¡Está torcida, pero flota! —se ríe, y chapotea. Luma frunce el ceño. Torcida no sirve.",
      "Por la tarde, el casco está listo. A Luma no le gusta el azul: ¡demasiado claro! Quiere pintarlo otra vez.\n\nEn la orilla, Tino prueba su balsa. ¡Glu, glu! Entra un poquito de agua. —¡Un agujerito! —dice feliz—. Menos mal que lo probé hoy.",
      "El sol se esconde. La barca de Luma flota, pero por una rendija entra agua. Hay que taparla antes de la carrera.\n\nTino le da un poco de resina. Luma mira su barca y piensa en una bandera con estrellas doradas. ¡Quedaría perfecta!",
      "¡Amanece el día de la carrera! Las barcas esperan en la salida. La de Luma flota, aunque tiene un rayón y la pintura no es perfecta.\n\n—¡Preparados, listos…! —grita la foca del puerto. Luma mira el rayón y duda. ¿Qué hará?",
      "Las barcas cruzan la meta entre olas y risas. Tino chapotea feliz en su balsa torcida.\n\nLuma mira su barca, con su rayón y su azul claro. No es perfecta, pero navega. Y descubre que eso era lo más importante.",
    ],
    paths: [
      {
        a: {
          label: "Pedirle a Tino que le enseñe su balsa.",
          title: "Primero que flote",
          text: "Tino enseña su balsa: troncos, cuerda y una vela. —Primero que flote, luego que sea bonita. Por la tarde, el casco de Luma está listo, pero el azul no le gusta.\n\nTino prueba su balsa. ¡Glu, glu! —¡Un agujerito! Menos mal que lo probé hoy.",
        },
        b: {
          label: "Lijar la madera hasta que brille.",
          title: "Madera como un espejo",
          text: "Luma lija hasta que la madera brilla. ¡Se le pasa media mañana! Por la tarde, el casco está listo, pero el azul no le gusta.\n\nTino prueba su balsa. ¡Glu, glu! —¡Un agujerito! —dice feliz—. Menos mal que lo probé hoy.",
          temptation: "Lo bonito no sirve si no está hecho.",
        },
        c: {
          label: "Hacer primero un dibujo sencillo.",
          title: "Un dibujo sencillo",
          text: "Luma dibuja una barca sencilla y la construye. Por la tarde, el casco está listo. El azul no le gusta: ¡demasiado claro!\n\nTino prueba su balsa en la orilla. ¡Glu, glu! —¡Un agujerito! —dice feliz—. Menos mal que lo probé hoy.",
        },
      },
      {
        a: {
          label: "Pintar la barca otra vez, más oscura.",
          title: "Pintura que no seca",
          text: "Luma pinta la barca de azul oscuro. Espera, espera… ¡la pintura tarda en secarse! Al atardecer la pone en el agua, y por una rendija entra agua.\n\nTino le da un poco de resina para taparla. Pero Luma piensa en una bandera con estrellas doradas.",
          temptation: "Probar a tiempo evita sustos.",
        },
        b: {
          label: "Probar la barca en el agua, como Tino.",
          title: "La prueba del agua",
          text: "Luma pone su barca en el agua. Flota… ¡pero por una rendija entra agua! Mejor saberlo hoy que en la carrera.\n\nTino le da un poco de resina para taparla. Al atardecer, Luma piensa en una bandera con estrellas doradas. ¡Quedaría perfecta!",
        },
        c: {
          label: "Preguntar a Tino cómo tapó su agujero.",
          title: "Resina de pino",
          text: "—Con resina de pino —explica Tino, y le regala un poquito. Luma prueba su barca: ¡por una rendija entra agua!\n\nMenos mal que tiene la resina. Al atardecer, Luma piensa en una bandera con estrellas doradas. ¡Quedaría perfecta!",
        },
      },
      {
        a: {
          label: "Tapar la rendija primero.",
          title: "Ni una gota",
          text: "Luma tapa la rendija con la resina de Tino. Ya no entra ni una gota. Al guardar las herramientas, la barca se raya un poquito.\n\nAmanece el día de la carrera. La barca flota, aunque no es perfecta. —¡Preparados, listos…! —grita la foca del puerto.",
        },
        b: {
          label: "Tapar la rendija junto con Tino.",
          title: "Una canción de remos",
          text: "Luma y Tino tapan la rendija juntos, cantando una canción de remos. Al empujar la barca, se hace un rayón.\n\nAmanece el día de la carrera. La barca flota, aunque no es perfecta. —¡Preparados, listos…! —grita la foca del puerto.",
        },
        c: {
          label: "Coser la bandera de estrellas antes de nada.",
          title: "Una bandera preciosa",
          text: "Luma cose la bandera hasta la noche. Queda preciosa, pero la rendija sigue abierta. Tino la ayuda a taparla a toda prisa, y en el apuro la barca se raya.\n\nAmanece el día de la carrera. —¡Preparados, listos…! —grita la foca del puerto.",
          temptation: "Primero lo importante, después lo bonito.",
        },
      },
      {
        a: {
          label: "Volver a la orilla para arreglar el rayón.",
          title: "El rayón",
          text: "Luma rema a la orilla para tapar el rayón. Cuando vuelve, ¡la carrera ya terminó! Tino la saluda con su medalla de concha.\n\nLuma se ríe de sí misma. Una barca perfecta en la orilla no gana carreras. Mejor hecho que perfecto.",
          lesson: "Mejor hecho que perfecto.",
          temptation: "Mejor hecho que perfecto.",
        },
        b: {
          label: "Salir tal como está y remar tranquila.",
          title: "Segunda en la meta",
          text: "Luma sale tal como está. La barca no es perfecta, pero es fuerte y la probó bien. ¡Llega segunda, detrás de Tino!\n\nNadie mira el rayón. Todos miran lo rápido que navega. Luma aprende que lo que se prueba vale más que lo que brilla.",
          lesson: "Lo que se prueba vale más que lo que brilla.",
        },
        c: {
          label: "Remar al lado de Tino.",
          title: "Juntos a la meta",
          text: "Luma rema al lado de Tino, riendo con cada ola. Llegan juntos a la meta, mojados y felices.\n\n—Tu balsa torcida es la mejor —le dice Luma. Aprendió que hacer las cosas con un amigo es más divertido que hacerlas perfectas.",
          lesson: "Con un amigo, lo imperfecto también es divertido.",
        },
      },
    ],
  },
  "luma-arrecife-cristal": {
    lesson: "Quien todo lo quiere, todo lo pierde.",
    titles: [
      "Un regalo para la abuela",
      "La concha del agua",
      "Dos caminos",
      "Tres piedras brillantes",
      "Junto a la ventana",
    ],
    texts: [
      "Luma encuentra una concha rosada, perfecta para el cumpleaños de su abuela. La guarda en su bolsillo, feliz.\n\nPara volver a casa, cruzará el Arrecife de Cristal. Nácar, la tortuga, nada a su lado. —Cuidado —le dice—. Aquí el agua engaña a los ojos.",
      "En medio del puente de coral, Luma se asoma al agua. ¡Allí abajo brilla una concha rosada enorme, mucho más grande que la suya!\n\n—Con esa, mi abuela saltaría de alegría —piensa. Nácar asoma la cabeza y la mira en silencio.",
      "Luma comprende: la concha grande era el reflejo de la suya, agrandado por el agua de cristal. ¡No existía!\n\nYa es tarde y la marea sube. Por el camino corto hay un paso estrecho; por el largo, una vuelta que rodea el arrecife.",
      "Luma llega a casa de la abuela al atardecer. En la puerta, una urraca le ofrece tres piedras brillantes a cambio de su concha.\n\n—Tres cosas valen más que una —dice la urraca. Luma mira su concha rosada, un poco rayada del viaje. ¿Qué hará?",
      "La abuela abre la puerta y abraza a Luma. Afuera, el mar brilla con el último sol.\n\nLuma piensa en la concha grande del agua, que nunca existió. Lo que de verdad importaba era llegar, y llegar con cariño.",
    ],
    paths: [
      {
        a: {
          label: "Preguntar a Nácar qué quiere decir.",
          title: "Mirar dos veces",
          text: "—El agua de cristal agranda lo que refleja —explica Nácar—. Mira dos veces antes de creer. Luma asiente, sin entender del todo.\n\nEn medio del puente de coral, se asoma al agua. ¡Abajo brilla una concha rosada enorme, mucho más grande que la suya!",
        },
        b: {
          label: "Cruzar despacio por el puente de coral.",
          title: "Paso a paso",
          text: "Luma cruza despacio el puente de coral, paso a paso, con la concha bien guardada. Nácar nada tranquila a su lado.\n\nEn medio del puente, Luma se asoma al agua. ¡Abajo brilla una concha rosada enorme, mucho más grande que la suya!",
        },
        c: {
          label: "Buscar más conchas, ¡cuantas más, mejor!",
          title: "Bolsillos llenos",
          text: "Luma llena los bolsillos de conchas: blancas, rotas, con arena… ¡Pesan tanto que casi no anda! Las deja y conserva la rosada.\n\nEn el puente de coral, se asoma al agua. ¡Abajo brilla una concha rosada enorme, mucho más grande que la suya!",
          temptation: "Quien mucho abarca, poco aprieta.",
        },
      },
      {
        a: {
          label: "Mirar bien la concha grande desde otro lado.",
          title: "El reflejo",
          text: "Luma mira desde el otro lado del puente. La concha grande se mueve igual que la suya. ¡Es su reflejo, agrandado por el agua de cristal!\n\nLa marea sube. Hay un camino corto con un paso estrecho y uno largo que rodea el arrecife.",
        },
        b: {
          label: "Soltar su concha para atrapar la grande.",
          title: "¡Plof!",
          text: "Luma saca su concha para atrapar la grande… ¡y resbala! Plof. Nácar la rescata. La concha grande desaparece: era el reflejo de la suya.\n\nLa marea sube. Hay un camino corto con un paso estrecho y uno largo que rodea el arrecife.",
          temptation: "No sueltes lo que tienes por lo que parece.",
        },
        c: {
          label: "Preguntarle a Nácar si la ve también.",
          title: "Dos veces la misma concha",
          text: "—¿Tú la ves? —pregunta Luma. Nácar se ríe: —Veo tu concha dos veces. El agua de cristal la agranda.\n\nLuma se ríe también. La marea sube. Hay un camino corto con un paso estrecho y uno largo que rodea el arrecife.",
        },
      },
      {
        a: {
          label: "Ir por el camino corto, ¡sin mirar!",
          title: "El paso bajo el agua",
          text: "Luma corre por el camino corto. ¡El paso está bajo el agua! Vuelve y llega más tarde. La concha se raya contra el coral.\n\nAl atardecer, en la puerta de la abuela, una urraca ofrece tres piedras brillantes a cambio de su concha.",
          temptation: "El camino corto no siempre es el más rápido.",
        },
        b: {
          label: "Mirar cómo sube la marea antes de elegir.",
          title: "La vuelta larga",
          text: "Luma mira la marea: el paso estrecho está cubierto. Elige la vuelta larga y llega a tiempo. La concha se raya un poco en el viaje.\n\nEn la puerta de la abuela, una urraca le ofrece tres piedras brillantes a cambio de su concha.",
        },
        c: {
          label: "Seguir a Nácar, que conoce el arrecife.",
          title: "La guía del arrecife",
          text: "Luma sigue a Nácar por la vuelta larga. Conoce cada roca. Llegan al atardecer, con la concha un poco rayada.\n\nEn la puerta de la abuela, una urraca ofrece tres piedras brillantes a cambio de su concha. —Tres valen más que una —dice.",
        },
      },
      {
        a: {
          label: "Mirar bien las piedras antes de decidir.",
          title: "Solo brillan mojadas",
          text: "Luma mira las piedras de cerca: brillan solo porque están mojadas. —No, gracias —dice, y entra con su concha.\n\nLa abuela la pone junto a la ventana. Luma aprende que una cosa verdadera vale más que muchas que solo brillan.",
          lesson: "Una cosa verdadera vale más que muchas que solo brillan.",
        },
        b: {
          label: "Cambiar la concha por las tres piedras.",
          title: "Piedras que se apagan",
          text: "Luma cambia la concha por las piedras. Al entrar, las piedras se apagan: ¡eran vidrio mojado! La abuela la abraza igual.\n\n—Quien todo lo quiere, todo lo pierde —le dice con cariño. Luma asiente. Mañana buscará otra concha, y esta vez la cuidará.",
          lesson: "Quien todo lo quiere, todo lo pierde.",
          temptation: "Quien todo lo quiere, todo lo pierde.",
        },
        c: {
          label: "Darle la concha a la abuela junto a Nácar.",
          title: "Un regalo con cariño",
          text: "Luma y Nácar le dan la concha a la abuela. —¡Es preciosa! —dice ella, y la pone junto a la ventana.\n\nLuma mira su concha pequeña y sonríe. Aprendió que un regalo hecho con cariño es más grande que cualquier reflejo.",
          lesson: "Un regalo con cariño es más grande que cualquier reflejo.",
        },
      },
    ],
  },
  "rok-cueva-ecos": {
    lesson: "Nadie es tan pequeño que no pueda ayudar.",
    titles: [
      "El rugido más grande",
      "Tres túneles negros",
      "El cristal dorado",
      "A oscuras",
      "La salida",
    ],
    texts: [
      "Rok quiere el cristal dorado más grande para presumir. —¡Soy el más fuerte! —ruge. El eco lo repite diez veces.\n\nPipo, un murciélago diminuto, asoma de una grieta. —Adentro está oscuro. ¿Te acompaño? Rok se ríe: —¿Tú? ¡Si eres del tamaño de una nuez!",
      "—Bueno, ven —dice Rok—, pero no me estorbes. Pipo se acomoda sobre su cuerno. Desde ahí ve lo que Rok no ve.\n\nAdentro está muy oscuro. El fuego de Rok apenas alumbra un paso, y delante aparecen tres túneles negros. ¿Cuál será?",
      "En medio de una sala enorme brilla el cristal más grande que Rok ha visto. Va del suelo al techo, como una columna de oro.\n\n—¡Con él seré famoso! —dice Rok, y se frota las garras. Pipo mira el techo, preocupado.",
      "¡PLIC! Una gota cae en la nariz de Rok y apaga su fuego. Todo queda negro como la noche.\n\nRok, el más fuerte del valle, no sabe por dónde salir. Tantea las paredes frías. —¿Pipo? —susurra.",
      "Pipo chilla bajito y escucha el eco volver. —Por aquí la cueva sigue; por allá, choca con la pared. Rok lo sigue en silencio.\n\nPronto ven la luz de la salida. Rok mira a su amigo diminuto: —Tu eco vale más que mi rugido.",
    ],
    paths: [
      {
        a: {
          label: "Entrar solo, sin Pipo.",
          title: "Solo en la oscuridad",
          text: "Rok entra solo, sacando pecho. Adentro está tan oscuro que choca con una piedra. ¡PUM! Su fuego apenas alumbra un paso.\n\n—¿Seguro que no quieres compañía? —pregunta Pipo, que lo siguió en silencio. Delante aparecen tres túneles negros. ¿Cuál será?",
          temptation: "Pedir compañía no es ser débil.",
        },
        b: {
          label: "Escuchar cómo suena la cueva por dentro.",
          title: "La cueva que suena",
          text: "Rok escucha. Gota, gota, eco… La cueva suena grande y hueca, llena de pasillos. Pipo vuela a su lado y mueve las orejas.\n\n—Yo oigo más cosas que tú —dice. Rok resopla y avanza. Delante aparecen tres túneles negros. ¿Cuál será?",
        },
        c: {
          label: "Dejar que Pipo vaya con él.",
          title: "Un compañero muy pequeño",
          text: "—Bueno, ven —dice Rok—, pero no me estorbes. Pipo se acomoda sobre su cuerno. Desde ahí ve lo que Rok no ve.\n\nAdentro está muy oscuro. El fuego de Rok apenas alumbra un paso, y delante aparecen tres túneles negros. ¿Cuál será?",
        },
      },
      {
        a: {
          label: "Preguntarle a Pipo qué oye.",
          title: "Lo que oye Pipo",
          text: "Pipo chilla bajito y escucha. —El túnel de la izquierda termina en una sala enorme —dice—. Lo sé por el eco.\n\nRok no le cree del todo, pero lo sigue. Llegan a una sala gigante y, en el centro, brilla el cristal dorado.",
        },
        b: {
          label: "Seguir las motitas doradas del suelo.",
          title: "Las motitas doradas",
          text: "Rok ve polvo dorado en el suelo, como migas de pan. Lo sigue con la nariz pegada al piso, paso a paso.\n\nLas migas lo llevan a una sala enorme. En el centro, más alto que Rok, brilla el cristal dorado. —¡Es mío! —dice.",
        },
        c: {
          label: "Elegir el túnel más grande, por supuesto.",
          title: "El túnel más grande",
          text: "—¡Un dragón grande va por el túnel grande! —dice Rok. Se estrecha y se estrecha… ¡hasta que Rok queda atascado por la panza!\n\nPipo lo guía hacia atrás, paso a paso. Por otro camino llegan a una sala enorme. En el centro brilla el cristal.",
          temptation: "Lo más grande no siempre es lo mejor.",
        },
      },
      {
        a: {
          label: "Mirar bien cómo está sujeto el cristal.",
          title: "La columna de oro",
          text: "Rok mira bien: el cristal sostiene el techo como una columna. Si lo arranca, la sala se cae. Lo suelta con cuidado.\n\nEntonces, ¡PLIC!, una gota le cae en la nariz y apaga su fuego. Todo queda negro. —¿Pipo? —susurra.",
        },
        b: {
          label: "Arrancar el cristal con toda su fuerza.",
          title: "¡CRAC!",
          text: "Rok tira y tira. ¡CRAC! El cristal se suelta, el techo tiembla y caen piedras que tapan el camino. El polvo apaga su fuego.\n\nTodo queda negro como la noche. Rok, el más fuerte del valle, no sabe por dónde salir. —¿Pipo? —susurra.",
          temptation: "La fuerza sin cuidado rompe las cosas.",
        },
        c: {
          label: "Preguntarle a Pipo qué piensa.",
          title: "Lo que piensa Pipo",
          text: "—Ese cristal sostiene el techo —dice Pipo—. Es de la cueva, no de nadie. Rok refunfuña, pero lo deja en su lugar.\n\nEntonces, ¡PLIC!, una gota le cae en la nariz y apaga su fuego. Todo queda negro. —¿Pipo? —susurra.",
        },
      },
      {
        a: {
          label: "Pedirle perdón a Pipo y seguirlo.",
          title: "Perdón en la oscuridad",
          text: "—Perdón por reírme de ti, Pipo —dice Rok—. Ahora te necesito. Pipo se posa en su cuerno y chilla bajito para guiarlo.\n\nSalen juntos a la luz del atardecer. Desde ese día, Rok nunca vuelve a medir a nadie por su tamaño.",
          lesson: "Reírse de alguien pequeño es un error grande.",
        },
        b: {
          label: "Escuchar cómo Pipo usa su eco.",
          title: "El eco de Pipo",
          text: "Pipo chilla: ¡pi, pi! y escucha el eco volver. —Por aquí la cueva sigue; por allá, choca con la pared. Rok lo sigue en silencio.\n\nPronto ven la luz de la salida. Rok mira a su amigo diminuto: —Tu eco vale más que mi rugido.",
          lesson: "Cada uno tiene un talento, aunque no se vea grande.",
        },
        c: {
          label: "Rugir fuerte para que alguien lo oiga.",
          title: "Un rugido perdido",
          text: "Rok ruge: ¡GRRROAR! Cien ecos le contestan desde todas partes y ya no sabe de dónde vino. Entonces siente un ala en la nariz.\n\n—Sígueme —dice Pipo. El pequeño guía al grande hasta la luz. Afuera, Rok baja la cabeza: —Perdón por reírme de ti.",
          lesson: "Nadie es tan pequeño que no pueda ayudar.",
          temptation: "Gritar más fuerte no te hace escuchar mejor.",
        },
      },
    ],
  },
  "rok-valle-promesas": {
    lesson: "Quien mucho promete, poco cumple.",
    titles: [
      "Sí, sí y sí",
      "Tres trabajos y ninguno empezado",
      "¡Mi tejado gotea!",
      "Las manzanas del erizo",
      "Después de la tormenta",
    ],
    texts: [
      "Todos le piden favores a Rok. —¿Arreglas el puente? ¿Y mi tejado? ¿Y mis manzanas? —¡Sí, sí y sí! —dice él, feliz de caer bien.\n\nLa cabra Berta solo promete una cosa: traer la cuerda para el puente. Y esta noche llega una tormenta.",
      "Rok escribe su lista con una garra: puente, tejado, manzanas. Al leerla, traga saliva. ¡Es mucho para una tarde!\n\nBerta pasa con su cuerda al hombro, tranquila. Ella ya empezó. Rok, en cambio, tiene tres trabajos y ninguno empezado.",
      "Rok piensa: si el puente cae, nadie podrá cruzar. Vuela directo hacia allí, donde Berta ya espera con su cuerda.\n\nEmpiezan a atar tablas. Truenos lejanos retumban. Entonces el conejo grita desde su casa: —¡Rok, mi tejado gotea!",
      "Rok y Berta atan la última tabla. ¡El puente queda firme! Luego Rok vuela al tejado del conejo y lo tapa con hojas grandes.\n\nSolo quedan las manzanas, y la tormenta está encima. El erizo pregunta bajito: —¿Todavía vienes?",
      "—Hoy ya no puedo —confiesa Rok—. Mañana vendré temprano. Y esta vez sabe que podrá. El erizo tapa sus manzanas con una manta.\n\nAl amanecer, Rok llega el primero. Llenan juntos tres cestas. Decir la verdad a tiempo también era cumplir.",
    ],
    paths: [
      {
        a: {
          label: "Preguntarle a Berta por qué promete tan poco.",
          title: "Pocas palabras",
          text: "—Prometo poco para cumplirlo todo —dice Berta—. Una promesa es como una piedra: pesa. Rok cuenta las suyas y siente la espalda cargada.\n\nBerta se va con su cuerda al hombro. Ella ya empezó. Rok, en cambio, tiene tres trabajos y ninguno empezado.",
        },
        b: {
          label: "Hacer una lista de todo lo prometido.",
          title: "La lista larga",
          text: "Rok escribe su lista con una garra: puente, tejado, manzanas. Al leerla, traga saliva. ¡Es mucho para una tarde!\n\nBerta pasa con su cuerda al hombro, tranquila. Ella ya empezó. Rok, en cambio, tiene tres trabajos y ninguno empezado.",
        },
        c: {
          label: "Prometer también arreglar el molino.",
          title: "Una promesa más",
          text: "—¡Y el molino también! —dice Rok. Son cuatro promesas y el sol baja. Rok sale volando sin saber por dónde empezar.\n\nBerta lo mira y mastica despacio. Ella ya fue a buscar su cuerda. Rok tiene cuatro trabajos y ninguno empezado.",
          temptation: "Cada promesa pesa como una piedra.",
        },
      },
      {
        a: {
          label: "Empezar por lo más urgente: el puente.",
          title: "Primero el puente",
          text: "Rok piensa: si el puente cae, nadie podrá cruzar. Vuela directo hacia allí, donde Berta ya espera con su cuerda.\n\nEmpiezan a atar tablas. Truenos lejanos retumban. Entonces el conejo grita desde su casa: —¡Rok, mi tejado gotea!",
        },
        b: {
          label: "Hacer todo a la vez, volando de aquí para allá.",
          title: "Todo a medias",
          text: "Rok pone una teja, cuelga una tabla, sacude un manzano… y vuelve a volar. Todo queda a medias. ¡Hasta se le cae el martillo al río!\n\nLlega al puente sin aliento. Berta ya espera con su cuerda. Entonces el conejo grita: —¡Rok, mi tejado gotea!",
          temptation: "Quien todo lo empieza, nada termina.",
        },
        c: {
          label: "Avisar al erizo que sus manzanas esperarán.",
          title: "Una verdad pequeña",
          text: "Rok va a ver al erizo. —Tus manzanas tendrán que esperar un poco —le dice. El erizo asiente: —Gracias por avisar.\n\nRok llega al puente, donde Berta ya espera con su cuerda. Truena. Entonces el conejo grita: —¡Rok, mi tejado gotea!",
        },
      },
      {
        a: {
          label: "Dejar el puente a medias y correr al tejado.",
          title: "El puente que se soltó",
          text: "Rok vuela al tejado del conejo. El viento sopla y el puente a medio atar se suelta: ¡las tablas bailan sobre el río!\n\nBerta sujeta la cuerda con los dientes hasta que Rok vuelve. Lo salvan por un pelo. El erizo pregunta: —¿Todavía vienes?",
          temptation: "Lo que se deja a medias se cae.",
        },
        b: {
          label: "Terminar el puente con Berta y luego ir.",
          title: "Nudos firmes",
          text: "Rok y Berta atan la última tabla. ¡El puente queda firme! Luego Rok vuela al tejado del conejo y lo tapa con hojas grandes.\n\nSolo quedan las manzanas, y la tormenta está encima. El erizo pregunta bajito: —¿Todavía vienes?",
        },
        c: {
          label: "Pedir a los vecinos que ayuden al conejo.",
          title: "Muchas manos",
          text: "—¡Vecinos, el conejo necesita ayuda! —ruge Rok. Tres ardillas y un topo corren al tejado con hojas grandes.\n\nRok y Berta terminan el puente. Solo quedan las manzanas, y la tormenta está encima. El erizo pregunta bajito: —¿Todavía vienes?",
        },
      },
      {
        a: {
          label: "Contarle la verdad: hoy ya no puede.",
          title: "La verdad a tiempo",
          text: "—Hoy ya no puedo —confiesa Rok—. Mañana vendré temprano. Y esta vez sabe que podrá. El erizo tapa sus manzanas con una manta.\n\nAl amanecer, Rok llega el primero. Llenan juntos tres cestas. Decir la verdad a tiempo también era cumplir.",
          lesson: "Decir la verdad a tiempo también es cumplir.",
        },
        b: {
          label: "Decir que sí otra vez, aunque ya no puede más.",
          title: "El dragón dormido",
          text: "—¡Sí, claro! —dice Rok, aunque se le cierran los ojos. Sube al manzano… y se queda dormido en una rama. El viento tira las manzanas.\n\nAl amanecer, Berta lo despierta. Rok ve el suelo lleno de manzanas golpeadas y entiende: quien mucho promete, poco cumple.",
          lesson: "Quien mucho promete, poco cumple.",
          temptation: "Quien mucho promete, poco cumple.",
        },
        c: {
          label: "Ir a recoger manzanas con todos los vecinos.",
          title: "Cestas para todos",
          text: "Rok, Berta y los vecinos corren al manzano. Unos sacuden las ramas, otros atrapan las manzanas. ¡Terminan justo cuando empieza la lluvia!\n\nEsa noche, todos comen tarta de manzana. Rok aprende que una promesa compartida pesa mucho menos.",
          lesson: "Una promesa compartida pesa menos.",
        },
      },
    ],
  },
  "rok-nube-volcan": {
    lesson: "Lo que se hace con prisa, se hace dos veces.",
    titles: [
      "Cien panes para mañana",
      "Una hora entera",
      "El camino a la plaza",
      "La carrera del huevo",
      "La meta",
    ],
    texts: [
      "Rok es el dragón más rápido del valle, y lo sabe. —¡Yo enciendo el horno del pueblo en un soplido! —presume.\n\nLa abuela Tula, la tortuga panadera, sonríe: —El pan no quiere prisa, quiere fuego tranquilo. Pero mañana es la fiesta y faltan cien panes.",
      "Rok mira a Tula. Ella sopla despacito, como quien apaga una vela de cumpleaños. Las brasas se ponen naranjas, sin llamas locas.\n\nRok lo intenta igual y el horno queda tibio y parejo. Ahora la masa debe crecer una hora. ¡Una hora entera!",
      "Los panes salen dorados y esponjosos. Tula los pone en diez cestas. La plaza está al otro lado del río, y la fiesta empieza al atardecer.\n\n—Por el puente, paso a paso —dice Tula. Rok mira el cielo. Volando llegaría en un momento.",
      "En la plaza anuncian la última prueba: ¡la carrera del huevo en la cuchara! Gana quien llega sin romperlo.\n\nRok se ríe: ¡es el más rápido del valle! A su lado, la abuela Tula sostiene su cuchara con calma. —¿Listo, Rok? —pregunta, sonriendo.",
      "Rok mira a Tula: pasos cortos, ojos en el huevo. Hace lo mismo y el huevo ni se mueve.\n\nCruzan la meta casi juntos, mientras otros huevos ruedan por el suelo. Rok descubre que ir despacio también es una forma de ganar.",
    ],
    paths: [
      {
        a: {
          label: "Mirar cómo enciende Tula su fuego.",
          title: "El fuego de Tula",
          text: "Rok mira a Tula. Ella sopla despacito, como quien apaga una vela de cumpleaños. Las brasas se ponen naranjas, sin llamas locas.\n\nRok lo intenta igual y el horno queda tibio y parejo. Ahora la masa debe crecer una hora. ¡Una hora entera!",
        },
        b: {
          label: "Soplar fuerte para terminar antes.",
          title: "Cien panes de carbón",
          text: "Rok sopla con todas sus fuerzas. ¡FUUU! El horno ruge y los panes salen negros como carbón. Tula tose entre el humo.\n\n—Lo que se hace con prisa, se hace dos veces. Hay que amasar de nuevo. La masa necesita una hora para crecer.",
          temptation: "El pan no quiere prisa.",
        },
        c: {
          label: "Preguntar a Tula qué es un fuego tranquilo.",
          title: "El fuego tranquilo",
          text: "—Un fuego tranquilo es como un gato dormido —explica Tula—. Calienta, pero no araña. Rok sopla bajito y el horno se entibia.\n\nTula tapa la masa con un paño. —Hay que esperar una hora para que crezca. Rok abre los ojos: ¡una hora entera!",
        },
      },
      {
        a: {
          label: "Meter la masa al horno ya.",
          title: "Panes como piedras",
          text: "Rok mete la masa al horno sin esperar. Salen panes planos y duros. ¡TOC, TOC!, suenan contra la mesa como piedras.\n\nTula suspira. Rok baja la cabeza. Esta vez esperan, la masa crece y los panes salen dorados. Hay que llevarlos a la plaza.",
          temptation: "Hay cosas que solo el tiempo sabe hacer.",
        },
        b: {
          label: "Buscar una señal de que la masa está lista.",
          title: "La prueba del dedo",
          text: "Rok busca una señal. Tula le enseña un truco: si hundes un dedo en la masa y el hoyito vuelve despacio, está lista.\n\nRok prueba cada rato con su garra. ¡Por fin! Los panes salen dorados y esponjosos. Ahora hay que llevarlos a la plaza.",
        },
        c: {
          label: "Esperar jugando con los niños del pueblo.",
          title: "Una hora que vuela",
          text: "Rok juega a las escondidas con los niños del pueblo. Se esconde tan mal que su cola siempre asoma, y todos se ríen.\n\nCuando vuelve, la masa está enorme. Los panes salen dorados y esponjosos. Ahora hay que llevarlos a la plaza.",
        },
      },
      {
        a: {
          label: "Pedir ayuda a los niños del pueblo.",
          title: "Una fila de cestas",
          text: "Rok llama a los niños del pueblo. Cada uno lleva una cesta por el puente, y Rok vigila desde el aire como un gran pájaro.\n\nLlegan todos juntos, cantando. Entonces anuncian la última prueba de la fiesta: ¡la carrera del huevo en la cuchara!",
        },
        b: {
          label: "Contar cuántas cestas puede llevar bien.",
          title: "Dos cestas cada vez",
          text: "Rok prueba: con dos cestas vuela firme; con tres, se tambalea. Hace cinco viajes y no se cae ni un pan.\n\nEn la plaza, todos huelen el pan y aplauden. Anuncian la última prueba de la fiesta: ¡la carrera del huevo en la cuchara!",
        },
        c: {
          label: "Volar con las diez cestas a la vez.",
          title: "Lluvia de panes",
          text: "Rok levanta diez cestas y vuela. Una se tambalea, otra se inclina… ¡y llueven panes sobre el río! Los patos aplauden encantados.\n\nRok rescata los que puede y llega a la plaza. Anuncian la última prueba: ¡la carrera del huevo en la cuchara!",
          temptation: "Quien mucho abarca, poco aprieta.",
        },
      },
      {
        a: {
          label: "Correr lo más rápido posible.",
          title: "¡PLAF!",
          text: "Rok sale disparado. A los tres pasos, ¡PLAF!, el huevo cae. Vuelve y… ¡PLAF! otra vez. Tula llega a la meta paso a paso.\n\nRok se ríe con la cara llena de huevo. —Ya entendí: lo que se hace con prisa, se hace dos veces.",
          lesson: "Lo que se hace con prisa, se hace dos veces.",
          temptation: "Lo que se hace con prisa, se hace dos veces.",
        },
        b: {
          label: "Mirar cómo camina Tula con su huevo.",
          title: "El paso de la tortuga",
          text: "Rok mira a Tula: pasos cortos, ojos en el huevo, sin mirar a nadie. Hace lo mismo y el huevo ni se mueve.\n\nCruzan la meta casi juntos, mientras huevos ruedan por el suelo. Rok descubre que ir despacio también es una forma de ganar.",
          lesson: "Despacio y con cuidado se llega más lejos.",
        },
        c: {
          label: "Caminar al paso de Tula, juntos.",
          title: "Dos a la meta",
          text: "Rok camina al lado de Tula. —Así tu huevo y el mío llegan enteros —dice. Todo el pueblo los anima.\n\nCruzan la meta juntos, sin un huevo roto. Esa noche, en la fiesta, Rok aprende que llegar juntos vale más que llegar primero.",
          lesson: "Llegar juntos vale más que llegar primero.",
        },
      },
    ],
  },
  "suri-lago-reflejos": {
    lesson: "Lo que menos valoras puede salvarte.",
    titles: [
      "Una corona bonita",
      "¡Tormenta!",
      "Enredada",
      "Piedras diminutas",
      "La fiesta de la luna",
    ],
    texts: [
      "Suri se mira en el lago. —¡Qué corona de hojas tan bonita! —dice—. Pero mis pies… pequeños y descalzos. ¡Qué feos!\n\nBrisa, la liebre, se ríe: —Tus pies son los más rápidos del bosque. Esta noche hay fiesta de la luna, al otro lado.",
      "Suri y Brisa salen hacia la fiesta. De pronto, el cielo ruge: ¡se acerca una tormenta! Hay que cruzar el bosque de zarzas antes de que llueva.\n\n—¡A correr! —dice Brisa. Suri mira su corona y sus pies pequeños.",
      "En medio del bosque de zarzas, ¡zas!, la corona se enreda en las espinas. Suri tira, pero no puede soltarse.\n\nEmpiezan a caer gotas gordas. Brisa vuelve saltando: —¡Suéltate, Suri! Pero la corona es lo que más quiere.",
      "Libre, Suri corre descalza como el viento. ¡Sus pies pequeños esquivan raíces y charcos! Llegan a un arroyo que crece con la lluvia.\n\nSolo quedan piedras diminutas para cruzar. Brisa duda. Suri mira sus pies. ¿Qué hará?",
      "En la fiesta de la luna, los animales bailan bajo las estrellas. Suri baila descalza, sin corona.\n\nSe mira en un charco y sonríe a sus pies pequeños. —Gracias —les dice—. Hoy me trajeron hasta aquí.",
    ],
    paths: [
      {
        a: {
          label: "Añadir más hojas y ramas a la corona.",
          title: "Una corona enorme",
          text: "Suri añade hojas, ramas y hasta una piña. ¡La corona es enorme! Casi no puede mover la cabeza. Brisa se ríe.\n\nSalen hacia la fiesta y el cielo ruge: ¡tormenta! Hay que cruzar el bosque de zarzas. —¡A correr! —dice Brisa.",
          temptation: "Lo que es solo bonito puede pesar mucho.",
        },
        b: {
          label: "Mirar sus pies con otros ojos.",
          title: "Pies ligeros",
          text: "Suri mira sus pies: son pequeños, pero fuertes y ligeros. —Quizá no son tan feos —piensa. Brisa asiente.\n\nSalen hacia la fiesta y el cielo ruge: ¡tormenta! Hay que cruzar el bosque de zarzas. —¡A correr! —dice Brisa.",
        },
        c: {
          label: "Pedirle a Brisa que le enseñe a correr.",
          title: "Clase de carrera",
          text: "Brisa le enseña a correr: rodillas arriba, pasos cortos. ¡Suri es rapidísima! Se ríe de sorpresa.\n\nSalen hacia la fiesta y el cielo ruge: ¡tormenta! Hay que cruzar el bosque de zarzas. —¡A correr! —dice Brisa.",
        },
      },
      {
        a: {
          label: "Correr con sus pies rápidos, como Brisa.",
          title: "Como el viento",
          text: "Suri corre con sus pies rápidos, casi tanto como Brisa. Pero en las zarzas, ¡zas!, la corona se enreda en las espinas.\n\nEmpiezan a caer gotas gordas. Brisa vuelve saltando: —¡Suéltate, Suri! Pero la corona es lo que más quiere.",
        },
        b: {
          label: "Buscar con Brisa el camino más abierto.",
          title: "El camino abierto",
          text: "Brisa y Suri buscan el camino más abierto entre las zarzas. Aun así, una rama baja atrapa la corona. ¡Zas!\n\nEmpiezan a caer gotas gordas. Brisa vuelve saltando: —¡Suéltate, Suri! Pero la corona es lo que más quiere.",
        },
        c: {
          label: "Caminar despacio para cuidar la corona.",
          title: "Despacio",
          text: "Suri camina despacio para no despeinar su corona. ¡La tormenta la alcanza! Y en las zarzas, ¡zas!, la corona se enreda en las espinas.\n\nEmpiezan a caer gotas gordas, una tras otra. Brisa vuelve saltando: —¡Suéltate, Suri!",
          temptation: "Cuidar solo lo bonito te hace llegar tarde.",
        },
      },
      {
        a: {
          label: "Quitarse la corona y dejarla en la zarza.",
          title: "Libre",
          text: "Suri se quita la corona y la deja en la zarza. ¡Libre! Corre descalza como el viento, junto a Brisa.\n\nLlegan a un arroyo que crece con la lluvia. Solo quedan piedras diminutas para cruzar. Brisa duda.",
        },
        b: {
          label: "Tirar de la corona para no perder ni una hoja.",
          title: "Arañazos",
          text: "Suri tira y tira. ¡Las espinas le arañan los brazos y la corona se rompe igual! Brisa la ayuda a soltarse.\n\nLibre, Suri corre descalza como el viento. Llegan a un arroyo que crece con la lluvia. Solo quedan piedras diminutas.",
          temptation: "Aferrarse a lo que te atrapa solo te hace daño.",
        },
        c: {
          label: "Pedirle a Brisa que corte las espinas con los dientes.",
          title: "Crac, crac",
          text: "Brisa corta las espinas con sus dientes, ¡crac, crac! Suri se suelta y corren descalzas como el viento.\n\nLlegan a un arroyo que crece con la lluvia. Solo quedan piedras diminutas para cruzar. Brisa duda.",
        },
      },
      {
        a: {
          label: "Saltar las piedras diminutas con sus pies pequeños.",
          title: "¡Hop, hop, hop!",
          text: "Suri salta las piedras diminutas: ¡hop, hop, hop! Sus pies pequeños caben justo. Llega a la fiesta antes que nadie.\n\nBrisa aplaude y Suri baila descalza, muy contenta. Aprende que cada parte de ti tiene su valor.",
          lesson: "Cada parte de ti tiene su valor.",
        },
        b: {
          label: "Cruzar de la mano con Brisa, piedra a piedra.",
          title: "De la mano",
          text: "Suri y Brisa cruzan de la mano, piedra a piedra. Los pies de Suri encuentran cada piedra, y Brisa no se cae.\n\nLlegan juntas a la fiesta. Suri aprende que lo que tienes brilla más cuando ayudas a otros.",
          lesson: "Lo que tienes brilla más cuando ayuda a otros.",
        },
        c: {
          label: "Esperar a que alguien traiga un puente.",
          title: "Esperando",
          text: "Suri espera y espera. La lluvia moja su vestido. Al final, Brisa salta una piedra y le enseña: —¡Tus pies pueden! Suri salta y cruza.\n\nEn la fiesta, Suri entiende: lo que menos valoraba era lo que la salvaba.",
          lesson: "Lo que menos valoras puede salvarte.",
          temptation: "Lo que menos valoras puede salvarte.",
        },
      },
    ],
  },
  "suri-arbol-luciernagas": {
    lesson: "Quien ayuda, encuentra ayuda.",
    titles: [
      "Mucha prisa",
      "Tres caminos",
      "¡Fiuuu!",
      "El nido a oscuras",
      "Un árbol que brilla",
    ],
    texts: [
      "Esta noche, Suri debe encender el Árbol de las Luciérnagas para guiar a los pájaros que viajan. Lleva la llama del bosque en una hoja.\n\nEn el camino, una luciérnaga pequeña está atrapada en una telaraña. —¡Ayuda! —pide Lumi. Suri tiene mucha prisa. Muchísima.",
      "Suri sigue por el bosque oscuro. La llama de su hoja se hace pequeña. Llega a un cruce con tres caminos iguales.\n\nNo se ve nada. Detrás, brilla una lucecita diminuta: es Lumi, que la ha seguido.",
      "Por fin, Suri llega al gran árbol. Trepa rama a rama hasta la copa. ¡Fiuuu! Un golpe de viento apaga la llama de su hoja.\n\nTodo queda oscuro. Solo brilla una lucecita: la de Lumi. —Yo puedo ayudar —dice la luciérnaga pequeña.",
      "¡Cientos de luciérnagas se encienden en el árbol! Los pájaros viajeros se ven a lo lejos. En una rama baja, un nido sigue oscuro.\n\nUn pajarito llama a su mamá. Suri está en la copa y Lumi a su lado. ¿Qué hará Suri?",
      "El Árbol de las Luciérnagas brilla toda la noche. Los pájaros viajeros lo ven y aterrizan a descansar.\n\nSuri se sienta en una rama con Lumi en la mano. —Tú me ayudaste cuando más lo necesitaba —le dice—. Y yo casi no te ayudo.",
    ],
    paths: [
      {
        a: {
          label: "Soltar a Lumi con cuidado.",
          title: "Hilo a hilo",
          text: "Suri suelta a Lumi con cuidado, hilo a hilo. —¡Gracias! —dice la luciérnaga, y la sigue volando.\n\nEn el bosque oscuro, la llama de la hoja se hace pequeña. Llegan a un cruce con tres caminos iguales. No se ve nada.",
        },
        b: {
          label: "Seguir de largo, ¡la tarea es importante!",
          title: "De largo",
          text: "Suri sigue de largo. Detrás, otras luciérnagas liberan a Lumi de la telaraña. Suri no se entera.\n\nEn el bosque oscuro, la llama de su hoja se hace pequeña. Llega a un cruce con tres caminos iguales. Detrás brilla una lucecita: es Lumi.",
          temptation: "Tener prisa no es excusa para no ayudar.",
        },
        c: {
          label: "Llamar a otras luciérnagas para que la ayuden.",
          title: "Muchas luces",
          text: "Suri llama a otras luciérnagas, que liberan a Lumi en un momento. La pequeña la sigue, agradecida.\n\nEn el bosque oscuro, la llama de la hoja se hace pequeña. Llegan a un cruce con tres caminos iguales. No se ve nada.",
        },
      },
      {
        a: {
          label: "Decirle a Lumi que es demasiado pequeña.",
          title: "Demasiado pequeña",
          text: "—Eres demasiado pequeña para ayudar —dice Suri. Lumi baja la luz, triste, pero la sigue igual. Suri elige un camino al azar y llega al gran árbol.\n\nTrepa hasta la copa. ¡Fiuuu! El viento apaga su llama. Solo brilla una lucecita: la de Lumi.",
          temptation: "El tamaño no mide lo que alguien puede hacer.",
        },
        b: {
          label: "Pedirle a Lumi que alumbre los caminos.",
          title: "Huellas de ardilla",
          text: "Lumi vuela por cada camino y alumbra el suelo. ¡El del centro tiene huellas de ardilla! Por ahí llegan al gran árbol.\n\nSuri trepa hasta la copa. ¡Fiuuu! Un golpe de viento apaga la llama de su hoja. Solo brilla la luz de Lumi.",
        },
        c: {
          label: "Proteger la llama con las manos.",
          title: "Manos que protegen",
          text: "Suri protege la llama con las manos, y Lumi vuela delante para mostrar el camino. Llegan al gran árbol.\n\nSuri trepa hasta la copa. ¡Fiuuu! Un golpe de viento apaga la llama de su hoja. Solo brilla la luz de Lumi.",
        },
      },
      {
        a: {
          label: "Aceptar la ayuda de Lumi.",
          title: "Gracias, Lumi",
          text: "—Gracias, Lumi —dice Suri. Lumi vuela de hoja en hoja, despertando a sus amigas con su lucecita.\n\n¡Cientos de luciérnagas encienden el árbol! Los pájaros se acercan. Pero en una rama baja, un nido sigue a oscuras.",
        },
        b: {
          label: "Pedir a Lumi que llame a sus amigas.",
          title: "Las amigas de Lumi",
          text: "Lumi silba y llegan sus amigas, una detrás de otra. ¡Cientos de luciérnagas encienden el árbol!\n\nLos pájaros viajeros ya se ven a lo lejos. Pero en una rama baja, un nido sigue a oscuras, y Lumi lo ve.",
        },
        c: {
          label: "Intentar encender la hoja otra vez, sola.",
          title: "No prende",
          text: "Suri sopla y frota la hoja, sola. ¡No prende! Al final, acepta la ayuda de Lumi, que despierta a sus amigas.\n\n¡Cientos de luciérnagas encienden el árbol! Los pájaros se acercan. Pero en una rama baja, un nido sigue a oscuras.",
          temptation: "Rechazar ayuda solo alarga el camino.",
        },
      },
      {
        a: {
          label: "Bajar ella misma a iluminar el nido con Lumi.",
          title: "El nido",
          text: "Suri baja con Lumi hasta el nido. La lucecita ilumina al pajarito y su mamá lo encuentra enseguida. Los dos se acurrucan juntos.\n\nSuri aprende que ninguna tarea es tan importante como para olvidar a los pequeños.",
          lesson: "Ninguna tarea es más importante que un pequeño en apuros.",
        },
        b: {
          label: "Quedarse en la copa, que es lo importante.",
          title: "La copa",
          text: "Suri se queda en la copa. El pajarito sigue llorando a oscuras. Lumi baja volando sola y lo ilumina, y la mamá lo encuentra.\n\nSuri se sonroja. Aprende que los pequeños también importan, y que quien ayuda, encuentra ayuda.",
          lesson: "Quien ayuda, encuentra ayuda.",
          temptation: "Quien ayuda, encuentra ayuda.",
        },
        c: {
          label: "Pedir a varias luciérnagas que bajen al nido.",
          title: "Una estrella en la rama",
          text: "Suri pide a diez luciérnagas que bajen con Lumi. ¡El nido brilla como una estrella! La mamá pájaro llega volando y abraza a su pequeño.\n\nSuri aprende que la luz que se comparte llega más lejos.",
          lesson: "La luz que se comparte llega más lejos.",
        },
      },
    ],
  },
  "suri-sendero-semillas": {
    lesson: "Decir es fácil; lo que cuenta es hacer.",
    titles: [
      "¿Y quién se lo pone?",
      "El cuervo dormido",
      "La cinta",
      "¡Clin, clin!",
      "Brotes verdes",
    ],
    texts: [
      "Un cuervo glotón se come las semillas del sendero. Los animales se reúnen. —¡Pongámosle un cascabel! —dice Tobi, el ratón—. Así lo oiremos llegar.\n\n—¡Gran idea! —aplauden. —¿Y quién se lo pone? —pregunta Tobi. Nadie contesta. Suri, que camina sin ruido, mira al suelo.",
      "Al amanecer, el cuervo aterriza y se come las semillas, ¡ñam, ñam! Después se duerme en la valla vieja, con la barriga llena.\n\nTobi tiene el cascabel en la mano, pero tiembla. Suri sabe moverse sin hacer ni un ruidito.",
      "Ya están junto al cuervo. ¡Ronca como un tractor! Para atarle el cascabel, hay que pasar una cinta por su pata.\n\nEl cuervo mueve una pluma. Tobi se queda helado. Suri tiene la cinta en la mano.",
      "¡Clin, clin! El cascabel ya está atado. El cuervo despierta y vuela, sonando por todo el bosque. Los animales lo oyen y protegen las semillas.\n\nPero el cuervo vuelve triste: —Tengo hambre de verdad —dice. Suri lo mira. ¿Qué hará?",
      "En primavera, el sendero se llena de brotes verdes. El cuervo, con su cascabel, saluda desde el prado: ¡clin, clin!\n\nTobi y Suri se sientan entre las flores. —La próxima idea —dice Suri—, la pongo en marcha yo primero.",
    ],
    paths: [
      {
        a: {
          label: "Pensar cómo acercarse sin ruido.",
          title: "Sin ruido",
          text: "Suri piensa: el cuervo duerme después de comer, y ella camina sin ruido. Se lo cuenta a Tobi en voz bajita.\n\nAl amanecer, el cuervo se come las semillas y se duerme en la valla vieja. Tobi tiene el cascabel, pero tiembla.",
        },
        b: {
          label: "Ofrecerse a ir con Tobi.",
          title: "Iré contigo",
          text: "—Iré contigo, Tobi —dice Suri. El ratón suspira aliviado. Juntos esperan escondidos entre la hierba.\n\nAl amanecer, el cuervo se come las semillas y se duerme en la valla vieja. Tobi tiene el cascabel, pero tiembla.",
        },
        c: {
          label: "Esconderse detrás de un árbol.",
          title: "Todos se esconden",
          text: "Suri se esconde detrás de un árbol. Los demás también se esconden, uno a uno. Solo queda Tobi, con el cascabel.\n\nAl amanecer, el cuervo se come las semillas y se duerme en la valla vieja. Tobi tiembla. Suri sabe moverse sin ruido.",
          temptation: "Esconderse no resuelve el problema.",
        },
      },
      {
        a: {
          label: "Esperar a que el cuervo ronque.",
          title: "Grrr, grrr",
          text: "Suri espera, quieta como una hoja. ¡Grrr, grrr! El cuervo ronca. Entonces avanza con Tobi, de puntillas.\n\nYa están junto al cuervo. Hay que atar una cinta en su pata. El cuervo mueve una pluma. Tobi se queda helado. Suri tiene la cinta.",
        },
        b: {
          label: "Decirle a Tobi que vaya él solo.",
          title: "Ve tú",
          text: "—Ve tú, Tobi —dice Suri. Da tres pasos y ¡crac!, pisa una rama. Suri corre a ayudarlo sin hacer ruido.\n\nYa están junto al cuervo, que ronca. Hay que atar una cinta en su pata. Mueve una pluma. Tobi se queda helado.",
          temptation: "Pedir a otro lo que tú puedes hacer no es justo.",
        },
        c: {
          label: "Acercarse juntos, paso a paso.",
          title: "Paso a paso",
          text: "Suri y Tobi se acercan juntos, paso a paso, sobre el musgo. Ni un ruidito.\n\nYa están junto al cuervo, que ronca como un tractor. Hay que atar una cinta en su pata. El cuervo mueve una pluma. Tobi se queda helado.",
        },
      },
      {
        a: {
          label: "Dejar la cinta y salir corriendo.",
          title: "Vuelve",
          text: "Suri suelta la cinta y corre. Tobi se queda solo, temblando. Suri se para, respira hondo y vuelve. Juntos atan el cascabel.\n\n¡Clin, clin! El cuervo despierta y vuela sonando. Los animales protegen las semillas. Pero el cuervo vuelve: —Tengo hambre de verdad.",
          temptation: "Huir deja solos a tus amigos.",
        },
        b: {
          label: "Esperar quieta a que vuelva a roncar.",
          title: "Quieta como una piedra",
          text: "Suri se queda quieta como una piedra. El cuervo vuelve a roncar. Con cuidado, ata el cascabel mientras Tobi vigila.\n\n¡Clin, clin! El cuervo despierta y vuela sonando. Los animales protegen las semillas. Pero el cuervo vuelve: —Tengo hambre de verdad.",
        },
        c: {
          label: "Pedir a Tobi que sujete la cinta mientras ella ata.",
          title: "El nudo",
          text: "Tobi sujeta la cinta y Suri hace un nudo, rapidísimo y sin ruido. ¡Clin! Queda perfecto.\n\nEl cuervo despierta y vuela sonando. Los animales protegen las semillas. Pero el cuervo vuelve triste: —Tengo hambre de verdad —dice.",
        },
      },
      {
        a: {
          label: "Contar a todos que el plan fue suyo.",
          title: "Mi plan",
          text: "—¡El plan fue mío! —presume Suri. Pero todos saben que la idea fue de Tobi, y que ella casi se esconde. Suri se sonroja y pide perdón.\n\nAprende que decir es fácil; lo que cuenta es hacer.",
          lesson: "Decir es fácil; lo que cuenta es hacer.",
          temptation: "Decir es fácil; lo que cuenta es hacer.",
        },
        b: {
          label: "Enseñarle al cuervo dónde hay semillas silvestres.",
          title: "El prado",
          text: "Suri lleva al cuervo a un prado con semillas silvestres. ¡Allí hay de sobra! El cuervo come feliz y deja el sendero en paz.\n\nTobi sonríe. Suri aprende que las buenas ideas se hacen con los pies, no solo con la boca.",
          lesson: "Las buenas ideas se hacen, no solo se dicen.",
        },
        c: {
          label: "Proponer que todos le guarden unas pocas semillas.",
          title: "Un trato",
          text: "Suri propone guardar unas pocas semillas para el cuervo. Tobi y todos aceptan, y el cuervo promete no comer del sendero.\n\nSuri aprende que actuar juntos, y pensar también en el otro, soluciona más que un cascabel.",
          lesson: "Actuar juntos soluciona más que hablar.",
        },
      },
    ],
  },
};

const fableChoiceBeats: Record<string, Record<SkillKey, [string, string]>[]> = {
};

for (const [id, beats] of Object.entries(fableChoiceBeats)) {
  authoredStoryContent[id].choiceBeats = beats;
}

type FableFact = [prompt: string, answer: string, distractorOne: string, distractorTwo: string];
const fableQuizFacts: Record<string, [FableFact, FableFact]> = {
  "luma-arrecife-cristal": [
    ["¿Para quién era la concha rosada?", "Para la abuela de Luma", "Para Nácar", "Para la urraca"],
    ["¿Qué era la concha grande del agua?", "El reflejo de la suya", "Una concha mágica", "Un pez rosado"],
  ],
  "rio-cantor": [
    ["¿Qué tapaba el Río que Canta?", "Un tronco enorme", "Una roca de hielo", "Una red de pesca"],
    ["¿Qué no se rompe, según Bruno?", "Muchos palos atados juntos", "Un palo muy grande", "Una cuerda vieja"],
  ],
  "faro-nubes": [
    ["¿Quién le dio tres consejos a Nia?", "Olivia, la lechuza", "Un castor", "La nube del puente"],
    ["¿Qué llevaba Nia en su farol?", "Una chispa nueva", "Una estrella", "Agua del río"],
  ],
  "jardin-gigantes": [
    ["¿Qué contó Nia que había visto el primer día?", "Un caracol enorme como un carro", "Una oruga gigante", "Un topo volador"],
    ["¿Hacia dónde iba la oruga?", "Hacia la calabaza de la fiesta", "Hacia el río", "Hacia la casa de Nia"],
  ],
  "teo-taller-estrellas": [
    ["¿Qué pieza puso Teo al revés?", "Un engranaje", "Una estrella", "Una rueda de bici"],
    ["¿Quién ayudó con los tornillos diminutos?", "Lía, la ratoncita", "El gato", "La alcaldesa"],
  ],
  "teo-ciudad-cobre": [
    ["¿Qué debía construir Teo antes del invierno?", "La gran estufa de la ciudad", "Unos patines", "Un reloj"],
    ["¿Quién guardó leña y carbón todo el verano?", "Ada, la hormiga", "El alcalde", "Los amigos de Teo"],
  ],
  "teo-bosque-brujulas": [
    ["¿Qué inventó Teo?", "Una brújula que habla", "Unos patines", "Un reloj de cobre"],
    ["¿Dónde crece el musgo, según Pinto?", "En el lado norte de los árboles", "En las nubes", "Dentro del arroyo"],
  ],
  "bit-observatorio-luz": [
    ["¿A quién culpó Bit de los apagones?", "A las golondrinas", "Al guardián", "Al cometa"],
    ["¿Qué apagaba de verdad la luz?", "Una antena suelta con el viento", "Los huevos del nido", "Una nube"],
  ],
  "bit-lago-ecos": [
    ["¿Por qué estaba triste Ruli?", "Su amiga se había mudado", "Había perdido su voz", "El lago se secó"],
    ["¿Qué hizo de segunda voz en la canción?", "El eco del lago", "Un pájaro", "La radio de Bit"],
  ],
  "bit-ciudad-semillas": [
    ["¿Dónde estaba la flor de luz?", "En lo alto de la torre", "En el río", "En la casa de Bit"],
    ["¿Qué necesitaba la flor para abrirse?", "Que alguien le cantara desde arriba", "Mucha agua", "Una lámpara"],
  ],
  "luma-faro-mareas": [
    ["¿Quién avisó de que venía la niebla?", "Don Ermo, el cangrejo", "Brillo, la gaviota", "Un pescador"],
    ["¿Qué quería Brillo en realidad?", "Las sardinas de las barcas", "Aprender a cantar", "Encender el faro"],
  ],
  "luma-isla-barcas": [
    ["¿Qué hizo Tino con su balsa?", "La probó en el agua", "La pintó tres veces", "La dejó en la orilla"],
    ["¿Qué entraba por la rendija de la barca de Luma?", "Agua", "Arena", "Peces"],
  ],
  "rok-cueva-ecos": [
    ["¿Qué quería llevarse Rok de la cueva?", "El cristal dorado más grande", "Un murciélago dormido", "Una piedra negra"],
    ["¿Cómo encuentra Pipo el camino a oscuras?", "Escuchando su eco", "Con una linterna", "Siguiendo un mapa"],
  ],
  "rok-valle-promesas": [
    ["¿Qué prometió traer la cabra Berta?", "La cuerda para el puente", "Una tarta de manzana", "Un martillo nuevo"],
    ["¿Qué llegaba esa noche al valle?", "Una tormenta", "Una fiesta", "Un circo"],
  ],
  "rok-nube-volcan": [
    ["¿Qué hacía la abuela Tula?", "Era la panadera del pueblo", "Cuidaba el puente", "Vendía huevos"],
    ["¿Qué necesitaba la masa antes de hornearla?", "Una hora para crecer", "Mucho fuego", "Un soplido fuerte"],
  ],
  "suri-lago-reflejos": [
    ["¿De qué estaba orgullosa Suri?", "De su corona de hojas", "De sus pies", "De su casa"],
    ["¿Qué ayudó a Suri a cruzar el arroyo?", "Sus pies pequeños y rápidos", "Su corona", "Un puente de madera"],
  ],
  "suri-arbol-luciernagas": [
    ["¿Qué debía encender Suri?", "El Árbol de las Luciérnagas", "Una fogata", "El faro del lago"],
    ["¿Quién ayudó a Suri cuando se apagó su llama?", "Lumi, la luciérnaga pequeña", "Un búho", "La luna"],
  ],
  "suri-sendero-semillas": [
    ["¿Quién tuvo la idea del cascabel?", "Tobi, el ratón", "El cuervo", "Suri"],
    ["¿Qué hacía el cuervo después de comer?", "Dormía en la valla vieja", "Cantaba", "Se bañaba en el río"],
  ],
};

for (const [id, facts] of Object.entries(fableQuizFacts)) {
  const questions = facts.map(([prompt, answer, distractorOne, distractorTwo], index) => ({
    prompt,
    options: [answer, distractorOne, distractorTwo],
    correctIndex: 0,
    coinReward: index + 1,
  })) as Question[];
  authoredStoryContent[id].quiz = [
    ...questions,
    {
      prompt: "¿Qué aprendió {personaje} en esta aventura?",
      options: [authoredStoryContent[id].lesson, "Que debía hacerlo todo solo", "Que escuchar nunca ayuda"],
      correctIndex: 0,
      coinReward: 3,
    },
  ];
}

stories.forEach((story) => {
  const authored = authoredStoryContent[story.id];
  if (!authored) return;
  story.chapters.forEach((chapter, index) => {
    chapter.title = authored.titles[index];
    chapter.text = authored.texts[index];
    if (index >= 4) {
      chapter.decisions = [];
      return;
    }

    const nextTitle = authored.titles[index + 1];
    const nextText = authored.texts[index + 1];
    const choiceBeat = authored.choiceBeats?.[index];
    const sharedBeat = nextText.split("\n\n")[1] ?? nextText;
    const beatPaths = choiceBeat ? Object.fromEntries(
      (["a", "b", "c"] as SkillKey[]).map((skillKey) => [
        skillKey,
        {
          label: choiceBeat[skillKey][0],
          title: `${nextTitle}: ${choiceBeat[skillKey][0].replace(/[.!?]$/, "")}`,
          text: `${choiceBeat[skillKey][1]}\n\n${sharedBeat}`,
        },
      ]),
    ) as Record<SkillKey, AuthoredPath> : undefined;
    const paths: Record<SkillKey, AuthoredPath> = authored.paths?.[index] ?? (index === 3 ? authored.endingPaths : beatPaths) ?? {
      a: {
        label: `Dar un paso valiente hacia ${nextTitle.toLowerCase()}.`,
        title: `${nextTitle}: el paso valiente`,
        text: `${nextText} {personaje} se atreve a actuar sin dejar de cuidar a quienes encuentra en el camino.`,
      },
      b: {
        label: `Buscar la pista que explica ${nextTitle.toLowerCase()}.`,
        title: `${nextTitle}: la pista encontrada`,
        text: `${nextText} {personaje} observa, compara y descubre una idea que cambia la forma de seguir.`,
      },
      c: {
        label: `Escuchar y colaborar antes de llegar a ${nextTitle.toLowerCase()}.`,
        title: `${nextTitle}: la ayuda compartida`,
        text: `${nextText} {personaje} escucha a los habitantes y convierte sus recuerdos en parte de la solución.`,
      },
    };
    chapter.decisions.forEach((decision) => {
      decision.defaultLabel = paths[decision.skillKey].label;
      const lesson = paths[decision.skillKey].temptation;
      if (lesson) temptationLessons.set(`${story.id}:${chapter.id}:${decision.skillKey}`, lesson);
    });
    story.chapters[index + 1].continuations = {
      a: { title: paths.a.title, text: paths.a.text },
      b: { title: paths.b.title, text: paths.b.text },
      c: { title: paths.c.title, text: paths.c.text },
    };
  });
  if (authored.quiz) {
    story.closingQuiz.questions = authored.quiz;
    return;
  }
  story.closingQuiz.questions[2].prompt = `¿Qué aprendió {personaje} en esta aventura?`;
  story.closingQuiz.questions[2].options = [
    authored.lesson,
    "Que debía hacerlo todo solo",
    "Que las pistas no importan",
  ];
  story.closingQuiz.questions[2].correctIndex = 0;
});

function renderTemplate(text: string, characterName: string) {
  return text.replaceAll("{personaje}", characterName);
}

function shuffledOptions() {
  const order = [0, 1, 2];
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [order[index], order[swap]] = [order[swap], order[index]];
  }
  return order;
}

function normalizeCharacterSave(value?: Partial<CharacterSave>): CharacterSave {
  if (!value) return emptyCharacterSave();
  const decisions = value.decisions ?? {};
  const completedStories = value.completedStories ?? [];
  const migratedSkills =
    value.skills ??
    (completedStories.length ? deriveSkills(decisions) : { ...EMPTY_SKILLS });
  return {
    decisions: value.skills || !completedStories.length ? decisions : {},
    completedStories,
    skills: migratedSkills,
    lessons: value.lessons ?? [],
  };
}

function normalizeSavedProgress(parsed: Partial<SaveData>): SaveData {
  const savedCharacters = parsed.characters ?? { nia: emptyCharacterSave() };
  const inferredUnlockedStories = Object.values(savedCharacters).flatMap(
    (value) => value.completedStories ?? [],
  );
  return {
    coins: parsed.coins ?? 0,
    lifetimeCoins: parsed.lifetimeCoins ?? parsed.coins ?? 0,
    unlockedCharacters: parsed.unlockedCharacters ?? ["nia"],
    unlockedStories: parsed.unlockedStories ?? inferredUnlockedStories,
    characters: Object.fromEntries(
      Object.entries(savedCharacters).map(([id, value]) => [
        id,
        normalizeCharacterSave(value),
      ]),
    ),
  };
}

function hasMeaningfulProgress(progress: SaveData): boolean {
  return (
    progress.lifetimeCoins > 0 ||
    progress.unlockedCharacters.some((id) => id !== "nia") ||
    progress.unlockedStories.length > 0 ||
    Object.values(progress.characters).some(
      (character) =>
        Object.keys(character.decisions).length > 0 ||
        character.completedStories.length > 0,
    )
  );
}

function loadSave(): SaveData {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) {
      const parsed = JSON.parse(current) as Partial<SaveData>;
      return normalizeSavedProgress(parsed);
    }
    const legacyRaw = LEGACY_STORAGE_KEYS.map((key) =>
      localStorage.getItem(key),
    ).find(Boolean);
    if (!legacyRaw)
      return {
        coins: 0,
        lifetimeCoins: 0,
        unlockedCharacters: ["nia"],
        unlockedStories: [],
        characters: { nia: emptyCharacterSave() },
      };
    const legacy = JSON.parse(legacyRaw) as {
      characters?: Record<
        string,
        {
          decisions?: Record<string, SkillKey>;
          correctQuestions?: Record<string, boolean>;
          completedStories?: string[];
        }
      >;
      decisions?: Record<string, string>;
      correctQuestions?: Record<string, boolean>;
      completedStories?: string[];
    };
    if (legacy.characters) {
      const entries = Object.entries(legacy.characters);
      const characters = Object.fromEntries(
        entries.map(([id, value]) => [
          id,
          normalizeCharacterSave({
            decisions: value.decisions ?? {},
            completedStories: value.completedStories ?? [],
          }),
        ]),
      );
      const coins = entries.reduce(
        (total, [, value]) =>
          total +
          Object.keys(value.correctQuestions ?? {}).reduce(
            (sum, key) => sum + (key.endsWith(":1") ? 2 : 1),
            0,
          ),
        0,
      );
      return {
        coins,
        lifetimeCoins: coins,
        unlockedCharacters: ["nia"],
        unlockedStories: entries.flatMap(
          ([, value]) => value.completedStories ?? [],
        ),
        characters,
      };
    }
    const keyMap: Record<string, SkillKey> = {
      valentia: "a",
      ingenio: "b",
      amistad: "c",
      a: "a",
      b: "b",
      c: "c",
    };
    const decisions = Object.fromEntries(
      Object.entries(legacy.decisions ?? {}).map(([key, value]) => [
        key,
        keyMap[value] ?? "a",
      ]),
    );
    const coins = Object.keys(legacy.correctQuestions ?? {}).reduce(
      (sum, key) => sum + (key.endsWith(":1") ? 2 : 1),
      0,
    );
    return {
      coins,
      lifetimeCoins: coins,
      unlockedCharacters: ["nia"],
      unlockedStories: legacy.completedStories ?? [],
      characters: {
        nia: normalizeCharacterSave({
          decisions,
          completedStories: legacy.completedStories ?? [],
        }),
      },
    };
  } catch {
    return {
      coins: 0,
      lifetimeCoins: 0,
      unlockedCharacters: ["nia"],
      unlockedStories: [],
      characters: { nia: emptyCharacterSave() },
    };
  }
}

function deriveSkills(
  decisions: Record<string, SkillKey>,
  banked: Record<SkillKey, number> = EMPTY_SKILLS,
) {
  const totals = { ...banked };
  Object.entries(decisions).forEach(([decisionKey, key]) => {
    if (!temptationLesson(decisionKey, key)) totals[key] += 1;
  });
  return totals;
}

function earnedMilestones(value: number) {
  const milestones = value >= 1 ? [1] : [];
  for (let milestone = 5; milestone <= value; milestone += 5)
    milestones.push(milestone);
  return milestones;
}

function nextMilestone(value: number) {
  return value < 1 ? 1 : Math.floor(value / 5) * 5 + 5;
}

function milestoneProgress(value: number) {
  if (value === 0) return 0;
  if (value === 1) return 1;
  return value % 5 === 0 ? 5 : value % 5;
}

function badgeName(
  character: Character,
  skillKey: SkillKey,
  milestone: number,
) {
  return milestone === 1
    ? `Primer paso en ${character.skillLabels[skillKey]}`
    : `${character.skillLabels[skillKey]} · Hito ${milestone}`;
}

function coinAchievementName(milestone: number) {
  return milestone === 1
    ? "Mi primera moneda"
    : `Coleccionista · ${milestone} monedas`;
}

function faceDetail(
  row: number,
  column: number,
  config: SpriteConfig,
  expression: Expression,
) {
  const ink = "#1D2B53";
  const paper = "#FFF1E8";
  const sun = "#FFA300";
  if (row === 4 && (column === 4 || column === 7))
    return expression === "friend" ? config.accentColor : ink;
  if (row === 6) {
    if (expression === "courage" && column >= 4 && column <= 7)
      return config.accentColor;
    if (expression === "friend" && column >= 4 && column <= 7) return sun;
    if (expression === "wit" && column === 6) return ink;
    if (expression === "neutral" && (column === 5 || column === 6)) return ink;
  }
  return paper;
}

function humanSpriteColor(
  row: number,
  column: number,
  config: SpriteConfig,
  expression: Expression,
) {
  const ink = "#1D2B53";
  const paper = "#FFF1E8";
  if (row === 0 && column >= 4 && column <= 7) return config.hairColor;
  if (row === 1 && column >= 3 && column <= 8) return config.hairColor;
  if (row === 2 && column >= 2 && column <= 9) return config.hairColor;
  if (row >= 3 && row <= 7 && column >= 3 && column <= 8)
    return faceDetail(row, column, config, expression);
  if (row >= 3 && row <= 6 && (column === 2 || column === 9))
    return config.hairColor;
  if (row === 8 && column >= 4 && column <= 7) return paper;
  if (row === 10 && column >= 4 && column <= 7) return config.accentColor;
  if (row >= 9 && row <= 13 && column >= 3 && column <= 8)
    return config.outfitColor;
  if (row >= 10 && row <= 12 && (column === 2 || column === 9)) return paper;
  if (
    (row === 14 || row === 15) &&
    (column === 3 || column === 4 || column === 7 || column === 8)
  )
    return ink;
  return "transparent";
}

function dragonSpriteColor(
  row: number,
  column: number,
  config: SpriteConfig,
  expression: Expression,
) {
  const ink = "#1D2B53";
  const paper = "#FFF1E8";
  if (row === 0 && (column === 3 || column === 8)) return config.accentColor;
  if (row >= 1 && row <= 2 && column >= 2 && column <= 9)
    return config.outfitColor;
  if (row >= 3 && row <= 7 && column >= 3 && column <= 8)
    return faceDetail(row, column, config, expression);
  if (row >= 3 && row <= 6 && (column === 2 || column === 9))
    return config.outfitColor;
  if (row === 5 && (column === 1 || column === 10)) return config.accentColor;
  if (row >= 8 && row <= 13 && column >= 3 && column <= 8)
    return config.outfitColor;
  if (
    row >= 9 &&
    row <= 12 &&
    ((column >= 0 && column <= 2) || (column >= 9 && column <= 11))
  )
    return row % 2 ? config.accentColor : config.outfitColor;
  if (row === 13 && column >= 8 && column <= 11) return config.outfitColor;
  if (
    (row === 14 || row === 15) &&
    (column === 3 || column === 4 || column === 7 || column === 8)
  )
    return ink;
  if (row === 8 && column >= 4 && column <= 7) return paper;
  return "transparent";
}

function robotSpriteColor(
  row: number,
  column: number,
  config: SpriteConfig,
  expression: Expression,
) {
  const ink = "#1D2B53";
  const paper = "#FFF1E8";
  if (row === 0 && column === 5) return config.accentColor;
  if (row === 1 && column >= 3 && column <= 8) return ink;
  if (row >= 2 && row <= 7 && column >= 2 && column <= 9) {
    if (row >= 3 && row <= 6 && column >= 3 && column <= 8)
      return faceDetail(row, column, config, expression);
    return config.hairColor;
  }
  if (row === 8 && column >= 4 && column <= 7) return ink;
  if (row >= 9 && row <= 13 && column >= 2 && column <= 9)
    return config.outfitColor;
  if (row === 10 && column >= 4 && column <= 7) return config.accentColor;
  if (row >= 10 && row <= 12 && (column === 1 || column === 10))
    return config.hairColor;
  if (
    (row === 14 || row === 15) &&
    ((column >= 2 && column <= 4) || (column >= 7 && column <= 9))
  )
    return ink;
  return "transparent";
}

function spiritSpriteColor(
  row: number,
  column: number,
  config: SpriteConfig,
  expression: Expression,
) {
  const paper = "#FFF1E8";
  if (
    row <= 2 &&
    ((column >= 2 && column <= 4) || (column >= 7 && column <= 9))
  )
    return config.outfitColor;
  if (row >= 2 && row <= 8 && column >= 2 && column <= 9)
    return row >= 3 && row <= 6 && column >= 3 && column <= 8
      ? faceDetail(row, column, config, expression)
      : config.hairColor;
  if (row === 7 && (column === 1 || column === 10)) return config.accentColor;
  if (row >= 9 && row <= 12 && column >= 3 && column <= 8)
    return config.outfitColor;
  if (row === 10 && (column === 2 || column === 9)) return paper;
  if (row === 13 && (column === 3 || column === 5 || column === 7))
    return config.accentColor;
  if (row === 14 && (column === 4 || column === 6 || column === 8))
    return config.outfitColor;
  return "transparent";
}

function spriteColor(
  row: number,
  column: number,
  config: SpriteConfig,
  expression: Expression,
) {
  if (config.template === "dragon")
    return dragonSpriteColor(row, column, config, expression);
  if (config.template === "robot")
    return robotSpriteColor(row, column, config, expression);
  if (config.template === "spirit")
    return spiritSpriteColor(row, column, config, expression);
  return humanSpriteColor(row, column, config, expression);
}

function PixelCharacter({
  character,
  expression = "neutral",
  className = "",
}: {
  character: Character;
  expression?: Expression;
  className?: string;
}) {
  return (
    <div
      className={`pixel-character ${className}`}
      role="img"
      aria-label={`${character.name}, expresión ${expression}`}
    >
      {Array.from({ length: 16 * 12 }, (_, index) => {
        const row = Math.floor(index / 12);
        const column = index % 12;
        return (
          <span
            key={index}
            style={{
              backgroundColor: spriteColor(
                row,
                column,
                character.spriteConfig,
                expression,
              ),
            }}
          />
        );
      })}
    </div>
  );
}

function SkillBar({
  character,
  skillKey,
  compact = false,
}: {
  character: Character;
  skillKey: SkillKey;
  compact?: boolean;
}) {
  const value = character.skills[skillKey];
  const progress = milestoneProgress(value);
  const next = nextMilestone(value);
  const Icon = iconMap[character.skillIcons[skillKey]];
  return (
    <div className={`skill-row skill-${skillKey}${compact ? " compact" : ""}`}>
      <div className="skill-label">
        <Icon aria-hidden="true" />
        <span>{character.skillLabels[skillKey]}</span>
        <b>{value}</b>
      </div>
      <div
        className="segment-bar"
        role="progressbar"
        aria-label={`${character.skillLabels[skillKey]}: ${value} puntos totales`}
        aria-valuemin={0}
        aria-valuemax={5}
        aria-valuenow={progress}
        aria-valuetext={`${value} puntos totales; próximo logro en ${next}`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className={index < progress ? "filled" : ""} />
        ))}
      </div>
    </div>
  );
}

function characterEmotionSheet(characterId: string) {
  return characterId === "nia"
    ? niaEmotions
    : characterId === "teo"
      ? teoEmotions
      : characterId === "luma"
        ? lumaEmotions
        : characterId === "rok"
          ? rokEmotions
          : characterId === "bit"
            ? bitEmotions
            : suriEmotions;
}

type ChoiceResult = { skillKey: SkillKey; lesson?: string };

// Pantalla intermedia entre capítulos: celebra el acierto o entrega la lección de la tentación.
function OutcomeInterlude({
  character,
  result,
  onContinue,
}: {
  character: Character;
  result: ChoiceResult;
  onContinue: () => void;
}) {
  const expression: Expression = result.lesson ? "neutral" : skillMeta[result.skillKey].expression;
  const skillLabel = character.skillLabels[result.skillKey];
  return (
    <div className="outcome-backdrop">
      <section
        className={`outcome-card ${result.lesson ? "is-lesson" : "is-win"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="outcome-title"
      >
        {!result.lesson && (
          <div className="outcome-sparkles" aria-hidden="true">
            {Array.from({ length: 10 }, (_, index) => (
              <i key={index} style={{ "--i": index } as React.CSSProperties} />
            ))}
          </div>
        )}
        <div
          role="img"
          aria-label={`${character.name}, expresión ${expression}`}
          className={`outcome-portrait portrait-emotion emotion-${expression}`}
          style={{ backgroundImage: `url(${characterEmotionSheet(character.id)})` }}
        />
        {result.lesson ? (
          <>
            <p className="outcome-kicker">¡Uy! Esta vez no suma {skillLabel}…</p>
            <h2 id="outcome-title">Lección aprendida</h2>
            <div className="outcome-scroll">
              <ScrollText aria-hidden="true" />
              <blockquote>{result.lesson}</blockquote>
            </div>
            <p className="outcome-note">
              Se guarda en el perfil de {character.name}. Equivocarse también enseña.
            </p>
          </>
        ) : (
          <>
            <p className="outcome-kicker">¡Bien pensado!</p>
            <h2 id="outcome-title">
              <Sparkles aria-hidden="true" /> +1 {skillLabel}
            </h2>
            <p className="outcome-note">{skillMeta[result.skillKey].note}</p>
          </>
        )}
        <button className="primary-button" type="button" onClick={onContinue} autoFocus>
          Continuar <ChevronRight aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}

function PortraitBar({
  character,
  expression,
  pulse,
  thinking = false,
}: {
  character: Character;
  expression: Expression;
  thinking?: boolean;
  pulse: number;
}) {
  const label = thinking
    ? "Pensando…"
    : expression === "neutral"
      ? "Listo para decidir"
      : expression === "courage"
        ? character.skillLabels.a
        : expression === "wit"
          ? character.skillLabels.b
          : character.skillLabels.c;
  const emotionSheet = characterEmotionSheet(character.id);
  return (
    <aside className="portrait-bar" aria-live="polite">
      <div className="portrait-inner">
        <div className="portrait-window">
          <div key={pulse} className={`portrait-pop expression-${expression}`}>
            {emotionSheet ? (
              <div
                role="img"
                aria-label={`${character.name}, expresión ${label}`}
                className={`portrait-sprite portrait-emotion emotion-${expression}`}
                style={{ backgroundImage: `url(${emotionSheet})` }}
              />
            ) : (
              <img
                src={character.avatarImage}
                alt={`${character.name}, personaje seleccionado para este capítulo: ${label}`}
                className="portrait-sprite portrait-avatar"
              />
            )}
          </div>
        </div>
        <div className="portrait-status">
          <span>{character.name}</span>
          <strong>{label}</strong>
        </div>
        <div
          className="portrait-skills"
          aria-label={`Habilidades de ${character.name}`}
        >
          {(["a", "b", "c"] as SkillKey[]).map((key) => (
            <div className={`portrait-skill skill-${key}`} key={key}>
              <span>{character.skillLabels[key]}</span>
              <b>{character.skills[key]}</b>
            </div>
          ))}
        </div>
        <div
          className={`portrait-signal expression-${expression}`}
          aria-hidden="true"
        />
      </div>
    </aside>
  );
}

function App() {
  const [save, setSave] = useState<SaveData>(loadSave);
  const [selectedCharacterId, setSelectedCharacterId] = useState("nia");
  const [selectedStoryId, setSelectedStoryId] = useState(MODEL_STORY_ID);
  const [screen, setScreen] = useState<Screen>("characters");
  const [chapterIndex, setChapterIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<"correct" | "wrong" | null>(
    null,
  );
  const [quizOptionOrder, setQuizOptionOrder] =
    useState<number[]>(shuffledOptions);
  const [portraitExpression, setPortraitExpression] =
    useState<Expression>("neutral");
  const [portraitPulse, setPortraitPulse] = useState(0);
  const [choiceResult, setChoiceResult] = useState<ChoiceResult | null>(null);
  const [rewardCoins, setRewardCoins] = useState(0);
  const [toast, setToast] = useState("");
  const [parentSession, setParentSession] = useState<ParentSession | null>(
    null,
  );
  const [cloudReady, setCloudReady] = useState(false);
  const [syncStatus, setSyncStatus] = useState<
    "device" | "loading" | "saving" | "saved" | "error" | "conflict"
  >("device");
  const [syncMessage, setSyncMessage] = useState("");
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    childName: "",
    childAge: "8",
  });
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [returnScreen, setReturnScreen] = useState<Screen>("characters");
  const saveRef = useRef(save);
  const revisionRef = useRef(0);
  const lastSyncedRef = useRef("");
  const syncingRef = useRef(false);
  saveRef.current = save;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
  }, [save]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const establishSession = async (
    session: ParentSession,
    resolution?: "cloud" | "local",
  ) => {
    setSyncStatus("loading");
    setSyncMessage("");
    setCloudReady(false);
    localStorage.setItem(PARENT_SESSION_KEY, JSON.stringify(session));
    setParentSession(session);
    try {
      const cloud = await readCloudProgress<SaveData>(session.token);
      const owner = localStorage.getItem(PROGRESS_OWNER_KEY);
      const local = saveRef.current;
      const localJson = JSON.stringify(local);
      const syncBase = JSON.parse(
        localStorage.getItem(PROGRESS_SYNC_KEY) || "null",
      ) as { parentId: string; revision: number; save: string } | null;
      let nextSave: SaveData;
      let nextRevision = cloud.revision;
      if (cloud.progress) {
        const remote = normalizeSavedProgress(cloud.progress);
        const remoteJson = JSON.stringify(remote);
        const sameAccount =
          owner === session.parent.id && syncBase?.parentId === owner;
        const localChanged =
          sameAccount &&
          localJson !== syncBase.save &&
          hasMeaningfulProgress(local);
        const safeAutoUpload =
          localChanged && syncBase.revision === cloud.revision;
        const needsChoice =
          localJson !== remoteJson &&
          hasMeaningfulProgress(local) &&
          (localChanged ? !safeAutoUpload : !sameAccount);
        if (needsChoice && !resolution) {
          setSyncStatus("conflict");
          setSyncMessage(
            "Hay dos partidas diferentes. Elige cuál conservar; la de este dispositivo seguirá aquí hasta que decidas.",
          );
          return;
        }
        if (
          resolution === "local" ||
          (safeAutoUpload && resolution !== "cloud")
        ) {
          const uploaded = await writeCloudProgress(
            session.token,
            local,
            cloud.revision,
          );
          nextSave = local;
          nextRevision = uploaded.revision;
        } else {
          if (localJson !== remoteJson)
            localStorage.setItem(`${STORAGE_KEY}-respaldo-local`, localJson);
          nextSave = remote;
        }
      } else if (
        !owner ||
        owner === session.parent.id ||
        resolution === "local"
      ) {
        const uploaded = await writeCloudProgress(
          session.token,
          local,
          cloud.revision,
        );
        nextSave = local;
        nextRevision = uploaded.revision;
      } else {
        if (hasMeaningfulProgress(local) && !resolution) {
          setSyncStatus("conflict");
          setSyncMessage(
            "Este dispositivo tiene una partida de otra cuenta. Elige si deseas vincularla a esta cuenta o empezar con su partida vacía.",
          );
          return;
        }
        localStorage.setItem(`${STORAGE_KEY}-respaldo-local`, localJson);
        nextSave = normalizeSavedProgress({});
        const uploaded = await writeCloudProgress(
          session.token,
          nextSave,
          cloud.revision,
        );
        nextRevision = uploaded.revision;
      }
      const latestJson = JSON.stringify(saveRef.current);
      if (latestJson !== localJson && nextSave !== local) {
        setSyncStatus("conflict");
        setSyncMessage(
          "La partida cambió mientras recuperábamos la cuenta. Tu avance sigue en este navegador; elige cuál conservar.",
        );
        return;
      }
      const nextJson = JSON.stringify(nextSave);
      revisionRef.current = nextRevision;
      lastSyncedRef.current = nextJson;
      localStorage.setItem(PROGRESS_OWNER_KEY, session.parent.id);
      localStorage.setItem(
        PROGRESS_SYNC_KEY,
        JSON.stringify({
          parentId: session.parent.id,
          revision: nextRevision,
          save: nextJson,
        }),
      );
      if (latestJson === localJson) {
        saveRef.current = nextSave;
        setSave(nextSave);
      }
      setCloudReady(true);
      setSyncStatus("saved");
    } catch (error) {
      setSyncStatus("error");
      setSyncMessage(
        error instanceof Error
          ? error.message
          : "No pudimos recuperar la partida. Sigue guardada en este dispositivo.",
      );
    }
  };

  useEffect(() => {
    const session = storedParentSession();
    if (session) void establishSession(session);
  }, []);

  const flushCloudProgress = async () => {
    if (!parentSession || !cloudReady || syncingRef.current) return;
    syncingRef.current = true;
    setSyncStatus("saving");
    try {
      while (JSON.stringify(saveRef.current) !== lastSyncedRef.current) {
        const snapshot = saveRef.current;
        const serialized = JSON.stringify(snapshot);
        const result = await writeCloudProgress(
          parentSession.token,
          snapshot,
          revisionRef.current,
        );
        revisionRef.current = result.revision;
        lastSyncedRef.current = serialized;
        localStorage.setItem(
          PROGRESS_SYNC_KEY,
          JSON.stringify({
            parentId: parentSession.parent.id,
            revision: result.revision,
            save: serialized,
          }),
        );
      }
      setSyncMessage("");
      setSyncStatus("saved");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No pudimos guardar la partida en la cuenta.";
      setSyncMessage(message);
      setSyncStatus(
        message.includes("otro dispositivo") ? "conflict" : "error",
      );
    } finally {
      syncingRef.current = false;
    }
  };

  useEffect(() => {
    if (
      !parentSession ||
      !cloudReady ||
      syncStatus === "conflict" ||
      JSON.stringify(save) === lastSyncedRef.current
    )
      return;
    const timer = window.setTimeout(() => void flushCloudProgress(), 700);
    return () => window.clearTimeout(timer);
  }, [save, parentSession, cloudReady, syncStatus]);

  const openParentScreen = () => {
    setReturnScreen(screen);
    setAuthError("");
    setScreen("parent");
    window.scrollTo(0, 0);
  };
  const returnToAdventure = () => {
    setScreen(returnScreen === "parent" ? "characters" : returnScreen);
    window.scrollTo(0, 0);
  };
  const submitParentForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthBusy(true);
    setAuthError("");
    try {
      const session = await authenticateParent(authMode, authForm);
      await establishSession(session);
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "No pudimos entrar a la cuenta.",
      );
    } finally {
      setAuthBusy(false);
    }
  };
  const signOutParent = () => {
    localStorage.removeItem(PARENT_SESSION_KEY);
    setParentSession(null);
    setCloudReady(false);
    setSyncStatus("device");
    setSyncMessage("");
    setScreen("characters");
  };

  const baseCharacter =
    characters.find(({ id }) => id === selectedCharacterId) ?? characters[0];
  const characterSave =
    save.characters[baseCharacter.id] ?? emptyCharacterSave();
  const skills = useMemo(
    () => deriveSkills(characterSave.decisions, characterSave.skills),
    [characterSave.decisions, characterSave.skills],
  );
  const badges = useMemo(
    () =>
      (Object.keys(skills) as SkillKey[]).flatMap((key) =>
        earnedMilestones(skills[key]).map((milestone) =>
          badgeName(baseCharacter, key, milestone),
        ),
      ),
    [baseCharacter, skills],
  );
  const coinAchievements = useMemo(
    () => earnedMilestones(save.lifetimeCoins).map(coinAchievementName),
    [save.lifetimeCoins],
  );
  const activeCharacter: Character = { ...baseCharacter, skills };
  const characterStories = visibleStories.filter(
    ({ ownerId }) => ownerId === baseCharacter.id,
  );
  const baseStory =
    characterStories.find(({ id }) => id === selectedStoryId) ??
    characterStories[0];
  const endingChoice = characterSave.decisions[
    `${baseStory.id}:${baseStory.chapters[3].id}`
  ];
  const endingLesson = endingChoice
    ? authoredStoryContent[baseStory.id]?.paths?.[3]?.[endingChoice]?.lesson ??
      authoredStoryContent[baseStory.id]?.endingPaths?.[endingChoice]?.lesson
    : undefined;
  const activeStory = {
    ...baseStory,
    closingQuiz: {
      questions: baseStory.closingQuiz.questions.map((question, index) => {
        const pathQuestion = index === 2 && endingLesson
          ? { ...question, options: [endingLesson, question.options[1], question.options[2]] as [string, string, string] }
          : question;
        return index === quizIndex
          ? {
              ...pathQuestion,
              options: quizOptionOrder.map(
                (optionIndex) => pathQuestion.options[optionIndex],
              ) as [string, string, string],
              correctIndex: quizOptionOrder.indexOf(pathQuestion.correctIndex),
            }
          : pathQuestion;
      }),
    },
  };
  const storyAlreadyCompleted = characterSave.completedStories.includes(
    activeStory.id,
  );
  const baseChapter = activeStory.chapters[chapterIndex];
  const decisionKey = `${activeStory.id}:${baseChapter.id}`;
  const selectedDecision = characterSave.decisions[decisionKey];
  const previousChapter =
    chapterIndex > 0 ? activeStory.chapters[chapterIndex - 1] : undefined;
  const previousDecision = previousChapter
    ? characterSave.decisions[`${activeStory.id}:${previousChapter.id}`]
    : undefined;
  const previousDecisionImage = previousChapter?.decisions.find(
    ({ skillKey }) => skillKey === previousDecision,
  )?.image;
  const chapterContinuation = previousDecision
    ? baseChapter.continuations?.[previousDecision]
    : undefined;
  const currentChapter = chapterContinuation
    ? { ...baseChapter, ...chapterContinuation }
    : baseChapter;
  const chapterHeroImage = previousDecisionImage ?? currentChapter.background;
  const hasChoices = currentChapter.decisions.length > 0;
  const showPortrait = screen === "chapter";

  const updateCharacterSave = (
    updater: (current: CharacterSave) => CharacterSave,
  ) => {
    setSave((current) => ({
      ...current,
      characters: {
        ...current.characters,
        [activeCharacter.id]: updater(
          current.characters[activeCharacter.id] ?? emptyCharacterSave(),
        ),
      },
    }));
  };

  const openCharacterProfile = () => {
    setScreen("profile");
    window.scrollTo(0, 0);
  };

  const chooseCharacter = (character: Character) => {
    if (comingSoonCharacterIds.has(character.id)) {
      setToast(
        `${character.name} llegará próximamente con sus propios cuentos.`,
      );
      return;
    }
    setSelectedCharacterId(character.id);
    openCharacterProfile();
  };

  const storyIsUnlocked = (_story: Story) => true;

  const unlockStory = (story: Story) => {
    if (storyIsUnlocked(story)) return;
    if (save.coins < story.unlockCost) {
      setToast(
        `Necesitas ${story.unlockCost} monedas para desbloquear “${story.title}”. Tienes ${save.coins}.`,
      );
      return;
    }
    setSave((current) =>
      current.unlockedStories.includes(story.id)
        ? current
        : {
            ...current,
            coins: current.coins - story.unlockCost,
            unlockedStories: [...current.unlockedStories, story.id],
          },
    );
    setToast(`¡“${story.title}” desbloqueado!`);
  };

  const startStory = (storyId = selectedStoryId) => {
    const story =
      characterStories.find(({ id }) => id === storyId) ?? characterStories[0];
    if (!storyIsUnlocked(story)) {
      setToast(
        `Desbloquea “${story.title}” con ${story.unlockCost} monedas para comenzar.`,
      );
      return;
    }
    setSelectedStoryId(story.id);
    const firstOpen = story.chapters.slice(0, -1).findIndex(
      (chapter) => !characterSave.decisions[`${story.id}:${chapter.id}`],
    );
    const openingChapter = characterSave.completedStories.includes(story.id)
      ? 0
      : firstOpen >= 0
        ? firstOpen
        : story.chapters.length - 1;
    setChapterIndex(openingChapter);
    setQuizIndex(0);
    setQuizFeedback(null);
    setQuizOptionOrder(shuffledOptions());
    setPortraitExpression("neutral");
    setChoiceResult(null);
    setRewardCoins(0);
    setScreen("chapter");
  };

  const chooseDecision = (skillKey: SkillKey) => {
    updateCharacterSave((current) => ({
      ...current,
      decisions: { ...current.decisions, [decisionKey]: skillKey },
    }));
    setPortraitExpression("wit");
    setPortraitPulse((value) => value + 1);
  };

  const continueFromDecision = () => {
    if (!selectedDecision) return;
    if (chapterIndex < activeStory.chapters.length - 1) {
      setChoiceResult({
        skillKey: selectedDecision,
        lesson: temptationLesson(decisionKey, selectedDecision),
      });
      return;
    }
    setQuizIndex(0);
    setQuizFeedback(null);
    setScreen("quiz");
  };

  const finishChoiceResult = () => {
    if (!choiceResult) return;
    setChoiceResult(null);
    setChapterIndex(chapterIndex + 1);
    setPortraitExpression(
      choiceResult.lesson ? "neutral" : skillMeta[choiceResult.skillKey].expression,
    );
    setPortraitPulse((value) => value + 1);
    setScreen("chapter");
    window.scrollTo(0, 0);
  };

  const beginClosingQuiz = () => {
    setQuizIndex(0);
    setQuizFeedback(null);
    setQuizOptionOrder(shuffledOptions());
    setScreen("quiz");
  };

  const answerQuestion = (optionIndex: number) => {
    const question = activeStory.closingQuiz.questions[quizIndex];
    if (optionIndex !== question.correctIndex) {
      setQuizFeedback("wrong");
      return;
    }
    setQuizFeedback("correct");
    if (!storyAlreadyCompleted) {
      setSave((current) => ({
        ...current,
        coins: current.coins + question.coinReward,
        lifetimeCoins: current.lifetimeCoins + question.coinReward,
      }));
      setRewardCoins((value) => value + question.coinReward);
    }
  };

  const finishActiveStory = () => {
    const firstCompletion = !characterSave.completedStories.includes(
      activeStory.id,
    );
    updateCharacterSave((current) => {
      const runEntries = Object.entries(current.decisions).filter(([key]) =>
        key.startsWith(`${activeStory.id}:`),
      );
      const otherEntries = Object.entries(current.decisions).filter(
        ([key]) => !key.startsWith(`${activeStory.id}:`),
      );
      return {
        ...current,
        skills: firstCompletion
          ? deriveSkills(Object.fromEntries(runEntries), current.skills)
          : current.skills,
        decisions: Object.fromEntries(otherEntries),
        lessons: [
          ...new Set([
            ...(current.lessons ?? []),
            ...runEntries.flatMap(([key, skill]) => temptationLesson(key, skill) ?? []),
          ]),
        ],
        completedStories: firstCompletion
          ? [...current.completedStories, activeStory.id]
          : current.completedStories,
      };
    });
    setScreen("reward");
  };

  const continueQuiz = () => {
    if (quizIndex < activeStory.closingQuiz.questions.length - 1) {
      setQuizIndex((value) => value + 1);
      setQuizFeedback(null);
      setQuizOptionOrder(shuffledOptions());
      return;
    }
    finishActiveStory();
  };

  const skipQuiz = () => finishActiveStory();

  return (
    <div className={`app-shell${showPortrait ? " portrait-active" : ""}`}>
      <header className="topbar">
        <a className="brand" href="/" aria-label="Volver al inicio de Maticuentos">
          <img src="/maticuentos-logo.webp" alt="" aria-hidden="true" /> Maticuentos
        </a>
        <div className="topbar-actions">
          <button
            className="nav-button characters-nav-button"
            type="button"
            onClick={() => {
              setScreen("characters");
              requestAnimationFrame(() =>
                document.getElementById("character-grid")?.scrollIntoView({ behavior: "smooth" }),
              );
            }}
          >
            <Users aria-hidden="true" /> Personajes
          </button>
          <div className="coin-wallet" aria-label={`${save.coins} monedas`}>
            <Coins aria-hidden="true" />
            <strong>{save.coins}</strong>
          </div>
          <button
            className="save-account-button"
            type="button"
            onClick={openParentScreen}
            aria-label={
              parentSession
                ? syncStatus === "saved"
                  ? "Partida protegida en la cuenta familiar"
                  : "Revisar guardado de la partida"
                : "Guardar progreso en una cuenta de adulto"
            }
          >
            <LockKeyhole aria-hidden="true" />
            <span>
              {parentSession
                ? syncStatus === "saved"
                  ? "Partida protegida"
                  : syncStatus === "saving"
                    ? "Guardando…"
                    : syncStatus === "loading"
                      ? "Conectando…"
                      : "Revisar guardado"
                : "Guardar progreso"}
            </span>
          </button>
        </div>
      </header>
      <main>
        {screen === "characters" && (
          <section className="screen character-select">
            <div className="adventure-intro">
              <div className="intro-copy">
                <h1>Tu historia empieza con una elección</h1>
                <p>
                  Toca un personaje para abrir su perfil, conocer sus
                  habilidades y elegir una de sus aventuras propias.
                </p>
                <button
                  className="primary-button intro-action"
                  type="button"
                  onClick={() => document.getElementById("character-grid")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Elegir personaje <ChevronRight aria-hidden="true" />
                </button>
              </div>
              <img
                className="intro-scene"
                src={rioCover}
                alt="Nia y un búho descubren las notas del Río Cantor al atardecer"
              />
            </div>
            <div className="character-grid" id="character-grid">
              {characters.map((character) => {
                const saved = normalizeCharacterSave(
                  save.characters[character.id],
                );
                const currentSkills = deriveSkills(
                  saved.decisions,
                  saved.skills,
                );
                const displayCharacter = {
                  ...character,
                  skills: currentSkills,
                };
                const unlocked = true;
                const comingSoon = comingSoonCharacterIds.has(character.id);
                return (
                  <button
                    className={`character-card ${comingSoon ? "coming-soon" : unlocked ? "available" : "locked"} template-${character.spriteConfig.template}`}
                    aria-disabled={comingSoon}
                    aria-label={
                      comingSoon
                        ? `${character.name}: próximamente`
                        : unlocked
                          ? `Abrir perfil de ${character.name}`
                          : `Desbloquear y abrir perfil de ${character.name}`
                    }
                    type="button"
                    key={character.id}
                    onClick={() => chooseCharacter(character)}
                  >
                    <div className="sprite-stage">
                      <img
                        className="gpt-avatar"
                        src={character.avatarImage}
                        alt={`Retrato de ${character.name}, ${character.tag}`}
                      />
                    </div>
                    <div className="character-copy">
                      {!unlocked && !comingSoon && (
                        <LockKeyhole aria-hidden="true" />
                      )}
                      <h2>{character.name}</h2>
                      <p>{character.tag}</p>
                      <div className="mini-skills">
                        {(["a", "b", "c"] as SkillKey[]).map((key) => (
                          <SkillBar
                            key={key}
                            character={displayCharacter}
                            skillKey={key}
                            compact
                          />
                        ))}
                      </div>
                      <span
                        className={
                          comingSoon
                            ? "locked-label coming-soon-label"
                            : unlocked
                              ? "card-action"
                              : "locked-label"
                        }
                      >
                        {comingSoon ? (
                          <>
                            <Sparkles aria-hidden="true" /> Próximamente
                          </>
                        ) : unlocked ? (
                          <>
                            Abrir perfil <ChevronRight aria-hidden="true" />
                          </>
                        ) : (
                          <>
                            <Coins aria-hidden="true" /> Desbloquear ·{" "}
                            {character.unlockCost}
                          </>
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {screen === "parent" && (
          <section className="screen parent-screen">
            {!parentSession && (
              <button
                className="back-link"
                type="button"
                onClick={returnToAdventure}
              >
                <ArrowLeft aria-hidden="true" /> Volver a la aventura
              </button>
            )}
            <div className="parent-card">
              <div className="parent-intro">
                <LockKeyhole aria-hidden="true" />
                <h1>Protege su aventura</h1>
                <p>
                  El progreso ya se guarda en este dispositivo. Con una cuenta
                  de adulto podrás recuperarlo en otro.
                </p>
              </div>
              {parentSession ? (
                <div className="parent-connected">
                  <h2>Cuenta de {parentSession.parent.name}</h2>
                  <p>
                    {parentSession.parent.email} · Perfil de{" "}
                    {parentSession.childName}
                  </p>
                  <p
                    className={
                      syncStatus === "saved" ? "save-state good" : "save-state"
                    }
                    role="status"
                  >
                    {syncStatus === "saved"
                      ? "Partida guardada en tu cuenta."
                      : syncStatus === "saving"
                        ? "Guardando los cambios…"
                        : syncStatus === "loading"
                          ? "Recuperando la partida…"
                          : syncMessage ||
                            "La partida sigue guardada en este dispositivo."}
                  </p>
                  {syncStatus === "error" && (
                    <button
                      className="secondary-button"
                      type="button"
                      onClick={() => void establishSession(parentSession)}
                    >
                      Reintentar conexión
                    </button>
                  )}
                  {syncStatus === "conflict" && (
                    <div className="parent-conflict-actions">
                      <button
                        className="secondary-button"
                        type="button"
                        onClick={() =>
                          void establishSession(parentSession, "cloud")
                        }
                      >
                        Usar partida de la cuenta
                      </button>
                      <button
                        className="secondary-button"
                        type="button"
                        onClick={() =>
                          void establishSession(parentSession, "local")
                        }
                      >
                        Usar partida de este dispositivo
                      </button>
                    </div>
                  )}
                  <button
                    className="primary-button parent-return-button"
                    type="button"
                    onClick={returnToAdventure}
                  >
                    Volver a la aventura <ChevronRight aria-hidden="true" />
                  </button>
                  <button
                    className="parent-signout"
                    type="button"
                    onClick={signOutParent}
                  >
                    Cerrar sesión del adulto
                  </button>
                </div>
              ) : (
                <>
                  <div className="parent-mode">
                    <button
                      type="button"
                      className={authMode === "register" ? "active" : ""}
                      aria-pressed={authMode === "register"}
                      onClick={() => {
                        setAuthMode("register");
                        setAuthError("");
                      }}
                    >
                      Crear cuenta
                    </button>
                    <button
                      type="button"
                      className={authMode === "login" ? "active" : ""}
                      aria-pressed={authMode === "login"}
                      onClick={() => {
                        setAuthMode("login");
                        setAuthError("");
                      }}
                    >
                      Ya tengo cuenta
                    </button>
                  </div>
                  <form className="parent-form" onSubmit={submitParentForm}>
                    {authMode === "register" && (
                      <>
                        <label>
                          Tu nombre
                          <input
                            required
                            minLength={2}
                            maxLength={80}
                            autoComplete="name"
                            value={authForm.name}
                            onChange={(event) =>
                              setAuthForm({
                                ...authForm,
                                name: event.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Nombre del niño o niña
                          <input
                            required
                            minLength={2}
                            maxLength={40}
                            autoComplete="off"
                            value={authForm.childName}
                            onChange={(event) =>
                              setAuthForm({
                                ...authForm,
                                childName: event.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Su edad
                          <select
                            value={authForm.childAge}
                            onChange={(event) =>
                              setAuthForm({
                                ...authForm,
                                childAge: event.target.value,
                              })
                            }
                          >
                            {Array.from(
                              { length: 10 },
                              (_, index) => index + 3,
                            ).map((age) => (
                              <option key={age} value={age}>
                                {age} años
                              </option>
                            ))}
                          </select>
                        </label>
                      </>
                    )}
                    <label>
                      Correo del adulto
                      <input
                        required
                        type="email"
                        maxLength={320}
                        autoComplete="email"
                        value={authForm.email}
                        onChange={(event) =>
                          setAuthForm({
                            ...authForm,
                            email: event.target.value,
                          })
                        }
                      />
                    </label>
                    <label>
                      Contraseña
                      <input
                        required
                        type="password"
                        minLength={8}
                        autoComplete={
                          authMode === "register"
                            ? "new-password"
                            : "current-password"
                        }
                        value={authForm.password}
                        onChange={(event) =>
                          setAuthForm({
                            ...authForm,
                            password: event.target.value,
                          })
                        }
                      />
                    </label>
                    {authError && (
                      <p className="parent-error" role="alert">
                        {authError}
                      </p>
                    )}
                    <button
                      className="primary-button"
                      type="submit"
                      disabled={authBusy}
                    >
                      {authBusy
                        ? "Conectando…"
                        : authMode === "register"
                          ? "Crear cuenta y guardar partida"
                          : "Entrar y recuperar partida"}{" "}
                      <ChevronRight aria-hidden="true" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </section>
        )}

        {screen === "profile" && (
          <section className="screen profile-screen">
            <button
              className="back-link"
              type="button"
              onClick={() => setScreen("characters")}
            >
              <ArrowLeft aria-hidden="true" /> Elegir otro personaje
            </button>
            <div className="profile-hero">
              <div className="profile-sprite">
                <img
                  className="gpt-avatar"
                  src={activeCharacter.avatarImage}
                  alt={`Retrato de ${activeCharacter.name}`}
                />
              </div>
              <div>
                <h1>{activeCharacter.name}</h1>
                <p>{activeCharacter.tag}</p>
                <div className="profile-lore">
                  {activeCharacter.lore.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <div className="profile-coins">
                  <Coins aria-hidden="true" /> {save.coins} disponibles ·{" "}
                  {save.lifetimeCoins} ganadas
                </div>
              </div>
            </div>
            <div className="profile-library-action profile-library-action-top">
              <button
                className="primary-button"
                type="button"
                onClick={() => setScreen("library")}
              >
                Ver cuentos de {activeCharacter.name}{" "}
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
            <section
              className="profile-section"
              aria-labelledby="skills-heading"
            >
              <div className="section-heading">
                <h2 id="skills-heading">Tus habilidades</h2>
                <p>
                  Cada capítulo suma un punto. No tienen límite y la barra
                  muestra el avance hacia el próximo logro.
                </p>
              </div>
              <div className="skills-grid">
                {(["a", "b", "c"] as SkillKey[]).map((key) => (
                  <div className={`skill-panel skill-${key}`} key={key}>
                    <SkillBar character={activeCharacter} skillKey={key} />
                    <p>
                      {skillMeta[key].note} Próximo logro:{" "}
                      {nextMilestone(activeCharacter.skills[key])}.
                    </p>
                  </div>
                ))}
              </div>
            </section>
            {(characterSave.lessons ?? []).length > 0 && (
              <section
                className="profile-section lessons-section"
                aria-labelledby="lessons-heading"
              >
                <div className="section-heading">
                  <h2 id="lessons-heading">Lecciones aprendidas</h2>
                  <p>
                    Cada tentación en la que cayó {activeCharacter.name} le dejó
                    una enseñanza.
                  </p>
                </div>
                <ul className="lesson-list">
                  {(characterSave.lessons ?? []).map((lesson) => (
                    <li key={lesson}>
                      <ScrollText aria-hidden="true" /> {lesson}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section
              className="profile-section achievements-section"
              aria-labelledby="achievements-heading"
            >
              <div className="section-heading">
                <h2 id="achievements-heading">Tus logros</h2>
                <p>
                  Cada primer punto y cada cinco puntos de una habilidad suma
                  una insignia. Las monedas también cuentan.
                </p>
              </div>
              {badges.length + coinAchievements.length > 0 ? (
                <details className="achievements-details">
                  <summary>
                    <Trophy aria-hidden="true" />
                    <span>{badges.length + coinAchievements.length} insignias conseguidas</span>
                    <span className="achievements-details-hint">Ver todas</span>
                  </summary>
                  <div className="badge-row">
                  {badges.map((badge) => (
                    <div className="badge earned" key={badge}>
                      <Trophy aria-hidden="true" />
                      <span>Habilidad</span>
                      <strong>{badge}</strong>
                    </div>
                  ))}
                  {coinAchievements.map((achievement) => (
                    <div className="badge earned" key={achievement}>
                      <Coins aria-hidden="true" />
                      <span>Monedas</span>
                      <strong>{achievement}</strong>
                    </div>
                  ))}
                  </div>
                </details>
              ) : (
                <div className="achievements-empty" role="status">
                  <Trophy aria-hidden="true" />
                  <p>Completa un capítulo para ganar tu primera insignia.</p>
                </div>
              )}
            </section>
            <section
              className="profile-section profile-next-goal"
              aria-labelledby="next-goal-heading"
            >
              <div className="section-heading">
                <h2 id="next-goal-heading">Tu próximo hito</h2>
                <p>
                  Las habilidades siguen creciendo mientras juegas. Aquí solo
                  mostramos la siguiente meta, sin llenar tu perfil de trofeos.
                </p>
              </div>
              <div className="next-goal-card">
                <Coins aria-hidden="true" />
                <div>
                  <strong>
                    {nextMilestone(save.lifetimeCoins)} monedas ganadas
                  </strong>
                  <span>La siguiente meta de tu aventura</span>
                </div>
              </div>
            </section>
          </section>
        )}

        {screen === "library" && (
          <section className="screen library-screen">
            <button
              className="back-link"
              type="button"
              onClick={() => setScreen("profile")}
            >
              <ArrowLeft aria-hidden="true" /> Volver con {activeCharacter.name}
            </button>
            <div className="library-heading">
              <div>
                <p className="chapter-number">
                  Cuentos de {activeCharacter.name}
                </p>
                <h1>Sus aventuras</h1>
                <p>
                  Todos los cuentos están disponibles para leer.
                </p>
              </div>
              <img
                src={activeCharacter.avatarImage}
                alt={`Retrato de ${activeCharacter.name}`}
              />
            </div>
            <div className="story-library-grid">
              {characterStories.map((story) => {
                const storyUnlocked = storyIsUnlocked(story);
                const storyCompleted = characterSave.completedStories.includes(
                  story.id,
                );
                const hasProgress = story.chapters.some(
                  (chapter) =>
                    characterSave.decisions[`${story.id}:${chapter.id}`],
                );
                return (
                  <article
                    className={`story-library-card${storyUnlocked ? "" : " story-locked"}`}
                    key={story.id}
                  >
                    <div className="story-cover">
                      <img
                        src={story.coverImage}
                        alt={`Portada de ${story.title}`}
                      />
                    </div>
                    <div>
                      <span className="story-state">
                        {!storyUnlocked ? (
                          <>
                            <LockKeyhole aria-hidden="true" /> Bloqueado ·{" "}
                            {story.unlockCost} monedas
                          </>
                        ) : storyCompleted ? (
                          <>
                            <Check aria-hidden="true" /> Completado
                          </>
                        ) : hasProgress ? (
                          "En progreso"
                        ) : (
                          "Disponible"
                        )}
                      </span>
                      <h2>{story.title}</h2>
                      <p>{story.blurb}</p>
                      <small>
                        {story.chapters.length} capítulos ·{" "}
                        {story.closingQuiz.questions.length} preguntas
                      </small>
                      {storyUnlocked ? (
                        <button
                          className="primary-button"
                          type="button"
                          onClick={() => startStory(story.id)}
                        >
                          {storyCompleted
                            ? "Jugar de nuevo"
                            : hasProgress
                              ? "Continuar"
                              : "Comenzar"}{" "}
                          <ChevronRight aria-hidden="true" />
                        </button>
                      ) : (
                        <button
                          className="primary-button story-unlock-button"
                          type="button"
                          onClick={() => unlockStory(story)}
                        >
                          <Coins aria-hidden="true" /> Desbloquear por{" "}
                          {story.unlockCost}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {screen === "chapter" && (
          <section
            className={`screen reader-screen ${currentChapter.sceneType}`}
          >
            <button
              className="back-link"
              type="button"
              onClick={() => setScreen("library")}
            >
              <ArrowLeft aria-hidden="true" /> Volver a los cuentos
            </button>
            <p className="reader-save-note">Tu aventura queda guardada.</p>
            <div
              className="chapter-progress"
              aria-label={`Capítulo ${currentChapter.order} de ${activeStory.chapters.length}`}
            >
              {activeStory.chapters.map((chapter, index) => (
                <span
                  key={chapter.id}
                  className={
                    index < chapterIndex
                      ? "done"
                      : index === chapterIndex
                        ? "current"
                        : ""
                  }
                >
                  {chapter.order}
                </span>
              ))}
            </div>
            <article className="reader-card">
              <div className="scene-frame">
                <img
                  src={chapterHeroImage}
                  alt={
                    previousDecisionImage
                      ? `La decisión del capítulo ${currentChapter.order - 1} continúa la historia`
                      : `Portada de ${activeStory.title}`
                  }
                />
              </div>
              <div className="chapter-copy">
                <p className="chapter-number">
                  {activeStory.title} · Capítulo {currentChapter.order} de{" "}
                  {activeStory.chapters.length}
                </p>
                <h1>{currentChapter.title}</h1>
                {renderTemplate(currentChapter.text, activeCharacter.name)
                  .split("\n\n")
                  .map((paragraph) => (
                    <p className="story-text" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
              </div>
            </article>
            {hasChoices ? (
              <section
                className="chapter-choices"
                aria-labelledby="choices-heading"
              >
                <div className="decision-heading">
                  <h2 id="choices-heading">Elige cómo continúa {activeCharacter.name}</h2>
                  <p>
                    Piensa bien: no todos los caminos son buenos. Puedes cambiar
                    tu elección antes de continuar.
                  </p>
                </div>
                <div className="decision-grid">
                  {currentChapter.decisions.map((decision) => {
                    const selected = selectedDecision === decision.skillKey;
                    const label =
                      decision.labelByCharacter?.[activeCharacter.id] ??
                      decision.defaultLabel;
                    return (
                      <button
                        className={`decision-card skill-${decision.skillKey}${selected ? " selected" : ""}`}
                        type="button"
                        aria-pressed={selected}
                        key={decision.skillKey}
                        onClick={() => chooseDecision(decision.skillKey)}
                      >
                        <img src={decision.image} alt={`${activeCharacter.name} elige ${label}`} />
                        <strong>{label}</strong>
                        <span className="select-state">
                          {selected ? (
                            <>
                              <Check aria-hidden="true" /> Elegida
                            </>
                          ) : (
                            "Elegir este camino"
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="decision-footer">
                  <button
                    className="primary-button"
                    type="button"
                    disabled={!selectedDecision}
                    onClick={continueFromDecision}
                  >
                    Continuar al capítulo {chapterIndex + 2}{" "}
                    <ChevronRight aria-hidden="true" />
                  </button>
                  {selectedDecision && (
                    <p>
                      Elección guardada. Puedes cambiarla antes de continuar;
                      después descubrirás qué aprendió {activeCharacter.name}.
                    </p>
                  )}
                </div>
              </section>
            ) : (
              <div className="story-finish">
                {endingLesson && (
                  <figure className="moral-card">
                    <figcaption>Moraleja</figcaption>
                    <blockquote>{endingLesson}</blockquote>
                  </figure>
                )}
                <p>
                  La aventura terminó. Ahora demuestra cuánto recuerdas de {activeStory.title}.
                </p>
                <button
                  className="primary-button"
                  type="button"
                  onClick={beginClosingQuiz}
                >
                  Ir a las preguntas <ChevronRight aria-hidden="true" />
                </button>
              </div>
            )}
          </section>
        )}

        {screen === "quiz" && (
          <section className="screen quiz-screen">
            <div className="quiz-card">
              <div
                className="chapter-progress quiz-progress"
                aria-label={`Pregunta ${quizIndex + 1} de ${activeStory.closingQuiz.questions.length}`}
              >
                {activeStory.closingQuiz.questions.map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < quizIndex
                        ? "done"
                        : index === quizIndex
                          ? "current"
                          : ""
                    }
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
              <p className="quiz-label">
                Pregunta {quizIndex + 1} de{" "}
                {activeStory.closingQuiz.questions.length} ·{" "}
                {storyAlreadyCompleted
                  ? "Recompensa ya cobrada"
                  : `+${activeStory.closingQuiz.questions[quizIndex].coinReward} ${activeStory.closingQuiz.questions[quizIndex].coinReward === 1 ? "moneda" : "monedas"}`}
              </p>
              <h1>
                {renderTemplate(
                  activeStory.closingQuiz.questions[quizIndex].prompt,
                  activeCharacter.name,
                )}
              </h1>
              <div className="quiz-options">
                {activeStory.closingQuiz.questions[quizIndex].options.map(
                  (option, index) => (
                    <button
                      type="button"
                      key={option}
                      disabled={quizFeedback === "correct"}
                      onClick={() => answerQuestion(index)}
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
              {quizFeedback === "wrong" && (
                <div className="feedback wrong" role="alert">
                  <Frown aria-hidden="true" />
                  <div>
                    <strong>Casi. Inténtalo otra vez.</strong>
                    <p>Vuelve a pensar en lo que ocurrió durante el cuento.</p>
                  </div>
                </div>
              )}
              {quizFeedback === "correct" && (
                <div className="feedback correct" role="status">
                  <Smile aria-hidden="true" />
                  <div>
                    <strong>
                      {storyAlreadyCompleted
                        ? "¡Muy bien! Ya cobraste esta recompensa."
                        : `¡Muy bien! +${activeStory.closingQuiz.questions[quizIndex].coinReward} ${activeStory.closingQuiz.questions[quizIndex].coinReward === 1 ? "moneda" : "monedas"}`}
                    </strong>
                    <p>
                      {storyAlreadyCompleted
                        ? "Puedes continuar sin ganar monedas adicionales."
                        : "Guárdalas para desbloquear personajes."}
                    </p>
                  </div>
                </div>
              )}
              {quizFeedback === "correct" && (
                <button
                  className="primary-button"
                  type="button"
                  onClick={continueQuiz}
                >
                  {quizIndex < activeStory.closingQuiz.questions.length - 1
                    ? "Siguiente pregunta"
                    : "Ver mi recompensa"}{" "}
                  <ChevronRight aria-hidden="true" />
                </button>
              )}
              <button
                className="secondary-button quiz-skip"
                type="button"
                onClick={skipQuiz}
              >
                Saltar preguntas restantes
              </button>
              <p className="quiz-skip-note">
                Terminarás la aventura sin las monedas de las preguntas que
                saltes.
              </p>
            </div>
          </section>
        )}

        {screen === "reward" && (
          <section className="screen reward-screen">
            <div className="reward-burst">
              <Trophy aria-hidden="true" />
            </div>
            <h1>¡Aventura completada!</h1>
            <p>
              {activeCharacter.name} completó “{activeStory.title}” y tú
              construiste el camino.
            </p>
            {!parentSession && (
              <div className="reward-save-callout">
                <LockKeyhole aria-hidden="true" />
                <div>
                  <strong>¡Este avance merece quedarse!</strong>
                  <p>
                    Ya está guardado aquí. Pide a un adulto que lo proteja en
                    una cuenta para recuperarlo en otro dispositivo.
                  </p>
                </div>
                <button
                  className="primary-button"
                  type="button"
                  onClick={openParentScreen}
                >
                  Proteger mi partida <ChevronRight aria-hidden="true" />
                </button>
              </div>
            )}
            <div className="reward-board">
              <div>
                <Coins aria-hidden="true" />
                <span>Monedas ganadas</span>
                <strong>+{rewardCoins}</strong>
              </div>
              <div>
                <Coins aria-hidden="true" />
                <span>Monedero</span>
                <strong>{save.coins} monedas</strong>
              </div>
              <div>
                <Coins aria-hidden="true" />
                <span>Total histórico</span>
                <strong>{save.lifetimeCoins} monedas</strong>
              </div>
            </div>
            <div className="reward-skills">
              <h2>Así quedaron tus habilidades</h2>
              {(["a", "b", "c"] as SkillKey[]).map((key) => (
                <SkillBar
                  key={key}
                  character={activeCharacter}
                  skillKey={key}
                />
              ))}
            </div>
            <div className="reward-actions">
              <button
                className="primary-button"
                type="button"
                onClick={() => setScreen("library")}
              >
                Elegir otro cuento <ChevronRight aria-hidden="true" />
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => startStory()}
              >
                <RotateCcw aria-hidden="true" /> Jugar otra vez
              </button>
            </div>
          </section>
        )}
      </main>
      {choiceResult && screen === "chapter" && (
        <OutcomeInterlude
          character={activeCharacter}
          result={choiceResult}
          onContinue={finishChoiceResult}
        />
      )}
      {showPortrait && (
        <PortraitBar
          character={activeCharacter}
          expression={portraitExpression}
          pulse={portraitPulse}
          thinking={Boolean(selectedDecision) && !choiceResult}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
