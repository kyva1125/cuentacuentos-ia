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
  Sparkles,
  Star,
  Sun,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import chapterOne from "./assets/sendero-generico/chapter-1-scene.webp";
import chapterTwo from "./assets/sendero-generico/chapter-2-scene.webp";
import chapterThree from "./assets/sendero-generico/chapter-3-scene.webp";
import chapterFour from "./assets/sendero-generico/chapter-4-scene.webp";
import chapterFive from "./assets/sendero-generico/chapter-5-scene.webp";
import c1a from "./assets/sendero-generico/chapter-1-a.webp";
import c1b from "./assets/sendero-generico/chapter-1-b.webp";
import c1c from "./assets/sendero-generico/chapter-1-c.webp";
import c2a from "./assets/sendero-generico/chapter-2-a.webp";
import c2b from "./assets/sendero-generico/chapter-2-b.webp";
import c2c from "./assets/sendero-generico/chapter-2-c.webp";
import c3a from "./assets/sendero-generico/chapter-3-a.webp";
import c3b from "./assets/sendero-generico/chapter-3-b.webp";
import c3c from "./assets/sendero-generico/chapter-3-c.webp";
import c4a from "./assets/sendero-generico/chapter-4-a.webp";
import c4b from "./assets/sendero-generico/chapter-4-b.webp";
import c4c from "./assets/sendero-generico/chapter-4-c.webp";
import c5a from "./assets/sendero-generico/chapter-5-a.webp";
import c5b from "./assets/sendero-generico/chapter-5-b.webp";
import c5c from "./assets/sendero-generico/chapter-5-c.webp";
import niaAvatar from "./assets/style-v2/characters/nia-v2.png";
import niaEmotions from "./assets/characters-gpt/nia-emotions.png";
import teoEmotions from "./assets/style-v2/teo-emotions-v2.png";
import teoAvatar from "./assets/style-v2/characters/teo-v2.png";
import lumaAvatar from "./assets/style-v2/characters/luma-v2.png";
import lumaEmotions from "./assets/illustrations-v3/luma-emotions-v3.png";
import rokAvatar from "./assets/style-v2/characters/rok-v3.png";
import bitAvatar from "./assets/style-v2/characters/bit-v3.png";
import suriAvatar from "./assets/style-v2/characters/suri-v3.png";
import senderoCover from "./assets/story-covers-gpt/sendero-perdido.png";
import faroCover from "./assets/story-covers-gpt/faro-luciernagas.png";
import nubeCover from "./assets/story-covers-gpt/nube-engranajes.png";
import rioCover from "./assets/style-v2/rio-cantor-chapter-1-opening-v2.png";
import rioChapterOneChoiceA from "./assets/style-v2/rio-cantor-chapter-1-choice-a-v2.png";
import rioChapterOneChoiceB from "./assets/style-v2/rio-cantor-chapter-1-choice-b-v2.png";
import rioChapterOneChoiceC from "./assets/style-v2/rio-cantor-chapter-1-choice-c-v2.png";
import rioChapterTwoChoiceA from "./assets/style-v2/rio-cantor-chapter-2-choice-a-v2.png";
import rioChapterTwoChoiceB from "./assets/style-v2/rio-cantor-chapter-2-choice-b-v2.png";
import rioChapterTwoChoiceC from "./assets/style-v2/rio-cantor-chapter-2-choice-c-v2.png";
import rioChapterThreeChoiceA from "./assets/style-v2/rio-cantor-chapter-3-choice-a-v2.png";
import rioChapterThreeChoiceB from "./assets/style-v2/rio-cantor-chapter-3-choice-b-v2.png";
import rioChapterThreeChoiceC from "./assets/style-v2/rio-cantor-chapter-3-choice-c-v2.png";
import rioChapterFourChoiceA from "./assets/style-v2/rio-cantor-chapter-4-choice-a-v2.png";
import rioChapterFourChoiceB from "./assets/style-v2/rio-cantor-chapter-4-choice-b-v2.png";
import rioChapterFourChoiceC from "./assets/style-v2/rio-cantor-chapter-4-choice-c-v2.png";
import bibliotecaCover from "./assets/story-covers-gpt/biblioteca-luna.png";
import jardinCover from "./assets/story-covers-gpt/jardin-gigantes.png";
import faroNubesCover from "./assets/style-v2/faro-nubes-cover-v2.png";
import jardinGigantesCover from "./assets/style-v2/jardin-gigantes-cover-v2.png";
import teoTallerCover from "./assets/style-v2/teo-taller-estrellas-cover-v2.png";
import teoCiudadCover from "./assets/style-v2/teo-ciudad-cobre-cover-v2.png";
import teoBosqueCover from "./assets/style-v2/teo-bosque-brujulas-cover-v2.png";
import bitObservatorioCover from "./assets/style-v2/bit-observatorio-luz-cover-v2.png";
import bitLagoCover from "./assets/style-v2/bit-lago-ecos-cover-v2.png";
import bitSemillasCover from "./assets/style-v2/bit-ciudad-semillas-cover-v2.png";
import lumaFaroMareasCover from "./assets/style-v2/luma-faro-mareas-cover-v2.png";
import lumaIslaBarcasCover from "./assets/style-v2/luma-isla-barcas-cover-v2.png";
import lumaArrecifeCristalCover from "./assets/style-v2/luma-arrecife-cristal-cover-v2.png";
import rokCuevaEcosCover from "./assets/style-v2/rok-cueva-ecos-cover-v2.png";
import rokVallePromesasCover from "./assets/style-v2/rok-valle-promesas-cover-v2.png";
import rokNubeVolcanCover from "./assets/style-v2/rok-nube-volcan-cover-v2.png";
import suriLagoReflejosCover from "./assets/style-v2/suri-lago-reflejos-cover-v2.png";
import suriArbolLuciérnagasCover from "./assets/style-v2/suri-arbol-luciernagas-cover-v2.png";
import suriSenderoSemillasCover from "./assets/style-v2/suri-sendero-semillas-cover-v2.png";

