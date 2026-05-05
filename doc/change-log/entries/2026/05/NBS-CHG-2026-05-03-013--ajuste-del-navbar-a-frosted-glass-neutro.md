---
change_id: NBS-CHG-2026-05-03-013
date: 2026-05-03
title: Ajuste del navbar a frosted glass neutro dependiente del fondo
group_id: NBS-TSK-2026-013
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
  - web
  - components
  - docs
backend_sensitive: false
files_touched:
  - app/globals.css
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
related_decisions:
  - "2026-05-03 — El navbar global adopta un formato pill alargado con glassmorphism contenido"
---

# Resumen corto

Se ajusta el navbar para que funcione como vidrio translúcido neutro y deje que la dominante cromática provenga del contenido que tiene detrás.

## Contexto / problema

La versión anterior del navbar llevaba un tono rosado/morado demasiado explícito en su propio fill. Martín señaló correctamente que en la referencia ese color no pertenece al shell, sino a la refracción del fondo posterior.

## Cambio realizado

- se elimina el fill morado del navbar
- se sustituye por una base casi incolora con transparencia baja
- se refuerzan blur, saturación y brillo del `backdrop-filter`
- se añaden capas sutiles de highlight e inner border para conservar lectura y presencia

## Objetivo

Hacer que el navbar se comporte como una superficie `frosted glass` realista, no como una pastilla teñida de morado.

## Impacto arquitectónico

No cambia la estructura del componente, pero sí el contrato visual de la primitive: el color aparente del navbar pasa a depender del fondo que tenga detrás.

## Desglose denso

- el shell mantiene su forma, espaciado y jerarquía interna
- la neutralización ocurre a nivel de `glass-navbar`
- el canon visual documenta explícitamente que el vidrio debe ser neutro y dejar que el fondo construya la dominante cromática

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- la percepción final seguirá dependiendo del fondo real de cada página donde se monte el navbar

## Notas para presupuesto

Refinamiento visual de alta sensibilidad: poco código, pero mucho impacto en la credibilidad de la dirección de arte.
