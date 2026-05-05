---
change_id: NBS-CHG-2026-05-03-035
date: 2026-05-03
title: Conversión de las partículas del hero a círculos nítidos sin blur
group_id: NBS-TSK-2026-035
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

Las partículas lilas del hero dejan de usar blur, glow y gradientes difusos, y pasan a renderizarse como círculos limpios y nítidos.

## Contexto / problema

La capa anterior seguía buscando una lectura atmosférica mediante blur y halos suaves, pero Martín pidió explícitamente partículas reconocibles como círculos, sin desenfoque de ningún tipo.

## Cambio realizado

- se elimina el campo `blur` del dataset de partículas
- se elimina el `filter: blur(...)` inline
- se sustituye el gradiente radial y el `box-shadow` por un fill circular sólido
- se alinea el canon visual y la referencia técnica con esta nueva dirección

## Objetivo

Hacer que las partículas se lean como discos lilas definidos, no como motas difusas.

## Impacto arquitectónico

Simplificación visual y técnica de una primitive decorativa server-side sin alterar su contrato externo.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si más adelante quieres más jerarquía entre partículas, el siguiente paso razonable sería variar tono o tamaño, no reintroducir blur

## Notas para presupuesto

Refinamiento visual menor sobre la capa atmosférica del hero.
