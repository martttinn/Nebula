---
change_id: NBS-CHG-2026-05-06-129
date: 2026-05-06
title: Supresion de la carcasa del nodo cuando usa imagen
group_id: NBS-TSK-2026-115
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

Los nodos del timeline que usan una imagen dejan de renderizar la carcasa circular con fondo, borde y sombra, de modo que solo se vea el asset.

## Contexto / problema

Tras sustituir el icono del primer nodo por un planeta, la primitive seguía envolviendo la imagen en el shell circular original del sistema de iconos. Eso restaba protagonismo al asset y ocultaba parte de su silueta.

## Cambio realizado

- se detecta de forma explícita cuándo un nodo usa `imageSrc`
- en esos casos, el wrapper del nodo desktop deja de aplicar fondo, borde, sombra, recorte y forma circular
- la imagen del nodo pasa a renderizarse con `object-contain` para mostrar el asset completo en lugar de recortarlo
- se replica la misma lógica en mobile para evitar drift visual entre breakpoints

## Objetivo

Hacer que el planeta sustituya por completo al nodo tradicional y se lea como una pieza visual autónoma, no como un icono incrustado dentro de una cápsula.

## Impacto arquitectonico

Cambio local de frontend sobre la primitive del timeline. No altera el cálculo del path ni la posición de anclaje del nodo.

## Desglose denso

- se conserva la caja de medida del nodo para no romper el centro geométrico que usa el SVG
- solo cambia la presentación visual del wrapper cuando hay imagen
- los nodos basados en `lucide-react` mantienen intacta su carcasa actual

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- si más adelante se decide que los nodos con imagen deban crecer de tamaño, convendrá revisar balance visual y separación respecto a la card
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual pequeño sobre una primitive pública clave, con impacto directo en la lectura de marca del timeline.
