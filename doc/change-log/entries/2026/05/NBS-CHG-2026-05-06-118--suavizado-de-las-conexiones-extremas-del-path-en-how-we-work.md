---
change_id: NBS-CHG-2026-05-06-118
date: 2026-05-06
title: Suavizado de las conexiones extremas del path en how we work
group_id: NBS-TSK-2026-104
category: frontend
subcategories:
  - bugfix
  - ui-ux-redesign
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - docs
  - web
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

La linea SVG del timeline desktop en `How we work` suaviza su entrada al primer nodo y su salida desde el ultimo, evitando que los tramos extremos hereden una curvatura vertical exagerada del tramo vecino.

## Contexto / problema

En runtime, la conexion borde izquierda -> nodo inicial y nodo final -> borde derecho mostraba una curva innecesaria y demasiado dramatica cerca de los hitos extremos. El gesto central del timeline funcionaba, pero los extremos se veian menos naturales de lo deseado.

## Cambio realizado

- se ajusta `buildSmoothPath` en `components/home/how-we-work.tsx`
- los segmentos extremos dejan de calcular su tangencia vertical usando la referencia del tramo siguiente o anterior
- en los extremos la curva pasa a apoyarse solo en el delta vertical real entre el borde y el nodo correspondiente

## Objetivo

Hacer que la entrada y la salida del path se lean mas lineales, organicas y contenidas sin aplanar la S central del timeline.

## Impacto arquitectonico

Cambio local de frontend en la logica de generacion del SVG. No altera layout, contratos ni medicion runtime de nodos.

## Desglose denso

- la medicion de puntos base sigue igual: el SVG sigue anclado a posiciones reales de los nodos
- el ajuste se limita a los `control points` de los segmentos `edge`
- los tramos intermedios mantienen su comportamiento anterior, por lo que la expresividad del serpenteo central no se reduce
- el resultado esperado es una tangencia mas limpia junto al nodo inicial y al nodo final, con menos “rebote” visual cerca de ambos extremos

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- no se ha hecho una captura comparativa automatizada; la validacion visual final sigue dependiendo de revisar la seccion en navegador
- `DEBUG_BORDERS` permanece activo en `components/home/how-we-work.tsx`, por lo que los outlines de inspeccion siguen visibles en runtime
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual localizado con impacto directo en la calidad percibida de una seccion publica ya integrada. Mezcla pequena de correccion de trayectoria y pulido de UX visual.
