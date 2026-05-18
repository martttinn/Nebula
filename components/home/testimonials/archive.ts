// Archivo/source repo-safe de reseñas verificadas para la sección
// de testimonials en la home pública de Nebula Studios.

export type HomeTestimonialArchiveEntry = {
  id: string;
  quote: string;
  headline: string;
  summary: string;
  author: string;
  role: string;
  company: string;
  featured?: boolean;
  status: "verified-public-copy";
};

export const HOME_TESTIMONIAL_ARCHIVE = [
  {
    id: "raul-rodriguez-canal3networks",
    quote:
      "Desde que trabajamos con Nebula, hemos digitalizado procesos clave de nuestro negocio. Lo que más valoramos es su disponibilidad y que siempre entienden lo que necesitamos antes de proponer soluciones.",
    headline: "Digitalizamos procesos clave del negocio.",
    summary:
      "Valoramos su disponibilidad y que entienden lo que necesitamos antes de proponer soluciones.",
    author: "Raúl Rodríguez",
    role: "Gerente",
    company: "Canal3Networks",
    featured: true,
    status: "verified-public-copy",
  },
  {
    id: "javier-martinez-golden-grama",
    quote:
      "Es como tener un departamento de informática dentro de la empresa. Cada proceso que queremos digitalizar acaba teniendo solución con Nebula. Esa tranquilidad no tiene precio.",
    headline: "Es como tener un departamento de informática propio.",
    summary:
      "Cada proceso que queremos digitalizar acaba teniendo solución con Nebula.",
    author: "Javier Martinez",
    role: "Gerente",
    company: "Golden Grama",
    status: "verified-public-copy",
  },
  {
    id: "eduardo-martinez-future-nova",
    quote:
      "Nebula Studios ha transformado nuestro día a día. Hemos ahorrado decenas de horas mensuales en trabajo manual gracias a los productos que han desarrollado para nosotros.",
    headline: "Ahorramos decenas de horas mensuales.",
    summary:
      "Nebula transformó trabajo manual en soluciones automatizadas para nuestro día a día.",
    author: "Eduardo Martinez",
    role: "Gerente",
    company: "Future Nova",
    status: "verified-public-copy",
  },
] as const satisfies readonly HomeTestimonialArchiveEntry[];
