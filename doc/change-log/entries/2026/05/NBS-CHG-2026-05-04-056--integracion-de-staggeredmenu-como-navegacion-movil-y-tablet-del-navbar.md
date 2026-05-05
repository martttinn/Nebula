---
change_id: NBS-CHG-2026-05-04-056
date: 2026-05-04
title: Integración de StaggeredMenu como navegación móvil y tablet del navbar
group_id: NBS-TSK-2026-056
category: frontend
subcategories:
  - components
  - navigation
  - motion
origin: client-request
complexity: medium
scope: systemic
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
  - tooling
backend_sensitive: false
files_touched:
  - components/layout/navbar.tsx
  - components/layout/navbar-staggered-menu.tsx
  - components/StaggeredMenu.tsx
  - components/StaggeredMenu.css
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - package.json
  - package-lock.json
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
  - "2026-05-04 — El navbar responsive usa un StaggeredMenu lateral retemado a Nebula"
---

# Resumen corto

La navegación móvil y tablet del navbar pasa a resolverse con un `StaggeredMenu` lateral retemado a Nebula, mientras desktop conserva la estructura inline actual.

## Contexto / problema

El navbar actual funcionaba como shell único en todas las resoluciones. Martín pidió usar el componente `StaggeredMenu` de React Bits específicamente como menú de móvil y tablet.

## Cambio realizado

- se ejecuta `npx shadcn@latest add @react-bits/StaggeredMenu-TS-CSS`
- se adapta el componente generado para App Router añadiendo `use client`, `Link` de Next.js, cierre al seleccionar items y soporte para CTA dentro de la lista
- se crea `navbar-staggered-menu.tsx` como isla cliente responsive
- se ocultan links y CTA inline por debajo de desktop y se sustituye esa capa por el menú escalonado
- se retema el CSS al lenguaje visual dark-tech del proyecto

## Objetivo

Conseguir una navegación responsive con más carácter visual que un drawer estándar, sin romper la identidad del navbar desktop.

## Impacto arquitectónico

La navegación pública queda separada por runtime y breakpoint: server-first en desktop y cliente aislado en mobile/tablet. El componente externo no se usa en crudo, sino adaptado al contrato técnico y visual del repo.

## Desglose denso

- el wrapper responsive transforma `links` y `ctas` del navbar en items del menú
- el CTA `Contactar` entra en el panel como item destacado en vez de duplicar la primitive premium desktop
- el panel lateral adopta fondo oscuro, capas previas lilas y tipografía Nebula para no sentirse como un injerto externo

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / límites

- no se ha hecho revisión visual automatizada en navegador en esta sesión
- si más adelante se quisiera navegación responsive con subniveles o secciones dinámicas, convendrá decidir si seguir extendiendo `StaggeredMenu` o reemplazarlo por una primitive local más controlable

## Notas para presupuesto

Refactor responsive de una surface pública de alto impacto con trabajo combinado de integración externa, motion y retema visual.
