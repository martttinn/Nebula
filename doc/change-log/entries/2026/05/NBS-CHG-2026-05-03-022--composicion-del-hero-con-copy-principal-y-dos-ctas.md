---
change_id: NBS-CHG-2026-05-03-022
date: 2026-05-03
title: Composición del hero con copy principal y dos CTAs
group_id: NBS-TSK-2026-022
category: frontend
subcategories:
  - hero
  - copy
  - conversion
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
  - components/home/hero.tsx
  - DESIGN.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

El hero de la home pasa a mostrar un heading principal en `Syne`, un subheading en `Inter` y dos CTAs sobre el fondo `GridScan`.

## Contexto / problema

Martín pidió que el hero dejara de ser solo el fondo visual y mostrara un header real con el copy principal del proyecto y dos botones de acción.

## Cambio realizado

- se añade el heading `Software que hace crecer tu negocio.`
- se añade el subheading `Construimos productos digitales a medida para empresas que necesitan crecer sin límites técnicos.`
- se añaden dos CTAs al final del bloque
- se centra horizontalmente la composición del hero y el alineado del texto
- se introduce un overlay de contraste para proteger la legibilidad sobre el fondo animado

## Objetivo

Convertir el primer viewport en una cabecera comercial clara, con jerarquía visual y una llamada a la acción inmediata.

## Impacto arquitectónico

No cambia la estructura global de la página, pero sí el contrato visual y funcional del componente `Hero`.

## Desglose denso

- el heading usa `Syne`
- el subheading usa `Inter`
- la jerarquía visual se concentra en una sola columna de lectura centrada
- los CTAs apuntan temporalmente a `/#contacto` y `/#servicios`

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- las secciones de `contacto` y `servicios` todavía no existen en la home; hoy los botones preparan la navegación futura

## Notas para presupuesto

Construcción de la primera capa de mensaje comercial y conversión del hero público.
