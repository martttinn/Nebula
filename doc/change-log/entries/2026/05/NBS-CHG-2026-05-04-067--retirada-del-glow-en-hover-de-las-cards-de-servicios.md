---
change_id: NBS-CHG-2026-05-04-067
date: 2026-05-04
title: Retirada del glow en hover de las cards de servicios
group_id: NBS-TSK-2026-067
category: frontend
subcategories:
  - services
  - hover
  - motion
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

Las cards del carrusel de servicios dejan de añadir glow al hacer hover, pero conservan el resto de la microinteracción.

## Contexto / problema

El hover de las cards reforzaba el estado con un `boxShadow` cromático basado en el acento de cada servicio. Martín pidió retirar solo ese glow.

## Cambio realizado

- se elimina `boxShadow` del objeto `whileHover` en `ServiceCard`

## Objetivo

Reducir el ruido visual del hover sin eliminar por completo la respuesta interactiva de la card.

## Impacto arquitectonico

El ajuste queda aislado en `components/home/services-carousel.tsx` y no altera datos, sticky, navegación ni estructura de la sección.

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- no se ha hecho revision visual automatizada en navegador en esta sesion

## Notas para presupuesto

Refinamiento puntual de interacción visual sobre una sección pública crítica.
