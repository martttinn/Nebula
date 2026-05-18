---
change_id: NBS-CHG-2026-05-04-166
date: 2026-05-04
title: Simplificacion de la cabecera visible de la seccion de servicios
group_id: NBS-TSK-2026-144
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

La seccion de servicios deja una cabecera mas directa: el titulo principal pasa a ser `Nuestros Servicios` y desaparece el subheading explicativo.

## Contexto / problema

Tras integrar el carrusel de servicios, la cabecera seguia entrando con un titulo mas largo y un parrafo de apoyo que hacia la seccion mas densa de lo necesario.

## Cambio realizado

- se cambia el `h2` por `Nuestros Servicios`
- se elimina el parrafo de apoyo bajo el titulo

## Objetivo

Reducir densidad visual y hacer que la entrada a la seccion sea mas clara y mas inmediata.

## Impacto arquitectonico

El cambio queda aislado en `SectionHeading` dentro de `components/home/services-carousel.tsx`; no altera el layout sticky, el carrusel ni los datos.

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- no se ha hecho revision visual automatizada en navegador en esta sesion

## Notas para presupuesto

Refinamiento puntual de copy visible y jerarquia de una seccion publica.
