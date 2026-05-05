---
change_id: NBS-CHG-2026-05-04-074
date: 2026-05-04
title: Integración global de Lenis como smooth scroll del runtime público
group_id: NBS-TSK-2026-074
category: frontend
subcategories:
  - motion
  - runtime
  - navigation
origin: client-request
complexity: medium
scope: cross-cutting
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - app
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - package.json
  - package-lock.json
  - app/layout.tsx
  - app/globals.css
  - components/layout/lenis-provider.tsx
  - components/ui/preloader.tsx
  - components/StaggeredMenu.tsx
  - components/home/services-carousel.tsx
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
  - "2026-05-04 — El scroll raíz público se suaviza con Lenis y preserva opt-out en superficies anidadas"
---

# Resumen corto

La web pública integra `Lenis` como smooth scroll global, con anclas internas activas, offset para el navbar fijo y protección explícita de las superficies con scroll propio.

## Contexto / problema

El runtime actual ya usa motion y composición premium en hero, navbar y transiciones locales, pero el desplazamiento global seguía dependiendo del scroll nativo sin una capa de ritmo coherente con ese lenguaje visual.

## Cambio realizado

- se instala `lenis` como dependencia runtime y se importa su stylesheet recomendado
- se añade `components/layout/lenis-provider.tsx` como integración cliente global sobre el scroll raíz
- `Lenis` se activa solo cuando el usuario no expresa `prefers-reduced-motion`
- se habilitan las anclas internas con offset para compensar el navbar fijo
- `app/globals.css` deja de declarar `scroll-behavior: smooth` para no duplicar responsabilidades con `Lenis`
- el `Preloader` pasa a bloquear y liberar también el scroll del `html`, no solo del `body`
- el panel del `StaggeredMenu` y el carrusel móvil de servicios se marcan con `data-lenis-prevent` para preservar su comportamiento local

## Objetivo

Elevar la calidad percibida del desplazamiento global sin romper accesibilidad ni scrolls anidados ya presentes en la home.

## Impacto arquitectonico

La integración queda encapsulada en un provider cliente de layout y en pequeños puntos de opt-out. No introduce estado global de aplicación ni altera el contrato de datos del sitio.

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- no se ha hecho revision visual automatizada en navegador en esta sesion
- varios hashes del navbar siguen sin target real en el runtime actual, por lo que su navegación continúa siendo un límite previo a esta integración
- el repo no expone `npm run changes:sync`

## Notas para presupuesto

Integración transversal de motion con impacto visible en toda la experiencia pública y trabajo adicional de compatibilidad con accesibilidad, preload y scrolls anidados.
