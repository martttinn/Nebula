---
change_id: NBS-CHG-2026-05-06-149
date: 2026-05-06
title: Adelanto del completado del path de How we work
group_id: NBS-TSK-2026-135
category: frontend
subcategories:
  - motion
  - interaction
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
  - components/home/how-we-work/constants.ts
  - components/home/how-we-work/index.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

El path SVG de `How we work` deja de consumir todo el `scrollYProgress` de la sección y pasa a completar su dibujo antes, dentro del tramo todavía visible del bloque.

## Contexto / problema

El progreso del path se estaba mapeando sobre `0 -> 1` de la sección completa. Eso hacía que el recorrido terminara demasiado tarde: cuando el usuario ya estaba prácticamente saliendo del bloque y entrando en la siguiente sección.

## Cambio realizado

- se añade `PATH_DRAW_END_PROGRESS` como constante específica de la sección
- `strokeDashoffset` pasa a interpolarse sobre `[0, PATH_DRAW_END_PROGRESS]` en lugar de `[0, 1]`

## Objetivo

Completar la animación del recorrido dentro del tramo útil de lectura de la sección, sin tocar la forma del path ni la disposición de los clusters.

## Impacto arquitectonico

Cambio local de frontend en la orquestación del progreso. No afecta a mobile ni a la geometría del SVG.

## Desglose denso

- el path mantiene el mismo largo total y la misma geometría
- la animación simplemente se comprime para cerrar antes
- el último tramo de scroll de la sección queda libre de dependencia crítica para el completado del dibujo

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- el valor `0.82` es intencionalmente conservador, pero sigue siendo una calibración visual; si se retocan mucho alturas o timings de la sección puede requerir un nuevo ajuste fino

## Notas para presupuesto

Refinamiento de motion y ritmo de scroll con impacto directo en percepción de calidad y legibilidad narrativa del bloque.
