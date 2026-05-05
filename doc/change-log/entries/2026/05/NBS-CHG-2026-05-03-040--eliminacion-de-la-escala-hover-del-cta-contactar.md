---
change_id: NBS-CHG-2026-05-03-040
date: 2026-05-03
title: Eliminación de la escala hover del CTA `Contactar`
group_id: NBS-TSK-2026-040
category: frontend
subcategories:
  - components
  - branding
  - interaction
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

Se elimina por completo la escala del `hover` del CTA `Contactar` del navbar. El estado base permanece transparente y el `hover` solo rellena el interior en lila de marca.

## Contexto / problema

Martín pidió retirar del todo el zoom del botón y dejar el estado interactivo reducido al cambio de color de fondo.

## Cambio realizado

- se elimina la clase de escala del contenedor del CTA
- se conservan el estado base transparente y el fill lila en `hover`
- se sincronizan las referencias documentales con el nuevo comportamiento final

## Objetivo

Mantener una interacción más limpia y menos invasiva dentro del navbar.

## Impacto arquitectónico

Ajuste menor de microinteracción en la integración del navbar, sin tocar la primitive `StarBorder`.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- no hay arrastres funcionales esperados; si se quiere más feedback visual en el futuro, convendrá trabajar color, borde o glow antes que reintroducir escala

## Notas para presupuesto

Refinamiento menor de interacción.
