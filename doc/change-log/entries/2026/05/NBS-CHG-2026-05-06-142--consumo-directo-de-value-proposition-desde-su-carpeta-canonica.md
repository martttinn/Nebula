---
change_id: NBS-CHG-2026-05-06-142
date: 2026-05-06
title: Consumo directo de value proposition desde su carpeta canonica
group_id: NBS-TSK-2026-128
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
  - components/home/value-proposition-section.tsx
  - components/home/value-proposition-statements.tsx
  - components/home/value-proposition-ornaments.module.css
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La home deja de depender de las fachadas de compatibilidad de `value-proposition` y pasa a resolver directamente la carpeta canónica de la sección.

## Contexto / problema

Tras la modularización previa, `value-proposition` seguía manteniendo tres archivos fachada solo para compatibilidad transitoria. Eso permitía una migración segura, pero impedía considerar cerrada la adopción directa de la nueva arquitectura.

## Cambio realizado

- se elimina `components/home/value-proposition-section.tsx`
- se elimina `components/home/value-proposition-statements.tsx`
- se elimina `components/home/value-proposition-ornaments.module.css`
- el specifier `@/components/home/value-proposition-section` sigue funcionando porque ahora resuelve directamente `components/home/value-proposition-section/index.tsx`

## Objetivo

Cerrar la transición de esta sección y dejar su consumo alineado con la arquitectura por carpetas ya implantada.

## Impacto arquitectonico

Refactorización local de frontend sin cambio visual ni funcional. El cambio afecta solo a la resolución de módulos y a la retirada de compatibilidad heredada.

## Desglose denso

- el runtime público no cambia
- la resolución del módulo ya no pasa por un archivo intermedio
- se reduce deuda de transición y ruido estructural en `components/home`

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- si había tabs abiertas en el editor apuntando a los archivos fachada eliminados, habrá que reabrir los archivos desde la carpeta nueva
- la misma limpieza de compatibilidad sigue pendiente en `hero`, `services-carousel` y `how-we-work`
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Paso pequeño de consolidación técnica posterior a una modularización ya validada, con beneficio directo en coherencia estructural del árbol `components/home`.
