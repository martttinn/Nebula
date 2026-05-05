---
change_id: NBS-CHG-2026-05-03-026
date: 2026-05-03
title: Refuerzo de legibilidad y densidad de las partículas del hero
group_id: NBS-TSK-2026-026
category: frontend
subcategories:
  - hero
  - motion
  - atmosphere
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
  - npm run build
  - npm run typecheck
---

# Resumen corto

La capa de partículas del hero gana algo más de presencia visual: menos blur, más definición del núcleo y un leve aumento de densidad.

## Contexto / problema

Martín indicó que las partículas estaban demasiado difuminadas y costaba reconocerlas como elementos individuales dentro del hero.

## Cambio realizado

- se reduce el blur aplicado a cada partícula
- se refuerza el gradiente interno para que el núcleo sea más reconocible
- se ajusta ligeramente el halo para no perder atmósfera
- se añaden algunas partículas extra sin cambiar el ritmo lento de deriva

## Objetivo

Mantener la sofisticación del hero, pero haciendo que la capa atmosférica se perciba con más claridad y presencia.

## Impacto arquitectónico

No cambia la arquitectura del hero ni su modelo server-side; solo se recalibran los parámetros visuales de la primitive `HeroParticles`.

## Desglose denso

- `hero-particles.tsx` aumenta ligeramente la cantidad total y recalibra opacidad, tamaño y blur por instancia
- `hero-particles.module.css` endurece el núcleo de cada partícula y contiene mejor el glow
- `DESIGN.md` fija el guardrail de partículas sutiles pero legibles

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- sigue siendo una distribución fija y pseudoaleatoria; no hay aleatoriedad runtime por sesión

## Notas para presupuesto

Refinamiento visual ligero del hero con coste técnico muy bajo y sin impacto estructural.
