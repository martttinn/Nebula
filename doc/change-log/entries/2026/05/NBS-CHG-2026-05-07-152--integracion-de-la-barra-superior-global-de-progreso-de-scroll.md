---
change_id: NBS-CHG-2026-05-07-152
date: 2026-05-07
title: Integracion de la barra superior global de progreso de scroll
group_id: NBS-TSK-2026-138
category: frontend
subcategories:
  - layout
  - motion
  - ux
origin: client-request
complexity: low
scope: cross-cutting
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
  - app/layout.tsx
  - components/layout/scroll-progress-bar.tsx
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La shell pública añade una barra superior global de progreso de scroll, resuelta como una línea sutil tipo scrollbar con inercia ligera.

## Contexto / problema

La home ya tenía varias secciones scroll-driven y un navbar fijo, pero no una referencia global del avance total del documento. Martín pidió una señal elegante y muy contenida, con suavidad perceptible, y luego acotó que debía vivir en la parte superior como un scrollbar.

## Cambio realizado

- se crea `components/layout/scroll-progress-bar.tsx` como primitive global cliente
- la barra se integra en `app/layout.tsx` para que viva en la shell común y no en una sección concreta
- el progreso usa una interpolación propia por `requestAnimationFrame`, separada del valor bruto de `scrollY`, para aportar una inercia visual ligera
- en `prefers-reduced-motion` el indicador mantiene utilidad pero reduce el trailing ornamental
- en breakpoints pequeños el rail se oculta para no comprometer el borde útil del viewport
- se actualizan `DESIGN.md`, `.agents/decisions-log.md` y la referencia técnica para fijar el patrón

## Objetivo

Reforzar la orientación del usuario dentro del documento y añadir una pieza de shell coherente con el lenguaje dark-tech de Nebula, sin subir el ruido visual general del sitio ni cargar los laterales de la composición.

## Impacto arquitectonico

El repo gana una nueva primitive global de layout en `components/layout/`. La responsabilidad queda aislada del contenido de la home y puede evolucionar sin tocar las secciones narrativas.

## Desglose denso

- la base del patrón es una línea horizontal muy tenue anclada al borde superior del viewport
- el fill activo usa un gradiente `Haze -> Lilac -> Silver` limpio, sin glow ni blur adicional
- el progreso se lee como scrollbar premium, sin nodo independiente ni chrome extra
- la primitive convive con `Lenis`, pero no delega toda la percepción de suavidad en ese engine; aplica una amortiguación visual propia

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- la validación visual interactiva en navegador embebido sigue limitada por la falta de una herramienta operativa de control/captura en este turno
- el indicador solo aparece cuando el documento tiene recorrido vertical suficiente; en páginas prácticamente estáticas no llega a montarse

## Notas para presupuesto

Entrega visible y transversal: aunque la pieza es pequeña, afecta a la shell global, exige integración con el comportamiento de scroll del sitio y fija un nuevo patrón reusable de motion/UX en desktop.
