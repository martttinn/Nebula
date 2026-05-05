---
change_id: NBS-CHG-2026-05-03-043
date: 2026-05-03
title: Confirmación del CTA `Contactar` sin fill en hover
group_id: NBS-TSK-2026-043
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
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se confirma el CTA `Contactar` del navbar en estado outlined puro: transparente en reposo y también en hover, sin relleno lila interior.

## Contexto / problema

Martín pidió volver exactamente al estado previo a los hover custom, y la captura confirmaba que hacía falta verificar que no quedase ningún relleno residual.

## Cambio realizado

- se mantiene el `background: transparent` inline del shell interno
- no se aplican overrides de hover para el fondo
- se deja constancia documental del estado final vigente

## Objetivo

Fijar el CTA en una lectura premium, ligera y completamente outlined.

## Impacto arquitectónico

Estado final confirmado sobre la integración del navbar, sin cambios en la primitive `StarBorder`.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si en el futuro se reintroduce un hover más activo, deberá hacerse como una decisión nueva y explícita

## Notas para presupuesto

Confirmación menor de estado visual final.
