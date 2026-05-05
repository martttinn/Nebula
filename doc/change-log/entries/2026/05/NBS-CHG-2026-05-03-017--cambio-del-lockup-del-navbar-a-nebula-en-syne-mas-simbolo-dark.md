---
change_id: NBS-CHG-2026-05-03-017
date: 2026-05-03
title: Cambio del lockup del navbar a `NEBULA` en Syne más símbolo dark
group_id: NBS-TSK-2026-017
category: frontend
subcategories:
  - branding
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
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

El navbar deja de usar el lockup `horizontal2` y pasa a mostrar el símbolo oficial dark seguido de `NEBULA` en Syne.

## Contexto / problema

Martín pidió volver a la versión `nebula-dark` y componer el branding visible del navbar con el icono y el texto `NEBULA`, en lugar del logo horizontal completo.

## Cambio realizado

- se usa `public/logo/symbol/nebula-dark.svg` en la zona izquierda
- el texto visible `NEBULA` se renderiza con la fuente display `Syne`, colocado después del símbolo
- se mantiene el shell único del navbar y la composición `logo / links / CTAs`

## Objetivo

Conseguir un lockup de marca más ligero y más controlable que el logo horizontal completo, manteniendo la coherencia con el sistema visual.

## Impacto arquitectónico

No cambia la API pública de navegación, pero sí la primitive de branding visible dentro del navbar.

## Desglose denso

- el asset horizontal deja de cargarse en runtime
- la palabra `NEBULA` pasa a ser parte del lockup y no del SVG
- el símbolo dark aporta continuidad con el resto de la identidad ya presente en `public/logo/symbol/`

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- el balance exacto entre tamaño del texto y del símbolo puede afinarse visualmente si Martín quiere una presencia más contenida o más protagonista

## Notas para presupuesto

Ajuste visual puntual de branding sobre la navegación global reusable.
