---
change_id: NBS-CHG-2026-05-05-101
date: 2026-05-05
title: Separacion lateral de nodos y cards en how we work
group_id: NBS-TSK-2026-101
category: frontend
subcategories:
  - ui-ux-redesign
  - layout-adjustment
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

Cada wrapper naranja del timeline desktop en `How we work` gana padding lateral para separar nodos y cards de los bordes del viewport sin romper el paso del path SVG por los hitos.

## Contexto / problema

Con el debug activo, se veia que los nodos y las cards quedaban demasiado cerca de los extremos de pantalla dentro de cada row del timeline. Hacia falta darles mas respiracion sin recentrar artificialmente la linea.

## Cambio realizado

- se anade padding horizontal responsivo a cada `DesktopRow` en `components/home/how-we-work.tsx`
- el path no se rehardcodea ni se desacopla: sigue midiendose desde las posiciones reales de los nodos

## Objetivo

Introducir margen visual lateral en cada row del timeline manteniendo intacta la logica del recorrido serpenteante.

## Impacto arquitectonico

Cambio local de frontend sin nuevos contratos, datos ni dependencias.

## Desglose denso

- el padding se aplica sobre el propio contenedor naranja, no sobre la card ni sobre el escenario global
- eso desplaza hacia dentro tanto el nodo como la card de cada fase
- como el SVG usa medicion runtime de nodos, la linea sigue cruzando los hitos aunque estos se hayan movido lateralmente

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- si mas adelante se aumenta bastante el ancho de las cards, puede convenir recalibrar este padding
- los bordes debug siguen visibles en runtime mientras `DEBUG_BORDERS` permanezca activado
- `npm run changes:sync` sigue sin poder ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento menor de layout desktop dentro de una seccion publica existente.
