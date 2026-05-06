---
change_id: NBS-CHG-2026-05-06-135
date: 2026-05-06
title: Reasignacion de planet 6 al nodo 04
group_id: NBS-TSK-2026-121
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

El nodo `04` del timeline pasa a usar `planet-6.png` en lugar de `planet-5.png`.

## Contexto / problema

Tras ajustar el mapping del resto de nodos, el usuario pidió usar el nuevo asset `planet-6` específicamente en `Evolución`.

## Cambio realizado

- `04` deja de usar `/planets/planet-5.png`
- `04` pasa a usar `/planets/planet-6.png`
- el resto del reparto actual de planetas se mantiene igual

## Objetivo

Refinar la dirección de arte del último nodo sin tocar composición, tamaños ni geometría del timeline.

## Impacto arquitectonico

Cambio local y declarativo sobre `STEPS`. No afecta primitives, animación ni cálculo del path.

## Desglose denso

- la modificación se limita a una única ruta de asset
- el nodo `04` conserva el mismo tratamiento visual que el resto de nodos ilustrados
- no cambia el tamaño especial de los nodos con imagen

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- si quieres volver a equilibrar mejor la variedad entre nodos, habrá que revisar el inventario completo de `public/planets`
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Pulido visual puntual y de baja complejidad sobre el mapping de assets del timeline.
