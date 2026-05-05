---
change_id: NBS-CHG-2026-05-03-052
date: 2026-05-03
title: Refuerzo del glow lila detrás del logo en el preloader
group_id: NBS-TSK-2026-052
category: frontend
subcategories:
  - branding
  - motion
  - components
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
  - components/ui/preloader.tsx
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

Se aumenta el tamaño y la intensidad del glow lila detrás del símbolo en el preloader mediante una composición en dos capas, logrando una presencia de marca más clara durante la carga inicial.

## Contexto / problema

El aura actual del loader quedaba demasiado tenue y pequeña frente al fondo oscuro, por lo que el logo no ganaba suficiente foco atmosférico durante la fase de espera.

## Cambio realizado

- se sustituye el glow único por dos capas radiales centradas
- la capa exterior gana más diámetro, más blur y más presencia cromática
- la capa interior añade un núcleo más luminoso y concentrado alrededor del símbolo

## Objetivo

Dar más presencia al logotipo del preloader sin convertir el loader en una mancha difusa ni romper la limpieza del fondo.

## Impacto arquitectónico

Ajuste localizado en la primitive del preloader, acompañado por actualización del canon visual y de la referencia técnica.

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- si al revisar en navegador el aura todavía se sintiera corta en pantallas grandes, el siguiente paso correcto sería ampliar solo el diámetro de la capa exterior, no subir indefinidamente la opacidad

## Notas para presupuesto

Refinamiento menor de branding visual.
