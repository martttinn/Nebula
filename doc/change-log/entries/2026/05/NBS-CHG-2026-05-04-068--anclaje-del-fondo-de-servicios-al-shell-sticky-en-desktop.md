---
change_id: NBS-CHG-2026-05-04-068
date: 2026-05-04
title: Anclaje del fondo de servicios al shell sticky en desktop
group_id: NBS-TSK-2026-068
category: frontend
subcategories:
  - services
  - sticky
  - background
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

El fondo de la seccion de servicios deja de desplazarse de forma perceptible en desktop porque ahora vive dentro del mismo shell sticky que el contenido visible.

## Contexto / problema

Aunque el carrusel ya era sticky, el fondo de la seccion seguia renderizado en el `section` exterior, que recorre todo el runway vertical. Eso hacia visible un scroll del decorado mientras heading y cards permanecian anclados.

## Cambio realizado

- se mueve el fondo desktop al interior del contenedor sticky de `DesktopServicesCarousel`
- el fondo del `section` exterior pasa a mostrarse solo en movil mediante `md:hidden`

## Objetivo

Conseguir que la seccion se lea como un bloque realmente fijo durante el tramo sticky, sin drift visual entre fondo y contenido.

## Impacto arquitectonico

El ajuste queda encapsulado en `components/home/services-carousel.tsx` y no modifica ni el progreso del carrusel ni el comportamiento de la version movil.

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- no se ha hecho revision visual automatizada en navegador en esta sesion

## Notas para presupuesto

Fix localizado de scroll/background con impacto directo en la percepcion premium del carrusel.
