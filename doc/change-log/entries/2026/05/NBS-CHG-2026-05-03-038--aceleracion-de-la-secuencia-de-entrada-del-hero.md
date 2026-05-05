---
change_id: NBS-CHG-2026-05-03-038
date: 2026-05-03
title: Aceleración de la secuencia de entrada del hero
group_id: NBS-TSK-2026-038
category: frontend
subcategories:
  - components
  - motion
  - timing
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
  - components/home/hero-lead.tsx
  - components/ui/preloader.tsx
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se acelera la secuencia de entrada del hero reduciendo el tiempo de espera tras el preloader, el stagger del heading y subheading, y la duración del `fade-up` de los CTAs.

## Contexto / problema

La secuencia de entrada del bloque principal del hero se estaba percibiendo lenta, no solo por el reveal del copy sino también por la espera acumulada entre la salida del preloader y la activación de cada fase.

## Cambio realizado

- se adelanta el disparo de `hero-intro-start` tras la salida del preloader
- se reduce el stagger y la duración del `SplitText` del heading
- se reduce el stagger y la duración del `SplitText` del subheading
- se acortan las esperas entre fases
- se acorta y compacta la entrada de los CTAs

## Objetivo

Conseguir que el hero entre con más inmediatez y autoridad, sin perder legibilidad ni jerarquía.

## Impacto arquitectónico

Ajuste de timing sobre la orquestación del hero y su coordinación con el preloader, sin cambios de estructura ni de primitives.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si después de esto sigue sintiéndose lento, el siguiente escalón ya no es microtuning sino recortar la duración del propio preloader

## Notas para presupuesto

Refinamiento menor de motion y timing.
