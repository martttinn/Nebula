---
change_id: NBS-CHG-2026-05-03-041
date: 2026-05-03
title: Corrección del fondo transparente del CTA `Contactar` en reposo
group_id: NBS-TSK-2026-041
category: frontend
subcategories:
  - components
  - bugs
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
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se corrige el estado base del CTA `Contactar` del navbar para que el interior quede realmente transparente en reposo, manteniendo el relleno lila solo en `hover`.

## Contexto / problema

El fondo oscuro por defecto de la primitive `StarBorder` seguía imponiéndose en el interior del botón aunque el navbar ya intentaba dejarlo transparente.

## Cambio realizado

- se fuerza `!bg-transparent` en el estado base del inner shell del CTA
- se fuerza `group-hover:!bg-[#534AB7]` para conservar el relleno lila solo al hacer `hover`

## Objetivo

Hacer que el botón se lea como outlined/transparente en reposo y relleno en lila solo cuando interactúas con él.

## Impacto arquitectónico

Bugfix localizado en la integración del navbar, sin tocar la primitive `StarBorder`.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si reaparece un conflicto similar en otros consumidores de `StarBorder`, convendrá extraer una variante explícita en vez de depender de overrides locales

## Notas para presupuesto

Corrección menor de integración visual.
