---
change_id: NBS-CHG-2026-05-03-015
date: 2026-05-03
title: Reversión del navbar a su versión original segmentada
group_id: NBS-TSK-2026-015
category: frontend
subcategories:
  - revert
  - design-system
  - layout
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
  - .agents/decisions-log.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se revierte el navbar a la primera versión segmentada que se había implementado en Nebula Studios.

## Contexto / problema

Martín pidió expresamente volver a la versión original del navbar, descartando las iteraciones posteriores orientadas a una cápsula única y a un vidrio más realista.

## Cambio realizado

- se restaura la composición inicial del navbar
- se recuperan las subzonas internas tipo `glass-pill`
- se vuelve al mark brillante original y a la combinación de links/CTAs inicial
- se retira el shell `glass-navbar` introducido en iteraciones posteriores

## Objetivo

Dejar el runtime usando exactamente la dirección visual original del navbar dentro de este ciclo de trabajo.

## Impacto arquitectónico

No cambia la API pública de la primitive, pero sí su composición interna y su contrato visual actual.

## Desglose denso

- el centro vuelve a un pill interno con links estáticos
- la derecha vuelve a usar `Button` para los CTAs
- el shell superior deja de depender del tratamiento `glass-navbar`
- `DESIGN.md` y `decisions-log` vuelven a describir el navbar segmentado como estado vigente

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- el historial del `change-log` conserva las iteraciones posteriores como trabajo realizado, aunque ya no reflejen el estado actual del runtime

## Notas para presupuesto

Reversión puntual de interfaz con ajuste documental asociado para mantener alineadas la implementación y la fuente de verdad visual.
