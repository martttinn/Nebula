---
change_id: NBS-CHG-2026-05-06-124
date: 2026-05-06
title: Opacidad total del fondo de los nodos en how we work
group_id: NBS-TSK-2026-110
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

Los nodos del timeline `How we work` pasan a usar un fondo completamente opaco para que la línea y cualquier capa inferior dejen de transparentarse a través de su masa.

## Contexto / problema

El gradiente radial del fondo de los nodos seguía usando stops con alpha parcial, lo que permitía que el recorrido luminoso del path se leyera ligeramente a través del propio hito.

## Cambio realizado

- se sustituyen los stops `rgba()` del gradiente de `NODE_SURFACE_BACKGROUND` por stops `rgb()` totalmente opacos en `components/home/how-we-work.tsx`

## Objetivo

Hacer que los nodos se lean como masas sólidas y limpias, sin contaminación visual de la línea inferior.

## Impacto arquitectonico

Cambio local de frontend sin tocar layout, medición del path ni comportamiento responsive.

## Desglose denso

- el ajuste se resuelve en la primitive visual compartida por nodos desktop y móvil
- no cambia color, geometría ni composición general del hito
- solo se elimina la transparencia parcial del gradiente de superficie

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- el borde del nodo mantiene su tratamiento visual actual; el cambio afecta al fondo del hito
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual pequeño pero visible sobre una primitive central del timeline público.
