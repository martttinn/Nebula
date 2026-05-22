---
change_id: NBS-CHG-2026-05-21-213
date: 2026-05-21
title: Snap programatico en projects-showcase
group_id: NBS-TSK-2026-189
category: frontend
subcategories:
  - feature
  - scroll-interactions
  - snap
  - motion
origin: client-request
complexity: medium
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - docs
backend_sensitive: false
files_touched:
  - components/home/projects-showcase/index.tsx
  - DESIGN.md
  - doc/change-log/groups/2026/NBS-TSK-2026-189.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-21-213--snap-programatico-en-projects-showcase.md
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - revision visual desktop/mobile de projects-showcase
  - npm run changes:sync
related_decisions:
---

# Resumen corto

La seccion `projects-showcase` incorpora snap programatico desktop hacia cuatro estados cerrados de la timeline de proyectos.

## Contexto / problema

La coreografia desktop permitia detener el scroll en puntos intermedios: primera card a medio expandir o dos paneles laterales compartiendo pantalla durante los empujes. Martin pidio que el reposo del scroll coincidiese con estados completos para evitar lecturas partidas.

## Cambio realizado

Se anade un hook interno de snap basado en Lenis, limitado a desktop y desactivado con `prefers-reduced-motion`. La timeline pasa a usar ventanas de reveal con finales explicitos, de modo que el tercer panel completa su takeover exactamente en el progreso final de la seccion.

## Objetivo

Hacer que el scroll de proyectos descanse en cuatro puntos: primera card compacta, primera card full-screen, segunda card full-screen y tercera card full-screen.

## Impacto arquitectonico

El cambio queda contenido en la isla cliente `components/home/projects-showcase/index.tsx`. No introduce dependencias, no altera la variante movil, no modifica datos de proyectos y mantiene `DESIGN.md` como canon del comportamiento visual.

## Desglose denso

- Definicion de `PROJECT_REVEAL_WINDOWS` para desacoplar el final real de cada reveal de una duracion global unica.
- Definicion de cuatro `PROJECT_SCROLL_SNAP_POINTS` alineados con los estados de reposo pedidos.
- Nuevo `useProjectsScrollSnap(sectionRef)` con debounce corto, calculo de progreso equivalente al runtime actual y `lenis.scrollTo` bloqueante hacia el punto mas cercano.
- Guardas para no activar snap antes de que empiece la primera card, al salir de la seccion, en mobile/tablet o con movimiento reducido.

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Revision visual desktop/mobile de `projects-showcase`
- `npm run changes:sync`

## Pendientes / limites

No se crea un sistema global de scroll snap ni se reestructura la seccion. La calibracion queda limitada a la timeline actual de tres proyectos.

## Notas para presupuesto

Trabajo visible de UX/motion en una seccion publica de portfolio, con ajuste de runtime, comportamiento responsive y documentacion del canon visual.
