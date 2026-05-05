---
change_id: NBS-CHG-2026-05-03-045
date: 2026-05-03
title: Reducción del tamaño visible de las partículas del hero
group_id: NBS-TSK-2026-045
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

Se reduce el diámetro renderizado de las partículas del hero para que la atmósfera siga presente, pero con una lectura más fina y menos invasiva.

## Contexto / problema

Tras definir el nuevo ciclo orgánico de aparición y deriva, Martín pidió hacer las partículas más pequeñas para bajar su peso visual en el hero.

## Cambio realizado

- se introduce una reducción del tamaño renderizado de cada partícula al `72%` de su tamaño base
- se mantiene intacta la lógica de rutas, opacidad y ciclo de vida

## Objetivo

Conservar la sensación espacial del campo de partículas, pero con una presencia más sutil alrededor del copy principal.

## Impacto arquitectónico

Ajuste localizado en la primitive `HeroParticles`, sin alterar el contrato del componente ni añadir complejidad nueva.

## Desglose denso

- la reducción se aplica solo a `width` y `height`
- amplitud, timings y desfases se conservan para no cambiar el comportamiento orgánico ya establecido

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / límites

- no se ha hecho una revisión visual automatizada en navegador en esta sesión
- si quieres un ajuste todavía más fino, el siguiente paso razonable es separar tamaños por capas o por breakpoint

## Notas para presupuesto

Refinamiento visual menor sobre el hero principal.
