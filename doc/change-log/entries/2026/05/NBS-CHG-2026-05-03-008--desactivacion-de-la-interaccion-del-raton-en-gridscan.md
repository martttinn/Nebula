---
change_id: NBS-CHG-2026-05-03-008
date: 2026-05-03
title: Desactivación de la interacción del ratón en GridScan
group_id: NBS-TSK-2026-008
category: frontend
subcategories:
  - behavior
  - motion
origin: client-request
complexity: low
scope: component-level
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - docs
backend_sensitive: false
files_touched:
  - components/home/grid-scan.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se desactiva la interacción del ratón sobre `GridScan` para que el fondo del hero deje de reaccionar al puntero y conserve solo su animación autónoma.

## Contexto / problema

El efecto visual estaba escuchando movimiento de puntero y aplicando skew, tilt y yaw sobre la rejilla. Martín pidió desactivar esa interacción.

## Cambio realizado

- se retiran los listeners globales de puntero de `GridScan`
- el efecto deja de recalcular skew, tilt y yaw desde la posición del ratón
- la animación del barrido temporal se mantiene intacta

## Objetivo

Mantener el scan grid como fondo ambiental, no como elemento interactivo.

## Impacto arquitectónico

La primitive queda más simple y estable al eliminar una capa de interacción que no se estaba utilizando como requisito real de producto.

## Desglose denso

- el barrido temporal del shader sigue funcionando
- los vectores de puntero permanecen en estado neutro durante toda la ejecución
- se evita también el riesgo de drift en desarrollo por cambios de firma alrededor del `useEffect`

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- no se ha cambiado el fallback ni otros aspectos del hero
- la interacción ya no está disponible a nivel técnico en este estado del componente

## Notas para presupuesto

Pequeño ajuste de comportamiento sobre componente visual ya integrado, orientado a pulir el tono del hero sin tocar layout ni contenido.
