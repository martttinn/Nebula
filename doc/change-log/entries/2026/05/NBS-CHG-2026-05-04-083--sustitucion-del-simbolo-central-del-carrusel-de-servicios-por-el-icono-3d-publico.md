---
change_id: NBS-CHG-2026-05-04-083
group_id: NBS-TSK-2026-083
date: 2026-05-04
title: Sustitucion del simbolo central del carrusel de servicios por el icono 3D publico
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

Las cards del carrusel de servicios seguían usando el símbolo oficial de Nebula como pieza central. Martín pidió usar el icono disponible dentro de `public/3d-Icons` para esa función visual.

## Cambio realizado

- el bloque visual central de cada `ServiceCard` pasa a renderizar `public/3d-Icons/iphone-icon-3d.png`
- se reajusta ligeramente el tamaño del contenedor central y de la imagen para acomodar mejor el nuevo asset cuadrado
- `DESIGN.md`, referencia técnica y `decisions-log` se alinean con el nuevo patrón visual

## Objetivo

Dar a las cards un objeto 3D más específico y menos marcadamente identitario que el cubo oficial de Nebula.

## Impacto

La sección de servicios mantiene su composición y comportamiento, pero cambia su pieza visual central por un asset 3D público del repo.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- hoy todas las cards comparten el mismo icono 3D; si Martín quiere diferenciación visual por servicio, hará falta introducir un set de assets adicional
