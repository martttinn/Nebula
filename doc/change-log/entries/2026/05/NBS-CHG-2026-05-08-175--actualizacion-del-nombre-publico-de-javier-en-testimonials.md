---
change_id: NBS-CHG-2026-05-08-175
date: 2026-05-08
title: Actualizacion del nombre publico de Javier en testimonials
group_id: NBS-TSK-2026-153
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
  - components/home/testimonials/content.ts
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
---

# Resumen corto

La reseña pública de `Golden Grama` pasa a mostrar `Javier Martinez` como nombre visible en vez de `Javier`.

## Contexto / problema

Martín pidió corregir el nombre visible de la reseña de `Golden Grama` para que el testimonial público mostrase `Javier Martinez`. Mantener el nombre abreviado habría dejado el runtime y las referencias vivas desalineadas respecto al dato confirmado.

## Cambio realizado

- se actualiza `author` de `Javier` a `Javier Martinez` en el catálogo `HOME_TESTIMONIALS`
- se alinean las referencias vivas que enumeran explícitamente el catálogo actual de testimonios en la referencia técnica y en el `decisions-log`
- se registra la entrega en el `change-log`

## Objetivo

Corregir un dato público visible de la sección `Testimonials` sin alterar la estructura, el copy ni la composición de la sección.

## Impacto arquitectonico

Ajuste factual localizado en el catálogo estático `components/home/testimonials/content.ts`, con sincronización documental en artefactos que describen el runtime actual. No cambia layout, motion, componentes ni contratos de datos.

## Desglose denso

- el testimonial de `Golden Grama` conserva la misma cita, rol y compañía
- solo cambia el nombre público del autor de la reseña
- al existir referencias vivas al catálogo actual fuera del componente, se actualizan también esos listados para evitar drift documental

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

- no se ha tocado el histórico narrativo de entradas antiguas del `change-log` que ya registraban el estado anterior como contexto de aquella entrega
- no se hizo revisión visual manual en navegador dentro de este hilo; la validación cerrada aquí es estática y de build

## Notas para presupuesto

Corrección factual de contenido público y alineación documental mínima asociada al catálogo de testimonios.
