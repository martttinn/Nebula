---
change_id: NBS-CHG-2026-05-24-219
date: 2026-05-24
title: Restauracion del beam del CTA del navbar
group_id: NBS-TSK-2026-195
category: frontend
subcategories:
  - bugfix
  - navbar
  - motion
origin: client-request
complexity: low
scope: component-local
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
  - app/globals.css
  - components/layout/navbar.tsx
  - components/magicui/border-beam.tsx
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-24-219--restauracion-del-beam-del-cta-del-navbar.md
  - doc/change-log/groups/2026/NBS-TSK-2026-195.md
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - smoke local del navbar desktop
related_decisions:
  - Microanimaciones above-the-fold no deben arrastrar Motion si CSS preserva el resultado
---

# Resumen corto

Se revierte de forma acotada la sustitucion CSS del `BorderBeam` del CTA `Contactar`, restaurando la implementacion Motion que mantenia el beam visible y animado.

## Contexto / problema

Tras el pase de optimizacion mobile, el beam del boton `Contactar` del navbar desktop dejo de comportarse correctamente. La causa estaba en el cambio de `BorderBeam` a keyframes CSS sobre `offset-distance`, que no reprodujo de forma fiable la animacion original.

## Cambio realizado

- `components/magicui/border-beam.tsx` vuelve a usar `motion.div`, `MotionStyle` y `Transition`
- el CTA del navbar vuelve a renderizar `BorderBeam` directamente dentro del link cuando no hay `prefers-reduced-motion`
- se eliminan los keyframes `border-beam-forward` y `border-beam-reverse` de `app/globals.css`
- se ajusta documentacion para dejar claro que esta primitive conserva Motion por fidelidad visual

## Objetivo

Restaurar el resultado visual del CTA del navbar sin deshacer el resto de optimizaciones de CSS critico, preloader, split text, logo y menu responsive.

## Impacto arquitectonico

`BorderBeam` queda como excepcion explicita a la regla de sustituir microanimaciones simples por CSS cuando la equivalencia visual no sea fiable. El resto de primitives optimizadas permanece igual.

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- smoke local del navbar desktop

## Pendientes / limites

La recuperacion reintroduce Motion en esta primitive concreta. Si en el futuro se quiere volver a una version CSS, debe validarse primero visualmente en desktop real antes de sustituir la implementacion de Magic UI.

## Notas para presupuesto

Correccion de regresion visual en componente premium de navegacion: rollback quirurgico de la parte rota, sin perder el trabajo de performance ya aplicado.
