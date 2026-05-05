---
change_id: NBS-CHG-2026-05-04-080
group_id: NBS-TSK-2026-080
date: 2026-05-04
title: Ajuste de la cadencia de coloreado en la banda de benefits
type: ui
status: done
owner: Codex
tags:
  - home
  - benefits
  - scroll
  - motion
  - ui
---

# Contexto

El sticky de benefits ya funcionaba correctamente, pero el coloreado palabra a palabra seguía resolviéndose demasiado rápido dentro del tramo activo de cada frase. Martín pidió que hiciera falta más scroll real para completar esa progresión.

## Cambio realizado

- se amplía el rango de `progressRange` consumido por el coloreado de cada frase en `components/home/value-proposition-statements.tsx`
- las palabras ahora tardan más en alcanzar el estado final y reparten mejor la progresión a lo largo del tramo visible del statement
- se actualiza `DESIGN.md` para fijar esta cadencia más lenta como comportamiento esperado de la banda de benefits

## Objetivo

Hacer la lectura más deliberada y dar más peso al scroll como mecanismo de revelado del mensaje.

## Impacto

La sección mantiene su estructura sticky y su entrada/salida actuales, pero el feedback visual del texto se vuelve menos inmediato y más sostenido.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- si Martín quiere todavía más resistencia al coloreado, el siguiente paso ya no sería solo estirar el rango, sino recalibrar también la duración activa de cada frase
