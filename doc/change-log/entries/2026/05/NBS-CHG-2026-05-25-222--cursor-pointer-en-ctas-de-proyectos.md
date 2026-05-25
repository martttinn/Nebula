---
change_id: NBS-CHG-2026-05-25-222
date: 2026-05-25
title: Cursor pointer en CTAs de proyectos
group_id: NBS-TSK-2026-198
category: frontend
subcategories:
  - affordance
  - cta
  - hover
  - portfolio
origin: client-request
complexity: low
scope: component-local
user_visible: true
release_impacts:
  - docs
  - frontend-runtime
architecture_layers:
  - components
  - docs
backend_sensitive: false
files_touched:
  - components/home/projects-showcase/index.tsx
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-25-222--cursor-pointer-en-ctas-de-proyectos.md
  - doc/change-log/groups/2026/NBS-TSK-2026-198.md
verification:
  - npm run lint
  - revision del diff local de components/home/projects-showcase/index.tsx
related_decisions:
---

# Resumen corto

Se añade cursor de puntero a los botones `Ver más` de cada proyecto.

## Contexto / problema

Los CTAs `Ver más` de proyectos ya tenían aspecto de botón, pero no forzaban `cursor-pointer`, lo que reducía la señal de interactividad en escritorio.

## Cambio realizado

Se añade `cursor-pointer` a los dos CTAs `Ver más` de `projects-showcase`: el botón del panel desktop y el botón de la card móvil.

## Objetivo

Mejorar la affordance de interacción sin alterar copy, navegación, layout, animación ni jerarquía visual.

## Impacto arquitectonico

No hay impacto arquitectónico. El cambio es local al componente `ProjectsShowcaseSection` y solo ajusta clases Tailwind en los botones existentes.

## Desglose denso

- el CTA desktop conserva `pointer-events-auto` para seguir siendo interactivo sobre el panel
- el CTA móvil recibe la misma señal de cursor para mantener consistencia
- no se toca la primitive global `Button`, evitando cambiar affordances en otros CTAs del sitio

## Validacion

- `npm run lint`
- revisión del diff local: ambos CTAs `Ver más` contienen `cursor-pointer`

## Pendientes / limites

No se ha cambiado la acción real del botón ni su destino; esta entrega solo cubre la señal de cursor solicitada.

## Notas para presupuesto

Microajuste de UX en la sección de proyectos.
