---
change_id: NBS-CHG-2026-05-04-071
date: 2026-05-04
title: Retirada del eyebrow de la cabecera de servicios
group_id: NBS-TSK-2026-071
category: frontend
subcategories:
  - services
  - copy
  - hierarchy
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/home/services-carousel.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
---

# Resumen corto

La cabecera de la seccion de servicios elimina el eyebrow `Servicios` y deja solo el titulo principal `Nuestros Servicios`.

## Contexto / problema

Tras simplificar el bloque superior de la seccion, todavia quedaba un eyebrow que hacia la entrada visual menos seca de lo deseado.

## Cambio realizado

- se elimina el `p` superior con el label `Servicios`
- se retira el margen superior extra del `h2`

## Objetivo

Reducir densidad visual y dejar una cabecera mas directa y limpia.

## Impacto arquitectonico

El ajuste queda encapsulado en `SectionHeading` y no altera el resto de la seccion.

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- no se ha hecho revision visual automatizada en navegador en esta sesion

## Notas para presupuesto

Refinamiento puntual de copy visible y jerarquia de la seccion.
