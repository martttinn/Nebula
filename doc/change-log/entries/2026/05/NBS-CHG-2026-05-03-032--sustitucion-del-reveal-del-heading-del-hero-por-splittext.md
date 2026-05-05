---
change_id: NBS-CHG-2026-05-03-032
date: 2026-05-03
title: Sustitución del reveal del heading del hero por `SplitText`
group_id: NBS-TSK-2026-032
category: frontend
subcategories:
  - components
  - branding
  - motion
origin: client-request
complexity: medium
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
  - components/home/hero-lead.tsx
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

El heading principal del hero deja de usar `DecryptedText` y pasa a entrar con un reveal tipo `SplitText` por caracteres, manteniendo la secuencia actual: heading primero, subheading después y CTAs al final.

## Contexto / problema

Martín pidió sustituir la animación del titular por la referencia `SplitText` de React Bits, pero sin alterar el orden ni la legibilidad general del intro del hero.

## Cambio realizado

- se crea una primitive `SplitText` reusable en `components/ui/`
- el heading del hero se conecta a esa nueva primitive con stagger por caracteres
- el subheading conserva `DecryptedText` para no endurecer demasiado el bloque secundario
- se actualiza la documentación técnica y visual para reflejar la nueva secuencia de motion

## Objetivo

Dar al headline una entrada más física y editorial, más adecuada al peso visual de `Syne`, sin romper la orquestación ya coordinada con el preloader.

## Impacto arquitectónico

La capa UI gana una primitive adicional de motion tipográfico reusable, separando mejor los casos de uso de `SplitText` y `DecryptedText`.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- esta adaptación replica la lectura visual de `SplitText` sin introducir la dependencia adicional de GSAP de la referencia publicada

## Notas para presupuesto

Mejora visual puntual del hero con extracción de primitive reusable y actualización documental asociada.
