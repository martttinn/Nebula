---
change_id: NBS-CHG-2026-05-04-085
group_id: NBS-TSK-2026-085
date: 2026-05-04
title: Aumento de tamano y separacion de las cards del carrusel de servicios
type: ui
status: done
owner: Codex
tags:
  - home
  - services
  - layout
  - ui
---

# Contexto

Martín pidió que las cards del carrusel de servicios fueran más grandes y quedaran más separadas, pero sin perder la alineación en arco que estructura la sección en desktop.

## Cambio realizado

- el tamaño base de `ServiceCard` aumenta
- el arco desktop abre más su geometría mediante un mayor radio y un span angular algo más amplio
- el layout interior de la card gana un poco más de aire para acompañar el nuevo tamaño
- el contenedor móvil se ajusta ligeramente para no recortar el nuevo footprint compartido de la card
- se actualiza `DESIGN.md` con el nuevo guardrail de composición

## Objetivo

Dar más presencia a cada servicio y reducir la sensación de apilamiento lateral sin perder la lectura curvada del carrusel.

## Impacto

La sección conserva su misma narrativa y mecánica sticky, pero se vuelve más abierta y más legible en desktop.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- conviene revisar visualmente el comportamiento en pantallas intermedias para confirmar que la separación extra no lleva demasiado fuera de foco las cards extremas
