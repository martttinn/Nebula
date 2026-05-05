---
change_id: NBS-CHG-2026-05-05-095
group_id: NBS-TSK-2026-095
date: 2026-05-05
title: Eliminacion de seams horizontales entre secciones en la version movil
type: fix
status: done
owner: Codex
tags:
  - mobile
  - home
  - hero
  - services
  - ui
---

# Contexto

En móvil se apreciaban líneas horizontales finas entre secciones. No eran bordes declarados, sino costuras de composición: el hero terminaba con una capa aún semitransparente sobre `GridScan`, mientras la siguiente sección arrancaba ya en `Void` sólido.

## Cambio realizado

- se hace totalmente opaco el cierre inferior del overlay del hero
- `benefits` y `services` pasan a solapar `1px` con la sección anterior para absorber posibles seams de redondeo o rasterización en móvil
- se documenta el criterio en `DESIGN.md`

## Objetivo

Eliminar líneas fantasma entre bloques sin alterar el lenguaje visual general de la home.

## Impacto

Las transiciones entre secciones se leen ahora como una continuidad limpia en móvil, sin costuras horizontales visibles.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- cualquier nueva sección con overlays, shaders o gradientes propios deberá respetar el mismo cierre en `Void` para no reintroducir el problema
