---
change_id: NBS-CHG-2026-05-06-147
date: 2026-05-06
title: Supresion de falsos warnings CSS de Tailwind en VS Code
group_id: NBS-TSK-2026-133
category: infra
subcategories:
  - tooling
origin: client-request
complexity: low
scope: local
user_visible: false
release_impacts:
  - developer-tooling
architecture_layers:
  - tooling
  - docs
backend_sensitive: false
files_touched:
  - .vscode/settings.json
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

Se añade una configuración de workspace para que VS Code deje de marcar como `unknownAtRules` las directivas válidas de Tailwind usadas en el proyecto.

## Contexto / problema

El runtime y el pipeline del proyecto aceptaban correctamente `@tailwind` y `@apply`, pero el validador CSS base del editor seguía mostrando warnings falsos en `app/globals.css`, generando ruido innecesario en el flujo de trabajo.

## Cambio realizado

- se crea `.vscode/settings.json`
- se ignoran los warnings `unknownAtRules` en CSS, SCSS y LESS a nivel de workspace

## Objetivo

Eliminar falsos positivos del editor sin tocar la configuración de Tailwind ni relajar validaciones reales del build.

## Impacto arquitectonico

Nulo sobre runtime. Mejora únicamente la ergonomía local de desarrollo.

## Desglose denso

- el ajuste se limita al workspace versionado del repo
- no cambia ESLint, TypeScript ni el proceso de compilación
- otros editores siguen siendo independientes de esta configuración

## Validacion

- revisión manual del archivo añadido
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- si en el futuro se adopta otra estrategia de tooling CSS, habrá que reevaluar si este override sigue siendo necesario

## Notas para presupuesto

Mejora operativa pequeña pero útil para reducir fricción y ruido visual durante el desarrollo diario.
