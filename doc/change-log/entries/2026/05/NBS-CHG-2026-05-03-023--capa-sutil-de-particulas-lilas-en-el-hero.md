---
change_id: NBS-CHG-2026-05-03-023
date: 2026-05-03
title: Capa sutil de partículas lilas en el hero
group_id: NBS-TSK-2026-023
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
  - components/home/hero.tsx
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

El hero incorpora una capa muy sutil de partículas lilas dispersas que flotan lentamente sobre el fondo sin competir con el copy principal.

## Contexto / problema

Martín pidió enriquecer el hero con partículas lilas repartidas de forma aparentemente aleatoria, con movimiento muy suave y sin añadir ruido visual excesivo.

## Cambio realizado

- se crea una capa decorativa específica `HeroParticles`
- las partículas usan posiciones pseudoaleatorias fijas, tamaños y duraciones distintas
- la animación se resuelve solo con CSS y `prefers-reduced-motion`
- la capa se integra entre el overlay del hero y el contenido principal

## Objetivo

Aumentar la sensación atmosférica y premium del hero manteniendo la sobriedad y la legibilidad.

## Impacto arquitectónico

Se añade un componente específico de la home, server-side, con CSS module, sin mover el `Hero` a cliente ni aumentar la carga de interacción.

## Desglose denso

- `hero-particles.tsx` define la nube de partículas
- `hero-particles.module.css` controla la deriva lenta y el glow sutil
- `Hero` suma la nueva capa sin alterar el contrato del copy ni de los CTAs

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- la dispersión es pseudoaleatoria y deliberadamente estable; si se quisiera aleatoriedad real por sesión habría que introducir lógica cliente o generación en build

## Notas para presupuesto

Refinamiento visual ligero del hero con coste técnico contenido y sin penalización relevante de arquitectura.
