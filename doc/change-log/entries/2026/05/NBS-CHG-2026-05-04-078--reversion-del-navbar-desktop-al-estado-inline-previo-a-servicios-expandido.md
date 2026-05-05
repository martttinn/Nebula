---
change_id: NBS-CHG-2026-05-04-078
group_id: NBS-TSK-2026-078
date: 2026-05-04
title: Reversion del navbar desktop al estado inline previo a servicios expandido
type: ui
status: done
owner: Codex
tags:
  - navbar
  - navigation
  - desktop
  - ui
---

# Contexto

Tras varias iteraciones con `Servicios` como chevron, dropdown y luego expansión integrada del shell, el resultado seguía sin alcanzar una transición visual suficientemente limpia y seamless. Martín pidió volver explícitamente al estado del navbar previo a esa exploración.

## Cambio realizado

- `components/layout/navbar.tsx` vuelve a resolver el desktop navbar como una sola pill glass con links inline simples
- `Servicios` pierde el chevron y deja de exponer cualquier preview o expansión de cards
- se elimina toda la mecánica cliente asociada al estado expandido del navbar desktop
- móvil y tablet conservan la navegación colapsada con `NavbarStaggeredMenu`
- `DESIGN.md`, la referencia técnica y `decisions-log` se actualizan para reflejar el estado vigente

## Objetivo

Recuperar una cabecera premium, estable y predecible, priorizando claridad y continuidad visual frente a una capa de preview que no llegó al estándar esperado.

## Impacto

El navbar desktop reduce complejidad de interacción y de render. La exposición detallada del catálogo de servicios vuelve a concentrarse exclusivamente en la sección de servicios de la home.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- la home pierde una vía de descubrimiento rápida de servicios desde la cabecera desktop
- si en el futuro se reintroduce una preview, conviene diseñarla como primitive nueva y no seguir iterando sobre el experimento descartado
