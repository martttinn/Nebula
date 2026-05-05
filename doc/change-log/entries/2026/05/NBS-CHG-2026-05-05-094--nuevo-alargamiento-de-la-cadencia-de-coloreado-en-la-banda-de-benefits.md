---
change_id: NBS-CHG-2026-05-05-094
group_id: NBS-TSK-2026-094
date: 2026-05-05
title: Nuevo alargamiento de la cadencia de coloreado en la banda de benefits
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

La banda de benefits ya era sticky y el coloreado palabra a palabra ya se había ralentizado una vez, pero Martín pidió que hiciera falta todavía más scroll real por palabra.

## Cambio realizado

- se amplía de nuevo el rango consumido por el coloreado de cada frase en `components/home/value-proposition-statements.tsx`
- se retrasa ligeramente el fade-out para evitar que el cierre visual empiece demasiado pronto respecto al final del coloreado
- se actualiza `DESIGN.md` para reflejar esta cadencia aún más larga

## Objetivo

Conseguir una progresión de color más exigente y más deliberada dentro del tramo activo de cada frase.

## Impacto

La lectura guiada por scroll se vuelve más lenta y más controlada, sin cambiar la composición general de la sección.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- conviene revisar visualmente si el nuevo ritmo sigue sintiéndose ágil en laptop con trackpad y en pantallas con menor altura útil
