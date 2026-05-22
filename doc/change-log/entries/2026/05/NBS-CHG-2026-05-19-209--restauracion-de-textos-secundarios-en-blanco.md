---
change_id: NBS-CHG-2026-05-19-209
date: 2026-05-19
title: Restauracion de textos secundarios en blanco
group_id: NBS-TSK-2026-185
category: frontend
subcategories:
  - ui
  - drift
  - visual-system
origin: client-request
complexity: low
scope: component-level
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
backend_sensitive: false
files_touched:
  - components/home/services-carousel/primitives.tsx
  - components/home/projects-showcase/index.tsx
  - components/home/testimonials/index.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - Playwright computed styles servicios/proyectos/testimonials
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Restauracion del color blanco suave en textos secundarios de servicios, proyectos y testimonials tras el drift visual provocado por la migracion de Tailwind.

## Contexto / problema

Martín detecto que varios subtitulos y descripciones se estaban renderizando con lectura lila. Esos textos debian mantener el blanco suave que tenian antes de la actualizacion.

## Cambio realizado

- El subtitulo de las cards de servicios pasa de `nebula-haze` a `nebula-silver`.
- La descripcion de proyectos pasa de `nebula-haze` a `nebula-silver` en desktop y mobile.
- El resumen de testimonials pasa de `nebula-haze` a `nebula-silver` en desktop y mobile.

## Objetivo

Eliminar el tinte lila en textos descriptivos principales sin alterar layout, contenido ni jerarquia de las cards.

## Impacto arquitectonico

Impacto acotado a clases visuales de componentes publicos. No cambia datos, rutas, animaciones, backend ni dependencias.

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Playwright computed styles servicios/proyectos/testimonials
- `npm run changes:sync`

## Pendientes / limites

No se modifica el uso de `nebula-haze` en labels o metadatos pequeños, porque forman parte de la jerarquia secundaria y no corresponden a los textos senalados.

## Notas para presupuesto

Correccion visual post-upgrade en tres componentes publicos para recuperar consistencia cromatica.
