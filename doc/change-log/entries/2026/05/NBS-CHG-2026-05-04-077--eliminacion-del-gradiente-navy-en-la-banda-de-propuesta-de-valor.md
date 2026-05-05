---
change_id: NBS-CHG-2026-05-04-077
date: 2026-05-04
title: Eliminacion del gradiente navy en la banda de propuesta de valor
group_id: NBS-TSK-2026-077
category: frontend
subcategories:
  - hero
  - benefits
  - visual-system
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - docs
backend_sensitive: false
files_touched:
  - components/home/value-proposition-section.tsx
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
  - "2026-05-04 — La banda de propuesta de valor abandona el gradiente Navy para no cortar con el hero"
---

# Resumen corto

La banda de propuesta de valor elimina el gradiente `Navy` y pasa a continuar sobre base `Void`, con un único acento radial lila muy contenido.

## Contexto / problema

Seguía apareciendo una línea de corte visible entre el hero y la sección de benefits porque esta última abría un bloque cromático distinto justo al comenzar.

## Cambio realizado

- se elimina el gradiente vertical `Void -> Navy -> Void` de `value-proposition-section`
- la sección pasa a usar `bg-nebula-void` como base continua
- se conserva solo un acento radial lila muy tenue para no dejar la banda completamente plana
- se actualizan `DESIGN.md`, la referencia técnica y la memoria operativa del proyecto

## Objetivo

Eliminar la costura visual entre hero y benefits sin tocar la mecánica tipográfica ni la orquestación de scroll de la sección.

## Impacto arquitectonico

El cambio queda encapsulado en la shell visual de la banda de propuesta de valor y no altera ninguna primitive de motion ni el contenido de las frases.

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- no se ha hecho revision visual automatizada en navegador en esta sesion
- el repo no expone `npm run changes:sync`

## Notas para presupuesto

Refinamiento visual localizado para corregir continuidad entre superficies públicas contiguas.
