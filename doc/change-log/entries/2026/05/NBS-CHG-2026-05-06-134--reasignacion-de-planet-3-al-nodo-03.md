---
change_id: NBS-CHG-2026-05-06-134
date: 2026-05-06
title: Reasignacion de planet 3 al nodo 03
group_id: NBS-TSK-2026-120
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

El nodo `03` del timeline pasa a usar `planet-3.png` en lugar de `planet-4.png`.

## Contexto / problema

Tras la reasignación anterior del nodo `02`, el usuario pidió explícitamente que `Desarrollo` quedase vinculado al asset `planet-3`.

## Cambio realizado

- `03` deja de usar `/planets/planet-4.png`
- `03` pasa a usar `/planets/planet-3.png`
- el resto del mapeo actual de nodos se mantiene intacto

## Objetivo

Refinar la asignación de assets entre pasos del timeline sin tocar tamaños, motion ni composición.

## Impacto arquitectonico

Cambio declarativo y local sobre `STEPS`. No afecta primitives ni geometría del componente.

## Desglose denso

- la modificación se limita a una ruta de imagen
- `02` conserva `planet-4`
- `03` pasa a compartir asset con la nomenclatura pedida por el usuario

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- si quieres que cada nodo vuelva a tener una imagen única, habrá que revisar de nuevo el inventario de `public/planets`
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Calibración visual puntual y de baja complejidad sobre la dirección de arte del timeline.
