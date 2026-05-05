---
change_id: NBS-CHG-2026-05-03-020
date: 2026-05-03
title: Actualización de los links del navbar según la IA pública actual
group_id: NBS-TSK-2026-020
category: frontend
subcategories:
  - navigation
  - ia
  - layout
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
  - components/layout/navbar.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
---

# Resumen corto

El navbar pasa a mostrar los links Servicios, Proyectos, Sobre Nosotros, Precios y Blog.

## Contexto / problema

Martín pidió actualizar la navegación visible del navbar para reflejar una nueva IA pública distinta a la versión anterior basada en `Inicio` y `Proceso`.

## Cambio realizado

- se actualiza el array `defaultLinks` del navbar
- se eliminan `Inicio` y `Proceso`
- se incorporan `Proyectos`, `Sobre Nosotros`, `Precios` y `Blog`
- los destinos se dejan como anchors `/#...` para no crear rutas rotas mientras la home todavía no contiene esas secciones

## Objetivo

Alinear la navegación principal con la estructura de contenidos deseada para la web pública.

## Impacto arquitectónico

No cambia la API del componente, pero sí la IA visible del shell global y los destinos por defecto del navbar.

## Desglose denso

- `Servicios` mantiene `/#servicios`
- `Proyectos` usa `/#proyectos`
- `Sobre Nosotros` usa `/#sobre-nosotros`
- `Precios` usa `/#precios`
- `Blog` usa `/#blog`

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- hoy la home sigue siendo solo el `Hero`, así que estas anclas anticipan la IA pero todavía no apuntan a secciones reales

## Notas para presupuesto

Refinamiento de navegación global para preparar la siguiente fase de construcción de contenidos públicos.
