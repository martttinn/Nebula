---
change_id: NBS-CHG-2026-05-03-046
date: 2026-05-03
title: Hover blanco del CTA `Contactar` con pulso pausado
group_id: NBS-TSK-2026-046
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

Se redefine el hover del CTA `Contactar` para que el botón pase a fondo blanco con texto negro y el pulso animado de `StarBorder` quede en pausa mientras dure la interacción.

## Contexto / problema

El hover anterior seguía la paleta lila, pero Martín pidió un estado más limpio y enfático, con inversión clara de contraste y sin movimiento continuo mientras el cursor está encima.

## Cambio realizado

- el interior del CTA pasa a blanco en `hover`
- el texto cambia a negro en `hover`
- la línea del borde acompaña el cambio a blanco
- la animación del pulso lila se pausa temporalmente durante el `hover`
- se mantiene la escala `1.05`

## Objetivo

Dar al CTA un estado hover más claro, premium y estable, reduciendo ruido visual en el momento de foco.

## Impacto arquitectónico

La primitive `StarBorder` gana una variable CSS para controlar el `animation-play-state`, lo que deja el comportamiento reusable desde futuros consumers sin recurrir a hacks locales.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si más adelante se quisiera congelar también la opacidad del pulso en un valor específico durante el `hover`, habría que exponer una segunda variable CSS para ese estado

## Notas para presupuesto

Refinamiento menor de microinteracción.
