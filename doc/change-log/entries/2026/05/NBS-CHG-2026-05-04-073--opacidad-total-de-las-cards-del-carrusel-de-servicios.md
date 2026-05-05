---
change_id: NBS-CHG-2026-05-04-073
date: 2026-05-04
title: Opacidad total de las cards del carrusel de servicios
group_id: NBS-TSK-2026-073
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

Las cards del carrusel de servicios pasan a ser opacas en todos sus estados: dejan de perder opacidad en los laterales y abandonan el fondo semitransparente.

## Contexto / problema

La lectura visual del carrusel seguia mostrando cards translúcidas, tanto por la opacidad variable del arco como por el fondo del contenedor con alpha.

## Cambio realizado

- se elimina la modulacion de `opacity` por distancia en `computeArcTransforms`
- el fondo base de `motion.article` pasa de `bg-[#0B0C16]/84` a `bg-[#0B0C16]`
- se retira `backdrop-blur-xl` de la shell de card
- la capa de gradiente interna deja de usar alpha en su tramo lineal principal
- `DESIGN.md` se actualiza para exigir cards opacas incluso en overlap

## Objetivo

Hacer que las cards se sientan como piezas sólidas y premium, no como cristales translúcidos.

## Impacto arquitectonico

El ajuste queda encapsulado en `components/home/services-carousel.tsx` y en el contrato visual del carrusel; no altera sticky, snap ni datos.

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- el repo no expone `npm run design:lint`
- no se ha hecho revision visual automatizada en navegador en esta sesion

## Notas para presupuesto

Refinamiento puntual de materialidad visual en una sección pública crítica.
