---
change_id: NBS-CHG-2026-05-03-044
date: 2026-05-03
title: Hover del CTA `Contactar` con fill lila y escala `1.05`
group_id: NBS-TSK-2026-044
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

Se reintroduce un hover más contenido para el CTA `Contactar`: fill lila de marca y escala `1.05`, manteniendo el estado base transparente.

## Contexto / problema

Martín pidió recuperar un feedback de hover visible para el CTA, pero más comedido que los intentos anteriores.

## Cambio realizado

- se añade `hover:scale-[1.05]` al contenedor del CTA
- el fondo base sigue siendo transparente
- el hover rellena el interior en lila de marca y refuerza el borde al mismo tono

## Objetivo

Dar al CTA una respuesta interactiva clara sin sobredimensionar el botón dentro del navbar.

## Impacto arquitectónico

Ajuste localizado en la integración del navbar, sin alterar la primitive reusable `StarBorder`.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si en móvil el hover se sintiera todavía demasiado activo, el siguiente paso razonable sería modular la escala por breakpoint

## Notas para presupuesto

Refinamiento menor de microinteracción.
