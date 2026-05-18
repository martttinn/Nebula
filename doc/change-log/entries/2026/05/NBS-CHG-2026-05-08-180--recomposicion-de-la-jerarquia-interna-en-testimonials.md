---
change_id: NBS-CHG-2026-05-08-180
date: 2026-05-08
title: Recomposicion de la jerarquia interna en testimonials
group_id: NBS-TSK-2026-156
category: frontend
subcategories:
  - feature
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/home/testimonials/index.tsx
  - DESIGN.md
  - doc/change-log/**
verification:
  - npm run changes:validate
  - npm run lint
  - npm run typecheck
related_decisions:
---

# Resumen corto

Las cards de `testimonials` pasan a presentar el bloque de identidad en la esquina superior izquierda y la cita centrada como foco único dentro de la superficie.

## Contexto / problema

La composición activa seguía resolviendo la card como dos columnas internas, con la cita y la identidad repartiéndose el espacio horizontal. Martín pidió una jerarquía más clara: nombre, puesto y empresa arriba a la izquierda, y el quote centrado dentro de la card.

## Cambio realizado

- se elimina la partición interior en dos zonas y el divisor vertical asociado
- el bloque de identidad queda anclado arriba a la izquierda dentro de cada card
- la cita pasa a ocupar el centro visual de la superficie con alineación centrada
- se actualiza `DESIGN.md` para dejar explícita esta jerarquía interna

## Objetivo

Dar más protagonismo a la prueba social y reducir el ruido compositivo dentro de cada card del stack editorial.

## Impacto arquitectonico

Ajuste localizado en la primitive `TestimonialStackCard` de `components/home/testimonials/index.tsx`. No cambia el catálogo de testimonios ni la mecánica sticky del stage.

## Validacion

- `npm run changes:validate`
- `npm run lint`
- `npm run typecheck`

## Pendientes / limites

- la section sigue usando la misma primitive también en viewport estrecho; la degradación móvil específica sigue pendiente de una iteración dedicada

## Notas para presupuesto

Cambio visual pequeño pero claramente visible en una surface pública clave de confianza. Ajusta jerarquía, legibilidad y dirección editorial sin tocar datos ni comportamiento estructural del stack.
