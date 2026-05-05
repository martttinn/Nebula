---
change_id: NBS-CHG-2026-05-04-060
date: 2026-05-04
title: Reducción de la pausa entre heading y subheading en la entrada del hero
group_id: NBS-TSK-2026-060
category: frontend
subcategories:
  - hero
  - motion
  - copy-flow
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
  - components/home/hero-lead.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
---

# Resumen corto

El subheading del hero empieza ahora antes tras completar el heading, reduciendo la pausa perceptible entre ambos reveals.

## Contexto / problema

Tras el ajuste anterior de la secuencia del hero, seguía notándose una pequeña pausa entre el final del heading y el arranque del subheading, así que se pidió apretar todavía más ese encadenado.

## Cambio realizado

- se reduce el delay de activación del subheading de `40ms` a `0ms`

## Objetivo

Hacer que la entrada del copy principal se sienta prácticamente inmediata entre ambos niveles, manteniendo solo el corte natural del propio `onComplete` del heading.

## Impacto arquitectónico

El cambio queda encapsulado en `HeroLead` y no modifica el resto de la secuencia, los CTAs ni la flecha de scroll.

## Validación

- `npm run lint`
- `npm run build`

## Pendientes / límites

- no se ha hecho revisión visual automatizada en navegador en esta sesión

## Notas para presupuesto

Refinamiento puntual de timing en una surface pública crítica.
