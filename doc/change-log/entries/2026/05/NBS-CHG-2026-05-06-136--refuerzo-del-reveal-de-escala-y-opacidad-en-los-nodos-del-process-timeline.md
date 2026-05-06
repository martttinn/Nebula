---
change_id: NBS-CHG-2026-05-06-136
date: 2026-05-06
title: Refuerzo del reveal de escala y opacidad en los nodos del process timeline
group_id: NBS-TSK-2026-122
category: frontend
subcategories:
  - ui-ux-redesign
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/home/how-we-work.tsx
  - DESIGN.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
---

# Resumen corto

Los nodos ilustrados del timeline ganan un reveal más expresivo: parten con escala más contenida y opacidad baja, y recuperan escala y opacidad completa de forma progresiva al activarse junto a su card.

## Contexto / problema

El sistema actual ya escalaba los nodos durante la aparición de cada cluster, pero el gesto seguía siendo demasiado tímido y las imágenes arrancaban con presencia visual plena desde reposo.

## Cambio realizado

- se centralizan offsets compartidos para sincronizar el reveal del nodo con el de la card
- el rango de escala del nodo se amplía para que el gesto de entrada gane presencia
- las imágenes de los nodos arrancan con opacidad reducida y recuperan `100%` de forma progresiva durante la activación
- se replica la misma lógica perceptiva en mobile
- se actualiza `DESIGN.md` para reflejar este comportamiento como regla visual del `process-timeline`

## Objetivo

Reforzar la sensación de activación del cluster y hacer que los nodos ilustrados entren con más intención, en vez de sentirse ya completamente presentes antes de su momento.

## Impacto arquitectonico

Cambio local de frontend con ajuste del canon visual. No modifica geometría del path ni layout estructural.

## Desglose denso

- el reveal del nodo desktop ahora usa el mismo rango temporal base que la aparición de la card
- la opacidad reducida se aplica a las imágenes de los nodos, no al texto ni a las cards
- el comportamiento de mobile usa la misma escala objetivo y la misma opacidad base para evitar drift entre breakpoints

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- si más adelante el gesto sigue pareciendo corto, el siguiente ajuste lógico sería ampliar aún más la diferencia entre `NODE_REVEAL_BASE_SCALE` y `NODE_REVEAL_ACTIVE_SCALE`
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual de baja complejidad con impacto claro sobre la jerarquía y la sensación de activación del timeline.
