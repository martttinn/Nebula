---
change_id: NBS-CHG-2026-05-03-012
date: 2026-05-03
title: Rediseño del navbar hacia una cápsula única inspirada en la referencia
group_id: NBS-TSK-2026-012
category: frontend
subcategories:
  - ui-ux-redesign
  - design-system
  - layout
origin: client-request
complexity: medium
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
  - app/globals.css
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
related_decisions:
  - "2026-05-03 — El navbar global adopta un formato pill alargado con glassmorphism contenido"
---

# Resumen corto

Se rediseña el navbar de Nebula para aproximarlo a la referencia compartida: una única cápsula larga, más limpia, con links suaves y CTA blanco protagonista.

## Contexto / problema

La primera versión del navbar resolvía la estructura tripartita pedida, pero lo hacía mediante varias cápsulas internas. Martín pidió acercarlo visualmente al patrón mostrado en la imagen de referencia.

## Cambio realizado

- se unifica el navbar en una sola superficie continua
- se elimina la sensación de “píldoras dentro de píldora”
- se suaviza el peso visual de los links centrales
- se convierte el CTA derecho en el foco principal de contraste
- se simplifica el mark de marca para acompañar mejor la nueva composición

## Objetivo

Conseguir un navbar más elegante y cercano a la referencia sin copiar literalmente la identidad de React Bits.

## Impacto arquitectónico

La primitive global de navegación mantiene su API reusable, pero cambia su gramática visual interna hacia una composición más sobria y de una sola pieza.

## Desglose denso

- el shell principal usa ahora `glass-navbar` en lugar de depender del mismo tratamiento de las subpiezas
- los links pasan a funcionar como texto integrado en el cuerpo del navbar
- el CTA blanco se separa como único elemento de alto contraste
- el branding sigue siendo Nebula, no una réplica del logo de la referencia

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- no existe todavía un logo final del proyecto para reemplazar el mark temporal
- la versión móvil avanzada del navbar no se ha desarrollado en este scope

## Notas para presupuesto

Rediseño visual de primitive reusable con impacto claro en percepción de marca y calidad del shell superior del sitio.
