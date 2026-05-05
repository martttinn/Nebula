---
change_id: NBS-CHG-2026-05-05-089
group_id: NBS-TSK-2026-089
date: 2026-05-05
title: Cambio del subheader del hero a blanco
type: ui
status: done
owner: Codex
tags:
  - hero
  - typography
  - ui
---

# Contexto

Martín pidió que el subheader del hero pase a blanco en lugar de usar el tono `Haze` previo.

## Cambio realizado

- el contenedor tipográfico del subheader cambia de `text-nebula-haze` a `text-white`
- el `SplitText` del subheader alinea tanto `className` como `segmentClassName` a blanco para no mezclar colores durante el reveal

## Objetivo

Reforzar el contraste y la claridad del texto secundario del hero.

## Impacto

El hero gana un subheader más luminoso y directo, sin cambiar su secuencia de entrada ni su contenido.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- conviene revisar visualmente si el nuevo blanco hace que el subheader compita demasiado con el heading en móvil
