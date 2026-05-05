---
change_id: NBS-CHG-2026-05-05-100
date: 2026-05-05
title: Reactivacion de bordes debug en how we work
group_id: NBS-TSK-2026-100
category: frontend
subcategories:
  - ui-ux-redesign
  - diagnostics
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - docs
backend_sensitive: false
files_touched:
  - components/home/how-we-work.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La seccion `How we work` vuelve a mostrar sus bordes debug para inspeccionar en runtime la geometria del timeline, cards y wrappers.

## Contexto / problema

Tras el replanteamiento de la seccion hacia un timeline serpenteante full-width, hace falta volver a visualizar outlines de depuracion para revisar ocupacion real, alineaciones y anchos de cada capa.

## Cambio realizado

- se activa de nuevo el flag local `DEBUG_BORDERS` en `components/home/how-we-work.tsx`

## Objetivo

Facilitar inspeccion visual directa del layout sin introducir cambios estructurales ni tocar la logica del timeline.

## Impacto arquitectonico

Cambio local de frontend sin nuevos contratos ni dependencias.

## Desglose denso

- el helper `debugOutline` vuelve a producir outlines en las capas instrumentadas de la seccion
- el timeline, sus wrappers y las cards quedan de nuevo trazables visualmente en runtime
- la logica del path SVG y del reveal por scroll no cambia

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- los bordes debug permaneceran visibles hasta desactivar otra vez el flag local
- `npm run changes:sync` sigue sin poder ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Iteracion menor de inspeccion visual sobre una seccion publica existente.
