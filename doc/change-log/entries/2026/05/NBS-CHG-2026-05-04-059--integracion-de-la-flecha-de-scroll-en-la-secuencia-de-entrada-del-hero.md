---
change_id: NBS-CHG-2026-05-04-059
date: 2026-05-04
title: Integración de la flecha de scroll en la secuencia de entrada del hero
group_id: NBS-TSK-2026-059
category: frontend
subcategories:
  - hero
  - motion
  - affordance
origin: client-request
complexity: low
scope: local
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
  - components/home/hero-lead.tsx
  - app/globals.css
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
---

# Resumen corto

El hero muestra ahora una flecha inferior como indicación de scroll y la integra en la secuencia de entrada para que aparezca después de los CTAs.

## Contexto / problema

Martín pidió añadir una flecha en la parte inferior del hero para reforzar la continuidad vertical. Después ajustó el requisito para que esa flecha no apareciera aislada, sino como último paso de la coreografía de entrada del contenido.

## Cambio realizado

- se añade una affordance visual inferior compuesta por línea vertical y flecha `ChevronDown`
- se retira la versión estática inicial del shell del hero y se reubica la cue dentro de `HeroLead`
- se introduce el estado `scrollCueVisible` para disparar la flecha solo después de mostrar los CTAs
- se añade la animación `hero-scroll-cue` en `app/globals.css` con deriva vertical sutil y respeto a `prefers-reduced-motion`

## Objetivo

Hacer más evidente que el usuario puede seguir descendiendo, sin romper la jerarquía del hero ni prometer una navegación real que la página todavía no ofrece.

## Impacto arquitectónico

El ajuste se queda encapsulado en la capa de presentación del hero. No cambia routing, no introduce anchors nuevos y mantiene la coordinación de la secuencia dentro de la isla cliente ya existente.

## Validación

- `npm run lint`
- `npm run build`

## Pendientes / límites

- no se ha hecho revisión visual automatizada en navegador en esta sesión
- la flecha actúa como indicación visual, no como enlace, porque `app/page.tsx` sigue sin montar una siguiente sección real

## Notas para presupuesto

Refinamiento puntual de UX visual y motion sobre la zona de mayor impacto de la landing.
