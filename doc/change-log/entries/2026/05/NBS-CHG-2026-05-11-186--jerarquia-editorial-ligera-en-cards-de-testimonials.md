---
change_id: NBS-CHG-2026-05-11-186
date: 2026-05-11
title: Jerarquia editorial ligera en cards de testimonials
group_id: NBS-TSK-2026-162
category: frontend
subcategories:
  - copy
  - typography
  - cards
origin: client-request
complexity: low
scope: component-local
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
  - components/home/testimonials/archive.ts
  - components/home/testimonials/index.tsx
  - DESIGN.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Las cards de `testimonials` pasan de renderizar reseñas largas como display text a una jerarquía más ligera de `headline` + `summary`.

## Contexto / problema

Las reseñas reales eran demasiado largas para mostrarse completas con `Syne` en peso alto e itálica. El resultado cargaba visualmente cada card y hacía que el testimonio compitiese con la estructura de la sección.

## Cambio realizado

- `archive.ts` conserva el `quote` completo como fuente repo-safe y añade `headline` + `summary` para el copy visible.
- `index.tsx` renderiza el titular corto en `Syne` y el contexto secundario en `Inter`, con menor peso visual.
- `DESIGN.md` actualiza el canon de `testimonials` para prohibir usar párrafos largos como display text.
- `technical-reference.md` refleja el nuevo contrato de contenido de la carpeta.

## Objetivo

Reducir densidad visual en las cards de prueba social sin perder trazabilidad del testimonio completo ni la presencia editorial de la sección.

## Impacto arquitectonico

El cambio mantiene el ownership en `components/home/testimonials/`. No altera el stage sticky, el flujo móvil ni la card final de CTA; solo ajusta el contrato local de contenido y su render.

## Desglose denso

- `quote`: reseña completa preservada como fuente verificable
- `headline`: frase principal corta que sostiene la jerarquía visual
- `summary`: contexto secundario más ligero para no saturar la card
- desktop y móvil comparten la misma jerarquía editorial

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run changes:sync`

## Pendientes / limites

La aprobación estética final depende de revisar la sección en navegador con scroll real, especialmente por la relación entre el claim corto y el espacio disponible en la card desktop.

## Notas para presupuesto

Refinamiento visible de conversión y legibilidad en una sección pública crítica, con actualización de contenido, render y canon visual.
