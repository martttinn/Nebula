---
change_id: NBS-CHG-2026-05-04-084
group_id: NBS-TSK-2026-084
date: 2026-05-04
title: Renombrado del catalogo visible de servicios en la home
type: ui
status: done
owner: Codex
tags:
  - home
  - services
  - copy
  - ui
---

# Contexto

El carrusel de servicios seguía mostrando `Arquitectura a medida` y `Desarrollo full-stack` entre sus títulos visibles. Martín pidió que las cards pasaran a mostrar exactamente estos cuatro labels: `Desarrollo móvil`, `Desarrollo web`, `Evolución continua` y `Consultoría y digitalización`.

## Cambio realizado

- se renombra la primera card a `Desarrollo móvil`
- se renombra la segunda card a `Desarrollo web`
- se mantienen `Evolución continua` y `Consultoría y digitalización`
- se actualizan también los slugs y el copy corto de la primera card para que el catálogo siga siendo coherente, y la cuarta card pasa a usar el slug `consultoria-digitalizacion`
- se alinean referencia técnica y `decisions-log` con el nuevo naming

## Objetivo

Hacer que la sección de servicios use un framing más directo y más alineado con la oferta que Martín quiere comunicar en la home.

## Impacto

La UI pública cambia el naming del catálogo sin alterar layout, motion ni mecánica del carrusel.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- si más adelante se crean superficies de detalle o rutas por servicio, conviene revisar que tomen ya los nuevos slugs como fuente de verdad
