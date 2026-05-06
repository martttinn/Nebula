---
change_id: NBS-CHG-2026-05-06-132
date: 2026-05-06
title: Sustitucion del resto de nodos por imagenes planetarias
group_id: NBS-TSK-2026-118
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

Los nodos `02`, `03` y `04` del timeline dejan de usar iconos vectoriales y pasan a renderizar imágenes planetarias desde `public/planets`.

## Contexto / problema

Tras convertir el primer nodo en un asset ilustrado, el sistema seguía mezclando un nodo planetario con tres nodos basados en iconos. Eso rompía la coherencia visual del recorrido.

## Cambio realizado

- `02` pasa a usar `/planets/planet-3.png`
- `03` pasa a usar `/planets/planet-4.png`
- `04` pasa a usar `/planets/planet-5.png`
- se eliminan los imports de iconos que ya no tenían uso en `how-we-work.tsx`

## Objetivo

Unificar el lenguaje visual de todos los nodos del proceso alrededor de assets planetarios y abandonar la mezcla de primitives ilustradas y glyphs vectoriales.

## Impacto arquitectonico

Cambio local de frontend sobre el dataset de pasos. La primitive ya soportaba imágenes, por lo que no ha hecho falta tocar geometría ni lógica del path.

## Desglose denso

- el primer nodo conserva `planet-1.png`
- los cuatro pasos pasan a apoyarse en la misma ruta de render basada en `imageSrc`
- se mantiene la compatibilidad estructural con `icon` por si en el futuro hiciera falta reutilizar esa vía

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- no existe `planet-2.png` en el directorio actual, así que el mapeo usa los assets disponibles hoy
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refuerzo visual pequeño pero sistémico al convertir todos los nodos del proceso a un mismo lenguaje de marca.
