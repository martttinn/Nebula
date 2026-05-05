---
change_id: NBS-CHG-2026-05-03-053
date: 2026-05-03
title: Reducción adicional del tamaño y aumento de opacidad de las partículas del hero
group_id: NBS-TSK-2026-053
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

Las partículas del hero se renderizan ahora más pequeñas y con más opacidad para mantener presencia visual sin ganar peso volumétrico.

## Contexto / problema

Después de hacerlas más brillantes, Martín pidió un ajuste combinado: puntos más pequeños, pero más opacos.

## Cambio realizado

- se reduce el factor de tamaño renderizado del `72%` al `58%`
- se eleva el multiplicador de opacidad efectiva y su techo máximo

## Objetivo

Mantener una atmósfera más precisa y fina, pero sin que las partículas se pierdan sobre el fondo del hero.

## Impacto arquitectónico

Ajuste localizado en `HeroParticles`, sin tocar keyframes, trayectorias ni tiempos de vida.

## Desglose denso

- la reducción de tamaño afecta solo a `width` y `height`
- la opacidad se incrementa sin añadir glow, blur ni nuevas capas visuales

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / límites

- no se ha hecho una revisión visual automatizada en navegador en esta sesión
- si quisieras todavía más control, el siguiente paso razonable sería desacoplar tamaño y opacidad por familias de partículas

## Notas para presupuesto

Refinamiento visual menor sobre el hero principal.
