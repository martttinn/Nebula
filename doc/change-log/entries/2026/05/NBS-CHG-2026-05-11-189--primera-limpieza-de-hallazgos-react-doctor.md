---
change_id: NBS-CHG-2026-05-11-189
date: 2026-05-11
title: Primera limpieza de hallazgos React Doctor
group_id: NBS-TSK-2026-165
category: frontend
subcategories:
  - performance
  - tooling
  - cleanup
origin: client-request
complexity: low
scope: cross-cutting
user_visible: false
release_impacts:
  - frontend-runtime
  - developer-tooling
architecture_layers:
  - components
  - tooling
backend_sensitive: false
files_touched:
  - components/StaggeredMenu.tsx
  - components/animate-ui/components/buttons/button.tsx
  - components/animate-ui/primitives/animate/slot.tsx
  - components/ui/button.tsx
  - components/ui/lazy-tech-stack-icon.tsx
  - components/ui/split-text.tsx
  - components/ui/preloader.tsx
  - components/home/hero/dot-field.tsx
  - components/home/projects-showcase/index.tsx
  - components/home/how-we-work/constants.ts
  - components/home/how-we-work/primitives.tsx
  - components/home/hero/lead.tsx
  - components/home/services-carousel/primitives.tsx
  - components/home/value-proposition-section/content.ts
  - scripts/change-log-lib.js
  - doc/change-log/**
verification:
  - npx react-doctor@latest
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
  - React Doctor queda documentado como diagnóstico React bajo demanda
---

# Resumen corto

Se aplicó una primera limpieza acotada de hallazgos React Doctor sobre performance y maintainability sin instalar dependencias nuevas.

## Contexto / problema

Martín ejecutó React Doctor y compartió un diagnóstico con avisos de dead code, arquitectura, performance, bundle y efectos. El resultado global era bueno (`81/100`), pero algunos avisos sobre runtime público eran accionables sin abrir un refactor amplio.

## Cambio realizado

- `Preloader` agrupa escrituras imperativas sobre `html` y `body` mediante `cssText` en vez de múltiples asignaciones consecutivas
- el blur animado principal del preloader baja de `24px` a `10px`
- `DotField` agrupa el tamaño inline del canvas en una sola escritura de `cssText`
- iconos y controles con `w-N h-N` pasan a `size-N` en proyectos, how-we-work, hero y servicios
- se retiran exports públicos no consumidos en `Button`, `StaggeredMenu`, primitives de home y lazy tech icons
- se elimina `components/animate-ui/primitives/animate/slot.tsx` al no tener imports internos
- `SplitText` reutiliza un `Intl.Segmenter` de módulo en vez de construirlo en cada segmentación
- el tooling de change-log cambia búsquedas repetidas por mapas/sets locales sin mutar el frontmatter parseado

## Objetivo

Atacar primero los avisos de bajo riesgo y alto control local, separando limpieza real de falsos positivos y dejando fuera los hallazgos que requieren decisión o refactor más amplio.

## Impacto arquitectonico

No cambia boundaries ni dependencias. El cambio reduce ruido de React Doctor y mejora pequeñas superficies de performance/mantenibilidad en componentes públicos y tooling local.

React Doctor pasa de `134` issues en el resultado compartido por Martín a `81` issues tras esta primera limpieza. La puntuación sube de `81/100` a `87/100`.

## Desglose denso

- dependencias nuevas: ninguna
- `react-doctor`: usado bajo demanda vía `npx`
- scope evitado: Remotion dev-only, Supabase bootstrap, migración global a LazyMotion y borrado de archivos marcados como dead code cuando son entrypoints externos o bootstrap futuro

## Validacion

- `npx react-doctor@latest . --verbose` → `81` issues, `87/100`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

React Doctor seguirá reportando falsos positivos o hallazgos deliberadamente aplazados: dead code de entrypoints no detectados, imports de `motion` que requieren migración coordinada a LazyMotion, Remotion dev-only y algunos patrones de estado que conviene revisar con más contexto.

## Notas para presupuesto

Saneamiento técnico derivado de auditoría automatizada, centrado en cambios seguros y trazables.
