import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSyne } from "@remotion/google-fonts/Syne";

const inter = loadInter("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

const syne = loadSyne("normal", {
  weights: ["700", "800"],
  subsets: ["latin"],
});

const fontLoadPromise = Promise.all([
  inter.waitUntilDone(),
  syne.waitUntilDone(),
]).then(() => undefined);

export const nebulaVideoFonts = {
  sans: inter.fontFamily,
  display: syne.fontFamily,
} as const;

export const waitForNebulaFonts = () => fontLoadPromise;
