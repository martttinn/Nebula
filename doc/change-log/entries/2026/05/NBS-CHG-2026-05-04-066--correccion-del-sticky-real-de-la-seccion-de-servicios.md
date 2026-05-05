---
change_id: NBS-CHG-2026-05-04-066
date: 2026-05-04
title: Correccion del sticky real de la seccion de servicios
group_id: NBS-TSK-2026-066
category: frontend
subcategories:
  - services
  - layout
  - sticky
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

La seccion de servicios deja libre su contenedor exterior para que el sticky interno del carrusel funcione correctamente.

## Contexto / problema

La seccion ya incluia un `sticky` interno en desktop, pero el `section` padre seguia marcado con `overflow-hidden`, una combinacion que puede impedir que `position: sticky` se comporte como se espera.

## Cambio realizado

- se elimina `overflow-hidden` del `section` raiz de `ServicesCarouselSection`

## Objetivo

Permitir que el carrusel sticky de servicios se ancle realmente al viewport sin reescribir su mecanica ni su estructura.

## Impacto arquitectonico

El cambio queda aislado en la shell del componente y no altera el catalogo, el arco de cards ni la version movil de la seccion.

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- no se ha hecho revision visual automatizada en navegador en esta sesion

## Notas para presupuesto

Fix localizado de comportamiento CSS con impacto directo en la experiencia de scroll.
