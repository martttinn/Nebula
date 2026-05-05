---
change_id: NBS-CHG-2026-05-03-034
date: 2026-05-03
title: Preservación de palabras completas en el heading con `SplitText`
group_id: NBS-TSK-2026-034
category: frontend
subcategories:
  - components
  - typography
  - motion
origin: client-request
complexity: low
scope: cross-cutting
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/ui/split-text.tsx
  - components/ui/split-text.module.css
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se ajusta `SplitText` para que el heading del hero mantenga cada palabra como unidad indivisible, evitando saltos de línea que partan una palabra por letras mientras se conserva la animación carácter a carácter.

## Contexto / problema

La primera versión de `SplitText` trataba cada carácter como caja independiente dentro del flujo normal, lo que permitía que una palabra larga se rompiera entre letras al hacer wrap en tamaños intermedios.

## Cambio realizado

- se agrupan los caracteres de cada palabra dentro de wrappers `nowrap`
- se preservan los espacios como nodos independientes para que el salto solo ocurra entre palabras
- se mantiene el stagger carácter a carácter y el callback de finalización del reveal

## Objetivo

Garantizar una lectura tipográfica limpia del titular sin degradar el efecto de entrada.

## Impacto arquitectónico

Bugfix de composición sobre la primitive reusable `SplitText`, sin cambios en la API pública usada por el hero.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si más adelante se usa `SplitText` con `splitType=\"words\"`, el comportamiento seguirá permitiendo saltos solo entre palabras, que es lo deseable para titulares

## Notas para presupuesto

Corrección tipográfica puntual sobre primitive reusable.