const storySceneAssets = import.meta.glob(
  "./assets/story-scenes/**/*.{webp,png}",
  { eager: true, import: "default", query: "?url" },
) as Record<string, string>;
const storyV2Assets = import.meta.glob("./assets/style-v2/*.{webp,png}", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;
const storyV3Assets = import.meta.glob("./assets/illustrations-v3/*.png", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;
type SceneVariant = "scene" | "a" | "b" | "c";

function storyScene(storyId: string, chapter: number, variant: SceneVariant) {
  const suffix = storyId === "rio-cantor" ? "-nia.png" : ".webp";
  const path = `./assets/story-scenes/${storyId}/chapter-${chapter}-${variant}${suffix}`;
  const image = storySceneAssets[path];
  if (!image)
    throw new Error(
      `Falta la ilustración ${storyId}, capítulo ${chapter}, ${variant}.`,
    );
  return image;
}

function storyV2Scene(storyId: string, chapter: number, variant: SceneVariant) {
  const path = `./assets/style-v2/${storyId}-chapter-${chapter}-choice-${variant}-v2.png`;
  const image = storyV2Assets[path];
  if (!image)
    throw new Error(
      `Falta la ilustración v2 ${storyId}, capítulo ${chapter}, ${variant}.`,
    );
  return image;
}

function storyV3Opening(storyId: string) {
  return storyV3Assets[`./assets/illustrations-v3/${storyId}-opening-v3.png`];
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
      id === "faro-nubes" ||
      id === "jardin-gigantes" ||
      id.startsWith("teo-") ||
      id.startsWith("bit-") ||
      id.startsWith("luma-") ||
      id.startsWith("rok-") ||
      id.startsWith("suri-")
    ) {
      return variant === "scene" || chapter > 4
        ? opening
        : storyV2Scene(id, chapter, variant);
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
    "El Faro de las Nubes",
    "Una luz sobre el mar de nubes necesita volver a brillar.",
    storyV3Opening("faro-nubes") ?? faroNubesCover,
    "el faro de las nubes",
    "su luz necesita regresar antes de que la tormenta cubra el cielo",
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
    "El Río que Canta",
    "Las notas del río desaparecieron entre piedras de colores.",
    rioCover,
    "el río cantor",
    "su melodía necesita encontrar las notas perdidas",
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
    "El Jardín de los Gigantes",
    "El jardín enorme perdió el agua que hace florecer sus caminos.",
    storyV3Opening("jardin-gigantes") ?? jardinGigantesCover,
    "el jardín de los gigantes",
    "la fuente necesita despertar para que las flores vuelvan a crecer",
    "nia",
    5,
  ),
  createStoryShell(
    "teo-taller-estrellas",
    "El Taller de las Estrellas",
    "Una máquina astral necesita recuperar su chispa.",
    teoTallerCover,
    "el taller de las estrellas",
    "la máquina debe encenderse antes de que se apaguen las constelaciones",
    "teo",
  ),
  createStoryShell(
    "teo-ciudad-cobre",
    "La Ciudad de Cobre",
    "El reloj de la ciudad dejó de marcar el ritmo.",
    teoCiudadCover,
    "la Ciudad de Cobre",
    "el gran reloj necesita volver a funcionar",
    "teo",
  ),
  createStoryShell(
    "teo-bosque-brujulas",
    "El Bosque de las Brújulas",
    "Las flores brújula ya no señalan el camino.",
    teoBosqueCover,
    "el bosque de las brújulas",
    "las brújulas deben volver a guiar a los viajeros",
    "teo",
    5,
  ),
  createStoryShell(
    "bit-observatorio-luz",
    "El Observatorio de la Luz",
    "Un proyector de constelaciones necesita recuperar su señal.",
    bitObservatorioCover,
    "el observatorio de la luz",
    "el proyector debe volver a mostrar el cielo",
    "bit",
  ),
  createStoryShell(
    "bit-lago-ecos",
    "El Lago de los Ecos",
    "Un lago mágico necesita liberar las emociones que repite.",
    bitLagoCover,
    "el lago de los ecos",
    "los ecos deben volver a escucharse con calma",
    "bit",
  ),
  createStoryShell(
    "bit-ciudad-semillas",
    "La Ciudad de las Semillas",
    "Una ciudad diminuta necesita aprender a compartir su energía.",
    bitSemillasCover,
    "la ciudad de las semillas",
    "la energía debe llegar a todos por igual",
    "bit",
    5,
  ),
  createStoryShell(
    "luma-faro-mareas",
    "El Faro de las Mareas",
    "Una luz de puerto debe guiar a las barcas antes de la tormenta.",
    lumaFaroMareasCover,
    "el faro de las mareas",
    "la luz necesita reunir tres señales del cielo para cuidar a cada viajero",
    "luma",
  ),
  createStoryShell(
    "luma-isla-barcas",
    "La Isla de las Barcas Dormidas",
    "Las pequeñas barcas flotantes olvidaron cómo escuchar al viento.",
    lumaIslaBarcasCover,
    "la isla de las barcas dormidas",
    "las velas necesitan recordar que cada viaje tiene su propio ritmo",
    "luma",
  ),
  createStoryShell(
    "luma-arrecife-cristal",
    "El Arrecife de Cristal",
    "El arrecife guarda agua de lluvia que debe llegar a todos los jardines.",
    lumaArrecifeCristalCover,
    "el arrecife de cristal",
    "el agua necesita circular sin romper los delicados puentes de coral",
    "luma",
    5,
  ),
  createStoryShell(
    "rok-cueva-ecos",
    "La Cueva de los Ecos Dorados",
    "Los ecos de una cueva repiten miedos en lugar de canciones.",
    rokCuevaEcosCover,
    "la cueva de los ecos dorados",
    "las piedras deben aprender a responder con verdad y no con ruido",
    "rok",
  ),
  createStoryShell(
    "rok-valle-promesas",
    "El Valle de las Promesas",
    "Un puente de banderas solo se sostiene cuando cada promesa se cumple.",
    rokVallePromesasCover,
    "el valle de las promesas",
    "los habitantes necesitan recordar que la fuerza también es ser confiable",
    "rok",
  ),
  createStoryShell(
    "rok-nube-volcan",
    "La Nube Volcán",
    "Una nube caliente amenaza con secar los jardines de la montaña.",
    rokNubeVolcanCover,
    "la nube volcán",
    "el calor necesita convertirse en luz y no en temor",
    "rok",
    5,
  ),
  createStoryShell(
    "suri-lago-reflejos",
    "El Lago de los Reflejos",
    "Un lago repite una sola emoción y deja de escuchar al bosque.",
    suriLagoReflejosCover,
    "el lago de los reflejos",
    "sus aguas necesitan aprender a guardar todas las voces del bosque",
    "suri",
  ),
  createStoryShell(
    "suri-arbol-luciernagas",
    "El Árbol de las Luciérnagas",
    "Las luciérnagas perdieron el camino hacia los nidos pequeños.",
    suriArbolLuciérnagasCover,
    "el árbol de las luciérnagas",
    "las luces deben volver a guiar sin dejar a nadie atrás",
    "suri",
  ),
  createStoryShell(
    "suri-sendero-semillas",
    "El Sendero de las Semillas",
    "Las semillas del bosque ya no saben dónde crecer juntas.",
    suriSenderoSemillasCover,
    "el sendero de las semillas",
    "cada semilla necesita encontrar un lugar que también cuide a las demás",
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

const authoredStoryContent: Record<
  string,
  { titles: string[]; texts: string[]; lesson: string }
> = {
  "faro-nubes": {
    lesson:
      "Pedir ayuda y compartir lo que sabes ilumina incluso los días difíciles.",
    titles: [
      "La luz que se escondió",
      "Nubes que también sienten miedo",
      "El mapa del viento",
      "La lámpara de todos",
      "Un faro compartido",
    ],
    texts: [
      "Nia descubre que el faro se apagó porque la cuidadora nube guardó sola su preocupación.",
      "Una nube pequeña confiesa que teme equivocarse al guiar a los viajeros. Nia aprende a escuchar antes de resolver.",
      "El viento no se domina: se entiende. Nia reúne las señales que cada nube conoce.",
      "La lente del faro solo funciona cuando varias manos colocan sus colores sin competir.",
      "La luz vuelve porque nadie tuvo que cargar el problema a solas.",
    ],
  },
  "jardin-gigantes": {
    lesson:
      "Cuidar algo pequeño con paciencia puede transformar todo un lugar.",
    titles: [
      "La semilla que no quería abrirse",
      "El jardín escucha despacio",
      "Agua para todos",
      "La raíz que une",
      "Flores para compartir",
    ],
    texts: [
      "Nia encuentra una semilla dorada cerrada mientras las flores gigantes se inclinan de sed.",
      "Una oruga explica que el jardín no necesita prisa: necesita que alguien observe qué le falta.",
      "Nia descubre que el agua está atrapada detrás de hojas caídas y que cada criatura puede ayudar.",
      "Bajo la fuente, una raíz conecta a todas las flores; repararla exige cuidado, no fuerza.",
      "El jardín florece y Nia comparte sus caminos con quienes lo protegieron.",
    ],
  },
  "teo-taller-estrellas": {
    lesson:
      "Equivocarse es parte de inventar cuando se vuelve a intentar con atención.",
    titles: [
      "La estrella que parpadeaba",
      "Un error útil",
      "Piezas que no encajaban",
      "El invento que escucha",
      "Una chispa nueva",
    ],
    texts: [
      "Teo ve que la máquina de estrellas falla y decide no esconder el problema.",
      "Un robot ayudante muestra un engranaje torcido: el primer intento falló, pero dejó una pista.",
      "Teo prueba, compara y anota; descubre que ninguna pieza está perdida, solo espera su lugar.",
      "La máquina responde cuando Teo escucha las ideas de sus pequeños ayudantes.",
      "La estrella vuelve a brillar y Teo guarda también sus bocetos fallidos.",
    ],
  },
  "teo-ciudad-cobre": {
    lesson: "El tiempo vale más cuando deja espacio para ayudar a otros.",
    titles: [
      "El reloj que detuvo la ciudad",
      "Minutos para escuchar",
      "El ritmo de los demás",
      "La campana que reúne",
      "La hora de ayudar",
    ],
    texts: [
      "Cuando el reloj se detiene, todos corren sin saber por qué. Teo decide escuchar primero.",
      "Un pájaro mecánico perdió su nido entre los engranajes; ayudarlo parece retrasar el arreglo.",
      "Teo entiende que cada parte de la ciudad tiene su propio ritmo y que apurarse puede romperlo.",
      "La campana solo sonará si vecinos y aves trabajan sincronizados.",
      "El reloj vuelve a andar y la ciudad aprende a reservar tiempo para cuidarse.",
    ],
  },
  "teo-bosque-brujulas": {
    lesson:
      "Una buena guía no manda: ayuda a que otros encuentren su propio camino.",
    titles: [
      "Las brújulas confundidas",
      "Preguntas antes que flechas",
      "El norte de cada amigo",
      "La puerta sin señal",
      "Caminos que se encuentran",
    ],
    texts: [
      "Las flores brújula apuntan en direcciones opuestas y los viajeros pierden confianza.",
      "Teo deja de buscar una flecha perfecta y pregunta a cada criatura adónde necesita llegar.",
      "Descubre que el norte cambia según la necesidad de quien camina.",
      "La puerta antigua se abre cuando varias brújulas se orientan juntas, no cuando una manda.",
      "El bosque recupera sus señales y Teo diseña mapas con más de un camino posible.",
    ],
  },
  "bit-observatorio-luz": {
    lesson: "Las preguntas y las pruebas compartidas convierten un misterio en una solución clara.",
    titles: ["La señal interrumpida", "Sombras en la cúpula", "El patrón escondido", "Una antena para todos", "El cielo vuelve a hablar"],
    texts: ["Bit detecta que el proyector de constelaciones dejó de enviar su señal y la gente del observatorio no puede mirar el cielo.", "Una astrónoma joven descubre sombras diminutas en la cúpula; Bit decide medirlas antes de cambiar piezas.", "Los registros muestran que la señal se corta con un ritmo que coincide con unas aves de metal que pasan cada noche.", "Bit propone una antena que no expulse a las aves: las guía por una ruta segura mientras el proyector recibe la luz.", "Las constelaciones regresan y Bit comprende que investigar también significa hacer lugar para quienes comparten el cielo."],
  },
  "bit-lago-ecos": {
    lesson: "Nombrar y escuchar las emociones ayuda a que no repitan siempre el mismo miedo.",
    titles: ["El eco que no paraba", "Una voz detrás del agua", "Tres sonidos distintos", "El reflejo que escucha", "Un lago con muchas voces"],
    texts: ["Bit llega a un lago que repite cada palabra con una voz triste y hace que los animales se escondan.", "Bajo el muelle, un pez linterna explica que el eco comenzó cuando nadie quiso contar qué le preocupaba.", "Bit graba risas, susurros y cantos para demostrar que el lago puede guardar más de un sonido.", "Con las criaturas del lugar, Bit coloca los sonidos en piedras resonantes para que cada emoción tenga su turno.", "El lago devuelve voces distintas sin atrapar ninguna y Bit aprende que comprender no es borrar lo que se siente."],
  },
  "bit-ciudad-semillas": {
    lesson: "Compartir energía de forma justa empieza por mirar quién la necesita y colaborar.",
    titles: ["Las luces que se apagaban", "La calle sin energía", "Un circuito generoso", "La chispa que viaja", "Una ciudad encendida junta"],
    texts: ["En la Ciudad de las Semillas, algunas casas brillan demasiado mientras otras no tienen luz para crecer.", "Bit sigue un cable hasta una calle oscura y escucha a una semilla pequeña que no puede cargar su lámpara.", "Al comparar los medidores, descubre que los cables no están rotos: la energía siempre toma el camino más corto.", "Bit diseña con los vecinos un circuito de puentes pequeños para que cada barrio reciba solo lo que necesita.", "Las semillas iluminan sus ventanas sin competir y Bit celebra una ciudad donde la energía encuentra a todos."],
  },
  "luma-faro-mareas": {
    lesson: "Mantener la calma permite ver la señal que otros necesitan.",
    titles: [
      "La luz que temblaba",
      "El mapa del viento",
      "Tres señales en el cielo",
      "La lámpara compartida",
      "Un puerto tranquilo",
    ],
    texts: [
      "Luma descubre que la lámpara del faro parpadea cuando una barca se siente sola.",
      "En vez de ordenar al viento, Luma escucha sus cambios y dibuja rutas posibles.",
      "Cada señal pertenece a un viajero distinto; ninguna sirve si se usa para todos igual.",
      "La lente se enciende cuando marineros y aves colocan juntos los colores correctos.",
      "El puerto vuelve a brillar y Luma aprende que cuidar también es orientar sin imponer.",
    ],
  },
  "luma-isla-barcas": {
    lesson: "Escuchar el ritmo de los demás es una forma de cuidar.",
    titles: [
      "Las velas dormidas",
      "Campanas bajo la niebla",
      "El viaje de cada barca",
      "Viento para compartir",
      "La isla despierta",
    ],
    texts: [
      "Luma llega a una isla donde las barcas flotan quietas porque temen elegir mal el viento.",
      "Las campanas del muelle no dan órdenes: cuentan historias de viajes distintos.",
      "Luma comprende que la barca pequeña no necesita la misma ruta que la más veloz.",
      "Las velas despiertan cuando cada barca ofrece una señal que ayuda a otra.",
      "La isla vuelve a navegar sin carreras: cada viaje tiene ritmo, compañía y regreso.",
    ],
  },
  "luma-arrecife-cristal": {
    lesson:
      "La delicadeza no es debilidad: permite cuidar lo que sostiene a todos.",
    titles: [
      "El agua atrapada",
      "Puentes que crujen",
      "La gota que espera",
      "El arrecife escucha",
      "Jardines para todos",
    ],
    texts: [
      "Luma encuentra agua de lluvia encerrada en un arrecife de cristal mientras los jardines se secan.",
      "Los puentes parecen frágiles, pero muestran por dónde pesa demasiado la prisa.",
      "Una gota azul revela que compartir no siempre es repartir igual: es mirar lo que hace falta.",
      "Las criaturas del arrecife proponen una ruta suave que nadie había notado.",
      "El agua llega a cada jardín y Luma descubre que el cuidado preciso puede sostener un mundo entero.",
    ],
  },
  "rok-cueva-ecos": {
    lesson: "La fuerza se vuelve valiente cuando protege la verdad.",
    titles: [
      "El rugido repetido",
      "Piedras que responden",
      "El eco pequeño",
      "Una canción sin miedo",
      "La cueva recuerda",
    ],
    texts: [
      "Rok escucha a la cueva repetir los miedos de quienes entran y decide no responder con un rugido mayor.",
      "Golpea las piedras con cuidado y descubre que cada eco cambia cuando alguien habla con sinceridad.",
      "Un murciélago pequeño teme que su voz no cuente; Rok le presta atención.",
      "Juntos ordenan los sonidos hasta que la cueva deja espacio para una canción nueva.",
      "Los ecos dorados ya no agrandan el miedo: recuerdan que decir la verdad también requiere fuerza.",
    ],
  },
  "rok-valle-promesas": {
    lesson: "Cumplir una promesa pequeña construye confianza grande.",
    titles: [
      "Las banderas caídas",
      "La promesa olvidada",
      "Fuerza para volver",
      "El puente de todos",
      "Un valle confiable",
    ],
    texts: [
      "Las banderas del valle caen porque muchas promesas fueron dichas deprisa y olvidadas después.",
      "Rok encuentra una nota antigua: una promesa no es un rugido, es una acción que regresa.",
      "Aunque el camino es largo, Rok vuelve para ayudar a una cabra que esperaba su señal.",
      "Cada habitante ata una bandera solo después de decidir qué puede cumplir de verdad.",
      "El puente se sostiene y Rok entiende que ser leal es hacer que otros puedan confiar.",
    ],
  },
  "rok-nube-volcan": {
    lesson:
      "Transformar el enojo en ayuda empieza por reconocer el calor que sentimos.",
    titles: [
      "La nube que ardía",
      "Calor con nombre",
      "Lluvia para respirar",
      "Luz sin quemar",
      "El cielo aprende",
    ],
    texts: [
      "Una nube volcán calienta demasiado los jardines y todos quieren alejarse de ella.",
      "Rok observa que la nube no es mala: está asustada y no sabe dónde dejar su calor.",
      "Con barriles de lluvia y cristales, los vecinos crean espacios para enfriar el vapor.",
      "Rok usa su fuerza solo para sostener el puente mientras las gotas convierten el calor en luz.",
      "La nube ilumina el valle al anochecer y todos aprenden que una emoción también puede cambiar de camino.",
    ],
  },
  "suri-lago-reflejos": {
    lesson:
      "Escuchar emociones distintas ayuda a entender sin quedarse atrapado en una sola.",
    titles: [
      "Un reflejo repetido",
      "Las voces bajo el agua",
      "La emoción que falta",
      "Un lago que escucha",
      "Todos los colores",
    ],
    texts: [
      "El lago repite tristeza en cada reflejo y el bosque deja de reconocer su alegría.",
      "Suri escucha las voces bajo el agua y descubre recuerdos que nadie se atrevía a nombrar.",
      "Una rana explica que no hay emoción equivocada, pero ninguna debe quedarse sola para siempre.",
      "Las hojas, los peces y las piedras comparten un recuerdo distinto junto a la orilla.",
      "El lago devuelve todos los colores del bosque y Suri aprende que escuchar cambia lo que vemos.",
    ],
  },
  "suri-arbol-luciernagas": {
    lesson:
      "Guiar es iluminar el camino sin abandonar a quien avanza más lento.",
    titles: [
      "Las luces perdidas",
      "El nido más pequeño",
      "Raíces que señalan",
      "Una noche acompañada",
      "El árbol vuelve a brillar",
    ],
    texts: [
      "Las luciérnagas vuelan sin rumbo y los nidos pequeños quedan a oscuras.",
      "Suri encuentra el nido más bajo y entiende que la ruta más rápida no ayuda a todos.",
      "Las raíces del árbol guardan señales antiguas que solo se ven al caminar despacio.",
      "Cada luciérnaga entrega un destello para que ninguna tenga que alumbrar sola.",
      "El árbol vuelve a brillar y el bosque celebra una luz que sabe esperar y acompañar.",
    ],
  },
  "suri-sendero-semillas": {
    lesson:
      "Crecer juntos significa elegir un lugar que también deje crecer a los demás.",
    titles: [
      "Semillas sin rumbo",
      "La tierra que escucha",
      "Un espacio para cada brote",
      "Raíces que comparten",
      "El sendero florece",
    ],
    texts: [
      "Las semillas corren con el viento y compiten por la misma tierra luminosa.",
      "Suri observa que el suelo guarda huecos distintos, no un único lugar perfecto.",
      "Un erizo enseña que una semilla pequeña puede crecer junto a una grande si ambas reciben cuidado.",
      "Las raíces se enlazan cuando cada brote deja agua y sombra para otro.",
      "El sendero florece sin perder su diversidad y Suri descubre que compartir también es hacer espacio.",
    ],
  },
};

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
    const paths: Record<SkillKey, { label: string; title: string; text: string }> = {
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
    });
    story.chapters[index + 1].continuations = {
      a: { title: paths.a.title, text: paths.a.text },
      b: { title: paths.b.title, text: paths.b.text },
      c: { title: paths.c.title, text: paths.c.text },
    };
  });
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
  Object.values(decisions).forEach((key) => {
    totals[key] += 1;
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

function PortraitBar({
  character,
  expression,
  pulse,
}: {
  character: Character;
  expression: Expression;
  pulse: number;
}) {
  const label =
    expression === "neutral"
      ? "Listo para decidir"
      : expression === "courage"
        ? character.skillLabels.a
        : expression === "wit"
          ? character.skillLabels.b
          : character.skillLabels.c;
  const emotionSheet =
    character.id === "nia"
      ? niaEmotions
      : character.id === "teo"
        ? teoEmotions
        : character.id === "luma"
          ? lumaEmotions
        : undefined;
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
  const activeStory = {
    ...baseStory,
    closingQuiz: {
      questions: baseStory.closingQuiz.questions.map((question, index) =>
        index === quizIndex
          ? {
              ...question,
              options: quizOptionOrder.map(
                (optionIndex) => question.options[optionIndex],
              ) as [string, string, string],
              correctIndex: quizOptionOrder.indexOf(question.correctIndex),
            }
          : question,
      ),
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
    const unlocked = save.unlockedCharacters.includes(character.id);
    if (!unlocked && save.coins < character.unlockCost) {
      setToast(
        `Necesitas ${character.unlockCost} monedas para desbloquear a ${character.name}. Tienes ${save.coins}.`,
      );
      return;
    }
    if (!unlocked) {
      const freeStoryIds = visibleStories
        .filter(
          (story) => story.ownerId === character.id && story.unlockCost === 0,
        )
        .map((story) => story.id);
      setSave((current) => ({
        ...current,
        coins: current.coins - character.unlockCost,
        unlockedCharacters: [...current.unlockedCharacters, character.id],
        unlockedStories: [
          ...new Set([...current.unlockedStories, ...freeStoryIds]),
        ],
        characters: {
          ...current.characters,
          [character.id]: normalizeCharacterSave(
            current.characters[character.id],
          ),
        },
      }));
      setToast(
        `¡${character.name} desbloqueado! Sus ${freeStoryIds.length} primeros cuentos son gratis.`,
      );
    }
    setSelectedCharacterId(character.id);
    openCharacterProfile();
  };

  const storyIsUnlocked = (story: Story) =>
    story.unlockCost === 0 || save.unlockedStories.includes(story.id);

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
    const firstOpen = story.chapters.findIndex(
      (chapter) => !characterSave.decisions[`${story.id}:${chapter.id}`],
    );
    const openingChapter = firstOpen >= 0 ? firstOpen : 0;
    setChapterIndex(openingChapter);
    setQuizIndex(0);
    setQuizFeedback(null);
    setQuizOptionOrder(shuffledOptions());
    setPortraitExpression("neutral");
    setRewardCoins(0);
    setScreen("chapter");
  };

  const chooseDecision = (skillKey: SkillKey) => {
    updateCharacterSave((current) => ({
      ...current,
      decisions: { ...current.decisions, [decisionKey]: skillKey },
    }));
    setPortraitExpression(skillMeta[skillKey].expression);
    setPortraitPulse((value) => value + 1);
  };

  const continueFromDecision = () => {
    if (!selectedDecision) return;
    if (chapterIndex < activeStory.chapters.length - 1) {
      const nextChapter = chapterIndex + 1;
      setChapterIndex(nextChapter);
      setPortraitExpression("neutral");
      setPortraitPulse((value) => value + 1);
      setScreen("chapter");
      window.scrollTo(0, 0);
      return;
    }
    setQuizIndex(0);
    setQuizFeedback(null);
    setScreen("quiz");
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
        <div className="brand" aria-label="Aventuras Píxel">
          <Star aria-hidden="true" /> Aventuras Píxel
        </div>
        <div className="topbar-actions">
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
                <span className="intro-prompt">
                  <Sparkles aria-hidden="true" /> Elige un personaje para ver
                  su perfil
                </span>
              </div>
              <img
                className="intro-scene"
                src={rioCover}
                alt="Nia y un búho descubren las notas del Río Cantor al atardecer"
              />
            </div>
            <div className="character-grid">
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
                const unlocked = save.unlockedCharacters.includes(character.id);
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
                        alt={`Avatar pixel art de ${character.name}, ${character.tag}`}
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
              <ArrowLeft aria-hidden="true" /> Personajes
            </button>
            <div className="profile-hero">
              <div className="profile-sprite">
                <img
                  className="gpt-avatar"
                  src={activeCharacter.avatarImage}
                  alt={`Retrato pixel art de ${activeCharacter.name}`}
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
              <ArrowLeft aria-hidden="true" /> Perfil de {activeCharacter.name}
            </button>
            <div className="library-heading">
              <div>
                <p className="chapter-number">
                  Cuentos de {activeCharacter.name}
                </p>
                <h1>Sus aventuras</h1>
                <p>
                  Dos cuentos te esperan gratis. El tercero se abre con monedas.
                </p>
              </div>
              <img
                src={activeCharacter.avatarImage}
                alt={`Avatar pixel art de ${activeCharacter.name}`}
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
                        alt={`Portada pixel art de ${story.title}`}
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
              <ArrowLeft aria-hidden="true" /> Guardar y salir
            </button>
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
                <p className="story-text">
                  {renderTemplate(currentChapter.text, activeCharacter.name)}
                </p>
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
                    Los tres caminos son válidos. Puedes cambiar tu elección
                    antes de continuar.
                  </p>
                </div>
                <div className="decision-grid">
                  {currentChapter.decisions.map((decision) => {
                    const Icon =
                      iconMap[activeCharacter.skillIcons[decision.skillKey]];
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
                        <span className="decision-skill">
                          <Icon aria-hidden="true" /> +1{" "}
                          {activeCharacter.skillLabels[decision.skillKey]}
                        </span>
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
                      Elección guardada: +1{" "}
                      {activeCharacter.skillLabels[selectedDecision]}. Puedes
                      cambiarla antes de continuar.
                    </p>
                  )}
                </div>
              </section>
            ) : (
              <div className="story-finish">
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
              {coinAchievements.map((achievement) => (
                <div key={achievement}>
                  <Trophy aria-hidden="true" />
                  <span>Logro de monedas</span>
                  <strong>{achievement}</strong>
                </div>
              ))}
              {badges.map((badge) => (
                <div key={badge}>
                  <Trophy aria-hidden="true" />
                  <span>Logro de habilidad</span>
                  <strong>{badge}</strong>
                </div>
              ))}
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
      {showPortrait && (
        <PortraitBar
          character={activeCharacter}
          expression={portraitExpression}
          pulse={portraitPulse}
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
