---
change_id: NBS-CHG-2026-05-04-054
date: 2026-05-04
title: Reducción adicional del tamaño y opacidad total de las partículas del hero
group_id: NBS-TSK-2026-054
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
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

Las partículas del hero se renderizan ahora más pequeñas y alcanzan opacidad total durante la fase visible, sin perder el fade de salida del ciclo.

## Contexto / problema

Después del último ajuste de tamaño y brillo, Martín pidió dos cambios concretos: hacer las partículas todavía más pequeñas y llevar su opacidad a 100.

## Cambio realizado

- se reduce el factor de tamaño renderizado del `58%` al `46%`
- se fija la opacidad máxima efectiva en `1.00`

## Objetivo

Conseguir partículas más precisas y más presentes, manteniendo el carácter limpio del campo y la continuidad del bucle.

## Impacto arquitectónico

Ajuste localizado en `HeroParticles`, sin cambios en keyframes, rutas ni tiempos de vida.

## Desglose denso

- el pico de opacidad sube a total, pero se conserva el tramo final de desvanecimiento para ocultar el reinicio del ciclo
- la reducción de tamaño sigue afectando solo a `width` y `height`

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / límites

- no se ha hecho una revisión visual automatizada en navegador en esta sesión
- si la opacidad total resulta demasiado agresiva, el siguiente paso razonable sería reservar `1.00` solo para una subfamilia pequeña de partículas destacadas

## Notas para presupuesto

Refinamiento visual menor sobre el hero principal.
