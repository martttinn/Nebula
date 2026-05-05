---
change_id: NBS-CHG-2026-05-05-088
group_id: NBS-TSK-2026-088
date: 2026-05-05
title: Acento lila para la palabra negocio en el heading del hero
type: ui
status: done
owner: Codex
tags:
  - hero
  - typography
  - brand
  - ui
---

# Contexto

Martín pidió que la palabra `negocio` del heading principal del hero pase a usar el lila de marca, manteniendo intacta la entrada secuencial del claim.

## Cambio realizado

- se añade a `SplitText` un override opcional de clase por token para no duplicar ni partir el reveal principal
- el heading del hero usa ese override solo sobre `negocio.`
- el fallback de reduced motion replica el mismo acento lila sin depender de animación

## Objetivo

Dar más peso visual al término de negocio dentro del mensaje principal sin romper la cadencia tipográfica ya afinada del hero.

## Impacto

El hero gana un punto de énfasis más alineado con la identidad Nebula y la primitive `SplitText` queda preparada para futuros acentos puntuales por palabra.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- conviene revisar visualmente que el acento no cargue demasiado la última línea del titular en móvil
