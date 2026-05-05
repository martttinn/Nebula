---
change_id: NBS-CHG-2026-05-04-082
group_id: NBS-TSK-2026-082
date: 2026-05-04
title: Normalizacion del hover de la variante secondary del sistema de botones
type: ui
status: done
owner: Codex
tags:
  - ui
  - buttons
  - primitives
  - design-system
---

# Contexto

La variante `secondary` del sistema de botones todavía no expresaba por defecto el hover que Martín esperaba: el fondo solo se aclaraba ligeramente y la microescala quedaba demasiado contenida.

## Cambio realizado

- la variante `secondary` pasa a usar `hover:bg-white`, `hover:text-black` y `hover:border-white`
- el `hoverScale` por defecto del wrapper de botón queda especializado a `1.05` para `secondary`
- se eliminan overrides locales en el CTA secundario del hero y en el botón `Ver más` de servicios que todavía rebajaban el blanco del hover a `10%`
- se actualiza `DESIGN.md` para fijar este comportamiento como regla del sistema visual

## Objetivo

Eliminar overrides repetidos y hacer que cualquier `Button` `secondary` herede ya el hover correcto desde la primitive.

## Impacto

El sistema de botones gana consistencia y los consumos concretos de `secondary` pasan a comportarse de forma más visible y más alineada con el lenguaje premium del proyecto.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- si algún consumo concreto necesita una respuesta más contenida, deberá sobrescribir de forma explícita el `hoverScale` o el color de `hover`
