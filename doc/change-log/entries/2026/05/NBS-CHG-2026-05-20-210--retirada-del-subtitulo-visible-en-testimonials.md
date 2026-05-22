---
change_id: NBS-CHG-2026-05-20-210
date: 2026-05-20
title: Retirada del subtitulo visible en testimonials
group_id: NBS-TSK-2026-186
category: frontend
subcategories:
  - ui
  - copy-adjustment
  - visual-system
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
  - components/home/testimonials/index.tsx
  - DESIGN.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - Playwright DOM check testimonials desktop/mobile
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Retirada del subtitulo visible de cada reseña en testimonials, dejando solo el claim principal dentro de la card.

## Contexto / problema

Martín pidió eliminar el subtitulo de reseña en las cards de testimonials. En el runtime actual ese subtitulo correspondia al campo `summary`, renderizado bajo el claim grande de cada testimonio en desktop y mobile.

## Cambio realizado

- `components/home/testimonials/index.tsx` deja de renderizar `testimonial.summary` bajo el claim de las cards.
- La retirada se aplica tanto en `TestimonialCardSurface` desktop como en `MobileTestimonialCard`.
- `DESIGN.md` actualiza el canon de testimonials para describir la reseña visible como un unico claim corto, sin subtitulo secundario.

## Objetivo

Reducir ruido visual en la prueba social y mantener el foco en la frase principal de cada reseña.

## Impacto arquitectonico

Impacto acotado a presentacion frontend y documentacion visual. No cambia el archivo de datos, el stack sticky, la card final de CTA, rutas, backend ni dependencias.

## Desglose denso

El cambio elimina dos nodos de texto visibles, uno en la card desktop y otro en la variante mobile/tablet. El campo `summary` se conserva en `archive.ts` como contenido fuente no renderizado, evitando una limpieza de datos innecesaria para un ajuste visual reversible.

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Playwright DOM check testimonials desktop/mobile
- `npm run changes:sync`

## Pendientes / limites

No se elimina el campo `summary` del archivo de reseñas porque el pedido afecta al render visible, no al archivo repo-safe de contenido.

## Notas para presupuesto

Ajuste de UI/copy visible en testimonials con sincronizacion del sistema visual y verificacion de build.
