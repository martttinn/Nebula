---
change_id: NBS-CHG-2026-05-24-220
date: 2026-05-24
title: Suavizado del empuje de cards de proyectos en scroll lento
group_id: NBS-TSK-2026-196
category: frontend
subcategories:
  - bugfix
  - motion
  - scroll-interactions
  - cards
origin: client-request
complexity: low
scope: component-local
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
  - components/home/projects-showcase/index.tsx
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-24-220--suavizado-del-empuje-de-cards-de-proyectos-en-scroll-lento.md
  - doc/change-log/groups/2026/NBS-TSK-2026-196.md
verification:
  - npm run build
  - npm run lint
  - npm run typecheck
  - npm run changes:sync
  - prueba local con Playwright sobre next start en 127.0.0.1:3100
related_decisions:
---

# Resumen corto

Se suaviza el empuje de cards de `projects-showcase` cuando el scroll desktop avanza muy lentamente.

## Contexto / problema

El usuario reporto tirones visibles en la animacion de empuje entre proyectos al hacer scroll muy lento. La seccion calculaba su progreso con un umbral de `0.001`; en el stage desktop eso equivale aproximadamente a 5 px de scroll en un viewport de 1000 px, por lo que los micro avances de Lenis podian quedarse sin render y aparecer de golpe al acumularse.

## Cambio realizado

Se reduce `PROJECT_PROGRESS_EPSILON` de `0.001` a `0.0001` en `components/home/projects-showcase/index.tsx`.

## Objetivo

Evitar la cuantizacion perceptible del progreso sin alterar la coreografia: primera card bottom-up, expansion, empuje horizontal de la segunda y empuje horizontal de la tercera.

## Impacto arquitectonico

No cambia la arquitectura de la seccion. Mantiene el estado React existente y solo ajusta la precision con la que se aceptan cambios de progreso durante el scroll desktop.

## Desglose denso

- el umbral previo reducia renders, pero introducia saltos visibles cuando los deltas de scroll eran muy pequenos
- el nuevo umbral baja la cuantizacion a una escala subpixel aproximada en viewports desktop habituales
- el snap programatico se conserva sin cambios

## Validacion

- `npm run build`
- `npm run lint`
- `npm run typecheck`
- prueba local sobre `next start -- --port 3100`
- medicion Playwright del empuje lento: `352` cambios de transform en `472` frames con scroll, con maximo `2` frames seguidos sin avance visual

## Pendientes / limites

No se ha redisenado la coreografia ni se ha cambiado Lenis. Si en dispositivos reales de baja potencia siguiera habiendo jank, el siguiente paso seria migrar este stage a actualizacion imperativa por `requestAnimationFrame` o MotionValues en vez de re-render React por progreso.

## Notas para presupuesto

Correccion acotada de una regresion perceptiva en scroll storytelling desktop, sin cambios visuales finales ni refactor de la seccion.
