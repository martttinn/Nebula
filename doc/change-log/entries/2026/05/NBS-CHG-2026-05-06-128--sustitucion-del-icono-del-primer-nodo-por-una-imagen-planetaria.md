---
change_id: NBS-CHG-2026-05-06-128
date: 2026-05-06
title: Sustitucion del icono del primer nodo por una imagen planetaria
group_id: NBS-TSK-2026-114
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
  - web
backend_sensitive: false
files_touched:
  - components/home/how-we-work.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
---

# Resumen corto

El primer nodo del timeline `How we work` deja de usar un icono vectorial y pasa a renderizar una imagen planetaria desde `public/planets/planet-1.png`.

## Contexto / problema

Los nodos del proceso estaban preparados para iconos `lucide-react`, pero el primer paso necesitaba una presencia más ilustrativa y alineada con el lenguaje espacial de Nebula Studios.

## Cambio realizado

- se amplía el modelo `Step` para soportar `imageSrc` e `imageAlt`
- el primer nodo reemplaza su icono por `/planets/planet-1.png`
- los primitives de nodo desktop y mobile pasan a renderizar `next/image` cuando un paso define imagen
- el resto de nodos mantienen su comportamiento actual basado en iconos

## Objetivo

Permitir una sustitución progresiva de iconos por assets visuales sin romper la primitive del nodo ni duplicar componentes.

## Impacto arquitectonico

Cambio local de frontend sobre la primitive del timeline. No afecta layout, motion ni geometría del path.

## Desglose denso

- la compatibilidad con `icon` se conserva para no forzar una migración masiva del resto de pasos
- `next/image` permite usar el asset raster sin perder control de tamaño ni integración con el nodo circular
- la misma lógica se aplica en desktop y mobile para evitar drift visual entre breakpoints

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- solo el primer nodo usa imagen por ahora; si se sustituyen más iconos, conviene revisar balance visual entre assets raster y glyphs vectoriales
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Pequeño ajuste visual y estructural que abre la puerta a personalizar el sistema de nodos con assets propios de marca.
