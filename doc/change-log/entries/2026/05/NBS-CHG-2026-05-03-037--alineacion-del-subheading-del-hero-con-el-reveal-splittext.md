---
change_id: NBS-CHG-2026-05-03-037
date: 2026-05-03
title: Alineación del subheading del hero con el reveal `SplitText`
group_id: NBS-TSK-2026-037
category: frontend
subcategories:
  - components
  - typography
  - motion
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
  - components/home/hero-lead.tsx
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

El subheading del hero deja de usar `DecryptedText` y pasa a usar el mismo reveal `SplitText` del heading, con una cadencia más calmada para no competir con el titular.

## Contexto / problema

Martín pidió aplicar al subheading el mismo efecto de aparición que ya usa el heading del hero.

## Cambio realizado

- se sustituye `DecryptedText` por `SplitText` en el subheading
- se elimina la capa extra de `fade` del párrafo para que el reveal sea realmente el mismo lenguaje visual
- se ajusta el timing del subheading para que siga leyendo como supporting copy

## Objetivo

Unificar el lenguaje de entrada del bloque principal del hero sin perder jerarquía tipográfica.

## Impacto arquitectónico

El runtime del hero reduce variedad de motion y se apoya en una sola primitive para el reveal principal del copy.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- `DecryptedText` permanece disponible en `components/ui/` para otros casos de uso futuros, aunque ya no se use en el hero actual

## Notas para presupuesto

Refinamiento menor de consistencia visual y motion del hero.
