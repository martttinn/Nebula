---
change_id: NBS-CHG-2026-05-03-045
date: 2026-05-03
title: Sincronización del borde del CTA `Contactar` con el hover lila
group_id: NBS-TSK-2026-045
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

Se corrige el CTA `Contactar` para que la línea del borde cambie también a lila de marca durante el hover, alineándose con el fill interior y la escala `1.05`.

## Contexto / problema

Aunque el interior del botón ya cambiaba a lila al hacer hover, la línea del borde seguía anclada a un color base por prioridad de estilos y no acompañaba correctamente la transición.

## Cambio realizado

- se mueve el color del borde interno del `StarBorder` a una variable CSS reusable
- el navbar define estado base con borde blanco translúcido y hover con borde lila de marca
- el fill interno y el contorno quedan sincronizados en la misma transición

## Objetivo

Hacer que el CTA responda como una sola pieza coherente al hover, sin drift entre relleno y contorno.

## Impacto arquitectónico

Ajuste pequeño en la primitive para permitir overrides cromáticos más fiables desde consumidores como el navbar.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si más adelante otros consumers de `StarBorder` necesitan estados temáticos, el patrón correcto ya es usar variables CSS en vez de colores inline

## Notas para presupuesto

Refinamiento menor de microinteracción.
