---
change_id: NBS-CHG-2026-05-04-058
date: 2026-05-04
title: Retirada de la primitive DecryptedText sin uso runtime
group_id: NBS-TSK-2026-058
category: frontend
subcategories:
  - components
  - docs
  - cleanup
origin: internal-improvement
complexity: low
scope: cross-cutting
user_visible: false
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - docs
backend_sensitive: false
files_touched:
  - components/ui/decrypted-text.tsx
  - components/ui/decrypted-text.module.css
  - doc/reference/technical-reference.md
  - .agents/decisions-log.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
  - "2026-05-04 — La primitive local DecryptedText se retira del repo"
---

# Resumen corto

Se elimina la primitive `DecryptedText` y su stylesheet asociado al no tener ya ningún uso runtime en la web actual.

## Contexto / problema

Tras la migración de los reveals tipográficos activos del hero a `SplitText`, `DecryptedText` quedó como primitive huérfana en `components/ui/` y solo sobrevivía en referencias históricas y documentación.

## Cambio realizado

- se elimina `components/ui/decrypted-text.tsx`
- se elimina `components/ui/decrypted-text.module.css`
- se limpia `doc/reference/technical-reference.md` para que no siga listando la primitive como parte viva del sistema
- se registra la retirada en `.agents/decisions-log.md`

## Objetivo

Mantener la librería local de primitives alineada con el runtime real y reducir código muerto que ya no aporta valor operativo.

## Impacto arquitectónico

La web pública no pierde comportamiento activo, pero sí reduce superficie innecesaria en la capa UI. El histórico queda intacto en `change-log`; la referencia viva deja de sobredeclarar componentes disponibles.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / límites

- no se ha ejecutado `changes:sync` porque esos scripts no están expuestos hoy en `package.json`

## Notas para presupuesto

Limpieza técnica repo-safe para reducir deuda de mantenimiento y evitar falsas affordances en la librería de componentes.
