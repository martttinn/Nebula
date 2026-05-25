---
change_id: NBS-CHG-2026-05-25-223
date: 2026-05-25
title: Instalación de React Three Fiber
group_id: NBS-TSK-2026-199
category: frontend
subcategories:
  - dependencies
  - tooling
  - frontend
  - visual-system
origin: client-request
complexity: low
scope: repo-wide
user_visible: true
release_impacts:
  - docs
  - frontend-runtime
architecture_layers:
  - components
  - docs
  - tooling
  - web
backend_sensitive: false
files_touched:
  - package.json
  - package-lock.json
  - .agents/rules/01-project-context.md
  - doc/reference/technical-reference.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-25-223--instalacion-de-react-three-fiber.md
  - doc/change-log/groups/2026/NBS-TSK-2026-199.md
verification:
  - npm view @react-three/fiber version dist-tags peerDependencies engines deprecated time --json
  - npm ls @react-three/fiber three react react-dom --depth=0
  - npm audit --omit=dev --json
  - npm audit --json
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
---

# Resumen corto

Se instala React Three Fiber como dependencia runtime del proyecto.

## Contexto / problema

El proyecto ya tenía `three` y `postprocessing`, pero no tenía `@react-three/fiber` instalado. Martín pidió incorporarlo como dependencia del proyecto.

## Cambio realizado

Se ejecuta `npm install @react-three/fiber@^9.6.1`, lo que añade `@react-three/fiber` a `dependencies` y actualiza el lockfile con sus dependencias transitivas.

## Objetivo

Habilitar desarrollo 3D declarativo con React sobre el stack actual de Next.js, React y Three.js.

## Impacto arquitectonico

Impacto acotado al stack frontend. No se añade todavía ninguna superficie 3D, componente cliente nuevo ni cambio visual en la web pública.

## Desglose denso

- `@react-three/fiber@9.6.1` declara peers compatibles con el repo: `react >=19 <19.3`, `react-dom >=19 <19.3` y `three >=0.156`
- el repo queda con `react@19.2.6`, `react-dom@19.2.6`, `three@0.184.0` y `@react-three/fiber@9.6.1`
- los peers de Expo/React Native declarados por el paquete son opcionales y no se instalan
- `npm audit` no atribuye los findings a React Three Fiber; los moderados detectados quedan en `next/postcss` y Remotion/ws

## Validacion

- `npm view @react-three/fiber version dist-tags peerDependencies engines deprecated time --json`
- `npm view @react-three/fiber@9.6.1 peerDependenciesMeta --json`
- `npm ls @react-three/fiber three react react-dom --depth=0`
- `npm audit --omit=dev --json` reporta 2 moderadas en runtime (`next` vía `postcss` interno)
- `npm audit --json` reporta 8 moderadas totales incluyendo tooling Remotion/ws
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

No se ejecuta `npm audit fix`; corregir los advisories moderados debe tratarse como tarea separada porque afecta Next.js/Remotion y no forma parte de instalar React Three Fiber.

La sincronización del vault de Obsidian queda pendiente: se accedió por filesystem, pero el árbol ya tenía cambios previos no relacionados en `proyectos/nebula-studios-webapp/stack.md`, por lo que no se commitea ni se mezcla esa superficie externa en esta entrega.

## Notas para presupuesto

Instalación y verificación de dependencia visual avanzada con actualización de documentación del stack.
