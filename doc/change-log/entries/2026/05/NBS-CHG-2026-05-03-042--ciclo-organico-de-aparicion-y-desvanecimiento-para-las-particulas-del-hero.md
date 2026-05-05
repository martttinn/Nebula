---
change_id: NBS-CHG-2026-05-03-042
date: 2026-05-03
title: Ciclo orgánico de aparición y desvanecimiento para las partículas del hero
group_id: NBS-TSK-2026-042
category: frontend
subcategories:
  - components
  - motion
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
  - components/home/hero-particles.tsx
  - components/home/hero-particles.module.css
  - DESIGN.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

Las partículas del hero dejan de oscilar entre dos puntos y pasan a vivir en ciclos largos donde aparecen, deambulan con trayectorias suaves e irregulares y se desvanecen antes de reiniciar.

## Contexto / problema

La implementación anterior daba una lectura demasiado mecánica: cada partícula solo alternaba entre un origen y un destino, sin sensación clara de aparición, permanencia ni salida gradual.

## Cambio realizado

- se sustituye el dataset fijo de deriva simple por anclajes ligeros más una generación determinista de rutas con varios waypoints
- se separa la animación de presencia de la animación de movimiento para controlar mejor cuándo aparecen y cuándo desaparecen
- se alarga la vida útil de cada partícula y se desfasa cada ciclo para que el campo no se sincronice
- se documenta el nuevo patrón en `DESIGN.md` y en la referencia técnica

## Objetivo

Conseguir una atmósfera espacial más orgánica: partículas que emergen, permanecen visibles durante un tramo largo, se desplazan con calma y salen sin cortes secos.

## Impacto arquitectónico

El componente sigue siendo una primitive decorativa server-side sin hooks ni estado cliente, pero gana un contrato visual más rico mediante custom properties y keyframes separados para opacidad y deriva.

## Desglose denso

- la lógica de movimiento se calcula en build/render a partir de anclajes, tamaño e índice de cada partícula
- los waypoints evitan trayectorias lineales y reducen la sensación de péndulo del `alternate`
- el reinicio del bucle queda oculto por el desvanecimiento al final del ciclo, de modo que el salto de vuelta al origen no se percibe

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / límites

- no se ha hecho una revisión visual automatizada en navegador porque el workspace actual no expone Playwright ni el plugin de browser en esta sesión
- si más adelante quieres más naturalidad todavía, el siguiente paso lógico sería introducir variación procedural controlada por viewport, no más keyframes manuales

## Notas para presupuesto

Refinamiento visual menor con efecto directo en la percepción de calidad del hero principal.
