---
change_id: NBS-CHG-2026-05-03-019
date: 2026-05-03
title: Ajuste cromático de `StarBorder` a fondo blanco y lila de marca
group_id: NBS-TSK-2026-019
category: frontend
subcategories:
  - ui
  - branding
  - design-system
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
  - components/ui/star-border.tsx
  - components/ui/star-border.module.css
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

La primitive `StarBorder` del CTA `Contactar` pasa a una superficie blanca con destello lila del color principal de Nebula.

## Contexto / problema

Martín pidió que el fondo del botón fuese blanco y que el efecto animado del borde usase el lila de marca, en lugar de la versión oscura con brillo más cercano a `haze`.

## Cambio realizado

- el relleno del CTA pasa a blanco
- el texto del CTA pasa a oscuro
- el destello del borde animado pasa al lila principal `#534AB7`
- se alinea la documentación del sistema con esta variante

## Objetivo

Reforzar la jerarquía comercial del botón `Contactar` sin perder la continuidad cromática de la marca.

## Impacto arquitectónico

No cambia la API de `StarBorder`; cambia únicamente su baseline visual y la configuración usada en el navbar.

## Desglose denso

- `star-border.module.css` redefine superficie, borde y estados hover/focus
- `star-border.tsx` pasa a usar lila de marca como fallback por defecto
- `navbar.tsx` aplica texto oscuro y destello lila explícito al CTA

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si en el futuro se necesita también una variante oscura de `StarBorder`, convendrá separarla por props o modifiers en vez de reescribir esta baseline

## Notas para presupuesto

Ajuste visual fino de CTA premium ya integrado en la navegación principal.
