---
change_id: NBS-CHG-2026-05-06-144
date: 2026-05-06
title: Consumo directo de how we work desde su carpeta canonica
group_id: NBS-TSK-2026-130
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
  - components/home/how-we-work.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La home deja de depender de la fachada de compatibilidad de `how-we-work` y pasa a resolver directamente la carpeta canónica de la sección.

## Contexto / problema

Tras la modularización previa del timeline de proceso, `how-we-work` seguía conservando un archivo fachada temporal. Eso mantenía una transición segura, pero dejaba pendiente el consumo directo del directorio nuevo.

## Cambio realizado

- se elimina `components/home/how-we-work.tsx`
- el specifier `@/components/home/how-we-work` sigue funcionando porque ahora resuelve directamente `components/home/how-we-work/index.tsx`

## Objetivo

Reducir deuda de transición y alinear también esta sección con el modelo de consumo directo desde carpeta canónica.

## Impacto arquitectonico

Refactorización local de frontend sin cambio visual ni funcional. Solo cambia la resolución del módulo y desaparece la fachada heredada.

## Desglose denso

- el runtime público no cambia
- `app/page.tsx` mantiene el mismo import
- la resolución ya no pasa por un archivo intermedio en la raíz de `components/home`

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- si había tabs abiertas en el editor apuntando a la fachada eliminada, habrá que reabrir la sección desde la carpeta nueva
- la misma limpieza de compatibilidad sigue pendiente en la familia `hero`
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Paso pequeño de consolidación técnica para cerrar la transición de la sección de proceso tras su modularización previa.
