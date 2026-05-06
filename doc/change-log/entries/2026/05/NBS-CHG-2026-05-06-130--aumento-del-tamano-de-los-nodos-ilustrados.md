---
change_id: NBS-CHG-2026-05-06-130
date: 2026-05-06
title: Aumento del tamano de los nodos ilustrados
group_id: NBS-TSK-2026-116
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

Los nodos del timeline que usan imagen aumentan de tamaño en desktop y mobile para dar más presencia al asset ilustrado.

## Contexto / problema

Tras retirar la carcasa del nodo, la imagen seguía ocupando una caja demasiado contenida y perdía protagonismo frente a la card y la línea SVG.

## Cambio realizado

- se introducen constantes específicas para el tamaño del nodo ilustrado en desktop y mobile
- el nodo con imagen pasa a `88px` en desktop
- el nodo con imagen pasa a `72px` en mobile
- los valores de `sizes` de `next/image` se alinean con esas nuevas dimensiones

## Objetivo

Dar más peso visual al planeta sin alterar el sistema de nodos basado en iconos ni romper la geometría general del timeline.

## Impacto arquitectonico

Cambio local de frontend sobre la primitive del nodo ilustrado. No altera la lógica del path, solo la caja visual del nodo con imagen.

## Desglose denso

- el ajuste se encapsula en constantes para facilitar nuevas calibraciones
- solo se escalan los nodos que usan `imageSrc`
- el resto de nodos con icono conservan tamaño, borde y tratamiento actual

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- si se añaden más nodos ilustrados, puede ser necesario revisar distancias con las cards para conservar ritmo visual homogéneo
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual pequeño con impacto directo en la jerarquía del nodo ilustrado principal del timeline.
