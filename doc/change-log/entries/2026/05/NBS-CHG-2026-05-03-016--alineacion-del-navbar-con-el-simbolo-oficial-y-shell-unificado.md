---
change_id: NBS-CHG-2026-05-03-016
date: 2026-05-03
title: Alineación del navbar con el logo oficial horizontal2 y shell unificado
group_id: NBS-TSK-2026-016
category: frontend
subcategories:
  - branding
  - design-system
  - layout
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
  - components/layout/navbar.tsx
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

El navbar pasa a usar el logo oficial `horizontal2` del repo y elimina las cápsulas internas para que todo el material visual viva sobre el shell global.

## Contexto / problema

Martín pidió dos cambios concretos: sustituir el logomark inventado por el asset oficial `horizontal2` de `public/logo/horizontal2/` y retirar outlines/fondos internos para que las tres zonas se lean como parte de una única superficie glass.

## Cambio realizado

- se usa `nebula-dark-horizontal2.svg` como logo de marca en la izquierda del navbar
- logo, links y CTAs siguen organizados en tres zonas, pero sin pills ni superficies internas
- el shell base usa ahora un único trazo interno uniforme para evitar variaciones aparentes de grosor en el borde
- se actualizan `DESIGN.md`, `decisions-log` y la referencia técnica para describir el shell unificado

## Objetivo

Reforzar coherencia de marca y limpiar la gramática visual del navbar hacia una sola pieza global.

## Impacto arquitectónico

No cambia la API pública del componente, pero sí su contrato visual y la procedencia del logotipo usado en runtime.

## Desglose denso

- `BrandMark` deja de ser un dibujo CSS y se sustituye por un `Image` con el logo oficial `horizontal2`
- el layout mantiene composición tripartita con `logo / links / CTAs`
- el efecto glass queda concentrado únicamente en el `nav` raíz

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- el ajuste final usa `horizontal2` porque es la variante pedida explícitamente y ya incorpora el wordmark, por lo que no hace falta duplicarlo como texto al lado

## Notas para presupuesto

Ajuste fino de branding y composición de una primitive global reusable ya existente.
