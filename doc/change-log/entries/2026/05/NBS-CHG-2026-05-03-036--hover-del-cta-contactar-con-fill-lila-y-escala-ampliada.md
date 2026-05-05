---
change_id: NBS-CHG-2026-05-03-036
date: 2026-05-03
title: Hover del CTA `Contactar` con fill lila y escala ampliada
group_id: NBS-TSK-2026-036
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

El CTA `Contactar` del navbar ahora rellena su interior en lila de marca al hacer `hover` y escala el conjunto hasta `1.25`, manteniendo el borde animado de `StarBorder`.

## Contexto / problema

Martín pidió reforzar el estado interactivo del CTA principal del navbar sin sustituir la primitive `StarBorder`.

## Cambio realizado

- se añade escala `1.25` al contenedor del CTA en `hover`
- se rellena el interior del botón con lila de marca en `hover`
- se mantiene el borde animado y el estado base transparente

## Objetivo

Dar al CTA principal una respuesta interactiva más decidida y evidente dentro del navbar premium.

## Impacto arquitectónico

Cambio localizado en la integración del navbar, sin alterar la API ni el comportamiento base de la primitive `StarBorder`.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- una escala `1.25` es deliberadamente agresiva; si interfiriera con el layout en móvil o tablet, habrá que modularla por breakpoint

## Notas para presupuesto

Refinamiento menor de interacción sobre CTA principal.
