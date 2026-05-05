---
change_id: NBS-CHG-2026-05-03-028
date: 2026-05-03
title: CTA `Contactar` del navbar con `StarBorder` outlined sin fondo
group_id: NBS-TSK-2026-028
category: frontend
subcategories:
  - navbar
  - cta
  - branding
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

El CTA `Contactar` del navbar mantiene el borde animado lila de `StarBorder`, pero pierde cualquier relleno de fondo para quedar realmente outlined.

## Contexto / problema

Martín indicó que el botón `Contactar` no debía llevar color de fondo dentro del navbar.

## Cambio realizado

- la variante `outline` de `StarBorder` deja su shell y su inner surface transparentes
- el uso en el navbar refuerza explícitamente el `bg-transparent`
- se actualizan los guardrails visuales y la referencia técnica para fijar el nuevo comportamiento

## Objetivo

Hacer que el CTA del navbar se lea como un contorno premium y ligero, no como una cápsula rellena.

## Impacto arquitectónico

La primitive reusable `StarBorder` redefine el significado visual de su variante `outline`, lo que afecta a cualquier uso futuro de esa variante.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si en el futuro se necesita un `outline` con relleno tenue, convendrá separarlo en otra variante explícita

## Notas para presupuesto

Refinamiento visual pequeño sobre una primitive reusable y un shell global ya existentes.
