---
change_id: NBS-CHG-2026-05-08-176
date: 2026-05-08
title: Ajuste tipografico del quote en testimonials
group_id: NBS-TSK-2026-154
category: frontend
subcategories:
  - feature
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
  - components/home/testimonials/index.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
---

# Resumen corto

El texto principal de cada reseña en `Testimonials` deja de usar la tipografia display y pasa a renderizarse con la tipografia secundaria del sistema.

## Contexto / problema

Martín pidió que el quote de las reseñas usase la tipografia secundaria de Nebula Studios en vez de la display. Mantener `Syne` en esa pieza dejaba la cita menos alineada con el canon `Syne + Inter` previsto para esta sección.

## Cambio realizado

- se sustituye `font-display` por `font-sans` en el quote desktop
- se sustituye `font-display` por `font-sans` en el quote mobile
- se registra la entrega en el `change-log`

## Objetivo

Alinear la cita principal de las reseñas con la tipografia secundaria del sistema sin alterar la estructura, el motion ni la jerarquia del resto de la card.

## Impacto arquitectonico

Ajuste visual localizado en `components/home/testimonials/index.tsx`. No cambia datos, layout general, comportamiento sticky ni contratos compartidos.

## Desglose denso

- el nombre del autor y el heading de sección conservan su tratamiento actual
- solo cambia la familia tipografica aplicada al texto de la cita
- la seccion mantiene la misma composicion en desktop y mobile

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

- no se hizo revision visual manual en navegador dentro de este hilo
- no se reajustaron manualmente tracking, leading ni escala mas alla del cambio de familia tipografica

## Notas para presupuesto

Ajuste visual puntual en una superficie publica, con impacto visible para la lectura editorial y cierre documental asociado.
