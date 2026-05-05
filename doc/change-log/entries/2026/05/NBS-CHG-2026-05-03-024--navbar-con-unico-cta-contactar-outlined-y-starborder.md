---
change_id: NBS-CHG-2026-05-03-024
date: 2026-05-03
title: Navbar con único CTA `Contactar` outlined y `StarBorder`
group_id: NBS-TSK-2026-024
category: frontend
subcategories:
  - navigation
  - cta
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
  - components/layout/navbar.tsx
  - components/ui/star-border.tsx
  - components/ui/star-border.module.css
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

El navbar se simplifica a un único CTA `Contactar`, y ese CTA pasa a usar `StarBorder` en variante outlined.

## Contexto / problema

Martín pidió eliminar el botón secundario del navbar y mantener solo `Contactar`, pero haciendo que el botón fuese outlined sin perder el efecto `StarBorder`.

## Cambio realizado

- se elimina `Explorar` del set de CTAs por defecto del navbar
- `Contactar` sigue usando `StarBorder`
- la primitive gana una variante `outline`
- el CTA pasa a mostrarse con superficie oscura translúcida, texto claro y halo lila

## Objetivo

Concentrar la acción principal del navbar en un único CTA más limpio y más integrado con el shell glass.

## Impacto arquitectónico

`StarBorder` deja de estar acoplado a una única estética `solid` y gana una variante reusable más flexible.

## Desglose denso

- `navbar.tsx` deja de importar y renderizar `Button` para CTAs
- `star-border.tsx` incorpora el prop `appearance`
- `star-border.module.css` separa estilos `solid` y `outline`

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- el hero sigue manteniendo sus propios dos CTAs; este cambio afecta solo al navbar

## Notas para presupuesto

Refinamiento de navegación global con mejora reusable de la primitive de CTA animado.
