---
change_id: NBS-CHG-2026-05-03-021
date: 2026-05-03
title: Recuperación de la legibilidad del efecto `StarBorder` en el CTA `Contactar`
group_id: NBS-TSK-2026-021
category: frontend
subcategories:
  - ui
  - motion
  - bugfix
origin: client-request
complexity: low
scope: cross-cutting
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/ui/star-border.tsx
  - components/ui/star-border.module.css
  - components/layout/navbar.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se corrige la pérdida de lectura del `StarBorder` en `Contactar` reforzando el grosor efectivo y la banda visible del destello animado.

## Contexto / problema

Tras los últimos ajustes del navbar, el CTA `Contactar` seguía montando `StarBorder`, pero el efecto quedaba casi imperceptible en runtime porque el fondo blanco, el borde interno y un grosor demasiado fino ahogaban el movimiento del destello.

## Cambio realizado

- `StarBorder` pasa a usar padding perimetral completo en lugar de solo vertical
- el gradiente animado gana altura y presencia visual
- el borde estático interno pierde peso para no eclipsar la animación
- el CTA del navbar sube a `thickness={2}`

## Objetivo

Recuperar un borde animado claramente visible sin sacrificar la jerarquía blanca del botón `Contactar`.

## Impacto arquitectónico

No cambia la API pública de la primitive; cambia su baseline visual y la configuración concreta usada en el navbar.

## Desglose denso

- `star-border.tsx` aplica ahora grosor uniforme en todo el perímetro
- `star-border.module.css` amplía la ventana visible de los gradientes top/bottom
- `navbar.tsx` refuerza el CTA con un grosor más legible

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- la visibilidad exacta del efecto puede seguir afinándose si Martín quiere un destello más sobrio o más evidente

## Notas para presupuesto

Corrección visual puntual de una primitive reusable ya introducida en la navegación principal.
