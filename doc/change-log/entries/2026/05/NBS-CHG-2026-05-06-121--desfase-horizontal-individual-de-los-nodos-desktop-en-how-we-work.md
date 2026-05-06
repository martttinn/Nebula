---
change_id: NBS-CHG-2026-05-06-121
date: 2026-05-06
title: Desfase horizontal individual de los nodos desktop en how we work
group_id: NBS-TSK-2026-107
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

Las parejas nodo-card del timeline `How we work` pasan a recolocarse horizontalmente como bloque, de modo que cada hito puede ocupar una profundidad distinta sobre el eje `x` sin perder una distancia constante respecto a su card.

## Contexto / problema

Aunque la sección ya alternaba cards y nodos entre ambos lados, los hitos seguían cayendo siempre sobre la misma vertical extrema de cada lado. Eso hacía que el recorrido tuviera un patrón demasiado predecible y mecánico.

## Cambio realizado

- se sustituye el movimiento del nodo aislado por `DESKTOP_CLUSTER_PLACEMENTS` en `components/home/how-we-work.tsx`
- cada pareja nodo-card define una coordenada horizontal real del nodo dentro del ancho completo de la fila mediante `nodeXPercent`, más un ajuste fino adicional en `x`
- la fila desktop deja de resolver la composición en columnas laterales rígidas y pasa a anclar cada cluster de forma absoluta dentro del row
- la separación entre nodo y card se fija con un `gap` constante dentro del cluster
- el nodo recupera masa circular estable con `shrink-0`
- el SVG no se hardcodea ni se desacopla: la línea sigue midiéndose desde la posición real del nodo ya recolocado

## Objetivo

Romper la sensación de plantilla repetida y hacer que unos hitos respiren cerca del borde, otros queden en una zona intermedia y otros se acerquen más al centro, manteniendo siempre la misma distancia visual entre cada nodo y su card.

## Impacto arquitectonico

Cambio local de frontend sobre una surface pública. No introduce nuevos contratos, dependencias ni cambios de layout mobile.

## Desglose denso

- antes, al mover solo el nodo dentro de su rail, la distancia entre nodo y card cambiaba entre fases
- después, aunque el cluster ya se movía junto, seguía oliendo a columnas porque cada pareja seguía encajada en un lado predeterminado del grid
- ahora nodo y card forman un cluster único por lado con separación interna estable y una posición `x` real dentro de toda la fila
- la posición final de cada pareja sale de un anclaje horizontal por porcentaje más un microajuste fino en píxeles
- como `updatePathLayout` calcula el centro real de cada nodo en runtime, la línea se recompone sobre la geometría resultante y no queda desfasada

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- los valores actuales son una calibración visual inicial y pueden seguir afinándose por nodo para acercar o alejar cada hito del centro
- `DEBUG_BORDERS` sigue activo en `components/home/how-we-work.tsx`, por lo que los outlines debug continúan visibles en runtime
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual localizado para reducir repetición compositiva y reforzar el carácter de una sección editorial protagonista.
