---
change_id: NBS-CHG-2026-05-19-207
date: 2026-05-19
title: Actualizacion mayor del stack base
group_id: NBS-TSK-2026-183
category: frontend
subcategories:
  - dependencies
  - migration
  - tooling
  - testing
origin: client-request
complexity: high
scope: cross-cutting
user_visible: false
release_impacts:
  - frontend-runtime
  - developer-tooling
  - docs
architecture_layers:
  - app
  - components
  - docs
  - tooling
  - web
backend_sensitive: false
files_touched:
  - package.json
  - package-lock.json
  - app/globals.css
  - postcss.config.mjs
  - tailwind.config.cjs
  - tailwind.config.ts
  - components/**/*.tsx
  - .agents/**
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm outdated --json
  - npm ls --depth=0
  - npm audit --omit=dev
  - npm audit
  - npm run lint
  - npm run typecheck
  - npm run build
  - npx react-doctor@latest
  - Playwright screenshot baseline/final desktop 1440x1000
  - Playwright screenshot baseline/final mobile 390x844
  - Playwright footer computed styles desktop 2048x730
  - Playwright footer hover computed styles
  - pixel diff con sharp sobre baseline/final
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Actualización mayor del stack base tras el patch de Next: React 19, Tailwind 4, TypeScript 6, Three 0.184, Remotion 4.0.463, Supabase CLI 2.100.1 y tooling asociado.

## Contexto / problema

Martín pidió actualizar las tecnologías base manteniendo el resultado visual exactamente igual. La actualización se ejecuta por oleadas y se valida con build, lint, typecheck y comparación visual contra capturas baseline previas.

## Cambio realizado

- React y React DOM pasan a `19.2.6`, con tipos React 19.
- Tailwind CSS pasa a `4.3.0` y PostCSS usa `@tailwindcss/postcss`.
- Se sustituye `tailwind.config.ts` por `tailwind.config.cjs` para evitar warnings ESM sin añadir `"type": "module"` al package.
- Se retira `tailwindcss-animate`, no usado por el runtime del repo.
- Se adaptan utilidades renombradas de Tailwind 4 para preservar semántica visual v3 (`shadow-xs`, `backdrop-blur-xs`, `outline-hidden`).
- Se fija el color de los links centrales del navbar con una clase `navbar-link` en `Silver` explicito para corregir el drift violeta introducido por la actualización de dependencias.
- Se recupera la microinteracción hover de esos links centralizando fondo y escala en CSS explícito, evitando depender de la generación de transforms de Tailwind 4.
- Se restaura el footer con color base `Silver` en los textos y clases CSS explícitas para las transiciones hover de navegación, contacto y redes.
- Se integra el crédito `Desarrollado por Nebula Studios` en la franja legal inferior del footer y se ajusta toda esa franja a un tono más sutil.
- Three y sus tipos pasan a la familia `0.184.x`.
- Remotion, `@remotion/cli` y `@remotion/google-fonts` pasan a `4.0.463`.
- Supabase CLI pasa a `2.100.1`.
- TypeScript pasa a `6.0.3`; ESLint se mantiene en `9.39.4` porque `10.4.0` rompe con `eslint-config-next@16.2.6`.

## Objetivo

Dejar el stack base actualizado sin aceptar drift visual ni romper validación operativa del repo.

## Impacto arquitectonico

El cambio afecta al runtime frontend, la compilación CSS y el tooling de desarrollo. No introduce rutas nuevas, backend real, cambios de datos, Supabase runtime, copy público ni alteración funcional deliberada.

## Desglose denso

- runtime React: `19.2.6`
- styling: Tailwind `4.3.0` + `@tailwindcss/postcss`
- config Tailwind: CommonJS explícito vía `tailwind.config.cjs`
- visual preservation: aliases Tailwind v4 aplicados para mantener defaults v3 donde había impacto
- dev tooling: TypeScript `6.0.3`, ESLint `9.39.4`
- librerías visuales: Motion `12.39.0`, Three `0.184.0`
- tooling video/backend local: Remotion `4.0.463`, Supabase CLI `2.100.1`

## Validacion

- `npm outdated --json` → solo queda `eslint@10.4.0`; no se adopta por incompatibilidad verificada.
- `npm ls --depth=0`
- `npm audit --omit=dev`
- `npm audit`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npx react-doctor@latest` → detecta React `^19.2.6`, Tailwind `^4.3.0` y mantiene score `89/100`; hallazgos restantes pertenecen a deuda previa de arquitectura/performance.
- Playwright sobre `http://127.0.0.1:3001/` → el link `Servicios` del navbar computa `rgb(232, 232, 240)`.
- Playwright sobre `http://127.0.0.1:3001/` → tras desbloquear el preloader de la sesion de smoke, el hover del link `Servicios` computa fondo `rgba(255, 255, 255, 0.08)`, transición de `background-color, color, transform` y escala por `transform`.
- Capturas Playwright baseline/final en desktop `1440x1000` y mobile `390x844`.
- Comparación pixel con `sharp`: desktop `4.027%` de pixeles por encima del umbral y mobile `0.506%`, con diferencia concentrada en capas animadas/antialiasing del hero y sin roturas visibles en la smoke visual.
- Playwright sobre `http://localhost:3010/` → el footer computa textos base en `rgba(232, 232, 240, ...)` y mantiene hover activo en navegación, contacto e Instagram.
- Playwright sobre `http://localhost:3010/` → la franja legal inferior computa `rgba(171, 167, 199, 0.62)` en copyright, crédito y enlaces legales.

## Pendientes / limites

ESLint `10.4.0` queda pendiente hasta que `eslint-config-next` y su `eslint-plugin-react` interno sean compatibles; al probarlo, `npm run lint` falló con `contextOrFilename.getFilename is not a function`. `npm audit` sigue reportando advisories moderados en PostCSS embebido dentro de Next y en tooling dev-only de Remotion/`ws`; no se fuerza `npm audit fix --force`.

## Notas para presupuesto

Actualización mayor de stack con migración de CSS framework, validación completa y smoke visual comparativa. Valor principalmente técnico: reduce drift de dependencias y prepara el repo para la siguiente base React/Tailwind.
