---
change_id: NBS-CHG-2026-05-05-099
date: 2026-05-05
title: Replanteamiento de how we work como timeline serpenteante full-width
group_id: NBS-TSK-2026-099
category: frontend
subcategories:
  - ui-ux-redesign
  - motion
  - scroll-interactions
origin: client-request
complexity: medium
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/home/how-we-work.tsx
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

`How we work` deja atras el timeline centrado anterior y pasa a resolverse como una composicion full-width con path SVG serpenteante, nodos con icono y cards reveladas por scroll justo antes de cada hito.

## Contexto / problema

La seccion previa no reproducia la logica narrativa deseada. El recorrido de la linea no nacía desde el lateral ni cruzaba la pantalla como un hilo continuo, y la relacion temporal entre la linea y la aparicion de las cards quedaba menos marcada que en la referencia objetivo.

## Cambio realizado

- se reescribe `components/home/how-we-work.tsx` con una nueva arquitectura visual
- el path SVG se genera dinamicamente a partir de las posiciones reales de los nodos usando `ResizeObserver`
- la linea entra desde el lateral izquierdo, serpentea de un extremo a otro y sale por el lado contrario
- cada nodo incorpora icono y tratamiento circular luminoso
- cada card se revela ligeramente antes de que el progreso del path alcance su nodo
- la variante movil se simplifica a rail vertical con nodos e iconos para no comprometer legibilidad
- se actualiza `doc/reference/technical-reference.md` para reflejar el nuevo runtime real

## Objetivo

Acercar la seccion al comportamiento y a la sensacion espacial de la referencia, reforzando el caracter premium de la home sin perder claridad de lectura.

## Impacto arquitectonico

El cambio es local al frontend publico, pero introduce una nueva primitive de motion basada en medicion runtime, progresos de scroll y sincronizacion entre el path y el reveal de contenido.

## Desglose denso

- el escenario desktop pasa a ser realmente full-width y deja que la linea use el ancho disponible como parte del lenguaje visual
- el path ya no depende de coordenadas hardcodeadas: nace de los centros reales de los nodos y se recompone en resize
- los nodos actuan como hitos visuales intermedios entre cards y linea, con iconos semanticos por fase
- el reveal de las cards se adelanta respecto al stop del nodo para que el contenido se perciba como consecuencia del avance del recorrido, no como efecto aislado
- la seccion mantiene `prefers-reduced-motion` como degradacion funcional

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- el ajuste visual fino del path puede seguir iterandose si cambian las referencias o la proporcion final deseada entre nodos y cards
- la version movil prioriza legibilidad y no replica el mismo recorrido serpenteante horizontal del desktop
- `npm run changes:sync` sigue sin poder ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refactor visual y de interaccion de una seccion publica con trabajo de motion, layout y medicion dinamica.
