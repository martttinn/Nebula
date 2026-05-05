---
change_id: NBS-CHG-2026-05-05-098
date: 2026-05-05
title: Retirada del eyebrow del header de how we work
group_id: NBS-TSK-2026-098
category: frontend
subcategories:
  - ui-ux-redesign
  - copy-adjustment
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
  - components/home/how-we-work.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La cabecera de `How we work` elimina su eyebrow superior y mantiene solo el heading principal como pieza visible del header.

## Contexto / problema

La seccion ya expresaba su identidad con el propio heading principal. El eyebrow superior repetia la misma idea y añadia una capa de microcopy que no aportaba suficiente valor visual.

## Cambio realizado

- se elimina el bloque `<p>` superior `Cómo trabajamos` del header en `components/home/how-we-work.tsx`
- se mantiene intacto el `h2` principal y el resto de la composicion de la seccion

## Objetivo

Reducir ruido visual en la cabecera de la seccion y reforzar una jerarquia mas limpia alrededor del heading principal.

## Impacto arquitectonico

El cambio es local a un componente de frontend y no introduce nuevos contratos, datos ni dependencias.

## Desglose denso

- la cabecera conserva el mismo contenedor, motion y espaciado general
- solo desaparece la capa de eyebrow; el `h2` sigue actuando como ancla semantica de la seccion
- el debug activo de la cabecera no se toca en esta iteracion

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- los bordes debug siguen activos en runtime dentro de esta seccion hasta que se desactive su flag local
- `npm run changes:sync` sigue sin poder ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual puntual de copy y jerarquia en la cabecera de una seccion publica.
