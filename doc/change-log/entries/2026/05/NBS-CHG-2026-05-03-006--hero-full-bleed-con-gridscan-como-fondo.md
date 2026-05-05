---
change_id: NBS-CHG-2026-05-03-006
date: 2026-05-03
title: Hero full-bleed con GridScan como fondo del viewport
group_id: NBS-TSK-2026-006
category: frontend
subcategories:
  - ui-ux-redesign
  - layout
  - visual-direction
origin: client-request
complexity: medium
scope: route-level
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - routes
  - web
  - docs
backend_sensitive: false
files_touched:
  - app/page.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se recompone el hero de la home para que GridScan actúe como fondo real a ancho completo, ocupando toda la pantalla inicial del sitio.

## Contexto / problema

La integración inicial de GridScan funcionaba como una capa visual dentro de un contenedor acotado. Martín pidió convertirlo en el fondo real del hero y hacer que esa sección ocupara el 100% del ancho de pantalla y `100vh`.

## Cambio realizado

- se elimina el shell contenido que envolvía el hero
- se convierte la primera sección en un bloque full-bleed
- GridScan pasa a ocupar el fondo de todo el hero
- se recalibran overlays, halos y paneles inferiores para mantener contraste y legibilidad

## Objetivo

Hacer que la identidad visual de Nebula se perciba desde el primer frame como una experiencia de hero completa, no como una demo insertada dentro de una tarjeta.

## Impacto arquitectónico

El cambio mantiene la misma separación técnica:

- `app/page.tsx` sigue siendo Server Component
- `GridScan` sigue aislado como isla cliente

Lo que cambia es la composición: el hero ya no está restringido por `section-shell`, sino que utiliza el viewport completo como lienzo visual.

## Desglose denso

- se conserva la jerarquía de contenido sobre un contenedor centrado `max-width`
- el fondo se resuelve mediante la suma de `GridScan`, rejilla tenue, gradientes radiales y una caída oscura inferior
- la sección usa `min-h-[100vh]` para asegurar presencia de hero a pantalla completa

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- no se ha hecho todavía revisión visual en navegador real con navegación fija o contenidos posteriores adicionales
- si el hero recibe más densidad de contenido, habrá que reequilibrar altura y espaciado

## Notas para presupuesto

Entrega de layout premium y dirección de arte aplicada: el valor está en la recomposición del hero como pieza de marca, no solo en cambiar clases de ancho y alto.
