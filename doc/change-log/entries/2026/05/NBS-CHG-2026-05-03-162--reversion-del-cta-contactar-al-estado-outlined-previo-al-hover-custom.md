---
change_id: NBS-CHG-2026-05-03-162
date: 2026-05-03
title: Reversión del CTA `Contactar` al estado outlined previo al hover custom
group_id: NBS-TSK-2026-140
category: frontend
subcategories:
  - components
  - branding
  - interaction
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

Se revierte el CTA `Contactar` del navbar a su estado anterior al primer hover custom: outlined, transparente y sin relleno interior al pasar el ratón.

## Contexto / problema

Martín pidió volver al comportamiento previo a los experimentos de hover que añadían relleno lila al botón.

## Cambio realizado

- se eliminan los overrides `group-hover` del CTA
- se conserva el borde animado `StarBorder`
- el estado base y el hover quedan transparentes

## Objetivo

Recuperar la lectura limpia y premium del CTA outlined original.

## Impacto arquitectónico

Reversión localizada en la integración del navbar, sin tocar la primitive reusable `StarBorder`.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si se quiere reintroducir feedback de hover en el futuro, convendrá hacerlo con un tratamiento más sutil del borde o del texto antes que con rellenos completos

## Notas para presupuesto

Reversión menor de microinteracción.
