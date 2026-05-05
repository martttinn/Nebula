---
change_id: NBS-CHG-2026-05-03-048
date: 2026-05-03
title: Corrección del recorte del highlight hover en los links del navbar
group_id: NBS-TSK-2026-048
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

Se corrige el recorte del highlight hover en los links centrales del navbar dando más espacio interno al rail horizontal donde viven las microinteracciones.

## Contexto / problema

El hover con microelevación y microescala quedaba cortado por el contenedor scrollable de los links, lo que rompía el acabado pill del highlight.

## Cambio realizado

- se añade padding interno al rail horizontal de links
- se compensa ese padding con margen negativo para no alterar la composición visual del navbar
- el highlight y la microelevación ahora quedan dentro del área visible del contenedor

## Objetivo

Mantener la inercia del hover sin artefactos de recorte en los pills de navegación.

## Impacto arquitectónico

Ajuste localizado en el shell del navbar, sin cambiar el canon visual ni la microinteracción definida.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si la versión móvil usa otra primitive de navegación, este ajuste no se hereda automáticamente

## Notas para presupuesto

Bugfix menor de presentación.
