---
change_id: NBS-CHG-2026-05-06-122
date: 2026-05-06
title: Retirada del eyebrow y clamp a dos lineas en las cards de how we work
group_id: NBS-TSK-2026-108
category: frontend
subcategories:
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
  - npm run build
---

# Resumen corto

Las cards de `How we work` eliminan el eyebrow superior y limitan la descripción visible a un máximo de dos líneas tanto en desktop como en móvil.

## Contexto / problema

La jerarquía interna de las cards seguía arrastrando un eyebrow visual que ya no aportaba suficiente valor frente al título y, además, las descripciones podían ocupar demasiado alto variable, generando más ruido del deseado dentro de una sección muy guiada por composición.

## Cambio realizado

- se retira el bloque superior `número + línea` de las cards desktop en `components/home/how-we-work.tsx`
- se retira el mismo eyebrow de las cards mobile para mantener consistencia entre breakpoints
- la descripción de ambas variantes pasa a usar un clamp visual de dos líneas

## Objetivo

Simplificar la jerarquía de las cards y controlar mejor su altura visual para que el foco recaiga en nodo, título y recorrido del timeline.

## Impacto arquitectonico

Cambio local de frontend sin alterar layout estructural, medición del path ni contratos de datos.

## Desglose denso

- el número de fase sigue existiendo en los nodos y en la secuencia general del timeline, así que el eyebrow resultaba redundante
- el clamp se resuelve a nivel de estilo de texto, no truncando datos en origen
- la altura percibida de las cards queda más estable entre fases con copys de distinta longitud

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- el clamp a dos líneas es visual; el contenido completo sigue estando en el DOM
- `DEBUG_BORDERS` sigue activo en `components/home/how-we-work.tsx`, por lo que los outlines de inspección continúan visibles en runtime
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual pequeño y localizado sobre la jerarquía interna de una sección pública protagonista.
