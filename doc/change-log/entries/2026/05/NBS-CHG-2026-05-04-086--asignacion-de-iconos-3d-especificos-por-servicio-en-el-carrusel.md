---
change_id: NBS-CHG-2026-05-04-086
group_id: NBS-TSK-2026-086
date: 2026-05-04
title: Asignacion de iconos 3D especificos por servicio en el carrusel
type: ui
status: done
owner: Codex
tags:
  - home
  - services
  - assets
  - ui
---

# Contexto

El carrusel de servicios ya usaba un asset 3D público, pero todas las cards compartían el mismo icono central. Martín pidió que cada servicio usara el icono correspondiente dentro de `public/3d-Icons`.

## Cambio realizado

- `data/services.ts` incorpora un campo `iconSrc` por servicio
- `Desarrollo móvil` usa `iphone-icon-3d.png`
- `Desarrollo web` usa `webPanel-icon-3d.png`
- `Evolución continua` usa `grafico-icon-3d.png`
- `Consultoría y digitalización` usa `lupa-icon-3d.png`
- `components/home/services-carousel.tsx` deja de hardcodear un asset único y pasa a renderizar el icono desde el catálogo
- se actualizan `DESIGN.md`, referencia técnica y `decisions-log`

## Objetivo

Dar a cada servicio una identidad visual propia dentro del mismo lenguaje 3D del carrusel.

## Impacto

La sección mantiene su composición y comportamiento, pero gana diferenciación visual real entre cards sin introducir complejidad extra en runtime.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- si los servicios cambian o se amplían, conviene mantener el catálogo `iconSrc` como única fuente de verdad para evitar volver a hardcodear assets en la UI
