---
change_id: NBS-CHG-2026-05-06-137
date: 2026-05-06
title: Alineacion del eje mobile con los planetas y ampliacion del copy visible
group_id: NBS-TSK-2026-123
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
  - DESIGN.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
---

# Resumen corto

La variante móvil del timeline alinea la guía vertical con el centro real de los planetas y amplía el texto visible de cada card para evitar truncados demasiado agresivos.

## Contexto / problema

Tras sustituir los nodos por planetas más grandes, la línea vertical mobile seguía colocada sobre el eje del antiguo nodo circular. Además, el clamp de dos líneas se había quedado demasiado corto para el ancho disponible en móvil.

## Cambio realizado

- se define una constante específica para el eje horizontal de la guía mobile basada en el tamaño real del planeta
- la línea vertical pasa a posicionarse sobre el centro del asset ilustrado en lugar de usar el `left-7` heredado
- el copy de las cards mobile deja de limitarse a dos líneas y pasa a un clamp más generoso
- se actualiza `DESIGN.md` para fijar ambos guardrails en la variante móvil de `process-timeline`

## Objetivo

Mejorar la coherencia geométrica del eje vertical y recuperar más legibilidad de copy en móvil sin tocar la composición desktop.

## Impacto arquitectonico

Cambio local de frontend con ajuste del canon visual. No modifica datos, motion principal ni geometría del SVG desktop.

## Desglose denso

- la guía mobile ahora se deriva de `IMAGE_NODE_MOBILE_SIZE`, por lo que acompañará futuros cambios de escala del planeta
- el clamp del texto mobile queda desacoplado del de desktop para responder a la realidad de un ancho más estrecho
- el resto del tratamiento visual de la sección permanece intacto

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- si el copy vuelve a crecer mucho, el siguiente paso lógico sería revisar también el `gap` vertical entre items o el tamaño de título mobile
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual localizado de la variante móvil con impacto claro en alineación y legibilidad.
