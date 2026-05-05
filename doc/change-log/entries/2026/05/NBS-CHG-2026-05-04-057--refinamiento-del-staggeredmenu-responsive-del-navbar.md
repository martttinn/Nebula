---
change_id: NBS-CHG-2026-05-04-057
date: 2026-05-04
title: Refinamiento del StaggeredMenu responsive del navbar
group_id: NBS-TSK-2026-057
category: frontend
subcategories:
  - navigation
  - motion
  - responsive
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
  - components/StaggeredMenu.tsx
  - components/StaggeredMenu.css
  - components/layout/navbar-staggered-menu.tsx
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
  - "2026-05-04 — El navbar responsive usa un StaggeredMenu fullscreen retemado a Nebula"
---

# Resumen corto

El menú responsive del navbar sustituye el texto `MENU` por una hamburguesa real, abre ahora como overlay fullscreen y deja `Contactar` como un link tipográfico más dentro del listado.

## Contexto / problema

Tras la integración inicial, el toggle de reposo seguía mostrándose como texto y el panel abierto todavía se percibía como una tarjeta parcial, no como una navegación inmersiva a pantalla completa. Además, el item `Contactar` destacaba como botón dentro del listado escalonado.

## Cambio realizado

- se rehace el toggle del `StaggeredMenu` para que muestre una hamburguesa de tres líneas en reposo y transicione a estado de cierre al abrir
- se expande el overlay responsive para ocupar todo el viewport en móvil y tablet, eliminando el marco flotante anterior
- se normaliza `Contactar` como enlace más del sistema tipográfico del menú, sin estilo de CTA encapsulado
- se desacopla el overlay del árbol visual del navbar renderizándolo vía portal, para que el `glass-pill` no lo limite como containing block
- se corrige la compuerta de montaje del portal para evitar desajuste de hidratación entre SSR y cliente
- se corrige el contenedor flex del trigger responsive para anclar la hamburguesa al extremo derecho real del shell del navbar
- se elimina la cápsula visual del trigger hamburguesa en reposo, quitando borde, fondo y sombra del contenedor
- se elimina también esa cápsula visual en el estado abierto con la `X`, y se reejecuta la inicialización GSAP cuando el portal ya existe para recuperar la visibilidad del overlay
- se añade cierre por `Escape`, foco inicial dentro del panel y devolución del foco al trigger al cerrar
- se evita que el overlay cerrado deje links en el tab order desactivando su foco mientras no está abierto
- se acota además el ciclo de vida del overlay para que solo permanezca montado mientras está abierto o ejecutando su animación de salida
- se simplifica la primitive retirando ramas genéricas ya muertas del import original, como `socials`, `logo`, `isCta` y variantes CSS asociadas

## Objetivo

Conseguir que la navegación responsive se lea como una extensión coherente del sistema Nebula: más clara en reposo, más inmersiva al abrir y más consistente en jerarquía interna.

## Impacto arquitectónico

La base importada desde React Bits sigue encapsulada en una primitive adaptada localmente, pero el contrato visual y de interacción cambia: el shell responsive mantiene el toggle inline dentro del navbar y el overlay fullscreen se renderiza fuera del árbol del `glass-pill` para evitar clipping y geometrías parciales.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / límites

- no se ha hecho revisión visual automatizada en navegador en esta sesión

## Notas para presupuesto

Refinamiento de UX y motion sobre una navegación pública clave ya integrada, con impacto directo en legibilidad, jerarquía y percepción premium del responsive.
