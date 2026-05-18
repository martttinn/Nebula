---
change_id: NBS-CHG-2026-05-08-171
date: 2026-05-08
title: Sustitucion del tercer caso de projects-showcase por Golden Grama
group_id: NBS-TSK-2026-134
category: frontend
subcategories:
  - portfolio
  - copy
  - home
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/home/projects-showcase/index.tsx
  - doc/change-log/**
verification:
  - npm run changes:validate
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
---

# Resumen corto

El tercer caso visible de `projects-showcase` deja de presentar `Nebula Studios` y pasa a mostrar `Golden Grama` como proyecto destacado.

## Contexto / problema

La sección de proyectos seguía usando `Nebula Studios` como tercer caso, pero Martín pidió sustituirlo por `Golden Grama`. Dejar solo el título cambiado habría mantenido metadatos y problema resuelto desalineados con el nuevo cliente.

## Cambio realizado

- se sustituye el tercer item del catálogo local de `projects-showcase`
- el caso pasa a mostrar `Golden Grama` como nombre visible
- se actualizan `clientType`, `sector`, `problemSolved` e `imageAlt` para que el card ya no describa el caso anterior
- el stack visible se normaliza a `Next.js`, `TypeScript` y `Supabase` para mantener coherencia con el resto del bloque

## Objetivo

Hacer que el portfolio visible de la home refleje el caso que Martín quiere enseñar en esta posición sin dejar residuos narrativos del proyecto anterior.

## Impacto arquitectonico

Ajuste localizado en el catálogo inline de `components/home/projects-showcase/index.tsx`. No cambia la coreografía, la primitive ni la mecánica de scroll; solo el contenido del tercer panel.

## Desglose denso

- el primer y segundo caso (`Canal3 Networks` y `Future Nova`) no cambian
- la sustitución conserva la misma posición dentro de la secuencia y el mismo asset conceptual para no reabrir ahora una decisión visual independiente
- el cambio aprovecha contexto ya verificado en el repo: `Golden Grama` existe también como testimonio público dentro de `components/home/testimonials/content.ts`

## Validacion

- `npm run changes:validate`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- el tercer caso sigue usando un visual conceptual repo-safe, no una captura final específica de `Golden Grama`
- si quieres reflejar el proyecto con más fidelidad después, el siguiente paso lógico sería cerrar copy exacto, stack real y asset propio del caso

## Notas para presupuesto

Cambio visible pero acotado: sustitución de contenido dentro de una surface pública ya integrada, sin rehacer motion ni layout.
