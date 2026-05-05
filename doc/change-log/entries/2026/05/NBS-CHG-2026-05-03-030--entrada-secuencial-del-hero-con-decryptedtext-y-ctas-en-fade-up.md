---
change_id: NBS-CHG-2026-05-03-030
date: 2026-05-03
title: Entrada secuencial del hero con `DecryptedText` y CTAs en fade-up
group_id: NBS-TSK-2026-030
category: frontend
subcategories:
  - hero
  - motion
  - copy
origin: client-request
complexity: medium
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
  - components/ui/decrypted-text.tsx
  - components/ui/decrypted-text.module.css
  - components/home/hero-lead.tsx
  - components/home/hero.tsx
  - components/ui/preloader.tsx
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

El hero principal pasa a usar una entrada secuencial: heading con efecto `DecryptedText`, subheading después con el mismo lenguaje visual y CTAs al final con fade-up.

## Contexto / problema

Martín pidió integrar la animación `DecryptedText` de React Bits en el header del hero y fijar un orden temporal claro entre heading, subheading y botones.

## Cambio realizado

- se crea una primitive reusable `DecryptedText` basada en la referencia actual de React Bits
- se extrae un `HeroLead` cliente para orquestar la secuencia del copy
- el heading arranca primero, el subheading se activa al terminar y los CTAs aparecen al final con fade-up
- el preloader emite una señal de inicio para que la animación del hero no ocurra debajo del overlay
- se respeta `prefers-reduced-motion` con fallback estático

## Objetivo

Dar al hero una entrada más editorial y controlada, manteniendo jerarquía, legibilidad y continuidad con la entrada del preloader.

## Impacto arquitectónico

El hero incorpora una isla cliente específica para motion de copy y una nueva primitive tipográfica reusable, sin mover el shell completo ni el fondo visual a cliente.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- el timing actual está calibrado para la home con preloader; si cambia la duración del preloader, convendrá revisar la coreografía

## Notas para presupuesto

Refinamiento visual de complejidad media por coordinación entre tipografía animada, preloader y secuencia de CTAs.
