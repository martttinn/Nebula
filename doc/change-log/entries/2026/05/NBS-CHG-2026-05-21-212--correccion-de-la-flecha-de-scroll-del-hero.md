---
change_id: NBS-CHG-2026-05-21-212
date: 2026-05-21
title: Correccion de la flecha de scroll del hero
group_id: NBS-TSK-2026-188
category: frontend
subcategories:
  - hero
  - motion
  - bugfix
  - affordance
origin: client-request
complexity: low
scope: component-level
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/home/hero/lead.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - Playwright visual/DOM check hero scroll cue
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Correccion de la affordance de scroll del hero para que la linea vertical y el circulo con chevron se animen como una sola pieza.

## Contexto / problema

Tras la actualizacion de dependencias, la flecha inferior del hero mostraba una linea vertical separada del circulo y la animacion no se ejecutaba. En el CSS compilado existia `.animate-hero-scroll-cue`, pero no la variante `.motion-safe\:animate-hero-scroll-cue` usada en el markup.

## Cambio realizado

- Se elimina la linea vertical de la cue inferior.
- Se sustituye `motion-safe:animate-hero-scroll-cue` por la clase explicita `hero-scroll-cue-motion`.
- `app/globals.css` aplica `hero-scroll-cue-motion` directamente y desactiva la animacion con `@media (prefers-reduced-motion: reduce)`.

## Objetivo

Recuperar una lectura compacta y coherente de la indicacion de scroll, sin piezas flotando ni separaciones artificiales.

## Impacto arquitectonico

Ajuste acotado a presentacion del hero. No cambia secuencia de estados, copy, rutas, datos, backend ni dependencias.

## Desglose denso

La animacion CSS mantiene la misma keyframe y timing. El cambio evita depender de una variante Tailwind que no estaba generando regla para una utilidad custom y simplifica la cue visible a un unico circulo con chevron animado.

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Playwright visual/DOM check hero scroll cue
- `npm run changes:sync`

## Pendientes / limites

No se rediseña la posicion de la cue en el viewport; se corrige la pieza visual rota y la aplicacion real de la animacion.

## Notas para presupuesto

Correccion fina de UI/motion tras upgrade del stack base.
