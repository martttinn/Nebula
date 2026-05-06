---
change_id: NBS-CHG-2026-05-06-133
date: 2026-05-06
title: Reasignacion del asset del nodo 02 al planeta del nodo 03
group_id: NBS-TSK-2026-119
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

El nodo `02` del timeline pasa a usar el mismo asset planetario que el nodo `03`.

## Contexto / problema

Tras la sustitución de todos los nodos por imágenes, el usuario pidió explícitamente que `Arquitectura` heredase la imagen usada en `Desarrollo`.

## Cambio realizado

- `02` deja de usar `/planets/planet-3.png`
- `02` pasa a usar `/planets/planet-4.png`
- el nodo `03` mantiene su imagen actual

## Objetivo

Reasignar la dirección de arte del segundo nodo sin tocar tamaño, geometría ni el resto del sistema visual.

## Impacto arquitectonico

Cambio local de frontend sobre el dataset `STEPS`. No afecta la primitive del nodo ni el cálculo del path.

## Desglose denso

- la modificación es puramente declarativa: solo cambia una ruta de asset
- no se alteran ni `imageAlt` ni la configuración visual del nodo ilustrado
- el resultado deja a `02` y `03` compartiendo la misma imagen

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- si luego quieres volver a diferenciar `02` y `03`, hará falta incorporar otro asset o reasignar uno existente
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Ajuste visual puntual y de baja complejidad sobre el inventario de assets del timeline.
