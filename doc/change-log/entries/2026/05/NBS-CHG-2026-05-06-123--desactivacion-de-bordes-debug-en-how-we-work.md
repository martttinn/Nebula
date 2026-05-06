---
change_id: NBS-CHG-2026-05-06-123
date: 2026-05-06
title: Desactivacion de bordes debug en how we work
group_id: NBS-TSK-2026-109
category: frontend
subcategories:
  - ui-ux-redesign
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/home/how-we-work.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
---

# Resumen corto

La sección `How we work` deja de mostrar los outlines de inspección visual en runtime al desactivar el flag local de debug.

## Contexto / problema

Tras varias iteraciones geométricas sobre el timeline de proceso, la superficie pública seguía mostrando bordes de depuración que ya no eran necesarios para revisar el layout.

## Cambio realizado

- se cambia `DEBUG_BORDERS` a `false` en `components/home/how-we-work.tsx`

## Objetivo

Retirar ruido visual de inspección y devolver la sección a un estado limpio de presentación.

## Impacto arquitectonico

Cambio local de frontend sin afectar layout, path SVG ni contratos de datos.

## Desglose denso

- el helper `debugOutline()` permanece disponible para futuras iteraciones
- solo cambia el estado del flag que controla su salida en runtime

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- si vuelve a hacer falta inspección visual, bastará con reactivar el flag local
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Ajuste operativo mínimo pero visible sobre la superficie pública del timeline de proceso.
