---
change_id: NBS-CHG-2026-05-03-049
date: 2026-05-03
title: Eliminación del flash final en el hover de los links del navbar
group_id: NBS-TSK-2026-049
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
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se elimina el flash final del hover en los links del navbar retirando el desplazamiento vertical y conservando la sensación de inercia mediante microescala y una curva más larga.

## Contexto / problema

Al salir del hover, el desplazamiento vertical del link podía hacer que el elemento volviera a pasar bajo el cursor durante la transición de retorno, reactivando el highlight durante unos milisegundos.

## Cambio realizado

- se elimina la microelevación vertical del hover
- se mantiene la microescala para conservar respuesta táctil
- se añade `will-change-transform` para estabilizar la composición del transform

## Objetivo

Conservar la sensación premium del hover sin reactivaciones espurias ni flashes al final de la salida.

## Impacto arquitectónico

Ajuste localizado en la microinteracción de los links del navbar, acompañado por alineación del canon visual reusable.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si en una siguiente iteración se quisiera recuperar sensación de lift, debería resolverse con sombra o highlight, no con desplazamiento físico del target

## Notas para presupuesto

Bugfix menor de interacción.
