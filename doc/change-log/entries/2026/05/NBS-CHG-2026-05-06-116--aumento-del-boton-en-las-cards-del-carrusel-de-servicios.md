---
change_id: NBS-CHG-2026-05-06-116
group_id: NBS-TSK-2026-087
date: 2026-05-06
title: Aumento del boton en las cards del carrusel de servicios
type: ui
status: done
owner: Codex
tags:
  - home
  - services
  - cta
  - ui
---

# Contexto

El CTA `Ver más` dentro de las cards del carrusel seguía quedándose pequeño frente a la escala actual del resto de la composición. Martín pidió hacerlo más grande manteniendo su papel de acción secundaria.

## Cambio realizado

- el botón `Ver más` pasa de `size="sm"` a `size="lg"`
- se aumenta también la respiración horizontal del CTA con más `padding`
- la flecha se recalibra a un tamaño ligeramente mayor para acompasar mejor la nueva huella
- el cambio aplica tanto en desktop como en móvil porque ambas vistas reutilizan `ServiceCard`
- se actualizan `DESIGN.md`, `technical-reference.md` y `decisions-log`

## Objetivo

Dar más presencia y legibilidad al CTA sin descompensar la jerarquía interna de la card.

## Impacto

La acción secundaria gana peso visual moderado y se percibe más acorde al tamaño actual de las cards.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- si el CTA sigue creciendo más, habrá que revisar el equilibrio entre footer, copy y símbolo central para no convertir la acción en el foco dominante de la card
