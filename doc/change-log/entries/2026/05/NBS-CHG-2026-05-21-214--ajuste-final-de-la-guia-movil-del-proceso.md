---
change_id: NBS-CHG-2026-05-21-214
date: 2026-05-21
title: Ajuste final de la guia movil del proceso
group_id: NBS-TSK-2026-190
category: frontend
subcategories:
  - ui
  - mobile
  - bugfix
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
  - components/home/how-we-work/constants.ts
  - components/home/how-we-work/index.tsx
  - components/home/how-we-work/primitives.tsx
  - DESIGN.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - Playwright mobile viewport 390x844
  - Playwright geometry check: el ultimo tramo termina en el centro del planeta final
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Correccion del final de la guia vertical movil del proceso para que no sobrepase el ultimo planeta.

## Contexto / problema

Martín detecto en mobile que la linea vertical de la seccion de proceso continuaba por debajo de la imagen del ultimo planeta. La implementacion anterior dibujaba una unica linea absoluta con `top` y `bottom` dentro de todo el listado, por lo que el final dependia de la altura de la ultima card y no del nodo ilustrado.

## Cambio realizado

- Se elimina la linea global del `ol` mobile.
- `MobileCard` dibuja ahora su propio tramo de guia vertical.
- Los tramos intermedios puentean la mitad del gap entre filas para conservar continuidad.
- El ultimo tramo termina en `MOBILE_TIMELINE_NODE_CENTER_Y`, el centro visual del planeta mobile.
- `DESIGN.md` explicita que la guia movil debe terminar en el centro del ultimo planeta y no prolongarse bajo su imagen.

## Objetivo

Mantener una guia vertical limpia y alineada con los planetas sin que el trazo invada el espacio inferior del ultimo hito.

## Impacto arquitectonico

Impacto acotado a la presentacion responsive de `how-we-work`. No cambia el path SVG desktop, el contenido de los pasos, la capa de datos ni las dependencias.

## Desglose denso

Se centralizan constantes de geometria mobile (`MOBILE_TIMELINE_NODE_TOP`, `MOBILE_TIMELINE_ROW_GAP`, `MOBILE_TIMELINE_LINE_BRIDGE`, `MOBILE_TIMELINE_NODE_CENTER_Y`) para que la posicion de la linea derive del tamano real del planeta mobile. `MobileCard` recibe `isFirst` e `isLast` para calcular los extremos del tramo sin depender de la altura variable de las cards.

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Playwright mobile viewport 390x844
- Playwright geometry check: el ultimo tramo termina en el centro del planeta final
- `npm run changes:sync`

## Pendientes / limites

No se redibuja la coreografia desktop ni el serpenteo SVG; el ajuste se limita al fallback mobile vertical.

## Notas para presupuesto

Ajuste visual responsive puntual en una seccion publica de la home.
