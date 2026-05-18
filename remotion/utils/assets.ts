import { staticFile } from "remotion";

export const nebulaAssets = {
  logo: {
    horizontalDark: staticFile("logo/horizontal/nebula-dark-horizontal.svg"),
    symbolDark: staticFile("logo/symbol/nebula-dark.svg"),
  },
  planets: {
    planet1: staticFile("planets/planet-1.png"),
    planet3: staticFile("planets/planet-3.png"),
    planet4: staticFile("planets/planet-4.png"),
    planet5: staticFile("planets/planet-5.png"),
    planet6: staticFile("planets/planet-6.png"),
  },
  icons3d: {
    chart: staticFile("3d-Icons/grafico-icon-3d.png"),
    mobile: staticFile("3d-Icons/iphone-icon-3d.png"),
    search: staticFile("3d-Icons/lupa-icon-3d.png"),
    web: staticFile("3d-Icons/webPanel-icon-3d.png"),
  },
} as const;
