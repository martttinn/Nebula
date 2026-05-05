export type HomeService = {
  slug: string;
  title: string;
  subtitle: string;
  accent: string;
  iconSrc: string;
};

export const HOME_SERVICES: readonly HomeService[] = [
  {
    slug: "desarrollo-movil",
    title: "Desarrollo móvil",
    subtitle:
      "Apps móviles a medida, foco en rendimiento, experiencia de usuario y escalabilidad.",
    accent: "#534AB7",
    iconSrc: "/3d-Icons/iphone-icon-3d.png",
  },
  {
    slug: "desarrollo-web",
    title: "Desarrollo web",
    subtitle:
      "Webs corporativas, webapps, portales y herramientas internas que potencian tu flujo de trabajo.",
    accent: "#7D74E0",
    iconSrc: "/3d-Icons/webPanel-icon-3d.png",
  },
  {
    slug: "evolucion-continua",
    title: "Evolución continua",
    subtitle:
      "Mantenemos y mejoramos tu producto adaptandolo a tus necesidades y flujos.",
    accent: "#B5B1E3",
    iconSrc: "/3d-Icons/grafico-icon-3d.png",
  },
  {
    slug: "consultoria-digitalizacion",
    title: "Consultoría y digitalización",
    subtitle:
      "Ayudamos a detectar cuellos de botella y procesos automatizables en tu flujo de trabajo.",
    accent: "#6B66C6",
    iconSrc: "/3d-Icons/lupa-icon-3d.png",
  },
] as const;
