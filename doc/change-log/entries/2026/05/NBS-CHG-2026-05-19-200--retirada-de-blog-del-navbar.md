---
change_id: NBS-CHG-2026-05-19-200
date: 2026-05-19
title: Retirada de Blog del navbar
group_id: NBS-TSK-2026-176
category: frontend
subcategories:
  - navbar
  - navigation
  - ux
origin: client-request
complexity: low
scope: component-level
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - data
  - docs
  - web
backend_sensitive: false
files_touched:
  - data/navigation.ts
  - components/layout/navbar.tsx
  - DESIGN.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - smoke visual desktop en http://localhost:3001
  - smoke visual móvil en http://localhost:3001
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Se elimina `Blog` del navbar público de Nebula Studios.

## Contexto / problema

Martín pidió quitar el link de blog del navbar. El navbar consumía el mismo catálogo amplio que el footer, por lo que borrar `Blog` directamente de `PUBLIC_NAV_LINKS` habría afectado también al footer.

## Cambio realizado

- `data/navigation.ts` crea `PUBLIC_NAVBAR_LINKS` sin `Blog`.
- `components/layout/navbar.tsx` pasa a usar `PUBLIC_NAVBAR_LINKS` como set por defecto.
- `PUBLIC_NAV_LINKS` se conserva para el footer y mantiene `Blog`.
- La documentación técnica y visual recoge la separación entre navegación activa del navbar y catálogo ampliado del footer.

## Objetivo

Retirar `Blog` del navbar sin romper ni simplificar de forma no pedida el footer.

## Impacto arquitectonico

El cambio introduce una separación pequeña pero explícita en el catálogo de navegación. No añade rutas, estado cliente, backend, middleware ni cambios de layout.

## Desglose denso

- navbar desktop: ya no renderiza `Blog`
- navbar móvil: el menú escalonado tampoco renderiza `Blog`
- footer: mantiene su catálogo ampliado
- source of truth: `data/navigation.ts`

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- smoke visual desktop en `http://localhost:3001`
- smoke visual móvil en `http://localhost:3001`
- `npm run changes:sync`

## Pendientes / limites

Si se publica una sección o ruta real de blog, habrá que decidir si vuelve al navbar o se mantiene solo en el footer.

## Notas para presupuesto

Ajuste menor de navegación con control de alcance para no arrastrar cambios de footer.
