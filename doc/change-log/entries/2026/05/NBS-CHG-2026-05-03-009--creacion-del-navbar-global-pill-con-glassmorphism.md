---
change_id: NBS-CHG-2026-05-03-009
date: 2026-05-03
title: Creación del navbar global pill con glassmorphism
group_id: NBS-TSK-2026-009
category: frontend
subcategories:
  - feature
  - design-system
  - layout
origin: client-request
complexity: medium
scope: cross-cutting
user_visible: false
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/layout/navbar.tsx
  - app/globals.css
  - DESIGN.md
  - doc/reference/technical-reference.md
  - .agents/decisions-log.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
  - npm run typecheck
related_decisions:
  - "2026-05-03 — El navbar global adopta un formato pill alargado con glassmorphism contenido"
---

# Resumen corto

Se crea un navbar global reusable con forma de cápsula alargada, glassmorphism controlado y tres zonas internas: logo, links y CTAs.

## Contexto / problema

Nebula no tenía todavía una primitive global de navegación. Martín pidió crearla como componente reusable para futuras páginas y dejó fijada su estructura visual base.

## Cambio realizado

- se crea `components/layout/navbar.tsx` con API tipada y defaults razonables
- se organiza el navbar en tres zonas internas: izquierda, centro y derecha
- se añade una capa de glassmorphism contenida mediante la utilidad `glass-pill`
- se documenta la primitive en el canon visual y en la referencia técnica

## Objetivo

Dejar una base de navegación global consistente y reutilizable antes de definir la integración final con todas las rutas o superficies públicas del proyecto.

## Impacto arquitectónico

La navegación deja de depender de futuros componentes ad hoc en páginas concretas y pasa a existir como shell reusable de nivel layout.

## Desglose denso

- el logo se resuelve con un mark geométrico inline y etiqueta de marca
- el centro aloja links dentro de una cápsula secundaria
- la derecha aloja CTAs mediante `Button`
- el componente no se acopla todavía a una jerarquía final de rutas productivas

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- el navbar todavía no se monta globalmente en `app/layout.tsx`
- los destinos por defecto son placeholders coherentes, no un sitemap final cerrado

## Notas para presupuesto

Entrega de primitive reusable de shell global con peso de diseño de sistema y reutilización futura, no solo de maquetación puntual.
