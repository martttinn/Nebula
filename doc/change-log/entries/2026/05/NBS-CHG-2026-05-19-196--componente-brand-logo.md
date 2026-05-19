---
change_id: NBS-CHG-2026-05-19-196
date: 2026-05-19
title: Componente BrandLogo para logos externos
group_id: NBS-TSK-2026-172
category: frontend
subcategories:
  - components
  - branding
  - assets
  - design-system
origin: client-request
complexity: low
scope: component-level
user_visible: false
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - docs
backend_sensitive: false
files_touched:
  - components/ui/brand-logo.tsx
  - public/brand-logos/.gitkeep
  - DESIGN.md
verification:
  - npm run typecheck
  - npm run lint
  - npm run design:lint no disponible en package.json
related_decisions: []
---

# Resumen corto

Se añade `BrandLogo` como wrapper centralizado para mostrar SVGs de marcas externas desde `/public/brand-logos`.

## Contexto / problema

Martín pidió una primitive reusable para enseñar logos de tecnologías, empresas o clientes, con variantes cuadradas pequeñas y rectangulares completas, sin acoplar cada uso futuro a paths o dimensiones hardcodeadas.

## Cambio realizado

Se creó `components/ui/brand-logo.tsx` como componente server por defecto basado en `next/image`. El componente construye el asset desde `/brand-logos/{name}.svg`, expone variantes `square` y `rectangular`, tamaños `sm`, `md` y `lg`, y mantiene control de accesibilidad mediante `label` y `decorative`.

También se creó `public/brand-logos/.gitkeep` para dejar versionada la carpeta canónica de SVGs y se documentó la primitive en `DESIGN.md`.

## Objetivo

Disponer de un único punto de entrada para logos externos, preparado para futuros listados de tecnologías, clientes, partners o marcas asociadas sin duplicación estructural.

## Impacto arquitectonico

El cambio vive en `components/ui/` porque es una primitive transversal, no una sección de la home. No introduce estado cliente, no añade dependencias y no modifica ninguna superficie visual existente.

## Desglose denso

- `BrandLogo` acepta `name` como slug del SVG dentro de `/public/brand-logos`.
- `layout="square"` cubre símbolos compactos.
- `layout="rectangular"` cubre wordmarks o logos completos.
- `size` normaliza dimensiones y evita magic numbers por sección.
- `imageClassName` y `className` permiten ajustes locales sin romper el contrato base.
- `priority` queda disponible para casos above-the-fold.
- `decorative` permite ocultar logos puramente ornamentales a tecnologías asistivas.

## Validacion

- `npm run typecheck`: correcto.
- `npm run lint`: correcto.
- `npm run design:lint`: no ejecutable porque el script no existe en el `package.json` real.

## Pendientes / limites

No se añadieron logos reales todavía. Cada SVG futuro debe guardarse en `public/brand-logos/` y consumirse mediante `name` sin incluir la extensión.

El índice del change-log no se regeneró en esta entrega para no pisar cambios ajenos ya presentes en `doc/change-log/index.md`.

## Notas para presupuesto

El valor facturable es principalmente estructural: crea una primitive compartida, reduce duplicación futura en secciones comerciales y deja un contrato documentado para activos de marca externos.
