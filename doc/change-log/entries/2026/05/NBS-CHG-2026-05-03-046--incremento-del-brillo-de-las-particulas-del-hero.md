---
change_id: NBS-CHG-2026-05-03-046
date: 2026-05-03
title: Incremento del brillo de las partículas del hero
group_id: NBS-TSK-2026-046
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
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

Las partículas del hero se ven ahora más luminosas gracias a un color base más claro y a una opacidad ligeramente superior.

## Contexto / problema

Después de reducir el tamaño visible de las partículas, Martín pidió recuperar algo de presencia visual aumentando su brillo.

## Cambio realizado

- se aclara el color base de relleno de las partículas hacia un lila más luminoso
- se incrementa la opacidad efectiva con un multiplicador moderado y un tope para no saturar la capa

## Objetivo

Hacer que las partículas se lean mejor sobre el hero manteniendo su estética nítida y sobria.

## Impacto arquitectónico

Ajuste localizado en la primitive `HeroParticles`, sin cambios en rutas, timings ni estructura del componente.

## Desglose denso

- el brillo se incrementa por color y por opacidad, no por glow ni blur
- el ciclo de vida y la deriva orgánica quedan intactos

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / límites

- no se ha hecho una revisión visual automatizada en navegador en esta sesión
- si buscas todavía más contraste, el siguiente paso razonable es separar partículas protagonistas y secundarias en dos niveles de luminosidad

## Notas para presupuesto

Refinamiento visual menor sobre el hero principal.
