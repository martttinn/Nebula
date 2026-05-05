---
change_id: NBS-CHG-2026-05-03-050
date: 2026-05-03
title: Eliminación del clipping vertical del highlight en los links del navbar
group_id: NBS-TSK-2026-050
category: frontend
subcategories:
  - components
  - branding
  - interaction
origin: client-request
complexity: low
scope: component-local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/layout/navbar.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se elimina el clipping vertical que todavía afectaba al highlight hover de los links del navbar, liberando el wrapper intermedio que seguía recortando la microescala por arriba y por abajo.

## Contexto / problema

Aunque el flash del hover ya estaba corregido, el highlight seguía cortándose verticalmente porque el rail central todavía estaba encapsulado en un contenedor con clipping y el padding vertical compensado por margen negativo.

## Cambio realizado

- se elimina el `overflow-hidden` del wrapper intermedio de navegación
- se retira la compensación vertical negativa del rail de links
- se conserva el padding vertical real que da espacio al highlight escalado

## Objetivo

Permitir que el pill hover respire completo en vertical sin artefactos de recorte.

## Impacto arquitectónico

Ajuste localizado del shell del navbar sin cambiar el comportamiento base de la microinteracción.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si el navbar creciera ligeramente de altura y hubiera que compactarlo después, habría que ajustar padding del shell, no volver a introducir clip vertical

## Notas para presupuesto

Bugfix menor de presentación.
