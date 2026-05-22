---
change_id: NBS-CHG-2026-05-19-208
date: 2026-05-19
title: Logos de empresa en testimonials
group_id: NBS-TSK-2026-184
category: frontend
subcategories:
  - ui
  - branding
  - cards
origin: client-request
complexity: medium
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
  - components/home/testimonials/index.tsx
  - components/home/testimonials/archive.ts
  - components/ui/brand-logo.tsx
  - public/brand-logos/**
  - DESIGN.md
  - doc/change-log/**
verification:
  - file public/brand-logos/fn.png public/brand-logos/gg.png
  - sips -g pixelWidth -g pixelHeight public/brand-logos/fn.png public/brand-logos/gg.png
  - npm run lint
  - npm run typecheck
  - npm run build
  - Playwright smoke visual desktop/mobile testimonials
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Integracion de los logos de Future Nova y Golden Grama en las cards de testimonials, separando el campo combinado `Empresa y cargo` en dos campos independientes.

## Contexto / problema

La seccion de testimonials mostraba empresa y cargo en una unica linea. Al incorporar logos de empresa, ese campo no tenia espacio suficiente ni una jerarquia clara para mostrar logo, empresa y cargo sin competir visualmente.

## Cambio realizado

- Se anaden metadatos opcionales `companyLogo` a los testimonials de Golden Grama y Future Nova.
- Se separa el bloque `Empresa y cargo` en `Empresa` y `Cargo` en desktop y mobile.
- El campo `Empresa` muestra el logo con el nombre de empresa cuando existe asset asociado.
- Los logos se renderizan como imagen directa, sin fondo, borde ni chip contenedor añadido.
- `BrandLogo` acepta nombres con extension real, permitiendo usar PNG ademas de SVG.
- `DESIGN.md` documenta que `brand-logo` soporta SVG y PNG desde `public/brand-logos`.

## Objetivo

Reforzar credibilidad visual de testimonials con marcas reales sin romper la composicion compacta de las cards ni duplicar logica de logos.

## Impacto arquitectonico

El cambio afecta solo a contenido y presentacion frontend. No altera rutas, backend, formularios, SEO global ni contratos de datos externos.

## Validacion

- `file public/brand-logos/fn.png public/brand-logos/gg.png`
- `sips -g pixelWidth -g pixelHeight public/brand-logos/fn.png public/brand-logos/gg.png`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Playwright smoke visual desktop/mobile testimonials
- `npm run changes:sync`

## Pendientes / limites

Canal3Networks no tiene logo asociado en `public/brand-logos`, por lo que mantiene texto plano en el campo `Empresa`.

## Notas para presupuesto

Ajuste visual de confianza social en home: integracion de assets de marca, adaptacion responsive y actualizacion del componente base de logos.
