---
change_id: NBS-CHG-2026-05-03-051
date: 2026-05-03
title: Ajuste del label y orden de los links del navbar
group_id: NBS-TSK-2026-051
category: frontend
subcategories:
  - components
  - navigation
  - copy
origin: client-request
complexity: low
scope: component-local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/layout/navbar.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se renombra el link `Sobre Nosotros` a `Nosotros` y se reordena la navegación del navbar a `Servicios`, `Proyectos`, `Precios`, `Nosotros` y `Blog`.

## Contexto / problema

Martín pidió simplificar el label del enlace corporativo y ajustar el orden de la navegación principal según la nueva prioridad de secciones.

## Cambio realizado

- `Sobre Nosotros` pasa a llamarse `Nosotros`
- el orden de links queda:
  - `Servicios`
  - `Proyectos`
  - `Precios`
  - `Nosotros`
  - `Blog`
- se conserva el anchor `/#sobre-nosotros` para no alterar el destino real

## Objetivo

Alinear la IA visible del navbar con la jerarquía de navegación deseada sin romper anchors existentes.

## Impacto arquitectónico

Ajuste localizado en la configuración de `defaultLinks` del navbar.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si en una fase posterior se renombra también la propia sección, habría que revisar el anchor `/#sobre-nosotros`

## Notas para presupuesto

Ajuste menor de navegación y copy.
