---
change_id: NBS-CHG-2026-05-03-029
date: 2026-05-03
title: Realineación de `StarBorder` con la referencia de React Bits
group_id: NBS-TSK-2026-029
category: frontend
subcategories:
  - components
  - branding
  - drift
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
  - doc/reference/technical-reference.md
  - .agents/decisions-log.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

La primitive `StarBorder` se realinea con la estructura y el CSS de referencia de React Bits, dejando el acabado transparente del navbar como override de consumo y no como fork del componente base.

## Contexto / problema

Martín pidió verificar si la implementación local coincidía con `@react-bits/StarBorder-TS-CSS` y, en caso contrario, tomar la referencia original como base real.

## Cambio realizado

- se sustituye la primitive custom actual por una base alineada con la estructura original de React Bits
- se conservan solo extensiones mínimas útiles para el proyecto, como `innerStyle` e `innerClassName`
- el navbar adapta esa base con overrides transparentes y color lila de marca
- se corrige el drift documental que seguía hablando de variantes propias `solid` y `outline`

## Objetivo

Reducir drift frente al componente fuente y mantener la personalización de marca en la capa de integración, no en una reescritura completa del componente.

## Impacto arquitectónico

`StarBorder` vuelve a ser una primitive más cercana a upstream, con menos semántica local incrustada y mayor claridad entre base reutilizable y override específico del navbar.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- el CTA del navbar sigue usando overrides inline para conseguir acabado transparente sin romper la base de referencia

## Notas para presupuesto

Refactor pequeño de alineación con upstream para reducir mantenimiento visual y técnico.
