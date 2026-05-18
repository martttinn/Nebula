---
change_id: NBS-CHG-2026-05-07-155
date: 2026-05-07
title: Integracion de la seccion testimonials en la home
group_id: NBS-TSK-2026-148
category: frontend
subcategories:
  - home
  - feature
  - conversion
origin: client-request
complexity: medium
scope: cross-cutting
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - app
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - app/page.tsx
  - components/home/testimonials/**
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/reference/domain-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
---

# Resumen corto

La home pública incorpora una nueva sección `Testimonials` después de `Projects showcase`, resuelta ahora como un stack editorial sticky de tres cards grandes en desktop y una lista vertical simple en móvil/tablet.

## Contexto / problema

Tras añadir `Projects showcase`, la home seguía sin una capa específica de prueba social humana antes del futuro CTA final. Primero fue necesario sembrar la surface con placeholders honestos para no inventar prueba social pública; después, Martín confirmó tres reseñas reales. Una vez integradas, el carril horizontal seguía dejando las citas demasiado apretadas dentro de cards estrechas, así que se decidió priorizar un layout con más aire en desktop.

## Cambio realizado

- se crea la familia `components/home/testimonials/` con `index.tsx` server-first y `content.ts` como catálogo local
- la sección usa `SectionTitle`, atmósfera `Void` y cards oscuras uniformes sin fotos, estrellas ni carruseles
- el layout desktop pasa a un stack editorial sticky de tres cards grandes con offsets escalonados, tomando como referencia estructural la página de servicios de Golden Grama
- se corrige el wrapper de la sección para no recortar el eje Y; el contenedor pasa a usar `overflow-x-hidden` y deja de bloquear el comportamiento `sticky` de las cards desktop
- el stack desktop deja de depender solo de CSS sticky y pasa a una stage cliente con `framer-motion`, de forma que la compresión progresiva entre cards replica mejor la lógica de `/servicios` en Golden Grama
- el chrome visible se reduce al mínimo: sin eyebrow, sin subtítulo descriptivo y sin badges internos de reseña
- en móvil y tablet la sección degrada a una lista vertical simple sin sticky
- `app/page.tsx` integra `TestimonialsSection` justo después de `ProjectsShowcaseSection`
- el dataset inicial queda sembrado con placeholders repo-safe que declaran explícitamente la falta de testimonios publicables, preparados para sustitución directa cuando Martín aporte citas reales verificables
- el catálogo actual integra ya tres testimonios públicos reales: `Raúl Rodríguez / Canal3Networks`, `Javier / Golden Grama` y `Eduardo Martinez / Future Nova`
- se actualizan `DESIGN.md`, `.agents/decisions-log.md` y referencias técnicas/dominio para reflejar la nueva primitive y el guardrail de contenido

## Objetivo

Añadir la capa visual y narrativa de testimonials sin bloquear la implementación por falta de copy final, pero manteniendo una política estricta de no inventar prueba social pública.

## Impacto arquitectonico

La home gana una nueva carpeta canónica en `components/home/`, mantiene la estrategia `Server Components first` y evita abrir una isla cliente adicional para esta sección. Documentalmente, el dominio deja explícito que una surface de testimonios solo puede usar citas verificadas o placeholders honestos pendientes de sustitución.

## Desglose denso

- el heading visible conserva el patrón `section-heading` del sistema, pero adopta una formulación más amigable para público general: `Lo que dicen nuestros clientes`, con el acento visual recayendo en `clientes`
- las tres reseñas usan la misma primitive de card, sin jerarquía de protagonista/satélites
- la cita de cada card queda centrada para que el foco visual recaiga en el testimonio y no en chrome auxiliar
- desktop reparte las cards en un stack sticky con más ancho útil y reveal progresivo por scroll, inspirado en la composición de `/servicios` de Golden Grama, lo que reduce la sensación de texto aglutinado sin encoger agresivamente la tipografía
- el fallo operativo detectado tras esa migración no estaba en la geometría del stack, sino en el clipping vertical del wrapper; al eliminar ese recorte, la apilación vuelve a responder al scroll real
- la corrección final no se limita al clipping: desktop usa ahora `scrollYProgress` + `scale` para que el stack se lea realmente como apilación editorial y no como una simple sucesión de cards sticky
- mobile y tablet no heredan el stack: resuelven una lista vertical robusta y más fácil de leer
- las cards resuelven `blockquote` + `figcaption` con nombre, rol y empresa; no hay ratings, avatares ni comillas teatrales
- el catálogo local limita el bloque a 3 ítems como máximo y hoy expone ya tres testimonios públicos confirmados en runtime

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

- la futura migración a ticker deja de ser el siguiente paso natural y pasa a ser una decisión de producto aparte, porque el layout actual ya prioriza lectura sobre continuidad horizontal
- el CTA final que debe venir después de esta sección aún no forma parte del runtime público actual

## Notas para presupuesto

Entrega visible de complejidad media: crea una sección nueva de la home, trabaja jerarquía editorial responsive, refuerza conversión y deja preparada una sustitución segura por contenido comercial real sin necesidad de rediseño posterior.
