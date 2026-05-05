---
change_id: NBS-CHG-2026-05-04-076
date: 2026-05-04
title: Reestructuracion de las cards del carrusel de servicios
group_id: NBS-TSK-2026-076
category: frontend
subcategories:
  - services
  - cards
  - visual-system
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - data
  - docs
backend_sensitive: false
files_touched:
  - components/home/services-carousel.tsx
  - data/services.ts
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
  - "2026-05-04 — Las cards del carrusel de servicios se simplifican a heading, símbolo 3D y descripción"
---

# Resumen corto

Las cards del carrusel de servicios pasan a una estructura fija de `heading arriba / símbolo 3D en el centro / descripción abajo`, eliminando el `eyebrow` y la iconografía de categoría.

## Contexto / problema

La versión anterior seguía usando una jerarquía heredada de `eyebrow + icono + texto`, menos alineada con el lenguaje premium actual de Nebula y con más ruido estructural del necesario en el catálogo de datos.

## Cambio realizado

- se elimina el `eyebrow` visible de cada card
- se sustituye la iconografía específica por el símbolo 3D oficial de Nebula en posición central
- el heading pasa a anclarse arriba del todo y la descripción al bloque inferior
- `data/services.ts` se simplifica eliminando los campos `eyebrow` e `icon`
- se actualizan `DESIGN.md`, la referencia técnica y la memoria operativa del proyecto

## Objetivo

Hacer que las cards lean más limpias, más de marca y menos como un patrón genérico de feature cards.

## Impacto arquitectonico

El cambio se mantiene local al carrusel y al catálogo de servicios, pero reduce superficie muerta en `data/services.ts` al alinear el modelo con el runtime real.

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- no se ha hecho revision visual automatizada en navegador en esta sesion
- el repo no expone `npm run changes:sync`

## Notas para presupuesto

Refinamiento de composición visual con limpieza estructural asociada en datos y documentación viva.
