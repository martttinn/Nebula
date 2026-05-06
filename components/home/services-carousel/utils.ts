export function roundTo(value: number, decimals: number) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const [r, g, b] =
    normalized.length === 3
      ? normalized.split("").map((part) => Number.parseInt(part + part, 16))
      : [
          Number.parseInt(normalized.slice(0, 2), 16),
          Number.parseInt(normalized.slice(2, 4), 16),
          Number.parseInt(normalized.slice(4, 6), 16),
        ];

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function buildServiceGlowColors(accent: string) {
  return [accent, "#7D74E0", "#B5B1E3"];
}
