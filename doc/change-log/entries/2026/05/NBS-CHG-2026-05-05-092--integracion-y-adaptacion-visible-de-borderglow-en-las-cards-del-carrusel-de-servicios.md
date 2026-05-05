---
change_id: NBS-CHG-2026-05-05-092
group_id: NBS-TSK-2026-092
date: 2026-05-05
title: Integracion y adaptacion visible de BorderGlow en las cards del carrusel de servicios
type: ui
status: done
owner: Codex
tags:
  - home
  - services
  - cards
  - glow
  - ui
---

# Contexto

Martín pidió aplicar a las cards del carrusel de servicios el efecto `@react-bits/BorderGlow-TS-CSS`. La receta se pudo importar, pero la implementación original no encajaba limpia con Next App Router y, además, el glow resultaba casi imperceptible sobre el fondo real de las cards.

## Cambio realizado

- se transforma la receta importada en una primitive repo-local basada en `CSS Modules`
- se integra `BorderGlow` dentro de `ServiceCard`
- se sustituye el enfoque demasiado sutil de malla cromática por un halo perimetral y un refuerzo luminoso direccional más legibles
- se verifica el resultado con una prueba automatizada real en navegador local sobre `localhost:3000`

## Objetivo

Conseguir un glow visible y premium alrededor de las cards sin mover ni deformar su composición.

## Impacto

Las cards de servicios ganan una microinteracción luminosa clara y reusable, alineada con el tono dark-tech de Nebula y compatible con el layout actual del carrusel.

## Validación

- prueba real en navegador local con hover automatizado sobre la card `Desarrollo web`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- la intensidad del glow puede requerir ajuste fino si cambia el contraste de fondo o si la primitive se reaprovecha en otras superficies con otro framing visual
