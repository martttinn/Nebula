---
change_id: NBS-CHG-2026-05-03-031
date: 2026-05-03
title: Ajuste del pulso de `StarBorder` al perímetro exterior del borde
group_id: NBS-TSK-2026-031
category: frontend
subcategories:
  - components
  - branding
  - motion
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
  - components/ui/star-border.tsx
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

Se corrige la lectura visual del pulso de `StarBorder` para que, igual que en la referencia de React Bits, ilumine el perímetro exterior del botón sin teñir el interior transparente del CTA del navbar.

## Contexto / problema

El CTA `Contactar` del navbar usa un override transparente sobre `StarBorder`. Eso dejaba visible dentro del botón parte del gradiente animado que en la referencia original queda oculto por el relleno oscuro interno.

## Cambio realizado

- se tipa correctamente la custom property `--star-border-thickness` para no romper TypeScript
- se limita por CSS la banda visible del pulso superior e inferior para que quede pegada al contorno
- se documenta explícitamente que el destello debe leerse fuera del borde o sobre él, no como color interior del botón

## Objetivo

Mantener el acabado outlined y transparente del CTA premium sin alejarse del comportamiento visual de la referencia de React Bits.

## Impacto arquitectónico

La primitive `StarBorder` conserva su contrato actual, pero define mejor su comportamiento visual cuando se consume con interiores transparentes en shells oscuros.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- el ajuste está calibrado para el CTA actual del navbar; si aparecen tamaños muy distintos de botón puede convenir revisar la banda visible del pulso

## Notas para presupuesto

Corrección pequeña de fidelity visual orientada a igualar una primitive reusable con su referencia real sin sacrificar el lenguaje de marca.
