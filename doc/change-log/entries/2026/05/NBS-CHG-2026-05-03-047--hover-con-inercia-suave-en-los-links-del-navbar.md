---
change_id: NBS-CHG-2026-05-03-047
date: 2026-05-03
title: Hover con inercia suave en los links del navbar
group_id: NBS-TSK-2026-047
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

Se refina el hover de los links centrales del navbar para que la interacción tenga una inercia suave, con una transición más larga, microelevación y microescala contenida.

## Contexto / problema

El hover anterior cambiaba color y fondo de forma correcta, pero seguía siendo demasiado seco frente al resto del lenguaje de microinteracciones del navbar.

## Cambio realizado

- se amplía la transición de los links a `500ms`
- se usa una curva elástica contenida `cubic-bezier(0.16,1,0.3,1)`
- cada link gana una leve elevación y microescala en `hover`
- se ajusta ligeramente el fill de fondo para acompañar la sensación de inercia

## Objetivo

Hacer que los links del navbar respondan con más sofisticación y continuidad, sin competir con el CTA principal.

## Impacto arquitectónico

Ajuste localizado en la primitive de consumo del navbar, acompañado por actualización del canon visual reusable.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si más adelante la navegación móvil usa otra primitive distinta, este comportamiento habrá que reexpresarlo en ese componente específico

## Notas para presupuesto

Refinamiento menor de microinteracción.
