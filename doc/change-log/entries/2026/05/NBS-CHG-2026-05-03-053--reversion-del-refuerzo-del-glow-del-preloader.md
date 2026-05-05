---
change_id: NBS-CHG-2026-05-03-053
date: 2026-05-03
title: Reversión del refuerzo del glow del preloader
group_id: NBS-TSK-2026-053
category: frontend
subcategories:
  - branding
  - motion
  - components
origin: client-request
complexity: low
scope: component-local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/ui/preloader.tsx
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

Se revierte el refuerzo reciente del glow lila detrás del símbolo del preloader y se restaura el aura más tenue y contenida que tenía el loader antes de ese ajuste.

## Contexto / problema

Martín pidió deshacer el aumento de tamaño e intensidad del glow del loader y volver al estado visual previo.

## Cambio realizado

- se elimina la composición de glow en dos capas
- se recupera el glow único radial con menor tamaño, menor blur y menor intensidad
- se retiran de la documentación las referencias al aura reforzada del preloader

## Objetivo

Restaurar el look anterior del loader sin tocar su estructura, timing ni comportamiento de salida.

## Impacto arquitectónico

Reversión localizada de la primitive del preloader y de la documentación asociada.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si más adelante se quisiera reabrir el glow, convendría hacerlo con una iteración visual en navegador en vez de subir intensidad a ciegas

## Notas para presupuesto

Reversión menor de branding visual.
