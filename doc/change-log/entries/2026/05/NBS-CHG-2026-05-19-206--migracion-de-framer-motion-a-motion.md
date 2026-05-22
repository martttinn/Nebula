---
change_id: NBS-CHG-2026-05-19-206
date: 2026-05-19
title: Migracion de Framer Motion a Motion
group_id: NBS-TSK-2026-182
category: frontend
subcategories:
  - dependencies
  - motion
  - migration
origin: client-request
complexity: medium
scope: cross-cutting
user_visible: false
release_impacts:
  - frontend-runtime
  - developer-tooling
  - docs
architecture_layers:
  - components
  - docs
  - tooling
  - web
backend_sensitive: false
files_touched:
  - package.json
  - package-lock.json
  - components/**/*.tsx
  - .agents/**
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - rg "from ['\"]framer-motion['\"]|framer-motion|Framer Motion"
  - npm ls framer-motion motion --depth=2
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
  - 2026-05-03 — `Server Components` por defecto y motion aislado en islas cliente
---

# Resumen corto

Migracion completa de los imports y la dependencia directa de `framer-motion` hacia Motion for React usando `motion/react`.

## Contexto / problema

El proyecto mantenia `framer-motion` como dependencia directa y a la vez ya tenia `motion` instalado para primitives nuevas. Esa convivencia duplicaba superficie de mantenimiento y dejaba el runtime con dos rutas de import para la misma familia de animacion.

## Cambio realizado

- Se sustituyen los imports directos de `framer-motion` por `motion/react` en las islas cliente y primitives animadas.
- Se retira `framer-motion` de `package.json`.
- Se regenera `package-lock.json`, eliminando el paquete root `node_modules/framer-motion`.
- Se actualiza la documentacion viva del stack a Motion for React `12.39.0`.
- Se normalizan reglas locales y referencias operativas para que el stack activo sea `motion`.

## Objetivo

Dejar una unica dependencia directa para animacion declarativa de React, reducir drift de bundle/tooling y alinear el repo con la ruta actual recomendada por Motion.

## Impacto arquitectonico

El cambio es transversal en componentes cliente, pero no altera UX, copy, rutas, datos, Supabase, backend ni contratos publicos. La frontera `'use client'` se mantiene igual: solo cambia el origen de las APIs de animacion.

## Desglose denso

- runtime React motion: `motion/react`
- dependencia directa retirada: `framer-motion`
- dependencia directa mantenida: `motion`
- areas tocadas: hero, navbar, preloader, servicios, propuesta de valor, proceso, testimonios y primitives UI
- referencias historicas no reescritas: changelog antiguo

## Validacion

- `rg "from ['\"]framer-motion['\"]|framer-motion|Framer Motion"` debe quedar limitado a changelog historico y dependencia transitiva interna de `motion`.
- `npm ls framer-motion motion --depth=2` debe confirmar que `framer-motion` ya no cuelga del root y solo aparece bajo `motion`.
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

`motion@12.39.0` publica internamente `framer-motion@12.39.0`; por tanto el nombre puede seguir apareciendo en `package-lock.json` como dependencia transitiva. No queda como dependencia directa ni como import propio del proyecto.

## Notas para presupuesto

Refactor tecnico transversal de bajo riesgo funcional pero con valor de mantenimiento: reduce duplicidad de dependencias, simplifica futuras auditorias y mantiene coherente la documentacion del stack.
