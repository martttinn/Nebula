---
change_id: NBS-CHG-2026-05-06-145
date: 2026-05-06
title: Consumo directo de la familia hero desde su carpeta canonica
group_id: NBS-TSK-2026-131
category: frontend
subcategories:
  - refactor
origin: client-request
complexity: low
scope: local
user_visible: false
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/home/hero.tsx
  - components/home/hero-lead.tsx
  - components/home/hero-particles.tsx
  - components/home/hero-particles.module.css
  - components/home/grid-scan.tsx
  - components/home/grid-scan-shell.tsx
  - components/home/grid-scan-fallback.tsx
  - components/home/how-we-work/index.tsx
  - components/home/services-carousel/index.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La home deja de depender de las fachadas de compatibilidad del hero y pasa a resolver directamente la carpeta canónica `components/home/hero/`, incluyendo los consumos internos de `HeroParticles` desde otras secciones.

## Contexto / problema

Tras la consolidación previa del hero en una carpeta propia, seguían existiendo varios archivos fachada en la raíz de `components/home/`. Eso mantenía una transición segura, pero impedía considerar cerrada la adopción directa de la nueva arquitectura y además dejaba imports internos colgando de rutas antiguas.

## Cambio realizado

- se eliminan las fachadas antiguas del hero en la raíz de `components/home`
- `app/page.tsx` sigue importando `@/components/home/hero`, pero ahora ese specifier resuelve directamente el directorio `components/home/hero/index.tsx`
- `services-carousel` y `how-we-work` pasan a importar `HeroParticles` desde `@/components/home/hero/particles`

## Objetivo

Cerrar la transición del hero y dejar completada la migración de las secciones principales de la home a consumo directo desde sus directorios canónicos.

## Impacto arquitectonico

Refactorización local de frontend sin cambio visual ni funcional. Afecta a resolución de módulos y a la coherencia del árbol `components/home`.

## Desglose denso

- el hero deja de exponer piezas intermedias en la raíz de `components/home`
- las dependencias compartidas del hero ya no pasan por wrappers de compatibilidad
- el runtime de la home queda resuelto por directorios canónicos en `hero`, `value-proposition-section`, `services-carousel` y `how-we-work`

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- si había tabs abiertas en el editor apuntando a rutas antiguas del hero, habrá que reabrirlas desde la carpeta nueva
- las referencias históricas del change-log mantienen rutas antiguas porque documentan estados pasados
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Paso final de consolidación técnica sobre la home pública, con beneficio directo en claridad estructural y menor deuda de transición para futuras iteraciones.
