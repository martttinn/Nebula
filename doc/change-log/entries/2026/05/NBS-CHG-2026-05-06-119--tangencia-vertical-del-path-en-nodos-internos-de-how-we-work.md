---
change_id: NBS-CHG-2026-05-06-119
date: 2026-05-06
title: Tangencia vertical del path en nodos internos de how we work
group_id: NBS-TSK-2026-105
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

El path SVG del timeline desktop en `How we work` pasa ahora por los nodos internos con tangencia vertical, de modo que entra por el eje superior del nodo y sale por el eje inferior sin perder la curvatura general del recorrido.

## Contexto / problema

Tras abrir manualmente las curvas intermedias, la geometria global del timeline se acercaba al resultado deseado, pero el paso por los nodos centrales seguia resolviendose con tangencia oblicua. Eso hacia que la linea no atravesara los hitos como una bajada vertical limpia por su eje.

## Cambio realizado

- se ajusta `buildSmoothPath` en `components/home/how-we-work.tsx`
- los `control points` de entrada y salida se fijan al mismo `x` del nodo cuando el punto compartido corresponde a un nodo interno
- se mantienen intactos los offsets verticales ya usados para definir la amplitud y la curvatura local

## Objetivo

Conseguir que la linea entre y salga de los nodos internos por el centro vertical del hito, respetando el gesto curvo del resto del tramo.

## Impacto arquitectonico

Cambio local de frontend sobre la generacion del path SVG. No modifica layout, medicion runtime ni estructura de datos de la seccion.

## Desglose denso

- el algoritmo ya calculaba alturas de handle simetricas alrededor de cada nodo interno
- faltaba anclar la componente horizontal de esos handles al eje `x` del nodo para forzar una tangencia vertical real
- el cambio se aplica solo a puntos internos del path, no a la entrada desde el borde ni a la salida final
- los valores manuales de apertura horizontal y vertical siguen gobernando la amplitud del recorrido entre nodos

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- la aprobacion final sigue siendo visual, porque la calidad del gesto depende del balance estetico entre amplitud y tangencia
- `DEBUG_BORDERS` sigue activo en `components/home/how-we-work.tsx`, asi que los contornos de inspeccion permanecen visibles en runtime
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual localizado sobre una seccion editorial protagonista. Combina ajuste geometrico de SVG y mejora perceptiva clara del recorrido del timeline.
