---
change_id: NBS-CHG-2026-05-05-090
group_id: NBS-TSK-2026-090
date: 2026-05-05
title: Animacion del toggle hamburguesa del navbar responsive
type: ui
status: done
owner: Codex
tags:
  - navbar
  - mobile
  - motion
  - ui
---

# Contexto

Martín pidió animar la transición del icono hamburguesa a `X` en el navbar móvil, usando `framer-motion`.

## Cambio realizado

- se eliminan los dos SVGs estáticos que se intercambiaban según el estado
- el toggle pasa a renderizar tres barras reales dentro de la misma primitive
- las barras superior e inferior convergen y rotan hasta formar la `X`
- la barra central reduce escala y se desvanece al abrir
- la transición se anula cuando el usuario expresa `prefers-reduced-motion`

## Objetivo

Hacer que el control del menú responsive se sienta transformado, no reemplazado.

## Impacto

La navegación móvil/tablet gana una microinteracción más pulida y más coherente con el lenguaje de motion del proyecto sin cambiar comportamiento funcional.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- conviene revisar visualmente el tempo y la alineación de la `X` en móvil real y tablet
