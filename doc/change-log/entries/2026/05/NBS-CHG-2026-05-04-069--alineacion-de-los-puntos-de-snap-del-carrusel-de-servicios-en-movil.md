---
change_id: NBS-CHG-2026-05-04-069
date: 2026-05-04
title: Alineacion de los puntos de snap del carrusel de servicios en movil
group_id: NBS-TSK-2026-069
category: frontend
subcategories:
  - services
  - mobile
  - snap
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

Los puntos de snap del carrusel de servicios en movil pasan a coincidir con el estado en que la card activa queda centrada y completamente vertical.

## Contexto / problema

El snap horizontal ya existia en CSS, pero la geometria de las cards se calculaba con una progresion comprimida al `86%` del recorrido, lo que hacia que el estado visual centrado no coincidiera exactamente con cada snap.

## Cambio realizado

- se renombra la compresion de desktop a `DESKTOP_ANIMATION_END_PROGRESS`
- `computeArcTransforms` pasa a aceptar un `endProgress` configurable
- desktop conserva su tramo comprimido para el arco sticky
- movil usa el rango completo `0..1`, de modo que cada snap corresponde a una card centrada y vertical
- el calculo del `activeIndex` se unifica en una helper y respeta el rango propio de cada runtime

## Objetivo

Sincronizar el scroll horizontal real con el estado visual exacto del carrusel movil.

## Impacto arquitectonico

El ajuste queda aislado en `components/home/services-carousel.tsx` y no altera el catalogo de servicios ni el sticky desktop.

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- no se ha hecho revision visual automatizada en navegador en esta sesion

## Notas para presupuesto

Fix localizado de alineacion entre snap y composicion visual.
