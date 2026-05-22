---
change_id: NBS-CHG-2026-05-19-205
date: 2026-05-19
title: Actualizacion patch de Next.js
group_id: NBS-TSK-2026-181
category: frontend
subcategories:
  - dependencies
  - security
  - tooling
origin: client-request
complexity: low
scope: cross-cutting
user_visible: false
release_impacts:
  - frontend-runtime
  - developer-tooling
  - docs
architecture_layers:
  - app
  - docs
  - tooling
  - web
backend_sensitive: false
files_touched:
  - package.json
  - package-lock.json
  - .agents/rules/01-project-context.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm ls next eslint-config-next postcss
  - npm audit --omit=dev
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Actualización patch de Next.js de `16.2.4` a `16.2.6`, alineando `eslint-config-next` y fijando PostCSS directo en `8.5.15`.

## Contexto / problema

La auditoría de dependencias detectó advisories de seguridad sobre `next@16.2.4`. La actualización solicitada se acota a una oleada patch para reducir riesgo sin mezclar todavía React 19, Tailwind 4, TypeScript 6 ni ESLint 10.

## Cambio realizado

- `next` pasa de `^16.2.4` a `^16.2.6`.
- `eslint-config-next` pasa de `^16.2.4` a `^16.2.6`.
- `postcss` queda fijado como dependencia directa de desarrollo en `^8.5.15`.
- `package-lock.json` se regenera con los paquetes de Next/SWC correspondientes a `16.2.6`.
- La documentación viva del stack refleja la nueva foto de dependencias.

## Objetivo

Cerrar la primera oleada segura de actualización del stack base, priorizando patches de seguridad y compatibilidad antes de abordar migraciones mayores.

## Impacto arquitectonico

El cambio afecta al framework runtime y al tooling de lint/build, pero no modifica rutas, componentes, UX, datos, backend, Supabase ni configuración de despliegue.

## Desglose denso

- runtime: `next@16.2.6`
- lint tooling: `eslint-config-next@16.2.6`
- CSS tooling directo: `postcss@8.5.15`
- estrategia: oleada patch aislada
- migraciones no incluidas: React 19, Tailwind 4, TypeScript 6, ESLint 10

## Validacion

- `npm ls next eslint-config-next postcss` → confirma `next@16.2.6`, `eslint-config-next@16.2.6` y `postcss@8.5.15`.
- `npm audit --omit=dev` → desaparecen los advisories altos de `next@16.2.4`; queda un advisory moderado reportado sobre `postcss` embebido bajo `next`.
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

`npm audit --omit=dev` puede seguir reportando un advisory moderado por el `postcss@8.4.31` embebido bajo `next`; no se fuerza override porque pertenece a dependencias internas del framework estable publicado. Las vulnerabilidades dev-only de Remotion quedan fuera de esta oleada.

## Notas para presupuesto

Mantenimiento técnico preventivo con reducción de riesgo de seguridad en framework y documentación de stack actualizada.
