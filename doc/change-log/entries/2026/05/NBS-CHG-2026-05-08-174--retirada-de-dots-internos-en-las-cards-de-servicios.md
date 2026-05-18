---
change_id: NBS-CHG-2026-05-08-174
date: 2026-05-08
title: Retirada de dots internos en las cards de servicios
group_id: NBS-TSK-2026-152
category: frontend
subcategories:
  - feature
origin: client-request
complexity: medium
scope: local
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
  - components/home/services-carousel/primitives.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Las cards de `services-carousel` dejan de mostrar los dots cromáticos internos del fondo y conservan solo el shell, la rejilla y el tratamiento del icono.

## Contexto / problema

Martín pidió eliminar los dots de color que aparecían dentro de las cards de servicios. Esos puntos venían de los radial gradients internos del background de card y de un glow circular adicional en la zona baja.

## Cambio realizado

- se retiran del background de `ServiceCardChrome` los dos radial gradients ornamentales que generaban puntos visibles dentro de la card
- se elimina también el glow circular de acento colocado en la esquina inferior izquierda de cada card
- se mantiene intacto el `BorderGlow` perimetral, la rejilla interior, el fondo base y el halo del icono central
- se registra la entrega en el `change-log`

## Objetivo

Limpiar visualmente las cards de servicios quitando ruido ornamental puntual sin perder el lenguaje general del carrusel.

## Impacto arquitectonico

Ajuste localizado en `components/home/services-carousel/primitives.tsx`. No cambia la estructura del carrusel, su motion, el catálogo de servicios ni la primitive de borde; solo simplifica el chrome visual interno de cada card.

## Desglose denso

- la capa `linear-gradient(180deg, rgb(11,12,22), rgb(10,15,46))` permanece como fondo tonal principal
- la rejilla `bg-nebula-grid` también permanece para no dejar la card completamente plana
- desaparecen los focos circulares de color que competían con el icono 3D y con el copy
- el icono mantiene su glow propio, así que la jerarquía visual pasa a descansar más en `title + icon + CTA` y menos en ornamento de fondo

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

- el ajuste no toca el `BorderGlow` del perímetro; si también quieres adelgazar ese lenguaje de acento, habría que revisar `ServiceCardChrome` y posiblemente `BorderGlow` en otra entrega
- no se ha hecho revisión visual manual en navegador dentro de este hilo; el cierre aquí queda validado por checks estáticos y build

## Notas para presupuesto

Refinamiento visual puntual en una sección pública ya integrada, orientado a reducir ruido ornamental y reforzar limpieza del layout.
