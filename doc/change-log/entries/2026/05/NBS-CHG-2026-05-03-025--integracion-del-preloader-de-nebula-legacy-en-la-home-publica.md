---
change_id: NBS-CHG-2026-05-03-025
date: 2026-05-03
title: Integración del preloader de `nebula-legacy` en la home pública
group_id: NBS-TSK-2026-025
category: frontend
subcategories:
  - loader
  - branding
  - migration
origin: client-request
complexity: medium
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
  - app/page.tsx
  - components/ui/preloader.tsx
  - components/ui/nebula-logo-animated.tsx
  - components/home/grid-scan.tsx
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

Se integra en este repo el preloader de `nebula-legacy`, adaptando su lógica de finalización al `GridScan` actual del hero.

## Contexto / problema

Martín pidió reutilizar el loader ya integrado en `nebula-legacy` en lugar de construir otro desde cero para esta versión pública.

## Cambio realizado

- se copia `Preloader`
- se copia `NebulaLogoAnimated`
- se monta el preloader en la home actual
- `GridScan` emite `hero-grid-ready` para coordinar la salida del loader
- se deja un timeout de seguridad para no bloquear la interfaz si el hero falla

## Objetivo

Conservar continuidad de marca entre legacy y runtime actual con un loader breve, branded y técnicamente robusto.

## Impacto arquitectónico

Se añade una primitive de entrada específica de la home y una dependencia explícita entre `Preloader` y el evento de disponibilidad del hero.

## Desglose denso

- `preloader.tsx` mantiene duración mínima y barra de progreso
- `nebula-logo-animated.tsx` preserva el logo glossy del legacy
- `grid-scan.tsx` emite la señal de readiness al primer frame válido
- `page.tsx` importa el preloader sin convertir la página completa a cliente

## Validación

- `npm run lint`
- `npm run build`
- `npm run typecheck`

## Pendientes / límites

- la integración se aplica hoy a la home pública; no se ha extendido a otras rutas

## Notas para presupuesto

Migración controlada de asset interactivo entre proyectos hermanos del ecosistema Nebula.
