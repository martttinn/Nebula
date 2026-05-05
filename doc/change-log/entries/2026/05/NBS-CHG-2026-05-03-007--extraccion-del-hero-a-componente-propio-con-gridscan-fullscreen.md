---
change_id: NBS-CHG-2026-05-03-007
date: 2026-05-03
title: Extracción del hero a componente propio con GridScan fullscreen
group_id: NBS-TSK-2026-007
category: frontend
subcategories:
  - refactor
  - layout
origin: client-request
complexity: low
scope: route-level
user_visible: false
release_impacts:
  - frontend-runtime
architecture_layers:
  - routes
  - components
  - docs
backend_sensitive: false
files_touched:
  - app/page.tsx
  - components/home/hero.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se extrae el hero de la home a un componente dedicado que, por ahora, solo monta `GridScan` ocupando el ancho completo y `100vh`.

## Contexto / problema

Martín pidió dejar el hero como una superficie mínima y separada del `page` principal, sin overlays, copy ni otras capas por ahora.

## Cambio realizado

- se crea `components/home/hero.tsx`
- `Hero` renderiza únicamente un contenedor fullscreen con `GridScan`
- `app/page.tsx` pasa a delegar toda la home en ese componente

## Objetivo

Tener una boundary limpia y específica para el hero de la home antes de seguir iterando sobre su contenido visual o narrativo.

## Impacto arquitectónico

La ruta `/` queda simplificada y el hero pasa a ser una pieza aislada y reusable dentro del dominio visual de la home.

## Desglose denso

- el nuevo `Hero` usa `w-full` y `h-[100vh]`
- `GridScanShell` sigue siendo la isla cliente responsable del fondo WebGL
- no se añaden capas adicionales ni contenido por encima del fondo

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- el componente queda intencionalmente vacío salvo por el fondo
- futuras capas de contenido deberán añadirse dentro de `Hero`, no de `app/page.tsx`

## Notas para presupuesto

Entrega pequeña de estructura y limpieza del árbol de la home, orientada a preparar iteraciones futuras con menor fricción.
