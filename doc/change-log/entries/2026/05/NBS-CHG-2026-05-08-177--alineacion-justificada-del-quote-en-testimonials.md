---
change_id: NBS-CHG-2026-05-08-177
date: 2026-05-08
title: Alineacion izquierda del quote en testimonials
group_id: NBS-TSK-2026-155
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

El texto del quote en `Testimonials` pasa a renderizarse alineado a la izquierda tanto en desktop como en mobile.

## Contexto / problema

Tras mover la cita a la tipografia secundaria y probar una version justificada, Martín pidió dejar el texto alineado a la izquierda. Mantener la justificacion ya no reflejaba la direccion visual deseada para la cita.

## Cambio realizado

- se sustituye `text-justify` por `text-left` en el parrafo del quote desktop
- se sustituye `text-justify` por `text-left` en el parrafo del quote mobile
- se registra la entrega en el `change-log`

## Objetivo

Hacer que la cita principal de cada reseña adopte una lectura alineada a la izquierda, mas limpia y controlada, sin alterar la estructura ni el contenido de la seccion.

## Impacto arquitectonico

Ajuste visual localizado en `components/home/testimonials/index.tsx`. No cambia datos, motion, layout base ni contratos compartidos.

## Desglose denso

- el cambio afecta solo al bloque del quote
- el nombre del autor, cargo y compania conservan su alineacion actual
- la composicion general de la card se mantiene intacta

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

- no se hizo revision visual manual en navegador dentro de este hilo
- si despues se quiere que el bloque completo arranque tambien desde el borde izquierdo de su columna, haria falta mover la caja del quote y no solo su alineacion interna

## Notas para presupuesto

Ajuste visual puntual sobre una seccion publica con impacto visible en la lectura y la composicion editorial del bloque de testimonios.
