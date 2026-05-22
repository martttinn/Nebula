import type { DesktopClusterPlacement, Step } from "./types";

export const DEBUG_BORDERS = false;
export const PATH_START_Y_OFFSET = -1;
export const PATH_END_Y_OFFSET = 116;
export const EDGE_HANDLE_RATIO = 0.32;
export const INTER_NODE_HANDLE_RATIO = 1.0;
export const EDGE_HANDLE_MAX = 136;
export const INTER_NODE_HANDLE_MAX = 320;
export const EDGE_VERTICAL_HANDLE_RATIO = 0.16;
export const OUTER_NODE_VERTICAL_HANDLE_RATIO = 0.32;
export const INTER_NODE_VERTICAL_HANDLE_RATIO = 1.0;
export const IMAGE_NODE_DESKTOP_SIZE = 108;
export const IMAGE_NODE_MOBILE_SIZE = 88;
export const MOBILE_TIMELINE_NODE_TOP = 4;
export const MOBILE_TIMELINE_ROW_GAP = 32;
export const MOBILE_TIMELINE_LINE_LEFT = IMAGE_NODE_MOBILE_SIZE / 2;
export const MOBILE_TIMELINE_LINE_BRIDGE = MOBILE_TIMELINE_ROW_GAP / 2;
export const MOBILE_TIMELINE_NODE_CENTER_Y =
  MOBILE_TIMELINE_NODE_TOP + IMAGE_NODE_MOBILE_SIZE / 2;
export const MOBILE_CARD_DESCRIPTION_LINE_CLAMP = 4;
export const CLUSTER_REVEAL_START_OFFSET = 0.13;
export const CLUSTER_REVEAL_END_OFFSET = 0.035;
export const PATH_DRAW_END_PROGRESS = 0.82;
export const NODE_REVEAL_BASE_SCALE = 0.82;
export const NODE_REVEAL_ACTIVE_SCALE = 1.07;
export const IMAGE_NODE_BASE_OPACITY = 0.28;
export const DESKTOP_CLUSTER_PLACEMENTS: readonly DesktopClusterPlacement[] = [
  { nodeXPercent: 6, xOffset: 0 },
  { nodeXPercent: 88, xOffset: -8 },
  { nodeXPercent: 18, xOffset: 10 },
  { nodeXPercent: 94, xOffset: -6 },
] as const;
export const DESKTOP_STEP_STOPS = [0.16, 0.38, 0.62, 0.84] as const;
export const PROCESS_LILAC_RGB = "125,116,224";
export const PROCESS_HAZE_RGB = "181,177,227";
export const PROCESS_SILVER_RGB = "232,232,240";
const PROCESS_NAVY_TOP = "#0B0C17";
const PROCESS_NAVY_MID = "#0D0F24";
const PROCESS_NAVY_BOTTOM = "#0A0F2E";
export const PROCESS_CARD_SURFACE_BACKGROUND =
  `linear-gradient(180deg, ${PROCESS_NAVY_TOP} 0%, ${PROCESS_NAVY_MID} 48%, ${PROCESS_NAVY_BOTTOM} 100%)`;
export const NODE_SURFACE_BACKGROUND =
  `radial-gradient(circle at 50% 28%, rgb(${PROCESS_HAZE_RGB}) 0%, rgb(${PROCESS_LILAC_RGB}) 34%, ${PROCESS_NAVY_BOTTOM} 100%)`;
export const DESKTOP_CARD_ACCENT_BACKGROUND =
  `radial-gradient(circle at 12% 20%, rgba(${PROCESS_LILAC_RGB},0.16), transparent 34%)`;
export const MOBILE_CARD_ACCENT_BACKGROUND =
  `radial-gradient(circle at 15% 18%, rgba(${PROCESS_LILAC_RGB},0.14), transparent 36%)`;
export const SECTION_ACCENT_BACKGROUND = "none";

export const STEPS: readonly Step[] = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Entendemos tu negocio, flujos y procesos antes de proponer nada. Sin soluciones genéricas: primero escuchamos.",
    side: "left",
    imageSrc: "/planets/planet-1.png",
    imageAlt: "Planeta violeta decorativo",
  },
  {
    number: "02",
    title: "Arquitectura",
    description:
      "Diseñamos la solución técnica adaptada a tu realidad. Cada decisión tiene un porqué claro y documentado.",
    side: "right",
    imageSrc: "/planets/planet-4.png",
    imageAlt: "Planeta violeta decorativo",
  },
  {
    number: "03",
    title: "Desarrollo",
    description:
      "Construimos de forma iterativa. Ves avances reales en cada fase, no promesas vacías al final del proyecto.",
    side: "left",
    imageSrc: "/planets/planet-3.png",
    imageAlt: "Planeta violeta decorativo",
  },
  {
    number: "04",
    title: "Evolución",
    description:
      "Lanzamos, medimos y mejoramos contigo de forma continua. El lanzamiento es el comienzo, no el fin.",
    side: "right",
    imageSrc: "/planets/planet-6.png",
    imageAlt: "Planeta violeta decorativo",
  },
] as const;
