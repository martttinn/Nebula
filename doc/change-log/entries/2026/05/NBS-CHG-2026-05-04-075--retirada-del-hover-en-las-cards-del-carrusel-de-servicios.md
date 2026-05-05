---
change_id: NBS-CHG-2026-05-04-075
date: 2026-05-04
title: Retirada del hover en las cards del carrusel de servicios
group_id: NBS-TSK-2026-075
category: frontend
subcategories:
  - services
  - cards
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
  - docs
backend_sensitive: false
files_touched:
  - components/home/services-carousel.tsx
  - DESIGN.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
---

# Resumen corto

Las cards del carrusel de servicios dejan de responder al hover y pasan a depender solo de la geometría controlada por scroll.

## Contexto / problema

La sección seguía manteniendo una microescala al pasar el cursor, pero el patrón de navegación real del carrusel se basa en scroll vertical u horizontal. Esa mezcla introducía ruido visual y además podía degradar la sensación de estabilidad.

## Cambio realizado

- se elimina `whileHover` de `ServiceCard`
- se retira el prop `reducedMotion` de `ServiceCard` al dejar de ser necesario en esa primitive
- `DESIGN.md` se actualiza para prohibir microinteracciones de hover en este patrón

## Objetivo

Hacer que el carrusel se perciba como una composición sticky controlada por scroll y snap, no como una colección de cards interactivas por puntero.

## Impacto arquitectonico

El cambio queda encapsulado en el componente del carrusel y en su contrato visual; no altera datos, sticky ni puntos de snap.

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- el repo no expone `npm run design:lint`
- no se ha hecho revision visual automatizada en navegador en esta sesion

## Notas para presupuesto

Ajuste fino de interacción para alinear el comportamiento del carrusel con su intención visual y mecánica real.
