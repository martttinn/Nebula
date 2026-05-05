---
change_id: NBS-CHG-2026-05-03-039
date: 2026-05-03
title: Reducción de la escala hover del CTA `Contactar` a `1.15`
group_id: NBS-TSK-2026-039
category: frontend
subcategories:
  - components
  - branding
  - interaction
origin: client-request
complexity: low
scope: cross-cutting
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/layout/navbar.tsx
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se reduce la escala del `hover` del CTA `Contactar` del navbar desde `1.25` a `1.15`, manteniendo el fill lila y el borde animado.

## Contexto / problema

La escala anterior resultaba demasiado agresiva para la interacción pedida.

## Cambio realizado

- se sustituye `hover:scale-125` por `hover:scale-[1.15]`
- se actualizan las referencias documentales que fijaban el valor anterior

## Objetivo

Mantener una respuesta interactiva clara sin sobredimensionar el CTA dentro del navbar.

## Impacto arquitectónico

Ajuste menor de microinteracción sobre la integración del navbar, sin cambios en la primitive `StarBorder`.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si aún se percibe grande en móvil, el siguiente paso razonable sería modular la escala por breakpoint

## Notas para presupuesto

Refinamiento menor de interacción.
