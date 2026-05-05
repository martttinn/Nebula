---
change_id: NBS-CHG-2026-05-03-004
date: 2026-05-03
title: Integración del componente GridScan en la home pública
group_id: NBS-TSK-2026-004
category: frontend
subcategories:
  - feature
  - ui-ux-redesign
  - hardening
origin: client-request
complexity: medium
scope: cross-cutting
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - routes
  - components
  - docs
  - tooling
  - web
backend_sensitive: false
files_touched:
  - app/page.tsx
  - components/home/grid-scan.tsx
  - components/home/grid-scan-fallback.tsx
  - package.json
  - package-lock.json
  - .agents/rules/01-project-context.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
  - "2026-05-03 — Los efectos visuales pesados quedan permitidos solo como islas cliente aisladas y justificadas"
---

# Resumen corto

Se integra el efecto GridScan en la home pública de Nebula Studios mediante una implementación repo-local saneada y encapsulada como isla cliente.

## Contexto / problema

El comando pedido por Martín (`npx shadcn@latest add @react-bits/GridScan-TS-CSS`) no se podía incorporar de forma literal porque la receta publicada venía rota: intentaba instalar `three@^0.167.1` junto a `postprocessing@6.39.1`, combinación incompatible por peer dependency, y además arrastraba `face-api.js` y webcam para una landing que no necesita esa complejidad.

## Cambio realizado

- se inspecciona la receta publicada por `shadcn view`
- se instalan manualmente `three` y `postprocessing` en versiones compatibles
- se implementa una adaptación repo-local de `GridScan` orientada al hero del sitio
- se elimina deliberadamente la parte de webcam y `face-api.js`
- se integra la capa visual en `app/page.tsx` mediante `dynamic()` con `ssr: false`

## Objetivo

Conservar el valor visual del componente solicitado sin introducir dependencias rotas ni peso innecesario para la home pública.

## Impacto arquitectónico

La integración respeta la política `Server Components first`:

- el shell de la página sigue en server
- el efecto vive en una única isla cliente
- el fallback se mantiene estático y seguro durante la carga

## Desglose denso

- la versión integrada toma el lenguaje visual del componente original, pero no hereda su capa de webcam/seguimiento facial
- la interacción queda reducida a respuesta sutil al puntero
- el hero se reestructura para que el efecto funcione como atmósfera de marca y no como demo técnica descontextualizada

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / límites

- no se ha mantenido compatibilidad byte a byte con la receta upstream; se ha priorizado una adaptación estable para este repo
- el runtime cliente del hero gana peso por `three` y `postprocessing`, aunque aislado a una sola superficie

## Notas para presupuesto

Entrega de integración visual con criterio: el valor no está solo en “hacer que se vea”, sino en corregir upstream, reducir superficie innecesaria y alinear el componente con el posicionamiento visual de Nebula.
