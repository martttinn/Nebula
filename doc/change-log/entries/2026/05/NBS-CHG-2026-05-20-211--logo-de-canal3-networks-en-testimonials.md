---
change_id: NBS-CHG-2026-05-20-211
date: 2026-05-20
title: Logo de Canal3 Networks en testimonials
group_id: NBS-TSK-2026-187
category: frontend
subcategories:
  - ui
  - branding
  - copy-adjustment
origin: client-request
complexity: low
scope: component-level
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - data
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/home/testimonials/archive.ts
  - public/brand-logos/c3.png
  - doc/change-log/**
verification:
  - file public/brand-logos/c3.png
  - sips -g pixelWidth -g pixelHeight public/brand-logos/c3.png
  - npm run lint
  - npm run typecheck
  - npm run build
  - Playwright DOM check testimonials desktop/mobile
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Integracion del logo `c3.png` de Canal3 Networks en la reseña correspondiente de testimonials y normalizacion del nombre visible de empresa.

## Contexto / problema

Martín añadió el asset `public/brand-logos/c3.png` y pidió usarlo en la reseña respectiva. La primitive `BrandLogo` ya soportaba PNG y la card ya renderizaba logos cuando el testimonial exponia `companyLogo`.

## Cambio realizado

- Se valida que `public/brand-logos/c3.png` es un PNG cuadrado de 432 x 432 px.
- Se añade `companyLogo` a la entrada `raul-rodriguez-canal3networks` en `components/home/testimonials/archive.ts`.
- El logo se consume con `name: "c3.png"` y `label: "Canal3 Networks"`.
- El nombre visible de la empresa pasa de `Canal3Networks` a `Canal3 Networks`.

## Objetivo

Mostrar el logo de Canal3 Networks junto al nombre correcto de empresa en la card de su reseña, usando la misma primitive y jerarquia ya aplicada a Golden Grama y Future Nova.

## Impacto arquitectonico

Impacto limitado al catalogo estatico de reseñas. No se modifica la primitive `BrandLogo`, el layout de testimonials, rutas, backend ni dependencias.

## Desglose denso

La implementacion aprovecha el contrato opcional `companyLogo` ya existente. Al ser un PNG cuadrado, encaja con `layout="square"` y `size="sm"` sin abrir estilos especificos para Canal3.

## Validacion

- `file public/brand-logos/c3.png`
- `sips -g pixelWidth -g pixelHeight public/brand-logos/c3.png`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Playwright DOM check testimonials desktop/mobile
- `npm run changes:sync`

## Pendientes / limites

No quedan reseñas visibles sin logo asociado en el catalogo actual.

## Notas para presupuesto

Ajuste puntual de prueba social visual con asset de marca proporcionado por el cliente.
