---
change_id: NBS-CHG-2026-05-03-014
date: 2026-05-03
title: Refuerzo del efecto glassmorphism real en el navbar
group_id: NBS-TSK-2026-014
category: frontend
subcategories:
  - ui-ux-redesign
  - visual-direction
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
  - app/globals.css
  - DESIGN.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se refuerza el glassmorphism del navbar para que la pieza se lea claramente como una superficie de vidrio esmerilado real y no como una barra solo translúcida.

## Contexto / problema

Tras neutralizar el tinte rosado, el navbar seguía sin transmitir con suficiente claridad la sensación de `glassmorphism`. Martín señaló que la pieza no estaba comportándose todavía como vidrio real.

## Cambio realizado

- se incrementa el `backdrop-filter`
- se rebaja aún más el fill opaco del shell
- se añaden highlights y reflejos internos más propios de un cristal esmerilado
- se asegura con `z-index` que el contenido quede ópticamente por encima del material

## Objetivo

Conseguir que la primitive del navbar se perciba como un material y no solo como una caja translúcida.

## Impacto arquitectónico

No cambia la API del componente, pero sí el contrato visual de su shell y la manera en que se apoya sobre el hero de fondo.

## Desglose denso

- `glass-navbar` gana más blur, saturación y brillo
- el fill base queda más bajo para dejar entrar mejor el fondo
- los pseudo-elementos pasan a trabajar como highlights y refracciones sutiles
- el contenido del navbar se fija como capa superior mediante `relative z-10`

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- el resultado final seguirá dependiendo del hero y de cualquier fondo futuro donde se reutilice el navbar

## Notas para presupuesto

Refinamiento visual fino sobre una primitive reusable, con impacto perceptivo alto y coste de implementación bajo.
